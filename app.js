import { firebaseConfig } from './firebase-config.js';

const currency = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });
const number = new Intl.NumberFormat('es-AR');
const BRANDS = ['Chevrolet', 'Renault', 'FIAT', 'Volkswagen', 'Peugeot'];
const DEFAULT_BRAND = 'Chevrolet';
const DEFAULT_WITHDRAWAL = { installments: [], requirementType: 'percent', requirementValue: null, mode: 'sorteo_licitacion' };
const BRAND_COLOR_PALETTE = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#a855f7', '#14b8a6'];
const DEFAULT_PLAN_SCHEME = [
  { start: 2, end: 12 },
  { start: 13, end: 21 },
  { start: 22, end: 84 },
  { start: 85, end: 120 }
];
const DEFAULT_QUOTE_PAYMENTS = [
  { label: 'Cuota 2 - 12', amount: null, detail: '' },
  { label: 'Cuota 13 - 84', amount: null, detail: '' }
];
const DEFAULT_QUOTE_BENEFITS = [
  'Descuento en el seguro del 0km',
  'Elección del Color de la unidad',
  '40-50% Descuento en servicio post venta para accesorios'
];
const DEFAULT_QUOTE_FOOTER = 'Gastos de Retiro: Acarreo, flete, patentamiento, prenda, formulario, gestoría, sellado, aranceles admin. ya incluidos en valor de la cuota';
const DEFAULT_FACTORY_PRICE_LABEL = 'Precio cotizado';
const DEFAULT_PREQUOTE_MESSAGE = 'Esta cotización debe ser validada y confirmada con el sector correspondiente.\nFavor de enviar las fotos del vehículo al asesor para obtener los datos finales.';
const DEFAULT_BONIFIED_PAYMENT = {
  fakeOriginal: null,
  bonification: null,
  concept: '',
  amount: null
};
const DEFAULT_QUOTE_VISIBILITY = {
  'meta.quoteNumber': true,
  'meta.quoteDate': true,
  'meta.quoteExpiry': true,
  'meta.advisor': true,
  'client.name': true,
  'client.dni': true,
  'client.cuil': true,
  'client.cel': true,
  'client.location': true,
  'client.postalCode': true,
  'vehicle.title': true,
  'vehicle.brand': true,
  'vehicle.model': true,
  'vehicle.year': true,
  'vehicle.plate': true,
  'vehicle.kms': true,
  'vehicle.factoryPrice': true,
  'newVehicle.section': true,
  'newVehicle.brand': true,
  'newVehicle.model': true,
  payments: true,
  preQuote: true,
  notes: true,
  benefits: true,
  footer: true
};
const BRAND_PLAN_SCHEMES = {
  FIAT: [
    { start: 2, end: 12 },
    { start: 13, end: 24 },
    { start: 25, end: 84 }
  ],
  Volkswagen: [
    { start: 2, end: 12 },
    { start: 13, end: 84 }
  ],
  Renault: [
    { start: 2, end: 12 },
    { start: 13, end: 24 },
    { start: 25, end: 84 }
  ]
};
const defaultBrandSettings = BRANDS.map((brand, index) => ({
  name: brand,
  color: BRAND_COLOR_PALETTE[index % BRAND_COLOR_PALETTE.length],
  planScheme: BRAND_PLAN_SCHEMES[brand] || DEFAULT_PLAN_SCHEME
}));

const panelTitles = {
  dashboard: 'Inicio',
  templates: 'Plantillas',
  vehicles: 'Autos y Valores',
  plans: 'Cotizaciones',
  quoteGenerator: 'Mis Cotizaciones',
  clientManager: 'Gestor de Clientes',
  scheduledClients: 'Clientes Programados',
  importedDataManager: 'Administrar Datos Importados',
  moduleManagement: 'Gestión de Módulos'
};

const NAV_PARENT_MAP = {
  importedDataManager: 'clientManager'
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
  templateVariations: {
    initialSelectedId: null
  },
  templatePreview: {
    clientId: null
  },
  planDraft: {},
  quoteSearch: '',
  toggles: { showReservations: true, showIntegration: true },
  vehicleFilters: { brand: 'all' },
  preferences: {
    fontSizes: { ...defaultPreferenceFontSizes },
    phoneDisplay: 'plain',
    contextMenuVisibility: { data: {}, actions: {} },
    scrollTopEnabled: true,
    bulkMessageWarning: {
      enabled: false,
      threshold: 30,
      accounts: {}
    }
  },
  quoteGenerator: {
    draft: null,
    selectedId: null,
    hasSession: false,
    view: 'hub',
    hubSearch: '',
    hubSearchInput: '',
    clientFilterId: null
  },
  globalSettings: {
    advisorName: 'Planes de Ahorro Argentina',
    clientType: '',
    statusPalette: {
      contacted: { color: '#34d399', opacity: 0.16 },
      noNumber: { color: '#f87171', opacity: 0.16 },
      favorite: { color: '#f6b04b', opacity: 0.16 },
      pending: { color: '#9fb1c5', opacity: 0.14 }
    },
    accounts: [
      { id: 'acct-default', name: 'Planes de Ahorro Argentina', alias: '', phone: '', device: '' }
    ],
    activeAccountId: 'acct-default'
  },
  advisorNote: ''
};

const SESSION_IDLE_HOURS = 4;
const SESSION_IDLE_TIMEOUT_MS = SESSION_IDLE_HOURS * 60 * 60 * 1000;
const OFFLINE_SESSION_MS = SESSION_IDLE_TIMEOUT_MS;
const IDLE_TIMEOUT_MS = SESSION_IDLE_TIMEOUT_MS;
const REMOTE_SYNC_DEBOUNCE_MS = 5000;
const REMOTE_SYNC_MIN_INTERVAL_MS = 45000;
const PRESENCE_ACTIVITY_DEBOUNCE_MS = 30000;
const SYNC_HASH_STORAGE_KEY = 'syncHashes';
const STORAGE_PREFIX = 'acp';
const STORAGE_GLOBAL_PREFIX = `${STORAGE_PREFIX}:global:`;
const STORAGE_USER_PREFIX = `${STORAGE_PREFIX}:user:`;
const STORAGE_LAST_USER_KEY = 'lastUserId';
const STORAGE_GUEST_ID = 'guest';

const BUENOS_AIRES_TIMEZONE = 'America/Argentina/Buenos_Aires';

const REMOTE_DATA_KEYS = [
  'vehicles',
  'templates',
  'clients',
  'managerClients',
  'uiState',
  'clientManagerState',
  'brandSettings',
  'generatedQuotes'
];

const LOCAL_ONLY_KEYS = [
  'snapshots',
  'priceDrafts',
  'activePriceTabId',
  'activePriceSource'
];

const STORAGE_SCOPED_KEYS = new Set([
  ...REMOTE_DATA_KEYS,
  ...LOCAL_ONLY_KEYS,
  'localUpdatedAt',
  SYNC_HASH_STORAGE_KEY
]);

const MODULE_GROUPS = [
  { id: 'general', title: 'Módulos Generales' },
  { id: 'options', title: 'Opciones' }
];

const MODULE_CATALOG = [
  { id: 'dashboard', label: 'Inicio', type: 'module', exportable: false, group: 'general' },
  { id: 'clientManager', label: 'Gestor de Clientes: Listado de Clientes', type: 'module', exportable: true, group: 'general' },
  { id: 'quickActions', label: 'Sub Módulo: Acciones Rápidas', type: 'submodule', parent: 'clientManager', exportable: true, group: 'general' },
  { id: 'contactLog', label: 'Sub Módulo: Registro de Contactados', type: 'submodule', parent: 'clientManager', exportable: true, group: 'general' },
  { id: 'journeyReport', label: 'Sub Módulo: Registro de Jornada', type: 'submodule', parent: 'clientManager', exportable: true, group: 'general' },
  { id: 'scheduledClients', label: 'Clientes Programados', type: 'module', exportable: true, group: 'general' },
  { id: 'templates', label: 'Plantillas', type: 'module', exportable: true, group: 'general' },
  { id: 'plans', label: 'Cotizaciones', type: 'module', exportable: true, group: 'general' },
  { id: 'quoteGenerator', label: 'Mis Cotizaciones', type: 'module', exportable: true, group: 'general' },
  { id: 'vehicles', label: 'Autos y Valores', type: 'module', exportable: true, group: 'general' },
  { id: 'preferences', label: 'Opciones: Preferencias', type: 'module', exportable: true, group: 'options' },
  { id: 'accounts', label: 'Opciones: Gestión de cuentas', type: 'module', exportable: true, group: 'options' }
];

const novemberVehicles = [
  {
    name: 'NUEVO ONIX 1.0 TURBO LT MT',
    brand: DEFAULT_BRAND,
    basePrice: 30430900,
    integration: 9129270,
    planProfile: { label: '80/20 (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 320051, '13a21': 313692, '22a84': 312912, '85a120': 311352 },
    cuotaPura: 202873,
    reservations: { '1': 1137480, '3': 1478724, '6': 1706220 },
    withdrawal: { ...DEFAULT_WITHDRAWAL, mode: 'pactada' },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6, llave x llave',
      bonificacion: 'Promo 12 cuotas fijas + 50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'NUEVO PLAN ONIX PLUS SEDAN 1.0 TURBO LT MT',
    brand: DEFAULT_BRAND,
    basePrice: 30430900,
    integration: 9129270,
    planProfile: { label: '100% (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 326758, '13a21': 370922, '22a84': 369946, '85a120': 368971 },
    cuotaPura: 253591,
    reservations: { '1': 1137480, '3': 1478724, '6': 1706220 },
    withdrawal: { ...DEFAULT_WITHDRAWAL, mode: 'pactada' },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6, llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'LA NUEVA MONTANA LT 1.2 AT',
    brand: DEFAULT_BRAND,
    basePrice: 37808900,
    integration: 11342670,
    planProfile: { label: '80/20 (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 397648, '13a21': 389747, '22a84': 388584, '85a120': 388584 },
    cuotaPura: 252059,
    reservations: { '1': 1211400, '3': 1574820, '6': 1817100 },
    withdrawal: { ...DEFAULT_WITHDRAWAL, mode: 'pactada' },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6, llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'LA NUEVA S10 CD 2.8 TD 4x2 WT',
    brand: DEFAULT_BRAND,
    basePrice: 48596900,
    integration: 19438760,
    planProfile: { label: '60/40 (84 cuotas)', planType: '22a84' },
    availablePlans: ['22a84'],
    shareByPlan: { '2a12': 537310, '13a21': 527066, '22a84': 525464 },
    cuotaPura: 347121,
    reservations: { '1': 1825000, '3': 2372500, '6': 2737500 },
    withdrawal: { ...DEFAULT_WITHDRAWAL, mode: 'pactada' },
    benefits: {
      pactada: 'Acepta llave x llave',
      bonificacion: 'Débito automático obligatorio con TC'
    }
  },
  {
    name: 'NUEVA TRACKER LT 1.2AT',
    brand: DEFAULT_BRAND,
    basePrice: 37823900,
    integration: 11347170,
    planProfile: { label: '80/20 (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 397806, '13a21': 389902, '22a84': 388156, '85a120': 310714 },
    cuotaPura: 252159,
    reservations: { '1': 1211710, '3': 1575223, '6': 1817565 },
    withdrawal: { ...DEFAULT_WITHDRAWAL, mode: 'pactada' },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6 , llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'NUEVA SPIN 1.8 LT 5AA MT',
    brand: DEFAULT_BRAND,
    basePrice: 35116900,
    integration: 10535070,
    planProfile: { label: '70/30 (84 cuotas)', planType: '22a84' },
    availablePlans: ['22a84'],
    shareByPlan: { '2a12': 435603, '13a21': 428039, '22a84': 426914 },
    cuotaPura: 292641,
    reservations: { '1': 1177600, '3': 1530880, '6': 1766400 },
    withdrawal: { ...DEFAULT_WITHDRAWAL, mode: 'pactada' },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6 , llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  }
];

const decemberVehicles = [
  {
    name: 'NUEVO ONIX 1.0 TURBO LT MT',
    brand: DEFAULT_BRAND,
    basePrice: 30887900,
    integration: 9266370,
    planProfile: { label: '80/20 (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 324858, '13a21': 318403, '22a84': 317611, '85a120': 316027 },
    cuotaPura: 205919,
    reservations: { '1': 1170025, '3': 1521033, '6': 1755038 },
    withdrawal: { ...DEFAULT_WITHDRAWAL, mode: 'pactada' },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6, llave x llave',
      bonificacion: 'Promo 12 cuotas fijas + 50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'NUEVO PLAN ONIX PLUS SEDAN 1.0 TURBO LT MT',
    brand: DEFAULT_BRAND,
    basePrice: 30887900,
    integration: 9266370,
    planProfile: { label: '100% (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 331665, '13a21': 376492, '22a84': 375502, '85a120': 374512 },
    cuotaPura: 257399,
    reservations: { '1': 1170025, '3': 1521033, '6': 1755038 },
    withdrawal: { ...DEFAULT_WITHDRAWAL, mode: 'pactada' },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6, llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'LA NUEVA MONTANA LT 1.2 AT',
    brand: DEFAULT_BRAND,
    basePrice: 38489900,
    integration: 11546970,
    planProfile: { label: '80/20 (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 404810, '13a21': 396767, '22a84': 395583, '85a120': 395583 },
    cuotaPura: 256599,
    reservations: { '1': 1246142, '3': 1619985, '6': 1869213 },
    withdrawal: { ...DEFAULT_WITHDRAWAL, mode: 'pactada' },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6, llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'LA NUEVA S10 CD 2.8 TD 4x2 WT',
    brand: DEFAULT_BRAND,
    basePrice: 48596900,
    integration: 19438760,
    planProfile: { label: '60/40 (84 cuotas)', planType: '22a84' },
    availablePlans: ['22a84'],
    shareByPlan: { '2a12': 537310, '13a21': 527066, '22a84': 525464 },
    cuotaPura: 347121,
    reservations: { '1': 1900250, '3': 2470325, '6': 2850375 },
    withdrawal: { ...DEFAULT_WITHDRAWAL, mode: 'pactada' },
    benefits: {
      pactada: 'Acepta llave x llave',
      bonificacion: 'Débito automático obligatorio con TC'
    }
  },
  {
    name: 'NUEVA TRACKER LT 1.2AT',
    brand: DEFAULT_BRAND,
    basePrice: 38391900,
    integration: 11517570,
    planProfile: { label: '80/20 (120 cuotas)', planType: '85a120' },
    availablePlans: ['85a120'],
    shareByPlan: { '2a12': 403780, '13a21': 395757, '22a84': 394576, '85a120': 393985 },
    cuotaPura: 255946,
    reservations: { '1': 1246450, '3': 1620385, '6': 1869675 },
    withdrawal: { ...DEFAULT_WITHDRAWAL, mode: 'pactada' },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6 , llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  },
  {
    name: 'NUEVA SPIN 1.8 LT 5AA MT',
    brand: DEFAULT_BRAND,
    basePrice: 35116900,
    integration: 10535070,
    planProfile: { label: '70/30 (84 cuotas)', planType: '22a84' },
    availablePlans: ['22a84'],
    shareByPlan: { '2a12': 435603, '13a21': 428039, '22a84': 426914, '85a120': 426914 },
    cuotaPura: 292641,
    reservations: { '1': 1210710, '3': 1573923, '6': 1816065 },
    withdrawal: { ...DEFAULT_WITHDRAWAL, mode: 'pactada' },
    benefits: {
      pactada: 'Chevroplan pactada cuota nº6 , llave x llave',
      bonificacion: '50% desc. en las primeras 3 cuotas del seguro'
    }
  }
];

const defaultVehicles = decemberVehicles;

const dynamicVariableCatalog = [
  {
    group: 'Cliente',
    items: [
      { key: 'cliente', label: 'Nombre del cliente' },
      { key: 'telefono', label: 'Celular' },
      { key: 'telefono_limpio', label: 'Celular sin formato' },
      { key: 'dni', label: 'DNI' },
      { key: 'cuil', label: 'CUIL' },
      { key: 'cuit', label: 'CUIT' },
      { key: 'fecha_nacimiento', label: 'Fecha de nacimiento' },
      { key: 'edad', label: 'Edad' },
      { key: 'fecha_compra', label: 'Fecha de compra' },
      { key: 'fecha_carga', label: 'Fecha de carga' },
      { key: 'fecha_contacto', label: 'Último contacto' },
      { key: 'localidad', label: 'Localidad' },
      { key: 'provincia', label: 'Provincia' },
      { key: 'ciudad', label: 'Ciudad' },
      { key: 'cp', label: 'Código postal' },
      { key: 'modelo_actual', label: 'Modelo actual' },
      { key: 'marca_actual', label: 'Marca actual' },
      { key: 'plan', label: 'Plan del cliente' },
      { key: 'cuota', label: 'Cuota actual' },
      { key: 'tipo', label: 'Tipo/Notas del cliente' },
      { key: 'notas', label: 'Notas del cliente' },
      { key: 'estado', label: 'Estado del cliente' },
      { key: 'anio_retiro', label: 'Año de retiro' },
      { key: 'km', label: 'Kilometraje' },
      { key: 'entrega_usado', label: 'Entrega usado (Sí/No)' },
      { key: 'valor_efectivo', label: 'Valor efectivo del usado' }
    ]
  },
  {
    group: 'Asesor',
    items: [
      { key: 'asesor', label: 'Nombre del asesor' }
    ]
  },
  {
    group: 'Plan y vehículo nuevo',
    items: [
      { key: 'modelo_nuevo', label: 'Modelo nuevo' },
      { key: 'marca_nuevo', label: 'Marca nuevo' },
      { key: 'plan_tipo', label: 'Tipo de plan' },
      { key: 'cuotas_maximas', label: 'Cantidad de cuotas' },
      { key: 'precio_lista', label: 'Precio de lista' },
      { key: 'integracion', label: 'Integración' },
      { key: 'cuota_pura', label: 'Cuota pura' },
      { key: 'reserva_1', label: 'Reserva 1' },
      { key: 'reserva_3', label: 'Reserva 3' },
      { key: 'reserva_6', label: 'Reserva 6' },
      { key: 'monto_adelantado', label: 'Monto adelantado' },
      { key: 'precio_personalizado', label: 'Precio personalizado' },
      { key: 'valor_usado', label: 'Valor usado' }
    ]
  },
  {
    group: 'Fechas',
    items: [
      { key: 'fecha_hoy', label: 'Fecha de hoy' },
      { key: 'fecha_hoy_iso', label: 'Fecha de hoy (ISO)' },
      { key: 'hora_hoy', label: 'Hora actual' },
      { key: 'mes_actual', label: 'Mes actual' },
      { key: 'anio_actual', label: 'Año actual' }
    ]
  }
];

const planTerms = {
  '2a12': 120,
  '13a21': 120,
  '22a84': 84,
  '85a120': 120,
  'ctapura': 120
};

const PLAN_TYPES = ['2a12', '13a21', '22a84', '85a120', 'ctapura'];
const PLAN_START_INSTALLMENT = 2;

const dynamicVariableIndex = dynamicVariableCatalog.reduce((acc, group) => {
  group.items.forEach(item => acc.set(item.key, item));
  return acc;
}, new Map());

function resolveDynamicVariableLabel(key) {
  return dynamicVariableIndex.get(key)?.label || key;
}

function filterDynamicVariableCatalog(search = '') {
  const term = (search || '').trim().toLowerCase();
  if (!term) return dynamicVariableCatalog;
  return dynamicVariableCatalog
    .map(group => ({
      ...group,
      items: group.items.filter(item => item.key.toLowerCase().includes(term) || item.label.toLowerCase().includes(term))
    }))
    .filter(group => group.items.length);
}

function resolveMaxInstallments(maxInstallments, fallbackPlanType = '85a120') {
  const raw = Number(maxInstallments);
  if (Number.isFinite(raw) && raw > 0) return Math.round(raw);
  return planTerms[fallbackPlanType] || 120;
}

function resolveAvailablePlans(maxInstallments) {
  const normalizedMax = resolveMaxInstallments(maxInstallments);
  const eligible = PLAN_TYPES.filter(plan => (planTerms[plan] || 0) <= normalizedMax);
  if (eligible.length) return eligible;
  return [PLAN_TYPES.reduce((minPlan, plan) => (planTerms[plan] || 0) < (planTerms[minPlan] || 0) ? plan : minPlan, PLAN_TYPES[0])];
}

function resolvePlanTypeFromMax(maxInstallments, fallbackPlanType = '85a120') {
  const available = resolveAvailablePlans(maxInstallments);
  if (available.includes(fallbackPlanType)) return fallbackPlanType;
  if (Number.isFinite(Number(maxInstallments)) && Number(maxInstallments) <= (planTerms['22a84'] || 84)) {
    return available.includes('22a84') ? '22a84' : available[0];
  }
  return available.includes('85a120') ? '85a120' : available[0];
}

function getPlanTypeForVehicle(vehicle) {
  const available = vehicle?.availablePlans?.length ? vehicle.availablePlans : PLAN_TYPES;
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
  { id: 'update_status', label: 'Modificación de estado', icon: 'bx-tag', color: '#60a5fa' },
  { id: 'reassign_account', label: 'Reasignación de cuenta', icon: 'bx-transfer-alt', color: '#a78bfa' },
  { id: 'open_notes', label: 'Notas', icon: 'bx-note', color: '#94a3b8' },
  { id: 'client_quotes', label: 'Cotizaciones del cliente', icon: 'bx-folder-open', color: '#38bdf8' },
  { id: 'copy_message', label: 'Copiar mensaje', icon: 'bx-message-square-dots', color: '#38bdf8' },
  { id: 'copy_template', label: 'Copiar plantilla', icon: 'bx-copy-alt', color: '#f59e0b' },
  { id: 'copy_phone', label: 'Copiar número', icon: 'bx-phone', color: '#a855f7' },
  { id: 'schedule_contact', label: 'Programar contacto', icon: 'bx-calendar-event', color: '#7dd3b0' }
];

const JOURNEY_STATUS_OPTIONS = [
  { key: 'sin_respuesta', label: 'Sin Respuesta' },
  { key: 'sin_respuesta_no_disponible', label: 'Sin respuesta: Número no disponible' },
  { key: 'con_respuesta_numero_equivocado', label: 'Con Respuesta: Número equivocado' },
  { key: 'con_respuesta_no_interesado', label: 'Con Respuesta: Hecha la propuesta pero no interesado.' },
  { key: 'con_respuesta_lo_piensa', label: 'Con Respuesta: Hecha la propuesta y lo va a pensar.' },
  { key: 'con_respuesta_recontacto', label: 'Con Respuesta: Solicita recontactarlo en el futuro.' },
  { key: 'posible_venta_espera_fotos', label: 'Con Respuesta (Posible Venta): Hecha la propuesta y le interesa. Esperando recibir fotos del vehículo' },
  { key: 'posible_venta_cotizacion', label: 'Con Respuesta  (Posible Venta): Fotos Recibidas, Cotización enviada. En proceso de análisis y decisión final.' },
  { key: 'venta_pausada', label: 'Con Respuesta (Venta Pausada): No desea continuar con la operación.' },
  { key: 'venta_concretada', label: 'Venta concretada correctamente.' }
];

const JOURNEY_STATUS_SHORT_LABELS = {
  sin_respuesta: 'Sin Respuesta',
  sin_respuesta_no_disponible: 'N° no disponible',
  con_respuesta_numero_equivocado: 'N° Equivocado',
  con_respuesta_no_interesado: 'No Interesado',
  con_respuesta_lo_piensa: 'Pensandolo',
  con_respuesta_recontacto: 'A Futuro',
  posible_venta_espera_fotos: 'Esperando Fotos',
  posible_venta_cotizacion: 'Cotiz. Enviada',
  venta_pausada: 'Suspendido',
  venta_concretada: 'Terminada'
};

const JOURNEY_STATUS_GROUPS = [
  {
    id: 'sin_respuesta',
    label: 'Sin respuesta',
    emoji: '⚪',
    keys: ['sin_respuesta', 'sin_respuesta_no_disponible']
  },
  {
    id: 'con_respuesta',
    label: 'Con respuesta',
    emoji: '🔵',
    keys: ['con_respuesta_numero_equivocado', 'con_respuesta_no_interesado', 'con_respuesta_lo_piensa', 'con_respuesta_recontacto']
  },
  {
    id: 'posible_venta',
    label: 'Posible venta',
    emoji: '🟡',
    keys: ['posible_venta_espera_fotos', 'posible_venta_cotizacion']
  },
  {
    id: 'venta_pausada',
    label: 'Venta pausada',
    emoji: '🔴',
    keys: ['venta_pausada']
  },
  {
    id: 'venta_concretada',
    label: 'Venta concretada',
    emoji: '🟢',
    keys: ['venta_concretada']
  }
];

const DEFAULT_JOURNEY_STATUS_KEY = 'sin_respuesta';

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
  accountFilter: 'all',
  groupByModel: true,
  dateRange: { from: '', to: '' },
  columnVisibility: Object.fromEntries(Object.keys(clientColumns).map(k => [k, !!clientColumns[k].default])),
  selection: {},
  exportScope: 'filtered',
  exportOptions: {
    mode: 'local',
    columnOrder: Object.keys(exportableColumns),
    selectedColumns: Object.keys(exportableColumns)
  },
  contactLogSearch: '',
  contactLogStatusFilter: 'all',
  contactLogRange: '24h',
  editingMode: false,
  actionVisibility: { ...defaultActionVisibility },
  customActions: [],
  pagination: { size: 0, page: 1 },
  contactAssistant: {
    interval: 15,
    currentIndex: 0,
    lastAction: null
  },
  contactAssistantQuickAdjust: {
    search: '',
    selectedId: null
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
  status: '260px',
  actions: '340px'
};

const DEFAULT_INITIAL_TEMPLATE = {
  id: 'tpl-initial',
  type: 'initial',
  title: 'Mensaje de inicio',
  rotationIndex: 0,
  variations: [
    {
      id: 'tpl-initial-var-1',
      title: 'Variación 1',
      body: `Buenas tardes {{cliente}} mi nombre es {{asesor}} me contacto desde Chevrolet Argentina para consultarte si al día de la fecha seguís teniendo la {{modelo_actual}} que retiraste en uno de nuestros concesionarios en el año {{anio_retiro}}?\n\nAnte la gran cantidad de unidades fabricadas en 2025 Chevrolet lanzó la campaña de renovación de unidades con cupos limitados y valores directos de fábrica.\n\nEn caso de ser número equivocado o no ser la persona indicada, te pido disculpas y por favor avísame así no volvemos a escribirte. Muchas gracias.\n{{asesor}}`
    }
  ]
};

const DEFAULT_ADDITIONAL_TEMPLATES = [
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
    body: 'INFORME DE COTIZACIÓN\nMarca: Chevrolet\nModelo: {{modelo_actual}}\nAño: {{anio_retiro}}\nMotor: 1.4 Turbo\nCantidad de puertas: 5\nKilometraje: {{km}}\n\nCotizado en un valor en efectivo de ${{valor_efectivo}} pesos arg.\n\nEstimado cliente recuerde enviar a su asesor de ventas 10 imágenes/foto del usado para validar la cotización.\nFuente: INFOAUTO Guía oficial de Precios Noviembre 2025.'
  }
];

const defaultTemplates = [DEFAULT_INITIAL_TEMPLATE, ...DEFAULT_ADDITIONAL_TEMPLATES];

function normalizeBrand(brand = '') {
  const cleaned = String(brand || '').trim();
  return cleaned || DEFAULT_BRAND;
}

function normalizePlanScheme(scheme = []) {
  const normalized = (scheme || []).map(item => {
    const startRaw = item?.start ?? item?.from ?? item?.cuotaInicial;
    const endRaw = item?.end ?? item?.to ?? item?.cuotaFinal;
    const start = Number(startRaw);
    const end = Number(endRaw);
    if (!Number.isFinite(start) || !Number.isFinite(end)) return null;
    if (start <= 0 || end <= 0) return null;
    const safeStart = Math.round(start);
    const safeEnd = Math.round(end);
    return safeStart <= safeEnd ? { start: safeStart, end: safeEnd } : { start: safeEnd, end: safeStart };
  }).filter(Boolean);
  if (normalized.length) {
    return normalized.slice(0, 5);
  }
  return DEFAULT_PLAN_SCHEME.map(range => ({ ...range }));
}

function resolveBrandPlanScheme(brandName, scheme) {
  const fallback = BRAND_PLAN_SCHEMES[brandName] || DEFAULT_PLAN_SCHEME;
  return normalizePlanScheme(scheme || fallback);
}

function normalizeHexColor(color, fallback) {
  const cleaned = String(color || '').trim();
  if (/^#([0-9a-f]{3}){1,2}$/i.test(cleaned)) return cleaned;
  return fallback;
}

function defaultColorForBrand(brand) {
  const index = BRANDS.indexOf(brand);
  if (index >= 0) return BRAND_COLOR_PALETTE[index % BRAND_COLOR_PALETTE.length];
  const seed = String(brand || '').split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return BRAND_COLOR_PALETTE[seed % BRAND_COLOR_PALETTE.length];
}

function normalizeBrandSettings(settings = [], list = vehicles) {
  const map = new Map();
  defaultBrandSettings.forEach(brand => {
    const name = normalizeBrand(brand.name);
    map.set(name, {
      name,
      color: normalizeHexColor(brand.color, defaultColorForBrand(name)),
      planScheme: resolveBrandPlanScheme(name, brand.planScheme)
    });
  });
  (settings || []).forEach(brand => {
    const name = normalizeBrand(brand?.name || brand?.brand);
    if (!name) return;
    map.set(name, {
      name,
      color: normalizeHexColor(brand?.color, defaultColorForBrand(name)),
      planScheme: resolveBrandPlanScheme(name, brand?.planScheme)
    });
  });
  (list || []).forEach(vehicle => {
    const name = normalizeBrand(vehicle?.brand);
    if (!map.has(name)) {
      map.set(name, {
        name,
        color: defaultColorForBrand(name),
        planScheme: resolveBrandPlanScheme(name)
      });
    }
  });
  return Array.from(map.values());
}

function ensureBrandSettings(list = brandSettings, listVehicles = vehicles) {
  brandSettings = normalizeBrandSettings(list, listVehicles);
  return brandSettings;
}

function getBrandSetting(brand) {
  const normalized = normalizeBrand(brand);
  return ensureBrandSettings().find(item => item.name === normalized);
}

function getBrandColor(brand) {
  return getBrandSetting(brand)?.color || defaultColorForBrand(normalizeBrand(brand));
}

function getBrandPlanScheme(brand) {
  const normalized = normalizeBrand(brand);
  return getBrandSetting(normalized)?.planScheme || resolveBrandPlanScheme(normalized);
}

function buildPlanRangeKey(range) {
  return `${range.start}a${range.end}`;
}

function planLabelFromKey(key) {
  if (key === 'ctapura') return 'Cuota pura';
  const match = String(key || '').match(/^(\d+)\s*a\s*(\d+)$/i);
  if (match) {
    return `Cuota ${match[1]} a ${match[2]}`;
  }
  return key || 'Plan';
}

function getPlanRangesForBrand(brand, totalInstallments) {
  const scheme = getBrandPlanScheme(brand);
  return scheme.map(range => {
    const from = Math.max(range.start, PLAN_START_INSTALLMENT);
    const to = Number.isFinite(Number(totalInstallments))
      ? Math.min(range.end, Number(totalInstallments))
      : range.end;
    return {
      key: buildPlanRangeKey(range),
      from,
      to,
      label: planLabelFromKey(buildPlanRangeKey(range))
    };
  }).filter(range => range.from <= range.to);
}

function toRgba(hex, alpha = 0.2) {
  const cleaned = hex.replace('#', '');
  const chunk = cleaned.length === 3
    ? cleaned.split('').map(ch => ch + ch).join('')
    : cleaned;
  const num = parseInt(chunk, 16);
  if (Number.isNaN(num)) return `rgba(15, 22, 37, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function buildBrandCardStyle(brand) {
  const color = getBrandColor(brand);
  const soft = toRgba(color, 0.12);
  const border = toRgba(color, 0.28);
  return `--brand-color:${color}; --brand-color-soft:${soft}; --brand-color-border:${border};`;
}

function normalizePlanProfile(profile = {}, planTypeFallback = '85a120') {
  const financedRaw = Number(profile.financedPct);
  const integrationRaw = Number(profile.integrationPct);
  const maxInstallmentsRaw = Number(profile.maxInstallments);
  const financedPct = Number.isFinite(financedRaw) ? financedRaw : null;
  const integrationPct = Number.isFinite(integrationRaw) ? integrationRaw : null;
  const maxInstallments = Number.isFinite(maxInstallmentsRaw) ? Math.round(maxInstallmentsRaw) : null;
  return {
    label: profile.label || '',
    planType: profile.planType || planTypeFallback,
    financedPct,
    integrationPct,
    maxInstallments
  };
}

function normalizeWithdrawal(withdrawal = {}) {
  const installments = Array.isArray(withdrawal.installments)
    ? withdrawal.installments.map(Number).filter(val => Number.isFinite(val) && val > 0)
    : [];
  const legacyMode = withdrawal.mode;
  const allowedModes = ['pactada', 'sorteo_licitacion'];
  let mode = allowedModes.includes(legacyMode) ? legacyMode : 'sorteo_licitacion';
  if (['ambos', 'sorteo', 'licitacion'].includes(legacyMode)) {
    mode = 'sorteo_licitacion';
  }
  const inferredType = withdrawal.requirementType
    || (Number.isFinite(Number(withdrawal.requirementAmount)) ? 'amount' : 'percent');
  const requirementType = inferredType === 'amount' ? 'amount' : 'percent';
  const requirementRaw = requirementType === 'amount'
    ? Number(withdrawal.requirementAmount ?? withdrawal.requirementValue)
    : Number(withdrawal.requirementPct ?? withdrawal.requirementValue);
  const requirementValue = Number.isFinite(requirementRaw) ? requirementRaw : null;
  return {
    installments,
    requirementType,
    requirementValue,
    mode
  };
}

function normalizeVehicle(vehicle = {}) {
  const baseCuotaPura = Number(vehicle.cuotaPura || vehicle.shareByPlan?.['ctapura'] || 0);
  const rawShareByPlan = { ...(vehicle.shareByPlan || {}) };
  const normalized = {
    ...vehicle,
    name: vehicle.name || '',
    brand: normalizeBrand(vehicle.brand),
    basePrice: Number(vehicle.basePrice || 0),
    integration: Number(vehicle.integration || 0),
    cuotaPura: baseCuotaPura,
    planProfile: normalizePlanProfile(vehicle.planProfile, vehicle.planProfile?.planType || '85a120'),
    availablePlans: vehicle.availablePlans?.length
      ? [...vehicle.availablePlans]
      : ['2a12', '13a21', '22a84', '85a120', 'ctapura'],
    shareByPlan: {
      ...rawShareByPlan,
      '2a12': Number(rawShareByPlan?.['2a12'] || 0),
      '13a21': Number(rawShareByPlan?.['13a21'] || 0),
      '22a84': Number(rawShareByPlan?.['22a84'] || 0),
      '85a120': Number(rawShareByPlan?.['85a120'] || 0),
      'ctapura': Number(rawShareByPlan?.['ctapura'] || baseCuotaPura || 0)
    },
    reservations: {
      '1': Number(vehicle.reservations?.['1'] || 0),
      '3': Number(vehicle.reservations?.['3'] || 0),
      '6': Number(vehicle.reservations?.['6'] || 0)
    },
    benefits: {
      pactada: vehicle.benefits?.pactada || '',
      bonificacion: vehicle.benefits?.bonificacion || ''
    },
    withdrawal: normalizeWithdrawal(vehicle.withdrawal || DEFAULT_WITHDRAWAL)
  };
  return normalized;
}

function cloneVehicles(list) {
  return (list || []).map(v => {
    const normalized = normalizeVehicle(v);
    return {
      ...normalized,
      shareByPlan: { ...(normalized.shareByPlan || {}) },
      reservations: { ...(normalized.reservations || {}) },
      planProfile: { ...(normalized.planProfile || {}) },
      benefits: { ...(normalized.benefits || {}) },
      availablePlans: normalized.availablePlans ? [...normalized.availablePlans] : undefined,
      withdrawal: { ...(normalized.withdrawal || {}) }
    };
  });
}

const PRICE_FILES_ROOT = 'prices_files';
const ONLINE_FILES_ROOT = 'prices_img';
const MONTH_NAMES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const BRAND_FILE_PREFIX = 'precios_';

function buildPriceTabId(year, month) {
  return `${year}-${String(month || '').trim().toLowerCase()}`;
}

function buildBrandFileToken(brand = '') {
  return normalizeBrand(brand).toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function buildBrandPriceFileName(brand = '') {
  return `${BRAND_FILE_PREFIX}${buildBrandFileToken(brand)}.json`;
}

function getBrandPriceFileCandidates(folder = '') {
  return BRANDS.map(brand => `${folder}/${buildBrandPriceFileName(brand)}`);
}

function buildPriceTabLabel(year, month) {
  return `${month} ${year}`;
}

function ensurePriceTabDefaults(tab = {}) {
  return {
    ...tab,
    label: tab.label || buildPriceTabLabel(tab.year, tab.month),
    files: Array.isArray(tab.files) ? tab.files.map(file => ({ ...file })) : [],
    primaryFile: tab.primaryFile || ''
  };
}

function getActivePriceTab() {
  return priceTabs.find(t => t.id === activePriceTabId) || priceTabs[0] || null;
}

function syncActiveVehiclesToDraft({ force = false } = {}) {
  const active = getActivePriceTab();
  if (!active) return;
  if (!force && activePriceSource !== 'local' && !priceDrafts[active.id]) return;
  priceDrafts[active.id] = {
    vehicles: cloneVehicles(vehicles),
    brandSettings: ensureBrandSettings(),
    updatedAt: new Date().toISOString()
  };
}

function syncVehiclesFromDraftOrFallback(tab) {
  const draft = tab ? priceDrafts[tab.id] : null;
  if (draft?.vehicles?.length) {
    vehicles = cloneVehicles(draft.vehicles);
    brandSettings = normalizeBrandSettings(draft.brandSettings || brandSettings, vehicles);
    activePriceSource = 'local';
  } else {
    vehicles = cloneVehicles(load('vehicles') || defaultVehicles);
    brandSettings = normalizeBrandSettings(load('brandSettings') || brandSettings, vehicles);
    activePriceSource = 'local';
  }
}

function discardPriceDraft(tabId) {
  if (!tabId) return;
  delete priceDrafts[tabId];
}

const MONTH_ORDER = MONTH_NAMES.map(month => month.toLowerCase());

function getMonthIndex(monthName = '') {
  const normalized = String(monthName).trim().toLowerCase();
  return MONTH_ORDER.indexOf(normalized);
}

async function fetchJsonIfExists(path) {
  try {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) return null;
    return await response.json();
  } catch (err) {
    return null;
  }
}

async function checkPriceFileExists(path) {
  try {
    const head = await fetch(path, { method: 'HEAD', cache: 'no-store' });
    if (head.ok) return true;
    const fallback = await fetch(path, { cache: 'no-store' });
    return fallback.ok;
  } catch (err) {
    return false;
  }
}

async function resolvePriceFilePaths(tab) {
  if (!tab?.folder && !tab?.pricePath) return [];
  const folder = tab?.folder || '';
  if (folder) {
    const candidates = getBrandPriceFileCandidates(folder);
    const checks = await Promise.all(candidates.map(async candidate => {
      const exists = await checkPriceFileExists(candidate);
      return exists ? candidate : null;
    }));
    const matches = checks.filter(Boolean);
    if (matches.length) return matches;
  }
  const fallback = tab?.pricePath || (folder ? `${folder}/precios.json` : '');
  if (fallback && await checkPriceFileExists(fallback)) return [fallback];
  return [];
}

async function discoverPriceTabs() {
  const manifest = await fetchJsonIfExists(`${PRICE_FILES_ROOT}/manifest.json`);
  if (manifest?.entries?.length) {
    const checks = await Promise.all(manifest.entries.map(async entry => {
      const tab = ensurePriceTabDefaults({
        id: entry.id || buildPriceTabId(entry.year, entry.month),
        year: Number(entry.year),
        month: entry.month,
        folder: entry.folder || `${PRICE_FILES_ROOT}/${entry.year}/${entry.month}`,
        pricePath: entry.pricePath || `${PRICE_FILES_ROOT}/${entry.year}/${entry.month}/precios.json`,
        files: entry.files || []
      });
      const paths = await resolvePriceFilePaths(tab);
      return paths.length ? tab : null;
    }));
    return checks.filter(Boolean);
  }
  if (manifest?.years) {
    const entries = [];
    Object.entries(manifest.years).forEach(([year, months]) => {
      (months || []).forEach(month => {
        entries.push(ensurePriceTabDefaults({
          id: buildPriceTabId(year, month),
          year: Number(year),
          month,
          folder: `${PRICE_FILES_ROOT}/${year}/${month}`,
          pricePath: `${PRICE_FILES_ROOT}/${year}/${month}/precios.json`
        }));
      });
    });
    const checks = await Promise.all(entries.map(async tab => {
      const paths = await resolvePriceFilePaths(tab);
      return paths.length ? tab : null;
    }));
    return checks.filter(Boolean);
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const years = [];
  for (let year = currentYear + 1; year >= currentYear - 5; year -= 1) {
    years.push(year);
  }
  const checks = [];
  years.forEach(year => {
    MONTH_NAMES.forEach(month => {
      const pricePath = `${PRICE_FILES_ROOT}/${year}/${month}/precios.json`;
      const tab = ensurePriceTabDefaults({
        id: buildPriceTabId(year, month),
        year,
        month,
        folder: `${PRICE_FILES_ROOT}/${year}/${month}`,
        pricePath
      });
      checks.push(resolvePriceFilePaths(tab).then(paths => {
        if (!paths.length) return null;
        return tab;
      }));
    });
  });
  const results = await Promise.all(checks);
  return results.filter(Boolean);
}

function sortPriceTabs(list = []) {
  return [...list].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return getMonthIndex(b.month) - getMonthIndex(a.month);
  });
}

function resolveDefaultPriceTab() {
  if (!priceTabs.length) return null;
  const today = new Date();
  const todayIndex = today.getFullYear() * 12 + today.getMonth();
  const sorted = sortPriceTabs(priceTabs);
  const eligible = sorted.filter(tab => {
    const tabIndex = (tab.year || 0) * 12 + getMonthIndex(tab.month);
    return tabIndex <= todayIndex;
  });
  return eligible[0] || sorted[0] || null;
}

async function initializePriceTabs() {
  priceTabs = sortPriceTabs(await discoverPriceTabs());
  if (!priceTabs.length) {
    activePriceTabId = '';
    vehicles = cloneVehicles(load('vehicles') || defaultVehicles);
    activePriceSource = 'local';
    return;
  }
  const saved = activePriceTabId && priceTabs.find(tab => tab.id === activePriceTabId);
  const defaultTab = resolveDefaultPriceTab();
  activePriceTabId = saved?.id || defaultTab?.id || priceTabs[0].id;
  await loadPricesFromServer({ silent: true });
}

function getMostRecentPriceTab() {
  return priceTabs.reduce((latest, tab) => {
    if (!latest) return tab;
    const yearDiff = (tab.year || 0) - (latest.year || 0);
    if (yearDiff !== 0) return yearDiff > 0 ? tab : latest;
    const monthDiff = getMonthIndex(tab.month) - getMonthIndex(latest.month);
    if (monthDiff !== 0) return monthDiff > 0 ? tab : latest;
    return latest;
  }, null);
}

let enforcingPlanTab = false;

function ensurePlansUseLatestPrices() {
  if (enforcingPlanTab) return;
  enforcingPlanTab = true;
  updatePriceContextTag();
  enforcingPlanTab = false;
}

async function setActivePriceTab(tabId, { silent = true } = {}) {
  const tab = priceTabs.find(t => t.id === tabId);
  if (!tab || tab.id === activePriceTabId) return;
  if (activePriceSource === 'local') {
    discardPriceDraft(activePriceTabId);
  } else {
    syncActiveVehiclesToDraft();
  }
  activePriceTabId = tab.id;
  discardPriceDraft(activePriceTabId);
  activePriceSource = 'servidor';
  await loadPricesFromServer({ silent, forceServer: true });
  renderPriceTabs();
  renderVehicleTable();
  if (document.getElementById('plans')?.classList.contains('active')) {
    renderPlanForm();
  }
  renderClients();
  renderClientManager();
  updatePriceContextTag();
}

function createTemplateId(prefix = 'tpl') {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
}

function isInitialTemplate(template) {
  return template?.type === 'initial';
}

function normalizeTemplateVariation(variation = {}, index = 0, templateId = 'tpl') {
  const body = variation?.body ?? '';
  const title = (variation?.title || '').trim() || `Variación ${index + 1}`;
  return {
    id: variation?.id || createTemplateId(`${templateId}-var`),
    title,
    body
  };
}

function normalizeInitialTemplate(template = {}) {
  const baseTitle = (template.title || DEFAULT_INITIAL_TEMPLATE.title || 'Mensaje de inicio').trim();
  const baseVariations = Array.isArray(template.variations) && template.variations.length
    ? template.variations
    : template.body
      ? [{ title: 'Variación 1', body: template.body }]
      : DEFAULT_INITIAL_TEMPLATE.variations;
  const variations = baseVariations.map((variation, index) => normalizeTemplateVariation(variation, index, template.id || 'tpl-initial'));
  return {
    id: template.id || DEFAULT_INITIAL_TEMPLATE.id || createTemplateId('tpl-initial'),
    type: 'initial',
    title: baseTitle,
    rotationIndex: Number.isFinite(template.rotationIndex) ? Math.max(0, Math.floor(template.rotationIndex)) : 0,
    variations
  };
}

function normalizeStandardTemplate(template = {}, index = 0) {
  return {
    id: template.id || createTemplateId(`tpl-${index}`),
    title: template.title || `Plantilla ${index + 1}`,
    body: template.body || ''
  };
}

function ensureTemplateIds(list) {
  const normalized = (list || []).map((tpl, idx) => {
    if (isInitialTemplate(tpl) || tpl?.variations) {
      return normalizeInitialTemplate(tpl);
    }
    return normalizeStandardTemplate(tpl, idx);
  });

  let initialIndex = normalized.findIndex(tpl => isInitialTemplate(tpl));
  if (initialIndex === -1) {
    const fallbackIndex = normalized.findIndex(tpl => (tpl.title || '').toLowerCase().includes('inicio'));
    if (fallbackIndex >= 0) {
      const fallback = normalized[fallbackIndex];
      normalized[fallbackIndex] = normalizeInitialTemplate(fallback);
      initialIndex = fallbackIndex;
    }
  }
  if (initialIndex === -1) {
    normalized.unshift(normalizeInitialTemplate(DEFAULT_INITIAL_TEMPLATE));
    initialIndex = 0;
  }
  if (initialIndex > 0) {
    const [initialTemplate] = normalized.splice(initialIndex, 1);
    normalized.unshift(initialTemplate);
  }
  return normalized;
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

function parsePercentInput(value) {
  if (value === undefined || value === null || value === '') return null;
  const num = Number(String(value).replace(',', '.'));
  if (!Number.isFinite(num)) return null;
  const clamped = Math.min(Math.max(num, 0), 100);
  return clamped / 100;
}

function formatPercentInput(value) {
  if (!Number.isFinite(value)) return '';
  return Math.round(value * 100);
}

function buildPlanLabelFromPercents(financedPct, integrationPct, planType, maxInstallments) {
  if (!Number.isFinite(financedPct) && !Number.isFinite(integrationPct)) return '';
  const financed = Number.isFinite(financedPct) ? financedPct : Math.max(0, 1 - (integrationPct || 0));
  const integration = Number.isFinite(integrationPct) ? integrationPct : Math.max(0, 1 - financed);
  const financedLabel = Math.round(financed * 100);
  const integrationLabel = Math.round(integration * 100);
  const total = Number.isFinite(Number(maxInstallments))
    ? Math.round(Number(maxInstallments))
    : (planTerms[planType] || 120);
  return `${financedLabel}/${integrationLabel} (${total} cuotas)`;
}

function formatWithdrawalInstallments(list = []) {
  if (!Array.isArray(list) || !list.length) return '';
  return list.join(', ');
}

function parseWithdrawalInstallments(value = '') {
  return String(value || '')
    .split(',')
    .map(part => Number(part.trim()))
    .filter(num => Number.isFinite(num) && num > 0);
}

function resolveWithdrawalRequirement(withdrawal = {}, basePrice = 0) {
  const type = withdrawal.requirementType === 'amount' ? 'amount' : 'percent';
  const fallbackValue = type === 'amount'
    ? Number(withdrawal.requirementAmount)
    : Number(withdrawal.requirementPct);
  const value = Number.isFinite(withdrawal.requirementValue)
    ? withdrawal.requirementValue
    : (Number.isFinite(fallbackValue) ? fallbackValue : null);
  if (!Number.isFinite(value)) {
    return { type, value: null, amount: 0, label: 'Sin definir', helper: 'Configura el requisito en el editor' };
  }
  if (type === 'amount') {
    return { type, value, amount: value, label: currency.format(value), helper: 'Monto fijo solicitado' };
  }
  const amount = basePrice * value;
  return { type, value, amount, label: `${Math.round(value * 100)}%`, helper: `Equivale a ${currency.format(amount || 0)}` };
}

function formatAllocationMode(mode = 'sorteo_licitacion') {
  if (mode === 'pactada') return 'Cuota Pactada (Llave x llave)';
  return 'Solo Sorteo o Licitación';
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

function confirmAction({ title = 'Confirmar', message = '', messageHtml = '', confirmText = 'Aceptar', cancelText = 'Cancelar', onConfirm, onCancel } = {}) {
  const modal = document.getElementById('modal');
  if (!modal) return;
  showModal(modal);
  document.getElementById('modalTitle').textContent = title;
  const messageEl = document.getElementById('modalMessage');
  if (messageHtml) {
    messageEl.innerHTML = messageHtml;
  } else {
    messageEl.textContent = message;
  }
  const confirmBtn = document.getElementById('modalConfirm');
  const cancelBtn = document.getElementById('modalCancel');
  const closeBtn = document.getElementById('modalClose');
  confirmBtn.textContent = confirmText;
  cancelBtn.textContent = cancelText;

  const cleanup = () => {
    hideModal(modal);
    confirmBtn.onclick = null;
    cancelBtn.onclick = null;
    closeBtn.onclick = null;
  };

  confirmBtn.onclick = () => {
    cleanup();
    if (typeof onConfirm === 'function') onConfirm();
  };
  cancelBtn.onclick = () => {
    cleanup();
    if (typeof onCancel === 'function') onCancel();
  };
  closeBtn.onclick = cleanup;
}

function openDataResetWarning({ title = 'Advertencia', onConfirm } = {}) {
  const modal = document.getElementById('dataResetModal');
  if (!modal) return;
  const titleEl = document.getElementById('dataResetTitle');
  const checkbox = document.getElementById('dataResetCheck');
  const confirmBtn = document.getElementById('dataResetConfirm');
  const exportBtn = document.getElementById('dataResetExport');
  const closeBtn = document.getElementById('dataResetClose');
  if (!titleEl || !checkbox || !confirmBtn || !exportBtn || !closeBtn) return;
  titleEl.textContent = title;
  checkbox.checked = false;
  confirmBtn.disabled = true;
  checkbox.onchange = () => {
    confirmBtn.disabled = !checkbox.checked;
  };
  const closeModal = () => {
    hideModal(modal);
  };
  closeBtn.onclick = closeModal;
  modal.onclick = (event) => {
    if (event.target === modal) closeModal();
  };
  exportBtn.onclick = () => exportProfileData();
  confirmBtn.onclick = () => {
    if (confirmBtn.disabled) return;
    closeModal();
    if (onConfirm) onConfirm();
  };
  showModal(modal);
}

function showQuoteRestoreModal({ onContinue, onReload, onReset } = {}) {
  const modal = document.getElementById('quoteRestoreModal');
  if (!modal) return;
  const continueBtn = document.getElementById('quoteRestoreContinue');
  const reloadBtn = document.getElementById('quoteRestoreReload');
  const resetBtn = document.getElementById('quoteRestoreReset');
  const closeBtn = document.getElementById('quoteRestoreClose');
  const cleanup = () => {
    toggleModal(modal, false);
    continueBtn.onclick = null;
    reloadBtn.onclick = null;
    resetBtn.onclick = null;
    closeBtn.onclick = null;
  };
  continueBtn.onclick = () => {
    cleanup();
    if (typeof onContinue === 'function') onContinue();
  };
  reloadBtn.onclick = () => {
    cleanup();
    if (typeof onReload === 'function') onReload();
  };
  resetBtn.onclick = () => {
    cleanup();
    if (typeof onReset === 'function') onReset();
  };
  closeBtn.onclick = cleanup;
  toggleModal(modal, true);
}

const OVERLAY_BASE_Z = 1000;

function getNextOverlayZIndex() {
  const active = document.querySelectorAll('.modal.show, .popover-overlay.show');
  let maxZ = OVERLAY_BASE_Z;
  active.forEach((element) => {
    const styleZ = Number.parseInt(element.style.zIndex, 10);
    if (Number.isFinite(styleZ)) {
      maxZ = Math.max(maxZ, styleZ);
      return;
    }
    const computed = Number.parseInt(window.getComputedStyle(element).zIndex, 10);
    if (Number.isFinite(computed)) {
      maxZ = Math.max(maxZ, computed);
    }
  });
  return maxZ + 1;
}

function bringOverlayToFront(element) {
  if (!element) return;
  element.style.zIndex = String(getNextOverlayZIndex());
}

function showModal(modal) {
  if (!modal) return;
  bringOverlayToFront(modal);
  modal.classList.add('show');
  modal.classList.remove('hidden');
}

function hideModal(modal) {
  if (!modal) return;
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 200);
}

function toggleModal(modal, show) {
  if (!modal) return;
  if (show) {
    showModal(modal);
  } else {
    hideModal(modal);
  }
}

function closeAllOverlays() {
  document.querySelectorAll('.modal.show, .popover-overlay.show').forEach((overlay) => {
    hideModal(overlay);
  });
  document.getElementById('actionMenuPanel')?.classList.remove('open');
  document.getElementById('settingsPanel')?.classList.remove('open');
  document.getElementById('utilitiesMenuPanel')?.classList.remove('open');
  updateTopNavVisibility();
}

function getAccountManagerDraft(account) {
  if (!account) return { name: '', alias: '', phone: '', device: '' };
  return accountManagerState.drafts[account.id] || {
    name: account.name || '',
    alias: account.alias || '',
    phone: account.phone || '',
    device: account.device || ''
  };
}

function hasAccountDraftChanges(account, draft) {
  if (!account || !draft) return false;
  return (account.name || '') !== (draft.name || '')
    || (account.alias || '') !== (draft.alias || '')
    || (account.phone || '') !== (draft.phone || '')
    || (account.device || '') !== (draft.device || '');
}

function saveAccountManagerDrafts() {
  if (!Object.keys(accountManagerState.drafts || {}).length) return;
  const settings = mergeGlobalSettings(uiState.globalSettings);
  const accounts = settings.accounts || [];
  let updated = false;
  const nextAccounts = accounts.map(account => {
    const draft = accountManagerState.drafts[account.id];
    if (!draft) return account;
    const nextName = draft.name?.trim() || 'Cuenta sin nombre';
    const nextAlias = draft.alias?.trim() || '';
    const nextPhone = draft.phone?.trim() || '';
    const nextDevice = draft.device?.trim() || '';
    if (account.name === nextName
      && (account.alias || '') === nextAlias
      && (account.phone || '') === nextPhone
      && (account.device || '') === nextDevice) return account;
    updated = true;
    return { ...account, name: nextName, alias: nextAlias, phone: nextPhone, device: nextDevice };
  });
  if (updated) {
    uiState.globalSettings.accounts = nextAccounts;
    const active = nextAccounts.find(acc => acc.id === settings.activeAccountId);
    if (active) {
      uiState.globalSettings.advisorName = resolveAccountAdvisorName(active);
    }
    persist();
    renderAdvisorSelector();
    renderWelcomeHero();
    renderClientManager();
  }
  accountManagerState.drafts = {};
}

function toggleAccountManager(show) {
  const modal = document.getElementById('accountManagerModal');
  if (!modal) return;
  if (!show) {
    saveAccountManagerDrafts();
  } else {
    renderAccountManager();
  }
  toggleModal(modal, show);
}

function renderAccountManager() {
  const list = document.getElementById('accountManagerList');
  const nameInput = document.getElementById('accountNameInput');
  const aliasInput = document.getElementById('accountAliasInput');
  const phoneInput = document.getElementById('accountPhoneInput');
  const deviceInput = document.getElementById('accountDeviceInput');
  const status = document.getElementById('accountManagerStatus');
  if (!list || !nameInput || !aliasInput || !phoneInput || !deviceInput) return;
  const settings = mergeGlobalSettings(uiState.globalSettings);
  uiState.globalSettings = settings;
  const accounts = settings.accounts || [];
  if (!accountManagerState.selectedId || !accounts.some(acc => acc.id === accountManagerState.selectedId)) {
    accountManagerState.selectedId = settings.activeAccountId || accounts[0]?.id || null;
  }
  list.innerHTML = accounts.map(account => {
    const draft = getAccountManagerDraft(account);
    const draftName = draft.name?.trim() || 'Cuenta sin nombre';
    const draftPhone = draft.phone?.trim() || '';
    const draftDevice = draft.device?.trim() || '';
    const activeClass = account.id === accountManagerState.selectedId ? 'active' : '';
    const phoneLabel = draftPhone ? formatPhoneDisplay(draftPhone) || draftPhone : 'Sin teléfono';
    const deviceLabel = draftDevice ? ` (${draftDevice})` : '';
    return `
      <button class="account-manager-tab ${activeClass}" type="button" data-id="${account.id}">
        <strong>${draftName}</strong>
        <small>${phoneLabel}${deviceLabel}</small>
      </button>
    `;
  }).join('');

  const current = accounts.find(acc => acc.id === accountManagerState.selectedId);
  const currentDraft = getAccountManagerDraft(current);
  nameInput.value = currentDraft?.name || '';
  aliasInput.value = currentDraft?.alias || '';
  phoneInput.value = currentDraft?.phone || '';
  deviceInput.value = currentDraft?.device || '';
  if (status) {
    const active = settings.activeAccountId === current?.id;
    const changed = hasAccountDraftChanges(current, currentDraft);
    if (changed) {
      status.textContent = 'Cambios pendientes. Se guardan al cerrar.';
    } else {
      status.textContent = active ? 'Cuenta activa actualmente.' : 'Cuenta disponible para selección.';
    }
  }
}

function showProcessingOverlay(show) {
  const overlay = document.getElementById('processingOverlay');
  if (!overlay) return;
  overlay.classList.toggle('hidden', !show);
}

function showAccountApplyOverlay(show) {
  const overlay = document.getElementById('accountApplyOverlay');
  if (!overlay) return;
  overlay.classList.toggle('hidden', !show);
}

function applyAccountToAllClients(account) {
  if (!account) return 0;
  const now = new Date().toISOString();
  managerClients = (managerClients || []).map(client => {
    const meta = client.contactMeta || {};
    const timestamp = meta.timestamp || client.contactDate || now;
    return {
      ...client,
      contactMeta: {
        ...meta,
        accountId: account.id,
        accountName: account.name,
        timestamp
      }
    };
  });
  return managerClients.length;
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
  const openWithScope = (scope) => {
    clientManagerState.exportScope = scope;
    persist();
    if (!modal) {
      exportManagerClients({ scope });
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

    if (confirmBtn) confirmBtn.onclick = () => {
      close();
      exportManagerClients({ scope: clientManagerState.exportScope || 'filtered' });
    };
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
  };

  if (hasActiveManagerFilters()) {
    confirmAction({
      title: 'Exportación con filtros',
      message: '¿Quieres exportar todo el contenido o solo lo que actualmente estás viendo?',
      confirmText: 'Exportar todo, omitiendo los filtros.',
      cancelText: 'Exportar manteniendo la configuración actual.',
      onConfirm: () => openWithScope('all'),
      onCancel: () => openWithScope('filtered')
    });
    return;
  }
  openWithScope(clientManagerState.exportScope || 'filtered');
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

async function applyProfileData(parsed) {
  activePriceTabId = parsed.activePriceTabId || activePriceTabId;
  priceDrafts = parsed.priceDrafts || priceDrafts;
  activePriceSource = parsed.activePriceSource || activePriceSource;
  const legacyTabs = parsed.priceTabs || [];
  const legacyActive = legacyTabs.find(tab => tab.id === activePriceTabId) || legacyTabs[0];
  vehicles = cloneVehicles(legacyActive?.vehicles || parsed.vehicles || vehicles || defaultVehicles);
  const draftBrandSettings = parsed.priceDrafts?.[activePriceTabId]?.brandSettings;
  brandSettings = normalizeBrandSettings(parsed.brandSettings || draftBrandSettings || brandSettings, vehicles);
  if (activePriceSource === 'local' && activePriceTabId) {
    priceDrafts[activePriceTabId] = priceDrafts[activePriceTabId] || {
      vehicles: cloneVehicles(vehicles),
      brandSettings: ensureBrandSettings(),
      updatedAt: new Date().toISOString()
    };
  } else if (activePriceTabId) {
    discardPriceDraft(activePriceTabId);
  }
  await initializePriceTabs();
  templates = ensureTemplateIds(parsed.templates || defaultTemplates);
  clients = parsed.clients || [];
  managerClients = (parsed.managerClients || []).map(client => ensureJourneyStatusData(client));
  generatedQuotes = parsed.generatedQuotes || [];
  snapshots = parsed.snapshots || [];
  uiState = { ...defaultUiState, ...(parsed.uiState || {}) };
  clientManagerState = { ...defaultClientManagerState, ...(parsed.clientManagerState || {}) };
  clientManagerState.columnVisibility = { ...defaultClientManagerState.columnVisibility, ...(clientManagerState.columnVisibility || {}) };
  clientManagerState.dateRange = { ...defaultClientManagerState.dateRange, ...(clientManagerState.dateRange || {}) };
  clientManagerState.actionVisibility = { ...defaultActionVisibility, ...(clientManagerState.actionVisibility || {}) };
  clientManagerState.contactAssistant = { ...defaultClientManagerState.contactAssistant, ...(clientManagerState.contactAssistant || {}) };
  clientManagerState.contactAssistantQuickAdjust = {
    ...defaultClientManagerState.contactAssistantQuickAdjust,
    ...(clientManagerState.contactAssistantQuickAdjust || {})
  };
  clientManagerState.contactLogStatusFilter = clientManagerState.contactLogStatusFilter || defaultClientManagerState.contactLogStatusFilter;
  clientManagerState.contactLogRange = clientManagerState.contactLogRange || defaultClientManagerState.contactLogRange;
  clientManagerState.contactLogRange = clientManagerState.contactLogRange || defaultClientManagerState.contactLogRange;
  clientManagerState.customActions = (clientManagerState.customActions || []).map(action => ({ ...action, visible: true, statusKey: action.statusKey || 'none' }));
  clientManagerState.exportOptions = normalizeExportOptions(clientManagerState.exportOptions || defaultClientManagerState.exportOptions);
  clientManagerState.pagination = normalizePaginationState(clientManagerState.pagination || defaultClientManagerState.pagination);
  uiState.templateSearch = uiState.templateSearch || '';
  uiState.clientSearch = uiState.clientSearch || '';
  uiState.profileSearch = uiState.profileSearch || '';
  uiState.globalSettings = mergeGlobalSettings(uiState.globalSettings);
  uiState.preferences = mergePreferences(uiState.preferences);
  uiState.vehicleFilters = { ...defaultUiState.vehicleFilters, ...(uiState.vehicleFilters || {}) };
  selectedTemplateIndex = Math.min(uiState.selectedTemplateIndex || 0, templates.length - 1);
  selectedTemplateId = templates[selectedTemplateIndex]?.id;
  planDraftApplied = false;
  persist();
  applyToggleState();
  applyPreferences();
  applyStatusPalette();
  renderPriceTabs();
  renderVehicleTable();
  renderTemplates();
  renderPlanForm();
  renderQuoteGeneratorForm();
  renderQuoteNavigation();
  renderClients();
  renderClientManager();
  renderScheduledClients();
  renderGlobalSettings();
  renderSnapshots();
  renderStats();
  await syncRemoteSnapshot({ reason: 'import-profile' });
}

function saveSnapshot() {
  const title = `Snapshot ${new Date().toLocaleString('es-AR')}`;
  const data = {
    vehicles: cloneVehicles(vehicles),
    brandSettings: ensureBrandSettings(),
    activePriceTabId,
    priceDrafts: JSON.parse(JSON.stringify(priceDrafts || {})),
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

function generateQuoteNumber(dni = '', date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const dniDigits = String(dni || '').replace(/\D/g, '');
  const lastTwo = dniDigits.slice(-2).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `${month}${year}${lastTwo}${random}`;
}

function buildQuoteGeneratorDraft({ blank = false } = {}) {
  const advisorName = resolveAccountAdvisorName(getActiveAccount()) || uiState?.globalSettings?.advisorName || '';
  return {
    meta: {
      quoteNumber: generateQuoteNumber(),
      quoteDate: blank ? '' : new Date().toLocaleDateString('es-AR'),
      quoteExpiry: blank ? '' : '',
      advisor: blank ? '' : advisorName
    },
    client: {
      name: '',
      dni: '',
      cuil: '',
      cel: '',
      province: '',
      city: '',
      postalCode: ''
    },
    vehicle: {
      tradeIn: '',
      brand: '',
      model: '',
      year: '',
      plate: '',
      kms: '',
      factoryPrice: null,
      factoryPriceLabel: DEFAULT_FACTORY_PRICE_LABEL
    },
    newVehicle: {
      brand: '',
      model: ''
    },
    payments: DEFAULT_QUOTE_PAYMENTS.map(row => ({ ...row })),
    cuotaPura: {
      amount: null,
      detail: ''
    },
    bonifiedPayments: {
      one: { ...DEFAULT_BONIFIED_PAYMENT },
      three: { ...DEFAULT_BONIFIED_PAYMENT }
    },
    preQuote: {
      enabled: false,
      message: DEFAULT_PREQUOTE_MESSAGE
    },
    notes: '',
    benefitsText: DEFAULT_QUOTE_BENEFITS.join('\n'),
    footerNote: DEFAULT_QUOTE_FOOTER,
    visibility: { ...DEFAULT_QUOTE_VISIBILITY }
  };
}

function normalizeQuoteGeneratorDraft(draft = {}) {
  const base = buildQuoteGeneratorDraft({ blank: true });
  const meta = { ...base.meta, ...(draft.meta || {}) };
  if (!meta.quoteNumber) meta.quoteNumber = generateQuoteNumber(draft?.client?.dni);
  const normalizeBonified = (source = {}) => {
    const hasInput = value => value !== undefined && value !== null && value !== '';
    const fakeOriginal = Number.isFinite(source?.fakeOriginal) ? source.fakeOriginal : parseMoney(source?.fakeOriginal);
    const bonification = Number.isFinite(source?.bonification) ? source.bonification : parseMoney(source?.bonification);
    let amount = Number.isFinite(source?.amount) ? source.amount : parseMoney(source?.amount);
    if (!hasInput(source?.amount) && hasInput(source?.bonification) && (fakeOriginal > 0 || bonification > 0)) {
      amount = Math.max(0, fakeOriginal - bonification);
    }
    const resolvedBonification = (fakeOriginal > 0 || amount > 0)
      ? Math.max(0, fakeOriginal - amount)
      : null;
    return {
      ...DEFAULT_BONIFIED_PAYMENT,
      ...source,
      fakeOriginal,
      bonification: resolvedBonification,
      amount
    };
  };
  const payments = Array.isArray(draft.payments) && draft.payments.length
    ? draft.payments.map(row => ({
      label: row?.label || '',
      amount: Number.isFinite(row?.amount) ? row.amount : parseMoney(row?.amount),
      detail: row?.detail || ''
    }))
    : base.payments.map(row => ({ ...row }));
  const legacyPureAmount = Array.isArray(draft.payments)
    ? draft.payments.map(row => parseMoney(row?.pureAmount || 0)).find(value => value > 0)
    : null;
  const cuotaPuraAmount = Number.isFinite(draft?.cuotaPura?.amount)
    ? draft.cuotaPura.amount
    : parseMoney(draft?.cuotaPura?.amount);
  const cuotaPura = {
    amount: cuotaPuraAmount || legacyPureAmount || null,
    detail: draft?.cuotaPura?.detail || ''
  };
  const mergedNotes = [draft.notes, draft.advisorNotes].filter(Boolean).join('\n');
  const visibility = { ...base.visibility, ...(draft.visibility || {}) };
  const benefitsText = Array.isArray(draft.benefitsText)
    ? draft.benefitsText.join('\n')
    : (draft.benefitsText || (Array.isArray(draft.benefits) ? draft.benefits.join('\n') : '') || DEFAULT_QUOTE_BENEFITS.join('\n'));
  const footerNote = draft.footerNote || draft.footer || DEFAULT_QUOTE_FOOTER;
  const preQuote = {
    enabled: !!draft.preQuote?.enabled,
    message: draft.preQuote?.message || DEFAULT_PREQUOTE_MESSAGE
  };
  return {
    meta,
    client: { ...base.client, ...(draft.client || {}) },
    vehicle: {
      ...base.vehicle,
      ...(draft.vehicle || {}),
      factoryPrice: Number.isFinite(draft?.vehicle?.factoryPrice) ? draft.vehicle.factoryPrice : parseMoney(draft?.vehicle?.factoryPrice),
      factoryPriceLabel: (draft?.vehicle?.factoryPriceLabel || '').trim() || DEFAULT_FACTORY_PRICE_LABEL
    },
    newVehicle: { ...base.newVehicle, ...(draft.newVehicle || {}) },
    payments,
    cuotaPura,
    bonifiedPayments: {
      one: normalizeBonified(draft?.bonifiedPayments?.one),
      three: normalizeBonified(draft?.bonifiedPayments?.three)
    },
    preQuote,
    notes: mergedNotes || '',
    benefitsText,
    footerNote,
    visibility
  };
}

function ensureQuoteGeneratorState() {
  if (!uiState.quoteGenerator) {
    uiState.quoteGenerator = { draft: null, selectedId: null, hasSession: false, view: 'hub' };
  }
  if (!uiState.quoteGenerator.draft) {
    uiState.quoteGenerator.draft = buildQuoteGeneratorDraft({ blank: true });
  }
  if (typeof uiState.quoteGenerator.newVehicleCustom !== 'boolean') {
    uiState.quoteGenerator.newVehicleCustom = false;
  }
  if (typeof uiState.quoteGenerator.hasSession !== 'boolean') {
    uiState.quoteGenerator.hasSession = false;
  }
  if (!uiState.quoteGenerator.view) {
    uiState.quoteGenerator.view = 'hub';
  }
  if (typeof uiState.quoteGenerator.hubSearch !== 'string') {
    uiState.quoteGenerator.hubSearch = '';
  }
  if (typeof uiState.quoteGenerator.hubSearchInput !== 'string') {
    uiState.quoteGenerator.hubSearchInput = '';
  }
  if (!('clientFilterId' in uiState.quoteGenerator)) {
    uiState.quoteGenerator.clientFilterId = null;
  }
  uiState.quoteGenerator.draft = normalizeQuoteGeneratorDraft(uiState.quoteGenerator.draft);
}

function getQuoteGeneratorDraft() {
  ensureQuoteGeneratorState();
  return uiState.quoteGenerator.draft;
}

function resolveQuoteGeneratorName(draft = {}) {
  const clientName = (draft.client?.name || '').trim();
  const quoteNumber = (draft.meta?.quoteNumber || '').trim();
  if (clientName && quoteNumber) return `${clientName} · #${quoteNumber}`;
  if (clientName) return clientName;
  if (quoteNumber) return `Cotización #${quoteNumber}`;
  return 'Cotización sin título';
}

function resolveQuoteGeneratorDisplayName(entry = {}) {
  const alias = (entry.alias || '').trim();
  if (alias) return alias;
  if (entry.name) return entry.name;
  const fallbackNumber = entry.draft?.meta?.quoteNumber || '';
  return fallbackNumber ? `Cotización #${fallbackNumber}` : 'Cotización sin título';
}

function buildQuoteClientSnapshotFromClient(client) {
  if (!client) return null;
  return {
    id: client.id || '',
    name: client.name || 'Sin nombre',
    phone: client.phone || '',
    document: client.document || client.cuit || '',
    model: client.model || '',
    brand: client.brand || '',
    city: client.city || '',
    province: client.province || ''
  };
}

function buildQuoteClientSnapshotFromDraft(draft = {}) {
  const client = draft.client || {};
  return {
    id: '',
    name: (client.name || '').trim() || 'Sin nombre',
    phone: (client.cel || '').trim(),
    document: (client.dni || client.cuil || '').trim(),
    model: (draft.newVehicle?.model || draft.vehicle?.model || '').trim(),
    brand: (draft.newVehicle?.brand || draft.vehicle?.brand || '').trim(),
    city: (client.city || '').trim(),
    province: (client.province || '').trim()
  };
}

function resolveQuoteClientInfo(entry = {}) {
  if (entry.clientId) {
    const client = managerClients.find(item => item.id === entry.clientId);
    if (client) return { ...buildQuoteClientSnapshotFromClient(client), source: 'manager' };
  }
  if (entry.clientSnapshot) return { ...entry.clientSnapshot, source: 'snapshot' };
  if (entry.draft) return { ...buildQuoteClientSnapshotFromDraft(entry.draft), source: 'draft' };
  return { id: '', name: 'Sin nombre', phone: '', document: '', model: '', brand: '', city: '', province: '', source: 'empty' };
}

function resolvePlanQuoteClientLink() {
  const selectedId = selectedPlanClientId || uiState?.planDraft?.selectedClientId || null;
  if (selectedId) {
    const snapshot = buildQuoteClientSnapshotFromClient(managerClients.find(item => item.id === selectedId));
    return { clientId: selectedId, clientSnapshot: snapshot };
  }
  const name = (uiState?.planDraft?.clientName || uiState?.planDraft?.externalName || '').trim();
  if (name) {
    return {
      clientId: null,
      clientSnapshot: {
        id: '',
        name,
        phone: '',
        document: '',
        model: '',
        brand: '',
        city: '',
        province: ''
      }
    };
  }
  return { clientId: null, clientSnapshot: null };
}

function resolveQuoteExpiryStatus(entry = {}) {
  const expiryRaw = entry.draft?.meta?.quoteExpiry || '';
  const expiryIso = formatDateISO(expiryRaw);
  if (!expiryIso) {
    return { label: 'Activa', tone: 'success', detail: 'Sin vencimiento' };
  }
  const todayIso = formatLocalISO();
  const expiryDate = new Date(`${expiryIso}T00:00:00`);
  const todayDate = new Date(`${todayIso}T00:00:00`);
  const isExpired = expiryDate.getTime() < todayDate.getTime();
  const expiryLabel = formatDateForDisplay(expiryIso);
  return {
    label: isExpired ? 'Vencida' : 'Activa',
    tone: isExpired ? 'danger' : 'success',
    detail: `${isExpired ? 'Venció' : 'Vence'} ${expiryLabel}`
  };
}

function updateQuoteClientAssignment(entryId, clientId) {
  const entry = generatedQuotes.find(item => item.id === entryId);
  if (!entry) return;
  const normalizedClientId = clientId || null;
  entry.clientId = normalizedClientId;
  const assignedClient = normalizedClientId
    ? buildQuoteClientSnapshotFromClient(managerClients.find(item => item.id === normalizedClientId))
    : null;
  entry.clientSnapshot = assignedClient || buildQuoteClientSnapshotFromDraft(entry.draft || {});
  entry.updatedAt = new Date().toISOString();
  persist();
  renderQuoteGeneratorHub();
  renderQuoteNavigation();
  renderQuoteGeneratorSavedList();
}

function formatQuoteClientMeta(client = {}) {
  const meta = [client.document || client.cuit || '', client.phone || client.cel || ''].filter(Boolean);
  const location = [client.city, client.province].filter(Boolean).join(', ');
  if (location) meta.push(location);
  return meta.join(' • ');
}

function renderQuoteClientSelection() {
  const nameEl = document.getElementById('quoteClientSelectedName');
  const metaEl = document.getElementById('quoteClientSelectedMeta');
  if (!nameEl || !metaEl) return;
  if (activeQuoteReassignSelectionId) {
    const client = managerClients.find(item => item.id === activeQuoteReassignSelectionId);
    const snapshot = buildQuoteClientSnapshotFromClient(client) || { name: 'Sin nombre' };
    const meta = formatQuoteClientMeta(snapshot);
    nameEl.textContent = snapshot.name || 'Sin nombre';
    metaEl.textContent = meta || 'Cliente seleccionado.';
    return;
  }
  nameEl.textContent = 'Sin clasificar';
  metaEl.textContent = 'La cotización quedará sin cliente asociado.';
}

function renderQuoteClientResults(results = [], { emptyMessage = 'No se encontraron clientes con ese nombre.' } = {}) {
  const container = document.getElementById('quoteClientResults');
  if (!container) return;
  if (!results.length) {
    container.innerHTML = `<div class="quote-client-empty">${escapeHtml(emptyMessage)}</div>`;
    return;
  }
  const rows = [
    { id: '', name: 'Sin clasificar', meta: 'La cotización quedará sin cliente asociado.' },
    ...results
  ];
  container.innerHTML = rows.map((item) => {
    const isActive = (item.id || '') === (activeQuoteReassignSelectionId || '');
    const safeName = escapeHtml(item.name || 'Sin nombre');
    const safeMeta = escapeHtml(item.meta || '');
    return `
      <button class="quote-client-result${isActive ? ' active' : ''}" type="button" data-client-id="${item.id}">
        <span>
          <span class="result-name">${safeName}</span>
          <span class="muted subtle result-meta">${safeMeta}</span>
        </span>
        <span class="result-action">${isActive ? 'Seleccionado' : 'Elegir'}</span>
      </button>
    `;
  }).join('');
}

function setQuoteClientSelection(clientId) {
  activeQuoteReassignSelectionId = clientId || null;
  renderQuoteClientSelection();
  if (activeQuoteReassignResults.length) {
    renderQuoteClientResults(activeQuoteReassignResults);
  }
}

function performQuoteClientSearch({ silentIfEmpty = false } = {}) {
  const input = document.getElementById('quoteClientSearchInput');
  if (!input) return;
  const term = normalizeSearchTerm(input.value || '');
  if (!term) {
    const emptyMessage = silentIfEmpty
      ? 'Escribe un nombre y pulsa Buscar para encontrar clientes.'
      : 'Ingresa un nombre para buscar clientes.';
    activeQuoteReassignResults = [];
    renderQuoteClientResults([], { emptyMessage });
    return;
  }
  const results = managerClients
    .filter(client => normalizeSearchTerm(client.name || '').includes(term))
    .map(client => ({
      id: client.id,
      name: client.name || 'Sin nombre',
      meta: formatQuoteClientMeta(client)
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }));
  activeQuoteReassignResults = results;
  renderQuoteClientResults(results);
}

function openQuoteClientModal(entryId = uiState.quoteGenerator?.selectedId || null) {
  const modal = document.getElementById('quoteClientModal');
  const title = document.getElementById('quoteClientModalTitle');
  const subtitle = document.getElementById('quoteClientModalSubtitle');
  const searchInput = document.getElementById('quoteClientSearchInput');
  if (!modal || !searchInput) return;
  const entry = generatedQuotes.find(item => item.id === entryId);
  if (!entry) {
    showToast('No se encontró la cotización seleccionada.', 'error');
    return;
  }
  activeQuoteReassignId = entryId;
  activeQuoteReassignSelectionId = entry.clientId || null;
  const info = resolveQuoteClientInfo(entry);
  if (title) title.textContent = info.name || 'Cotización sin cliente';
  if (subtitle) subtitle.textContent = 'Reasigna esta cotización a otro cliente o déjala sin clasificar.';
  const defaultName = info.name && info.name !== 'Sin nombre' ? info.name : '';
  searchInput.value = defaultName;
  performQuoteClientSearch({ silentIfEmpty: true });
  renderQuoteClientSelection();
  toggleModal(modal, true);
}

function closeQuoteClientModal() {
  const modal = document.getElementById('quoteClientModal');
  if (!modal) return;
  toggleModal(modal, false);
  activeQuoteReassignId = null;
  activeQuoteReassignSelectionId = null;
  activeQuoteReassignResults = [];
}

function applyQuoteClientModal() {
  if (!activeQuoteReassignId) {
    closeQuoteClientModal();
    return;
  }
  updateQuoteClientAssignment(activeQuoteReassignId, activeQuoteReassignSelectionId || null);
  closeQuoteClientModal();
  showToast('Cotización reasignada correctamente.', 'success');
}

function upsertGeneratedQuote(draft, id, { clientId = null, clientSnapshot = null } = {}) {
  const existingEntry = generatedQuotes.find(item => item.id === id);
  const existingClientId = clientId !== null ? clientId : (existingEntry?.clientId || null);
  const resolvedSnapshot = existingClientId
    ? (buildQuoteClientSnapshotFromClient(managerClients.find(item => item.id === existingClientId)) || existingEntry?.clientSnapshot || null)
    : (clientSnapshot || existingEntry?.clientSnapshot || buildQuoteClientSnapshotFromDraft(draft));
  const payload = {
    id,
    name: resolveQuoteGeneratorName(draft),
    alias: existingEntry?.alias || '',
    updatedAt: new Date().toISOString(),
    draft: normalizeQuoteGeneratorDraft(draft),
    clientId: existingClientId,
    clientSnapshot: resolvedSnapshot || buildQuoteClientSnapshotFromDraft(draft)
  };
  const existingIndex = generatedQuotes.findIndex(item => item.id === id);
  if (existingIndex !== -1) {
    generatedQuotes[existingIndex] = payload;
  } else {
    generatedQuotes.unshift(payload);
  }
  return payload;
}

function syncQuoteGeneratorEntry({ createIfMissing = false } = {}) {
  const selectedId = uiState.quoteGenerator?.selectedId;
  if (!selectedId && !createIfMissing) return null;
  const id = selectedId || `qg-${Date.now()}`;
  const payload = upsertGeneratedQuote(getQuoteGeneratorDraft(), id);
  uiState.quoteGenerator.selectedId = payload.id;
  return payload;
}

function loadQuoteGeneratorEntry(id) {
  const entry = generatedQuotes.find(item => item.id === id);
  if (!entry) return;
  uiState.quoteGenerator.selectedId = entry.id;
  commitQuoteGeneratorDraft(entry.draft, { refreshForm: true });
  setQuoteGeneratorView('workspace');
  renderQuoteNavigation();
}

function createQuoteGeneratorEntry(draft = buildQuoteGeneratorDraft({ blank: true }), { clientId = null, clientSnapshot = null } = {}) {
  const payload = upsertGeneratedQuote(draft, `qg-${Date.now()}`, { clientId, clientSnapshot });
  uiState.quoteGenerator.selectedId = payload.id;
  uiState.quoteGenerator.draft = payload.draft;
  uiState.quoteGenerator.hasSession = quoteDraftHasContent(payload.draft);
  setQuoteGeneratorView('workspace');
  persist();
  renderQuoteGeneratorSavedList();
  renderQuoteNavigation();
  renderQuoteGeneratorHub();
  return payload;
}

function duplicateQuoteGeneratorEntry(id) {
  const entry = generatedQuotes.find(item => item.id === id);
  if (!entry) return;
  const clonedDraft = JSON.parse(JSON.stringify(entry.draft));
  const payload = upsertGeneratedQuote(clonedDraft, `qg-${Date.now()}`);
  const aliasLabel = resolveQuoteGeneratorDisplayName(entry);
  payload.alias = aliasLabel ? `Copia de ${aliasLabel}` : 'Copia de cotización';
  const index = generatedQuotes.findIndex(item => item.id === payload.id);
  if (index !== -1) {
    generatedQuotes[index] = payload;
  }
  uiState.quoteGenerator.selectedId = payload.id;
  uiState.quoteGenerator.draft = payload.draft;
  uiState.quoteGenerator.hasSession = quoteDraftHasContent(payload.draft);
  setQuoteGeneratorView('workspace');
  persist();
  renderQuoteGeneratorSavedList();
  renderQuoteNavigation();
  renderQuoteGeneratorHub();
  renderQuoteGeneratorForm();
  showToast('Cotización duplicada.', 'success');
}

function deleteQuoteGeneratorEntry(id) {
  const wasActive = uiState.quoteGenerator?.selectedId === id;
  generatedQuotes = generatedQuotes.filter(item => item.id !== id);
  if (wasActive) {
    uiState.quoteGenerator.selectedId = null;
    resetQuoteGeneratorDraft();
    setQuoteGeneratorView('hub');
  }
  persist();
  renderQuoteGeneratorSavedList();
  renderQuoteNavigation();
  renderQuoteGeneratorHub();
}

function updateQuoteGeneratorAlias(id, alias) {
  const entry = generatedQuotes.find(item => item.id === id);
  if (!entry) return;
  entry.alias = alias.trim();
  entry.updatedAt = new Date().toISOString();
  persist();
  renderQuoteGeneratorSavedList();
  renderQuoteGeneratorHub();
}

function quoteDraftHasContent(draft = {}) {
  const hasText = value => String(value || '').trim().length > 0;
  const hasMoney = value => Number.isFinite(value) ? value > 0 : parseMoney(value) > 0;
  const client = draft.client || {};
  const vehicle = draft.vehicle || {};
  const newVehicle = draft.newVehicle || {};
  const payments = draft.payments || [];
  const bonified = draft.bonifiedPayments || {};
  const isCustomBenefits = hasText(draft.benefitsText) && draft.benefitsText.trim() !== DEFAULT_QUOTE_BENEFITS.join('\n');
  const isCustomFooter = hasText(draft.footerNote) && draft.footerNote.trim() !== DEFAULT_QUOTE_FOOTER;
  const hasCustomPayment = payments.some((row, index) => {
    const label = String(row?.label || '').trim();
    const detail = String(row?.detail || '').trim();
    const amount = row?.amount;
    const defaultLabel = DEFAULT_QUOTE_PAYMENTS[index]?.label || '';
    const isDefaultLabel = label && label === defaultLabel;
    return (label && !isDefaultLabel) || detail.length > 0 || hasMoney(amount);
  });
  return [
    client.name,
    client.dni,
    client.cuil,
    client.cel,
    client.province,
    client.city,
    client.postalCode,
    vehicle.brand,
    vehicle.model,
    vehicle.year,
    vehicle.plate,
    vehicle.kms,
    newVehicle.brand,
    newVehicle.model,
    draft.notes
  ].some(hasText)
    || hasMoney(vehicle.factoryPrice)
    || hasCustomPayment
    || hasMoney(draft?.cuotaPura?.amount)
    || hasText(draft?.cuotaPura?.detail)
    || hasMoney(bonified?.one?.fakeOriginal)
    || hasMoney(bonified?.one?.bonification)
    || hasMoney(bonified?.one?.amount)
    || hasText(bonified?.one?.concept)
    || hasMoney(bonified?.three?.fakeOriginal)
    || hasMoney(bonified?.three?.bonification)
    || hasMoney(bonified?.three?.amount)
    || hasText(bonified?.three?.concept)
    || isCustomBenefits
    || isCustomFooter
    || (!!draft.preQuote?.enabled);
}

function setNestedValue(target, path, value) {
  const keys = String(path || '').split('.');
  if (!keys.length) return;
  let current = target;
  keys.slice(0, -1).forEach(key => {
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  });
  current[keys[keys.length - 1]] = value;
}

function getNestedValue(target, path) {
  return String(path || '')
    .split('.')
    .reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), target);
}

function commitQuoteGeneratorDraft(draft, { refreshForm = false, createIfMissing = false } = {}) {
  ensureQuoteGeneratorState();
  uiState.quoteGenerator.draft = normalizeQuoteGeneratorDraft(draft);
  uiState.quoteGenerator.hasSession = quoteDraftHasContent(uiState.quoteGenerator.draft);
  const hasSelection = Boolean(uiState.quoteGenerator?.selectedId);
  if (hasSelection || createIfMissing) {
    syncQuoteGeneratorEntry({ createIfMissing });
  }
  persist();
  renderQuoteGeneratorSavedList();
  renderQuoteNavigation();
  renderQuoteGeneratorHub();
  updateQuoteGeneratorPreview();
  if (refreshForm) {
    renderQuoteGeneratorForm();
  }
}

function recalculateBonifiedPayment(draft, key) {
  const bonified = draft.bonifiedPayments?.[key] || {};
  const fakeOriginal = parseMoney(bonified.fakeOriginal || 0);
  const amount = parseMoney(bonified.amount || 0);
  if (fakeOriginal > 0 || amount > 0) {
    bonified.bonification = Math.max(0, fakeOriginal - amount);
  } else {
    bonified.bonification = null;
  }
  draft.bonifiedPayments = { ...draft.bonifiedPayments, [key]: bonified };
}

function formatDniValue(value) {
  const digits = String(value || '').replace(/\D/g, '').slice(0, 8);
  if (!digits) return '';
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatCuilValue(value) {
  const digits = String(value || '').replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  const part1 = digits.slice(0, 2);
  const part2 = digits.slice(2, 10);
  const part3 = digits.slice(10, 11);
  let formatted = part1;
  if (part2) formatted += `-${part2}`;
  if (part3) formatted += `-${part3}`;
  return formatted;
}

function formatPhoneValue(value) {
  const raw = String(value || '');
  if (!raw.trim()) return '';
  if (raw.trim().startsWith('+54')) return raw.trim();
  const withoutPrefix = raw.replace(/^\+?54\s*/i, '').trim();
  return `+54 ${withoutPrefix}`.trim();
}

function normalizeQuoteGeneratorFieldValue(path, value) {
  if (path === 'client.dni') return formatDniValue(value);
  if (path === 'client.cuil') return formatCuilValue(value);
  if (path === 'client.cel') return formatPhoneValue(value);
  return value ?? '';
}

function setQuoteGeneratorActiveTab(targetId) {
  const panel = document.getElementById('quoteGenerator');
  if (!panel) return;
  const tabs = panel.querySelectorAll('.quote-tab');
  const panels = panel.querySelectorAll('.quote-tab-panel');
  tabs.forEach(tab => {
    const isActive = tab.dataset.tabTarget === targetId;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  panels.forEach(tabPanel => tabPanel.classList.toggle('active', tabPanel.id === targetId));
  const panelScroll = panel.querySelector('.quote-tabs-panels');
  if (panelScroll) {
    panelScroll.scrollTop = 0;
  }
}

function focusQuoteGeneratorField(targetId, tabId) {
  if (tabId) {
    setQuoteGeneratorActiveTab(tabId);
  }
  requestAnimationFrame(() => {
    const input = document.getElementById(targetId);
    if (!input) return;
    input.focus({ preventScroll: true });
    if (typeof input.select === 'function') {
      input.select();
    }
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function updateQuoteGeneratorField(path, value) {
  const draft = getQuoteGeneratorDraft();
  setNestedValue(draft, path, normalizeQuoteGeneratorFieldValue(path, value));
  if (path.startsWith('bonifiedPayments.')) {
    const [, key, field] = path.split('.');
    if (field === 'fakeOriginal' || field === 'amount' || field === 'bonification') {
      recalculateBonifiedPayment(draft, key);
      syncBonifiedFormField(draft, key);
    }
  }
  if (path === 'vehicle.model' || path === 'newVehicle.model') {
    applyQuoteGeneratorBonifiedDefaults(draft);
  }
  commitQuoteGeneratorDraft(draft);
}

function updateQuoteGeneratorPayment(index, field, value) {
  const draft = getQuoteGeneratorDraft();
  if (!draft.payments[index]) return;
  draft.payments[index][field] = value;
  commitQuoteGeneratorDraft(draft);
}

function formatQuotePreviewValue(value) {
  if (value === undefined || value === null || value === '') return '-';
  return value;
}

function formatQuotePreviewMoney(value) {
  if (value === undefined || value === null || value === '') return '-';
  const numeric = parseMoney(value);
  return currency.format(numeric || 0);
}

function resolveQuoteGeneratorClient(latestQuote) {
  if (isExternalClientSelection()) {
    return null;
  }
  const selectedId = selectedPlanClientId || latestQuote?.selectedClientId || uiState?.planDraft?.selectedClientId || null;
  if (selectedId) {
    const found = managerClients.find(client => client.id === selectedId);
    if (found) return found;
  }
  return managerClients[0] || null;
}

function resolveQuoteGeneratorVehicle(quote, draft) {
  const modelName = (draft?.newVehicle?.model || draft?.vehicle?.model || quote?.model || '').toLowerCase();
  return vehicles.find(v => (v.name || '').toLowerCase() === modelName) || vehicles[0];
}

function resolvePlanVehicleFromQuote(quote) {
  const plannedIndex = Number(uiState.planDraft?.planModel);
  if (Number.isFinite(plannedIndex) && vehicles[plannedIndex]) {
    return vehicles[plannedIndex];
  }
  const modelName = (quote?.model || '').toLowerCase();
  return vehicles.find(v => (v.name || '').toLowerCase() === modelName) || vehicles[0];
}

function resolveBrandFromModelName(modelName = '') {
  const normalized = (modelName || '').toLowerCase();
  if (!normalized) return '';
  const found = vehicles.find(vehicle => (vehicle.name || '').toLowerCase() === normalized);
  return found ? normalizeBrand(found.brand) : '';
}

function getVehicleModelsByBrand(brand) {
  const normalized = normalizeBrand(brand || '');
  return vehicles
    .filter(vehicle => normalizeBrand(vehicle.brand) === normalized)
    .map(vehicle => vehicle.name)
    .sort((a, b) => a.localeCompare(b));
}

function resolveBonifiedAutoAmount(quote, draft, type) {
  const vehicle = resolveQuoteGeneratorVehicle(quote, draft);
  if (type === 'three') {
    return quote?.reservation3 || vehicle?.reservations?.['3'] || 0;
  }
  return quote?.reservation1 || vehicle?.reservations?.['1'] || 0;
}

function resolveQuoteGeneratorCuotaPura(quote, draft) {
  const vehicle = resolveQuoteGeneratorVehicle(quote, draft);
  return quote?.cuotaPura || vehicle?.cuotaPura || vehicle?.shareByPlan?.ctapura || 0;
}

function buildQuoteGeneratorAutoSource() {
  let latestQuote = null;
  try {
    latestQuote = buildQuoteFromForm();
  } catch (err) {
    latestQuote = null;
  }
  if (!latestQuote) {
    latestQuote = clients?.[0] || null;
  }
  const today = new Date();
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  const clientData = resolveQuoteGeneratorClient(latestQuote);
  const planVehicle = resolvePlanVehicleFromQuote(latestQuote);
  const clientName = clientData?.name || latestQuote?.name || '';
  const clientDni = clientData?.document || '';
  const clientCuil = clientData?.cuit || '';
  const purchaseYear = extractYear(clientData?.purchaseDate || latestQuote?.purchaseDate || '');
  const clientVehicleModel = clientData?.model || latestQuote?.tradeInModel || '';
  const clientVehicleBrand = normalizeBrand(clientData?.brand || resolveBrandFromModelName(clientVehicleModel) || latestQuote?.brand || '');
  const planModelName = planVehicle?.name || latestQuote?.model || '';
  const planBrand = normalizeBrand(planVehicle?.brand || latestQuote?.brand || '');
  const tradeInValue = latestQuote?.tradeIn ? latestQuote?.tradeInValue : null;
  const priceLabel = tradeInValue ? 'Valor reconocido' : DEFAULT_FACTORY_PRICE_LABEL;
  return {
    quote: latestQuote,
    fields: {
      'meta.quoteNumber': generateQuoteNumber(clientDni),
      'meta.quoteDate': today.toLocaleDateString('es-AR'),
      'meta.quoteExpiry': expiry.toLocaleDateString('es-AR'),
      'meta.advisor': uiState?.globalSettings?.advisorName || '',
      'client.name': clientName,
      'client.dni': clientDni,
      'client.cuil': clientCuil,
      'client.cel': clientData?.phone || '',
      'client.province': clientData?.province || '',
      'client.city': clientData?.city || '',
      'client.postalCode': clientData?.postalCode || '',
      'vehicle.brand': clientVehicleBrand,
      'vehicle.model': clientVehicleModel,
      'vehicle.year': purchaseYear,
      'vehicle.factoryPrice': tradeInValue ?? null,
      'vehicle.factoryPriceLabel': priceLabel,
      'vehicle.tradeIn': '',
      'newVehicle.brand': planBrand,
      'newVehicle.model': planModelName
    }
  };
}

function applyQuoteGeneratorBonifiedDefaults(draft, { force = false } = {}) {
  const source = buildQuoteGeneratorAutoSource();
  ['one', 'three'].forEach(kind => {
    const current = draft?.bonifiedPayments?.[kind] || { ...DEFAULT_BONIFIED_PAYMENT };
    const autoAmount = resolveBonifiedAutoAmount(source.quote, draft, kind);
    if (autoAmount && (force || !current.amount)) {
      current.amount = autoAmount;
      draft.bonifiedPayments[kind] = current;
      recalculateBonifiedPayment(draft, kind);
    }
  });
}

function buildQuoteGeneratorAutoPayments(quote) {
  if (!quote) return DEFAULT_QUOTE_PAYMENTS.map(row => ({ ...row }));
  const payments = [];
  const vehicle = vehicles.find(v => (v.name || '').toLowerCase() === (quote.model || '').toLowerCase()) || vehicles[0];
  const planRanges = getPlanRangesForBrand(vehicle?.brand || quote.brand || DEFAULT_BRAND, quote.totalInstallments || resolveTotalInstallments(quote.plan, vehicle?.planProfile?.planType, vehicle?.planProfile?.maxInstallments));
  const reservations = {
    '1': quote.reservation1 || vehicle?.reservations?.['1'] || 0,
    '3': quote.reservation3 || vehicle?.reservations?.['3'] || 0,
    '6': 0
  };
  const projection = computePaymentProjection({
    vehicle,
    planType: quote.plan || getPlanTypeForVehicle(vehicle),
    tradeInValue: quote.tradeInValue || 0,
    tradeInEnabled: quote.tradeIn || false,
    reservations,
    appliedReservation: quote.appliedReservation || '1',
    customPrice: quote.priceApplied || quote.customPrice || 0,
    advancePayments: quote.advancePayments || false,
    advanceAmount: quote.advanceAmount || 0
  });
  planRanges.forEach(range => {
    const amount = projection.rangeAmounts?.[range.key] ?? vehicle?.shareByPlan?.[range.key] ?? projection.baseCatalogCuota ?? 0;
    payments.push({
      label: `Cuota ${range.from}-${range.to}`,
      amount,
      detail: ''
    });
  });
  return payments.length ? payments : DEFAULT_QUOTE_PAYMENTS.map(row => ({ ...row }));
}

function applyQuoteGeneratorAutoFill({ scope = 'all' } = {}) {
  const source = buildQuoteGeneratorAutoSource();
  const draft = scope === 'all'
    ? buildQuoteGeneratorDraft({ blank: true })
    : JSON.parse(JSON.stringify(getQuoteGeneratorDraft()));
  if (scope === 'all' || scope === 'meta') {
    Object.entries(source.fields).forEach(([path, value]) => {
      if (path.startsWith('meta.') && value) {
        setNestedValue(draft, path, value);
      }
    });
  }
  if (scope === 'all' || scope === 'client') {
    Object.entries(source.fields).forEach(([path, value]) => {
      if (path.startsWith('client.') && value) {
        setNestedValue(draft, path, value);
      }
    });
  }
  if (scope === 'all' || scope === 'vehicle') {
    Object.entries(source.fields).forEach(([path, value]) => {
      if (path.startsWith('vehicle.') && value !== null && value !== undefined && value !== '') {
        setNestedValue(draft, path, value);
      }
    });
  }
  if (scope === 'all' || scope === 'newVehicle') {
    Object.entries(source.fields).forEach(([path, value]) => {
      if (path.startsWith('newVehicle.') && value) {
        setNestedValue(draft, path, value);
      }
    });
  }
  if (scope === 'all' || scope === 'payments') {
    draft.payments = buildQuoteGeneratorAutoPayments(source.quote);
    draft.cuotaPura = {
      amount: resolveQuoteGeneratorCuotaPura(source.quote, draft) || draft?.cuotaPura?.amount || null,
      detail: draft?.cuotaPura?.detail || ''
    };
    applyQuoteGeneratorBonifiedDefaults(draft, { force: true });
  }
  if (scope === 'all') {
    applyQuoteGeneratorBonifiedDefaults(draft);
  }
  commitQuoteGeneratorDraft(draft, { refreshForm: true });
}

function resetQuoteGeneratorDraft() {
  const draft = buildQuoteGeneratorDraft({ blank: true });
  if (uiState.quoteGenerator) {
    uiState.quoteGenerator.selectedId = null;
  }
  commitQuoteGeneratorDraft(draft, { refreshForm: true });
}

function extractVariables(body = '') {
  const matches = body.match(/{{(.*?)}}/g) || [];
  const vars = matches.map(m => m.replace(/[{}]/g, '').trim()).filter(Boolean);
  return Array.from(new Set(vars));
}

function createAccountId() {
  return `acct-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeAccount(account = {}) {
  const name = (account.name || account.label || '').toString().trim();
  const alias = (account.alias || account.advisorAlias || '').toString().trim();
  const phone = (account.phone || '').toString().trim();
  const device = (account.device || account.deviceRef || '').toString().trim();
  return {
    id: account.id || createAccountId(),
    name: name || 'Cuenta sin nombre',
    alias,
    phone,
    device
  };
}

function resolveAccountAdvisorName(account = {}) {
  const alias = (account.alias || '').toString().trim();
  if (alias) return alias;
  return (account.name || '').toString().trim();
}

function ensureAccounts(settings = {}) {
  const base = defaultUiState.globalSettings;
  let accounts = (settings.accounts || []).map(acc => normalizeAccount(acc));
  if (!accounts.length) {
    const fallbackName = settings.advisorName || base.advisorName;
    accounts = [normalizeAccount({ id: base.activeAccountId || 'acct-default', name: fallbackName, phone: '' })];
  }
  const ids = new Set();
  accounts = accounts.map(acc => {
    if (ids.has(acc.id)) {
      return { ...acc, id: createAccountId() };
    }
    ids.add(acc.id);
    return acc;
  });
  let activeAccountId = settings.activeAccountId || accounts[0]?.id;
  if (!accounts.some(acc => acc.id === activeAccountId)) {
    activeAccountId = accounts[0]?.id;
  }
  const activeAccount = accounts.find(acc => acc.id === activeAccountId);
  return {
    accounts,
    activeAccountId,
    advisorName: resolveAccountAdvisorName(activeAccount) || settings.advisorName || base.advisorName
  };
}

function mergeGlobalSettings(current = {}) {
  const base = defaultUiState.globalSettings;
  const palette = current.statusPalette || {};
  const accountState = ensureAccounts(current);
  return {
    advisorName: accountState.advisorName,
    clientType: current.clientType || base.clientType,
    statusPalette: {
      contacted: { ...base.statusPalette.contacted, ...(palette.contacted || {}) },
      noNumber: { ...base.statusPalette.noNumber, ...(palette.noNumber || {}) },
      favorite: { ...base.statusPalette.favorite, ...(palette.favorite || {}) },
      pending: { ...base.statusPalette.pending, ...(palette.pending || {}) }
    },
    accounts: accountState.accounts,
    activeAccountId: accountState.activeAccountId
  };
}

function getActiveAccount(settings = mergeGlobalSettings(uiState.globalSettings)) {
  return settings.accounts.find(account => account.id === settings.activeAccountId) || settings.accounts[0] || null;
}

function showProfileSwitchOverlay(name) {
  const overlay = document.getElementById('profileSwitchOverlay');
  if (!overlay) return;
  const title = document.getElementById('profileSwitchTitle');
  const account = document.getElementById('profileSwitchAccount');
  const subtitle = document.getElementById('profileSwitchSubtitle');
  if (title) title.textContent = 'Cambiando cuenta activa a:';
  if (account) account.textContent = name;
  if (subtitle) subtitle.textContent = 'Espera un momento...';
  overlay.classList.add('show');
  overlay.setAttribute('aria-hidden', 'false');
}

function hideProfileSwitchOverlay() {
  const overlay = document.getElementById('profileSwitchOverlay');
  if (!overlay) return;
  overlay.classList.remove('show');
  overlay.setAttribute('aria-hidden', 'true');
}

function requestAccountSwitch(accountId) {
  const settings = mergeGlobalSettings(uiState.globalSettings);
  if (settings.activeAccountId === accountId) return;
  const account = settings.accounts.find(acc => acc.id === accountId) || settings.accounts[0];
  if (!account) return;
  if (profileSwitchTimer) {
    clearTimeout(profileSwitchTimer);
  }
  setActiveAccount(accountId);
  const message = `${account.name || 'Sin cuenta'} es ahora la cuenta activa.`;
  showToast(message, 'success');
  updateAssistantAccountStatus(message);
  profileSwitchTimer = null;
}

function setActiveAccount(accountId) {
  const settings = mergeGlobalSettings(uiState.globalSettings);
  const nextId = settings.accounts.some(account => account.id === accountId) ? accountId : settings.accounts[0]?.id;
  uiState.globalSettings.activeAccountId = nextId;
  const active = getActiveAccount({ ...settings, activeAccountId: nextId });
  uiState.globalSettings.advisorName = resolveAccountAdvisorName(active) || uiState.globalSettings.advisorName;
  persist();
  renderWelcomeHero();
  renderClientManager();
  renderContactLog();
  renderAssistantAccountSelector();
  refreshAutoVariableInputs();
  const modal = document.getElementById('accountManagerModal');
  if (modal?.classList.contains('show')) {
    renderAccountManager();
  }
}

function renderAssistantAccountSelector() {
  const select = document.getElementById('assistantAccountSelect');
  const status = document.getElementById('assistantAccountStatus');
  if (!select) return;
  const settings = mergeGlobalSettings(uiState.globalSettings);
  const accounts = settings.accounts || [];
  select.innerHTML = accounts.map(account => `<option value="${account.id}">${account.name}</option>`).join('');
  select.value = settings.activeAccountId || accounts[0]?.id || '';
  select.disabled = accounts.length === 0;
  if (status && !status.dataset.pinned) status.textContent = '';
}

function updateAssistantAccountStatus(message) {
  const status = document.getElementById('assistantAccountStatus');
  if (!status) return;
  status.textContent = message;
  status.dataset.pinned = 'true';
  setTimeout(() => {
    if (!status) return;
    status.textContent = '';
    status.dataset.pinned = '';
  }, 2400);
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
  const bulkBase = base.bulkMessageWarning || { enabled: false, threshold: 30, accounts: {} };
  const bulkCurrent = current.bulkMessageWarning || {};
  const bulkThreshold = Math.max(5, Number(bulkCurrent.threshold ?? bulkBase.threshold) || bulkBase.threshold);
  return {
    fontSizes,
    phoneDisplay: current.phoneDisplay ?? base.phoneDisplay,
    contextMenuVisibility: { data: dataVisibility, actions: actionVisibility },
    scrollTopEnabled: current.scrollTopEnabled ?? base.scrollTopEnabled,
    bulkMessageWarning: {
      enabled: bulkCurrent.enabled ?? bulkBase.enabled,
      threshold: bulkThreshold,
      accounts: { ...(bulkCurrent.accounts || {}) }
    }
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
  const datePart = date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit', timeZone: BUENOS_AIRES_TIMEZONE });
  const timePart = date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: BUENOS_AIRES_TIMEZONE });
  return `${datePart} - ${timePart}`;
}

function formatContactMetaLine(value) {
  if (!value) return 'Sin fecha registrada';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Sin fecha registrada';
  const day = date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: BUENOS_AIRES_TIMEZONE });
  const time = date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: BUENOS_AIRES_TIMEZONE });
  return `El día: ${day} a las: ${time}`;
}

function formatDetailedDateTime(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const day = date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: BUENOS_AIRES_TIMEZONE });
  const time = date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: BUENOS_AIRES_TIMEZONE });
  return `${day} a las ${time}`;
}

function formatContactMetaDetail(value) {
  if (!value) return 'Contacto realizado el día: Sin fecha registrada';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Contacto realizado el día: Sin fecha registrada';
  const day = date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: BUENOS_AIRES_TIMEZONE });
  const time = date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: BUENOS_AIRES_TIMEZONE });
  return `Contacto realizado el día: ${day} a las ${time}`;
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
  return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: BUENOS_AIRES_TIMEZONE });
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
    bringOverlayToFront(overlay);
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

function getJourneyStatusOption(key) {
  return JOURNEY_STATUS_OPTIONS.find(option => option.key === key) || null;
}

function normalizeJourneyStatus(client = {}) {
  const fallback = getJourneyStatusOption(DEFAULT_JOURNEY_STATUS_KEY) || JOURNEY_STATUS_OPTIONS[0];
  const current = client.journeyStatus || {};
  const resolved = getJourneyStatusOption(current.key) || fallback;
  return {
    key: resolved.key,
    label: current.label || resolved.label,
    updatedAt: current.updatedAt || '',
    accountId: current.accountId || '',
    accountName: current.accountName || ''
  };
}

function normalizeJourneyHistory(history = []) {
  return Array.isArray(history) ? history.filter(Boolean).map(entry => ({
    key: entry.key || DEFAULT_JOURNEY_STATUS_KEY,
    label: entry.label || getJourneyStatusOption(entry.key || DEFAULT_JOURNEY_STATUS_KEY)?.label || 'Sin Respuesta',
    timestamp: entry.timestamp || '',
    accountId: entry.accountId || '',
    accountName: entry.accountName || ''
  })) : [];
}

function ensureJourneyStatusData(client = {}) {
  return {
    ...client,
    journeyStatus: normalizeJourneyStatus(client),
    journeyHistory: normalizeJourneyHistory(client.journeyHistory)
  };
}

function updateClientJourneyStatus(client, statusKey) {
  if (!client) return;
  const option = getJourneyStatusOption(statusKey) || getJourneyStatusOption(DEFAULT_JOURNEY_STATUS_KEY);
  if (!option) return;
  const activeAccount = getActiveAccount();
  const timestamp = new Date().toISOString();
  client.journeyStatus = {
    key: option.key,
    label: option.label,
    updatedAt: timestamp,
    accountId: activeAccount?.id || '',
    accountName: activeAccount?.name || 'Sin cuenta'
  };
  client.journeyHistory = Array.isArray(client.journeyHistory) ? client.journeyHistory : [];
  client.journeyHistory.push({
    key: option.key,
    label: option.label,
    timestamp,
    accountId: activeAccount?.id || '',
    accountName: activeAccount?.name || 'Sin cuenta'
  });
}

function journeyStatusLabel(client = {}) {
  const normalized = normalizeJourneyStatus(client);
  return normalized.label || 'Sin Respuesta';
}

function journeyStatusShortLabel(client = {}) {
  const normalized = normalizeJourneyStatus(client);
  const shortLabel = JOURNEY_STATUS_SHORT_LABELS[normalized.key];
  return shortLabel || normalized.label || 'Sin Respuesta';
}

function journeyStatusLastUpdate(client = {}) {
  const normalized = normalizeJourneyStatus(client);
  return normalized.updatedAt || '';
}

function buildJourneyStatusOptions(selectedKey = 'none', { includeNone = false } = {}) {
  const optionsByKey = new Map(JOURNEY_STATUS_OPTIONS.map(option => [option.key, option]));
  const rows = [];
  if (includeNone) {
    rows.push(`<option value="none" ${selectedKey === 'none' ? 'selected' : ''}>Sin actualización de estado</option>`);
  }
  JOURNEY_STATUS_GROUPS.forEach(group => {
    const groupOptions = group.keys.map(key => optionsByKey.get(key)).filter(Boolean);
    if (!groupOptions.length) return;
    rows.push(`<optgroup label="${group.emoji} ${group.label}">`);
    groupOptions.forEach(option => {
      rows.push(
        `<option value="${option.key}" ${option.key === selectedKey ? 'selected' : ''}>${group.emoji} ${option.label}</option>`
      );
    });
    rows.push('</optgroup>');
  });
  return rows.join('');
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

function getInitialTemplate() {
  return templates.find(template => isInitialTemplate(template)) || templates[0];
}

function getInitialTemplateVariations(template = getInitialTemplate()) {
  if (!template || !isInitialTemplate(template)) return [];
  return Array.isArray(template.variations) ? template.variations : [];
}

function getSelectedInitialVariationId(template = getInitialTemplate()) {
  const variations = getInitialTemplateVariations(template);
  if (!variations.length) return null;
  const storedId = uiState.templateVariations?.initialSelectedId;
  const selected = variations.find(variation => variation.id === storedId) || variations[0];
  if (selected?.id !== storedId) {
    uiState.templateVariations = { ...(uiState.templateVariations || {}), initialSelectedId: selected.id };
    persist();
  }
  return selected?.id || null;
}

function getSelectedInitialVariation(template = getInitialTemplate()) {
  const variations = getInitialTemplateVariations(template);
  if (!variations.length) return null;
  const selectedId = getSelectedInitialVariationId(template);
  return variations.find(variation => variation.id === selectedId) || variations[0];
}

function setSelectedInitialVariationId(template, variationId) {
  if (!template || !isInitialTemplate(template)) return;
  const variations = getInitialTemplateVariations(template);
  const selected = variations.find(variation => variation.id === variationId) || variations[0];
  if (!selected) return;
  uiState.templateVariations = { ...(uiState.templateVariations || {}), initialSelectedId: selected.id };
  persist();
}

function resolveTemplateBody(template, { variationId } = {}) {
  if (!template) return '';
  if (isInitialTemplate(template)) {
    const variations = getInitialTemplateVariations(template);
    const selected = variationId
      ? variations.find(variation => variation.id === variationId)
      : getSelectedInitialVariation(template);
    return selected?.body || '';
  }
  return template.body || '';
}

function setTemplateBody(template, value = '', { variationId } = {}) {
  if (!template) return;
  if (isInitialTemplate(template)) {
    const variations = getInitialTemplateVariations(template);
    const selected = variationId
      ? variations.find(variation => variation.id === variationId)
      : getSelectedInitialVariation(template);
    if (selected) {
      selected.body = value;
    }
    return;
  }
  template.body = value;
}

function getRotatingInitialVariation(template = getInitialTemplate(), { advance = false } = {}) {
  if (!template || !isInitialTemplate(template)) return null;
  const variations = getInitialTemplateVariations(template);
  if (!variations.length) return null;
  const safeIndex = Math.max(0, Math.floor(template.rotationIndex || 0)) % variations.length;
  const variation = variations[safeIndex];
  if (advance) {
    template.rotationIndex = (safeIndex + 1) % variations.length;
    persist();
  }
  return variation;
}

function formatCurrencyValue(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return '';
  return currency.format(numeric);
}

function resolveAge(value) {
  const date = parseExcelDate(value);
  if (!date) return '';
  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDiff = today.getMonth() - date.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
    age -= 1;
  }
  return age > 0 ? String(age) : '';
}

function resolvePlanDraftVehicle() {
  const index = Number(uiState.planDraft?.planModel);
  if (!Number.isFinite(index)) return null;
  return vehicles[index] || null;
}

function buildDynamicVariableMap(client = {}) {
  const globalSettings = mergeGlobalSettings(uiState.globalSettings);
  const activeAccount = getActiveAccount(globalSettings);
  const advisorName = resolveAccountAdvisorName(activeAccount) || globalSettings.advisorName || '';
  const year = extractYear(client.purchaseDate || client.birthDate || '');
  const noteValue = normalizeNotesValue(client.type);
  const defaultNote = normalizeNotesValue(globalSettings.clientType);
  const noteForMessage = noteValue !== '-' ? noteValue : (defaultNote !== '-' ? defaultNote : '');
  const status = clientStatus(client).label || '';
  const planVehicle = resolvePlanDraftVehicle();
  const planType = uiState.planDraft?.planType || (planVehicle ? getPlanTypeForVehicle(planVehicle) : '');
  const today = new Date();
  const todayIso = formatLocalISO(today);
  const monthLabel = today.toLocaleDateString('es-AR', { month: 'long' });
  const hasTradeIn = client.tradeIn !== undefined ? client.tradeIn : uiState.planDraft?.tradeIn;
  const tradeInValue = client.tradeInValue ?? uiState.planDraft?.tradeInValue ?? '';
  return {
    cliente: client.name || '',
    asesor: advisorName,
    telefono: formatPhoneDisplay(client.phone || '') || client.phone || '',
    telefono_limpio: normalizePhone(client.phone || ''),
    dni: formatDniValue(client.document || client.dni || ''),
    cuil: formatCuilValue(client.cuit || client.cuil || ''),
    cuit: formatCuilValue(client.cuit || client.cuil || ''),
    fecha_nacimiento: formatDateForDisplay(client.birthDate) || '',
    edad: resolveAge(client.birthDate),
    fecha_compra: formatDateForDisplay(client.purchaseDate) || '',
    fecha_carga: formatDateForDisplay(client.systemDate) || '',
    fecha_contacto: formatDateTimeForDisplay(client.contactDate) || '',
    localidad: client.city || '',
    provincia: client.province || '',
    ciudad: client.city || '',
    cp: client.postalCode || '',
    modelo_actual: client.model || client.brand || '',
    marca_actual: client.brand || '',
    plan: client.plan || planType || '',
    cuota: client.cuota ? formatCurrencyValue(client.cuota) : '',
    tipo: noteForMessage,
    notas: noteForMessage,
    estado: status,
    anio_retiro: year,
    km: client.km || '',
    entrega_usado: hasTradeIn ? 'Sí' : 'No',
    valor_efectivo: tradeInValue ? formatCurrencyValue(tradeInValue) : '',
    modelo_nuevo: planVehicle?.name || '',
    marca_nuevo: planVehicle?.brand || '',
    plan_tipo: planType ? planLabel(planType) : '',
    cuotas_maximas: planType ? String(resolveMaxInstallments(planVehicle?.planProfile?.maxInstallments, planType)) : '',
    precio_lista: formatCurrencyValue(planVehicle?.basePrice || ''),
    integracion: formatCurrencyValue(planVehicle?.integration || ''),
    cuota_pura: formatCurrencyValue(planVehicle?.cuotaPura || ''),
    reserva_1: formatCurrencyValue(uiState.planDraft?.reservation1 || ''),
    reserva_3: formatCurrencyValue(uiState.planDraft?.reservation3 || ''),
    reserva_6: formatCurrencyValue(uiState.planDraft?.reservation6 || ''),
    monto_adelantado: formatCurrencyValue(uiState.planDraft?.advanceAmount || ''),
    precio_personalizado: formatCurrencyValue(uiState.planDraft?.customPrice || ''),
    valor_usado: formatCurrencyValue(tradeInValue || ''),
    fecha_hoy: formatDateLabel(todayIso),
    fecha_hoy_iso: todayIso,
    hora_hoy: formatTimeValue(today),
    mes_actual: monthLabel,
    anio_actual: String(today.getFullYear())
  };
}

function escapeRegExp(value = '') {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildMessageForClient(client, { advance = false } = {}) {
  const tpl = getInitialTemplate();
  if (!tpl) return '';
  const variation = getRotatingInitialVariation(tpl, { advance }) || getSelectedInitialVariation(tpl);
  if (!variation) return '';
  const replacements = buildDynamicVariableMap(client);
  let content = variation.body || '';
  extractVariables(content).forEach(key => {
    const value = replacements[key] ?? uiState.variableValues[key] ?? '';
    const regex = new RegExp(`{{\\s*${escapeRegExp(key)}\\s*}}`, 'gi');
    content = content.replace(regex, value);
  });
  return content;
}

function buildTemplateTextForClient(template, client, { variationId } = {}) {
  if (!template) return '';
  const replacements = buildDynamicVariableMap(client);
  let content = resolveTemplateBody(template, { variationId });
  extractVariables(content).forEach(key => {
    const value = replacements[key] ?? uiState.variableValues[key] ?? '';
    const regex = new RegExp(`{{\\s*${escapeRegExp(key)}\\s*}}`, 'gi');
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

let priceTabs = [];
let activePriceTabId = '';
let priceDrafts = load('priceDrafts') || {};
let activePriceSource = 'local';
let vehicles = cloneVehicles(load('vehicles') || defaultVehicles);
let brandSettings = normalizeBrandSettings(load('brandSettings') || defaultBrandSettings, vehicles);
let templates = ensureTemplateIds(load('templates') || defaultTemplates);
let clients = load('clients') || [];
let managerClients = (load('managerClients') || []).map(client => ensureJourneyStatusData(client));
let accountManagerState = { selectedId: null, drafts: {} };
let accountManagerTimers = { name: null, phone: null };
let accountApplyState = { isRunning: false };
let profileSwitchTimer = null;
let adminState = { selectedUid: null, users: [], userDataCache: {} };
let importedManagerState = { selectedIds: new Set(), loading: false, searchTerm: '' };
let importedManagerTimer = null;
let moduleImportState = null;
let uiState = { ...defaultUiState, ...(load('uiState') || {}) };
let clientManagerState = { ...defaultClientManagerState, ...(load('clientManagerState') || {}) };
let generatedQuotes = load('generatedQuotes') || [];
let selectedTemplateIndex = Math.min(uiState.selectedTemplateIndex || 0, templates.length - 1);
let planDraftApplied = false;
let lastPlanProjection = null;
let snapshots = load('snapshots') || [];
let activeNoteClientId = null;
let activeActionClientId = null;
let activeEditAction = null;
let activeStatusClientId = null;
let activeStatusReturnToMenu = false;
let activeReassignClientId = null;
let activeReassignReturnToMenu = false;
let activeQuoteReassignId = null;
let activeQuoteReassignSelectionId = null;
let activeQuoteReassignResults = [];
let contactLogInterval = null;
let editingCustomActionId = null;
let selectedCustomIcon = 'bx-check-circle';
let activeContextClientId = null;
let activeScheduleClientId = null;
let scheduleClockInterval = null;
let vehicleEditorState = { selectedIndex: 0, search: '', brandFilter: 'all', tab: 'models' };
let vehicleEditorAutosaveTimer = null;
let journeyReportState = { from: '', to: '' };
let authState = { user: null, session: null, stream: null, isReady: false, loading: false, loggingOut: false, offline: false };
const PRESENCE_HEARTBEAT_MS = 60000;
const PRESENCE_ACTIVE_GRACE_MS = 150000;
const FORCE_LOGOUT_CHECK_MS = 30000;
let presenceState = {
  sessionId: null,
  sessionStartedAt: null,
  heartbeatTimer: null,
  activityTimer: null,
  lastActivitySyncAt: 0,
  stream: null,
  adminStream: null,
  adminSnapshot: {},
  visibilityBound: false
};
const storageState = {
  uid: STORAGE_GUEST_ID
};
const forceLogoutState = {
  timer: null,
  lastGlobalAt: 0,
  lastUserAt: 0,
  checking: false
};
const syncState = {
  lastSyncAt: 0,
  lastHashes: getStoredValue(SYNC_HASH_STORAGE_KEY) || {}
};
const readOnlyState = {
  active: false,
  lastToastAt: 0
};
const idleState = {
  timer: null,
  lastActivityAt: Date.now(),
  lastModificationAt: Date.now(),
  bound: false
};
let appBooted = false;
let relativeTimeTicker = null;
const syncStatus = {
  online: typeof navigator !== 'undefined' ? navigator.onLine : true,
  lastSyncAt: null,
  lastCheckAt: null,
  syncing: false
};
let remoteSyncQueue = {};
let remoteSyncTimer = null;
let isApplyingRemote = false;

const appLoaderState = {
  steps: []
};

function loaderMetricForModule(moduleId) {
  switch (moduleId) {
    case 'clientManager':
      return { label: 'clientes cargados', total: managerClients.length };
    case 'quickActions':
      return { label: 'acciones cargadas', total: (clientManagerState.customActions || []).length };
    case 'contactLog':
      return { label: 'contactos cargados', total: contactLogEntries({ search: '', statusFilter: 'all' }).length };
    case 'journeyReport':
      return { label: 'registros cargados', total: managerClients.length };
    case 'scheduledClients':
      return { label: 'clientes programados', total: scheduledClientsList().length };
    case 'templates':
      return { label: 'plantillas cargadas', total: templates.length };
    case 'plans':
      return { label: 'cotizaciones cargadas', total: generatedQuotes.length };
    case 'quoteGenerator':
      return { label: 'cotizaciones cargadas', total: generatedQuotes.length };
    case 'vehicles':
      return { label: 'modelos cargados', total: vehicles.length };
    case 'preferences':
      return { label: 'ajustes cargados', total: Object.keys(uiState.preferences || {}).length };
    case 'accounts':
      return { label: 'cuentas cargadas', total: (uiState.globalSettings?.accounts || []).length };
    default:
      return { label: 'elementos cargados', total: 0 };
  }
}

function renderLoaderModuleSummary() {
  const moduleCountEl = document.getElementById('loaderModuleCount');
  const submoduleCountEl = document.getElementById('loaderSubmoduleCount');
  const exportableCountEl = document.getElementById('loaderExportableCount');
  const list = document.getElementById('loaderModuleList');
  if (!moduleCountEl || !submoduleCountEl || !exportableCountEl || !list) return;
  const modules = MODULE_CATALOG.filter(item => item.type === 'module');
  const submodules = MODULE_CATALOG.filter(item => item.type === 'submodule');
  const exportable = MODULE_CATALOG.filter(item => item.exportable);
  moduleCountEl.textContent = String(modules.length);
  submoduleCountEl.textContent = String(submodules.length);
  exportableCountEl.textContent = String(exportable.length);
  list.innerHTML = '';
  const groups = MODULE_GROUPS.length ? MODULE_GROUPS : [{ id: 'default', title: 'Módulos' }];
  groups.forEach(group => {
    const groupModules = MODULE_CATALOG.filter(
      item => item.type === 'module' && (item.group || 'default') === group.id
    );
    if (!groupModules.length) return;
    const groupEl = document.createElement('div');
    groupEl.className = 'loader-module-group';
    const title = document.createElement('div');
    title.className = 'loader-module-group-title';
    title.textContent = group.title;
    groupEl.appendChild(title);
    groupModules.forEach(module => {
      const moduleMetric = loaderMetricForModule(module.id);
      const item = document.createElement('div');
      item.className = 'loader-module-item';
      item.innerHTML = `
        <div class="loader-module-row">
          <div>
            <strong>${module.label}</strong>
            <p class="muted tiny">Cargando módulo: ${moduleMetric.total}/${moduleMetric.total} ${moduleMetric.label} · ${module.exportable ? 'Exportable' : 'Solo lectura'}</p>
          </div>
          <span class="loader-chip ${module.exportable ? 'exportable' : ''}">${moduleTypeLabel(module)}</span>
        </div>
      `;
      const nested = MODULE_CATALOG.filter(entry => entry.parent === module.id);
      if (nested.length) {
        const subList = document.createElement('div');
        subList.className = 'loader-submodule-list';
        nested.forEach(sub => {
          const subMetric = loaderMetricForModule(sub.id);
          const subItem = document.createElement('div');
          subItem.className = 'loader-submodule-item';
          subItem.innerHTML = `
            <span>${sub.label} (${subMetric.total}/${subMetric.total} ${subMetric.label})</span>
            <span class="loader-chip ${sub.exportable ? 'exportable' : ''}">${moduleTypeLabel(sub)}</span>
          `;
          subList.appendChild(subItem);
        });
        item.appendChild(subList);
      }
      groupEl.appendChild(item);
    });
    list.appendChild(groupEl);
  });
}

function setAppLoaderSteps(steps = []) {
  const overlay = document.getElementById('appLoader');
  if (!overlay) return;
  const container = document.getElementById('loaderSteps');
  if (!container) return;
  const normalized = steps.map((step, index) => {
    if (typeof step === 'string') {
      return { label: step, current: 0, total: 0 };
    }
    return {
      label: step.label || `Paso ${index + 1}`,
      current: step.current ?? 0,
      total: step.total ?? 0
    };
  });
  appLoaderState.steps = normalized.map(step => step.label);
  container.innerHTML = '';
  normalized.forEach((stepData, index) => {
    const step = document.createElement('div');
    step.className = 'loader-step';
    step.dataset.step = String(index);
    step.innerHTML = `
      <div class="loader-step-header">
        <span class="loader-step-title">${stepData.label}</span>
        <span class="loader-step-count">0/0</span>
      </div>
      <div class="loader-step-bar"><span></span></div>
    `;
    container.appendChild(step);
    updateAppLoaderStepProgress(index, stepData.current, stepData.total);
  });
  updateLoaderStatus(0, normalized.length);
}

function updateLoaderHeader({ eyebrow, headline } = {}) {
  const eyebrowEl = document.getElementById('loaderEyebrow');
  const headlineEl = document.getElementById('loaderHeadline');
  if (eyebrowEl && eyebrow) eyebrowEl.textContent = eyebrow;
  if (headlineEl && headline) headlineEl.textContent = headline;
}

function setAppLoaderProgress(percent) {
  const bar = document.getElementById('loaderBar');
  if (!bar) return;
  const normalized = Math.min(Math.max(percent, 0), 100);
  bar.style.width = `${normalized}%`;
  const statusPercent = document.getElementById('loaderStatusPercent');
  if (statusPercent) {
    statusPercent.textContent = `${Math.round(normalized)}%`;
  }
}

function updateAppLoaderStepText(stepIndex, text) {
  const overlay = document.getElementById('appLoader');
  if (!overlay) return;
  const step = overlay.querySelector(`.loader-step[data-step="${stepIndex}"]`);
  if (!step) return;
  const title = step.querySelector('.loader-step-title');
  if (title) {
    title.textContent = text;
  }
}

function updateAppLoaderStepProgress(stepIndex, current, total) {
  const overlay = document.getElementById('appLoader');
  if (!overlay) return;
  const step = overlay.querySelector(`.loader-step[data-step="${stepIndex}"]`);
  if (!step) return;
  const countEl = step.querySelector('.loader-step-count');
  const bar = step.querySelector('.loader-step-bar span');
  const safeTotal = Math.max(total || 0, 0);
  const safeCurrent = Math.min(Math.max(current || 0, 0), safeTotal || current || 0);
  if (countEl) {
    countEl.textContent = `${safeCurrent}/${safeTotal}`;
  }
  if (bar) {
    const percent = safeTotal > 0 ? (safeCurrent / safeTotal) * 100 : safeCurrent > 0 ? 100 : 0;
    bar.style.width = `${percent}%`;
  }
}

function updateLoaderStatus(stepIndex, total) {
  const statusText = document.getElementById('loaderStatusText');
  if (!statusText) return;
  const safeTotal = Math.max(total, 0);
  const safeIndex = Math.min(Math.max(stepIndex + 1, 1), safeTotal || 1);
  if (safeTotal === 0) {
    statusText.textContent = '0/0';
    return;
  }
  statusText.textContent = `${safeIndex}/${safeTotal}`;
}

function setAppLoaderStep(stepIndex) {
  const overlay = document.getElementById('appLoader');
  if (!overlay) return;
  overlay.classList.add('show');
  const bar = document.getElementById('loaderBar');
  const steps = Array.from(overlay.querySelectorAll('.loader-step'));
  updateLoaderStatus(stepIndex, steps.length || appLoaderState.steps.length || 0);
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === stepIndex);
    step.classList.toggle('done', index < stepIndex);
  });
  if (bar) {
    const total = steps.length || appLoaderState.steps.length || 1;
    const progress = Math.min(((stepIndex + 1) / total) * 100, 100);
    bar.style.width = `${progress}%`;
    const statusPercent = document.getElementById('loaderStatusPercent');
    if (statusPercent) {
      statusPercent.textContent = `${Math.round(progress)}%`;
    }
  }
}

function hideAppLoader() {
  const overlay = document.getElementById('appLoader');
  if (!overlay) return;
  overlay.classList.remove('show');
}

function nextFrame() {
  return new Promise(resolve => requestAnimationFrame(() => resolve()));
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

function showImportOverlay({ eyebrow, title, subtitle, helper, steps }) {
  const overlay = document.getElementById('importOverlay');
  if (!overlay) return;
  const eyebrowEl = document.getElementById('importOverlayEyebrow');
  const titleEl = document.getElementById('importOverlayTitle');
  const subtitleEl = document.getElementById('importOverlaySubtitle');
  const helperEl = document.getElementById('importOverlayHelper');
  const stepsEl = document.getElementById('importOverlaySteps');
  const bar = document.getElementById('importOverlayBar');
  if (eyebrowEl) eyebrowEl.textContent = eyebrow || 'Importación';
  if (titleEl) titleEl.textContent = title || 'Preparando importación...';
  if (subtitleEl) subtitleEl.textContent = subtitle || 'Espera un momento...';
  if (helperEl) helperEl.textContent = helper || '';
  if (stepsEl) {
    stepsEl.innerHTML = (steps || []).map((step, index) => (
      `<div class="import-step${index === 0 ? ' active' : ''}" data-step="${index}"><span>${step}</span><span></span></div>`
    )).join('');
  }
  if (bar) bar.style.width = '0%';
  overlay.classList.remove('hidden');
}

function updateImportOverlayStep(stepIndex, text, detail) {
  const overlay = document.getElementById('importOverlay');
  if (!overlay) return;
  const steps = Array.from(overlay.querySelectorAll('.import-step'));
  steps.forEach((step, index) => {
    step.classList.toggle('active', index === stepIndex);
    step.classList.toggle('done', index < stepIndex);
    if (index === stepIndex && text) {
      const label = step.querySelector('span');
      if (label) label.textContent = text;
    }
    if (index === stepIndex && detail !== undefined) {
      const detailEl = step.querySelector('span:last-child');
      if (detailEl) detailEl.textContent = detail;
    }
  });
}

function updateImportOverlayProgress(value, total = 100) {
  const bar = document.getElementById('importOverlayBar');
  if (!bar) return;
  const percent = total === 0 ? 0 : Math.min((value / total) * 100, 100);
  bar.style.width = `${percent}%`;
}

function hideImportOverlay() {
  const overlay = document.getElementById('importOverlay');
  if (!overlay) return;
  overlay.classList.add('hidden');
}

function formatLoaderStepLabel(label, current, total) {
  if (total <= 0) return label;
  return label;
}

function getModuleLoadingSteps() {
  return [
    { label: 'Cuentas', total: (uiState.globalSettings?.accounts || []).length },
    { label: 'Plantillas', total: templates.length },
    { label: 'Clientes', total: managerClients.length },
    { label: 'Autos y valores', total: vehicles.length },
    { label: 'Cotizaciones', total: generatedQuotes.length },
    { label: 'Utilidades', total: document.querySelectorAll('#utilitiesMenuPanel .menu-item').length },
    { label: 'Ajustes', total: document.querySelectorAll('#settingsPanel .menu-item, #actionMenuPanel .menu-item').length },
    { label: 'Pestañas', total: document.querySelectorAll('#mainNav .nav-link').length }
  ];
}

function isProfileCompatible(profile) {
  return !!(profile
    && typeof profile === 'object'
    && Array.isArray(profile.vehicles)
    && Array.isArray(profile.templates)
    && Array.isArray(profile.clients)
    && Array.isArray(profile.managerClients)
    && typeof profile.uiState === 'object');
}

async function runModuleLoadingSequence() {
  const steps = getModuleLoadingSteps();
  setAppLoaderSteps(steps);
  for (let i = 0; i < steps.length; i += 1) {
    const { total, label } = steps[i];
    const safeTotal = Math.max(total, 0);
    let current = 0;
    const duration = 650;
    const start = performance.now();
    while (current < safeTotal) {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      current = Math.min(Math.round(progress * safeTotal), safeTotal);
      setAppLoaderStep(i);
      updateAppLoaderStepText(i, formatLoaderStepLabel(label, current, safeTotal));
      updateAppLoaderStepProgress(i, current, safeTotal);
      setAppLoaderProgress(steps.length === 0 ? 0 : ((i + progress) / steps.length) * 100);
      await nextFrame();
      if (progress >= 1) break;
    }
    setAppLoaderStep(i);
    updateAppLoaderStepText(i, formatLoaderStepLabel(label, safeTotal, safeTotal));
    updateAppLoaderStepProgress(i, safeTotal, safeTotal);
    setAppLoaderProgress(steps.length === 0 ? 0 : ((i + 1) / steps.length) * 100);
    await wait(120);
  }
}

function migrateLegacyPrices() {
  const legacyVehicles = load('vehicles');
  if (legacyVehicles && !priceDrafts?.legacy) {
    priceDrafts = {
      ...priceDrafts,
      legacy: {
        vehicles: cloneVehicles(legacyVehicles),
        brandSettings: normalizeBrandSettings(load('brandSettings') || defaultBrandSettings, legacyVehicles),
        updatedAt: new Date().toISOString()
      }
    };
  }
}

migrateLegacyPrices();

clientManagerState.dateRange = { ...defaultClientManagerState.dateRange, ...(clientManagerState.dateRange || {}) };
clientManagerState.columnVisibility = { ...defaultClientManagerState.columnVisibility, ...(clientManagerState.columnVisibility || {}) };
clientManagerState.actionVisibility = { ...defaultActionVisibility, ...(clientManagerState.actionVisibility || {}) };
clientManagerState.customActions = (clientManagerState.customActions || []).map(action => ({ ...action, visible: true, statusKey: action.statusKey || 'none' }));
clientManagerState.pagination = normalizePaginationState(clientManagerState.pagination || defaultClientManagerState.pagination);
clientManagerState.contactAssistant = { ...defaultClientManagerState.contactAssistant, ...(clientManagerState.contactAssistant || {}) };
clientManagerState.contactAssistantQuickAdjust = {
  ...defaultClientManagerState.contactAssistantQuickAdjust,
  ...(clientManagerState.contactAssistantQuickAdjust || {})
};
clientManagerState.contactLogStatusFilter = clientManagerState.contactLogStatusFilter || defaultClientManagerState.contactLogStatusFilter;
clientManagerState.contactLogRange = clientManagerState.contactLogRange || defaultClientManagerState.contactLogRange;

uiState.templateSearch = uiState.templateSearch || '';
uiState.clientSearch = uiState.clientSearch || '';
uiState.quoteSearch = uiState.quoteSearch || '';
uiState.profileSearch = uiState.profileSearch || '';
uiState.globalSettings = mergeGlobalSettings(uiState.globalSettings);
uiState.preferences = mergePreferences(uiState.preferences);
uiState.vehicleFilters = { ...defaultUiState.vehicleFilters, ...(uiState.vehicleFilters || {}) };
let selectedTemplateId = templates[selectedTemplateIndex]?.id;

uiState.variableValues = uiState.variableValues || {};
uiState.templatePreview = { ...defaultUiState.templatePreview, ...(uiState.templatePreview || {}) };
uiState.toggles = { ...defaultUiState.toggles, ...(uiState.toggles || {}) };
uiState.planDraft = uiState.planDraft || {};
let selectedPlanClientId = uiState.planDraft.selectedClientId || null;

init();

async function bootModules() {
  if (appBooted) return;
  appBooted = true;
  try {
    unlockAppShell();
    document.body.classList.add('modules-loading');
    updateLoaderHeader({ eyebrow: 'Inicializando módulos...', headline: 'Preparando el panel principal' });
    const initialSteps = getModuleLoadingSteps();
    setAppLoaderSteps(initialSteps);
    setAppLoaderStep(0);
    await nextFrame();
    setupScrollLockObserver();
    bindNavigation();
    bindQuoteNavigation();
    bindProfileActions();
    bindModuleManagement();
    bindSettingsMenu();
    bindPreferencesPanel();
    bindActionMenu();
    bindUtilitiesMenu();
    bindSidebarToggle();
    bindScrollTopButton();
    bindQuickLinks();
    applyToggleState();
    applyPreferences();
    applyStatusPalette();
    renderStats();
    renderWelcomeHero();
    await nextFrame();
    renderQuickOverview();
    renderHomeShortcuts();
    renderTemplates();
    await nextFrame();
    renderPlanForm();
    renderClients();
    renderClientManager();
    renderScheduledClients();
    renderGlobalSettings();
    renderSnapshots();
    renderModuleManagement();
    bindNoteModal();
    bindClientPicker();
    updateUtilitiesVisibility(resolveNavTarget(document.querySelector('.panel.active')?.id || 'dashboard'));
    bindQuoteModal();
    bindResourceButtons();
    attachPlanListeners();
    bindQuoteGenerator();
    bindQuoteClientModal();
    attachTemplateActions();
    bindPriceTabControls();
    bindPriceImportActions();
    attachVehicleToggles();
    bindVehicleEditor();
    bindClientManager();
    bindJourneyReport();
    bindImportedDataManager();
    bindAccountManager();
    bindAccountInfoModal();
    bindTemplatePicker();
    bindContactAssistant();
    bindBulkMessageWarningModal();
    bindScheduleModal();
    bindActionCustomizer();
    bindCustomContextMenu();
    bindQuoteCreation();
    startContactLogTicker();
    startScheduleClock();
    startRealtimePersistence();
    await initializePriceTabs();
    renderPriceTabs();
    renderVehicleTable();
    renderPlanForm();
    await nextFrame();
    await runModuleLoadingSequence();
    hideAppLoader();
    document.body.classList.remove('modules-loading');
    document.body.classList.add('modules-loaded');
    document.getElementById('clearStorage').addEventListener('click', clearStorage);
  } catch (err) {
    console.error('Error during initialization:', err);
    hideAppLoader();
    document.body.classList.remove('modules-loading');
    document.body.classList.add('modules-loaded');
  }
}

async function init() {
  try {
    lockAppShell();
    hideAppLoader();
    updateLoaderHeader({ eyebrow: 'Conectando con la base de datos...', headline: 'Obteniendo información...' });
    bindAuthUI();
    bindSyncStatusCard();
    bindIdleActivity();
    startRelativeTimeTicker();
    setSyncStatus({ online: navigator.onLine, lastCheckAt: Date.now() });
    window.addEventListener('online', () => setSyncStatus({ online: true, lastCheckAt: Date.now() }));
    window.addEventListener('offline', () => setSyncStatus({ online: false, lastCheckAt: Date.now() }));
    await initializeAuth();
    if (authState.session) {
      await bootModules();
    }
  } catch (err) {
    console.error('Error during initialization:', err);
    hideAppLoader();
  }
}

function bindNavigation() {
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (btn.dataset.target === 'quoteGenerator') {
        setQuoteGeneratorView('hub');
      }
      activatePanel(btn.dataset.target);
    });
  });
}

function bindQuoteNavigation() {
  const group = document.getElementById('myQuotesNav');
  const list = document.getElementById('myQuotesList');
  if (!group || !list || group.dataset.bound) return;
  group.dataset.bound = 'true';
  list.addEventListener('click', (event) => {
    const target = event.target.closest('[data-quote-id]');
    if (!target) return;
    const id = target.dataset.quoteId;
    if (!id) return;
    loadQuoteGeneratorEntry(id);
    activatePanel('quoteGenerator');
  });
}

function resolveNavTarget(targetId) {
  return NAV_PARENT_MAP[targetId] || targetId;
}

function activatePanel(targetId) {
  const navTarget = resolveNavTarget(targetId);
  document.querySelectorAll('.nav-link').forEach(b => b.classList.toggle('active', b.dataset.target === navTarget));
  document.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.id === targetId));
  const targetPanel = document.getElementById(targetId);
  updateSectionTitle(targetId);
  if (targetId === 'plans') {
    updatePlanSummary();
  }
  if (targetId === 'quoteGenerator') {
    openQuoteGeneratorPanel();
  }
  if (targetId === 'scheduledClients') {
    renderScheduledClients();
  }
  if (targetId === 'importedDataManager') {
    renderImportedDataManager({ showLoader: true });
  }
  updateScrollTopButton();
  updateUtilitiesVisibility(navTarget);
}

function updateSectionTitle(targetId) {
  const title = document.getElementById('sectionTitle');
  if (!title) return;
  title.textContent = panelTitles[targetId] || 'Inicio';
}

function bindQuickLinks() {
  document.querySelectorAll('[data-jump]').forEach(btn => btn.addEventListener('click', () => activatePanel(btn.dataset.jump)));
}

function bindQuoteCreation() {
  const addBtn = document.getElementById('addQuoteToMyQuotes');
  if (!addBtn || addBtn.dataset.bound) return;
  addBtn.dataset.bound = 'true';
  addBtn.addEventListener('click', () => {
    ensureQuoteGeneratorState();
    const draft = buildQuoteGeneratorDraft({ blank: true });
    const link = resolvePlanQuoteClientLink();
    createQuoteGeneratorEntry(draft, link);
    applyQuoteGeneratorAutoFill({ scope: 'all' });
    activatePanel('quoteGenerator');
    showToast('Cotización agregada a "Mis Cotizaciones".', 'success');
  });
}

function openQuoteGeneratorPanel() {
  ensureQuoteGeneratorState();
  updateQuoteGeneratorView();
  if (uiState.quoteGenerator?.view === 'workspace') {
    const selectedId = uiState.quoteGenerator?.selectedId;
    if (selectedId) {
      const entry = generatedQuotes.find(item => item.id === selectedId);
      if (entry) {
        commitQuoteGeneratorDraft(entry.draft, { refreshForm: true });
        return;
      }
    }
    renderQuoteGeneratorForm();
    return;
  }
  renderQuoteGeneratorHub();
}

function bindQuoteGenerator() {
  const panel = document.getElementById('quoteGenerator');
  if (!panel || panel.dataset.bound) return;
  panel.dataset.bound = 'true';
  ensureQuoteGeneratorState();

  panel.addEventListener('input', (event) => {
    const target = event.target;
    if (target.matches('[data-quote-field]') && !target.classList.contains('money')) {
      const normalizedValue = normalizeQuoteGeneratorFieldValue(target.dataset.quoteField, target.value);
      if (target.value !== normalizedValue) {
        target.value = normalizedValue;
      }
      updateQuoteGeneratorField(target.dataset.quoteField, normalizedValue);
    }
    if (target.matches('[data-payment-field][data-payment-index]') && !target.classList.contains('money')) {
      updateQuoteGeneratorPayment(Number(target.dataset.paymentIndex), target.dataset.paymentField, target.value);
    }
  });

  panel.addEventListener('focusin', (event) => {
    const target = event.target;
    if (target?.id === 'clientCel' && !target.value.trim()) {
      target.value = '+54 ';
      updateQuoteGeneratorField('client.cel', target.value);
    }
  });

  panel.addEventListener('change', (event) => {
    const target = event.target;
    if (target.matches('[data-quote-field][type="checkbox"]')) {
      updateQuoteGeneratorField(target.dataset.quoteField, target.checked);
    }
    if (target.matches('[data-visibility-field]')) {
      const draft = getQuoteGeneratorDraft();
      draft.visibility = { ...DEFAULT_QUOTE_VISIBILITY, ...(draft.visibility || {}) };
      draft.visibility[target.dataset.visibilityField] = target.checked;
      commitQuoteGeneratorDraft(draft);
    }
  });

  panel.addEventListener('click', (event) => {
    const previewTarget = event.target.closest('[data-focus-target]');
    if (previewTarget && previewTarget.closest('#quotePreview')) {
      focusQuoteGeneratorField(previewTarget.dataset.focusTarget, previewTarget.dataset.focusTab);
      return;
    }
    const tabButton = event.target.closest('.quote-tab');
    if (tabButton) {
      setQuoteGeneratorActiveTab(tabButton.dataset.tabTarget);
      return;
    }

    const autoFieldBtn = event.target.closest('[data-auto-field]');
    if (autoFieldBtn) {
      const fieldPath = autoFieldBtn.dataset.autoField;
      if (fieldPath === 'meta.quoteNumber') {
        updateQuoteGeneratorField(fieldPath, generateQuoteNumber(getQuoteGeneratorDraft()?.client?.dni));
        const input = document.querySelector(`[data-quote-field="${fieldPath}"]`);
        if (input) input.value = getQuoteGeneratorDraft().meta.quoteNumber;
        return;
      }
      const source = buildQuoteGeneratorAutoSource();
      const value = source.fields[fieldPath];
      if (value !== undefined && value !== null && value !== '') {
        const normalizedValue = normalizeQuoteGeneratorFieldValue(fieldPath, value);
        updateQuoteGeneratorField(fieldPath, normalizedValue);
        const input = document.querySelector(`[data-quote-field="${fieldPath}"]`);
        if (input) {
          if (input.classList.contains('money')) {
            setMoneyValue(input, normalizedValue);
          } else {
            input.value = normalizedValue;
          }
        }
      } else {
        showToast('No hay datos automáticos para ese campo.', 'error');
      }
      return;
    }

    const autoFillBtn = event.target.closest('[data-auto-fill]');
    if (autoFillBtn) {
      const scope = autoFillBtn.dataset.autoFill;
      applyQuoteGeneratorAutoFill({ scope });
      return;
    }

    if (event.target.closest('[data-auto-payments]')) {
      applyQuoteGeneratorAutoFill({ scope: 'payments' });
      return;
    }

    const autoBonifiedBtn = event.target.closest('[data-auto-bonified]');
    if (autoBonifiedBtn) {
      const kind = autoBonifiedBtn.dataset.autoBonified;
      const draft = getQuoteGeneratorDraft();
      const source = buildQuoteGeneratorAutoSource();
      const autoAmount = resolveBonifiedAutoAmount(source.quote, draft, kind);
      if (!autoAmount) {
        showToast('No hay datos automáticos para la cuota seleccionada.', 'error');
        return;
      }
      draft.bonifiedPayments = {
        ...draft.bonifiedPayments,
        [kind]: { ...draft.bonifiedPayments?.[kind], amount: autoAmount }
      };
      recalculateBonifiedPayment(draft, kind);
      syncBonifiedFormField(draft, kind);
      commitQuoteGeneratorDraft(draft);
      const input = document.querySelector(`[data-quote-field="bonifiedPayments.${kind}.amount"]`);
      if (input) setMoneyValue(input, autoAmount);
      return;
    }

    const autoCuotaPuraBtn = event.target.closest('[data-auto-cuota-pura]');
    if (autoCuotaPuraBtn) {
      const draft = getQuoteGeneratorDraft();
      const source = buildQuoteGeneratorAutoSource();
      const autoAmount = resolveQuoteGeneratorCuotaPura(source.quote, draft);
      if (!autoAmount) {
        showToast('No hay datos automáticos para la cuota pura.', 'error');
        return;
      }
      draft.cuotaPura = { ...(draft.cuotaPura || {}), amount: autoAmount };
      commitQuoteGeneratorDraft(draft);
      const input = document.querySelector('[data-quote-field="cuotaPura.amount"]');
      if (input) setMoneyValue(input, autoAmount);
      return;
    }

    const editTarget = event.target.closest('[data-quote-edit]');
    if (editTarget) {
      setQuoteGeneratorActiveTab('quote-tab-extras');
      return;
    }

    const removeBtn = event.target.closest('[data-remove-payment]');
    if (removeBtn) {
      const index = Number(removeBtn.dataset.removePayment);
      const draft = getQuoteGeneratorDraft();
      draft.payments.splice(index, 1);
      commitQuoteGeneratorDraft(draft, { refreshForm: true });
      return;
    }
  });

  const createBtn = document.getElementById('quoteGeneratorCreate');
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      createQuoteGeneratorEntry(buildQuoteGeneratorDraft({ blank: true }));
      renderQuoteGeneratorForm();
      showToast('Nueva cotización creada.', 'success');
    });
  }

  const searchInput = document.getElementById('quoteGeneratorSearchInput');
  const searchBtn = document.getElementById('quoteGeneratorSearchBtn');
  const searchClear = document.getElementById('quoteGeneratorSearchClear');
  if (searchInput && !searchInput.dataset.bound) {
    searchInput.addEventListener('input', () => {
      uiState.quoteGenerator.hubSearchInput = searchInput.value;
    });
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        searchBtn?.click();
      }
    });
    searchInput.dataset.bound = 'true';
  }
  if (searchBtn && !searchBtn.dataset.bound) {
    searchBtn.addEventListener('click', () => {
      uiState.quoteGenerator.hubSearch = uiState.quoteGenerator.hubSearchInput || '';
      persist();
      renderQuoteGeneratorHub();
    });
    searchBtn.dataset.bound = 'true';
  }
  if (searchClear && !searchClear.dataset.bound) {
    searchClear.addEventListener('click', () => {
      uiState.quoteGenerator.hubSearchInput = '';
      uiState.quoteGenerator.hubSearch = '';
      persist();
      renderQuoteGeneratorHub();
    });
    searchClear.dataset.bound = 'true';
  }

  const clientFilter = document.getElementById('quoteGeneratorClientFilter');
  if (clientFilter && !clientFilter.dataset.bound) {
    clientFilter.addEventListener('click', (event) => {
      const clearBtn = event.target.closest('[data-clear-client-filter]');
      if (!clearBtn) return;
      uiState.quoteGenerator.clientFilterId = null;
      persist();
      renderQuoteGeneratorHub();
    });
    clientFilter.dataset.bound = 'true';
  }

  const hubList = document.getElementById('quoteGeneratorList');
  if (hubList && !hubList.dataset.bound) {
    hubList.dataset.bound = 'true';
    hubList.addEventListener('click', (event) => {
      const openBtn = event.target.closest('[data-quote-open]');
      const deleteBtn = event.target.closest('[data-quote-delete]');
      const duplicateBtn = event.target.closest('[data-quote-duplicate]');
      const reassignBtn = event.target.closest('[data-quote-reassign]');
      if (deleteBtn) {
        const id = deleteBtn.dataset.quoteDelete;
        confirmAction({
          title: 'Eliminar cotización',
          message: 'Se eliminará la cotización seleccionada de tu lista.',
          confirmText: 'Eliminar',
          onConfirm: () => {
            deleteQuoteGeneratorEntry(id);
            showToast('Cotización eliminada.', 'success');
          }
        });
        return;
      }
      if (duplicateBtn) {
        duplicateQuoteGeneratorEntry(duplicateBtn.dataset.quoteDuplicate);
        return;
      }
      if (reassignBtn) {
        openQuoteClientModal(reassignBtn.dataset.quoteReassign);
        return;
      }
      if (openBtn) {
        loadQuoteGeneratorEntry(openBtn.dataset.quoteOpen);
        return;
      }
    });

    hubList.addEventListener('change', (event) => {
      const input = event.target.closest('[data-quote-alias]');
      if (!input) return;
      updateQuoteGeneratorAlias(input.dataset.quoteAlias, input.value || '');
    });

    hubList.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      const input = event.target.closest('[data-quote-alias]');
      if (!input) return;
      event.preventDefault();
      input.blur();
    });
  }

  const addPaymentBtn = document.getElementById('addPaymentRow');
  if (addPaymentBtn) {
    addPaymentBtn.addEventListener('click', () => {
      const draft = getQuoteGeneratorDraft();
      draft.payments.push({
        label: `Cuota ${draft.payments.length + 1}`,
        amount: null,
        detail: ''
      });
      commitQuoteGeneratorDraft(draft, { refreshForm: true });
    });
  }

  const saveBtn = document.getElementById('quoteGeneratorSave');
  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      syncQuoteGeneratorEntry({ createIfMissing: true });
      persist();
      renderQuoteGeneratorSavedList();
      renderQuoteNavigation();
      showToast('Cotización actualizada en Mis Cotizaciones.', 'success');
    });
  }

  const loadBtn = document.getElementById('quoteGeneratorLoad');
  if (loadBtn) {
    loadBtn.addEventListener('click', () => {
      const select = document.getElementById('quoteGeneratorSavedList');
      const selectedId = select?.value;
      if (!selectedId) {
        showToast('Selecciona una cotización para cargar.', 'error');
        return;
      }
      const found = generatedQuotes.find(item => item.id === selectedId);
      if (!found) {
        showToast('No se encontró la cotización seleccionada.', 'error');
        return;
      }
      loadQuoteGeneratorEntry(found.id);
      showToast('Cotización cargada.', 'success');
    });
  }

  const deleteBtn = document.getElementById('quoteGeneratorDelete');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      const select = document.getElementById('quoteGeneratorSavedList');
      const selectedId = select?.value;
      if (!selectedId) {
        showToast('Selecciona una cotización para eliminar.', 'error');
        return;
      }
      confirmAction({
        title: 'Eliminar cotización',
        message: 'Se eliminará la cotización guardada seleccionada.',
        confirmText: 'Eliminar',
        onConfirm: () => {
          deleteQuoteGeneratorEntry(selectedId);
          showToast('Cotización eliminada.', 'success');
        }
      });
    });
  }

  const deleteActiveBtn = document.getElementById('quoteGeneratorDeleteActive');
  if (deleteActiveBtn) {
    deleteActiveBtn.addEventListener('click', () => {
      const selectedId = uiState.quoteGenerator?.selectedId;
      if (!selectedId) {
        showToast('No hay una cotización activa para eliminar.', 'error');
        return;
      }
      confirmAction({
        title: 'Eliminar esta cotización',
        message: 'Se eliminará la cotización activa de tu lista de Mis Cotizaciones.',
        confirmText: 'Eliminar',
        onConfirm: () => {
          deleteQuoteGeneratorEntry(selectedId);
          showToast('Cotización eliminada.', 'success');
        }
      });
    });
  }
  const reassignBtn = document.getElementById('quoteGeneratorReassign');
  if (reassignBtn) {
    reassignBtn.addEventListener('click', () => {
      const selectedId = uiState.quoteGenerator?.selectedId;
      if (!selectedId) {
        showToast('No hay una cotización activa para reasignar.', 'error');
        return;
      }
      openQuoteClientModal(selectedId);
    });
  }

  const resetBtn = document.getElementById('quoteGeneratorReset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => resetQuoteGeneratorDraft());
  }

  const select = document.getElementById('quoteGeneratorSavedList');
  if (select) {
    select.addEventListener('change', () => {
      const selectedId = select.value || null;
      if (selectedId) {
        loadQuoteGeneratorEntry(selectedId);
      }
    });
  }

  const exportPdfBtn = document.getElementById('quoteGeneratorExportPdf');
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', () => exportQuoteGenerator('pdf'));
  }
  const exportPngBtn = document.getElementById('quoteGeneratorExportPng');
  if (exportPngBtn) {
    exportPngBtn.addEventListener('click', () => exportQuoteGenerator('png'));
  }

  renderQuoteGeneratorForm();
  renderQuoteGeneratorHub();
  updateQuoteGeneratorView();
}

function bindQuoteClientModal() {
  const modal = document.getElementById('quoteClientModal');
  const closeBtn = document.getElementById('quoteClientClose');
  const cancelBtn = document.getElementById('quoteClientCancel');
  const saveBtn = document.getElementById('quoteClientSave');
  const searchBtn = document.getElementById('quoteClientSearchBtn');
  const searchInput = document.getElementById('quoteClientSearchInput');
  const results = document.getElementById('quoteClientResults');
  const clearBtn = document.getElementById('quoteClientClearSelection');
  if (!modal || modal.dataset.bound) return;
  if (closeBtn) closeBtn.addEventListener('click', closeQuoteClientModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeQuoteClientModal);
  if (saveBtn) saveBtn.addEventListener('click', applyQuoteClientModal);
  if (searchBtn) {
    searchBtn.addEventListener('click', () => performQuoteClientSearch());
  }
  if (searchInput) {
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        performQuoteClientSearch();
      }
    });
  }
  if (results) {
    results.addEventListener('click', (event) => {
      const button = event.target.closest('[data-client-id]');
      if (!button) return;
      setQuoteClientSelection(button.dataset.clientId || null);
    });
  }
  if (clearBtn) {
    clearBtn.addEventListener('click', () => setQuoteClientSelection(null));
  }
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeQuoteClientModal();
  });
  modal.dataset.bound = 'true';
}

function bindSidebarToggle() {
  const toggle = document.getElementById('sidebarToggle');
  const nav = document.getElementById('mainNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('menu-collapsed');
    const isCollapsed = document.body.classList.contains('menu-collapsed');
    toggle.setAttribute('aria-pressed', isCollapsed);
    toggle.setAttribute('aria-expanded', String(!isCollapsed));
  });
}

function updateTopNavVisibility() {
  const utilitiesPanel = document.getElementById('utilitiesMenuPanel');
  const settingsPanel = document.getElementById('settingsPanel');
  const actionPanel = document.getElementById('actionMenuPanel');
  const isAnyMenuOpen = [utilitiesPanel, settingsPanel, actionPanel].some(
    (panel) => panel && panel.classList.contains('open')
  );
  document.body.classList.toggle('menu-overlay-active', isAnyMenuOpen);
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
    updateTopNavVisibility();
  });
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !toggle.contains(e.target)) {
      panel.classList.remove('open');
      updateTopNavVisibility();
    }
  });
}

function bindUtilitiesMenu() {
  const toggle = document.getElementById('utilitiesMenuToggle');
  const panel = document.getElementById('utilitiesMenuPanel');
  const wrapper = document.getElementById('utilitiesMenu');
  const settingsPanel = document.getElementById('settingsPanel');
  const actionPanel = document.getElementById('actionMenuPanel');
  if (!toggle || !panel || !wrapper) return;
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
      settingsPanel?.classList.remove('open');
      actionPanel?.classList.remove('open');
    }
    updateTopNavVisibility();
  });
  panel.addEventListener('click', (e) => {
    const item = e.target.closest('.menu-item');
    if (!item) return;
    panel.classList.remove('open');
    updateTopNavVisibility();
  });
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      panel.classList.remove('open');
      updateTopNavVisibility();
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
    updateTopNavVisibility();
  });
  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) {
      panel.classList.remove('open');
      updateTopNavVisibility();
    }
  });
}

let scrollTopButtonFrame = null;

function updateScrollTopButton() {
  const button = document.getElementById('scrollTopButton');
  if (!button) return;
  const prefs = mergePreferences(uiState.preferences);
  const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
  const shouldShow = prefs.scrollTopEnabled !== false && scrollTop > 320;
  button.classList.toggle('visible', shouldShow);
  button.setAttribute('aria-hidden', String(!shouldShow));
  if (shouldShow) {
    button.removeAttribute('tabindex');
  } else {
    button.setAttribute('tabindex', '-1');
  }
}

function updateUtilitiesVisibility(targetId) {
  const utilities = document.getElementById('utilitiesContainer');
  if (!utilities) return;
  utilities.classList.toggle('is-visible', targetId === 'clientManager');
}

function bindScrollTopButton() {
  const button = document.getElementById('scrollTopButton');
  if (!button || button.dataset.bound) return;
  const handleScroll = () => {
    if (scrollTopButtonFrame) cancelAnimationFrame(scrollTopButtonFrame);
    scrollTopButtonFrame = requestAnimationFrame(() => {
      updateScrollTopButton();
      scrollTopButtonFrame = null;
    });
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });
  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  button.dataset.bound = 'true';
  handleScroll();
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

  const scrollToggle = document.getElementById('scrollTopToggle');
  if (scrollToggle) {
    scrollToggle.checked = prefs.scrollTopEnabled !== false;
  }

  const bulkToggle = document.getElementById('bulkMessageWarningToggle');
  const bulkThreshold = document.getElementById('bulkMessageWarningThreshold');
  const bulkThresholdRow = document.getElementById('bulkMessageWarningThresholdRow');
  if (bulkToggle) {
    bulkToggle.checked = prefs.bulkMessageWarning?.enabled === true;
  }
  if (bulkThreshold) {
    bulkThreshold.value = Number(prefs.bulkMessageWarning?.threshold || 30);
  }
  if (bulkThresholdRow) {
    bulkThresholdRow.classList.toggle('hidden', !(prefs.bulkMessageWarning?.enabled));
  }
  renderBulkMessageAccountSummary();
}

function bindPreferencesPanel() {
  const openBtn = document.getElementById('openPreferences');
  const overlay = document.getElementById('preferencesOverlay');
  const closeBtn = document.getElementById('closePreferences');
  const phoneSelect = document.getElementById('phoneDisplaySelect');
  const scrollToggle = document.getElementById('scrollTopToggle');
  const bulkToggle = document.getElementById('bulkMessageWarningToggle');
  const bulkThreshold = document.getElementById('bulkMessageWarningThreshold');
  const bulkThresholdRow = document.getElementById('bulkMessageWarningThresholdRow');
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

  if (scrollToggle && !scrollToggle.dataset.bound) {
    scrollToggle.addEventListener('change', () => {
      uiState.preferences = mergePreferences(uiState.preferences);
      uiState.preferences.scrollTopEnabled = scrollToggle.checked;
      persist();
      updateScrollTopButton();
    });
    scrollToggle.dataset.bound = 'true';
  }

  if (bulkToggle && !bulkToggle.dataset.bound) {
    bulkToggle.addEventListener('change', () => {
      uiState.preferences = mergePreferences(uiState.preferences);
      uiState.preferences.bulkMessageWarning.enabled = bulkToggle.checked;
      if (bulkThresholdRow) {
        bulkThresholdRow.classList.toggle('hidden', !bulkToggle.checked);
      }
      persist();
    });
    bulkToggle.dataset.bound = 'true';
  }

  if (bulkThreshold && !bulkThreshold.dataset.bound) {
    bulkThreshold.addEventListener('input', () => {
      const value = Math.max(5, Number(bulkThreshold.value) || 30);
      uiState.preferences = mergePreferences(uiState.preferences);
      uiState.preferences.bulkMessageWarning.threshold = value;
      persist();
    });
    bulkThreshold.dataset.bound = 'true';
  }
}

function countTemplateItems() {
  const initialTemplate = getInitialTemplate();
  const initialCount = isInitialTemplate(initialTemplate) ? getInitialTemplateVariations(initialTemplate).length : 0;
  const additionalCount = templates.filter(template => !isInitialTemplate(template)).length;
  return initialCount + additionalCount;
}

function renderStats() {
  const templateCount = document.getElementById('templateCount');
  const clientCount = document.getElementById('clientCount');
  if (templateCount) templateCount.textContent = countTemplateItems();
  if (clientCount) clientCount.textContent = clients.length + managerClients.length;
  renderScheduledSummary();
  renderWelcomeHero();
  renderAdvisorNote();
}

function renderWelcomeHero() {
  const heading = document.getElementById('dashboardHeading');
  const subtitle = document.getElementById('dashboardSubtitle');
  const helper = document.getElementById('advisorHelper');
  const select = document.getElementById('accountSelector');
  const manageBtn = document.getElementById('openAccountManager');
  const activeAccountDisplay = document.getElementById('activeAccountDisplay');
  const accountField = document.querySelector('.account-field-modern');
  const accountCard = document.querySelector('.account-selector-card');
  if (!heading || !subtitle) return;

  const settings = mergeGlobalSettings(uiState.globalSettings);
  const activeAccount = getActiveAccount(settings);
  const advisorRaw = resolveAccountAdvisorName(activeAccount) || settings.advisorName || '';
  const advisor = advisorRaw.trim();
  heading.textContent = advisor ? `Inicio de ${advisor}` : 'Inicio';
  subtitle.textContent = '';
  if (activeAccountDisplay) {
    activeAccountDisplay.textContent = advisor || 'Selecciona una cuenta activa en el selector superior.';
  }
  updateSidebarAdvisor(advisor);
  renderAdvisorSelector();

  const advisorSelect = document.getElementById('advisorSelector');
  if (advisorSelect && !advisorSelect.dataset.bound) {
    advisorSelect.addEventListener('change', () => requestAccountSwitch(advisorSelect.value));
    advisorSelect.dataset.bound = 'true';
  }
  if (helper) helper.textContent = 'Selecciona la cuenta activa para personalizar el panel.';
  if (select && !select.dataset.bound) {
    select.addEventListener('change', () => requestAccountSwitch(select.value));
    select.dataset.bound = 'true';
  }
  const openAccountSelector = (event) => {
    if (!select || select.disabled) return;
    if (event?.target?.tagName?.toLowerCase() === 'select') return;
    select.focus();
    if (typeof select.showPicker === 'function') {
      select.showPicker();
    } else {
      select.click();
    }
  };
  if (accountField && !accountField.dataset.bound) {
    accountField.addEventListener('click', openAccountSelector);
    accountField.dataset.bound = 'true';
  }
  if (accountCard && !accountCard.dataset.bound) {
    accountCard.addEventListener('click', (event) => {
      if (event.target?.closest('.account-field-modern')) return;
      openAccountSelector(event);
    });
    accountCard.dataset.bound = 'true';
  }
  if (manageBtn && !manageBtn.dataset.bound) {
    manageBtn.addEventListener('click', () => toggleAccountManager(true));
    manageBtn.dataset.bound = 'true';
  }
  bindQuickLinks();
}

function updateSidebarAdvisor(advisor) {
  const sidebarLabel = document.getElementById('sidebarAdvisor');
  if (sidebarLabel) sidebarLabel.textContent = advisor || 'Chevrolet Argentina';
}

function renderAdvisorSelector() {
  const settings = mergeGlobalSettings(uiState.globalSettings);
  const accounts = settings.accounts || [];
  const selects = [
    document.getElementById('advisorSelector'),
    document.getElementById('accountSelector')
  ].filter(Boolean);
  selects.forEach(select => {
    select.innerHTML = accounts.map(account => `<option value="${account.id}">${account.name}</option>`).join('');
    select.value = settings.activeAccountId || accounts[0]?.id || '';
    select.disabled = accounts.length === 0;
  });
}

function renderQuickOverview() {
  const steps = [
    { icon: '🎯', title: 'Selecciona cuenta', text: 'Confirma la cuenta activa y sincroniza el panel.', target: 'dashboard' },
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

function getSelectedTemplate() {
  return templates.find(template => template.id === selectedTemplateId) || templates[0];
}

function resolveTemplateSearchMatch(template, term = '') {
  if (!template) return false;
  const label = (template.title || '').toLowerCase();
  if (label.includes(term)) return true;
  if (isInitialTemplate(template)) {
    return getInitialTemplateVariations(template).some(variation => {
      const titleMatch = (variation.title || '').toLowerCase().includes(term);
      const bodyMatch = (variation.body || '').toLowerCase().includes(term);
      return titleMatch || bodyMatch;
    });
  }
  return (template.body || '').toLowerCase().includes(term);
}

function renderInitialVariationTabs(template) {
  const wrapper = document.getElementById('initialVariations');
  const list = document.getElementById('variationTabs');
  if (!wrapper || !list) return;
  if (!template || !isInitialTemplate(template)) {
    wrapper.classList.add('hidden');
    list.innerHTML = '';
    return;
  }
  const variations = getInitialTemplateVariations(template);
  wrapper.classList.remove('hidden');
  if (!variations.length) {
    list.innerHTML = '<p class="muted tiny">No hay variaciones disponibles.</p>';
    return;
  }
  const selectedId = getSelectedInitialVariationId(template);
  list.innerHTML = variations.map((variation, index) => {
    const isActive = variation.id === selectedId;
    const disableDelete = variations.length <= 1;
    return `
      <div class="variation-tab ${isActive ? 'active' : ''}" data-id="${variation.id}">
        <button class="variation-tab-btn" type="button" data-variation-id="${variation.id}">
          <span class="variation-label">${variation.title || `Variación ${index + 1}`}</span>
        </button>
        <button class="variation-tab-delete" type="button" data-variation-delete="${variation.id}" ${disableDelete ? 'disabled' : ''} title="Eliminar variación">
          <i class='bx bx-x'></i>
        </button>
      </div>
    `;
  }).join('');

  list.querySelectorAll('[data-variation-id]').forEach(button => {
    button.addEventListener('click', () => {
      setSelectedInitialVariationId(template, button.dataset.variationId);
      loadTemplate(templates.findIndex(tpl => tpl.id === template.id));
    });
  });

  list.querySelectorAll('[data-variation-delete]').forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const targetId = button.dataset.variationDelete;
      confirmAction({
        title: 'Eliminar variación',
        message: 'Se eliminará la variación seleccionada.',
        confirmText: 'Eliminar',
        onConfirm: () => deleteInitialVariation(template, targetId)
      });
    });
  });
}

function renderTemplates({ maintainEditor = false } = {}) {
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
  const initialTemplate = getInitialTemplate();
  const additionalTemplates = templates.filter(template => !isInitialTemplate(template));
  const filteredAdditional = additionalTemplates.filter(template => resolveTemplateSearchMatch(template, search));
  const showInitial = initialTemplate && resolveTemplateSearchMatch(initialTemplate, search);

  if (!filteredAdditional.length && !showInitial) {
    list.innerHTML = '<p class="muted">Sin coincidencias.</p>';
    return;
  }

  const initialVariation = getSelectedInitialVariation(initialTemplate);
  const initialBody = resolveTemplateBody(initialTemplate);
  const initialPreview = `${initialBody.slice(0, 120)}${initialBody.length > 120 ? '…' : ''}`;
  const initialVariables = extractVariables(initialBody).length || 0;
  const initialVariationsCount = getInitialTemplateVariations(initialTemplate).length;

  const initialSection = showInitial ? `
    <div class="template-section">
      <div class="template-section-head">
        <div>
          <p class="eyebrow">Plantilla Inicial</p>
          <h4>${initialTemplate?.title || 'Mensaje de inicio'}</h4>
        </div>
        <span class="pill">Variaciones: ${initialVariationsCount}</span>
      </div>
      <div class="template-item ${initialTemplate?.id === selectedTemplateId ? 'active' : ''} template-item-initial" data-id="${initialTemplate?.id}">
        <div class="controls">
          <h4>${initialTemplate?.title || 'Mensaje de inicio'}</h4>
          <div class="small-actions">
            <button class="mini-btn" data-action="copy" data-id="${initialTemplate?.id}" title="Copiar"><i class='bx bx-copy'></i></button>
          </div>
        </div>
        <p class="muted tiny">Variación activa: ${initialVariation?.title || 'Variación'}</p>
        <p>${initialPreview}</p>
        <div class="pill-row">
          <span class="pill">${initialVariables} variables</span>
          <span class="pill subtle">Se alterna al copiar mensaje</span>
        </div>
      </div>
    </div>
  ` : '';

  const additionalSection = `
    <div class="template-section">
      <div class="template-section-head">
        <div>
          <p class="eyebrow">Plantillas Adicionales</p>
          <h4>Mensajes personalizados</h4>
        </div>
        <span class="pill">Total: ${filteredAdditional.length}</span>
      </div>
      <div class="template-section-body">
        ${filteredAdditional.length ? filteredAdditional.map((tpl, index) => {
          const body = resolveTemplateBody(tpl);
          const preview = `${body.slice(0, 120)}${body.length > 120 ? '…' : ''}`;
          const canMoveUp = index > 0;
          const canMoveDown = index < filteredAdditional.length - 1;
          return `
            <div class="template-item ${tpl.id === selectedTemplateId ? 'active' : ''}" data-id="${tpl.id}">
              <div class="controls">
                <h4>${tpl.title}</h4>
                <div class="small-actions">
                  <button class="mini-btn" data-action="move-up" data-id="${tpl.id}" title="Subir" ${canMoveUp ? '' : 'disabled'}><i class='bx bx-up-arrow-alt'></i></button>
                  <button class="mini-btn" data-action="move-down" data-id="${tpl.id}" title="Bajar" ${canMoveDown ? '' : 'disabled'}><i class='bx bx-down-arrow-alt'></i></button>
                  <button class="mini-btn" data-action="copy" data-id="${tpl.id}" title="Copiar"><i class='bx bx-copy'></i></button>
                  <button class="mini-btn" data-action="delete" data-id="${tpl.id}" title="Eliminar"><i class='bx bx-trash'></i></button>
                </div>
              </div>
              <p>${preview}</p>
              <span class="pill">${extractVariables(body).length || 0} variables</span>
            </div>
          `;
        }).join('') : '<p class="muted">Sin plantillas adicionales.</p>'}
      </div>
    </div>
  `;

  list.innerHTML = `${initialSection}${additionalSection}`;

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
    if (btn.dataset.action === 'delete' && !btn.disabled) {
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
    if (btn.dataset.action === 'move-up' && !btn.disabled) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        moveTemplate(id, -1);
      });
    }
    if (btn.dataset.action === 'move-down' && !btn.disabled) {
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

  const currentTemplate = getSelectedTemplate();
  selectedTemplateId = currentTemplate.id;
  selectedTemplateIndex = templates.findIndex(t => t.id === selectedTemplateId);
  uiState.selectedTemplateIndex = selectedTemplateIndex;
  if (!maintainEditor) {
    loadTemplate(selectedTemplateIndex);
  }
  renderStats();
}

function escapeHtml(value = '') {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function highlightTemplateVariables(text = '') {
  const escaped = escapeHtml(text).replace(/\r\n/g, '\n');
  const withBreaks = escaped.replace(/\n/g, '<br>');
  return withBreaks.replace(/{{(.*?)}}/g, '<span class="dynamic-token">{{$1}}</span>');
}

function getTemplateBodyValue() {
  const editor = document.getElementById('templateBody');
  if (!editor) return '';
  return editor.innerText.replace(/\r\n/g, '\n');
}

let isTemplateBodyHighlighting = false;
let templateBodySelection = null;

function captureSelection(container) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  const range = selection.getRangeAt(0);
  if (!container.contains(range.startContainer)) return null;
  const preRange = range.cloneRange();
  preRange.selectNodeContents(container);
  preRange.setEnd(range.startContainer, range.startOffset);
  const start = preRange.toString().length;
  return { start, end: start + range.toString().length };
}

function restoreSelection(container, selection) {
  if (!selection) return;
  const range = document.createRange();
  let charIndex = 0;
  let nodeStack = [container];
  let node;
  let foundStart = false;
  let stop = false;
  while (!stop && (node = nodeStack.pop())) {
    if (node.nodeType === 3) {
      const nextIndex = charIndex + node.textContent.length;
      if (!foundStart && selection.start >= charIndex && selection.start <= nextIndex) {
        range.setStart(node, selection.start - charIndex);
        foundStart = true;
      }
      if (foundStart && selection.end >= charIndex && selection.end <= nextIndex) {
        range.setEnd(node, selection.end - charIndex);
        stop = true;
      }
      charIndex = nextIndex;
    } else {
      let i = node.childNodes.length;
      while (i--) nodeStack.push(node.childNodes[i]);
    }
  }
  const sel = window.getSelection();
  if (!sel) return;
  sel.removeAllRanges();
  sel.addRange(range);
}

function updateTemplateBodyHighlight({ preserveSelection = false } = {}) {
  const editor = document.getElementById('templateBody');
  if (!editor || isTemplateBodyHighlighting) return;
  const selection = preserveSelection ? captureSelection(editor) : null;
  const text = getTemplateBodyValue();
  isTemplateBodyHighlighting = true;
  editor.innerHTML = highlightTemplateVariables(text);
  if (!editor.innerHTML) editor.innerHTML = '';
  if (preserveSelection) restoreSelection(editor, selection);
  if (preserveSelection) templateBodySelection = selection;
  isTemplateBodyHighlighting = false;
}

function rememberTemplateSelection() {
  const editor = document.getElementById('templateBody');
  if (!editor) return;
  const selection = captureSelection(editor);
  if (selection) templateBodySelection = selection;
}

function setTemplateBodyValue(value = '') {
  const editor = document.getElementById('templateBody');
  if (!editor) return;
  editor.textContent = value;
  updateTemplateBodyHighlight();
}

function loadTemplate(idx) {
  const tpl = templates[idx] || templates[0] || { title: '', body: '' };
  document.getElementById('templateTitle').value = tpl?.title || '';
  const body = resolveTemplateBody(tpl);
  setTemplateBodyValue(body);
  renderVariableInputs(extractVariables(body));
  renderInitialVariationTabs(tpl);
  uiState.selectedTemplateIndex = idx;
  persist();
  setTimeout(updatePreview, 0);
}

function getTemplatePreviewPool() {
  if (managerClients?.length) return managerClients;
  if (clients?.length) return clients;
  return [];
}

function resolveTemplatePreviewClient({ randomize = false } = {}) {
  const pool = getTemplatePreviewPool();
  if (!pool.length) return null;
  const storedId = uiState.templatePreview?.clientId;
  let selected = null;
  if (!randomize && storedId) {
    selected = pool.find(client => client.id === storedId) || null;
  }
  if (!selected) {
    selected = pool[Math.floor(Math.random() * pool.length)] || null;
    uiState.templatePreview = { ...(uiState.templatePreview || {}), clientId: selected?.id || null };
    persist();
  }
  return selected;
}

function updateAutoVariableHint(client) {
  const hint = document.getElementById('autoVariableHint');
  const btn = document.getElementById('refreshAutoVariables');
  const pool = getTemplatePreviewPool();
  if (btn) btn.disabled = !pool.length;
  if (!hint) return;
  if (!pool.length) {
    hint.textContent = 'Importa clientes para autocompletar variables automáticamente.';
    return;
  }
  const name = client?.name || 'Cliente sin nombre';
  const phoneValue = formatPhoneDisplay(client?.phone || '') || client?.phone || '';
  hint.textContent = `Auto completado con: ${name}${phoneValue ? ` (${phoneValue})` : ''}. Puedes personalizar cualquier campo y volver a automático.`;
}

function setVariableInputState(input, autoValue) {
  const field = input.closest('.inline-variable');
  const status = field?.querySelector('[data-var-status]');
  const autoBtn = field?.querySelector('[data-auto-var]');
  const value = input.value.trim();
  const isManual = input.dataset.manual === 'true';
  const hasAuto = autoValue !== undefined && autoValue !== '';
  let label = 'Vacío';
  let state = 'empty';
  if (isManual && value) {
    label = 'Manual';
    state = 'manual';
  } else if (hasAuto) {
    label = 'Auto';
    state = value ? 'auto' : 'empty';
  }
  if (status) {
    status.textContent = label;
    status.dataset.state = state;
  }
  if (autoBtn) {
    autoBtn.disabled = !hasAuto;
  }
}

function refreshAutoVariableInputs({ randomize = false } = {}) {
  const client = resolveTemplatePreviewClient({ randomize });
  const autoValues = buildDynamicVariableMap(client || {});
  const inputs = document.querySelectorAll('#variableInputs input');
  inputs.forEach(inp => {
    const key = inp.dataset.var;
    const stored = uiState.variableValues?.[key];
    inp.dataset.autoValue = autoValues[key] || '';
    if (stored !== undefined && stored !== '') {
      inp.value = stored;
      inp.dataset.manual = 'true';
      setVariableInputState(inp, inp.dataset.autoValue);
      return;
    }
    if (inp.dataset.manual === 'true') return;
    inp.value = autoValues[key] || '';
    inp.dataset.manual = 'false';
    setVariableInputState(inp, inp.dataset.autoValue);
  });
  updateAutoVariableHint(client);
  updatePreview();
}

function renderVariableInputs(vars = []) {
  const chips = document.getElementById('variableChips');
  const inputs = document.getElementById('variableInputs');
  if (!vars.length) {
    chips.innerHTML = `<span class="chip muted">Sin variables en esta plantilla</span>`;
    inputs.innerHTML = `<p class="muted tiny">Agrega {{variable}} en el texto para habilitar reemplazos.</p>`;
    updateAutoVariableHint(resolveTemplatePreviewClient());
    setTimeout(updatePreview, 0);
    return;
  }
  chips.innerHTML = vars.map(v => `<span class="chip compact" data-var="${v}">{{${v}}}</span>`).join('');
  chips.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => insertVariable(chip.dataset.var)));

  const autoValues = buildDynamicVariableMap(resolveTemplatePreviewClient() || {});
  inputs.innerHTML = vars.map(v => `
    <div class="field inline-variable">
      <div class="variable-label-row">
        <label>${resolveDynamicVariableLabel(v)}</label>
        <div class="variable-controls">
          <span class="variable-status" data-var-status></span>
          <button class="ghost-btn mini variable-auto-btn" data-auto-var="${v}" type="button">Auto</button>
        </div>
      </div>
      <input data-var="${v}" placeholder="${v}">
    </div>`).join('');

  inputs.querySelectorAll('input').forEach(inp => {
    const stored = uiState.variableValues?.[inp.dataset.var];
    inp.dataset.autoValue = autoValues[inp.dataset.var] || '';
    if (stored !== undefined && stored !== '') {
      inp.value = stored;
      inp.dataset.manual = 'true';
    } else {
      inp.value = autoValues[inp.dataset.var] || '';
      inp.dataset.manual = 'false';
    }
    setVariableInputState(inp, inp.dataset.autoValue);
    inp.addEventListener('input', () => {
      const value = inp.value;
      if (value) {
        uiState.variableValues[inp.dataset.var] = value;
        inp.dataset.manual = 'true';
      } else {
        delete uiState.variableValues[inp.dataset.var];
        inp.dataset.manual = 'false';
      }
      setVariableInputState(inp, inp.dataset.autoValue);
      persist();
      updatePreview();
    });
  });
  inputs.querySelectorAll('.variable-auto-btn').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.dataset.autoVar;
      const input = inputs.querySelector(`input[data-var="${key}"]`);
      if (!input) return;
      const autoValue = input.dataset.autoValue || '';
      if (!autoValue) return;
      input.value = autoValue;
      input.dataset.manual = 'false';
      delete uiState.variableValues[key];
      setVariableInputState(input, autoValue);
      persist();
      updatePreview();
    });
  });
  updateAutoVariableHint(resolveTemplatePreviewClient());
  
  // Trigger initial preview update
  setTimeout(updatePreview, 0);
}

function insertVariable(variable) {
  const editor = document.getElementById('templateBody');
  if (!editor) return;
  const insertion = `{{${variable}}}`;
  editor.focus();
  const updated = `${getTemplateBodyValue()}${insertion}`;
  editor.textContent = updated;
  const currentTemplate = getSelectedTemplate();
  if (currentTemplate) {
    setTemplateBody(currentTemplate, updated);
  }
  renderVariableInputs(extractVariables(updated));
  updateTemplateBodyHighlight();
  const range = document.createRange();
  range.selectNodeContents(editor);
  range.collapse(false);
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
  rememberTemplateSelection();
  updatePreview();
}

function nextVariationTitle(variations = []) {
  const usedIndexes = variations.map(variation => {
    const match = (variation.title || '').match(/Variación\s*(\d+)/i);
    return match ? Number(match[1]) : null;
  }).filter(value => Number.isFinite(value));
  const nextIndex = usedIndexes.length ? Math.max(...usedIndexes) + 1 : variations.length + 1;
  return `Variación ${nextIndex}`;
}

function reindexInitialVariationTitles(variations = []) {
  variations.forEach((variation, index) => {
    if (!variation) return;
    const currentTitle = (variation.title || '').trim();
    const isDefaultLabel = !currentTitle || /^Variación\s*\d+$/i.test(currentTitle);
    if (isDefaultLabel) {
      variation.title = `Variación ${index + 1}`;
    }
  });
}

function addInitialVariation(template) {
  if (!template || !isInitialTemplate(template)) return;
  const variations = getInitialTemplateVariations(template);
  const title = nextVariationTitle(variations);
  const newVariation = normalizeTemplateVariation({ title, body: '' }, variations.length, template.id);
  variations.push(newVariation);
  setSelectedInitialVariationId(template, newVariation.id);
  persist();
  loadTemplate(templates.findIndex(item => item.id === template.id));
  renderTemplates();
  showToast('Variación agregada', 'success');
}

function deleteInitialVariation(template, variationId) {
  if (!template || !isInitialTemplate(template)) return;
  const variations = getInitialTemplateVariations(template);
  if (variations.length <= 1) return;
  const targetIndex = variations.findIndex(variation => variation.id === variationId);
  if (targetIndex < 0) return;
  variations.splice(targetIndex, 1);
  reindexInitialVariationTitles(variations);
  if (template.rotationIndex >= variations.length) {
    template.rotationIndex = 0;
  }
  setSelectedInitialVariationId(template, variations[0]?.id || null);
  persist();
  loadTemplate(templates.findIndex(item => item.id === template.id));
  renderTemplates();
  showToast('Variación eliminada', 'success');
}

function deleteTemplate(id) {
  const idx = templates.findIndex(t => t.id === id);
  if (idx < 0) return;
  if (isInitialTemplate(templates[idx])) return;
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
  if (isInitialTemplate(templates[idx])) return;
  const newIndex = idx + direction;
  const initialIndex = templates.findIndex(t => isInitialTemplate(t));
  const minIndex = initialIndex === 0 ? 1 : 0;
  if (newIndex < minIndex || newIndex >= templates.length) return;
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
  const body = getTemplateBodyValue();
  const values = getTemplateValues();
  const replaced = buildTemplateText(body, values);
  const preview = document.getElementById('templatePreview');
  if (preview) {
    preview.innerHTML = highlightTemplateVariables(replaced);
  }
}

async function copyTemplateContent(template = templates[selectedTemplateIndex], { showStatus = true, variationId } = {}) {
  if (!template) return;
  const values = getTemplateValues();
  const body = resolveTemplateBody(template, { variationId });
  const text = buildTemplateText(body, values);
  await copyText(text, 'Plantilla copiada');
  if (showStatus) {
    const status = document.getElementById('copyStatus');
    if (status) {
      status.textContent = 'Plantilla copiada con variables aplicadas';
      setTimeout(() => status.textContent = '', 2000);
    }
  }
}

function renderDynamicDataMenu(search = '') {
  const list = document.getElementById('dynamicDataList');
  if (!list) return;
  const groups = filterDynamicVariableCatalog(search);
  if (!groups.length) {
    list.innerHTML = '<p class="muted tiny">No se encontraron variables con ese criterio.</p>';
    return;
  }
  list.innerHTML = groups.map(group => `
    <div class="dynamic-data-group">
      <div class="dynamic-data-group-title">${group.group}</div>
      <div class="dynamic-data-items">
        ${group.items.map(item => `
          <button class="dynamic-data-item" type="button" data-var="${item.key}">
            <span>${item.label}</span>
            <span class="pill">{{${item.key}}}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function toggleDynamicDataMenu(show) {
  const panel = document.getElementById('dynamicDataPanel');
  if (!panel) return;
  panel.classList.toggle('hidden', !show);
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
    const currentTemplate = getSelectedTemplate();
    if (currentTemplate) {
      currentTemplate.title = e.target.value;
      persist();
      renderTemplates();
    }
  });

  const templateBody = document.getElementById('templateBody');
  if (templateBody) {
    templateBody.addEventListener('input', () => {
      if (isTemplateBodyHighlighting) return;
      rememberTemplateSelection();
      const bodyValue = getTemplateBodyValue();
      const currentTemplate = getSelectedTemplate();
      if (currentTemplate) {
        setTemplateBody(currentTemplate, bodyValue);
        persist();
        renderVariableInputs(extractVariables(bodyValue));
        renderTemplates({ maintainEditor: true });
      }
      updateTemplateBodyHighlight({ preserveSelection: true });
      updatePreview();
    });
    templateBody.addEventListener('keyup', rememberTemplateSelection);
    templateBody.addEventListener('mouseup', rememberTemplateSelection);
    templateBody.addEventListener('focus', rememberTemplateSelection);
    templateBody.addEventListener('blur', rememberTemplateSelection);
  }

  document.getElementById('copyTemplate').addEventListener('click', () => copyTemplateContent());
  const addVariationBtn = document.getElementById('addVariation');
  if (addVariationBtn && !addVariationBtn.dataset.bound) {
    addVariationBtn.addEventListener('click', () => {
      const current = getSelectedTemplate();
      if (!isInitialTemplate(current)) return;
      addInitialVariation(current);
    });
    addVariationBtn.dataset.bound = 'true';
  }
  const refreshAutoBtn = document.getElementById('refreshAutoVariables');
  if (refreshAutoBtn && !refreshAutoBtn.dataset.bound) {
    refreshAutoBtn.addEventListener('click', () => {
      refreshAutoVariableInputs({ randomize: true });
    });
    refreshAutoBtn.dataset.bound = 'true';
  }

  const openDynamicData = document.getElementById('openDynamicData');
  const closeDynamicData = document.getElementById('closeDynamicData');
  const dynamicSearch = document.getElementById('dynamicDataSearch');
  const dynamicList = document.getElementById('dynamicDataList');
  if (dynamicSearch) {
    dynamicSearch.addEventListener('input', () => renderDynamicDataMenu(dynamicSearch.value));
  }
  if (openDynamicData) {
    openDynamicData.addEventListener('click', (event) => {
      event.stopPropagation();
      rememberTemplateSelection();
      renderDynamicDataMenu(dynamicSearch?.value || '');
      toggleDynamicDataMenu(true);
      dynamicSearch?.focus();
    });
  }
  if (closeDynamicData) {
    closeDynamicData.addEventListener('click', () => toggleDynamicDataMenu(false));
  }
  if (dynamicList) {
    dynamicList.addEventListener('click', (event) => {
      const item = event.target.closest('[data-var]');
      if (!item) return;
      insertVariable(item.dataset.var);
      toggleDynamicDataMenu(false);
    });
  }
  document.addEventListener('click', (event) => {
    const panel = document.getElementById('dynamicDataPanel');
    if (!panel || panel.classList.contains('hidden')) return;
    if (panel.contains(event.target) || openDynamicData?.contains(event.target)) return;
    toggleDynamicDataMenu(false);
  });

  document.getElementById('addTemplate').addEventListener('click', () => {
    const id = createTemplateId('tpl');
    templates.push({ id, title: 'Nueva plantilla', body: 'Mensaje personalizado con {{cliente}}' });
    selectedTemplateIndex = templates.length - 1;
    selectedTemplateId = id;
    uiState.selectedTemplateIndex = selectedTemplateIndex;
    persist();
    renderTemplates();
  });

  if (!document.body.dataset.templateSelectionBound) {
    document.addEventListener('selectionchange', () => {
      const editor = document.getElementById('templateBody');
      if (!editor) return;
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;
      if (!editor.contains(selection.anchorNode)) return;
      templateBodySelection = captureSelection(editor);
    });
    document.body.dataset.templateSelectionBound = 'true';
  }
}

function renderPriceTabs() {
  const label = document.getElementById('vehicleUpdateTag');
  const subtitle = document.getElementById('priceTabSubtitle');
  const tabSelect = document.getElementById('priceTabSelect');
  const active = getActivePriceTab();
  if (label) label.textContent = `Última actualización: ${active?.label || 'Sin definir'}`;
  if (subtitle) subtitle.textContent = getActivePriceStatus();
  if (!tabSelect) return;
  if (!priceTabs.length) {
    tabSelect.innerHTML = '<option value="">Sin archivos</option>';
    tabSelect.disabled = true;
    updatePriceContextTag();
    return;
  }
  tabSelect.disabled = false;
  const options = priceTabs.map(tab => `<option value="${tab.id}">${tab.label}</option>`).join('');
  const showCustom = activePriceSource === 'local' && !!priceDrafts[active?.id]?.vehicles?.length;
  const customOption = showCustom ? '<option value="custom">Configuración personalizada</option>' : '';
  tabSelect.innerHTML = `${customOption}${options}` || '<option value="">Sin archivos</option>';
  if (showCustom) {
    tabSelect.value = 'custom';
  } else if (active?.id) {
    tabSelect.value = active.id;
  }
  tabSelect.dataset.current = tabSelect.value;
  updatePriceContextTag();
}

function getPriceFilePath(tab = getActivePriceTab()) {
  if (tab?.folder) return `${tab.folder}/${BRAND_FILE_PREFIX}[marca].json`;
  return tab?.pricePath || '';
}

function getActivePriceMonthLabel(tab = getActivePriceTab()) {
  if (!tab) return 'Mes sin definir';
  const month = tab.month || tab.label || 'Mes sin definir';
  const year = tab.year ? ` ${tab.year}` : '';
  return `${month}${year}`.trim();
}

function getActivePriceStatus() {
  const monthLabel = getActivePriceMonthLabel();
  if (activePriceSource === 'servidor') {
    return `Marcas de precios detectadas en servidor para el mes de: ${monthLabel}`;
  }
  if (activePriceSource === 'archivo') return `Precios cargados manualmente para el mes de: ${monthLabel}`;
  if (activePriceSource === 'local') return `Precios editados localmente para el mes de: ${monthLabel}`;
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

function renderPriceBrandSummary(list = []) {
  const stack = document.getElementById('priceAlerts');
  if (!stack) return;
  if (!list.length) {
    renderPriceAlerts('No se detectaron marcas en el archivo del mes.', 'warning');
    return;
  }
  stack.innerHTML = `
    <div class="brand-summary">
      ${list.map(item => `<span class="brand-pill">${item}</span>`).join('')}
    </div>
  `;
}

function updatePriceContextTag() {
  const tag = document.getElementById('priceContextTag');
  if (!tag) return;
  const active = getActivePriceTab();
  if (active) {
    const month = active.month || active.label || 'Mes sin definir';
    const year = active.year ? ` ${active.year}` : '';
    tag.textContent = `Utilizando precios de: ${month}${year}`;
    return;
  }
  tag.textContent = 'Utilizando precios locales';
}

function applyImportedVehicles(data, source = 'archivo', { silentToast = false } = {}) {
  const parsedVehicles = cloneVehicles(data?.vehicles || data || []);
  if (!parsedVehicles.length) {
    showToast('El archivo de precios no tiene modelos válidos.', 'error');
    return false;
  }
  vehicles = parsedVehicles;
  if (data?.brandSettings) {
    brandSettings = normalizeBrandSettings(data.brandSettings, vehicles);
  } else {
    brandSettings = normalizeBrandSettings(brandSettings, vehicles);
  }
  activePriceSource = source;
  if (source === 'archivo' || source === 'local') {
    syncActiveVehiclesToDraft({ force: true });
  }
  persist();
  renderVehicleTable();
  renderPlanForm();
  renderClients();
  renderClientManager();
  if (!silentToast) {
    const label = source === 'servidor' ? 'el servidor' : source === 'local' ? 'el editor' : 'un archivo';
    showToast(`Precios aplicados desde ${label}.`, 'success');
  }
  updatePriceContextTag();
  return true;
}

function extractVehiclesFromPayload(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.vehicles)) return payload.vehicles;
  return [];
}

function mergePricePayloads(payloads = []) {
  const vehicles = payloads.flatMap(payload => extractVehiclesFromPayload(payload));
  const base = payloads.find(payload => payload && !Array.isArray(payload)) || {};
  const updatedAt = payloads.reduce((latest, payload) => {
    const value = payload?.updatedAt;
    if (!value) return latest;
    if (!latest) return value;
    return new Date(value) > new Date(latest) ? value : latest;
  }, base.updatedAt || '');
  return {
    month: base.month || '',
    year: base.year || '',
    tabId: base.tabId || '',
    updatedAt,
    vehicles,
    brandSettings: base.brandSettings || []
  };
}

function markActiveDraftDirty() {
  activePriceSource = 'local';
  syncActiveVehiclesToDraft({ force: true });
  renderPriceTabs();
}

async function loadPricesFromServer({ silent = false, forceServer = false } = {}) {
  const active = getActivePriceTab();
  if (!active) {
    if (!silent) renderPriceAlerts('No se encontraron listas disponibles.', 'warning');
    syncVehiclesFromDraftOrFallback();
    return null;
  }
  const draft = priceDrafts[active.id];
  if (!forceServer && draft?.vehicles?.length) {
    vehicles = cloneVehicles(draft.vehicles);
    activePriceSource = 'local';
    renderVehicleTable();
    renderPlanForm();
    renderClients();
    renderClientManager();
    if (!silent) {
      renderPriceAlerts('Precios cargados desde el borrador local.', 'success');
      showToast('Se aplicó el borrador local del mes.', 'success');
      updatePriceImportStatuses({ server: 'Borrador local aplicado' });
    }
    updatePriceContextTag();
    renderPriceTabs();
    return draft;
  }
  const paths = await resolvePriceFilePaths(active);
  if (!paths.length) {
    if (!silent) renderPriceAlerts('No hay archivos de precios para este mes.', 'warning');
    return null;
  }
  try {
    const payloads = await Promise.all(paths.map(async path => {
      const response = await fetch(path, { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    }));
    const data = mergePricePayloads(payloads);
    applyImportedVehicles(data, 'servidor', { silentToast: silent });
    renderPriceAlerts(`Precios cargados desde ${paths.join(', ')}`, 'success');
    updatePriceImportStatuses({ server: `Cargado desde ${paths.join(', ')}` });
    renderPriceTabs();
    return data;
  } catch (err) {
    activePriceSource = activePriceSource || 'predeterminado';
    syncVehiclesFromDraftOrFallback(active);
    if (!silent) {
      renderPriceAlerts('No hay archivos de precios para este mes, se usan valores locales.', 'warning');
      showToast('No se encontraron archivos de precios en la carpeta del mes.', 'warning');
      updatePriceImportStatuses({ server: 'No se encontraron archivos de precios' });
    }
    renderPriceTabs();
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
    vehicles: cloneVehicles(vehicles),
    brandSettings: ensureBrandSettings()
  };
}

function downloadJsonFile(payload, filename) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function downloadPriceFile() {
  const payload = buildPricePayload();
  const grouped = payload.vehicles.reduce((acc, vehicle) => {
    const brand = normalizeBrand(vehicle.brand);
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(vehicle);
    return acc;
  }, {});
  Object.entries(grouped).forEach(([brand, vehiclesList]) => {
    const filePayload = { ...payload, vehicles: vehiclesList };
    downloadJsonFile(filePayload, buildBrandPriceFileName(brand));
  });
  showToast('Archivos de precios por marca descargados', 'success');
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

function normalizePriceFileName(name = '') {
  return decodeURIComponent(String(name)).replace(/\/$/, '');
}

function parseDirectoryListing(html = '') {
  const matches = [...html.matchAll(/href="([^"]+)"/g)].map(match => match[1]);
  return matches
    .map(item => item.split('?')[0])
    .filter(item => item && item !== '../' && item !== './');
}

let onlineFilesCache = null;
const onlineFilesState = { files: [], search: '' };

function mapOnlineFilesFromManifest(manifest = {}) {
  if (Array.isArray(manifest.files)) {
    return manifest.files.map(file => ({
      folder: ONLINE_FILES_ROOT,
      name: normalizePriceFileName(file),
      path: `${ONLINE_FILES_ROOT}/${file}`
    }));
  }
  if (Array.isArray(manifest.entries)) {
    return manifest.entries.map(entry => ({
      folder: entry.folder || ONLINE_FILES_ROOT,
      name: normalizePriceFileName(entry.name || entry.path || ''),
      path: entry.path || `${ONLINE_FILES_ROOT}/${entry.name || ''}`
    })).filter(item => item.name && item.path);
  }
  return [];
}

async function loadPriceTabFiles(tab) {
  if (!tab?.folder) return [];
  try {
    const response = await fetch(`${tab.folder}/`, { cache: 'no-store' });
    if (!response.ok) return [];
    const html = await response.text();
    const entries = parseDirectoryListing(html);
    const files = entries
      .filter(entry => !entry.endsWith('/'))
      .map(entry => ({
        name: normalizePriceFileName(entry),
        path: `${tab.folder}/${entry}`
      }));
    tab.files = files;
    tab.primaryFile = files.find(file => /\.(png|jpe?g|pdf)$/i.test(file.name))?.path || '';
    return files;
  } catch (err) {
    return [];
  }
}

function openPriceFilesModal() {
  const modal = document.getElementById('priceFilesModal');
  const list = document.getElementById('priceFilesList');
  const close = document.getElementById('priceFilesClose');
  const active = getActivePriceTab();
  if (!modal || !list) return;
  if (!active) {
    list.innerHTML = '<p class="muted">No hay carpeta disponible para mostrar.</p>';
    if (close) close.onclick = () => toggleModal(modal, false);
    toggleModal(modal, true);
    return;
  }
  const renderFiles = (files = []) => {
    if (!files.length) {
      list.innerHTML = '<p class="muted">No se pudieron detectar archivos en esta carpeta.</p>';
      return;
    }
    list.innerHTML = files.map(file => `
        <a class="file-link" href="${file.path}" target="_blank" rel="noopener noreferrer">
          <i class='bx bx-file'></i> ${file.name}
        </a>
      `).join('');
  };
  if (active?.files?.length) {
    renderFiles(active.files);
  } else {
    loadPriceTabFiles(active).then(renderFiles);
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
      showToast('Exporta los archivos en la carpeta del mes como precios_[marca].json', 'info');
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
    reloadBtn.addEventListener('click', () => loadPricesFromServer({ silent: false, forceServer: true }));
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
  const tabSelect = document.getElementById('priceTabSelect');
  const editorBtn = document.getElementById('openVehicleEditor');
  if (tabSelect && !tabSelect.dataset.bound) {
    tabSelect.addEventListener('change', () => {
      const nextValue = tabSelect.value;
      const previousValue = tabSelect.dataset.current || (activePriceSource === 'local' ? 'custom' : activePriceTabId || '');
      if (!nextValue || nextValue === previousValue) return;
      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleString('es-AR', { month: 'long' });
      const currentYear = currentDate.getFullYear();
      const selectedLabel = tabSelect.options[tabSelect.selectedIndex]?.textContent || 'configuración seleccionada';
      const messageHtml = `
        <p>Actualmente estas en el mes: <strong>${currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1)}</strong> del año <strong>${currentYear}</strong>.</p>
        <p>Has seleccionado utilizar los productos, precios y planes según la configuración de: <strong>${selectedLabel}</strong>.</p>
        <p>Esto modificará los coches disponibles, precios, planes y demás cosas.</p>
        <p>¿Estas seguro que quieres continuar?</p>
      `;
      const applySelection = async () => {
        showProcessingOverlay(true);
        try {
          if (nextValue === 'custom') {
            tabSelect.dataset.current = 'custom';
            activePriceSource = 'local';
            updatePriceContextTag();
            renderPriceTabs();
            return;
          }
          if (nextValue === activePriceTabId) {
            await loadPricesFromServer({ silent: false, forceServer: true });
            return;
          }
          await setActivePriceTab(nextValue, { silent: false });
        } finally {
          showProcessingOverlay(false);
        }
      };
      confirmAction({
        title: 'Confirmar cambio de lista',
        messageHtml,
        confirmText: 'Aceptar',
        cancelText: 'Cancelar',
        onConfirm: applySelection,
        onCancel: () => {
          if (previousValue) {
            tabSelect.value = previousValue;
          } else {
            renderPriceTabs();
          }
        }
      });
    });
    tabSelect.dataset.bound = 'true';
  }
  if (editorBtn && !editorBtn.dataset.bound) {
    editorBtn.addEventListener('click', openVehicleEditorModal);
    editorBtn.dataset.bound = 'true';
  }
}

function ensureVehicleEditorDefaults(vehicle = {}) {
  const normalized = normalizeVehicle(vehicle);
  const maxInstallments = resolveMaxInstallments(
    normalized.planProfile?.maxInstallments,
    normalized.planProfile?.planType || '85a120'
  );
  const planType = resolvePlanTypeFromMax(maxInstallments, normalized.planProfile?.planType || '85a120');
  const availablePlans = resolveAvailablePlans(maxInstallments);
  return {
    name: normalized.name || '',
    brand: normalized.brand || DEFAULT_BRAND,
    basePrice: Number(normalized.basePrice || 0),
    integration: Number(normalized.integration || 0),
    cuotaPura: Number(normalized.cuotaPura || 0),
    planProfile: {
      label: normalized.planProfile?.label || '',
      planType,
      financedPct: normalized.planProfile?.financedPct ?? null,
      integrationPct: normalized.planProfile?.integrationPct ?? null,
      maxInstallments
    },
    availablePlans,
    shareByPlan: {
      ...(normalized.shareByPlan || {}),
      '2a12': Number(normalized.shareByPlan?.['2a12'] || 0),
      '13a21': Number(normalized.shareByPlan?.['13a21'] || 0),
      '22a84': Number(normalized.shareByPlan?.['22a84'] || 0),
      '85a120': Number(normalized.shareByPlan?.['85a120'] || 0),
      'ctapura': Number(normalized.shareByPlan?.['ctapura'] || 0)
    },
    reservations: {
      '1': Number(normalized.reservations?.['1'] || 0),
      '3': Number(normalized.reservations?.['3'] || 0),
      '6': Number(normalized.reservations?.['6'] || 0)
    },
    benefits: {
      pactada: normalized.benefits?.pactada || '',
      bonificacion: normalized.benefits?.bonificacion || ''
    },
    withdrawal: {
      installments: normalized.withdrawal?.installments || [],
      requirementType: normalized.withdrawal?.requirementType || 'percent',
      requirementValue: normalized.withdrawal?.requirementValue ?? null,
      mode: normalized.withdrawal?.mode || 'sorteo_licitacion'
    }
  };
}

function scheduleVehicleEditorAutosave() {
  if (vehicleEditorAutosaveTimer) clearTimeout(vehicleEditorAutosaveTimer);
  vehicleEditorAutosaveTimer = setTimeout(() => {
    applyVehicleEditorChanges();
  }, 250);
}

function bindVehicleEditor() {
  const modal = document.getElementById('vehicleEditorModal');
  const close = document.getElementById('vehicleEditorClose');
  const addBtn = document.getElementById('addVehicle');
  const deleteBtn = document.getElementById('deleteVehicle');
  const duplicateBtn = document.getElementById('duplicateVehicle');
  const addBrandBtn = document.getElementById('addBrand');
  const exportBtn = document.getElementById('exportPricesFromEditor');
  const searchInput = document.getElementById('vehicleEditorSearch');
  const planLabelInput = document.getElementById('editorPlanLabel');
  const maxInstallmentsInput = document.getElementById('editorPlanMaxInstallments');
  const financedInput = document.getElementById('editorPlanFinanced');
  const integrationInput = document.getElementById('editorPlanIntegration');
  const autoLabel = document.getElementById('editorPlanAutoLabel');
  const requirementTypeSelect = document.getElementById('editorWithdrawalRequirementType');
  const brandSelect = document.getElementById('editorBrand');
  if (close && !close.dataset.bound) {
    close.addEventListener('click', () => toggleModal(modal, false));
    close.dataset.bound = 'true';
  }
  if (addBtn && !addBtn.dataset.bound) {
    addBtn.addEventListener('click', () => {
      const fresh = ensureVehicleEditorDefaults({
        name: `Nuevo modelo ${vehicles.length + 1}`
      });
      vehicles.push({
        ...fresh,
        planProfile: { ...fresh.planProfile },
        shareByPlan: { ...fresh.shareByPlan },
        reservations: { ...fresh.reservations },
        benefits: { ...fresh.benefits }
      });
      vehicleEditorState.selectedIndex = vehicles.length - 1;
      markActiveDraftDirty();
      persist();
      renderVehicleEditorList();
      renderVehicleEditorForm();
      renderVehicleTable();
      renderPlanForm();
    });
    addBtn.dataset.bound = 'true';
  }
  if (deleteBtn && !deleteBtn.dataset.bound) {
    deleteBtn.addEventListener('click', () => {
      const idx = vehicleEditorState.selectedIndex;
      const vehicle = vehicles[idx];
      if (!vehicle) return;
      confirmAction({
        title: 'Eliminar modelo',
        message: `Se eliminará "${vehicle.name || 'Modelo sin nombre'}".`,
        confirmText: 'Eliminar',
        onConfirm: () => {
          vehicles.splice(idx, 1);
          vehicleEditorState.selectedIndex = Math.max(0, idx - 1);
          markActiveDraftDirty();
          persist();
          renderVehicleEditorList();
          renderVehicleEditorForm();
          renderVehicleTable();
          renderPlanForm();
          showToast('Modelo eliminado.', 'success');
        }
      });
    });
    deleteBtn.dataset.bound = 'true';
  }
  if (duplicateBtn && !duplicateBtn.dataset.bound) {
    duplicateBtn.addEventListener('click', () => {
      const idx = vehicleEditorState.selectedIndex;
      const base = vehicles[idx];
      if (!base) return;
      const clone = cloneVehicles([base])[0];
      clone.name = `${clone.name || 'Modelo'} (copia)`;
      vehicles.push(clone);
      vehicleEditorState.selectedIndex = vehicles.length - 1;
      markActiveDraftDirty();
      persist();
      renderVehicleEditorList();
      renderVehicleEditorForm();
      renderVehicleTable();
      renderPlanForm();
    });
    duplicateBtn.dataset.bound = 'true';
  }
  if (exportBtn && !exportBtn.dataset.bound) {
    exportBtn.addEventListener('click', downloadPriceFile);
    exportBtn.dataset.bound = 'true';
  }
  if (searchInput && !searchInput.dataset.bound) {
    searchInput.addEventListener('input', () => {
      vehicleEditorState.search = searchInput.value || '';
      renderVehicleEditorList();
    });
    searchInput.dataset.bound = 'true';
  }
  if (requirementTypeSelect && !requirementTypeSelect.dataset.bound) {
    requirementTypeSelect.addEventListener('change', () => {
      setWithdrawalRequirementFields({ requirementType: requirementTypeSelect.value });
      scheduleVehicleEditorAutosave();
    });
    requirementTypeSelect.dataset.bound = 'true';
  }
  if (brandSelect && !brandSelect.dataset.boundScheme) {
    brandSelect.addEventListener('change', () => {
      const maxInstallments = resolveMaxInstallments(maxInstallmentsInput?.value, '85a120');
      renderEditorPlanRanges({ brand: brandSelect.value }, maxInstallments);
      document.querySelectorAll('#editorPlanRanges input.money').forEach(input => {
        if (input.dataset.bound) return;
        bindMoneyInput(input, () => {});
        input.dataset.bound = 'true';
      });
      scheduleVehicleEditorAutosave();
    });
    brandSelect.dataset.boundScheme = 'true';
  }
  modal?.querySelectorAll('[data-editor-tab]').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.addEventListener('click', () => setVehicleEditorTab(btn.dataset.editorTab));
    btn.dataset.bound = 'true';
  });
  if (addBrandBtn && !addBrandBtn.dataset.bound) {
    addBrandBtn.addEventListener('click', () => {
      addBrandSetting();
    });
    addBrandBtn.dataset.bound = 'true';
  }
  modal?.querySelectorAll('.editor-form input, .editor-form select, .editor-form textarea').forEach(field => {
    if (field.dataset.boundAutosave) return;
    const eventName = field.tagName === 'SELECT' || field.type === 'checkbox' ? 'change' : 'input';
    field.addEventListener(eventName, scheduleVehicleEditorAutosave);
    field.addEventListener('blur', scheduleVehicleEditorAutosave);
    field.dataset.boundAutosave = 'true';
  });
  const updatePlanAutoLabel = () => {
    const financedPct = parsePercentInput(financedInput?.value);
    const integrationPct = parsePercentInput(integrationInput?.value);
    const maxInstallments = resolveMaxInstallments(maxInstallmentsInput?.value, '85a120');
    const planType = resolvePlanTypeFromMax(maxInstallments, vehicles[vehicleEditorState.selectedIndex]?.planProfile?.planType || '85a120');
    const label = buildPlanLabelFromPercents(financedPct, integrationPct, planType, maxInstallments);
    if (autoLabel) autoLabel.textContent = label || 'Sin esquema definido';
    if (planLabelInput && (financedPct !== null || integrationPct !== null)) {
      planLabelInput.value = label;
    }
  };
  if (financedInput && !financedInput.dataset.bound) {
    financedInput.addEventListener('input', updatePlanAutoLabel);
    financedInput.dataset.bound = 'true';
  }
  if (integrationInput && !integrationInput.dataset.bound) {
    integrationInput.addEventListener('input', updatePlanAutoLabel);
    integrationInput.dataset.bound = 'true';
  }
  if (maxInstallmentsInput && !maxInstallmentsInput.dataset.boundProfile) {
    maxInstallmentsInput.addEventListener('input', updatePlanAutoLabel);
    maxInstallmentsInput.dataset.boundProfile = 'true';
  }
  updatePlanAutoLabel();
}

function setVehicleEditorTab(tab = 'models') {
  const modal = document.getElementById('vehicleEditorModal');
  if (!modal) return;
  vehicleEditorState.tab = tab;
  modal.querySelectorAll('[data-editor-tab]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.editorTab === tab);
  });
  modal.querySelectorAll('[data-editor-panel]').forEach(panel => {
    panel.classList.toggle('active', panel.dataset.editorPanel === tab);
  });
}

function handleBrandSettingsChange() {
  ensureBrandSettings(brandSettings, vehicles);
  markActiveDraftDirty();
  persist();
  renderVehicleEditorBrandFilter();
  renderVehicleEditorForm();
  renderVehicleTable();
}

function addBrandSetting() {
  const settings = ensureBrandSettings();
  const baseName = 'Nueva marca';
  let name = baseName;
  let index = 1;
  while (settings.some(item => item.name.toLowerCase() === name.toLowerCase())) {
    name = `${baseName} ${index}`;
    index += 1;
  }
  const color = defaultColorForBrand(name);
  brandSettings = [...settings, { name, color, planScheme: resolveBrandPlanScheme(name) }];
  handleBrandSettingsChange();
  renderBrandManager();
  renderEditorBrandSelect(name);
}

const PLAN_SCHEME_SLOTS = 5;
const PLAN_SCHEME_OPTIONS = Array.from({ length: 119 }, (_, idx) => idx + 2);

function buildInstallmentOptions(selectedValue) {
  const selected = Number(selectedValue);
  return PLAN_SCHEME_OPTIONS.map(option => (
    `<option value="${option}" ${option === selected ? 'selected' : ''}>${option}</option>`
  )).join('');
}

function buildPlanSchemeSlots(scheme = []) {
  const normalized = normalizePlanScheme(scheme);
  const slots = Array.from({ length: PLAN_SCHEME_SLOTS }, (_, idx) => normalized[idx] || null);
  return slots.map(slot => ({
    start: slot?.start ?? '',
    end: slot?.end ?? ''
  }));
}

function readPlanSchemeFromRow(row) {
  const slots = [];
  for (let idx = 0; idx < PLAN_SCHEME_SLOTS; idx += 1) {
    const startSelect = row?.querySelector(`[data-plan-start="${idx}"]`);
    const endSelect = row?.querySelector(`[data-plan-end="${idx}"]`);
    const start = Number(startSelect?.value);
    const end = Number(endSelect?.value);
    if (Number.isFinite(start) && Number.isFinite(end)) {
      slots.push({ start, end });
    }
  }
  return normalizePlanScheme(slots);
}

function renderBrandManager() {
  const list = document.getElementById('brandManagerList');
  if (!list) return;
  const settings = ensureBrandSettings();
  list.innerHTML = settings.map((brand, index) => `
      <div class="brand-manager-row" data-index="${index}">
        <div class="brand-manager-main">
          <input type="text" value="${brand.name}" data-brand-name />
          <input type="color" value="${brand.color}" data-brand-color />
          <span class="muted tiny" data-brand-color-label>${brand.color.toUpperCase()}</span>
        </div>
        <div class="brand-scheme">
          <p class="muted tiny">Esquema de cuotas por tramos</p>
          <div class="brand-scheme-grid">
            ${buildPlanSchemeSlots(brand.planScheme).map((slot, slotIndex) => `
              <div class="brand-scheme-row">
                <span class="muted tiny">Tramo ${slotIndex + 1}</span>
                <div class="inline-field scheme-field">
                  <select data-plan-start="${slotIndex}">
                    <option value="">Cuota inicial</option>
                    ${buildInstallmentOptions(slot.start)}
                  </select>
                  <span class="muted tiny">a</span>
                  <select data-plan-end="${slotIndex}">
                    <option value="">Cuota final</option>
                    ${buildInstallmentOptions(slot.end)}
                  </select>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
  list.querySelectorAll('[data-brand-name]').forEach(input => {
    if (input.dataset.bound) return;
    input.addEventListener('change', () => {
      const row = input.closest('.brand-manager-row');
      const idx = Number(row?.dataset.index);
      const previous = brandSettings[idx]?.name;
      const nextName = normalizeBrand(input.value);
      if (!nextName) {
        input.value = previous || '';
        return;
      }
      const duplicate = brandSettings.some((item, i) => i !== idx && item.name.toLowerCase() === nextName.toLowerCase());
      if (duplicate) {
        showToast('La marca ya existe.', 'error');
        input.value = previous || '';
        return;
      }
      brandSettings[idx] = { ...brandSettings[idx], name: nextName, planScheme: resolveBrandPlanScheme(nextName, brandSettings[idx]?.planScheme) };
      vehicles.forEach(vehicle => {
        if (normalizeBrand(vehicle.brand) === previous) {
          vehicle.brand = nextName;
        }
      });
      if (vehicleEditorState.brandFilter === previous) {
        vehicleEditorState.brandFilter = nextName;
      }
      if (uiState.vehicleFilters?.brand === previous) {
        uiState.vehicleFilters.brand = nextName;
      }
      handleBrandSettingsChange();
      renderBrandManager();
    });
    input.dataset.bound = 'true';
  });
  list.querySelectorAll('[data-brand-color]').forEach(input => {
    if (input.dataset.bound) return;
    input.addEventListener('input', () => {
      const row = input.closest('.brand-manager-row');
      const idx = Number(row?.dataset.index);
      const label = row?.querySelector('[data-brand-color-label]');
      if (label) label.textContent = input.value.toUpperCase();
      brandSettings[idx] = { ...brandSettings[idx], color: normalizeHexColor(input.value, brandSettings[idx]?.color) };
      handleBrandSettingsChange();
    });
    input.dataset.bound = 'true';
  });
  list.querySelectorAll('.brand-manager-row').forEach(row => {
    row.querySelectorAll('select[data-plan-start], select[data-plan-end]').forEach(select => {
      if (select.dataset.bound) return;
      select.addEventListener('change', () => {
        const idx = Number(row.dataset.index);
        brandSettings[idx] = {
          ...brandSettings[idx],
          planScheme: readPlanSchemeFromRow(row)
        };
        handleBrandSettingsChange();
      });
      select.dataset.bound = 'true';
    });
  });
}

function openVehicleEditorModal() {
  const modal = document.getElementById('vehicleEditorModal');
  if (!modal) return;
  const searchInput = document.getElementById('vehicleEditorSearch');
  if (searchInput) searchInput.value = vehicleEditorState.search || '';
  setVehicleEditorTab(vehicleEditorState.tab || 'models');
  renderVehicleEditorBrandFilter();
  renderVehicleEditorList();
  renderVehicleEditorForm();
  renderBrandManager();
  modal.querySelectorAll('input.money').forEach(input => {
    if (input.dataset.bound) return;
    bindMoneyInput(input, () => {});
    input.dataset.bound = 'true';
  });
  toggleModal(modal, true);
}

function getUniqueBrands(list = []) {
  const set = new Set(list.map(vehicle => normalizeBrand(vehicle.brand)));
  const sorted = Array.from(set);
  sorted.sort((a, b) => {
    const aIndex = BRANDS.indexOf(a);
    const bIndex = BRANDS.indexOf(b);
    if (aIndex !== -1 || bIndex !== -1) {
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    }
    return a.localeCompare(b);
  });
  return sorted;
}

function renderVehicleEditorBrandFilter() {
  const select = document.getElementById('vehicleEditorBrandFilter');
  if (!select) return;
  const brands = getUniqueBrands(vehicles);
  select.innerHTML = [
    '<option value="all">Todas las marcas</option>',
    ...brands.map(brand => `<option value="${brand}">${brand}</option>`)
  ].join('');
  const desired = vehicleEditorState.brandFilter || 'all';
  select.value = brands.includes(desired) || desired === 'all' ? desired : 'all';
  if (select.value !== desired) {
    vehicleEditorState.brandFilter = select.value;
  }
  if (!select.dataset.bound) {
    select.addEventListener('change', () => {
      vehicleEditorState.brandFilter = select.value || 'all';
      renderVehicleEditorList();
    });
    select.dataset.bound = 'true';
  }
}

function getFilteredVehicles() {
  const query = (vehicleEditorState.search || '').toLowerCase();
  const brandFilter = vehicleEditorState.brandFilter || 'all';
  return vehicles
    .map((vehicle, index) => ({ vehicle, index }))
    .filter(({ vehicle }) => {
      const matchesName = (vehicle.name || '').toLowerCase().includes(query);
      const matchesBrand = brandFilter === 'all' || normalizeBrand(vehicle.brand) === brandFilter;
      return matchesName && matchesBrand;
    });
}

function renderVehicleEditorList() {
  const list = document.getElementById('vehicleEditorList');
  const empty = document.getElementById('vehicleEditorEmpty');
  if (!list) return;
  renderVehicleEditorBrandFilter();
  if (vehicleEditorState.selectedIndex >= vehicles.length) {
    vehicleEditorState.selectedIndex = Math.max(0, vehicles.length - 1);
  }
  const filtered = getFilteredVehicles();
  if (!filtered.length) {
    list.innerHTML = '';
    if (empty) empty.classList.remove('hidden');
    return;
  }
  if (empty) empty.classList.add('hidden');
  const grouped = filtered.reduce((acc, entry) => {
    const brand = normalizeBrand(entry.vehicle.brand);
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(entry);
    return acc;
  }, {});
  const brandOrder = Object.keys(grouped).sort((a, b) => {
    const aIndex = BRANDS.indexOf(a);
    const bIndex = BRANDS.indexOf(b);
    if (aIndex !== -1 || bIndex !== -1) {
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    }
    return a.localeCompare(b);
  });
  list.innerHTML = brandOrder.map(brand => {
    const entries = grouped[brand] || [];
    const style = buildBrandCardStyle(brand);
    return `
      <div class="editor-brand-group">
        <div class="editor-brand-head" style="${style}">
          <span class="editor-brand-count">(${entries.length})</span>
          <span class="editor-brand-name">${brand}</span>
          <i class='bx bx-chevron-down'></i>
        </div>
        <div class="editor-brand-items">
          ${entries.map(({ vehicle, index }) => `
            <button class="editor-item ${index === vehicleEditorState.selectedIndex ? 'active' : ''}" data-index="${index}" style="${buildBrandCardStyle(vehicle.brand)}">
              <strong>${vehicle.name || 'Modelo sin nombre'}</strong>
              <span class="muted tiny">${normalizeBrand(vehicle.brand)} • ${resolveVehiclePlanLabel(vehicle, vehicle.planProfile?.planType) || 'Plan sin definir'}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
  list.querySelectorAll('.editor-item').forEach(btn => {
    btn.addEventListener('click', () => {
      applyVehicleEditorChanges();
      vehicleEditorState.selectedIndex = Number(btn.dataset.index);
      renderVehicleEditorList();
      renderVehicleEditorForm();
    });
  });
}

function renderEditorBrandSelect(selectedValue) {
  const select = document.getElementById('editorBrand');
  if (!select) return;
  const settings = ensureBrandSettings();
  select.innerHTML = settings.map(item => `<option value="${item.name}">${item.name}</option>`).join('');
  const desired = normalizeBrand(selectedValue || select.value || DEFAULT_BRAND);
  select.value = settings.some(item => item.name === desired) ? desired : (settings[0]?.name || desired);
}

function getWithdrawalRequirementNodes() {
  return {
    typeSelect: document.getElementById('editorWithdrawalRequirementType'),
    pctInput: document.getElementById('editorWithdrawalRequirementPct'),
    amountInput: document.getElementById('editorWithdrawalRequirementAmount'),
    amountField: document.getElementById('editorWithdrawalRequirementAmountField')
  };
}

function renderEditorPlanRanges(vehicle, totalInstallments) {
  const container = document.getElementById('editorPlanRanges');
  if (!container) return;
  const ranges = getPlanRangesForBrand(normalizeBrand(vehicle?.brand || DEFAULT_BRAND), totalInstallments);
  if (!ranges.length) {
    container.innerHTML = '<p class="muted tiny">No hay tramos definidos para esta marca.</p>';
    return;
  }
  container.innerHTML = ranges.map(range => `
      <div class="field">
        <label>${range.label}</label>
        <div class="money-field">
          <span class="prefix">$</span>
          <input class="money" type="text" inputmode="numeric" data-editor-plan="${range.key}" />
        </div>
      </div>
    `).join('');
}

function setWithdrawalRequirementFields(withdrawal = {}) {
  const nodes = getWithdrawalRequirementNodes();
  const type = withdrawal.requirementType === 'amount' ? 'amount' : 'percent';
  const fallback = type === 'amount' ? withdrawal.requirementAmount : withdrawal.requirementPct;
  const value = Number.isFinite(withdrawal.requirementValue)
    ? withdrawal.requirementValue
    : (Number.isFinite(fallback) ? fallback : null);
  if (nodes.typeSelect) nodes.typeSelect.value = type;
  const showAmount = type === 'amount';
  if (nodes.amountField) nodes.amountField.classList.toggle('hidden', !showAmount);
  if (nodes.pctInput) nodes.pctInput.classList.toggle('hidden', showAmount);
  if (showAmount) {
    if (nodes.amountInput) setMoneyValue(nodes.amountInput, value || 0);
    if (nodes.pctInput) nodes.pctInput.value = '';
  } else {
    if (nodes.pctInput) nodes.pctInput.value = formatPercentInput(value);
    if (nodes.amountInput) setMoneyValue(nodes.amountInput, 0);
  }
}

function readWithdrawalRequirementFields() {
  const nodes = getWithdrawalRequirementNodes();
  const type = nodes.typeSelect?.value === 'amount' ? 'amount' : 'percent';
  if (type === 'amount') {
    return { type, value: parseMoney(nodes.amountInput?.dataset.raw || nodes.amountInput?.value || 0) };
  }
  return { type, value: parsePercentInput(nodes.pctInput?.value) };
}

function renderVehicleEditorForm() {
  if (!vehicles.length) {
    const emptyForm = ensureVehicleEditorDefaults({});
    vehicleEditorState.selectedIndex = 0;
    const nameInput = document.getElementById('editorVehicleName');
    const brandInput = document.getElementById('editorBrand');
    const allocationSelect = document.getElementById('editorAllocation');
    const withdrawalInstallmentsInput = document.getElementById('editorWithdrawalInstallments');
    const basePriceInput = document.getElementById('editorBasePrice');
    const integrationInput = document.getElementById('editorIntegration');
    const cuotaPuraInput = document.getElementById('editorCuotaPura');
    const planLabelInput = document.getElementById('editorPlanLabel');
    const maxInstallmentsInput = document.getElementById('editorPlanMaxInstallments');
    const financedInput = document.getElementById('editorPlanFinanced');
    const integrationPctInput = document.getElementById('editorPlanIntegration');
    const autoLabel = document.getElementById('editorPlanAutoLabel');
    const pactadaInput = document.getElementById('editorBenefitPactada');
    const bonificacionInput = document.getElementById('editorBenefitBonificacion');
    if (nameInput) nameInput.value = emptyForm.name;
    renderEditorBrandSelect(emptyForm.brand || DEFAULT_BRAND);
    if (brandInput) brandInput.value = emptyForm.brand || DEFAULT_BRAND;
    if (allocationSelect) allocationSelect.value = emptyForm.withdrawal.mode || 'sorteo_licitacion';
    if (withdrawalInstallmentsInput) withdrawalInstallmentsInput.value = formatWithdrawalInstallments(emptyForm.withdrawal.installments || []);
    setWithdrawalRequirementFields(emptyForm.withdrawal);
    if (basePriceInput) setMoneyValue(basePriceInput, emptyForm.basePrice);
    if (integrationInput) setMoneyValue(integrationInput, emptyForm.integration);
    if (cuotaPuraInput) setMoneyValue(cuotaPuraInput, emptyForm.cuotaPura);
    if (planLabelInput) planLabelInput.value = emptyForm.planProfile.label;
    if (maxInstallmentsInput) maxInstallmentsInput.value = emptyForm.planProfile.maxInstallments;
    if (financedInput) financedInput.value = formatPercentInput(emptyForm.planProfile.financedPct);
    if (integrationPctInput) integrationPctInput.value = formatPercentInput(emptyForm.planProfile.integrationPct);
    if (autoLabel) {
      autoLabel.textContent = buildPlanLabelFromPercents(
        emptyForm.planProfile.financedPct,
        emptyForm.planProfile.integrationPct,
        emptyForm.planProfile.planType,
        emptyForm.planProfile.maxInstallments
      ) || 'Sin esquema definido';
    }
    if (pactadaInput) pactadaInput.value = emptyForm.benefits.pactada;
    if (bonificacionInput) bonificacionInput.value = emptyForm.benefits.bonificacion;
    renderEditorPlanRanges(emptyForm, emptyForm.planProfile.maxInstallments);
    document.querySelectorAll('#editorPlanRanges input.money').forEach(input => {
      if (input.dataset.bound) return;
      bindMoneyInput(input, () => {});
      input.dataset.bound = 'true';
    });
    document.querySelectorAll('[data-editor-plan]').forEach(input => setMoneyValue(input, 0));
    document.querySelectorAll('[data-editor-reserva]').forEach(input => setMoneyValue(input, 0));
    document.querySelectorAll('[data-editor-available]').forEach(input => {
      input.checked = emptyForm.availablePlans.includes(input.value);
      input.disabled = true;
    });
    return;
  }
  const vehicle = vehicles[vehicleEditorState.selectedIndex];
  const form = ensureVehicleEditorDefaults(vehicle);
  const nameInput = document.getElementById('editorVehicleName');
  const brandInput = document.getElementById('editorBrand');
  const allocationSelect = document.getElementById('editorAllocation');
  const withdrawalInstallmentsInput = document.getElementById('editorWithdrawalInstallments');
  const basePriceInput = document.getElementById('editorBasePrice');
  const integrationInput = document.getElementById('editorIntegration');
  const cuotaPuraInput = document.getElementById('editorCuotaPura');
  const planLabelInput = document.getElementById('editorPlanLabel');
  const maxInstallmentsInput = document.getElementById('editorPlanMaxInstallments');
  const financedInput = document.getElementById('editorPlanFinanced');
  const integrationPctInput = document.getElementById('editorPlanIntegration');
  const autoLabel = document.getElementById('editorPlanAutoLabel');
  const pactadaInput = document.getElementById('editorBenefitPactada');
  const bonificacionInput = document.getElementById('editorBenefitBonificacion');
  if (nameInput) nameInput.value = form.name;
  renderEditorBrandSelect(form.brand || DEFAULT_BRAND);
  if (brandInput) brandInput.value = form.brand || DEFAULT_BRAND;
  if (allocationSelect) allocationSelect.value = form.withdrawal.mode || 'sorteo_licitacion';
  if (withdrawalInstallmentsInput) withdrawalInstallmentsInput.value = formatWithdrawalInstallments(form.withdrawal.installments || []);
  setWithdrawalRequirementFields(form.withdrawal);
  if (basePriceInput) setMoneyValue(basePriceInput, form.basePrice);
  if (integrationInput) setMoneyValue(integrationInput, form.integration);
  if (cuotaPuraInput) setMoneyValue(cuotaPuraInput, form.cuotaPura);
  if (planLabelInput) planLabelInput.value = form.planProfile.label;
  if (maxInstallmentsInput) maxInstallmentsInput.value = form.planProfile.maxInstallments;
  if (financedInput) financedInput.value = formatPercentInput(form.planProfile.financedPct);
  if (integrationPctInput) integrationPctInput.value = formatPercentInput(form.planProfile.integrationPct);
  if (autoLabel) {
    autoLabel.textContent = buildPlanLabelFromPercents(
      form.planProfile.financedPct,
      form.planProfile.integrationPct,
      form.planProfile.planType,
      form.planProfile.maxInstallments
    ) || 'Sin esquema definido';
  }
  if (pactadaInput) pactadaInput.value = form.benefits.pactada;
  if (bonificacionInput) bonificacionInput.value = form.benefits.bonificacion;
  renderEditorPlanRanges(form, form.planProfile.maxInstallments);
  document.querySelectorAll('#editorPlanRanges input.money').forEach(input => {
    if (input.dataset.bound) return;
    bindMoneyInput(input, () => {});
    input.dataset.bound = 'true';
  });
  document.querySelectorAll('[data-editor-plan]').forEach(input => {
    const planKey = input.dataset.editorPlan;
    const value = form.shareByPlan[planKey] || 0;
    setMoneyValue(input, value);
  });
  document.querySelectorAll('[data-editor-reserva]').forEach(input => {
    const resKey = input.dataset.editorReserva;
    const value = form.reservations[resKey] || 0;
    setMoneyValue(input, value);
  });
  document.querySelectorAll('[data-editor-available]').forEach(input => {
    input.checked = form.availablePlans.includes(input.value);
    input.disabled = true;
  });
}

function applyVehicleEditorChanges() {
  const vehicle = vehicles[vehicleEditorState.selectedIndex];
  if (!vehicle) return;
  const nameInput = document.getElementById('editorVehicleName');
  const brandInput = document.getElementById('editorBrand');
  const allocationSelect = document.getElementById('editorAllocation');
  const withdrawalInstallmentsInput = document.getElementById('editorWithdrawalInstallments');
  const basePriceInput = document.getElementById('editorBasePrice');
  const integrationInput = document.getElementById('editorIntegration');
  const cuotaPuraInput = document.getElementById('editorCuotaPura');
  const planLabelInput = document.getElementById('editorPlanLabel');
  const maxInstallmentsInput = document.getElementById('editorPlanMaxInstallments');
  const financedInput = document.getElementById('editorPlanFinanced');
  const integrationPctInput = document.getElementById('editorPlanIntegration');
  const pactadaInput = document.getElementById('editorBenefitPactada');
  const bonificacionInput = document.getElementById('editorBenefitBonificacion');
  vehicle.name = nameInput?.value?.trim() || vehicle.name || '';
  vehicle.brand = normalizeBrand(brandInput?.value);
  ensureBrandSettings(brandSettings, vehicles);
  const requirement = readWithdrawalRequirementFields();
  vehicle.withdrawal = {
    ...(vehicle.withdrawal || {}),
    installments: parseWithdrawalInstallments(withdrawalInstallmentsInput?.value || ''),
    requirementType: requirement.type,
    requirementValue: requirement.value,
    requirementPct: requirement.type === 'percent' ? requirement.value : null,
    requirementAmount: requirement.type === 'amount' ? requirement.value : null,
    mode: allocationSelect?.value || vehicle.withdrawal?.mode || 'sorteo_licitacion'
  };
  vehicle.basePrice = parseMoney(basePriceInput?.dataset.raw || basePriceInput?.value || 0);
  vehicle.integration = parseMoney(integrationInput?.dataset.raw || integrationInput?.value || 0);
  vehicle.cuotaPura = parseMoney(cuotaPuraInput?.dataset.raw || cuotaPuraInput?.value || 0);
  const financedPct = parsePercentInput(financedInput?.value);
  const integrationPct = parsePercentInput(integrationPctInput?.value);
  const maxInstallments = resolveMaxInstallments(maxInstallmentsInput?.value, vehicle.planProfile?.planType || '85a120');
  const planType = resolvePlanTypeFromMax(maxInstallments, vehicle.planProfile?.planType || '85a120');
  const computedLabel = buildPlanLabelFromPercents(financedPct, integrationPct, planType, maxInstallments);
  const availablePlans = resolveAvailablePlans(maxInstallments);
  vehicle.planProfile = {
    ...(vehicle.planProfile || {}),
    label: planLabelInput?.value?.trim() || computedLabel || '',
    planType,
    financedPct,
    integrationPct,
    maxInstallments
  };
  vehicle.benefits = {
    ...(vehicle.benefits || {}),
    pactada: pactadaInput?.value?.trim() || '',
    bonificacion: bonificacionInput?.value?.trim() || ''
  };
  vehicle.availablePlans = availablePlans;
  vehicle.shareByPlan = vehicle.shareByPlan || {};
  vehicle.shareByPlan.ctapura = vehicle.cuotaPura;
  document.querySelectorAll('[data-editor-plan]').forEach(input => {
    const planKey = input.dataset.editorPlan;
    vehicle.shareByPlan[planKey] = parseMoney(input.dataset.raw || input.value || 0);
  });
  vehicle.reservations = vehicle.reservations || {};
  document.querySelectorAll('[data-editor-reserva]').forEach(input => {
    const resKey = input.dataset.editorReserva;
    vehicle.reservations[resKey] = parseMoney(input.dataset.raw || input.value || 0);
  });
  markActiveDraftDirty();
  persist();
  renderBrandManager();
  renderVehicleEditorBrandFilter();
  renderVehicleEditorList();
  renderVehicleTable();
  renderPlanForm();
}

function renderVehicleBrandFilterControl() {
  const select = document.getElementById('vehicleBrandFilter');
  if (!select) return;
  const brands = getUniqueBrands(vehicles);
  select.innerHTML = [
    '<option value="all">Todas las marcas</option>',
    ...brands.map(brand => `<option value="${brand}">${brand}</option>`)
  ].join('');
  const desired = uiState.vehicleFilters?.brand || 'all';
  select.value = brands.includes(desired) || desired === 'all' ? desired : 'all';
  if (select.value !== desired) {
    uiState.vehicleFilters = uiState.vehicleFilters || {};
    uiState.vehicleFilters.brand = select.value;
    persist();
  }
  if (!select.dataset.bound) {
    select.addEventListener('change', () => {
      uiState.vehicleFilters = uiState.vehicleFilters || {};
      uiState.vehicleFilters.brand = select.value || 'all';
      persist();
      renderVehicleTable();
    });
    select.dataset.bound = 'true';
  }
}

function buildBrandSummaryList(list = vehicles) {
  const grouped = list.reduce((acc, vehicle) => {
    const brand = normalizeBrand(vehicle.brand) || 'Sin marca';
    acc[brand] = (acc[brand] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(grouped)
    .sort((a, b) => a[0].localeCompare(b[0], 'es', { sensitivity: 'base' }))
    .map(([brand, count]) => `${brand} (${count} elementos)`);
}

function formatVehicleNameForTable(name) {
  const clean = String(name || '').trim();
  if (!clean) return 'Modelo sin nombre';
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length <= 4 || clean.length <= 28) return clean;
  const firstLine = words.slice(0, 4).join(' ');
  const rest = words.slice(4).join(' ');
  return `${firstLine}<br><span class="vehicle-name-sub">${rest}</span>`;
}

function renderVehicleTable() {
  renderPriceTabs();
  clearPriceAlerts();
  ensureBrandSettings(brandSettings, vehicles);
  if (activePriceSource === 'servidor') {
    renderPriceBrandSummary(buildBrandSummaryList(vehicles));
  } else if (activePriceSource === 'archivo') {
    renderPriceAlerts('Precios cargados manualmente desde un archivo.', 'success');
  } else if (activePriceSource === 'local') {
    renderPriceAlerts('Precios editados localmente para este mes.', 'success');
  } else {
    renderPriceAlerts('No hay archivos de precios para este mes, se usan los valores predeterminados.', 'warning');
  }
  const container = document.getElementById('vehicleTables');
  if (!container) return;
  renderVehicleBrandFilterControl();
  const brandFilter = uiState.vehicleFilters?.brand || 'all';
  const filteredVehicles = brandFilter === 'all'
    ? vehicles.map((vehicle, index) => ({ vehicle, index }))
    : vehicles
      .map((vehicle, index) => ({ vehicle, index }))
      .filter(({ vehicle }) => normalizeBrand(vehicle.brand) === brandFilter);

  const grouped = filteredVehicles.reduce((acc, entry) => {
    const brand = normalizeBrand(entry.vehicle.brand);
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(entry);
    return acc;
  }, {});

  const brandOrder = Object.keys(grouped).sort((a, b) => {
    const aIndex = BRANDS.indexOf(a);
    const bIndex = BRANDS.indexOf(b);
    if (aIndex !== -1 || bIndex !== -1) {
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    }
    return a.localeCompare(b);
  });

  const buildTable = (entries = [], planRanges = []) => {
    const head = `<tr><th>Plan</th>${entries.map(({ vehicle }) => `<th><span class="vehicle-name">${formatVehicleNameForTable(vehicle.name)}</span></th>`).join('')}</tr>`;
    const bodyRows = [];
    bodyRows.push(`<tr><td>Precio de lista</td>${entries.map(({ vehicle, index }) => `
      <td>
        <div class="money-field">
          <span class="prefix">$</span>
          <input class="money" type="text" inputmode="numeric" data-vehicle="${index}" data-base="true" value="${vehicle.basePrice ? number.format(vehicle.basePrice) : ''}" data-raw="${vehicle.basePrice || ''}" placeholder="$ 0" disabled>
        </div>
      </td>`).join('')}</tr>`);

    bodyRows.push(`<tr><td>Plan de cuotas</td>${entries.map(({ vehicle }) => {
      const currentPlan = vehicle.planProfile?.planType || plans[0];
      const labelValue = resolveVehiclePlanLabel(vehicle, currentPlan);
      const total = resolveTotalInstallments(currentPlan, vehicle.planProfile?.planType, vehicle.planProfile?.maxInstallments);
      return `<td>
        <div class="plan-profile-cell readonly">
          <span class="chip muted">${labelValue}</span>
          <small class="muted tiny">${total} cuotas • No editable</small>
        </div>
      </td>`;
    }).join('')}</tr>`);

    planRanges.forEach(range => {
      bodyRows.push(`<tr><td>${range.label}</td>${entries.map(({ vehicle, index }) => {
        const value = vehicle.shareByPlan[range.key] ?? vehicle.cuotaPura;
        return `
          <td>
            <div class="money-field">
              <span class="prefix">$</span>
              <input class="money" type="text" inputmode="numeric" data-vehicle="${index}" data-plan="${range.key}" value="${value ? number.format(value) : ''}" data-raw="${value || ''}" placeholder="$ 0" disabled>
            </div>
          </td>`;
      }).join('')}</tr>`);
    });

    bodyRows.push(`<tr><td>${planLabelFromKey('ctapura')}</td>${entries.map(({ vehicle, index }) => {
      const value = vehicle.shareByPlan.ctapura ?? vehicle.cuotaPura;
      return `
        <td>
          <div class="money-field">
            <span class="prefix">$</span>
            <input class="money" type="text" inputmode="numeric" data-vehicle="${index}" data-plan="ctapura" value="${value ? number.format(value) : ''}" data-raw="${value || ''}" placeholder="$ 0" disabled>
          </div>
        </td>`;
    }).join('')}</tr>`);

    bodyRows.push(`<tr><td>Integración</td>${entries.map(({ vehicle, index }) => {
      return `<td>
        <div class="money-field">
          <span class="prefix">$</span>
          <input class="money" type="text" inputmode="numeric" data-vehicle="${index}" data-integration="true" value="${vehicle.integration ? number.format(vehicle.integration) : ''}" data-raw="${vehicle.integration || ''}" placeholder="$ 0" disabled>
        </div>
      </td>`;
    }).join('')}</tr>`);

    ['1', '3', '6'].forEach(res => {
      bodyRows.push(`<tr><td>Reserva ${res} cuota(s)</td>${entries.map(({ vehicle, index }) => {
        const value = vehicle.reservations[res];
        return `<td>
          <div class="money-field">
            <span class="prefix">$</span>
            <input class="money" type="text" inputmode="numeric" data-vehicle="${index}" data-reserva="${res}" value="${value ? number.format(value) : ''}" data-raw="${value || ''}" placeholder="$ 0" disabled>
          </div>
        </td>`;
      }).join('')}</tr>`);
    });

    bodyRows.push(`<tr><td>Modalidad de adjudicación</td>${entries.map(({ vehicle }) => `
      <td><span class="muted">${formatAllocationMode(vehicle.withdrawal?.mode)}</span></td>
    `).join('')}</tr>`);

    bodyRows.push(`<tr><td>Cuotas pactadas de retiro</td>${entries.map(({ vehicle }) => `
      <td><span class="muted">${formatWithdrawalInstallments(vehicle.withdrawal?.installments || []) || 'Sin definir'}</span></td>
    `).join('')}</tr>`);

    bodyRows.push(`<tr><td>Requisito de integración</td>${entries.map(({ vehicle }) => {
      const requirement = resolveWithdrawalRequirement(vehicle.withdrawal || {}, vehicle.basePrice || 0);
      const hasValue = Number.isFinite(requirement.value);
      return `<td><span class="muted">${hasValue ? requirement.label : 'Sin definir'}</span></td>`;
    }).join('')}</tr>`);

    return { head, bodyRows };
  };

  if (!brandOrder.length) {
    container.innerHTML = '<p class="muted">No hay modelos disponibles para esta marca.</p>';
    return;
  }

  container.innerHTML = brandOrder.map(brand => {
    const entries = grouped[brand] || [];
    const planRanges = getPlanRangesForBrand(brand);
    const { head, bodyRows } = buildTable(entries, planRanges);
    const style = buildBrandCardStyle(brand);
    return `
      <div class="vehicle-brand-card" style="${style}">
        <div class="vehicle-brand-head">
          <div>
            <p class="eyebrow">Marca</p>
            <h3>${brand}</h3>
          </div>
          <span class="muted tiny">${entries.length} modelos</span>
        </div>
        <div class="table-wrapper vehicle-table">
          <table class="vehicle-table-grid">
            <thead>${head}</thead>
            <tbody>${bodyRows.join('')}</tbody>
          </table>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('input.money').forEach(inp => {
    inp.setAttribute('tabindex', '-1');
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
  markActiveDraftDirty();
  persist();
  renderPlanForm();
}

function updatePlanProfile(idx, payload = {}) {
  vehicles[idx].planProfile = { ...(vehicles[idx].planProfile || {}), ...payload };
  markActiveDraftDirty();
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
    chip.textContent = resolveVehiclePlanLabel(vehicle, planType);
  }
  if (helper) {
    const planLabelValue = resolveVehiclePlanLabel(vehicle, planType);
    const planLabelText = planLabelValue ? `Plan asignado automáticamente: ${planLabelValue}` : 'Plan establecido según el modelo.';
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

let clientWizardState = {
  step: 1,
  mode: null,
  searchTerm: '',
  selectedClientId: null,
  externalName: '',
  selectedVehicleIndex: 0,
  tradeIn: true,
  tradeInValue: 0,
  useSystemPrice: true,
  customPrice: 0
};

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

  document.querySelectorAll('[data-client-wizard-choice]').forEach(card => {
    if (card.dataset.bound) return;
    card.addEventListener('click', () => {
      clientWizardState.mode = card.dataset.clientWizardChoice;
      setClientWizardStep(2);
      renderClientWizardMode();
    });
    card.dataset.bound = 'true';
  });

  const searchBtn = document.getElementById('clientWizardSearchBtn');
  if (searchBtn && !searchBtn.dataset.bound) {
    searchBtn.addEventListener('click', runClientWizardSearch);
    searchBtn.dataset.bound = 'true';
  }
  const searchInput = document.getElementById('clientWizardSearchInput');
  if (searchInput && !searchInput.dataset.bound) {
    searchInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        runClientWizardSearch();
      }
    });
    searchInput.dataset.bound = 'true';
  }

  const backBtn = document.getElementById('clientWizardBack');
  if (backBtn && !backBtn.dataset.bound) {
    backBtn.addEventListener('click', () => {
      if (clientWizardState.step > 1) {
        setClientWizardStep(clientWizardState.step - 1);
      }
    });
    backBtn.dataset.bound = 'true';
  }
  const nextBtn = document.getElementById('clientWizardNext');
  if (nextBtn && !nextBtn.dataset.bound) {
    nextBtn.addEventListener('click', () => {
      if (clientWizardState.step < 6) {
        if (clientWizardState.step === 2 && clientWizardState.mode === 'external') {
          const externalName = (clientWizardState.externalName || '').trim();
          if (!externalName) {
            showToast('Ingresa el nombre del cliente externo.', 'error');
            return;
          }
          applyWizardExternalClientSelection(externalName);
        }
        setClientWizardStep(clientWizardState.step + 1);
      }
    });
    nextBtn.dataset.bound = 'true';
  }
  const confirmBtn = document.getElementById('clientWizardConfirm');
  if (confirmBtn && !confirmBtn.dataset.bound) {
    confirmBtn.addEventListener('click', () => {
      if (clientWizardState.mode === 'external') {
        const externalName = (clientWizardState.externalName || '').trim();
        if (!externalName) {
          showToast('Ingresa el nombre del cliente externo.', 'error');
          return;
        }
        applyWizardExternalClientSelection(externalName);
      }
      applyClientWizardSelections();
      closeClientPicker();
      showToast('Asistente aplicado correctamente.', 'success');
    });
    confirmBtn.dataset.bound = 'true';
  }

  const brandSelect = document.getElementById('clientWizardBrand');
  if (brandSelect && !brandSelect.dataset.bound) {
    brandSelect.addEventListener('change', () => {
      updateWizardModelsForBrand(brandSelect.value);
    });
    brandSelect.dataset.bound = 'true';
  }
  const modelSelect = document.getElementById('clientWizardModel');
  if (modelSelect && !modelSelect.dataset.bound) {
    modelSelect.addEventListener('change', () => {
      const idx = Number(modelSelect.value || 0);
      setWizardVehicleSelection(idx, { syncSelects: false });
    });
    modelSelect.dataset.bound = 'true';
  }

  document.querySelectorAll('[data-trade-in-choice]').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.addEventListener('click', () => {
      const choice = btn.dataset.tradeInChoice === 'yes';
      clientWizardState.tradeIn = choice;
      updateWizardTradeInUI();
      applyWizardTradeInSelection();
    });
    btn.dataset.bound = 'true';
  });

  document.querySelectorAll('[data-price-choice]').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.addEventListener('click', () => {
      const useSystem = btn.dataset.priceChoice === 'yes';
      clientWizardState.useSystemPrice = useSystem;
      if (!useSystem) {
        const basePrice = vehicles[clientWizardState.selectedVehicleIndex]?.basePrice || 0;
        clientWizardState.customPrice = basePrice;
      }
      updateWizardPriceUI();
      applyWizardPriceSelection();
    });
    btn.dataset.bound = 'true';
  });

  const tradeInValueInput = document.getElementById('clientWizardTradeInValue');
  if (tradeInValueInput && !tradeInValueInput.dataset.bound) {
    bindMoneyInput(tradeInValueInput, value => {
      clientWizardState.tradeInValue = value;
      applyWizardTradeInSelection();
    });
    tradeInValueInput.dataset.bound = 'true';
  }
  const customPriceInput = document.getElementById('clientWizardCustomPrice');
  if (customPriceInput && !customPriceInput.dataset.bound) {
    bindMoneyInput(customPriceInput, value => {
      clientWizardState.customPrice = value;
      clientWizardState.useSystemPrice = false;
      updateWizardPriceUI();
      applyWizardPriceSelection();
    });
    customPriceInput.dataset.bound = 'true';
  }
  const externalNameInput = document.getElementById('clientWizardExternalName');
  if (externalNameInput && !externalNameInput.dataset.bound) {
    externalNameInput.addEventListener('input', () => {
      clientWizardState.externalName = externalNameInput.value;
    });
    externalNameInput.dataset.bound = 'true';
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
  initializeClientWizardState();
  updateClientWizardUI();
  showModal(modal);
}

function closeClientPicker() {
  const modal = document.getElementById('clientPickerModal');
  if (!modal) return;
  hideModal(modal);
}

function initializeClientWizardState() {
  const modelIdx = Number(document.getElementById('planModel')?.value || 0);
  const tradeInInput = document.getElementById('tradeInValue');
  const customPriceInput = document.getElementById('customPrice');
  const tradeInValue = parseMoney(tradeInInput?.dataset.raw || tradeInInput?.value || 0);
  const customPrice = parseMoney(customPriceInput?.dataset.raw || customPriceInput?.value || 0);
  const basePrice = vehicles[modelIdx]?.basePrice || 0;
  const useSystemPrice = !customPrice || customPrice === basePrice;
  const isExternal = uiState?.planDraft?.clientSource === 'external';
  const externalName = uiState?.planDraft?.externalName || document.getElementById('clientName')?.value || '';
  clientWizardState = {
    step: 1,
    mode: isExternal ? 'external' : null,
    searchTerm: '',
    selectedClientId: isExternal ? null : (selectedPlanClientId || uiState?.planDraft?.selectedClientId || null),
    externalName: isExternal ? externalName : '',
    selectedVehicleIndex: Number.isFinite(modelIdx) ? modelIdx : 0,
    tradeIn: document.getElementById('tradeIn')?.checked ?? true,
    tradeInValue,
    useSystemPrice,
    customPrice: customPrice || basePrice
  };
  hydrateWizardInputsFromState();
  updateWizardModelsForBrand(normalizeBrand(vehicles[clientWizardState.selectedVehicleIndex]?.brand || DEFAULT_BRAND), { silent: true });
  renderClientWizardMode();
}

function hydrateWizardInputsFromState() {
  const tradeInInput = document.getElementById('clientWizardTradeInValue');
  if (tradeInInput) setMoneyValue(tradeInInput, clientWizardState.tradeInValue || 0);
  const customPriceInput = document.getElementById('clientWizardCustomPrice');
  if (customPriceInput) setMoneyValue(customPriceInput, clientWizardState.customPrice || 0);
  const externalNameInput = document.getElementById('clientWizardExternalName');
  if (externalNameInput) externalNameInput.value = clientWizardState.externalName || '';
}

function setClientWizardStep(step) {
  clientWizardState.previousStep = clientWizardState.step;
  clientWizardState.step = Math.min(Math.max(step, 1), 6);
  updateClientWizardUI();
}

function updateClientWizardUI() {
  const track = document.getElementById('clientWizardTrack');
  const subtitle = document.getElementById('clientWizardSubtitle');
  const nextBtn = document.getElementById('clientWizardNext');
  const confirmBtn = document.getElementById('clientWizardConfirm');
  const backBtn = document.getElementById('clientWizardBack');
  
  // Ocultar todos los paneles y mostrar solo el actual
  document.querySelectorAll('.wizard-panel').forEach((panel, index) => {
    const panelStep = Number(panel.dataset.step);
    panel.classList.remove('enter-forward', 'enter-backward');
    panel.style.display = panelStep === clientWizardState.step ? 'flex' : 'none';
    if (panelStep === clientWizardState.step) {
      const prevStep = clientWizardState.previousStep;
      let direction = 'enter-forward';
      if (Number.isFinite(prevStep)) {
        direction = clientWizardState.step > prevStep ? 'enter-forward' : 'enter-backward';
      }
      panel.classList.add(direction);
    }
  });
  
  if (subtitle) {
    const subtitles = {
      1: 'Elige cómo deseas buscar al cliente.',
      2: 'Selecciona el cliente que deseas aplicar.',
      3: 'Define el modelo y revisa el plan sugerido.',
      4: 'Configura la llave x llave y su valor.',
      5: 'Confirma el valor del vehículo.',
      6: 'Revisa todo antes de continuar.'
    };
    let text = subtitles[clientWizardState.step] || '';
    if (clientWizardState.step === 2 && clientWizardState.mode === 'external') {
      text = 'Ingresa el nombre del cliente externo.';
    }
    subtitle.textContent = text;
  }
  document.querySelectorAll('.wizard-progress-step').forEach(stepEl => {
    const stepValue = Number(stepEl.dataset.step);
    stepEl.classList.toggle('active', stepValue === clientWizardState.step);
    stepEl.classList.toggle('complete', stepValue < clientWizardState.step);
  });
  if (backBtn) backBtn.style.visibility = clientWizardState.step > 1 ? 'visible' : 'hidden';
  if (nextBtn) {
    const allowNext = [3, 4, 5].includes(clientWizardState.step) || (clientWizardState.step === 2 && clientWizardState.mode === 'external');
    nextBtn.style.display = allowNext ? '' : 'none';
  }
  if (confirmBtn) confirmBtn.style.display = clientWizardState.step === 6 ? '' : 'none';
  updateWizardTradeInUI();
  updateWizardPriceUI();
  updateWizardPlanCard();
  if (clientWizardState.step === 6) {
    renderWizardSummary();
  }
}

function renderClientWizardMode() {
  const mode = clientWizardState.mode || 'search';
  if (!clientWizardState.mode) clientWizardState.mode = mode;
  const title = document.getElementById('clientWizardModeTitle');
  const subtitle = document.getElementById('clientWizardModeSubtitle');
  const searchSection = document.getElementById('clientWizardSearchSection');
  const externalSection = document.getElementById('clientWizardExternalSection');
  const status = document.getElementById('clientWizardSearchStatus');
  document.querySelectorAll('[data-client-wizard-choice]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.clientWizardChoice === mode);
  });
  if (title) {
    title.textContent = mode === 'all'
      ? 'Listado completo de clientes'
      : (mode === 'external' ? 'Cotización externa' : 'Búsqueda por nombre');
  }
  if (subtitle) {
    subtitle.textContent = mode === 'all'
      ? 'Explora los contactos importados ordenados alfabéticamente.'
      : (mode === 'external'
        ? 'Ingresa el nombre del cliente que quieres utilizar.'
        : 'Escribe el nombre del cliente a buscar y presiona Buscar.');
  }
  if (searchSection) searchSection.style.display = mode === 'search' ? 'flex' : 'none';
  if (externalSection) externalSection.style.display = mode === 'external' ? 'flex' : 'none';
  const externalInput = document.getElementById('clientWizardExternalName');
  if (externalInput && mode === 'external') {
    externalInput.value = clientWizardState.externalName || '';
  }
  if (status) {
    status.textContent = mode === 'external'
      ? 'Este cliente será tratado como externo.'
      : 'Selecciona un cliente para continuar.';
  }

  const list = document.getElementById('clientWizardList');
  if (!list) return;
  list.style.display = mode === 'external' ? 'none' : 'grid';
  if (mode === 'external') {
    list.innerHTML = '';
    clientWizardState.selectedClientId = null;
    return;
  }
  if (!managerClients.length) {
    list.innerHTML = '<p class="muted">No hay clientes importados.</p>';
    return;
  }
  if (mode === 'all') {
    const sorted = [...managerClients].sort((a, b) => (a.name || '').localeCompare(b.name || '', 'es', { sensitivity: 'base' }));
    renderClientWizardList(sorted);
  } else {
    list.innerHTML = '';
  }
}

function runClientWizardSearch() {
  const input = document.getElementById('clientWizardSearchInput');
  const status = document.getElementById('clientWizardSearchStatus');
  const query = (input?.value || '').trim().toLowerCase();
  if (!query) {
    if (status) status.textContent = 'Ingresa un nombre para comenzar la búsqueda.';
    renderClientWizardList([]);
    return;
  }
  if (status) status.textContent = 'Procesando operación...';
  setTimeout(() => {
    const filtered = managerClients.filter(c => (c.name || '').toLowerCase().includes(query));
    if (status) {
      status.textContent = `Se han encontrado ${filtered.length} resultados:`;
    }
    renderClientWizardList(filtered);
  }, 180);
}

function renderClientWizardList(list = []) {
  const container = document.getElementById('clientWizardList');
  if (!container) return;
  if (!list.length) {
    container.innerHTML = '<p class="muted">No hay resultados disponibles.</p>';
    return;
  }
  container.innerHTML = list.map(client => buildClientWizardCard(client)).join('');
  container.querySelectorAll('[data-wizard-client]').forEach(card => {
    if (card.dataset.bound) return;
    card.addEventListener('click', () => {
      selectClientForWizard(card.dataset.wizardClient);
    });
    card.dataset.bound = 'true';
  });
}

function buildClientWizardCard(client) {
  const name = client.name || 'Sin nombre';
  const model = client.model || 'Sin modelo';
  const phone = normalizePhone(client.phone);
  const phoneLabel = phone ? formatPhoneDisplay(phone) : 'Sin teléfono';
  const location = [client.city, client.province].filter(Boolean).join(', ');
  const doc = client.document || client.cuit || '';
  const date = formatDateForDisplay(client.birthDate || client.purchaseDate || '');
  const pill = doc ? `Doc: ${doc}` : 'Cliente';
  const selectedClass = client.id === clientWizardState.selectedClientId ? ' selected' : '';
  return `
    <div class="wizard-client-card${selectedClass}" data-wizard-client="${client.id}">
      <div class="wizard-client-head">
        <div>
          <strong>${name}</strong>
          <p class="muted tiny">${model}</p>
        </div>
        <span class="wizard-client-pill">${pill}</span>
      </div>
      <div class="wizard-client-meta">
        <span><i class='bx bx-phone'></i>${phoneLabel}</span>
        <span><i class='bx bx-map'></i>${location || 'Sin ubicación'}</span>
        <span><i class='bx bx-calendar'></i>${date || 'Sin fecha registrada'}</span>
      </div>
    </div>
  `;
}

function selectClientForWizard(id) {
  const client = managerClients.find(c => c.id === id);
  if (!client) return;
  clientWizardState.selectedClientId = id;
  applyWizardClientSelection(client);
  const suggestedIndex = resolveWizardVehicleIndexFromClient(client);
  setWizardVehicleSelection(suggestedIndex, { syncSelects: true });
  setClientWizardStep(3);
}

function applyWizardClientSelection(client) {
  selectedPlanClientId = client.id;
  const input = document.getElementById('clientName');
  if (input) input.value = client.name || '';
  uiState.planDraft.clientName = client.name || '';
  uiState.planDraft.selectedClientId = client.id;
  uiState.planDraft.clientSource = 'internal';
  uiState.planDraft.externalName = '';
  clientWizardState.externalName = '';
  refreshClientSelectionHint(client);
  updatePlanClientNameLock();
  persist();
}

function applyWizardExternalClientSelection(name) {
  const trimmed = (name || '').trim();
  selectedPlanClientId = null;
  clientWizardState.selectedClientId = null;
  clientWizardState.externalName = trimmed;
  uiState.planDraft.selectedClientId = null;
  uiState.planDraft.clientSource = 'external';
  uiState.planDraft.externalName = trimmed;
  uiState.planDraft.clientName = trimmed;
  const input = document.getElementById('clientName');
  if (input) input.value = trimmed;
  refreshClientSelectionHint();
  updatePlanClientNameLock();
  persist();
}

function resolveWizardVehicleIndexFromClient(client) {
  const ranking = rankVehiclesForModel(client?.model || '', vehicles);
  const selection = ranking.filter(opt => opt.score > 0);
  return selection[0]?.index ?? 0;
}

function updateWizardModelsForBrand(brand, { silent = false } = {}) {
  const brandSelect = document.getElementById('clientWizardBrand');
  const modelSelect = document.getElementById('clientWizardModel');
  if (!brandSelect || !modelSelect) return;
  brandSelect.innerHTML = buildWizardBrandOptions();
  const normalizedBrand = normalizeBrand(brand || brandSelect.value || DEFAULT_BRAND);
  brandSelect.value = normalizedBrand;
  const models = vehicles
    .map((vehicle, index) => ({ ...vehicle, index }))
    .filter(vehicle => normalizeBrand(vehicle.brand) === normalizedBrand)
    .sort((a, b) => (a.name || '').localeCompare(b.name || '', 'es', { sensitivity: 'base' }));
  modelSelect.innerHTML = models.map(model => `<option value="${model.index}">${model.name}</option>`).join('');
  const currentIndex = models.find(m => m.index === clientWizardState.selectedVehicleIndex)?.index ?? models[0]?.index ?? 0;
  modelSelect.value = currentIndex;
  if (!silent) {
    setWizardVehicleSelection(Number(modelSelect.value || 0), { syncSelects: false });
  } else {
    clientWizardState.selectedVehicleIndex = Number(modelSelect.value || 0);
    updateWizardPlanCard();
  }
}

function buildWizardBrandOptions() {
  const brands = Array.from(new Set(vehicles.map(vehicle => normalizeBrand(vehicle.brand)).filter(Boolean)));
  const normalizedDefaults = BRANDS.map(brand => normalizeBrand(brand));
  const ordered = [
    ...BRANDS.filter(b => brands.includes(normalizeBrand(b))).map(b => normalizeBrand(b)),
    ...brands.filter(b => !normalizedDefaults.includes(b))
  ];
  return ordered.map(brand => `<option value="${brand}">${brand}</option>`).join('');
}

function setWizardVehicleSelection(index, { syncSelects = true } = {}) {
  clientWizardState.selectedVehicleIndex = Number.isFinite(Number(index)) ? Number(index) : 0;
  const vehicle = vehicles[clientWizardState.selectedVehicleIndex] || vehicles[0];
  if (!vehicle) return;
  if (syncSelects) {
    const brandSelect = document.getElementById('clientWizardBrand');
    const modelSelect = document.getElementById('clientWizardModel');
    if (brandSelect) brandSelect.value = normalizeBrand(vehicle.brand);
    if (modelSelect) modelSelect.value = clientWizardState.selectedVehicleIndex;
  }
  applyWizardVehicleSelection();
  updateWizardPlanCard();
}

function applyWizardVehicleSelection() {
  const idx = clientWizardState.selectedVehicleIndex;
  const planSelect = document.getElementById('planModel');
  if (planSelect) planSelect.value = vehicles[idx] ? idx : 0;
  applyPlanDefaultsForModel(Number(planSelect.value || 0), { resetManual: true });
  applyReservationDefaultsForModel(Number(planSelect.value || 0), { resetManual: true });
  applyCustomPriceDefaultForModel(Number(planSelect.value || 0), { resetManual: true });
  updateIntegrationDetails(Number(planSelect.value || 0));
  updatePlanSummary();
}

function updateWizardPlanCard() {
  const vehicle = vehicles[clientWizardState.selectedVehicleIndex] || vehicles[0];
  const planCard = document.getElementById('clientWizardPlanCard');
  const planTitle = document.getElementById('clientWizardPlanTitle');
  const planBadge = document.getElementById('clientWizardPlanBadge');
  const planDetails = document.getElementById('clientWizardPlanDetails');
  if (!vehicle || !planDetails) return;
  const planType = getPlanTypeForVehicle(vehicle);
  const maxInstallments = resolveTotalInstallments(planType, vehicle?.planProfile?.planType, vehicle?.planProfile?.maxInstallments);
  const planLabelValue = resolveVehiclePlanLabel(vehicle, planType);
  const allocationModeLabel = formatAllocationMode(vehicle?.withdrawal?.mode || 'sorteo_licitacion');
  const brandColor = getBrandColor(vehicle.brand);
  if (planTitle) planTitle.textContent = planLabelValue || 'Plan sugerido';
  if (planBadge) planBadge.textContent = planLabel(planType);
  if (planCard) {
    planCard.classList.add('active');
    planCard.style.borderColor = brandColor;
  }
  if (planBadge) {
    planBadge.style.color = brandColor;
    planBadge.style.borderColor = `${brandColor}66`;
  }
  planDetails.innerHTML = [
    { label: 'Marca', value: normalizeBrand(vehicle.brand) },
    { label: 'Modelo', value: vehicle.name || '-' },
    { label: 'Tipo de Plan', value: planLabelValue || planLabel(planType) },
    { label: 'Cuotas máximas', value: `${maxInstallments} cuotas` },
    { label: 'Modalidad de adjudicación', value: allocationModeLabel },
    { label: 'Precio nominal del coche', value: currency.format(vehicle.basePrice || 0) }
  ].map(item => `
    <div class="wizard-plan-item">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
    </div>
  `).join('');

  const priceInfo = document.getElementById('clientWizardPriceInfo');
  if (priceInfo) {
    const priceLabel = getMostRecentPriceTab()?.label || getMostRecentPriceTab()?.month || 'Precios actuales';
    const brandName = normalizeBrand(vehicle.brand);
    const modelName = vehicle.name || '-';
    priceInfo.innerHTML = `El valor nominal del coche en sistema (según precios actualizados de ${priceLabel}) es <strong>${currency.format(vehicle.basePrice || 0)}.</strong><br><span class="muted">Cotizando: ${brandName} ${modelName}</span>`;
  }
  if (clientWizardState.useSystemPrice) {
    applyWizardPriceSelection();
  }
}

function updateWizardTradeInUI() {
  const field = document.getElementById('clientWizardTradeInField');
  if (field) field.style.display = clientWizardState.tradeIn ? '' : 'none';
  document.querySelectorAll('[data-trade-in-choice]').forEach(btn => {
    const isYes = btn.dataset.tradeInChoice === 'yes';
    btn.classList.toggle('active', isYes === clientWizardState.tradeIn);
  });
}

function applyWizardTradeInSelection() {
  const tradeInToggle = document.getElementById('tradeIn');
  const tradeInInput = document.getElementById('tradeInValue');
  if (tradeInToggle) tradeInToggle.checked = clientWizardState.tradeIn;
  if (tradeInInput) setMoneyValue(tradeInInput, clientWizardState.tradeInValue || 0);
  updatePlanSummary();
}

function updateWizardPriceUI() {
  const field = document.getElementById('clientWizardCustomPriceField');
  if (field) field.style.display = clientWizardState.useSystemPrice ? 'none' : '';
  document.querySelectorAll('[data-price-choice]').forEach(btn => {
    const isYes = btn.dataset.priceChoice === 'yes';
    btn.classList.toggle('active', isYes === clientWizardState.useSystemPrice);
  });
}

function applyWizardPriceSelection() {
  const customPriceInput = document.getElementById('customPrice');
  const modelIdx = clientWizardState.selectedVehicleIndex;
  const basePrice = vehicles[modelIdx]?.basePrice || 0;
  if (clientWizardState.useSystemPrice) {
    clientWizardState.customPrice = basePrice;
    applyCustomPriceDefaultForModel(modelIdx, { resetManual: true });
  } else {
    if (customPriceInput) {
      setMoneyValue(customPriceInput, clientWizardState.customPrice || basePrice);
      customPriceInput.dataset.manual = 'true';
    }
  }
  updatePlanSummary();
}

function renderWizardSummary() {
  const container = document.getElementById('clientWizardSummary');
  if (!container) return;
  const isExternal = clientWizardState.mode === 'external' || uiState?.planDraft?.clientSource === 'external';
  const client = isExternal ? null : managerClients.find(c => c.id === clientWizardState.selectedClientId);
  const externalName = clientWizardState.externalName || uiState?.planDraft?.externalName || document.getElementById('clientName')?.value || '';
  const vehicle = vehicles[clientWizardState.selectedVehicleIndex] || vehicles[0];
  const planType = getPlanTypeForVehicle(vehicle);
  const planLabelValue = resolveVehiclePlanLabel(vehicle, planType);
  const tradeInValue = clientWizardState.tradeIn ? currency.format(clientWizardState.tradeInValue || 0) : 'No aplica';
  const priceValue = clientWizardState.useSystemPrice
    ? currency.format(vehicle?.basePrice || 0)
    : currency.format(clientWizardState.customPrice || 0);
  container.innerHTML = `
    <div class="wizard-summary-card">
      <h4>Cliente seleccionado</h4>
      <div class="wizard-summary-grid">
        <div class="wizard-summary-row"><span>Cliente</span><strong>${isExternal ? externalName || 'Sin nombre' : (client?.name || 'Sin seleccionar')}</strong></div>
        <div class="wizard-summary-row"><span>Teléfono</span><strong>${isExternal ? 'Sin teléfono' : (formatPhoneDisplay(client?.phone) || 'Sin teléfono')}</strong></div>
        <div class="wizard-summary-row"><span>Modelo actual</span><strong>${isExternal ? 'Sin modelo' : (client?.model || 'Sin modelo')}</strong></div>
      </div>
    </div>
    <div class="wizard-summary-card">
      <h4>Auto a cotizar</h4>
      <div class="wizard-summary-grid">
        <div class="wizard-summary-row"><span>Marca</span><strong>${normalizeBrand(vehicle?.brand || '')}</strong></div>
        <div class="wizard-summary-row"><span>Modelo</span><strong>${vehicle?.name || '-'}</strong></div>
        <div class="wizard-summary-row"><span>Tipo de plan</span><strong>${planLabelValue || planLabel(planType)}</strong></div>
      </div>
    </div>
    <div class="wizard-summary-card">
      <h4>Condiciones</h4>
      <div class="wizard-summary-grid">
        <div class="wizard-summary-row"><span>Llave x llave</span><strong>${clientWizardState.tradeIn ? 'Sí' : 'No'}</strong></div>
        <div class="wizard-summary-row"><span>Valor llave x llave</span><strong>${tradeInValue}</strong></div>
        <div class="wizard-summary-row"><span>Valor del coche</span><strong>${priceValue}</strong></div>
      </div>
    </div>
  `;
}

function applyClientWizardSelections() {
  if (clientWizardState.mode === 'external') {
    applyWizardExternalClientSelection(clientWizardState.externalName || '');
  } else {
    const client = managerClients.find(c => c.id === clientWizardState.selectedClientId);
    if (client) applyWizardClientSelection(client);
  }
  applyWizardVehicleSelection();
  applyWizardTradeInSelection();
  applyWizardPriceSelection();
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
  showModal(modal);
}

function closeQuoteModal() {
  const modal = document.getElementById('quoteModal');
  if (!modal) return;
  hideModal(modal);
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

function closeClientVehicleModal() {
  const modal = document.getElementById('clientVehicleModal');
  if (!modal) return;
  hideModal(modal);
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

function buildPlanModelOptions() {
  const entries = vehicles.map((vehicle, index) => ({ vehicle, index }));
  const grouped = entries.reduce((acc, entry) => {
    const brand = normalizeBrand(entry.vehicle.brand);
    if (!acc[brand]) acc[brand] = [];
    acc[brand].push(entry);
    return acc;
  }, {});
  const brandOrder = Object.keys(grouped).sort((a, b) => {
    const aIndex = BRANDS.indexOf(a);
    const bIndex = BRANDS.indexOf(b);
    if (aIndex !== -1 || bIndex !== -1) {
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    }
    return a.localeCompare(b);
  });
  return brandOrder.map(brand => {
    const brandColor = getBrandColor(brand);
    const options = grouped[brand]
      .map(({ vehicle, index }) => {
        const allocationMode = vehicle?.withdrawal?.mode || 'sorteo_licitacion';
        const noKeyIndicator = allocationMode === 'sorteo_licitacion' ? ' ★ ' : '';
        return `<option value="${index}" style="color:${brandColor};">${vehicle.name}${noKeyIndicator}</option>`;
      })
      .join('');
    return `<optgroup label="${brand}">${options}</optgroup>`;
  }).join('');
}

function refreshClientSelectionHint(client) {
  const hint = document.getElementById('selectedClientHint');
  if (!hint) return;
  if (isExternalClientSelection()) {
    const externalName = uiState?.planDraft?.externalName || document.getElementById('clientName')?.value || '';
    hint.textContent = externalName ? `Es un Cliente externo` : 'Cliente externo sin nombre asignado.';
    return;
  }
  const applied = client || managerClients.find(c => c.id === selectedPlanClientId);
  if (applied) {
    const phone = applied.phone ? ` · Tel: ${normalizePhone(applied.phone)}` : '';
    hint.textContent = `Usando datos de ${applied.name}${phone}`;
    return;
  }
  hint.textContent = 'Puedes escribir los datos o aplicar uno importado.';
}

function isExternalClientSelection() {
  return uiState?.planDraft?.clientSource === 'external';
}

function updatePlanClientNameLock() {
  const input = document.getElementById('clientName');
  if (!input) return;
  const hasInternal = !!selectedPlanClientId && !isExternalClientSelection();
  input.disabled = hasInternal;
}

function renderPlanForm() {
  const select = document.getElementById('planModel');
  const currentValue = select.value;
  select.innerHTML = buildPlanModelOptions();
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

function renderQuoteGeneratorPayments(draft) {
  const rows = document.getElementById('paymentRows');
  if (!rows) return;
  rows.innerHTML = (draft.payments || []).map((row, index) => `
    <div class="payment-row">
      <div class="form-grid two">
        <div class="field">
          <label>Detalle</label>
          <input id="quotePaymentLabel-${index}" type="text" value="${row.label || ''}" data-payment-field="label" data-payment-index="${index}" placeholder="Ej: Cuota 2 - 12" />
        </div>
        <div class="field">
          <label>Monto</label>
          <div class="money-field">
            <span class="prefix">$</span>
            <input id="quotePaymentAmount-${index}" class="money" type="text" inputmode="numeric" data-payment-field="amount" data-payment-index="${index}" value="${row.amount ? number.format(row.amount) : ''}" />
          </div>
        </div>
      </div>
      <div class="field">
        <label>Detalle extra</label>
        <input id="quotePaymentDetail-${index}" type="text" value="${row.detail || ''}" data-payment-field="detail" data-payment-index="${index}" placeholder="Ej: 3x $120.000" />
      </div>
      <div class="row-actions">
        <button class="ghost-btn mini danger" type="button" data-remove-payment="${index}"><i class='bx bx-trash'></i>Quitar</button>
      </div>
    </div>
  `).join('');

  rows.querySelectorAll('input.money').forEach(input => {
    if (input.dataset.bound) return;
    const index = Number(input.dataset.paymentIndex);
    const field = input.dataset.paymentField || 'amount';
    bindMoneyInput(input, value => updateQuoteGeneratorPayment(index, field, value));
    input.dataset.bound = 'true';
  });
}

function renderQuoteGeneratorBrandSuggestions() {
  const datalist = document.getElementById('quoteBrandSuggestions');
  if (!datalist) return;
  const brands = getUniqueBrands(vehicles);
  datalist.innerHTML = brands.map(brand => `<option value="${brand}"></option>`).join('');
}

function updateNewVehicleModelOptions(brand, selectedModel = '') {
  const modelSelect = document.getElementById('newVehicleModelSelect');
  if (!modelSelect) return [];
  const models = getVehicleModelsByBrand(brand);
  const mergedModels = selectedModel && !models.includes(selectedModel)
    ? [selectedModel, ...models]
    : models;
  modelSelect.innerHTML = mergedModels.map(model => `<option value="${model}">${model}</option>`).join('');
  modelSelect.value = mergedModels.includes(selectedModel) && selectedModel
    ? selectedModel
    : (mergedModels[0] || '');
  return mergedModels;
}

function renderQuoteGeneratorNewVehicleSelectors() {
  const brandSelect = document.getElementById('newVehicleBrandSelect');
  const modelSelect = document.getElementById('newVehicleModelSelect');
  const toggle = document.getElementById('newVehicleCustomToggle');
  const autoGroup = document.querySelector('.new-vehicle-auto');
  const manualGroup = document.querySelector('.new-vehicle-manual');
  if (!brandSelect || !modelSelect || !toggle) return;
  const draft = getQuoteGeneratorDraft();
  const currentBrand = normalizeBrand(draft.newVehicle?.brand || '');
  const currentModel = (draft.newVehicle?.model || '').trim();
  const brands = getUniqueBrands(vehicles);
  const brandOptions = currentBrand && !brands.includes(currentBrand)
    ? [currentBrand, ...brands]
    : brands;
  brandSelect.innerHTML = brandOptions.map(brand => `<option value="${brand}">${brand}</option>`).join('');
  brandSelect.value = brandOptions.includes(currentBrand) && currentBrand ? currentBrand : (brandOptions[0] || '');
  const models = updateNewVehicleModelOptions(brandSelect.value, currentModel);
  modelSelect.value = models.includes(currentModel) && currentModel ? currentModel : (models[0] || '');
  const customMode = uiState.quoteGenerator?.newVehicleCustom ?? false;
  toggle.checked = customMode;
  if (autoGroup) autoGroup.classList.toggle('is-hidden', customMode);
  if (manualGroup) manualGroup.classList.toggle('is-hidden', !customMode);
  if (!customMode) {
    if (!draft.newVehicle?.brand && brandSelect.value) {
      updateQuoteGeneratorField('newVehicle.brand', brandSelect.value);
    }
    if (!draft.newVehicle?.model && modelSelect.value) {
      updateQuoteGeneratorField('newVehicle.model', modelSelect.value);
    }
  }
  if (!toggle.dataset.bound) {
    toggle.addEventListener('change', () => {
      uiState.quoteGenerator.newVehicleCustom = toggle.checked;
      persist();
      renderQuoteGeneratorForm();
    });
    toggle.dataset.bound = 'true';
  }
  if (!brandSelect.dataset.bound) {
    brandSelect.addEventListener('change', () => {
      if (uiState.quoteGenerator?.newVehicleCustom) return;
      const brand = brandSelect.value;
      updateQuoteGeneratorField('newVehicle.brand', brand);
      const updatedModels = updateNewVehicleModelOptions(brand, '');
      if (updatedModels.length) {
        updateQuoteGeneratorField('newVehicle.model', updatedModels[0]);
      }
    });
    brandSelect.dataset.bound = 'true';
  }
  if (!modelSelect.dataset.bound) {
    modelSelect.addEventListener('change', () => {
      if (uiState.quoteGenerator?.newVehicleCustom) return;
      updateQuoteGeneratorField('newVehicle.model', modelSelect.value);
    });
    modelSelect.dataset.bound = 'true';
  }
}

function setQuoteGeneratorView(view) {
  ensureQuoteGeneratorState();
  uiState.quoteGenerator.view = view;
  updateQuoteGeneratorView();
}

function updateQuoteGeneratorView() {
  const panel = document.getElementById('quoteGenerator');
  const hub = document.getElementById('quoteGeneratorHub');
  const workspace = document.getElementById('quoteGeneratorWorkspace');
  if (!panel || !hub || !workspace) return;
  const view = uiState.quoteGenerator?.view || 'hub';
  panel.dataset.view = view;
  hub.classList.toggle('is-hidden', view !== 'hub');
  workspace.classList.toggle('is-hidden', view !== 'workspace');
}

function renderQuoteGeneratorHub() {
  const list = document.getElementById('quoteGeneratorList');
  const emptyState = document.getElementById('quoteGeneratorEmpty');
  const searchInput = document.getElementById('quoteGeneratorSearchInput');
  const filterChip = document.getElementById('quoteGeneratorClientFilter');
  if (!list || !emptyState) return;
  ensureQuoteGeneratorState();
  if (searchInput && searchInput.value !== uiState.quoteGenerator.hubSearchInput) {
    searchInput.value = uiState.quoteGenerator.hubSearchInput;
  }

  const searchTerm = normalizeSearchTerm(uiState.quoteGenerator.hubSearch || '');
  const filterClientId = uiState.quoteGenerator.clientFilterId || null;
  const filtered = generatedQuotes.filter(item => {
    if (filterClientId && item.clientId !== filterClientId) return false;
    if (!searchTerm) return true;
    const info = resolveQuoteClientInfo(item);
    const clientName = normalizeSearchTerm(info.name || '');
    return clientName.includes(searchTerm);
  });

  if (filterChip) {
    const client = filterClientId ? managerClients.find(item => item.id === filterClientId) : null;
    const fallbackEntry = filterClientId ? generatedQuotes.find(item => item.clientId === filterClientId) : null;
    const fallbackInfo = fallbackEntry ? resolveQuoteClientInfo(fallbackEntry) : null;
    const label = client?.name || fallbackInfo?.name || '';
    if (filterClientId && label) {
      filterChip.classList.remove('hidden');
      filterChip.innerHTML = `
        <span><i class='bx bx-user'></i>Mostrando cotizaciones de: <strong>${label}</strong></span>
        <button class="ghost-btn mini" type="button" data-clear-client-filter><i class='bx bx-x'></i>Quitar filtro</button>
      `;
    } else {
      filterChip.classList.add('hidden');
      filterChip.innerHTML = '';
    }
  }

  if (!filtered.length) {
    list.innerHTML = '';
    emptyState.classList.remove('is-hidden');
    return;
  }
  emptyState.classList.add('is-hidden');
  const grouped = filtered.reduce((acc, item) => {
    const key = item.clientId || 'unassigned';
    if (!acc[key]) {
      acc[key] = { key, info: resolveQuoteClientInfo(item), items: [] };
    }
    acc[key].items.push(item);
    return acc;
  }, {});

  const groups = Object.values(grouped).sort((a, b) => {
    if (a.key === 'unassigned') return 1;
    if (b.key === 'unassigned') return -1;
    return (a.info.name || '').localeCompare(b.info.name || '', 'es', { sensitivity: 'base' });
  });

  list.innerHTML = groups.map(group => {
    const info = group.info || {};
    const groupName = group.key === 'unassigned' ? 'Sin clasificar' : (info.name || 'Cliente');
    const location = [info.city, info.province].filter(Boolean).join(' · ');
    const docLabel = info.document ? `Doc: ${info.document}` : 'Sin documento';
    const phoneLabel = formatPhoneDisplay(info.phone || '') || info.phone || 'Sin teléfono';
    const modelLabel = info.model ? `${info.brand || ''} ${info.model}`.trim() : 'Sin modelo';
    const clientMeta = [
      `<span><i class='bx bx-phone'></i>${phoneLabel}</span>`,
      `<span><i class='bx bx-id-card'></i>${docLabel}</span>`,
      `<span><i class='bx bx-car'></i>${modelLabel}</span>`,
      location ? `<span><i class='bx bx-map'></i>${location}</span>` : ''
    ].filter(Boolean).join('');
    const items = group.items.sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime());
    return `
      <div class="quote-hub-group" data-client-group="${group.key}">
        <div class="quote-hub-group-head">
          <div>
            <p class="eyebrow">${group.key === 'unassigned' ? 'Sin cliente asignado' : 'Cliente'}</p>
            <h4>${groupName}</h4>
            <div class="quote-hub-client-meta">${clientMeta}</div>
          </div>
          <div class="quote-hub-group-count">
            <span>${items.length} cotizaciones</span>
          </div>
        </div>
        <div class="quote-hub-group-list">
          ${items.map(item => {
            const alias = (item.alias || '').trim();
            const displayName = resolveQuoteGeneratorDisplayName(item);
            const updatedAt = item.updatedAt
              ? new Date(item.updatedAt).toLocaleString('es-AR', { dateStyle: 'medium', timeStyle: 'short' })
              : '';
            const quoteNumber = item.draft?.meta?.quoteNumber ? `#${item.draft.meta.quoteNumber}` : '';
            const quoteDate = item.draft?.meta?.quoteDate ? `Emitida ${item.draft.meta.quoteDate}` : '';
            const status = resolveQuoteExpiryStatus(item);
            const isActive = item.id === uiState.quoteGenerator?.selectedId;
            const metaBits = [
              quoteNumber ? `Cotización ${quoteNumber}` : '',
              quoteDate,
              updatedAt ? `Actualizado ${updatedAt}` : ''
            ].filter(Boolean);
            return `
              <div class="quote-hub-item${isActive ? ' active' : ''}" data-quote-id="${item.id}">
                <div class="quote-hub-main">
                  <div class="quote-hub-title">
                    <input class="quote-hub-alias" data-quote-alias="${item.id}" value="${alias}" placeholder="${displayName}" />
                    <div class="quote-hub-meta">
                      ${metaBits.map(text => `<span>${text}</span>`).join('')}
                    </div>
                    <div class="quote-hub-status" data-tone="${status.tone}">
                      <span class="quote-status-pill">${status.label}</span>
                      <span class="quote-status-detail">${status.detail}</span>
                    </div>
                  </div>
                </div>
                <div class="quote-hub-actions">
                  <button class="secondary-btn mini" type="button" data-quote-open="${item.id}"><i class='bx bx-folder-open'></i>Abrir esta cotización</button>
                  <button class="ghost-btn mini" type="button" data-quote-reassign="${item.id}"><i class='bx bx-transfer-alt'></i>Reasignar cliente</button>
                  <button class="ghost-btn mini" type="button" data-quote-duplicate="${item.id}"><i class='bx bx-copy'></i>Duplicar esta Cotización</button>
                  <button class="ghost-btn mini danger" type="button" data-quote-delete="${item.id}"><i class='bx bx-trash'></i>Eliminar</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderQuoteGeneratorSavedList() {
  const select = document.getElementById('quoteGeneratorSavedList');
  if (!select) return;
  if (!generatedQuotes.length) {
    select.innerHTML = '<option value="">Sin cotizaciones guardadas</option>';
    select.value = '';
    return;
  }
  select.innerHTML = generatedQuotes.map(item => `
    <option value="${item.id}">${resolveQuoteGeneratorDisplayName(item)}</option>
  `).join('');
  select.value = uiState.quoteGenerator?.selectedId || '';
}

function renderQuoteNavigation() {
  const group = document.getElementById('myQuotesNav');
  const list = document.getElementById('myQuotesList');
  if (!group || !list) return;
  if (!generatedQuotes.length) {
    group.classList.add('is-hidden');
    list.innerHTML = '';
    return;
  }
  group.classList.remove('is-hidden');
  list.innerHTML = generatedQuotes.map(item => {
    const isActive = item.id === uiState.quoteGenerator?.selectedId;
    const updatedAt = item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('es-AR') : '';
    return `
      <button class="nav-sublink${isActive ? ' active' : ''}" type="button" data-quote-id="${item.id}">
        <span class="nav-sublink-title">${item.name || 'Cotización'}</span>
        <span class="nav-sublink-meta">${updatedAt}</span>
      </button>
    `;
  }).join('');
}

function renderQuoteGeneratorForm() {
  ensureQuoteGeneratorState();
  let draft = getQuoteGeneratorDraft();
  const bonifiedSnapshot = JSON.stringify(draft.bonifiedPayments || {});
  const nextDraft = JSON.parse(JSON.stringify(draft));
  applyQuoteGeneratorBonifiedDefaults(nextDraft);
  if (JSON.stringify(nextDraft.bonifiedPayments || {}) !== bonifiedSnapshot) {
    commitQuoteGeneratorDraft(nextDraft);
    draft = getQuoteGeneratorDraft();
  }
  document.querySelectorAll('#quoteGeneratorForm [data-quote-field]').forEach(input => {
    const path = input.dataset.quoteField;
    const value = getNestedValue(draft, path);
    if (input.type === 'checkbox') {
      input.checked = Boolean(value);
    } else if (input.classList.contains('money')) {
      setMoneyValue(input, value);
      if (!input.dataset.bound && !path.endsWith('.bonification')) {
        bindMoneyInput(input, newValue => updateQuoteGeneratorField(path, newValue));
        input.dataset.bound = 'true';
      }
    } else {
      const normalizedValue = normalizeQuoteGeneratorFieldValue(path, value ?? '');
      input.value = normalizedValue ?? '';
    }
  });
  document.querySelectorAll('#quoteGeneratorForm [data-visibility-field]').forEach(input => {
    const key = input.dataset.visibilityField;
    input.checked = draft.visibility?.[key] !== false;
  });
  renderQuoteGeneratorPayments(draft);
  renderQuoteGeneratorSavedList();
  renderQuoteNavigation();
  renderQuoteGeneratorBrandSuggestions();
  renderQuoteGeneratorNewVehicleSelectors();
  updateQuoteGeneratorPreview();
}

function applyQuoteGeneratorVisibility(visibility = {}) {
  document.querySelectorAll('#quotePreview [data-quote-visible]').forEach(el => {
    const key = el.dataset.quoteVisible;
    let shouldShow = visibility?.[key] !== false;
    if (key === 'preQuote' && !getQuoteGeneratorDraft()?.preQuote?.enabled) {
      shouldShow = false;
    }
    el.classList.toggle('is-hidden', !shouldShow);
  });
}

function updateQuoteGeneratorPreview() {
  const draft = getQuoteGeneratorDraft();
  const meta = draft.meta || {};
  const client = draft.client || {};
  const vehicle = draft.vehicle || {};
  const newVehicle = draft.newVehicle || {};
  const preQuote = draft.preQuote || {};
  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = formatQuotePreviewValue(value);
  };
  setText('previewQuoteNumber', meta.quoteNumber ? `#${meta.quoteNumber}` : '--------');
  setText('previewQuoteDate', meta.quoteDate || '--/--/----');
  setText('previewQuoteExpiry', meta.quoteExpiry || '--/--/----');
  setText('previewQuoteAdvisor', meta.advisor || '-');
  setText('previewClientName', client.name);
  setText('previewClientDni', formatDniValue(client.dni));
  setText('previewClientCuil', formatCuilValue(client.cuil));
  setText('previewClientCel', formatPhoneValue(client.cel));
  const location = [client.province, client.city].filter(Boolean).join(' - ');
  setText('previewClientLocation', location || '-');
  setText('previewClientPostal', client.postalCode);
  const vehicleTitleEl = document.getElementById('previewVehicleTitle');
  if (vehicleTitleEl) vehicleTitleEl.textContent = 'Vehículo a entregar';
  setText('previewVehicleBrand', vehicle.brand);
  setText('previewVehicleModel', vehicle.model);
  setText('previewVehicleYear', vehicle.year);
  setText('previewVehiclePlate', vehicle.plate);
  setText('previewVehicleKms', vehicle.kms);
  const factoryEl = document.getElementById('previewVehicleFactoryPrice');
  if (factoryEl) factoryEl.textContent = formatQuotePreviewMoney(vehicle.factoryPrice);
  const factoryLabelEl = document.getElementById('previewVehicleFactoryLabel');
  if (factoryLabelEl) {
    const label = (vehicle.factoryPriceLabel || DEFAULT_FACTORY_PRICE_LABEL).trim() || DEFAULT_FACTORY_PRICE_LABEL;
    factoryLabelEl.textContent = `${label}:`;
  }
  setText('previewNewVehicleBrand', newVehicle.brand);
  setText('previewNewVehicleModel', newVehicle.model);
  const preQuoteEl = document.getElementById('previewPreQuote');
  if (preQuoteEl) {
    preQuoteEl.classList.toggle('is-hidden', !preQuote.enabled);
  }
  setText('previewPreQuoteMessage', preQuote.message || DEFAULT_PREQUOTE_MESSAGE);

  const bonifiedContainer = document.getElementById('previewBonifiedPayments');
  if (bonifiedContainer) {
    const bonified = draft.bonifiedPayments || {};
    const bonifiedCards = [
      {
        key: 'one',
        title: 'Opción 1: 1 Pago Bonificado',
        data: bonified.one || {}
      },
      {
        key: 'three',
        title: 'Opción 2: 3 cuotas sin interes',
        data: bonified.three || {}
      }
    ].filter(item => {
      const fakeOriginal = parseMoney(item.data?.fakeOriginal || 0);
      const amount = parseMoney(item.data?.amount || 0);
      const bonification = parseMoney(item.data?.bonification || 0);
      return fakeOriginal > 0 || amount > 0 || bonification > 0;
    });
    bonifiedContainer.innerHTML = bonifiedCards.length ? `
      <div class="bonified-group">
        <div class="bonified-group-title"><strong>Cuota 1</strong></div>
        <div class="bonified-group-grid">
          ${bonifiedCards.map(card => {
            const targets = card.key === 'three'
              ? {
                  card: 'bonifiedThreeAmount',
                  original: 'bonifiedThreeOriginal',
                  bonification: 'bonifiedThreeDiscount',
                  amount: 'bonifiedThreeAmount'
                }
              : {
                  card: 'bonifiedOneAmount',
                  original: 'bonifiedOneOriginal',
                  bonification: 'bonifiedOneDiscount',
                  amount: 'bonifiedOneAmount'
                };
            const totalAmount = parseMoney(card.data.amount || 0);
            const isThreePayments = card.title.includes('3 cuotas');
            const quotaValue = isThreePayments ? totalAmount / 3 : totalAmount;
            const paymentDisplay = isThreePayments 
              ? `<div style="display: flex; flex-direction: column; gap: 4px;"><div>3 cuotas de ${formatQuotePreviewMoney(quotaValue)}</div><div style="font-size: 11px; color: #999;">Total: ${formatQuotePreviewMoney(totalAmount)}</div></div>`
              : formatQuotePreviewMoney(totalAmount);
            return `
              <div class="bonified-card" data-focus-target="${targets.card}" data-focus-tab="quote-tab-payments">
                <h5 data-focus-target="${targets.card}" data-focus-tab="quote-tab-payments">${card.title}</h5>
                <div class="bonified-grid">
                  <div data-focus-target="${targets.original}" data-focus-tab="quote-tab-payments"><span>Valor Original:</span> ${formatQuotePreviewMoney(card.data.fakeOriginal)}</div>
                  ${parseMoney(card.data.bonification || 0) > 0 ? `<div data-focus-target="${targets.bonification}" data-focus-tab="quote-tab-payments"><span>Bonif.:</span> ${formatQuotePreviewMoney(card.data.bonification)}</div>` : ''}
                  <div data-focus-target="${targets.amount}" data-focus-tab="quote-tab-payments"><span>A pagar:</span> ${paymentDisplay}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : '<p class="muted">Sin bonificaciones configuradas.</p>';
  }

  const paymentList = document.getElementById('previewPaymentList');
  if (paymentList) {
    const cuotaPura = draft.cuotaPura || {};
    const rows = [
      ...(draft.payments || []),
      {
        label: 'Cuota pura',
        amount: cuotaPura.amount,
        detail: cuotaPura.detail
      }
    ];
    paymentList.innerHTML = rows.length ? rows.map((row, index) => {
      const isCuotaPura = row.label === 'Cuota pura';
      const focusTarget = isCuotaPura ? 'quoteCuotaPuraAmount' : `quotePaymentAmount-${index}`;
      const focusTab = 'quote-tab-payments';
      return `
      <div class="quote-payment-row" data-focus-target="${focusTarget}" data-focus-tab="${focusTab}">
        <div>
          <strong>${row.label || 'Cuota'}</strong>
          ${row.detail ? `<div class="muted tiny">${row.detail}</div>` : ''}
        </div>
        <span>${formatQuotePreviewMoney(row.amount)}</span>
      </div>
    `;
    }).join('') : '<p class="muted">Sin cuotas cargadas.</p>';
  }

  const notesEl = document.querySelector('#previewNotes p');
  if (notesEl) notesEl.textContent = draft.notes || '';

  const benefitsList = document.getElementById('previewBenefitsList');
  if (benefitsList) {
    const lines = (draft.benefitsText || '').split('\n').map(line => line.trim()).filter(Boolean);
    benefitsList.innerHTML = lines.length ? lines.map(item => `<li>${item}</li>`).join('') : '<li>-</li>';
  }
  const footerEl = document.getElementById('previewFooterText');
  if (footerEl) footerEl.textContent = draft.footerNote || DEFAULT_QUOTE_FOOTER;
  applyQuoteGeneratorVisibility(draft.visibility || {});
}

async function exportQuoteGenerator(format) {
  const preview = document.getElementById('quotePreview');
  if (!preview) {
    showToast('No se pudo generar la exportación.', 'error');
    return;
  }
  if (format === 'png' && !window.html2canvas) {
    showToast('No se encontró la librería para exportar PNG.', 'error');
    return;
  }
  const overlay = document.getElementById('quoteExportOverlay');
  try {
    if (overlay) {
      overlay.classList.remove('hidden');
      await new Promise(resolve => requestAnimationFrame(() => resolve()));
      await new Promise(resolve => setTimeout(resolve, 60));
    }
    const draft = normalizeQuoteGeneratorDraft(getQuoteGeneratorDraft());
    const fileLabel = draft.meta?.quoteNumber || Date.now();
    if (format === 'pdf') {
      if (!window.pdfMake) {
        showToast('No se encontró la librería para exportar PDF.', 'error');
        return;
      }
      const docDefinition = buildQuoteGeneratorPdfDocument(draft);
      window.pdfMake.createPdf(docDefinition).download(`cotizacion-${fileLabel}.pdf`);
      return;
    }

    const scale = 2;
    const canvas = await window.html2canvas(preview, { scale, backgroundColor: '#ffffff' });
    if (format === 'png') {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `cotizacion-${fileLabel}.png`;
      link.click();
      return;
    }
  } catch (err) {
    console.error('Error exportando cotización:', err);
    showToast('No se pudo exportar la cotización.', 'error');
  } finally {
    if (overlay) overlay.classList.add('hidden');
  }
}

function syncBonifiedFormField(draft, key) {
  const input = document.querySelector(`[data-quote-field="bonifiedPayments.${key}.bonification"]`);
  if (!input) return;
  const value = draft?.bonifiedPayments?.[key]?.bonification ?? null;
  setMoneyValue(input, value);
}

function buildQuoteGeneratorPdfDocument(draft) {
  const visibility = draft.visibility || {};
  const isVisible = key => visibility?.[key] !== false;
  const formatValue = value => (value === undefined || value === null || value === '' ? '-' : value);
  const formatMoney = value => {
    if (value === undefined || value === null || value === '') return '-';
    return currency.format(parseMoney(value) || 0);
  };
  const buildInfoGrid = (rows, columns = 3) => {
    if (!rows.length) return null;
    const body = [];
    for (let i = 0; i < rows.length; i += columns) {
      const chunk = rows.slice(i, i + columns);
      const cells = chunk.map(item => (item
        ? {
            stack: [
              { text: `${item[0]}:`, style: 'gridLabel' },
              { text: formatValue(item[1]), style: 'gridValue' }
            ]
          }
        : ''));
      while (cells.length < columns) {
        cells.push('');
      }
      body.push(cells);
    }
    return {
      table: {
        widths: Array(columns).fill('*'),
        body
      },
      layout: {
        hLineWidth: () => 0,
        vLineWidth: () => 0,
        fillColor: () => '#f1f5f9',
        paddingLeft: () => 4,
        paddingRight: () => 4,
        paddingTop: () => 2,
        paddingBottom: () => 2
      },
      margin: [0, 2, 0, 4]
    };
  };
  const wrapSection = (title, bodyItems = []) => ({
    table: {
      widths: ['*'],
      body: [[{
        stack: [{ text: title, style: 'sectionTitle' }, ...bodyItems],
        margin: [8, 6, 8, 6]
      }]]
    },
    layout: {
      hLineWidth: () => 0,
      vLineWidth: () => 0,
      fillColor: () => '#f1f5f9'
    },
    margin: [0, 0, 0, 0]
  });
  const bonified = draft.bonifiedPayments || {};
  const bonifiedCards = [
    { title: 'Opción 1: 1 Pago Bonificado', data: bonified.one || {} },
    { title: 'Opción 2: 3 cuotas sin interes', data: bonified.three || {} }
  ].filter(item => {
    const original = parseMoney(item.data?.fakeOriginal || 0);
    const amount = parseMoney(item.data?.amount || 0);
    const bonification = parseMoney(item.data?.bonification || 0);
    return original > 0 || amount > 0 || bonification > 0;
  });
  const cuotaPura = draft.cuotaPura || {};
  const normalizedPayments = Array.isArray(draft.payments)
    ? draft.payments.filter(row => row && (row.label || row.amount || row.detail))
    : [];
  const paymentRows = [
    ...normalizedPayments,
    ...(cuotaPura.amount || cuotaPura.detail
      ? [
          {
            label: 'Cuota pura',
            amount: cuotaPura.amount,
            detail: cuotaPura.detail
          }
        ]
      : [])
  ];
  const benefits = (draft.benefitsText || '')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);
  const paymentTable = {
    table: {
      headerRows: 1,
      widths: ['*', 'auto'],
      body: [
        [
          { text: 'Detalle', bold: true, color: '#334155' },
          { text: 'Monto', bold: true, color: '#334155', alignment: 'right' }
        ],
        ...paymentRows.map(row => {
          const detailStack = [row.label || 'Cuota'];
          if (row.detail) detailStack.push({ text: row.detail, fontSize: 8, color: '#64748b' });
          return [
            { stack: detailStack },
            { text: formatMoney(row.amount), alignment: 'right' }
          ];
        })
      ]
    },
    layout: 'lightHorizontalLines',
    margin: [0, 2, 0, 4]
  };
  const metaRows = [
    isVisible('meta.quoteDate') ? ['Fecha de Cotización', draft.meta?.quoteDate || '--/--/----'] : null,
    isVisible('meta.quoteExpiry') ? ['Vencimiento', draft.meta?.quoteExpiry || '--/--/----'] : null,
    isVisible('meta.advisor') ? ['Asesor Comercial', draft.meta?.advisor || '-'] : null
  ].filter(Boolean);
  const clientRows = [
    isVisible('client.name') ? ['Nombre', draft.client?.name] : null,
    isVisible('client.dni') ? ['DNI', draft.client?.dni] : null,
    isVisible('client.cuil') ? ['CUIL', draft.client?.cuil] : null,
    isVisible('client.cel') ? ['CEL', draft.client?.cel] : null,
    isVisible('client.location')
      ? ['Prov. y localidad', [draft.client?.province, draft.client?.city].filter(Boolean).join(' - ') || '-']
      : null,
    isVisible('client.postalCode') ? ['CP', draft.client?.postalCode] : null
  ].filter(Boolean);
  const vehicleRows = [
    isVisible('vehicle.brand') ? ['Marca', draft.vehicle?.brand] : null,
    isVisible('vehicle.model') ? ['Modelo y versión', draft.vehicle?.model] : null,
    isVisible('vehicle.year') ? ['Año', draft.vehicle?.year] : null,
    isVisible('vehicle.plate') ? ['Patente', draft.vehicle?.plate] : null,
    isVisible('vehicle.kms') ? ['Kms', draft.vehicle?.kms] : null,
    isVisible('vehicle.factoryPrice')
      ? [(draft.vehicle?.factoryPriceLabel || DEFAULT_FACTORY_PRICE_LABEL).trim() || DEFAULT_FACTORY_PRICE_LABEL, formatMoney(draft.vehicle?.factoryPrice)]
      : null
  ].filter(Boolean);
  const newVehicleRows = [
    isVisible('newVehicle.brand') ? ['Marca', draft.newVehicle?.brand] : null,
    isVisible('newVehicle.model') ? ['Modelo y versión', draft.newVehicle?.model] : null
  ].filter(Boolean);
  const estimateLines = (draft.notes || '').split('\n').filter(line => line.trim()).length || 1;
  const densityScore = metaRows.length
    + clientRows.length
    + vehicleRows.length
    + newVehicleRows.length
    + paymentRows.length
    + bonifiedCards.length * 2
    + estimateLines
    + Math.max(benefits.length, 1)
    + (isVisible('footer') ? 1 : 0);
  const textDensityScore = densityScore
    + Math.max(0, estimateLines - 4)
    + Math.max(0, benefits.length - 4);
  let scale = 0.95;
  if (textDensityScore > 22) scale = 0.92;
  if (textDensityScore > 28) scale = 0.88;
  if (textDensityScore > 34) scale = 0.84;
  if (textDensityScore > 40) scale = 0.8;
  if (textDensityScore > 48) scale = 0.76;
  const scaledMargin = Math.max(12, Math.round(20 * scale));
  const shouldKeepTogether = textDensityScore <= 24 && estimateLines <= 6 && benefits.length <= 6;
  const content = [
    {
      columns: [
        {
          stack: [
            { text: 'Cotización', style: 'title' },
            isVisible('meta.quoteNumber') ? { text: `#${draft.meta?.quoteNumber || '--------'}`, style: 'titleAccent' } : {}
          ].filter(Boolean)
        },
        metaRows.length
          ? {
              stack: metaRows.map(([label, value]) => ({
                text: [
                  { text: `${label}: `, bold: true },
                  { text: formatValue(value) }
                ],
                style: 'metaRow'
              })),
              alignment: 'right'
            }
          : {}
      ],
      columnGap: 12,
      margin: [0, 0, 0, 6]
    }
  ];
  if (draft.preQuote?.enabled && isVisible('preQuote')) {
    content.push({
      text: draft.preQuote?.message || DEFAULT_PREQUOTE_MESSAGE,
      style: 'alert'
    });
  }
  if (clientRows.length) {
    const grid = buildInfoGrid(clientRows);
    if (grid) content.push(wrapSection('Datos cliente', [grid]));
  }
  if (vehicleRows.length) {
    const grid = buildInfoGrid(vehicleRows);
    if (grid) content.push(wrapSection('Datos vehículo', [grid]));
  }
  if (isVisible('newVehicle.section') && newVehicleRows.length) {
    const grid = buildInfoGrid(newVehicleRows);
    if (grid) content.push(wrapSection('Datos nuevo vehículo', [grid]));
  }
  if (isVisible('payments')) {
    const paymentBlocks = [];
    if (bonifiedCards.length) {
      const bonifiedColumns = bonifiedCards.map(card => {
        const bonifValue = parseMoney(card.data?.bonification || 0);
        const totalAmount = parseMoney(card.data?.amount || 0);
        const isThreePayments = card.title.includes('3 cuotas');
        const quotaValue = isThreePayments ? totalAmount / 3 : totalAmount;
        const paymentContent = isThreePayments
          ? {
              stack: [
                { text: `3 cuotas de ${formatMoney(quotaValue)}`, fontSize: 9 },
                { text: `Total: ${formatMoney(totalAmount)}`, fontSize: 8, color: '#999' }
              ]
            }
          : { text: formatMoney(totalAmount), fontSize: 9 };
        const lines = [
          { text: `Valor Original: ${formatMoney(card.data?.fakeOriginal)}` },
          bonifValue > 0 ? { text: `Bonif.: ${formatMoney(card.data?.bonification)}` } : null,
          { text: 'A pagar:', bold: false },
          paymentContent
        ].filter(Boolean);
        return { stack: [{ text: card.title, bold: true }, ...lines], margin: [0, 2, 0, 4] };
      });
      paymentBlocks.push(bonifiedColumns.length > 1
        ? { columns: bonifiedColumns, columnGap: 8 }
        : bonifiedColumns[0]);
    }
    if (paymentRows.length) {
      paymentBlocks.push(paymentTable);
    } else {
      paymentBlocks.push({ text: 'Sin cuotas cargadas.', style: 'notes' });
    }
    content.push(wrapSection('Esquema de pagos', paymentBlocks));
  }
  if (isVisible('notes')) {
    content.push(wrapSection('Notas y aclaraciones', [{
      text: draft.notes || '-',
      style: 'notes'
    }]));
  }
  if (isVisible('benefits')) {
    content.push(wrapSection('Benef. Adicionales otorgados', [{
      ul: benefits.length ? benefits : ['-'],
      margin: [0, 2, 0, 4]
    }]));
  }
  if (isVisible('footer')) {
    content.push({
      text: draft.footerNote || DEFAULT_QUOTE_FOOTER,
      style: 'footer'
    });
  }
  return {
    pageSize: 'A4',
    pageMargins: [scaledMargin, scaledMargin, scaledMargin, scaledMargin],
    defaultStyle: {
      fontSize: Math.max(8, Math.round(10 * scale)),
      color: '#0f172a',
      lineHeight: 1.15
    },
    styles: {
      title: { fontSize: Math.round(18 * scale), bold: true, color: '#1d4ed8', margin: [0, 0, 0, 2] },
      titleAccent: { fontSize: Math.round(14 * scale), bold: true, color: '#1d4ed8' },
      metaRow: { fontSize: Math.max(8, Math.round(10 * scale)), color: '#334155', margin: [0, 0, 0, 2] },
      sectionTitle: { fontSize: Math.round(11 * scale), bold: true, color: '#334155', margin: [0, 0, 0, 4] },
      gridLabel: { fontSize: Math.max(8, Math.round(9 * scale)), color: '#64748b', margin: [0, 0, 0, 2] },
      gridValue: { fontSize: Math.max(8, Math.round(10 * scale)), color: '#0f172a' },
      alert: { fontSize: Math.max(8, Math.round(9 * scale)), color: '#1e3a8a', fillColor: '#eef2ff', margin: [0, 6, 0, 8] },
      notes: { fontSize: Math.max(8, Math.round(9 * scale)), color: '#475569', margin: [0, 2, 0, 8] },
      footer: { fontSize: Math.max(7, Math.round(8 * scale)), color: '#475569', margin: [0, 6, 0, 0] }
    },
    content: [{ stack: content, ...(shouldKeepTogether ? { keepTogether: true } : {}) }]
  };
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

function resolveTotalInstallments(planType, vehiclePlanProfileType, vehicleMaxInstallments) {
  const normalizedMax = Number.isFinite(Number(vehicleMaxInstallments))
    ? Math.round(Number(vehicleMaxInstallments))
    : null;
  if (normalizedMax && planType === vehiclePlanProfileType) return normalizedMax;
  const byVehicle = planTerms[vehiclePlanProfileType];
  if (byVehicle) return byVehicle;
  return planTerms[planType] || normalizedMax || 120;
}


function resolvePlanScheme(vehicle) {
  const profile = vehicle?.planProfile || {};
  const planType = vehicle?.planProfile?.planType;
  const maxInstallments = resolveMaxInstallments(profile.maxInstallments, planType || '85a120');
  if (Number.isFinite(profile.financedPct) || Number.isFinite(profile.integrationPct)) {
    const financedPct = Number.isFinite(profile.financedPct) ? profile.financedPct : Math.max(0, 1 - (profile.integrationPct || 0));
    const integrationPct = Number.isFinite(profile.integrationPct) ? profile.integrationPct : Math.max(0, 1 - financedPct);
    const computedLabel = buildPlanLabelFromPercents(financedPct, integrationPct, planType, maxInstallments);
    return { financedPct, integrationPct, label: profile.label || computedLabel || 'Plan personalizado' };
  }

  const basePrice = Number(vehicle?.basePrice || 0);
  const integrationValue = Number(vehicle?.integration || 0);
  if (basePrice > 0 && integrationValue > 0) {
    const integrationPct = Math.min(Math.max(integrationValue / basePrice, 0), 1);
    const financedPct = Math.max(1 - integrationPct, 0);
    const computedLabel = buildPlanLabelFromPercents(financedPct, integrationPct, planType, maxInstallments);
    return { financedPct, integrationPct, label: profile.label || computedLabel || 'Plan personalizado' };
  }

  const label = (profile.label || '').toLowerCase();
  const numericMatch = label.match(/(\d{2})\s*\/\s*(\d{2})/);
  if (numericMatch) {
    const financedPct = Number(numericMatch[1]) / 100;
    const integrationPct = Number(numericMatch[2]) / 100;
    if (financedPct + integrationPct === 1) {
      const computedLabel = buildPlanLabelFromPercents(financedPct, integrationPct, planType, maxInstallments);
      return { financedPct, integrationPct, label: profile.label || computedLabel || 'Plan personalizado' };
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


function rangeKeyForInstallment(i, planRanges = [], fallbackKey) {
  const match = (planRanges || []).find(range => i >= range.from && i <= range.to);
  if (match?.key) return match.key;
  return fallbackKey;
}

function buildInstallmentSchedule({
  vehicle,
  priceRatio,
  totalInstallments,
  coverageSegments = [],
  cuotaPura,
  planType,
  planRanges = []
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
    const rangeKey = rangeKeyForInstallment(i, planRanges, planType);
    const baseAmount = vehicle?.shareByPlan?.[rangeKey]
      ?? vehicle?.shareByPlan?.[planType]
      ?? vehicle?.cuotaPura
      ?? cuotaPura
      ?? 0;
    const amount = Math.round((baseAmount * (priceRatio || 1)));
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

function computePaymentProjection({ vehicle, planType, tradeInValue = 0, tradeInEnabled = false, reservations = {}, appliedReservation = '1', customPrice = 0, advancePayments = false, advanceAmount = 0 }) {
  const scheme = resolvePlanScheme(vehicle);
  const planProfileType = vehicle?.planProfile?.planType || planType;
  const totalInstallments = resolveTotalInstallments(planType, planProfileType, vehicle?.planProfile?.maxInstallments);
  const basePrice = resolveVehiclePrice(vehicle, 0);
  const price = resolveVehiclePrice(vehicle, customPrice);
  const priceRatio = basePrice ? price / basePrice : 1;
  const financedAmount = (price * scheme.financedPct);
  const baseFinancedAmount = basePrice * scheme.financedPct;
  const integrationTarget = price * scheme.integrationPct;
  const baseCuotaPura = resolveCuotaPura(baseFinancedAmount, totalInstallments, vehicle, 0, planProfileType);
  const cuotaPura = resolveCuotaPura(financedAmount, totalInstallments, vehicle, customPrice, planProfileType);
  const baseCatalogCuota = vehicle?.cuotaPura || baseCuotaPura;

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
  const planRanges = getPlanRangesForBrand(vehicle?.brand || DEFAULT_BRAND, totalInstallments);
  const schedule = buildInstallmentSchedule({
    vehicle,
    priceRatio,
    totalInstallments,
    coverageSegments: coverage.segments,
    cuotaPura: baseCatalogCuota,
    planType,
    planRanges
  });
  const cuotaAjustada = schedule.nextInstallmentAmount || baseCatalogCuota;
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
    advanceAmount
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
  const showCuotaAdjustment = showCustomPrice || (tradeIn && projection.aporteInicial > 0) || (projection.priceRatio && projection.priceRatio !== 1);
  const scheme = projection.scheme || v.planProfile || {};
  const withdrawal = v.withdrawal || {};
  const withdrawalInstallments = formatWithdrawalInstallments(withdrawal.installments || []);
  const withdrawalRequirement = resolveWithdrawalRequirement(withdrawal, projection.price);
  const planLabelValue = resolveVehiclePlanLabel(v, plan);
  const allocationModeLabel = formatAllocationMode(withdrawal.mode);
  const isNoKey = withdrawal.mode !== 'pactada';
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
    { label: 'Marca del vehículo', value: normalizeBrand(v.brand) },
    { label: 'Valor del coche a cotizar', value: formatAdjustedValue(projection.basePrice, projection.price, showCustomPrice), helper: showCustomPrice ? 'Valor informado para la cotización' : 'Valor base del catálogo' },
    { label: 'Tipo de plan', value: planLabelValue ? `${planLabelValue} · ${planLabel(plan)}` : planLabel(plan), helper: scheme.label },
    { label: 'Cantidad de cuotas totales del plan', value: projection.totalInstallments || 0 },
    { label: 'Modalidad de adjudicación', value: allocationModeLabel },
    { label: 'Llave x llave disponible', value: isNoKey ? '⭐ Solo sorteo/licitación' : 'Sí' },
    { label: 'Cuotas pactadas de retiro', value: withdrawalInstallments || 'Sin definir', helper: withdrawalInstallments ? 'Definidas por marca y modelo' : 'Configura las cuotas pactadas en el editor' },
    {
      label: 'Requisito de integración para retiro',
      value: Number.isFinite(withdrawalRequirement.value) ? withdrawalRequirement.label : 'Sin definir',
      helper: Number.isFinite(withdrawalRequirement.value) ? withdrawalRequirement.helper : 'Configura el requisito en el editor'
    },
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

  const planRanges = getPlanRangesForBrand(v.brand, projection.totalInstallments);
  const pureRange = { key: 'ctapura', from: PLAN_START_INSTALLMENT, to: projection.totalInstallments || 120, label: planLabelFromKey('ctapura') };
  const activeKey = planRanges.some(range => range.key === plan) ? plan : (planRanges[0]?.key || 'ctapura');
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
    const ranges = [...planRanges, pureRange];
    rangeList.innerHTML = ranges.filter(range => v.shareByPlan?.[range.key] || range.key === plan || range.key === 'ctapura').map(range => {
      const label = range.label || planLabelFromKey(range.key);
      const baseAmount = range.key === 'ctapura'
        ? (projection.baseCatalogCuota || v.shareByPlan?.ctapura || projection.baseCatalogCuota)
        : (projection.rangeAmounts?.[range.key] ?? v.shareByPlan?.[range.key] ?? cuotaBase);
      const amount = range.key === activeKey ? projection.cuotaAjustada || baseAmount : baseAmount;
      const status = describeCoverage(range.from, range.to);
      return `
        <div class="range-card" data-active="${activeKey === range.key}">
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
  showModal(modal);
}

function closeInstallmentModal() {
  const modal = document.getElementById('installmentModal');
  if (!modal) return;
  hideModal(modal);
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
    advanceAmount
  });
  const cuotaBase = plan === 'ctapura'
    ? projection.baseCatalogCuota
    : (projection.rangeAmounts?.[plan] ?? v.shareByPlan?.[plan] ?? projection.baseCatalogCuota);
  const cuota = projection.cuotaAjustada;
  const withdrawal = v.withdrawal || {};
  const withdrawalRequirement = resolveWithdrawalRequirement(withdrawal, projection.price);
  const name = document.getElementById('clientName').value.trim() || 'Cotización sin nombre';
  const baseQuote = clients.find(c => c.selectedClientId === selectedPlanClientId && c.model === v.name && c.name === name) || {};
  const quote = {
    id: baseQuote.id || `quote-${Date.now()}`,
    name,
    model: v.name,
    brand: normalizeBrand(v.brand),
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
    outstanding: projection.outstanding,
    remainingInstallments: projection.remainingInstallments,
    kickoffInstallment: projection.kickoffInstallment,
    aporteInicial: projection.aporteInicial,
    financedAmount: projection.financedAmount,
    integrationTarget: projection.integrationTarget,
    integrationCovered: projection.integrationCovered,
    integrationRemaining: projection.integrationRemaining,
    schemeLabel: projection.scheme?.label || resolveVehiclePlanLabel(v, plan) || 'Plan',
    selectedReservation: projection.selectedReservation,
    reservationMode: appliedReservation,
    planProfileLabel: resolveVehiclePlanLabel(v, plan) || 'Personalizar',
    allocationMode: withdrawal.mode || 'sorteo_licitacion',
    withdrawalInstallments: withdrawal.installments || [],
    withdrawalRequirementType: withdrawalRequirement.type,
    withdrawalRequirementValue: withdrawalRequirement.value,
    withdrawalRequirementAmount: withdrawalRequirement.amount,
    basePrice: projection.basePrice,
    priceApplied: projection.price,
    baseCuotaPura: projection.baseCatalogCuota,
    cuotaBase: plan === 'ctapura'
      ? projection.baseCatalogCuota
      : (projection.rangeAmounts?.[plan] ?? v.shareByPlan?.[plan] ?? projection.baseCatalogCuota),
    cuotaAjustada: projection.cuotaAjustada,
    priceRatio: projection.priceRatio,
    startInstallment: projection.startInstallment,
    advancePayments,
    advanceAmount,
    timestamp: new Date().toISOString(),
    selectedClientId: selectedPlanClientId,
    clientSource: isExternalClientSelection() ? 'external' : (selectedPlanClientId ? 'internal' : ''),
    externalName: isExternalClientSelection() ? name : '',
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
  const withdrawalInstallments = Array.isArray(quote.withdrawalInstallments) && quote.withdrawalInstallments.length
    ? quote.withdrawalInstallments.join(', ')
    : 'Sin definir';
  const requirementValue = Number.isFinite(quote.withdrawalRequirementValue) ? quote.withdrawalRequirementValue : null;
  const withdrawalRequirementLabel = requirementValue !== null
    ? (quote.withdrawalRequirementType === 'amount'
      ? currency.format(requirementValue)
      : `${Math.round(requirementValue * 100)}% (${currency.format(quote.withdrawalRequirementAmount || 0)})`)
    : 'Sin definir';
  const parts = [
    `Cotización para: ${quote.name}`,
    `Modelo elegido: ${quote.model}`,
    `Marca: ${quote.brand || 'Sin definir'}`,
    `Valor base catálogo: ${currency.format(quote.basePrice || 0)}`,
    hasCustomPrice ? `Valor del coche a cotizar: ${currency.format(quote.priceApplied || 0)} (informado)` : `Valor del coche a cotizar: ${currency.format(quote.priceApplied || 0)}`,
    `Esquema del plan: ${quote.schemeLabel || quote.planProfileLabel || 'Plan'} · Financia ${currency.format(quote.financedAmount || 0)} · Integra ${currency.format(quote.integrationTarget || 0)}`,
    `Plan establecido: ${planLabel(quote.plan)} (${quote.planProfileLabel || 'Personalizar'})`,
    `Modalidad de adjudicación: ${formatAllocationMode(quote.allocationMode || 'sorteo_licitacion')}`,
    `Cuotas pactadas de retiro: ${withdrawalInstallments}`,
    `Requisito de integración para retiro: ${withdrawalRequirementLabel}`,
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
  uiState.planDraft.clientSource = quote.clientSource || (selectedPlanClientId ? 'internal' : '');
  uiState.planDraft.externalName = quote.externalName || '';
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
  updatePlanClientNameLock();
  toggleAdvanceAmountField();
  updateIntegrationDetails(Number(document.getElementById('planModel').value || 0));
  updatePlanSummary();
}

function planLabel(key) {
  return planLabelFromKey(key);
}

function resolveVehiclePlanLabel(vehicle, fallbackPlanType) {
  const profile = vehicle?.planProfile || {};
  const planType = fallbackPlanType || profile.planType;
  const maxInstallments = resolveMaxInstallments(profile.maxInstallments, planType || '85a120');
  const computed = buildPlanLabelFromPercents(profile.financedPct, profile.integrationPct, planType, maxInstallments);
  return profile.label || computed || planLabel(planType);
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
  document.getElementById('appliedReservation').value = ['1', '3', '6'].includes(draft.appliedReservation) ? draft.appliedReservation : '1';
  setMoneyValue(document.getElementById('tradeInValue'), draft.tradeInValue || '');
  document.getElementById('clientName').value = draft.clientName || draft.externalName || '';
  document.getElementById('notes').value = draft.notes || '';
  selectedPlanClientId = draft.selectedClientId || null;
  if (draft.clientSource === 'external') {
    selectedPlanClientId = null;
  }
  if (!draft.clientSource && selectedPlanClientId) {
    uiState.planDraft.clientSource = 'internal';
  }
  ['reservation1', 'reservation3', 'reservation6'].forEach(key => {
    const el = document.getElementById(key);
    if (el) {
      setMoneyValue(el, draft[key] || '');
      if (parseMoney(draft[key])) el.dataset.manual = 'true';
    }
  });
  refreshClientSelectionHint();
  updatePlanClientNameLock();
}

function savePlanDraft() {
  const externalSelected = isExternalClientSelection();
  const externalName = externalSelected ? document.getElementById('clientName').value : (uiState.planDraft?.externalName || '');
  uiState.planDraft = {
    planModel: document.getElementById('planModel').value,
    planType: document.getElementById('planType').value,
    tradeIn: document.getElementById('tradeIn').checked,
    advancePayments: document.getElementById('advancePayments').checked,
    advanceAmount: parseMoney(document.getElementById('advanceAmount').dataset.raw || document.getElementById('advanceAmount').value),
    customPrice: parseMoney(document.getElementById('customPrice').dataset.raw || document.getElementById('customPrice').value),
    appliedReservation: document.getElementById('appliedReservation').value,
    tradeInValue: parseMoney(document.getElementById('tradeInValue').dataset.raw || document.getElementById('tradeInValue').value),
    clientName: document.getElementById('clientName').value,
    notes: document.getElementById('notes').value,
    selectedClientId: selectedPlanClientId,
    clientSource: externalSelected ? 'external' : (selectedPlanClientId ? 'internal' : ''),
    externalName,
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
  const onlineBtn = document.getElementById('viewOnlineFiles');
  if (onlineBtn && !onlineBtn.dataset.bound) {
    onlineBtn.addEventListener('click', openOnlineFilesModal);
    onlineBtn.dataset.bound = 'true';
  }
}

function openPriceImage() {
  const active = getActivePriceTab();
  const file = getPrimaryFileForTab(active);
  if (file) {
    window.open(file, '_blank');
    return;
  }
  loadPriceTabFiles(active).then(files => {
    const fallback = files.find(item => /\.(png|jpe?g|pdf)$/i.test(item.name))?.path;
    if (fallback) {
      window.open(fallback, '_blank');
    } else {
      showToast('No se encontraron archivos visuales para este mes.', 'error');
    }
  });
}

async function collectOnlineFiles(rootPath = ONLINE_FILES_ROOT, currentPath = ONLINE_FILES_ROOT, results = []) {
  try {
    const response = await fetch(`${currentPath}/`, { cache: 'no-store' });
    if (!response.ok) return results;
    const html = await response.text();
    const entries = parseDirectoryListing(html);
    const folders = entries.filter(entry => entry.endsWith('/'));
    const files = entries.filter(entry => !entry.endsWith('/'));
    const folderLabel = currentPath.replace(`${rootPath}/`, '') || rootPath;
    files.forEach(file => {
      results.push({
        folder: folderLabel,
        name: normalizePriceFileName(file),
        path: `${currentPath}/${file}`
      });
    });
    for (const folder of folders) {
      const trimmed = folder.replace(/\/$/, '');
      await collectOnlineFiles(rootPath, `${currentPath}/${trimmed}`, results);
    }
    return results;
  } catch (err) {
    return results;
  }
}

async function loadOnlineFiles() {
  if (onlineFilesCache) return onlineFilesCache;
  const manifest = await fetchJsonIfExists(`${ONLINE_FILES_ROOT}/manifest.json`);
  const manifestFiles = mapOnlineFilesFromManifest(manifest);
  if (manifestFiles.length) {
    onlineFilesCache = manifestFiles;
    return manifestFiles;
  }
  onlineFilesCache = await collectOnlineFiles(ONLINE_FILES_ROOT, ONLINE_FILES_ROOT, []);
  return onlineFilesCache;
}

function renderOnlineFilesList(files = [], searchValue = '') {
  const list = document.getElementById('onlineFilesList');
  if (!list) return;
  const query = searchValue.trim().toLowerCase();
  const filtered = query
    ? files.filter(file => file.name.toLowerCase().includes(query) || (file.folder || '').toLowerCase().includes(query))
    : files;
  if (!filtered.length) {
    list.innerHTML = query
      ? '<p class="muted">No se encontraron archivos con ese nombre.</p>'
      : '<p class="muted">No se pudieron detectar archivos en la carpeta prices_img.</p>';
    return;
  }
  const grouped = filtered.reduce((acc, file) => {
    const key = file.folder || ONLINE_FILES_ROOT;
    acc[key] = acc[key] || [];
    acc[key].push(file);
    return acc;
  }, {});
  list.innerHTML = Object.entries(grouped).map(([folder, folderFiles]) => `
    <div class="file-group">
      <p class="file-group-title">${folder}</p>
      ${folderFiles.map(file => `
        <a class="file-link" href="${file.path}" target="_blank" rel="noopener noreferrer">
          <i class='bx bx-file'></i> ${file.name}
        </a>
      `).join('')}
    </div>
  `).join('');
}

function openOnlineFilesModal() {
  const modal = document.getElementById('onlineFilesModal');
  const list = document.getElementById('onlineFilesList');
  const close = document.getElementById('onlineFilesClose');
  const searchInput = document.getElementById('onlineFilesSearch');
  if (!modal || !list) return;
  list.innerHTML = '<p class="muted">Cargando archivos online...</p>';
  if (searchInput && !searchInput.dataset.bound) {
    searchInput.addEventListener('input', () => {
      onlineFilesState.search = searchInput.value;
      renderOnlineFilesList(onlineFilesState.files, onlineFilesState.search);
    });
    searchInput.dataset.bound = 'true';
  }
  if (searchInput) {
    searchInput.value = onlineFilesState.search || '';
  }
  loadOnlineFiles().then(files => {
    onlineFilesState.files = files;
    renderOnlineFilesList(files, onlineFilesState.search);
  });
  if (close) close.onclick = () => toggleModal(modal, false);
  toggleModal(modal, true);
}

let clientManagerResizeTimer = null;

function bindClientManagerResize() {
  if (bindClientManagerResize.bound) return;
  bindClientManagerResize.bound = true;
  window.addEventListener('resize', () => {
    if (clientManagerResizeTimer) clearTimeout(clientManagerResizeTimer);
    clientManagerResizeTimer = setTimeout(() => {
      renderClientManager();
      updateScrollTopButton();
      clientManagerResizeTimer = null;
    }, 160);
  });
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

  renderAdvisorSelector();

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

  const accountFilter = document.getElementById('accountFilter');
  if (accountFilter) {
    accountFilter.value = clientManagerState.accountFilter || 'all';
    accountFilter.addEventListener('change', () => {
      clientManagerState.accountFilter = accountFilter.value;
      clientManagerState.pagination.page = 1;
      persist();
      renderClientManager();
    });
  }
  renderAccountFilter();

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

  const journeyReportBtn = document.getElementById('openJourneyReport');
  if (journeyReportBtn && !journeyReportBtn.dataset.bound) {
    journeyReportBtn.addEventListener('click', openJourneyReportModal);
    journeyReportBtn.dataset.bound = 'true';
  }

  const openImportedManager = document.getElementById('openImportedDataManager');
  if (openImportedManager && !openImportedManager.dataset.bound) {
    openImportedManager.addEventListener('click', () => {
      activatePanel('importedDataManager');
    });
    openImportedManager.dataset.bound = 'true';
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
  const contactLogTabs = document.getElementById('contactLogRangeTabs');
  if (contactLogTabs && !contactLogTabs.dataset.bound) {
    contactLogTabs.addEventListener('click', (event) => {
      const target = event.target.closest('[data-contact-range]');
      if (!target) return;
      clientManagerState.contactLogRange = target.dataset.contactRange;
      renderContactLog();
      persist();
    });
    contactLogTabs.dataset.bound = 'true';
  }
  const contactLogStatusFilter = document.getElementById('contactLogStatusFilter');
  if (contactLogStatusFilter) {
    contactLogStatusFilter.value = clientManagerState.contactLogStatusFilter || 'all';
    contactLogStatusFilter.addEventListener('change', () => {
      clientManagerState.contactLogStatusFilter = contactLogStatusFilter.value;
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
  bindClientManagerResize();
}

function bindJourneyReport() {
  const modal = document.getElementById('journeyReportModal');
  const closeBtn = document.getElementById('journeyReportClose');
  const closeFooter = document.getElementById('journeyReportCloseFooter');
  const downloadBtn = document.getElementById('journeyReportDownload');
  const fromInput = document.getElementById('journeyReportFrom');
  const toInput = document.getElementById('journeyReportTo');
  const quickButtons = document.querySelectorAll('.journey-quick-buttons [data-range]');

  if (closeBtn && !closeBtn.dataset.bound) {
    closeBtn.addEventListener('click', closeJourneyReportModal);
    closeBtn.dataset.bound = 'true';
  }
  if (closeFooter && !closeFooter.dataset.bound) {
    closeFooter.addEventListener('click', closeJourneyReportModal);
    closeFooter.dataset.bound = 'true';
  }
  if (downloadBtn && !downloadBtn.dataset.bound) {
    downloadBtn.addEventListener('click', downloadJourneyReportPdf);
    downloadBtn.dataset.bound = 'true';
  }
  if (fromInput && !fromInput.dataset.bound) {
    fromInput.addEventListener('change', () => {
      journeyReportState.from = fromInput.value;
      renderJourneyReport();
    });
    fromInput.dataset.bound = 'true';
  }
  if (toInput && !toInput.dataset.bound) {
    toInput.addEventListener('change', () => {
      journeyReportState.to = toInput.value;
      renderJourneyReport();
    });
    toInput.dataset.bound = 'true';
  }
  quickButtons.forEach(btn => {
    if (btn.dataset.bound) return;
    btn.addEventListener('click', () => {
      const range = Number(btn.dataset.range || 0);
      const today = new Date();
      const start = new Date();
      start.setDate(today.getDate() - Math.max(range - 1, 0));
      journeyReportState.from = formatLocalISO(start);
      journeyReportState.to = formatLocalISO(today);
      renderJourneyReport();
    });
    btn.dataset.bound = 'true';
  });
  if (modal && !modal.dataset.bound) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeJourneyReportModal();
    });
    modal.dataset.bound = 'true';
  }
}

function bindImportedDataManager() {
  const clearBtn = document.getElementById('importedManagerClear');
  const deleteBtn = document.getElementById('importedManagerDelete');
  const content = document.getElementById('importedManagerContent');
  const searchInput = document.getElementById('importedManagerSearch');
  const searchBtn = document.getElementById('importedManagerSearchBtn');
  const searchReset = document.getElementById('importedManagerSearchReset');
  const manualBtn = document.getElementById('importedManagerManual');
  const manualModal = document.getElementById('manualImportModal');
  const manualClose = document.getElementById('manualImportClose');
  const manualCancel = document.getElementById('manualImportCancel');
  const manualForm = document.getElementById('manualImportForm');

  if (clearBtn && !clearBtn.dataset.bound) {
    clearBtn.addEventListener('click', () => {
      importedManagerState.selectedIds.clear();
      if (content) {
        content.querySelectorAll('input[data-imported-id]').forEach(input => {
          input.checked = false;
        });
      }
      updateImportedManagerSelectionUI();
    });
    clearBtn.dataset.bound = 'true';
  }

  if (deleteBtn && !deleteBtn.dataset.bound) {
    deleteBtn.addEventListener('click', () => {
      const ids = Array.from(importedManagerState.selectedIds);
      if (!ids.length) {
        showToast('Selecciona registros para eliminar.', 'warning');
        return;
      }
      confirmAction({
        title: 'Eliminar registros importados',
        message: `Se eliminarán ${ids.length} registros del sistema. ¿Deseas continuar?`,
        confirmText: 'Eliminar',
        onConfirm: () => {
          const toRemove = new Set(ids);
          managerClients = managerClients.filter(client => !toRemove.has(client.id));
          importedManagerState.selectedIds.clear();
          persist();
          renderImportedDataManager();
          renderClientManager();
          renderStats();
          showToast('Registros eliminados correctamente.', 'success');
        }
      });
    });
    deleteBtn.dataset.bound = 'true';
  }

  if (searchInput && !searchInput.dataset.bound) {
    searchInput.value = importedManagerState.searchTerm || '';
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        runImportedManagerSearch({ term: searchInput.value });
      }
    });
    searchInput.dataset.bound = 'true';
  }

  if (searchBtn && !searchBtn.dataset.bound) {
    searchBtn.addEventListener('click', () => {
      runImportedManagerSearch({ term: searchInput?.value });
    });
    searchBtn.dataset.bound = 'true';
  }

  if (searchReset && !searchReset.dataset.bound) {
    searchReset.addEventListener('click', () => {
      importedManagerState.searchTerm = '';
      if (searchInput) searchInput.value = '';
      renderImportedDataManager();
    });
    searchReset.dataset.bound = 'true';
  }

  if (manualBtn && !manualBtn.dataset.bound) {
    manualBtn.addEventListener('click', openManualImportModal);
    manualBtn.dataset.bound = 'true';
  }

  if (manualClose && !manualClose.dataset.bound) {
    manualClose.addEventListener('click', closeManualImportModal);
    manualClose.dataset.bound = 'true';
  }

  if (manualCancel && !manualCancel.dataset.bound) {
    manualCancel.addEventListener('click', closeManualImportModal);
    manualCancel.dataset.bound = 'true';
  }

  if (manualModal && !manualModal.dataset.bound) {
    manualModal.addEventListener('click', (event) => {
      if (event.target === manualModal) closeManualImportModal();
    });
    manualModal.dataset.bound = 'true';
  }

  if (manualForm && !manualForm.dataset.bound) {
    manualForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = manualForm.querySelector('[name="name"]')?.value?.trim() || '';
      const documentValue = manualForm.querySelector('[name="document"]')?.value?.trim() || '';
      const phone = manualForm.querySelector('[name="phone"]')?.value?.trim() || '';
      if (!name || !documentValue || !phone) {
        showToast('Completa Nombre, DNI y Teléfono para guardar.', 'warning');
        return;
      }
      const payload = buildManualClientPayload(manualForm);
      managerClients.push(payload);
      persist();
      renderImportedDataManager();
      renderClientManager();
      renderStats();
      closeManualImportModal();
      showToast('Cliente manual agregado correctamente.', 'success');
    });
    manualForm.dataset.bound = 'true';
  }

  if (content && !content.dataset.bound) {
    content.addEventListener('click', (event) => {
      if (event.target.matches('input[data-imported-group-toggle], input[data-imported-id]')) {
        event.stopPropagation();
      }
    });
    content.addEventListener('toggle', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLDetailsElement)) return;
      if (!target.open) return;
      content.querySelectorAll('.import-day-group').forEach(group => {
        if (group !== target) group.open = false;
      });
    });
    content.addEventListener('change', (event) => {
      const groupToggle = event.target.closest('input[data-imported-group-toggle]');
      if (groupToggle) {
        const groupKey = groupToggle.dataset.importedGroupToggle;
        const groupInputs = content.querySelectorAll(`input[data-imported-id][data-imported-group="${groupKey}"]`);
        groupInputs.forEach(input => {
          input.checked = groupToggle.checked;
          if (groupToggle.checked) {
            importedManagerState.selectedIds.add(input.dataset.importedId);
          } else {
            importedManagerState.selectedIds.delete(input.dataset.importedId);
          }
        });
        updateImportedManagerSelectionUI();
        return;
      }
      const input = event.target.closest('input[data-imported-id]');
      if (!input) return;
      const id = input.dataset.importedId;
      if (input.checked) {
        importedManagerState.selectedIds.add(id);
      } else {
        importedManagerState.selectedIds.delete(id);
      }
      updateImportedManagerSelectionUI();
    });
    content.dataset.bound = 'true';
  }
}

function bindAccountManager() {
  const openBtn = document.getElementById('openAccountManager');
  const closeBtn = document.getElementById('closeAccountManager');
  const addBtn = document.getElementById('addAccount');
  const deleteBtn = document.getElementById('deleteAccount');
  const applyBtn = document.getElementById('applyAccountToClients');
  const list = document.getElementById('accountManagerList');
  const nameInput = document.getElementById('accountNameInput');
  const aliasInput = document.getElementById('accountAliasInput');
  const phoneInput = document.getElementById('accountPhoneInput');
  const deviceInput = document.getElementById('accountDeviceInput');
  const status = document.getElementById('accountManagerStatus');

  if (openBtn && !openBtn.dataset.bound) {
    openBtn.addEventListener('click', () => toggleAccountManager(true));
    openBtn.dataset.bound = 'true';
  }
  if (closeBtn && !closeBtn.dataset.bound) {
    closeBtn.addEventListener('click', () => toggleAccountManager(false));
    closeBtn.dataset.bound = 'true';
  }

  if (list && !list.dataset.bound) {
    list.addEventListener('click', (event) => {
      const target = event.target.closest('[data-id]');
      if (!target) return;
      accountManagerState.selectedId = target.dataset.id;
      renderAccountManager();
    });
    list.dataset.bound = 'true';
  }

  if (addBtn && !addBtn.dataset.bound) {
    addBtn.addEventListener('click', () => {
      const settings = mergeGlobalSettings(uiState.globalSettings);
      const newAccount = normalizeAccount({ name: 'Nueva cuenta', phone: '' });
      uiState.globalSettings.accounts = [...settings.accounts, newAccount];
      accountManagerState.selectedId = newAccount.id;
      if (!settings.activeAccountId) {
        uiState.globalSettings.activeAccountId = newAccount.id;
        uiState.globalSettings.advisorName = resolveAccountAdvisorName(newAccount);
      }
      persist();
      renderAccountManager();
      renderAdvisorSelector();
      renderWelcomeHero();
      renderClientManager();
    });
    addBtn.dataset.bound = 'true';
  }

  if (deleteBtn && !deleteBtn.dataset.bound) {
    deleteBtn.addEventListener('click', () => {
      const settings = mergeGlobalSettings(uiState.globalSettings);
      const accounts = settings.accounts || [];
      if (accounts.length <= 1) {
        showToast('Debe existir al menos una cuenta activa.', 'error');
        return;
      }
      const current = accounts.find(acc => acc.id === accountManagerState.selectedId);
      confirmAction({
        title: 'Eliminar cuenta',
        message: `¿Deseas eliminar la cuenta "${current?.name || 'Sin nombre'}"? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar',
        onConfirm: () => {
          const remaining = accounts.filter(acc => acc.id !== accountManagerState.selectedId);
          const nextActiveId = settings.activeAccountId === accountManagerState.selectedId
            ? remaining[0]?.id
            : settings.activeAccountId;
          uiState.globalSettings.accounts = remaining;
          uiState.globalSettings.activeAccountId = nextActiveId;
          const active = remaining.find(acc => acc.id === nextActiveId);
          if (active) uiState.globalSettings.advisorName = resolveAccountAdvisorName(active);
          accountManagerState.selectedId = remaining[0]?.id || null;
          persist();
          renderAccountManager();
          renderAdvisorSelector();
          renderWelcomeHero();
          renderClientManager();
        }
      });
    });
    deleteBtn.dataset.bound = 'true';
  }

  if (applyBtn && !applyBtn.dataset.bound) {
    applyBtn.addEventListener('click', () => {
      const modal = document.getElementById('accountApplyModal');
      const checkbox = document.getElementById('accountApplyConfirmCheck');
      const confirmBtn = document.getElementById('accountApplyConfirm');
      if (!modal || !checkbox || !confirmBtn) return;
      checkbox.checked = false;
      confirmBtn.disabled = true;
      toggleModal(modal, true);
    });
    applyBtn.dataset.bound = 'true';
  }

  if (nameInput && !nameInput.dataset.bound) {
    nameInput.addEventListener('input', () => {
      const settings = mergeGlobalSettings(uiState.globalSettings);
      const accounts = settings.accounts || [];
      const index = accounts.findIndex(acc => acc.id === accountManagerState.selectedId);
      if (index < 0) return;
      const draft = getAccountManagerDraft(accounts[index]);
      const nextName = nameInput.value;
      accountManagerState.drafts[accounts[index].id] = { ...draft, name: nextName };
      const listLabel = list?.querySelector(`[data-id="${accountManagerState.selectedId}"] strong`);
      const labelValue = nextName.trim() || 'Cuenta sin nombre';
      if (listLabel) listLabel.textContent = labelValue;
      if (status) status.textContent = 'Cambios pendientes. Se guardan al cerrar.';
    });
    nameInput.dataset.bound = 'true';
  }

  if (aliasInput && !aliasInput.dataset.bound) {
    aliasInput.addEventListener('input', () => {
      const settings = mergeGlobalSettings(uiState.globalSettings);
      const accounts = settings.accounts || [];
      const index = accounts.findIndex(acc => acc.id === accountManagerState.selectedId);
      if (index < 0) return;
      const draft = getAccountManagerDraft(accounts[index]);
      const nextAlias = aliasInput.value;
      accountManagerState.drafts[accounts[index].id] = { ...draft, alias: nextAlias };
      if (status) status.textContent = 'Cambios pendientes. Se guardan al cerrar.';
    });
    aliasInput.dataset.bound = 'true';
  }

  if (phoneInput && !phoneInput.dataset.bound) {
    phoneInput.addEventListener('input', () => {
      const settings = mergeGlobalSettings(uiState.globalSettings);
      const accounts = settings.accounts || [];
      const index = accounts.findIndex(acc => acc.id === accountManagerState.selectedId);
      if (index < 0) return;
      const draft = getAccountManagerDraft(accounts[index]);
      const nextPhone = phoneInput.value;
      const nextDraft = { ...draft, phone: nextPhone };
      accountManagerState.drafts[accounts[index].id] = nextDraft;
      const listLabel = list?.querySelector(`[data-id="${accountManagerState.selectedId}"] small`);
      if (listLabel) {
        const phoneLabel = nextPhone.trim() ? formatPhoneDisplay(nextPhone) || nextPhone.trim() : 'Sin teléfono';
        const deviceLabel = nextDraft.device?.trim() ? ` (${nextDraft.device.trim()})` : '';
        listLabel.textContent = `${phoneLabel}${deviceLabel}`;
      }
      if (status) status.textContent = 'Cambios pendientes. Se guardan al cerrar.';
    });
    phoneInput.dataset.bound = 'true';
  }

  if (deviceInput && !deviceInput.dataset.bound) {
    deviceInput.addEventListener('input', () => {
      const settings = mergeGlobalSettings(uiState.globalSettings);
      const accounts = settings.accounts || [];
      const index = accounts.findIndex(acc => acc.id === accountManagerState.selectedId);
      if (index < 0) return;
      const draft = getAccountManagerDraft(accounts[index]);
      const nextDevice = deviceInput.value;
      const nextDraft = { ...draft, device: nextDevice };
      accountManagerState.drafts[accounts[index].id] = nextDraft;
      const listLabel = list?.querySelector(`[data-id="${accountManagerState.selectedId}"] small`);
      if (listLabel) {
        const phoneLabel = nextDraft.phone?.trim()
          ? formatPhoneDisplay(nextDraft.phone) || nextDraft.phone.trim()
          : 'Sin teléfono';
        const deviceLabel = nextDevice.trim() ? ` (${nextDevice.trim()})` : '';
        listLabel.textContent = `${phoneLabel}${deviceLabel}`;
      }
      if (status) status.textContent = 'Cambios pendientes. Se guardan al cerrar.';
    });
    deviceInput.dataset.bound = 'true';
  }

  const applyModal = document.getElementById('accountApplyModal');
  const applyCancel = document.getElementById('accountApplyCancel');
  const applyClose = document.getElementById('accountApplyClose');
  const applyConfirm = document.getElementById('accountApplyConfirm');
  const applyCheck = document.getElementById('accountApplyConfirmCheck');

  if (applyCheck && !applyCheck.dataset.bound) {
    applyCheck.addEventListener('change', () => {
      if (applyConfirm) applyConfirm.disabled = !applyCheck.checked;
    });
    applyCheck.dataset.bound = 'true';
  }

  const closeApplyModal = () => {
    if (applyModal) toggleModal(applyModal, false);
  };
  if (applyCancel && !applyCancel.dataset.bound) {
    applyCancel.addEventListener('click', closeApplyModal);
    applyCancel.dataset.bound = 'true';
  }
  if (applyClose && !applyClose.dataset.bound) {
    applyClose.addEventListener('click', closeApplyModal);
    applyClose.dataset.bound = 'true';
  }

  if (applyConfirm && !applyConfirm.dataset.bound) {
    applyConfirm.addEventListener('click', () => {
      if (accountApplyState.isRunning) return;
      const settings = mergeGlobalSettings(uiState.globalSettings);
      const account = settings.accounts.find(acc => acc.id === accountManagerState.selectedId)
        || settings.accounts[0];
      if (!account) return;
      accountApplyState.isRunning = true;
      closeApplyModal();
      showAccountApplyOverlay(true);
      setTimeout(() => {
        try {
          const total = applyAccountToAllClients(account);
          persist();
          renderClientManager();
          renderAccountManager();
          showToast(`Cuenta aplicada a ${total} contactos.`, 'success');
        } finally {
          showAccountApplyOverlay(false);
          accountApplyState.isRunning = false;
        }
      }, 1000);
    });
    applyConfirm.dataset.bound = 'true';
  }
}

function bindAccountInfoModal() {
  const modal = document.getElementById('accountInfoModal');
  if (!modal || modal.dataset.bound) return;
  const closeBtn = document.getElementById('accountInfoClose');
  const dismissBtn = document.getElementById('accountInfoDismiss');
  const closeModal = () => toggleModal(modal, false);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  modal.dataset.bound = 'true';
}

function openAccountInfoModal({ accountId, accountName, contactDate }) {
  const modal = document.getElementById('accountInfoModal');
  if (!modal) return;
  const settings = mergeGlobalSettings(uiState.globalSettings);
  const account = settings.accounts.find(acc => acc.id === accountId)
    || settings.accounts.find(acc => acc.name === accountName)
    || null;
  const nameLabel = document.getElementById('accountInfoName');
  const phoneLabel = document.getElementById('accountInfoPhone');
  const deviceLabel = document.getElementById('accountInfoDevice');
  const contactLabel = document.getElementById('accountInfoContact');
  const resolvedName = account?.name || accountName || 'Sin cuenta';
  const resolvedPhone = formatPhoneDisplay(account?.phone || '') || account?.phone || 'Sin teléfono';
  const resolvedDevice = account?.device?.trim() || 'Sin datos';
  if (nameLabel) nameLabel.textContent = resolvedName;
  if (phoneLabel) phoneLabel.textContent = resolvedPhone;
  if (deviceLabel) deviceLabel.textContent = resolvedDevice;
  if (contactLabel) contactLabel.textContent = formatContactMetaDetail(contactDate);
  toggleModal(modal, true);
}

function bindContactAssistant() {
  const openBtn = document.getElementById('openContactAssistant');
  const overlay = document.getElementById('contactAssistantOverlay');
  const closeBtn = document.getElementById('closeContactAssistant');
  const quickAdjustBtn = document.getElementById('assistantQuickAdjustBtn');
  const quickAdjustClose = document.getElementById('assistantQuickAdjustClose');
  const quickAdjustSearch = document.getElementById('assistantQuickSearch');
  const quickAdjustSearchBtn = document.getElementById('assistantQuickSearchBtn');
  const quickAdjustResetBtn = document.getElementById('assistantQuickResetBtn');
  const assistantAccountSelect = document.getElementById('assistantAccountSelect');
  const markContactedBtn = document.getElementById('assistantMarkContacted');
  const markNoNumberBtn = document.getElementById('assistantMarkNoNumber');
  const undoBtn = document.getElementById('assistantUndoBtn');
  const actionCards = Array.from(document.querySelectorAll('[data-assistant-action]'));

  const openAssistant = () => {
    renderContactAssistant();
    toggleFadeOverlay(overlay, true);
  };

  const closeAssistant = () => {
    toggleFadeOverlay(overlay, false);
  };

  if (openBtn) openBtn.addEventListener('click', openAssistant);
  if (closeBtn) closeBtn.addEventListener('click', closeAssistant);
  if (quickAdjustBtn) quickAdjustBtn.addEventListener('click', openAssistantQuickAdjust);
  if (quickAdjustClose) quickAdjustClose.addEventListener('click', closeAssistantQuickAdjust);
  const applyQuickAdjustSearch = () => {
    if (!quickAdjustSearch) return;
    const term = quickAdjustSearch.value.trim();
    clientManagerState.contactAssistantQuickAdjust.search = term;
    clientManagerState.contactAssistantQuickAdjust.selectedId = null;
    renderAssistantQuickAdjust();
    persist();
  };
  const resetQuickAdjustSearch = () => {
    if (!quickAdjustSearch) return;
    quickAdjustSearch.value = '';
    clientManagerState.contactAssistantQuickAdjust.search = '';
    clientManagerState.contactAssistantQuickAdjust.selectedId = null;
    renderAssistantQuickAdjust();
    persist();
    quickAdjustSearch.focus();
  };
  if (quickAdjustSearch) {
    quickAdjustSearch.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        applyQuickAdjustSearch();
      }
    });
  }
  if (quickAdjustSearchBtn) quickAdjustSearchBtn.addEventListener('click', applyQuickAdjustSearch);
  if (quickAdjustResetBtn) quickAdjustResetBtn.addEventListener('click', resetQuickAdjustSearch);
  if (assistantAccountSelect && !assistantAccountSelect.dataset.bound) {
    assistantAccountSelect.addEventListener('change', () => {
      requestAccountSwitch(assistantAccountSelect.value);
    });
    assistantAccountSelect.dataset.bound = 'true';
  }

  const handleAssistantAction = (action) => {
    const { current } = assistantContext();
    if (!current) return;
    if (action === 'copy_phone') {
      copyText(normalizePhone(current.phone || ''), 'Número copiado');
    }
    if (action === 'copy_message') {
      const message = buildMessageForClient(current, { advance: true });
      copyText(message, 'Mensaje copiado');
    }
  };

  actionCards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('is-disabled')) return;
      handleAssistantAction(card.dataset.assistantAction);
    });
    card.addEventListener('keydown', (event) => {
      if (card.classList.contains('is-disabled')) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleAssistantAction(card.dataset.assistantAction);
      }
    });
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
      previousContactMeta: current.contactMeta ? { ...current.contactMeta } : null,
      previousJourneyStatus: current.journeyStatus ? { ...current.journeyStatus } : null,
      previousJourneyHistory: Array.isArray(current.journeyHistory) ? [...current.journeyHistory] : [],
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
      client.contactMeta = undo.previousContactMeta || null;
      client.journeyStatus = undo.previousJourneyStatus || normalizeJourneyStatus(client);
      client.journeyHistory = Array.isArray(undo.previousJourneyHistory)
        ? [...undo.previousJourneyHistory]
        : normalizeJourneyHistory(client.journeyHistory);
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

let templatePickerClientId = null;

function openTemplatePickerForClient(clientId = null) {
  const overlay = document.getElementById('templatePickerOverlay');
  if (!overlay) return;
  const searchInput = document.getElementById('templatePickerSearch');
  templatePickerClientId = clientId;
  renderTemplatePickerList(searchInput?.value || '');
  toggleFadeOverlay(overlay, true);
}

function renderTemplatePickerList(search = '') {
  const list = document.getElementById('templatePickerList');
  if (!list) return;
  const term = (search || '').toLowerCase();
  const initialTemplate = getInitialTemplate();
  const initialVariations = getInitialTemplateVariations(initialTemplate)
    .filter(variation => {
      if (!term) return true;
      const titleMatch = (initialTemplate?.title || '').toLowerCase().includes(term);
      const variationMatch = (variation.title || '').toLowerCase().includes(term);
      const bodyMatch = (variation.body || '').toLowerCase().includes(term);
      return titleMatch || variationMatch || bodyMatch;
    });
  const additionalTemplates = templates
    .filter(template => !isInitialTemplate(template))
    .filter(template => resolveTemplateSearchMatch(template, term));

  if (!initialVariations.length && !additionalTemplates.length) {
    list.innerHTML = '<p class="muted">No hay plantillas que coincidan.</p>';
    return;
  }

  const initialSection = initialVariations.length ? `
    <div class="template-picker-section">
      <div class="template-picker-section-head">
        <span>Plantilla Inicial</span>
        <span class="pill">Variaciones</span>
      </div>
      ${initialVariations.map(variation => {
        const body = variation.body || '';
        const preview = `${body.slice(0, 140)}${body.length > 140 ? '…' : ''}`;
        return `
          <button class="template-picker-item" type="button" data-id="${initialTemplate.id}" data-variation-id="${variation.id}">
            <strong>${initialTemplate.title || 'Mensaje de inicio'} / ${variation.title || 'Variación'}</strong>
            <p class="muted">${preview}</p>
            <span class="pill">${extractVariables(body).length || 0} variables</span>
          </button>
        `;
      }).join('')}
    </div>
  ` : '';

  const additionalSection = additionalTemplates.length ? `
    <div class="template-picker-section">
      <div class="template-picker-section-head">
        <span>Plantillas Adicionales</span>
        <span class="pill">${additionalTemplates.length}</span>
      </div>
      ${additionalTemplates.map(template => {
        const body = resolveTemplateBody(template);
        const preview = `${body.slice(0, 140)}${body.length > 140 ? '…' : ''}`;
        return `
          <button class="template-picker-item" type="button" data-id="${template.id}">
            <strong>${template.title || 'Plantilla sin título'}</strong>
            <p class="muted">${preview}</p>
            <span class="pill">${extractVariables(body).length || 0} variables</span>
          </button>
        `;
      }).join('')}
    </div>
  ` : '';

  list.innerHTML = `${initialSection}${additionalSection}`;
}

function bindTemplatePicker() {
  const openBtn = document.getElementById('openTemplatePicker');
  const overlay = document.getElementById('templatePickerOverlay');
  const closeBtn = document.getElementById('closeTemplatePicker');
  const searchInput = document.getElementById('templatePickerSearch');
  const list = document.getElementById('templatePickerList');

  const closePicker = () => {
    templatePickerClientId = null;
    toggleFadeOverlay(overlay, false);
  };

  if (openBtn) openBtn.addEventListener('click', () => openTemplatePickerForClient());
  if (closeBtn) closeBtn.addEventListener('click', closePicker);
  if (searchInput) {
    searchInput.addEventListener('input', () => renderTemplatePickerList(searchInput.value));
  }
  if (list) {
    list.addEventListener('click', async (event) => {
      const item = event.target.closest('[data-id]');
      if (!item) return;
      const template = templates.find(t => t.id === item.dataset.id);
      if (!template) return;
      const variationId = item.dataset.variationId || null;
      if (templatePickerClientId) {
        const client = managerClients.find(c => c.id === templatePickerClientId);
        if (client) {
          copyText(buildTemplateTextForClient(template, client, { variationId }), 'Plantilla copiada');
        } else {
          await copyTemplateContent(template, { showStatus: false, variationId });
        }
      } else {
        await copyTemplateContent(template, { showStatus: false, variationId });
      }
      closePicker();
    });
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
    const statusOption = action.statusKey && action.statusKey !== 'none'
      ? getJourneyStatusOption(action.statusKey)
      : null;
    const statusLabel = statusOption?.label || 'Sin actualización de estado';
    return `
      <div class="action-row" data-custom-id="${action.id}">
        <div class="action-main">
          <div class="icon" style="color:${action.color}; background:${hexToRgba(action.color || '#38bdf8', 0.16)}"><i class='bx ${action.icon}'></i></div>
          <div class="action-meta">
            <span class="label">${action.label}</span>
            <span class="muted">Personalizada · Estado automático: ${statusLabel}</span>
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

function renderCustomActionStatusSelect(selectedKey = 'none') {
  const select = document.getElementById('customActionStatus');
  if (!select) return;
  select.innerHTML = buildJourneyStatusOptions(selectedKey, { includeNone: true });
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
  renderCustomActionStatusSelect('none');
}

function startCustomActionEdit(action = null) {
  const label = document.getElementById('customActionLabel');
  const color = document.getElementById('customActionColor');
  const title = document.getElementById('customActionTitle');
  const subtitle = document.getElementById('customActionSubtitle');
  const statusSelect = document.getElementById('customActionStatus');
  if (!label || !color || !title || !subtitle) return;
  editingCustomActionId = action?.id || null;
  label.value = action?.label || '';
  color.value = action?.color || '#38bdf8';
  selectedCustomIcon = action?.icon || 'bx-check-circle';
  title.textContent = action ? 'Editar acción personalizada' : 'Crear acción personalizada';
  subtitle.textContent = action ? 'Editar acción' : 'Nueva acción';
  renderIconPicker(selectedCustomIcon);
  if (statusSelect) {
    const currentKey = action?.statusKey || 'none';
    renderCustomActionStatusSelect(currentKey);
  }
}

function hideCustomActionForm() {
  const wizardOverlay = document.getElementById('customActionOverlay');
  toggleFadeOverlay(wizardOverlay, false);
}

function saveCustomAction() {
  const label = document.getElementById('customActionLabel');
  const color = document.getElementById('customActionColor');
  const statusSelect = document.getElementById('customActionStatus');
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
    statusKey: statusSelect?.value || 'none',
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
  showModal(modal);
  textarea.focus();
}

function closeClientNotes() {
  const modal = document.getElementById('clientNoteModal');
  if (!modal) return;
  hideModal(modal);
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
  return ensureJourneyStatusData(mapped);
}

async function handleClientImport(file, importDate = '') {
  if (!ensureWriteAccess('La importación de clientes está deshabilitada en modo sin conexión.')) {
    return;
  }
  showImportOverlay({
    eyebrow: 'Importación de Excel',
    title: 'Preparando importación del Excel',
    subtitle: 'Espera un momento...',
    helper: 'Estamos leyendo los datos para la importación...',
    steps: [
      'Leyendo datos del archivo del Excel...',
      'Leyendo registros...',
      'Espera un momento...'
    ]
  });
  await wait(1000);
  try {
    updateImportOverlayStep(0, 'Leyendo datos del archivo del Excel...');
    updateImportOverlayProgress(10, 100);
    const buffer = await readFileAsArrayBuffer(file);
    const data = new Uint8Array(buffer);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const [headerRow, ...rows] = json;
    if (!headerRow || !rows.length) {
      hideImportOverlay();
      showToast('El archivo no tiene registros.', 'error');
      return;
    }

    updateImportOverlayStep(1, 'Leyendo registros...', `(0/${rows.length})`);
    updateImportOverlayProgress(25, 100);
    const previewStep = Math.max(1, Math.round(rows.length / 18));
    for (let count = 0; count <= rows.length; count += previewStep) {
      const current = Math.min(count, rows.length);
      updateImportOverlayStep(1, 'Leyendo registros...', `(${current}/${rows.length})`);
      updateImportOverlayProgress(25 + (current / rows.length) * 25, 100);
      await nextFrame();
    }
    const columns = buildImportColumns(headerRow, rows);
    const guessedMapping = guessImportMapping(columns);

    hideImportOverlay();
    const mapping = await openImportMappingModal(headerRow, rows, columns, guessedMapping);
    if (!mapping) return;
    const headersToUse = buildHeadersFromMapping(mapping, columns.length);
    const showWarning = Object.keys(guessedMapping).length !== importRequiredFields.length;

    showImportOverlay({
      eyebrow: 'Importación de Excel',
      title: 'Importando registros',
      subtitle: 'Espera un momento...',
      helper: 'Estamos aplicando la importación en tu base de datos.',
      steps: [
        'Importando registros...',
        'Actualizando paneles...'
      ]
    });
    await wait(1000);

    const existingKeys = new Set(managerClients.map(c => `${(c.name || '').toLowerCase().trim()}|${normalizePhone(c.phone)}`));
    let imported = 0;
    let processed = 0;
    rows.forEach(r => {
      processed += 1;
      const mapped = mapRow(r, headersToUse, importDate);
      const key = `${mapped.name.toLowerCase().trim()}|${normalizePhone(mapped.phone)}`;
      if (!existingKeys.has(key)) {
        existingKeys.add(key);
        imported += 1;
        managerClients.push(mapped);
      }
      if (processed % 20 === 0 || processed === rows.length) {
        updateImportOverlayStep(0, 'Importando registros...', `(${processed}/${rows.length})`);
        updateImportOverlayProgress(processed, rows.length);
      }
    });
    updateImportOverlayStep(1, 'Actualizando paneles...');
    updateImportOverlayProgress(rows.length, rows.length);
    persist();
    renderClientManager();
    const importedPanel = document.getElementById('importedDataManager');
    if (importedPanel?.classList.contains('active')) {
      renderImportedDataManager();
    }
    renderStats();
    const extra = showWarning ? ' (usando asignación manual)' : '';
    showToast(`Se han importado ${imported} clientes correctamente${extra}.`, 'success');
  } catch (err) {
    console.error(err);
    showToast('No se pudo procesar el Excel.', 'error');
  } finally {
    hideImportOverlay();
  }
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

function accountCounters() {
  const settings = mergeGlobalSettings(uiState.globalSettings);
  const counts = Object.fromEntries((settings.accounts || []).map(account => [account.id, 0]));
  managerClients.forEach(client => {
    const status = clientStatus(client);
    const meta = client.contactMeta;
    if (status.className === 'status-pending' || !meta?.accountId) return;
    if (counts[meta.accountId] !== undefined) {
      counts[meta.accountId] += 1;
    }
  });
  return counts;
}

function renderAccountFilter() {
  const select = document.getElementById('accountFilter');
  const label = document.getElementById('accountFilterLabel');
  if (!select) return;
  const settings = mergeGlobalSettings(uiState.globalSettings);
  const counts = accountCounters();
  const options = [
    { value: 'all', label: 'Todas', count: Object.values(counts).reduce((sum, val) => sum + val, 0) }
  ].concat((settings.accounts || []).map(account => {
    const phoneLabel = formatPhoneDisplay(account.phone || '') || account.phone || 'Sin teléfono';
    return {
      value: account.id,
      label: `${account.name} (${phoneLabel})`,
      count: counts[account.id] || 0
    };
  }));
  select.innerHTML = options.map(opt => `<option value="${opt.value}">(${opt.count}) ${opt.label}</option>`).join('');
  if (!options.some(opt => opt.value === clientManagerState.accountFilter)) {
    clientManagerState.accountFilter = 'all';
  }
  select.value = clientManagerState.accountFilter;
  const current = options.find(opt => opt.value === select.value) || options[0];
  if (label) label.textContent = `(${current.count}) ${current.label}`;
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
    client.contactMeta?.accountName,
    status
  ];
  return values.filter(Boolean).map(v => v.toString().toLowerCase()).join(' ');
}

function filteredManagerClients() {
  const search = (clientManagerState.search || '').toLowerCase();
  const accountFilter = clientManagerState.accountFilter || 'all';
  return managerClients.filter(c => {
    const status = clientStatus(c).label;
    const matchesSearch = !search || clientSearchHaystack(c).includes(search);
    const matchesDate = isWithinDateRange(c.systemDate, clientManagerState.dateRange);
    const matchesStatus = (
      clientManagerState.statusFilter === 'all'
        ? true
        : clientManagerState.statusFilter === 'contacted' ? c.flags?.contacted
        : clientManagerState.statusFilter === 'no_number' ? c.flags?.noNumber
        : clientManagerState.statusFilter === 'favorite' ? c.flags?.favorite
        : clientManagerState.statusFilter?.startsWith('custom:') ? c.flags?.customStatus?.id === clientManagerState.statusFilter.split(':')[1]
        : !(c.flags?.contacted || c.flags?.noNumber || c.flags?.favorite || c.flags?.customStatus)
    );
    const matchesAccount = (
      accountFilter === 'all'
        ? true
        : c.contactMeta?.accountId === accountFilter
    );
    return matchesSearch && matchesStatus && matchesDate && matchesAccount && status !== 'Oculto';
  });
}

function visibleManagerClients() {
  return managerClients.filter(c => clientStatus(c).label !== 'Oculto');
}

function hasActiveManagerFilters() {
  const search = (clientManagerState.search || '').trim();
  const range = clientManagerState.dateRange || {};
  const status = clientManagerState.statusFilter || 'all';
  const account = clientManagerState.accountFilter || 'all';
  return !!search || !!range.from || !!range.to || (status && status !== 'all') || (account && account !== 'all');
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
  const pendingCount = document.getElementById('assistantPendingCount');
  if (!helper) return;
  if (!pending.length) {
    helper.textContent = 'No hay clientes pendientes para contactar.';
    if (pendingCount) pendingCount.textContent = '0 pendientes';
    return;
  }
  const state = normalizeContactAssistantState();
  const index = Math.min(state.currentIndex, pending.length - 1);
  helper.textContent = 'Contacto listo para gestionar.';
  if (pendingCount) pendingCount.textContent = `Pendientes: ${index + 1}/${pending.length}`;
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
  const { pending, current } = assistantContext();
  const actionCards = Array.from(document.querySelectorAll('[data-assistant-action]'));
  const statusButtons = ['assistantMarkContacted', 'assistantMarkNoNumber'].map(id => document.getElementById(id));
  if (!overlay || !card || !name || !phone || !messagePreview) return;

  updateAssistantUndo();

  if (!pending.length || !current) {
    name.textContent = 'Sin pendientes';
    phone.textContent = '-';
    messagePreview.textContent = 'No hay clientes pendientes para contactar.';
    actionCards.forEach(cardEl => {
      cardEl.classList.add('is-disabled');
      cardEl.setAttribute('aria-disabled', 'true');
    });
    statusButtons.forEach(btn => btn && (btn.disabled = true));
    updateAssistantHelper([]);
    return;
  }

  actionCards.forEach(cardEl => {
    cardEl.classList.remove('is-disabled');
    cardEl.removeAttribute('aria-disabled');
  });
  statusButtons.forEach(btn => btn && (btn.disabled = false));

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
  renderAssistantAccountSelector();
  const quickOverlay = document.getElementById('assistantQuickAdjustOverlay');
  if (quickOverlay?.classList.contains('show')) {
    renderAssistantQuickAdjust();
  }
}

function normalizeAssistantQuickAdjustState() {
  const current = clientManagerState.contactAssistantQuickAdjust || {};
  const search = (current.search || '').toString();
  const selectedId = current.selectedId || null;
  clientManagerState.contactAssistantQuickAdjust = { search, selectedId };
  return clientManagerState.contactAssistantQuickAdjust;
}

function assistantQuickAdjustMatches(client, term) {
  const normalized = normalizeSearchTerm(term);
  if (!normalized) return false;
  const haystack = [
    client.name,
    client.document,
    client.cuit,
    client.phone,
    client.model,
    client.city,
    client.province
  ].map(value => normalizeSearchTerm(value)).join(' ');
  return haystack.includes(normalized);
}

function buildAssistantQuickDetail(client) {
  if (!client) {
    return '<p class="muted">Busca un cliente para ver su ficha completa.</p>';
  }
  const status = clientStatus(client);
  const accountName = client.contactMeta?.accountName || 'Sin cuenta';
  const phoneLabel = formatPhoneDisplay(client.phone || '') || 'Sin teléfono';
  const location = [client.city, client.province].filter(Boolean).join(' - ') || 'Sin ubicación';
  const detailTags = [
    ['Teléfono', phoneLabel],
    ['Modelo', client.model || 'Sin modelo'],
    ['Marca', client.brand || 'Sin marca'],
    ['Documento', client.document || 'Sin datos'],
    ['CUIT', client.cuit || 'Sin datos'],
    ['Ubicación', location],
    ['Estado', status.label],
  ];
  return `
    <div class="assistant-quick-detail-tags">
      <div class="client-detail-head">
        <strong>${client.name || 'Sin nombre'}</strong>
      </div>
      <div class="assistant-quick-tags">
        ${detailTags.map(([label, value]) => `
          <span class="detail-tag" title="${label}: ${value}">
            <span class="detail-tag-label">${label}</span>
            <span class="detail-tag-value">${value}</span>
          </span>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAssistantQuickAdjust() {
  const overlay = document.getElementById('assistantQuickAdjustOverlay');
  const searchInput = document.getElementById('assistantQuickSearch');
  const results = document.getElementById('assistantQuickResults');
  const detail = document.getElementById('assistantQuickDetail');
  const actions = document.getElementById('assistantQuickActions');
  if (!overlay || !results || !detail || !actions) return;

  const state = normalizeAssistantQuickAdjustState();
  if (searchInput && searchInput.value !== state.search) {
    searchInput.value = state.search;
  }
  const term = normalizeSearchTerm(state.search);
  const matches = term
    ? managerClients.filter(client => assistantQuickAdjustMatches(client, term))
    : [];
  const trimmed = matches.slice(0, 60);

  if (!trimmed.length) {
    results.innerHTML = term
      ? '<p class="muted">No se encontraron resultados con ese criterio.</p>'
      : '<p class="muted">Escribe un nombre o documento para comenzar la búsqueda.</p>';
  } else {
    results.innerHTML = trimmed.map(client => {
      const phoneLabel = formatPhoneDisplay(client.phone || '') || 'Sin teléfono';
      const status = clientStatus(client).label;
      const active = client.id === state.selectedId ? ' active' : '';
      return `
        <div class="assistant-quick-card${active}" data-quick-client="${client.id}">
          <strong>${client.name || 'Sin nombre'}</strong>
          <span class="muted tiny">${client.model || 'Sin modelo'} · ${phoneLabel}</span>
          <span class="muted tiny">${status}</span>
        </div>
      `;
    }).join('');
  }

  const selected = managerClients.find(client => client.id === state.selectedId) || trimmed[0] || null;
  if (selected && selected.id !== state.selectedId) {
    clientManagerState.contactAssistantQuickAdjust.selectedId = selected.id;
  }
  detail.innerHTML = buildAssistantQuickDetail(selected);

  if (!selected) {
    actions.innerHTML = '';
    return;
  }
  const quickActions = [
    {
      key: 'mark_contacted',
      icon: 'bx-check-circle',
      tone: 'success',
      label: 'Marcar como Contactado',
      description: 'Confirma que ya se realizó el contacto.',
      handler: () => updateClientFlag(selected.id, 'contacted', true)
    },
    {
      key: 'mark_no_number',
      icon: 'bx-block',
      tone: 'warning',
      label: 'Número no disponible',
      description: 'Marca el contacto como número inválido.',
      handler: () => updateClientFlag(selected.id, 'noNumber', true)
    },
    {
      key: 'mark_favorite',
      icon: 'bx-star',
      tone: 'info',
      label: 'Favorito',
      description: 'Destaca este cliente como prioridad.',
      handler: () => updateClientFlag(selected.id, 'favorite', true)
    }
  ];
  const customQuickActions = (clientManagerState.customActions || [])
    .filter(action => action.visible !== false)
    .map(action => ({
      key: `custom:${action.id}`,
      icon: action.icon || 'bx-star',
      label: action.label || 'Acción personalizada',
      description: 'Acción personalizada del gestor.',
      color: action.color || '#a855f7',
      handler: () => handleCustomAction(action.id, selected.id)
    }));
  const mergedQuickActions = [...quickActions, ...customQuickActions];

  const options = clientActionOptions(selected, { returnToMenu: false }).filter(option => option.key !== 'done');
  actions.innerHTML = `
    <div class="assistant-quick-section">
      <p class="eyebrow">Acciones rápidas</p>
      <div class="assistant-quick-actions-grid">
        ${mergedQuickActions.map(opt => {
          const iconStyle = opt.color ? `style="color:${opt.color}; background:${hexToRgba(opt.color, 0.16)}"` : '';
          return `
          <div class="action-card" data-quick-key="${opt.key}">
            <div class="action-card-head">
              <span class="action-icon" ${opt.tone ? `data-tone="${opt.tone}"` : ''} ${opt.color ? iconStyle : ''}><i class='bx ${opt.icon}'></i></span>
              <div>
                <span class="label">${opt.label}</span>
                <p class="muted tiny">${opt.description}</p>
              </div>
            </div>
            <button class="secondary-btn action-btn" data-quick-action="${opt.key}">
              <span>Aplicar</span><i class='bx bx-chevron-right'></i>
            </button>
          </div>
        `;
        }).join('')}
      </div>
    </div>
    <div class="assistant-quick-section">
      <p class="eyebrow">Otras acciones...</p>
      <div class="assistant-quick-actions-list">
        ${options.map(opt => `
          <div class="action-card" data-key="${opt.key}">
            <div class="action-card-head">
              <span class="action-icon" ${opt.tone ? `data-tone="${opt.tone}"` : ''}><i class='bx ${opt.icon || 'bx-dots-vertical-rounded'}'></i></span>
              <div>
                <span class="label">${opt.label}</span>
                <p class="muted tiny">${opt.description}</p>
                ${opt.currentValue ? `<p class="muted tiny current-value">[${opt.currentValue(selected)}]</p>` : ''}
              </div>
            </div>
            <button class="${opt.danger ? 'ghost-btn action-btn danger' : opt.primary ? 'primary-btn action-btn' : opt.highlight ? 'success-btn action-btn' : 'secondary-btn action-btn'}" data-action="${opt.key}">
              <span>${opt.danger ? 'Borrar' : (opt.buttonText || 'Seleccionar')}</span><i class='bx bx-chevron-right'></i>
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  actions.querySelectorAll('[data-quick-action]').forEach(btn => {
    const key = btn.dataset.quickAction;
    const opt = mergedQuickActions.find(option => option.key === key);
    btn.onclick = () => {
      if (!opt?.handler) return;
      opt.handler();
      setTimeout(() => renderAssistantQuickAdjust(), 120);
    };
  });

  actions.querySelectorAll('[data-action]').forEach(btn => {
    const key = btn.dataset.action;
    const opt = options.find(option => option.key === key);
    btn.onclick = () => {
      if (!opt?.handler) return;
      opt.handler();
      setTimeout(() => renderAssistantQuickAdjust(), 120);
    };
  });

  results.querySelectorAll('[data-quick-client]').forEach(card => {
    if (card.dataset.bound) return;
    card.addEventListener('click', () => {
      clientManagerState.contactAssistantQuickAdjust.selectedId = card.dataset.quickClient;
      renderAssistantQuickAdjust();
    });
    card.dataset.bound = 'true';
  });
}

function openAssistantQuickAdjust() {
  const overlay = document.getElementById('assistantQuickAdjustOverlay');
  if (!overlay) return;
  renderAssistantQuickAdjust();
  toggleFadeOverlay(overlay, true);
  const searchInput = document.getElementById('assistantQuickSearch');
  setTimeout(() => searchInput?.focus(), 120);
}

function closeAssistantQuickAdjust() {
  const overlay = document.getElementById('assistantQuickAdjustOverlay');
  if (!overlay) return;
  toggleFadeOverlay(overlay, false);
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

const CONTACT_LOG_RANGES = [
  { key: '24h', label: 'Últimas 24hs', hours: 24 },
  { key: '7d', label: 'Última Semana', hours: 24 * 7 },
  { key: '30d', label: 'Último Mes', hours: 24 * 30 }
];

function resolveContactLogCutoff(rangeKey, now = Date.now()) {
  if (rangeKey === 'all') return null;
  const option = CONTACT_LOG_RANGES.find(item => item.key === rangeKey);
  if (!option) return null;
  return now - (option.hours * 60 * 60 * 1000);
}

function contactLogEntries({ search = null, statusFilter = null, range = null } = {}) {
  const searchTerm = (typeof search === 'string' ? search : (clientManagerState.contactLogSearch || '')).toLowerCase();
  const statusValue = typeof statusFilter === 'string'
    ? statusFilter
    : (clientManagerState.contactLogStatusFilter || 'all');
  const rangeValue = typeof range === 'string'
    ? range
    : (clientManagerState.contactLogRange || '24h');
  const cutoff = resolveContactLogCutoff(rangeValue);
  return managerClients
    .map(c => {
      const status = clientStatus(c);
      return {
        id: c.id,
        name: c.name || 'Sin nombre',
        phone: normalizePhone(c.phone || ''),
        status,
        accountName: c.contactMeta?.accountName || '',
        contactDate: c.contactDate || '',
        fallbackDate: c.systemDate || ''
      };
    })
    .filter(item => item.status.className !== 'status-pending')
    .map(item => ({ ...item, effectiveDate: item.contactDate || normalizeDateTime(item.fallbackDate) }))
    .filter(item => !!item.effectiveDate)
    .filter(item => {
      if (!cutoff) return true;
      const time = new Date(item.effectiveDate).getTime();
      return Number.isFinite(time) && time >= cutoff;
    })
    .filter(item => (statusValue === 'all' ? true : item.status.className === statusValue))
    .filter(item => [item.name, item.phone, item.status.label].some(val => val.toLowerCase().includes(searchTerm)))
    .sort((a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime());
}

function renderContactLogStatusFilter(entries = []) {
  const select = document.getElementById('contactLogStatusFilter');
  if (!select) return;
  const counts = entries.reduce((acc, entry) => {
    const key = entry.status.className;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const options = [
    { value: 'all', label: 'Todos', count: entries.length },
    { value: 'status-contacted', label: 'Contactados', count: counts['status-contacted'] || 0 },
    { value: 'status-no-number', label: 'Número no disponible', count: counts['status-no-number'] || 0 },
    { value: 'status-favorite', label: 'Favoritos', count: counts['status-favorite'] || 0 }
  ];
  if (counts['status-custom']) {
    options.push({ value: 'status-custom', label: 'Acciones personalizadas', count: counts['status-custom'] || 0 });
  }
  select.innerHTML = options.map(opt => `<option value="${opt.value}">${opt.label} (${opt.count})</option>`).join('');
  if (!options.some(opt => opt.value === clientManagerState.contactLogStatusFilter)) {
    clientManagerState.contactLogStatusFilter = 'all';
  }
  select.value = clientManagerState.contactLogStatusFilter;
}

function renderContactLogRangeTabs(entries = []) {
  const tabContainer = document.getElementById('contactLogRangeTabs');
  if (!tabContainer) return;
  const currentRange = clientManagerState.contactLogRange || '24h';
  tabContainer.querySelectorAll('[data-contact-range]').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.contactRange === currentRange);
  });
  const counts = CONTACT_LOG_RANGES.reduce((acc, range) => {
    const cutoff = resolveContactLogCutoff(range.key);
    acc[range.key] = entries.filter(entry => {
      if (!cutoff) return true;
      const time = new Date(entry.effectiveDate).getTime();
      return Number.isFinite(time) && time >= cutoff;
    }).length;
    return acc;
  }, {});
  tabContainer.querySelectorAll('[data-contact-range]').forEach(tab => {
    const key = tab.dataset.contactRange;
    const countEl = tab.querySelector('[data-range-count]');
    if (countEl) countEl.textContent = counts[key] ?? 0;
  });
}

const clientGridCompactWidths = {
  name: '210px',
  model: '170px',
  phone: '150px',
  contactDate: '170px',
  brand: '140px',
  city: '140px',
  province: '140px',
  document: '140px',
  cuit: '140px',
  birthDate: '160px',
  purchaseDate: '160px',
  systemDate: '160px',
  postalCode: '110px',
  type: '150px',
  status: '210px',
  actions: '240px'
};

function isClientManagerCompactView() {
  const width = window.innerWidth || document.documentElement.clientWidth || 0;
  return width >= 901 && width <= 1320;
}

function getClientGridColumnWidth(key, isCompact) {
  if (isCompact && clientGridCompactWidths[key]) {
    return clientGridCompactWidths[key];
  }
  return clientColumnWidths[key] || '160px';
}

function renderClientManager() {
  const grid = document.getElementById('clientManagerTable');
  const helper = document.getElementById('clientManagerHelper');
  if (!grid) return;
  const head = grid.querySelector('.grid-head');
  const bodyContainer = grid.querySelector('.grid-body');
  if (!head || !bodyContainer) return;
  renderStatusFilter();
  renderAccountFilter();
  renderDateFilterHelper();
  renderSearchNotice();

  const isCompact = isClientManagerCompactView();
  const visibleColumns = Object.entries(clientColumns).filter(([key]) => clientManagerState.columnVisibility[key]);
  const templateColumns = [
    ...visibleColumns.map(([key]) => `minmax(${getClientGridColumnWidth(key, isCompact)}, 1fr)`),
    `minmax(${getClientGridColumnWidth('status', isCompact)}, 1fr)`,
    `minmax(${getClientGridColumnWidth('actions', isCompact)}, 240px)`
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
      const statusMeta = buildStatusMetaHtml(c, status);
      const journeyLabel = journeyStatusLabel(c);
      const journeyShortLabel = journeyStatusShortLabel(c);
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
            <div class="status-stack">
              <span class="status-pill ${status.className}">${status.label}</span>
              ${statusMeta}
              <div class="journey-status-block" title="Actualizar estado de jornada">
                <span class="journey-status-label">Estado:</span>
                <button class="journey-status-pill" type="button" data-action="update_status" title="${journeyLabel}">${journeyShortLabel}</button>
              </div>
            </div>
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

function updateImportedManagerSelectionUI() {
  const summary = document.getElementById('importedManagerSummary');
  const total = managerClients.length;
  const selected = importedManagerState.selectedIds.size;
  if (summary) {
    summary.textContent = total
      ? `Total ${total} registros · Seleccionados ${selected}`
      : 'Aún no hay clientes importados.';
  }
  document.querySelectorAll('input[data-imported-group-toggle]').forEach(input => {
    const groupKey = input.dataset.importedGroupToggle;
    const groupInputs = Array.from(document.querySelectorAll(`input[data-imported-id][data-imported-group="${groupKey}"]`));
    const groupTotal = groupInputs.length;
    const groupSelected = groupInputs.filter(item => item.checked).length;
    input.checked = groupTotal > 0 && groupSelected === groupTotal;
    input.indeterminate = groupSelected > 0 && groupSelected < groupTotal;
  });
}

function updateImportedManagerSearchNotice() {
  const notice = document.getElementById('importedManagerSearchNotice');
  const termLabel = document.getElementById('importedManagerSearchTerm');
  const term = (importedManagerState.searchTerm || '').trim();
  if (!notice || !termLabel) return;
  if (term) {
    termLabel.textContent = term;
    notice.classList.remove('hidden');
  } else {
    termLabel.textContent = '';
    notice.classList.add('hidden');
  }
}

function normalizeSearchTerm(value) {
  return (value || '')
    .toString()
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function isImportedSearchMatch(client, term) {
  if (!term) return false;
  const name = normalizeSearchTerm(client.name || '');
  const document = normalizeSearchTerm(client.document || '');
  const phone = normalizeSearchTerm(client.phone || '');
  return name.includes(term) || document.includes(term) || phone.includes(term);
}

function runImportedManagerSearch({ scroll = true, term } = {}) {
  const content = document.getElementById('importedManagerContent');
  if (typeof term === 'string') {
    importedManagerState.searchTerm = term.trim();
  }
  const termNormalized = normalizeSearchTerm(importedManagerState.searchTerm);
  renderImportedDataManager();
  if (!termNormalized) return;
  if (!scroll || !content) return;
  const firstMatch = content.querySelector('.import-record-row');
  if (!firstMatch) {
    showToast('No se encontraron coincidencias en los registros importados.', 'warning');
    return;
  }
  const group = firstMatch.closest('details');
  if (group) group.open = true;
  firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function setManualImportDefaults(form) {
  if (!form) return;
  const systemDate = form.querySelector('[name="systemDate"]');
  if (systemDate && !systemDate.value) systemDate.value = formatLocalISO();
}

function openManualImportModal() {
  const modal = document.getElementById('manualImportModal');
  const form = document.getElementById('manualImportForm');
  if (!modal || !form) return;
  form.reset();
  setManualImportDefaults(form);
  toggleModal(modal, true);
}

function closeManualImportModal() {
  const modal = document.getElementById('manualImportModal');
  if (!modal) return;
  toggleModal(modal, false);
}

function buildManualClientPayload(form) {
  const data = new FormData(form);
  const rawName = (data.get('name') || '').toString().trim();
  const rawDocument = (data.get('document') || '').toString().trim();
  const rawPhone = (data.get('phone') || '').toString().trim();
  const entry = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: rawName || 'Sin nombre',
    document: rawDocument,
    phone: normalizePhone(rawPhone),
    birthDate: (data.get('birthDate') || '').toString(),
    city: (data.get('city') || '').toString().trim(),
    province: (data.get('province') || '').toString().trim(),
    postalCode: (data.get('postalCode') || '').toString().trim(),
    brand: (data.get('brand') || '').toString().trim(),
    model: (data.get('model') || '').toString().trim() || 'Sin modelo',
    purchaseDate: (data.get('purchaseDate') || '').toString(),
    cuit: (data.get('cuit') || '').toString().trim(),
    contactDate: normalizeDateTime((data.get('contactDate') || '').toString()),
    type: normalizeNotesValue(data.get('type')),
    systemDate: (data.get('systemDate') || '').toString().trim() || formatLocalISO(),
    flags: {},
    selected: false
  };
  return ensureJourneyStatusData(entry);
}

function getImportedGroups() {
  const groups = new Map();
  managerClients.forEach(client => {
    const dateKey = formatDateISO(client.systemDate) || 'sin_fecha';
    if (!groups.has(dateKey)) groups.set(dateKey, []);
    groups.get(dateKey).push(client);
  });
  return Array.from(groups.entries())
    .map(([key, clients]) => ({
      key,
      label: key === 'sin_fecha' ? 'Sin fecha asignada' : formatDateLabel(key),
      clients
    }))
    .sort((a, b) => {
      if (a.key === 'sin_fecha') return 1;
      if (b.key === 'sin_fecha') return -1;
      return new Date(b.key).getTime() - new Date(a.key).getTime();
    });
}

function renderImportedDataManager({ showLoader = false } = {}) {
  const content = document.getElementById('importedManagerContent');
  const loader = document.getElementById('importedManagerLoader');
  if (!content || !loader) return;
  const allIds = new Set(managerClients.map(client => client.id));
  importedManagerState.selectedIds = new Set(
    Array.from(importedManagerState.selectedIds).filter(id => allIds.has(id))
  );

  const runRender = () => {
    const groups = getImportedGroups();
    const normalizedTerm = normalizeSearchTerm(importedManagerState.searchTerm);
    const filteredGroups = normalizedTerm
      ? groups
        .map(group => ({
          ...group,
          clients: group.clients.filter(client => isImportedSearchMatch(client, normalizedTerm))
        }))
        .filter(group => group.clients.length)
      : groups;
    if (!filteredGroups.length) {
      const emptyMessage = normalizedTerm
        ? `No se encontraron resultados para "${importedManagerState.searchTerm}".`
        : 'No hay clientes importados para administrar.';
      content.innerHTML = `<div class="import-empty">${emptyMessage}</div>`;
      content.classList.remove('hidden');
      loader.classList.add('hidden');
      updateImportedManagerSelectionUI();
      updateImportedManagerSearchNotice();
      return;
    }
    content.innerHTML = filteredGroups.map((group, groupIndex) => {
      const rows = group.clients.map(client => {
        const checked = importedManagerState.selectedIds.has(client.id) ? 'checked' : '';
        const nameLabel = client.name?.trim() || 'Sin nombre';
        const documentLabel = client.document || 'Sin DNI';
        const phoneLabel = formatPhoneDisplay(client.phone || '') || client.phone || 'Sin teléfono';
        const highlightClass = isImportedSearchMatch(client, normalizedTerm) ? ' highlight' : '';
        return `
          <div class="import-record-row${highlightClass}">
            <input type="checkbox" data-imported-id="${client.id}" data-imported-group="${group.key}" ${checked} />
            <div class="import-record-main">
              <div class="import-record-name">${nameLabel}</div>
              <div class="import-record-meta">
                <span><i class='bx bx-id-card'></i>${documentLabel}</span>
                <span><i class='bx bx-phone'></i>${phoneLabel}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');
      const openState = groupIndex === 0 ? 'open' : '';
      return `
        <details class="import-day-group" ${openState}>
          <summary class="import-day-head">
            <div class="import-day-title">
              <span>Paquete de ingresados</span>
              <strong>${group.label}</strong>
            </div>
            <div class="import-day-actions">
              <div class="import-day-meta">${group.clients.length} registros</div>
              <label class="checkbox-pill mini">
                <input type="checkbox" data-imported-group-toggle="${group.key}" />
                <span>Marcar lote</span>
              </label>
            </div>
          </summary>
          <div class="import-record-scroll">
            <div class="import-record-list">${rows}</div>
          </div>
        </details>
      `;
    }).join('');
    content.classList.remove('hidden');
    loader.classList.add('hidden');
    updateImportedManagerSelectionUI();
    updateImportedManagerSearchNotice();
  };

  if (showLoader) {
    if (importedManagerTimer) clearTimeout(importedManagerTimer);
    importedManagerState.loading = true;
    loader.classList.remove('hidden');
    content.classList.add('hidden');
    importedManagerTimer = setTimeout(() => {
      importedManagerState.loading = false;
      runRender();
    }, 420);
    return;
  }

  runRender();
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

  const baseEntries = contactLogEntries({ search: clientManagerState.contactLogSearch || '', statusFilter: 'all', range: 'all' });
  renderContactLogStatusFilter(baseEntries);
  renderContactLogRangeTabs(baseEntries);
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
            <span class="status-pill ${entry.status.className}">${entry.status.label}${entry.accountName ? ` · ${entry.accountName}` : ''}</span>
            <span class="time-pill">${timeAgo(entry.effectiveDate)}</span>
            <span class="time-stamp">${formatDateTimeForDisplay(entry.effectiveDate)}</span>
          </div>
        </div>
      </div>
      <div class="contact-log-actions">
        <button class="secondary-btn mini" data-action="goto">Ir al contacto</button>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('[data-action="goto"]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.closest('.contact-log-item')?.dataset.id;
    if (!id) return;
    focusClientRow(id);
    toggleContactLog(false);
  }));
}

function resolveJourneyReportRange() {
  const today = formatLocalISO();
  const from = journeyReportState.from || today;
  const to = journeyReportState.to || today;
  return { from, to };
}

function collectJourneyHistoryEntries(from, to) {
  const fromDate = from ? new Date(`${from}T00:00:00`) : null;
  const toDate = to ? new Date(`${to}T23:59:59.999`) : null;
  const entries = [];
  managerClients.forEach(client => {
    const history = Array.isArray(client.journeyHistory) ? client.journeyHistory : [];
    history.forEach(entry => {
      if (!entry?.timestamp) return;
      const entryDate = new Date(entry.timestamp);
      if (Number.isNaN(entryDate.getTime())) return;
      if (fromDate && entryDate < fromDate) return;
      if (toDate && entryDate > toDate) return;
      entries.push({ ...entry, clientId: client.id });
    });
  });
  return entries;
}

function renderJourneyReport() {
  const fromInput = document.getElementById('journeyReportFrom');
  const toInput = document.getElementById('journeyReportTo');
  const advisor = document.getElementById('journeyReportAdvisor');
  const period = document.getElementById('journeyReportPeriod');
  const total = document.getElementById('journeyReportTotal');
  const list = document.getElementById('journeyReportList');
  if (!fromInput || !toInput || !advisor || !period || !total || !list) return;

  const { from, to } = resolveJourneyReportRange();
  if (fromInput.value !== from) fromInput.value = from;
  if (toInput.value !== to) toInput.value = to;

  const activeAccount = getActiveAccount();
  advisor.textContent = `Informe del asesor: ${resolveAccountAdvisorName(activeAccount) || uiState.globalSettings?.advisorName || 'Sin cuenta'}`;
  period.textContent = `Periodo del informe: ${formatDateLabel(from)} al ${formatDateLabel(to)}`;

  const entries = collectJourneyHistoryEntries(from, to);
  const uniqueClients = new Set(entries.map(entry => entry.clientId));
  total.textContent = `${uniqueClients.size}`;

  const counts = Object.fromEntries(JOURNEY_STATUS_OPTIONS.map(option => [option.key, 0]));
  entries.forEach(entry => {
    if (counts[entry.key] !== undefined) counts[entry.key] += 1;
  });

  list.innerHTML = JOURNEY_STATUS_OPTIONS.map(option => `
    <div class="journey-report-row">
      <span>${option.label}</span>
      <strong>${counts[option.key] || 0}</strong>
    </div>
  `).join('');
}

function openJourneyReportModal() {
  const modal = document.getElementById('journeyReportModal');
  if (!modal) return;
  const today = formatLocalISO();
  if (!journeyReportState.from) journeyReportState.from = today;
  if (!journeyReportState.to) journeyReportState.to = today;
  renderJourneyReport();
  toggleModal(modal, true);
}

function closeJourneyReportModal() {
  const modal = document.getElementById('journeyReportModal');
  toggleModal(modal, false);
}

function downloadJourneyReportPdf() {
  if (!window.pdfMake) {
    showToast('No se encontró la librería para exportar PDF.', 'error');
    return;
  }
  const { from, to } = resolveJourneyReportRange();
  const entries = collectJourneyHistoryEntries(from, to);
  const counts = Object.fromEntries(JOURNEY_STATUS_OPTIONS.map(option => [option.key, 0]));
  entries.forEach(entry => {
    if (counts[entry.key] !== undefined) counts[entry.key] += 1;
  });
  const uniqueClients = new Set(entries.map(entry => entry.clientId)).size;
  const activeAccount = getActiveAccount();
  const advisorName = resolveAccountAdvisorName(activeAccount) || uiState.globalSettings?.advisorName || 'Sin cuenta';
  const detailRows = JOURNEY_STATUS_OPTIONS.map(option => ([option.label, counts[option.key] || 0]));
  const docDefinition = {
    content: [
      { text: 'Informe de Jornada', style: 'title' },
      { text: `Informe del asesor: ${advisorName}`, style: 'subtitle' },
      { text: `Periodo del informe: ${formatDateLabel(from)} al ${formatDateLabel(to)}`, style: 'subtitle' },
      { text: `Cantidad de teléfonos contactados en el periodo: ${uniqueClients}`, margin: [0, 12, 0, 12] },
      { text: 'Detalle del informe', style: 'section' },
      {
        table: {
          headerRows: 1,
          widths: ['*', 80],
          body: [
            [{ text: 'Estado', style: 'tableHeader' }, { text: 'Cantidad', style: 'tableHeader' }],
            ...detailRows.map(row => ([row[0], String(row[1])]))
          ]
        },
        layout: 'lightHorizontalLines'
      }
    ],
    styles: {
      title: { fontSize: 18, bold: true, margin: [0, 0, 0, 6] },
      subtitle: { fontSize: 11, color: '#334155', margin: [0, 2, 0, 2] },
      section: { fontSize: 12, bold: true, margin: [0, 12, 0, 6] },
      tableHeader: { bold: true, fillColor: '#e2e8f0' }
    },
    defaultStyle: {
      fontSize: 10
    }
  };
  window.pdfMake.createPdf(docDefinition).download(`informe-jornada-${from}-al-${to}.pdf`);
}

function scheduledClientsList() {
  return managerClients
    .filter(client => client.schedule?.scheduledAt)
    .map(client => ({ ...client, scheduleAt: client.schedule.scheduledAt }))
    .sort((a, b) => new Date(a.scheduleAt).getTime() - new Date(b.scheduleAt).getTime());
}

function isMeaningfulLocation(value) {
  if (!value) return false;
  const normalized = value.toString().trim().toLowerCase();
  return normalized !== 'sin determinar' && normalized !== 'sin determinar.';
}

function isSameLocalDay(first, second) {
  return first.toDateString() === second.toDateString();
}

function renderScheduledSummary() {
  const totalEl = document.getElementById('scheduledTotalCount');
  const todayEl = document.getElementById('scheduledTodayCount');
  if (!totalEl && !todayEl) return;
  const scheduled = scheduledClientsList();
  const today = new Date();
  const todayCount = scheduled.filter(client => isSameLocalDay(new Date(client.scheduleAt), today)).length;
  if (totalEl) totalEl.textContent = String(scheduled.length);
  if (todayEl) todayEl.textContent = String(todayCount);
}

function updateScheduleClock() {
  const today = document.getElementById('scheduledToday');
  const now = document.getElementById('scheduledNow');
  if (!today || !now) return;
  const current = new Date();
  today.textContent = current.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: BUENOS_AIRES_TIMEZONE });
  now.textContent = current.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: BUENOS_AIRES_TIMEZONE });
}

function renderScheduledClients() {
  const timeline = document.getElementById('scheduledTimeline');
  const count = document.getElementById('scheduledCount');
  if (!timeline) return;
  const scheduled = scheduledClientsList();
  if (count) count.textContent = String(scheduled.length);
  renderScheduledSummary();

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
      isMeaningfulLocation(client.city) ? `<span class="schedule-tag">${client.city}</span>` : '',
      isMeaningfulLocation(client.province) ? `<span class="schedule-tag">${client.province}</span>` : ''
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
  contactLogInterval = setInterval(() => renderContactLog(), 1000);
}

function startScheduleClock() {
  if (scheduleClockInterval) clearInterval(scheduleClockInterval);
  updateScheduleClock();
  scheduleClockInterval = setInterval(updateScheduleClock, 1000);
}

function bindClientEditHandlers() {
  const actionOverlay = document.getElementById('clientActionOverlay');
  const closeAction = document.getElementById('clientActionClose');
  const editModal = document.getElementById('clientEditModal');
  const cancelEdit = document.getElementById('clientEditCancel');
  const closeEdit = document.getElementById('clientEditClose');
  const saveEdit = document.getElementById('clientEditSave');
  const statusModal = document.getElementById('clientStatusModal');
  const cancelStatus = document.getElementById('clientStatusCancel');
  const closeStatus = document.getElementById('clientStatusClose');
  const saveStatus = document.getElementById('clientStatusSave');
  const reassignModal = document.getElementById('clientReassignModal');
  const cancelReassign = document.getElementById('clientReassignCancel');
  const closeReassign = document.getElementById('clientReassignClose');
  const saveReassign = document.getElementById('clientReassignSave');
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
  [cancelStatus, closeStatus].forEach(btn => {
    if (btn && !btn.dataset.bound) {
      btn.addEventListener('click', () => closeClientStatusModal());
      btn.dataset.bound = 'true';
    }
  });
  if (saveStatus && !saveStatus.dataset.bound) {
    saveStatus.addEventListener('click', applyClientStatusUpdate);
    saveStatus.dataset.bound = 'true';
  }
  if (statusModal && !statusModal.dataset.bound) {
    statusModal.addEventListener('click', (event) => {
      if (event.target === statusModal) closeClientStatusModal();
    });
    statusModal.dataset.bound = 'true';
  }
  [cancelReassign, closeReassign].forEach(btn => {
    if (btn && !btn.dataset.bound) {
      btn.addEventListener('click', () => closeClientReassignModal());
      btn.dataset.bound = 'true';
    }
  });
  if (saveReassign && !saveReassign.dataset.bound) {
    saveReassign.addEventListener('click', applyClientReassignUpdate);
    saveReassign.dataset.bound = 'true';
  }
  if (reassignModal && !reassignModal.dataset.bound) {
    reassignModal.addEventListener('click', (event) => {
      if (event.target === reassignModal) closeClientReassignModal();
    });
    reassignModal.dataset.bound = 'true';
  }
}

function clientActionOptions(client, { returnToMenu = true } = {}) {
  const vehicleOptions = [...new Set([...(vehicles || []).map(v => v.name), client.model].filter(Boolean))];
  const formatDateValue = (value) => formatDateForDisplay(value) || 'Sin datos';
  return [
    {
      key: 'update_status',
      icon: 'bx-tag',
      tone: 'info',
      label: 'Actualizar estado',
      description: 'Selecciona el estado actual del cliente.',
      currentValue: () => journeyStatusLabel(client),
      handler: () => openClientStatusModal(client.id, { returnToMenu })
    },
    {
      key: 'reassign_account',
      icon: 'bx-transfer-alt',
      tone: 'info',
      label: 'Reasignación de cuenta',
      description: 'Actualiza la cuenta responsable del cliente.',
      currentValue: (c) => c.contactMeta?.accountName || 'Sin cuenta asignada',
      handler: () => openClientReassignModal(client.id, { returnToMenu })
    },
    {
      key: 'client_quotes',
      icon: 'bx-folder-open',
      tone: 'info',
      label: 'Cotizaciones del cliente',
      description: 'Revisa las cotizaciones vinculadas a este cliente.',
      currentValue: () => 'Abrir Mis Cotizaciones',
      handler: () => openClientQuotes(client.id)
    },
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
  bringOverlayToFront(overlay);
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
  showModal(modal);
  closeClientActionMenu();
}

function closeClientEditModal(returnToMenu = false) {
  const modal = document.getElementById('clientEditModal');
  const reopenId = returnToMenu ? (activeEditAction?.clientId || activeActionClientId) : null;
  if (!modal) return;
  hideModal(modal);
  activeEditAction = null;
  if (returnToMenu && reopenId) {
    setTimeout(() => openClientActionMenu(reopenId), 220);
  }
}

function openClientStatusModal(clientId = activeActionClientId, { returnToMenu = false } = {}) {
  const modal = document.getElementById('clientStatusModal');
  const title = document.getElementById('clientStatusTitle');
  const subtitle = document.getElementById('clientStatusSubtitle');
  const lastUpdate = document.getElementById('clientStatusLastUpdate');
  const select = document.getElementById('clientStatusSelect');
  const client = managerClients.find(c => c.id === clientId);
  if (!modal || !client || !select) return;
  activeStatusClientId = clientId;
  activeStatusReturnToMenu = returnToMenu;
  if (title) title.textContent = client.name || 'Cliente';
  if (subtitle) subtitle.textContent = client.model ? `Modelo: ${client.model}` : 'Actualiza el estado del cliente seleccionado.';
  const updatedAt = journeyStatusLastUpdate(client);
  if (lastUpdate) {
    lastUpdate.textContent = updatedAt
      ? `Última actualización de estado hecha para este cliente realizada el día: ${formatDetailedDateTime(updatedAt)}`
      : 'Última actualización de estado: Sin registros previos.';
  }
  const currentKey = normalizeJourneyStatus(client).key;
  select.innerHTML = buildJourneyStatusOptions(currentKey);
  toggleModal(modal, true);
  closeClientActionMenu();
}

function closeClientStatusModal(returnToMenu = activeStatusReturnToMenu) {
  const modal = document.getElementById('clientStatusModal');
  const reopenId = returnToMenu ? (activeStatusClientId || activeActionClientId) : null;
  if (!modal) return;
  toggleModal(modal, false);
  activeStatusClientId = null;
  activeStatusReturnToMenu = false;
  if (returnToMenu && reopenId) {
    setTimeout(() => openClientActionMenu(reopenId), 220);
  }
}

function applyClientStatusUpdate() {
  const select = document.getElementById('clientStatusSelect');
  const client = managerClients.find(c => c.id === activeStatusClientId);
  if (!client || !select) {
    closeClientStatusModal();
    return;
  }
  updateClientJourneyStatus(client, select.value);
  persist();
  renderClientManager();
  showToast('Estado actualizado correctamente', 'success');
  closeClientStatusModal();
}

function openClientReassignModal(clientId = activeActionClientId, { returnToMenu = false } = {}) {
  const modal = document.getElementById('clientReassignModal');
  const title = document.getElementById('clientReassignTitle');
  const subtitle = document.getElementById('clientReassignSubtitle');
  const statusLine = document.getElementById('clientReassignStatusLine');
  const accountLine = document.getElementById('clientReassignAccountLine');
  const select = document.getElementById('clientReassignSelect');
  const client = managerClients.find(c => c.id === clientId);
  if (!modal || !client || !select) return;
  activeReassignClientId = clientId;
  activeReassignReturnToMenu = returnToMenu;
  if (title) title.textContent = client.name || 'Cliente';
  if (subtitle) subtitle.textContent = client.model ? `Modelo: ${client.model}` : 'Reasigna la cuenta asociada al cliente.';
  if (statusLine) statusLine.textContent = `El cliente: ${client.name || 'Cliente'} está marcado como: ${clientStatus(client).label}`;
  const currentAccount = client.contactMeta?.accountName || 'Sin cuenta';
  if (accountLine) accountLine.textContent = `Por la cuenta: ${currentAccount}`;
  const settings = mergeGlobalSettings(uiState.globalSettings);
  const accounts = settings.accounts || [];
  const selectedId = client.contactMeta?.accountId || settings.activeAccountId || accounts[0]?.id || '';
  select.innerHTML = accounts.map(account => `
    <option value="${account.id}" ${account.id === selectedId ? 'selected' : ''}>${account.name}</option>
  `).join('');
  toggleModal(modal, true);
  closeClientActionMenu();
}

function closeClientReassignModal(returnToMenu = activeReassignReturnToMenu) {
  const modal = document.getElementById('clientReassignModal');
  const reopenId = returnToMenu ? (activeReassignClientId || activeActionClientId) : null;
  if (!modal) return;
  toggleModal(modal, false);
  activeReassignClientId = null;
  activeReassignReturnToMenu = false;
  if (returnToMenu && reopenId) {
    setTimeout(() => openClientActionMenu(reopenId), 220);
  }
}

function applyClientReassignUpdate() {
  const select = document.getElementById('clientReassignSelect');
  const client = managerClients.find(c => c.id === activeReassignClientId);
  if (!client || !select) {
    closeClientReassignModal();
    return;
  }
  const settings = mergeGlobalSettings(uiState.globalSettings);
  const account = settings.accounts.find(acc => acc.id === select.value);
  if (!account) {
    showToast('Selecciona una cuenta válida.', 'error');
    return;
  }
  const meta = client.contactMeta || {};
  const timestamp = meta.timestamp || client.contactDate || new Date().toISOString();
  client.contactMeta = {
    ...meta,
    accountId: account.id,
    accountName: account.name,
    timestamp
  };
  persist();
  renderClientManager();
  renderContactLog();
  showToast('Cuenta reasignada correctamente', 'success');
  closeClientReassignModal();
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
  const filtered = filteredManagerClients();
  const pagination = normalizePaginationState(clientManagerState.pagination || defaultClientManagerState.pagination);
  const index = filtered.findIndex(client => client.id === id);
  if (pagination.size && index >= 0) {
    const targetPage = Math.floor(index / pagination.size) + 1;
    if (targetPage !== pagination.page) {
      clientManagerState.pagination.page = targetPage;
      persist();
      renderClientManager();
    }
  }
  let attempts = 0;
  const highlightRow = () => {
    const row = document.querySelector(`#clientManagerTable .client-row[data-id="${id}"]`);
    if (row) {
      row.classList.add('jump-highlight');
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => row.classList.remove('jump-highlight'), 2000);
      return;
    }
    if (attempts < 5) {
      attempts += 1;
      setTimeout(highlightRow, 120);
    }
  };
  highlightRow();
}

function openClientQuotes(clientId) {
  const client = managerClients.find(item => item.id === clientId);
  if (!client) return;
  ensureQuoteGeneratorState();
  uiState.quoteGenerator.clientFilterId = clientId;
  uiState.quoteGenerator.hubSearchInput = client.name || '';
  uiState.quoteGenerator.hubSearch = '';
  setQuoteGeneratorView('hub');
  activatePanel('quoteGenerator');
  renderQuoteGeneratorHub();
  closeClientActionMenu();
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
        renderAdvisorSelector();
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

  document.querySelectorAll('#clientManagerTable .status-account-button').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openAccountInfoModal({
      accountId: btn.dataset.accountId || '',
      accountName: btn.dataset.accountName || '',
      contactDate: btn.dataset.contactDate || ''
    });
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
  if (clientManagerState.editingMode
    && !actionKey.startsWith('custom:')
    && !['update_status', 'reassign_account'].includes(actionKey)) return;
  if (actionKey.startsWith('custom:')) {
    const customId = actionKey.split(':')[1];
    handleCustomAction(customId, clientId);
    return;
  }
  if (actionKey === 'contacted') updateClientFlag(clientId, 'contacted');
  if (actionKey === 'no_number') updateClientFlag(clientId, 'noNumber');
  if (actionKey === 'favorite') updateClientFlag(clientId, 'favorite');
  if (actionKey === 'update_status') openClientStatusModal(clientId, { returnToMenu: false });
  if (actionKey === 'reassign_account') openClientReassignModal(clientId, { returnToMenu: false });
  if (actionKey === 'open_notes') openClientNotes(clientId);
  if (actionKey === 'client_quotes') openClientQuotes(clientId);
  if (actionKey === 'copy_message') copyText(buildMessageForClient(client, { advance: true }), 'Mensaje copiado');
  if (actionKey === 'copy_template') openTemplatePickerForClient(clientId);
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
    const activeAccount = getActiveAccount();
    client.contactDate = now;
    client.contactMeta = {
      accountId: activeAccount?.id || '',
      accountName: activeAccount?.name || 'Sin cuenta',
      timestamp: now
    };
  } else {
    client.contactDate = '';
    client.contactMeta = null;
  }
}

function buildStatusMetaHtml(client, status) {
  if (status.className === 'status-pending') return '';
  const meta = client.contactMeta || {};
  const accountName = meta.accountName || 'Sin cuenta';
  const timestamp = meta.timestamp || client.contactDate;
  const dateLine = formatContactMetaLine(timestamp);
  return `
    <div class="status-meta">
      <button class="status-meta-row status-account-button" type="button" data-account-id="${meta.accountId || ''}" data-account-name="${accountName}" data-contact-date="${timestamp || ''}">
        <i class='bx bx-user-circle'></i><strong>${accountName}</strong>
      </button>
      <div class="status-meta-row"><i class='bx bx-calendar'></i>${dateLine}</div>
    </div>
  `;
}

const BULK_MESSAGE_SNOOZE_MS = 60 * 60 * 1000;
const BULK_MESSAGE_WINDOW_MS = 24 * 60 * 60 * 1000;
let bulkWarningContext = null;

function pruneBulkMessageHistory(history = [], now = Date.now()) {
  return history
    .map(entry => Number(entry))
    .filter(entry => Number.isFinite(entry) && now - entry <= BULK_MESSAGE_WINDOW_MS);
}

function normalizeBulkMessageAccountState(state = {}, threshold = 30) {
  const count = Number(state.count) || 0;
  const nextReminderAt = Math.max(threshold, Number(state.nextReminderAt) || threshold);
  const snoozeUntil = Number(state.snoozeUntil) || 0;
  const history = pruneBulkMessageHistory(Array.isArray(state.history) ? state.history : []);
  return { count, nextReminderAt, snoozeUntil, history };
}

function updateBulkMessageAccountState(accountId, nextState, shouldPersist = true) {
  if (!accountId) return null;
  uiState.preferences = mergePreferences(uiState.preferences);
  uiState.preferences.bulkMessageWarning.accounts = {
    ...(uiState.preferences.bulkMessageWarning.accounts || {}),
    [accountId]: { ...nextState }
  };
  if (shouldPersist) persist();
  return uiState.preferences.bulkMessageWarning.accounts[accountId];
}

function openBulkMessageWarningModal({ accountId, accountName, accountPhone, count, threshold }) {
  const modal = document.getElementById('bulkMessageWarningModal');
  const message = document.getElementById('bulkWarningMessage');
  if (!modal || !message) return;
  bulkWarningContext = { accountId, count, threshold };
  const phoneLabel = accountPhone || 'Sin teléfono';
  message.textContent = `La cuenta: ${accountName} (Teléfono: ${phoneLabel}) lleva enviados: ${count} / ${threshold} mensajes. Ten cuidado.`;
  toggleModal(modal, true);
}

function closeBulkMessageWarningModal() {
  const modal = document.getElementById('bulkMessageWarningModal');
  if (!modal) return;
  toggleModal(modal, false);
  bulkWarningContext = null;
}

function applyBulkMessageReminder(offset = 5) {
  if (!bulkWarningContext?.accountId) return;
  const accountId = bulkWarningContext.accountId;
  const prefs = mergePreferences(uiState.preferences).bulkMessageWarning;
  const nextState = normalizeBulkMessageAccountState(
    prefs.accounts?.[accountId],
    prefs.threshold
  );
  nextState.nextReminderAt = (bulkWarningContext.count || nextState.count) + offset;
  nextState.snoozeUntil = 0;
  updateBulkMessageAccountState(accountId, nextState);
  closeBulkMessageWarningModal();
}

function applyBulkMessageSnooze() {
  if (!bulkWarningContext?.accountId) return;
  const accountId = bulkWarningContext.accountId;
  const prefs = mergePreferences(uiState.preferences).bulkMessageWarning;
  const nextState = normalizeBulkMessageAccountState(
    prefs.accounts?.[accountId],
    prefs.threshold
  );
  nextState.snoozeUntil = Date.now() + BULK_MESSAGE_SNOOZE_MS;
  updateBulkMessageAccountState(accountId, nextState);
  closeBulkMessageWarningModal();
}

function renderBulkMessageAccountSummary() {
  const container = document.getElementById('bulkMessageAccountSummary');
  if (!container) return;
  const settings = mergeGlobalSettings(uiState.globalSettings);
  const accounts = settings.accounts || [];
  const prefs = mergePreferences(uiState.preferences).bulkMessageWarning;
  if (!accounts.length) {
    container.innerHTML = '<div class="summary-empty">No hay cuentas activas para monitorear.</div>';
    return;
  }
  const now = Date.now();
  container.innerHTML = accounts.map(account => {
    const state = normalizeBulkMessageAccountState(prefs.accounts?.[account.id], prefs.threshold);
    const history = pruneBulkMessageHistory(state.history, now);
    if (history.length !== state.history.length) {
      updateBulkMessageAccountState(account.id, { ...state, history }, false);
    }
    return `
      <div class="summary-row">
        <strong>${account.name || 'Sin cuenta'}</strong>
        <span>${history.length} mensajes · últimas 24 horas</span>
      </div>
    `;
  }).join('');
}

function bindBulkMessageWarningModal() {
  const modal = document.getElementById('bulkMessageWarningModal');
  const remind5 = document.getElementById('bulkWarningRemind5');
  const remind20 = document.getElementById('bulkWarningRemind20');
  const snooze = document.getElementById('bulkWarningSnooze');
  if (!modal || modal.dataset.bound) return;
  if (remind5) remind5.addEventListener('click', () => applyBulkMessageReminder(5));
  if (remind20) remind20.addEventListener('click', () => applyBulkMessageReminder(20));
  if (snooze) snooze.addEventListener('click', applyBulkMessageSnooze);
  modal.dataset.bound = 'true';
}

function updateClientFlag(id, flag, forceValue = null) {
  const client = managerClients.find(c => c.id === id);
  if (!client) return;
  const previousStatus = clientStatus(client);
  client.flags = client.flags || {};
  client.flags.customStatus = null;
  if (flag === 'favorite') {
    const nextValue = forceValue !== null ? !!forceValue : !client.flags.favorite;
    client.flags.favorite = nextValue;
  } else if (flag === 'noNumber') {
    const nextValue = forceValue !== null ? !!forceValue : !client.flags.noNumber;
    client.flags.noNumber = nextValue;
    if (client.flags.noNumber) client.flags.contacted = false;
    if (client.flags.noNumber) updateClientJourneyStatus(client, 'sin_respuesta_no_disponible');
  } else if (flag === 'contacted') {
    const nextValue = forceValue !== null ? !!forceValue : !client.flags.contacted;
    client.flags.contacted = nextValue;
    if (client.flags.contacted) client.flags.noNumber = false;
    if (client.flags.contacted) updateClientJourneyStatus(client, DEFAULT_JOURNEY_STATUS_KEY);
  }
  updateContactMeta(client);
  if (flag === 'contacted' && client.flags.contacted && previousStatus.className === 'status-pending') {
    const prefs = mergePreferences(uiState.preferences).bulkMessageWarning;
    if (prefs.enabled) {
      const activeAccount = getActiveAccount();
      const accountId = activeAccount?.id || '';
      if (accountId) {
        const accountState = normalizeBulkMessageAccountState(
          prefs.accounts?.[accountId],
          prefs.threshold
        );
        accountState.count += 1;
        const now = Date.now();
        accountState.history = pruneBulkMessageHistory(accountState.history, now);
        accountState.history.push(now);
        const shouldNotify = accountState.count >= accountState.nextReminderAt
          && now >= accountState.snoozeUntil;
        updateBulkMessageAccountState(accountId, accountState, false);
        if (shouldNotify) {
          openBulkMessageWarningModal({
            accountId,
            accountName: activeAccount?.name || 'Sin cuenta',
            accountPhone: activeAccount?.phone || '',
            count: accountState.count,
            threshold: prefs.threshold
          });
        }
      }
    }
  }
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
  if (!isSame && action.statusKey && action.statusKey !== 'none') {
    updateClientJourneyStatus(client, action.statusKey);
  }
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

function exportManagerClients({ scope = 'filtered' } = {}) {
  const rows = scope === 'all' ? visibleManagerClients() : filteredManagerClients();
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

function exportProfileData() {
  const payload = { version: 7, vehicles, brandSettings: ensureBrandSettings(), priceDrafts, activePriceTabId, activePriceSource, templates, clients, managerClients, uiState, clientManagerState, snapshots, generatedQuotes };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chevrolet-plan-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Perfil exportado', 'success');
}

function bindProfileActions() {
  document.getElementById('exportProfile').addEventListener('click', () => {
    confirmAction({
      title: 'Exportar perfil',
      message: 'Descargarás un respaldo con vehículos, plantillas, clientes, recontactos, notas y preferencias.',
      confirmText: 'Exportar',
      onConfirm: () => {
        exportProfileData();
      }
    });
  });

  document.getElementById('importProfile').addEventListener('change', async e => {
    if (!ensureWriteAccess('La importación de perfiles está deshabilitada en modo sin conexión.')) {
      e.target.value = '';
      return;
    }
    const file = e.target.files?.[0];
    if (!file) return;
    showImportOverlay({
      eyebrow: 'Importación de perfil',
      title: 'Leyendo perfil...',
      subtitle: 'Espera un momento...',
      helper: 'Estamos verificando la compatibilidad del perfil.',
      steps: [
        'Leyendo perfil...',
        'Validando compatibilidad...',
        'Listo para importar.'
      ]
    });
    await wait(1000);
    try {
      const content = await readFileAsText(file);
      updateImportOverlayStep(0, 'Leyendo perfil...');
      updateImportOverlayProgress(40, 100);
      const parsed = JSON.parse(content);
      updateImportOverlayStep(1, 'Validando compatibilidad...');
      updateImportOverlayProgress(70, 100);
      const compatible = isProfileCompatible(parsed);
      if (!compatible) {
        updateImportOverlayStep(2, 'Perfil incompatible.');
        updateImportOverlayProgress(100, 100);
        await wait(400);
        hideImportOverlay();
        showToast('El perfil no es compatible con la importación.', 'error');
        return;
      }
      updateImportOverlayStep(2, 'Listo para importar.');
      updateImportOverlayProgress(100, 100);
      await wait(400);
      hideImportOverlay();
      const localSummary = buildLocalSyncSummary();
      const incomingSummary = buildSyncSummary(normalizeProfilePayload(parsed), 'import');
      const summaryHtml = buildSyncCompareHtml(localSummary, incomingSummary, {
        localLabel: 'Datos locales actuales',
        incomingLabel: 'Perfil a importar'
      });
      confirmAction({
        title: 'Importar perfil',
        messageHtml: `
          <p class="muted">Este perfil es compatible con la importación. Revisa qué datos se reemplazarán antes de continuar.</p>
          <p class="muted tiny">Archivo seleccionado: ${file.name}</p>
          ${summaryHtml}
        `,
        confirmText: 'Importar',
        onConfirm: async () => {
          showImportOverlay({
            eyebrow: 'Importación de perfil',
            title: 'Aplicando perfil...',
            subtitle: 'Espera un momento...',
            helper: 'Estamos actualizando la información de tu cuenta.',
            steps: [
              'Aplicando información del perfil...',
              'Reiniciando módulos...'
            ]
          });
          await wait(1000);
          applyProfileData(parsed);
          updateImportOverlayStep(1, 'Reiniciando módulos...');
          updateImportOverlayProgress(100, 100);
          await wait(300);
          hideImportOverlay();
          showToast('Perfil importado y aplicado', 'success');
        }
      });
    } catch (err) {
      hideImportOverlay();
      showToast('No se pudo leer el perfil.', 'error');
    } finally {
      e.target.value = '';
    }
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
      openDataResetWarning({
        title: 'Restaurar valores base',
        onConfirm: async () => {
          priceDrafts = {};
          activePriceTabId = '';
          activePriceSource = 'local';
          vehicles = cloneVehicles(defaultVehicles);
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
          await initializePriceTabs();
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

function getModuleDefinition(moduleId) {
  return MODULE_CATALOG.find(module => module.id === moduleId) || null;
}

function moduleTypeLabel(module) {
  return module?.type === 'submodule' ? 'Sub Módulo' : 'Módulo';
}

function buildManagerStatusEntries() {
  return managerClients.map(client => ({
    id: client.id,
    name: client.name || '',
    flags: { ...(client.flags || {}) },
    journeyStatus: client.journeyStatus || {},
    journeyHistory: Array.isArray(client.journeyHistory) ? client.journeyHistory : []
  }));
}

function buildScheduleEntries() {
  return clients
    .filter(client => client.schedule?.scheduledAt)
    .map(client => ({
      id: client.id,
      name: client.name || '',
      schedule: client.schedule || null
    }));
}

function applyManagerStatusEntries(entries = []) {
  if (!Array.isArray(entries)) return;
  const byId = new Map(managerClients.map(client => [client.id, client]));
  entries.forEach(entry => {
    if (!entry?.id) return;
    const current = byId.get(entry.id);
    const merged = ensureJourneyStatusData({
      ...(current || {}),
      ...entry,
      flags: { ...(current?.flags || {}), ...(entry.flags || {}) },
      journeyStatus: entry.journeyStatus || current?.journeyStatus,
      journeyHistory: Array.isArray(entry.journeyHistory) ? entry.journeyHistory : current?.journeyHistory
    });
    if (current) {
      Object.assign(current, merged);
    } else {
      managerClients.push(merged);
    }
  });
}

function applyScheduleEntries(entries = []) {
  if (!Array.isArray(entries)) return;
  const byId = new Map(clients.map(client => [client.id, client]));
  entries.forEach(entry => {
    if (!entry?.id) return;
    const current = byId.get(entry.id);
    if (current) {
      current.schedule = entry.schedule || null;
      if (!current.name && entry.name) current.name = entry.name;
    } else {
      clients.push({ id: entry.id, name: entry.name || 'Sin nombre', schedule: entry.schedule || null });
    }
  });
}

function buildModulePayload(moduleId) {
  switch (moduleId) {
    case 'clientManager':
      return {
        clients: JSON.parse(JSON.stringify(clients)),
        managerClients: JSON.parse(JSON.stringify(managerClients))
      };
    case 'quickActions':
      return {
        actionVisibility: { ...(clientManagerState.actionVisibility || {}) },
        customActions: JSON.parse(JSON.stringify(clientManagerState.customActions || []))
      };
    case 'contactLog':
    case 'journeyReport':
      return {
        entries: buildManagerStatusEntries()
      };
    case 'scheduledClients':
      return {
        entries: buildScheduleEntries()
      };
    case 'templates':
      return {
        templates: JSON.parse(JSON.stringify(templates))
      };
    case 'plans':
      return {
        planDraft: { ...(uiState.planDraft || {}) }
      };
    case 'quoteGenerator':
      return {
        generatedQuotes: JSON.parse(JSON.stringify(generatedQuotes)),
        quoteGenerator: { ...(uiState.quoteGenerator || {}) }
      };
    case 'vehicles':
      return {
        vehicles: cloneVehicles(vehicles),
        brandSettings: ensureBrandSettings(),
        priceDrafts: JSON.parse(JSON.stringify(priceDrafts || {})),
        activePriceTabId,
        activePriceSource
      };
    case 'preferences':
      return {
        preferences: JSON.parse(JSON.stringify(uiState.preferences || {}))
      };
    case 'accounts':
      return {
        globalSettings: JSON.parse(JSON.stringify(uiState.globalSettings || {}))
      };
    default:
      return null;
  }
}

async function applyModulePayload(moduleId, payload) {
  switch (moduleId) {
    case 'clientManager': {
      clients = Array.isArray(payload?.clients) ? payload.clients : [];
      managerClients = Array.isArray(payload?.managerClients)
        ? payload.managerClients.map(client => ensureJourneyStatusData(client))
        : [];
      renderClients();
      renderClientManager();
      renderScheduledClients();
      renderStats();
      return true;
    }
    case 'quickActions': {
      clientManagerState.actionVisibility = { ...defaultActionVisibility, ...(payload?.actionVisibility || {}) };
      clientManagerState.customActions = (payload?.customActions || []).map(action => ({ ...action, visible: true, statusKey: action.statusKey || 'none' }));
      renderClientManager();
      return true;
    }
    case 'contactLog': {
      if (Array.isArray(payload?.managerClients)) {
        managerClients = payload.managerClients.map(client => ensureJourneyStatusData(client));
      } else {
        applyManagerStatusEntries(payload?.entries || []);
      }
      renderContactLog();
      renderClientManager();
      renderStats();
      return true;
    }
    case 'journeyReport': {
      if (Array.isArray(payload?.managerClients)) {
        managerClients = payload.managerClients.map(client => ensureJourneyStatusData(client));
      } else {
        applyManagerStatusEntries(payload?.entries || []);
      }
      renderJourneyReport();
      renderClientManager();
      renderStats();
      return true;
    }
    case 'scheduledClients': {
      if (Array.isArray(payload?.clients)) {
        clients = payload.clients;
      } else {
        applyScheduleEntries(payload?.entries || []);
      }
      renderScheduledClients();
      renderClients();
      renderStats();
      return true;
    }
    case 'templates': {
      templates = ensureTemplateIds(payload?.templates || []);
      selectedTemplateIndex = Math.min(uiState.selectedTemplateIndex || 0, templates.length - 1);
      selectedTemplateId = templates[selectedTemplateIndex]?.id;
      renderTemplates();
      renderStats();
      return true;
    }
    case 'plans': {
      uiState.planDraft = { ...defaultUiState.planDraft, ...(payload?.planDraft || {}) };
      planDraftApplied = false;
      renderPlanForm();
      updatePlanSummary();
      return true;
    }
    case 'quoteGenerator': {
      generatedQuotes = Array.isArray(payload?.generatedQuotes) ? payload.generatedQuotes : [];
      uiState.quoteGenerator = { ...defaultUiState.quoteGenerator, ...(payload?.quoteGenerator || {}) };
      renderQuoteNavigation();
      renderQuoteGeneratorForm();
      return true;
    }
    case 'vehicles': {
      activePriceTabId = payload?.activePriceTabId || activePriceTabId;
      activePriceSource = payload?.activePriceSource || activePriceSource;
      priceDrafts = payload?.priceDrafts || priceDrafts;
      vehicles = cloneVehicles(payload?.vehicles || vehicles);
      brandSettings = normalizeBrandSettings(payload?.brandSettings || brandSettings, vehicles);
      await initializePriceTabs();
      renderPriceTabs();
      renderVehicleTable();
      renderPlanForm();
      return true;
    }
    case 'preferences': {
      uiState.preferences = mergePreferences(payload?.preferences || uiState.preferences);
      applyPreferences();
      return true;
    }
    case 'accounts': {
      uiState.globalSettings = mergeGlobalSettings(payload?.globalSettings || uiState.globalSettings);
      renderGlobalSettings();
      renderWelcomeHero();
      renderStats();
      return true;
    }
    default:
      return false;
  }
}

function exportSelectedModules(moduleIds) {
  const normalized = moduleIds.filter(Boolean);
  if (!normalized.length) {
    showToast('Selecciona al menos un módulo exportable.', 'error');
    return;
  }
  const modules = normalized.map(id => getModuleDefinition(id)).filter(Boolean);
  const dataMap = {};
  modules.forEach(module => {
    const payload = buildModulePayload(module.id);
    if (payload) dataMap[module.id] = payload;
  });
  if (!Object.keys(dataMap).length) {
    showToast('No hay datos disponibles para exportar.', 'error');
    return;
  }
  const isSingle = modules.length === 1;
  const payload = isSingle
    ? {
      version: 1,
      type: 'module',
      moduleId: modules[0].id,
      moduleLabel: modules[0].label,
      moduleType: modules[0].type,
      generatedAt: new Date().toISOString(),
      data: dataMap[modules[0].id]
    }
    : {
      version: 1,
      type: 'pack',
      generatedAt: new Date().toISOString(),
      modules: modules.map(module => ({ id: module.id, label: module.label, type: module.type })),
      data: dataMap
    };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const dateStamp = new Date().toISOString().slice(0, 10);
  a.download = isSingle ? `modulo-${modules[0].id}-${dateStamp}.module` : `modulos-${dateStamp}.module`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Exportación de módulos lista', 'success');
}

function parseModulePackage(parsed) {
  if (!parsed || typeof parsed !== 'object') return null;
  if (parsed.type === 'module' && parsed.moduleId && parsed.data) {
    return {
      modules: [{ id: parsed.moduleId, label: parsed.moduleLabel, type: parsed.moduleType }],
      dataById: { [parsed.moduleId]: parsed.data }
    };
  }
  if (parsed.type === 'pack' && Array.isArray(parsed.modules) && parsed.data && typeof parsed.data === 'object') {
    return { modules: parsed.modules, dataById: parsed.data };
  }
  return null;
}

function normalizeModuleEntry(entry) {
  if (!entry) return null;
  if (typeof entry === 'string') {
    const def = getModuleDefinition(entry);
    return { id: entry, label: def?.label || entry, type: def?.type || 'module' };
  }
  const id = entry.id || entry.moduleId;
  if (!id) return null;
  const def = getModuleDefinition(id);
  return {
    id,
    label: def?.label || entry.label || id,
    type: def?.type || entry.type || 'module'
  };
}

function updateModuleImportSummary() {
  const fileLabel = document.getElementById('moduleImportFile');
  const itemsLabel = document.getElementById('moduleImportItems');
  const reviewBtn = document.getElementById('moduleImportReview');
  if (!fileLabel || !itemsLabel || !reviewBtn) return;
  if (!moduleImportState) {
    fileLabel.textContent = 'Sin archivo seleccionado';
    itemsLabel.textContent = '-';
    reviewBtn.disabled = true;
    return;
  }
  fileLabel.textContent = moduleImportState.fileName;
  const count = moduleImportState.modules.length;
  itemsLabel.textContent = `${count} ${count === 1 ? 'elemento' : 'elementos'}`;
  reviewBtn.disabled = count === 0;
}

function renderModuleManagement() {
  const container = document.getElementById('moduleList');
  if (!container) return;
  container.innerHTML = MODULE_GROUPS.map(group => {
    const items = MODULE_CATALOG.filter(item => item.group === group.id);
    return `
      <div class="module-group">
        <div class="module-group-title">${group.title}</div>
        ${items.map(item => {
          const chipClass = item.exportable ? 'module-chip exportable' : 'module-chip';
          const typeLabel = moduleTypeLabel(item);
          const disabled = !item.exportable ? 'disabled' : '';
          const checkbox = item.exportable
            ? `<input type="checkbox" class="module-checkbox" data-module="${item.id}">`
            : `<input type="checkbox" disabled>`;
          return `
            <div class="module-item ${item.type === 'submodule' ? 'sub' : ''} ${disabled}">
              <div class="module-item-info">
                <strong>${item.label}</strong>
                <div class="module-item-meta">
                  <span class="module-chip">${typeLabel}</span>
                  <span class="${chipClass}">${item.exportable ? 'Exportable' : 'No exportable'}</span>
                </div>
              </div>
              ${checkbox}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }).join('');
  updateModuleExportCount();
}

function updateModuleExportCount() {
  const counter = document.getElementById('moduleExportCount');
  if (!counter) return;
  const checked = document.querySelectorAll('.module-checkbox:checked').length;
  counter.textContent = `${checked} ${checked === 1 ? 'módulo seleccionado' : 'módulos seleccionados'}`;
}

function resetModuleImportState() {
  moduleImportState = null;
  const input = document.getElementById('moduleImportInput');
  if (input) input.value = '';
  updateModuleImportSummary();
}

async function applyModuleImport(state) {
  if (!ensureWriteAccess('La importación de módulos está deshabilitada en modo sin conexión.')) {
    return;
  }
  if (!state?.modules?.length) return;
  showImportOverlay({
    eyebrow: 'Importación de módulos',
    title: 'Aplicando configuración...',
    subtitle: 'Espera un momento...',
    helper: 'Actualizando módulos seleccionados.',
    steps: state.modules.map(module => `Aplicando ${module.label || module.id}...`)
  });
  for (let i = 0; i < state.modules.length; i += 1) {
    const module = state.modules[i];
    updateImportOverlayStep(i, `Aplicando ${module.label || module.id}...`);
    updateImportOverlayProgress((i + 1) / state.modules.length * 100, 100);
    const payload = state.dataById?.[module.id];
    await applyModulePayload(module.id, payload);
  }
  persist();
  await syncRemoteSnapshot({ reason: 'import-modules' });
  hideImportOverlay();
  showToast('Módulos importados correctamente', 'success');
  resetModuleImportState();
  renderModuleManagement();
}

function openModuleImportModal() {
  if (!ensureWriteAccess('La importación de módulos está deshabilitada en modo sin conexión.')) {
    return;
  }
  if (!moduleImportState) return;
  const modal = document.getElementById('moduleImportModal');
  const list = document.getElementById('moduleImportModalList');
  const subtitle = document.getElementById('moduleImportModalSubtitle');
  const confirmBtn = document.getElementById('moduleImportConfirm');
  const cancelBtn = document.getElementById('moduleImportCancel');
  const closeBtn = document.getElementById('moduleImportClose');
  const check = document.getElementById('moduleImportAcknowledge');
  if (!modal || !list || !subtitle || !confirmBtn || !cancelBtn || !closeBtn || !check) return;

  subtitle.textContent = `Archivo seleccionado: ${moduleImportState.fileName}`;
  list.innerHTML = moduleImportState.modules.map(module => `
    <div class="module-import-modal-item">
      <div>
        <strong>${module.label || module.id}</strong>
        <p class="muted tiny">Tipo: ${moduleTypeLabel(module)}</p>
      </div>
      <span class="module-chip exportable">${moduleTypeLabel(module)}</span>
    </div>
  `).join('');
  check.checked = false;
  confirmBtn.disabled = true;

  const handleCheck = () => {
    confirmBtn.disabled = !check.checked;
  };
  check.onchange = handleCheck;

  const cleanup = () => {
    check.onchange = null;
    confirmBtn.onclick = null;
    cancelBtn.onclick = null;
    closeBtn.onclick = null;
    toggleModal(modal, false);
  };

  confirmBtn.onclick = async () => {
    if (!check.checked) return;
    cleanup();
    await applyModuleImport(moduleImportState);
  };
  cancelBtn.onclick = cleanup;
  closeBtn.onclick = cleanup;
  toggleModal(modal, true);
}

function bindModuleManagement() {
  const openBtn = document.getElementById('openModuleManagement');
  if (openBtn && !openBtn.dataset.bound) {
    openBtn.dataset.bound = 'true';
    openBtn.addEventListener('click', () => {
      activatePanel('moduleManagement');
      document.getElementById('actionMenuPanel')?.classList.remove('open');
    });
  }

  const list = document.getElementById('moduleList');
  if (list && !list.dataset.bound) {
    list.addEventListener('change', (event) => {
      if (!event.target.classList.contains('module-checkbox')) return;
      updateModuleExportCount();
    });
    list.dataset.bound = 'true';
  }

  const selectAllBtn = document.getElementById('moduleSelectAll');
  if (selectAllBtn && !selectAllBtn.dataset.bound) {
    selectAllBtn.dataset.bound = 'true';
    selectAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.module-checkbox').forEach(input => {
        if (!input.disabled) input.checked = true;
      });
      updateModuleExportCount();
    });
  }

  const clearBtn = document.getElementById('moduleClearSelection');
  if (clearBtn && !clearBtn.dataset.bound) {
    clearBtn.dataset.bound = 'true';
    clearBtn.addEventListener('click', () => {
      document.querySelectorAll('.module-checkbox').forEach(input => {
        input.checked = false;
      });
      updateModuleExportCount();
    });
  }

  const exportBtn = document.getElementById('exportModules');
  if (exportBtn && !exportBtn.dataset.bound) {
    exportBtn.dataset.bound = 'true';
    exportBtn.addEventListener('click', () => {
      const selected = Array.from(document.querySelectorAll('.module-checkbox:checked')).map(input => input.dataset.module);
      exportSelectedModules(selected);
    });
  }

  const trigger = document.getElementById('moduleImportTrigger');
  const input = document.getElementById('moduleImportInput');
  if (trigger && input && !trigger.dataset.bound) {
    trigger.dataset.bound = 'true';
    trigger.addEventListener('click', () => input.click());
  }

  if (input && !input.dataset.bound) {
    input.dataset.bound = 'true';
    input.addEventListener('change', async (event) => {
      if (!ensureWriteAccess('La importación de módulos está deshabilitada en modo sin conexión.')) {
        event.target.value = '';
        return;
      }
      const file = event.target.files?.[0];
      if (!file) return;
      try {
        const content = await readFileAsText(file);
        const parsed = JSON.parse(content);
        const pkg = parseModulePackage(parsed);
        if (!pkg) {
          showToast('El archivo no tiene un formato de módulos válido.', 'error');
          resetModuleImportState();
          return;
        }
        const modules = (pkg.modules || [])
          .map(entry => normalizeModuleEntry(entry))
          .filter(Boolean);
        moduleImportState = {
          fileName: file.name,
          modules,
          dataById: pkg.dataById || {}
        };
        updateModuleImportSummary();
      } catch (err) {
        showToast('No se pudo leer el archivo de módulos.', 'error');
        resetModuleImportState();
      }
    });
  }

  const reviewBtn = document.getElementById('moduleImportReview');
  if (reviewBtn && !reviewBtn.dataset.bound) {
    reviewBtn.dataset.bound = 'true';
    reviewBtn.addEventListener('click', () => {
      if (!moduleImportState) return;
      openModuleImportModal();
    });
  }

  const resetBtn = document.getElementById('moduleImportReset');
  if (resetBtn && !resetBtn.dataset.bound) {
    resetBtn.dataset.bound = 'true';
    resetBtn.addEventListener('click', () => resetModuleImportState());
  }

  updateModuleImportSummary();
}

function ensureWriteAccess(message = 'El modo sin conexión es solo lectura.') {
  if (!authState.offline) return true;
  const now = Date.now();
  if (now - readOnlyState.lastToastAt > 2500) {
    showToast(message, 'warning');
    readOnlyState.lastToastAt = now;
  }
  syncFromStorage();
  return false;
}

function getStorageKey(key) {
  if (STORAGE_SCOPED_KEYS.has(key)) {
    const uid = storageState.uid || STORAGE_GUEST_ID;
    return `${STORAGE_USER_PREFIX}${uid}:${key}`;
  }
  return `${STORAGE_GLOBAL_PREFIX}${key}`;
}

function parseStorageKey(storageKey = '') {
  if (!storageKey) return null;
  if (storageKey.startsWith(STORAGE_USER_PREFIX)) {
    const remainder = storageKey.slice(STORAGE_USER_PREFIX.length);
    const [uid, ...rest] = remainder.split(':');
    return { scope: 'user', uid, key: rest.join(':') };
  }
  if (storageKey.startsWith(STORAGE_GLOBAL_PREFIX)) {
    return { scope: 'global', key: storageKey.slice(STORAGE_GLOBAL_PREFIX.length) };
  }
  return { scope: 'legacy', key: storageKey };
}

function getStoredValue(key) {
  try {
    const raw = localStorage.getItem(getStorageKey(key));
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

function setStoredValue(key, value) {
  const storageKey = getStorageKey(key);
  if (value === undefined) {
    localStorage.removeItem(storageKey);
    return;
  }
  localStorage.setItem(storageKey, JSON.stringify(value));
}

function removeStoredValue(key) {
  localStorage.removeItem(getStorageKey(key));
}

function getLastUserId() {
  const stored = localStorage.getItem(`${STORAGE_GLOBAL_PREFIX}${STORAGE_LAST_USER_KEY}`);
  if (stored) return stored;
  const legacy = localStorage.getItem(STORAGE_LAST_USER_KEY);
  if (legacy) {
    localStorage.setItem(`${STORAGE_GLOBAL_PREFIX}${STORAGE_LAST_USER_KEY}`, legacy);
    localStorage.removeItem(STORAGE_LAST_USER_KEY);
  }
  return legacy || null;
}

function setLastUserId(uid) {
  if (!uid) return;
  localStorage.setItem(`${STORAGE_GLOBAL_PREFIX}${STORAGE_LAST_USER_KEY}`, uid);
}

function migrateLegacyStorageToUser(uid) {
  if (!uid) return;
  STORAGE_SCOPED_KEYS.forEach((key) => {
    const scopedKey = `${STORAGE_USER_PREFIX}${uid}:${key}`;
    if (localStorage.getItem(scopedKey) !== null) return;
    const legacyValue = localStorage.getItem(key);
    if (legacyValue !== null) {
      localStorage.setItem(scopedKey, legacyValue);
    }
  });
  STORAGE_SCOPED_KEYS.forEach((key) => {
    localStorage.removeItem(key);
  });
}

function setStorageScope(uid, { migrateLegacy = true } = {}) {
  const nextUid = uid || STORAGE_GUEST_ID;
  storageState.uid = nextUid;
  if (migrateLegacy && uid && uid !== STORAGE_GUEST_ID) {
    migrateLegacyStorageToUser(nextUid);
  }
  syncState.lastHashes = getStoredValue(SYNC_HASH_STORAGE_KEY) || {};
}

function buildDefaultUiState() {
  return {
    ...defaultUiState,
    templateSearch: '',
    clientSearch: '',
    profileSearch: '',
    globalSettings: mergeGlobalSettings(defaultUiState.globalSettings),
    preferences: mergePreferences(defaultUiState.preferences)
  };
}

function resetInMemoryState() {
  priceDrafts = {};
  activePriceTabId = '';
  activePriceSource = 'local';
  vehicles = cloneVehicles(defaultVehicles);
  templates = ensureTemplateIds([...defaultTemplates]);
  clients = [];
  managerClients = [];
  generatedQuotes = [];
  snapshots = [];
  uiState = buildDefaultUiState();
  clientManagerState = { ...defaultClientManagerState };
  selectedTemplateIndex = 0;
  selectedTemplateId = templates[0]?.id || '';
  planDraftApplied = false;
  brandSettings = normalizeBrandSettings(defaultBrandSettings, vehicles);
}

function switchUserContext(uid, { migrateLegacy = true } = {}) {
  setStorageScope(uid, { migrateLegacy });
  resetInMemoryState();
  syncFromStorage({ resetDefaults: true });
}

function persist() {
  if (!ensureWriteAccess('No puedes modificar datos en modo sin conexión.')) {
    return;
  }
  syncActiveVehiclesToDraft();
  save('vehicles', vehicles);
  save('brandSettings', brandSettings);
  save('templates', templates);
  save('clients', clients);
  save('managerClients', managerClients);
  save('uiState', sanitizeUiStateForStorage(uiState));
  save('generatedQuotes', generatedQuotes);
  save('clientManagerState', sanitizeClientManagerStateForStorage(clientManagerState));
  save('snapshots', snapshots);
  save('priceDrafts', priceDrafts);
  removeStoredValue('activePriceTabId');
  removeStoredValue('activePriceSource');
  save('localUpdatedAt', Date.now());
}

function startRealtimePersistence() {
  const persistNow = () => persist();
  ['visibilitychange', 'beforeunload'].forEach(evt => window.addEventListener(evt, persistNow));
  setInterval(persistNow, 15000);
  window.addEventListener('storage', (e) => {
    const parsed = parseStorageKey(e.key || '');
    if (!parsed || parsed.scope !== 'user' || parsed.uid !== storageState.uid) return;
    if (['vehicles', 'templates', 'clients', 'managerClients', 'uiState', 'clientManagerState', 'snapshots', 'priceDrafts', 'brandSettings', 'generatedQuotes'].includes(parsed.key)) {
      syncFromStorage();
    }
  });
}

function syncFromStorage({ resetDefaults = false } = {}) {
  if (resetDefaults) {
    resetInMemoryState();
  }
  priceDrafts = load('priceDrafts') || priceDrafts;
  vehicles = cloneVehicles(load('vehicles') || vehicles);
  brandSettings = normalizeBrandSettings(load('brandSettings') || brandSettings, vehicles);
  templates = ensureTemplateIds(load('templates') || templates);
  clients = load('clients') || clients;
  managerClients = (load('managerClients') || managerClients).map(client => ensureJourneyStatusData(client));
  const storedUiState = load('uiState') || {};
  uiState = { ...defaultUiState, ...(sanitizeUiStateForStorage(storedUiState) || uiState) };
  generatedQuotes = load('generatedQuotes') || generatedQuotes;
  uiState.preferences = mergePreferences(uiState.preferences);
  uiState.globalSettings = mergeGlobalSettings(uiState.globalSettings);
  uiState.vehicleFilters = { ...defaultUiState.vehicleFilters, ...(uiState.vehicleFilters || {}) };
  const storedClientManagerState = load('clientManagerState') || {};
  clientManagerState = { ...defaultClientManagerState, ...(sanitizeClientManagerStateForStorage(storedClientManagerState) || clientManagerState) };
  clientManagerState.columnVisibility = { ...defaultClientManagerState.columnVisibility, ...(clientManagerState.columnVisibility || {}) };
  clientManagerState.dateRange = { ...defaultClientManagerState.dateRange, ...(clientManagerState.dateRange || {}) };
  clientManagerState.actionVisibility = { ...defaultActionVisibility, ...(clientManagerState.actionVisibility || {}) };
  clientManagerState.contactAssistant = { ...defaultClientManagerState.contactAssistant, ...(clientManagerState.contactAssistant || {}) };
  clientManagerState.contactAssistantQuickAdjust = {
    ...defaultClientManagerState.contactAssistantQuickAdjust,
    ...(clientManagerState.contactAssistantQuickAdjust || {})
  };
  clientManagerState.contactLogStatusFilter = clientManagerState.contactLogStatusFilter || defaultClientManagerState.contactLogStatusFilter;
  clientManagerState.customActions = (clientManagerState.customActions || []).map(action => ({ ...action, visible: true, statusKey: action.statusKey || 'none' }));
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
  if (document.getElementById('quoteGenerator')?.classList.contains('active')) {
    renderQuoteGeneratorForm();
  }
  renderQuoteNavigation();
  renderClients();
  renderClientManager();
  renderGlobalSettings();
  renderSnapshots();
  startContactLogTicker();
}

function buildDatabaseUrl(path = '') {
  const normalizedPath = path.replace(/^\/+/, '');
  const base = firebaseConfig.databaseURL.replace(/\/$/, '');
  const authParam = firebaseConfig.databaseSecret ? `?auth=${encodeURIComponent(firebaseConfig.databaseSecret)}` : '';
  return `${base}/${normalizedPath}.json${authParam}`;
}

const FIREBASE_KEY_REPLACEMENTS = {
  '.': '__fb__2E__',
  '#': '__fb__23__',
  '$': '__fb__24__',
  '[': '__fb__5B__',
  ']': '__fb__5D__',
  '/': '__fb__2F__'
};

const FIREBASE_KEY_REVERSE = Object.entries(FIREBASE_KEY_REPLACEMENTS).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {});

function encodeFirebaseKey(key = '') {
  if (typeof key !== 'string') {
    key = String(key);
  }
  // Escapar caracteres prohibidos en Firebase
  return key
    .replace(/\./g, '__dot__')
    .replace(/#/g, '__hash__')
    .replace(/\$/g, '__dollar__')
    .replace(/\\/g, '__backslash__')
    .replace(/\[/g, '__lb__')
    .replace(/\]/g, '__rb__')
    .replace(/\//g, '__slash__');
}

function decodeFirebaseKey(key = '') {
  if (typeof key !== 'string') {
    key = String(key);
  }
  return key
    .replace(/__dot__/g, '.')
    .replace(/__hash__/g, '#')
    .replace(/__dollar__/g, '$')
    .replace(/__backslash__/g, '\\')
    .replace(/__lb__/g, '[')
    .replace(/__rb__/g, ']')
    .replace(/__slash__/g, '/');
}

function validateFirebasePayload(obj, path = '') {
  if (obj === null || obj === undefined) {
    return true;
  }
  
  if (Array.isArray(obj)) {
    return obj.every((item, idx) => validateFirebasePayload(item, `${path}[${idx}]`));
  }
  
  if (typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      // Validar que la clave no tenga caracteres prohibidos SIN codificar
      if (key.match(/[.#$\\/\[\]]/)) {
        console.warn(`Clave con caracteres prohibidos en ${path}.${key}: "${key}"`);
        // Continuar, ya que será codificada
      }
      
      if (!validateFirebasePayload(value, `${path}.${key}`)) {
        return false;
      }
    }
  }
  
  return true;
}

function encodeFirebasePayload(payload, depth = 0) {
  // Protección contra recursión infinita
  if (depth > 50) {
    console.warn('Profundidad máxima alcanzada al codificar payload');
    return null;
  }
  
  if (payload === null || payload === undefined) {
    return null;
  }
  
  // Para booleanos, números y strings - retornar tal cual
  if (typeof payload === 'boolean' || typeof payload === 'number' || typeof payload === 'string') {
    return payload;
  }
  
  // Para arrays
  if (Array.isArray(payload)) {
    const encoded = payload
      .map(item => encodeFirebasePayload(item, depth + 1))
      .filter(item => item !== null && item !== undefined);
    return encoded.length > 0 ? encoded : null;
  }
  
  // Para objetos
  if (typeof payload === 'object') {
    const encoded = {};
    let hasValidKey = false;
    
    for (const [key, value] of Object.entries(payload)) {
      // Saltar valores null/undefined
      if (value === null || value === undefined) {
        continue;
      }
      
      // Codificar la clave para hacerla compatible con Firebase
      const encodedKey = encodeFirebaseKey(key);
      
      // Recursivamente codificar el valor
      const encodedValue = encodeFirebasePayload(value, depth + 1);
      
      // Solo agregar si el valor es válido
      if (encodedValue !== null && encodedValue !== undefined) {
        encoded[encodedKey] = encodedValue;
        hasValidKey = true;
      }
    }
    
    return hasValidKey ? encoded : null;
  }
  
  // Para cualquier otro tipo, intentar serializar o descartar
  return null;
}

function decodeFirebasePayload(payload, depth = 0) {
  // Protección contra recursión infinita
  if (depth > 50) {
    console.warn('Profundidad máxima alcanzada al decodificar payload');
    return null;
  }
  
  if (payload === null || payload === undefined) {
    return payload;
  }
  
  // Para booleanos, números y strings - retornar tal cual
  if (typeof payload === 'boolean' || typeof payload === 'number' || typeof payload === 'string') {
    return payload;
  }
  
  // Para arrays
  if (Array.isArray(payload)) {
    return payload.map(item => decodeFirebasePayload(item, depth + 1));
  }
  
  // Para objetos
  if (typeof payload === 'object') {
    const decoded = {};
    for (const [key, value] of Object.entries(payload)) {
      const decodedKey = decodeFirebaseKey(key);
      decoded[decodedKey] = decodeFirebasePayload(value, depth + 1);
    }
    return decoded;
  }
  
  return payload;
}

async function dbGet(path) {
  const response = await fetch(buildDatabaseUrl(path));
  if (!response.ok) {
    throw new Error('No se pudo acceder a la base de datos.');
  }
  return response.json();
}

async function dbPut(path, payload) {
  const sanitizedPayload = encodeFirebasePayload(payload);
  
  // Validación: no permitir payloads vacíos
  if (!sanitizedPayload || (typeof sanitizedPayload === 'object' && Object.keys(sanitizedPayload).length === 0)) {
    console.warn(`dbPut: Payload vacío para ruta ${path}, omitiendo`);
    return null;
  }
  
  const url = buildDatabaseUrl(path);
  try {
    // Validar que el JSON sea válido
    const jsonString = JSON.stringify(sanitizedPayload);
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: jsonString
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error(`dbPut error ${response.status} en ${path}:`, error);
      console.error(`Payload que causó el error:`, sanitizedPayload);
      throw new Error(`No se pudo guardar la información (${response.status}): ${error.substring(0, 100)}`);
    }
    return response.json();
  } catch (error) {
    console.error(`dbPut fallo para ${path}:`, error);
    throw error;
  }
}

async function dbPatch(path, payload) {
  const sanitizedPayload = encodeFirebasePayload(payload);
  
  // Validación: no permitir payloads vacíos
  if (!sanitizedPayload || (typeof sanitizedPayload === 'object' && Object.keys(sanitizedPayload).length === 0)) {
    console.warn(`dbPatch: Payload vacío para ruta ${path}, omitiendo`);
    return null;
  }
  
  const url = buildDatabaseUrl(path);
  try {
    // Validar que el JSON sea válido
    const jsonString = JSON.stringify(sanitizedPayload);
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: jsonString
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error(`dbPatch error ${response.status} en ${path}:`, error);
      console.error(`Payload que causó el error:`, sanitizedPayload);
      throw new Error(`No se pudo actualizar la información (${response.status}): ${error.substring(0, 100)}`);
    }
    return response.json();
  } catch (error) {
    console.error(`dbPatch fallo para ${path}:`, error);
    throw error;
  }
}

async function dbDelete(path) {
  const url = buildDatabaseUrl(path);
  const response = await fetch(url, { method: 'DELETE' });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`No se pudo eliminar la información (${response.status}): ${error.substring(0, 100)}`);
  }
  return response.json().catch(() => null);
}

// Claves que se sincronizan con Firebase (evitar datos muy grandes)
const FIREBASE_SYNCABLE_KEYS = new Set([
  'vehicles',
  'templates',
  'clients',
  'managerClients',
  'uiState',
  'clientManagerState',
  'brandSettings',
  'generatedQuotes'
]);

function queueRemoteSync(key, value) {
  if (!authState.user || authState.offline || isApplyingRemote) {
    return;
  }
  
  // Solo sincronizar claves permitidas para evitar payloads muy grandes
  if (!FIREBASE_SYNCABLE_KEYS.has(key)) {
    console.debug(`Sincronización remota omitida para clave no permitida: ${key}`);
    return;
  }
  
  const preparedValue = key === 'uiState'
    ? sanitizeUiStateForSync(value)
    : key === 'clientManagerState'
      ? sanitizeClientManagerStateForSync(value)
      : value;
  const normalizedValue = normalizeSyncValue(preparedValue);
  const serialized = normalizedValue === null || normalizedValue === undefined ? '' : stableStringify(normalizedValue);
  const nextHash = hashString(serialized);
  if (syncState.lastHashes[key] && syncState.lastHashes[key] === nextHash) {
    return;
  }
  remoteSyncQueue[key] = preparedValue;
  remoteSyncQueue.updatedAt = Date.now();
  if (remoteSyncTimer) {
    clearTimeout(remoteSyncTimer);
  }
  const elapsed = Date.now() - syncState.lastSyncAt;
  const waitMs = Math.max(REMOTE_SYNC_DEBOUNCE_MS, REMOTE_SYNC_MIN_INTERVAL_MS - elapsed);
  remoteSyncTimer = setTimeout(() => {
    flushRemoteSync().catch(err => console.warn('Error sincronizando datos remotos:', err));
  }, waitMs);
}

async function flushRemoteSync() {
  if (!authState.user || authState.offline) return;
  const payload = { ...remoteSyncQueue };
  remoteSyncQueue = {};
  if (!Object.keys(payload).length) return;
  
  try {
    setSyncStatus({ syncing: true });
    await dbPatch(`data/${authState.user.uid}`, payload);
    Object.keys(payload).forEach((key) => {
      if (key === 'updatedAt') return;
      const normalizedValue = normalizeSyncValue(payload[key]);
      const serialized = normalizedValue === null || normalizedValue === undefined ? '' : stableStringify(normalizedValue);
      syncState.lastHashes[key] = hashString(serialized);
    });
    setStoredValue(SYNC_HASH_STORAGE_KEY, syncState.lastHashes);
    syncState.lastSyncAt = Date.now();
    setSyncStatus({ online: true, lastSyncAt: syncState.lastSyncAt, lastCheckAt: Date.now() });
  } catch (error) {
    console.warn('Sincronización remota falló, datos se guardarán localmente:', error);
    // No re-lanzar el error, permitir que la aplicación continúe funcionando
  } finally {
    setSyncStatus({ syncing: false });
  }
}

function applyRemotePayload(payload = {}) {
  if (!payload || typeof payload !== 'object') return;
  const decodedPayload = decodeFirebasePayload(payload);
  isApplyingRemote = true;
  Object.entries(decodedPayload).forEach(([key, value]) => {
    if (!REMOTE_DATA_KEYS.includes(key)) return;
    if (key === 'uiState') {
      const currentUiState = getStoredValue('uiState') || {};
      const mergedUiState = {
        ...sanitizeUiStateForStorage(currentUiState),
        ...sanitizeUiStateForSync(value)
      };
      setStoredValue('uiState', mergedUiState);
      return;
    }
    if (key === 'clientManagerState') {
      setStoredValue(key, sanitizeClientManagerStateForStorage(value));
      return;
    }
    setStoredValue(key, value);
  });
  if (decodedPayload.updatedAt) {
    setStoredValue('localUpdatedAt', decodedPayload.updatedAt);
  }
  syncFromStorage();
  const normalizedPayload = normalizeSyncPayload(decodedPayload);
  Object.keys(normalizedPayload).forEach((key) => {
    if (!FIREBASE_SYNCABLE_KEYS.has(key)) return;
    const normalizedValue = normalizeSyncValue(normalizedPayload[key]);
    const serialized = normalizedValue === null || normalizedValue === undefined ? '' : stableStringify(normalizedValue);
    syncState.lastHashes[key] = hashString(serialized);
  });
  setStoredValue(SYNC_HASH_STORAGE_KEY, syncState.lastHashes);
  isApplyingRemote = false;
  setSyncStatus({ online: true, lastSyncAt: Date.now(), lastCheckAt: Date.now() });
}

function applyRemotePathUpdate(path, value) {
  const key = path.replace(/^\//, '');
  if (!key) {
    applyRemotePayload(value || {});
    return;
  }
  if (!REMOTE_DATA_KEYS.includes(key)) return;
  isApplyingRemote = true;
  const decodedValue = decodeFirebasePayload(value);
  if (key === 'uiState') {
    const currentUiState = getStoredValue('uiState') || {};
    const mergedUiState = {
      ...sanitizeUiStateForStorage(currentUiState),
      ...sanitizeUiStateForSync(decodedValue)
    };
    setStoredValue('uiState', mergedUiState);
  } else if (key === 'clientManagerState') {
    setStoredValue(key, sanitizeClientManagerStateForStorage(decodedValue));
  } else {
    setStoredValue(key, decodedValue);
  }
  if (FIREBASE_SYNCABLE_KEYS.has(key)) {
    const normalizedValue = normalizeSyncValue(key === 'uiState'
      ? sanitizeUiStateForSync(decodedValue)
      : key === 'clientManagerState'
        ? sanitizeClientManagerStateForSync(decodedValue)
        : decodedValue);
    const serialized = normalizedValue === null || normalizedValue === undefined ? '' : stableStringify(normalizedValue);
    syncState.lastHashes[key] = hashString(serialized);
    setStoredValue(SYNC_HASH_STORAGE_KEY, syncState.lastHashes);
  }
  syncFromStorage();
  isApplyingRemote = false;
}

async function syncRemoteSnapshot({ reason = '' } = {}) {
  if (!authState.user || authState.offline) return;
  const payload = {
    vehicles,
    templates,
    clients,
    managerClients,
    uiState: sanitizeUiStateForSync(uiState),
    clientManagerState: sanitizeClientManagerStateForSync(clientManagerState),
    brandSettings,
    generatedQuotes,
    updatedAt: Date.now()
  };
  try {
    setSyncStatus({ syncing: true });
    await dbPatch(`data/${authState.user.uid}`, payload);
    Object.keys(payload).forEach((key) => {
      if (key === 'updatedAt') return;
      const normalizedValue = normalizeSyncValue(payload[key]);
      const serialized = normalizedValue === null || normalizedValue === undefined ? '' : stableStringify(normalizedValue);
      syncState.lastHashes[key] = hashString(serialized);
    });
    setStoredValue(SYNC_HASH_STORAGE_KEY, syncState.lastHashes);
    syncState.lastSyncAt = Date.now();
    setSyncStatus({ online: true, lastSyncAt: syncState.lastSyncAt, lastCheckAt: Date.now() });
  } catch (error) {
    console.warn(`Sincronización inmediata falló${reason ? ` (${reason})` : ''}:`, error);
    setSyncStatus({ online: false, lastCheckAt: Date.now() });
  } finally {
    setSyncStatus({ syncing: false });
  }
}

function save(key, value) {
  if (!ensureWriteAccess('El modo sin conexión es solo lectura.')) {
    return;
  }
  const serialized = JSON.stringify(value);
  const storageKey = getStorageKey(key);
  const current = localStorage.getItem(storageKey);
  if (current === serialized) {
    return;
  }
  if (serialized === undefined) {
    localStorage.removeItem(storageKey);
  } else {
    localStorage.setItem(storageKey, serialized);
  }
  queueRemoteSync(key, value);
  recordModification();
}

function load(key) {
  return getStoredValue(key);
}

function clearStorage() {
  if (!ensureWriteAccess('No puedes limpiar datos en modo sin conexión.')) {
    return;
  }
  openDataResetWarning({
    title: 'Eliminar datos del sitio',
    onConfirm: async () => {
      const currentUid = authState.user?.uid || null;
      const shouldLogout = !!authState.session;
      const scopedPrefix = `${STORAGE_USER_PREFIX}${storageState.uid || STORAGE_GUEST_ID}:`;
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(scopedPrefix)) {
          localStorage.removeItem(key);
        }
      });
      STORAGE_SCOPED_KEYS.forEach((key) => localStorage.removeItem(key));
      resetInMemoryState();
      syncState.lastHashes = {};
      setStoredValue(SYNC_HASH_STORAGE_KEY, syncState.lastHashes);
      await initializePriceTabs();
      applyToggleState();
      applyPreferences();
      applyStatusPalette();
      renderPriceTabs();
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
      if (currentUid) {
        dbPut(`data/${currentUid}`, {
          vehicles,
          templates,
          clients,
          managerClients,
          uiState: sanitizeUiStateForSync(uiState),
          clientManagerState: sanitizeClientManagerStateForSync(clientManagerState),
          brandSettings,
          generatedQuotes
        }).catch(err => console.error('Error limpiando datos remotos:', err));
      }
      showToast('Datos locales eliminados', 'success');
      if (shouldLogout) {
        await handleLogout(false);
      }
    }
  });
}

const DEFAULT_ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin1234',
  name: 'Administrador Principal',
  role: 'Administrador'
};

function normalizeUsername(value = '') {
  return value.trim().toLowerCase().replace(/^@+/, '');
}

function isPrimaryAdmin(user) {
  if (!user) return false;
  return normalizeUsername(user.username || '') === normalizeUsername(DEFAULT_ADMIN_CREDENTIALS.username)
    && user.role === DEFAULT_ADMIN_CREDENTIALS.role;
}

async function hashPassword(value = '') {
  const data = new TextEncoder().encode(value.trim());
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function sessionInfo() {
  const scopedKey = `${STORAGE_GLOBAL_PREFIX}sessionInfo`;
  const raw = localStorage.getItem(scopedKey);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (err) {
      return null;
    }
  }
  const legacy = localStorage.getItem('sessionInfo');
  if (!legacy) return null;
  try {
    const parsed = JSON.parse(legacy);
    localStorage.setItem(scopedKey, legacy);
    localStorage.removeItem('sessionInfo');
    return parsed;
  } catch (err) {
    return null;
  }
}

function storeSessionInfo(info) {
  localStorage.setItem(`${STORAGE_GLOBAL_PREFIX}sessionInfo`, JSON.stringify(info));
}

function clearSessionInfo() {
  localStorage.removeItem(`${STORAGE_GLOBAL_PREFIX}sessionInfo`);
}

function createSessionId() {
  return `session-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function updateStoredSessionInfo(overrides = {}) {
  if (!authState.session) return;
  storeSessionInfo({
    uid: authState.session.uid,
    expiresAt: authState.session.expiresAt,
    sessionId: presenceState.sessionId,
    sessionStartedAt: presenceState.sessionStartedAt,
    ...overrides
  });
}

function refreshSessionExpiry(now = Date.now()) {
  if (!authState.session) return;
  authState.session.expiresAt = now + SESSION_IDLE_TIMEOUT_MS;
  updateStoredSessionInfo();
}

function presenceIdentityPayload() {
  if (!authState.user) return {};
  return {
    displayName: authState.user.displayName || authState.user.username,
    username: authState.user.username || '',
    role: authState.user.role || 'Usuario',
    sessionId: presenceState.sessionId,
    sessionStartedAt: presenceState.sessionStartedAt
  };
}

async function updatePresenceStatus(overrides = {}, { includeIdentity = false } = {}) {
  if (!authState.user || authState.offline) return;
  const payload = includeIdentity ? { ...presenceIdentityPayload(), ...overrides } : { ...overrides };
  await dbPatch(`presence/${authState.user.uid}`, payload);
}

function resetForceLogoutState() {
  forceLogoutState.lastGlobalAt = 0;
  forceLogoutState.lastUserAt = 0;
  forceLogoutState.checking = false;
}

async function checkForcedLogoutSignals() {
  if (!authState.user || authState.offline || forceLogoutState.checking) return;
  forceLogoutState.checking = true;
  try {
    const control = await dbGet('control');
    const globalAt = Number(control?.forceLogoutAllAt || 0);
    const userAt = Number(control?.forceLogoutUsers?.[authState.user.uid] || 0);
    if (globalAt && globalAt > (presenceState.sessionStartedAt || 0) && globalAt > forceLogoutState.lastGlobalAt) {
      forceLogoutState.lastGlobalAt = globalAt;
      handleLogout(false, true);
      return;
    }
    if (userAt && userAt > (presenceState.sessionStartedAt || 0) && userAt > forceLogoutState.lastUserAt) {
      forceLogoutState.lastUserAt = userAt;
      handleLogout(false, true);
    }
  } catch (error) {
    console.warn('No se pudo validar cierre forzado:', error);
  } finally {
    forceLogoutState.checking = false;
  }
}

function startForcedLogoutMonitor() {
  if (forceLogoutState.timer) {
    clearInterval(forceLogoutState.timer);
  }
  resetForceLogoutState();
  forceLogoutState.timer = setInterval(() => {
    checkForcedLogoutSignals().catch(() => {});
  }, FORCE_LOGOUT_CHECK_MS);
  checkForcedLogoutSignals().catch(() => {});
}

function stopForcedLogoutMonitor() {
  if (forceLogoutState.timer) {
    clearInterval(forceLogoutState.timer);
    forceLogoutState.timer = null;
  }
  resetForceLogoutState();
}

function applyPresenceUpdate(snapshot, path, data) {
  if (!snapshot || typeof snapshot !== 'object') return;
  if (path === '/' || path === '') {
    Object.keys(snapshot).forEach((key) => delete snapshot[key]);
    if (data && typeof data === 'object') {
      Object.assign(snapshot, data);
    }
    return;
  }
  const parts = path.replace(/^\/+/, '').split('/').filter(Boolean);
  if (!parts.length) return;
  const [uid, ...rest] = parts;
  if (!uid) return;
  if (data === null && rest.length === 0) {
    delete snapshot[uid];
    return;
  }
  if (!snapshot[uid] || typeof snapshot[uid] !== 'object') {
    snapshot[uid] = {};
  }
  if (!rest.length) {
    if (data === null) {
      delete snapshot[uid];
    } else {
      snapshot[uid] = data;
    }
    return;
  }
  let target = snapshot[uid];
  const lastKey = rest.pop();
  rest.forEach((key) => {
    if (!target[key] || typeof target[key] !== 'object') {
      target[key] = {};
    }
    target = target[key];
  });
  if (data === null) {
    delete target[lastKey];
  } else {
    target[lastKey] = data;
  }
}

function isPresenceActive(record, now = Date.now()) {
  if (!record) return false;
  const lastActiveAt = Number(record.lastActiveAt || record.sessionStartedAt || 0);
  if (!record.online || !lastActiveAt) return false;
  return now - lastActiveAt <= PRESENCE_ACTIVE_GRACE_MS;
}

function renderConnectedUsers(records = {}) {
  const list = document.getElementById('adminConnectedList');
  const count = document.getElementById('adminConnectedCount');
  if (!list || !count) return;
  const now = Date.now();
  const connected = Object.entries(records)
    .map(([uid, data]) => ({ uid, ...data }))
    .filter(item => isPresenceActive(item, now));
  count.textContent = `${connected.length} ${connected.length === 1 ? 'conectado' : 'conectados'}`;
  list.innerHTML = '';
  if (!connected.length) {
    list.innerHTML = '<p class="muted">Sin usuarios conectados.</p>';
    return;
  }
  connected
    .sort((a, b) => (a.displayName || a.username || '').localeCompare(b.displayName || b.username || ''))
    .forEach((user) => {
      const card = document.createElement('div');
      const lastSeen = user.lastActiveAt ? formatRelativeTime(user.lastActiveAt) : 'recién conectado';
      const isSelf = user.uid === authState.user?.uid;
      card.className = 'admin-connected-card';
      card.innerHTML = `
        <div class="admin-connected-info">
          <span>${user.displayName || user.username || 'Usuario'}</span>
          <div class="admin-connected-meta">Rol: ${user.role || 'Usuario'} · Última señal: ${lastSeen}</div>
        </div>
        <div class="admin-connected-actions">
          <button class="ghost-btn mini danger" data-action="kick" data-uid="${user.uid}" ${isSelf ? 'disabled' : ''}>
            <i class='bx bx-user-x'></i>${isSelf ? 'Tu sesión' : 'Expulsar'}
          </button>
        </div>
      `;
      list.appendChild(card);
    });
}

async function refreshAdminConnectedUsers() {
  try {
    const presence = await dbGet('presence');
    presenceState.adminSnapshot = presence || {};
    renderConnectedUsers(presenceState.adminSnapshot);
  } catch (error) {
    console.warn('No se pudo cargar usuarios conectados:', error);
  }
}

function startAdminPresenceStream() {
  if (presenceState.adminStream) {
    presenceState.adminStream.close();
  }
  const streamUrl = buildDatabaseUrl('presence');
  const stream = new EventSource(streamUrl);
  presenceState.adminStream = stream;
  stream.addEventListener('message', (event) => {
    try {
      const payload = JSON.parse(event.data);
      applyPresenceUpdate(presenceState.adminSnapshot, payload.path || '/', payload.data);
      renderConnectedUsers(presenceState.adminSnapshot);
    } catch (err) {
      console.error('Error procesando presencia admin:', err);
    }
  });
  stream.addEventListener('error', () => {
    console.warn('Streaming de presencia admin desconectado, reintentando...');
    stream.close();
    setTimeout(() => {
      if (document.getElementById('adminPanelModal')?.classList.contains('hidden')) return;
      startAdminPresenceStream();
    }, 5000);
  });
}

function stopAdminPresenceStream() {
  if (presenceState.adminStream) {
    presenceState.adminStream.close();
    presenceState.adminStream = null;
  }
}

function startPresenceStream() {
  if (!authState.user || authState.offline) return;
  if (presenceState.stream) {
    presenceState.stream.close();
  }
  const streamUrl = buildDatabaseUrl(`presence/${authState.user.uid}`);
  const stream = new EventSource(streamUrl);
  presenceState.stream = stream;
  stream.addEventListener('message', (event) => {
    try {
      const payload = JSON.parse(event.data);
      const path = payload.path || '/';
      const data = payload.data;
      const incomingSessionId = path === '/sessionId'
        ? data
        : data?.sessionId;
      const incomingSessionStartedAt = path === '/sessionStartedAt'
        ? data
        : data?.sessionStartedAt;
      if (incomingSessionId && presenceState.sessionId && incomingSessionId !== presenceState.sessionId) {
        if (!incomingSessionStartedAt || incomingSessionStartedAt > (presenceState.sessionStartedAt || 0)) {
          handleLogout(false, true);
          return;
        }
      }
      const forceLogoutAt = path === '/forceLogoutAt'
        ? data
        : data?.forceLogoutAt;
      if (forceLogoutAt && presenceState.sessionStartedAt && forceLogoutAt > presenceState.sessionStartedAt) {
        handleLogout(false, true);
      }
    } catch (err) {
      console.error('Error procesando presencia:', err);
    }
  });
  stream.addEventListener('error', () => {
    console.warn('Streaming de presencia desconectado, reintentando...');
    stream.close();
    setTimeout(() => {
      if (authState.user && !authState.offline) {
        startPresenceStream();
      }
    }, 5000);
  });
}

function stopPresenceStream() {
  if (presenceState.stream) {
    presenceState.stream.close();
    presenceState.stream = null;
  }
}

async function enforceSingleSession(uid, sessionStartedAt, sessionId) {
  if (!uid || authState.offline) return;
  try {
    const presence = await dbGet(`presence/${uid}`);
    if (presence?.sessionId && presence.sessionId !== sessionId) {
      await dbPatch('control/forceLogoutUsers', {
        [uid]: sessionStartedAt
      });
    }
  } catch (error) {
    console.warn('No se pudo validar sesiones activas:', error);
  }
}

function bindPresenceVisibility() {
  if (presenceState.visibilityBound) return;
  presenceState.visibilityBound = true;
  document.addEventListener('visibilitychange', () => {
    if (!authState.user || authState.offline) return;
    updatePresenceStatus({ lastActiveAt: Date.now(), online: !document.hidden }).catch(() => {});
  });
}

async function startPresenceTracking() {
  if (!authState.user || authState.offline) return;
  if (!presenceState.sessionId) {
    presenceState.sessionId = createSessionId();
  }
  if (!presenceState.sessionStartedAt) {
    presenceState.sessionStartedAt = Date.now();
  }
  presenceState.lastActivitySyncAt = Date.now();
  await updatePresenceStatus({ online: true, lastActiveAt: Date.now() }, { includeIdentity: true });
  startPresenceStream();
  startForcedLogoutMonitor();
  bindPresenceVisibility();
  if (presenceState.heartbeatTimer) {
    clearInterval(presenceState.heartbeatTimer);
  }
  presenceState.heartbeatTimer = setInterval(() => {
    updatePresenceStatus({ online: true, lastActiveAt: Date.now() }).catch(() => {});
  }, PRESENCE_HEARTBEAT_MS);
}

async function stopPresenceTracking() {
  if (presenceState.heartbeatTimer) {
    clearInterval(presenceState.heartbeatTimer);
    presenceState.heartbeatTimer = null;
  }
  stopForcedLogoutMonitor();
  stopPresenceStream();
  if (authState.user && !authState.offline) {
    await updatePresenceStatus({ online: false, lastActiveAt: Date.now() });
    try {
      await dbDelete(`presence/${authState.user.uid}`);
    } catch (error) {
      console.warn('No se pudo limpiar la presencia del usuario:', error);
    }
  }
  presenceState.sessionId = null;
  presenceState.sessionStartedAt = null;
}

function lockAppShell() {
  document.body.classList.add('auth-locked');
  document.body.classList.remove('modules-loaded', 'modules-loading');
  hideAppLoader();
}

function unlockAppShell() {
  document.body.classList.remove('auth-locked');
  if (appBooted) {
    document.body.classList.add('modules-loaded');
  }
}

function showLoginOverlay() {
  lockAppShell();
  document.getElementById('loginOverlay')?.classList.remove('hidden');
}

function hideLoginOverlay() {
  document.getElementById('loginOverlay')?.classList.add('hidden');
}

function setLoginStatus(step) {
  const statusItems = document.querySelectorAll('#loginStatus .auth-status-item');
  statusItems.forEach((item) => {
    const key = item.dataset.statusStep;
    item.classList.remove('active', 'done');
    if (key === step) {
      item.classList.add('active');
    }
    if (step === 'ready') {
      item.classList.add('done');
    }
  });
  if (step === 'ready') {
    statusItems.forEach(item => item.classList.add('done'));
  }
  if (step === 'connect') {
    const connectItem = document.querySelector('#loginStatus [data-status-step="connect"]');
    if (connectItem) connectItem.classList.add('active');
  }
  if (step === 'fetch') {
    const connectItem = document.querySelector('#loginStatus [data-status-step="connect"]');
    if (connectItem) connectItem.classList.add('done');
    const fetchItem = document.querySelector('#loginStatus [data-status-step="fetch"]');
    if (fetchItem) fetchItem.classList.add('active');
  }
}

function setLoginTransitionStep(step, displayName = '') {
  const overlay = document.getElementById('loginTransitionOverlay');
  if (!overlay) return;
  const title = document.getElementById('loginTransitionTitle');
  const name = document.getElementById('loginTransitionName');
  const primary = document.getElementById('loginTransitionMessagePrimary');
  const secondary = document.getElementById('loginTransitionMessageSecondary');
  if (!title || !name || !primary || !secondary) return;
  const safeName = displayName || 'Usuario';
  if (step === 'start') {
    title.textContent = 'Iniciando sesión como:';
    name.textContent = `${safeName}...`;
    primary.textContent = 'Validando credenciales...';
    secondary.textContent = 'Conectando con el panel principal.';
    primary.classList.add('login-transition-pulse');
  } else if (step === 'success') {
    title.textContent = 'Inicio de sesión exitoso!';
    name.textContent = safeName;
    primary.textContent = 'Iniciando sistema';
    secondary.textContent = 'Cargando módulos y preferencias.';
    primary.classList.remove('login-transition-pulse');
  }
}

function showLoginTransition(displayName) {
  const overlay = document.getElementById('loginTransitionOverlay');
  if (!overlay) return;
  setLoginTransitionStep('start', displayName);
  overlay.classList.add('show');
  overlay.setAttribute('aria-hidden', 'false');
}

function hideLoginTransition() {
  const overlay = document.getElementById('loginTransitionOverlay');
  if (!overlay) return;
  overlay.classList.remove('show');
  overlay.setAttribute('aria-hidden', 'true');
}

function updateSessionFooter() {
  const footer = document.getElementById('sessionFooter');
  const status = document.getElementById('sessionStatus');
  const logoutButton = document.getElementById('logoutButton');
  if (!footer || !status || !logoutButton) return;
  if (!authState.session) {
    status.textContent = 'Sesión no iniciada.';
    logoutButton.classList.add('hidden');
    return;
  }
  const remaining = authState.session.expiresAt - Date.now();
  const remainingLabel = formatSessionRemaining(remaining);
  status.textContent = `Usuario: ${authState.session.displayName} | Rol: ${authState.session.role} | La sesión expirará si no se producen cambios ${remainingLabel}.`;
  logoutButton.classList.remove('hidden');
}

function scheduleSessionTicker() {
  clearInterval(authState.sessionTimer);
  authState.sessionTimer = setInterval(() => {
    if (!authState.session) return;
    if (Date.now() >= authState.session.expiresAt) {
      handleLogout(true);
    } else {
      updateSessionFooter();
    }
  }, 1000);
}

async function ensureInitialAdmin() {
  const existingIndex = await dbGet('userIndex');
  if (existingIndex && Object.keys(existingIndex).length) return false;
  const uid = `user-${Date.now()}`;
  const passwordHash = await hashPassword(DEFAULT_ADMIN_CREDENTIALS.password);
  const userRecord = {
    username: DEFAULT_ADMIN_CREDENTIALS.username,
    displayName: DEFAULT_ADMIN_CREDENTIALS.name,
    role: DEFAULT_ADMIN_CREDENTIALS.role,
    status: 'active',
    sessionHours: SESSION_IDLE_HOURS,
    passwordHash,
    createdAt: Date.now()
  };
  await dbPut(`users/${uid}`, userRecord);
  await dbPut(`userIndex/${normalizeUsername(DEFAULT_ADMIN_CREDENTIALS.username)}`, uid);
  return true;
}

async function attemptRestoreSession() {
  const info = sessionInfo();
  if (!info) return false;
  if (Date.now() >= info.expiresAt) {
    clearSessionInfo();
    return false;
  }
  if (info.offline) {
    clearSessionInfo();
    return false;
  }
  const userRecord = await dbGet(`users/${info.uid}`);
  if (!userRecord || userRecord.status !== 'active') {
    clearSessionInfo();
    return false;
  }
  switchUserContext(info.uid, { migrateLegacy: true });
  authState.user = { uid: info.uid, ...userRecord };
  const storedExpiresAt = Number(info.expiresAt);
  const expiresAt = Number.isFinite(storedExpiresAt) ? storedExpiresAt : Date.now() + SESSION_IDLE_TIMEOUT_MS;
  authState.session = {
    uid: info.uid,
    displayName: userRecord.displayName || userRecord.username,
    role: userRecord.role,
    expiresAt
  };
  authState.offline = false;
  setReadOnlyMode(false);
  const sessionId = info.sessionId || createSessionId();
  const sessionStartedAt = info.sessionStartedAt || Date.now();
  presenceState.sessionId = sessionId;
  presenceState.sessionStartedAt = sessionStartedAt;
  if (!info.sessionId || !info.sessionStartedAt || !Number.isFinite(storedExpiresAt)) {
    updateStoredSessionInfo({ uid: info.uid, expiresAt });
  }
  const inferredLastModificationAt = expiresAt - SESSION_IDLE_TIMEOUT_MS;
  idleState.lastModificationAt = Number.isFinite(inferredLastModificationAt) ? inferredLastModificationAt : Date.now();
  setLastUserId(info.uid);
  return true;
}

function startUserStream() {
  if (!authState.user) return;
  if (authState.stream) {
    authState.stream.close();
  }
  const streamUrl = buildDatabaseUrl(`data/${authState.user.uid}`);
  const stream = new EventSource(streamUrl);
  authState.stream = stream;
  stream.addEventListener('message', (event) => {
    try {
      const payload = JSON.parse(event.data);
      applyRemotePathUpdate(payload.path || '/', payload.data);
      setSyncStatus({ online: true, lastCheckAt: Date.now() });
    } catch (err) {
      console.error('Error procesando streaming:', err);
    }
  });
  stream.addEventListener('error', () => {
    console.warn('Streaming desconectado, reintentando...');
    setSyncStatus({ online: false, lastCheckAt: Date.now() });
    stream.close();
    setTimeout(() => {
      if (authState.user) {
        startUserStream();
      }
    }, 3000);
  });
}

function stopUserStream() {
  if (authState.stream) {
    authState.stream.close();
    authState.stream = null;
  }
}

async function loadRemoteState() {
  if (!authState.user) return;
  try {
    const payload = await dbGet(`data/${authState.user.uid}`);
    if (payload) {
      const decoded = decodeFirebasePayload(payload);
      const localSummary = buildLocalSyncSummary();
      const remoteSummary = buildSyncSummary(decoded, 'remote');
      const localTotal = localSummary.items.reduce((acc, item) => acc + (item.count || 0), 0);
      const remoteTotal = remoteSummary.items.reduce((acc, item) => acc + (item.count || 0), 0);
      const comparison = buildSyncComparison(localSummary, remoteSummary);
      if (remoteTotal === 0 && localTotal > 0) {
        await syncRemoteSnapshot({ reason: 'local-preferred' });
        setSyncStatus({ online: true, lastSyncAt: Date.now(), lastCheckAt: Date.now() });
        showToast('Se usaron los datos locales para sincronizar.', 'info');
      } else if (hasSyncDifferences(comparison)) {
        const choice = await openSyncConflictModal({ localSummary, remoteSummary, comparison });
        if (choice === 'local') {
          await syncRemoteSnapshot({ reason: 'local-preferred' });
          setSyncStatus({ online: true, lastSyncAt: Date.now(), lastCheckAt: Date.now() });
          showToast('Usando datos locales y sincronizando en línea.', 'success');
        } else if (choice === 'remote') {
          applyRemotePayload(payload);
          setSyncStatus({ online: true, lastSyncAt: Date.now(), lastCheckAt: Date.now() });
          showToast('Datos online aplicados.', 'success');
        } else {
          showToast('Manteniendo datos locales sin sincronizar.', 'warning');
        }
      } else {
        applyRemotePayload(payload);
        setSyncStatus({ online: true, lastSyncAt: Date.now(), lastCheckAt: Date.now() });
      }
    } else {
      // Crear registro inicial si no existe
      await initializeUserData();
      setSyncStatus({ online: true, lastSyncAt: Date.now(), lastCheckAt: Date.now() });
    }
  } catch (error) {
    console.warn('No se pudo cargar datos remotos, usando valores locales:', error);
    setSyncStatus({ online: false, lastCheckAt: Date.now() });
    // Si falla, continuar con datos locales
    try {
      await initializeUserData();
    } catch (err) {
      console.warn('No se pudo inicializar datos en Firebase:', err);
    }
  }
}

async function initializeUserData() {
  if (!authState.user) return;
  
  // Crear un payload mínimo inicialmente
  // Los datos grandes (vehicles, templates) se sincronizan cuando cambian
  const initialData = {
    clients: clients && clients.length > 0 ? clients : [],
    managerClients: managerClients && managerClients.length > 0 ? managerClients : [],
    uiState: sanitizeUiStateForSync(uiState),
    clientManagerState: sanitizeClientManagerStateForSync(clientManagerState),
    generatedQuotes: generatedQuotes && generatedQuotes.length > 0 ? generatedQuotes : [],
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  
  try {
    await dbPut(`data/${authState.user.uid}`, initialData);
    console.log('Datos de usuario inicializados exitosamente');
  } catch (error) {
    console.warn('No se pudieron inicializar los datos del usuario:', error);
    // No lanzar el error, permitir que continúe
  }
}

function updateAdminAccessVisibility() {
  const adminButton = document.getElementById('openAdminPanel');
  if (!adminButton) return;
  if (authState.session?.role === 'Administrador') {
    adminButton.classList.remove('hidden');
  } else {
    adminButton.classList.add('hidden');
  }
}

function setReadOnlyMode(active) {
  readOnlyState.active = active;
  document.body.classList.toggle('read-only', active);
  const offlineLabel = document.getElementById('syncStatusDetail');
  if (active && offlineLabel) {
    offlineLabel.textContent = 'Sin conexión activa (solo lectura)';
  }
  const disableIds = ['clientExcel', 'moduleImportTrigger', 'moduleImportReview', 'moduleImportInput', 'importProfile', 'openPasswordModal'];
  disableIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (active) {
      el.setAttribute('disabled', 'true');
      el.classList.add('disabled');
    } else {
      el.removeAttribute('disabled');
      el.classList.remove('disabled');
    }
  });
  updateSyncStatusUI();
}

function getIdleTimeoutMs() {
  return authState.offline ? OFFLINE_SESSION_MS : IDLE_TIMEOUT_MS;
}

function startIdleTimer() {
  if (!authState.session) return;
  if (idleState.timer) clearTimeout(idleState.timer);
  const timeoutMs = getIdleTimeoutMs();
  const elapsed = Date.now() - idleState.lastModificationAt;
  const remaining = Math.max(timeoutMs - elapsed, 0);
  idleState.timer = setTimeout(() => {
    if (!authState.session) return;
    handleLogout(false, false, true);
  }, remaining);
}

function recordModification() {
  const now = Date.now();
  idleState.lastModificationAt = now;
  refreshSessionExpiry(now);
  startIdleTimer();
  updateSessionFooter();
}

function resetIdleTimer() {
  idleState.lastActivityAt = Date.now();
}

function stopIdleTimer() {
  if (idleState.timer) {
    clearTimeout(idleState.timer);
    idleState.timer = null;
  }
}

function registerUserActivity() {
  if (!authState.session) return;
  resetIdleTimer();
  if (!authState.offline) {
    schedulePresenceActivity();
  }
}

function bindIdleActivity() {
  if (idleState.bound) return;
  idleState.bound = true;
  ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'].forEach((eventName) => {
    document.addEventListener(eventName, () => registerUserActivity(), { passive: true });
  });
}

function schedulePresenceActivity() {
  if (!authState.user || authState.offline) return;
  const now = Date.now();
  const elapsed = now - presenceState.lastActivitySyncAt;
  if (elapsed >= PRESENCE_ACTIVITY_DEBOUNCE_MS) {
    presenceState.lastActivitySyncAt = now;
    updatePresenceStatus({ lastActiveAt: now, online: true }).catch(() => {});
    return;
  }
  if (presenceState.activityTimer) return;
  const waitMs = PRESENCE_ACTIVITY_DEBOUNCE_MS - elapsed;
  presenceState.activityTimer = setTimeout(() => {
    presenceState.activityTimer = null;
    presenceState.lastActivitySyncAt = Date.now();
    updatePresenceStatus({ lastActiveAt: Date.now(), online: true }).catch(() => {});
  }, waitMs);
}

async function handleLogin(username, password) {
  const normalized = normalizeUsername(username);
  if (!normalized || !password) {
    showToast('Completa usuario y contraseña.', 'warning');
    return false;
  }
  setLoginStatus('connect');
  const uid = await dbGet(`userIndex/${normalized}`);
  if (!uid) {
    showToast('Usuario no encontrado.', 'error');
    return false;
  }
  setLoginStatus('fetch');
  const userRecord = await dbGet(`users/${uid}`);
  if (!userRecord || userRecord.status !== 'active') {
    showToast('Usuario desactivado o inválido.', 'error');
    return false;
  }
  const passwordHash = await hashPassword(password);
  if (passwordHash !== userRecord.passwordHash) {
    showToast('Contraseña incorrecta.', 'error');
    return false;
  }
  const expiresAt = Date.now() + SESSION_IDLE_TIMEOUT_MS;
  authState.user = { uid, ...userRecord };
  authState.session = {
    uid,
    displayName: userRecord.displayName || userRecord.username,
    role: userRecord.role,
    expiresAt
  };
  authState.offline = false;
  switchUserContext(uid, { migrateLegacy: true });
  const sessionId = createSessionId();
  const sessionStartedAt = Date.now();
  presenceState.sessionId = sessionId;
  presenceState.sessionStartedAt = sessionStartedAt;
  updateStoredSessionInfo({ uid });
  setLastUserId(uid);
  updateSessionFooter();
  scheduleSessionTicker();
  setReadOnlyMode(false);
  updateAdminAccessVisibility();
  showLoginTransition(authState.session.displayName);
  hideLoginOverlay();
  await enforceSingleSession(uid, sessionStartedAt, sessionId);
  await loadRemoteState();
  startUserStream();
  await startPresenceTracking();
  recordModification();
  setLoginTransitionStep('success', authState.session.displayName);
  await wait(700);
  unlockAppShell();
  await bootModules();
  hideLoginTransition();
  setLoginStatus('ready');
  showToast('Sesión iniciada correctamente.', 'success');
  return true;
}

async function handleLogout(expired = false, forced = false, inactive = false) {
  if (authState.loggingOut) return;
  authState.loggingOut = true;
  stopUserStream();
  try {
    await stopPresenceTracking();
    authState.user = null;
    authState.session = null;
    authState.offline = false;
    clearSessionInfo();
    setStorageScope(STORAGE_GUEST_ID, { migrateLegacy: false });
    resetInMemoryState();
    syncState.lastHashes = {};
    remoteSyncQueue = {};
    setReadOnlyMode(false);
    stopIdleTimer();
    if (authState.sessionTimer) {
      clearInterval(authState.sessionTimer);
      authState.sessionTimer = null;
    }
    if (presenceState.activityTimer) {
      clearTimeout(presenceState.activityTimer);
      presenceState.activityTimer = null;
    }
    setSyncStatus({ online: false, lastCheckAt: Date.now() });
    updateSessionFooter();
    updateAdminAccessVisibility();
    closeAllOverlays();
    showLoginOverlay();
    setLoginStatus('connect');
    if (expired) {
      showToast('La sesión expiró. Ingresa nuevamente.', 'warning');
    }
    if (forced) {
      showToast('Un administrador cerró tu sesión.', 'warning');
    }
    if (inactive) {
      showToast('Sesión cerrada por inactividad.', 'warning');
    }
  } finally {
    authState.loggingOut = false;
  }
}

async function initializeAuth() {
  try {
    setLoginStatus('connect');
    const didCreateAdmin = await ensureInitialAdmin();
    const helper = document.getElementById('loginHelper');
    if (didCreateAdmin && helper) {
      helper.textContent = `Se creó el administrador inicial: ${DEFAULT_ADMIN_CREDENTIALS.username} / ${DEFAULT_ADMIN_CREDENTIALS.password}.`;
    }
    setLoginStatus('fetch');
    const restored = await attemptRestoreSession();
    updateSessionFooter();
    updateAdminAccessVisibility();
    if (restored) {
      hideLoginOverlay();
      scheduleSessionTicker();
      startIdleTimer();
      if (!authState.offline) {
        await loadRemoteState();
        startUserStream();
        await startPresenceTracking();
      } else {
        setSyncStatus({ online: false, lastCheckAt: Date.now() });
      }
      setLoginStatus('ready');
    } else {
      showLoginOverlay();
    }
  } catch (err) {
    console.error('Error inicializando autenticación:', err);
    showLoginOverlay();
    showToast('No se pudo inicializar la sesión.', 'error');
  }
}

async function fetchUserList() {
  const userRecords = await dbGet('users');
  if (!userRecords) return [];
  return Object.entries(userRecords).map(([uid, data]) => ({ uid, ...data }));
}

function formatAdminDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleString('es-AR', { timeZone: BUENOS_AIRES_TIMEZONE });
}

function formatRelativeTime(value) {
  if (!value) return '-';
  const timestamp = Number(value);
  if (!Number.isFinite(timestamp)) return '-';
  const diffMs = Date.now() - timestamp;
  const future = diffMs < 0;
  const diff = Math.abs(diffMs);
  const seconds = Math.round(diff / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  let amount;
  let unit;
  if (seconds < 60) {
    amount = seconds;
    unit = seconds === 1 ? 'segundo' : 'segundos';
  } else if (minutes < 60) {
    amount = minutes;
    unit = minutes === 1 ? 'minuto' : 'minutos';
  } else if (hours < 24) {
    amount = hours;
    unit = hours === 1 ? 'hora' : 'horas';
  } else {
    amount = days;
    unit = days === 1 ? 'día' : 'días';
  }
  return future ? `en ${amount} ${unit}` : `hace ${amount} ${unit}`;
}

function formatSessionRemaining(ms) {
  if (!Number.isFinite(ms) || ms <= 0) return 'menos de 30 segundos';
  const seconds = Math.ceil(ms / 1000);
  if (seconds <= 30) return 'menos de 30 segundos';
  if (seconds < 60) return `en ${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`;
  const minutes = Math.ceil(seconds / 60);
  if (minutes < 60) return `en ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  const hours = Math.ceil(minutes / 60);
  return `en ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
}

function updateRelativeTimes() {
  document.querySelectorAll('[data-relative-time]').forEach((el) => {
    const timestamp = el.dataset.relativeTime;
    if (!timestamp) return;
    el.textContent = formatRelativeTime(timestamp);
  });
}

function startRelativeTimeTicker() {
  if (relativeTimeTicker) clearInterval(relativeTimeTicker);
  updateRelativeTimes();
  relativeTimeTicker = setInterval(updateRelativeTimes, 1000);
}

function setSyncStatus({ online, lastSyncAt, lastCheckAt, syncing } = {}) {
  if (typeof online === 'boolean') syncStatus.online = online;
  if (lastSyncAt) syncStatus.lastSyncAt = lastSyncAt;
  if (lastCheckAt) syncStatus.lastCheckAt = lastCheckAt;
  if (typeof syncing === 'boolean') syncStatus.syncing = syncing;
  updateSyncStatusUI();
}

function buildRemoteSyncPayload() {
  return {
    vehicles,
    templates,
    clients,
    managerClients,
    uiState: sanitizeUiStateForSync(uiState),
    clientManagerState: sanitizeClientManagerStateForSync(clientManagerState),
    brandSettings,
    generatedQuotes
  };
}

function buildDeltaSyncPayload() {
  const basePayload = buildRemoteSyncPayload();
  const delta = {};
  Object.entries(basePayload).forEach(([key, value]) => {
    const normalizedValue = normalizeSyncValue(value);
    const serialized = normalizedValue === null || normalizedValue === undefined ? '' : stableStringify(normalizedValue);
    const nextHash = hashString(serialized);
    if (syncState.lastHashes[key] !== nextHash) {
      delta[key] = value;
    }
  });
  return delta;
}

async function runManualSync() {
  if (!authState.user || authState.offline) {
    showToast('No hay conexión activa para sincronizar.', 'warning');
    return;
  }
  const delta = buildDeltaSyncPayload();
  const deltaKeys = Object.keys(delta);
  if (!deltaKeys.length) {
    showToast('No hay cambios para sincronizar.', 'info');
    return;
  }
  setSyncStatus({ syncing: true });
  showImportOverlay({
    eyebrow: 'Sincronización manual',
    title: 'Sincronizando con el servidor',
    subtitle: 'Espera un momento...',
    helper: 'Subiendo únicamente los cambios detectados.',
    steps: ['Preparando datos...', 'Enviando cambios...', 'Verificando respuesta...']
  });
  try {
    const payload = { ...delta, updatedAt: Date.now() };
    await dbPatch(`data/${authState.user.uid}`, payload);
    deltaKeys.forEach((key) => {
      const normalizedValue = normalizeSyncValue(payload[key]);
      const serialized = normalizedValue === null || normalizedValue === undefined ? '' : stableStringify(normalizedValue);
      syncState.lastHashes[key] = hashString(serialized);
    });
    setStoredValue(SYNC_HASH_STORAGE_KEY, syncState.lastHashes);
    syncState.lastSyncAt = Date.now();
    setSyncStatus({ online: true, lastSyncAt: syncState.lastSyncAt, lastCheckAt: Date.now() });
    showToast('Datos sincronizados correctamente.', 'success');
  } catch (error) {
    console.warn('No se pudo sincronizar manualmente:', error);
    showToast('No se pudo completar la sincronización manual.', 'error');
  } finally {
    hideImportOverlay();
    setSyncStatus({ syncing: false });
  }
}

function bindSyncStatusCard() {
  const card = document.getElementById('syncStatusCard');
  if (!card || card.dataset.bound) return;
  card.dataset.bound = 'true';
  card.addEventListener('click', () => runManualSync());
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      runManualSync();
    }
  });
}

function updateSyncStatusUI() {
  const card = document.getElementById('syncStatusCard');
  const label = document.getElementById('syncStatusLabel');
  const detail = document.getElementById('syncStatusDetail');
  const icon = document.getElementById('syncStatusIcon');
  if (!card || !label || !detail || !icon) return;
  card.classList.toggle('online', syncStatus.online);
  card.classList.toggle('offline', !syncStatus.online);
  const isSyncing = syncStatus.syncing && syncStatus.online;
  card.classList.toggle('syncing', isSyncing);
  card.classList.toggle('clickable', syncStatus.online && !!authState.session && !authState.offline);
  if (isSyncing) {
    label.textContent = 'Sincronizando';
    detail.textContent = 'Sincronizando datos con el servidor...';
    card.title = 'Sincronizando datos con el servidor...';
    icon.innerHTML = "<i class='bx bx-wifi sync-spinner'></i>";
    return;
  }
  const statusText = syncStatus.online ? 'Estás Online' : 'Estás Offline';
  label.textContent = statusText;
  const lastSync = syncStatus.lastSyncAt ? formatRelativeTime(syncStatus.lastSyncAt) : '-';
  if (syncStatus.online) {
    detail.innerHTML = `Última sincronización: <span data-relative-time="${syncStatus.lastSyncAt || ''}">${lastSync}</span>`;
  } else {
    detail.textContent = authState.offline ? 'Sin conexión activa (solo lectura)' : 'Sin conexión activa';
  }
  const tooltip = syncStatus.online
    ? `Estás Online (Última sincronización: ${lastSync})`
    : 'Estás Offline';
  card.title = tooltip;
  icon.innerHTML = `<i class='bx ${syncStatus.online ? 'bx-wifi' : 'bx-wifi-off'}'></i>`;
  updateRelativeTimes();
}

const SYNC_GROUP_LABELS = {
  data: 'Datos',
  modules: 'Módulos',
  content: 'Contenido',
  config: 'Configuración',
  info: 'Información',
  backup: 'Respaldo'
};

const SYNC_ITEM_DEFINITIONS = [
  { key: 'clients', label: 'Clientes (registro principal)', group: 'data', kind: 'array', description: 'Listado principal de clientes cargados para cotizaciones.' },
  { key: 'generatedQuotes', label: 'Cotizaciones', group: 'data', kind: 'array', description: 'Cotizaciones generadas y guardadas.' },
  { key: 'managerClients', label: 'Gestor de clientes (seguimiento)', group: 'modules', kind: 'array', description: 'Historial y seguimiento de contactos del gestor de clientes.' },
  { key: 'templates', label: 'Plantillas', group: 'content', kind: 'array', description: 'Mensajes y textos guardados.' },
  { key: 'vehicles', label: 'Vehículos', group: 'content', kind: 'array', description: 'Listado de autos y valores.' },
  { key: 'uiState', label: 'Preferencias de cuenta', group: 'config', kind: 'object', description: 'Ajustes principales de cuenta y preferencias visuales.' },
  { key: 'clientManagerState', label: 'Configuración del gestor', group: 'config', kind: 'object', description: 'Columnas y acciones personalizadas del gestor de clientes.' },
  { key: 'brandSettings', label: 'Configuración de marcas', group: 'config', kind: 'array', description: 'Esquemas y colores por marca.' }
];

function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  const keys = Object.keys(value).sort();
  return `{${keys.map(key => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
}

const SYNC_METADATA_KEYS = new Set(['updatedAt', 'createdAt', 'lastUpdatedAt', 'lastSyncAt']);

const SYNC_NUMERIC_STRING_REGEX = /^-?\d+(\.\d+)?$/;

function normalizeSyncScalar(value) {
  if (value === null || value === undefined) return undefined;
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }
  if (typeof value === 'string') {
    const normalized = value.replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '');
    const trimmed = normalized.trim();
    if (SYNC_NUMERIC_STRING_REGEX.test(trimmed)) {
      return Number(trimmed);
    }
    return normalized;
  }
  return value;
}

function normalizeSyncValue(value) {
  const scalar = normalizeSyncScalar(value);
  if (scalar !== undefined && typeof scalar !== 'object') return scalar;
  if (scalar === undefined) return undefined;
  if (typeof scalar !== 'object') return scalar;
  if (Array.isArray(value)) {
    const normalizedItems = value.map(item => normalizeSyncValue(item)).filter(item => item !== undefined);
    if (!normalizedItems.length) return undefined;
    return normalizedItems
      .map(item => ({ item, key: stableStringify(item) }))
      .sort((a, b) => a.key.localeCompare(b.key))
      .map(({ item }) => item);
  }
  const normalized = {};
  Object.keys(value)
    .filter(key => !SYNC_METADATA_KEYS.has(key))
    .sort()
    .forEach((key) => {
      const normalizedValue = normalizeSyncValue(value[key]);
      if (normalizedValue !== undefined) {
        normalized[key] = normalizedValue;
      }
    });
  if (!Object.keys(normalized).length) return undefined;
  return normalized;
}

function hashString(input = '') {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = ((hash << 5) - hash) + input.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}

function sanitizeUiStateForStorage(state = {}) {
  return {
    preferences: state.preferences || {},
    globalSettings: state.globalSettings || {},
    advisorNote: state.advisorNote || ''
  };
}

function sanitizeUiStateForSync(state = {}) {
  return {
    preferences: state.preferences || {},
    globalSettings: state.globalSettings || {}
  };
}

function sanitizeClientManagerStateForStorage(state = {}) {
  return {
    columnVisibility: state.columnVisibility || {},
    exportOptions: state.exportOptions || {},
    actionVisibility: state.actionVisibility || {},
    customActions: state.customActions || [],
    contactAssistant: {
      interval: Number(state.contactAssistant?.interval) || defaultClientManagerState.contactAssistant.interval
    }
  };
}

function sanitizeClientManagerStateForSync(state = {}) {
  return sanitizeClientManagerStateForStorage(state);
}

function normalizeSyncPayload(payload = {}) {
  return {
    ...payload,
    uiState: sanitizeUiStateForSync(payload.uiState || {}),
    clientManagerState: sanitizeClientManagerStateForSync(payload.clientManagerState || {})
  };
}

function buildSyncItemValue(item, payload) {
  const raw = payload?.[item.key];
  const normalized = normalizeSyncValue(raw);
  const serialized = normalized === null || normalized === undefined ? '' : stableStringify(normalized);
  const bytes = serialized ? new Blob([serialized]).size : 0;
  if (item.kind === 'array') {
    const count = Array.isArray(raw) ? raw.length : 0;
    return { raw, normalized, display: number.format(count), count, bytes, hash: hashString(serialized), signature: serialized };
  }
  if (item.kind === 'object') {
    const count = raw && typeof raw === 'object' ? Object.keys(raw).length : 0;
    return { raw, normalized, display: number.format(count), count, bytes, hash: hashString(serialized), signature: serialized };
  }
  if (item.kind === 'value') {
    const display = raw ? String(raw) : 'Sin definir';
    return { raw, normalized, display, count: raw ? 1 : 0, bytes, hash: hashString(serialized), signature: serialized };
  }
  return { raw, normalized, display: raw ? String(raw) : '0', count: raw ? 1 : 0, bytes, hash: hashString(serialized), signature: serialized };
}

function buildSyncSummary(payload, sourceLabel) {
  const safePayload = normalizeSyncPayload(payload || {});
  const items = SYNC_ITEM_DEFINITIONS.map((item) => {
    const value = buildSyncItemValue(item, safePayload);
    return {
      ...item,
      groupLabel: SYNC_GROUP_LABELS[item.group] || item.group,
      display: value.display,
      count: value.count,
      bytes: value.bytes,
      hash: value.hash,
      signature: value.signature
    };
  });
  return {
    source: sourceLabel,
    updatedAt: safePayload.updatedAt || safePayload.createdAt || null,
    items
  };
}

function buildLocalSyncSummary() {
  const summary = buildSyncSummary({
    clients,
    managerClients,
    templates,
    vehicles,
    generatedQuotes,
    uiState,
    clientManagerState,
    brandSettings,
    updatedAt: load('localUpdatedAt')
  }, 'local');
  return summary;
}

function buildSyncComparison(localSummary, remoteSummary) {
  const comparison = {};
  localSummary?.items?.forEach((item) => {
    comparison[item.key] = { local: item, remote: null, different: false };
  });
  remoteSummary?.items?.forEach((item) => {
    if (!comparison[item.key]) {
      comparison[item.key] = { local: null, remote: item, different: false };
    } else {
      comparison[item.key].remote = item;
    }
  });
  const isEffectivelyEmpty = (item) => !item || item.count === 0;
  Object.values(comparison).forEach((entry) => {
    const localEmpty = isEffectivelyEmpty(entry.local);
    const remoteEmpty = isEffectivelyEmpty(entry.remote);
    if (localEmpty && remoteEmpty) {
      entry.different = false;
    } else if (!entry.local || !entry.remote) {
      entry.different = true;
    } else {
      const localSignature = entry.local.signature ?? '';
      const remoteSignature = entry.remote.signature ?? '';
      entry.different = localSignature !== remoteSignature;
    }
    entry.localBytes = entry.local?.bytes || 0;
    entry.remoteBytes = entry.remote?.bytes || 0;
    entry.byteDiff = entry.localBytes - entry.remoteBytes;
  });
  return comparison;
}

function hasSyncDifferences(comparison = {}) {
  return Object.values(comparison).some(entry => entry.different);
}

function shouldPromptSyncChoice(localSummary, remoteSummary) {
  if (!localSummary || !remoteSummary) return false;
  const comparison = buildSyncComparison(localSummary, remoteSummary);
  return hasSyncDifferences(comparison);
}

function buildSyncSummaryMarkup(summary, comparison = {}) {
  if (!summary) return '';
  return summary.items.map((item) => {
    const diff = comparison[item.key]?.different;
    const diffLabel = diff ? 'Diferente' : 'Igual';
    const diffClass = diff ? 'diff' : 'same';
    const localBytes = comparison[item.key]?.localBytes ?? item.bytes ?? 0;
    const remoteBytes = comparison[item.key]?.remoteBytes ?? item.bytes ?? 0;
    const byteDiff = comparison[item.key]?.byteDiff ?? 0;
    const diffSign = byteDiff > 0 ? '+' : '';
    const bytesLabel = `Local: ${formatBytes(localBytes)} · Remoto: ${formatBytes(remoteBytes)} · Δ ${diffSign}${formatBytes(Math.abs(byteDiff))}`;
    return `
      <div class="sync-conflict-item ${diffClass}" data-sync-key="${item.key}">
        <div class="sync-conflict-item-main">
          <span title="${item.description || ''}">${item.label}</span>
          <strong>${item.display}</strong>
        </div>
        <div class="sync-conflict-item-meta">
          <span class="sync-conflict-group">${item.groupLabel}</span>
          <span class="sync-conflict-size">${bytesLabel}</span>
          <span class="sync-conflict-pill ${diffClass}">${diffLabel}</span>
        </div>
      </div>
    `;
  }).join('');
}

function normalizeProfilePayload(parsed = {}) {
  return {
    clients: parsed.clients || [],
    managerClients: parsed.managerClients || [],
    templates: parsed.templates || [],
    vehicles: parsed.vehicles || [],
    generatedQuotes: parsed.generatedQuotes || [],
    snapshots: parsed.snapshots || [],
    uiState: parsed.uiState || {},
    clientManagerState: parsed.clientManagerState || {},
    brandSettings: parsed.brandSettings || [],
    priceDrafts: parsed.priceDrafts || {},
    activePriceTabId: parsed.activePriceTabId || '',
    activePriceSource: parsed.activePriceSource || '',
    updatedAt: parsed.updatedAt || parsed.createdAt || null
  };
}

function buildSyncCompareHtml(localSummary, incomingSummary, { localLabel = 'Datos actuales', incomingLabel = 'Perfil a importar' } = {}) {
  const comparison = buildSyncComparison(localSummary, incomingSummary);
  return `
    <div class="sync-compare-grid">
      <div class="sync-conflict-card">
        <div class="sync-conflict-head">
          <i class='bx bx-hard-drive'></i>
          <div>
            <strong>${localLabel}</strong>
            <p class="muted tiny">${localSummary?.updatedAt ? `Actualizado: ${formatAdminDate(localSummary.updatedAt)} (${formatRelativeTime(localSummary.updatedAt)})` : 'Actualizado: -'}</p>
          </div>
        </div>
        <div class="sync-conflict-list">
          ${buildSyncSummaryMarkup(localSummary, comparison)}
        </div>
      </div>
      <div class="sync-conflict-card">
        <div class="sync-conflict-head">
          <i class='bx bx-cloud'></i>
          <div>
            <strong>${incomingLabel}</strong>
            <p class="muted tiny">${incomingSummary?.updatedAt ? `Actualizado: ${formatAdminDate(incomingSummary.updatedAt)} (${formatRelativeTime(incomingSummary.updatedAt)})` : 'Actualizado: -'}</p>
          </div>
        </div>
        <div class="sync-conflict-list">
          ${buildSyncSummaryMarkup(incomingSummary, comparison)}
        </div>
      </div>
    </div>
    <p class="muted tiny">Todo lo diferente se reemplazará y se sincronizará en línea al finalizar la importación.</p>
  `;
}

function renderSyncSummary(container, summary, comparison = {}) {
  if (!container || !summary) return;
  container.innerHTML = buildSyncSummaryMarkup(summary, comparison);
}

function showSyncDifferenceDetail(itemKey, comparison = {}) {
  const entry = comparison[itemKey];
  if (!entry) return;
  const label = entry.local?.label || entry.remote?.label || itemKey;
  const groupLabel = entry.local?.groupLabel || entry.remote?.groupLabel || '';
  const localBytes = entry.localBytes || 0;
  const remoteBytes = entry.remoteBytes || 0;
  const diffBytes = entry.byteDiff || 0;
  const diffSign = diffBytes > 0 ? '+' : '';
  const localCount = entry.local?.count ?? 0;
  const remoteCount = entry.remote?.count ?? 0;
  confirmAction({
    title: `Detalle de diferencia: ${label}`,
    messageHtml: `
      <div class="sync-detail">
        <p><strong>Grupo:</strong> ${groupLabel || 'Sin grupo'}</p>
        <p><strong>Registros locales:</strong> ${number.format(localCount)}</p>
        <p><strong>Registros remotos:</strong> ${number.format(remoteCount)}</p>
        <p><strong>Peso local:</strong> ${formatBytes(localBytes)}</p>
        <p><strong>Peso remoto:</strong> ${formatBytes(remoteBytes)}</p>
        <p><strong>Diferencia:</strong> ${diffSign}${formatBytes(Math.abs(diffBytes))}</p>
      </div>
    `,
    confirmText: 'Cerrar',
    cancelText: 'Cerrar'
  });
}

function openSyncConflictModal({ localSummary, remoteSummary, comparison } = {}) {
  return new Promise(resolve => {
    const modal = document.getElementById('syncConflictModal');
    const localList = document.getElementById('syncLocalSummary');
    const remoteList = document.getElementById('syncRemoteSummary');
    const localUpdated = document.getElementById('syncLocalUpdated');
    const remoteUpdated = document.getElementById('syncRemoteUpdated');
    const localBtn = document.getElementById('syncConflictLocal');
    const remoteBtn = document.getElementById('syncConflictRemote');
    if (!modal) {
      resolve('cancel');
      return;
    }
    renderSyncSummary(localList, localSummary, comparison);
    renderSyncSummary(remoteList, remoteSummary, comparison);
    if (localUpdated) {
      localUpdated.textContent = localSummary?.updatedAt
        ? `Actualizado: ${formatAdminDate(localSummary.updatedAt)} (${formatRelativeTime(localSummary.updatedAt)})`
        : 'Actualizado: -';
    }
    if (remoteUpdated) {
      remoteUpdated.textContent = remoteSummary?.updatedAt
        ? `Actualizado: ${formatAdminDate(remoteSummary.updatedAt)} (${formatRelativeTime(remoteSummary.updatedAt)})`
        : 'Actualizado: -';
    }

    const handleDetailClick = (event) => {
      const item = event.target.closest('.sync-conflict-item');
      if (!item) return;
      const key = item.dataset.syncKey;
      if (!key) return;
      showSyncDifferenceDetail(key, comparison);
    };

    localList?.addEventListener('click', handleDetailClick);
    remoteList?.addEventListener('click', handleDetailClick);

    const cleanup = (choice) => {
      toggleModal(modal, false);
      localBtn.onclick = null;
      remoteBtn.onclick = null;
      localList?.removeEventListener('click', handleDetailClick);
      remoteList?.removeEventListener('click', handleDetailClick);
      resolve(choice);
    };

    localBtn.onclick = () => cleanup('local');
    remoteBtn.onclick = () => cleanup('remote');
    toggleModal(modal, true);
  });
}

function formatBytes(bytes = 0) {
  if (!Number.isFinite(bytes)) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let index = 0;
  let value = bytes;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  return `${value.toFixed(value >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}

async function loadAdminUserData(uid, { force = false } = {}) {
  if (!uid) return null;
  if (!force && adminState.userDataCache[uid]) {
    return adminState.userDataCache[uid].data;
  }
  const payload = await dbGet(`data/${uid}`);
  const decoded = payload ? decodeFirebasePayload(payload) : null;
  adminState.userDataCache[uid] = { data: decoded, fetchedAt: Date.now() };
  return decoded;
}

function computeUserMetrics(payload) {
  const safePayload = payload || {};
  const sizeBytes = payload ? new Blob([JSON.stringify(payload)]).size : 0;
  const counts = {
    clients: Array.isArray(safePayload.clients) ? safePayload.clients.length : 0,
    managerClients: Array.isArray(safePayload.managerClients) ? safePayload.managerClients.length : 0,
    templates: Array.isArray(safePayload.templates) ? safePayload.templates.length : 0,
    vehicles: Array.isArray(safePayload.vehicles) ? safePayload.vehicles.length : 0,
    generatedQuotes: Array.isArray(safePayload.generatedQuotes) ? safePayload.generatedQuotes.length : 0,
    brandSettings: Array.isArray(safePayload.brandSettings) ? safePayload.brandSettings.length : 0
  };
  return {
    sizeBytes,
    counts,
    updatedAt: safePayload.updatedAt || null,
    createdAt: safePayload.createdAt || null
  };
}

function renderAdminList(users, selectedUid) {
  const list = document.getElementById('adminUserList');
  const count = document.getElementById('adminUserCount');
  if (count) count.textContent = `${users.length} ${users.length === 1 ? 'usuario' : 'usuarios'}`;
  if (!list) return;
  list.innerHTML = '';
  if (!users.length) {
    list.innerHTML = '<p class="muted">No hay usuarios registrados.</p>';
    return;
  }
  users.forEach(user => {
    const card = document.createElement('div');
    const statusLabel = user.status === 'active' ? 'Activo' : 'Inactivo';
    const primaryAdmin = isPrimaryAdmin(user);
    card.className = `admin-user-card ${selectedUid === user.uid ? 'active' : ''}`;
    card.dataset.uid = user.uid;
    card.innerHTML = `
      <div class="admin-user-card-head">
        <div class="admin-user-card-title">
          <span>${user.displayName || user.username}</span>
          <span class="muted tiny">@${user.username}</span>
        </div>
        <span class="pill">${primaryAdmin ? 'Principal' : statusLabel}</span>
      </div>
      <div class="admin-user-card-meta">Rol: ${user.role || 'Usuario'}</div>
      <div class="admin-user-card-actions">
        <button class="ghost-btn mini" data-action="toggle" data-uid="${user.uid}" ${primaryAdmin ? 'disabled' : ''} title="${primaryAdmin ? 'El administrador principal no puede desactivarse.' : ''}">
          <i class='bx bx-power-off'></i>${user.status === 'active' ? 'Desactivar' : 'Activar'}
        </button>
      </div>
    `;
    list.appendChild(card);
  });
}

function renderAdminMeta(user, metrics) {
  const container = document.getElementById('adminUserMeta');
  const title = document.getElementById('adminDetailTitle');
  const subtitle = document.getElementById('adminDetailSubtitle');
  if (!container || !title || !subtitle) return;
  if (!user) {
    title.textContent = 'Detalle de usuario';
    subtitle.textContent = 'Selecciona un usuario para comenzar.';
    container.innerHTML = '';
    return;
  }
  title.textContent = user.displayName || user.username;
  subtitle.textContent = `UID: ${user.uid}`;
  container.innerHTML = `
    <div class="admin-user-meta-row"><span>Usuario</span><strong>@${user.username}</strong></div>
    <div class="admin-user-meta-row"><span>Rol</span><strong>${user.role || 'Usuario'}</strong></div>
    <div class="admin-user-meta-row"><span>Estado</span><strong>${user.status === 'active' ? 'Activo' : 'Inactivo'}</strong></div>
    <div class="admin-user-meta-row"><span>Creado</span><strong>${formatAdminDate(user.createdAt)} <span class="muted tiny" data-relative-time="${user.createdAt || ''}"></span></strong></div>
    <div class="admin-user-meta-row"><span>Actualizado</span><strong>${formatAdminDate(user.updatedAt)} <span class="muted tiny" data-relative-time="${user.updatedAt || ''}"></span></strong></div>
    <div class="admin-user-meta-row"><span>Última sincronización</span><strong>${formatAdminDate(metrics?.updatedAt || metrics?.createdAt)} <span class="muted tiny" data-relative-time="${metrics?.updatedAt || metrics?.createdAt || ''}"></span></strong></div>
  `;
}

function renderAdminMetrics(metrics) {
  const container = document.getElementById('adminUserMetrics');
  if (!container) return;
  if (!metrics) {
    container.innerHTML = '<p class="muted">Sin datos sincronizados.</p>';
    return;
  }
  container.innerHTML = `
    <div class="admin-metric-card">
      <span class="metric-label">Espacio usado</span>
      <span class="metric-value">${formatBytes(metrics.sizeBytes)}</span>
      <span class="muted tiny">Payload sincronizado</span>
    </div>
    <div class="admin-metric-card">
      <span class="metric-label">Clientes</span>
      <span class="metric-value">${metrics.counts.clients}</span>
      <span class="muted tiny">Registros principales</span>
    </div>
    <div class="admin-metric-card">
      <span class="metric-label">Gestor de clientes</span>
      <span class="metric-value">${metrics.counts.managerClients}</span>
      <span class="muted tiny">Clientes gestionados</span>
    </div>
    <div class="admin-metric-card">
      <span class="metric-label">Plantillas</span>
      <span class="metric-value">${metrics.counts.templates}</span>
      <span class="muted tiny">Mensajes guardados</span>
    </div>
    <div class="admin-metric-card">
      <span class="metric-label">Vehículos</span>
      <span class="metric-value">${metrics.counts.vehicles}</span>
      <span class="muted tiny">Modelos cargados</span>
    </div>
    <div class="admin-metric-card">
      <span class="metric-label">Cotizaciones</span>
      <span class="metric-value">${metrics.counts.generatedQuotes}</span>
      <span class="muted tiny">Generadas</span>
    </div>
  `;
}

function populateAdminEditForm(user) {
  const form = document.getElementById('adminEditForm');
  if (!form) return;
  const primaryAdmin = isPrimaryAdmin(user);
  form.dataset.uid = user?.uid || '';
  document.getElementById('adminEditUsername').value = user?.username || '';
  document.getElementById('adminEditName').value = user?.displayName || '';
  document.getElementById('adminEditRole').value = user?.role || 'Usuario';
  const statusInput = document.getElementById('adminEditStatus');
  statusInput.value = user?.status || 'active';
  statusInput.disabled = primaryAdmin;
  document.getElementById('adminEditPassword').value = '';
  const deleteButton = document.getElementById('adminDeleteUser');
  if (deleteButton) deleteButton.disabled = primaryAdmin;
}

async function refreshAdminPanel(selectedUid = null) {
  const users = await fetchUserList();
  adminState.users = users;
  const resolvedUid = selectedUid || adminState.selectedUid || users[0]?.uid || null;
  adminState.selectedUid = resolvedUid;
  renderAdminList(users, resolvedUid);
  await renderAdminDetail(resolvedUid);
  return users;
}

async function renderAdminDetail(uid, { forceData = false } = {}) {
  if (!uid) {
    renderAdminMeta(null, null);
    renderAdminMetrics(null);
    populateAdminEditForm(null);
    return;
  }
  const user = adminState.users.find(item => item.uid === uid);
  if (!user) return;
  renderAdminMeta(user, null);
  populateAdminEditForm(user);
  const data = await loadAdminUserData(uid, { force: forceData });
  const metrics = data ? computeUserMetrics(data) : null;
  renderAdminMeta(user, metrics);
  renderAdminMetrics(metrics);
  updateRelativeTimes();
}

async function handleAdminListAction(event) {
  const toggleButton = event.target?.closest('button[data-action="toggle"]');
  if (toggleButton) {
    const uid = toggleButton.dataset.uid;
    if (!uid) return;
    const user = await dbGet(`users/${uid}`);
    if (!user) return;
    if (isPrimaryAdmin(user)) {
      showToast('El administrador principal no puede desactivarse.', 'warning');
      return;
    }
    const nextStatus = user.status === 'active' ? 'disabled' : 'active';
    await dbPatch(`users/${uid}`, { status: nextStatus, updatedAt: Date.now() });
    await refreshAdminPanel(uid);
    return;
  }
  const card = event.target?.closest('.admin-user-card');
  if (!card) return;
  const uid = card.dataset.uid;
  if (!uid) return;
  adminState.selectedUid = uid;
  renderAdminList(adminState.users, uid);
  await renderAdminDetail(uid);
}

async function handleAdminConnectedAction(event) {
  const kickButton = event.target?.closest('button[data-action="kick"]');
  if (!kickButton) return;
  const uid = kickButton.dataset.uid;
  if (!uid) return;
  if (uid === authState.user?.uid) {
    showToast('No puedes expulsar tu propia sesión.', 'warning');
    return;
  }
  confirmAction({
    title: 'Expulsar usuario',
    message: 'La sesión activa se cerrará de inmediato en el dispositivo del usuario.',
    confirmText: 'Expulsar',
    onConfirm: async () => {
      await dbPatch(`presence/${uid}`, {
        forceLogoutAt: Date.now(),
        forcedBy: authState.user?.uid || ''
      });
      await dbPatch('control/forceLogoutUsers', {
        [uid]: Date.now()
      });
      showToast('Se envió la orden de cierre.', 'success');
    }
  });
}

async function handleAdminForceLogoutAll() {
  if (!authState.user) return;
  confirmAction({
    title: 'Cerrar todas las sesiones',
    message: 'Se cerrarán todas las conexiones activas (incluida la tuya).',
    confirmText: 'Cerrar todo',
    onConfirm: async () => {
      try {
        const presence = await dbGet('presence');
        const now = Date.now();
        const payload = {};
        Object.keys(presence || {}).forEach((uid) => {
          payload[uid] = {
            forceLogoutAt: now,
            forcedBy: authState.user?.uid || ''
          };
        });
        if (Object.keys(payload).length) {
          await dbPatch('presence', payload);
        }
        await dbPatch('control', { forceLogoutAllAt: now });
        showToast('Se envió el cierre a todas las sesiones.', 'success');
        await handleLogout(false, true);
      } catch (error) {
        console.warn('No se pudo cerrar todas las sesiones:', error);
        showToast('No se pudo cerrar todas las sesiones.', 'error');
      }
    }
  });
}

async function handleAdminEditSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const uid = form.dataset.uid;
  if (!uid) {
    showToast('Selecciona un usuario para editar.', 'warning');
    return;
  }
  const displayName = document.getElementById('adminEditName').value.trim();
  const role = document.getElementById('adminEditRole').value;
  const status = document.getElementById('adminEditStatus').value;
  const password = document.getElementById('adminEditPassword').value;
  const currentUser = adminState.users.find(item => item.uid === uid);
  if (!displayName) {
    showToast('Completa los campos requeridos.', 'warning');
    return;
  }
  const payload = {
    displayName,
    role,
    sessionHours: SESSION_IDLE_HOURS,
    status: isPrimaryAdmin(currentUser) ? 'active' : status,
    updatedAt: Date.now()
  };
  if (isPrimaryAdmin(currentUser) && status !== 'active') {
    showToast('El administrador principal siempre debe permanecer activo.', 'info');
  }
  if (password) {
    payload.passwordHash = await hashPassword(password);
  }
  await dbPatch(`users/${uid}`, payload);
  showToast('Usuario actualizado.', 'success');
  await refreshAdminPanel(uid);
}

async function handleAdminCreateSubmit(event) {
  event.preventDefault();
  const username = document.getElementById('adminCreateUsername').value.trim();
  const displayName = document.getElementById('adminCreateName').value.trim();
  const role = document.getElementById('adminCreateRole').value;
  const password = document.getElementById('adminCreatePassword').value;
  const status = document.getElementById('adminCreateStatus').value;
  const normalized = normalizeUsername(username);
  if (!normalized || !displayName || !password) {
    showToast('Completa los campos requeridos.', 'warning');
    return;
  }
  const exists = await dbGet(`userIndex/${normalized}`);
  if (exists) {
    showToast('Ya existe un usuario con ese identificador.', 'error');
    return;
  }
  const passwordHash = await hashPassword(password);
  const newUid = `user-${Date.now()}`;
  await dbPut(`users/${newUid}`, {
    username: normalized,
    displayName,
    role,
    sessionHours: SESSION_IDLE_HOURS,
    status,
    passwordHash,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
  await dbPut(`userIndex/${normalized}`, newUid);
  document.getElementById('adminCreateForm')?.reset();
  showToast('Usuario creado.', 'success');
  activateAdminTab('overview');
  await refreshAdminPanel(newUid);
}

async function handleAdminDeleteUser() {
  const uid = document.getElementById('adminEditForm')?.dataset.uid;
  if (!uid) return;
  if (uid === authState.user?.uid) {
    showToast('No puedes eliminar tu propio usuario activo.', 'warning');
    return;
  }
  const user = await dbGet(`users/${uid}`);
  if (!user) return;
  if (isPrimaryAdmin(user)) {
    showToast('El administrador principal no puede eliminarse.', 'warning');
    return;
  }
  confirmAction({
    title: 'Eliminar usuario',
    message: `Se eliminará el usuario ${user.displayName || user.username} y sus datos asociados.`,
    confirmText: 'Eliminar',
    onConfirm: async () => {
      await dbDelete(`users/${uid}`);
      await dbDelete(`data/${uid}`);
      if (user.username) {
        await dbDelete(`userIndex/${normalizeUsername(user.username)}`);
      }
      adminState.userDataCache[uid] = null;
      showToast('Usuario eliminado.', 'success');
      await refreshAdminPanel();
    }
  });
}

function activateAdminTab(tabId) {
  const tabs = document.querySelectorAll('.admin-tab');
  const panels = document.querySelectorAll('.admin-tab-panel');
  tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.adminTab === tabId));
  panels.forEach(panel => panel.classList.toggle('active', panel.dataset.adminPanel === tabId));
}

function resetPasswordForm() {
  document.getElementById('passwordForm')?.reset();
}

async function handlePasswordChangeSubmit(event) {
  event.preventDefault();
  if (!authState.user) {
    showToast('Debes iniciar sesión para cambiar tu contraseña.', 'warning');
    return;
  }
  if (authState.offline) {
    showToast('No puedes cambiar la contraseña en modo sin conexión.', 'warning');
    return;
  }
  const current = document.getElementById('passwordCurrent').value;
  const next = document.getElementById('passwordNew').value;
  const confirm = document.getElementById('passwordConfirm').value;
  if (!current || !next || !confirm) {
    showToast('Completa todos los campos.', 'warning');
    return;
  }
  if (next !== confirm) {
    showToast('Las nuevas contraseñas no coinciden.', 'error');
    return;
  }
  const currentHash = await hashPassword(current);
  if (currentHash !== authState.user.passwordHash) {
    showToast('La contraseña actual es incorrecta.', 'error');
    return;
  }
  const newHash = await hashPassword(next);
  await dbPatch(`users/${authState.user.uid}`, { passwordHash: newHash, updatedAt: Date.now() });
  authState.user.passwordHash = newHash;
  showToast('Contraseña actualizada correctamente.', 'success');
  toggleModal(document.getElementById('passwordModal'), false);
  resetPasswordForm();
}

function bindAuthUI() {
  const loginForm = document.getElementById('loginForm');
  loginForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    authState.loading = true;
    try {
      await handleLogin(username, password);
    } finally {
      authState.loading = false;
    }
  });
  document.getElementById('loginPasswordToggle')?.addEventListener('click', () => {
    const input = document.getElementById('loginPassword');
    const icon = document.querySelector('#loginPasswordToggle i');
    if (!input || !icon) return;
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    icon.classList.toggle('bx-show', !isHidden);
    icon.classList.toggle('bx-hide', isHidden);
    document.getElementById('loginPasswordToggle')?.setAttribute('aria-label', isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña');
  });
  document.getElementById('logoutButton')?.addEventListener('click', () => handleLogout(false));
  document.getElementById('openAdminPanel')?.addEventListener('click', async (event) => {
    event.preventDefault();
    if (!authState.session || authState.session.role !== 'Administrador') {
      showToast('Solo administradores pueden acceder a este panel.', 'warning');
      return;
    }
    const modal = document.getElementById('adminPanelModal');
    toggleModal(modal, true);
    activateAdminTab('overview');
    try {
      await refreshAdminPanel();
      await refreshAdminConnectedUsers();
      startAdminPresenceStream();
    } catch (error) {
      console.error('No se pudo cargar el panel de administración:', error);
      showToast('No se pudo cargar la lista de usuarios.', 'error');
    }
  });
  document.getElementById('adminPanelClose')?.addEventListener('click', () => {
    toggleModal(document.getElementById('adminPanelModal'), false);
    stopAdminPresenceStream();
  });
  document.getElementById('adminTabs')?.addEventListener('click', (event) => {
    const tab = event.target.closest('.admin-tab');
    if (!tab) return;
    activateAdminTab(tab.dataset.adminTab);
  });
  document.getElementById('adminRefreshList')?.addEventListener('click', async () => {
    await refreshAdminPanel(adminState.selectedUid);
    await refreshAdminConnectedUsers();
  });
  document.getElementById('adminRefreshConnected')?.addEventListener('click', async () => {
    await refreshAdminConnectedUsers();
  });
  document.getElementById('adminForceLogoutAll')?.addEventListener('click', handleAdminForceLogoutAll);
  document.getElementById('adminRefreshUserData')?.addEventListener('click', async () => {
    await renderAdminDetail(adminState.selectedUid, { forceData: true });
  });
  document.getElementById('adminUserList')?.addEventListener('click', handleAdminListAction);
  document.getElementById('adminConnectedList')?.addEventListener('click', handleAdminConnectedAction);
  document.getElementById('adminEditForm')?.addEventListener('submit', handleAdminEditSubmit);
  document.getElementById('adminCreateForm')?.addEventListener('submit', handleAdminCreateSubmit);
  document.getElementById('adminDeleteUser')?.addEventListener('click', handleAdminDeleteUser);
  document.getElementById('openPasswordModal')?.addEventListener('click', () => {
    resetPasswordForm();
    toggleModal(document.getElementById('passwordModal'), true);
    document.getElementById('settingsPanel')?.classList.remove('open');
  });
  document.getElementById('passwordModalClose')?.addEventListener('click', () => {
    toggleModal(document.getElementById('passwordModal'), false);
  });
  document.getElementById('passwordCancel')?.addEventListener('click', () => {
    toggleModal(document.getElementById('passwordModal'), false);
  });
  document.getElementById('passwordForm')?.addEventListener('submit', handlePasswordChangeSubmit);
}
