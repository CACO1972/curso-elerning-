/**
 * ImplantX™ - Clinical Prediction Application
 * Main application logic
 */

// ==========================================
// APPLICATION STATE
// ==========================================

const AppState = {
  totalSteps: 7, // Steps 0-6
  currentStep: 0,
  data: {
    name: "",
    age: "",
    gender: "",
    smoking: "no",
    bruxism: "no",
    bruxismTx: "no",
    diabetes: "no",
    diabetesControl: "",
    lossCause: "caries",
    gumsBleed: "no",
    hygienePerDay: "2",
    selectedTeeth: [],
  },
  results: {
    implantx: { score: 0, band: "" },
    density: { score: 0, band: "" },
  },
};

// ==========================================
// STEP METADATA
// ==========================================

const STEP_META = [
  {
    title: "Datos básicos",
    subtitle: "Ingresa tu nombre, edad y género.",
    rio: "Empezaremos con tus datos básicos para personalizar el informe.",
  },
  {
    title: "Tabaquismo",
    subtitle: "Selecciona tu nivel actual de consumo de cigarrillos.",
    rio: "El tabaco es uno de los factores más relevantes para la osteointegración.",
  },
  {
    title: "Bruxismo",
    subtitle: "Indica si aprietas o rechinas los dientes y si estás en tratamiento.",
    rio: "El bruxismo aumenta la carga sobre los implantes. Saber si usas férula ayuda a estimar mejor el riesgo.",
  },
  {
    title: "Diabetes",
    subtitle: "Indica si tienes diabetes y cómo está tu control.",
    rio: "El control metabólico es clave para la cicatrización y la respuesta frente a infecciones.",
  },
  {
    title: "Causa, encías e higiene",
    subtitle:
      "Selecciona la causa de tu pérdida dental, el estado de tus encías y tu higiene diaria.",
    rio: "La historia periodontal y la higiene diaria son determinantes para la salud periimplantaria.",
  },
  {
    title: "Piezas a reemplazar",
    subtitle: "Marca las piezas que necesitas reemplazar (vista espejo).",
    rio: "Cuantas más zonas rehabilitadas, mayor la complejidad y la planificación necesaria.",
  },
  {
    title: "Resumen y cálculo",
    subtitle: "Revisa tus datos. Luego calcularemos tu resultado orientativo.",
    rio: "Ahora combinaré toda tu información para estimar el éxito esperado y los puntos a reforzar.",
  },
];

// ==========================================
// DOM ELEMENTS CACHE
// ==========================================

const DOM = {
  // Step UI
  stepTitle: null,
  stepSubtitle: null,
  progressBar: null,
  progressLabel: null,
  rioSideMsg: null,

  // Basic data inputs
  nameInput: null,
  ageInput: null,
  genderSelect: null,
  densityHint: null,

  // Other inputs
  lossCauseSelect: null,
  gumsBleedSelect: null,
  hygieneSelect: null,

  // Conditional sections
  bruxTxRow: null,
  dmControlRow: null,

  // Teeth grid
  teethGrid: null,

  // Summary & Results
  summaryBox: null,
  resultsBlock: null,
  btnCalc: null,

  // Navigation
  btnPrev: null,
  btnNext: null,

  // Río Chat
  rioChatSection: null,
  btnRioExplain: null,
  rioLoading: null,
  rioMessage: null,
};

// ==========================================
// INITIALIZATION
// ==========================================

function initializeApp() {
  cacheDOMElements();
  setupEventListeners();
  setupPillGroups();
  initializeTeethGrid();
  updateStepUI();
}

