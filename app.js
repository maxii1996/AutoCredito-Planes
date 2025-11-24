const currency = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
const number = new Intl.NumberFormat('es-AR');

const defaultUiState = {
  selectedTemplateIndex: 0,
  variableValues: {},
  planDraft: {},
  toggles: { showReservations: true, showIntegration: true }
};

const defaultVehicles = [
  {
    name: 'Nuevo Onix 1.0 Turbo LT MT',
    basePrice: 30430900,
    integration: 9129270,
    shareByPlan: { '2a12': 320051, '13a21': 313692, '22a84': 312912, '85a120': 311352 },
    cuotaPura: 202873,
    reservations: { '1': 1137480, '3': 1478724, '6': 1706220 }
  },
  {
    name: 'Nuevo Onix Plus 1.0 Turbo LT MT',
    basePrice: 30430900,
    integration: 9129270,
    shareByPlan: { '2a12': 326758, '13a21': 370922, '22a84': 369046, '85a120': 368971 },
    cuotaPura: 253591,
    reservations: { '1': 1137480, '3': 1478724, '6': 1706220 }
  },
  {
    name: 'Nueva Montana LT',
    basePrice: 37808900,
    integration: 11342670,
    shareByPlan: { '2a12': 397648, '13a21': 389747, '22a84': 388584, '85a120': 310714 },
    cuotaPura: 252059,
    reservations: { '1': 1211400, '3': 1574820, '6': 1817100 }
  },
  {
    name: 'Nueva S10 CD 2.8 TD 4x2 WT',
    basePrice: 48596900,
    integration: 19438760,
    shareByPlan: { '2a12': 537310, '13a21': 527066, '22a84': 525464 },
    cuotaPura: 347121,
    reservations: { '1': 1825000, '3': 2372500, '6': 2737500 }
  },
  {
    name: 'Nueva Tracker 1.2T LT AT',
    basePrice: 37823900,
    integration: 11347170,
    shareByPlan: { '2a12': 397806, '13a21': 389902, '22a84': 388156 },
    cuotaPura: 252159,
    reservations: { '1': 1211710, '3': 1575223, '6': 1817565 }
  },
  {
    name: 'Nueva Spin 1.8 (7 pasajeros)',
    basePrice: 35116900,
    integration: 10535070,
    shareByPlan: { '2a12': 435603, '13a21': 428039, '22a84': 426914 },
    cuotaPura: 292641,
    reservations: { '1': 1177600, '3': 1530880, '6': 1766400 }
  }
];

const variableSuggestions = [
  'cliente', 'asesor', 'modelo_actual', 'modelo_nuevo', 'anio_retiro', 'km', 'plan', 'cuota', 'entrega_usado', 'color', 'sucursal', 'telefono', 'valor_efectivo', 'version'
];

const defaultTemplates = [
  {
    title: 'Mensaje de inicio',
    body: `Buenas tardes {{cliente}} mi nombre es {{asesor}} me contacto desde Chevrolet Argentina para consultarte si al día de la fecha seguís teniendo la {{modelo_actual}} que retiraste en uno de nuestros concesionarios en el año {{anio_retiro}}?\n\nAnte la gran cantidad de unidades fabricadas en 2025 Chevrolet lanzó la campaña de renovación de unidades con cupos limitados y valores directos de fábrica.\n\nEn caso de ser número equivocado o no ser la persona indicada, te pido disculpas y por favor avísame así no volvemos a escribirte. Muchas gracias.\n{{asesor}}`
  },
  {
    title: 'Primera respuesta',
    body: `Buen día y gracias por tu respuesta {{cliente}}, te comento que Chevrolet lanzó la CAMPAÑA DE RENOVACIÓN DE UNIDADES para los meses de Septiembre y Octubre de 2025 solo para clientes de la marca.\n\nSe te toma como prioridad y podés entregar tu vehículo usado como parte de pago para retirar un 0 km (unidades seleccionadas). La diferencia la podés financiar en cuotas en pesos y sin interés.\n\nSi te interesa entregar tu {{modelo_actual}}, decime y coordinamos un horario para llamarte y pasarte la información o por este medio. Muchas gracias.\n{{asesor}}`
  },
  {
    title: 'Beneficios de la marca',
    body: `Beneficios para clientes de la marca\n* Financiación en cuotas en pesos y sin interés.\n* Cuotas pre cancelables.\n* Financia fábrica, sin bancos de por medio.\n* Entrega sin sorteo y sin licitación.\n* Color de la unidad a elección.\n* Sistema llave por llave: entrega tu usado al momento de retiro de la unidad.\n* Gastos de retiro a costo de fábrica.\n* Descuentos en el seguro del automotor.`
  },
  {
    title: 'Solicitud de fotos y preguntas',
    body: `Para validar la cotización por tu usado necesito que me envíes 10 fotos (ver ejemplo adjunto) y responder: \nA) ¿Cuántos kilómetros tiene?\nB) ¿Se realizaron los services en concesionario o taller oficial?\nC) En una escala de 1 a 10 ¿en qué estado se encuentra la unidad?\nD) ¿Tuvo algún choque o reparación?\nE) ¿El vehículo tiene alguna deuda actualmente?\n\nRecordá adjuntar las vistas solicitadas (patente visible) y el odómetro. Gracias!`
  },
  {
    title: 'Informe de cotización (InfoAuto)',
    body: 'INFORME DE COTIZACIÓN\nMarca: Chevrolet\nModelo: {{modelo_actual}}\nAño: {{anio_retiro}}\nVersión: {{version}}\nMotor: 1.4 Turbo\nCantidad de puertas: 5\nKilometraje: {{km}}\n\nCotizado en un valor en efectivo de ${{valor_efectivo}} pesos arg.\n\nEstimado cliente recuerde enviar a su asesor de ventas 10 imágenes/foto del usado para validar la cotización.\nFuente: INFOAUTO Guía oficial de Precios Noviembre 2025.'
  }
];

