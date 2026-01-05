const currency = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
const number = new Intl.NumberFormat('es-AR');

const panelTitles = {
  dashboard: 'Inicio',
  templates: 'Plantillas',
  vehicles: 'Autos y Valores',
  plans: 'Cotizaciones',
  clientManager: 'Gestor de Clientes',
  scheduledClients: 'Clientes Programados'
};

const defaultPreferenceFontSizes = {
  name: '14px',
  model: '14px',
  phone: '14px',
  contactDate: '14px',
  brand: '14px',
  city: '14px',
  province: '14px',
  document: '14px',
  cuit: '14px',
  birthDate: '14px',
  purchaseDate: '14px',
  systemDate: '14px',
  postalCode: '14px',
  type: '14px',
  status: '14px',
  contextTitle: '16px',
  contextSubtitle: '12px',
  contextLabel: '14px',
  contextMeta: '12px'
};

const defaultUiState = {
  selectedTemplateIndex: 0,
  variableValues: {},
  planDraft: {},
  quoteSearch: '',
  toggles: { showReservations: true, showIntegration: true },
  preferences: {
    fontSizes: { ...defaultPreferenceFontSizes },
    phoneDisplay: 'plain',
    contextMenuVisibility: { data: {}, actions: {} }
  },
  globalSettings: {
    advisorName: 'Chevrolet Argentina',
    clientType: '',
    statusPalette: {
      contacted: { color: '#34d399', opacity: 0.16 },
      noNumber: { color: '#f87171', opacity: 0.16 },
      favorite: { color: '#f6b04b', opacity: 0.16 },
      pending: { color: '#9fb1c5', opacity: 0.14 }
    }
  },
  advisorNote: ''
};

const novemberVehicles = [
  {
    name: 'NUEVO ONIX 1.0 TURBO LT MT',
    basePrice: 30430900,
    integration: 9129270,
    planProfile: { label: '80/20 (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 320051, '13a21': 313692, '22a84': 312912, '85a120': 311352 },
    cuotaPura: 202873,
    reservations: { '1': 1137480, '3': 1478724, '6': 1706220 },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6, llave x llave',
      bonificacion: 'Promo 12 cuotas fijas + 50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'NUEVO PLAN ONIX PLUS SEDAN 1.0 TURBO LT MT',
    basePrice: 30430900,
    integration: 9129270,
    planProfile: { label: '100% (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 326758, '13a21': 370922, '22a84': 369946, '85a120': 368971 },
    cuotaPura: 253591,
    reservations: { '1': 1137480, '3': 1478724, '6': 1706220 },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6, llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'LA NUEVA MONTANA LT 1.2 AT',
    basePrice: 37808900,
    integration: 11342670,
    planProfile: { label: '80/20 (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 397648, '13a21': 389747, '22a84': 388584, '85a120': 388584 },
    cuotaPura: 252059,
    reservations: { '1': 1211400, '3': 1574820, '6': 1817100 },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6, llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'LA NUEVA S10 CD 2.8 TD 4x2 WT',
    basePrice: 48596900,
    integration: 19438760,
    planProfile: { label: '60/40 (84 cuotas)', planType: '22a84' },
    availablePlans: ['22a84'],
    shareByPlan: { '2a12': 537310, '13a21': 527066, '22a84': 525464 },
    cuotaPura: 347121,
    reservations: { '1': 1825000, '3': 2372500, '6': 2737500 },
    benefits: {
      pactada: 'Acepta llave x llave',
      bonificacion: 'Débito automático obligatorio con TC'
    }
  },
  {
    name: 'NUEVA TRACKER LT 1.2AT',
    basePrice: 37823900,
    integration: 11347170,
    planProfile: { label: '80/20 (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 397806, '13a21': 389902, '22a84': 388156, '85a120': 310714 },
    cuotaPura: 252159,
    reservations: { '1': 1211710, '3': 1575223, '6': 1817565 },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6 , llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'NUEVA SPIN 1.8 LT 5AA MT',
    basePrice: 35116900,
    integration: 10535070,
    planProfile: { label: '70/30 (84 cuotas)', planType: '22a84' },
    availablePlans: ['22a84'],
    shareByPlan: { '2a12': 435603, '13a21': 428039, '22a84': 426914 },
    cuotaPura: 292641,
    reservations: { '1': 1177600, '3': 1530880, '6': 1766400 },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6 , llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  }
];

const decemberVehicles = [
  {
    name: 'NUEVO ONIX 1.0 TURBO LT MT',
    basePrice: 30887900,
    integration: 9266370,
    planProfile: { label: '80/20 (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 324858, '13a21': 318403, '22a84': 317611, '85a120': 316027 },
    cuotaPura: 205919,
    reservations: { '1': 1170025, '3': 1521033, '6': 1755038 },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6, llave x llave',
      bonificacion: 'Promo 12 cuotas fijas + 50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'NUEVO PLAN ONIX PLUS SEDAN 1.0 TURBO LT MT',
    basePrice: 30887900,
    integration: 9266370,
    planProfile: { label: '100% (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 331665, '13a21': 376492, '22a84': 375502, '85a120': 374512 },
    cuotaPura: 257399,
    reservations: { '1': 1170025, '3': 1521033, '6': 1755038 },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6, llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'LA NUEVA MONTANA LT 1.2 AT',
    basePrice: 38489900,
    integration: 11546970,
    planProfile: { label: '80/20 (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 404810, '13a21': 396767, '22a84': 395583, '85a120': 395583 },
    cuotaPura: 256599,
    reservations: { '1': 1246142, '3': 1619985, '6': 1869213 },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6, llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'LA NUEVA S10 CD 2.8 TD 4x2 WT',
    basePrice: 48596900,
    integration: 19438760,
    planProfile: { label: '60/40 (84 cuotas)', planType: '22a84' },
    availablePlans: ['22a84'],
    shareByPlan: { '2a12': 537310, '13a21': 527066, '22a84': 525464 },
    cuotaPura: 347121,
    reservations: { '1': 1900250, '3': 2470325, '6': 2850375 },
    benefits: {
      pactada: 'Acepta llave x llave',
      bonificacion: 'Débito automático obligatorio con TC'
    }
  },
  {
    name: 'NUEVA TRACKER LT 1.2AT',
    basePrice: 38391900,
    integration: 11517570,
    planProfile: { label: '80/20 (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 403780, '13a21': 395757, '22a84': 394576, '85a120': 393985 },
    cuotaPura: 255946,
    reservations: { '1': 1246450, '3': 1620385, '6': 1869675 },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6 , llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'NUEVA SPIN 1.8 LT 5AA MT',
    basePrice: 35116900,
    integration: 10535070,
    planProfile: { label: '70/30 (84 cuotas)', planType: '22a84' },
    availablePlans: ['22a84'],
    shareByPlan: { '2a12': 435603, '13a21': 428039, '22a84': 426914, '85a120': 426914 },
    cuotaPura: 292641,
    reservations: { '1': 1210710, '3': 1573923, '6': 1816065 },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6 , llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  }
];

const defaultVehicles = decemberVehicles;

const variableSuggestions = [
  'cliente', 'asesor', 'modelo_actual', 'modelo_nuevo', 'anio_retiro', 'km', 'plan', 'cuota', 'entrega_usado', 'color', 'sucursal', 'telefono', 'valor_efectivo', 'version'
];

const planTerms = {
  '2a12': 120,
  '13a21': 120,
  '22a84': 84,
  '85a120': 120,
  'ctapura': 120
};

const PLAN_START_INSTALLMENT = 2;

const upgradeInstallmentsByPlan = {
  '120_100': 55
};

function getPlanTypeForVehicle(vehicle) {
  const available = vehicle?.availablePlans?.length ? vehicle.availablePlans : ['2a12', '13a21', '22a84', '85a120', 'ctapura'];
  const preferred = vehicle?.planProfile?.planType;
  if (preferred && available.includes(preferred)) return preferred;
  return available[0];
}

const clientColumns = {
  name: { label: 'Nombre', default: true },
  model: { label: 'Modelo', default: true },
  phone: { label: 'Celular', default: true },
  contactDate: { label: 'Fecha/Hora de Contacto', default: true },
  brand: { label: 'Marca', default: false },
  city: { label: 'Localidad', default: false },
  province: { label: 'Provincia', default: false },
  document: { label: 'Documento', default: false },
  cuit: { label: 'CUIT', default: false },
  birthDate: { label: 'Nacimiento', default: false },
  purchaseDate: { label: 'Fecha compra', default: false },
  systemDate: { label: 'Fecha de carga', default: false },
  postalCode: { label: 'CP', default: false },
  type: { label: 'Notas', default: true }
};

const exportableColumns = {
  ...clientColumns,
  status: { label: 'Estado', default: true }
};

const defaultActionCatalog = [
  { id: 'contacted', label: 'Marcar como contactado', icon: 'bx-check-circle', color: '#22c55e' },
  { id: 'no_number', label: 'Número no disponible', icon: 'bx-block', color: '#f87171' },
  { id: 'favorite', label: 'Favorito', icon: 'bx-star', color: '#f6b04b' },
  { id: 'open_notes', label: 'Notas', icon: 'bx-note', color: '#94a3b8' },
  { id: 'copy_message', label: 'Copiar mensaje', icon: 'bx-message-square-dots', color: '#38bdf8' },
  { id: 'copy_phone', label: 'Copiar número', icon: 'bx-phone', color: '#a855f7' },
  { id: 'schedule_contact', label: 'Programar contacto', icon: 'bx-calendar-event', color: '#7dd3b0' }
];

const contextMenuDataCatalog = [
  { key: 'name', label: 'Nombre' },
  { key: 'model', label: 'Modelo del coche' },
  { key: 'phone', label: 'Celular' },
  { key: 'city', label: 'Localidad' },
  { key: 'province', label: 'Provincia' },
  { key: 'document', label: 'DNI' },
  { key: 'cuit', label: 'CUIT' },
  { key: 'birthDate', label: 'Fecha de nacimiento' },
  { key: 'postalCode', label: 'Código postal' },
  { key: 'purchaseDate', label: 'Fecha de compra' }
];

const defaultActionVisibility = Object.fromEntries(defaultActionCatalog.map(action => [action.id, true]));

const presetExportHeaders = [
  { key: 'cuit', label: 'CUIT0' },
  { key: 'document', label: 'DOC' },
  { key: 'birthDate', label: 'FECNAC' },
  { key: 'name', label: 'NOMBRE' },
  { key: 'city', label: 'OLOC' },
  { key: 'province', label: 'OPCIA' },
  { key: 'postalCode', label: 'CP' },
  { key: 'phone', label: 'CELULAR12' },
  { key: 'contactDate', label: 'FECHA/HORA DE CONTACTO' },
  { key: 'purchaseDate', label: 'FECHA1' },
  { key: 'brand', label: 'MARCA' },
  { key: 'model', label: 'MODELO' },
  { key: 'type', label: 'TIPO' },
  { key: 'status', label: 'ESTADO' }
];

const defaultClientManagerState = {
  search: '',
  statusFilter: 'all',
  groupByModel: true,
  dateRange: { from: '', to: '' },
  columnVisibility: Object.fromEntries(Object.keys(clientColumns).map(k => [k, !!clientColumns[k].default])),
  selection: {},
  exportOptions: {
    mode: 'local',
    columnOrder: Object.keys(exportableColumns),
    selectedColumns: Object.keys(exportableColumns)
  },
  contactLogSearch: '',
  editingMode: false,
  actionVisibility: { ...defaultActionVisibility },
  customActions: [],
  pagination: { size: 0, page: 1 },
  contactAssistant: {
    interval: 15,
    currentIndex: 0,
    lastAction: null
  }
};

const clientColumnWidths = {
  name: '240px',
  model: '190px',
  phone: '170px',
  contactDate: '200px',
  brand: '160px',
  city: '160px',
  province: '160px',
  document: '160px',
  cuit: '160px',
  birthDate: '170px',
  purchaseDate: '170px',
  systemDate: '170px',
  postalCode: '120px',
  type: '170px',
  status: '180px',
  actions: '340px'
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
    reservations: { ...v.reservations },
    planProfile: { ...(v.planProfile || {}) },
    benefits: { ...(v.benefits || {}) },
    availablePlans: v.availablePlans ? [...v.availablePlans] : undefined
  }));
}

function clonePriceTabs(list) {
  return (list || []).map(tab => ({
    ...tab,
    locked: false,
    source: tab.source || 'predeterminado',
    files: (tab.files || []).map(f => ({ ...f })),
    vehicles: cloneVehicles(tab.vehicles || defaultVehicles)
  }));
}

function createDefaultPriceTabs() {
  return clonePriceTabs([
    {
      id: 'dic-2025',
      label: 'Diciembre 2025',
      month: 'Diciembre',
      year: 2025,
      locked: false,
      source: 'predeterminado',
      folder: 'img/Diciembre 2025',
      primaryFile: 'img/Diciembre 2025/LISTA DE CHEVROLET DICIEMBRE 2025.pdf',
      files: [
        { name: 'LISTA DE CHEVROLET DICIEMBRE 2025.pdf', path: 'img/Diciembre 2025/LISTA DE CHEVROLET DICIEMBRE 2025.pdf' },
        { name: 'Lista de precios Chevroplan POSITIVE Diciembre.pdf', path: 'img/Diciembre 2025/Lista de precios Chevroplan POSITIVE Diciembre.pdf' }
      ],
      vehicles: decemberVehicles
    },
    {
      id: 'nov-2025',
      label: 'Noviembre 2025',
      month: 'Noviembre',
      year: 2025,
      locked: false,
      source: 'predeterminado',
      folder: 'img/Noviembre 2025',
      primaryFile: 'img/Noviembre 2025/precios.png',
      files: [
        { name: 'precios.png', path: 'img/Noviembre 2025/precios.png' },
        { name: 'LISTA CHEVROLET NOV. 2025.png', path: 'img/Noviembre 2025/LISTA CHEVROLET NOV. 2025.png' }
      ],
      vehicles: novemberVehicles
    }
  ]);
}

function ensurePriceTabsIntegrity() {
  if (!priceTabs || !priceTabs.length) {
    priceTabs = createDefaultPriceTabs();
  }
  if (!priceTabs.some(t => t.id === activePriceTabId)) {
    activePriceTabId = priceTabs[0]?.id || '';
  }
}

function getActivePriceTab() {
  ensurePriceTabsIntegrity();
  return priceTabs.find(t => t.id === activePriceTabId) || priceTabs[0] || null;
}

function syncActiveVehiclesToTab() {
  ensurePriceTabsIntegrity();
  const idx = priceTabs.findIndex(t => t.id === activePriceTabId);
  if (idx >= 0) {
    priceTabs[idx].vehicles = cloneVehicles(vehicles);
  }
}

function syncVehiclesFromActiveTab() {
  const active = getActivePriceTab();
  vehicles = cloneVehicles(active?.vehicles || defaultVehicles);
}

const MONTH_ORDER = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

function getMonthIndex(monthName = '') {
  const normalized = String(monthName).trim().toLowerCase();
  return MONTH_ORDER.indexOf(normalized);
}

function getMostRecentPriceTab() {
  ensurePriceTabsIntegrity();
  return priceTabs.reduce((latest, tab) => {
    if (!latest) return tab;
    const yearDiff = (tab.year || 0) - (latest.year || 0);
    if (yearDiff !== 0) return yearDiff > 0 ? tab : latest;
    const monthDiff = getMonthIndex(tab.month) - getMonthIndex(latest.month);
    if (monthDiff !== 0) return monthDiff > 0 ? tab : latest;
    return latest;
  }, null);
}

function enforceLatestPriceTab({ silent = true } = {}) {
  const latest = getMostRecentPriceTab();
  if (latest && latest.id !== activePriceTabId) {
    syncActiveVehiclesToTab();
    activePriceTabId = latest.id;
    syncVehiclesFromActiveTab();
    persist();
    renderPriceTabs();
    renderVehicleTable();
    renderPlanForm();
    renderClients();
    renderClientManager();
    loadPricesFromServer({ silent });
  }
  updatePriceContextTag();
  return latest || getActivePriceTab();
}

let enforcingPlanTab = false;

function ensurePlansUseLatestPrices() {
  if (enforcingPlanTab) return;
  enforcingPlanTab = true;
  enforceLatestPriceTab({ silent: true });
  enforcingPlanTab = false;
}

function setActivePriceTab(tabId) {
  ensurePriceTabsIntegrity();
  const tab = priceTabs.find(t => t.id === tabId);
  if (!tab || tab.id === activePriceTabId) return;
  syncActiveVehiclesToTab();
  activePriceTabId = tab.id;
  syncVehiclesFromActiveTab();
  persist();
  renderPriceTabs();
  renderVehicleTable();
  if (document.getElementById('plans')?.classList.contains('active')) {
    renderPlanForm();
  }
  renderClients();
  renderClientManager();
  loadPricesFromServer({ silent: true });
  updatePriceContextTag();
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

function normalizeExportOptions(options = {}) {
  const available = Object.keys(exportableColumns);
  const baseOrder = options.columnOrder || available;
  const cleanedOrder = baseOrder.filter(k => available.includes(k));
  const mergedOrder = [...cleanedOrder, ...available.filter(k => !cleanedOrder.includes(k))];
  let selected = (options.selectedColumns || mergedOrder).filter(k => available.includes(k));
  if (!selected.length) selected = [...mergedOrder];
  return {
    mode: options.mode === 'preset' ? 'preset' : 'local',
    columnOrder: mergedOrder,
    selectedColumns: selected
  };
}

function normalizePaginationState(pagination = {}) {
  const allowedSizes = [0, 20, 50, 100];
  const requestedSize = Number(pagination.size);
  const size = allowedSizes.includes(requestedSize) ? requestedSize : 0;
  const page = Math.max(1, Number(pagination.page) || 1);
  return { size, page };
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `<span class="icon">${type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️'}</span><div><strong>${message}</strong></div>`;
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('visible'));
  const closeToast = () => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 260);
  };
  const timer = setTimeout(closeToast, 3800);
  toast.addEventListener('click', () => {
    clearTimeout(timer);
    closeToast();
  });
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
}

function toggleModal(modal, show) {
  if (!modal) return;
  if (show) {
    modal.classList.add('show');
    modal.classList.remove('hidden');
  } else {
    modal.classList.remove('show');
    setTimeout(() => modal.classList.add('hidden'), 200);
  }
}

function openImportDateModal() {
  return new Promise((resolve) => {
    const modal = document.getElementById('importDateModal');
    if (!modal) {
      resolve(formatLocalISO());
      return;
    }
    const todayLabel = document.getElementById('importDateTodayLabel');
    if (todayLabel) todayLabel.textContent = `Se usará: ${formatDateLabel(formatLocalISO())}`;
    const customInput = document.getElementById('importCustomDate');
    if (customInput && !customInput.value) customInput.value = formatLocalISO();
    if (customInput) {
      customInput.onfocus = () => {
        const customRadio = document.querySelector('input[name="importDateOption"][value="custom"]');
        if (customRadio) customRadio.checked = true;
      };
    }

    const confirmBtn = document.getElementById('importDateConfirm');
    const cancelBtn = document.getElementById('importDateCancel');
    const closeBtn = document.getElementById('importDateClose');
    const radios = Array.from(document.querySelectorAll('input[name="importDateOption"]'));

    const cleanup = (result) => {
      toggleModal(modal, false);
      if (confirmBtn) confirmBtn.onclick = null;
      if (cancelBtn) cancelBtn.onclick = null;
      if (closeBtn) closeBtn.onclick = null;
      resolve(result);
    };

    if (confirmBtn) {
      confirmBtn.onclick = () => {
        const selected = radios.find(r => r.checked)?.value || 'today';
        if (selected === 'none') {
          cleanup('');
          return;
        }
        if (selected === 'custom') {
          const value = customInput?.value;
          const iso = value ? formatDateISO(value) : '';
          if (!iso) {
            showToast('Selecciona una fecha válida.', 'error');
            return;
          }
          cleanup(iso);
          return;
        }
        cleanup(formatLocalISO());
      };
    }
    if (cancelBtn) cancelBtn.onclick = () => cleanup(null);
    if (closeBtn) closeBtn.onclick = () => cleanup(null);

    toggleModal(modal, true);
  });
}

function moveExportColumn(key, direction) {
  const options = normalizeExportOptions(clientManagerState.exportOptions || defaultClientManagerState.exportOptions);
  const order = [...options.columnOrder];
  const index = order.indexOf(key);
  if (index === -1) return;
  const newIndex = direction === 'up' ? Math.max(0, index - 1) : Math.min(order.length - 1, index + 1);
  if (newIndex === index) return;
  [order[index], order[newIndex]] = [order[newIndex], order[index]];
  clientManagerState.exportOptions = normalizeExportOptions({ ...options, columnOrder: order });
  persist();
  renderExportModal();
}

function updateExportSelection(key, checked) {
  const options = normalizeExportOptions(clientManagerState.exportOptions || defaultClientManagerState.exportOptions);
  const selected = new Set(options.selectedColumns || []);
  if (checked) {
    selected.add(key);
  } else {
    selected.delete(key);
    if (!selected.size) {
      showToast('Debes dejar al menos una columna seleccionada.', 'error');
      renderExportModal();
      return;
    }
  }
  clientManagerState.exportOptions = normalizeExportOptions({ ...options, selectedColumns: Array.from(selected) });
  persist();
  renderExportModal();
}

function renderExportColumnsList() {
  const list = document.getElementById('exportColumnsList');
  if (!list) return;
  const options = normalizeExportOptions(clientManagerState.exportOptions || defaultClientManagerState.exportOptions);
  const locked = options.mode === 'preset';
  const order = locked ? presetExportHeaders.map(h => h.key) : options.columnOrder;
  const selectedSet = locked ? new Set(order) : new Set(options.selectedColumns || []);
  list.innerHTML = order.map((key) => {
    const column = exportableColumns[key];
    if (!column) return '';
    const checked = locked || selectedSet.has(key);
    const disabled = locked ? 'disabled' : '';
    const moveButtons = locked ? '' : `
      <div class="export-move">
        <button class="ghost-btn icon-only mini-btn" data-move="up" data-key="${key}" title="Subir"><i class='bx bx-chevron-up'></i></button>
        <button class="ghost-btn icon-only mini-btn" data-move="down" data-key="${key}" title="Bajar"><i class='bx bx-chevron-down'></i></button>
      </div>`;
    return `
      <div class="export-item" data-key="${key}">
        <div class="export-drag"><i class='bx bx-dots-vertical-rounded'></i></div>
        <label class="export-body">
          <input type="checkbox" data-key="${key}" ${checked ? 'checked' : ''} ${disabled}>
          <div>
            <strong>${column.label}</strong>
            <p class="muted tiny">Inclúyelo o quítalo de la exportación.</p>
          </div>
        </label>
        ${moveButtons}
      </div>`;
  }).join('');

  const selectAllBtn = document.getElementById('exportSelectAll');
  if (selectAllBtn) {
    if (locked) {
      selectAllBtn.textContent = 'Cabezales fijos';
      selectAllBtn.disabled = true;
    } else {
      const allSelected = selectedSet.size === Object.keys(exportableColumns).length;
      selectAllBtn.textContent = allSelected ? 'Quitar selección' : 'Seleccionar todo';
      selectAllBtn.disabled = false;
    }
  }
}

function renderExportModal() {
  clientManagerState.exportOptions = normalizeExportOptions(clientManagerState.exportOptions || defaultClientManagerState.exportOptions);
  const options = clientManagerState.exportOptions;
  const modal = document.getElementById('exportModal');
  if (!modal) return;
  const helper = document.getElementById('exportHelperText');
  if (helper) {
    helper.textContent = options.mode === 'preset'
      ? 'Se exportarán columnas fijas para igualar cabezales predeterminados en el orden requerido.'
      : 'Usa los campos locales, activa solo lo necesario y acomoda el orden a tu gusto.';
  }
  const radios = Array.from(document.querySelectorAll('input[name="exportMode"]'));
  radios.forEach(r => { r.checked = r.value === options.mode; });
  renderExportColumnsList();
}

function openExportModal() {
  const modal = document.getElementById('exportModal');
  if (!modal) {
    exportManagerClients();
    return;
  }
  renderExportModal();
  const confirmBtn = document.getElementById('exportConfirm');
  const cancelBtn = document.getElementById('exportCancel');
  const closeBtn = document.getElementById('exportClose');
  const selectAllBtn = document.getElementById('exportSelectAll');
  const modeRadios = Array.from(document.querySelectorAll('input[name="exportMode"]'));
  const list = document.getElementById('exportColumnsList');

  const close = () => toggleModal(modal, false);

  if (confirmBtn) confirmBtn.onclick = () => { close(); exportManagerClients(); };
  if (cancelBtn) cancelBtn.onclick = close;
  if (closeBtn) closeBtn.onclick = close;

  if (selectAllBtn) {
    selectAllBtn.onclick = () => {
      const allKeys = Object.keys(exportableColumns);
      const current = normalizeExportOptions(clientManagerState.exportOptions || defaultClientManagerState.exportOptions);
      const allSelected = (current.selectedColumns || []).length === allKeys.length;
      clientManagerState.exportOptions = normalizeExportOptions({
        ...current,
        selectedColumns: allSelected ? [] : allKeys
      });
      persist();
      renderExportModal();
    };
  }

  modeRadios.forEach(radio => {
    radio.onchange = () => {
      clientManagerState.exportOptions = normalizeExportOptions({
        ...clientManagerState.exportOptions,
        mode: radio.value
      });
      persist();
      renderExportModal();
    };
  });

  if (list) {
    list.onchange = (e) => {
      const target = e.target;
      if (target.matches('input[type="checkbox"][data-key]')) {
        updateExportSelection(target.dataset.key, target.checked);
      }
    };
    list.onclick = (e) => {
      const btn = e.target.closest('[data-move]');
      if (btn) {
        moveExportColumn(btn.dataset.key, btn.dataset.move);
      }
    };
  }

  toggleModal(modal, true);
}

function openDateFilterModal() {
  const modal = document.getElementById('dateFilterModal');
  if (!modal) return;
  const fromInput = document.getElementById('dateFilterFrom');
  const toInput = document.getElementById('dateFilterTo');
  if (fromInput) fromInput.value = clientManagerState.dateRange.from || '';
  if (toInput) toInput.value = clientManagerState.dateRange.to || '';

  const applyBtn = document.getElementById('applyDateFilter');
  const clearBtn = document.getElementById('clearDateFilter');
  const closeBtn = document.getElementById('dateFilterClose');

  const cleanup = () => toggleModal(modal, false);

  if (applyBtn) {
    applyBtn.onclick = () => {
      const from = fromInput?.value || '';
      const to = toInput?.value || '';
      clientManagerState.dateRange = { from, to };
      clientManagerState.pagination.page = 1;
      persist();
      renderClientManager();
      cleanup();
    };
  }
  if (clearBtn) {
    clearBtn.onclick = () => {
      clientManagerState.dateRange = { from: '', to: '' };
      clientManagerState.pagination.page = 1;
      persist();
      renderClientManager();
      cleanup();
    };
  }
  if (closeBtn) closeBtn.onclick = cleanup;

  toggleModal(modal, true);
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
  priceTabs = clonePriceTabs(parsed.priceTabs || priceTabs || createDefaultPriceTabs());
  activePriceTabId = parsed.activePriceTabId || activePriceTabId || priceTabs[0]?.id || '';
  if (parsed.priceTabs) {
    syncVehiclesFromActiveTab();
  } else {
    vehicles = cloneVehicles(parsed.vehicles || defaultVehicles);
    const activeTab = getActivePriceTab();
    if (activeTab) activeTab.vehicles = cloneVehicles(vehicles);
  }
  templates = ensureTemplateIds(parsed.templates || defaultTemplates);
  clients = parsed.clients || [];
  managerClients = parsed.managerClients || [];
  snapshots = parsed.snapshots || [];
  uiState = { ...defaultUiState, ...(parsed.uiState || {}) };
  clientManagerState = { ...defaultClientManagerState, ...(parsed.clientManagerState || {}) };
  clientManagerState.columnVisibility = { ...defaultClientManagerState.columnVisibility, ...(clientManagerState.columnVisibility || {}) };
  clientManagerState.dateRange = { ...defaultClientManagerState.dateRange, ...(clientManagerState.dateRange || {}) };
  clientManagerState.actionVisibility = { ...defaultActionVisibility, ...(clientManagerState.actionVisibility || {}) };
  clientManagerState.contactAssistant = { ...defaultClientManagerState.contactAssistant, ...(clientManagerState.contactAssistant || {}) };
  clientManagerState.customActions = (clientManagerState.customActions || []).map(action => ({ visible: true, ...action }));
  clientManagerState.exportOptions = normalizeExportOptions(clientManagerState.exportOptions || defaultClientManagerState.exportOptions);
  clientManagerState.pagination = normalizePaginationState(clientManagerState.pagination || defaultClientManagerState.pagination);
  uiState.templateSearch = uiState.templateSearch || '';
  uiState.clientSearch = uiState.clientSearch || '';
  uiState.profileSearch = uiState.profileSearch || '';
  uiState.globalSettings = mergeGlobalSettings(uiState.globalSettings);
  uiState.preferences = mergePreferences(uiState.preferences);
  selectedTemplateIndex = Math.min(uiState.selectedTemplateIndex || 0, templates.length - 1);
  selectedTemplateId = templates[selectedTemplateIndex]?.id;
  planDraftApplied = false;
  persist();
  applyToggleState();
  applyPreferences();
  applyStatusPalette();
  renderVehicleTable();
  renderTemplates();
  renderPlanForm();
  renderClients();
  renderClientManager();
  renderScheduledClients();
  renderGlobalSettings();
  renderSnapshots();
  renderStats();
}

function saveSnapshot() {
  const title = `Snapshot ${new Date().toLocaleString('es-AR')}`;
  const data = {
    vehicles: cloneVehicles(vehicles),
    priceTabs: clonePriceTabs(priceTabs),
    activePriceTabId,
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

function buildDefaultContextMenuVisibility() {
  return {
    data: Object.fromEntries(contextMenuDataCatalog.map(item => [item.key, true])),
    actions: Object.fromEntries(defaultActionCatalog.map(action => [action.id, true]))
  };
}

function mergePreferences(current = {}) {
  const base = defaultUiState.preferences;
  const fontSizes = { ...base.fontSizes, ...(current.fontSizes || {}) };
  const defaultVisibility = buildDefaultContextMenuVisibility();
  const dataVisibility = { ...defaultVisibility.data, ...(current.contextMenuVisibility?.data || {}) };
  const actionVisibility = { ...defaultVisibility.actions, ...(current.contextMenuVisibility?.actions || {}) };
  return {
    fontSizes,
    phoneDisplay: current.phoneDisplay ?? base.phoneDisplay,
    contextMenuVisibility: { data: dataVisibility, actions: actionVisibility }
  };
}

function parseExcelDate(value) {
  if (value instanceof Date) return value;
  if (typeof value === 'number' && Number.isFinite(value) && value > 59) {
    const parsed = XLSX?.SSF?.parse_date_code(value);
    if (parsed) {
      const { y, m, d } = parsed;
      return new Date(Date.UTC(y, (m || 1) - 1, d || 1));
    }
  }
  if (typeof value === 'string') {
    const numeric = Number(value);
    if (Number.isFinite(numeric) && numeric > 59) return parseExcelDate(numeric);
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

function formatLocalISO(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateLabel(value) {
  const iso = formatDateISO(value);
  if (!iso) return 'Sin fecha asignada';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

function formatDateTimeForDisplay(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  const datePart = date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  const timePart = date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
  return `${datePart} - ${timePart}`;
}

function normalizeDateTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString();
}

function buildScheduleDateTime(dateValue, timeValue) {
  if (!dateValue || !timeValue) return '';
  const normalized = new Date(`${dateValue}T${timeValue}:00`);
  if (Number.isNaN(normalized.getTime())) return '';
  return normalized.toISOString();
}

function formatTimeValue(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function scheduleTone(scheduleAt) {
  if (!scheduleAt) return '';
  const timestamp = new Date(scheduleAt).getTime();
  if (Number.isNaN(timestamp)) return '';
  const diff = timestamp - Date.now();
  if (diff < 0) return 'overdue';
  if (diff < 3600000 * 4) return 'soon';
  return '';
}

function timeAgo(isoValue) {
  if (!isoValue) return '';
  const now = Date.now();
  const target = new Date(isoValue).getTime();
  if (Number.isNaN(target)) return '';
  const diffMs = Math.max(0, now - target);
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (minutes < 1) return 'Hace instantes';
  if (minutes === 1) return 'Hace 1 minuto';
  if (minutes < 60) return `Hace ${minutes} minutos`;
  if (hours === 1) return 'Hace 1 hora';
  if (hours < 24) return `Hace ${hours} horas`;
  if (days === 1) return 'Hace 1 día';
  return `Hace ${days} días`;
}

function sanitizeSheetName(label) {
  return (label || 'Sin fecha asignada').replace(/[\\/:?*\[\]]/g, '-').slice(0, 31) || 'Sin fecha asignada';
}

function isWithinDateRange(value, range = {}) {
  if (!range.from && !range.to) return true;
  const iso = formatDateISO(value);
  if (!iso) return false;
  const meetsFrom = range.from ? iso >= range.from : true;
  const meetsTo = range.to ? iso <= range.to : true;
  return meetsFrom && meetsTo;
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

function normalizeFontSize(value, fallback = '14px') {
  const numeric = Number.parseFloat(value);
  if (!Number.isFinite(numeric)) return fallback;
  const clamped = Math.min(24, Math.max(10, numeric));
  return `${clamped}px`;
}

function formatPhoneDisplay(value) {
  const digits = normalizePhone(value);
  if (!digits) return '';
  const mode = uiState.preferences?.phoneDisplay || defaultUiState.preferences.phoneDisplay;
  if (mode === 'split2') {
    const groups = [];
    for (let i = 0; i < digits.length; i += 2) {
      groups.push(digits.slice(i, i + 2));
    }
    return `(+54) ${groups.join('-')}`;
  }
  if (mode === 'split3') {
    const groups = [];
    for (let i = 0; i < digits.length; i += 3) {
      groups.push(digits.slice(i, i + 3));
    }
    return `(+54) ${groups.join('-')}`;
  }
  return digits;
}

function normalizeNotesValue(value) {
  const text = (value || '').toString().trim();
  return text && text !== '-' ? text : '-';
}

function toggleFadeOverlay(overlay, show) {
  if (!overlay) return;
  overlay.classList.remove('closing');
  if (show) {
    overlay.classList.add('show');
  } else {
    overlay.classList.add('closing');
    setTimeout(() => overlay.classList.remove('show', 'closing'), 260);
  }
}

function updateScrollLock() {
  const hasModal = document.querySelector('.modal.show:not(.hidden)');
  const hasPopover = document.querySelector('.popover-overlay.show');
  document.body.classList.toggle('no-scroll', Boolean(hasModal || hasPopover));
}

function setupScrollLockObserver() {
  updateScrollLock();
  const targets = document.querySelectorAll('.modal, .popover-overlay');
  if (!targets.length) return;
  const observer = new MutationObserver(() => updateScrollLock());
  targets.forEach(target => observer.observe(target, { attributes: true, attributeFilter: ['class'] }));
}

function hasNotes(client = {}) {
  return normalizeNotesValue(client.type) !== '-';
}

function clientStatus(client = {}) {
  const flags = client.flags || {};
  if (flags.customStatus?.id) {
    const custom = getCustomActionById(flags.customStatus.id) || flags.customStatus;
    const color = custom?.color || '#38bdf8';
    const label = custom?.label || 'Acción personalizada';
    return { label, className: 'status-custom', color };
  }
  if (flags.noNumber) return { label: 'Número no disponible', className: 'status-no-number' };
  if (flags.favorite) return { label: 'Favorito', className: 'status-favorite' };
  if (flags.contacted) return { label: 'Contactado', className: 'status-contacted' };
  return { label: 'Pendiente', className: 'status-pending' };
}

function statusLabelFromType(value) {
  const text = (value || '').toString().trim().toLowerCase();
  if (!text) return '';
  if (text.includes('no') && text.includes('dispon')) return 'Número no disponible';
  if (text.includes('favor')) return 'Favorito';
  if (text.includes('contact')) return 'Contactado';
  if (text.includes('pend')) return 'Pendiente';
  return '';
}

function initialTemplate() {
  return templates.find(t => (t.title || '').toLowerCase().includes('inicio')) || templates[0];
}

function buildMessageForClient(client) {
  const tpl = initialTemplate();
  if (!tpl) return '';
  const globalSettings = mergeGlobalSettings(uiState.globalSettings);
  const year = extractYear(client.purchaseDate || client.birthDate || '');
  const noteValue = normalizeNotesValue(client.type);
  const defaultNote = normalizeNotesValue(globalSettings.clientType);
  const noteForMessage = noteValue !== '-' ? noteValue : (defaultNote !== '-' ? defaultNote : '');
  const replacements = {
    cliente: client.name || '',
    asesor: globalSettings.advisorName || '',
    tipo: noteForMessage,
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

let priceTabs = clonePriceTabs(load('priceTabs') || createDefaultPriceTabs());
let activePriceTabId = load('activePriceTabId') || (priceTabs[0]?.id || '');
let vehicles = cloneVehicles((priceTabs.find(t => t.id === activePriceTabId) || priceTabs[0] || {}).vehicles || load('vehicles') || defaultVehicles);
let templates = ensureTemplateIds(load('templates') || defaultTemplates);
let clients = load('clients') || [];
let managerClients = load('managerClients') || [];
let uiState = { ...defaultUiState, ...(load('uiState') || {}) };
let clientManagerState = { ...defaultClientManagerState, ...(load('clientManagerState') || {}) };
let selectedTemplateIndex = Math.min(uiState.selectedTemplateIndex || 0, templates.length - 1);
let planDraftApplied = false;
let lastPlanProjection = null;
let snapshots = load('snapshots') || [];
let activeNoteClientId = null;
let activeActionClientId = null;
let activeEditAction = null;
let contactLogInterval = null;
let editingCustomActionId = null;
let selectedCustomIcon = 'bx-check-circle';
let activeContextClientId = null;
let activeScheduleClientId = null;
let scheduleClockInterval = null;

function upgradePriceTabsFromLegacy() {
  const storedTabs = load('priceTabs');
  if (!storedTabs) {
    const legacyVehicles = cloneVehicles(load('vehicles') || vehicles || defaultVehicles);
    priceTabs = createDefaultPriceTabs();
    if (priceTabs[0]) {
      priceTabs[0].vehicles = legacyVehicles;
      activePriceTabId = priceTabs[0].id;
    }
  }
  priceTabs = clonePriceTabs(priceTabs).map(tab => ({ ...tab, locked: false, source: tab.source || 'predeterminado' }));
  ensurePriceTabsIntegrity();
  syncVehiclesFromActiveTab();
}

upgradePriceTabsFromLegacy();
enforceLatestPriceTab({ silent: true });

clientManagerState.dateRange = { ...defaultClientManagerState.dateRange, ...(clientManagerState.dateRange || {}) };
clientManagerState.columnVisibility = { ...defaultClientManagerState.columnVisibility, ...(clientManagerState.columnVisibility || {}) };
clientManagerState.actionVisibility = { ...defaultActionVisibility, ...(clientManagerState.actionVisibility || {}) };
clientManagerState.customActions = (clientManagerState.customActions || []).map(action => ({ visible: true, ...action }));
clientManagerState.pagination = normalizePaginationState(clientManagerState.pagination || defaultClientManagerState.pagination);
clientManagerState.contactAssistant = { ...defaultClientManagerState.contactAssistant, ...(clientManagerState.contactAssistant || {}) };

uiState.templateSearch = uiState.templateSearch || '';
uiState.clientSearch = uiState.clientSearch || '';
uiState.quoteSearch = uiState.quoteSearch || '';
uiState.profileSearch = uiState.profileSearch || '';
uiState.globalSettings = mergeGlobalSettings(uiState.globalSettings);
uiState.preferences = mergePreferences(uiState.preferences);
let selectedTemplateId = templates[selectedTemplateIndex]?.id;

uiState.variableValues = uiState.variableValues || {};
uiState.toggles = { ...defaultUiState.toggles, ...(uiState.toggles || {}) };
uiState.planDraft = uiState.planDraft || {};
let selectedPlanClientId = uiState.planDraft.selectedClientId || null;

init();

function init() {
  try {
    setupScrollLockObserver();
    bindNavigation();
    bindProfileActions();
    bindSettingsMenu();
    bindPreferencesPanel();
    bindActionMenu();
    bindSidebarToggle();
    bindQuickLinks();
    applyToggleState();
    applyPreferences();
    applyStatusPalette();
    renderStats();
    renderWelcomeHero();
    renderQuickOverview();
    renderHomeShortcuts();
    renderTemplates();
    renderPriceTabs();
    renderVehicleTable();
    renderPlanForm();
    renderClients();
    renderClientManager();
    renderScheduledClients();
    renderGlobalSettings();
    renderSnapshots();
    bindNoteModal();
    bindClientPicker();
    bindQuoteModal();
    bindResourceButtons();
    attachPlanListeners();
    attachTemplateActions();
    bindPriceTabControls();
    bindPriceImportActions();
    attachVehicleToggles();
    bindClientManager();
    bindContactAssistant();
    bindScheduleModal();
    bindActionCustomizer();
    bindCustomContextMenu();
    startContactLogTicker();
    startScheduleClock();
    startRealtimePersistence();
    document.getElementById('clearStorage').addEventListener('click', clearStorage);
    loadPricesFromServer({ silent: true });
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
  const targetPanel = document.getElementById(targetId);
  updateSectionTitle(targetId);
  if (targetId === 'plans') {
    enforceLatestPriceTab({ silent: true });
    updatePlanSummary();
  }
  if (targetId === 'scheduledClients') {
    renderScheduledClients();
  }
}

function updateSectionTitle(targetId) {
  const title = document.getElementById('sectionTitle');
  if (!title) return;
  title.textContent = panelTitles[targetId] || 'Inicio';
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
  const actionPanel = document.getElementById('actionMenuPanel');
  if (!toggle || !panel) return;
  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open') && actionPanel) {
      actionPanel.classList.remove('open');
    }
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
  const settingsPanel = document.getElementById('settingsPanel');
  if (!toggle || !panel || !wrapper) return;
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
    if (panel.classList.contains('open') && settingsPanel) {
      settingsPanel.classList.remove('open');
    }
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

function applyPreferences() {
  const prefs = mergePreferences(uiState.preferences);
  uiState.preferences = prefs;
  const root = document.documentElement;
  Object.entries(prefs.fontSizes || {}).forEach(([key, size]) => {
    const fallback = defaultPreferenceFontSizes[key] || '14px';
    root.style.setProperty(`--pref-font-${key}`, normalizeFontSize(size, fallback));
  });
}

function preferenceFields() {
  return [
    ...Object.entries(clientColumns).map(([key, col]) => ({ key, label: col.label })),
    { key: 'status', label: 'Estado' }
  ];
}

function contextMenuFontFields() {
  return [
    { key: 'contextTitle', label: 'Título principal' },
    { key: 'contextSubtitle', label: 'Subtítulos y etiquetas' },
    { key: 'contextLabel', label: 'Nombre de acción o dato' },
    { key: 'contextMeta', label: 'Texto secundario' }
  ];
}

function renderPreferencesPanel() {
  const container = document.getElementById('fontPreferencesList');
  const contextContainer = document.getElementById('contextFontPreferencesList');
  const visibilityContainer = document.getElementById('contextVisibilityList');
  if (!container) return;
  const prefs = mergePreferences(uiState.preferences);
  const renderFontList = (target, fields) => {
    if (!target) return;
    target.innerHTML = fields.map(({ key, label }) => {
      const value = Number.parseFloat(prefs.fontSizes?.[key] || defaultPreferenceFontSizes[key] || '14');
      return `
        <div class="preference-row" data-key="${key}">
          <div class="preference-label">
            <strong>${label}</strong>
            <span class="muted tiny">Tamaño en píxeles</span>
          </div>
          <div class="preference-controls">
            <input type="number" min="10" max="24" step="1" value="${Number.isFinite(value) ? value : 14}" data-pref-key="${key}">
            <button class="ghost-btn mini" data-pref-reset="${key}">Restaurar tamaño por defecto</button>
          </div>
        </div>
      `;
    }).join('');

    target.querySelectorAll('[data-pref-key]').forEach(input => {
      input.addEventListener('input', () => {
        const key = input.dataset.prefKey;
        if (!key) return;
        uiState.preferences = mergePreferences(uiState.preferences);
        uiState.preferences.fontSizes[key] = normalizeFontSize(input.value, defaultPreferenceFontSizes[key]);
        persist();
        applyPreferences();
      });
    });

    target.querySelectorAll('[data-pref-reset]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.prefReset;
        if (!key) return;
        const fallback = defaultPreferenceFontSizes[key] || '14px';
        uiState.preferences = mergePreferences(uiState.preferences);
        uiState.preferences.fontSizes[key] = normalizeFontSize(fallback, fallback);
        const input = target.querySelector(`[data-pref-key="${key}"]`);
        if (input) input.value = Number.parseFloat(uiState.preferences.fontSizes[key]);
        persist();
        applyPreferences();
      });
    });
  };

  renderFontList(container, preferenceFields());
  renderFontList(contextContainer, contextMenuFontFields());

  if (visibilityContainer) {
    const visibility = prefs.contextMenuVisibility || { data: {}, actions: {} };
    const dataItems = contextMenuDataCatalog.map(item => ({
      key: item.key,
      label: item.label,
      checked: visibility.data?.[item.key] !== false,
      scope: 'data'
    }));
    const actionItems = getAvailableActions().map(action => ({
      key: action.actionKey,
      label: action.label,
      checked: visibility.actions?.[action.actionKey] !== false,
      scope: 'actions',
      tone: action.type === 'custom' ? 'Personalizada' : 'Predeterminada'
    }));

    visibilityContainer.innerHTML = `
      <div class="preference-group">
        <p class="eyebrow">Datos del cliente</p>
        ${dataItems.map(item => `
          <label class="toggle inline" data-visibility-key="${item.key}" data-visibility-scope="${item.scope}">
            <input type="checkbox" ${item.checked ? 'checked' : ''}>
            <span>${item.label}</span>
          </label>
        `).join('')}
      </div>
      <div class="preference-group">
        <p class="eyebrow">Acciones rápidas</p>
        ${actionItems.map(item => `
          <label class="toggle inline" data-visibility-key="${item.key}" data-visibility-scope="${item.scope}">
            <input type="checkbox" ${item.checked ? 'checked' : ''}>
            <span>${item.label} <em class="muted tiny">${item.tone}</em></span>
          </label>
        `).join('')}
      </div>
    `;

    visibilityContainer.querySelectorAll('[data-visibility-key]').forEach(row => {
      const input = row.querySelector('input');
      if (!input) return;
      input.addEventListener('change', () => {
        const key = row.dataset.visibilityKey;
        const scope = row.dataset.visibilityScope;
        if (!key || !scope) return;
        uiState.preferences = mergePreferences(uiState.preferences);
        if (scope === 'data') {
          uiState.preferences.contextMenuVisibility.data[key] = input.checked;
        } else {
          uiState.preferences.contextMenuVisibility.actions[key] = input.checked;
        }
        persist();
      });
    });
  }

  const phoneSelect = document.getElementById('phoneDisplaySelect');
  if (phoneSelect) {
    phoneSelect.value = prefs.phoneDisplay || defaultUiState.preferences.phoneDisplay;
  }
}

function bindPreferencesPanel() {
  const openBtn = document.getElementById('openPreferences');
  const overlay = document.getElementById('preferencesOverlay');
  const closeBtn = document.getElementById('closePreferences');
  const phoneSelect = document.getElementById('phoneDisplaySelect');
  const tabs = document.querySelectorAll('.preferences-tab');
  const panels = document.querySelectorAll('.pref-panel');
  const panelsContainer = document.querySelector('#preferencesPanel .preferences-panels');
  const setActiveTab = (target) => {
    if (!target) return;
    tabs.forEach(btn => btn.classList.toggle('active', btn.dataset.prefTab === target));
    panels.forEach(panel => panel.classList.toggle('active', panel.dataset.prefPanel === target));
  };
  const scrollToPanel = (target) => {
    if (!target || !panelsContainer) return;
    const panel = panelsContainer.querySelector(`[data-pref-panel="${target}"]`);
    if (!panel) return;
    const top = panel.offsetTop - panelsContainer.offsetTop;
    panelsContainer.scrollTo({ top, behavior: 'smooth' });
    setActiveTab(target);
  };
  const updateActiveTabFromScroll = () => {
    if (!panelsContainer || !panels.length) return;
    const containerTop = panelsContainer.getBoundingClientRect().top;
    const threshold = 48;
    const panelList = Array.from(panels);
    const visible = panelList.filter(panel => panel.getBoundingClientRect().top - containerTop <= threshold);
    const activePanel = visible.length ? visible[visible.length - 1] : panelList[0];
    if (activePanel) setActiveTab(activePanel.dataset.prefPanel);
  };
  if (openBtn && overlay) {
    openBtn.addEventListener('click', () => {
      renderPreferencesPanel();
      if (panelsContainer) panelsContainer.scrollTo({ top: 0, behavior: 'auto' });
      if (tabs.length) setActiveTab(tabs[0].dataset.prefTab);
      toggleFadeOverlay(overlay, true);
    });
  }
  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => toggleFadeOverlay(overlay, false));
  }
  if (tabs.length && panels.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.prefTab;
        if (!target) return;
        scrollToPanel(target);
      });
    });
  }
  if (panelsContainer && !panelsContainer.dataset.bound) {
    panelsContainer.addEventListener('scroll', updateActiveTabFromScroll, { passive: true });
    panelsContainer.dataset.bound = 'true';
  }
  if (phoneSelect && !phoneSelect.dataset.bound) {
    phoneSelect.addEventListener('change', () => {
      uiState.preferences = mergePreferences(uiState.preferences);
      uiState.preferences.phoneDisplay = phoneSelect.value;
      persist();
      renderClientManager();
      const assistantOverlay = document.getElementById('contactAssistantOverlay');
      if (assistantOverlay?.classList.contains('show')) {
        renderContactAssistant();
      }
    });
    phoneSelect.dataset.bound = 'true';
  }
}

function renderStats() {
  const templateCount = document.getElementById('templateCount');
  const clientCount = document.getElementById('clientCount');
  if (templateCount) templateCount.textContent = templates.length;
  if (clientCount) clientCount.textContent = clients.length + managerClients.length;
  renderWelcomeHero();
  renderAdvisorNote();
}

function renderWelcomeHero() {
  const heading = document.getElementById('dashboardHeading');
  const subtitle = document.getElementById('dashboardSubtitle');
  const helper = document.getElementById('advisorHelper');
  const input = document.getElementById('advisorInput');
  const datalist = document.getElementById('advisorSuggestions');
  if (!heading || !subtitle) return;

  const settings = mergeGlobalSettings(uiState.globalSettings);
  const advisorRaw = settings.advisorName || '';
  const advisor = advisorRaw.trim();
  heading.textContent = advisor ? `Inicio de ${advisor}` : 'Inicio';
  subtitle.textContent = 'Define quién atiende y ajusta tu jornada.';
  updateSidebarAdvisor(advisor);
  renderAdvisorSelector(advisorRaw);
  if (helper) helper.textContent = 'Los cambios se guardan automáticamente en este dispositivo.';

  const suggestions = Array.from(new Set([
    'Chevrolet Argentina',
    'Sofía Alvarez',
    'Martín Rivas',
    'Agustina Torres',
    advisor
  ].filter(Boolean)));
  if (datalist) {
    datalist.innerHTML = suggestions.map(name => `<option value="${name}"></option>`).join('');
  }

  if (input && input.value !== advisorRaw) input.value = advisorRaw;

  if (input && !input.dataset.bound) {
    input.addEventListener('input', () => {
      uiState.globalSettings.advisorName = input.value.replace(/\s+/g, ' ');
      persist();
      renderGlobalSettings();
      renderWelcomeHero();
      renderClientManager();
    });
    input.dataset.bound = 'true';
  }
  bindQuickLinks();
}

function updateSidebarAdvisor(advisor) {
  const sidebarLabel = document.getElementById('sidebarAdvisor');
  if (sidebarLabel) sidebarLabel.textContent = advisor || 'Chevrolet Argentina';
}

function renderAdvisorSelector(advisor) {
  const select = document.getElementById('advisorSelector');
  if (!select) return;
  const cleanAdvisor = (advisor || '').replace(/\s+/g, ' ').trim();
  const suggestions = Array.from(new Set([
    'Chevrolet Argentina',
    cleanAdvisor
  ].filter(Boolean)));
  select.innerHTML = `<option value="" disabled>${cleanAdvisor ? 'Asesor activo' : 'Define el asesor en Inicio'}</option>` +
    suggestions.map(name => `<option value="${name}">${name}</option>`).join('');
  select.value = cleanAdvisor || '';
  select.disabled = true;
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
          <button class="mini-btn" data-action="copy" data-id="${tpl.id}" title="Copiar"><i class='bx bx-copy'></i></button>
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
    if (btn.dataset.action === 'copy') {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const targetTpl = templates.find(t => t.id === id);
        await copyTemplateContent(targetTpl);
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

function getTemplateValues() {
  const values = { ...(uiState.variableValues || {}) };
  const inputs = document.querySelectorAll('#variableInputs input');
  inputs.forEach(inp => {
    values[inp.dataset.var] = inp.value || '';
  });
  return values;
}

function buildTemplateText(body, values = getTemplateValues()) {
  return (body || '').replace(/{{(.*?)}}/g, (_, key) => {
    const k = key.trim();
    return values[k] !== undefined && values[k] !== '' ? values[k] : `{{${k}}}`;
  });
}

function updatePreview() {
  const body = document.getElementById('templateBody').value || '';
  const values = getTemplateValues();
  const replaced = buildTemplateText(body, values);
  const preview = document.getElementById('templatePreview');
  if (preview) {
    preview.textContent = replaced;
  }
}

async function copyTemplateContent(template = templates[selectedTemplateIndex]) {
  if (!template) return;
  const values = getTemplateValues();
  const text = buildTemplateText(template.body, values);
  await navigator.clipboard.writeText(text);
  const status = document.getElementById('copyStatus');
  if (status) {
    status.textContent = 'Plantilla copiada con variables aplicadas';
    setTimeout(() => status.textContent = '', 2000);
  }
  showToast('Plantilla copiada', 'success');
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

  document.getElementById('copyTemplate').addEventListener('click', () => copyTemplateContent());

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

function renderPriceTabs() {
  ensurePriceTabsIntegrity();
  const list = document.getElementById('priceTabList');
  const label = document.getElementById('vehicleUpdateTag');
  const subtitle = document.getElementById('priceTabSubtitle');
  const renameBtn = document.getElementById('renamePriceTab');
  const deleteBtn = document.getElementById('deletePriceTab');
  const active = getActivePriceTab();
  if (label) label.textContent = `Última actualización: ${active?.label || 'Sin definir'}`;
  if (subtitle) subtitle.textContent = getActivePriceStatus();
  if (renameBtn) renameBtn.disabled = !active;
  if (deleteBtn) deleteBtn.disabled = !active || priceTabs.length <= 1;
  if (!list) return;
  list.innerHTML = priceTabs.map(tab => `
    <button class="tab-chip ${tab.id === activePriceTabId ? 'active' : ''}" data-tab="${tab.id}">
      <span>${tab.label}</span>
    </button>
  `).join('');
  list.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => setActivePriceTab(btn.dataset.tab)));
  updatePriceContextTag();
}

function getPriceFilePath(tab = getActivePriceTab()) {
  if (!tab?.folder) return '';
  const trimmed = tab.folder.replace(/\/?$/, '');
  return `${trimmed}/precios.json`;
}

function getActivePriceStatus() {
  const active = getActivePriceTab();
  if (!active) return 'Precios en modo local';
  if (active.source === 'servidor') return 'Precios cargados desde archivo del mes';
  if (active.source === 'archivo') return 'Precios cargados manualmente';
  return 'Precios en modo local';
}

function renderPriceAlerts(message, type = 'warning') {
  const stack = document.getElementById('priceAlerts');
  if (!stack) return;
  const messages = Array.isArray(message) ? message : [message];
  stack.innerHTML = messages.filter(Boolean).map(msg => `
    <div class="alert-card ${type === 'success' ? 'success' : type === 'error' ? 'error' : ''}">
      <span class="icon">${type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️'}</span>
      <div>${msg}</div>
    </div>
  `).join('');
}

function clearPriceAlerts() {
  const stack = document.getElementById('priceAlerts');
  if (stack) stack.innerHTML = '';
}

function updatePriceContextTag() {
  const tag = document.getElementById('priceContextTag');
  if (!tag) return;
  const latest = getMostRecentPriceTab() || getActivePriceTab();
  if (latest) {
    const month = latest.month || latest.label || 'Mes sin definir';
    const year = latest.year ? ` ${latest.year}` : '';
    tag.textContent = `Utilizando precios de: ${month}${year}`;
  } else {
    tag.textContent = 'Utilizando precios locales';
  }
}

function applyImportedVehicles(data, source = 'archivo', { silentToast = false } = {}) {
  const parsedVehicles = cloneVehicles(data?.vehicles || data || []);
  if (!parsedVehicles.length) {
    showToast('El archivo de precios no tiene modelos válidos.', 'error');
    return false;
  }
  vehicles = parsedVehicles;
  const active = getActivePriceTab();
  if (active) {
    active.vehicles = cloneVehicles(parsedVehicles);
    active.source = source;
  }
  persist();
  renderVehicleTable();
  renderPlanForm();
  renderClients();
  renderClientManager();
  if (!silentToast) {
    showToast(`Precios aplicados desde ${source === 'servidor' ? 'el servidor' : 'un archivo'}.`, 'success');
  }
  updatePriceContextTag();
  return true;
}

async function loadPricesFromServer({ silent = false } = {}) {
  const active = getActivePriceTab();
  if (!active) return null;
  const path = getPriceFilePath(active);
  if (!path) {
    if (!silent) renderPriceAlerts('No hay carpeta configurada para este mes.', 'error');
    return null;
  }
  try {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    applyImportedVehicles(data, 'servidor', { silentToast: silent });
    renderPriceAlerts(`Precios cargados desde ${path}`, 'success');
    updatePriceImportStatuses({ server: `Cargado desde ${path}` });
    return data;
  } catch (err) {
    active.source = active.source || 'predeterminado';
    if (!silent) {
      renderPriceAlerts('No hay archivo de precios para este mes, se usan los valores predeterminados.', 'warning');
      showToast('No se encontró precios.json en la carpeta del mes.', 'error');
      updatePriceImportStatuses({ server: 'No se encontró precios.json' });
    }
    return null;
  }
}

function buildPricePayload() {
  const active = getActivePriceTab();
  return {
    month: active?.month || '',
    year: active?.year || '',
    tabId: active?.id || '',
    updatedAt: new Date().toISOString(),
    vehicles: cloneVehicles(vehicles)
  };
}

function downloadPriceFile() {
  const payload = buildPricePayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'precios.json';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast('precios.json descargado', 'success');
}

function copyPriceJson() {
  const payload = JSON.stringify(buildPricePayload(), null, 2);
  copyText(payload, 'JSON de precios copiado');
}

function updatePriceImportStatuses(status = {}) {
  const serverStatus = document.getElementById('serverPriceStatus');
  const localStatus = document.getElementById('localPriceStatus');
  if (serverStatus && status.server) serverStatus.textContent = `Estado: ${status.server}`;
  if (localStatus && status.local) localStatus.textContent = `Estado: ${status.local}`;
}

function getPrimaryFileForTab(tab) {
  if (tab?.primaryFile) return tab.primaryFile;
  if (tab?.files?.length) return tab.files[0].path;
  return '';
}

function openPriceTabModal(mode = 'create') {
  const modal = document.getElementById('priceTabModal');
  if (!modal) return;
  const title = document.getElementById('priceTabModalTitle');
  const submit = document.getElementById('priceTabSubmit');
  const cancel = document.getElementById('priceTabCancel');
  const close = document.getElementById('priceTabClose');
  const monthSelect = document.getElementById('priceTabMonth');
  const yearInput = document.getElementById('priceTabYear');
  const baseSelect = document.getElementById('priceTabBase');
  const nameInput = document.getElementById('priceTabCustomName');
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  if (monthSelect && !monthSelect.dataset.loaded) {
    monthSelect.innerHTML = months.map(m => `<option value="${m}">${m}</option>`).join('');
    monthSelect.dataset.loaded = 'true';
  }
  if (baseSelect) {
    baseSelect.innerHTML = priceTabs.map(tab => `<option value="${tab.id}">${tab.label}</option>`).join('');
    baseSelect.value = activePriceTabId;
  }
  const active = getActivePriceTab();
  if (monthSelect) monthSelect.value = active?.month || months[new Date().getMonth()];
  if (yearInput) yearInput.value = active?.year || new Date().getFullYear();
  if (nameInput) nameInput.value = mode === 'rename' ? (active?.label || '') : '';
  if (title) title.textContent = mode === 'rename' ? 'Renombrar pestaña' : 'Nueva pestaña de precios';
  if (submit) submit.textContent = mode === 'rename' ? 'Guardar nombre' : 'Crear pestaña';

  const cleanup = () => {
    if (submit) submit.onclick = null;
    if (cancel) cancel.onclick = null;
    if (close) close.onclick = null;
    toggleModal(modal, false);
  };

  if (cancel) cancel.onclick = cleanup;
  if (close) close.onclick = cleanup;

  if (submit) {
    submit.onclick = () => {
      const month = monthSelect?.value || '';
      const year = Number(yearInput?.value) || new Date().getFullYear();
      const custom = nameInput?.value?.trim();
      if (mode === 'rename') {
        if (!active) return;
        active.month = month;
        active.year = year;
        active.label = custom || `${month} ${year}`;
        persist();
        renderPriceTabs();
        showToast('Pestaña renombrada', 'success');
        cleanup();
        return;
      }
      const baseId = baseSelect?.value || activePriceTabId;
      const base = priceTabs.find(t => t.id === baseId) || active;
      const id = `${(month || 'mes').toLowerCase()}-${year}-${Date.now()}`;
      const label = custom || `${month} ${year}`;
      priceTabs.push({
        id,
        label,
        month,
        year,
        locked: false,
        folder: base?.folder || '',
        primaryFile: base?.primaryFile || getPrimaryFileForTab(base),
        files: (base?.files || []).map(f => ({ ...f })),
        vehicles: cloneVehicles(base?.vehicles || defaultVehicles),
        source: base?.source || 'predeterminado'
      });
      setActivePriceTab(id);
      renderPriceTabs();
      showToast('Nueva pestaña creada', 'success');
      cleanup();
    };
  }

  toggleModal(modal, true);
}

function openPriceFilesModal() {
  const modal = document.getElementById('priceFilesModal');
  const list = document.getElementById('priceFilesList');
  const close = document.getElementById('priceFilesClose');
  const active = getActivePriceTab();
  if (!modal || !list) return;
  if (!active?.files?.length) {
    list.innerHTML = '<p class="muted">No hay archivos registrados para este mes.</p>';
  } else {
    list.innerHTML = active.files.map(file => `
      <a class="file-link" href="${file.path}" target="_blank" rel="noopener noreferrer">
        <i class='bx bx-file'></i> ${file.name}
      </a>
    `).join('');
  }
  if (close) close.onclick = () => toggleModal(modal, false);
  toggleModal(modal, true);
}

function bindPriceImportActions() {
  const openBtn = document.getElementById('importPrices');
  const exportBtn = document.getElementById('exportPrices');
  const downloadBtn = document.getElementById('downloadPriceFile');
  const copyBtn = document.getElementById('copyPriceJson');
  const reloadBtn = document.getElementById('reloadServerPrices');
  const applyFileBtn = document.getElementById('applyPriceFile');
  const uploadBox = document.getElementById('priceUploadBox');
  const fileInput = document.getElementById('priceFileInput');
  ['priceImportClose', 'priceImportCancel'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn && !btn.dataset.bound) {
      btn.addEventListener('click', () => toggleModal(document.getElementById('priceImportModal'), false));
      btn.dataset.bound = 'true';
    }
  });
  if (openBtn && !openBtn.dataset.bound) {
    openBtn.addEventListener('click', openPriceImportModal);
    openBtn.dataset.bound = 'true';
  }
  if (exportBtn && !exportBtn.dataset.bound) {
    exportBtn.addEventListener('click', () => {
      downloadPriceFile();
      showToast('Exporta el archivo en la carpeta del mes como precios.json', 'info');
    });
    exportBtn.dataset.bound = 'true';
  }
  if (downloadBtn && !downloadBtn.dataset.bound) {
    downloadBtn.addEventListener('click', downloadPriceFile);
    downloadBtn.dataset.bound = 'true';
  }
  if (copyBtn && !copyBtn.dataset.bound) {
    copyBtn.addEventListener('click', copyPriceJson);
    copyBtn.dataset.bound = 'true';
  }
  if (reloadBtn && !reloadBtn.dataset.bound) {
    reloadBtn.addEventListener('click', () => loadPricesFromServer({ silent: false }));
    reloadBtn.dataset.bound = 'true';
  }
  if (applyFileBtn && !applyFileBtn.dataset.bound) {
    applyFileBtn.addEventListener('click', () => {
      if (fileInput) fileInput.click();
    });
    applyFileBtn.dataset.bound = 'true';
  }
  if (uploadBox && !uploadBox.dataset.bound) {
    const handleFiles = (files) => {
      if (!files?.length) return;
      handlePriceFile(files[0]);
    };
    uploadBox.addEventListener('click', () => fileInput?.click());
    uploadBox.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadBox.classList.add('dragging');
    });
    uploadBox.addEventListener('dragleave', () => uploadBox.classList.remove('dragging'));
    uploadBox.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadBox.classList.remove('dragging');
      handleFiles(e.dataTransfer.files);
    });
    uploadBox.dataset.bound = 'true';
  }
  if (fileInput && !fileInput.dataset.bound) {
    fileInput.addEventListener('change', (e) => handlePriceFile(e.target.files?.[0]));
    fileInput.dataset.bound = 'true';
  }
}

