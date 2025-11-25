const currency = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
const number = new Intl.NumberFormat('es-AR');

const defaultUiState = {
  selectedTemplateIndex: 0,
  variableValues: {},
  planDraft: {},
  toggles: { showReservations: true, showIntegration: true },
  globalSettings: {
    advisorName: 'Equipo Chevrolet',
    clientType: 'Cliente de la marca',
    statusPalette: {
      contacted: { color: '#34d399', opacity: 0.16 },
      noNumber: { color: '#f87171', opacity: 0.16 },
      favorite: { color: '#f6b04b', opacity: 0.16 },
      pending: { color: '#9fb1c5', opacity: 0.14 }
    }
  },
  advisorNote: ''
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

const clientColumns = {
  name: { label: 'Nombre', default: true },
  model: { label: 'Modelo', default: true },
  phone: { label: 'Celular', default: true },
  brand: { label: 'Marca', default: false },
  city: { label: 'Localidad', default: false },
  province: { label: 'Provincia', default: false },
  document: { label: 'Documento', default: false },
  cuit: { label: 'CUIT', default: false },
  birthDate: { label: 'Nacimiento', default: false },
  purchaseDate: { label: 'Fecha compra', default: false },
  postalCode: { label: 'CP', default: false },
  type: { label: 'Tipo', default: false }
};

const defaultClientManagerState = {
  search: '',
  statusFilter: 'all',
  groupByModel: true,
  showOnlySelected: false,
  columnVisibility: Object.fromEntries(Object.keys(clientColumns).map(k => [k, !!clientColumns[k].default])),
  selection: {}
};

const clientColumnWidths = {
  name: '240px',
  model: '190px',
  phone: '170px',
  brand: '160px',
  city: '160px',
  province: '160px',
  document: '160px',
  cuit: '160px',
  birthDate: '170px',
  purchaseDate: '170px',
  postalCode: '120px',
  type: '170px',
  status: '180px',
  actions: '300px'
};

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
  managerClients = parsed.managerClients || [];
  uiState = { ...defaultUiState, ...(parsed.uiState || {}) };
  clientManagerState = { ...defaultClientManagerState, ...(parsed.clientManagerState || {}) };
  clientManagerState.columnVisibility = { ...defaultClientManagerState.columnVisibility, ...(clientManagerState.columnVisibility || {}) };
  uiState.templateSearch = uiState.templateSearch || '';
  uiState.clientSearch = uiState.clientSearch || '';
  uiState.profileSearch = uiState.profileSearch || '';
  uiState.globalSettings = mergeGlobalSettings(uiState.globalSettings);
  selectedTemplateIndex = Math.min(uiState.selectedTemplateIndex || 0, templates.length - 1);
  selectedTemplateId = templates[selectedTemplateIndex]?.id;
  planDraftApplied = false;
  persist();
  applyToggleState();
  applyStatusPalette();
  renderVehicleTable();
  renderTemplates();
  renderPlanForm();
  renderClients();
  renderClientManager();
  renderGlobalSettings();
  renderSnapshots();
  renderStats();
}

