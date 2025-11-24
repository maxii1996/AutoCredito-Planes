const defaultTemplates = {
  "Mensaje de inicio": `Buenas tardes {{cliente}} mi nombre es {{asesor}} me contacto desde Chevrolet Argentina para consultarte si al día de la fecha seguís teniendo la {{modeloActual}} que retiraste en uno de nuestros concesionarios en el año {{anioCompra}}?\n\nAnte la gran cantidad de unidades fabricadas en este 2025, Chevrolet lanzó la campaña de renovación de unidades exclusivamente para sus clientes y con cupos limitados con valores directo de Fábrica.\n\nEn caso de ser número equivocado o no ser la persona indicada, te pido disculpas y solicitamos que nos lo hagas saber para no enviarte más mensajes. Muchas gracias.\n{{asesor}}`,
  "Primera respuesta": `Buen día y gracias por tu respuesta {{cliente}}, te comento que Chevrolet lanzó la CAMPAÑA DE RENOVACIÓN DE UNIDADES para los meses de septiembre y octubre de 2025 solo para clientes de la marca. Se te toma como prioridad y podrás entregar tu vehículo usado como parte de pago y, a modo de canje, retirar un 0km (unidades seleccionadas), mientras que la diferencia la podrás financiar en cuotas en pesos y sin interés.\n\nSi te interesa entregar tu {{modeloUsado}}, decime y coordinamos un horario para llamarte o seguir por este medio. Muchas gracias.\n{{asesor}}`,
  "Beneficios de la marca": `Beneficios para clientes de la marca\n* Financiación en cuotas en pesos y sin interés.\n* Cuotas precancelables.\n* Financia Fábrica, sin bancos de por medio.\n* Entrega sin sorteo ni licitación.\n* Color de la unidad a elección.\n* Sistema llave por llave: entrega tu usado al momento de retiro de la unidad.\n* Gastos de retiro a costo de fábrica.\n* Descuentos en el seguro del automotor.`,
  "Solicitud de fotos y datos": `Para avanzar con la cotización necesito: \nA) ¿Cuántos kilómetros tiene?\nB) ¿Se realizaron los service en concesionario o taller oficial?\nC) En una escala de 1 a 10 (donde 1 es malo y 10 es excelente) ¿en qué estado se encuentra la unidad?\nD) ¿La unidad tuvo algún choque o reparación?\nE) ¿El vehículo tiene alguna deuda actualmente?\n\nEstimado cliente, recuerde enviar a su asesor de ventas 10 imágenes/fotos del usado para validar la cotización (ver guía adjunta).`,
  "InfoAuto cotización": `INFORME COTIZACIÓN\nMarca: Chevrolet\nModelo: {{modeloUsado}}\nAño: {{anioModeloUsado}}\nVersión: {{versionUsada}}\nMotor: {{motorUsado}}\nCantidad de puertas: {{puertas}}\nCantidad de km: {{kilometros}}\n\nCOTIZADO EN UN VALOR EN EFECTIVO DE ${{valorEfectivo}} PESOS ARG.\n\nESTIMADO CLIENTE RECUERDE ENVIAR A SU ASESOR DE VENTAS 10 IMÁGENES/FOTO DEL USADO PARA VALIDAR LA COTIZACIÓN.\nINFOAUTO Guía oficial de Precios, Noviembre 2025.`
};

const vehicles = [
  {
    id: 'onix-hatch',
    modelo: 'Nuevo Onix 1.0 Turbo LT MT',
    precio: 30430900,
    planBase: '80/20 (120 cuotas)',
    cuotas: {
      '2_12': 320051,
      '13_21': 313692,
      '22_84': 312912,
      '85_120': 311352,
      pura: 202873,
      integracion: 9129270
    }
  },
  {
    id: 'onix-plus',
    modelo: 'Onix Plus Sedan 1.0 Turbo LT MT',
    precio: 30430900,
    planBase: '100% (120 cuotas)',
    cuotas: {
      '2_12': 326758,
      '13_21': 370922,
      '22_84': 369046,
      '85_120': 368971,
      pura: 253591,
      integracion: 9129270
    }
  },
  {
    id: 'montana-lt',
    modelo: 'Nueva Montana LT 1.2 AT 4x2',
    precio: 37808900,
    planBase: '80/20 (120 cuotas)',
    cuotas: {
      '2_12': 397648,
      '13_21': 389747,
      '22_84': 388584,
      pura: 252059,
      integracion: 11342670
    }
  },
  {
    id: 's10-cd',
    modelo: 'Nueva S10 CD 2.8 TD LT 4x4 MT',
    precio: 48596900,
    planBase: '60/40 (84 cuotas)',
    cuotas: {
      '2_12': 537310,
      '13_21': 527066,
      '22_84': 525464,
      pura: 347121,
      integracion: 19438760
    }
  },
  {
    id: 'tracker',
    modelo: 'Nueva Tracker 1.2 AT LT',
    precio: 37823900,
    planBase: '80/20 (120 cuotas)',
    cuotas: {
      '2_12': 397806,
      '13_21': 389902,
      '22_84': 388156,
      pura: 252159,
      integracion: 11347170
    }
  },
  {
    id: 'spin',
    modelo: 'Nueva Spin 1.8 LTZ 5A/5MT',
    precio: 35116900,
    planBase: '70/30 (84 cuotas)',
    cuotas: {
      '2_12': 435603,
      '13_21': 428039,
      '22_84': 426914,
      pura: 292641,
      integracion: 10535070
    }
  }
];

