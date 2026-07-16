/* Seguimiento de proyecto · UTE MAVENTS — Eje Este de Alta Velocidad */

const C = {
  text: '#17233d', muted: '#5c6b8a', grid: 'rgba(23,35,61,.10)',
  accent: '#3b82f6', accent2: '#0891b2', green: '#16a34a',
  amber: '#d97706', red: '#dc2626', violet: '#7c3aed', pink: '#db2777'
};
const PALETTE = [C.accent, C.accent2, C.violet, C.amber, C.green, C.pink, C.red];
const charts = {};
let DATA = null;
let MES_SEL = null;               // mes seleccionado, p.ej. "2026-06"

const MES_ES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const MES_LARGO = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const fmtMes = (s) => { const [y,m] = s.split('-'); return `${MES_ES[+m-1]} ${y.slice(2)}`; };
const fmtMesLargo = (s) => { const [y,m] = s.split('-'); return `${MES_LARGO[+m-1]} ${y}`; };
const pct = (v) => (v == null || isNaN(v)) ? '—' : (v * 100).toFixed(1) + '%';
const nz = (v) => (v == null || v === '' || isNaN(v)) ? 0 : v;

// Datos del mes seleccionado y si tiene detalle cargado
const mesData = () => (DATA.meses && DATA.meses[MES_SEL]) || {};
const tieneDetalle = (mk) => { const m = DATA.meses && DATA.meses[mk]; return !!(m && m.incidencias_mes); };

Chart.defaults.color = C.muted;
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.plugins.legend.labels.usePointStyle = true;
Chart.defaults.plugins.legend.labels.boxWidth = 8;
Chart.defaults.plugins.legend.labels.padding = 14;

// Localiza el .chart-box que contiene (o contenía) un canvas dado
function chartBox(id) {
  const el = document.getElementById(id);
  if (el) return el.closest('.chart-box') || el.parentElement;
  return document.querySelector(`[data-cid="${id}"]`);
}

function mkChart(id, cfg) {
  if (charts[id]) { charts[id].destroy(); delete charts[id]; }
  const box = chartBox(id);
  if (box && !box.querySelector('canvas')) {
    box.classList.remove('is-empty');
    box.innerHTML = `<canvas id="${id}"></canvas>`;
  }
  const el = document.getElementById(id);
  if (!el) return;
  charts[id] = new Chart(el, cfg);
}

// Renderiza el gráfico si hay datos; si no, muestra un placeholder "sin datos"
function renderChart(id, ok, cfg, msg) {
  if (charts[id]) { charts[id].destroy(); delete charts[id]; }
  const box = chartBox(id);
  if (!box) return;
  if (!ok) {
    box.classList.add('is-empty');
    box.dataset.cid = id;
    box.innerHTML = `<div class="nodata"><span class="nodata-ico">📊</span>${msg || 'Detalle pendiente de carga'}</div>`;
    return;
  }
  mkChart(id, cfg);
}

// Placeholder de "sin datos" para tablas y otros contenedores
function emptyMsg(html = 'Detalle pendiente de carga') {
  return `<div class="nodata"><span class="nodata-ico">📊</span>${html}
    <small>Selecciona un mes con datos o carga el detalle de este mes.</small></div>`;
}

const gridScale = (extra = {}) => ({
  grid: { color: C.grid, drawBorder: false }, ...extra
});

/* ---------- Bootstrap ---------- */
fetch('data.json?v=5')
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

  MES_SEL = c.mes;
  setupNav();
  setupMonthSelector();
  renderAll();
}

/* ---------- Selector de mes ---------- */
function mesesDisponibles() {
  if (DATA.meses) return Object.keys(DATA.meses).sort();
  return [DATA.contrato.mes];
}
function setupMonthSelector() {
  const sel = document.getElementById('month-select');
  if (!sel) return;
  const meses = mesesDisponibles();
  if (!meses.includes(MES_SEL)) MES_SEL = meses[meses.length - 1];
  sel.innerHTML = meses.map(mk =>
    `<option value="${mk}"${mk === MES_SEL ? ' selected' : ''}>${fmtMesLargo(mk)}${tieneDetalle(mk) ? '' : ' · sin datos'}</option>`
  ).join('');
  sel.addEventListener('change', (e) => { MES_SEL = e.target.value; renderAll(); });
}

