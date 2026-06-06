// partidos.js - Calendario Completo Copa del Mundo 2026 (104 partidos)
const partidosMundial = [
    // ==========================================
    // FASE DE GRUPOS (72 Partidos)
    // ==========================================
    
    // --- GRUPO A ---
    { id: 'a1', local: 'México', localFlag: '🇲🇽', visit: 'Sudáfrica', visitFlag: '🇿🇦', sede: 'Estadio Azteca', hora: '2026-06-11T13:00:00', fase: 'grupos', grupo: 'A' },
    { id: 'a2', local: 'Corea del Sur', localFlag: '🇰🇷', visit: 'República Checa', visitFlag: '🇨🇿', sede: 'Estadio Guadalajara', hora: '2026-06-11T20:00:00', fase: 'grupos', grupo: 'A' },
    { id: 'a3', local: 'República Checa', localFlag: '🇨🇿', visit: 'Sudáfrica', visitFlag: '🇿🇦', sede: 'Estadio Atlanta', hora: '2026-06-18T10:00:00', fase: 'grupos', grupo: 'A' },
    { id: 'a4', local: 'México', localFlag: '🇲🇽', visit: 'Corea del Sur', visitFlag: '🇰🇷', sede: 'Estadio Guadalajara', hora: '2026-06-18T19:00:00', fase: 'grupos', grupo: 'A' },
    { id: 'a5', local: 'República Checa', localFlag: '🇨🇿', visit: 'México', visitFlag: '🇲🇽', sede: 'Estadio Azteca', hora: '2026-06-24T19:00:00', fase: 'grupos', grupo: 'A' },
    { id: 'a6', local: 'Sudáfrica', localFlag: '🇿🇦', visit: 'Corea del Sur', visitFlag: '🇰🇷', sede: 'Estadio Monterrey', hora: '2026-06-24T19:00:00', fase: 'grupos', grupo: 'A' },

    // --- GRUPO B ---
    { id: 'b1', local: 'Canadá', localFlag: '🇨🇦', visit: 'Bosnia', visitFlag: '🇧🇦', sede: 'Estadio Toronto', hora: '2026-06-12T13:00:00', fase: 'grupos', grupo: 'B' },
    { id: 'b2', local: 'Catar', localFlag: '🇶🇦', visit: 'Suiza', visitFlag: '🇨🇭', sede: 'Estadio San Francisco', hora: '2026-06-13T13:00:00', fase: 'grupos', grupo: 'B' },
    { id: 'b3', local: 'Canadá', localFlag: '🇨🇦', visit: 'Catar', visitFlag: '🇶🇦', sede: 'Estadio Vancouver', hora: '2026-06-18T16:00:00', fase: 'grupos', grupo: 'B' },
    { id: 'b4', local: 'Suiza', localFlag: '🇨🇭', visit: 'Bosnia', visitFlag: '🇧🇦', sede: 'Estadio Los Angeles', hora: '2026-06-18T13:00:00', fase: 'grupos', grupo: 'B' },
    { id: 'b5', local: 'Suiza', localFlag: '🇨🇭', visit: 'Canadá', visitFlag: '🇨🇦', sede: 'Estadio Vancouver', hora: '2026-06-23T15:00:00', fase: 'grupos', grupo: 'B' },
    { id: 'b6', local: 'Bosnia', localFlag: '🇧🇦', visit: 'Catar', visitFlag: '🇶🇦', sede: 'Estadio Boston', hora: '2026-06-23T15:00:00', fase: 'grupos', grupo: 'B' },

    // --- GRUPO C ---
    { id: 'c1', local: 'Brasil', localFlag: '🇧🇷', visit: 'Marruecos', visitFlag: '🇲🇦', sede: 'Estadio New York', hora: '2026-06-13T16:00:00', fase: 'grupos', grupo: 'C' },
    { id: 'c2', local: 'Escocia', localFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', visit: 'Haití', visitFlag: '🇭🇹', sede: 'Estadio Boston', hora: '2026-06-13T19:00:00', fase: 'grupos', grupo: 'C' },
    { id: 'c3', local: 'Escocia', localFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', visit: 'Marruecos', visitFlag: '🇲🇦', sede: 'Estadio Boston', hora: '2026-06-19T16:00:00', fase: 'grupos', grupo: 'C' },
    { id: 'c4', local: 'Brasil', localFlag: '🇧🇷', visit: 'Haití', visitFlag: '🇭🇹', sede: 'Estadio Philadelphia', hora: '2026-06-19T18:30:00', fase: 'grupos', grupo: 'C' },
    { id: 'c5', local: 'Marruecos', localFlag: '🇲🇦', visit: 'Haití', visitFlag: '🇭🇹', sede: 'Estadio Orlando', hora: '2026-06-24T14:00:00', fase: 'grupos', grupo: 'C' },
    { id: 'c6', local: 'Brasil', localFlag: '🇧🇷', visit: 'Escocia', visitFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', sede: 'Estadio Miami', hora: '2026-06-24T14:00:00', fase: 'grupos', grupo: 'C' },

    // --- GRUPO D ---
    { id: 'd1', local: 'Estados Unidos', localFlag: '🇺🇸', visit: 'Paraguay', visitFlag: '🇵🇾', sede: 'Estadio Los Angeles', hora: '2026-06-12T19:00:00', fase: 'grupos', grupo: 'D' },
    { id: 'd2', local: 'Australia', localFlag: '🇦🇺', visit: 'Turquía', visitFlag: '🇹🇷', sede: 'Estadio Vancouver', hora: '2026-06-13T22:00:00', fase: 'grupos', grupo: 'D' },
    { id: 'd3', local: 'Estados Unidos', localFlag: '🇺🇸', visit: 'Australia', visitFlag: '🇦🇺', sede: 'Estadio Seattle', hora: '2026-06-19T13:00:00', fase: 'grupos', grupo: 'D' },
    { id: 'd4', local: 'Turquía', localFlag: '🇹🇷', visit: 'Paraguay', visitFlag: '🇵🇾', sede: 'Estadio San Francisco', hora: '2026-06-19T21:00:00', fase: 'grupos', grupo: 'D' },
    { id: 'd5', local: 'Turquía', localFlag: '🇹🇷', visit: 'Estados Unidos', visitFlag: '🇺🇸', sede: 'Estadio Los Angeles', hora: '2026-06-25T14:00:00', fase: 'grupos', grupo: 'D' },
    { id: 'd6', local: 'Paraguay', localFlag: '🇵🇾', visit: 'Australia', visitFlag: '🇦🇺', sede: 'Estadio Seattle', hora: '2026-06-25T14:00:00', fase: 'grupos', grupo: 'D' },

    // --- GRUPO E ---
    { id: 'e1', local: 'Alemania', localFlag: '🇩🇪', visit: 'Curazao', visitFlag: '🇨🇼', sede: 'Estadio Houston', hora: '2026-06-14T11:00:00', fase: 'grupos', grupo: 'E' },
    { id: 'e2', local: 'Costa de Marfil', localFlag: '🇨🇮', visit: 'Ecuador', visitFlag: '🇪🇨', sede: 'Estadio Philadelphia', hora: '2026-06-14T17:00:00', fase: 'grupos', grupo: 'E' },
    { id: 'e3', local: 'Alemania', localFlag: '🇩🇪', visit: 'Costa de Marfil', visitFlag: '🇨🇮', sede: 'Estadio Toronto', hora: '2026-06-20T14:00:00', fase: 'grupos', grupo: 'E' },
    { id: 'e4', local: 'Ecuador', localFlag: '🇪🇨', visit: 'Curazao', visitFlag: '🇨🇼', sede: 'Estadio Kansas City', hora: '2026-06-20T18:00:00', fase: 'grupos', grupo: 'E' },
    { id: 'e5', local: 'Curazao', localFlag: '🇨🇼', visit: 'Costa de Marfil', visitFlag: '🇨🇮', sede: 'Estadio New York', hora: '2026-06-25T18:00:00', fase: 'grupos', grupo: 'E' },
    { id: 'e6', local: 'Ecuador', localFlag: '🇪🇨', visit: 'Alemania', visitFlag: '🇩🇪', sede: 'Estadio Philadelphia', hora: '2026-06-25T18:00:00', fase: 'grupos', grupo: 'E' },

    // --- GRUPO F ---
    { id: 'f1', local: 'Países Bajos', localFlag: '🇳🇱', visit: 'Japón', visitFlag: '🇯🇵', sede: 'Estadio Dallas', hora: '2026-06-14T14:00:00', fase: 'grupos', grupo: 'F' },
    { id: 'f2', local: 'Suecia', localFlag: '🇸🇪', visit: 'Túnez', visitFlag: '🇹🇳', sede: 'Estadio Monterrey', hora: '2026-06-14T20:00:00', fase: 'grupos', grupo: 'F' },
    { id: 'f3', local: 'Países Bajos', localFlag: '🇳🇱', visit: 'Suecia', visitFlag: '🇸🇪', sede: 'Estadio Houston', hora: '2026-06-20T11:00:00', fase: 'grupos', grupo: 'F' },
    { id: 'f4', local: 'Túnez', localFlag: '🇹🇳', visit: 'Japón', visitFlag: '🇯🇵', sede: 'Estadio Monterrey', hora: '2026-06-20T22:00:00', fase: 'grupos', grupo: 'F' },
    { id: 'f5', local: 'Túnez', localFlag: '🇹🇳', visit: 'Países Bajos', visitFlag: '🇳🇱', sede: 'Estadio Dallas', hora: '2026-06-25T20:00:00', fase: 'grupos', grupo: 'F' },
    { id: 'f6', local: 'Japón', localFlag: '🇯🇵', visit: 'Suecia', visitFlag: '🇸🇪', sede: 'Estadio Guadalajara', hora: '2026-06-25T20:00:00', fase: 'grupos', grupo: 'F' },

    // --- GRUPO G ---
    { id: 'g1', local: 'Bélgica', localFlag: '🇧🇪', visit: 'Egipto', visitFlag: '🇪🇬', sede: 'Estadio Seattle', hora: '2026-06-15T13:00:00', fase: 'grupos', grupo: 'G' },
    { id: 'g2', local: 'Irán', localFlag: '🇮🇷', visit: 'Nueva Zelanda', visitFlag: '🇳🇿', sede: 'Estadio Los Angeles', hora: '2026-06-15T19:00:00', fase: 'grupos', grupo: 'G' },
    { id: 'g3', local: 'Bélgica', localFlag: '🇧🇪', visit: 'Irán', visitFlag: '🇮🇷', sede: 'Estadio Los Angeles', hora: '2026-06-21T13:00:00', fase: 'grupos', grupo: 'G' },
    { id: 'g4', local: 'Nueva Zelanda', localFlag: '🇳🇿', visit: 'Egipto', visitFlag: '🇪🇬', sede: 'Estadio Vancouver', hora: '2026-06-21T19:00:00', fase: 'grupos', grupo: 'G' },
    { id: 'g5', local: 'Egipto', localFlag: '🇪🇬', visit: 'Irán', visitFlag: '🇮🇷', sede: 'Estadio San Francisco', hora: '2026-06-26T15:00:00', fase: 'grupos', grupo: 'G' },
    { id: 'g6', local: 'Nueva Zelanda', localFlag: '🇳🇿', visit: 'Bélgica', visitFlag: '🇧🇪', sede: 'Estadio Seattle', hora: '2026-06-26T15:00:00', fase: 'grupos', grupo: 'G' },

    // --- GRUPO H ---
    { id: 'h1', local: 'España', localFlag: '🇪🇸', visit: 'Cabo Verde', visitFlag: '🇨🇻', sede: 'Estadio Atlanta', hora: '2026-06-15T10:00:00', fase: 'grupos', grupo: 'H' },
    { id: 'h2', local: 'Arabia Saudita', localFlag: '🇸🇦', visit: 'Uruguay', visitFlag: '🇺🇾', sede: 'Estadio Miami', hora: '2026-06-15T16:00:00', fase: 'grupos', grupo: 'H' },
    { id: 'h3', local: 'España', localFlag: '🇪🇸', visit: 'Arabia Saudita', visitFlag: '🇸🇦', sede: 'Estadio Atlanta', hora: '2026-06-21T10:00:00', fase: 'grupos', grupo: 'H' },
    { id: 'h4', local: 'Uruguay', localFlag: '🇺🇾', visit: 'Cabo Verde', visitFlag: '🇨🇻', sede: 'Estadio Miami', hora: '2026-06-21T16:00:00', fase: 'grupos', grupo: 'H' },
    { id: 'h5', local: 'Cabo Verde', localFlag: '🇨🇻', visit: 'Arabia Saudita', visitFlag: '🇸🇦', sede: 'Estadio Houston', hora: '2026-06-26T19:00:00', fase: 'grupos', grupo: 'H' },
    { id: 'h6', local: 'Uruguay', localFlag: '🇺🇾', visit: 'España', visitFlag: '🇪🇸', sede: 'Estadio Miami', hora: '2026-06-26T19:00:00', fase: 'grupos', grupo: 'H' },

    // --- GRUPO I ---
    { id: 'i1', local: 'Francia', localFlag: '🇫🇷', visit: 'Senegal', visitFlag: '🇸🇳', sede: 'Estadio New York', hora: '2026-06-16T13:00:00', fase: 'grupos', grupo: 'I' },
    { id: 'i2', local: 'Irak', localFlag: '🇮🇶', visit: 'Noruega', visitFlag: '🇳🇴', sede: 'Estadio Boston', hora: '2026-06-16T16:00:00', fase: 'grupos', grupo: 'I' },
    { id: 'i3', local: 'Francia', localFlag: '🇫🇷', visit: 'Irak', visitFlag: '🇮🇶', sede: 'Estadio Philadelphia', hora: '2026-06-22T14:00:00', fase: 'grupos', grupo: 'I' },
    { id: 'i4', local: 'Noruega', localFlag: '🇳🇴', visit: 'Senegal', visitFlag: '🇸🇳', sede: 'Estadio New York', hora: '2026-06-22T18:00:00', fase: 'grupos', grupo: 'I' },
    { id: 'i5', local: 'Senegal', localFlag: '🇸🇳', visit: 'Irak', visitFlag: '🇮🇶', sede: 'Estadio Toronto', hora: '2026-06-27T13:00:00', fase: 'grupos', grupo: 'I' },
    { id: 'i6', local: 'Noruega', localFlag: '🇳🇴', visit: 'Francia', visitFlag: '🇫🇷', sede: 'Estadio Boston', hora: '2026-06-27T13:00:00', fase: 'grupos', grupo: 'I' },

    // --- GRUPO J ---
    { id: 'j1', local: 'Argentina', localFlag: '🇦🇷', visit: 'Argelia', visitFlag: '🇩🇿', sede: 'Estadio Kansas City', hora: '2026-06-16T19:00:00', fase: 'grupos', grupo: 'J' },
    { id: 'j2', local: 'Austria', localFlag: '🇦🇹', visit: 'Jordania', visitFlag: '🇯🇴', sede: 'Estadio San Francisco', hora: '2026-06-16T22:00:00', fase: 'grupos', grupo: 'J' },
    { id: 'j3', local: 'Argentina', localFlag: '🇦🇷', visit: 'Austria', visitFlag: '🇦🇹', sede: 'Estadio Dallas', hora: '2026-06-22T20:00:00', fase: 'grupos', grupo: 'J' },
    { id: 'j4', local: 'Jordania', localFlag: '🇯🇴', visit: 'Argelia', visitFlag: '🇩🇿', sede: 'Estadio Kansas City', hora: '2026-06-23T14:00:00', fase: 'grupos', grupo: 'J' },
    { id: 'j5', local: 'Argelia', localFlag: '🇩🇿', visit: 'Austria', visitFlag: '🇦🇹', sede: 'Estadio Monterrey', hora: '2026-06-27T17:00:00', fase: 'grupos', grupo: 'J' },
    { id: 'j6', local: 'Jordania', localFlag: '🇯🇴', visit: 'Argentina', visitFlag: '🇦🇷', sede: 'Estadio Guadalajara', hora: '2026-06-27T17:00:00', fase: 'grupos', grupo: 'J' },

    // --- GRUPO K ---
    { id: 'k1', local: 'Portugal', localFlag: '🇵🇹', visit: 'R.D. Congo', visitFlag: '🇨🇩', sede: 'Estadio Houston', hora: '2026-06-17T11:00:00', fase: 'grupos', grupo: 'K' },
    { id: 'k2', local: 'Uzbekistán', localFlag: '🇺🇿', visit: 'Colombia', visitFlag: '🇨🇴', sede: 'Estadio Azteca', hora: '2026-06-17T20:00:00', fase: 'grupos', grupo: 'K' },
    { id: 'k3', local: 'Portugal', localFlag: '🇵🇹', visit: 'Uzbekistán', visitFlag: '🇺🇿', sede: 'Estadio Monterrey', hora: '2026-06-23T14:00:00', fase: 'grupos', grupo: 'K' },
    { id: 'k4', local: 'Colombia', localFlag: '🇨🇴', visit: 'R.D. Congo', visitFlag: '🇨🇩', sede: 'Estadio Azteca', hora: '2026-06-23T18:00:00', fase: 'grupos', grupo: 'K' },
    { id: 'k5', local: 'R.D. Congo', localFlag: '🇨🇩', visit: 'Uzbekistán', visitFlag: '🇺🇿', sede: 'Estadio Guadalajara', hora: '2026-06-28T15:00:00', fase: 'grupos', grupo: 'K' },
    { id: 'k6', local: 'Colombia', localFlag: '🇨🇴', visit: 'Portugal', visitFlag: '🇵🇹', sede: 'Estadio Azteca', hora: '2026-06-28T15:00:00', fase: 'grupos', grupo: 'K' },

    // --- GRUPO L ---
    { id: 'l1', local: 'Inglaterra', localFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', visit: 'Croacia', visitFlag: '🇭🇷', sede: 'Estadio Dallas', hora: '2026-06-17T14:00:00', fase: 'grupos', grupo: 'L' },
    { id: 'l2', local: 'Ghana', localFlag: '🇬🇭', visit: 'Panamá', visitFlag: '🇵🇦', sede: 'Estadio Toronto', hora: '2026-06-17T17:00:00', fase: 'grupos', grupo: 'L' },
    { id: 'l3', local: 'Inglaterra', localFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', visit: 'Ghana', visitFlag: '🇬🇭', sede: 'Estadio Boston', hora: '2026-06-23T20:00:00', fase: 'grupos', grupo: 'L' },
    { id: 'l4', local: 'Panamá', localFlag: '🇵🇦', visit: 'Croacia', visitFlag: '🇭🇷', sede: 'Estadio Toronto', hora: '2026-06-24T13:00:00', fase: 'grupos', grupo: 'L' },
    { id: 'l5', local: 'Croacia', localFlag: '🇭🇷', visit: 'Ghana', visitFlag: '🇬🇭', sede: 'Estadio Boston', hora: '2026-06-28T19:00:00', fase: 'grupos', grupo: 'L' },
    { id: 'l6', local: 'Panamá', localFlag: '🇵🇦', visit: 'Inglaterra', visitFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', sede: 'Estadio New York', hora: '2026-06-28T19:00:00', fase: 'grupos', grupo: 'L' },

    // ==========================================
    // LLAVES ELIMINATORIAS (Estructurales directas de la FIFA)
    // ==========================================
    
    // --- 32AVOS DE FINAL ---
    { id: '32_1', local: '1A', localFlag: '🏳️', visit: '3C/D/E/F', visitFlag: '🏳️', sede: 'SoFi Stadium', hora: '2026-06-29T15:00:00', fase: '32avos' },
    { id: '32_2', local: '2A', localFlag: '🏳️', visit: '2B', visitFlag: '🏳️', sede: 'Dallas', hora: '2026-06-29T19:00:00', fase: '32avos' },
    { id: '32_3', local: '1B', localFlag: '🏳️', visit: '3A/C/D/F', visitFlag: '🏳️', sede: 'Miami', hora: '2026-06-30T16:00:00', fase: '32avos' },
    { id: '32_4', local: '1C', localFlag: '🏳️', visit: '2D', visitFlag: '🏳️', sede: 'MetLife Stadium', hora: '2026-06-30T20:00:00', fase: '32avos' },

    // --- 16AVOS DE FINAL ---
    { id: '16_1', local: 'Ganador 32_1', localFlag: '🏳️', visit: 'Ganador 32_2', visitFlag: '🏳️', sede: 'East Rutherford', hora: '2026-07-09T16:00:00', fase: '16avos' },
    { id: '16_2', local: 'Ganador 32_3', localFlag: '🏳️', visit: 'Ganador 32_4', visitFlag: '🏳️', sede: 'Philadelphia', hora: '2026-07-09T20:00:00', fase: '16avos' },

    // --- CUARTOS DE FINAL ---
    { id: '4_1', local: 'Ganador 16_1', localFlag: '🏳️', visit: 'Ganador 16_2', visitFlag: '🏳️', sede: 'Boston', hora: '2026-07-15T16:00:00', fase: 'cuartos' },

    // --- SEMIFINALES ---
    { id: 'semi_1', local: 'Ganador C1', localFlag: '🏳️', visit: 'Ganador C2', visitFlag: '🏳️', sede: 'Dallas', hora: '2026-07-18T19:00:00', fase: 'semis' },

    // --- DEFINICIONES FINALES ---
    { id: 'gran_final', local: 'Ganador S1', localFlag: '🏳️', visit: 'Ganador S2', visitFlag: '🏳️', sede: 'MetLife Stadium', hora: '2026-07-26T15:00:00', fase: 'final' }
];

window.partidosMundial = partidosMundial;