const state = {
  templates: { ...defaultTemplates },
  variables: {
    cliente: 'Cliente Chevrolet',
    asesor: 'Damian Barovero',
    modeloActual: 'SPIN 1.8 N 7P P PREMIER M/T',
    anioCompra: '2020',
    modeloUsado: 'CHEVROLET CRUZE 5P 1.4 TURBO LTZ MT 2018',
    anioModeloUsado: '2018',
    versionUsada: 'LTZ MT',
    motorUsado: '1.4 Turbo',
    puertas: '5',
    kilometros: '110.000km',
    valorEfectivo: '23.650.000'
  },
  priceOverrides: {}
};

const templateSelect = document.getElementById('templateSelect');
const templateBody = document.getElementById('templateBody');
const templatePreview = document.getElementById('templatePreview');
const variableList = document.getElementById('variableList');
const customTemplateName = document.getElementById('customTemplateName');
const customTemplateBody = document.getElementById('customTemplateBody');

const clienteNombre = document.getElementById('clienteNombre');
const clienteTelefono = document.getElementById('clienteTelefono');
const clienteModelo = document.getElementById('clienteModelo');
const clienteAnio = document.getElementById('clienteAnio');
const asesorNombre = document.getElementById('asesorNombre');
const campaniaVigente = document.getElementById('campaniaVigente');
const llaveLlave = document.getElementById('llaveLlave');
const entregaUsado = document.getElementById('entregaUsado');
const prioridadCliente = document.getElementById('prioridadCliente');
const planModelo = document.getElementById('planModelo');
const planTipo = document.getElementById('planTipo');
const ajustePrecio = document.getElementById('ajustePrecio');
const entregaMes = document.getElementById('entregaMes');
const bonificacion = document.getElementById('bonificacion');
const observacionesPlan = document.getElementById('observacionesPlan');
const planSummary = document.getElementById('planSummary');
const vehiculoTabla = document.querySelector('#vehiculoTabla tbody');
const buscador = document.getElementById('buscador');
const statusChip = document.getElementById('statusChip');

const profileInput = document.getElementById('profileInput');
const saveProfileBtn = document.getElementById('saveProfileBtn');
const loadProfileBtn = document.getElementById('loadProfileBtn');

function currency(value) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value);
}

function renderTemplateOptions() {
  templateSelect.innerHTML = '';
  Object.keys(state.templates).forEach((name) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    templateSelect.appendChild(option);
  });
  templateSelect.value = Object.keys(state.templates)[0];
  loadTemplate(templateSelect.value);
}

function loadTemplate(name) {
  templateBody.value = state.templates[name];
  applyPreview();
}

function renderVariables() {
  variableList.innerHTML = '';
  Object.entries(state.variables).forEach(([key, value]) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'variable-chip';
    const label = document.createElement('span');
    label.textContent = `{{${key}}}`;
    const input = document.createElement('input');
    input.value = value;
    input.addEventListener('input', (e) => {
      state.variables[key] = e.target.value;
      syncFormWithVariables();
    });
    wrapper.appendChild(label);
    wrapper.appendChild(input);
    variableList.appendChild(wrapper);
  });
}

function applyVariablesToText(text) {
  return text.replace(/{{(.*?)}}/g, (_, key) => state.variables[key.trim()] ?? `{{${key.trim()}}}`);
}

function applyPreview() {
  templatePreview.textContent = applyVariablesToText(templateBody.value);
}