function cacheDOMElements() {
  // Step UI
  DOM.stepTitle = document.getElementById("step-title");
  DOM.stepSubtitle = document.getElementById("step-subtitle");
  DOM.progressBar = document.getElementById("progress-bar");
  DOM.progressLabel = document.getElementById("progress-label");
  DOM.rioSideMsg = document.getElementById("rio-side-msg");

  // Basic data inputs
  DOM.nameInput = document.getElementById("name");
  DOM.ageInput = document.getElementById("age");
  DOM.genderSelect = document.getElementById("gender");
  DOM.densityHint = document.getElementById("density-hint");

  // Other inputs
  DOM.lossCauseSelect = document.getElementById("lossCause");
  DOM.gumsBleedSelect = document.getElementById("gumsBleed");
  DOM.hygieneSelect = document.getElementById("hygienePerDay");

  // Conditional sections
  DOM.bruxTxRow = document.getElementById("brux-tx-row");
  DOM.dmControlRow = document.getElementById("dm-control-row");

  // Teeth grid
  DOM.teethGrid = document.getElementById("teeth-grid");

  // Summary & Results
  DOM.summaryBox = document.getElementById("summary-box");
  DOM.resultsBlock = document.getElementById("results-block");
  DOM.btnCalc = document.getElementById("btn-calc");

  // Navigation
  DOM.btnPrev = document.getElementById("btn-prev");
  DOM.btnNext = document.getElementById("btn-next");

  // Río Chat
  DOM.rioChatSection = document.getElementById("rio-chat-section");
  DOM.btnRioExplain = document.getElementById("btn-rio-explain");
  DOM.rioLoading = document.getElementById("rio-loading");
  DOM.rioMessage = document.getElementById("rio-message");
}

function setupEventListeners() {
  // Navigation
  DOM.btnPrev.addEventListener("click", handlePrevStep);
  DOM.btnNext.addEventListener("click", handleNextStep);

  // Basic data inputs
  DOM.nameInput.addEventListener("input", updateDensityHint);
  DOM.ageInput.addEventListener("input", updateDensityHint);
  DOM.genderSelect.addEventListener("change", updateDensityHint);

  // Other inputs
  DOM.lossCauseSelect.addEventListener("change", (e) => {
    AppState.data.lossCause = e.target.value;
  });
  DOM.gumsBleedSelect.addEventListener("change", (e) => {
    AppState.data.gumsBleed = e.target.value;
  });
  DOM.hygieneSelect.addEventListener("change", (e) => {
    AppState.data.hygienePerDay = e.target.value;
  });

  // Calculate button
  DOM.btnCalc.addEventListener("click", calculateResults);

  // Río explain button
  DOM.btnRioExplain.addEventListener("click", handleRioExplanation);
}

// ==========================================
// STEP NAVIGATION
// ==========================================

function handlePrevStep() {
  if (AppState.currentStep > 0) {
    AppState.currentStep--;
    updateStepUI();
  }
}

function handleNextStep() {
  if (AppState.currentStep < AppState.totalSteps - 1) {
    AppState.currentStep++;
    updateStepUI();
  }
}

function updateStepUI() {
  // Hide/show steps
  document.querySelectorAll(".step").forEach((el) => {
    const stepNum = Number(el.dataset.step);
    el.classList.toggle("hidden", stepNum !== AppState.currentStep);
  });

  // Update step metadata
  const meta = STEP_META[AppState.currentStep];
  DOM.stepTitle.textContent = meta.title;
  DOM.stepSubtitle.textContent = meta.subtitle;
  DOM.rioSideMsg.textContent = meta.rio;

  // Update progress bar
  const progress = Math.round(
    ((AppState.currentStep + 1) / AppState.totalSteps) * 100
  );
  DOM.progressBar.style.width = progress + "%";
  DOM.progressLabel.textContent = progress + "%";

  // Update navigation buttons
  DOM.btnPrev.disabled = AppState.currentStep === 0;
  DOM.btnNext.textContent =
    AppState.currentStep === AppState.totalSteps - 1
      ? "Ver resumen"
      : "Siguiente →";

  // Fill summary if on last step
  if (AppState.currentStep === 6) {
    fillSummaryBox();
  }
}

// ==========================================
// BASIC DATA & DENSITY HINT
// ==========================================