// Re-render de todo el cuadro de mando para el mes seleccionado
function renderAll() {
  const c = DATA.contrato;
  document.getElementById('foot-mes').textContent = 'Mes en seguimiento: ' + fmtMesLargo(MES_SEL);
  const badge = document.querySelector('.period-label');
  if (badge) badge.textContent = tieneDetalle(MES_SEL) ? 'Periodo' : 'Periodo · sin detalle';
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
  const md = mesData();
  const inc = md.incidencias_mes;
  const fiab = md.fiabilidad;
  const tMes = DATA.tiempos.find(t => t.mes === MES_SEL);

  // Incidencias del mes: del detalle si existe, o del registro mensual de tiempos
  let incVal = '—', incHint = 'Detalle no cargado';
  if (inc) { incVal = inc.total; incHint = `<b>${inc.totales.propprev}</b> propias+prev · <b>${inc.totales.terceros}</b> a terceros`; }
  else if (tMes && tMes.ninc != null) { incVal = tMes.ninc; incHint = 'Registradas en el mes'; }

  let tVal = '—', tHint = fmtMesLargo(MES_SEL);
  if (tMes && tMes.tmedio != null) { tVal = tMes.tmedio + ' min'; }

  let fVal = '—', fHint = 'Detalle no cargado';
  if (fiab) {
    const maxAnio = fiab.max_2026.reduce((a, b) => a + nz(b), 0);
    const sumAnio = fiab.suma_anio.reduce((a, b) => a + nz(b), 0);
    fVal = pct(maxAnio ? sumAnio / maxAnio : 0);
    fHint = `<b>${sumAnio}</b> de ${maxAnio} incidencias máx.`;
  }

  const kpis = [
    { label: 'Avance preventivo anual', value: pct(pa.acumulado),
      hint: `<b>${pa.realizado}</b> de ${pa.total} actuaciones`, glow: 'rgba(59,130,246,.20)' },
    { label: 'Incidencias del mes', value: incVal, hint: incHint, glow: 'rgba(34,211,238,.18)' },
    { label: 'T. medio reparación', value: tVal, hint: tHint, glow: 'rgba(167,139,250,.18)' },
    { label: 'Fiabilidad · consumo año', value: fVal, hint: fHint, glow: 'rgba(34,197,94,.18)' },
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

  // Incidencias del mes por técnica (prop+prev) — específico del mes
  const tecs = inc ? inc.tecnicas : [];
  renderChart('chart-inc-mes', !!inc, {
    type: 'bar',
    data: {
      labels: tecs.map(t => t.tecnica),
      datasets: [{ label: 'Incidencias (propias + preventivo)', data: tecs.map(t => t.propprev),
        backgroundColor: PALETTE, borderRadius: 6 }]
    },
    options: { maintainAspectRatio: false, indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: { x: gridScale({ beginAtZero: true }), y: { grid: { display: false } } } }
  }, `Sin detalle de incidencias para ${fmtMesLargo(MES_SEL)}`);

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
  const inc = mesData().incidencias_mes;
  const pill = document.getElementById('pill-total-inc');

  if (inc) {
    const t = inc.totales;
    pill.textContent = 'Nº incidencias: ' + inc.total;
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

    // Doughnut imputación (con % en las etiquetas)
    const imputVals = [t.propias, t.preventivo, nz(t.ajenas), t.terceros];
    const sumImput = imputVals.reduce((a, b) => a + b, 0);
    const imputLbls = ['Propias', 'Preventivo', 'Ajenas', 'A terceros']
      .map((n, i) => `${n} · ${Math.round(imputVals[i] / sumImput * 100)}%`);
    renderChart('chart-inc-imput', true, {
      type: 'doughnut',
      data: {
        labels: imputLbls,
        datasets: [{ data: imputVals,
          backgroundColor: [C.accent, C.violet, C.amber, C.green], borderColor: '#ffffff', borderWidth: 3 }]
      },
      options: { maintainAspectRatio: false, cutout: '60%',
        plugins: { legend: { position: 'right' } } }
    });

    // Barras agrupadas: técnica × imputación (como el informe mensual)
    renderChart('chart-inc-tecimput', true, {
      type: 'bar',
      data: {
        labels: inc.tecnicas.map(r => r.tecnica),
        datasets: [
          { label: 'Propias', data: inc.tecnicas.map(r => nz(r.propias)), backgroundColor: C.accent, borderRadius: 4 },
          { label: 'Preventivo', data: inc.tecnicas.map(r => nz(r.preventivo)), backgroundColor: C.violet, borderRadius: 4 },
          { label: 'Ajenas', data: inc.tecnicas.map(r => nz(r.ajenas)), backgroundColor: C.amber, borderRadius: 4 },
          { label: 'A terceros', data: inc.tecnicas.map(r => nz(r.terceros)), backgroundColor: C.green, borderRadius: 4 }
        ]
      },
      options: { maintainAspectRatio: false,
        scales: { x: { grid: { display: false } }, y: gridScale({ beginAtZero: true, ticks: { precision: 0 } }) } }
    });
  } else {
    // Mes sin detalle cargado
    pill.textContent = '';
    document.getElementById('tabla-inc-mes').innerHTML =
      `<tbody><tr><td>${emptyMsg(`Sin detalle de imputación para ${fmtMesLargo(MES_SEL)}`)}</td></tr></tbody>`;
    renderChart('chart-inc-imput', false, null, `Sin datos de imputación para ${fmtMesLargo(MES_SEL)}`);
    renderChart('chart-inc-tecimput', false, null, `Sin datos de imputación para ${fmtMesLargo(MES_SEL)}`);
  }

  // Tiempos: tmedio (línea) + nº incidencias (barras) — anual, siempre
  const tp = DATA.tiempos.filter(x => x.tmedio != null);
  const selIdx = tp.findIndex(x => x.mes === MES_SEL);
  mkChart('chart-tiempos', {
    data: {
      labels: tp.map(x => fmtMes(x.mes)),
      datasets: [
        { type: 'bar', label: 'Nº incidencias', data: tp.map(x => x.ninc),
          backgroundColor: tp.map((_, i) => i === selIdx ? C.accent : 'rgba(59,130,246,.30)'),
          borderRadius: 4, yAxisID: 'y1', order: 2 },
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

  // Tabla técnica × mes del año seleccionado (como el informe)
  const cats = Object.entries(blk.cats);
  const head = `<thead><tr><th>Técnica / mes</th>
    ${blk.meses.map(m => `<th>${fmtMes(m)}</th>`).join('')}<th>Total</th></tr></thead>`;
  const body = cats.map(([name, arr]) => {
    const tot = arr.reduce((a, v) => a + nz(v), 0);
    return `<tr><td class="cell-name">${name}</td>
      ${arr.map(v => `<td>${v == null ? '—' : v}</td>`).join('')}<td><b>${tot}</b></td></tr>`;
  }).join('');
  const totMes = blk.meses.map((_, i) =>
    cats.some(([, arr]) => arr[i] != null) ? cats.reduce((a, [, arr]) => a + nz(arr[i]), 0) : null);
  const totAll = totMes.reduce((a, v) => a + nz(v), 0);
  document.getElementById('tabla-hist').innerHTML = head + `<tbody>${body}
    <tr class="total-row"><td>TOTAL</td>
    ${totMes.map(v => `<td>${v == null ? '—' : v}</td>`).join('')}<td>${totAll}</td></tr></tbody>`;
}

/* ---------- Preventivos ---------- */
function buildPreventivos() {
  // Preventivo mensual por red (previsto vs ejecutado + % consecución) — específico del mes
  const pm = mesData().preventivo_mes;
  const pillPrev = document.getElementById('pill-prev-mes');
  if (pm) {
    const pmTot = pm.find(r => r.red === 'TOTAL');
    const consecTot = pmTot.previsto > 0 ? pmTot.ejecutado / pmTot.previsto : null;
    pillPrev.textContent = 'Ejecución del mes: ' + pct(consecTot);
    const pmRows = pm.filter(r => r.red !== 'TOTAL').map(r => {
      const c = r.previsto > 0 ? r.ejecutado / r.previsto : null;
      const badge = c == null
        ? '<span class="badge na">Sin preventivo</span>'
        : `<span class="badge ${c >= 1 ? 'ok' : c >= 0.9 ? 'warn' : 'bad'}">${pct(c)}</span>`;
      return `<tr><td class="cell-name">${r.red}</td>
        <td>${r.previsto}</td><td>${r.ejecutado}</td><td>${badge}</td></tr>`;
    }).join('');
    document.getElementById('tabla-prev-mes').innerHTML = `
      <thead><tr><th>Red</th><th>Previsto</th><th>Ejecutado</th><th>% Consecución</th></tr></thead>
      <tbody>${pmRows}
        <tr class="total-row"><td>TOTAL</td><td>${pmTot.previsto}</td><td>${pmTot.ejecutado}</td>
        <td>${pct(consecTot)}</td></tr>
      </tbody>`;

    // % ejecutado del preventivo mensual (solo redes con carga prevista)
    const pmRedes = pm.filter(r => r.red !== 'TOTAL' && r.previsto > 0);
    renderChart('chart-prev-mes', true, {
      type: 'bar',
      data: {
        labels: pmRedes.map(r => r.red),
        datasets: [{ label: '% ejecutado',
          data: pmRedes.map(r => +(r.ejecutado / r.previsto * 100).toFixed(1)),
          backgroundColor: C.accent, borderRadius: 6 }]
      },
      options: { maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: (i) => i.raw + '%' } } },
        scales: { x: { grid: { display: false } },
                  y: gridScale({ beginAtZero: true, max: 110, ticks: { callback: v => v + '%' } }) } }
    });

    // Gráfico independiente: barra vertical con el TOTAL ejecutado del mes
    const totPctVal = consecTot == null ? 0 : +(consecTot * 100).toFixed(1);
    renderChart('chart-prev-mes-total', true, {
      type: 'bar',
      data: {
        labels: ['TOTAL'],
        datasets: [{ label: '% ejecutado', data: [totPctVal],
          backgroundColor: totPctVal >= 100 ? C.green : totPctVal >= 90 ? C.amber : C.red,
          borderRadius: 6, barPercentage: 0.45, categoryPercentage: 0.6 }]
      },
      options: { maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: {
            label: (i) => i.raw + '%',
            footer: () => `Ejecutado ${pmTot.ejecutado} de ${pmTot.previsto} previstos`
          } }
        },
        scales: { x: { grid: { display: false } },
                  y: gridScale({ beginAtZero: true, max: 110, ticks: { callback: v => v + '%' } }) } }
    });
  } else {
    pillPrev.textContent = '';
    document.getElementById('tabla-prev-mes').innerHTML =
      `<tbody><tr><td>${emptyMsg(`Sin preventivo mensual para ${fmtMesLargo(MES_SEL)}`)}</td></tr></tbody>`;
    renderChart('chart-prev-mes', false, null, `Sin datos de ${fmtMesLargo(MES_SEL)}`);
    renderChart('chart-prev-mes-total', false, null, `Sin datos de ${fmtMesLargo(MES_SEL)}`);
  }

  const pa = DATA.preventivo_anual;
  // Barra de avance global anual (realizado vs pendiente)
  const paTot = pa.find(r => r.red === 'TOTAL');
  document.getElementById('progress-anual').innerHTML = `
    <span class="progress-txt">Realizado: <b>${pct(paTot.acumulado)}</b></span>
    <div class="progress-line"><span style="width:${(nz(paTot.acumulado) * 100).toFixed(1)}%"></span></div>
    <span class="progress-txt">Pendiente ${DATA.contrato.anio}: <b>${pct(1 - nz(paTot.acumulado))}</b></span>`;
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

  // Preventivo del mes por centro — específico del mes
  const cen = mesData().preventivo_centros;
  if (!cen) {
    renderChart('chart-prev-centros', false, null, `Sin ejecución por centro para ${fmtMesLargo(MES_SEL)}`);
    document.getElementById('tabla-centros').innerHTML =
      `<tbody><tr><td>${emptyMsg(`Sin ejecución semanal por centro para ${fmtMesLargo(MES_SEL)}`)}</td></tr></tbody>`;
    document.getElementById('mapa-centros').innerHTML = emptyMsg(`Sin datos de centros para ${fmtMesLargo(MES_SEL)}`);
    return;
  }
  const keys = ['CM1', 'CM2', 'CM3', 'CM4'];
  const totPrev = keys.map(k => cen.semanas.reduce((a, s) => a + nz(s[k].prev), 0));
  const totReal = keys.map(k => cen.semanas.reduce((a, s) => a + nz(s[k].real), 0));
  renderChart('chart-prev-centros', true, {
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

  buildMapaCentros(cen, keys, totPrev, totReal);
}

/* Mapa esquemático del Eje Este con los centros de mantenimiento */
function buildMapaCentros(cen, keys, totPrev, totReal) {
  const box = document.getElementById('mapa-centros');
  if (!box) return;
  const pctC = {};
  keys.forEach((k, i) => { pctC[k] = totPrev[i] > 0 ? Math.round(totReal[i] / totPrev[i] * 100) : null; });

  // Posiciones esquemáticas: Madrid → Villarrubia → Cuenca → (bif. Motilla) → Requena → Valencia; ramal a Albacete
  const P = {
    Madrid: [55, 112], CM1: [235, 138], CM2: [430, 102], SPLIT: [565, 140],
    CM3: [705, 115], Valencia: [855, 95], CM4: [610, 245]
  };
  const pt = (p) => `${p[0]} ${p[1]}`;
  const colorPct = (v) => v == null ? '#94a3b8' : v >= 100 ? C.green : v >= 90 ? C.amber : C.red;

  const marker = (k) => {
    const [x, y] = P[k];
    const v = pctC[k];
    return `<g>
      <circle cx="${x}" cy="${y}" r="18" fill="${colorPct(v)}" stroke="#ffffff" stroke-width="3"/>
      <text x="${x}" y="${y + 4}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#ffffff">${v == null ? '—' : v + '%'}</text>
      <text x="${x}" y="${y + 40}" text-anchor="middle" font-size="13" font-weight="700" fill="${C.text}">${cen.nombres[k]}</text>
    </g>`;
  };
  const city = (name, p, dy) => `
    <circle cx="${p[0]}" cy="${p[1]}" r="6" fill="${C.muted}" stroke="#ffffff" stroke-width="2"/>
    <text x="${p[0]}" y="${p[1] + dy}" text-anchor="middle" font-size="12.5" font-weight="600" fill="${C.muted}">${name}</text>`;

  box.innerHTML = `
  <svg viewBox="0 0 910 300" xmlns="http://www.w3.org/2000/svg" role="img"
       aria-label="Mapa esquemático de los centros de mantenimiento del Eje Este">
    <path d="M ${pt(P.Madrid)} L ${pt(P.CM1)} L ${pt(P.CM2)} L ${pt(P.SPLIT)} L ${pt(P.CM3)} L ${pt(P.Valencia)}"
          fill="none" stroke="${C.accent}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${pt(P.SPLIT)} L ${pt(P.CM4)}"
          fill="none" stroke="${C.accent}" stroke-width="4" stroke-linecap="round"/>
    ${city('Madrid', P.Madrid, -16)}
    ${city('Valencia', P.Valencia, -16)}
    ${keys.map(marker).join('')}
  </svg>`;
}

/* ---------- Fiabilidad ---------- */
function buildFiabilidad() {
  const f = mesData().fiabilidad;
  const av = mesData().fiabilidad_avance;

  // Consumo del año vs máximo
  renderChart('chart-fiab-anio', !!f, f && {
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
  }, `Sin datos de fiabilidad para ${fmtMesLargo(MES_SEL)}`);

  // Incidencias imputables del mes
  renderChart('chart-fiab-mes', !!f, f && {
    type: 'bar',
    data: {
      labels: f.tecnicas,
      datasets: [{ label: 'Incidencias imputables', data: f.mes.map(nz), backgroundColor: PALETTE, borderRadius: 6 }]
    },
    options: { maintainAspectRatio: false, plugins: { legend: { display: false } },
      scales: { x: { grid: { display: false } }, y: gridScale({ beginAtZero: true }) } }
  }, `Sin datos de fiabilidad para ${fmtMesLargo(MES_SEL)}`);

  // Tabla avance
  if (av) {
    const rows = av.map(r => {
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
  } else {
    document.getElementById('tabla-fiab').innerHTML =
      `<tbody><tr><td>${emptyMsg(`Sin índice de fiabilidad para ${fmtMesLargo(MES_SEL)}`)}</td></tr></tbody>`;
  }
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

  // Tabla mensual programadas/realizadas (resalta el mes seleccionado)
  const meses = DATA.pat.meses;
  const selCls = (m) => m === MES_SEL ? ' class="col-sel"' : '';
  const head = `<thead><tr><th>Subsistema</th><th>Objetivo</th><th>Acum.</th>
    ${meses.map(m => `<th${selCls(m)}>${fmtMes(m)}</th>`).join('')}</tr></thead>`;
  const allSubs = DATA.pat.subsistemas.filter(s => s.objetivo);
  const body = allSubs.map(s => {
    const isTot = s.nombre === 'TOTAL';
    const cells = meses.map((m, i) => {
      const p = s.programadas[i], r = s.realizadas[i];
      const cls = m === MES_SEL ? ' class="col-sel"' : '';
      if (p == null && r == null) return `<td${cls}>—</td>`;
      return `<td${cls}>${r == null ? '·' : r}/${p == null ? '·' : p}</td>`;
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