function saveSnapshot() {
  const title = `Snapshot ${new Date().toLocaleString('es-AR')}`;
  const data = {
    vehicles: cloneVehicles(vehicles),
    templates: ensureTemplateIds(JSON.parse(JSON.stringify(templates))),
    clients: JSON.parse(JSON.stringify(clients)),
    managerClients: JSON.parse(JSON.stringify(managerClients)),
    uiState: { ...uiState },
    clientManagerState: { ...clientManagerState }
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

function mergeGlobalSettings(current = {}) {
  const base = defaultUiState.globalSettings;
  const palette = current.statusPalette || {};
  return {
    advisorName: current.advisorName || base.advisorName,
    clientType: current.clientType || base.clientType,
    statusPalette: {
      contacted: { ...base.statusPalette.contacted, ...(palette.contacted || {}) },
      noNumber: { ...base.statusPalette.noNumber, ...(palette.noNumber || {}) },
      favorite: { ...base.statusPalette.favorite, ...(palette.favorite || {}) },
      pending: { ...base.statusPalette.pending, ...(palette.pending || {}) }
    }
  };
}

function parseExcelDate(value) {
  if (value instanceof Date) return value;
  if (typeof value === 'number' && Number.isFinite(value) && value > 20000) {
    const parsed = XLSX?.SSF?.parse_date_code(value);
    if (parsed) {
      const { y, m, d } = parsed;
      return new Date(Date.UTC(y, (m || 1) - 1, d || 1));
    }
  }
  if (typeof value === 'string') {
    const numeric = Number(value);
    if (Number.isFinite(numeric) && numeric > 20000) return parseExcelDate(numeric);
    const parts = value.split(/[\/\-]/);
    if (parts.length === 3) {
      const [a, b, c] = parts.map(p => Number(p));
      if ([a, b, c].every(n => Number.isFinite(n))) {
        if (a > 1900) return new Date(Date.UTC(a, (b || 1) - 1, c || 1));
        if (c > 1900) return new Date(Date.UTC(c, (b || 1) - 1, a || 1));
      }
    }
    const iso = new Date(value);
    if (!Number.isNaN(iso.getTime())) return iso;
  }
  return null;
}

function formatDateISO(value) {
  const date = parseExcelDate(value);
  if (!date) return '';
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateForDisplay(value) {
  const iso = formatDateISO(value);
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function extractYear(value) {
  const iso = formatDateISO(value);
  if (iso) return iso.slice(0, 4);
  const text = (value || '').toString();
  const match = text.match(/(19|20)\d{2}/);
  return match ? match[0] : '';
}

function normalizePhone(value) {
  return String(value || '').replace(/\D/g, '');
}

function clientStatus(client = {}) {
  const flags = client.flags || {};
  if (flags.noNumber) return { label: 'Número no disponible', className: 'status-no-number' };
  if (flags.favorite) return { label: 'Favorito', className: 'status-favorite' };
  if (flags.contacted) return { label: 'Contactado', className: 'status-contacted' };
  return { label: 'Pendiente', className: 'status-pending' };
}

function initialTemplate() {
  return templates.find(t => (t.title || '').toLowerCase().includes('inicio')) || templates[0];
}

function buildMessageForClient(client) {
  const tpl = initialTemplate();
  if (!tpl) return '';
  const globalSettings = mergeGlobalSettings(uiState.globalSettings);
  const year = extractYear(client.purchaseDate || client.birthDate || '');
  const replacements = {
    cliente: client.name || '',
    asesor: globalSettings.advisorName || '',
    tipo: client.type || globalSettings.clientType || '',
    modelo_actual: client.model || client.brand || '',
    modelo_nuevo: uiState.planDraft?.planModel !== undefined ? vehicles[uiState.planDraft.planModel]?.name : '',
    telefono: client.phone || '',
    anio_retiro: year,
    plan: client.plan || '',
    cuota: client.cuota ? currency.format(client.cuota) : '',
    entrega_usado: client.tradeIn ? 'Sí' : 'No',
    valor_efectivo: client.tradeInValue ? currency.format(client.tradeInValue) : '',
    version: client.version || ''
  };
  let content = tpl.body || '';
  extractVariables(content).forEach(key => {
    const value = replacements[key] ?? uiState.variableValues[key] ?? '';
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'gi');
    content = content.replace(regex, value);
  });
  return content;
}

function copyText(text, label = 'Contenido copiado') {
  if (!text) return;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast(label, 'success')).catch(() => showToast('No se pudo copiar.', 'error'));
  } else {
    const area = document.createElement('textarea');
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
    showToast(label, 'success');
  }
}

let vehicles = cloneVehicles(load('vehicles') || defaultVehicles);
let templates = ensureTemplateIds(load('templates') || defaultTemplates);
let clients = load('clients') || [];
let managerClients = load('managerClients') || [];
let uiState = { ...defaultUiState, ...(load('uiState') || {}) };
let clientManagerState = { ...defaultClientManagerState, ...(load('clientManagerState') || {}) };
let selectedTemplateIndex = Math.min(uiState.selectedTemplateIndex || 0, templates.length - 1);
let planDraftApplied = false;
let snapshots = load('snapshots') || [];

uiState.templateSearch = uiState.templateSearch || '';
uiState.clientSearch = uiState.clientSearch || '';
uiState.profileSearch = uiState.profileSearch || '';
uiState.globalSettings = mergeGlobalSettings(uiState.globalSettings);
let selectedTemplateId = templates[selectedTemplateIndex]?.id;

uiState.variableValues = uiState.variableValues || {};
uiState.toggles = { ...defaultUiState.toggles, ...(uiState.toggles || {}) };
uiState.planDraft = uiState.planDraft || {};
clientManagerState.columnVisibility = { ...defaultClientManagerState.columnVisibility, ...(clientManagerState.columnVisibility || {}) };

init();

function init() {
  try {
    bindNavigation();
    bindProfileActions();
    bindSettingsMenu();
    bindActionMenu();
    bindSidebarToggle();
    bindQuickLinks();
    applyToggleState();
    applyStatusPalette();
    renderStats();
    renderWelcomeHero();
    renderQuickOverview();
    renderHomeShortcuts();
    renderTemplates();
    renderVehicleTable();
    renderPlanForm();
    renderClients();
    renderClientManager();
    renderGlobalSettings();
    renderSnapshots();
    attachPlanListeners();
    attachTemplateActions();
    attachVehicleToggles();
    bindClientManager();
    startRealtimePersistence();
    document.getElementById('clearStorage').addEventListener('click', clearStorage);
  } catch (err) {
    console.error('Error during initialization:', err);
  }
}

function bindNavigation() {
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      activatePanel(btn.dataset.target);
    });
  });
}

