/* Seguimiento de proyecto · UTE MAVENTS — Eje Este de Alta Velocidad */

const C = {
  text: '#eaf0fb', muted: '#93a3c4', grid: 'rgba(147,163,196,.14)',
  accent: '#3b82f6', accent2: '#22d3ee', green: '#22c55e',
  amber: '#f59e0b', red: '#ef4444', violet: '#a78bfa', pink: '#f472b6'
};
const PALETTE = [C.accent, C.accent2, C.violet, C.amber, C.green, C.pink, C.red];
const charts = {};
let DATA = null;

const MES_ES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const fmtMes = (s) => { const [y,m] = s.split('-'); return `${MES_ES[+m-1]} ${y.slice(2)}`; };
const pct = (v) => (v == null || isNaN(v)) ? '—' : (v * 100).toFixed(1) + '%';
const nz = (v) => (v == null || v === '' || isNaN(v)) ? 0 : v;

Chart.defaults.color = C.muted;
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.boxWidth = 8;
Chart.defaults.plugins.legend.labels.padding = 14;

function mkChart(id, cfg) {
  if (charts[id]) charts[id].destroy();
  const el = document.getElementById(id);
  if (!el) return;
  charts[id] = new Chart(el, cfg);
}

const gridScale = (extra = {}) => ({
  grid: { color: C.grid, drawBorder: false }, ...extra
});

/* ---------- Bootstrap ---------- */
fetch('data.json')
  .then(r => r.json())
  .then(d => { DATA = d; init(); })
  .catch(err => {
    document.querySelector('.content').insertAdjacentHTML('afterbegin',
      `<div class="card">No se pudieron cargar los datos (${err}). Sirve la carpeta con un servidor local.</div>`);
  });

function init() {
  const c = DATA.contrato;
  document.getElementById('contract-sub').textContent =
    `${c.titulo || 'Contrato de mantenimiento'} · Expediente ${c.expediente || ''} · ${c.eje || ''}`;
  document.getElementById('period-value').textContent = fmtMes(c.mes).toUpperCase();
  document.getElementById('foot-mes').textContent = 'Certificación: ' + fmtMes(c.certificacion);

  setupNav();
  buildResumen();
  buildIncidencias();
  buildPreventivos();
  buildFiabilidad();
  buildPat();
}

/* ---------- Navegación ---------- */
const TITLES = {
  resumen: 'Resumen del proyecto',
  incidencias: 'Incidencias correctivas',
  preventivos: 'Mantenimiento preventivo',
  fiabilidad: 'Fiabilidad del sistema',
  pat: 'Programación Anual de Trabajos'
};
function setupNav() {
  document.querySelectorAll('.menu-item').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      btn.classList.add('active');
      const view = btn.dataset.view;
      document.getElementById('view-' + view).classList.add('active');
      document.getElementById('page-title').textContent = TITLES[view];
    });
  });
}