function openPriceImportModal() {
  const modal = document.getElementById('priceImportModal');
  if (!modal) return;
  const pathLabel = document.getElementById('serverPricePath');
  const active = getActivePriceTab();
  if (pathLabel) pathLabel.textContent = `Ruta: ${getPriceFilePath(active) || 'Sin carpeta configurada'}`;
  updatePriceImportStatuses({ server: 'Esperando acción', local: 'Esperando archivo' });
  toggleModal(modal, true);
}

function handlePriceFile(file) {
  if (!file) return;
  if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
    showToast('Selecciona un archivo JSON válido.', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result || '{}');
      const ok = applyImportedVehicles(parsed, 'archivo');
      if (ok) {
        updatePriceImportStatuses({ local: `Aplicado: ${file.name}` });
        toggleModal(document.getElementById('priceImportModal'), false);
      }
    } catch (err) {
      showToast('No se pudo leer el archivo de precios.', 'error');
    }
  };
  reader.readAsText(file);
}

function bindPriceTabControls() {
  const addBtn = document.getElementById('addPriceTab');
  const renameBtn = document.getElementById('renamePriceTab');
  const deleteBtn = document.getElementById('deletePriceTab');
  const filesBtn = document.getElementById('viewMonthFiles');
  if (addBtn && !addBtn.dataset.bound) {
    addBtn.addEventListener('click', () => openPriceTabModal('create'));
    addBtn.dataset.bound = 'true';
  }
  if (renameBtn && !renameBtn.dataset.bound) {
    renameBtn.addEventListener('click', () => openPriceTabModal('rename'));
    renameBtn.dataset.bound = 'true';
  }
  if (deleteBtn && !deleteBtn.dataset.bound) {
    deleteBtn.addEventListener('click', () => {
      const active = getActivePriceTab();
      if (!active) return;
      confirmAction({
        title: 'Eliminar pestaña',
        message: `Se eliminará la pestaña "${active.label}".`,
        confirmText: 'Eliminar',
        onConfirm: () => {
          const idx = priceTabs.findIndex(t => t.id === active.id);
          if (idx >= 0) {
            priceTabs.splice(idx, 1);
            activePriceTabId = priceTabs[0]?.id || '';
            syncVehiclesFromActiveTab();
            persist();
            renderPriceTabs();
            renderVehicleTable();
            renderPlanForm();
            renderClients();
            renderClientManager();
            showToast('Pestaña eliminada', 'success');
          }
        }
      });
    });
    deleteBtn.dataset.bound = 'true';
  }
  if (filesBtn && !filesBtn.dataset.bound) {
    filesBtn.addEventListener('click', openPriceFilesModal);
    filesBtn.dataset.bound = 'true';
  }
}