function updateDensityHint() {
  AppState.data.name = DOM.nameInput.value.trim();
  AppState.data.age = DOM.ageInput.value;
  AppState.data.gender = DOM.genderSelect.value;

  const age = parseInt(AppState.data.age || "0", 10);

  if (AppState.data.gender === "f" && age > 45) {
    DOM.densityHint.textContent =
      "Detectamos que eres mujer y tienes más de 45 años: aplicaremos un módulo simple de riesgo óseo (DensityPro™).";
    DOM.densityHint.className = "hint-box warning";
  } else {
    DOM.densityHint.textContent =
      "Completa tu edad y género para saber si aplicaremos una evaluación ósea simple (DensityPro™).";
    DOM.densityHint.className = "hint-box";
  }
}

// ==========================================
// PILL GROUPS
// ==========================================

function setupPillGroups() {
  // Smoking
  setupPillGroup(".smoking-pill", "smoking");

  // Bruxism
  setupPillGroup(".brux-pill", "bruxism", (value) => {
    DOM.bruxTxRow.classList.toggle("hidden", value !== "yes");
    if (value !== "yes") AppState.data.bruxismTx = "no";
  });
  setupPillGroup(".bruxtx-pill", "bruxismTx");

  // Diabetes
  setupPillGroup(".dm-pill", "diabetes", (value) => {
    DOM.dmControlRow.classList.toggle("hidden", value !== "yes");
    if (value !== "yes") AppState.data.diabetesControl = "";
  });
  setupPillGroup(".dmctl-pill", "diabetesControl");
}

function setupPillGroup(selector, field, onSelect) {
  document.querySelectorAll(selector).forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.dataset.value;
      AppState.data[field] = value;

      // Update UI
      document.querySelectorAll(selector).forEach((b) => {
        b.classList.remove("selected");
      });
      btn.classList.add("selected");

      // Call optional callback
      if (onSelect) onSelect(value);
    });
  });
}

// ==========================================
// TEETH GRID
// ==========================================

function initializeTeethGrid() {
  const teeth = Array.from({ length: 32 }, (_, i) => i + 1);

  teeth.forEach((toothNum) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = toothNum;
    btn.className = "tooth-btn";
    btn.dataset.tooth = String(toothNum);
    btn.title = "Pieza " + toothNum;
    btn.setAttribute("aria-label", `Pieza dental ${toothNum}`);
    btn.setAttribute("aria-pressed", "false");

    btn.addEventListener("click", () => toggleTooth(toothNum, btn));

    DOM.teethGrid.appendChild(btn);
  });
}

function toggleTooth(toothNum, btn) {
  const index = AppState.data.selectedTeeth.indexOf(toothNum);

  if (index === -1) {
    // Add tooth
    AppState.data.selectedTeeth.push(toothNum);
    AppState.data.selectedTeeth.sort((a, b) => a - b);
    btn.classList.add("tooth-selected");
    btn.setAttribute("aria-pressed", "true");
  } else {
    // Remove tooth
    AppState.data.selectedTeeth.splice(index, 1);
    btn.classList.remove("tooth-selected");
    btn.setAttribute("aria-pressed", "false");
  }
}

// ==========================================
// SUMMARY BOX
// ==========================================

function fillSummaryBox() {
  // Update state from inputs
  AppState.data.name = DOM.nameInput.value.trim();
  AppState.data.age = DOM.ageInput.value;
  AppState.data.gender = DOM.genderSelect.value;

  const summaryHTML = `
    <p><strong>Nombre:</strong> ${AppState.data.name || "—"} ·
       <strong>Edad:</strong> ${AppState.data.age || "—"} ·
       <strong>Género:</strong> ${formatGender(AppState.data.gender)}</p>
    <p><strong>Tabaquismo:</strong> ${formatSmoking(AppState.data.smoking)}</p>
    <p><strong>Bruxismo:</strong> ${formatBruxism(
      AppState.data.bruxism,
      AppState.data.bruxismTx
    )}</p>
    <p><strong>Diabetes:</strong> ${formatDiabetes(
      AppState.data.diabetes,
      AppState.data.diabetesControl
    )}</p>
    <p><strong>Causa pérdida:</strong> ${formatLossCause(
      AppState.data.lossCause
    )} ·
       <strong>Encías:</strong> ${formatBleeding(AppState.data.gumsBleed)} ·
       <strong>Higiene/día:</strong> ${AppState.data.hygienePerDay}</p>
    <p><strong>Piezas seleccionadas:</strong> ${
      AppState.data.selectedTeeth.length
        ? AppState.data.selectedTeeth.join(", ")
        : "—"
    }</p>
  `;

  DOM.summaryBox.innerHTML = summaryHTML;
}

