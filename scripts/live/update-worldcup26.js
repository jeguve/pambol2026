/*
  Actualiza Firestore/partidos_en_vivo usando la API abierta worldcup26.ir.
  Diseñado para GitHub Actions + Firebase Admin SDK, sin Firebase Blaze.

  Fuente: https://worldcup26.ir/get/games
  No cambia index.html ni partidos.js. El HTML seguirá leyendo Firestore.

  Reglas:
  - Consulta /get/games una vez por ejecución.
  - Empata partidos por worldcup26Id/worldcupApiId si existe en partidos.js, o por equipos + grupo.
  - Escribe goles/status en partidos_en_vivo/{idPartido}.
  - status = NS si no inició, LIVE si está en curso, FT si finished = TRUE.
*/

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const admin = require('firebase-admin');

const ROOT = path.resolve(__dirname, '../..');
const PARTIDOS_JS = path.join(ROOT, 'partidos.js');
const ALIASES_JSON = path.join(ROOT, 'config/team-aliases-worldcup26.json');

const API_BASE = (process.env.WORLDCUP26_API_BASE || 'https://worldcup26.ir').replace(/\/$/, '');
const API_TOKEN = process.env.WORLDCUP26_TOKEN || '';
const FIREBASE_SERVICE_ACCOUNT = process.env.FIREBASE_SERVICE_ACCOUNT;
const DRY_RUN = String(process.env.DRY_RUN || '').toLowerCase() === 'true';
const DEBUG = String(process.env.DEBUG_WORLDCUP26 || '').toLowerCase() === 'true';

const FINAL_STATUSES = new Set(['FT', 'AET', 'PEN', 'FINALIZADO']);

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

function loadAliases() {
  if (!fs.existsSync(ALIASES_JSON)) return {};
  return JSON.parse(fs.readFileSync(ALIASES_JSON, 'utf8'));
}

function normalizeName(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function candidateNames(name, aliases) {
  const raw = String(name || '').trim();
  const list = [raw, ...(aliases[raw] || [])];
  const normalizedRaw = normalizeName(raw);
  for (const [key, vals] of Object.entries(aliases)) {
    if (normalizeName(key) === normalizedRaw) list.push(key, ...vals);
  }
  return new Set(list.map(normalizeName).filter(Boolean));
}

function sameTeam(calendarName, apiName, aliases) {
  const cands = candidateNames(calendarName, aliases);
  const normalizedApi = normalizeName(apiName);
  if (!normalizedApi) return false;
  if (cands.has(normalizedApi)) return true;
  for (const c of cands) {
    if (c && (c.includes(normalizedApi) || normalizedApi.includes(c))) return true;
  }
  return false;
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

async function readExistingResults(db) {
  const snap = await db.collection('partidos_en_vivo').get();
  const map = new Map();
  snap.forEach(doc => map.set(doc.id, doc.data() || {}));
  return map;
}

async function apiGetGames() {
  const url = `${API_BASE}/get/games`;
  const headers = { 'Accept': 'application/json' };
  if (API_TOKEN) headers.Authorization = `Bearer ${API_TOKEN}`;

  console.log(`Consultando WorldCup26 API: ${url}`);
  const res = await fetch(url, { headers });
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`WorldCup26 API HTTP ${res.status}: ${text.slice(0, 500)}`);
  }

  let json;
  try {
    json = JSON.parse(text);
  } catch (err) {
    throw new Error(`WorldCup26 API no regresó JSON válido: ${text.slice(0, 500)}`);
  }

  const games = Array.isArray(json) ? json :
    Array.isArray(json.games) ? json.games :
    Array.isArray(json.data) ? json.data :
    Array.isArray(json.response) ? json.response : [];

  if (!games.length) {
    console.log('WorldCup26 API respondió sin juegos. Respuesta parcial:', JSON.stringify(json).slice(0, 500));
  } else {
    console.log(`Juegos recibidos de WorldCup26: ${games.length}`);
  }

  return games;
}

function asString(value) {
  if (value === null || value === undefined) return '';
  return String(value);
}