function renderVehicleTable() {
  const resToggle = document.getElementById('showReservations');
  const intToggle = document.getElementById('showIntegration');
  const showRes = resToggle ? resToggle.checked : true;
  const showInt = intToggle ? intToggle.checked : true;
  uiState.toggles = { showReservations: showRes, showIntegration: showInt };
  persist();
  renderPriceTabs();
  const active = getActivePriceTab();
  clearPriceAlerts();
  if (active?.source === 'servidor') {
    renderPriceAlerts('Precios cargados desde el archivo del mes.', 'success');
  } else if (active?.source === 'archivo') {
    renderPriceAlerts('Precios cargados manualmente desde un archivo.', 'success');
  } else {
    renderPriceAlerts('No hay archivo de precios para este mes, se usan los valores predeterminados.', 'warning');
  }
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
  const bodyRows = [];

  bodyRows.push(`<tr><td>Precio de lista</td>${vehicles.map((v, idx) => `
    <td>
      <div class="money-field">
        <span class="prefix">$</span>
        <input class="money" type="text" inputmode="numeric" data-vehicle="${idx}" data-base="true" value="${v.basePrice ? number.format(v.basePrice) : ''}" data-raw="${v.basePrice || ''}" placeholder="$ 0">
      </div>
    </td>`).join('')}</tr>`);

  bodyRows.push(`<tr><td>Plan de cuotas</td>${vehicles.map(v => {
    const currentPlan = v.planProfile?.planType || plans[0];
    const labelValue = v.planProfile?.label || labels[currentPlan] || 'Plan fijo';
    const total = planTerms[currentPlan] || planTerms[v.planProfile?.planType] || 120;
    return `<td>
      <div class="plan-profile-cell readonly">
        <span class="chip muted">${labelValue}</span>
        <small class="muted tiny">${total} cuotas • No editable</small>
      </div>
    </td>`;
  }).join('')}</tr>`);

  plans.forEach(plan => {
    bodyRows.push(`<tr><td>${labels[plan]}</td>${vehicles.map((v, idx) => {
      const value = v.shareByPlan[plan] ?? v.cuotaPura;
      return `
        <td>
          <div class="money-field">
            <span class="prefix">$</span>
            <input class="money" type="text" inputmode="numeric" data-vehicle="${idx}" data-plan="${plan}" value="${value ? number.format(value) : ''}" data-raw="${value || ''}" placeholder="$ 0">
          </div>
        </td>`;
    }).join('')}</tr>`);
  });

  if (showInt) {
    bodyRows.push(`<tr><td>Integración</td>${vehicles.map((v, idx) => {
      return `<td>
        <div class="money-field">
          <span class="prefix">$</span>
          <input class="money" type="text" inputmode="numeric" data-vehicle="${idx}" data-integration="true" value="${v.integration ? number.format(v.integration) : ''}" data-raw="${v.integration || ''}" placeholder="$ 0">
        </div>
      </td>`;
    }).join('')}</tr>`);
  }

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

  table.querySelector('thead').innerHTML = head;
  table.querySelector('tbody').innerHTML = bodyRows.join('');

  table.querySelectorAll('input.money').forEach(inp => {
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

function updatePlanProfile(idx, payload = {}) {
  vehicles[idx].planProfile = { ...(vehicles[idx].planProfile || {}), ...payload };
  persist();
  renderPlanForm();
}

function applyPlanDefaultsForModel(modelIdx, { preserveExisting = false, resetManual = false } = {}) {
  const planSelect = document.getElementById('planType');
  const helper = document.getElementById('planProfileHelper');
  const chip = document.getElementById('planProfileChip');
  const vehicle = vehicles[modelIdx] || vehicles[0];
  const planType = getPlanTypeForVehicle(vehicle);
  if (planSelect) {
    planSelect.value = planType;
    if (resetManual) planSelect.dataset.manual = '';
  }
  if (chip) {
    chip.textContent = vehicle?.planProfile?.label || planLabel(planType);
  }
  if (helper) {
    const planLabelText = vehicle?.planProfile?.label ? `Plan asignado automáticamente: ${vehicle.planProfile.label}` : 'Plan establecido según el modelo.';
    const benefit = vehicle?.benefits?.bonificacion || '';
    const pactada = vehicle?.benefits?.pactada || '';
    helper.textContent = [planLabelText, 'Esquema fijo por modelo.', benefit, pactada].filter(Boolean).join(' • ');
  }
}

function applyReservationDefaultsForModel(modelIdx, { preserveExisting = false, resetManual = false } = {}) {
  const vehicle = vehicles[modelIdx] || vehicles[0];
  const map = {
    '1': document.getElementById('reservation1'),
    '3': document.getElementById('reservation3'),
    '6': document.getElementById('reservation6')
  };
  ['1', '3', '6'].forEach(key => {
    const input = map[key];
    if (!input) return;
    if (resetManual) input.dataset.manual = '';
    const current = parseMoney(input.dataset.raw || input.value || 0);
    const hasCustom = current > 0 && input.dataset.manual === 'true';
    if (!preserveExisting || !hasCustom) {
      setMoneyValue(input, vehicle?.reservations?.[key] || 0);
    }
  });
}

function applyCustomPriceDefaultForModel(modelIdx, { preserveExisting = false, resetManual = false } = {}) {
  const vehicle = vehicles[modelIdx] || vehicles[0];
  const input = document.getElementById('customPrice');
  if (!input) return;
  if (resetManual) input.dataset.manual = '';
  const current = parseMoney(input.dataset.raw || input.value || 0);
  const hasCustom = current > 0 && input.dataset.manual === 'true';
  if (!preserveExisting || !hasCustom) {
    setMoneyValue(input, vehicle?.basePrice || vehicle?.integration || 0);
  }
}

function bindClientPicker() {
  const openBtn = document.getElementById('openClientPicker');
  if (openBtn && !openBtn.dataset.bound) {
    openBtn.addEventListener('click', openClientPicker);
    openBtn.dataset.bound = 'true';
  }
  ['clientPickerClose', 'clientPickerCancel'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn && !btn.dataset.bound) {
      btn.addEventListener('click', closeClientPicker);
      btn.dataset.bound = 'true';
    }
  });
  const search = document.getElementById('clientPickerSearch');
  if (search && !search.dataset.bound) {
    search.addEventListener('input', renderClientPickerList);
    search.dataset.bound = 'true';
  }

  ['clientVehicleClose', 'clientVehicleCancel'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn && !btn.dataset.bound) {
      btn.addEventListener('click', closeClientVehicleModal);
      btn.dataset.bound = 'true';
    }
  });

  const applyBtn = document.getElementById('clientVehicleApply');
  if (applyBtn && !applyBtn.dataset.bound) {
    applyBtn.addEventListener('click', applyClientVehicleSelection);
    applyBtn.dataset.bound = 'true';
  }
}

function openClientPicker() {
  const modal = document.getElementById('clientPickerModal');
  if (!modal) return;
  renderClientPickerList();
  modal.classList.add('show');
  modal.classList.remove('hidden');
}

function closeClientPicker() {
  const modal = document.getElementById('clientPickerModal');
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 180);
}

function bindQuoteModal() {
  const openers = [document.getElementById('openQuoteModal')].filter(Boolean);
  openers.forEach(btn => {
    if (!btn.dataset.bound) {
      btn.addEventListener('click', openQuoteModal);
      btn.dataset.bound = 'true';
    }
  });
  const copyBtn = document.getElementById('copyQuote');
  if (copyBtn && !copyBtn.dataset.bound) {
    copyBtn.addEventListener('click', () => {
      const quote = buildQuoteFromForm();
      copyText(quote.summaryText, 'Cotización copiada');
    });
    copyBtn.dataset.bound = 'true';
  }
  ['quoteModalClose', 'quoteModalCancel'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn && !btn.dataset.bound) {
      btn.addEventListener('click', closeQuoteModal);
      btn.dataset.bound = 'true';
    }
  });
  const search = document.getElementById('quoteSearch');
  if (search && !search.dataset.bound) {
    search.value = uiState.quoteSearch || '';
    search.addEventListener('input', () => {
      uiState.quoteSearch = search.value;
      persist();
      renderClients();
    });
    search.dataset.bound = 'true';
  }
}

function openQuoteModal() {
  const modal = document.getElementById('quoteModal');
  if (!modal) return;
  renderClients();
  modal.classList.add('show');
  modal.classList.remove('hidden');
}

function closeQuoteModal() {
  const modal = document.getElementById('quoteModal');
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 180);
}

function bindResourceButtons() {
  const resources = [
    { viewId: 'viewInfoAuto', downloadId: 'downloadInfoAuto', path: 'img/Template/InfoAuto.jpg', name: 'InfoAuto.jpg' },
    { viewId: 'viewClientReference', downloadId: 'downloadClientReference', path: 'img/Template/FotosReferenciaParaCliente.jpg', name: 'FotosReferenciaParaCliente.jpg' }
  ];
  resources.forEach(res => {
    const viewBtn = document.getElementById(res.viewId);
    const downloadBtn = document.getElementById(res.downloadId);
    if (viewBtn && !viewBtn.dataset.bound) {
      viewBtn.addEventListener('click', () => openResource(res.path));
      viewBtn.dataset.bound = 'true';
    }
    if (downloadBtn && !downloadBtn.dataset.bound) {
      downloadBtn.addEventListener('click', () => openResource(res.path, res.name, true));
      downloadBtn.dataset.bound = 'true';
    }
  });
}

function openResource(path, name = '', download = false) {
  const link = document.createElement('a');
  link.href = path;
  if (download) link.download = name || path.split('/').pop();
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  link.remove();
  if (download) {
    showToast('Descarga lista', 'success');
  }
}

function renderClientPickerList() {
  const list = document.getElementById('clientPickerList');
  if (!list) return;
  const search = (document.getElementById('clientPickerSearch')?.value || '').toLowerCase();
  const filtered = managerClients.filter(c => {
    const haystack = `${c.name} ${c.model} ${c.phone}`.toLowerCase();
    return haystack.includes(search);
  });
  if (!filtered.length) {
    list.innerHTML = '<p class="muted">No hay clientes importados.</p>';
    return;
  }
  list.innerHTML = filtered.map(c => {
    const fecha = formatDateForDisplay(c.birthDate) || '';
    return `
      <div class="picker-card" data-picker-id="${c.id}">
        <strong>${c.name}</strong>
        <p class="muted">${c.model || 'Sin modelo'}${fecha ? ' · Nac: ' + fecha : ''}</p>
        <p class="muted">Tel: ${normalizePhone(c.phone) || 'Sin teléfono'}</p>
      </div>
    `;
  }).join('');

  list.querySelectorAll('[data-picker-id]').forEach(card => {
    if (!card.dataset.bound) {
      card.addEventListener('click', () => selectClientForPlan(card.dataset.pickerId));
      card.dataset.bound = 'true';
    }
  });
}

function selectClientForPlan(id) {
  const client = managerClients.find(c => c.id === id);
  if (!client) return;
  selectedPlanClientId = id;
  document.getElementById('clientName').value = client.name || '';
  uiState.planDraft.clientName = client.name || '';
  uiState.planDraft.selectedClientId = id;
  resolveClientVehicleSelection(client);
  refreshClientSelectionHint(client);
  closeClientPicker();
  persist();
}

function resolveClientVehicleSelection(client) {
  const ranking = rankVehiclesForModel(client.model, vehicles);
  const selection = ranking.filter(opt => opt.score > 0);
  const options = selection.length ? selection : ranking.slice(0, 5);
  const select = document.getElementById('planModel');
  const modal = document.getElementById('clientVehicleModal');
  const optionsSelect = document.getElementById('clientVehicleOptions');
  const context = document.getElementById('clientVehicleContext');

  const fallbackIdx = vehicles.findIndex(v => (v.name || '').toLowerCase() === (client.model || '').toLowerCase());
  const bestIdx = options[0]?.index ?? (fallbackIdx >= 0 ? fallbackIdx : 0);

  if (!modal || !optionsSelect || options.length <= 1) {
    if (select) select.value = vehicles[bestIdx] ? bestIdx : 0;
    applyPlanDefaultsForModel(Number(document.getElementById('planModel').value || 0), { resetManual: true });
    applyReservationDefaultsForModel(Number(document.getElementById('planModel').value || 0), { resetManual: true });
    applyCustomPriceDefaultForModel(Number(document.getElementById('planModel').value || 0), { resetManual: true });
    updateIntegrationDetails(Number(document.getElementById('planModel').value || 0));
    updatePlanSummary();
    return;
  }

  if (select) select.value = vehicles[bestIdx] ? bestIdx : 0;
  context.textContent = client.model
    ? `El cliente tiene asociado el auto: ${client.model}`
    : 'Selecciona el modelo correspondiente al cliente';
  optionsSelect.innerHTML = options.map(opt => `<option value="${opt.index}">${opt.name}</option>`).join('');
  optionsSelect.value = vehicles[bestIdx] ? bestIdx : options[0].index;
  modal.classList.remove('hidden');
  requestAnimationFrame(() => modal.classList.add('show'));
}

function closeClientVehicleModal() {
  const modal = document.getElementById('clientVehicleModal');
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 180);
}

function applyClientVehicleSelection() {
  const modal = document.getElementById('clientVehicleModal');
  const optionsSelect = document.getElementById('clientVehicleOptions');
  if (!modal || !optionsSelect) return;
  const idx = Number(optionsSelect.value || 0);
  const select = document.getElementById('planModel');
  if (select) select.value = vehicles[idx] ? idx : 0;
  applyPlanDefaultsForModel(Number(document.getElementById('planModel').value || 0), { resetManual: true });
  applyReservationDefaultsForModel(Number(document.getElementById('planModel').value || 0), { resetManual: true });
  applyCustomPriceDefaultForModel(Number(document.getElementById('planModel').value || 0), { resetManual: true });
  updateIntegrationDetails(Number(document.getElementById('planModel').value || 0));
  updatePlanSummary();
  closeClientVehicleModal();
}

function rankVehiclesForModel(modelName = '', list = []) {
  const normalized = (modelName || '').toLowerCase();
  const tokens = normalized.split(/\s+/).filter(Boolean);
  return list.map((v, idx) => {
    const name = (v.name || '').toLowerCase();
    let score = 0;
    tokens.forEach(t => {
      if (name.includes(t)) score += 1;
    });
    if (name.includes(normalized) && normalized) score += 2;
    return { name: v.name, index: idx, score };
  }).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}

function refreshClientSelectionHint(client) {
  const hint = document.getElementById('selectedClientHint');
  if (!hint) return;
  const applied = client || managerClients.find(c => c.id === selectedPlanClientId);
  if (applied) {
    const phone = applied.phone ? ` · Tel: ${normalizePhone(applied.phone)}` : '';
    hint.textContent = `Usando datos de ${applied.name}${phone}`;
  } else {
    hint.textContent = 'Puedes escribir los datos o aplicar uno importado.';
  }
}

function renderPlanForm() {
  const select = document.getElementById('planModel');
  const currentValue = select.value;
  select.innerHTML = vehicles.map((v, idx) => `<option value="${idx}">${v.name}</option>`).join('');
  const desiredValue = uiState.planDraft?.planModel ?? currentValue ?? 0;
  select.value = vehicles[desiredValue] ? desiredValue : 0;
  if (!select.dataset.bound) {
    select.addEventListener('change', () => {
      applyPlanDefaultsForModel(Number(select.value || 0), { resetManual: true });
      applyReservationDefaultsForModel(Number(select.value || 0), { resetManual: true });
      applyCustomPriceDefaultForModel(Number(select.value || 0), { resetManual: true });
      updateIntegrationDetails(Number(select.value || 0));
      updatePlanSummary();
    });
    document.getElementById('tradeIn').addEventListener('change', updatePlanSummary);
    document.getElementById('advancePayments').addEventListener('change', () => {
      toggleAdvanceAmountField();
      updatePlanSummary();
    });
    bindMoneyInput(document.getElementById('tradeInValue'), updatePlanSummary);
    bindMoneyInput(document.getElementById('advanceAmount'), updatePlanSummary);
    const customPriceInput = document.getElementById('customPrice');
    bindMoneyInput(customPriceInput, () => {
      customPriceInput.dataset.manual = 'true';
      updatePlanSummary();
    });
    const versionSelect = document.getElementById('versionSelect');
    if (versionSelect) {
      versionSelect.addEventListener('change', () => {
        updatePlanSummary();
        savePlanDraft();
      });
    }
    const versionUpgradeInput = document.getElementById('versionUpgrade');
    if (versionUpgradeInput) {
      bindMoneyInput(versionUpgradeInput, () => {
        versionUpgradeInput.dataset.manual = 'true';
        updatePlanSummary();
      });
    }
    ['reservation1', 'reservation3', 'reservation6'].forEach(id => {
      const el = document.getElementById(id);
      bindMoneyInput(el, () => {
        el.dataset.manual = 'true';
        updateIntegrationDetails(Number(select.value || 0));
        updatePlanSummary();
      });
    });
    const calc3 = document.getElementById('calcReservation3');
    const calc6 = document.getElementById('calcReservation6');
    if (calc3 && !calc3.dataset.bound) {
      calc3.addEventListener('click', () => calculateReservationsFromBase(3));
      calc3.dataset.bound = 'true';
    }
    if (calc6 && !calc6.dataset.bound) {
      calc6.addEventListener('click', () => calculateReservationsFromBase(6));
      calc6.dataset.bound = 'true';
    }
    const breakdownBtn = document.getElementById('openInstallmentBreakdown');
    if (breakdownBtn && !breakdownBtn.dataset.bound) {
      breakdownBtn.addEventListener('click', renderInstallmentBreakdown);
      breakdownBtn.dataset.bound = 'true';
    }
    ['installmentClose', 'installmentCancel'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn && !btn.dataset.bound) {
        btn.addEventListener('click', closeInstallmentModal);
        btn.dataset.bound = 'true';
      }
    });
    document.getElementById('clientName').addEventListener('input', updatePlanSummary);
    document.getElementById('notes').addEventListener('input', updatePlanSummary);
    select.dataset.bound = 'true';
  }
  if (!planDraftApplied) {
    applyPlanDraft();
    planDraftApplied = true;
  }
  const draft = uiState.planDraft || {};
  const hasCustomReservations = ['reservation1', 'reservation3', 'reservation6'].some(key => parseMoney(draft[key]));
  applyPlanDefaultsForModel(Number(select.value || 0), { preserveExisting: !!draft.planType });
  applyReservationDefaultsForModel(Number(select.value || 0), { preserveExisting: hasCustomReservations });
  applyCustomPriceDefaultForModel(Number(select.value || 0), { preserveExisting: !!parseMoney(draft.customPrice) });
  toggleAdvanceAmountField();
  updateIntegrationDetails(Number(select.value || 0));
  updatePlanSummary();
}

function calculateReservationsFromBase(multiplier) {
  const baseInput = document.getElementById('reservation1');
  if (!baseInput) return;
  const base = parseMoney(baseInput.dataset.raw || baseInput.value || 0);
  if (!base) {
    showToast('Primero ingresa el valor en 1 cuota para calcular.', 'error');
    return;
  }
  const targetId = multiplier === 3 ? 'reservation3' : 'reservation6';
  const target = document.getElementById(targetId);
  if (!target) return;
  setMoneyValue(target, base);
  target.dataset.manual = 'true';
  updateIntegrationDetails(Number(document.getElementById('planModel').value || 0));
  updatePlanSummary();
}

function getReservationValue(id, fallback = 0) {
  const el = document.getElementById(id);
  if (!el) return fallback;
  const val = parseMoney(el.dataset.raw || el.value || 0);
  return val || fallback;
}

function toggleAdvanceAmountField() {
  const field = document.getElementById('advanceAmountField');
  const checked = document.getElementById('advancePayments')?.checked;
  if (field) field.style.display = checked ? '' : 'none';
}

function updateIntegrationDetails(modelIdx) {
  const vehicle = vehicles[modelIdx] || vehicles[0];
  const nodes = {
    one: document.getElementById('integration1'),
    three: document.getElementById('integration3'),
    six: document.getElementById('integration6')
  };
  if (!vehicle) return;
  const reserva1 = getReservationValue('reservation1', vehicle.reservations['1']);
  const reserva3 = getReservationValue('reservation3', vehicle.reservations['3']);
  const reserva6 = getReservationValue('reservation6', vehicle.reservations['6']);
  if (nodes.one) nodes.one.textContent = `Cuota 1 · Reserva / Integración: ${currency.format(reserva1 || 0)}`;
  if (nodes.three) nodes.three.textContent = `3 cuotas "sin interés" de: ${currency.format((reserva3 || 0) / 3 || 0)} cada una`;
  if (nodes.six) nodes.six.textContent = `6 cuotas "sin interés" de: ${currency.format((reserva6 || 0) / 6 || 0)} cada una`;
}

function resolveTotalInstallments(planType, vehiclePlanProfileType) {
  const byVehicle = planTerms[vehiclePlanProfileType];
  if (byVehicle) return byVehicle;
  return planTerms[planType] || 120;
}


function resolvePlanScheme(vehicle) {
  const profile = vehicle?.planProfile || {};
  if (Number.isFinite(profile.financedPct) || Number.isFinite(profile.integrationPct)) {
    const financedPct = Number.isFinite(profile.financedPct) ? profile.financedPct : Math.max(0, 1 - (profile.integrationPct || 0));
    const integrationPct = Number.isFinite(profile.integrationPct) ? profile.integrationPct : Math.max(0, 1 - financedPct);
    return { financedPct, integrationPct, label: profile.label || 'Plan personalizado' };
  }

  const basePrice = Number(vehicle?.basePrice || 0);
  const integrationValue = Number(vehicle?.integration || 0);
  if (basePrice > 0 && integrationValue > 0) {
    const integrationPct = Math.min(Math.max(integrationValue / basePrice, 0), 1);
    const financedPct = Math.max(1 - integrationPct, 0);
    return { financedPct, integrationPct, label: profile.label || 'Plan personalizado' };
  }

  const label = (profile.label || '').toLowerCase();
  const numericMatch = label.match(/(\d{2})\s*\/\s*(\d{2})/);
  if (numericMatch) {
    const financedPct = Number(numericMatch[1]) / 100;
    const integrationPct = Number(numericMatch[2]) / 100;
    if (financedPct + integrationPct === 1) {
      return { financedPct, integrationPct, label: profile.label || 'Plan personalizado' };
    }
  }
  if (label.includes('100')) return { financedPct: 1, integrationPct: 0, label: profile.label || '100% fábrica' };
  if (label.includes('80')) return { financedPct: 0.8, integrationPct: 0.2, label: profile.label || '80/20' };
  if (label.includes('70')) return { financedPct: 0.7, integrationPct: 0.3, label: profile.label || '70/30' };
  if (label.includes('60')) return { financedPct: 0.6, integrationPct: 0.4, label: profile.label || '60/40' };
  return { financedPct: 1, integrationPct: 0, label: profile.label || '100% fábrica' };
}

function resolveVehiclePrice(vehicle, customPrice) {
  if (customPrice > 0) return customPrice;
  if (vehicle?.basePrice) return vehicle.basePrice;
  return vehicle?.integration || 0;
}

function resolveCuotaPura(financedAmount, totalInstallments, vehicle, customPrice, planType) {
  if (!totalInstallments) return 0;
  if (planType === 'ctapura' && vehicle?.shareByPlan?.ctapura) return vehicle.shareByPlan.ctapura;
  if (vehicle?.shareByPlan?.[planType]) return vehicle.shareByPlan[planType];
  if (vehicle?.cuotaPura) return vehicle.cuotaPura;
  return financedAmount / totalInstallments;
}

function resolveUpgradeInstallments(planType, totalInstallments, scheme) {
  const isHundredPercent = Math.round((scheme?.financedPct || 0) * 100) === 100;
  const key = totalInstallments === 120 && isHundredPercent ? '120_100' : planType;
  return upgradeInstallmentsByPlan[key] || totalInstallments;
}


function buildCoverageSegments(totalInstallments, cuotaPura, contributions = [], outstanding = 0, { advancePayments = false } = {}) {
  if (!totalInstallments || !cuotaPura) {
    return {
      segments: [],
      coveredInstallments: 0,
      partialCover: 0,
      kickoffInstallment: PLAN_START_INSTALLMENT,
      startInstallment: PLAN_START_INSTALLMENT,
      remainingInstallments: totalInstallments
    };
  }

  let pointer = PLAN_START_INSTALLMENT;
  let coveredInstallments = 0;
  let partialCover = 0;
  const segments = [];

  contributions.forEach(contrib => {
    if (!contrib || !contrib.amount) return;
    const amount = Number(contrib.amount) || 0;
    if (!amount) return;

    const fullCovers = Math.floor(amount / cuotaPura);
    const remainder = amount - fullCovers * cuotaPura;

    if (fullCovers > 0 && pointer <= totalInstallments) {
      const from = Math.max(pointer, PLAN_START_INSTALLMENT);
      const to = Math.min(from + fullCovers - 1, totalInstallments);
      const appliedCovers = Math.max(to - from + 1, 0);

      if (appliedCovers > 0) {
        segments.push({
          type: contrib.type,
          label: contrib.label,
          from,
          to,
          covered: appliedCovers,
          partial: 0,
          amount
        });
        coveredInstallments += appliedCovers;
        pointer = to + 1;
      }
    }

    if (remainder > 0 && pointer <= totalInstallments) {
      partialCover = Math.max(partialCover, remainder);
      const slot = Math.max(pointer, PLAN_START_INSTALLMENT);
      segments.push({
        type: contrib.type,
        label: `${contrib.label} (parcial)`,
        from: slot,
        to: slot,
        covered: 0,
        partial: remainder,
        amount: remainder
      });
      pointer = slot + 1;
    }
  });

  let remainingInstallments;
  if (outstanding && outstanding > 0) {
    remainingInstallments = Math.min(
      Math.ceil(outstanding / cuotaPura),
      Math.max(totalInstallments - (pointer - 1), 0)
    );
  } else {
    remainingInstallments = Math.max(totalInstallments - (pointer - 1), 0);
  }

  const startInstallment = Math.min(
    Math.max(pointer, PLAN_START_INSTALLMENT),
    totalInstallments + 1
  );

  return {
    segments,
    coveredInstallments,
    partialCover,
    kickoffInstallment: startInstallment,
    startInstallment,
    remainingInstallments
  };
}


function rangeKeyForInstallment(i, totalInstallments) {
  if (i <= 12) return '2a12';
  if (i <= 21) return '13a21';
  if (totalInstallments <= 84) return '22a84';
  if (i <= 84) return '22a84';
  return '85a120';
}

function buildInstallmentSchedule({
  vehicle,
  priceRatio,
  totalInstallments,
  coverageSegments = [],
  cuotaPura,
  planType,
  upgradeDelta = 0,
  upgradeInstallments = 0
}) {
  const amountsByRange = {};
  const coverageMap = {};
  coverageSegments.forEach(seg => {
    for (let i = seg.from; i <= seg.to; i++) {
      coverageMap[i] = { ...seg };
    }
    if (seg.partial) {
      coverageMap[seg.from] = { ...seg, partial: seg.partial };
    }
  });

  const entries = [];
  for (let i = PLAN_START_INSTALLMENT; i <= totalInstallments; i++) {
    const rangeKey = rangeKeyForInstallment(i, totalInstallments);
    const baseAmount = vehicle?.shareByPlan?.[rangeKey]
      ?? vehicle?.shareByPlan?.[planType]
      ?? vehicle?.cuotaPura
      ?? cuotaPura
      ?? 0;
    const upgradeApplied = upgradeDelta && i < (PLAN_START_INSTALLMENT + (upgradeInstallments || 0)) ? upgradeDelta : 0;
    const amount = Math.round((baseAmount * (priceRatio || 1)) + upgradeApplied);
    const coverage = coverageMap[i];
    const payable = coverage
      ? Math.max(amount - (coverage.partial || amount), 0)
      : amount;
    amountsByRange[rangeKey] = amount;
    entries.push({
      installment: i,
      amount,
      payable,
      coverage
    });
  }

  const payableEntries = entries.filter(e => e.payable > 0);
  const remainingInstallments = payableEntries.length;
  const outstanding = payableEntries.reduce((sum, e) => sum + e.payable, 0);
  const kickoffInstallment = payableEntries[0]?.installment || PLAN_START_INSTALLMENT;
  const nextInstallmentAmount = payableEntries[0]?.amount || 0;

  return { entries, remainingInstallments, outstanding, kickoffInstallment, nextInstallmentAmount, amountsByRange };
}

function computePaymentProjection({ vehicle, planType, tradeInValue = 0, tradeInEnabled = false, reservations = {}, appliedReservation = '1', customPrice = 0, advancePayments = false, advanceAmount = 0, versionSelection = 'base', versionUpgrade = 0 }) {
  const scheme = resolvePlanScheme(vehicle);
  const planProfileType = vehicle?.planProfile?.planType || planType;
  const totalInstallments = resolveTotalInstallments(planType, planProfileType);
  const basePrice = resolveVehiclePrice(vehicle, 0);
  const price = resolveVehiclePrice(vehicle, customPrice);
  const priceRatio = basePrice ? price / basePrice : 1;
  const upgradeAmount = versionSelection === 'base' ? 0 : Math.max(versionUpgrade, 0);
  const upgradeInstallments = resolveUpgradeInstallments(planProfileType, totalInstallments, scheme);
  const financedAmount = (price * scheme.financedPct) + upgradeAmount;
  const baseFinancedAmount = basePrice * scheme.financedPct;
  const integrationTarget = price * scheme.integrationPct;
  const baseCuotaPura = resolveCuotaPura(baseFinancedAmount, totalInstallments, vehicle, 0, planProfileType);
  const cuotaPura = resolveCuotaPura(financedAmount, totalInstallments, vehicle, customPrice, planProfileType);
  const baseCatalogCuota = vehicle?.cuotaPura || baseCuotaPura;
  const upgradeDelta = upgradeInstallments ? upgradeAmount / upgradeInstallments : 0;

  const normalizedReservation = ['1', '3', '6'].includes(String(appliedReservation)) ? String(appliedReservation) : '1';
  const selectedReservation = reservations[normalizedReservation] || 0;
  const reservationMeta = { total: selectedReservation, mode: normalizedReservation };

  const tradeInAmount = tradeInEnabled ? Math.max(tradeInValue, 0) : 0;
  const integrationCovered = Math.min(tradeInAmount, integrationTarget);
  const contributionToPlan = Math.max(tradeInAmount - integrationCovered, 0);

  const contributions = contributionToPlan > 0
    ? [{ type: 'tradeIn', label: 'Toma de usado', amount: contributionToPlan }]
    : [];

  const outstandingBeforeAdvance = Math.max(financedAmount - contributionToPlan, 0);
  const additionalAdvance = advancePayments ? Math.max(advanceAmount, 0) : 0;
  if (additionalAdvance > 0) {
    contributions.push({ type: 'advance', label: 'Adelanto de cuotas', amount: additionalAdvance });
  }

  const outstanding = Math.max(outstandingBeforeAdvance - additionalAdvance, 0);
  const coverage = buildCoverageSegments(totalInstallments, baseCatalogCuota, contributions, outstanding, { advancePayments });
  const schedule = buildInstallmentSchedule({
    vehicle,
    priceRatio,
    totalInstallments,
    coverageSegments: coverage.segments,
    cuotaPura: baseCatalogCuota,
    planType,
    upgradeDelta,
    upgradeInstallments
  });
  const cuotaAjustada = schedule.nextInstallmentAmount || (baseCatalogCuota + upgradeDelta);
  const remainingInstallments = coverage.remainingInstallments || schedule.remainingInstallments;
  const kickoffInstallment = coverage.kickoffInstallment ?? schedule.kickoffInstallment;

  return {
    basePrice,
    price,
    priceRatio,
    baseFinancedAmount,
    cuotaPura: baseCatalogCuota,
    baseCuotaPura,
    baseCatalogCuota,
    cuotaAjustada,
    upgradeDelta,
    upgradeInstallments,
    versionSelection,
    versionUpgrade: upgradeAmount,
    totalInstallments,
    financedAmount,
    integrationTarget,
    integrationCovered,
    integrationRemaining: Math.max(integrationTarget - integrationCovered, 0),
    selectedReservation,
    reservationMeta,
    aporteInicial: contributionToPlan,
    outstanding,
    outstandingBeforeAdvance,
    coveredInstallments: coverage.coveredInstallments,
    partialCover: coverage.partialCover,
    remainingInstallments,
    kickoffInstallment,
    startInstallment: coverage.startInstallment,
    coverageSegments: coverage.segments,
    installmentSchedule: schedule.entries,
    rangeAmounts: schedule.amountsByRange,
    scheme,
    advancePayments,
    advanceAmountApplied: additionalAdvance
  };
}