// Formatting helpers
function formatGender(g) {
  const map = { f: "Mujer", m: "Hombre", o: "Otro" };
  return map[g] || "—";
}

function formatSmoking(s) {
  const map = {
    no: "No fuma",
    "<10": "<10 cig/día",
    "10-20": "10–20 cig/día",
    ">20": ">20 cig/día",
  };
  return map[s] || "—";
}

function formatBruxism(brux, tx) {
  if (brux === "yes") {
    return tx === "yes" ? "Sí (tratado)" : "Sí (sin tratamiento)";
  }
  return "No";
}

function formatDiabetes(dm, control) {
  if (dm === "yes") {
    const controlText =
      control === "controlled"
        ? "(controlada)"
        : control === "uncontrolled"
        ? "(no controlada)"
        : "";
    return "Sí " + controlText;
  }
  return "No";
}

function formatLossCause(cause) {
  const map = {
    caries: "Caries",
    periodontitis: "Periodontitis",
    trauma: "Trauma",
    otra: "Otra",
  };
  return map[cause] || "—";
}

function formatBleeding(bleed) {
  const map = {
    no: "No",
    sometimes: "A veces",
    often: "Frecuente",
  };
  return map[bleed] || "—";
}

// ==========================================
// RISK CALCULATION
// ==========================================

function computeImplantXRisk(data) {
  let base = 92;

  // Smoking impact
  if (data.smoking === "<10") base -= 4;
  else if (data.smoking === "10-20") base -= 8;
  else if (data.smoking === ">20") base -= 12;

  // Bruxism impact
  if (data.bruxism === "yes") {
    base -= data.bruxismTx === "yes" ? 3 : 7;
  }

  // Diabetes impact
  if (data.diabetes === "yes") {
    base -= data.diabetesControl === "controlled" ? 2 : 8;
  }

  // Synergy: uncontrolled diabetes + smoking
  if (
    data.diabetes === "yes" &&
    data.diabetesControl === "uncontrolled" &&
    data.smoking !== "no"
  ) {
    base -= 6;
  }

  // Loss cause impact
  if (data.lossCause === "periodontitis") base -= 6;
  else if (data.lossCause === "caries") base -= 2;

  // Gums bleeding
  if (data.gumsBleed === "sometimes") base -= 3;
  else if (data.gumsBleed === "often") base -= 6;

  // Hygiene
  if (data.hygienePerDay === "0") base -= 8;
  else if (data.hygienePerDay === "1") base -= 4;
  else if (data.hygienePerDay === "3") base += 1;

  // Multiple teeth
  if (data.selectedTeeth.length >= 4) base -= 4;
  else if (data.selectedTeeth.length >= 2) base -= 2;

  const score = Math.max(5, Math.min(98, Math.round(base)));
  const band = score >= 85 ? "Alto" : score >= 70 ? "Medio" : "Bajo";

  return { score, band };
}

function computeDensityProRisk(data) {
  // Simplified placeholder - would need actual DensityPro questionnaire
  let risk = 8;

  // If female > 45, increase baseline risk
  const age = parseInt(data.age || "0", 10);
  if (data.gender === "f" && age > 45) {
    risk += 15;
    if (age > 60) risk += 10;
    if (age > 70) risk += 5;
  }

  const score = Math.max(1, Math.min(99, risk));
  const band =
    score >= 45 ? "Alto riesgo" : score >= 25 ? "Riesgo moderado" : "Bajo riesgo";

  return { score, band };
}

// ==========================================
// CALCULATE RESULTS
// ==========================================