function activatePanel(targetId) {
  document.querySelectorAll('.nav-link').forEach(b => b.classList.toggle('active', b.dataset.target === targetId));
  document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === targetId));
}

function bindQuickLinks() {
  document.querySelectorAll('[data-jump]').forEach(btn => btn.addEventListener('click', () => activatePanel(btn.dataset.jump)));
}

function bindSidebarToggle() {
  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  if (!toggle || !sidebar) return;
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('menu-collapsed');
    toggle.setAttribute('aria-pressed', document.body.classList.contains('menu-collapsed'));
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

function bindActionMenu() {
  const toggle = document.getElementById('actionMenuToggle');
  const panel = document.getElementById('actionMenuPanel');
  const wrapper = document.getElementById('actionMenu');
  if (!toggle || !panel || !wrapper) return;
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) panel.classList.remove('open');
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
  document.getElementById('clientCount').textContent = clients.length + managerClients.length;
  renderWelcomeHero();
  renderAdvisorNote();
}

function renderWelcomeHero() {
  const heading = document.getElementById('dashboardHeading');
  const subtitle = document.getElementById('dashboardSubtitle');
  const helper = document.getElementById('advisorHelper');
  const input = document.getElementById('advisorInput');
  const saveBtn = document.getElementById('advisorSave');
  const resetBtn = document.getElementById('advisorReset');
  const datalist = document.getElementById('advisorSuggestions');
  if (!heading || !subtitle) return;

  const settings = mergeGlobalSettings(uiState.globalSettings);
  const advisor = (settings.advisorName || '').trim();
  heading.textContent = advisor ? `Panel de ${advisor}` : 'Control de vendedores y accesos';
  subtitle.textContent = advisor ? 'Personalización activa para tu jornada.' : 'Define quién atiende y salta directo a los flujos clave.';
  if (helper) helper.textContent = advisor ? `Vendedor activo: ${advisor}. Puedes ajustarlo cuando quieras.` : 'Personaliza el panel y se guarda en tu dispositivo.';

  const suggestions = Array.from(new Set([
    'Equipo Chevrolet',
    'Sofía Alvarez',
    'Martín Rivas',
    'Agustina Torres',
    advisor
  ].filter(Boolean)));
  if (datalist) {
    datalist.innerHTML = suggestions.map(name => `<option value="${name}"></option>`).join('');
  }

  if (input && input.value !== advisor) input.value = advisor;

  const saveAdvisor = () => {
    uiState.globalSettings.advisorName = (input?.value || '').trim();
    persist();
    renderGlobalSettings();
    renderWelcomeHero();
    showToast('Vendedor actualizado', 'success');
  };

  if (saveBtn && !saveBtn.dataset.bound) {
    saveBtn.addEventListener('click', saveAdvisor);
    saveBtn.dataset.bound = 'true';
  }

  if (resetBtn && !resetBtn.dataset.bound) {
    resetBtn.addEventListener('click', () => {
      if (input) input.value = '';
      uiState.globalSettings.advisorName = '';
      persist();
      renderGlobalSettings();
      renderWelcomeHero();
      showToast('Se limpió el vendedor', 'info');
    });
    resetBtn.dataset.bound = 'true';
  }

  if (input && !input.dataset.bound) {
    input.addEventListener('input', () => {
      uiState.globalSettings.advisorName = input.value;
    });
    input.dataset.bound = 'true';
  }
  bindQuickLinks();
}