function updatePlanSummary() {
  ensurePlansUseLatestPrices();
  const modelIdx = Number(document.getElementById('planModel').value || 0);
  const v = vehicles[modelIdx] || vehicles[0];
  const plan = getPlanTypeForVehicle(v);
  const planInput = document.getElementById('planType');
  if (planInput) planInput.value = plan;
  const tradeIn = document.getElementById('tradeIn').checked;
  const tradeInInput = document.getElementById('tradeInValue');
  const tradeInValue = parseMoney(tradeInInput?.dataset.raw || tradeInInput?.value || 0);
  const advancePayments = document.getElementById('advancePayments')?.checked;
  const advanceAmountInput = document.getElementById('advanceAmount');
  const advanceAmount = advancePayments ? parseMoney(advanceAmountInput?.dataset.raw || advanceAmountInput?.value || 0) : 0;
  const customPriceInput = document.getElementById('customPrice');
  const customPrice = parseMoney(customPriceInput?.dataset.raw || customPriceInput?.value || 0);
  const versionSelection = document.getElementById('versionSelect')?.value || 'base';
  const versionUpgradeInput = document.getElementById('versionUpgrade');
  const rawUpgrade = parseMoney(versionUpgradeInput?.dataset.raw || versionUpgradeInput?.value || 0);
  const versionUpgrade = versionSelection === 'base' ? 0 : rawUpgrade;
  if (versionSelection === 'base' && versionUpgradeInput) {
    setMoneyValue(versionUpgradeInput, 0);
    versionUpgradeInput.dataset.manual = '';
  }
  const appliedReservation = '1';
  const appliedReservationInput = document.getElementById('appliedReservation');
  if (appliedReservationInput) appliedReservationInput.value = appliedReservation;
  if (!v) return;
  const reserva1 = getReservationValue('reservation1', v.reservations['1']);
  const reserva3 = getReservationValue('reservation3', v.reservations['3']);
  const reserva6 = getReservationValue('reservation6', v.reservations['6']);
  const reservations = { '1': reserva1, '3': reserva3, '6': reserva6 };
  const projection = computePaymentProjection({
    vehicle: v,
    planType: plan,
    tradeInValue,
    tradeInEnabled: tradeIn,
    reservations,
    appliedReservation,
    customPrice,
    advancePayments,
    advanceAmount,
    versionSelection,
    versionUpgrade
  });
  const cuotaBase = plan === 'ctapura'
    ? (projection.baseCatalogCuota || v.cuotaPura)
    : (projection.rangeAmounts?.[plan] ?? v.shareByPlan[plan] ?? projection.baseCatalogCuota);
  const cuota = projection.cuotaAjustada;
  const tradeInFormatted = tradeInValue ? currency.format(tradeInValue) : 'a definir';
  const cuota3 = reserva3 ? currency.format(reserva3 / 3) : currency.format(0);
  const cuota6 = reserva6 ? currency.format(reserva6 / 6) : currency.format(0);
  const formatAdjustedValue = (original, adjusted, showAdjust) => {
    if (!showAdjust || original === adjusted) return currency.format(adjusted || original || 0);
    const originalTag = `<span class="muted strike">${currency.format(original || 0)}</span>`;
    return `${originalTag} ${currency.format(adjusted || 0)}`;
  };
  const showCustomPrice = customPrice > 0 && projection.basePrice && customPrice !== projection.basePrice;
  const showCuotaAdjustment = showCustomPrice || (tradeIn && projection.aporteInicial > 0) || (projection.priceRatio && projection.priceRatio !== 1) || (versionUpgrade > 0);
  const scheme = projection.scheme || v.planProfile || {};
  const coverageSegments = (projection.coverageSegments || []).map(seg => ({
    ...seg,
    from: Math.min(seg.from, seg.to),
    to: Math.max(seg.from, seg.to)
  })).sort((a, b) => a.from - b.from);
  const renderRows = (el, rows) => {
    if (!el) return;
    el.innerHTML = rows.map(r => `
      <div class="folio-row">
        <div>
          <span>${r.label}</span>
          ${r.helper ? `<em>${r.helper}</em>` : ''}
        </div>
        <strong>${r.value}</strong>
      </div>
    `).join('');
  };

  const basics = document.getElementById('planBasicsList');
  renderRows(basics, [
    { label: '0Km a adquirir', value: v.name || 'Seleccionar modelo' },
    { label: 'Precio nominal del coche', value: formatAdjustedValue(projection.basePrice, projection.price, showCustomPrice), helper: showCustomPrice ? 'Precio ajustado para la cotización' : 'Valor de catálogo' },
    { label: 'Tipo de plan', value: v.planProfile?.label ? `${v.planProfile.label} · ${planLabel(plan)}` : planLabel(plan), helper: scheme.label },
    { label: 'Versión seleccionada', value: versionSelection === 'base' ? 'Versión base' : 'Versión mejorada', helper: versionSelection === 'base' ? 'Sin upgrade aplicado' : `Se financian ${currency.format(versionUpgrade || 0)} adicionales` },
    { label: 'Cantidad de cuotas totales del plan', value: projection.totalInstallments || 0 },
    { label: '¿Utiliza llave x llave?', value: tradeIn ? 'Sí' : 'No' },
    { label: 'Valor cotizado por llave x llave', value: tradeIn ? tradeInFormatted : 'Sin usado aplicado' },
    { label: 'Cuota pura del catálogo', value: formatAdjustedValue(projection.baseCatalogCuota, projection.cuotaPura, showCuotaAdjustment) }
  ]);

  const integrationSummary = document.getElementById('planIntegrationSummary');
  renderRows(integrationSummary, [
    { label: 'Cuota 1 (Reserva)', value: currency.format(projection.selectedReservation || 0), helper: 'Cuota Obligatoria para acceder al plan. Cubre la Cuota 1' },
    { label: 'En 1 pago', value: currency.format(reserva1 || 0), helper: 'Pago único de integración.' },
    { label: 'En 3 pagos sin interés', value: `${cuota3} c/u`, helper: `Total: ${currency.format(reserva3 || 0)}` },
    { label: 'En 6 pagos sin interés', value: `${cuota6} c/u`, helper: `Total: ${currency.format(reserva6 || 0)}` },
    { label: 'Aporte llave x llave', value: tradeIn ? currency.format(projection.integrationCovered || 0) : 'No aplica', helper: tradeIn ? `Req. para integración al plan ${currency.format(projection.integrationTarget)} · Restan ${currency.format(projection.integrationRemaining)}` : 'Sin usado aplicado' }
  ]);

  const balanceSummary = document.getElementById('planBalanceSummary');
  const remainingInstallments = Math.max(projection.remainingInstallments, 0);
  renderRows(balanceSummary, [
    { label: 'Saldo restante a abonar', value: currency.format(projection.outstanding || 0) },
    { label: 'Cuota estimada del plan', value: formatAdjustedValue(cuotaBase, cuota, showCuotaAdjustment), helper: 'Valor mensual considerando precio y usado aplicado.' },
    { label: 'Cuotas restantes a pagar', value: `${remainingInstallments} cuotas`, helper: advancePayments ? 'Se descuentan desde las últimas cuotas' : `Se pagan desde la cuota ${projection.kickoffInstallment || PLAN_START_INSTALLMENT}` },
    { label: 'Adelantamiento de cuotas', value: advancePayments ? 'Sí, cancela desde el final' : 'No, cronología normal' },
    { label: 'Aporte al plan con usado', value: tradeIn ? currency.format(projection.aporteInicial) : 'Sin usado aplicado', helper: tradeIn ? 'Se resta del saldo del plan.' : 'Aplicar cuando tengas el valor del usado.' },
    { label: 'Monto para adelantar cuotas', value: advancePayments && advanceAmount ? currency.format(advanceAmount) : 'Sin adelantos cargados', helper: advancePayments ? 'Se usa la cuota pura para descontar las últimas cuotas.' : 'Activa adelantos para usar un monto adicional.' }
  ]);

  const rangeLimits = {
    '2a12': { from: 2, to: 12 },
    '13a21': { from: 13, to: 21 },
    '22a84': { from: 22, to: 84 },
    '85a120': { from: 85, to: 120 },
    'ctapura': { from: PLAN_START_INSTALLMENT, to: projection.totalInstallments || 120 }
  };
  const rangeOrder = ['2a12', '13a21', '22a84', '85a120', 'ctapura'];
  const describeCoverage = (from, to) => {
    const notes = coverageSegments.filter(seg => {
      const overlapFrom = Math.max(from, seg.from);
      const overlapTo = Math.min(to, seg.to);
      return overlapFrom <= overlapTo;
    }).map(seg => {
      const overlapFrom = Math.max(from, seg.from);
      const overlapTo = Math.min(to, seg.to);
      const span = overlapFrom === overlapTo ? `cuota ${overlapFrom}` : `cuotas ${overlapFrom}-${overlapTo}`;
      return `${seg.label} • ${span}`;
    });
    if (notes.length) return notes.join(' • ');
    return advancePayments ? 'Pendiente (se descuenta desde el final)' : 'Pendiente de pago';
  };
  const rangeList = document.getElementById('planRangeList');
  if (rangeList) {
    rangeList.innerHTML = rangeOrder.filter(key => v.shareByPlan?.[key] || key === plan || key === 'ctapura').map(key => {
      const limits = rangeLimits[key];
      const label = planLabel(key);
      const baseAmount = key === 'ctapura'
        ? (projection.baseCatalogCuota || v.shareByPlan?.ctapura || projection.baseCatalogCuota)
        : (projection.rangeAmounts?.[key] ?? v.shareByPlan?.[key] ?? cuotaBase);
      const amount = key === plan ? projection.cuotaAjustada || baseAmount : baseAmount;
      const status = limits ? describeCoverage(limits.from, limits.to) : 'Pendiente de pago';
      return `
        <div class="range-card" data-active="${plan === key}">
          <h5>${label}</h5>
          <div class="amount">${currency.format(amount || 0)}</div>
          <div class="status">${status}</div>
        </div>
      `;
    }).join('');
  }

  const coverageList = document.getElementById('planCoverageList');
  if (coverageList) {
    const cards = coverageSegments.map(seg => {
      const title = seg.from === seg.to ? `Cuota ${seg.from}` : `Cuotas ${seg.from}-${seg.to}`;
      const coverageLabel = seg.covered ? `${seg.covered} cuotas cubiertas` : 'Cobertura parcial';
      const partialLabel = seg.partial ? ` · Parcial: ${currency.format(seg.partial)}` : '';
      return `
        <div class="coverage-card">
          <div class="coverage-chip" data-type="${seg.type}">${seg.label}</div>
          <h5>${title}</h5>
          <p class="muted tiny">${coverageLabel}${partialLabel}</p>
          <strong>${currency.format(seg.amount || 0)}</strong>
        </div>
      `;
    });
    cards.push(`
      <div class="coverage-card">
        <div class="coverage-chip" data-type="outstanding">Saldo pendiente</div>
        <h5>Finalización del plan</h5>
        <p class="muted tiny">${remainingInstallments} cuotas restantes · ${advancePayments ? 'Se cancelan desde la última hacia atrás' : 'Se pagan desde la primera cuota pendiente'}</p>
        <strong>${currency.format(projection.outstanding || 0)}</strong>
      </div>
    `);
    coverageList.innerHTML = cards.join('');
  }
  lastPlanProjection = { ...projection, vehicleName: v.name, monthLabel: getMostRecentPriceTab()?.label || getMostRecentPriceTab()?.month || 'Mes activo' };
  savePlanDraft();
}

function renderInstallmentBreakdown() {
  const modal = document.getElementById('installmentModal');
  const list = document.getElementById('installmentList');
  const summary = document.getElementById('installmentSummary');
  if (!modal || !list || !summary) return;
  if (!lastPlanProjection) {
    showToast('Primero genera la cotización con los valores actuales.', 'error');
    return;
  }
  const projection = lastPlanProjection;
  const cuotaPura = projection.baseCatalogCuota || projection.cuotaPura || 0;
  const total = projection.totalInstallments || 0;
  const coverageSegments = projection.coverageSegments || [];
  const schedule = (projection.installmentSchedule && projection.installmentSchedule.length)
    ? projection.installmentSchedule
    : Array.from({ length: Math.max(total - PLAN_START_INSTALLMENT + 1, 0) }, (_, idx) => ({
      installment: PLAN_START_INSTALLMENT + idx,
      amount: projection.cuotaAjustada || cuotaPura,
      coverage: null
    }));
  const map = {};
  coverageSegments.forEach(seg => {
    for (let i = seg.from; i <= seg.to; i++) {
      map[i] = seg;
    }
    if (seg.partial && !map[seg.from]) map[seg.from] = seg;
  });
  const cards = [];
  [...schedule].reverse().forEach(entry => {
    const seg = entry.coverage || map[entry.installment];
    let title = `Cuota ${entry.installment}`;
    let note = 'Pendiente de pago.';
    let chip = 'pendiente';
    let chipLabel = 'Pendiente';
    if (seg) {
      chip = seg.type || 'pendiente';
      chipLabel = seg.label || 'Cobertura aplicada';
      if (seg.partial) {
        note = `Parcialmente cubierta con "${seg.label}" (${currency.format(seg.partial)})`;
      } else {
        note = `Pagada con "${seg.label}"`;
      }
    }
    if (chip === 'advance') {
      title += ` (Pagado con cuota pura: ${currency.format(cuotaPura)})`;
      note = `Pagada con adelanto usando cuota pura de ${currency.format(cuotaPura)}.`;
    }
    if (chip === 'tradeIn') {
      note = `Pagada con llave x llave a cuota pura de ${currency.format(cuotaPura)}.`;
    }
    cards.push(`
      <div class="coverage-card" data-state="${chip}">
        <div class="coverage-chip" data-type="${chip}">${chipLabel}</div>
        <h5>${title}</h5>
        <p class="muted tiny">${note}</p>
        <strong>${currency.format(entry.amount || cuotaPura)}</strong>
      </div>
    `);
  });
  cards.push(`
    <div class="coverage-card" data-state="reservation">
      <div class="coverage-chip" data-type="reservation">Reserva</div>
      <h5>Cuota 1</h5>
      <p class="muted tiny">OBLIGATORIA · Usa reserva elegida por cliente</p>
      <strong>${currency.format(projection.selectedReservation || projection.reservationMeta?.total || 0)}</strong>
    </div>
  `);
  summary.innerHTML = `
    <div class="folio-row">
      <div>
        <span>Desglose de cuotas</span>
        <em>${projection.vehicleName || 'Modelo'} · ${projection.monthLabel || 'Mes vigente'} · Ordenado desde la última cuota</em>
      </div>
      <strong>${projection.remainingInstallments || 0} cuotas restantes</strong>
    </div>
    <div class="folio-row">
      <div>
        <span>Cuota pura aplicada</span>
        <em>Se usa para adelantos y coberturas</em>
      </div>
      <strong>${currency.format(cuotaPura)}</strong>
    </div>
    <div class="folio-row">
      <div>
        <span>Adelantos informados</span>
        <em>Se descuenta desde las últimas cuotas</em>
      </div>
      <strong>${projection.advancePayments && projection.advanceAmountApplied ? currency.format(projection.advanceAmountApplied) : 'Sin adelantos'}</strong>
    </div>
  `;
  list.innerHTML = cards.join('');
  modal.classList.remove('hidden');
  requestAnimationFrame(() => modal.classList.add('show'));
}

function closeInstallmentModal() {
  const modal = document.getElementById('installmentModal');
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 180);
}

function buildQuoteFromForm() {
  const modelIdx = Number(document.getElementById('planModel').value || 0);
  const v = vehicles[modelIdx] || vehicles[0];
  const plan = getPlanTypeForVehicle(v);
  const tradeIn = document.getElementById('tradeIn').checked;
  const tradeInInput = document.getElementById('tradeInValue');
  const tradeInValue = parseMoney(tradeInInput?.dataset.raw || tradeInInput?.value || 0);
  const advancePayments = document.getElementById('advancePayments')?.checked;
  const advanceAmountInput = document.getElementById('advanceAmount');
  const advanceAmount = advancePayments ? parseMoney(advanceAmountInput?.dataset.raw || advanceAmountInput?.value || 0) : 0;
  const customPriceInput = document.getElementById('customPrice');
  const customPrice = parseMoney(customPriceInput?.dataset.raw || customPriceInput?.value || 0);
  const versionSelection = document.getElementById('versionSelect')?.value || 'base';
  const versionUpgradeInput = document.getElementById('versionUpgrade');
  const versionUpgrade = versionSelection === 'base'
    ? 0
    : parseMoney(versionUpgradeInput?.dataset.raw || versionUpgradeInput?.value || 0);
  const appliedReservation = '1';
  const notes = document.getElementById('notes').value.trim();
  const reservation1 = getReservationValue('reservation1', v.reservations['1']);
  const reservation3 = getReservationValue('reservation3', v.reservations['3']);
  const reservation6 = getReservationValue('reservation6', v.reservations['6']);
  const reservations = { '1': reservation1, '3': reservation3, '6': reservation6 };
  const projection = computePaymentProjection({
    vehicle: v,
    planType: plan,
    tradeInValue,
    tradeInEnabled: tradeIn,
    reservations,
    appliedReservation,
    customPrice,
    advancePayments,
    advanceAmount,
    versionSelection,
    versionUpgrade
  });
  const cuotaBase = plan === 'ctapura' ? projection.baseCatalogCuota : (v.shareByPlan[plan] ?? projection.baseCatalogCuota);
  const cuota = projection.cuotaAjustada;
  const name = document.getElementById('clientName').value.trim() || 'Cotización sin nombre';
  const baseQuote = clients.find(c => c.selectedClientId === selectedPlanClientId && c.model === v.name && c.name === name) || {};
  const quote = {
    id: baseQuote.id || `quote-${Date.now()}`,
    name,
    model: v.name,
    plan,
    cuota,
    tradeIn,
    tradeInValue,
    notes,
    reservation1,
    reservation3,
    reservation6,
    integration: v.integration,
    customPrice: projection.price,
    cuotaPura: projection.cuotaPura,
    totalInstallments: projection.totalInstallments,
    appliedReservation,
    versionSelection,
    versionUpgrade,
    outstanding: projection.outstanding,
    remainingInstallments: projection.remainingInstallments,
    kickoffInstallment: projection.kickoffInstallment,
    aporteInicial: projection.aporteInicial,
    financedAmount: projection.financedAmount,
    integrationTarget: projection.integrationTarget,
    integrationCovered: projection.integrationCovered,
    integrationRemaining: projection.integrationRemaining,
    schemeLabel: projection.scheme?.label || v.planProfile?.label || 'Plan',
    selectedReservation: projection.selectedReservation,
    reservationMode: appliedReservation,
    planProfileLabel: v.planProfile?.label || 'Personalizar',
    basePrice: projection.basePrice,
    priceApplied: projection.price,
    baseCuotaPura: projection.baseCatalogCuota,
    cuotaBase: plan === 'ctapura' ? projection.baseCatalogCuota : (v.shareByPlan[plan] ?? projection.baseCatalogCuota),
    cuotaAjustada: projection.cuotaAjustada,
    priceRatio: projection.priceRatio,
    startInstallment: projection.startInstallment,
    advancePayments,
    advanceAmount,
    timestamp: new Date().toISOString(),
    selectedClientId: selectedPlanClientId,
    summaryText: ''
  };
  quote.summaryText = buildQuoteSummaryText(quote);
  return quote;
}

function buildQuoteSummaryText(quote) {
  const cuota3 = quote.reservation3 ? currency.format(quote.reservation3 / 3) : currency.format(0);
  const cuota6 = quote.reservation6 ? currency.format(quote.reservation6 / 6) : currency.format(0);
  const reservaDetalle = quote.selectedReservation
    ? `${currency.format(quote.selectedReservation)} en cuota 1 (reserva informativa / integración, gasto adicional)`
    : 'Reserva pendiente (gasto adicional)';
  const hasCustomPrice = quote.priceApplied && quote.basePrice && quote.priceApplied !== quote.basePrice;
  const hasTradeInAjuste = quote.tradeIn && quote.aporteInicial > 0;
  const hasCuotaAdjust = hasCustomPrice || hasTradeInAjuste || (quote.cuotaPura && quote.baseCuotaPura && quote.cuotaPura !== quote.baseCuotaPura);
  const cuotaPuraDetalle = hasCuotaAdjust
    ? `${currency.format(quote.baseCuotaPura || 0)} → ${currency.format(quote.cuotaPura || 0)}`
    : (quote.cuotaPura ? currency.format(quote.cuotaPura) : 'Completar manual');
  const cuotaTramoDetalle = hasCuotaAdjust
    ? `${currency.format(quote.cuotaBase || 0)} → ${currency.format(quote.cuotaAjustada || 0)}`
    : (quote.cuota ? currency.format(quote.cuota) : 'Completar manual');
  const parts = [
    `Cotización para: ${quote.name}`,
    `Modelo elegido: ${quote.model}`,
    `Versión elegida: ${quote.versionSelection === 'base' ? 'Versión base' : 'Versión mejorada'}`,
    `Precio base catálogo: ${currency.format(quote.basePrice || 0)}`,
    hasCustomPrice ? `Precio aplicado: ${currency.format(quote.priceApplied || 0)} (ajustado)` : `Precio aplicado: ${currency.format(quote.priceApplied || 0)}`,
    `Esquema del plan: ${quote.schemeLabel || quote.planProfileLabel || 'Plan'} · Financia ${currency.format(quote.financedAmount || 0)} · Integra ${currency.format(quote.integrationTarget || 0)}`,
    `Plan establecido: ${planLabel(quote.plan)} (${quote.planProfileLabel || 'Personalizar'})`,
    `Cuota pura estimada: ${cuotaPuraDetalle}`,
    `Cuota estimada: ${cuotaTramoDetalle}`,
    `Reservas: 1 cuota ${currency.format(quote.reservation1 || 0)} · 3 cuotas ${currency.format(quote.reservation3 || 0)} (3 de ${cuota3}) · 6 cuotas ${currency.format(quote.reservation6 || 0)} (6 de ${cuota6})`,
    `Reserva informada: ${reservaDetalle}`,
    `Integración objetivo: ${currency.format(quote.integrationTarget || 0)} (pendiente ${currency.format(quote.integrationRemaining || 0)})`,
    `Entrega llave por llave: ${quote.tradeIn ? `Sí (toma usado por ${currency.format(quote.tradeInValue || 0)})` : 'No'}`,
    `Aporte al plan con usado: ${currency.format(quote.aporteInicial || 0)}`,
    `Saldo financiado pendiente: ${currency.format(quote.outstanding || 0)}`,
    `Cuotas restantes: ${quote.remainingInstallments || 0} (se pagan desde la cuota ${quote.startInstallment || quote.kickoffInstallment || PLAN_START_INSTALLMENT})`,
    `Adelanta cuotas: ${quote.advancePayments ? 'Sí, cancelando desde las últimas' : 'No, sigue el calendario estándar'}`,
    quote.advancePayments ? `Monto adelantado: ${currency.format(quote.advanceAmount || 0)} (usa cuota pura de ${currency.format(quote.baseCuotaPura || 0)})` : 'Monto adelantado: Sin aplicar',
    `Notas: ${quote.notes || 'Sin notas'}`,
    `Fecha: ${new Date(quote.timestamp).toLocaleString('es-AR')}`
  ];
  return parts.join('\n');
}

function applyQuoteToForm(quote) {
  if (!quote) return;
  selectedPlanClientId = quote.selectedClientId || null;
  document.getElementById('clientName').value = quote.name || '';
  const modelIdx = vehicles.findIndex(v => (v.name || '').toLowerCase() === (quote.model || '').toLowerCase());
  document.getElementById('planModel').value = modelIdx >= 0 ? modelIdx : 0;
  applyPlanDefaultsForModel(Number(document.getElementById('planModel').value || 0), { preserveExisting: false, resetManual: true });
  applyReservationDefaultsForModel(Number(document.getElementById('planModel').value || 0), { resetManual: true });
  setMoneyValue(document.getElementById('customPrice'), quote.customPrice || '');
  if (parseMoney(quote.customPrice)) document.getElementById('customPrice').dataset.manual = 'true';
  document.getElementById('appliedReservation').value = '1';
  document.getElementById('tradeIn').checked = !!quote.tradeIn;
  const advanceToggle = document.getElementById('advancePayments');
  if (advanceToggle) advanceToggle.checked = !!quote.advancePayments;
  setMoneyValue(document.getElementById('advanceAmount'), quote.advanceAmount || '');
  setMoneyValue(document.getElementById('tradeInValue'), quote.tradeInValue || '');
  setMoneyValue(document.getElementById('reservation1'), quote.reservation1 || '');
  setMoneyValue(document.getElementById('reservation3'), quote.reservation3 || '');
  setMoneyValue(document.getElementById('reservation6'), quote.reservation6 || '');
  document.getElementById('notes').value = quote.notes || '';
  refreshClientSelectionHint();
  toggleAdvanceAmountField();
  updateIntegrationDetails(Number(document.getElementById('planModel').value || 0));
  updatePlanSummary();
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
  const planTypeSelect = document.getElementById('planType');
  if (planTypeSelect) planTypeSelect.value = getPlanTypeForVehicle(vehicles[Number(document.getElementById('planModel').value) || 0]);
  document.getElementById('tradeIn').checked = draft.tradeIn !== undefined ? draft.tradeIn : true;
  const advanceToggle = document.getElementById('advancePayments');
  if (advanceToggle) advanceToggle.checked = draft.advancePayments || false;
  const advanceAmountInput = document.getElementById('advanceAmount');
  setMoneyValue(advanceAmountInput, draft.advanceAmount || '');
  const customPriceInput = document.getElementById('customPrice');
  setMoneyValue(customPriceInput, draft.customPrice || '');
  if (parseMoney(draft.customPrice)) customPriceInput.dataset.manual = 'true';
  const versionSelect = document.getElementById('versionSelect');
  if (versionSelect) versionSelect.value = draft.versionSelection || 'base';
  const versionUpgradeInput = document.getElementById('versionUpgrade');
  if (versionUpgradeInput) {
    setMoneyValue(versionUpgradeInput, draft.versionUpgrade || 0);
    if (parseMoney(draft.versionUpgrade)) versionUpgradeInput.dataset.manual = 'true';
  }
  document.getElementById('appliedReservation').value = ['1', '3', '6'].includes(draft.appliedReservation) ? draft.appliedReservation : '1';
  setMoneyValue(document.getElementById('tradeInValue'), draft.tradeInValue || '');
  document.getElementById('clientName').value = draft.clientName || '';
  document.getElementById('notes').value = draft.notes || '';
  selectedPlanClientId = draft.selectedClientId || null;
  ['reservation1', 'reservation3', 'reservation6'].forEach(key => {
    const el = document.getElementById(key);
    if (el) {
      setMoneyValue(el, draft[key] || '');
      if (parseMoney(draft[key])) el.dataset.manual = 'true';
    }
  });
  refreshClientSelectionHint();
}

function savePlanDraft() {
  uiState.planDraft = {
    planModel: document.getElementById('planModel').value,
    planType: document.getElementById('planType').value,
    tradeIn: document.getElementById('tradeIn').checked,
    advancePayments: document.getElementById('advancePayments').checked,
    advanceAmount: parseMoney(document.getElementById('advanceAmount').dataset.raw || document.getElementById('advanceAmount').value),
    customPrice: parseMoney(document.getElementById('customPrice').dataset.raw || document.getElementById('customPrice').value),
    versionSelection: document.getElementById('versionSelect').value,
    versionUpgrade: parseMoney(document.getElementById('versionUpgrade').dataset.raw || document.getElementById('versionUpgrade').value),
    appliedReservation: document.getElementById('appliedReservation').value,
    tradeInValue: parseMoney(document.getElementById('tradeInValue').dataset.raw || document.getElementById('tradeInValue').value),
    clientName: document.getElementById('clientName').value,
    notes: document.getElementById('notes').value,
    selectedClientId: selectedPlanClientId,
    reservation1: parseMoney(document.getElementById('reservation1').dataset.raw || document.getElementById('reservation1').value),
    reservation3: parseMoney(document.getElementById('reservation3').dataset.raw || document.getElementById('reservation3').value),
    reservation6: parseMoney(document.getElementById('reservation6').dataset.raw || document.getElementById('reservation6').value)
  };
  persist();
}

function attachPlanListeners() {
  document.getElementById('saveClient').addEventListener('click', () => {
    const quote = buildQuoteFromForm();
    confirmAction({
      title: 'Guardar cotización',
      message: `Se guardará la cotización de ${quote.name}.`,
      confirmText: 'Guardar',
      onConfirm: () => {
        clients = clients.filter(c => c.id !== quote.id);
        clients.unshift(quote);
        persist();
        renderClients();
        renderStats();
        showToast('Cotización guardada', 'success');
      }
    });
  });
}