/* ---------- KPIs + Resumen ---------- */
function buildResumen() {
  const pa = DATA.preventivo_anual.find(r => r.red === 'TOTAL');
  const inc = DATA.incidencias_mes;
  const fiab = DATA.fiabilidad;
  const consumo = fiab.mes.reduce((a, b) => a + nz(b), 0);
  const maxAnio = fiab.max_2026.reduce((a, b) => a + nz(b), 0);
  const sumAnio = fiab.suma_anio.reduce((a, b) => a + nz(b), 0);
  const ultTiempo = DATA.tiempos.filter(t => t.tmedio != null).slice(-1)[0];

  const kpis = [
    { label: 'Avance preventivo anual', value: pct(pa.acumulado),
      hint: `<b>${pa.realizado}</b> de ${pa.total} actuaciones`, glow: 'rgba(59,130,246,.20)' },
    { label: 'Incidencias del mes', value: inc.total,
      hint: `<b>${inc.totales.propprev}</b> propias · <b>${inc.totales.terceros}</b> a terceros`, glow: 'rgba(34,211,238,.18)' },
    { label: 'T. medio reparación', value: (ultTiempo ? ultTiempo.tmedio + ' min' : '—'),
      hint: `Mes ${ultTiempo ? fmtMes(ultTiempo.mes) : ''}`, glow: 'rgba(167,139,250,.18)' },
    { label: 'Fiabilidad · consumo año', value: pct(maxAnio ? sumAnio / maxAnio : 0),
      hint: `<b>${sumAnio}</b> de ${maxAnio} incidencias máx.`, glow: 'rgba(34,197,94,.18)' },
  ];
  document.getElementById('kpi-grid').innerHTML = kpis.map(k => `
    <div class="kpi" style="--kpi-glow:${k.glow}">
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-hint">${k.hint}</div>
    </div>`).join('');

  // Preventivo anual por red (previsto vs realizado)
  const redes = DATA.preventivo_anual.filter(r => r.red !== 'TOTAL');
  mkChart('chart-prev-anual', {
    type: 'bar',
    data: {
      labels: redes.map(r => r.red),
      datasets: [
        { label: 'Realizado', data: redes.map(r => r.realizado), backgroundColor: C.accent, borderRadius: 5 },
        { label: 'Pendiente', data: redes.map(r => r.total - r.realizado), backgroundColor: 'rgba(147,163,196,.25)', borderRadius: 5 },
      ]
    },
    options: {
      maintainAspectRatio: false, responsive: true,
      scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, ...gridScale() } },
      plugins: { tooltip: { callbacks: { footer: (it) => {
        const r = redes[it[0].dataIndex]; return 'Consecución: ' + pct(r.acumulado); } } } }
    }
  });

  // Incidencias del mes por técnica (prop+prev)
  const tecs = DATA.incidencias_mes.tecnicas;
  mkChart('chart-inc-mes', {
    type: 'bar',
    data: {
      labels: tecs.map(t => t.tecnica),
      datasets: [{ label: 'Incidencias (propias + preventivo)', data: tecs.map(t => t.propprev),
        backgroundColor: PALETTE, borderRadius: 6 }]
    },
    options: { maintainAspectRatio: false, indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: { x: gridScale({ beginAtZero: true }), y: { grid: { display: false } } } }
  });

  // Histórico total incidencias (suma por mes en los 3 años)
  const serie = [];
  ['2024', '2025', '2026'].forEach(y => {
    const blk = DATA.historico_incidencias[y];
    blk.meses.forEach((m, i) => {
      const total = Object.values(blk.cats).reduce((a, arr) => a + nz(arr[i]), 0);
      const hasData = Object.values(blk.cats).some(arr => arr[i] != null);
      if (hasData) serie.push({ mes: m, total });
    });
  });
  mkChart('chart-hist-total', {
    type: 'line',
    data: {
      labels: serie.map(s => fmtMes(s.mes)),
      datasets: [{ label: 'Incidencias / mes', data: serie.map(s => s.total),
        borderColor: C.accent2, backgroundColor: 'rgba(34,211,238,.12)',
        fill: true, tension: .35, pointRadius: 2, borderWidth: 2 }]
    },
    options: { maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 12 } },
                y: gridScale({ beginAtZero: true }) } }
  });
}