function calculateResults() {
  // Update data from inputs
  AppState.data.name = DOM.nameInput.value.trim();
  AppState.data.age = DOM.ageInput.value;
  AppState.data.gender = DOM.genderSelect.value;

  // Compute risks
  AppState.results.implantx = computeImplantXRisk(AppState.data);
  AppState.results.density = computeDensityProRisk(AppState.data);

  // Display results
  displayResults();

  // Show Río chat section
  DOM.rioChatSection.classList.remove("hidden");

  // Update Río message
  DOM.rioSideMsg.textContent =
    "Listo. Ya tienes un resumen objetivo. Ahora puedo explicártelo en lenguaje simple si presionas el botón de abajo.";
}

function displayResults() {
  const { implantx, density } = AppState.results;

  // Update name
  document.getElementById("res-name").textContent =
    AppState.data.name || "Paciente";

  // ImplantX score
  document.getElementById("res-ix-score").textContent = implantx.score + "%";
  document.getElementById("res-ix-band").textContent = implantx.band;

  // DensityPro score
  document.getElementById("res-dp-score").textContent = density.score + "%";
  document.getElementById("res-dp-band").textContent = density.band;

  // Teeth count
  document.getElementById("res-teeth-count").textContent =
    AppState.data.selectedTeeth.length;

  // Factors
  displayFactors();

  // Action plan
  displayActionPlan();

  // Show results block
  DOM.resultsBlock.classList.remove("hidden");
}

// ==========================================
// DISPLAY FACTORS
// ==========================================

function displayFactors() {
  const factorsGrid = document.getElementById("factors-grid");
  const insights = getFactorInsights(AppState.data);

  if (!insights.length) {
    factorsGrid.innerHTML = `
      <div class="rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-900 text-sm">
        No se identifican factores de alto impacto. Aun así, la mantención y la higiene
        serán claves para la estabilidad a largo plazo.
      </div>
    `;
  } else {
    factorsGrid.innerHTML = "";
    insights.forEach((insight) => {
      const card = createFactorCard(insight);
      factorsGrid.appendChild(card);
    });
  }
}