function renderQuickOverview() {
  const steps = [
    { icon: '🎯', title: 'Selecciona vendedor', text: 'Confirma el nombre activo y sincroniza el panel.', target: 'dashboard' },
    { icon: '💬', title: 'Plantillas listas', text: 'Prepara el mensaje inicial con variables y copia en un clic.', target: 'templates' },
    { icon: '🚘', title: 'Valores y reservas', text: 'Revisa precios, integración y reservas disponibles.', target: 'vehicles' },
    { icon: '👥', title: 'Base de clientes', text: 'Agrupa, filtra y prioriza con el gestor dedicado.', target: 'clientManager' }
  ];
  const container = document.getElementById('quickOverview');
  if (!container) return;
  container.innerHTML = steps.map(step => `
    <div class="flow-step">
      <strong><span class="badge">${step.icon}</span>${step.title}</strong>
      <p class="muted">${step.text}</p>
      ${step.target ? `<div class="flow-actions"><button class="secondary-btn" data-jump="${step.target}"><i class='bx bx-right-arrow-alt'></i>Ir ahora</button></div>` : ''}
    </div>
  `).join('');
  bindQuickLinks();
}

function renderHomeShortcuts() {
  const shortcuts = [
    { icon: '📲', title: 'Plantillas rápidas', body: 'Personaliza y copia los mensajes con variables.', target: 'templates', badge: 'Mensajes' },
    { icon: '📊', title: 'Valores actualizados', body: 'Consulta precios, integración y reservas.', target: 'vehicles', badge: 'Finanzas' },
    { icon: '🗂️', title: 'Gestor de clientes', body: 'Importa, limpia y actúa sobre la base.', target: 'clientManager', badge: 'Clientes' },
    { icon: '☁️', title: 'Perfiles y backups', body: 'Exporta tu configuración y respáldala.', target: 'profiles', badge: 'Backups' }
  ];
  const container = document.getElementById('homeShortcuts');
  if (!container) return;
  container.innerHTML = shortcuts.map(card => `
    <article class="quick-card">
      <span class="badge">${card.badge}</span>
      <div class="shortcut-body">
        <div class="shortcut-icon">${card.icon}</div>
        <h4>${card.title}</h4>
        <p class="muted">${card.body}</p>
      </div>
      <button class="primary-btn ghosted" data-jump="${card.target}"><i class='bx bx-right-arrow-alt'></i>Ir ahora</button>
    </article>
  `).join('');
  bindQuickLinks();
}

function renderAdvisorNote() {
  const note = document.getElementById('advisorNote');
  const status = document.getElementById('advisorNoteStatus');
  const saveBtn = document.getElementById('saveAdvisorNote');
  if (note && note.value !== (uiState.advisorNote || '')) {
    note.value = uiState.advisorNote || '';
  }
  if (status) {
    status.textContent = uiState.advisorNote ? 'Nota guardada en este dispositivo.' : 'Solo visible en este dispositivo.';
  }
  if (note && !note.dataset.bound) {
    note.addEventListener('input', () => {
      uiState.advisorNote = note.value;
    });
    note.dataset.bound = 'true';
  }
  if (saveBtn && !saveBtn.dataset.bound) {
    saveBtn.addEventListener('click', () => {
      uiState.advisorNote = note?.value || '';
      persist();
      renderAdvisorNote();
      showToast('Nota del asesor guardada', 'success');
    });
    saveBtn.dataset.bound = 'true';
  }
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

function bindClientManager() {
  const importInput = document.getElementById('clientExcel');
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      handleClientImport(file);
      e.target.value = '';
    });
  }

  const search = document.getElementById('clientManagerSearch');
  if (search) {
    search.value = clientManagerState.search || '';
    search.addEventListener('input', () => {
      clientManagerState.search = search.value;
      persist();
      renderClientManager();
    });
  }

  const group = document.getElementById('groupByModel');
  if (group) {
    group.checked = clientManagerState.groupByModel;
    group.addEventListener('change', () => {
      clientManagerState.groupByModel = group.checked;
      persist();
      renderClientManager();
    });
  }

  const showSelected = document.getElementById('showOnlySelected');
  if (showSelected) {
    showSelected.checked = clientManagerState.showOnlySelected;
    showSelected.addEventListener('change', () => {
      clientManagerState.showOnlySelected = showSelected.checked;
      persist();
      renderClientManager();
    });
  }

  const statusFilter = document.getElementById('statusFilter');
  if (statusFilter) {
    statusFilter.value = clientManagerState.statusFilter;
    statusFilter.addEventListener('change', () => {
      clientManagerState.statusFilter = statusFilter.value;
      persist();
      renderClientManager();
    });
  }

  const exportBtn = document.getElementById('exportClients');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportManagerClients);
  }

  const paletteOverlay = document.getElementById('paletteOverlay');
  const openPalette = document.getElementById('openPalette');
  const closePalette = document.getElementById('closePalette');
  const applyPalette = document.getElementById('applyPalette');
  const togglePalette = (show) => {
    if (!paletteOverlay) return;
    paletteOverlay.classList[show ? 'add' : 'remove']('show');
  };
  if (openPalette) openPalette.addEventListener('click', () => togglePalette(true));
  if (closePalette) closePalette.addEventListener('click', () => togglePalette(false));
  if (paletteOverlay) {
    paletteOverlay.addEventListener('click', (e) => {
      if (e.target === paletteOverlay) togglePalette(false);
    });
  }
  if (applyPalette) {
    applyPalette.addEventListener('click', () => {
      applyStatusPalette();
      persist();
      togglePalette(false);
      showToast('Paleta aplicada', 'success');
    });
  }

  renderColumnToggles();
}