/* ---------- Incidencias ---------- */
function buildIncidencias() {
  const inc = DATA.incidencias_mes;
  const t = inc.totales;
  // Tabla
  const rows = inc.tecnicas.map(r => `
    <tr><td class="cell-name">${r.tecnica}</td>
      <td>${r.propias}</td><td>${r.preventivo}</td><td>${r.ajenas}</td>
      <td>${r.terceros}</td><td><b>${r.propprev}</b></td></tr>`).join('');
  document.getElementById('tabla-inc-mes').innerHTML = `
    <thead><tr><th>Técnica</th><th>Propias</th><th>Preventivo</th><th>Ajenas</th><th>A terceros</th><th>Prop+Prev</th></tr></thead>
    <tbody>${rows}
      <tr class="total-row"><td>TOTALES</td><td>${t.propias}</td><td>${t.preventivo}</td>
      <td>${nz(t.ajenas)}</td><td>${t.terceros}</td><td>${t.propprev}</td></tr>
    </tbody>`;

  // Doughnut imputación
  mkChart('chart-inc-imput', {
    type: 'doughnut',
    data: {
      labels: ['Propias', 'Preventivo', 'Ajenas', 'A terceros'],
      datasets: [{ data: [t.propias, t.preventivo, nz(t.ajenas), t.terceros],
        backgroundColor: [C.accent, C.violet, C.amber, C.green], borderColor: '#1c2842', borderWidth: 3 }]
    },
    options: { maintainAspectRatio: false, cutout: '60%',
      plugins: { legend: { position: 'right' } } }
  });

  // Tiempos: tmedio (línea) + nº incidencias (barras)
  const tp = DATA.tiempos.filter(x => x.tmedio != null);
  mkChart('chart-tiempos', {
    data: {
      labels: tp.map(x => fmtMes(x.mes)),
      datasets: [
        { type: 'bar', label: 'Nº incidencias', data: tp.map(x => x.ninc),
          backgroundColor: 'rgba(59,130,246,.35)', borderRadius: 4, yAxisID: 'y1', order: 2 },
        { type: 'line', label: 'T. medio reparación (min)', data: tp.map(x => x.tmedio),
          borderColor: C.amber, backgroundColor: C.amber, tension: .35, pointRadius: 2, borderWidth: 2, yAxisID: 'y', order: 1 }
      ]
    },
    options: { maintainAspectRatio: false, interaction: { mode: 'index', intersect: false },
      scales: {
        x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 10 } },
        y: { position: 'left', ...gridScale({ beginAtZero: true }), title: { display: true, text: 'min' } },
        y1: { position: 'right', grid: { display: false }, beginAtZero: true, title: { display: true, text: 'nº' } }
      } }
  });

  // Chips años histórico
  const years = Object.keys(DATA.historico_incidencias);
  const chipBox = document.getElementById('hist-year-chips');
  chipBox.innerHTML = years.map((y, i) =>
    `<button class="chip ${i === years.length - 1 ? 'active' : ''}" data-year="${y}">${y}</button>`).join('');
  chipBox.querySelectorAll('.chip').forEach(ch => ch.addEventListener('click', () => {
    chipBox.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    ch.classList.add('active');
    renderHistCat(ch.dataset.year);
  }));
  renderHistCat(years[years.length - 1]);
}

function renderHistCat(year) {
  const blk = DATA.historico_incidencias[year];
  const labels = blk.meses.map(fmtMes);
  const datasets = Object.entries(blk.cats).map(([name, arr], i) => ({
    label: name, data: arr.map(v => v == null ? null : v),
    borderColor: PALETTE[i % PALETTE.length],
    backgroundColor: PALETTE[i % PALETTE.length] + '30',
    tension: .3, pointRadius: 2, borderWidth: 2, spanGaps: true
  }));
  mkChart('chart-hist-cat', {
    type: 'line',
    data: { labels, datasets },
    options: { maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } },
      scales: { x: { grid: { display: false } }, y: gridScale({ beginAtZero: true }) } }
  });
}

