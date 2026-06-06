// partidos.js - Calendario Maestro Completo (104 partidos estructurados)
const partidosMundial = [
    // ==========================================
    // FASE DE GRUPOS (72 Partidos con Códigos ISO)
    // ==========================================
    // --- GRUPO A ---
    { id: 'a1', local: 'México', localFlag: 'MX', visit: 'Sudáfrica', visitFlag: 'ZA', sede: 'Estadio Azteca', hora: '2026-06-11T13:00:00', fase: 'grupos', grupo: 'A' },
    { id: 'a2', local: 'Corea del Sur', localFlag: 'KR', visit: 'Chequia', visitFlag: 'CZ', sede: 'Estadio Guadalajara', hora: '2026-06-11T20:00:00', fase: 'grupos', grupo: 'A' },
    { id: 'a3', local: 'Chequia', localFlag: 'CZ', visit: 'Sudáfrica', visitFlag: 'ZA', sede: 'Estadio Atlanta', hora: '2026-06-18T10:00:00', fase: 'grupos', grupo: 'A' },
    { id: 'a4', local: 'México', localFlag: 'MX', visit: 'Corea del Sur', visitFlag: 'KR', sede: 'Estadio Guadalajara', hora: '2026-06-18T19:00:00', fase: 'grupos', grupo: 'A' },
    { id: 'a5', local: 'Chequia', localFlag: 'CZ', visit: 'México', visitFlag: 'MX', sede: 'Estadio Azteca', hora: '2026-06-24T19:00:00', fase: 'grupos', grupo: 'A' },
    { id: 'a6', local: 'Sudáfrica', localFlag: 'ZA', visit: 'Corea del Sur', visitFlag: 'KR', sede: 'Estadio Monterrey', hora: '2026-06-24T19:00:00', fase: 'grupos', grupo: 'A' },

    // --- GRUPO B ---
    { id: 'b1', local: 'Canadá', localFlag: 'CA', visit: 'Bosnia', visitFlag: 'BA', sede: 'Estadio Toronto', hora: '2026-06-12T13:00:00', fase: 'grupos', grupo: 'B' },
    { id: 'b2', local: 'Catar', localFlag: 'QA', visit: 'Suiza', visitFlag: 'CH', sede: 'Estadio San Francisco', hora: '2026-06-13T13:00:00', fase: 'grupos', grupo: 'B' },
    { id: 'b3', local: 'Canadá', localFlag: 'CA', visit: 'Catar', visitFlag: 'QA', sede: 'Estadio Vancouver', hora: '2026-06-18T16:00:00', fase: 'grupos', grupo: 'B' },
    { id: 'b4', local: 'Suiza', localFlag: 'CH', visit: 'Bosnia', visitFlag: 'BA', sede: 'Estadio Los Angeles', hora: '2026-06-18T13:00:00', fase: 'grupos', grupo: 'B' },
    { id: 'b5', local: 'Suiza', localFlag: 'CH', visit: 'Canadá', visitFlag: 'CA', sede: 'Estadio Vancouver', hora: '2026-06-23T15:00:00', fase: 'grupos', grupo: 'B' },
    { id: 'b6', local: 'Bosnia', localFlag: 'BA', visit: 'Catar', visitFlag: 'QA', sede: 'Estadio Boston', hora: '2026-06-23T15:00:00', fase: 'grupos', grupo: 'B' },

    // --- GRUPO C ---
    { id: 'c1', local: 'Brasil', localFlag: 'BR', visit: 'Marruecos', visitFlag: 'MA', sede: 'Estadio New York', hora: '2026-06-13T16:00:00', fase: 'grupos', grupo: 'C' },
    { id: 'c2', local: 'Escocia', localFlag: 'GB-SCT', visit: 'Haití', visitFlag: 'HT', sede: 'Estadio Boston', hora: '2026-06-13T19:00:00', fase: 'grupos', grupo: 'C' },
    { id: 'c3', local: 'Escocia', localFlag: 'GB-SCT', visit: 'Marruecos', visitFlag: 'MA', sede: 'Estadio Boston', hora: '2026-06-19T16:00:00', fase: 'grupos', grupo: 'C' },
    { id: 'c4', local: 'Brasil', localFlag: 'BR', visit: 'Haití', visitFlag: 'HT', sede: 'Estadio Philadelphia', hora: '2026-06-19T18:30:00', fase: 'grupos', grupo: 'C' },
    { id: 'c5', local: 'Marruecos', localFlag: 'MA', visit: 'Haití', visitFlag: 'HT', sede: 'Estadio Orlando', hora: '2026-06-24T14:00:00', fase: 'grupos', grupo: 'C' },
    { id: 'c6', local: 'Brasil', localFlag: 'BR', visit: 'Escocia', visitFlag: 'GB-SCT', sede: 'Estadio Miami', hora: '2026-06-24T14:00:00', fase: 'grupos', grupo: 'C' },

    // --- GRUPO D ---
    { id: 'd1', local: 'USA', localFlag: 'US', visit: 'Paraguay', visitFlag: 'PY', sede: 'Estadio Los Angeles', hora: '2026-06-12T19:00:00', fase: 'grupos', grupo: 'D' },
    { id: 'd2', local: 'Australia', localFlag: 'AU', visit: 'Turquía', visitFlag: 'TR', sede: 'Estadio Vancouver', hora: '2026-06-13T22:00:00', fase: 'grupos', grupo: 'D' },
    { id: 'd3', local: 'USA', localFlag: 'US', visit: 'Australia', visitFlag: 'AU', sede: 'Estadio Seattle', hora: '2026-06-19T13:00:00', fase: 'grupos', grupo: 'D' },
    { id: 'd4', local: 'Turquía', localFlag: 'TR', visit: 'Paraguay', visitFlag: 'PY', sede: 'Estadio San Francisco', hora: '2026-06-19T21:00:00', fase: 'grupos', grupo: 'D' },
    { id: 'd5', local: 'Turquía', localFlag: 'TR', visit: 'USA', visitFlag: 'US', sede: 'Estadio Los Angeles', hora: '2026-06-25T14:00:00', fase: 'grupos', grupo: 'D' },
    { id: 'd6', local: 'Paraguay', localFlag: 'PY', visit: 'Australia', visitFlag: 'AU', sede: 'Estadio Seattle', hora: '2026-06-25T14:00:00', fase: 'grupos', grupo: 'D' },

    // --- GRUPO E ---
    { id: 'e1', local: 'Alemania', localFlag: 'DE', visit: 'Curazao', visitFlag: 'CW', sede: 'Estadio Houston', hora: '2026-06-14T11:00:00', fase: 'grupos', grupo: 'E' },
    { id: 'e2', local: 'C. de Marfil', localFlag: 'CI', visit: 'Ecuador', visitFlag: 'EC', sede: 'Estadio Philadelphia', hora: '2026-06-14T17:00:00', fase: 'grupos', grupo: 'E' },
    { id: 'e3', local: 'Alemania', localFlag: 'DE', visit: 'C. de Marfil', visitFlag: 'CI', sede: 'Estadio Toronto', hora: '2026-06-20T14:00:00', fase: 'grupos', grupo: 'E' },
    { id: 'e4', local: 'Ecuador', localFlag: 'EC', visit: 'Curazao', visitFlag: 'CW', sede: 'Estadio Kansas City', hora: '2026-06-20T18:00:00', fase: 'grupos', grupo: 'E' },
    { id: 'e5', local: 'Curazao', localFlag: 'CW', visit: 'C. de Marfil', visitFlag: 'CI', sede: 'Estadio New York', hora: '2026-06-25T18:00:00', fase: 'grupos', grupo: 'E' },
    { id: 'e6', local: 'Ecuador', localFlag: 'EC', visit: 'Alemania', visitFlag: 'DE', sede: 'Estadio Philadelphia', hora: '2026-06-25T18:00:00', fase: 'grupos', grupo: 'E' },

    // --- GRUPO F ---
    { id: 'f1', local: 'Países Bajos', localFlag: 'NL', visit: 'Japón', visitFlag: 'JP', sede: 'Estadio Dallas', hora: '2026-06-14T14:00:00', fase: 'grupos', grupo: 'F' },
    { id: 'f2', local: 'Suecia', localFlag: 'SE', visit: 'Túnez', visitFlag: 'TN', sede: 'Estadio Monterrey', hora: '2026-06-14T20:00:00', fase: 'grupos', grupo: 'F' },
    { id: 'f3', local: 'Países Bajos', localFlag: 'NL', visit: 'Suecia', visitFlag: 'SE', sede: 'Estadio Houston', hora: '2026-06-20T11:00:00', fase: 'grupos', grupo: 'F' },
    { id: 'f4', local: 'Túnez', localFlag: 'TN', visit: 'Japón', visitFlag: 'JP', sede: 'Estadio Monterrey', hora: '2026-06-20T22:00:00', fase: 'grupos', grupo: 'F' },
    { id: 'f5', local: 'Túnez', localFlag: 'TN', visit: 'Países Bajos', visitFlag: 'NL', sede: 'Estadio Dallas', hora: '2026-06-25T20:00:00', fase: 'grupos', grupo: 'F' },
    { id: 'f6', local: 'Japón', localFlag: 'JP', visit: 'Suecia', visitFlag: 'SE', sede: 'Estadio Guadalajara', hora: '2026-06-25T20:00:00', fase: 'grupos', grupo: 'F' },

    // --- GRUPO G ---
    { id: 'g1', local: 'Bélgica', localFlag: 'BE', visit: 'Egipto', visitFlag: 'EG', sede: 'Estadio Seattle', hora: '2026-06-15T13:00:00', fase: 'grupos', grupo: 'G' },
    { id: 'g2', local: 'Irán', localFlag: 'IR', visit: 'N. Zelanda', visitFlag: 'NZ', sede: 'Estadio Los Angeles', hora: '2026-06-15T19:00:00', fase: 'grupos', grupo: 'G' },
    { id: 'g3', local: 'Bélgica', localFlag: 'BE', visit: 'Irán', visitFlag: 'IR', sede: 'Estadio Los Angeles', hora: '2026-06-21T13:00:00', fase: 'grupos', grupo: 'G' },
    { id: 'g4', local: 'N. Zelanda', localFlag: 'NZ', visit: 'Egipto', visitFlag: 'EG', sede: 'Estadio Vancouver', hora: '2026-06-21T19:00:00', fase: 'grupos', grupo: 'G' },
    { id: 'g5', local: 'Egipto', localFlag: 'EG', visit: 'Irán', visitFlag: 'IR', sede: 'Estadio San Francisco', hora: '2026-06-26T15:00:00', fase: 'grupos', grupo: 'G' },
    { id: 'g6', local: 'N. Zelanda', localFlag: 'NZ', visit: 'Bélgica', visitFlag: 'BE', sede: 'Estadio Seattle', hora: '2026-06-26T15:00:00', fase: 'grupos', grupo: 'G' },

    // --- GRUPO H ---
    { id: 'h1', local: 'España', localFlag: 'ES', visit: 'Cabo Verde', visitFlag: 'CV', sede: 'Estadio Atlanta', hora: '2026-06-15T10:00:00', fase: 'grupos', grupo: 'H' },
    { id: 'h2', local: 'Arabia Saudita', localFlag: 'SA', visit: 'Uruguay', visitFlag: 'UY', sede: 'Estadio Miami', hora: '2026-06-15T16:00:00', fase: 'grupos', grupo: 'H' },
    { id: 'h3', local: 'España', localFlag: 'ES', visit: 'Arabia Saudita', visitFlag: 'SA', sede: 'Estadio Atlanta', hora: '2026-06-21T10:00:00', fase: 'grupos', grupo: 'H' },
    { id: 'h4', local: 'Uruguay', localFlag: 'UY', visit: 'Cabo Verde', visitFlag: 'CV', sede: 'Estadio Miami', hora: '2026-06-21T16:00:00', fase: 'grupos', grupo: 'H' },
    { id: 'h5', local: 'Cabo Verde', localFlag: 'CV', visit: 'Arabia Saudita', visitFlag: 'SA', sede: 'Estadio Houston', hora: '2026-06-26T19:00:00', fase: 'grupos', grupo: 'H' },
    { id: 'h6', local: 'Uruguay', localFlag: 'UY', visit: 'España', visitFlag: 'ES', sede: 'Estadio Miami', hora: '2026-06-26T19:00:00', fase: 'grupos', grupo: 'H' },

    // --- GRUPO I ---
    { id: 'i1', local: 'Francia', localFlag: 'FR', visit: 'Senegal', visitFlag: 'SN', sede: 'Estadio New York', hora: '2026-06-16T13:00:00', fase: 'grupos', grupo: 'I' },
    { id: 'i2', local: 'Irak', localFlag: 'IQ', visit: 'Noruega', visitFlag: 'NO', sede: 'Estadio Boston', hora: '2026-06-16T16:00:00', fase: 'grupos', grupo: 'I' },
    { id: 'i3', local: 'Francia', localFlag: 'FR', visit: 'Irak', visitFlag: 'IQ', sede: 'Estadio Philadelphia', hora: '2026-06-22T14:00:00', fase: 'grupos', grupo: 'I' },
    { id: 'i4', local: 'Noruega', localFlag: 'NO', visit: 'Senegal', visitFlag: 'SN', sede: 'Estadio New York', hora: '2026-06-22T18:00:00', fase: 'grupos', grupo: 'I' },
    { id: 'i5', local: 'Senegal', localFlag: 'SN', visit: 'Irak', visitFlag: 'IQ', sede: 'Estadio Toronto', hora: '2026-06-27T13:00:00', fase: 'grupos', grupo: 'I' },
    { id: 'i6', local: 'Noruega', localFlag: 'NO', visit: 'Francia', visitFlag: 'FR', sede: 'Estadio Boston', hora: '2026-06-27T13:00:00', fase: 'grupos', grupo: 'I' },

    // --- GRUPO J ---
    { id: 'j1', local: 'Argentina', localFlag: 'AR', visit: 'Argelia', visitFlag: 'DZ', sede: 'Estadio Kansas City', hora: '2026-06-16T19:00:00', fase: 'grupos', grupo: 'J' },
    { id: 'j2', local: 'Austria', localFlag: 'AT', visit: 'Jordania', visitFlag: 'JO', sede: 'Estadio San Francisco', hora: '2026-06-16T22:00:00', fase: 'grupos', grupo: 'J' },
    { id: 'j3', local: 'Argentina', localFlag: 'AR', visit: 'Austria', visitFlag: 'AT', sede: 'Estadio Dallas', hora: '2026-06-22T20:00:00', fase: 'grupos', grupo: 'J' },
    { id: 'j4', local: 'Jordania', localFlag: 'JO', visit: 'Argelia', visitFlag: 'DZ', sede: 'Estadio Kansas City', hora: '2026-06-23T14:00:00', fase: 'grupos', grupo: 'J' },
    { id: 'j5', local: 'Argelia', localFlag: 'DZ', visit: 'Austria', visitFlag: 'AT', sede: 'Estadio Monterrey', hora: '2026-06-27T17:00:00', fase: 'grupos', grupo: 'J' },
    { id: 'j6', local: 'Jordania', localFlag: 'JO', visit: 'Argentina', visitFlag: 'AR', sede: 'Estadio Guadalajara', hora: '2026-06-27T17:00:00', fase: 'grupos', grupo: 'J' },

    // --- GRUPO K ---
    { id: 'k1', local: 'Portugal', localFlag: 'PT', visit: 'R.D. Congo', visitFlag: 'CD', sede: 'Estadio Houston', hora: '2026-06-17T11:00:00', fase: 'grupos', grupo: 'K' },
    { id: 'k2', local: 'Uzbekistán', localFlag: 'UZ', visit: 'Colombia', visitFlag: 'CO', sede: 'Estadio Azteca', hora: '2026-06-17T20:00:00', fase: 'grupos', grupo: 'K' },
    { id: 'k3', local: 'Portugal', localFlag: 'PT', visit: 'Uzbekistán', visitFlag: 'UZ', sede: 'Estadio Monterrey', hora: '2026-06-23T14:00:00', fase: 'grupos', grupo: 'K' },
    { id: 'k4', local: 'Colombia', localFlag: 'CO', visit: 'R.D. Congo', visitFlag: 'CD', sede: 'Estadio Azteca', hora: '2026-06-23T18:00:00', fase: 'grupos', grupo: 'K' },
    { id: 'k5', local: 'R.D. Congo', localFlag: 'CD', visit: 'Uzbekistán', visitFlag: 'UZ', sede: 'Estadio Guadalajara', hora: '2026-06-28T15:00:00', fase: 'grupos', grupo: 'K' },
    { id: 'k6', local: 'Colombia', localFlag: 'CO', visit: 'Portugal', visitFlag: 'PT', sede: 'Estadio Azteca', hora: '2026-06-28T15:00:00', fase: 'grupos', grupo: 'K' },

    // --- GRUPO L ---
    { id: 'l1', local: 'Inglaterra', localFlag: 'GB-ENG', visit: 'Croacia', visitFlag: 'HR', sede: 'Estadio Dallas', hora: '2026-06-17T14:00:00', fase: 'grupos', grupo: 'L' },
    { id: 'l2', local: 'Ghana', localFlag: 'GH', visit: 'Panamá', visitFlag: 'PA', sede: 'Estadio Toronto', hora: '2026-06-17T17:00:00', fase: 'grupos', grupo: 'L' },
    { id: 'l3', local: 'Inglaterra', localFlag: 'GB-ENG', visit: 'Ghana', visitFlag: 'GH', sede: 'Estadio Boston', hora: '2026-06-23T20:00:00', fase: 'grupos', grupo: 'L' },
    { id: 'l4', local: 'Panamá', localFlag: 'PA', visit: 'Croacia', visitFlag: 'HR', sede: 'Estadio Toronto', hora: '2026-06-24T13:00:00', fase: 'grupos', grupo: 'L' },
    { id: 'l5', local: 'Croacia', localFlag: 'HR', visit: 'Ghana', visitFlag: 'GH', sede: 'Estadio Boston', hora: '2026-06-28T19:00:00', fase: 'grupos', grupo: 'L' },
    { id: 'l6', local: 'Panamá', localFlag: 'PA', visit: 'Inglaterra', visitFlag: 'GB-ENG', sede: 'Estadio New York', hora: '2026-06-28T19:00:00', fase: 'grupos', grupo: 'L' },

    // ==========================================
    // LLAVES ELIMINATORIAS COMPLETAS (32 Partidos)
    // ==========================================
    
    // --- 32AVOS DE FINAL (16 Partidos Completos) ---
    { id: '32_1', local: '1A', localFlag: '🏳️', visit: '3C/D/E/F', visitFlag: '🏳️', sede: 'Los Angeles', hora: '2026-06-29T15:00:00', fase: '32avos' },
    { id: '32_2', local: '2A', localFlag: '🏳️', visit: '2B', visitFlag: '🏳️', sede: 'Dallas', hora: '2026-06-29T19:00:00', fase: '32avos' },
    { id: '32_3', local: '1B', localFlag: '🏳️', visit: '3A/C/D/F', visitFlag: '🏳️', sede: 'Miami', hora: '2026-06-30T16:00:00', fase: '32avos' },
    { id: '32_4', local: '1C', localFlag: '🏳️', visit: '2D', visitFlag: '🏳️', sede: 'New York', hora: '2026-06-30T20:00:00', fase: '32avos' },
    { id: '32_5', local: '1D', localFlag: '🏳️', visit: '3A/B/E/F', visitFlag: '🏳️', sede: 'Boston', hora: '2026-07-01T14:00:00', fase: '32avos' },
    { id: '32_6', local: '1E', localFlag: '🏳️', visit: '2F', visitFlag: '🏳️', sede: 'CDMX', hora: '2026-07-01T18:00:00', fase: '32avos' },
    { id: '32_7', local: '1F', localFlag: '🏳️', visit: '2E', visitFlag: '🏳️', sede: 'Atlanta', hora: '2026-07-02T15:00:00', fase: '32avos' },
    { id: '32_8', local: '1G', localFlag: '🏳️', visit: '3H/I/J/K', visitFlag: '🏳️', sede: 'Houston', hora: '2026-07-02T19:00:00', fase: '32avos' },
    { id: '32_9', local: '1H', localFlag: '🏳️', visit: '2G', visitFlag: '🏳️', sede: 'San Francisco', hora: '2026-07-03T14:00:00', fase: '32avos' },
    { id: '32_10', local: '1I', localFlag: '🏳️', visit: '3G/H/J/K', visitFlag: '🏳️', sede: 'Seattle', hora: '2026-07-03T18:00:00', fase: '32avos' },
    { id: '32_11', local: '1J', localFlag: '🏳️', visit: '2K', visitFlag: '🏳️', sede: 'Kansas City', hora: '2026-07-04T13:00:00', fase: '32avos' },
    { id: '32_12', local: '1K', localFlag: '🏳️', visit: '2J', visitFlag: '🏳️', sede: 'Philadelphia', hora: '2026-07-04T17:00:00', fase: '32avos' },
    { id: '32_13', local: '1L', localFlag: '🏳️', visit: '3A/B/G/H', visitFlag: '🏳️', sede: 'Toronto', hora: '2026-07-05T14:00:00', fase: '32avos' },
    { id: '32_14', local: '2L', localFlag: '🏳️', visit: '2I', visitFlag: '🏳️', sede: 'Boston', hora: '2026-07-05T18:00:00', fase: '32avos' },
    { id: '32_15', local: '2C', localFlag: '🏳️', visit: '2H', visitFlag: '🏳️', sede: 'Monterrey', hora: '2026-07-06T15:00:00', fase: '32avos' },
    { id: '32_16', local: '1L', localFlag: '🏳️', visit: '2A', visitFlag: '🏳️', sede: 'Vancouver', hora: '2026-07-06T19:00:00', fase: '32avos' },

    // --- 16AVOS DE FINAL (8 Partidos Completos) ---
    { id: '16_1', local: 'Ganador 32_1', localFlag: '🏳️', visit: 'Ganador 32_2', visitFlag: '🏳️', sede: 'New York', hora: '2026-07-09T16:00:00', fase: '16avos' },
    { id: '16_2', local: 'Ganador 32_3', localFlag: '🏳️', visit: 'Ganador 32_4', visitFlag: '🏳️', sede: 'Philadelphia', hora: '2026-07-09T20:00:00', fase: '16avos' },
    { id: '16_3', local: 'Ganador 32_5', localFlag: '🏳️', visit: 'Ganador 32_6', visitFlag: '🏳️', sede: 'Houston', hora: '2026-07-10T15:00:00', fase: '16avos' },
    { id: '16_4', local: 'Ganador 32_7', localFlag: '🏳️', visit: 'Ganador 32_8', visitFlag: '🏳️', sede: 'Guadalajara', hora: '2026-07-10T19:00:00', fase: '16avos' },
    { id: '16_5', local: 'Ganador 32_9', localFlag: '🏳️', visit: 'Ganador 32_10', visitFlag: '🏳️', sede: 'Los Angeles', hora: '2026-07-11T14:00:00', fase: '16avos' },
    { id: '16_6', local: 'Ganador 32_11', localFlag: '🏳️', visit: 'Ganador 32_12', visitFlag: '🏳️', sede: 'Miami', hora: '2026-07-11T18:00:00', fase: '16avos' },
    { id: '16_7', local: 'Ganador 32_13', localFlag: '🏳️', visit: 'Ganador 32_14', visitFlag: '🏳️', sede: 'Seattle', hora: '2026-07-12T15:00:00', fase: '16avos' },
    { id: '16_8', local: 'Ganador 32_15', localFlag: '🏳️', visit: 'Ganador 32_16', visitFlag: '🏳️', sede: 'CDMX', hora: '2026-07-12T19:00:00', fase: '16avos' },

    // --- CUARTOS DE FINAL (4 Partidos Completos) ---
    { id: '4_1', local: 'Ganador 16_1', localFlag: '🏳️', visit: 'Ganador 16_2', visitFlag: '🏳️', sede: 'Boston', hora: '2026-07-15T16:00:00', fase: 'cuartos' },
    { id: '4_2', local: 'Ganador 16_3', localFlag: '🏳️', visit: 'Ganador 16_4', visitFlag: '🏳️', sede: 'Los Angeles', hora: '2026-07-15T20:00:00', fase: 'cuartos' },
    { id: '4_3', local: 'Ganador 16_5', localFlag: '🏳️', visit: 'Ganador 16_6', visitFlag: '🏳️', sede: 'Kansas City', hora: '2026-07-16T17:00:00', fase: 'cuartos' },
    { id: '4_4', local: 'Ganador 16_7', localFlag: '🏳️', visit: 'Ganador 16_8', visitFlag: '🏳️', sede: 'Miami', hora: '2026-07-16T21:00:00', fase: 'cuartos' },

    // --- SEMIFINALES (2 Partidos completos) ---
    { id: 'semi_1', local: 'Ganador 4_1', localFlag: '🏳️', visit: 'Ganador 4_2', visitFlag: '🏳️', sede: 'Dallas', hora: '2026-07-18T19:00:00', fase: 'semis' },
    { id: 'semi_2', local: 'Ganador 4_3', localFlag: '🏳️', visit: 'Ganador 4_4', visitFlag: '🏳️', sede: 'Atlanta', hora: '2026-07-19T19:00:00', fase: 'semis' },

    // --- FINAL ---
    { id: 'tercer_lugar', local: 'Perdedor S1', localFlag: '🏳️', visit: 'Perdedor S2', visitFlag: '🏳️', sede: 'Miami', hora: '2026-07-25T16:00:00', fase: 'final' },
    { id: 'gran_final', local: 'Ganador S1', localFlag: '🏳️', visit: 'Ganador S2', visitFlag: '🏳️', sede: 'New York', hora: '2026-07-26T15:00:00', fase: 'final' }
];

window.partidosMundial = partidosMundial;