function renderClients() {
  const list = document.getElementById('quoteList');
  if (!list) return;
  const searchInput = document.getElementById('quoteSearch');
  if (searchInput && searchInput.value !== uiState.quoteSearch) {
    searchInput.value = uiState.quoteSearch || '';
  }
  const search = (uiState.quoteSearch || '').toLowerCase();
  const normalized = clients.map((c) => {
    const hydrated = { ...c };
    hydrated.id = hydrated.id || `quote-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    hydrated.planProfileLabel = hydrated.planProfileLabel || 'Personalizar';
    hydrated.summaryText = hydrated.summaryText || buildQuoteSummaryText(hydrated);
    hydrated.timestamp = hydrated.timestamp || new Date().toISOString();
    return hydrated;
  });
  clients = normalized;
  const filtered = normalized.filter(c => {
    const haystack = `${c.name} ${c.model} ${planLabel(c.plan)} ${c.summaryText || ''}`.toLowerCase();
    return haystack.includes(search);
  });
  if (!filtered.length) {
    list.innerHTML = '<p class="muted">Sin cotizaciones guardadas.</p>';
    return;
  }
  list.innerHTML = filtered.map((c) => {
    const shortId = c.id.slice(-6);
    const fecha = c.timestamp ? new Date(c.timestamp).toLocaleString('es-AR') : '';
    return `
    <div class="quote-row" data-id="${c.id}">
      <div class="quote-main">
        <strong>${c.name}</strong>
        <p class="muted tiny">${c.model} · ${planLabel(c.plan)} · ${currency.format(c.cuota || 0)}</p>
      </div>
      <div class="quote-meta">
        <span class="pill">ID ${shortId}</span>
        ${fecha ? `<span class="pill">${fecha}</span>` : ''}
      </div>
      <div class="actions compact">
        <button class="secondary-btn mini-btn" data-action="load"><i class='bx bx-upload'></i>Cargar</button>
        <button class="ghost-btn mini-btn" data-action="copy"><i class='bx bx-copy'></i>Copiar</button>
        <button class="ghost-btn mini-btn" data-action="delete"><i class='bx bx-trash'></i>Borrar</button>
      </div>
    </div>
  `;
  }).join('');

  list.querySelectorAll('[data-action]').forEach(btn => btn.addEventListener('click', (e) => {
    const card = btn.closest('.quote-row');
    const id = card?.dataset.id;
    const quote = clients.find(c => c.id === id);
    const action = btn.dataset.action;
    if (!quote || !id) return;
    e.stopPropagation();
    if (action === 'delete') {
      confirmAction({
        title: 'Eliminar cotización',
        message: 'Se quitará la cotización seleccionada.',
        confirmText: 'Eliminar',
        onConfirm: () => {
          clients = clients.filter(c => c.id !== id);
          persist();
          renderClients();
          renderStats();
          showToast('Cotización eliminada', 'success');
        }
      });
    } else if (action === 'copy') {
      copyText(quote.summaryText || buildQuoteSummaryText(quote), 'Cotización copiada');
    } else if (action === 'load') {
      confirmAction({
        title: 'Cargar cotización',
        message: 'Aplicaremos la información guardada al simulador.',
        confirmText: 'Aplicar',
        onConfirm: () => {
          applyQuoteToForm(quote);
          closeQuoteModal();
          showToast('Cotización cargada', 'success');
        }
      });
    }
  }));
}

function attachVehicleToggles() {
  const res = document.getElementById('showReservations');
  const integ = document.getElementById('showIntegration');
  const viewBtn = document.getElementById('viewPriceImage');
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
  if (viewBtn && !viewBtn.dataset.bound) {
    viewBtn.addEventListener('click', openPriceImage);
    viewBtn.dataset.bound = 'true';
  }
}

function openPriceImage() {
  const active = getActivePriceTab();
  const file = getPrimaryFileForTab(active);
  if (file) {
    window.open(file, '_blank');
  } else {
    showToast('No hay archivo principal configurado para esta pestaña.', 'error');
  }
}

function bindClientManager() {
  const importInput = document.getElementById('clientExcel');
  if (importInput) {
    importInput.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const importDate = await openImportDateModal();
      if (importDate === null) {
        e.target.value = '';
        return;
      }
      handleClientImport(file, importDate);
      e.target.value = '';
    });
  }

  renderAdvisorSelector(mergeGlobalSettings(uiState.globalSettings).advisorName);

  const search = document.getElementById('clientManagerSearch');
  if (search) {
    search.value = clientManagerState.search || '';
    const applySearch = () => {
      clientManagerState.search = search.value.trim();
      clientManagerState.pagination.page = 1;
      persist();
      renderClientManager();
    };
    search.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        applySearch();
      }
    });
    const searchBtn = document.getElementById('clientManagerSearchBtn');
    if (searchBtn && !searchBtn.dataset.bound) {
      searchBtn.addEventListener('click', applySearch);
      searchBtn.dataset.bound = 'true';
    }
  }

  const statusFilter = document.getElementById('statusFilter');
  if (statusFilter) {
    statusFilter.value = clientManagerState.statusFilter;
    statusFilter.addEventListener('change', () => {
      clientManagerState.statusFilter = statusFilter.value;
      clientManagerState.pagination.page = 1;
      persist();
      renderClientManager();
    });
  }
  renderStatusFilter();

  const paginationSelect = document.getElementById('clientPaginationSelect');
  if (paginationSelect) {
    paginationSelect.value = clientManagerState.pagination.size ? String(clientManagerState.pagination.size) : 'none';
    paginationSelect.addEventListener('change', () => {
      const size = paginationSelect.value === 'none' ? 0 : Number(paginationSelect.value) || 0;
      clientManagerState.pagination = normalizePaginationState({ ...clientManagerState.pagination, size, page: 1 });
      persist();
      renderClientManager();
    });
  }

  const paginationPrev = document.getElementById('clientPaginationPrev');
  const paginationNext = document.getElementById('clientPaginationNext');
  if (paginationPrev && !paginationPrev.dataset.bound) {
    paginationPrev.addEventListener('click', () => {
      if (clientManagerState.pagination.size && clientManagerState.pagination.page > 1) {
        clientManagerState.pagination.page -= 1;
        persist();
        renderClientManager();
      }
    });
    paginationPrev.dataset.bound = 'true';
  }
  if (paginationNext && !paginationNext.dataset.bound) {
    paginationNext.addEventListener('click', () => {
      if (clientManagerState.pagination.size) {
        clientManagerState.pagination.page += 1;
        persist();
        renderClientManager();
      }
    });
    paginationNext.dataset.bound = 'true';
  }

  const dateFilterBtn = document.getElementById('openDateFilter');
  if (dateFilterBtn) {
    dateFilterBtn.addEventListener('click', openDateFilterModal);
  }

  const contactLogBtn = document.getElementById('openContactLog');
  if (contactLogBtn) {
    contactLogBtn.addEventListener('click', () => toggleContactLog(true));
  }

  const contactLogClose = document.getElementById('contactLogClose');
  if (contactLogClose) contactLogClose.addEventListener('click', () => toggleContactLog(false));

  const contactLogSearch = document.getElementById('contactLogSearch');
  if (contactLogSearch) {
    contactLogSearch.value = clientManagerState.contactLogSearch || '';
    contactLogSearch.addEventListener('input', () => {
      clientManagerState.contactLogSearch = contactLogSearch.value;
      renderContactLog();
      persist();
    });
  }

  const editModeToggle = document.getElementById('toggleEditMode');
  if (editModeToggle) {
    updateEditModeButton(editModeToggle);
    editModeToggle.addEventListener('click', () => {
      clientManagerState.editingMode = !clientManagerState.editingMode;
      persist();
      updateEditModeButton(editModeToggle);
      renderClientManager();
    });
  }

  const exportBtn = document.getElementById('exportClients');
  if (exportBtn) {
    exportBtn.addEventListener('click', openExportModal);
  }

  bindClientEditHandlers();
  renderColumnToggles();
}

function bindContactAssistant() {
  const openBtn = document.getElementById('openContactAssistant');
  const overlay = document.getElementById('contactAssistantOverlay');
  const closeBtn = document.getElementById('closeContactAssistant');
  const copyPhoneBtn = document.getElementById('assistantCopyPhone');
  const copyMsgBtn = document.getElementById('assistantCopyMessage');
  const markContactedBtn = document.getElementById('assistantMarkContacted');
  const markNoNumberBtn = document.getElementById('assistantMarkNoNumber');
  const undoBtn = document.getElementById('assistantUndoBtn');

  const openAssistant = () => {
    renderContactAssistant();
    toggleFadeOverlay(overlay, true);
  };

  const closeAssistant = () => {
    toggleFadeOverlay(overlay, false);
  };

  if (openBtn) openBtn.addEventListener('click', openAssistant);
  if (closeBtn) closeBtn.addEventListener('click', closeAssistant);

  if (copyPhoneBtn) copyPhoneBtn.addEventListener('click', () => {
    const { current } = assistantContext();
    if (!current) return;
    copyText(normalizePhone(current.phone || ''), 'Número copiado');
  });

  if (copyMsgBtn) copyMsgBtn.addEventListener('click', () => {
    const { current } = assistantContext();
    if (!current) return;
    const message = buildMessageForClient(current);
    copyText(message, 'Mensaje copiado');
  });

  const markAndAdvance = (flag) => {
    const { current } = assistantContext();
    if (!current) return;
    clientManagerState.contactAssistant.lastAction = {
      clientId: current.id,
      clientName: current.name || 'Sin nombre',
      actionLabel: flag === 'contacted' ? 'Contactado' : 'Número no disponible',
      previousFlags: { ...(current.flags || {}) },
      previousContactDate: current.contactDate || '',
      previousIndex: clientManagerState.contactAssistant.currentIndex
    };
    updateClientFlag(current.id, flag, true);
    const pending = pendingClientsPool();
    const index = Math.min(clientManagerState.contactAssistant.currentIndex, pending.length - 1);
    clientManagerState.contactAssistant.currentIndex = Math.max(0, index);
    persist();
    renderContactAssistant('slide-right');
  };

  if (markContactedBtn) markContactedBtn.addEventListener('click', () => markAndAdvance('contacted'));
  if (markNoNumberBtn) markNoNumberBtn.addEventListener('click', () => markAndAdvance('noNumber'));

  if (undoBtn && !undoBtn.dataset.bound) {
    undoBtn.addEventListener('click', () => {
      const undo = clientManagerState.contactAssistant?.lastAction;
      if (!undo) return;
      const client = managerClients.find(c => c.id === undo.clientId);
      if (!client) return;
      client.flags = { ...(undo.previousFlags || {}) };
      client.contactDate = undo.previousContactDate || '';
      const pending = pendingClientsPool();
      const restoredIndex = pending.findIndex(item => item.id === undo.clientId);
      clientManagerState.contactAssistant.currentIndex = restoredIndex >= 0
        ? restoredIndex
        : Math.max(0, Math.min(undo.previousIndex ?? 0, pending.length - 1));
      clientManagerState.contactAssistant.lastAction = null;
      persist();
      renderClientManager();
      renderContactAssistant('slide-left');
    });
    undoBtn.dataset.bound = 'true';
  }
}

function bindActionCustomizer() {
  const openBtn = document.getElementById('openActionCustomizer');
  const closeBtn = document.getElementById('closeActionCustomizer');
  const overlay = document.getElementById('actionCustomizerOverlay');
  const newBtn = document.getElementById('newCustomAction');
  const cancelBtn = document.getElementById('cancelCustomAction');
  const saveBtn = document.getElementById('saveCustomAction');
  const iconPicker = document.getElementById('customActionIcons');
  const wizardOverlay = document.getElementById('customActionOverlay');
  const closeWizard = document.getElementById('closeCustomAction');
  const iconOverlay = document.getElementById('iconPickerOverlay');
  const openIconPicker = document.getElementById('openIconPicker');
  const closeIconPicker = document.getElementById('closeIconPicker');

  if (!overlay || !openBtn) return;

  const showCustomizer = () => {
    renderActionCustomizer();
    toggleFadeOverlay(overlay, true);
  };

  const hideCustomizer = () => toggleFadeOverlay(overlay, false);

  const openWizard = (action = null) => {
    startCustomActionEdit(action);
    toggleFadeOverlay(wizardOverlay, true);
  };

  const hideWizard = () => {
    hideCustomActionForm();
    resetCustomActionForm();
    toggleFadeOverlay(wizardOverlay, false);
  };

  openBtn.addEventListener('click', showCustomizer);
  if (closeBtn) closeBtn.addEventListener('click', hideCustomizer);
  if (newBtn) newBtn.addEventListener('click', () => openWizard());
  if (closeWizard) closeWizard.addEventListener('click', hideWizard);
  if (cancelBtn) cancelBtn.addEventListener('click', hideWizard);
  if (saveBtn) saveBtn.addEventListener('click', saveCustomAction);

  if (openIconPicker) openIconPicker.addEventListener('click', () => {
    renderIconPicker(selectedCustomIcon);
    toggleFadeOverlay(iconOverlay, true);
  });
  if (closeIconPicker) closeIconPicker.addEventListener('click', () => toggleFadeOverlay(iconOverlay, false));

  if (iconPicker && !iconPicker.dataset.bound) {
    iconPicker.dataset.bound = 'true';
    renderIconPicker();
  }
}

function renderActionCustomizer() {
  const defaultList = document.getElementById('defaultActionList');
  const customList = document.getElementById('customActionList');
  if (!defaultList || !customList) return;

  const customActions = (clientManagerState.customActions || []).filter(Boolean);

  defaultList.innerHTML = defaultActionCatalog.map(action => {
    const active = clientManagerState.actionVisibility?.[action.id] !== false;
    const eyeIcon = active ? 'bx-show' : 'bx-hide';
    const eyeClass = active ? 'eye-toggle active' : 'eye-toggle';
    return `
      <div class="action-row" data-id="${action.id}">
        <div class="action-main">
          <div class="icon"><i class='bx ${action.icon}'></i></div>
          <div class="action-meta">
            <span class="label">${action.label}</span>
            <span class="muted">Acción por defecto</span>
          </div>
        </div>
        <div class="action-actions">
          <button class="${eyeClass}" data-default-action="${action.id}"><i class='bx ${eyeIcon}'></i> ${active ? 'Visible' : 'Oculta'}</button>
        </div>
      </div>`;
  }).join('');

  customList.innerHTML = customActions.map(action => {
    const active = action.visible !== false;
    const eyeIcon = active ? 'bx-show' : 'bx-hide';
    const eyeClass = active ? 'eye-toggle active' : 'eye-toggle';
    return `
      <div class="action-row" data-custom-id="${action.id}">
        <div class="action-main">
          <div class="icon" style="color:${action.color}; background:${hexToRgba(action.color || '#38bdf8', 0.16)}"><i class='bx ${action.icon}'></i></div>
          <div class="action-meta">
            <span class="label">${action.label}</span>
            <span class="muted">Personalizada</span>
          </div>
        </div>
        <div class="action-actions">
          <span class="color-dot" style="background:${action.color}"></span>
          <button class="ghost-btn mini" data-edit-custom="${action.id}"><i class='bx bx-edit-alt'></i>Editar</button>
          <button class="ghost-btn mini danger" data-delete-custom="${action.id}"><i class='bx bx-trash'></i>Borrar</button>
          <button class="${eyeClass}" data-toggle-custom="${action.id}"><i class='bx ${eyeIcon}'></i> ${active ? 'Visible' : 'Oculta'}</button>
        </div>
      </div>`;
  }).join('');

  const hasCustoms = customActions.length > 0;
  if (customList) customList.style.display = hasCustoms ? 'grid' : 'none';

  defaultList.querySelectorAll('[data-default-action]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.dataset.defaultAction;
    clientManagerState.actionVisibility[id] = !(clientManagerState.actionVisibility[id] !== false);
    persist();
    renderActionCustomizer();
    renderClientManager();
  }));

  customList.querySelectorAll('[data-toggle-custom]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.dataset.toggleCustom;
    clientManagerState.customActions = (clientManagerState.customActions || []).map(action => action.id === id ? { ...action, visible: action.visible === false } : action);
    persist();
    renderActionCustomizer();
    renderClientManager();
  }));

  customList.querySelectorAll('[data-edit-custom]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.dataset.editCustom;
    const target = getCustomActionById(id);
    if (!target) return;
    startCustomActionEdit(target);
    toggleFadeOverlay(document.getElementById('customActionOverlay'), true);
  }));

  customList.querySelectorAll('[data-delete-custom]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.dataset.deleteCustom;
    const target = getCustomActionById(id);
    if (!target) return;
    confirmAction({
      title: 'Borrar acción personalizada',
      message: `¿Seguro que quieres eliminar "${target.label}"? Se quitará de las filas y del historial.`,
      confirmText: 'Sí, borrar',
      cancelText: 'Cancelar',
      onConfirm: () => removeCustomAction(id)
    });
  }));
}

function removeCustomAction(id) {
  clientManagerState.customActions = (clientManagerState.customActions || []).filter(action => action.id !== id);
  managerClients = (managerClients || []).map(client => {
    const needsCleanup = client?.flags?.customStatus?.id === id;
    if (!needsCleanup) return client;
    const updated = { ...client, flags: { ...(client.flags || {}), customStatus: null } };
    updateContactMeta(updated);
    return updated;
  });
  persist();
  renderActionCustomizer();
  renderClientManager();
  renderContactLog();
  showToast('Acción personalizada eliminada', 'success');
}

function renderIconPicker(selected = selectedCustomIcon) {
  const iconPicker = document.getElementById('customActionIcons');
  const preview = document.getElementById('customIconPreview');
  if (preview) preview.innerHTML = `<i class='bx ${selected}'></i>`;
  if (!iconPicker) return;
  const icons = [
  "bx-abacus",
  "bx-accessibility",
  "bx-add-to-queue",
  "bx-adjust",
  "bx-alarm",
  "bx-alarm-add",
  "bx-alarm-exclamation",
  "bx-alarm-off",
  "bx-alarm-snooze",
  "bx-album",
  "bx-align-justify",
  "bx-align-left",
  "bx-align-middle",
  "bx-align-right",
  "bx-analyse",
  "bx-anchor",
  "bx-angry",
  "bx-aperture",
  "bx-arch",
  "bx-archive",
  "bx-archive-in",
  "bx-archive-out",
  "bx-area",
  "bx-arrow-back",
  "bx-arrow-from-bottom",
  "bx-arrow-from-left",
  "bx-arrow-from-right",
  "bx-arrow-from-top",
  "bx-arrow-to-bottom",
  "bx-arrow-to-left",
  "bx-arrow-to-right",
  "bx-arrow-to-top",
  "bx-at",
  "bx-atom",
  "bx-award",
  "bx-badge",
  "bx-badge-check",
  "bx-baguette",
  "bx-ball",
  "bx-band-aid",
  "bx-bar-chart",
  "bx-bar-chart-alt",
  "bx-bar-chart-alt-2",
  "bx-bar-chart-square",
  "bx-barcode",
  "bx-barcode-reader",
  "bx-baseball",
  "bx-basket",
  "bx-basketball",
  "bx-bath",
  "bx-battery",
  "bx-bed",
  "bx-been-here",
  "bx-beer",
  "bx-bell",
  "bx-bell-minus",
  "bx-bell-off",
  "bx-bell-plus",
  "bx-bible",
  "bx-bitcoin",
  "bx-blanket",
  "bx-block",
  "bx-bluetooth",
  "bx-body",
  "bx-bold",
  "bx-bolt-circle",
  "bx-bomb",
  "bx-bone",
  "bx-bong",
  "bx-book",
  "bx-book-add",
  "bx-book-alt",
  "bx-book-bookmark",
  "bx-book-content",
  "bx-book-heart",
  "bx-book-open",
  "bx-book-reader",
  "bx-bookmark",
  "bx-bookmark-alt",
  "bx-bookmark-alt-minus",
  "bx-bookmark-alt-plus",
  "bx-bookmark-heart",
  "bx-bookmark-minus",
  "bx-bookmark-plus",
  "bx-bookmarks",
  "bx-border-all",
  "bx-border-bottom",
  "bx-border-inner",
  "bx-border-left",
  "bx-border-none",
  "bx-border-outer",
  "bx-border-radius",
  "bx-border-right",
  "bx-border-top",
  "bx-bot",
  "bx-bowl-hot",
  "bx-bowl-rice",
  "bx-bowling-ball",
  "bx-box",
  "bx-bracket",
  "bx-braille",
  "bx-brain",
  "bx-briefcase",
  "bx-briefcase-alt",
  "bx-briefcase-alt-2",
  "bx-brightness",
  "bx-brightness-half",
  "bx-broadcast",
  "bx-brush",
  "bx-brush-alt",
  "bx-bug",
  "bx-bug-alt",
  "bx-building",
  "bx-building-house",
  "bx-buildings",
  "bx-bulb",
  "bx-bullseye",
  "bx-buoy",
  "bx-bus",
  "bx-bus-school",
  "bx-cabinet",
  "bx-cable-car",
  "bx-cake",
  "bx-calculator",
  "bx-calendar",
  "bx-calendar-alt",
  "bx-calendar-check",
  "bx-calendar-edit",
  "bx-calendar-event",
  "bx-calendar-exclamation",
  "bx-calendar-heart",
  "bx-calendar-minus",
  "bx-calendar-plus",
  "bx-calendar-star",
  "bx-calendar-week",
  "bx-calendar-x",
  "bx-camera",
  "bx-camera-home",
  "bx-camera-movie",
  "bx-camera-off",
  "bx-candles",
  "bx-capsule",
  "bx-captions",
  "bx-car",
  "bx-card",
  "bx-caret-down",
  "bx-caret-down-circle",
  "bx-caret-down-square",
  "bx-caret-left",
  "bx-caret-left-circle",
  "bx-caret-left-square",
  "bx-caret-right",
  "bx-caret-right-circle",
  "bx-caret-right-square",
  "bx-caret-up",
  "bx-caret-up-circle",
  "bx-caret-up-square",
  "bx-carousel",
  "bx-cart",
  "bx-cart-add",
  "bx-cart-alt",
  "bx-cart-download",
  "bx-cast",
  "bx-category",
  "bx-category-alt",
  "bx-cctv",
  "bx-certification",
  "bx-chair",
  "bx-chalkboard",
  "bx-chart",
  "bx-chat",
  "bx-check",
  "bx-check-circle",
  "bx-check-double",
  "bx-check-shield",
  "bx-check-square",
  "bx-checkbox",
  "bx-checkbox-checked",
  "bx-checkbox-minus",
  "bx-checkbox-square",
  "bx-cheese",
  "bx-chevron-down",
  "bx-chevron-down-circle",
  "bx-chevron-down-square",
  "bx-chevron-left",
  "bx-chevron-left-circle",
  "bx-chevron-left-square",
  "bx-chevron-right",
  "bx-chevron-right-circle",
  "bx-chevron-right-square",
  "bx-chevron-up",
  "bx-chevron-up-circle",
  "bx-chevron-up-square",
  "bx-chevrons-down",
  "bx-chevrons-left",
  "bx-chevrons-right",
  "bx-chevrons-up",
  "bx-child",
  "bx-chip",
  "bx-church",
  "bx-circle",
  "bx-circle-half",
  "bx-circle-quarter",
  "bx-circle-three-quarter",
  "bx-clinic",
  "bx-clipboard",
  "bx-closet",
  "bx-cloud",
  "bx-cloud-download",
  "bx-cloud-drizzle",
  "bx-cloud-light-rain",
  "bx-cloud-lightning",
  "bx-cloud-rain",
  "bx-cloud-snow",
  "bx-cloud-upload",
  "bx-code",
  "bx-code-alt",
  "bx-code-block",
  "bx-code-curly",
  "bx-coffee",
  "bx-coffee-togo",
  "bx-cog",
  "bx-coin",
  "bx-coin-stack",
  "bx-collapse",
  "bx-collapse-alt",
  "bx-collapse-horizontal",
  "bx-collapse-vertical",
  "bx-collection",
  "bx-color",
  "bx-color-fill",
  "bx-columns",
  "bx-command",
  "bx-comment",
  "bx-comment-add",
  "bx-comment-check",
  "bx-comment-detail",
  "bx-comment-dots",
  "bx-comment-edit",
  "bx-comment-error",
  "bx-comment-minus",
  "bx-comment-x",
  "bx-compass",
  "bx-confused",
  "bx-conversation",
  "bx-cookie",
  "bx-cool",
  "bx-copy",
  "bx-copy-alt",
  "bx-copyright",
  "bx-credit-card",
  "bx-credit-card-alt",
  "bx-credit-card-front",
  "bx-cricket-ball",
  "bx-crop",
  "bx-cross",
  "bx-crosshair",
  "bx-crown",
  "bx-cube",
  "bx-cube-alt",
  "bx-cuboid",
  "bx-current-location",
  "bx-customize",
  "bx-cut",
  "bx-cycling",
  "bx-cylinder",
  "bx-data",
  "bx-desktop",
  "bx-detail",
  "bx-devices",
  "bx-dialpad",
  "bx-dialpad-alt",
  "bx-diamond",
  "bx-dice-1",
  "bx-dice-2",
  "bx-dice-3",
  "bx-dice-4",
  "bx-dice-5",
  "bx-dice-6",
  "bx-directions",
  "bx-disc",
  "bx-dish",
  "bx-dislike",
  "bx-dizzy",
  "bx-dna",
  "bx-dock-bottom",
  "bx-dock-left",
  "bx-dock-right",
  "bx-dock-top",
  "bx-dollar",
  "bx-dollar-circle",
  "bx-donate-blood",
  "bx-donate-heart",
  "bx-door-open",
  "bx-dots-horizontal",
  "bx-dots-horizontal-rounded",
  "bx-dots-vertical",
  "bx-dots-vertical-rounded",
  "bx-doughnut-chart",
  "bx-down-arrow",
  "bx-down-arrow-alt",
  "bx-down-arrow-circle",
  "bx-download",
  "bx-downvote",
  "bx-drink",
  "bx-droplet",
  "bx-dumbbell",
  "bx-duplicate",
  "bx-edit",
  "bx-edit-alt",
  "bx-envelope",
  "bx-envelope-open",
  "bx-equalizer",
  "bx-eraser",
  "bx-error",
  "bx-error-alt",
  "bx-error-circle",
  "bx-euro",
  "bx-exclude",
  "bx-exit",
  "bx-exit-fullscreen",
  "bx-expand",
  "bx-expand-alt",
  "bx-expand-horizontal",
  "bx-expand-vertical",
  "bx-export",
  "bx-extension",
  "bx-face",
  "bx-fast-forward",
  "bx-fast-forward-circle",
  "bx-female",
  "bx-female-sign",
  "bx-file",
  "bx-file-blank",
  "bx-file-find",
  "bx-film",
  "bx-filter",
  "bx-filter-alt",
  "bx-fingerprint",
  "bx-first-aid",
  "bx-first-page",
  "bx-flag",
  "bx-folder",
  "bx-folder-minus",
  "bx-folder-open",
  "bx-folder-plus",
  "bx-font",
  "bx-font-color",
  "bx-font-family",
  "bx-font-size",
  "bx-food-menu",
  "bx-food-tag",
  "bx-football",
  "bx-fork",
  "bx-fridge",
  "bx-fullscreen",
  "bx-game",
  "bx-gas-pump",
  "bx-ghost",
  "bx-gift",
  "bx-git-branch",
  "bx-git-commit",
  "bx-git-compare",
  "bx-git-merge",
  "bx-git-pull-request",
  "bx-git-repo-forked",
  "bx-glasses",
  "bx-glasses-alt",
  "bx-globe",
  "bx-globe-alt",
  "bx-grid",
  "bx-grid-alt",
  "bx-grid-horizontal",
  "bx-grid-small",
  "bx-grid-vertical",
  "bx-group",
  "bx-handicap",
  "bx-happy",
  "bx-happy-alt",
  "bx-happy-beaming",
  "bx-happy-heart-eyes",
  "bx-hard-hat",
  "bx-hash",
  "bx-hdd",
  "bx-heading",
  "bx-headphone",
  "bx-health",
  "bx-heart",
  "bx-heart-circle",
  "bx-heart-square",
  "bx-help-circle",
  "bx-hide",
  "bx-highlight",
  "bx-history",
  "bx-hive",
  "bx-home",
  "bx-home-alt",
  "bx-home-alt-2",
  "bx-home-circle",
  "bx-home-heart",
  "bx-home-smile",
  "bx-horizontal-center",
  "bx-horizontal-left",
  "bx-horizontal-right",
  "bx-hotel",
  "bx-hourglass",
  "bx-id-card",
  "bx-image",
  "bx-image-add",
  "bx-image-alt",
  "bx-images",
  "bx-import",
  "bx-infinite",
  "bx-info-circle",
  "bx-info-square",
  "bx-injection",
  "bx-intersect",
  "bx-italic",
  "bx-joystick",
  "bx-joystick-alt",
  "bx-joystick-button",
  "bx-key",
  "bx-knife",
  "bx-label",
  "bx-landscape",
  "bx-laptop",
  "bx-last-page",
  "bx-laugh",
  "bx-layer",
  "bx-layer-minus",
  "bx-layer-plus",
  "bx-layout",
  "bx-leaf",
  "bx-left-arrow",
  "bx-left-arrow-alt",
  "bx-left-arrow-circle",
  "bx-left-down-arrow-circle",
  "bx-left-indent",
  "bx-left-top-arrow-circle",
  "bx-lemon",
  "bx-library",
  "bx-like",
  "bx-line-chart",
  "bx-line-chart-down",
  "bx-link",
  "bx-link-alt",
  "bx-link-external",
  "bx-lira",
  "bx-list-check",
  "bx-list-minus",
  "bx-list-ol",
  "bx-list-plus",
  "bx-list-ul",
  "bx-loader",
  "bx-loader-alt",
  "bx-loader-circle",
  "bx-location-plus",
  "bx-lock",
  "bx-lock-alt",
  "bx-lock-open",
  "bx-lock-open-alt",
  "bx-log-in",
  "bx-log-in-circle",
  "bx-log-out",
  "bx-log-out-circle",
  "bx-low-vision",
  "bx-magnet",
  "bx-mail-send",
  "bx-male",
  "bx-male-female",
  "bx-male-sign",
  "bx-map",
  "bx-map-alt",
  "bx-map-pin",
  "bx-mask",
  "bx-math",
  "bx-medal",
  "bx-meh",
  "bx-meh-alt",
  "bx-meh-blank",
  "bx-memory-card",
  "bx-menu",
  "bx-menu-alt-left",
  "bx-menu-alt-right",
  "bx-merge",
  "bx-message",
  "bx-message-add",
  "bx-message-alt",
  "bx-message-alt-add",
  "bx-message-alt-check",
  "bx-message-alt-detail",
  "bx-message-alt-dots",
  "bx-message-alt-edit",
  "bx-message-alt-error",
  "bx-message-alt-minus",
  "bx-message-alt-x",
  "bx-message-check",
  "bx-message-detail",
  "bx-message-dots",
  "bx-message-edit",
  "bx-message-error",
  "bx-message-minus",
  "bx-message-rounded",
  "bx-message-rounded-add",
  "bx-message-rounded-check",
  "bx-message-rounded-detail",
  "bx-message-rounded-dots",
  "bx-message-rounded-edit",
  "bx-message-rounded-error",
  "bx-message-rounded-minus",
  "bx-message-rounded-x",
  "bx-message-square",
  "bx-message-square-add",
  "bx-message-square-check",
  "bx-message-square-detail",
  "bx-message-square-dots",
  "bx-message-square-edit",
  "bx-message-square-error",
  "bx-message-square-minus",
  "bx-message-square-x",
  "bx-message-x",
  "bx-meteor",
  "bx-microchip",
  "bx-microphone",
  "bx-microphone-off",
  "bx-minus",
  "bx-minus-back",
  "bx-minus-circle",
  "bx-minus-front",
  "bx-mobile",
  "bx-mobile-alt",
  "bx-mobile-landscape",
  "bx-mobile-vibration",
  "bx-money",
  "bx-money-withdraw",
  "bx-moon",
  "bx-mouse",
  "bx-mouse-alt",
  "bx-move",
  "bx-move-horizontal",
  "bx-move-vertical",
  "bx-movie",
  "bx-movie-play",
  "bx-music",
  "bx-navigation",
  "bx-network-chart",
  "bx-news",
  "bx-no-entry",
  "bx-no-signal",
  "bx-note",
  "bx-notepad",
  "bx-notification",
  "bx-notification-off",
  "bx-objects-horizontal-center",
  "bx-objects-horizontal-left",
  "bx-objects-horizontal-right",
  "bx-objects-vertical-bottom",
  "bx-objects-vertical-center",
  "bx-objects-vertical-top",
  "bx-outline",
  "bx-package",
  "bx-paint",
  "bx-paint-roll",
  "bx-palette",
  "bx-paper-plane",
  "bx-paperclip",
  "bx-paragraph",
  "bx-party",
  "bx-paste",
  "bx-pause",
  "bx-pause-circle",
  "bx-pen",
  "bx-pencil",
  "bx-phone",
  "bx-phone-call",
  "bx-phone-incoming",
  "bx-phone-off",
  "bx-phone-outgoing",
  "bx-photo-album",
  "bx-pie-chart",
  "bx-pie-chart-alt",
  "bx-pie-chart-alt-2",
  "bx-pin",
  "bx-planet",
  "bx-play",
  "bx-play-circle",
  "bx-plug",
  "bx-plus",
  "bx-plus-circle",
  "bx-plus-medical",
  "bx-podcast",
  "bx-pointer",
  "bx-poll",
  "bx-polygon",
  "bx-popsicle",
  "bx-pound",
  "bx-power-off",
  "bx-printer",
  "bx-pulse",
  "bx-purchase-tag",
  "bx-purchase-tag-alt",
  "bx-pyramid",
  "bx-qr",
  "bx-qr-scan",
  "bx-question-mark",
  "bx-radar",
  "bx-radio",
  "bx-radio-circle",
  "bx-radio-circle-marked",
  "bx-receipt",
  "bx-rectangle",
  "bx-recycle",
  "bx-redo",
  "bx-reflect-horizontal",
  "bx-reflect-vertical",
  "bx-refresh",
  "bx-registered",
  "bx-rename",
  "bx-repeat",
  "bx-reply",
  "bx-reply-all",
  "bx-repost",
  "bx-reset",
  "bx-restaurant",
  "bx-revision",
  "bx-rewind",
  "bx-rewind-circle",
  "bx-rfid",
  "bx-right-arrow",
  "bx-right-arrow-alt",
  "bx-right-arrow-circle",
  "bx-right-down-arrow-circle",
  "bx-right-indent",
  "bx-right-top-arrow-circle",
  "bx-rocket",
  "bx-rotate-left",
  "bx-rotate-right",
  "bx-rss",
  "bx-ruble",
  "bx-ruler",
  "bx-run",
  "bx-rupee",
  "bx-sad",
  "bx-save",
  "bx-scan",
  "bx-scatter-chart",
  "bx-screenshot",
  "bx-search",
  "bx-search-alt",
  "bx-search-alt-2",
  "bx-select-multiple",
  "bx-selection",
  "bx-send",
  "bx-server",
  "bx-shape-circle",
  "bx-shape-polygon",
  "bx-shape-square",
  "bx-shape-triangle",
  "bx-share",
  "bx-share-alt",
  "bx-shekel",
  "bx-shield",
  "bx-shield-alt",
  "bx-shield-alt-2",
  "bx-shield-minus",
  "bx-shield-plus",
  "bx-shield-quarter",
  "bx-shield-x",
  "bx-shocked",
  "bx-shopping-bag",
  "bx-show",
  "bx-show-alt",
  "bx-shower",
  "bx-shuffle",
  "bx-sidebar",
  "bx-signal-1",
  "bx-signal-2",
  "bx-signal-3",
  "bx-signal-4",
  "bx-signal-5",
  "bx-sitemap",
  "bx-skip-next",
  "bx-skip-next-circle",
  "bx-skip-previous",
  "bx-skip-previous-circle",
  "bx-sleepy",
  "bx-slider",
  "bx-slider-alt",
  "bx-slideshow",
  "bx-smile",
  "bx-sort",
  "bx-sort-a-z",
  "bx-sort-alt-2",
  "bx-sort-down",
  "bx-sort-up",
  "bx-sort-z-a",
  "bx-spa",
  "bx-space-bar",
  "bx-speaker",
  "bx-spray-can",
  "bx-spreadsheet",
  "bx-square",
  "bx-square-rounded",
  "bx-star",
  "bx-station",
  "bx-stats",
  "bx-sticker",
  "bx-stop",
  "bx-stop-circle",
  "bx-stopwatch",
  "bx-store",
  "bx-store-alt",
  "bx-street-view",
  "bx-strikethrough",
  "bx-subdirectory-left",
  "bx-subdirectory-right",
  "bx-sun",
  "bx-support",
  "bx-sushi",
  "bx-swim",
  "bx-sync",
  "bx-tab",
  "bx-table",
  "bx-tachometer",
  "bx-tag",
  "bx-tag-alt",
  "bx-target-lock",
  "bx-task",
  "bx-task-x",
  "bx-taxi",
  "bx-tennis-ball",
  "bx-terminal",
  "bx-test-tube",
  "bx-text",
  "bx-time",
  "bx-time-five",
  "bx-timer",
  "bx-tired",
  "bx-toggle-left",
  "bx-toggle-right",
  "bx-tone",
  "bx-traffic-cone",
  "bx-train",
  "bx-transfer",
  "bx-transfer-alt",
  "bx-trash",
  "bx-trash-alt",
  "bx-trending-down",
  "bx-trending-up",
  "bx-trim",
  "bx-trip",
  "bx-trophy",
  "bx-tv",
  "bx-underline",
  "bx-undo",
  "bx-unite",
  "bx-universal-access",
  "bx-unlink",
  "bx-up-arrow",
  "bx-up-arrow-alt",
  "bx-up-arrow-circle",
  "bx-upload",
  "bx-upside-down",
  "bx-upvote",
  "bx-usb",
  "bx-user",
  "bx-user-check",
  "bx-user-circle",
  "bx-user-minus",
  "bx-user-pin",
  "bx-user-plus",
  "bx-user-voice",
  "bx-user-x",
  "bx-vector",
  "bx-vertical-bottom",
  "bx-vertical-center",
  "bx-vertical-top",
  "bx-vial",
  "bx-video",
  "bx-video-off",
  "bx-video-plus",
  "bx-video-recording",
  "bx-voicemail",
  "bx-volume",
  "bx-volume-full",
  "bx-volume-low",
  "bx-volume-mute",
  "bx-walk",
  "bx-wallet",
  "bx-wallet-alt",
  "bx-water",
  "bx-webcam",
  "bx-wifi",
  "bx-wifi-0",
  "bx-wifi-1",
  "bx-wifi-2",
  "bx-wifi-off",
  "bx-wind",
  "bx-window",
  "bx-window-alt",
  "bx-window-close",
  "bx-window-open",
  "bx-windows",
  "bx-wine",
  "bx-wink-smile",
  "bx-wink-tongue",
  "bx-won",
  "bx-world",
  "bx-wrench",
  "bx-x",
  "bx-x-circle",
  "bx-yen",
  "bx-zoom-in",
  "bx-zoom-out",
  "bxl-500px",
  "bxl-99designs",
  "bxl-adobe",
  "bxl-airbnb",
  "bxl-algolia",
  "bxl-amazon",
  "bxl-android",
  "bxl-angular",
  "bxl-apple",
  "bxl-audible",
  "bxl-aws",
  "bxl-baidu",
  "bxl-behance",
  "bxl-bing",
  "bxl-bitcoin",
  "bxl-blender",
  "bxl-blogger",
  "bxl-bootstrap",
  "bxl-c-plus-plus",
  "bxl-chrome",
  "bxl-codepen",
  "bxl-creative-commons",
  "bxl-css3",
  "bxl-dailymotion",
  "bxl-deezer",
  "bxl-dev-to",
  "bxl-deviantart",
  "bxl-digg",
  "bxl-digitalocean",
  "bxl-discord",
  "bxl-discord-alt",
  "bxl-discourse",
  "bxl-django",
  "bxl-docker",
  "bxl-dribbble",
  "bxl-dropbox",
  "bxl-drupal",
  "bxl-ebay",
  "bxl-edge",
  "bxl-etsy",
  "bxl-facebook",
  "bxl-facebook-circle",
  "bxl-facebook-square",
  "bxl-figma",
  "bxl-firebase",
  "bxl-firefox",
  "bxl-flask",
  "bxl-flickr",
  "bxl-flickr-square",
  "bxl-flutter",
  "bxl-foursquare",
  "bxl-git",
  "bxl-github",
  "bxl-gitlab",
  "bxl-gmail",
  "bxl-go-lang",
  "bxl-google",
  "bxl-google-cloud",
  "bxl-google-plus",
  "bxl-google-plus-circle",
  "bxl-graphql",
  "bxl-heroku",
  "bxl-html5",
  "bxl-imdb",
  "bxl-instagram",
  "bxl-instagram-alt",
  "bxl-internet-explorer",
  "bxl-invision",
  "bxl-java",
  "bxl-javascript",
  "bxl-joomla",
  "bxl-jquery",
  "bxl-jsfiddle",
  "bxl-kickstarter",
  "bxl-kubernetes",
  "bxl-less",
  "bxl-linkedin",
  "bxl-linkedin-square",
  "bxl-magento",
  "bxl-mailchimp",
  "bxl-markdown",
  "bxl-mastercard",
  "bxl-mastodon",
  "bxl-medium",
  "bxl-medium-old",
  "bxl-medium-square",
  "bxl-messenger",
  "bxl-meta",
  "bxl-microsoft",
  "bxl-microsoft-teams",
  "bxl-mongodb",
  "bxl-netlify",
  "bxl-nodejs",
  "bxl-ok-ru",
  "bxl-opera",
  "bxl-patreon",
  "bxl-paypal",
  "bxl-periscope",
  "bxl-php",
  "bxl-pinterest",
  "bxl-pinterest-alt",
  "bxl-play-store",
  "bxl-pocket",
  "bxl-postgresql",
  "bxl-product-hunt",
  "bxl-python",
  "bxl-quora",
  "bxl-react",
  "bxl-redbubble",
  "bxl-reddit",
  "bxl-redux",
  "bxl-sass",
  "bxl-shopify",
  "bxl-sketch",
  "bxl-skype",
  "bxl-slack",
  "bxl-slack-old",
  "bxl-snapchat",
  "bxl-soundcloud",
  "bxl-spotify",
  "bxl-spring-boot",
  "bxl-squarespace",
  "bxl-stack-overflow",
  "bxl-steam",
  "bxl-stripe",
  "bxl-tailwind-css",
  "bxl-telegram",
  "bxl-tiktok",
  "bxl-trello",
  "bxl-trip-advisor",
  "bxl-tumblr",
  "bxl-tux",
  "bxl-twitch",
  "bxl-twitter",
  "bxl-typescript",
  "bxl-unity",
  "bxl-unsplash",
  "bxl-upwork",
  "bxl-venmo",
  "bxl-vimeo",
  "bxl-visa",
  "bxl-visual-studio",
  "bxl-vk",
  "bxl-vuejs",
  "bxl-whatsapp",
  "bxl-whatsapp-square",
  "bxl-wikipedia",
  "bxl-windows",
  "bxl-wix",
  "bxl-wordpress",
  "bxl-xing",
  "bxl-yahoo",
  "bxl-yelp",
  "bxl-youtube",
  "bxl-zoom",
  "bxs-add-to-queue",
  "bxs-adjust",
  "bxs-adjust-alt",
  "bxs-alarm",
  "bxs-alarm-add",
  "bxs-alarm-exclamation",
  "bxs-alarm-off",
  "bxs-alarm-snooze",
  "bxs-album",
  "bxs-ambulance",
  "bxs-analyse",
  "bxs-angry",
  "bxs-arch",
  "bxs-archive",
  "bxs-archive-in",
  "bxs-archive-out",
  "bxs-area",
  "bxs-arrow-from-bottom",
  "bxs-arrow-from-left",
  "bxs-arrow-from-right",
  "bxs-arrow-from-top",
  "bxs-arrow-to-bottom",
  "bxs-arrow-to-left",
  "bxs-arrow-to-right",
  "bxs-arrow-to-top",
  "bxs-award",
  "bxs-baby-carriage",
  "bxs-backpack",
  "bxs-badge",
  "bxs-badge-check",
  "bxs-badge-dollar",
  "bxs-baguette",
  "bxs-ball",
  "bxs-balloon",
  "bxs-band-aid",
  "bxs-bank",
  "bxs-bar-chart-alt-2",
  "bxs-bar-chart-square",
  "bxs-barcode",
  "bxs-baseball",
  "bxs-basket",
  "bxs-basketball",
  "bxs-bath",
  "bxs-battery",
  "bxs-battery-charging",
  "bxs-battery-full",
  "bxs-battery-low",
  "bxs-bed",
  "bxs-been-here",
  "bxs-beer",
  "bxs-bell",
  "bxs-bell-minus",
  "bxs-bell-off",
  "bxs-bell-plus",
  "bxs-bell-ring",
  "bxs-bible",
  "bxs-binoculars",
  "bxs-blanket",
  "bxs-bolt",
  "bxs-bolt-circle",
  "bxs-bomb",
  "bxs-bone",
  "bxs-bong",
  "bxs-book",
  "bxs-book-add",
  "bxs-book-alt",
  "bxs-book-bookmark",
  "bxs-book-content",
  "bxs-book-heart",
  "bxs-book-open",
  "bxs-book-reader",
  "bxs-bookmark",
  "bxs-bookmark-alt",
  "bxs-bookmark-alt-minus",
  "bxs-bookmark-alt-plus",
  "bxs-bookmark-heart",
  "bxs-bookmark-minus",
  "bxs-bookmark-plus",
  "bxs-bookmark-star",
  "bxs-bookmarks",
  "bxs-bot",
  "bxs-bowl-hot",
  "bxs-bowl-rice",
  "bxs-bowling-ball",
  "bxs-box",
  "bxs-brain",
  "bxs-briefcase",
  "bxs-briefcase-alt",
  "bxs-briefcase-alt-2",
  "bxs-brightness",
  "bxs-brightness-half",
  "bxs-brush",
  "bxs-brush-alt",
  "bxs-bug",
  "bxs-bug-alt",
  "bxs-building",
  "bxs-building-house",
  "bxs-buildings",
  "bxs-bulb",
  "bxs-bullseye",
  "bxs-buoy",
  "bxs-bus",
  "bxs-bus-school",
  "bxs-business",
  "bxs-cabinet",
  "bxs-cable-car",
  "bxs-cake",
  "bxs-calculator",
  "bxs-calendar",
  "bxs-calendar-alt",
  "bxs-calendar-check",
  "bxs-calendar-edit",
  "bxs-calendar-event",
  "bxs-calendar-exclamation",
  "bxs-calendar-heart",
  "bxs-calendar-minus",
  "bxs-calendar-plus",
  "bxs-calendar-star",
  "bxs-calendar-week",
  "bxs-calendar-x",
  "bxs-camera",
  "bxs-camera-home",
  "bxs-camera-movie",
  "bxs-camera-off",
  "bxs-camera-plus",
  "bxs-capsule",
  "bxs-captions",
  "bxs-car",
  "bxs-car-battery",
  "bxs-car-crash",
  "bxs-car-garage",
  "bxs-car-mechanic",
  "bxs-car-wash",
  "bxs-card",
  "bxs-caret-down-circle",
  "bxs-caret-down-square",
  "bxs-caret-left-circle",
  "bxs-caret-left-square",
  "bxs-caret-right-circle",
  "bxs-caret-right-square",
  "bxs-caret-up-circle",
  "bxs-caret-up-square",
  "bxs-carousel",
  "bxs-cart",
  "bxs-cart-add",
  "bxs-cart-alt",
  "bxs-cart-download",
  "bxs-castle",
  "bxs-cat",
  "bxs-category",
  "bxs-category-alt",
  "bxs-cctv",
  "bxs-certification",
  "bxs-chalkboard",
  "bxs-chart",
  "bxs-chat",
  "bxs-check-circle",
  "bxs-check-shield",
  "bxs-check-square",
  "bxs-checkbox",
  "bxs-checkbox-checked",
  "bxs-checkbox-minus",
  "bxs-cheese",
  "bxs-chess",
  "bxs-chevron-down",
  "bxs-chevron-down-circle",
  "bxs-chevron-down-square",
  "bxs-chevron-left",
  "bxs-chevron-left-circle",
  "bxs-chevron-left-square",
  "bxs-chevron-right",
  "bxs-chevron-right-circle",
  "bxs-chevron-right-square",
  "bxs-chevron-up",
  "bxs-chevron-up-circle",
  "bxs-chevron-up-square",
  "bxs-chevrons-down",
  "bxs-chevrons-left",
  "bxs-chevrons-right",
  "bxs-chevrons-up",
  "bxs-chip",
  "bxs-church",
  "bxs-circle",
  "bxs-circle-half",
  "bxs-circle-quarter",
  "bxs-circle-three-quarter",
  "bxs-city",
  "bxs-clinic",
  "bxs-cloud",
  "bxs-cloud-download",
  "bxs-cloud-lightning",
  "bxs-cloud-rain",
  "bxs-cloud-upload",
  "bxs-coffee",
  "bxs-coffee-alt",
  "bxs-coffee-bean",
  "bxs-coffee-togo",
  "bxs-cog",
  "bxs-coin",
  "bxs-coin-stack",
  "bxs-collection",
  "bxs-color",
  "bxs-color-fill",
  "bxs-comment",
  "bxs-comment-add",
  "bxs-comment-check",
  "bxs-comment-detail",
  "bxs-comment-dots",
  "bxs-comment-edit",
  "bxs-comment-error",
  "bxs-comment-minus",
  "bxs-comment-x",
  "bxs-compass",
  "bxs-component",
  "bxs-confused",
  "bxs-contact",
  "bxs-conversation",
  "bxs-cookie",
  "bxs-cool",
  "bxs-copy",
  "bxs-copy-alt",
  "bxs-copyright",
  "bxs-coupon",
  "bxs-credit-card",
  "bxs-credit-card-alt",
  "bxs-credit-card-front",
  "bxs-cricket-ball",
  "bxs-crop",
  "bxs-crown",
  "bxs-cube",
  "bxs-cube-alt",
  "bxs-cuboid",
  "bxs-customize",
  "bxs-cylinder",
  "bxs-dashboard",
  "bxs-data",
  "bxs-detail",
  "bxs-devices",
  "bxs-diamond",
  "bxs-dice-1",
  "bxs-dice-2",
  "bxs-dice-3",
  "bxs-dice-4",
  "bxs-dice-5",
  "bxs-dice-6",
  "bxs-direction-left",
  "bxs-direction-right",
  "bxs-directions",
  "bxs-disc",
  "bxs-discount",
  "bxs-dish",
  "bxs-dislike",
  "bxs-dizzy",
  "bxs-dock-bottom",
  "bxs-dock-left",
  "bxs-dock-right",
  "bxs-dock-top",
  "bxs-dog",
  "bxs-dollar-circle",
  "bxs-donate-blood",
  "bxs-donate-heart",
  "bxs-door-open",
  "bxs-doughnut-chart",
  "bxs-down-arrow",
  "bxs-down-arrow-alt",
  "bxs-down-arrow-circle",
  "bxs-down-arrow-square",
  "bxs-download",
  "bxs-downvote",
  "bxs-drink",
  "bxs-droplet",
  "bxs-droplet-half",
  "bxs-dryer",
  "bxs-duplicate",
  "bxs-edit",
  "bxs-edit-alt",
  "bxs-edit-location",
  "bxs-eject",
  "bxs-envelope",
  "bxs-envelope-open",
  "bxs-eraser",
  "bxs-error",
  "bxs-error-alt",
  "bxs-error-circle",
  "bxs-ev-station",
  "bxs-exit",
  "bxs-extension",
  "bxs-eyedropper",
  "bxs-face",
  "bxs-face-mask",
  "bxs-factory",
  "bxs-fast-forward-circle",
  "bxs-file",
  "bxs-file-archive",
  "bxs-file-blank",
  "bxs-file-css",
  "bxs-file-doc",
  "bxs-file-export",
  "bxs-file-find",
  "bxs-file-gif",
  "bxs-file-html",
  "bxs-file-image",
  "bxs-file-import",
  "bxs-file-jpg",
  "bxs-file-js",
  "bxs-file-json",
  "bxs-file-md",
  "bxs-file-pdf",
  "bxs-file-plus",
  "bxs-file-png",
  "bxs-file-txt",
  "bxs-film",
  "bxs-filter-alt",
  "bxs-first-aid",
  "bxs-flag",
  "bxs-flag-alt",
  "bxs-flag-checkered",
  "bxs-flame",
  "bxs-flask",
  "bxs-florist",
  "bxs-folder",
  "bxs-folder-minus",
  "bxs-folder-open",
  "bxs-folder-plus",
  "bxs-food-menu",
  "bxs-fridge",
  "bxs-game",
  "bxs-gas-pump",
  "bxs-ghost",
  "bxs-gift",
  "bxs-graduation",
  "bxs-grid",
  "bxs-grid-alt",
  "bxs-group",
  "bxs-guitar-amp",
  "bxs-hand",
  "bxs-hand-down",
  "bxs-hand-left",
  "bxs-hand-right",
  "bxs-hand-up",
  "bxs-happy",
  "bxs-happy-alt",
  "bxs-happy-beaming",
  "bxs-happy-heart-eyes",
  "bxs-hard-hat",
  "bxs-hdd",
  "bxs-heart",
  "bxs-heart-circle",
  "bxs-heart-square",
  "bxs-help-circle",
  "bxs-hide",
  "bxs-home",
  "bxs-home-alt-2",
  "bxs-home-circle",
  "bxs-home-heart",
  "bxs-home-smile",
  "bxs-hot",
  "bxs-hotel",
  "bxs-hourglass",
  "bxs-hourglass-bottom",
  "bxs-hourglass-top",
  "bxs-id-card",
  "bxs-image",
  "bxs-image-add",
  "bxs-image-alt",
  "bxs-inbox",
  "bxs-info-circle",
  "bxs-info-square",
  "bxs-injection",
  "bxs-institution",
  "bxs-invader",
  "bxs-joystick",
  "bxs-joystick-alt",
  "bxs-joystick-button",
  "bxs-key",
  "bxs-keyboard",
  "bxs-label",
  "bxs-landmark",
  "bxs-landscape",
  "bxs-laugh",
  "bxs-layer",
  "bxs-layer-minus",
  "bxs-layer-plus",
  "bxs-layout",
  "bxs-leaf",
  "bxs-left-arrow",
  "bxs-left-arrow-alt",
  "bxs-left-arrow-circle",
  "bxs-left-arrow-square",
  "bxs-left-down-arrow-circle",
  "bxs-left-top-arrow-circle",
  "bxs-lemon",
  "bxs-like",
  "bxs-location-plus",
  "bxs-lock",
  "bxs-lock-alt",
  "bxs-lock-open",
  "bxs-lock-open-alt",
  "bxs-log-in",
  "bxs-log-in-circle",
  "bxs-log-out",
  "bxs-log-out-circle",
  "bxs-low-vision",
  "bxs-magic-wand",
  "bxs-magnet",
  "bxs-map",
  "bxs-map-alt",
  "bxs-map-pin",
  "bxs-mask",
  "bxs-medal",
  "bxs-megaphone",
  "bxs-meh",
  "bxs-meh-alt",
  "bxs-meh-blank",
  "bxs-memory-card",
  "bxs-message",
  "bxs-message-add",
  "bxs-message-alt",
  "bxs-message-alt-add",
  "bxs-message-alt-check",
  "bxs-message-alt-detail",
  "bxs-message-alt-dots",
  "bxs-message-alt-edit",
  "bxs-message-alt-error",
  "bxs-message-alt-minus",
  "bxs-message-alt-x",
  "bxs-message-check",
  "bxs-message-detail",
  "bxs-message-dots",
  "bxs-message-edit",
  "bxs-message-error",
  "bxs-message-minus",
  "bxs-message-rounded",
  "bxs-message-rounded-add",
  "bxs-message-rounded-check",
  "bxs-message-rounded-detail",
  "bxs-message-rounded-dots",
  "bxs-message-rounded-edit",
  "bxs-message-rounded-error",
  "bxs-message-rounded-minus",
  "bxs-message-rounded-x",
  "bxs-message-square",
  "bxs-message-square-add",
  "bxs-message-square-check",
  "bxs-message-square-detail",
  "bxs-message-square-dots",
  "bxs-message-square-edit",
  "bxs-message-square-error",
  "bxs-message-square-minus",
  "bxs-message-square-x",
  "bxs-message-x",
  "bxs-meteor",
  "bxs-microchip",
  "bxs-microphone",
  "bxs-microphone-alt",
  "bxs-microphone-off",
  "bxs-minus-circle",
  "bxs-minus-square",
  "bxs-mobile",
  "bxs-mobile-vibration",
  "bxs-moon",
  "bxs-mouse",
  "bxs-mouse-alt",
  "bxs-movie",
  "bxs-movie-play",
  "bxs-music",
  "bxs-navigation",
  "bxs-network-chart",
  "bxs-news",
  "bxs-no-entry",
  "bxs-note",
  "bxs-notepad",
  "bxs-notification",
  "bxs-notification-off",
  "bxs-objects-horizontal-center",
  "bxs-objects-horizontal-left",
  "bxs-objects-horizontal-right",
  "bxs-objects-vertical-bottom",
  "bxs-objects-vertical-center",
  "bxs-objects-vertical-top",
  "bxs-offer",
  "bxs-package",
  "bxs-paint",
  "bxs-paint-roll",
  "bxs-palette",
  "bxs-paper-plane",
  "bxs-parking",
  "bxs-party",
  "bxs-paste",
  "bxs-pear",
  "bxs-pen",
  "bxs-pencil",
  "bxs-phone",
  "bxs-phone-call",
  "bxs-phone-incoming",
  "bxs-phone-off",
  "bxs-phone-outgoing",
  "bxs-photo-album",
  "bxs-piano",
  "bxs-pie-chart",
  "bxs-pie-chart-alt",
  "bxs-pie-chart-alt-2",
  "bxs-pin",
  "bxs-pizza",
  "bxs-plane",
  "bxs-plane-alt",
  "bxs-plane-land",
  "bxs-plane-take-off",
  "bxs-planet",
  "bxs-playlist",
  "bxs-plug",
  "bxs-plus-circle",
  "bxs-plus-square",
  "bxs-pointer",
  "bxs-polygon",
  "bxs-popsicle",
  "bxs-printer",
  "bxs-purchase-tag",
  "bxs-purchase-tag-alt",
  "bxs-pyramid",
  "bxs-quote-alt-left",
  "bxs-quote-alt-right",
  "bxs-quote-left",
  "bxs-quote-right",
  "bxs-quote-single-left",
  "bxs-quote-single-right",
  "bxs-radiation",
  "bxs-radio",
  "bxs-receipt",
  "bxs-rectangle",
  "bxs-registered",
  "bxs-rename",
  "bxs-report",
  "bxs-rewind-circle",
  "bxs-right-arrow",
  "bxs-right-arrow-alt",
  "bxs-right-arrow-circle",
  "bxs-right-arrow-square",
  "bxs-right-down-arrow-circle",
  "bxs-right-top-arrow-circle",
  "bxs-rocket",
  "bxs-ruler",
  "bxs-sad",
  "bxs-save",
  "bxs-school",
  "bxs-search",
  "bxs-search-alt-2",
  "bxs-select-multiple",
  "bxs-send",
  "bxs-server",
  "bxs-shapes",
  "bxs-share",
  "bxs-share-alt",
  "bxs-shield",
  "bxs-shield-alt-2",
  "bxs-shield-minus",
  "bxs-shield-plus",
  "bxs-shield-x",
  "bxs-ship",
  "bxs-shocked",
  "bxs-shopping-bag",
  "bxs-shopping-bag-alt",
  "bxs-shopping-bags",
  "bxs-show",
  "bxs-shower",
  "bxs-skip-next-circle",
  "bxs-skip-previous-circle",
  "bxs-skull",
  "bxs-sleepy",
  "bxs-slideshow",
  "bxs-smile",
  "bxs-sort-alt",
  "bxs-spa",
  "bxs-speaker",
  "bxs-spray-can",
  "bxs-spreadsheet",
  "bxs-square",
  "bxs-square-rounded",
  "bxs-star",
  "bxs-star-half",
  "bxs-sticker",
  "bxs-stopwatch",
  "bxs-store",
  "bxs-store-alt",
  "bxs-sun",
  "bxs-sushi",
  "bxs-t-shirt",
  "bxs-tachometer",
  "bxs-tag",
  "bxs-tag-alt",
  "bxs-tag-x",
  "bxs-taxi",
  "bxs-tennis-ball",
  "bxs-terminal",
  "bxs-thermometer",
  "bxs-time",
  "bxs-time-five",
  "bxs-timer",
  "bxs-tired",
  "bxs-to-top",
  "bxs-toggle-left",
  "bxs-toggle-right",
  "bxs-tone",
  "bxs-torch",
  "bxs-traffic",
  "bxs-traffic-barrier",
  "bxs-traffic-cone",
  "bxs-train",
  "bxs-trash",
  "bxs-trash-alt",
  "bxs-tree",
  "bxs-tree-alt",
  "bxs-trophy",
  "bxs-truck",
  "bxs-tv",
  "bxs-universal-access",
  "bxs-up-arrow",
  "bxs-up-arrow-alt",
  "bxs-up-arrow-circle",
  "bxs-up-arrow-square",
  "bxs-upside-down",
  "bxs-upvote",
  "bxs-user",
  "bxs-user-account",
  "bxs-user-badge",
  "bxs-user-check",
  "bxs-user-circle",
  "bxs-user-detail",
  "bxs-user-minus",
  "bxs-user-pin",
  "bxs-user-plus",
  "bxs-user-rectangle",
  "bxs-user-voice",
  "bxs-user-x",
  "bxs-vector",
  "bxs-vial",
  "bxs-video",
  "bxs-video-off",
  "bxs-video-plus",
  "bxs-video-recording",
  "bxs-videos",
  "bxs-virus",
  "bxs-virus-block",
  "bxs-volume",
  "bxs-volume-full",
  "bxs-volume-low",
  "bxs-volume-mute",
  "bxs-wallet",
  "bxs-wallet-alt",
  "bxs-washer",
  "bxs-watch",
  "bxs-watch-alt",
  "bxs-webcam",
  "bxs-widget",
  "bxs-window-alt",
  "bxs-wine",
  "bxs-wink-smile",
  "bxs-wink-tongue",
  "bxs-wrench",
  "bxs-x-circle",
  "bxs-x-square",
  "bxs-yin-yang",
  "bxs-zap",
  "bxs-zoom-in",
  "bxs-zoom-out"
];
  iconPicker.innerHTML = icons.map(icon => {
    const active = icon === selected;
    return `<button type="button" class="icon-option ${active ? 'active' : ''}" data-icon="${icon}"><i class='bx ${icon}'></i></button>`;
  }).join('');
  iconPicker.querySelectorAll('.icon-option').forEach(btn => btn.addEventListener('click', () => {
    selectedCustomIcon = btn.dataset.icon;
    renderIconPicker(selectedCustomIcon);
    toggleFadeOverlay(document.getElementById('iconPickerOverlay'), false);
  }));
}

function resetCustomActionForm() {
  const label = document.getElementById('customActionLabel');
  const color = document.getElementById('customActionColor');
  const title = document.getElementById('customActionTitle');
  const subtitle = document.getElementById('customActionSubtitle');
  editingCustomActionId = null;
  if (label) label.value = '';
  if (color) color.value = '#38bdf8';
  if (title) title.textContent = 'Crear acción personalizada';
  if (subtitle) subtitle.textContent = 'Nueva acción';
  selectedCustomIcon = 'bx-check-circle';
  renderIconPicker();
}

function startCustomActionEdit(action = null) {
  const label = document.getElementById('customActionLabel');
  const color = document.getElementById('customActionColor');
  const title = document.getElementById('customActionTitle');
  const subtitle = document.getElementById('customActionSubtitle');
  if (!label || !color || !title || !subtitle) return;
  editingCustomActionId = action?.id || null;
  label.value = action?.label || '';
  color.value = action?.color || '#38bdf8';
  selectedCustomIcon = action?.icon || 'bx-check-circle';
  title.textContent = action ? 'Editar acción personalizada' : 'Crear acción personalizada';
  subtitle.textContent = action ? 'Editar acción' : 'Nueva acción';
  renderIconPicker(selectedCustomIcon);
}

function hideCustomActionForm() {
  const wizardOverlay = document.getElementById('customActionOverlay');
  toggleFadeOverlay(wizardOverlay, false);
}

function saveCustomAction() {
  const label = document.getElementById('customActionLabel');
  const color = document.getElementById('customActionColor');
  if (!label || !color) return;
  const trimmed = (label.value || '').trim();
  if (!trimmed) {
    showToast('Agrega un nombre para la acción personalizada.', 'error');
    return;
  }
  const actionData = {
    id: editingCustomActionId || `custom-${Date.now()}`,
    label: trimmed,
    color: color.value || '#38bdf8',
    icon: selectedCustomIcon,
    visible: true
  };
  const existing = getCustomActionById(actionData.id);
  if (existing) {
    clientManagerState.customActions = (clientManagerState.customActions || []).map(action => action.id === actionData.id ? { ...action, ...actionData } : action);
  } else {
    clientManagerState.customActions = [...(clientManagerState.customActions || []), actionData];
  }
  persist();
  renderActionCustomizer();
  renderClientManager();
  hideCustomActionForm();
  resetCustomActionForm();
  showToast('Acción personalizada guardada', 'success');
}

function renderColumnToggles() {
  const container = document.getElementById('columnToggles');
  if (!container) return;
  const groupToggle = `
    <label class="pill pill-toggle" title="Agrupar registros por modelo de vehículo">
      <input type="checkbox" id="groupByModel" ${clientManagerState.groupByModel ? 'checked' : ''} />
      <span>Agrupar por modelo</span>
    </label>
  `;
  const columnToggles = Object.entries(clientColumns).map(([key, col]) => {
    const active = clientManagerState.columnVisibility[key];
    return `<label class="pill ${active ? 'badge' : ''}" data-key="${key}">
      <input type="checkbox" ${active ? 'checked' : ''} data-column-key="${key}" />
      <span>${col.label}</span>
    </label>`;
  }).join('');
  container.innerHTML = `${groupToggle}${columnToggles}`;

  container.querySelectorAll('input[data-column-key]').forEach(cb => cb.addEventListener('change', () => {
    const key = cb.dataset.columnKey;
    if (!key) return;
    clientManagerState.columnVisibility[key] = cb.checked;
    persist();
    renderClientManager();
  }));

  const groupToggleInput = container.querySelector('#groupByModel');
  if (groupToggleInput) {
    groupToggleInput.addEventListener('change', () => {
      clientManagerState.groupByModel = groupToggleInput.checked;
      clientManagerState.pagination.page = 1;
      persist();
      renderClientManager();
    });
  }
}

function openClientNotes(id) {
  const modal = document.getElementById('clientNoteModal');
  const title = document.getElementById('clientNoteTitle');
  const subtitle = document.getElementById('clientNoteSubtitle');
  const textarea = document.getElementById('clientNoteText');
  const client = managerClients.find(c => c.id === id);
  if (!modal || !textarea || !client) return;
  activeNoteClientId = id;
  if (title) title.textContent = client.name || 'Cliente';
  if (subtitle) subtitle.textContent = client.model ? `Modelo: ${client.model}` : '';
  textarea.value = hasNotes(client) ? client.type : '';
  modal.classList.add('show');
  modal.classList.remove('hidden');
  textarea.focus();
}

function closeClientNotes() {
  const modal = document.getElementById('clientNoteModal');
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 200);
  activeNoteClientId = null;
}

function saveClientNotes() {
  const textarea = document.getElementById('clientNoteText');
  if (!activeNoteClientId || !textarea) {
    closeClientNotes();
    return;
  }
  const client = managerClients.find(c => c.id === activeNoteClientId);
  if (!client) {
    closeClientNotes();
    return;
  }
  client.type = normalizeNotesValue(textarea.value);
  persist();
  renderClientManager();
  showToast('Notas actualizadas', 'success');
  closeClientNotes();
}

function bindNoteModal() {
  const modal = document.getElementById('clientNoteModal');
  if (!modal) return;
  const closeButtons = [document.getElementById('clientNoteClose'), document.getElementById('clientNoteCancel')];
  closeButtons.forEach(btn => {
    if (btn && !btn.dataset.bound) {
      btn.addEventListener('click', closeClientNotes);
      btn.dataset.bound = 'true';
    }
  });
  const saveBtn = document.getElementById('clientNoteSave');
  if (saveBtn && !saveBtn.dataset.bound) {
    saveBtn.addEventListener('click', saveClientNotes);
    saveBtn.dataset.bound = 'true';
  }
}

function normalizeCell(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return (value || '').toString().trim();
}

function columnIndexToLetter(index) {
  let dividend = index + 1;
  let label = '';
  while (dividend > 0) {
    const modulo = (dividend - 1) % 26;
    label = String.fromCharCode(65 + modulo) + label;
    dividend = Math.floor((dividend - modulo) / 26);
  }
  return label;
}

function formatDateForMapping(value) {
  const iso = formatDateISO(value);
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}-${m}-${y}`;
}

function isLikelyDateSample(value) {
  if (value instanceof Date) return true;
  if (typeof value === 'number') return value > 20000 && value < 60000;
  if (typeof value === 'string') {
    if (value.match(/[\/-]/)) return true;
    const numeric = Number(value);
    if (Number.isFinite(numeric) && numeric > 20000 && numeric < 60000) return true;
  }
  return false;
}

function buildSampleForField(fieldId, sampleValue) {
  if (!sampleValue) return '';
  if (isLikelyDateSample(sampleValue)) {
    const formattedDate = formatDateForMapping(sampleValue);
    if (formattedDate) return formattedDate;
  }
  return sampleValue;
}

function buildImportColumns(headerRow, rows) {
  const columnCount = Math.max(headerRow?.length || 0, ...rows.map(r => (r || []).length));
  const sampleRow = rows.find(r => Array.isArray(r) && r.some(cell => normalizeCell(cell))) || [];
  return Array.from({ length: columnCount }, (_, idx) => {
    const header = (headerRow?.[idx] || '').toString();
    const normalized = header.trim().toUpperCase();
    const sample = normalizeCell(sampleRow[idx] ?? '');
    const display = header ? header : `Sin cabezal (Col ${idx + 1})`;
    const letter = columnIndexToLetter(idx);
    return { index: idx, header, normalized, sample, display, letter };
  });
}

function guessImportMapping(columns) {
  const mapping = {};
  const used = new Set();
  columns.forEach((col) => {
    const property = headerMap[col.normalized];
    if (!property || used.has(col.index)) return;
    const field = importAllFields.find(f => f.id === property);
    if (field) {
      mapping[field.id] = col.index;
      used.add(col.index);
    }
  });
  return mapping;
}

function buildHeadersFromMapping(mapping, columnCount) {
  const headers = Array.from({ length: columnCount }, () => '');
  importAllFields.forEach((field) => {
    const idx = mapping[field.id];
    if (typeof idx === 'number') {
      headers[idx] = field.headerKey;
    }
  });
  return headers;
}

function openImportMappingModal(headerRow, rows, columns, guessedMapping = {}) {
  return new Promise((resolve) => {
    const modal = document.getElementById('importMappingModal');
    if (!modal) {
      const fallbackMapping = { ...guessedMapping };
      if (Object.keys(fallbackMapping).length === importRequiredFields.length) {
        resolve(fallbackMapping);
      } else {
        showToast('No se pudo abrir el asistente de cabezales.', 'error');
        resolve(null);
      }
      return;
    }

    const hint = document.getElementById('importMappingHint');
    const fieldsContainer = document.getElementById('importMappingFields');
    const confirmBtn = document.getElementById('importMappingConfirm');
    const cancelBtn = document.getElementById('importMappingCancel');
    const closeBtn = document.getElementById('importMappingClose');
    const status = document.getElementById('importMappingStatus');

    const fieldCatalog = importAllFields.map(field => ({
      ...field,
      required: importRequiredFields.some(req => req.id === field.id)
    }));

    const recognized = columns.filter(col => headerMap[col.normalized]);
    if (hint) {
      const recognizedText = recognized.length
        ? `Detectamos ${recognized.length} cabezales con nombre conocido. Ajusta manualmente si algo está desordenado.`
        : 'No detectamos cabezales conocidos. Asigna cada campo obligatorio usando las columnas disponibles.';
      const extra = headerRow?.length ? ` Total de columnas: ${columns.length}.` : '';
      hint.innerHTML = `${recognizedText}${extra}<br><strong>Los datos no vinculados serán descartados.</strong>`;
    }

    const buildOptionLabel = (field, col) => {
      const headerLabel = col.header || col.display;
      const sample = buildSampleForField(field.id, col.sample);
      const sampleText = sample ? ` — Ej: ${sample}` : '';
      return `(${col.letter}1) ${headerLabel}${sampleText}`;
    };

    const optionsHtml = (field, selected) => {
      const placeholder = field.required
        ? '<option value="">Selecciona la columna</option>'
        : '<option value="">Selecciona la columna / Ignorar selección</option>';
      const options = columns.map(col => {
        const label = buildOptionLabel(field, col);
        const checked = selected === col.index ? 'selected' : '';
        return `<option value="${col.index}" ${checked}>${label}</option>`;
      });
      return placeholder + options.join('');
    };

    if (fieldsContainer) {
      fieldsContainer.innerHTML = fieldCatalog.map((field) => {
        const selectId = `import-map-${field.id}`;
        const prefill = guessedMapping[field.id];
        const pillLabel = field.required ? 'Obligatorio' : 'Opcional';
        const pillClass = field.required ? 'pill required' : 'pill optional';
        return `
          <div class="mapping-field" data-field="${field.id}" data-required="${field.required ? 'true' : 'false'}">
            <div class="label"><span>${field.label}</span><span class="${pillClass}">${pillLabel}</span></div>
            <p class="muted">${field.helper}</p>
            <select id="${selectId}">${optionsHtml(field, prefill)}</select>
          </div>`;
      }).join('');
    }

    const cleanup = (result) => {
      toggleModal(modal, false);
      if (confirmBtn) confirmBtn.onclick = null;
      if (cancelBtn) cancelBtn.onclick = null;
      if (closeBtn) closeBtn.onclick = null;
      resolve(result);
    };

    const resetCardState = (card) => {
      if (!card) return;
      card.classList.remove('valid', 'invalid', 'duplicate', 'missing');
    };

    const flagCard = (card, state) => {
      resetCardState(card);
      if (!card) return;
      if (state === 'missing') card.classList.add('invalid', 'missing');
      else if (state === 'duplicate') card.classList.add('invalid', 'duplicate');
      else if (state === 'valid') card.classList.add('valid');
    };

    const describeColumn = (colIdx) => {
      const col = columns.find(c => c.index === Number(colIdx));
      if (!col) return `Columna ${Number(colIdx) + 1}`;
      const headerLabel = col.header || col.display;
      return `(${col.letter}1) ${headerLabel}`;
    };

    const evaluateMapping = (showStatus = true) => {
      const mapping = {};
      const usedColumns = new Map();
      let missing = false;

      fieldCatalog.forEach((field) => {
        const select = document.getElementById(`import-map-${field.id}`);
        const value = select?.value ?? '';
        const card = fieldsContainer?.querySelector(`[data-field="${field.id}"]`);
        if (!value) {
          if (field.required) {
            missing = true;
            flagCard(card, 'missing');
          } else {
            resetCardState(card);
          }
          return;
        }
        const idx = Number(value);
        mapping[field.id] = idx;
        const existing = usedColumns.get(idx) || [];
        existing.push(field);
        usedColumns.set(idx, existing);
        flagCard(card, 'valid');
      });

      const duplicates = [];
      usedColumns.forEach((fields, colIdx) => {
        if (fields.length > 1) {
          duplicates.push({ colIdx, fields });
          fields.forEach((field) => {
            const card = fieldsContainer?.querySelector(`[data-field="${field.id}"]`);
            flagCard(card, 'duplicate');
          });
        }
      });

      const messages = [];
      if (duplicates.length) {
        duplicates.forEach((dup) => {
          const columnLabel = describeColumn(dup.colIdx);
          const fieldNames = dup.fields.map(f => f.label).join(' - ');
          messages.push(`El campo ${columnLabel} está siendo utilizado ${dup.fields.length} veces en los campos: ${fieldNames}.`);
        });
      }
      if (missing) {
        messages.push('Asigna todos los campos obligatorios destacados en rojo.');
      }

      if (status) {
        if (!messages.length) {
          status.textContent = 'Asignación lista para importar.';
          status.className = 'mapping-status success';
        } else {
          status.textContent = messages.join(' ');
          status.className = 'mapping-status error';
        }
      }

      return { mapping, duplicates, missing };
    };

    if (confirmBtn) {
      confirmBtn.onclick = () => {
        const result = evaluateMapping();
        if (result.duplicates.length || result.missing) return;
        cleanup(result.mapping);
      };
    }
    if (cancelBtn) cancelBtn.onclick = () => cleanup(null);
    if (closeBtn) closeBtn.onclick = () => cleanup(null);

    fieldsContainer?.querySelectorAll('select')?.forEach(select => {
      select.addEventListener('change', () => evaluateMapping());
    });

    toggleModal(modal, true);
    evaluateMapping();
  });
}

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
  'FECHA/HORA DE CONTACTO': 'contactDate',
  'CONTACTO': 'contactDate',
  'CONTACT_DATE': 'contactDate',
  'FECHA1': 'purchaseDate',
  'CP': 'postalCode',
  'TIPO': 'type'
};

const importRequiredFields = [
  { id: 'name', headerKey: 'NOMBRE', label: 'Nombre del cliente', helper: 'Selecciona qué columna contiene los nombres de los clientes.' },
  { id: 'document', headerKey: 'DOC', label: 'DNI del cliente', helper: 'Selecciona qué columna contiene el DNI.' },
  { id: 'birthDate', headerKey: 'FECNAC', label: 'Fecha de nacimiento', helper: 'Selecciona qué columna contiene la fecha de nacimiento.' },
  { id: 'city', headerKey: 'OLOC', label: 'Localidad', helper: 'Selecciona qué columna contiene la localidad del cliente.' },
  { id: 'province', headerKey: 'OPCIA', label: 'Provincia', helper: 'Selecciona qué columna contiene la provincia.' },
  { id: 'postalCode', headerKey: 'CP', label: 'Código Postal', helper: 'Selecciona qué columna contiene el código postal.' },
  { id: 'phone', headerKey: 'CELULAR12', label: 'Celular', helper: 'Selecciona qué columna contiene el celular del cliente.' },
  { id: 'purchaseDate', headerKey: 'FECHA1', label: 'Fecha de compra del coche', helper: 'Selecciona qué columna contiene la fecha de compra.' },
  { id: 'brand', headerKey: 'MARCA', label: 'Marca del coche', helper: 'Selecciona qué columna contiene la marca.' },
  { id: 'model', headerKey: 'MODELO', label: 'Modelo del coche', helper: 'Selecciona qué columna contiene el modelo.' },
  { id: 'cuit', headerKey: 'CUIT0', label: 'CUIT', helper: 'Selecciona qué columna contiene el CUIT del cliente.' }
];

const importOptionalFields = [
  { id: 'type', headerKey: 'TIPO', label: 'Notas (opcional)', helper: 'Puedes asignar esta columna si deseas importar las notas.' }
];

const importAllFields = [...importRequiredFields, ...importOptionalFields];

function mapRow(row, headers, systemDate = '') {

  const mapped = { flags: {}, selected: false };
  headers.forEach((h, idx) => {
    const normalized = (h || '').toString().trim().toUpperCase();
    const key = headerMap[normalized];
    if (key) {
      const rawValue = row[idx];
      if (key === 'purchaseDate' || key === 'birthDate') {
        mapped[key] = formatDateISO(rawValue) || normalizeCell(rawValue);
      } else if (key === 'contactDate') {
        mapped[key] = normalizeDateTime(rawValue);
      } else {
        mapped[key] = normalizeCell(rawValue);
      }
    }
  });
  mapped.id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  mapped.name = mapped.name || 'Sin nombre';
  mapped.model = mapped.model || 'Sin modelo';
  mapped.phone = normalizePhone(mapped.phone || '');
  mapped.type = normalizeNotesValue(mapped.type);
  mapped.systemDate = systemDate;
  return mapped;
}

function handleClientImport(file, importDate = '') {
  const reader = new FileReader();
  reader.onload = async (ev) => {
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

      const columns = buildImportColumns(headerRow, rows);
      const guessedMapping = guessImportMapping(columns);

      const processImport = (headersToUse, dataRows, showWarning = false) => {
        const existingKeys = new Set(managerClients.map(c => `${(c.name || '').toLowerCase().trim()}|${normalizePhone(c.phone)}`));
        let imported = 0;
        dataRows.forEach(r => {
          const mapped = mapRow(r, headersToUse, importDate);
          const key = `${mapped.name.toLowerCase().trim()}|${normalizePhone(mapped.phone)}`;
          if (existingKeys.has(key)) {
            return;
          }
          existingKeys.add(key);
          imported += 1;
          managerClients.push(mapped);
        });
        persist();
        renderClientManager();
        renderStats();
        const extra = showWarning ? ' (usando asignación manual)' : '';
        showToast(`Se han importado ${imported} clientes correctamente${extra}.`, 'success');
      };

      const mapping = await openImportMappingModal(headerRow, rows, columns, guessedMapping);
      if (!mapping) return;
      const headersToUse = buildHeadersFromMapping(mapping, columns.length);
      const showWarning = Object.keys(guessedMapping).length !== importRequiredFields.length;
      processImport(headersToUse, rows, showWarning);
    } catch (err) {
      console.error(err);
      showToast('No se pudo procesar el Excel.', 'error');
    }
  };
  reader.readAsArrayBuffer(file);
}

