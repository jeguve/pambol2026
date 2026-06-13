/*
  Actualiza Firestore/partidos_en_vivo con API-Football.
  Diseñado para GitHub Actions + GitHub Secrets, sin Firebase Blaze.

  Estrategia para plan gratis (100 requests/día):
  - El workflow corre cada 5 min.
  - Si no hay partidos cerca/en vivo: 0 llamadas API.
  - Antes del partido: solo hace una preconsulta desde 20 min antes para resolver/marcar fixture.
  - Desde la hora de inicio hasta FT: consulta cada ejecución (~5 min).
  - Mantiene una ventana de recuperación de 6 horas después del inicio para corregir partidos que no pudieron actualizarse durante el juego.
  - Al detectar FT/AET/PEN: guarda resultado final y deja de consultar ese partido.
  - Consulta por liga+temporada+fecha para traer todos los partidos del día en 1 request por ejecución activa.
  - Si el partido tiene apiFixtureId real de API-Football, consulta primero por /fixtures?id=...
*/

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const admin = require('firebase-admin');

const ROOT = path.resolve(__dirname, '../..');
const PARTIDOS_JS = path.join(ROOT, 'partidos.js');
const ALIASES_JSON = path.join(ROOT, 'config/team-aliases.json');

const API_BASE = 'https://v3.football.api-sports.io';
const API_KEY = process.env.APIFOOTBALL_KEY;
const FIREBASE_SERVICE_ACCOUNT = process.env.FIREBASE_SERVICE_ACCOUNT;
const LEAGUE_ID = process.env.APIFOOTBALL_LEAGUE_ID;
const SEASON = process.env.APIFOOTBALL_SEASON || '2026';
const API_TIMEZONE = process.env.APIFOOTBALL_TIMEZONE || 'America/Mexico_City';
const DRY_RUN = String(process.env.DRY_RUN || '').toLowerCase() === 'true';

const DAILY_API_LIMIT = Number(process.env.DAILY_API_LIMIT || 95);
const PRECHECK_MINUTES_BEFORE = Number(process.env.PRECHECK_MINUTES_BEFORE || 20);
const MAX_MINUTES_AFTER_START = Number(process.env.MAX_MINUTES_AFTER_START || 360);

const FINAL_STATUSES = new Set(['FT', 'AET', 'PEN']);
const LIVE_STATUSES = new Set(['1H', '2H', 'HT', 'ET', 'BT', 'P', 'LIVE', 'IN_PLAY']);

// Aliases mínimos internos para evitar fallas cuando el nombre visible está en español.
const DEFAULT_ALIASES = {
  'Estados Unidos': ['United States', 'USA', 'United States of America', 'USMNT'],
  'United States': ['Estados Unidos', 'USA', 'United States of America', 'USMNT'],
  'USA': ['United States', 'Estados Unidos', 'United States of America', 'USMNT'],
  'Corea del Sur': ['South Korea', 'Korea Republic', 'Korea Rep.', 'Republic of Korea'],
  'Chequia': ['Czechia', 'Czech Republic'],
  'Bosnia': ['Bosnia and Herzegovina', 'Bosnia-Herzegovina'],
  'Catar': ['Qatar'],
  'Países Bajos': ['Netherlands', 'Holland'],
  'C. de Marfil': ['Ivory Coast', "Côte d'Ivoire", 'Cote d Ivoire'],
  'N. Zelanda': ['New Zealand'],
  'Arabia Saudita': ['Saudi Arabia'],
  'R.D. Congo': ['DR Congo', 'Congo DR', 'Democratic Republic of the Congo'],
  'Inglaterra': ['England'],
  'Escocia': ['Scotland'],
  'Marruecos': ['Morocco'],
  'Alemania': ['Germany'],
  'España': ['Spain'],
  'Francia': ['France'],
  'Japón': ['Japan'],
  'Suecia': ['Sweden'],
  'Túnez': ['Tunisia'],
  'Bélgica': ['Belgium'],
  'Egipto': ['Egypt'],
  'Irán': ['Iran'],
  'Noruega': ['Norway'],
  'Argentina': ['Argentina'],
  'Argelia': ['Algeria'],
  'Austria': ['Austria'],
  'Jordania': ['Jordan'],
  'Portugal': ['Portugal'],
  'Uzbekistán': ['Uzbekistan'],
  'Colombia': ['Colombia'],
  'Croacia': ['Croatia'],
  'Ghana': ['Ghana'],
  'Panamá': ['Panama'],
  'México': ['Mexico'],
  'Sudáfrica': ['South Africa'],
  'Canadá': ['Canada'],
  'Suiza': ['Switzerland'],
  'Brasil': ['Brazil'],
  'Haití': ['Haiti'],
  'Paraguay': ['Paraguay'],
  'Australia': ['Australia'],
  'Turquía': ['Turkey', 'Türkiye'],
  'Curazao': ['Curacao', 'Curaçao'],
  'Ecuador': ['Ecuador'],
  'Cabo Verde': ['Cape Verde'],
  'Uruguay': ['Uruguay'],
  'Senegal': ['Senegal'],
  'Irak': ['Iraq']
};