function cloneVehicles(list) {
  return (list || []).map(v => ({
    ...v,
    shareByPlan: { ...v.shareByPlan },
    reservations: { ...v.reservations }
  }));
}

function ensureTemplateIds(list) {
  return (list || []).map((tpl, idx) => ({
    id: tpl.id || `tpl-${idx}-${Date.now()}`,
    ...tpl
  }));
}

function formatMoney(value) {
  if (value === undefined || value === null || Number.isNaN(value)) return '';
  return currency.format(Number(value));
}

function parseMoney(raw) {
  if (raw === undefined || raw === null) return 0;
  const cleaned = String(raw).replace(/[^0-9.-]/g, '');
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : 0;
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="icon">${type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️'}</span><div><strong>${message}</strong></div>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(6px)';
    setTimeout(() => toast.remove(), 180);
  }, 3500);
}

function confirmAction({ title = 'Confirmar', message = '', confirmText = 'Aceptar', cancelText = 'Cancelar', onConfirm } = {}) {
  const modal = document.getElementById('modal');
  if (!modal) return;
  modal.classList.add('show');
  modal.classList.remove('hidden');
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMessage').textContent = message;
  const confirmBtn = document.getElementById('modalConfirm');
  const cancelBtn = document.getElementById('modalCancel');
  const closeBtn = document.getElementById('modalClose');
  confirmBtn.textContent = confirmText;
  cancelBtn.textContent = cancelText;

  const cleanup = () => {
    modal.classList.remove('show');
    setTimeout(() => modal.classList.add('hidden'), 200);
    confirmBtn.onclick = null;
    cancelBtn.onclick = null;
    closeBtn.onclick = null;
  };

  confirmBtn.onclick = () => {
    cleanup();
    if (typeof onConfirm === 'function') onConfirm();
  };
  cancelBtn.onclick = cleanup;
  closeBtn.onclick = cleanup;
  modal.addEventListener('click', (e) => {
    if (e.target === modal) cleanup();
  }, { once: true });
}

function bindMoneyInput(el, onChange) {
  if (!el) return;
  el.addEventListener('input', () => {
    const cleaned = (el.value || '').replace(/[^\d]/g, '');
    el.dataset.raw = cleaned;
    el.value = cleaned;
    if (onChange) onChange(parseMoney(cleaned));
  });
  el.addEventListener('blur', () => {
    const numeric = parseMoney(el.dataset.raw || el.value);
    el.dataset.raw = numeric ? String(Math.trunc(numeric)) : '';
    el.value = numeric ? number.format(numeric) : '';
    if (onChange) onChange(numeric);
  });
  el.addEventListener('focus', () => {
    el.value = el.dataset.raw || el.value.replace(/[^\d]/g, '');
  });
}

function applyProfileData(parsed) {
  vehicles = cloneVehicles(parsed.vehicles || defaultVehicles);
  templates = ensureTemplateIds(parsed.templates || defaultTemplates);
  clients = parsed.clients || [];
  uiState = { ...defaultUiState, ...(parsed.uiState || {}) };
  uiState.templateSearch = uiState.templateSearch || '';
  uiState.clientSearch = uiState.clientSearch || '';
  uiState.profileSearch = uiState.profileSearch || '';
  selectedTemplateIndex = Math.min(uiState.selectedTemplateIndex || 0, templates.length - 1);
  selectedTemplateId = templates[selectedTemplateIndex]?.id;
  planDraftApplied = false;
  persist();
  applyToggleState();
  renderVehicleTable();
  renderTemplates();
  renderPlanForm();
  renderClients();
  renderSnapshots();
  renderStats();
}

function saveSnapshot() {
  const title = `Snapshot ${new Date().toLocaleString('es-AR')}`;
  const data = {
    vehicles: cloneVehicles(vehicles),
    templates: ensureTemplateIds(JSON.parse(JSON.stringify(templates))),
    clients: JSON.parse(JSON.stringify(clients)),
    uiState: { ...uiState }
  };
  snapshots.push({ id: `snap-${Date.now()}`, name: title, createdAt: new Date().toISOString(), data });
  persist();
  renderSnapshots();
  showToast('Snapshot guardado en el dispositivo', 'success');
}