function getFactorInsights(data) {
  const insights = [];

  // Smoking
  if (data.smoking !== "no") {
    const impact =
      data.smoking === ">20" ? "high" : data.smoking === "10-20" ? "moderate" : "low";
    insights.push({
      title: "Tabaquismo",
      impact,
      effect:
        "Disminuye la tasa de éxito por peor cicatrización y mayor riesgo de periimplantitis.",
      causal:
        "La nicotina reduce el flujo sanguíneo y altera la respuesta inflamatoria, dificultando la osteointegración.",
      alternatives: [
        "Suspender tabaco idealmente 4–8 semanas antes de la cirugía.",
        "Apoyo con terapias sustitutivas y acompañamiento médico.",
      ],
    });
  }

  // Bruxism
  if (data.bruxism === "yes") {
    const impact = data.bruxismTx === "no" ? "high" : "moderate";
    insights.push({
      title: "Bruxismo",
      impact,
      effect:
        "Aumenta la sobrecarga oclusal y el riesgo de aflojamiento o falla del implante.",
      causal:
        "Las fuerzas parafuncionales generan micromovimientos y estrés adicional sobre el hueso periimplantario.",
      alternatives: [
        "Indicar férula oclusal rígida antes y después de la rehabilitación.",
        "Ajuste oclusal y control de hábitos nocturnos.",
      ],
    });
  }

  // Diabetes
  if (data.diabetes === "yes") {
    const impact = data.diabetesControl === "uncontrolled" ? "high" : "moderate";
    insights.push({
      title: "Diabetes",
      impact,
      effect:
        "Se asocia a mayor riesgo de infección y retraso en la cicatrización.",
      causal:
        "La hiperglucemia sostenida altera la función inmune y la angiogénesis, elevando el riesgo de complicaciones.",
      alternatives: [
        "Optimizar control metabólico (HbA1c) antes de la cirugía.",
        "Coordinación con el médico tratante y controles periódicos.",
      ],
    });
  }

  // Periodontitis
  if (data.lossCause === "periodontitis") {
    insights.push({
      title: "Antecedente de periodontitis",
      impact: "moderate",
      effect:
        "Aumenta el riesgo de mucositis y periimplantitis a largo plazo.",
      causal:
        "La historia de enfermedad periodontal indica susceptibilidad individual a inflamación crónica y disbiosis.",
      alternatives: [
        "Fase periodontal previa con reducción de inflamación.",
        "Programa de mantención periódica y control de placa.",
      ],
    });
  }

  // Gum bleeding
  if (data.gumsBleed !== "no") {
    const impact = data.gumsBleed === "often" ? "moderate" : "low";
    insights.push({
      title: "Sangrado gingival",
      impact,
      effect: "Indica inflamación activa que puede perjudicar el pronóstico.",
      causal:
        "El sangrado refleja carga bacteriana elevada y respuesta inflamatoria en tejidos blandos.",
      alternatives: [
        "Profilaxis profesional antes del tratamiento.",
        "Refuerzo de técnicas de cepillado y uso de seda / cepillos interproximales.",
      ],
    });
  }

  // Poor hygiene
  if (data.hygienePerDay === "0" || data.hygienePerDay === "1") {
    const impact = data.hygienePerDay === "0" ? "high" : "moderate";
    insights.push({
      title: "Higiene deficiente",
      impact,
      effect:
        "Mayor riesgo de periimplantitis por biopelícula persistente.",
      causal:
        "La placa bacteriana no controlada mantiene inflamación crónica y pérdida ósea progresiva.",
      alternatives: [
        "Aumentar a 2–3 cepillados diarios con técnica adecuada.",
        "Uso de seda, cepillos interproximales y enjuagues indicados.",
      ],
    });
  }

  // Multiple teeth
  if (data.selectedTeeth.length >= 2) {
    const impact = data.selectedTeeth.length >= 4 ? "moderate" : "low";
    insights.push({
      title: "Múltiples zonas a rehabilitar",
      impact,
      effect: "Incrementa la complejidad quirúrgica y protésica del caso.",
      causal:
        "Casos extensos requieren planificación más detallada de oclusión, distribución de cargas y volumen óseo.",
      alternatives: [
        "Planificación guiada por imágenes y/o cirugía guiada.",
        "Evaluación de necesidad de injertos o regeneración ósea.",
      ],
    });
  }

  // Synergy: diabetes + smoking
  if (
    data.diabetes === "yes" &&
    data.diabetesControl === "uncontrolled" &&
    data.smoking !== "no"
  ) {
    insights.push({
      title: "Sinergia: diabetes no controlada + tabaquismo",
      impact: "high",
      effect:
        "El riesgo combinado es mayor que la suma de ambos por separado.",
      causal:
        "La hiperglucemia altera la microcirculación y la nicotina produce vasoconstricción, reduciendo aún más la perfusión.",
      alternatives: [
        "Mejorar control metabólico y suspender tabaco antes de la cirugía.",
      ],
    });
  }

  return insights;
}

function createFactorCard(insight) {
  const card = document.createElement("div");
  card.className = "factor-card";

  const impactClass = insight.impact;
  const impactLabel =
    impactClass === "high"
      ? "Alto"
      : impactClass === "moderate"
      ? "Moderado"
      : "Bajo";

  let html = `
    <div class="factor-header">
      <h5 class="factor-title">${insight.title}</h5>
      <span class="factor-impact ${impactClass}">${impactLabel}</span>
    </div>
    <p class="factor-text"><strong>Efecto:</strong> ${insight.effect}</p>
    <p class="factor-text"><strong>Explicación causal:</strong> ${insight.causal}</p>
  `;

  if (insight.alternatives && insight.alternatives.length > 0) {
    html += `
      <div class="factor-alternatives">
        <p class="alternatives-title">Alternativas sugeridas</p>
        <ul class="alternatives-list">
          ${insight.alternatives.map((alt) => `<li>${alt}</li>`).join("")}
        </ul>
      </div>
    `;
  }

  card.innerHTML = html;
  return card;
}

// ==========================================
// DISPLAY ACTION PLAN
// ==========================================

