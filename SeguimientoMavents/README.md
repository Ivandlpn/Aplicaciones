# 📡 Seguimiento MAVENTS · Eje Este de Alta Velocidad

Aplicación web para el seguimiento del **Contrato de Mantenimiento y Renovación de
Telecomunicaciones y Telemando de Energía** de las Líneas de Alta Velocidad
(Expediente 2.14/20506.0042 · UTE MAVENTS). Los datos corresponden a la
certificación de **junio de 2026** y provienen del cuadro de seguimiento mensual
(`JUN26_MAVENTS.xlsx`).

## Qué muestra

Un panel de control (dashboard) con cinco vistas:

| Vista | Contenido |
|-------|-----------|
| **Resumen** | KPIs principales (avance preventivo anual, incidencias del mes, tiempo medio de reparación, consumo de fiabilidad) + gráficos de avance por red, incidencias por técnica y evolución histórica. |
| **Incidencias** | Detalle mensual por técnica (TFJ, GSM-R, OP, VCA, TME) e imputación (propias / preventivo / ajenas / a terceros), reparto por imputación, tiempo medio de reparación vs nº de incidencias, y el histórico por categoría (2024–2026). |
| **Preventivos** | Preventivo anual previsto vs realizado por red, grado de consecución acumulado, y ejecución semanal por centro de mantenimiento (CM1 Villarrubia, CM2 Cuenca, CM3 Requena, CM4 Albacete). |
| **Fiabilidad** | Consumo del año frente al máximo permitido por técnica, incidencias imputables del mes y avance acumulado con margen pendiente. |
| **PAT Anual** | Programación Anual de Trabajos: consecución acumulada por subsistema y detalle mensual de actuaciones programadas / realizadas. |

## Cómo ejecutarla

Es una aplicación estática (HTML + CSS + JS). Al usar `fetch()` para cargar
`data.json`, necesita servirse mediante un servidor local (no abrir el archivo
directamente con `file://`):

```bash
cd SeguimientoMavents
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Estructura

```
SeguimientoMavents/
├── index.html          # Estructura y navegación
├── style.css           # Estilos (tema oscuro)
├── script.js           # Lógica y gráficos
├── data.json           # Datos extraídos del Excel de seguimiento
└── README.md
```

Los gráficos usan **Chart.js 4.4.1** cargado desde CDN (`cdn.jsdelivr.net`),
igual que el resto de aplicaciones del repositorio.

## Actualizar los datos

Cada mes basta con regenerar `data.json` a partir del Excel de seguimiento
manteniendo la misma estructura de claves (`contrato`, `incidencias_mes`,
`historico_incidencias`, `tiempos`, `preventivo_mes`, `preventivo_anual`,
`preventivo_centros`, `fiabilidad`, `fiabilidad_avance`, `pat`). La interfaz se
adapta automáticamente a los nuevos valores.