function renderColumnToggles() {
  const container = document.getElementById('columnToggles');
  if (!container) return;
  container.innerHTML = Object.entries(clientColumns).map(([key, col]) => {
    const active = clientManagerState.columnVisibility[key];
    return `<span class="pill ${active ? 'badge' : ''}" data-key="${key}"><input type="checkbox" ${active ? 'checked' : ''} data-key="${key}" /> ${col.label}</span>`;
  }).join('');

  container.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.addEventListener('change', () => {
    clientManagerState.columnVisibility[cb.dataset.key] = cb.checked;
    persist();
    renderClientManager();
  }));
}

function normalizeCell(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return (value || '').toString().trim();
}

function mapRow(row, headers) {
  const headerMap = {
    'NOMBRE': 'name',
    'CELULAR12': 'phone',
    'CELULAR': 'phone',
    'MODELO': 'model',
    'MARCA': 'brand',
    'OLOC': 'city',
    'OPCIA': 'province',
    'DOC': 'document',
    'CUIT0': 'cuit',
    'FECNAC': 'birthDate',
    'FECHA1': 'purchaseDate',
    'CP': 'postalCode',
    'TIPO': 'type'
  };

  const mapped = { flags: {}, selected: false };
  headers.forEach((h, idx) => {
    const normalized = (h || '').toString().trim().toUpperCase();
    const key = headerMap[normalized];
    if (key) {
      const rawValue = row[idx];
      if (key === 'purchaseDate' || key === 'birthDate') {
        mapped[key] = formatDateISO(rawValue) || normalizeCell(rawValue);
      } else {
        mapped[key] = normalizeCell(rawValue);
      }
    }
  });
  mapped.id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  mapped.name = mapped.name || 'Sin nombre';
  mapped.model = mapped.model || 'Sin modelo';
  mapped.phone = normalizePhone(mapped.phone || '');
  return mapped;
}

function handleClientImport(file) {
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const data = new Uint8Array(ev.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const [headerRow, ...rows] = json;
      if (!headerRow || !rows.length) {
        showToast('El archivo no tiene registros.', 'error');
        return;
      }
      const existingKeys = new Set(managerClients.map(c => `${(c.name || '').toLowerCase().trim()}|${normalizePhone(c.phone)}`));
      let imported = 0;
      let skipped = 0;
      rows.forEach(r => {
        const mapped = mapRow(r, headerRow);
        const key = `${mapped.name.toLowerCase().trim()}|${normalizePhone(mapped.phone)}`;
        if (existingKeys.has(key)) {
          skipped += 1;
          return;
        }
        existingKeys.add(key);
        imported += 1;
        managerClients.push(mapped);
      });
      persist();
      renderClientManager();
      renderStats();
      const msg = skipped ? `Importados ${imported}, duplicados omitidos: ${skipped}` : `Importados ${imported} clientes`;
      showToast(msg, 'success');
    } catch (err) {
      console.error(err);
      showToast('No se pudo procesar el Excel.', 'error');
    }
  };
  reader.readAsArrayBuffer(file);
}

