# 🏆 Quiniela Automatizada - Copa del Mundo 2026

Plataforma web serverless, responsiva y en tiempo real para capturar y administrar los pronósticos de los partidos del Mundial 2026. Diseñada con un frontend dinámico que calcula automáticamente las posiciones de los grupos y avanza las llaves de las siguientes fases eliminatorias sin intervención manual.

## ✨ Características Principales

*   **📱 Diseño Multiplataforma:** Interfaz adaptativa optimizada al 100% para computadoras, tablets y dispositivos móviles usando Tailwind CSS.
*   **🔐 Autenticación Flexible:** Inicio de sesión seguro mediante cuentas de Google (por redirección nativa) o mediante el método tradicional de Correo y Contraseña.
*   **🕒 Regla Estricta del Cierre (15 Minutos Antes):** Los campos de captura de marcadores se deshabilitan automáticamente 15 minutos antes del pitazo inicial de cada partido.
*   **📊 Tabla de Posiciones Global:** Pestaña con el ranking en vivo de todos los participantes ordenados por puntuación acumulada.
*   **📡 Marcadores en Tiempo Real:** Sección "En Vivo" conectada de forma reactiva a la base de datos para mostrar los resultados oficiales conforme ocurren en el estadio.
*   **🧠 Motor de Avance Automatizado:** Calcula las matemáticas de los grupos en tiempo real (Puntos y Diferencia de Goles). Al definirse las posiciones, el sistema sustituye los marcadores lógicos (ej: `1A`, `2B`) por los países reales en las fases eliminatorias (16avos, 8vos, etc.).

---

## 🧮 Reglamento de Puntuación

El sistema actualiza las estadísticas de los participantes al finalizar cada jornada bajo los siguientes criterios:

| Acierto | Descripción | Puntos |
| :--- | :--- | :---: |
| **Marcador Exacto** | Atinarle al número de goles exacto de ambos equipos. | **5 pts** |
| **Ganador** | Atinarle al equipo que gana el partido (pero no al marcador exacto). | **3 pts** |
| **Empate** | Atinarle a que el partido queda en empate (pero no al marcador exacto). | **1 pt** |
| **Sin Pronóstico** | No guardar un marcador antes del tiempo límite. | **0 pts** |

---

## 🛠️ Arquitectura Tecnológica

*   **Frontend:** HTML5, CSS3 (Tailwind CSS CDN), JavaScript Async (ES6+ Modules).
*   **Backend & DB:** Firebase Authentication & Firebase Firestore (Nube en tiempo real).
*   **Hosting:** Vercel (Plataforma estática de alto rendimiento).

---

## 🚀 Guía de Despliegue Rápido (Vercel + Firebase)

### 1. Preparación del Código
1. Modifica las credenciales del objeto `firebaseConfig` dentro del archivo `index.html` con las llaves provistas por tu consola de Firebase.
2. Coloca el archivo `index.html` dentro de una carpeta local en tu computadora llamada `quiniela-app`.

### 2. Alojar en Vercel (Gratis)
1. Inicia sesión en [Vercel](https://vercel.com/).
2. Ve de forma directa a [vercel.com/new](https://vercel.com/new).
3. En la sección inferior, arrastra y suelta la carpeta completa `quiniela-app` en el recuadro gris punteado.
4. Asigna un nombre al proyecto y haz clic en **Deploy**.
5. Copia la URL pública generada (ej: `https://tu-quiniela.vercel.app`).

### 3. Autorizar el Dominio en Firebase
1. Ve a tu **Firebase Console > Authentication > pestaña Settings**.
2. En la sección **Authorized Domains (Dominios autorizados)**, haz clic en **Add Domain**.
3. Pega la URL que te otorgó Vercel y guarda los cambios.

---

## 🗄️ Estructura de Datos para Simulación (Firestore)

Para ingresar marcadores reales del mundial y ver la magia del avance automático, debes crear la siguiente estructura en tu base de datos:

*   **Colección:** `partidos_en_vivo`
    *   **ID del Documento:** Debe coincidir con el ID del partido en el código (ej: `g1` para México vs Francia).
    *   **Campos:**
        *   `golesL` (Number o String): Goles anotados por el equipo local.
        *   `golesV` (Number o String): Goles anotados por el equipo visitante.

*¡Al actualizar estos campos en la base de datos, todos los usuarios verán reflejados los cambios en vivo en sus pantallas y las tablas eliminatorias se recalcularán de inmediato!*