/* ---------- Preventivos ---------- */
function buildPreventivos() {
  const pa = DATA.preventivo_anual;
  const rows = pa.filter(r => r.red !== 'TOTAL').map(r => {
    const w = Math.min(100, nz(r.acumulado) * 100);
    return `<tr>
      <td class="cell-name">${r.red}</td>
      <td>${r.total}</td><td>${r.previsto}</td><td>${r.realizado}</td>
      <td>${nz(r.desviacion)}</td>
      <td><span class="pct-cell">${pct(r.acumulado)}<span class="bar-mini"><span style="width:${w}%"></span></span></span></td>
    </tr>`;
  }).join('');
  const tot = pa.find(r => r.red === 'TOTAL');
  document.getElementById('tabla-prev-anual').innerHTML = `
    <thead><tr><th>Red</th><th>Total anual</th><th>Previsto</th><th>Realizado</th><th>Desviación</th><th>% Consecución</th></tr></thead>
    <tbody>${rows}
      <tr class="total-row"><td>TOTAL</td><td>${tot.total}</td><td>${tot.previsto}</td>
      <td>${tot.realizado}</td><td>${nz(tot.desviacion)}</td><td>${pct(tot.acumulado)}</td></tr>
    </tbody>`;

  // Consecución acumulada por red
  const redes = pa.filter(r => r.red !== 'TOTAL');
  mkChart('chart-prev-consec', {
    type: 'bar',
    data: {
      labels: redes.map(r => r.red),
      datasets: [{ label: '% consecución acumulada', data: redes.map(r => +(nz(r.acumulado) * 100).toFixed(1)),
        backgroundColor: redes.map(r => nz(r.acumulado) >= 0.5 ? C.green : C.amber), borderRadius: 6 }]
    },
    options: { maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: (i) => i.raw + '%' } } },
      scales: { x: { grid: { display: false } }, y: gridScale({ beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } }) } }
  });

  // Preventivo del mes por centro
  const cen = DATA.preventivo_centros;
  const keys = ['CM1', 'CM2', 'CM3', 'CM4'];
  const totPrev = keys.map(k => cen.semanas.reduce((a, s) => a + nz(s[k].prev), 0));
  const totReal = keys.map(k => cen.semanas.reduce((a, s) => a + nz(s[k].real), 0));
  mkChart('chart-prev-centros', {
    type: 'bar',
    data: {
      labels: keys.map(k => cen.nombres[k]),
      datasets: [
        { label: 'Previsto', data: totPrev, backgroundColor: 'rgba(147,163,196,.30)', borderRadius: 5 },
        { label: 'Ejecutado', data: totReal, backgroundColor: C.accent, borderRadius: 5 }
      ]
    },
    options: { maintainAspectRatio: false,
      scales: { x: { grid: { display: false } }, y: gridScale({ beginAtZero: true }) } }
  });

  // Tabla semanal por centro
  const head = `<thead><tr><th>Semana</th>
    ${keys.map(k => `<th>${cen.nombres[k].replace(/CM\d \(/, '').replace(')', '')}</th>`).join('')}
    <th>Total</th></tr></thead>`;
  const body = cen.semanas.map(s => `<tr>
    <td class="cell-name">Sem ${s.semana}</td>
    ${keys.map(k => `<td>${nz(s[k].real)}/${nz(s[k].prev)}</td>`).join('')}
    <td><b>${nz(s.total.real)}/${nz(s.total.prev)}</b></td></tr>`).join('');
  const tRealT = cen.semanas.reduce((a, s) => a + nz(s.total.real), 0);
  const tPrevT = cen.semanas.reduce((a, s) => a + nz(s.total.prev), 0);
  document.getElementById('tabla-centros').innerHTML = head + `<tbody>${body}
    <tr class="total-row"><td>TOTAL</td>${keys.map((k, i) => `<td>${totReal[i]}/${totPrev[i]}</td>`).join('')}
    <td>${tRealT}/${tPrevT}</td></tr></tbody>`;
}

/* ---------- Fiabilidad ---------- */
function buildFiabilidad() {
  const f = DATA.fiabilidad;
  // Consumo del año vs máximo
  mkChart('chart-fiab-anio', {
    type: 'bar',
    data: {
      labels: f.tecnicas,
      datasets: [
        { label: 'Consumido (año)', data: f.suma_anio.map(nz), backgroundColor: C.accent, borderRadius: 5 },
        { label: 'Margen restante', data: f.tecnicas.map((_, i) => Math.max(0, nz(f.max_2026[i]) - nz(f.suma_anio[i]))),
          backgroundColor: 'rgba(34,197,94,.30)', borderRadius: 5 }
      ]
    },
    options: { maintainAspectRatio: false,
      scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, ...gridScale({ beginAtZero: true }) } },
      plugins: { tooltip: { callbacks: { footer: (it) => {
        const i = it[0].dataIndex; return 'Máximo 2026: ' + f.max_2026[i]; } } } } }
  });

  // Incidencias imputables del mes
  mkChart('chart-fiab-mes', {
    type: 'bar',
    data: {
      labels: f.tecnicas,
      datasets: [{ label: 'Incidencias imputables', data: f.mes.map(nz), backgroundColor: PALETTE, borderRadius: 6 }]
    },
    options: { maintainAspectRatio: false, plugins: { legend: { display: false } },
      scales: { x: { grid: { display: false } }, y: gridScale({ beginAtZero: true }) } }
  });

  // Tabla avance
  const rows = DATA.fiabilidad_avance.map(r => {
    const acum = nz(r.acum), pend = nz(r.pendiente);
    const b = acum > 0.5 ? 'bad' : acum > 0.45 ? 'warn' : 'ok';
    return `<tr><td class="cell-name">${r.tecnica}</td>
      <td>${pct(r.real)}</td><td>${pct(r.acum)}</td>
      <td><span class="badge ${b}">${pct(r.acum)}</span></td>
      <td>${pct(pend)}</td></tr>`;
  }).join('');
  document.getElementById('tabla-fiab').innerHTML = `
    <thead><tr><th>Técnica</th><th>% Mes</th><th>% Acumulado</th><th>Estado</th><th>Margen pendiente</th></tr></thead>
    <tbody>${rows}</tbody>`;
}