function filteredManagerClients() {
  const search = (clientManagerState.search || '').toLowerCase();
  return managerClients.filter(c => {
    const status = clientStatus(c).label;
    const matchesSearch = [c.name, c.model, c.phone].some(v => (v || '').toLowerCase().includes(search));
    const matchesStatus = clientManagerState.statusFilter === 'all'
      ? true
      : clientManagerState.statusFilter === 'contacted' ? c.flags?.contacted
      : clientManagerState.statusFilter === 'no_number' ? c.flags?.noNumber
      : clientManagerState.statusFilter === 'favorite' ? c.flags?.favorite
      : !(c.flags?.contacted || c.flags?.noNumber || c.flags?.favorite);
    const matchesSelection = clientManagerState.showOnlySelected ? c.selected : true;
    return matchesSearch && matchesStatus && matchesSelection && status !== 'Oculto';
  });
}

function renderClientManager() {
  const table = document.getElementById('clientManagerTable');
  const helper = document.getElementById('clientManagerHelper');
  if (!table) return;
  const visibleColumns = Object.entries(clientColumns).filter(([key]) => clientManagerState.columnVisibility[key]);
  const totalColumns = visibleColumns.length + 2;
  let colgroup = table.querySelector('colgroup');
  if (!colgroup) {
    colgroup = document.createElement('colgroup');
    table.insertBefore(colgroup, table.firstChild);
  }
  const colgroupHtml = [
    ...visibleColumns.map(([key]) => `<col style="width:${clientColumnWidths[key] || '160px'}">`),
    `<col class="status-col" style="width:${clientColumnWidths.status}">`,
    `<col class="actions-col" style="width:${clientColumnWidths.actions}">`
  ].join('');
  colgroup.innerHTML = colgroupHtml;
  const headerCells = [...visibleColumns.map(([, col]) => `<th>${col.label}</th>`), '<th class="status-col">Estado</th>', '<th class="actions-cell">Acciones</th>'].join('');
  table.querySelector('thead').innerHTML = `<tr>${headerCells}</tr>`;

  const rows = filteredManagerClients();
  if (!rows.length) {
    table.querySelector('tbody').innerHTML = `<tr><td colspan="${totalColumns}" class="muted">Sin clientes importados.</td></tr>`;
    if (helper) helper.textContent = 'Sube el Excel y el gestor detectará duplicados automáticamente.';
    return;
  }

  const groups = clientManagerState.groupByModel ? groupByModel(rows) : { 'Todos': rows };
  const body = Object.entries(groups).map(([group, items]) => {
    const groupTitle = clientManagerState.groupByModel ? `<tr><td colspan="${totalColumns}" class="group-title">${group} (${items.length})</td></tr>` : '';
    const content = items.map(c => {
      const status = clientStatus(c);
      const statusVars = `--row-bg: var(--${status.className}-bg); --row-border: var(--${status.className}-border); --row-text: var(--${status.className}-text);`;
      const rowClass = `client-row ${status.className}`;
      const cells = visibleColumns.map(([key]) => `<td>${formatCell(key, c)}</td>`).join('');
      return `
        <tr data-id="${c.id}" class="${rowClass}" style="${statusVars}">
          ${cells}
          <td class="status-col"><span class="status-pill ${status.className}">${status.label}</span></td>
          <td class="actions-cell">
            <button class="icon-btn" data-action="contacted" title="Marcar como contactado"><i class='bx bx-check-circle'></i></button>
            <button class="icon-btn" data-action="no_number" title="Número no disponible"><i class='bx bx-block'></i></button>
            <button class="icon-btn" data-action="favorite" title="Agregar a favoritos"><i class='bx bx-star'></i></button>
            <button class="icon-btn" data-action="copy_message" title="Copiar mensaje inicial"><i class='bx bx-message-square-dots'></i></button>
            <button class="icon-btn" data-action="copy_phone" title="Copiar número"><i class='bx bx-phone'></i></button>
          </td>
        </tr>`;
    }).join('');
    return `${groupTitle}${content}`;
  }).join('');

  table.querySelector('tbody').innerHTML = body;
  bindClientTableActions();
  if (helper) helper.textContent = `${rows.length} clientes visibles · columnas activas: ${visibleColumns.length}`;
}