function addVariable() {
  const name = document.getElementById('newVarName').value.trim();
  const value = document.getElementById('newVarValue').value.trim();
  if (!name) return;
  state.variables[name] = value;
  document.getElementById('newVarName').value = '';
  document.getElementById('newVarValue').value = '';
  renderVariables();
  applyPreview();
}

function addTemplate() {
  const name = customTemplateName.value.trim();
  const body = customTemplateBody.value.trim();
  if (!name || !body) return;
  state.templates[name] = body;
  customTemplateName.value = '';
  customTemplateBody.value = '';
  renderTemplateOptions();
  templateSelect.value = name;
  loadTemplate(name);
}

function resetTemplates() {
  state.templates = { ...defaultTemplates };
  renderTemplateOptions();
}

function copyTemplate() {
  const text = templatePreview.textContent;
  navigator.clipboard.writeText(text).then(() => {
    statusChip.textContent = 'Mensaje copiado';
    setTimeout(() => (statusChip.textContent = 'Perfil local'), 1500);
  }).catch(() => {
    alert('No se pudo copiar el mensaje.');
  });
}

function syncVariablesFromForm() {
  state.variables.cliente = clienteNombre.value || 'Cliente Chevrolet';
  state.variables.modeloActual = clienteModelo.value || state.variables.modeloActual;
  state.variables.anioCompra = clienteAnio.value || state.variables.anioCompra;
  state.variables.asesor = asesorNombre.value || state.variables.asesor;
  applyPreview();
  renderVariables();
}

function syncFormWithVariables() {
  if (!clienteNombre.value) clienteNombre.value = state.variables.cliente;
  if (!clienteModelo.value) clienteModelo.value = state.variables.modeloActual;
  if (!clienteAnio.value) clienteAnio.value = state.variables.anioCompra;
  if (!asesorNombre.value) asesorNombre.value = state.variables.asesor;
  applyPreview();
}

function renderPlanOptions() {
  planModelo.innerHTML = '';
  vehicles.forEach((v) => {
    const option = document.createElement('option');
    option.value = v.id;
    option.textContent = v.modelo;
    planModelo.appendChild(option);
  });
}

function calculatePlan() {
  const selected = vehicles.find((v) => v.id === planModelo.value) || vehicles[0];
  const overridePrice = parseFloat(ajustePrecio.value) || state.priceOverrides[selected.id] || selected.precio;
  const appliedPrice = overridePrice > 0 ? overridePrice : selected.precio;
  const bonus = parseFloat(bonificacion.value) || 0;
  const effectivePrice = Math.max(appliedPrice - bonus, 0);
  const cuotas = selected.cuotas['22_84'];
  const cuotaPura = selected.cuotas.pura;

  const anticipos = {
    '80_20': effectivePrice * 0.2,
    '100': 0,
    '60_40': effectivePrice * 0.4,
    '70_30': effectivePrice * 0.3
  };
  const anticipo = anticipos[planTipo.value] ?? 0;
  const llaveLlaveTxt = llaveLlave.checked ? 'Sí (entrega y retiro simultáneo)' : 'No';
  const entregaUsadoTxt = entregaUsado.checked ? 'Usado como parte de pago' : 'Sin usado declarado';

  planSummary.innerHTML = `
    <h3>${selected.modelo}</h3>
    <div class="summary-grid">
      <div class="summary-tile"><span>Precio de lista</span><strong>${currency(selected.precio)}</strong></div>
      <div class="summary-tile"><span>Precio aplicado</span><strong>${currency(effectivePrice)}</strong></div>
      <div class="summary-tile"><span>Plan</span><strong>${planTipo.options[planTipo.selectedIndex].text}</strong></div>
      <div class="summary-tile"><span>Cuota sugerida (22-84)</span><strong>${currency(cuotas)}</strong></div>
      <div class="summary-tile"><span>Cuota pura</span><strong>${currency(cuotaPura)}</strong></div>
      <div class="summary-tile"><span>Integración estimada</span><strong>${currency(selected.cuotas.integracion)}</strong></div>
      <div class="summary-tile"><span>Anticipo estimado</span><strong>${currency(anticipo)}</strong></div>
      <div class="summary-tile"><span>Entrega</span><strong>${entregaMes.value}</strong></div>
      <div class="summary-tile"><span>Llave por llave</span><strong>${llaveLlaveTxt}</strong></div>
      <div class="summary-tile"><span>Canje de usado</span><strong>${entregaUsadoTxt}</strong></div>
      <div class="summary-tile"><span>Notas</span><strong>${observacionesPlan.value || 'Sin notas adicionales'}</strong></div>
    </div>
  `;
}