function asNumberOrNull(value) {
  if (value === null || value === undefined) return null;
  const s = String(value).trim().toLowerCase();
  if (!s || s === 'null' || s === 'undefined' || s === 'nan') return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

function boolish(value) {
  const s = String(value || '').trim().toLowerCase();
  return ['true', '1', 'yes', 'si', 'sí', 'finished', 'ft'].includes(s);
}

function isNotStarted(value) {
  const s = String(value || '').trim().toLowerCase();
  return !s || ['notstarted', 'not started', 'ns', 'tbd', 'upcoming', 'scheduled'].includes(s);
}

function apiGameId(game) {
  return asString(game?.id || game?.match_id || game?.game_id || game?._id);
}

function partidoWorldCupId(partido) {
  return asString(
    partido.worldcup26Id ||
    partido.worldcupApiId ||
    partido.worldcupId ||
    partido.apiWorldCupId ||
    partido.gameId ||
    ''
  );
}

function apiHomeName(game) {
  return game?.home_team_name_en || game?.home_team_name || game?.home || game?.team1 || '';
}

function apiAwayName(game) {
  return game?.away_team_name_en || game?.away_team_name || game?.away || game?.team2 || '';
}

function apiGroup(game) {
  return asString(game?.group || game?.group_name || game?.stage || '').replace(/^Group\s+/i, '').trim();
}

function matchOrientation(game, partido, aliases) {
  const home = apiHomeName(game);
  const away = apiAwayName(game);
  const localApi = partido.localApi || partido.apiLocal || partido.local;
  const visitApi = partido.visitApi || partido.apiVisit || partido.visit;

  const direct = sameTeam(localApi, home, aliases) && sameTeam(visitApi, away, aliases);
  if (direct) return 'direct';

  const reversed = sameTeam(localApi, away, aliases) && sameTeam(visitApi, home, aliases);
  if (reversed) return 'reversed';

  return null;
}

function matchGameToPartido(game, partido, aliases) {
  const wantedId = partidoWorldCupId(partido);
  if (wantedId && apiGameId(game) === wantedId) return 'direct';

  const orientation = matchOrientation(game, partido, aliases);
  if (!orientation) return null;

  if (partido.grupo) {
    const gApi = normalizeName(apiGroup(game));
    const gLocal = normalizeName(partido.grupo);
    if (gApi && gLocal && gApi !== gLocal) return null;
  }

  return orientation;
}

function deriveStatus(game) {
  const finished = boolish(game?.finished || game?.is_finished || game?.status);
  if (finished) return 'FT';

  const elapsed = asString(game?.time_elapsed || game?.elapsed || game?.minute || game?.status);
  if (isNotStarted(elapsed)) return 'NS';

  return 'LIVE';
}

function gameToFirestore(game, partido, orientation = 'direct') {
  const status = deriveStatus(game);
  const homeScore = asNumberOrNull(game?.home_score ?? game?.homeScore ?? game?.score_home);
  const awayScore = asNumberOrNull(game?.away_score ?? game?.awayScore ?? game?.score_away);

  const golesL = orientation === 'reversed' ? awayScore : homeScore;
  const golesV = orientation === 'reversed' ? homeScore : awayScore;

  return {
    matchId: partido.id,
    worldcup26Id: apiGameId(game) || null,
    golesL,
    golesV,
    status,
    estado: status,
    shortStatus: status,
    minuto: status === 'LIVE' ? asString(game?.time_elapsed || game?.elapsed || game?.minute || '') : null,
    apiHomeName: apiHomeName(game) || null,
    apiAwayName: apiAwayName(game) || null,
    apiGroup: apiGroup(game) || null,
    apiMatchday: game?.matchday || null,
    apiType: game?.type || null,
    apiLocalDate: game?.local_date || null,
    apiFinished: game?.finished ?? null,
    apiMatchedBy: partidoWorldCupId(partido) ? 'worldcup26Id' : 'team-group',
    apiOrientation: orientation,
    apiSource: 'worldcup26.ir',
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };
}

function comparable(data) {
  return {
    golesL: data.golesL ?? null,
    golesV: data.golesV ?? null,
    status: data.status || null,
    minuto: data.minuto || null,
    worldcup26Id: data.worldcup26Id || null
  };
}

function hasMeaningfulChange(existing, next) {
  const a = comparable(existing || {});
  const b = comparable(next || {});
  return JSON.stringify(a) !== JSON.stringify(b);
}

async function writeLiveResult(db, partido, data, existing) {
  if (!hasMeaningfulChange(existing, data)) {
    if (DEBUG) console.log(`Sin cambios ${partido.id}`);
    return;
  }

  if (DRY_RUN) {
    console.log('[DRY_RUN] escribiría partidos_en_vivo/%s', partido.id, data);
    return;
  }

  await db.collection('partidos_en_vivo').doc(partido.id).set(data, { merge: true });
  console.log(`Actualizado ${partido.id}: ${partido.local} ${data.golesL} - ${data.golesV} ${partido.visit} (${data.status})`);
}

async function main() {
  console.log('Fuente = WorldCup26 API');
  console.log('API_BASE =', API_BASE);
  console.log('DRY_RUN =', DRY_RUN);

  const db = initFirebase();
  const aliases = loadAliases();
  const partidos = loadPartidos();
  const existing = await readExistingResults(db);
  const games = await apiGetGames();

  if (!games.length) {
    console.log('No hay juegos para procesar.');
    return;
  }

  let matched = 0;
  let skippedFinal = 0;

  for (const partido of partidos) {
    const actual = existing.get(partido.id) || {};

    // Si ya quedó finalizado, no lo vuelvas a tocar salvo que esté en DRY_RUN/DEBUG.
    if (!DRY_RUN && FINAL_STATUSES.has(String(actual.status || actual.estado || actual.shortStatus || '').toUpperCase())) {
      skippedFinal += 1;
      continue;
    }

    let found = null;
    let orientation = null;

    for (const game of games) {
      const o = matchGameToPartido(game, partido, aliases);
      if (o) {
        found = game;
        orientation = o;
        break;
      }
    }

    if (!found) {
      if (DEBUG) console.log(`No se encontró match para ${partido.id}: ${partido.local} vs ${partido.visit}`);
      continue;
    }

    matched += 1;
    const data = gameToFirestore(found, partido, orientation || 'direct');

    // Evita llenar Firestore con 104 partidos NS. Solo crea NS si el doc ya existía.
    if (data.status === 'NS' && !actual.status && !actual.estado && !actual.shortStatus) {
      if (DEBUG) console.log(`Match ${partido.id} sigue NS; no se crea doc nuevo.`);
      continue;
    }

    await writeLiveResult(db, partido, data, actual);
  }

  console.log(`Resumen WorldCup26: partidos calendario=${partidos.length}, empatados=${matched}, finales omitidos=${skippedFinal}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