function renderGlobalSettings() {
  const settings = mergeGlobalSettings(uiState.globalSettings);
  uiState.globalSettings = settings;
  const advisor = document.getElementById('globalAdvisor');
  const type = document.getElementById('globalType');
  if (advisor) {
    if (advisor.value !== settings.advisorName) advisor.value = settings.advisorName;
    if (!advisor.dataset.bound) {
      advisor.addEventListener('input', () => {
        uiState.globalSettings.advisorName = advisor.value;
        persist();
        renderWelcomeHero();
      });
      advisor.dataset.bound = 'true';
    }
  }
  if (type) {
    if (type.value !== settings.clientType) type.value = settings.clientType;
    if (!type.dataset.bound) {
      type.addEventListener('input', () => {
        uiState.globalSettings.clientType = type.value;
        persist();
      });
      type.dataset.bound = 'true';
    }
  }

  ['contacted', 'noNumber', 'favorite', 'pending'].forEach(status => {
    const colorInput = document.querySelector(`[data-status-color="${status}"]`);
    const opacityInput = document.querySelector(`[data-status-opacity="${status}"]`);
    const current = settings.statusPalette[status];
    if (colorInput && colorInput.value !== current.color) colorInput.value = current.color;
    if (opacityInput && Number(opacityInput.value) !== Math.round((current.opacity || 0.12) * 100)) {
      opacityInput.value = Math.round((current.opacity || 0.12) * 100);
    }
    if (colorInput && !colorInput.dataset.bound) {
      colorInput.addEventListener('input', () => updateStatusSetting(status, { color: colorInput.value }));
      colorInput.dataset.bound = 'true';
    }
    if (opacityInput && !opacityInput.dataset.bound) {
      opacityInput.addEventListener('input', () => {
        const value = Math.max(5, Math.min(100, Number(opacityInput.value || 0)));
        updateStatusSetting(status, { opacity: value / 100 });
      });
      opacityInput.dataset.bound = 'true';
    }
  });

  applyStatusPalette();
}

function updateStatusSetting(status, payload = {}) {
  uiState.globalSettings.statusPalette = uiState.globalSettings.statusPalette || {};
  const current = uiState.globalSettings.statusPalette[status] || {};
  uiState.globalSettings.statusPalette[status] = { ...current, ...payload };
  persist();
  applyStatusPalette();
  renderClientManager();
}

function formatCell(key, client) {
  if (key === 'name') return `<div class="name-cell"><div class="avatar small">${(client.name || 'NA').slice(0, 2).toUpperCase()}</div><div><strong>${client.name}</strong><p class="muted tiny">${client.brand || 'Marca no indicada'}</p></div></div>`;
  if (key === 'model') return `<div><strong>${client.model}</strong><p class="muted tiny">${client.type || 'Plan vigente'}</p></div>`;
  if (key === 'phone') return `<div class="tip"><i class='bx bx-help-circle helper-icon' title="Teléfono sanitizado"></i><span>${normalizePhone(client.phone)}</span></div>`;
  if (key === 'birthDate' || key === 'purchaseDate') return formatDateForDisplay(client[key]) || '-';
  return client[key] || '-';
}

function groupByModel(list) {
  return list.reduce((acc, item) => {
    const model = item.model || 'Sin modelo';
    acc[model] = acc[model] || [];
    acc[model].push(item);
    return acc;
  }, {});
}

function bindClientTableActions() {
  document.querySelectorAll('#clientManagerTable [data-action]').forEach(btn => btn.addEventListener('click', (e) => {
    const action = btn.dataset.action;
    const row = btn.closest('tr');
    const id = row?.dataset.id;
    if (!id) return;
    e.stopPropagation();
    if (action === 'contacted') updateClientFlag(id, 'contacted');
    if (action === 'no_number') updateClientFlag(id, 'noNumber');
    if (action === 'favorite') updateClientFlag(id, 'favorite');
    if (action === 'copy_message') copyText(buildMessageForClient(managerClients.find(c => c.id === id)), 'Mensaje copiado');
    if (action === 'copy_phone') copyText(normalizePhone(managerClients.find(c => c.id === id)?.phone || ''), 'Número copiado');
  }));
}