function renderSnapshots() {
  const list = document.getElementById('profileList');
  if (!list) return;
  const searchInput = document.getElementById('profileSearch');
  if (searchInput && searchInput.value !== uiState.profileSearch) {
    searchInput.value = uiState.profileSearch || '';
  }
  const search = (uiState.profileSearch || '').toLowerCase();
  const filtered = snapshots.filter(s => s.name.toLowerCase().includes(search));
  if (!filtered.length) {
    list.innerHTML = '<p class="muted">Sin snapshots guardados.</p>';
    return;
  }
  list.innerHTML = filtered.map(s => `
    <div class="snapshot-card" data-id="${s.id}">
      <div class="row">
        <strong>${s.name}</strong>
        <span class="pill">${new Date(s.createdAt).toLocaleString('es-AR')}</span>
      </div>
      <div class="actions">
        <button class="secondary-btn" data-action="apply" data-id="${s.id}"><i class='bx bx-play-circle'></i> Aplicar</button>
        <button class="ghost-btn" data-action="delete" data-id="${s.id}"><i class='bx bx-trash'></i> Borrar</button>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('[data-action="apply"]').forEach(btn => btn.addEventListener('click', () => applySnapshot(btn.dataset.id)));
  list.querySelectorAll('[data-action="delete"]').forEach(btn => btn.addEventListener('click', () => deleteSnapshot(btn.dataset.id)));
}

function applySnapshot(id) {
  const snap = snapshots.find(s => s.id === id);
  if (!snap) return;
  confirmAction({
    title: 'Aplicar snapshot',
    message: 'Se reemplazarán los datos actuales por el snapshot elegido.',
    confirmText: 'Aplicar',
    onConfirm: () => {
      applyProfileData(snap.data || {});
      showToast('Snapshot aplicado', 'success');
    }
  });
}

function deleteSnapshot(id) {
  const idx = snapshots.findIndex(s => s.id === id);
  if (idx < 0) return;
  confirmAction({
    title: 'Eliminar snapshot',
    message: 'Se borrará el respaldo local seleccionado.',
    confirmText: 'Eliminar',
    onConfirm: () => {
      snapshots.splice(idx, 1);
      persist();
      renderSnapshots();
      showToast('Snapshot eliminado', 'success');
    }
  });
}

function setMoneyValue(el, value) {
  if (!el) return;
  const numeric = parseMoney(value);
  el.dataset.raw = numeric ? String(Math.trunc(numeric)) : '';
  el.value = numeric ? number.format(numeric) : '';
}

function extractVariables(body = '') {
  const matches = body.match(/{{(.*?)}}/g) || [];
  const vars = matches.map(m => m.replace(/[{}]/g, '').trim()).filter(Boolean);
  return Array.from(new Set(vars));
}

let vehicles = cloneVehicles(load('vehicles') || defaultVehicles);
let templates = ensureTemplateIds(load('templates') || defaultTemplates);
let clients = load('clients') || [];
let uiState = { ...defaultUiState, ...(load('uiState') || {}) };
let selectedTemplateIndex = Math.min(uiState.selectedTemplateIndex || 0, templates.length - 1);
let planDraftApplied = false;
let snapshots = load('snapshots') || [];

uiState.templateSearch = uiState.templateSearch || '';
uiState.clientSearch = uiState.clientSearch || '';
uiState.profileSearch = uiState.profileSearch || '';
let selectedTemplateId = templates[selectedTemplateIndex]?.id;

uiState.variableValues = uiState.variableValues || {};
uiState.toggles = { ...defaultUiState.toggles, ...(uiState.toggles || {}) };
uiState.planDraft = uiState.planDraft || {};

init();

function init() {
  try {
    bindNavigation();
    bindProfileActions();
    bindSettingsMenu();
    applyToggleState();
    renderStats();
    renderQuickOverview();
    renderTemplates();
    renderVehicleTable();
    renderPlanForm();
    renderClients();
    renderSnapshots();
    attachPlanListeners();
    attachTemplateActions();
    attachVehicleToggles();
    document.getElementById('clearStorage').addEventListener('click', clearStorage);
  } catch (err) {
    console.error('Error during initialization:', err);
  }
}

function bindNavigation() {
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.target);
      if (target) {
        target.classList.add('active');
      }
    });
  });
}

function bindSettingsMenu() {
  const toggle = document.getElementById('settingsToggle');
  const panel = document.getElementById('settingsPanel');
  if (!toggle || !panel) return;
  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !toggle.contains(e.target)) {
      panel.classList.remove('open');
    }
  });
}

function applyToggleState() {
  const toggles = uiState.toggles || defaultUiState.toggles;
  const res = document.getElementById('showReservations');
  const integ = document.getElementById('showIntegration');
  if (res) res.checked = toggles.showReservations;
  if (integ) integ.checked = toggles.showIntegration;
}

function renderStats() {
  document.getElementById('modelCount').textContent = vehicles.length;
  document.getElementById('templateCount').textContent = templates.length;
  document.getElementById('clientCount').textContent = clients.length;
}

function renderQuickOverview() {
  const steps = [
    { icon: '💬', title: 'Contacto inmediato', text: 'Usa la plantilla de inicio con variables y comprueba si sigue con su Chevrolet actual.' },
    { icon: '🧾', title: 'Cotización InfoAuto', text: 'Comparte la guía oficial y arma la propuesta con valores de fábrica y cuotas en pesos.' },
    { icon: '🔑', title: 'Llave por llave', text: 'Confirma entrega de usado al momento de retirar el 0 km. Sin sorteo ni licitación.' },
    { icon: '📦', title: 'Plan y reservas', text: 'Bloquea cupo con 1, 3 o 6 cuotas. Planes sin interés y pre cancelables.' }
  ];
  const container = document.getElementById('quickOverview');
  container.innerHTML = steps.map(step => `
    <div class="timeline-step">
      <div class="icon">${step.icon}</div>
      <div>
        <strong>${step.title}</strong>
        <p class="muted">${step.text}</p>
      </div>
    </div>
  `).join('');
}

function renderTemplates() {
  const list = document.getElementById('templateList');
  const searchInput = document.getElementById('templateSearch');
  if (searchInput && searchInput.value !== uiState.templateSearch) {
    searchInput.value = uiState.templateSearch || '';
  }
  if (!templates.length) {
    list.innerHTML = '<p class="muted">Sin plantillas cargadas.</p>';
    renderStats();
    return;
  }
  const search = (uiState.templateSearch || '').toLowerCase();
  const filtered = templates.filter(t => t.title.toLowerCase().includes(search) || t.body.toLowerCase().includes(search));
  if (!filtered.length) {
    list.innerHTML = '<p class="muted">Sin coincidencias.</p>';
    return;
  }
  list.innerHTML = filtered.map((tpl) => `
    <div class="template-item ${tpl.id === selectedTemplateId ? 'active' : ''}" data-id="${tpl.id}">
      <div class="controls">
        <h4>${tpl.title}</h4>
        <div class="small-actions">
          <button class="mini-btn" data-action="move-up" data-id="${tpl.id}" title="Subir"><i class='bx bx-up-arrow-alt'></i></button>
          <button class="mini-btn" data-action="move-down" data-id="${tpl.id}" title="Bajar"><i class='bx bx-down-arrow-alt'></i></button>
          <button class="mini-btn" data-action="delete" data-id="${tpl.id}" title="Eliminar"><i class='bx bx-trash'></i></button>
        </div>
      </div>
      <p>${tpl.body.slice(0, 120)}${tpl.body.length > 120 ? '…' : ''}</p>
      <span class="pill">${extractVariables(tpl.body).length || 0} variables</span>
    </div>
  `).join('');

  list.querySelectorAll('.template-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const id = item.dataset.id;
      if ((e.target.closest('.mini-btn'))) return;
      selectedTemplateId = id;
      selectedTemplateIndex = templates.findIndex(t => t.id === id);
      uiState.selectedTemplateIndex = selectedTemplateIndex;
      persist();
      renderTemplates();
    });
  });

  list.querySelectorAll('.mini-btn').forEach(btn => {
    const id = btn.dataset.id;
    if (btn.dataset.action === 'delete') {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        confirmAction({
          title: 'Eliminar plantilla',
          message: 'Se quitará la plantilla seleccionada.',
          confirmText: 'Eliminar',
          onConfirm: () => deleteTemplate(id)
        });
      });
    }
    if (btn.dataset.action === 'move-up') {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        moveTemplate(id, -1);
      });
    }
    if (btn.dataset.action === 'move-down') {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        moveTemplate(id, 1);
      });
    }
  });

  const currentTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];
  selectedTemplateId = currentTemplate.id;
  selectedTemplateIndex = templates.findIndex(t => t.id === selectedTemplateId);
  uiState.selectedTemplateIndex = selectedTemplateIndex;
  loadTemplate(selectedTemplateIndex);
  renderStats();
}

function loadTemplate(idx) {
  const tpl = templates[idx] || templates[0] || { title: '', body: '' };
  document.getElementById('templateTitle').value = tpl?.title || '';
  document.getElementById('templateBody').value = tpl?.body || '';
  renderVariableInputs(extractVariables(tpl?.body));
  uiState.selectedTemplateIndex = idx;
  persist();
  setTimeout(updatePreview, 0);
}

function renderVariableInputs(vars = []) {
  const chips = document.getElementById('variableChips');
  const inputs = document.getElementById('variableInputs');
  if (!vars.length) {
    chips.innerHTML = `<span class="chip muted">Sin variables en esta plantilla</span>`;
    inputs.innerHTML = `<p class="muted tiny">Agrega {{variable}} en el texto para habilitar reemplazos.</p>`;
    setTimeout(updatePreview, 0);
    return;
  }
  chips.innerHTML = vars.map(v => `<span class="chip compact" data-var="${v}">{{${v}}}</span>`).join('');
  chips.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => insertVariable(chip.dataset.var)));

  inputs.innerHTML = vars.map(v => `
    <div class="field inline-variable">
      <label>${v}</label>
      <input data-var="${v}" placeholder="${v}">
    </div>`).join('');

  inputs.querySelectorAll('input').forEach(inp => {
    inp.value = uiState.variableValues?.[inp.dataset.var] || '';
    inp.addEventListener('input', () => {
      uiState.variableValues[inp.dataset.var] = inp.value;
      persist();
      updatePreview();
    });
  });
  
  // Trigger initial preview update
  setTimeout(updatePreview, 0);
}

function insertVariable(variable) {
  const textarea = document.getElementById('templateBody');
  const cursor = textarea.selectionStart || 0;
  const text = textarea.value;
  const insertion = `{{${variable}}}`;
  textarea.value = text.slice(0, cursor) + insertion + text.slice(cursor);
  textarea.focus();
  renderVariableInputs(extractVariables(textarea.value));
  updatePreview();
}

function deleteTemplate(id) {
  const idx = templates.findIndex(t => t.id === id);
  if (idx < 0) return;
  templates.splice(idx, 1);
  if (!templates.length) {
    templates = ensureTemplateIds([...defaultTemplates]);
  }
  selectedTemplateIndex = Math.max(0, Math.min(selectedTemplateIndex, templates.length - 1));
  selectedTemplateId = templates[selectedTemplateIndex].id;
  persist();
  renderTemplates();
  showToast('Plantilla eliminada', 'success');
}

function moveTemplate(id, direction) {
  const idx = templates.findIndex(t => t.id === id);
  if (idx < 0) return;
  const newIndex = idx + direction;
  if (newIndex < 0 || newIndex >= templates.length) return;
  const [tpl] = templates.splice(idx, 1);
  templates.splice(newIndex, 0, tpl);
  selectedTemplateIndex = newIndex;
  selectedTemplateId = tpl.id;
  persist();
  renderTemplates();
}

function updatePreview() {
  const body = document.getElementById('templateBody').value || '';
  const values = { ...(uiState.variableValues || {}) };
  const inputs = document.querySelectorAll('#variableInputs input');
  inputs.forEach(inp => {
    values[inp.dataset.var] = inp.value || '';
  });
  const replaced = body.replace(/{{(.*?)}}/g, (_, key) => {
    const k = key.trim();
    return values[k] !== undefined && values[k] !== '' ? values[k] : `{{${k}}}`;
  });
  const preview = document.getElementById('templatePreview');
  if (preview) {
    preview.textContent = replaced;
  }
}

function attachTemplateActions() {
  const templateSearch = document.getElementById('templateSearch');
  if (templateSearch) {
    templateSearch.value = uiState.templateSearch || '';
    templateSearch.addEventListener('input', () => {
      uiState.templateSearch = templateSearch.value;
      persist();
      renderTemplates();
    });
  }
  document.getElementById('templateTitle').addEventListener('input', e => {
    if (templates[selectedTemplateIndex]) {
      templates[selectedTemplateIndex].title = e.target.value;
      persist();
      renderTemplates();
    }
  });

  document.getElementById('templateBody').addEventListener('input', () => {
    if (templates[selectedTemplateIndex]) {
      templates[selectedTemplateIndex].body = document.getElementById('templateBody').value;
      persist();
      updatePreview();
      renderVariableInputs(extractVariables(templates[selectedTemplateIndex].body));
      renderTemplates();
    }
  });

  document.getElementById('saveTemplate').addEventListener('click', () => {
    const title = document.getElementById('templateTitle').value.trim();
    const body = document.getElementById('templateBody').value.trim();
    if (!title || !body) return;
    templates[selectedTemplateIndex] = { ...(templates[selectedTemplateIndex] || {}), title, body };
    persist();
    renderVariableInputs(extractVariables(body));
    renderTemplates();
  });

  document.getElementById('copyTemplate').addEventListener('click', async () => {
    const text = document.getElementById('templatePreview').textContent;
    await navigator.clipboard.writeText(text);
    const status = document.getElementById('copyStatus');
    status.textContent = 'Copiado con variables reemplazadas';
    setTimeout(() => status.textContent = '', 2000);
  });

  document.getElementById('addTemplate').addEventListener('click', () => {
    const id = `tpl-${Date.now()}`;
    templates.push({ id, title: 'Nueva plantilla', body: 'Mensaje personalizado con {{cliente}}' });
    selectedTemplateIndex = templates.length - 1;
    selectedTemplateId = id;
    uiState.selectedTemplateIndex = selectedTemplateIndex;
    persist();
    renderTemplates();
  });
}

function renderVehicleTable() {
  const resToggle = document.getElementById('showReservations');
  const intToggle = document.getElementById('showIntegration');
  const showRes = resToggle ? resToggle.checked : true;
  const showInt = intToggle ? intToggle.checked : true;
  uiState.toggles = { showReservations: showRes, showIntegration: showInt };
  persist();
  const table = document.getElementById('vehicleTable');
  if (!table) return;
  const plans = ['2a12', '13a21', '22a84', '85a120', 'ctapura'];
  const labels = {
    '2a12': 'Cuota 2 a 12',
    '13a21': 'Cuota 13 a 21',
    '22a84': 'Cuota 22 a 84',
    '85a120': 'Cuota 85 a 120',
    'ctapura': 'Cuota pura'
  };
  const head = `<tr><th>Plan</th>${vehicles.map(v => `<th>${v.name}</th>`).join('')}</tr>`;
  const bodyRows = plans.map(plan => {
    return `<tr><td>${labels[plan]}</td>${vehicles.map((v, idx) => {
      const value = v.shareByPlan[plan] ?? v.cuotaPura;
      return `
        <td>
          <div class="money-field">
            <span class="prefix">$</span>
            <input class="money" type="text" inputmode="numeric" data-vehicle="${idx}" data-plan="${plan}" value="${value ? number.format(value) : ''}" data-raw="${value || ''}" placeholder="$ 0">
          </div>
        </td>`;
    }).join('')}</tr>`;
  });

  if (showRes) {
    ['1', '3', '6'].forEach(res => {
      bodyRows.push(`<tr><td>Reserva ${res} cuota(s)</td>${vehicles.map((v, idx) => {
        const value = v.reservations[res];
        return `<td>
          <div class="money-field">
            <span class="prefix">$</span>
            <input class="money" type="text" inputmode="numeric" data-vehicle="${idx}" data-reserva="${res}" value="${value ? number.format(value) : ''}" data-raw="${value || ''}" placeholder="$ 0">
          </div>
        </td>`;
      }).join('')}</tr>`);
    });
  }

  if (showInt) {
    bodyRows.push(`<tr><td>Integración</td>${vehicles.map((v, idx) => {
      return `<td>
        <div class="money-field">
          <span class="prefix">$</span>
          <input class="money" type="text" inputmode="numeric" data-vehicle="${idx}" data-integration="true" value="${v.integration ? number.format(v.integration) : ''}" data-raw="${v.integration || ''}" placeholder="$ 0">
        </div>
      </td>`;
    }).join('')}</tr>`);
    bodyRows.push(`<tr><td>Precio de lista</td>${vehicles.map((v, idx) => `
      <td>
        <div class="money-field">
          <span class="prefix">$</span>
          <input class="money" type="text" inputmode="numeric" data-vehicle="${idx}" data-base="true" value="${v.basePrice ? number.format(v.basePrice) : ''}" data-raw="${v.basePrice || ''}" placeholder="$ 0">
        </div>
      </td>`).join('')}</tr>`);
  }

  table.querySelector('thead').innerHTML = head;
  table.querySelector('tbody').innerHTML = bodyRows.join('');

  table.querySelectorAll('input').forEach(inp => {
    bindMoneyInput(inp, () => updateVehicleValue({ target: inp }));
  });
}

function updateVehicleValue(e) {
  const { vehicle } = e.target.dataset;
  const idx = Number(vehicle);
  const val = parseMoney(e.target.dataset.raw || e.target.value || 0);
  if ('plan' in e.target.dataset) {
    vehicles[idx].shareByPlan[e.target.dataset.plan] = val;
  } else if (e.target.dataset.reserva) {
    vehicles[idx].reservations[e.target.dataset.reserva] = val;
  } else if (e.target.dataset.integration) {
    vehicles[idx].integration = val;
  } else if (e.target.dataset.base) {
    vehicles[idx].basePrice = val;
  }
  persist();
  renderPlanForm();
}

function renderPlanForm() {
  const select = document.getElementById('planModel');
  const currentValue = select.value;
  select.innerHTML = vehicles.map((v, idx) => `<option value="${idx}">${v.name}</option>`).join('');
  select.value = uiState.planDraft?.planModel ?? currentValue ?? 0;
  if (!select.dataset.bound) {
    select.addEventListener('change', updatePlanSummary);
    document.getElementById('planType').addEventListener('change', updatePlanSummary);
    document.getElementById('tradeIn').addEventListener('change', updatePlanSummary);
    bindMoneyInput(document.getElementById('tradeInValue'), updatePlanSummary);
    document.getElementById('clientName').addEventListener('input', updatePlanSummary);
    document.getElementById('clientContact').addEventListener('input', updatePlanSummary);
    document.getElementById('notes').addEventListener('input', updatePlanSummary);
    select.dataset.bound = 'true';
  }
  if (!planDraftApplied) {
    applyPlanDraft();
    planDraftApplied = true;
  }
  updatePlanSummary();
}

function updatePlanSummary() {
  const modelIdx = Number(document.getElementById('planModel').value || 0);
  const plan = document.getElementById('planType').value;
  const tradeIn = document.getElementById('tradeIn').checked;
  const tradeInInput = document.getElementById('tradeInValue');
  const tradeInValue = parseMoney(tradeInInput?.dataset.raw || tradeInInput?.value || 0);
  const v = vehicles[modelIdx] || vehicles[0];
  if (!v) return;
  const cuota = v.shareByPlan[plan] ?? v.cuotaPura;
  const reserva1 = v.reservations['1'];
  const total = v.integration;
  const outstanding = Math.max(total - (tradeIn ? tradeInValue : 0), 0);
  const tradeInFormatted = tradeInValue ? currency.format(tradeInValue) : 'a definir';

  const rows = [
    { label: 'Modelo', value: v.name },
    { label: 'Plan', value: planLabel(plan) },
    { label: 'Cuota estimada', value: cuota ? currency.format(cuota) : 'Completar manual' },
    { label: 'Reserva mínima', value: currency.format(reserva1) },
    { label: 'Integración', value: currency.format(total) },
    { label: 'Entrega llave por llave', value: tradeIn ? `Sí (toma usado por ${tradeInFormatted})` : 'No' },
    { label: 'Saldo estimado', value: currency.format(outstanding) }
  ];

  const summary = document.getElementById('planSummary');
  summary.innerHTML = rows.map(r => `
    <div class="summary-row">
      <span>${r.label}</span>
      <strong>${r.value}</strong>
    </div>
  `).join('');
  savePlanDraft();
}

function planLabel(key) {
  return {
    '2a12': 'Cuota 2 a 12',
    '13a21': 'Cuota 13 a 21',
    '22a84': 'Cuota 22 a 84',
    '85a120': 'Cuota 85 a 120',
    'ctapura': 'Cuota pura'
  }[key] || key;
}

function applyPlanDraft() {
  const draft = uiState.planDraft || {};
  if (draft.planModel !== undefined) document.getElementById('planModel').value = draft.planModel;
  if (draft.planType) document.getElementById('planType').value = draft.planType;
  document.getElementById('tradeIn').checked = draft.tradeIn !== undefined ? draft.tradeIn : true;
  setMoneyValue(document.getElementById('tradeInValue'), draft.tradeInValue || '');
  document.getElementById('clientName').value = draft.clientName || '';
  document.getElementById('clientContact').value = draft.clientContact || '';
  document.getElementById('notes').value = draft.notes || '';
}

function savePlanDraft() {
  uiState.planDraft = {
    planModel: document.getElementById('planModel').value,
    planType: document.getElementById('planType').value,
    tradeIn: document.getElementById('tradeIn').checked,
    tradeInValue: parseMoney(document.getElementById('tradeInValue').dataset.raw || document.getElementById('tradeInValue').value),
    clientName: document.getElementById('clientName').value,
    clientContact: document.getElementById('clientContact').value,
    notes: document.getElementById('notes').value
  };
  persist();
}

function attachPlanListeners() {
  document.getElementById('saveClient').addEventListener('click', () => {
    const name = document.getElementById('clientName').value.trim();
    if (!name) return;
    const contact = document.getElementById('clientContact').value.trim();
    const modelIdx = Number(document.getElementById('planModel').value || 0);
    const plan = document.getElementById('planType').value;
    const tradeIn = document.getElementById('tradeIn').checked;
    const tradeInValue = parseMoney(document.getElementById('tradeInValue').value || 0);
    const notes = document.getElementById('notes').value.trim();
    const v = vehicles[modelIdx];
    const cuota = v.shareByPlan[plan] ?? v.cuotaPura;

    const client = { name, contact, model: v.name, plan, tradeIn, tradeInValue, notes, cuota, timestamp: new Date().toISOString() };
    clients = clients.filter(c => c.name !== name);
    clients.push(client);
    persist();
    renderClients();
    renderStats();
    showToast('Cliente guardado', 'success');
  });

  const clientSearch = document.getElementById('clientSearch');
  if (clientSearch) {
    clientSearch.value = uiState.clientSearch || '';
    clientSearch.addEventListener('input', () => {
      uiState.clientSearch = clientSearch.value;
      persist();
      renderClients();
    });
  }
}

function renderClients() {
  const list = document.getElementById('clientList');
  const searchInput = document.getElementById('clientSearch');
  if (searchInput && searchInput.value !== uiState.clientSearch) {
    searchInput.value = uiState.clientSearch || '';
  }
  const search = (uiState.clientSearch || '').toLowerCase();
  const filtered = clients.filter(c => c.name.toLowerCase().includes(search) || c.model.toLowerCase().includes(search));
  if (!filtered.length) {
    list.innerHTML = '<p class="muted">Sin clientes aún.</p>';
    return;
  }
  list.innerHTML = filtered.map((c) => {
    const idx = clients.indexOf(c);
    return `
    <div class="client-card" data-idx="${idx}">
      <button class="delete-btn" data-idx="${idx}" title="Eliminar"><i class='bx bx-x'></i></button>
      <div class="row">
        <h4>${c.name}</h4>
        <span class="tag">${planLabel(c.plan)}</span>
      </div>
      <p>${c.model} · ${currency.format(c.cuota || 0)}</p>
      <p class="muted">${c.tradeIn ? `Entrega usado: ${currency.format(c.tradeInValue || 0)}` : 'Sin entrega'} · ${new Date(c.timestamp).toLocaleString('es-AR')}</p>
    </div>
  `;
  }).join('');

  list.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const idx = Number(btn.dataset.idx);
    confirmAction({
      title: 'Eliminar cliente',
      message: 'Se quitará el registro seleccionado.',
      confirmText: 'Eliminar',
      onConfirm: () => {
        clients.splice(idx, 1);
        persist();
        renderClients();
        renderStats();
        showToast('Cliente eliminado', 'success');
      }
    });
  }));

  list.querySelectorAll('.client-card').forEach(card => card.addEventListener('click', () => {
    const c = clients[Number(card.dataset.idx)];
    if (!c) return;
    document.getElementById('clientName').value = c.name;
    document.getElementById('clientContact').value = c.contact;
    const found = vehicles.findIndex(v => v.name === c.model);
    document.getElementById('planModel').value = found >= 0 ? found : 0;
    document.getElementById('planType').value = c.plan;
    document.getElementById('tradeIn').checked = c.tradeIn;
    setMoneyValue(document.getElementById('tradeInValue'), c.tradeInValue || '');
    document.getElementById('notes').value = c.notes;
    updatePlanSummary();
  }));
}

function attachVehicleToggles() {
  const res = document.getElementById('showReservations');
  const integ = document.getElementById('showIntegration');
  res.addEventListener('change', () => {
    uiState.toggles.showReservations = res.checked;
    persist();
    renderVehicleTable();
  });
  integ.addEventListener('change', () => {
    uiState.toggles.showIntegration = integ.checked;
    persist();
    renderVehicleTable();
  });
}

function bindProfileActions() {
  document.getElementById('quickSnapshot').addEventListener('click', saveSnapshot);

  document.getElementById('exportProfile').addEventListener('click', () => {
    confirmAction({
      title: 'Exportar perfil',
      message: 'Descargarás un respaldo con vehículos, plantillas y clientes.',
      confirmText: 'Exportar',
      onConfirm: () => {
        const payload = { version: 2, vehicles, templates, clients, uiState };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chevrolet-plan-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showToast('Perfil exportado', 'success');
      }
    });
  });

  document.getElementById('importProfile').addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (!file) return;
    confirmAction({
      title: 'Importar perfil',
      message: `Se reemplazarán datos actuales por ${file.name}.`,
      confirmText: 'Importar',
      onConfirm: () => {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const parsed = JSON.parse(reader.result);
            applyProfileData(parsed);
            showToast('Perfil importado y aplicado', 'success');
          } catch (err) {
            showToast('No se pudo leer el perfil.', 'error');
          } finally {
            e.target.value = '';
          }
        };
        reader.readAsText(file);
      }
    });
  });

  const profileSearch = document.getElementById('profileSearch');
  if (profileSearch) {
    profileSearch.value = uiState.profileSearch || '';
    profileSearch.addEventListener('input', () => {
      uiState.profileSearch = profileSearch.value;
      persist();
      renderSnapshots();
    });
  }

  const resetBtn = document.getElementById('resetDefaults');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      confirmAction({
        title: 'Restaurar valores base',
        message: 'Se repondrán vehículos y plantillas originales, manteniendo los clientes.',
        confirmText: 'Restaurar',
        onConfirm: () => {
          vehicles = cloneVehicles(defaultVehicles);
          templates = ensureTemplateIds([...defaultTemplates]);
          selectedTemplateIndex = 0;
          selectedTemplateId = templates[0].id;
          planDraftApplied = false;
          persist();
          renderVehicleTable();
          renderTemplates();
          renderPlanForm();
          renderStats();
          showToast('Valores base restaurados', 'success');
        }
      });
    });
  }
}

function persist() {
  save('vehicles', vehicles);
  save('templates', templates);
  save('clients', clients);
  save('uiState', uiState);
  save('snapshots', snapshots);
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function load(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function clearStorage() {
  confirmAction({
    title: 'Limpiar datos locales',
    message: 'Se eliminarán clientes, plantillas y valores personalizados.',
    confirmText: 'Limpiar',
    onConfirm: () => {
      localStorage.clear();
      vehicles = defaultVehicles.map(v => ({ ...v, shareByPlan: { ...v.shareByPlan }, reservations: { ...v.reservations } }));
      templates = ensureTemplateIds([...defaultTemplates]);
      clients = [];
      snapshots = [];
      uiState = { ...defaultUiState, templateSearch: '', clientSearch: '', profileSearch: '' };
      selectedTemplateIndex = 0;
      selectedTemplateId = templates[0].id;
      planDraftApplied = false;
      applyToggleState();
      renderVehicleTable();
      renderTemplates();
      renderPlanForm();
      renderClients();
      renderSnapshots();
      renderStats();
      persist();
      showToast('Datos locales eliminados', 'success');
    }
  });
}

