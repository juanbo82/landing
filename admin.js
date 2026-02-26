// ============================================================
// Admin panel - StreetWOD
// ============================================================

const SUPABASE_URL = 'https://odgmkquuhhpartjehsmk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kZ21rcXV1aGhwYXJ0amVoc21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDE2MzcsImV4cCI6MjA4NjU3NzYzN30.fMqxbExUk1lgucXpex1HOaKpQJaie3JQVxl4kh-bgCk';

if (window.location.protocol === 'file:') {
  document.body.innerHTML = '<div style="padding:2rem;color:#ef4444;font-family:sans-serif;"><h2>Debes servir la página con un servidor local</h2><p>No abras el archivo directamente. Ejecuta en la terminal:</p><pre style="background:#1a1a1a;padding:1rem;border-radius:8px;margin-top:1rem;">cd landing\nnpx serve .</pre><p>Luego abre <strong>http://localhost:3000/admin.html</strong></p></div>';
} else {
  initApp();
}

function initApp() {
  const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // ========================
  // DOM refs
  // ========================
  const loginScreen = document.getElementById('login-screen');
  const panelScreen = document.getElementById('panel-screen');
  const loginForm = document.getElementById('login-form');
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');
  const adminEmailEl = document.getElementById('admin-email');
  const noAuthMsg = document.getElementById('no-auth-msg');
  const adminContent = document.getElementById('admin-content');
  const wodForm = document.getElementById('wod-form');
  const formError = document.getElementById('form-error');
  const formSuccess = document.getElementById('form-success');
  const wodList = document.getElementById('wod-list');
  const submitWodBtn = document.getElementById('submit-wod-btn');
  const formatSelect = document.getElementById('format');

  // Format-specific DOM
  const rowRounds = document.getElementById('row-rounds');
  const rowRepsScheme = document.getElementById('row-reps-scheme');
  const rowAmrap = document.getElementById('row-amrap');
  const rowEmom = document.getElementById('row-emom');
  const rowTabataCap = document.getElementById('row-tabata-cap');
  const emomIntervalsCount = document.getElementById('emom_intervals_count');
  const emomIntervalsContainer = document.getElementById('emom-intervals-container');
  const listExercises = document.getElementById('list-exercises');
  const btnAddExercise = document.getElementById('btn-add-exercise');
  const listCashIn = document.getElementById('list-cash-in');
  const btnAddCashIn = document.getElementById('btn-add-cash-in');
  const listCashOut = document.getElementById('list-cash-out');
  const btnAddCashOut = document.getElementById('btn-add-cash-out');

  // ========================
  // Utility
  // ========================
  function todayISO() {
    return new Date().toISOString().split('T')[0];
  }
  const weekStartInput = document.getElementById('week_start');
  weekStartInput.value = todayISO();

  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  // ========================
  // Exercise catalog (same as app)
  // ========================
  const EXERCISE_CATALOG = [
    // FUERZA
    { id: 'deadlift', name: 'Deadlift', category: 'strength', unit: 'reps', defaultReps: 10, defaultWeight: 60 },
    { id: 'power_clean', name: 'Power Clean', category: 'strength', unit: 'reps', defaultReps: 10, defaultWeight: 50 },
    { id: 'squat_clean', name: 'Squat Clean', category: 'strength', unit: 'reps', defaultReps: 8, defaultWeight: 60 },
    { id: 'hang_clean', name: 'Hang Clean', category: 'strength', unit: 'reps', defaultReps: 10, defaultWeight: 50 },
    { id: 'thruster', name: 'Thruster', category: 'strength', unit: 'reps', defaultReps: 10, defaultWeight: 43 },
    { id: 'power_snatch', name: 'Power Snatch', category: 'strength', unit: 'reps', defaultReps: 8, defaultWeight: 40 },
    { id: 'squat_snatch', name: 'Squat Snatch', category: 'strength', unit: 'reps', defaultReps: 6, defaultWeight: 50 },
    { id: 'clean_jerk', name: 'Clean & Jerk', category: 'strength', unit: 'reps', defaultReps: 6, defaultWeight: 60 },
    { id: 'push_press', name: 'Push Press', category: 'strength', unit: 'reps', defaultReps: 10, defaultWeight: 40 },
    { id: 'strict_press', name: 'Strict Press', category: 'strength', unit: 'reps', defaultReps: 10, defaultWeight: 35 },
    { id: 'push_jerk', name: 'Push Jerk', category: 'strength', unit: 'reps', defaultReps: 8, defaultWeight: 50 },
    { id: 'split_jerk', name: 'Split Jerk', category: 'strength', unit: 'reps', defaultReps: 6, defaultWeight: 60 },
    { id: 'front_squat', name: 'Front Squat', category: 'strength', unit: 'reps', defaultReps: 10, defaultWeight: 60 },
    { id: 'back_squat', name: 'Back Squat', category: 'strength', unit: 'reps', defaultReps: 10, defaultWeight: 70 },
    { id: 'overhead_squat', name: 'Overhead Squat', category: 'strength', unit: 'reps', defaultReps: 8, defaultWeight: 40 },
    { id: 'wall_ball', name: 'Wall Ball', category: 'strength', unit: 'reps', defaultReps: 20, defaultWeight: 9 },
    { id: 'kb_swing', name: 'KB Swing', category: 'strength', unit: 'reps', defaultReps: 15, defaultWeight: 24 },
    { id: 'db_snatch', name: 'DB Snatch', category: 'strength', unit: 'reps', defaultReps: 10, defaultWeight: 22 },
    { id: 'sumo_deadlift_hp', name: 'Sumo Deadlift High Pull', category: 'strength', unit: 'reps', defaultReps: 10, defaultWeight: 35 },
    { id: 'cluster', name: 'Cluster', category: 'strength', unit: 'reps', defaultReps: 6, defaultWeight: 60 },
    { id: 'lunges', name: 'Lunges', category: 'strength', unit: 'reps', defaultReps: 20, defaultWeight: 0 },
    { id: 'db_thruster', name: 'DB Thruster', category: 'strength', unit: 'reps', defaultReps: 10, defaultWeight: 15 },
    { id: 'hang_power_snatch', name: 'Hang Power Snatch', category: 'strength', unit: 'reps', defaultReps: 8, defaultWeight: 40 },
    { id: 'hang_power_clean', name: 'Hang Power Clean', category: 'strength', unit: 'reps', defaultReps: 10, defaultWeight: 50 },
    { id: 'shoulder_to_overhead', name: 'Shoulder to Overhead', category: 'strength', unit: 'reps', defaultReps: 10, defaultWeight: 50 },
    { id: 'ground_to_overhead', name: 'Ground to Overhead', category: 'strength', unit: 'reps', defaultReps: 8, defaultWeight: 50 },
    { id: 'turkish_getup', name: 'Turkish Get-Up', category: 'strength', unit: 'reps', defaultReps: 5, defaultWeight: 16 },
    { id: 'goblet_squat', name: 'Goblet Squat', category: 'strength', unit: 'reps', defaultReps: 15, defaultWeight: 16 },
    { id: 'db_clean_jerk', name: 'DB Clean & Jerk', category: 'strength', unit: 'reps', defaultReps: 8, defaultWeight: 22 },
    { id: 'devil_press', name: 'Devil Press', category: 'strength', unit: 'reps', defaultReps: 8, defaultWeight: 22 },
    { id: 'man_maker', name: 'Man Maker', category: 'strength', unit: 'reps', defaultReps: 6, defaultWeight: 15 },
    { id: 'barbell_row', name: 'Barbell Row', category: 'strength', unit: 'reps', defaultReps: 10, defaultWeight: 40 },
    { id: 'hip_clean', name: 'Hip Clean', category: 'strength', unit: 'reps', defaultReps: 8, defaultWeight: 60 },
    { id: 'walking_lunge', name: 'Walking Lunge (weighted)', category: 'strength', unit: 'reps', defaultReps: 20, defaultWeight: 20 },
    // GIMNÁSTICOS
    { id: 'pull_up', name: 'Pull-up', category: 'gymnastic', unit: 'reps', defaultReps: 10 },
    { id: 'chest_to_bar', name: 'Chest-to-Bar', category: 'gymnastic', unit: 'reps', defaultReps: 10 },
    { id: 'ring_muscle_up', name: 'Ring Muscle-up', category: 'gymnastic', unit: 'reps', defaultReps: 3 },
    { id: 'bar_muscle_up', name: 'Bar Muscle-up', category: 'gymnastic', unit: 'reps', defaultReps: 3 },
    { id: 'hspu', name: 'HSPU', category: 'gymnastic', unit: 'reps', defaultReps: 5 },
    { id: 'strict_hspu', name: 'Strict HSPU', category: 'gymnastic', unit: 'reps', defaultReps: 3 },
    { id: 'toes_to_bar', name: 'Toes-to-Bar', category: 'gymnastic', unit: 'reps', defaultReps: 12 },
    { id: 'knees_to_elbow', name: 'Knees-to-Elbow', category: 'gymnastic', unit: 'reps', defaultReps: 12 },
    { id: 'pistol_squat', name: 'Pistol Squat', category: 'gymnastic', unit: 'reps', defaultReps: 10 },
    { id: 'box_jump', name: 'Box Jump', category: 'gymnastic', unit: 'reps', defaultReps: 15 },
    { id: 'box_jump_over', name: 'Box Jump Over', category: 'gymnastic', unit: 'reps', defaultReps: 12 },
    { id: 'burpee', name: 'Burpee', category: 'gymnastic', unit: 'reps', defaultReps: 10 },
    { id: 'burpee_box_jump', name: 'Burpee Box Jump Over', category: 'gymnastic', unit: 'reps', defaultReps: 8 },
    { id: 'double_under', name: 'Double Under', category: 'gymnastic', unit: 'reps', defaultReps: 50 },
    { id: 'single_under', name: 'Single Under', category: 'gymnastic', unit: 'reps', defaultReps: 100 },
    { id: 'handstand_walk', name: 'Handstand Walk', category: 'gymnastic', unit: 'meters', defaultReps: 15 },
    { id: 'ring_dip', name: 'Ring Dip', category: 'gymnastic', unit: 'reps', defaultReps: 10 },
    { id: 'push_up', name: 'Push-up', category: 'gymnastic', unit: 'reps', defaultReps: 15 },
    { id: 'air_squat', name: 'Air Squat', category: 'gymnastic', unit: 'reps', defaultReps: 20 },
    { id: 'sit_up', name: 'Sit-up', category: 'gymnastic', unit: 'reps', defaultReps: 20 },
    { id: 'ghd_sit_up', name: 'GHD Sit-up', category: 'gymnastic', unit: 'reps', defaultReps: 15 },
    { id: 'rope_climb', name: 'Rope Climb', category: 'gymnastic', unit: 'reps', defaultReps: 1 },
    { id: 'legless_rope_climb', name: 'Legless Rope Climb', category: 'gymnastic', unit: 'reps', defaultReps: 1 },
    { id: 'strict_pull_up', name: 'Strict Pull-up', category: 'gymnastic', unit: 'reps', defaultReps: 8 },
    { id: 'ring_row', name: 'Ring Row', category: 'gymnastic', unit: 'reps', defaultReps: 12 },
    { id: 'dip', name: 'Dip', category: 'gymnastic', unit: 'reps', defaultReps: 10 },
    { id: 'strict_ring_dip', name: 'Strict Ring Dip', category: 'gymnastic', unit: 'reps', defaultReps: 8 },
    { id: 'wall_walk', name: 'Wall Walk', category: 'gymnastic', unit: 'reps', defaultReps: 3 },
    { id: 'burpee_pull_up', name: 'Burpee Pull-up', category: 'gymnastic', unit: 'reps', defaultReps: 6 },
    { id: 'burpee_target', name: 'Burpee to Target', category: 'gymnastic', unit: 'reps', defaultReps: 10 },
    { id: 'burpee_broad_jump', name: 'Burpee Broad Jump', category: 'gymnastic', unit: 'reps', defaultReps: 8 },
    { id: 'burpee_over_bar', name: 'Burpee Over the Bar', category: 'gymnastic', unit: 'reps', defaultReps: 10 },
    { id: 'step_up', name: 'Step-up', category: 'gymnastic', unit: 'reps', defaultReps: 20 },
    { id: 'jumping_lunge', name: 'Jumping Lunge', category: 'gymnastic', unit: 'reps', defaultReps: 20 },
    // Core / Abdominales
    { id: 'hollow_rock', name: 'Hollow Rock', category: 'gymnastic', unit: 'reps', defaultReps: 20 },
    { id: 'hollow_hold', name: 'Hollow Hold', category: 'gymnastic', unit: 'seconds', defaultReps: 30 },
    { id: 'v_up', name: 'V-up', category: 'gymnastic', unit: 'reps', defaultReps: 15 },
    { id: 'plank_hold', name: 'Plank Hold', category: 'gymnastic', unit: 'seconds', defaultReps: 60 },
    { id: 'russian_twist', name: 'Russian Twist', category: 'gymnastic', unit: 'reps', defaultReps: 20 },
    { id: 'flutter_kick', name: 'Flutter Kick', category: 'gymnastic', unit: 'reps', defaultReps: 20 },
    { id: 'l_sit_hold', name: 'L-sit Hold', category: 'gymnastic', unit: 'seconds', defaultReps: 20 },
    { id: 'hanging_knee_raise', name: 'Hanging Knee Raise', category: 'gymnastic', unit: 'reps', defaultReps: 12 },
    { id: 'superman_hold', name: 'Superman Hold', category: 'gymnastic', unit: 'seconds', defaultReps: 30 },
    { id: 'mountain_climber', name: 'Mountain Climber', category: 'gymnastic', unit: 'reps', defaultReps: 20 },
    { id: 'hip_extension', name: 'GHD Hip Extension', category: 'gymnastic', unit: 'reps', defaultReps: 15 },
    // CARDIO
    { id: 'run_200', name: 'Run 200m', category: 'cardio', unit: 'meters', defaultReps: 200 },
    { id: 'run_400', name: 'Run 400m', category: 'cardio', unit: 'meters', defaultReps: 400 },
    { id: 'run_800', name: 'Run 800m', category: 'cardio', unit: 'meters', defaultReps: 800 },
    { id: 'run_1000', name: 'Run 1000m', category: 'cardio', unit: 'meters', defaultReps: 1000 },
    { id: 'run_1600', name: 'Run 1600m (1 mile)', category: 'cardio', unit: 'meters', defaultReps: 1600 },
    { id: 'row_cal', name: 'Row (cal)', category: 'cardio', unit: 'calories', defaultReps: 15 },
    { id: 'row_500', name: 'Row 500m', category: 'cardio', unit: 'meters', defaultReps: 500 },
    { id: 'row_1000', name: 'Row 1000m', category: 'cardio', unit: 'meters', defaultReps: 1000 },
    { id: 'bike_cal', name: 'Assault Bike (cal)', category: 'cardio', unit: 'calories', defaultReps: 15 },
    { id: 'ski_cal', name: 'Ski Erg (cal)', category: 'cardio', unit: 'calories', defaultReps: 12 },
    { id: 'echo_bike_cal', name: 'Echo Bike (cal)', category: 'cardio', unit: 'calories', defaultReps: 15 },
    { id: 'run_5000', name: 'Run 5K', category: 'cardio', unit: 'meters', defaultReps: 5000 },
    { id: 'row_2000', name: 'Row 2000m', category: 'cardio', unit: 'meters', defaultReps: 2000 },
    { id: 'bike_erg_cal', name: 'Bike Erg (cal)', category: 'cardio', unit: 'calories', defaultReps: 15 },
    { id: 'sled_push', name: 'Sled Push', category: 'cardio', unit: 'meters', defaultReps: 25 },
    { id: 'farmers_carry', name: "Farmer's Carry", category: 'cardio', unit: 'meters', defaultReps: 50 },
    { id: 'shuttle_run', name: 'Shuttle Run', category: 'cardio', unit: 'reps', defaultReps: 1 },
    // TIEMPO / DESCANSO
    { id: 'rest_min', name: 'Descanso', category: 'cardio', unit: 'minutes', defaultReps: 2 },
    { id: 'rest_sec', name: 'Descanso (seg)', category: 'cardio', unit: 'seconds', defaultReps: 30 },
  ];

  const CATEGORIES = [
    { value: 'strength', label: 'Fuerza' },
    { value: 'gymnastic', label: 'Gimnástico' },
    { value: 'cardio', label: 'Cardio' },
  ];
  const UNITS = [
    { value: 'reps', label: 'Reps' },
    { value: 'calories', label: 'Cal' },
    { value: 'meters', label: 'Metros' },
    { value: 'minutes', label: 'Minutos' },
    { value: 'seconds', label: 'Segundos' },
  ];

  function getExercisesByCategory(cat) {
    return EXERCISE_CATALOG.filter(e => e.category === cat);
  }

  function buildExerciseOptions(category) {
    const exs = getExercisesByCategory(category);
    let opts = '<option value="">-- Seleccionar o escribir --</option>';
    opts += exs.map(e => `<option value="${e.id}">${e.name}</option>`).join('');
    opts += '<option value="__custom__">✏️ Personalizado...</option>';
    return opts;
  }

  function categoryOptions() {
    return CATEGORIES.map(c => `<option value="${c.value}">${c.label}</option>`).join('');
  }
  function unitOptions() {
    return UNITS.map(u => `<option value="${u.value}">${u.label}</option>`).join('');
  }

  // Wire up exercise card: category -> exercise select -> auto-fill
  function wireExerciseCard(div) {
    const catSelect = div.querySelector('[data-field="category"]');
    const exSelect = div.querySelector('[data-field="exercise-select"]');
    const nameInput = div.querySelector('[data-field="name"]');
    const repsInput = div.querySelector('[data-field="reps"]');
    const weightInput = div.querySelector('[data-field="weight"]');
    const unitSelect = div.querySelector('[data-field="unit"]');

    function refreshExercises() {
      const cat = catSelect.value;
      exSelect.innerHTML = buildExerciseOptions(cat);
      exSelect.style.display = '';
      nameInput.style.display = 'none';
      nameInput.removeAttribute('required');
    }

    catSelect.addEventListener('change', refreshExercises);

    exSelect.addEventListener('change', () => {
      const val = exSelect.value;
      if (val === '__custom__') {
        exSelect.style.display = 'none';
        nameInput.style.display = '';
        nameInput.setAttribute('required', '');
        nameInput.focus();
        return;
      }
      if (!val) return;
      const ex = EXERCISE_CATALOG.find(e => e.id === val);
      if (ex) {
        nameInput.value = ex.name;
        repsInput.value = ex.defaultReps;
        if (ex.defaultWeight) {
          weightInput.value = ex.defaultWeight;
        } else {
          weightInput.value = '';
        }
        unitSelect.value = ex.unit;
      }
    });

    // Back to select button on custom name
    nameInput.addEventListener('blur', () => {
      if (!nameInput.value.trim() && nameInput.style.display !== 'none') {
        nameInput.style.display = 'none';
        exSelect.style.display = '';
        exSelect.value = '';
      }
    });

    refreshExercises();
  }

  // ========================
  // Exercise HTML builders
  // ========================
  function createExerciseCard(showSchemeToggle) {
    const id = uuid();
    const div = document.createElement('div');
    div.className = 'exercise-card';
    div.dataset.id = id;
    div.innerHTML = `
      <div class="form-group form-group-name">
        <label>Ejercicio</label>
        <select data-field="exercise-select"></select>
        <input type="text" data-field="name" placeholder="Nombre personalizado" style="display:none">
      </div>
      <div class="form-group">
        <label>Categoría</label>
        <select data-field="category">${categoryOptions()}</select>
      </div>
      <div class="form-group">
        <label>Reps</label>
        <input type="number" data-field="reps" min="0" value="10" required>
      </div>
      <div class="form-group">
        <label>Peso (kg)</label>
        <input type="number" data-field="weight" min="0" step="0.5" placeholder="-">
      </div>
      <div class="form-group">
        <label>Unidad</label>
        <select data-field="unit">${unitOptions()}</select>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.25rem;align-items:center">
        ${showSchemeToggle ? `<button type="button" class="scheme-toggle" data-field="useScheme" data-active="true" title="Usa el esquema de reps del WOD">Esquema</button>` : ''}
        <button type="button" class="btn-danger" onclick="this.closest('.exercise-card').remove()">✕</button>
      </div>
    `;

    wireExerciseCard(div);

    // Scheme toggle click
    const schemeBtn = div.querySelector('.scheme-toggle');
    if (schemeBtn) {
      schemeBtn.addEventListener('click', () => {
        const active = schemeBtn.dataset.active === 'true';
        schemeBtn.dataset.active = String(!active);
        schemeBtn.classList.toggle('off', active);
        schemeBtn.textContent = active ? 'Reps fijas' : 'Esquema';
        const repsInput = div.querySelector('[data-field="reps"]');
        if (!active) {
          repsInput.disabled = true;
          repsInput.style.opacity = '0.4';
        } else {
          repsInput.disabled = false;
          repsInput.style.opacity = '1';
        }
      });
    }

    return div;
  }

  function createEmomExerciseCard() {
    const div = document.createElement('div');
    div.className = 'emom-exercise-card';
    div.innerHTML = `
      <div class="form-group form-group-name">
        <label>Ejercicio</label>
        <select data-field="exercise-select"></select>
        <input type="text" data-field="name" placeholder="Nombre personalizado" style="display:none">
      </div>
      <div class="form-group">
        <label>Categoría</label>
        <select data-field="category">${categoryOptions()}</select>
      </div>
      <div class="form-group">
        <label>Reps</label>
        <input type="number" data-field="reps" min="0" value="10" required>
      </div>
      <div class="form-group">
        <label>Peso (kg)</label>
        <input type="number" data-field="weight" min="0" step="0.5" placeholder="-">
      </div>
      <div class="form-group">
        <label>Unidad</label>
        <select data-field="unit">${unitOptions()}</select>
      </div>
      <button type="button" class="btn-danger" onclick="this.closest('.emom-exercise-card').remove()">✕</button>
    `;

    const catSelect = div.querySelector('[data-field="category"]');
    const exSelect = div.querySelector('[data-field="exercise-select"]');
    const nameInput = div.querySelector('[data-field="name"]');
    const repsInput = div.querySelector('[data-field="reps"]');
    const weightInput = div.querySelector('[data-field="weight"]');
    const unitSelect = div.querySelector('[data-field="unit"]');

    function refreshExercises() {
      exSelect.innerHTML = buildExerciseOptions(catSelect.value);
      exSelect.style.display = '';
      nameInput.style.display = 'none';
    }
    catSelect.addEventListener('change', refreshExercises);

    exSelect.addEventListener('change', () => {
      const val = exSelect.value;
      if (val === '__custom__') {
        exSelect.style.display = 'none';
        nameInput.style.display = '';
        nameInput.focus();
        return;
      }
      if (!val) return;
      const ex = EXERCISE_CATALOG.find(e => e.id === val);
      if (ex) {
        nameInput.value = ex.name;
        repsInput.value = ex.defaultReps;
        if (ex.defaultWeight) weightInput.value = ex.defaultWeight;
        else weightInput.value = '';
        unitSelect.value = ex.unit;
      }
    });
    nameInput.addEventListener('blur', () => {
      if (!nameInput.value.trim() && nameInput.style.display !== 'none') {
        nameInput.style.display = 'none';
        exSelect.style.display = '';
        exSelect.value = '';
      }
    });

    refreshExercises();
    return div;
  }

  // ========================
  // Format-specific visibility
  // ========================
  function updateFormatUI() {
    const fmt = formatSelect.value;

    // Hide all
    rowRounds.style.display = 'none';
    rowRepsScheme.style.display = 'none';
    rowAmrap.style.display = 'none';
    rowEmom.style.display = 'none';
    rowTabataCap.style.display = 'none';
    emomIntervalsContainer.style.display = 'none';
    listExercises.style.display = '';
    btnAddExercise.style.display = '';

    switch (fmt) {
      case 'For Time':
        rowRounds.style.display = '';
        rowRepsScheme.style.display = '';
        break;
      case 'Chipper':
        rowRounds.style.display = '';
        rowRepsScheme.style.display = '';
        document.getElementById('rounds').value = '1';
        break;
      case 'AMRAP':
        rowAmrap.style.display = '';
        rowRepsScheme.style.display = '';
        break;
      case 'EMOM':
        rowEmom.style.display = '';
        emomIntervalsContainer.style.display = '';
        listExercises.style.display = 'none';
        btnAddExercise.style.display = 'none';
        buildEmomIntervals();
        break;
      case 'Tabata':
        rowTabataCap.style.display = '';
        break;
      case 'Other':
        rowRounds.style.display = '';
        rowRepsScheme.style.display = '';
        break;
    }

    updateSchemeToggles();
  }

  formatSelect.addEventListener('change', updateFormatUI);

  // ========================
  // Scheme toggle visibility
  // ========================
  function updateSchemeToggles() {
    const scheme = document.getElementById('reps_scheme').value.trim();
    const hasScheme = !!scheme;
    listExercises.querySelectorAll('.scheme-toggle').forEach(btn => {
      btn.style.display = hasScheme ? '' : 'none';
    });
    listCashIn.querySelectorAll('.scheme-toggle').forEach(btn => {
      btn.style.display = 'none';
    });
    listCashOut.querySelectorAll('.scheme-toggle').forEach(btn => {
      btn.style.display = 'none';
    });
  }
  document.getElementById('reps_scheme').addEventListener('input', updateSchemeToggles);

  // ========================
  // EMOM intervals builder
  // ========================
  function buildEmomIntervals() {
    const count = parseInt(emomIntervalsCount.value) || 1;
    emomIntervalsContainer.innerHTML = '';

    for (let i = 1; i <= count; i++) {
      const block = document.createElement('div');
      block.className = 'emom-interval-block';
      block.dataset.minute = String(i);
      block.innerHTML = `
        <div class="emom-interval-header">
          <span>Intervalo ${i}</span>
          <button type="button" class="btn btn-sm btn-add emom-add-ex" data-minute="${i}">+ Ejercicio</button>
        </div>
        <div class="emom-interval-exercises" data-minute="${i}"></div>
      `;
      emomIntervalsContainer.appendChild(block);

      // Add one exercise by default
      const exList = block.querySelector('.emom-interval-exercises');
      exList.appendChild(createEmomExerciseCard());

      block.querySelector('.emom-add-ex').addEventListener('click', () => {
        exList.appendChild(createEmomExerciseCard());
      });
    }
  }
  emomIntervalsCount.addEventListener('change', buildEmomIntervals);

  // ========================
  // Add exercise buttons
  // ========================
  btnAddExercise.addEventListener('click', () => {
    const hasScheme = !!document.getElementById('reps_scheme').value.trim();
    listExercises.appendChild(createExerciseCard(hasScheme));
    updateSchemeToggles();
  });
  btnAddCashIn.addEventListener('click', () => {
    listCashIn.appendChild(createExerciseCard(false));
  });
  btnAddCashOut.addEventListener('click', () => {
    listCashOut.appendChild(createExerciseCard(false));
  });

  // ========================
  // Parse exercises from DOM
  // ========================
  function getCardExerciseName(card) {
    const exSelect = card.querySelector('[data-field="exercise-select"]');
    const nameInput = card.querySelector('[data-field="name"]');
    // If custom input is visible, use it
    if (nameInput.style.display !== 'none' && nameInput.value.trim()) {
      return nameInput.value.trim();
    }
    // If a catalog exercise is selected, use its name
    if (exSelect && exSelect.value && exSelect.value !== '' && exSelect.value !== '__custom__') {
      const ex = EXERCISE_CATALOG.find(e => e.id === exSelect.value);
      return ex ? ex.name : '';
    }
    // Fallback to name input value
    return nameInput.value.trim();
  }

  function getCardExerciseUnit(card) {
    const unitSelect = card.querySelector('[data-field="unit"]');
    if (unitSelect) return unitSelect.value;
    // EMOM cards don't have unit select - get from catalog
    const exSelect = card.querySelector('[data-field="exercise-select"]');
    if (exSelect && exSelect.value && exSelect.value !== '' && exSelect.value !== '__custom__') {
      const ex = EXERCISE_CATALOG.find(e => e.id === exSelect.value);
      if (ex) return ex.unit;
    }
    return 'reps';
  }

  function parseExerciseCards(container) {
    const cards = container.querySelectorAll('.exercise-card');
    const exercises = [];
    for (const card of cards) {
      const name = getCardExerciseName(card);
      if (!name) continue;
      const reps = parseInt(card.querySelector('[data-field="reps"]').value) || 0;
      const weightVal = card.querySelector('[data-field="weight"]').value;
      const weight = weightVal ? parseFloat(weightVal) : undefined;
      const category = card.querySelector('[data-field="category"]').value;
      const unit = getCardExerciseUnit(card);
      const schemeBtn = card.querySelector('[data-field="useScheme"]');
      const useRepsScheme = schemeBtn ? schemeBtn.dataset.active === 'true' : undefined;

      const exSelect = card.querySelector('[data-field="exercise-select"]');
      const catalogId = (exSelect && exSelect.value && exSelect.value !== '__custom__') ? exSelect.value : uuid();

      exercises.push({
        exerciseId: catalogId || card.dataset.id || uuid(),
        name,
        reps,
        weight: weight || undefined,
        category,
        unit,
        useRepsScheme: useRepsScheme === false ? false : undefined,
      });
    }
    return exercises;
  }

  function parseEmomExerciseCards(container) {
    const cards = container.querySelectorAll('.emom-exercise-card');
    const exercises = [];
    for (const card of cards) {
      const name = getCardExerciseName(card);
      if (!name) continue;
      const reps = parseInt(card.querySelector('[data-field="reps"]').value) || 0;
      const weightVal = card.querySelector('[data-field="weight"]').value;
      const weight = weightVal ? parseFloat(weightVal) : undefined;
      const category = card.querySelector('[data-field="category"]').value;
      const unit = getCardExerciseUnit(card);

      const exSelect = card.querySelector('[data-field="exercise-select"]');
      const catalogId = (exSelect && exSelect.value && exSelect.value !== '__custom__') ? exSelect.value : uuid();

      exercises.push({
        exerciseId: catalogId,
        name,
        reps,
        weight: weight || undefined,
        category,
        unit,
      });
    }
    return exercises;
  }

  function parseEmomSchedule() {
    const blocks = emomIntervalsContainer.querySelectorAll('.emom-interval-block');
    const schedule = [];
    for (const block of blocks) {
      const minute = parseInt(block.dataset.minute);
      const exContainer = block.querySelector('.emom-interval-exercises');
      const exercises = parseEmomExerciseCards(exContainer);
      if (exercises.length > 0) {
        schedule.push({ minute, exercises });
      }
    }
    return schedule;
  }

  // ========================
  // Auth helpers
  // ========================
  async function isAdmin() {
    const { data: { user } } = await db.auth.getUser();
    if (!user) return false;
    const { data } = await db.from('admin_users').select('user_id').eq('user_id', user.id).single();
    return !!data;
  }

  async function showPanel(session) {
    loginScreen.classList.add('hidden');
    panelScreen.classList.remove('hidden');
    adminEmailEl.textContent = session.user.email;
    const admin = await isAdmin();
    if (admin) {
      noAuthMsg.classList.add('hidden');
      adminContent.classList.remove('hidden');
      updateFormatUI();
      // Add one default exercise
      if (listExercises.children.length === 0) {
        listExercises.appendChild(createExerciseCard(false));
      }
      loadWodList();
    } else {
      noAuthMsg.classList.remove('hidden');
      adminContent.classList.add('hidden');
    }
  }

  function showLogin() {
    loginScreen.classList.remove('hidden');
    panelScreen.classList.add('hidden');
  }

  async function init() {
    const { data: { session } } = await db.auth.getSession();
    if (session) {
      await showPanel(session);
    } else {
      showLogin();
    }
  }

  // ========================
  // Login
  // ========================
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.textContent = '';
    const btn = document.getElementById('login-btn');
    btn.disabled = true;
    btn.textContent = 'Entrando...';
    try {
      const { data, error } = await db.auth.signInWithPassword({
        email: loginEmail.value.trim(),
        password: loginPassword.value,
      });
      if (error) {
        loginError.textContent = error.message === 'Invalid login credentials'
          ? 'Email o contraseña incorrectos'
          : error.message;
        return;
      }
      await showPanel(data.session);
    } catch (err) {
      loginError.textContent = 'Error inesperado: ' + err.message;
    } finally {
      btn.disabled = false;
      btn.textContent = 'Iniciar sesión';
    }
  });

  // ========================
  // Logout
  // ========================
  logoutBtn.addEventListener('click', async () => {
    await db.auth.signOut();
    showLogin();
    loginForm.reset();
  });

  // ========================
  // Save WOD
  // ========================
  wodForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formError.textContent = '';
    formSuccess.textContent = '';

    const fmt = formatSelect.value;
    const isEmom = fmt === 'EMOM';

    // Build exercises
    let exercises = [];
    let emomSchedule = null;

    if (isEmom) {
      emomSchedule = parseEmomSchedule();
      exercises = emomSchedule.flatMap(s => s.exercises);
      if (exercises.length === 0) {
        formError.textContent = 'Añade al menos un ejercicio a los intervalos EMOM';
        return;
      }
    } else {
      exercises = parseExerciseCards(listExercises);
      if (exercises.length === 0) {
        formError.textContent = 'Añade al menos un ejercicio';
        return;
      }
    }

    const cashIn = parseExerciseCards(listCashIn);
    const cashOut = parseExerciseCards(listCashOut);

    // Build payload
    const timeCap = (() => {
      if (fmt === 'Tabata') return parseInt(document.getElementById('tabata_time_cap').value) || null;
      if (rowRounds.style.display !== 'none') return parseInt(document.getElementById('time_cap_minutes').value) || null;
      return null;
    })();

    const payload = {
      week_start: document.getElementById('week_start').value,
      title: document.getElementById('title').value.trim(),
      description: document.getElementById('description').value.trim() || null,
      format: fmt,
      difficulty: parseInt(document.getElementById('difficulty').value, 10),
      time_cap_minutes: timeCap,
      exercises: exercises,
      emom_schedule: isEmom && emomSchedule && emomSchedule.length > 0 ? emomSchedule : null,
      amrap_minutes: fmt === 'AMRAP' ? (parseInt(document.getElementById('amrap_minutes').value) || null) : null,
      emom_minutes: isEmom ? (parseInt(document.getElementById('emom_minutes').value) || null) : null,
      emom_interval_seconds: isEmom ? (parseInt(document.getElementById('emom_interval_seconds').value) || 60) : null,
      rounds: parseInt(document.getElementById('rounds').value) || 1,
      reps_scheme: document.getElementById('reps_scheme').value.trim() || null,
      cash_in: cashIn.length > 0 ? cashIn : null,
      cash_out: cashOut.length > 0 ? cashOut : null,
      // Legacy fields null for new WODs
      movements: null,
      rx: null,
      scaled: null,
    };

    submitWodBtn.disabled = true;
    submitWodBtn.textContent = 'Guardando...';

    const { error } = await db.from('weekly_wods').insert(payload);

    submitWodBtn.disabled = false;
    submitWodBtn.textContent = 'Guardar WOD';

    if (error) {
      formError.textContent = error.message;
      return;
    }

    formSuccess.textContent = 'WOD guardado correctamente!';
    loadWodList();
    resetForm();
  });

  // ========================
  // Reset form
  // ========================
  function resetForm() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('rounds').value = '1';
    document.getElementById('time_cap_minutes').value = '';
    document.getElementById('reps_scheme').value = '';
    document.getElementById('amrap_minutes').value = '';
    document.getElementById('emom_minutes').value = '';
    document.getElementById('emom_interval_seconds').value = '60';
    document.getElementById('emom_intervals_count').value = '1';
    document.getElementById('difficulty').value = '3';
    document.getElementById('week_start').value = todayISO();

    listExercises.innerHTML = '';
    listExercises.appendChild(createExerciseCard(false));
    listCashIn.innerHTML = '';
    listCashOut.innerHTML = '';
    emomIntervalsContainer.innerHTML = '';

    updateFormatUI();
  }

  // ========================
  // Load WOD list
  // ========================
  async function loadWodList() {
    const { data, error } = await db
      .from('weekly_wods')
      .select('id, week_start, title, format, difficulty, exercises')
      .order('week_start', { ascending: false })
      .limit(20);

    if (error) {
      wodList.innerHTML = '<p class="error-msg">Error al cargar WODs</p>';
      return;
    }
    if (!data || data.length === 0) {
      wodList.innerHTML = '<p style="color:#71717a;font-size:0.9rem;">Sin WODs todavía</p>';
      return;
    }

    wodList.innerHTML = data.map(w => {
      const exCount = Array.isArray(w.exercises) ? w.exercises.length : 0;
      const exLabel = exCount > 0 ? `${exCount} ejercicios` : 'legacy';
      return `
        <div class="wod-item" data-id="${w.id}">
          <div class="wod-item-info">
            <strong>${w.week_start}</strong> — ${w.title}
            <span class="format-badge">${w.format}</span>
            <span class="wod-item-exercises">${exLabel}</span>
          </div>
          <button type="button" class="wod-item-delete" data-id="${w.id}" title="Eliminar">🗑</button>
        </div>
      `;
    }).join('');

    // Delete handlers
    wodList.querySelectorAll('.wod-item-delete').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (!confirm('¿Eliminar este WOD?')) return;
        const id = btn.dataset.id;
        const { error: delErr } = await db.from('weekly_wods').delete().eq('id', id);
        if (delErr) {
          alert('Error al eliminar: ' + delErr.message);
        } else {
          loadWodList();
        }
      });
    });
  }

  // ========================
  // Init
  // ========================
  init().catch((err) => {
    console.error('Init error:', err);
    loginError.textContent = 'Error al conectar con Supabase. Revisa la consola (F12).';
  });
}