function loadPartidos() {
  const code = fs.readFileSync(PARTIDOS_JS, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'partidos.js' });
  const partidos = sandbox.window.partidosMundial || sandbox.partidosMundial || [];
  if (!Array.isArray(partidos) || !partidos.length) {
    throw new Error('No pude cargar window.partidosMundial desde partidos.js');
  }
  return partidos;
}

function normalizeName(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function mergeAliases(base, extra) {
  const out = { ...base };
  Object.entries(extra || {}).forEach(([key, values]) => {
    const list = Array.isArray(values) ? values : [values];
    out[key] = Array.from(new Set([...(out[key] || []), ...list].filter(Boolean)));
  });
  return out;
}

function loadAliases() {
  let fileAliases = {};
  if (fs.existsSync(ALIASES_JSON)) {
    fileAliases = JSON.parse(fs.readFileSync(ALIASES_JSON, 'utf8'));
  }
  return mergeAliases(DEFAULT_ALIASES, fileAliases);
}

function candidateNames(name, aliases) {
  const base = [name, ...(aliases[name] || [])];
  return new Set(base.map(normalizeName).filter(Boolean));
}

function sameTeam(calendarName, apiName, aliases) {
  const cands = candidateNames(calendarName, aliases);
  const normalizedApi = normalizeName(apiName);
  if (cands.has(normalizedApi)) return true;
  for (const c of cands) {
    if (c && normalizedApi && (c.includes(normalizedApi) || normalizedApi.includes(c))) return true;
  }
  return false;
}

function yyyyMmDd(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, days) {
  const d = new Date(date.getTime());
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

function yyyyMmDdInTimezone(date, timeZone = API_TIMEZONE) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).formatToParts(date).reduce((acc, p) => {
    if (p.type !== 'literal') acc[p.type] = p.value;
    return acc;
  }, {});
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function fechasConsultaParaPartido(partido) {
  const inicio = new Date(partido.hora);
  if (Number.isNaN(inicio.getTime())) return [];
  // Incluye día anterior y siguiente para cubrir cambios por zona horaria/API.
  return Array.from(new Set([
    yyyyMmDdInTimezone(addDays(inicio, -1), API_TIMEZONE),
    yyyyMmDdInTimezone(inicio, API_TIMEZONE),
    yyyyMmDdInTimezone(addDays(inicio, 1), API_TIMEZONE)
  ]));
}

function parseServiceAccount() {
  if (!FIREBASE_SERVICE_ACCOUNT) throw new Error('Falta GitHub Secret FIREBASE_SERVICE_ACCOUNT');
  try {
    return JSON.parse(FIREBASE_SERVICE_ACCOUNT);
  } catch (err) {
    throw new Error('FIREBASE_SERVICE_ACCOUNT no es JSON válido. Copia completo el JSON de la cuenta de servicio.');
  }
}

function initFirebase() {
  if (admin.apps.length) return admin.firestore();
  const credential = admin.credential.cert(parseServiceAccount());
  admin.initializeApp({ credential });
  return admin.firestore();
}

async function getApiUsage(db, todayKey) {
  const ref = db.collection('api_sync_meta').doc(todayKey);
  const snap = await ref.get();
  const data = snap.exists ? snap.data() : {};
  return { ref, count: Number(data.requests || 0) };
}

async function incrementApiUsage(ref, amount = 1) {
  if (DRY_RUN) return;
  await ref.set({
    requests: admin.firestore.FieldValue.increment(amount),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
}

async function apiFootballGet(pathAndQuery) {
  if (!API_KEY) throw new Error('Falta GitHub Secret APIFOOTBALL_KEY');
  const url = `${API_BASE}${pathAndQuery}`;
  const res = await fetch(url, { headers: { 'x-apisports-key': API_KEY } });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`API-Football HTTP ${res.status}: ${JSON.stringify(json).slice(0, 500)}`);
  }
  return json;
}

async function readExistingResults(db) {
  const snap = await db.collection('partidos_en_vivo').get();
  const map = new Map();
  snap.forEach(doc => map.set(doc.id, doc.data() || {}));
  return map;
}

function isFinalStatus(raw) {
  return FINAL_STATUSES.has(String(raw || '').toUpperCase());
}

function isLiveStatus(raw) {
  return LIVE_STATUSES.has(String(raw || '').toUpperCase());
}

function shouldPrecheck(now, partido, existing) {
  const inicio = new Date(partido.hora);
  if (Number.isNaN(inicio.getTime())) return false;
  const minutesToStart = (inicio.getTime() - now.getTime()) / 60000;
  if (minutesToStart < 0 || minutesToStart > PRECHECK_MINUTES_BEFORE) return false;
  return !existing?.apiPrecheckDone && !existing?.apiFixtureId;
}

function shouldPollLive(now, partido, existing) {
  const inicio = new Date(partido.hora);
  if (Number.isNaN(inicio.getTime())) return false;
  const minutesAfterStart = (now.getTime() - inicio.getTime()) / 60000;
  if (minutesAfterStart < 0 || minutesAfterStart > MAX_MINUTES_AFTER_START) return false;
  if (isFinalStatus(existing?.status || existing?.estado || existing?.shortStatus)) return false;
  return true;
}

function fixtureStatus(fx) {
  return String(fx?.fixture?.status?.short || '').toUpperCase();
}

function fixtureMinute(fx) {
  return fx?.fixture?.status?.elapsed ?? fx?.fixture?.status?.extra ?? null;
}

function fixtureDate(fx) {
  const raw = fx?.fixture?.date;
  const d = raw ? new Date(raw) : null;
  return d && !Number.isNaN(d.getTime()) ? d : null;
}

function partidoApiLocal(partido) {
  return partido?.localApi || partido?.apiLocal || partido?.local;
}

function partidoApiVisit(partido) {
  return partido?.visitApi || partido?.apiVisit || partido?.visit;
}

function fixtureOrientation(fx, partido, aliases) {
  const home = fx?.teams?.home?.name || '';
  const away = fx?.teams?.away?.name || '';
  const localApi = partidoApiLocal(partido);
  const visitApi = partidoApiVisit(partido);

  const direct = sameTeam(localApi, home, aliases) && sameTeam(visitApi, away, aliases);
  if (direct) return 'direct';

  const reversed = sameTeam(localApi, away, aliases) && sameTeam(visitApi, home, aliases);
  if (reversed) return 'reversed';

  return null;
}

function matchFixtureToPartido(fx, partido, aliases) {
  const orientation = fixtureOrientation(fx, partido, aliases);
  if (!orientation) return false;

  const apiDate = fixtureDate(fx);
  const localDate = new Date(partido.hora);
  if (apiDate && !Number.isNaN(localDate.getTime())) {
    const diffHours = Math.abs(apiDate.getTime() - localDate.getTime()) / 36e5;
    return diffHours <= 6;
  }
  return true;
}

function fixtureToFirestore(fx, partido, matchedBy = 'league-date', orientation = 'direct') {
  const status = fixtureStatus(fx) || 'NS';
  const goalsHome = fx?.goals?.home;
  const goalsAway = fx?.goals?.away;
  const scoreHome = fx?.score?.fulltime?.home ?? goalsHome;
  const scoreAway = fx?.score?.fulltime?.away ?? goalsAway;

  const golesL = orientation === 'reversed' ? scoreAway : scoreHome;
  const golesV = orientation === 'reversed' ? scoreHome : scoreAway;

  return {
    matchId: partido.id,
    apiFixtureId: fx?.fixture?.id || null,
    golesL: golesL ?? null,
    golesV: golesV ?? null,
    status,
    estado: status,
    shortStatus: status,
    minuto: fixtureMinute(fx),
    apiHomeName: fx?.teams?.home?.name || null,
    apiAwayName: fx?.teams?.away?.name || null,
    apiLeagueId: fx?.league?.id || null,
    apiLeagueName: fx?.league?.name || null,
    apiSeason: fx?.league?.season || null,
    apiFixtureDate: fx?.fixture?.date || null,
    apiOrientation: orientation,
    apiMatchedBy: matchedBy,
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };
}

async function writeLiveResult(db, partido, data) {
  if (DRY_RUN) {
    console.log('[DRY_RUN] escribiría partidos_en_vivo/%s', partido.id, data);
    return;
  }
  await db.collection('partidos_en_vivo').doc(partido.id).set(data, { merge: true });
}

async function fetchFixtureById(db, usage, fixtureId) {
  const latestUsage = await getApiUsage(db, yyyyMmDd(new Date()));
  if (latestUsage.count >= DAILY_API_LIMIT) return null;

  const query = `/fixtures?id=${encodeURIComponent(fixtureId)}&timezone=${encodeURIComponent(API_TIMEZONE)}`;
  console.log(`Consultando API-Football por fixtureId: ${query}`);
  const json = await apiFootballGet(query);
  await incrementApiUsage(latestUsage.ref, 1);
  const list = Array.isArray(json.response) ? json.response : [];
  return list[0] || null;
}

async function main() {
  const now = new Date();
  const todayKey = yyyyMmDd(now);
  const db = initFirebase();
  const aliases = loadAliases();
  const partidos = loadPartidos();
  const existing = await readExistingResults(db);

  const candidatos = partidos.filter(p => {
    const actual = existing.get(p.id) || {};
    return shouldPrecheck(now, p, actual) || shouldPollLive(now, p, actual);
  });

  if (!candidatos.length) {
    console.log('No hay partidos en ventana de consulta. 0 requests API-Football.');
    return;
  }

  if (!LEAGUE_ID) {
    throw new Error('Falta variable de repositorio APIFOOTBALL_LEAGUE_ID. Es necesaria para consultar por fecha en 1 request y cuidar el plan gratis.');
  }

  const usage = await getApiUsage(db, todayKey);
  if (usage.count >= DAILY_API_LIMIT) {
    console.log(`Límite interno alcanzado (${usage.count}/${DAILY_API_LIMIT}). No se llama API-Football.`);
    return;
  }

  // Primero intentamos resolver por apiFixtureId real, si existe.
  // Nota: apiFixtureId debe ser el ID real de API-Football, no el ID de otro proveedor.
  const resolvedById = new Map();

  for (const partido of candidatos) {
    const actual = existing.get(partido.id) || {};
    const expectedFixtureId = actual.apiFixtureId || partido.apiFixtureId || partido.fixtureId || null;
    if (!expectedFixtureId || isFinalStatus(actual.status || actual.estado || actual.shortStatus)) continue;

    const fx = await fetchFixtureById(db, usage, expectedFixtureId);
    if (fx) {
      resolvedById.set(partido.id, fx);
    } else {
      console.log(`apiFixtureId no devolvió fixture para ${partido.id}: ${expectedFixtureId}. Se intentará por fecha/equipos.`);
    }
  }

  const fechas = Array.from(new Set(candidatos.flatMap(p => fechasConsultaParaPartido(p))));
  const fixturesPorFecha = new Map();

  for (const date of fechas) {
    const currentUsage = await getApiUsage(db, todayKey);
    if (currentUsage.count >= DAILY_API_LIMIT) {
      console.log(`Límite interno alcanzado antes de consultar ${date}.`);
      break;
    }

    const query = `/fixtures?league=${encodeURIComponent(LEAGUE_ID)}&season=${encodeURIComponent(SEASON)}&date=${encodeURIComponent(date)}&timezone=${encodeURIComponent(API_TIMEZONE)}`;
    console.log(`Consultando API-Football: ${query}`);
    const json = await apiFootballGet(query);
    await incrementApiUsage(currentUsage.ref, 1);
    const list = Array.isArray(json.response) ? json.response : [];
    console.log(`API-Football devolvió ${list.length} fixture(s) para ${date}.`);
    if (list.length) {
      console.log('Fixtures recibidos:', list.map(f => `${f.fixture?.id || '?'} ${f.teams?.home?.name || '?'} vs ${f.teams?.away?.name || '?'} (${f.fixture?.status?.short || '?'})`).join(' | '));
    }
    fixturesPorFecha.set(date, list);
  }

  for (const partido of candidatos) {
    const actual = existing.get(partido.id) || {};
    if (isFinalStatus(actual.status || actual.estado || actual.shortStatus)) continue;

    const expectedFixtureId = actual.apiFixtureId || partido.apiFixtureId || partido.fixtureId || null;

    let fx = resolvedById.get(partido.id) || null;
    let matchedBy = fx ? 'apiFixtureId' : 'league-date-team-time';

    if (!fx) {
      const fechasPartido = fechasConsultaParaPartido(partido);
      const fixtures = fechasPartido.flatMap(date => fixturesPorFecha.get(date) || []);

      fx = fixtures.find(item => {
        if (expectedFixtureId && Number(item?.fixture?.id) === Number(expectedFixtureId)) return true;
        return matchFixtureToPartido(item, partido, aliases);
      }) || null;
    }

    if (!fx) {
      // Marcamos precheck para no gastar requests repetidos antes del inicio si la API todavía no publica el fixture.
      if (shouldPrecheck(now, partido, actual)) {
        await writeLiveResult(db, partido, {
          matchId: partido.id,
          apiPrecheckDone: true,
          status: actual.status || 'NS',
          estado: actual.estado || 'NS',
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          apiLookupNote: 'No se encontró fixture API-Football en precheck.'
        });
      }
      console.log(`No se encontró fixture para ${partido.id}: ${partido.local} vs ${partido.visit}`);
      console.log(`Nombres API esperados: ${partidoApiLocal(partido)} vs ${partidoApiVisit(partido)} | apiFixtureId: ${expectedFixtureId || 'sin ID'}`);
      continue;
    }

    const status = fixtureStatus(fx);
    const orientation = fixtureOrientation(fx, partido, aliases) || 'direct';
    if (expectedFixtureId && Number(fx?.fixture?.id) === Number(expectedFixtureId)) matchedBy = 'apiFixtureId';
    const data = fixtureToFirestore(fx, partido, matchedBy, orientation);
    data.apiPrecheckDone = true;

    // Si está por iniciar y aún no hay marcador, guardamos metadata pero no damos puntos por status NS.
    if (!isLiveStatus(status) && !isFinalStatus(status) && status !== 'NS') {
      console.log(`Status no final/no live para ${partido.id}: ${status}`);
    }

    await writeLiveResult(db, partido, data);
    console.log(`Actualizado ${partido.id}: ${partido.local} ${data.golesL} - ${data.golesV} ${partido.visit} (${data.status})`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