function statusCounters() {
  const totals = { all: managerClients.length, contacted: 0, no_number: 0, favorite: 0, pending: 0, customs: {} };
  managerClients.forEach((client) => {
    const status = clientStatus(client);
    if (status.className === 'status-custom' && client.flags?.customStatus?.id) {
      const customId = client.flags.customStatus.id;
      totals.customs[customId] = (totals.customs[customId] || 0) + 1;
      return;
    }
    if (status.className === 'status-contacted') totals.contacted += 1;
    else if (status.className === 'status-no-number') totals.no_number += 1;
    else if (status.className === 'status-favorite') totals.favorite += 1;
    else totals.pending += 1;
  });
  return totals;
}

function renderStatusFilter() {
  const select = document.getElementById('statusFilter');
  const label = document.getElementById('statusFilterLabel');
  if (!select) return;
  const counts = statusCounters();
  const options = [
    { value: 'all', label: 'Todos', count: counts.all },
    { value: 'contacted', label: 'Contactados', count: counts.contacted },
    { value: 'no_number', label: 'Número no disponible', count: counts.no_number },
    { value: 'favorite', label: 'Favoritos', count: counts.favorite },
    { value: 'pending', label: 'Pendientes', count: counts.pending },
    ...Object.entries(counts.customs || {}).map(([id, count]) => {
      const custom = getCustomActionById(id);
      const label = custom?.label || 'Acción personalizada';
      return { value: `custom:${id}`, label, count };
    })
  ];
  select.innerHTML = options.map(opt => `<option value="${opt.value}">${opt.label} (${opt.count})</option>`).join('');
  if (!options.some(opt => opt.value === clientManagerState.statusFilter)) {
    clientManagerState.statusFilter = 'all';
  }
  select.value = clientManagerState.statusFilter;
  const current = options.find(opt => opt.value === select.value) || options[0];
  if (label) label.textContent = `${current.label} (${current.count})`;
}