function updateClientFlag(id, flag) {
  const client = managerClients.find(c => c.id === id);
  if (!client) return;
  client.flags = client.flags || {};
  if (flag === 'favorite') {
    client.flags.favorite = !client.flags.favorite;
  } else if (flag === 'noNumber') {
    client.flags.noNumber = !client.flags.noNumber;
    if (client.flags.noNumber) client.flags.contacted = false;
  } else if (flag === 'contacted') {
    client.flags.contacted = !client.flags.contacted;
    if (client.flags.contacted) client.flags.noNumber = false;
  }
  persist();
  renderClientManager();
}

function applyStatusPalette() {
  const root = document.documentElement;
  const palette = mergeGlobalSettings(uiState.globalSettings).statusPalette;
  const setVars = (key, target) => {
    const { color, opacity } = target;
    const rgba = hexToRgba(color, opacity || 0.12);
    const border = hexToRgba(color, Math.min((opacity || 0.12) + 0.12, 1));
    root.style.setProperty(`--${key}-bg`, rgba);
    root.style.setProperty(`--${key}-border`, border);
    root.style.setProperty(`--${key}-text`, color);
  };
  setVars('status-contacted', palette.contacted);
  setVars('status-no-number', palette.noNumber);
  setVars('status-favorite', palette.favorite);
  setVars('status-pending', palette.pending);
}

function hexToRgba(hex, alpha = 1) {
  const cleaned = hex.replace('#', '');
  const bigint = parseInt(cleaned, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function exportManagerClients() {
  const rows = filteredManagerClients();
  if (!rows.length) {
    showToast('No hay clientes para exportar.', 'error');
    return;
  }
  const data = rows.map(c => ({
    Nombre: c.name,
    Modelo: c.model,
    Celular: normalizePhone(c.phone),
    Marca: c.brand,
    Localidad: c.city,
    Provincia: c.province,
    Documento: c.document,
    CUIT: c.cuit,
    Nacimiento: c.birthDate,
    'Fecha compra': c.purchaseDate,
    CP: c.postalCode,
    Tipo: c.type,
    Estado: clientStatus(c).label
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Clientes');
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `clientes-${new Date().toISOString().slice(0,10)}.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Exportación lista', 'success');
}

function bindProfileActions() {
  document.getElementById('quickSnapshot').addEventListener('click', saveSnapshot);

  document.getElementById('exportProfile').addEventListener('click', () => {
    confirmAction({
      title: 'Exportar perfil',
      message: 'Descargarás un respaldo con vehículos, plantillas y clientes.',
      confirmText: 'Exportar',
      onConfirm: () => {
        const payload = { version: 3, vehicles, templates, clients, managerClients, uiState, clientManagerState };
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
  save('managerClients', managerClients);
  save('uiState', uiState);
  save('clientManagerState', clientManagerState);
  save('snapshots', snapshots);
}

function startRealtimePersistence() {
  const persistNow = () => persist();
  ['visibilitychange', 'beforeunload'].forEach(evt => window.addEventListener(evt, persistNow));
  setInterval(persistNow, 15000);
  window.addEventListener('storage', (e) => {
    if (['vehicles', 'templates', 'clients', 'managerClients', 'uiState', 'clientManagerState', 'snapshots'].includes(e.key)) {
      syncFromStorage();
    }
  });
}

function syncFromStorage() {
  vehicles = cloneVehicles(load('vehicles') || vehicles);
  templates = ensureTemplateIds(load('templates') || templates);
  clients = load('clients') || clients;
  managerClients = load('managerClients') || managerClients;
  uiState = { ...defaultUiState, ...(load('uiState') || uiState) };
  clientManagerState = { ...defaultClientManagerState, ...(load('clientManagerState') || clientManagerState) };
  snapshots = load('snapshots') || snapshots;
  applyStatusPalette();
  renderStats();
  renderQuickOverview();
  renderHomeShortcuts();
  renderTemplates();
  renderVehicleTable();
  renderPlanForm();
  renderClients();
  renderClientManager();
  renderGlobalSettings();
  renderSnapshots();
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
      managerClients = [];
      snapshots = [];
      uiState = { ...defaultUiState, templateSearch: '', clientSearch: '', profileSearch: '' };
      clientManagerState = { ...defaultClientManagerState };
      selectedTemplateIndex = 0;
      selectedTemplateId = templates[0].id;
      planDraftApplied = false;
      applyToggleState();
      applyStatusPalette();
      renderVehicleTable();
      renderTemplates();
      renderPlanForm();
      renderClients();
      renderClientManager();
      renderSnapshots();
      renderStats();
      persist();
      showToast('Datos locales eliminados', 'success');
    }
  });
}