/* ---------- PAT ---------- */
function buildPat() {
  const subs = DATA.pat.subsistemas.filter(s => s.nombre !== 'TOTAL' && s.objetivo);
  // Consecución acumulada
  mkChart('chart-pat', {
    type: 'bar',
    data: {
      labels: subs.map(s => shortName(s.nombre)),
      datasets: [
        { label: 'Realizado (acum.)', data: subs.map(s => nz(s.acumulado)), backgroundColor: C.accent, borderRadius: 5 },
        { label: 'Objetivo anual', data: subs.map(s => nz(s.objetivo) - nz(s.acumulado)),
          backgroundColor: 'rgba(147,163,196,.25)', borderRadius: 5 }
      ]
    },
    options: { maintainAspectRatio: false, indexAxis: 'y',
      scales: { x: { stacked: true, ...gridScale({ beginAtZero: true }) }, y: { stacked: true, grid: { display: false } } },
      plugins: { tooltip: { callbacks: { footer: (it) => {
        const s = subs[it[0].dataIndex];
        return 'Consecución: ' + pct(s.acumulado / s.objetivo); } } } } }
  });

  // Tabla mensual programadas/realizadas
  const meses = DATA.pat.meses;
  const head = `<thead><tr><th>Subsistema</th><th>Objetivo</th><th>Acum.</th>
    ${meses.map(m => `<th>${fmtMes(m)}</th>`).join('')}</tr></thead>`;
  const allSubs = DATA.pat.subsistemas.filter(s => s.objetivo);
  const body = allSubs.map(s => {
    const isTot = s.nombre === 'TOTAL';
    const cells = meses.map((_, i) => {
      const p = s.programadas[i], r = s.realizadas[i];
      if (p == null && r == null) return '<td>—</td>';
      return `<td>${r == null ? '·' : r}/${p == null ? '·' : p}</td>`;
    }).join('');
    return `<tr class="${isTot ? 'total-row' : ''}">
      <td class="cell-name">${shortName(s.nombre)}</td>
      <td>${s.objetivo}</td><td>${s.acumulado}</td>${cells}</tr>`;
  }).join('');
  document.getElementById('tabla-pat').innerHTML = head + `<tbody>${body}</tbody>`;
}

function shortName(n) {
  const map = {
    'TELECOMUNICACIONES FIJAS': 'Telecom. Fijas',
    'VIDEOVIGILANCIA Y CONTROL DE ACCESOS': 'Videovigilancia (VCA)',
    'TELECOMUNICACIONES GSM-R': 'GSM-R',
    'OPERADORES PUBLICOS DE TELEFONÍA MÓVIL': 'Operadores móviles',
    'TELEMANDO DE ENERGIA': 'Telemando Energía',
    'CORE GSM-R': 'Core GSM-R',
    'CORE GESTORES': 'Core Gestores',
    'TOTAL': 'TOTAL'
  };
  if (map[n]) return map[n];
  return (n || '').replace(/\n/g, ' ').split(' ').slice(0, 3).join(' ');
}