function renderDateFilterHelper() {
  const helper = document.getElementById('dateFilterHelper');
  if (!helper) return;
  const { from, to } = clientManagerState.dateRange || {};
  if (!from && !to) {
    helper.textContent = '';
    helper.classList.add('hidden');
    return;
  }
  helper.classList.remove('hidden');
  const fromLabel = from ? formatDateLabel(from) : 'Inicio';
  const toLabel = to ? formatDateLabel(to) : 'Actualidad';
  helper.innerHTML = `<span class="date-filter-badge">Rango activo: <strong>${fromLabel} → ${toLabel}</strong><button class="ghost-btn mini-btn" id="clearDateFilterInline"><i class='bx bx-x'></i>Limpiar</button></span>`;
  const clearInline = document.getElementById('clearDateFilterInline');
  if (clearInline) {
    clearInline.onclick = () => {
      clientManagerState.dateRange = { from: '', to: '' };
      clientManagerState.pagination.page = 1;
      persist();
      renderClientManager();
    };
  }
}

function renderSearchNotice() {
  const notice = document.getElementById('clientSearchNotice');
  if (!notice) return;
  const term = (clientManagerState.search || '').trim();
  if (!term) {
    notice.classList.add('hidden');
    return;
  }
  const termLabel = document.getElementById('clientSearchTerm');
  const resetBtn = document.getElementById('clientSearchReset');
  if (termLabel) termLabel.textContent = `"${term}"`;
  notice.classList.remove('hidden');
  if (resetBtn) {
    resetBtn.onclick = () => {
      clientManagerState.search = '';
      const input = document.getElementById('clientManagerSearch');
      if (input) input.value = '';
      clientManagerState.pagination.page = 1;
      persist();
      renderClientManager();
    };
  }
}

function clientSearchHaystack(client) {
  const status = clientStatus(client).label;
  const values = [
    client.name,
    client.model,
    client.brand,
    client.city,
    client.province,
    client.document,
    client.cuit,
    client.phone,
    normalizePhone(client.phone),
    client.postalCode,
    normalizeNotesValue(client.type),
    formatDateForDisplay(client.birthDate),
    formatDateForDisplay(client.purchaseDate),
    formatDateForDisplay(client.systemDate),
    formatDateTimeForDisplay(client.contactDate),
    status
  ];
  return values.filter(Boolean).map(v => v.toString().toLowerCase()).join(' ');
}

function filteredManagerClients() {
  const search = (clientManagerState.search || '').toLowerCase();
  const searchActive = !!search;
  return managerClients.filter(c => {
    const status = clientStatus(c).label;
    const matchesSearch = !search || clientSearchHaystack(c).includes(search);
    const matchesDate = searchActive ? true : isWithinDateRange(c.systemDate, clientManagerState.dateRange);
    const matchesStatus = searchActive ? true : (
      clientManagerState.statusFilter === 'all'
        ? true
        : clientManagerState.statusFilter === 'contacted' ? c.flags?.contacted
        : clientManagerState.statusFilter === 'no_number' ? c.flags?.noNumber
        : clientManagerState.statusFilter === 'favorite' ? c.flags?.favorite
        : clientManagerState.statusFilter?.startsWith('custom:') ? c.flags?.customStatus?.id === clientManagerState.statusFilter.split(':')[1]
        : !(c.flags?.contacted || c.flags?.noNumber || c.flags?.favorite || c.flags?.customStatus)
    );
    return matchesSearch && matchesStatus && matchesDate && status !== 'Oculto';
  });
}

function normalizeContactAssistantState() {
  const current = clientManagerState.contactAssistant || {};
  const interval = Math.min(180, Math.max(5, Number(current.interval) || defaultClientManagerState.contactAssistant.interval));
  const currentIndex = Math.max(0, Number(current.currentIndex) || 0);
  const lastAction = current.lastAction || null;
  clientManagerState.contactAssistant = { interval, currentIndex, lastAction };
  return clientManagerState.contactAssistant;
}

function pendingClientsPool() {
  return managerClients.filter(client => clientStatus(client).className === 'status-pending');
}

function assistantContext() {
  const state = normalizeContactAssistantState();
  const pending = pendingClientsPool();
  if (!pending.length) {
    return { pending, current: null, index: 0, state };
  }
  const index = Math.min(state.currentIndex, pending.length - 1);
  clientManagerState.contactAssistant.currentIndex = index;
  return { pending, current: pending[index], index, state };
}

function updateAssistantHelper(pending = []) {
  const helper = document.getElementById('assistantHelper');
  if (!helper) return;
  if (!pending.length) {
    helper.textContent = 'No hay clientes pendientes para contactar.';
    return;
  }
  const state = normalizeContactAssistantState();
  const index = Math.min(state.currentIndex, pending.length - 1);
  helper.textContent = `${index + 1} de ${pending.length} pendientes.`;
}

function updateAssistantUndo() {
  const wrapper = document.getElementById('assistantUndo');
  const name = document.getElementById('assistantUndoName');
  const status = document.getElementById('assistantUndoStatus');
  if (!wrapper) return;
  const undo = clientManagerState.contactAssistant?.lastAction;
  if (!undo) {
    wrapper.classList.add('hidden');
    return;
  }
  wrapper.classList.remove('hidden');
  if (name) name.textContent = undo.clientName || 'Sin nombre';
  if (status) status.textContent = undo.actionLabel || 'Pendiente';
}

function renderContactAssistant(direction = '') {
  const overlay = document.getElementById('contactAssistantOverlay');
  const card = document.getElementById('contactAssistantCard');
  const name = document.getElementById('assistantClientName');
  const phone = document.getElementById('assistantClientPhone');
  const messagePreview = document.getElementById('assistantMessagePreview');
  const { pending, current, index } = assistantContext();
  const buttons = ['assistantCopyPhone', 'assistantCopyMessage', 'assistantMarkContacted', 'assistantMarkNoNumber'].map(id => document.getElementById(id));
  if (!overlay || !card || !name || !phone || !messagePreview) return;

  updateAssistantUndo();

  if (!pending.length || !current) {
    name.textContent = 'Sin pendientes';
    phone.textContent = '-';
    messagePreview.textContent = 'No hay clientes pendientes para contactar.';
    buttons.forEach(btn => btn && (btn.disabled = true));
    updateAssistantHelper([]);
    return;
  }

  buttons.forEach(btn => btn && (btn.disabled = false));

  if (direction) {
    card.classList.remove('slide-left', 'slide-right');
    void card.offsetWidth;
    card.classList.add(direction);
    setTimeout(() => card.classList.remove('slide-left', 'slide-right'), 360);
  }

  name.textContent = current.name || 'Sin nombre';
  phone.textContent = formatPhoneDisplay(current.phone || '') || 'Sin número';
  const fullMessage = buildMessageForClient(current) || 'No hay plantilla inicial disponible.';
  const preview = fullMessage.length > 128 ? `${fullMessage.slice(0, 128)}...` : fullMessage;
  messagePreview.textContent = preview;

  updateAssistantHelper(pending);
}

function paginateClients(rows = []) {
  const pagination = normalizePaginationState(clientManagerState.pagination || defaultClientManagerState.pagination);
  clientManagerState.pagination = pagination;
  const size = pagination.size;
  if (!size) {
    return { items: rows, totalPages: 1, currentPage: 1, size: 0, totalItems: rows.length };
  }
  const totalPages = Math.max(1, Math.ceil(rows.length / size));
  const currentPage = Math.min(pagination.page, totalPages);
  if (currentPage !== pagination.page) {
    clientManagerState.pagination.page = currentPage;
    persist();
  }
  const start = (currentPage - 1) * size;
  return {
    items: rows.slice(start, start + size),
    totalPages,
    currentPage,
    size,
    totalItems: rows.length
  };
}

function renderPaginationControls(pagination) {
  const select = document.getElementById('clientPaginationSelect');
  const info = document.getElementById('clientPaginationInfo');
  const prev = document.getElementById('clientPaginationPrev');
  const next = document.getElementById('clientPaginationNext');
  const bar = document.getElementById('clientPaginationBar');
  if (select) {
    select.value = pagination.size ? String(pagination.size) : 'none';
  }
  if (bar) {
    bar.classList.toggle('hidden', !pagination.size);
  }
  if (info) {
    const totalPages = pagination.totalPages || 1;
    info.textContent = pagination.size
      ? `Página ${pagination.currentPage} de ${totalPages} · ${pagination.totalItems} registros`
      : '';
  }
  if (prev) {
    prev.disabled = !pagination.size || pagination.currentPage <= 1;
  }
  if (next) {
    next.disabled = !pagination.size || pagination.currentPage >= (pagination.totalPages || 1);
  }
}

function updateEditModeButton(button) {
  if (!button) return;
  const active = !!clientManagerState.editingMode;
  button.classList.toggle('active', active);
  button.innerHTML = `${active ? "<i class='bx bx-lock-open'></i>Desactivar Modo Edición" : "<i class='bx bx-edit-alt'></i>Activar Modo Edición"}`;
}

function contactLogEntries() {
  const search = (clientManagerState.contactLogSearch || '').toLowerCase();
  return managerClients
    .map(c => {
      const status = clientStatus(c);
      return {
        id: c.id,
        name: c.name || 'Sin nombre',
        phone: normalizePhone(c.phone || ''),
        status,
        contactDate: c.contactDate || '',
        fallbackDate: c.systemDate || ''
      };
    })
    .filter(item => item.status.className !== 'status-pending')
    .map(item => ({ ...item, effectiveDate: item.contactDate || normalizeDateTime(item.fallbackDate) }))
    .filter(item => !!item.effectiveDate)
    .filter(item => [item.name, item.phone, item.status.label].some(val => val.toLowerCase().includes(search)))
    .sort((a, b) => new Date(a.effectiveDate).getTime() - new Date(b.effectiveDate).getTime());
}

function renderClientManager() {
  const grid = document.getElementById('clientManagerTable');
  const helper = document.getElementById('clientManagerHelper');
  if (!grid) return;
  const head = grid.querySelector('.grid-head');
  const bodyContainer = grid.querySelector('.grid-body');
  if (!head || !bodyContainer) return;
  renderStatusFilter();
  renderDateFilterHelper();
  renderSearchNotice();

  const visibleColumns = Object.entries(clientColumns).filter(([key]) => clientManagerState.columnVisibility[key]);
  const templateColumns = [
    ...visibleColumns.map(([key]) => `minmax(${clientColumnWidths[key] || '160px'}, 1fr)`),
    `minmax(${clientColumnWidths.status}, 160px)`,
    `minmax(${clientColumnWidths.actions}, 220px)`
  ].join(' ');
  grid.style.setProperty('--grid-template', templateColumns);

  const headerCells = [
    ...visibleColumns.map(([, col]) => `<div class="grid-cell">${col.label}</div>`),
    '<div class="grid-cell status-col">Estado</div>',
    '<div class="grid-cell actions-col">Acciones</div>'
  ].join('');
  head.innerHTML = `<div class="grid-row grid-header">${headerCells}</div>`;

  const filteredRows = filteredManagerClients();
  const pagination = paginateClients(filteredRows);
  const rows = pagination.items;
  if (!filteredRows.length) {
    bodyContainer.innerHTML = `<div class="grid-row empty-row"><div class="grid-cell">Sin clientes importados.</div></div>`;
    if (helper) helper.textContent = 'Sube el Excel y el gestor detectará duplicados automáticamente.';
    renderPaginationControls({ size: 0, currentPage: 1, totalPages: 1, totalItems: 0 });
    return;
  }

  const groups = clientManagerState.groupByModel ? groupByModel(rows) : { 'Todos': rows };
  const body = Object.entries(groups).map(([group, items]) => {
    const groupTitle = clientManagerState.groupByModel ? `<div class="group-row">${group} (${items.length})</div>` : '';
    const content = items.map(c => {
      const status = clientStatus(c);
      const statusColor = status.color || '#38bdf8';
      const statusVars = status.className === 'status-custom'
        ? `--row-bg: ${hexToRgba(statusColor, 0.18)}; --row-border: ${hexToRgba(statusColor, 0.32)}; --row-text: ${statusColor}; --custom-status-bg: ${hexToRgba(statusColor, 0.18)}; --custom-status-border: ${hexToRgba(statusColor, 0.32)}; --custom-status-text: ${statusColor};`
        : `--row-bg: var(--${status.className}-bg); --row-border: var(--${status.className}-border); --row-text: var(--${status.className}-text);`;
      const rowClass = `grid-row client-row ${status.className}`;
      const notesActive = hasNotes(c);
      const notesClass = notesActive ? ' has-notes' : '';
      const notesTitle = notesActive ? 'Notas guardadas' : 'Agregar notas';
      const cells = visibleColumns.map(([key, col]) => `
        <div class="grid-cell" data-label="${col.label}" data-key="${key}" style="--cell-font: var(--pref-font-${key})">
          ${formatCell(key, c)}
        </div>
      `).join('');
      const actionsContent = clientManagerState.editingMode
        ? `<button class="secondary-btn mini action-menu-btn compact" data-action="open_menu"><i class='bx bx-dots-vertical'></i>Menú de acciones</button>`
        : buildActionButtons(notesClass, notesTitle);
      return `
        <div data-id="${c.id}" class="${rowClass}" style="${statusVars}">
          ${cells}
          <div class="grid-cell status-col" data-label="Estado" data-key="status" style="--cell-font: var(--pref-font-status)">
            <span class="status-pill ${status.className}">${status.label}</span>
          </div>
          <div class="grid-cell actions-col" data-label="Acciones">${actionsContent}</div>
        </div>`;
    }).join('');
    return `${groupTitle}${content}`;
  }).join('');

  bodyContainer.innerHTML = body;
  bindClientTableActions();
  if (helper) {
    const showing = rows.length;
    const total = pagination.totalItems;
    const sizeLabel = pagination.size ? ` · mostrando ${showing} de ${total} clientes` : '';
    const pageLabel = pagination.size ? ` · página ${pagination.currentPage} de ${pagination.totalPages}` : '';
    helper.textContent = `${total} clientes filtrados${sizeLabel}${pageLabel} · columnas activas: ${visibleColumns.length}`;
  }
  renderPaginationControls(pagination);
  renderContactLog();
  const assistantOverlay = document.getElementById('contactAssistantOverlay');
  if (assistantOverlay?.classList.contains('show')) {
    renderContactAssistant();
    updateAssistantHelper(pendingClientsPool());
  }
}

function getCustomActionById(id) {
  return (clientManagerState.customActions || []).find(action => action.id === id);
}

function getAvailableActions() {
  const defaults = defaultActionCatalog
    .filter(action => clientManagerState.actionVisibility?.[action.id] !== false)
    .map(action => ({ ...action, type: 'default', actionKey: action.id }));
  const customs = (clientManagerState.customActions || [])
    .filter(action => action.visible !== false)
    .map(action => ({ ...action, type: 'custom', actionKey: `custom:${action.id}` }));
  return [...defaults, ...customs];
}

function buildActionButtons(notesClass = '', notesTitle = '') {
  return getAvailableActions().map(action => {
    const isNotes = action.id === 'open_notes';
    const label = isNotes ? notesTitle : action.label;
    const customClass = action.type === 'custom' ? ' custom' : '';
    const activeClass = isNotes ? notesClass : '';
    const style = action.color ? ` style="--action-color:${action.color}; color:${action.color};"` : '';
    return `<button class="icon-btn${customClass}${activeClass}" data-action="${action.actionKey}" title="${label}"${style}><i class='bx ${action.icon}'></i></button>`;
  }).join('');
}