function renderVehicleTable(filter = '') {
  vehiculoTabla.innerHTML = '';
  vehicles.filter((v) => v.modelo.toLowerCase().includes(filter.toLowerCase()) || v.planBase.toLowerCase().includes(filter.toLowerCase()))
    .forEach((v) => {
      const row = document.createElement('tr');
      const price = state.priceOverrides[v.id] ?? v.precio;
      row.innerHTML = `
        <td>${v.modelo}</td>
        <td>${currency(price)}</td>
        <td>${v.planBase}</td>
        <td>${v.cuotas['22_84'] ? currency(v.cuotas['22_84']) : 'N/D'}</td>
        <td>${currency(v.cuotas.pura)}</td>
        <td>${currency(v.cuotas.integracion)}</td>
        <td><input class="price-input" type="number" value="${price}" data-id="${v.id}" /></td>
      `;
      vehiculoTabla.appendChild(row);
    });

  vehiculoTabla.querySelectorAll('input.price-input').forEach((input) => {
    input.addEventListener('input', (e) => {
      const id = e.target.dataset.id;
      const val = parseFloat(e.target.value);
      state.priceOverrides[id] = val;
      calculatePlan();
    });
  });
}

function saveProfile() {
  const profile = {
    variables: state.variables,
    templates: state.templates,
    priceOverrides: state.priceOverrides,
    cliente: {
      nombre: clienteNombre.value,
      telefono: clienteTelefono.value,
      modelo: clienteModelo.value,
      anio: clienteAnio.value,
      asesor: asesorNombre.value,
      campania: campaniaVigente.value,
      llaveLlave: llaveLlave.checked,
      entregaUsado: entregaUsado.checked,
      prioridadCliente: prioridadCliente.checked
    }
  };
  const blob = new Blob([JSON.stringify(profile, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'chevrolet-plan-perfil.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function loadProfile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      state.variables = data.variables || state.variables;
      state.templates = data.templates || state.templates;
      state.priceOverrides = data.priceOverrides || {};
      if (data.cliente) {
        clienteNombre.value = data.cliente.nombre || '';
        clienteTelefono.value = data.cliente.telefono || '';
        clienteModelo.value = data.cliente.modelo || '';
        clienteAnio.value = data.cliente.anio || '';
        asesorNombre.value = data.cliente.asesor || '';
        campaniaVigente.value = data.cliente.campania || '';
        llaveLlave.checked = Boolean(data.cliente.llaveLlave);
        entregaUsado.checked = Boolean(data.cliente.entregaUsado);
        prioridadCliente.checked = Boolean(data.cliente.prioridadCliente);
      }
      statusChip.textContent = 'Perfil importado';
      setTimeout(() => (statusChip.textContent = 'Perfil local'), 2000);
      renderTemplateOptions();
      renderVariables();
      renderVehicleTable(buscador.value || '');
      calculatePlan();
    } catch (err) {
      alert('Perfil inválido');
    }
  };
  reader.readAsText(file);
}

function bindEvents() {
  templateSelect.addEventListener('change', (e) => loadTemplate(e.target.value));
  document.getElementById('addVariable').addEventListener('click', addVariable);
  document.getElementById('addTemplate').addEventListener('click', addTemplate);
  document.getElementById('resetTemplates').addEventListener('click', resetTemplates);
  document.getElementById('copyTemplate').addEventListener('click', copyTemplate);
  document.getElementById('applyVariables').addEventListener('click', applyPreview);
  templateBody.addEventListener('input', applyPreview);
  [clienteNombre, clienteModelo, clienteAnio, asesorNombre].forEach((input) => {
    input.addEventListener('input', syncVariablesFromForm);
  });
  [planModelo, planTipo, ajustePrecio, entregaMes, bonificacion, observacionesPlan, llaveLlave, entregaUsado, prioridadCliente].forEach((el) => {
    el.addEventListener('input', calculatePlan);
    el.addEventListener('change', calculatePlan);
  });
  buscador.addEventListener('input', (e) => renderVehicleTable(e.target.value));
  document.getElementById('recalcular').addEventListener('click', calculatePlan);
  saveProfileBtn.addEventListener('click', saveProfile);
  loadProfileBtn.addEventListener('click', () => profileInput.click());
  profileInput.addEventListener('change', (e) => {
    if (e.target.files.length) loadProfile(e.target.files[0]);
  });
}

function init() {
  renderTemplateOptions();
  renderVariables();
  renderPlanOptions();
  renderVehicleTable('');
  syncVariablesFromForm();
  calculatePlan();
}

bindEvents();
init();