function displayActionPlan() {
  const planList = document.getElementById("plan-list");
  const actions = buildActionPlan(
    AppState.data,
    AppState.results.density.band
  );

  planList.innerHTML = "";
  actions.forEach((action) => {
    const li = document.createElement("li");
    li.textContent = action;
    planList.appendChild(li);
  });
}

function buildActionPlan(data, densityBand) {
  const actions = [];

  if (data.smoking !== "no") {
    actions.push(
      "Suspender tabaco al menos 4 semanas antes de la cirugía y mantener la abstinencia durante la fase de cicatrización."
    );
  }

  if (data.bruxism === "yes" && data.bruxismTx !== "yes") {
    actions.push(
      "Indicar férula oclusal rígida y ajuste oclusal para controlar bruxismo antes de rehabilitar."
    );
  }

  if (data.diabetes === "yes" && data.diabetesControl !== "controlled") {
    actions.push(
      "Optimizar control glicémico con tu médico tratante antes del procedimiento."
    );
  }

  if (data.gumsBleed !== "no") {
    actions.push(
      "Realizar fase higiénica periodontal previa al tratamiento (profilaxis y educación en higiene)."
    );
  }

  if (data.hygienePerDay === "0" || data.hygienePerDay === "1") {
    actions.push(
      "Aumentar cepillado a 2–3 veces al día con buena técnica y complementarlo con seda y cepillos interproximales."
    );
  }

  if (densityBand === "Alto riesgo") {
    actions.push(
      "Evaluar estudio de densidad ósea y, si corresponde, manejo conjunto con medicina interna o geriatría."
    );
  }

  if (actions.length === 0) {
    actions.push(
      "No se identifican alertas mayores. Mantén una higiene rigurosa y controles periódicos con tu dentista."
    );
  }

  return actions;
}

// ==========================================
// RÍO EXPLANATION (ChatGPT API)
// ==========================================

async function handleRioExplanation() {
  // Update state
  AppState.data.name = DOM.nameInput.value.trim();
  AppState.data.age = DOM.ageInput.value;
  AppState.data.gender = DOM.genderSelect.value;

  const payload = {
    name: AppState.data.name,
    age: AppState.data.age,
    gender: AppState.data.gender,
    smoking: AppState.data.smoking,
    bruxism: AppState.data.bruxism,
    bruxismTx: AppState.data.bruxismTx,
    diabetes: AppState.data.diabetes,
    diabetesControl: AppState.data.diabetesControl,
    lossCause: AppState.data.lossCause,
    gumsBleed: AppState.data.gumsBleed,
    hygienePerDay: AppState.data.hygienePerDay,
    selectedTeeth: AppState.data.selectedTeeth,
    implantxScore: AppState.results.implantx.score,
    implantxBand: AppState.results.implantx.band,
    densityScore: AppState.results.density.score,
    densityBand: AppState.results.density.band,
  };

  // Show loading state
  DOM.rioLoading.classList.remove("hidden");
  DOM.rioMessage.classList.add("hidden");
  DOM.rioMessage.textContent = "";
  DOM.btnRioExplain.disabled = true;
  DOM.btnRioExplain.innerHTML = '<span class="spinner"></span> Generando...';

  try {
    // Call backend API (not direct OpenAI call)
    const response = await fetch("/api/rio/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.explanation) {
      DOM.rioMessage.textContent = data.explanation;
    } else {
      throw new Error("No explanation in response");
    }
  } catch (error) {
    console.error("Error fetching Río explanation:", error);
    DOM.rioMessage.textContent =
      "Hubo un problema al generar la explicación. Por favor, intenta nuevamente más tarde. Si el problema persiste, contacta al soporte técnico.";
  } finally {
    DOM.rioLoading.classList.add("hidden");
    DOM.rioMessage.classList.remove("hidden");
    DOM.btnRioExplain.disabled = false;
    DOM.btnRioExplain.textContent = "Escuchar a Río";
  }
}

// ==========================================
// START APPLICATION
// ==========================================

document.addEventListener("DOMContentLoaded", initializeApp);