function renderContactLog() {
  const overlay = document.getElementById('contactLogOverlay');
  const list = document.getElementById('contactLogList');
  const search = document.getElementById('contactLogSearch');
  const empty = document.getElementById('contactLogEmpty');
  if (!overlay || !list || !search || !empty) return;

  if (search.value !== (clientManagerState.contactLogSearch || '')) {
    search.value = clientManagerState.contactLogSearch || '';
  }

  const entries = contactLogEntries();
  if (!entries.length) {
    list.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  list.innerHTML = entries.map(entry => `
    <div class="contact-log-item" data-id="${entry.id}" data-status="${entry.status.className}">
      <div class="contact-log-main">
        <div class="contact-log-icon"><i class='bx bx-time-five'></i></div>
        <div>
          <p class="contact-log-name">${entry.name}</p>
          <p class="contact-log-phone">${entry.phone}</p>
          <div class="contact-log-tags">
            <span class="status-pill ${entry.status.className}">${entry.status.label}</span>
            <span class="time-pill">${timeAgo(entry.effectiveDate)}</span>
            <span class="time-stamp">${formatDateTimeForDisplay(entry.effectiveDate)}</span>
          </div>
        </div>
      </div>
      <div class="contact-log-actions">
        <button class="secondary-btn mini" data-action="goto">Ir al contacto</button>
        <button class="ghost-btn mini" data-action="copy">Copiar número</button>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('[data-action="goto"]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.closest('.contact-log-item')?.dataset.id;
    if (!id) return;
    focusClientRow(id);
    toggleContactLog(false);
  }));

  list.querySelectorAll('[data-action="copy"]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.closest('.contact-log-item')?.dataset.id;
    const client = managerClients.find(c => c.id === id);
    if (!client) return;
    copyText(normalizePhone(client.phone || ''), 'Número copiado');
  }));
}

function scheduledClientsList() {
  return managerClients
    .filter(client => client.schedule?.scheduledAt)
    .map(client => ({ ...client, scheduleAt: client.schedule.scheduledAt }))
    .sort((a, b) => new Date(a.scheduleAt).getTime() - new Date(b.scheduleAt).getTime());
}

function updateScheduleClock() {
  const today = document.getElementById('scheduledToday');
  const now = document.getElementById('scheduledNow');
  if (!today || !now) return;
  const current = new Date();
  today.textContent = current.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  now.textContent = current.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
}

function renderScheduledClients() {
  const timeline = document.getElementById('scheduledTimeline');
  const count = document.getElementById('scheduledCount');
  if (!timeline) return;
  const scheduled = scheduledClientsList();
  if (count) count.textContent = String(scheduled.length);

  if (!scheduled.length) {
    timeline.innerHTML = '<p class="muted">No hay recontactos programados todavía.</p>';
    return;
  }

  timeline.innerHTML = scheduled.map(client => {
    const schedule = client.schedule || {};
    const tone = scheduleTone(schedule.scheduledAt);
    const statusLabel = tone === 'overdue' ? 'Vencido' : tone === 'soon' ? 'Próximo' : 'Programado';
    const statusClass = tone === 'overdue' ? 'status-no-number' : tone === 'soon' ? 'status-favorite' : 'status-contacted';
    const methodLabel = schedule.channel === 'phone'
      ? 'Llamada telefónica'
      : schedule.channel === 'other'
        ? (schedule.otherChannel || 'Otro')
        : 'Mensaje de Whatsapp';
    const detailTags = [
      `<span class="schedule-tag"><i class='bx bx-phone'></i>${methodLabel}</span>`,
      client.city ? `<span class="schedule-tag"><i class='bx bx-map'></i>${client.city}</span>` : '',
      client.province ? `<span class="schedule-tag"><i class='bx bx-flag'></i>${client.province}</span>` : ''
    ].filter(Boolean).join('');
    const toneAttr = tone ? ` data-tone="${tone}"` : '';
    return `
      <div class="schedule-card"${toneAttr} data-id="${client.id}">
        <div class="schedule-card-head">
          <div class="schedule-time"><i class='bx bx-time'></i>${formatDateTimeForDisplay(schedule.scheduledAt)}</div>
          <span class="status-pill ${statusClass}">${statusLabel}</span>
        </div>
        <div class="schedule-body">
          <div class="schedule-client">
            <div class="avatar small">${(client.name || 'NA').slice(0, 2).toUpperCase()}</div>
            <div class="client-meta">
              <strong>${client.name || 'Sin nombre'}</strong>
              <p class="muted tiny">${client.model || 'Sin modelo'} · ${formatPhoneDisplay(client.phone) || 'Sin número'}</p>
            </div>
          </div>
          <div class="schedule-detail">
            <p class="muted tiny">Motivo de recontacto</p>
            <p>${schedule.message || 'Sin motivo asignado.'}</p>
          </div>
          ${detailTags ? `<div class="schedule-tags">${detailTags}</div>` : ''}
        </div>
        <div class="schedule-actions">
          <button class="ghost-btn mini danger" data-action="delete_schedule">Eliminar esta programación</button>
        </div>
      </div>
    `;
  }).join('');

  timeline.querySelectorAll('[data-action="delete_schedule"]').forEach(btn => btn.addEventListener('click', () => {
    const card = btn.closest('.schedule-card');
    const id = card?.dataset.id;
    const client = managerClients.find(c => c.id === id);
    if (!client) return;
    confirmAction({
      title: 'Eliminar programación',
      message: `Se eliminará la programación para ${client.name || 'este contacto'}.`,
      confirmText: 'Eliminar',
      onConfirm: () => {
        client.schedule = null;
        persist();
        renderClientManager();
        renderScheduledClients();
        showToast('Programación eliminada', 'success');
      }
    });
  }));
}

function bindScheduleModal() {
  const overlay = document.getElementById('scheduleContactOverlay');
  const closeBtn = document.getElementById('closeScheduleContact');
  const cancelBtn = document.getElementById('cancelScheduleContact');
  const confirmBtn = document.getElementById('confirmScheduleContact');
  const messageInput = document.getElementById('scheduleMessage');
  const dateInput = document.getElementById('scheduleDate');
  const timeInput = document.getElementById('scheduleTime');
  const otherField = document.getElementById('scheduleOtherContactField');
  const otherInput = document.getElementById('scheduleOtherContact');
  const reasonChips = document.getElementById('scheduleQuickReasons');

  const closeModal = () => {
    toggleFadeOverlay(overlay, false);
    activeScheduleClientId = null;
  };

  if (closeBtn && !closeBtn.dataset.bound) {
    closeBtn.addEventListener('click', closeModal);
    closeBtn.dataset.bound = 'true';
  }
  if (cancelBtn && !cancelBtn.dataset.bound) {
    cancelBtn.addEventListener('click', closeModal);
    cancelBtn.dataset.bound = 'true';
  }

  const updateOtherField = (value) => {
    if (!otherField) return;
    const show = value === 'other';
    otherField.classList.toggle('hidden', !show);
    if (!show && otherInput) otherInput.value = '';
  };

  const setActiveChip = (message) => {
    if (!reasonChips) return;
    reasonChips.querySelectorAll('.chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.message === message);
    });
  };

  reasonChips?.querySelectorAll('.chip').forEach(chip => {
    if (chip.dataset.bound) return;
    chip.addEventListener('click', () => {
      if (messageInput) messageInput.value = chip.dataset.message || '';
      setActiveChip(chip.dataset.message || '');
    });
    chip.dataset.bound = 'true';
  });

  messageInput?.addEventListener('input', () => {
    setActiveChip(messageInput.value.trim());
  });

  document.querySelectorAll('input[name="scheduleContactMethod"]').forEach(radio => {
    if (radio.dataset.bound) return;
    radio.addEventListener('change', () => updateOtherField(radio.value));
    radio.dataset.bound = 'true';
  });

  if (confirmBtn && !confirmBtn.dataset.bound) {
    confirmBtn.addEventListener('click', () => {
      if (!activeScheduleClientId) return;
      const client = managerClients.find(c => c.id === activeScheduleClientId);
      if (!client) return;
      const dateValue = dateInput?.value || '';
      const timeValue = timeInput?.value || '';
      const message = messageInput?.value.trim() || '';
      if (!dateValue || !timeValue) {
        showToast('Selecciona fecha y horario para programar.', 'error');
        return;
      }
      if (!message) {
        showToast('Agrega un motivo de recontacto.', 'error');
        return;
      }
      const channel = document.querySelector('input[name="scheduleContactMethod"]:checked')?.value || 'whatsapp';
      const otherChannel = channel === 'other' ? (otherInput?.value.trim() || '') : '';
      if (channel === 'other' && !otherChannel) {
        showToast('Especifica la otra forma de contacto.', 'error');
        return;
      }
      const scheduledAt = buildScheduleDateTime(dateValue, timeValue);
      if (!scheduledAt) {
        showToast('Fecha u horario inválidos.', 'error');
        return;
      }
      client.schedule = {
        date: dateValue,
        time: timeValue,
        message,
        channel,
        otherChannel,
        scheduledAt,
        createdAt: client.schedule?.createdAt || new Date().toISOString()
      };
      persist();
      renderClientManager();
      renderScheduledClients();
      showToast('Recontacto programado', 'success');
      closeModal();
    });
    confirmBtn.dataset.bound = 'true';
  }
}

function openScheduleModal(clientId) {
  const overlay = document.getElementById('scheduleContactOverlay');
  const nameLabel = document.getElementById('scheduleClientName');
  const dateInput = document.getElementById('scheduleDate');
  const timeInput = document.getElementById('scheduleTime');
  const messageInput = document.getElementById('scheduleMessage');
  const otherField = document.getElementById('scheduleOtherContactField');
  const otherInput = document.getElementById('scheduleOtherContact');
  const reasonChips = document.getElementById('scheduleQuickReasons');
  if (!overlay) return;
  const client = managerClients.find(c => c.id === clientId);
  if (!client) return;
  activeScheduleClientId = clientId;
  if (nameLabel) nameLabel.textContent = client.name || 'Cliente';

  const schedule = client.schedule || {};
  if (dateInput) {
    dateInput.value = schedule.date || (schedule.scheduledAt ? formatLocalISO(new Date(schedule.scheduledAt)) : formatLocalISO());
  }
  if (timeInput) {
    timeInput.value = schedule.time || formatTimeValue(schedule.scheduledAt) || '';
  }
  if (messageInput) {
    messageInput.value = schedule.message || '';
  }
  const selectedChannel = schedule.channel || 'whatsapp';
  document.querySelectorAll('input[name="scheduleContactMethod"]').forEach(radio => {
    radio.checked = radio.value === selectedChannel;
  });
  if (otherField) {
    otherField.classList.toggle('hidden', selectedChannel !== 'other');
  }
  if (otherInput) {
    otherInput.value = schedule.otherChannel || '';
  }
  reasonChips?.querySelectorAll('.chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.message === (schedule.message || ''));
  });

  toggleFadeOverlay(overlay, true);
}

function startContactLogTicker() {
  if (contactLogInterval) clearInterval(contactLogInterval);
  contactLogInterval = setInterval(() => renderContactLog(), 60000);
}

function startScheduleClock() {
  if (scheduleClockInterval) clearInterval(scheduleClockInterval);
  updateScheduleClock();
  scheduleClockInterval = setInterval(updateScheduleClock, 60000);
}

function bindClientEditHandlers() {
  const actionOverlay = document.getElementById('clientActionOverlay');
  const closeAction = document.getElementById('clientActionClose');
  const editModal = document.getElementById('clientEditModal');
  const cancelEdit = document.getElementById('clientEditCancel');
  const closeEdit = document.getElementById('clientEditClose');
  const saveEdit = document.getElementById('clientEditSave');
  if (closeAction && !closeAction.dataset.bound) {
    closeAction.addEventListener('click', closeClientActionMenu);
    closeAction.dataset.bound = 'true';
  }
  [cancelEdit, closeEdit].forEach(btn => {
    if (btn && !btn.dataset.bound) {
      btn.addEventListener('click', () => closeClientEditModal(true));
      btn.dataset.bound = 'true';
    }
  });
  if (saveEdit && !saveEdit.dataset.bound) {
    saveEdit.addEventListener('click', applyClientEdit);
    saveEdit.dataset.bound = 'true';
  }
}

function clientActionOptions(client) {
  const vehicleOptions = [...new Set([...(vehicles || []).map(v => v.name), client.model].filter(Boolean))];
  const formatDateValue = (value) => formatDateForDisplay(value) || 'Sin datos';
  return [
    {
      key: 'rename',
      icon: 'bxs-user-detail',
      tone: 'info',
      label: 'Renombrar Contacto',
      description: 'Actualiza el nombre principal del cliente.',
      currentValue: (c) => c.name || 'Sin nombre',
      handler: () => openClientEditModal({
        key: 'rename',
        field: 'name',
        label: 'Renombrar Contacto',
        currentLabel: 'Nombre anterior',
        newLabel: 'Nuevo nombre',
        type: 'text',
        uppercase: true,
        successMessage: 'Nombre actualizado'
      }, client.id)
    },
    {
      key: 'model',
      icon: 'bx-car',
      tone: 'info',
      label: 'Cambiar el modelo del coche',
      description: 'Selecciona un nuevo modelo desde el catálogo.',
      currentValue: (c) => c.model || 'Sin modelo',
      handler: () => openClientEditModal({
        key: 'model',
        field: 'model',
        label: 'Cambiar el modelo del coche',
        currentLabel: 'Coche anterior',
        newLabel: 'Coche nuevo',
        type: 'select',
        options: vehicleOptions,
        successMessage: 'Modelo actualizado'
      }, client.id)
    },
    {
      key: 'phone',
      icon: 'bx-phone-call',
      tone: 'info',
      label: 'Actualizar Teléfono',
      description: 'Corrige o reemplaza el número guardado.',
      currentValue: (c) => normalizePhone(c.phone) || 'Sin número',
      handler: () => openClientEditModal({
        key: 'phone',
        field: 'phone',
        label: 'Actualizar Teléfono',
        currentLabel: 'Teléfono viejo',
        newLabel: 'Teléfono nuevo',
        type: 'tel',
        normalizePhone: true,
        successMessage: 'Teléfono actualizado'
      }, client.id)
    },
    {
      key: 'city',
      icon: 'bx-map-pin',
      tone: 'info',
      label: 'Actualizar Localidad',
      description: 'Edita la ciudad o localidad del cliente.',
      currentValue: (c) => c.city || 'Sin localidad',
      handler: () => openClientEditModal({
        key: 'city',
        field: 'city',
        label: 'Actualizar Localidad',
        currentLabel: 'Localidad actual',
        newLabel: 'Nueva localidad',
        type: 'text',
        successMessage: 'Localidad actualizada'
      }, client.id)
    },
    {
      key: 'province',
      icon: 'bx-map',
      tone: 'info',
      label: 'Actualizar Provincia',
      description: 'Actualiza la provincia almacenada.',
      currentValue: (c) => c.province || 'Sin provincia',
      handler: () => openClientEditModal({
        key: 'province',
        field: 'province',
        label: 'Actualizar Provincia',
        currentLabel: 'Provincia actual',
        newLabel: 'Nueva provincia',
        type: 'text',
        successMessage: 'Provincia actualizada'
      }, client.id)
    },
    {
      key: 'document',
      icon: 'bx-id-card',
      tone: 'info',
      label: 'Actualizar Documento',
      description: 'Modifica el documento asociado.',
      currentValue: (c) => c.document || 'Sin datos',
      handler: () => openClientEditModal({
        key: 'document',
        field: 'document',
        label: 'Actualizar Documento',
        currentLabel: 'Documento actual',
        newLabel: 'Nuevo documento',
        type: 'text',
        successMessage: 'Documento actualizado'
      }, client.id)
    },
    {
      key: 'cuit',
      icon: 'bx-briefcase-alt',
      tone: 'info',
      label: 'Actualizar CUIT',
      description: 'Reemplaza el CUIT o CUIL.',
      currentValue: (c) => c.cuit || 'Sin datos',
      handler: () => openClientEditModal({
        key: 'cuit',
        field: 'cuit',
        label: 'Actualizar CUIT',
        currentLabel: 'CUIT actual',
        newLabel: 'Nuevo CUIT',
        type: 'text',
        successMessage: 'CUIT actualizado'
      }, client.id)
    },
    {
      key: 'birthDate',
      icon: 'bx-cake',
      tone: 'info',
      label: 'Actualizar fecha de nacimiento',
      description: 'Define una nueva fecha de nacimiento.',
      currentValue: (c) => formatDateValue(c.birthDate),
      handler: () => openClientEditModal({
        key: 'birthDate',
        field: 'birthDate',
        label: 'Actualizar fecha de nacimiento',
        currentLabel: 'Fecha actual',
        newLabel: 'Nueva fecha',
        type: 'date',
        successMessage: 'Fecha de nacimiento actualizada'
      }, client.id)
    },
    {
      key: 'purchaseDate',
      icon: 'bx-calendar-event',
      tone: 'warning',
      label: 'Actualizar fecha de compra',
      description: 'Ajusta la fecha de compra cargada.',
      currentValue: (c) => formatDateValue(c.purchaseDate),
      handler: () => openClientEditModal({
        key: 'purchaseDate',
        field: 'purchaseDate',
        label: 'Actualizar fecha de compra',
        currentLabel: 'Fecha cargada',
        newLabel: 'Nueva fecha',
        type: 'date',
        successMessage: 'Fecha de compra actualizada'
      }, client.id)
    },
    {
      key: 'systemDate',
      icon: 'bx-calendar-week',
      tone: 'warning',
      label: 'Actualizar fecha de carga',
      description: 'Modifica la fecha de carga del registro.',
      currentValue: (c) => formatDateValue(c.systemDate),
      handler: () => openClientEditModal({
        key: 'systemDate',
        field: 'systemDate',
        label: 'Actualizar fecha de carga',
        currentLabel: 'Fecha actual',
        newLabel: 'Nueva fecha',
        type: 'date',
        successMessage: 'Fecha de carga actualizada'
      }, client.id)
    },
    {
      key: 'postalCode',
      icon: 'bx-navigation',
      tone: 'info',
      label: 'Actualizar código postal',
      description: 'Corrige el código postal registrado.',
      currentValue: (c) => c.postalCode || 'Sin datos',
      handler: () => openClientEditModal({
        key: 'postalCode',
        field: 'postalCode',
        label: 'Actualizar código postal',
        currentLabel: 'Código postal actual',
        newLabel: 'Nuevo código postal',
        type: 'text',
        successMessage: 'Código postal actualizado'
      }, client.id)
    },
    {
      key: 'type',
      icon: 'bx-note',
      tone: 'info',
      label: 'Actualizar notas',
      description: 'Edita las notas o comentarios del cliente.',
      currentValue: (c) => normalizeNotesValue(c.type),
      handler: () => openClientEditModal({
        key: 'type',
        field: 'type',
        label: 'Actualizar notas',
        currentLabel: 'Notas actuales',
        newLabel: 'Nuevas notas',
        type: 'textarea',
        successMessage: 'Notas actualizadas'
      }, client.id)
    },
    {
      key: 'delete',
      icon: 'bx-trash',
      tone: 'danger',
      label: 'Borrar Contacto',
      description: 'Eliminará el contacto de la base local.',
      danger: true,
      handler: () => confirmAction({
        title: 'Borrar Contacto',
        message: '¿De verdad quieres eliminar este contacto de la base de datos local? Esta acción no se puede deshacer.',
        confirmText: 'Sí, borrar',
        onConfirm: () => {
          deleteClientById(client.id);
          closeClientActionMenu();
        }
      })
    },
    {
      key: 'done',
      icon: 'bx-check-shield',
      tone: 'success',
      label: 'Listo',
      description: 'Cierra este menú de acciones.',
      currentValue: () => 'Acciones finalizadas',
      buttonText: 'Listo',
      primary: true,
      handler: () => {
        closeClientActionMenu();
      }
    }
  ];
}

function openClientActionMenu(id) {
  const overlay = document.getElementById('clientActionOverlay');
  const list = document.getElementById('clientActionList');
  const title = document.getElementById('clientActionTitle');
  const subtitle = document.getElementById('clientActionSubtitle');
  const client = managerClients.find(c => c.id === id);
  if (!overlay || !list || !client) return;
  activeActionClientId = id;
  if (title) title.textContent = client.name || 'Contacto';
  if (subtitle) subtitle.textContent = client.model ? `Modelo: ${client.model}` : 'Elige una acción para este contacto';
  const options = clientActionOptions(client);
  list.innerHTML = options.map(opt => `
    <div class="action-card" data-key="${opt.key}">
      <div class="action-card-head">
        <span class="action-icon" ${opt.tone ? `data-tone="${opt.tone}"` : ''}><i class='bx ${opt.icon || 'bx-dots-vertical-rounded'}'></i></span>
        <div>
          <span class="label">${opt.label}</span>
          <p class="muted tiny">${opt.description}</p>
          ${opt.currentValue ? `<p class="muted tiny current-value">[${opt.currentValue(client)}]</p>` : ''}
        </div>
      </div>
      <button class="${opt.danger ? 'ghost-btn action-btn danger' : opt.primary ? 'primary-btn action-btn' : opt.highlight ? 'success-btn action-btn' : 'secondary-btn action-btn'}" data-action="${opt.key}"><span>${opt.danger ? 'Borrar' : (opt.buttonText || 'Seleccionar')}</span><i class='bx bx-chevron-right'></i></button>
    </div>
  `).join('');
  list.querySelectorAll('[data-action]').forEach(btn => {
    const key = btn.dataset.action;
    const opt = options.find(o => o.key === key);
    btn.onclick = () => {
      if (opt?.handler) opt.handler();
    };
  });
  if (overlay._closeTimer) clearTimeout(overlay._closeTimer);
  overlay.classList.remove('closing');
  overlay.classList.add('show');
}

function closeClientActionMenu() {
  const overlay = document.getElementById('clientActionOverlay');
  if (overlay) {
    overlay.classList.add('closing');
    const duration = 300;
    if (overlay._closeTimer) clearTimeout(overlay._closeTimer);
    overlay._closeTimer = setTimeout(() => {
      overlay.classList.remove('show');
      overlay.classList.remove('closing');
      overlay._closeTimer = null;
    }, duration);
  }
  activeActionClientId = null;
}

function openClientEditModal(config, clientId = activeActionClientId) {
  const modal = document.getElementById('clientEditModal');
  const title = document.getElementById('clientEditTitle');
  const subtitle = document.getElementById('clientEditSubtitle');
  const eyebrow = document.getElementById('clientEditEyebrow');
  const fieldContainer = document.getElementById('clientEditField');
  const currentContainer = document.getElementById('clientEditCurrent');
  const uppercaseToggle = document.getElementById('uppercaseToggle');
  const uppercaseInput = document.getElementById('clientUppercase');
  const client = managerClients.find(c => c.id === clientId);
  if (!modal || !client || !fieldContainer || !currentContainer) return;
  activeEditAction = { ...config, clientId };
  if (title) title.textContent = config.label || 'Editar contacto';
  if (subtitle) subtitle.textContent = config.description || '';
  if (eyebrow) eyebrow.textContent = 'Modo edición';
  const currentValue = client[config.field] || '';
  currentContainer.innerHTML = `<label>${config.currentLabel || 'Valor actual'}</label><div class="muted">${currentValue ? currentValue : 'Sin datos'}</div>`;
  let control = '';
  const safeValue = config.type === 'date' ? formatDateISO(currentValue) : currentValue;
  if (config.type === 'select') {
    const options = (config.options || []).map(opt => `<option value="${opt}" ${opt === currentValue ? 'selected' : ''}>${opt}</option>`).join('');
    control = `<label>${config.newLabel || 'Nuevo valor'}<select id="clientEditSelect">${options}</select></label>`;
  } else if (config.type === 'textarea') {
    control = `<label>${config.newLabel || 'Nuevo valor'}<textarea id="clientEditArea" rows="4">${safeValue || ''}</textarea></label>`;
  } else {
    control = `<label>${config.newLabel || 'Nuevo valor'}<input id="clientEditInput" type="${config.type || 'text'}" value="${safeValue || ''}" /></label>`;
  }
  fieldContainer.innerHTML = control;
  if (uppercaseToggle) uppercaseToggle.style.display = config.uppercase ? 'flex' : 'none';
  if (uppercaseInput) uppercaseInput.checked = !!config.uppercase;
  modal.classList.remove('hidden');
  requestAnimationFrame(() => modal.classList.add('show'));
  closeClientActionMenu();
}

function closeClientEditModal(returnToMenu = false) {
  const modal = document.getElementById('clientEditModal');
  const reopenId = returnToMenu ? (activeEditAction?.clientId || activeActionClientId) : null;
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 200);
  activeEditAction = null;
  if (returnToMenu && reopenId) {
    setTimeout(() => openClientActionMenu(reopenId), 220);
  }
}

function applyClientEdit() {
  if (!activeEditAction) {
    closeClientEditModal(true);
    return;
  }
  const client = managerClients.find(c => c.id === activeEditAction.clientId);
  if (!client) {
    closeClientEditModal(true);
    return;
  }
  const input = document.getElementById('clientEditInput');
  const select = document.getElementById('clientEditSelect');
  const area = document.getElementById('clientEditArea');
  const uppercaseInput = document.getElementById('clientUppercase');
  let newValue = '';
  if (select) newValue = select.value;
  else if (area) newValue = area.value;
  else if (input) newValue = input.value;
  if (activeEditAction.type === 'date') newValue = formatDateISO(newValue);
  if (activeEditAction.normalizePhone) newValue = normalizePhone(newValue);
  if (activeEditAction.uppercase && uppercaseInput?.checked) newValue = (newValue || '').toUpperCase();
  client[activeEditAction.field] = newValue || '';
  persist();
  renderClientManager();
  renderContactLog();
  showToast(activeEditAction.successMessage || 'Datos actualizados', 'success');
  closeClientEditModal(true);
}

function deleteClientById(id) {
  const index = managerClients.findIndex(c => c.id === id);
  if (index === -1) return;
  managerClients.splice(index, 1);
  persist();
  renderClientManager();
  renderContactLog();
  renderStats();
  showToast('Contacto eliminado', 'success');
}

function toggleContactLog(show) {
  const overlay = document.getElementById('contactLogOverlay');
  if (!overlay) return;
  overlay.classList[show ? 'add' : 'remove']('show');
  if (show) {
    const search = document.getElementById('contactLogSearch');
    setTimeout(() => search?.focus(), 120);
  }
}

function focusClientRow(id) {
  activatePanel('clientManager');
  const row = document.querySelector(`#clientManagerTable .client-row[data-id="${id}"]`);
  if (row) {
    row.classList.add('jump-highlight');
    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => row.classList.remove('jump-highlight'), 2000);
  }
}

function renderGlobalSettings() {
  const settings = mergeGlobalSettings(uiState.globalSettings);
  uiState.globalSettings = settings;
  const advisor = document.getElementById('globalAdvisor');
  if (advisor) {
    if (advisor.value !== settings.advisorName) advisor.value = settings.advisorName;
    if (!advisor.dataset.bound) {
      advisor.addEventListener('input', () => {
        uiState.globalSettings.advisorName = advisor.value;
        persist();
        renderWelcomeHero();
        renderAdvisorSelector(advisor.value);
      });
      advisor.dataset.bound = 'true';
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
  if (key === 'name') {
    const scheduleIcon = client.schedule?.scheduledAt
      ? `<span class="schedule-indicator" title="Contacto programado"><i class='bx bx-time'></i></span>`
      : '';
    return `<div class="name-cell"><div class="avatar small">${(client.name || 'NA').slice(0, 2).toUpperCase()}</div><div class="name-stack"><strong>${client.name}</strong>${scheduleIcon}</div></div>`;
  }
  if (key === 'model') return `<div class="name-cell"><strong>${client.model}</strong></div>`;
  if (key === 'phone') return `<div class="tip"><span>${formatPhoneDisplay(client.phone)}</span></div>`;
  if (key === 'birthDate' || key === 'purchaseDate') return formatDateForDisplay(client[key]) || '-';
  if (key === 'systemDate') return formatDateForDisplay(client.systemDate) || '-';
  if (key === 'contactDate') return formatDateTimeForDisplay(client.contactDate);
  if (key === 'type') return normalizeNotesValue(client.type).replace(/\n/g, '<br>');
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
  document.querySelectorAll('#clientManagerTable .grid-body [data-action]').forEach(btn => btn.addEventListener('click', (e) => {
    const action = btn.dataset.action;
    const row = btn.closest('.client-row');
    const id = row?.dataset.id;
    if (!id) return;
    e.stopPropagation();
    triggerClientAction(action, id);
  }));
}

function triggerClientAction(actionKey, clientId) {
  if (!actionKey || !clientId) return;
  const client = managerClients.find(c => c.id === clientId);
  if (!client && !actionKey.startsWith('custom:')) return;
  if (actionKey === 'open_menu') {
    openClientActionMenu(clientId);
    return;
  }
  if (clientManagerState.editingMode && !actionKey.startsWith('custom:')) return;
  if (actionKey.startsWith('custom:')) {
    const customId = actionKey.split(':')[1];
    handleCustomAction(customId, clientId);
    return;
  }
  if (actionKey === 'contacted') updateClientFlag(clientId, 'contacted');
  if (actionKey === 'no_number') updateClientFlag(clientId, 'noNumber');
  if (actionKey === 'favorite') updateClientFlag(clientId, 'favorite');
  if (actionKey === 'open_notes') openClientNotes(clientId);
  if (actionKey === 'copy_message') copyText(buildMessageForClient(client), 'Mensaje copiado');
  if (actionKey === 'copy_phone') copyText(normalizePhone(client?.phone || ''), 'Número copiado');
  if (actionKey === 'schedule_contact') openScheduleModal(clientId);
}

function bindCustomContextMenu() {
  const closeBtn = document.getElementById('closeContextMenu');
  if (closeBtn && !closeBtn.dataset.bound) {
    closeBtn.addEventListener('click', hideClientContextMenu);
    closeBtn.dataset.bound = 'true';
  }
  if (!document.body.dataset.contextMenuBound) {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const row = e.target.closest('.client-row');
      if (row?.dataset?.id) {
        openClientContextMenu(row.dataset.id, e);
      } else {
        hideClientContextMenu();
      }
    });
    document.body.dataset.contextMenuBound = 'true';
  }
  if (!document.body.dataset.contextMenuKeys) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hideClientContextMenu();
    });
    document.body.dataset.contextMenuKeys = 'true';
  }
  if (!document.body.dataset.contextMenuClicks) {
    document.addEventListener('pointerdown', (e) => {
      const menu = document.getElementById('clientContextMenu');
      if (!menu || menu.classList.contains('hidden')) return;
      if (menu.contains(e.target)) return;
      hideClientContextMenu();
    });
    document.body.dataset.contextMenuClicks = 'true';
  }
}

function hideClientContextMenu() {
  const menu = document.getElementById('clientContextMenu');
  if (menu) {
    menu.classList.add('hidden');
    menu.style.left = '';
    menu.style.top = '';
  }
  activeContextClientId = null;
}

function openClientContextMenu(id, event = null) {
  const menu = document.getElementById('clientContextMenu');
  const nameLabel = document.getElementById('contextClientName');
  const modelLabel = document.getElementById('contextClientModel');
  const content = document.getElementById('contextMenuContent');
  const client = managerClients.find(c => c.id === id);
  if (!menu || !content || !client) return;
  activeContextClientId = id;
  if (nameLabel) nameLabel.textContent = client.name || 'Cliente';
  if (modelLabel) modelLabel.textContent = client.model ? `Modelo: ${client.model}` : 'Sin modelo asociado';

  const dataActions = [
    { key: 'name', label: 'Copiar Nombre', icon: 'bx-id-card', value: client.name || '', toast: 'Nombre copiado' },
    { key: 'model', label: 'Copiar Modelo del Coche', icon: 'bx-car', value: client.model || '', toast: 'Modelo copiado' },
    { key: 'phone', label: 'Copiar Celular', icon: 'bx-phone-call', value: normalizePhone(client.phone), toast: 'Celular copiado' },
    { key: 'city', label: 'Copiar Localidad', icon: 'bx-map-pin', value: client.city || '', toast: 'Localidad copiada' },
    { key: 'province', label: 'Copiar Provincia', icon: 'bx-map', value: client.province || '', toast: 'Provincia copiada' },
    { key: 'document', label: 'Copiar DNI', icon: 'bx-id-card', value: client.document || '', toast: 'DNI copiado' },
    { key: 'cuit', label: 'Copiar CUIT', icon: 'bx-id-card', value: client.cuit || '', toast: 'CUIT copiado' },
    { key: 'birthDate', label: 'Copiar Fecha de Nacimiento', icon: 'bx-calendar-event', value: formatDateForDisplay(client.birthDate) || '', toast: 'Fecha de nacimiento copiada' },
    { key: 'postalCode', label: 'Copiar CP', icon: 'bx-navigation', value: client.postalCode || '', toast: 'Código postal copiado' },
    { key: 'purchaseDate', label: 'Copiar Fecha de Compra', icon: 'bx-calendar-check', value: formatDateForDisplay(client.purchaseDate) || '', toast: 'Fecha de compra copiada' }
  ];

  const contextPrefs = mergePreferences(uiState.preferences).contextMenuVisibility || { data: {}, actions: {} };
  const visibleDataActions = dataActions.filter(action => contextPrefs.data?.[action.key] !== false);
  const quickActions = getAvailableActions().filter(action => contextPrefs.actions?.[action.actionKey] !== false);

  const dataSection = `
    <div class="context-section">
      <div class="context-section-head">
        <div class="label">
          <p class="eyebrow">Datos del Cliente</p>
          <strong>Copiar contenido clave</strong>
        </div>
        <span class="context-tag">Accesos rápidos</span>
      </div>
      <div class="context-actions">
        ${visibleDataActions.length ? visibleDataActions.map(action => `
          <div class="context-action" data-copy-key="${action.key}">
            <div class="meta">
              <div class="icon"><i class='bx ${action.icon}'></i></div>
              <div class="texts">
                <strong>${action.label}</strong>
                <p class="muted tiny">${action.value ? action.value : 'Sin datos'}</p>
              </div>
            </div>
            <button class="secondary-btn mini icon-only" title="Copiar"><i class='bx bx-copy'></i></button>
          </div>
        `).join('') : '<p class="muted">No hay datos visibles en el menú contextual.</p>'}
      </div>
    </div>
  `;

  const quickSection = `
    <div class="context-section">
      <div class="context-section-head">
        <div class="label">
          <p class="eyebrow">Acciones rápidas</p>
        </div>
        <span class="context-tag">Menú contextual</span>
      </div>
      <div class="context-actions">
        ${quickActions.map(action => {
          const style = action.color ? `style="color:${action.color}; background:${hexToRgba(action.color, 0.14)}"` : '';
          const tone = action.type === 'custom' ? 'Personalizada' : 'Predeterminada';
          return `
            <div class="context-action" data-context-action="${action.actionKey}">
              <div class="meta">
                <div class="icon" ${style}><i class='bx ${action.icon}'></i></div>
                <div class="texts">
                  <strong>${action.label}</strong>
                  <p class="muted tiny">${tone}</p>
                </div>
              </div>
              <button class="primary-btn mini">⮡</button>
            </div>
          `;
        }).join('') || '<p class="muted">No hay acciones rápidas disponibles.</p>'}
      </div>
    </div>
  `;

  content.innerHTML = dataSection + quickSection;

  visibleDataActions.forEach(action => {
    const target = content.querySelector(`[data-copy-key="${action.key}"] button`);
    if (target) {
      target.addEventListener('click', () => {
        copyText(action.value || '', action.toast);
        hideClientContextMenu();
      });
    }
  });

  quickActions.forEach(action => {
    const target = content.querySelector(`[data-context-action="${action.actionKey}"] button`);
    if (target) {
      target.addEventListener('click', () => {
        hideClientContextMenu();
        triggerClientAction(action.actionKey, id);
      });
    }
  });

  menu.classList.remove('hidden');
  requestAnimationFrame(() => positionContextMenu(menu, event));
}

function positionContextMenu(menu, event = null) {
  const padding = 14;
  const clickX = event?.clientX ?? (window.innerWidth / 2);
  const clickY = event?.clientY ?? (window.innerHeight / 2);
  const { width, height } = menu.getBoundingClientRect();
  let left = clickX;
  let top = clickY;
  if (left + width > window.innerWidth - padding) left = window.innerWidth - width - padding;
  if (top + height > window.innerHeight - padding) top = window.innerHeight - height - padding;
  left = Math.max(padding, left);
  top = Math.max(padding, top);
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
}

function updateContactMeta(client) {
  const status = clientStatus(client);
  const now = new Date().toISOString();
  client.lastContactStatus = status.label;
  if (status.className !== 'status-pending') {
    client.contactDate = now;
  } else if (!client.contactDate) {
    client.contactDate = '';
  }
}

function updateClientFlag(id, flag, forceValue = null) {
  const client = managerClients.find(c => c.id === id);
  if (!client) return;
  client.flags = client.flags || {};
  client.flags.customStatus = null;
  if (flag === 'favorite') {
    const nextValue = forceValue !== null ? !!forceValue : !client.flags.favorite;
    client.flags.favorite = nextValue;
  } else if (flag === 'noNumber') {
    const nextValue = forceValue !== null ? !!forceValue : !client.flags.noNumber;
    client.flags.noNumber = nextValue;
    if (client.flags.noNumber) client.flags.contacted = false;
  } else if (flag === 'contacted') {
    const nextValue = forceValue !== null ? !!forceValue : !client.flags.contacted;
    client.flags.contacted = nextValue;
    if (client.flags.contacted) client.flags.noNumber = false;
  }
  updateContactMeta(client);
  persist();
  renderClientManager();
}

function handleCustomAction(actionId, clientId) {
  if (!actionId || !clientId) return;
  const client = managerClients.find(c => c.id === clientId);
  const action = getCustomActionById(actionId);
  if (!client || !action) return;
  client.flags = client.flags || {};
  const isSame = client.flags.customStatus?.id === actionId;
  client.flags.customStatus = isSame ? null : { id: action.id, label: action.label, color: action.color, icon: action.icon };
  client.flags.contacted = !isSame;
  client.flags.noNumber = false;
  updateContactMeta(client);
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

function exportValue(key, client) {
  switch (key) {
    case 'name': return client.name || '';
    case 'model': return client.model || '';
    case 'phone': return normalizePhone(client.phone);
    case 'brand': return client.brand || '';
    case 'city': return client.city || '';
    case 'province': return client.province || '';
    case 'document': return client.document || '';
    case 'cuit': return client.cuit || '';
    case 'birthDate': return client.birthDate || '';
    case 'purchaseDate': return formatDateForDisplay(client.purchaseDate);
    case 'systemDate': return formatDateForDisplay(client.systemDate);
    case 'contactDate': return formatDateTimeForDisplay(client.contactDate);
    case 'postalCode': return client.postalCode || '';
    case 'type': return normalizeNotesValue(client.type);
    case 'status': return client.statusOverride || clientStatus(client).label;
    default: return client[key] || '';
  }
}

function buildLocalExportData(rows, options) {
  const selected = options.columnOrder.filter(key => options.selectedColumns.includes(key)).filter(key => exportableColumns[key]);
  if (!selected.length) return null;
  return rows.map(client => selected.reduce((acc, key) => {
    acc[exportableColumns[key].label] = exportValue(key, client);
    return acc;
  }, {}));
}

function buildPresetExportData(rows) {
  return rows.map(client => {
    const statusFromType = statusLabelFromType(client.type);
    const exportClient = statusFromType ? { ...client, statusOverride: statusFromType } : client;
    return presetExportHeaders.reduce((acc, { key, label }) => {
      acc[label] = exportValue(key, exportClient);
      return acc;
    }, {});
  });
}

function exportManagerClients() {
  const rows = filteredManagerClients();
  if (!rows.length) {
    showToast('No hay clientes para exportar.', 'error');
    return;
  }
  clientManagerState.exportOptions = normalizeExportOptions(clientManagerState.exportOptions || defaultClientManagerState.exportOptions);
  const exportOptions = clientManagerState.exportOptions;
  const grouped = rows.reduce((acc, c) => {
    const key = formatDateISO(c.systemDate) || '';
    acc[key] = acc[key] || [];
    acc[key].push(c);
    return acc;
  }, {});

  const wb = XLSX.utils.book_new();
  const sortedKeys = Object.keys(grouped).sort((a, b) => {
    if (!a) return 1;
    if (!b) return -1;
    return b.localeCompare(a);
  });

  for (const isoKey of sortedKeys) {
    const sheetLabel = isoKey ? formatDateLabel(isoKey) : 'Sin fecha asignada';
    const data = exportOptions.mode === 'preset'
      ? buildPresetExportData(grouped[isoKey])
      : buildLocalExportData(grouped[isoKey], exportOptions);
    if (!data || !data.length) {
      showToast('Selecciona al menos una columna para exportar.', 'error');
      return;
    }
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, sanitizeSheetName(sheetLabel));
  }

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

  document.getElementById('exportProfile').addEventListener('click', () => {
      confirmAction({
        title: 'Exportar perfil',
        message: 'Descargarás un respaldo con vehículos, plantillas y clientes.',
        confirmText: 'Exportar',
        onConfirm: () => {
        const payload = { version: 6, vehicles, priceTabs, activePriceTabId, templates, clients, managerClients, uiState, clientManagerState, snapshots };
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
          priceTabs = createDefaultPriceTabs();
          activePriceTabId = priceTabs[0]?.id || '';
          vehicles = cloneVehicles(getActivePriceTab()?.vehicles || defaultVehicles);
          templates = ensureTemplateIds([...defaultTemplates]);
          selectedTemplateIndex = 0;
          selectedTemplateId = templates[0].id;
          uiState = {
            ...defaultUiState,
            templateSearch: '',
            clientSearch: '',
            profileSearch: '',
            globalSettings: mergeGlobalSettings(defaultUiState.globalSettings),
            preferences: mergePreferences(defaultUiState.preferences)
          };
          clientManagerState = { ...defaultClientManagerState };
          planDraftApplied = false;
          persist();
          applyToggleState();
          applyPreferences();
          applyStatusPalette();
          renderVehicleTable();
          renderTemplates();
          renderPlanForm();
          renderClientManager();
          renderGlobalSettings();
          renderWelcomeHero();
          renderAdvisorNote();
          renderStats();
          showToast('Valores base restaurados', 'success');
        }
      });
    });
  }
}

function persist() {
  syncActiveVehiclesToTab();
  save('priceTabs', priceTabs);
  save('activePriceTabId', activePriceTabId);
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
    if (['vehicles', 'templates', 'clients', 'managerClients', 'uiState', 'clientManagerState', 'snapshots', 'priceTabs', 'activePriceTabId'].includes(e.key)) {
      syncFromStorage();
    }
  });
}

function syncFromStorage() {
  priceTabs = clonePriceTabs(load('priceTabs') || priceTabs || createDefaultPriceTabs());
  activePriceTabId = load('activePriceTabId') || activePriceTabId || priceTabs[0]?.id || '';
  syncVehiclesFromActiveTab();
  vehicles = cloneVehicles(load('vehicles') || vehicles);
  templates = ensureTemplateIds(load('templates') || templates);
  clients = load('clients') || clients;
  managerClients = load('managerClients') || managerClients;
  uiState = { ...defaultUiState, ...(load('uiState') || uiState) };
  uiState.preferences = mergePreferences(uiState.preferences);
  clientManagerState = { ...defaultClientManagerState, ...(load('clientManagerState') || clientManagerState) };
  clientManagerState.columnVisibility = { ...defaultClientManagerState.columnVisibility, ...(clientManagerState.columnVisibility || {}) };
  clientManagerState.dateRange = { ...defaultClientManagerState.dateRange, ...(clientManagerState.dateRange || {}) };
  clientManagerState.actionVisibility = { ...defaultActionVisibility, ...(clientManagerState.actionVisibility || {}) };
  clientManagerState.contactAssistant = { ...defaultClientManagerState.contactAssistant, ...(clientManagerState.contactAssistant || {}) };
  clientManagerState.customActions = (clientManagerState.customActions || []).map(action => ({ visible: true, ...action }));
  clientManagerState.exportOptions = normalizeExportOptions(clientManagerState.exportOptions || defaultClientManagerState.exportOptions);
  clientManagerState.pagination = normalizePaginationState(clientManagerState.pagination || defaultClientManagerState.pagination);
  snapshots = load('snapshots') || snapshots;
  applyPreferences();
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
  startContactLogTicker();
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
    message: 'Esto eliminará los datos guardados, ten en cuenta que si no tienes una copia resguardada, la información se perderá.',
    confirmText: 'Limpiar',
    onConfirm: () => {
      localStorage.clear();
      priceTabs = createDefaultPriceTabs();
      activePriceTabId = priceTabs[0]?.id || '';
      vehicles = cloneVehicles(getActivePriceTab()?.vehicles || defaultVehicles);
      templates = ensureTemplateIds([...defaultTemplates]);
      clients = [];
      managerClients = [];
      snapshots = [];
      uiState = {
        ...defaultUiState,
        templateSearch: '',
        clientSearch: '',
        profileSearch: '',
        globalSettings: mergeGlobalSettings(defaultUiState.globalSettings),
        preferences: mergePreferences(defaultUiState.preferences)
      };
      clientManagerState = { ...defaultClientManagerState };
      selectedTemplateIndex = 0;
      selectedTemplateId = templates[0].id;
      planDraftApplied = false;
      applyToggleState();
      applyPreferences();
      applyStatusPalette();
      renderVehicleTable();
      renderTemplates();
      renderPlanForm();
      renderClients();
      renderClientManager();
      renderWelcomeHero();
      renderAdvisorNote();
      renderGlobalSettings();
      renderSnapshots();
      renderStats();
      persist();
      showToast('Datos locales eliminados', 'success');
    }
  });
}
