import { WodExercise } from './types';

export type BenchmarkCategory = 'girls' | 'heroes';

export interface BenchmarkWod {
  id: string;
  category: BenchmarkCategory;
  title: string;
  format: string;
  exercises: WodExercise[];
  rounds?: number;
  time_cap_minutes?: number;
  amrap_minutes?: number;
  reps_scheme?: string;
  cash_in?: WodExercise[];
  cash_out?: WodExercise[];
  description?: string;
}

function ex(
  exerciseId: string,
  name: string,
  reps: number,
  category: string,
  unit = 'reps',
  weights?: { rxM?: number; rxF?: number; scM?: number; scF?: number },
): WodExercise {
  return {
    exerciseId,
    name,
    reps,
    category,
    unit,
    weightRxMale: weights?.rxM,
    weightRxFemale: weights?.rxF,
    weightScaledMale: weights?.scM,
    weightScaledFemale: weights?.scF,
  };
}

export const BENCHMARK_WODS: BenchmarkWod[] = [
  {
    id: 'benchmark_fran',
    category: 'girls',
    title: 'Fran',
    format: 'For Time',
    reps_scheme: '21-15-9',
    exercises: [
      ex('thruster', 'Thruster', 21, 'strength', 'reps', { rxM: 43, rxF: 30, scM: 30, scF: 20 }),
      ex('pull_up', 'Pull-up', 21, 'gymnastic'),
    ],
    description: 'Uno de los WODs más icónicos de CrossFit. Un test de velocidad e intensidad.',
  },
  {
    id: 'benchmark_grace',
    category: 'girls',
    title: 'Grace',
    format: 'For Time',
    exercises: [
      ex('clean_jerk', 'Clean & Jerk', 30, 'strength', 'reps', { rxM: 61, rxF: 43, scM: 43, scF: 30 }),
    ],
    description: '30 repeticiones contra reloj. Pura potencia olímpica.',
  },
  {
    id: 'benchmark_helen',
    category: 'girls',
    title: 'Helen',
    format: 'For Time',
    rounds: 3,
    exercises: [
      ex('run', 'Run', 400, 'cardio', 'meters'),
      ex('kb_swing', 'KB Swing', 21, 'strength', 'reps', { rxM: 24, rxF: 16, scM: 16, scF: 12 }),
      ex('pull_up', 'Pull-up', 12, 'gymnastic'),
    ],
    description: 'Tres rondas que combinan carrera, fuerza y gimnásticos.',
  },
  {
    id: 'benchmark_diane',
    category: 'girls',
    title: 'Diane',
    format: 'For Time',
    reps_scheme: '21-15-9',
    exercises: [
      ex('deadlift', 'Deadlift', 21, 'strength', 'reps', { rxM: 102, rxF: 70, scM: 70, scF: 48 }),
      ex('hspu', 'HSPU', 21, 'gymnastic'),
    ],
    description: 'Peso pesado combinado con gimnásticos avanzados.',
  },
  {
    id: 'benchmark_elizabeth',
    category: 'girls',
    title: 'Elizabeth',
    format: 'For Time',
    reps_scheme: '21-15-9',
    exercises: [
      ex('squat_clean', 'Squat Clean', 21, 'strength', 'reps', { rxM: 61, rxF: 43, scM: 43, scF: 30 }),
      ex('ring_dip', 'Ring Dip', 21, 'gymnastic'),
    ],
    description: 'Cleans pesados y dips en anillas. Test de fuerza funcional.',
  },
  {
    id: 'benchmark_isabel',
    category: 'girls',
    title: 'Isabel',
    format: 'For Time',
    exercises: [
      ex('power_snatch', 'Snatch', 30, 'strength', 'reps', { rxM: 61, rxF: 43, scM: 43, scF: 30 }),
    ],
    description: '30 snatches contra el reloj. Hermana de Grace.',
  },
  {
    id: 'benchmark_jackie',
    category: 'girls',
    title: 'Jackie',
    format: 'For Time',
    exercises: [
      ex('row_1000', 'Row 1000m', 1, 'cardio', 'reps'),
      ex('thruster', 'Thruster', 50, 'strength', 'reps', { rxM: 20, rxF: 15, scM: 15, scF: 10 }),
      ex('pull_up', 'Pull-up', 30, 'gymnastic'),
    ],
    description: 'Remo, thrusters y pull-ups. Un clásico trimodal.',
  },
  {
    id: 'benchmark_karen',
    category: 'girls',
    title: 'Karen',
    format: 'For Time',
    exercises: [
      ex('wall_ball', 'Wall Ball', 150, 'strength', 'reps', { rxM: 9, rxF: 6, scM: 6, scF: 4 }),
    ],
    description: '150 Wall Balls. Un WOD que pone a prueba tu resistencia.',
  },
  {
    id: 'benchmark_annie',
    category: 'girls',
    title: 'Annie',
    format: 'For Time',
    reps_scheme: '50-40-30-20-10',
    exercises: [
      ex('double_under', 'Double Under', 50, 'gymnastic'),
      ex('sit_up', 'Sit-up', 50, 'gymnastic'),
    ],
    description: 'Coordinación y core. Rápido si dominas los DU.',
  },
  {
    id: 'benchmark_nancy',
    category: 'girls',
    title: 'Nancy',
    format: 'For Time',
    rounds: 5,
    exercises: [
      ex('run', 'Run', 400, 'cardio', 'meters'),
      ex('overhead_squat', 'Overhead Squat', 15, 'strength', 'reps', { rxM: 43, rxF: 30, scM: 30, scF: 20 }),
    ],
    description: 'Carrera y overhead squats. Movilidad y resistencia.',
  },
  {
    id: 'benchmark_murph',
    category: 'heroes',
    title: 'Murph',
    format: 'For Time',
    exercises: [
      ex('run', 'Run', 1600, 'cardio', 'meters'),
      ex('pull_up', 'Pull-up', 100, 'gymnastic'),
      ex('push_up', 'Push-up', 200, 'gymnastic'),
      ex('air_squat', 'Air Squat', 300, 'gymnastic'),
      ex('run', 'Run', 1600, 'cardio', 'meters'),
    ],
    description: 'En honor al Teniente Michael Murphy. Con chaleco lastrado (RX).',
  },
  {
    id: 'benchmark_dt',
    category: 'heroes',
    title: 'DT',
    format: 'For Time',
    rounds: 5,
    exercises: [
      ex('deadlift', 'Deadlift', 12, 'strength', 'reps', { rxM: 70, rxF: 48, scM: 48, scF: 35 }),
      ex('hang_power_clean', 'Hang Power Clean', 9, 'strength', 'reps', { rxM: 70, rxF: 48, scM: 48, scF: 35 }),
      ex('push_jerk', 'Push Jerk', 6, 'strength', 'reps', { rxM: 70, rxF: 48, scM: 48, scF: 35 }),
    ],
    description: 'Barbell complex. 5 rondas de puro poder.',
  },
  {
    id: 'benchmark_cindy',
    category: 'heroes',
    title: 'Cindy',
    format: 'AMRAP',
    amrap_minutes: 20,
    exercises: [
      ex('pull_up', 'Pull-up', 5, 'gymnastic'),
      ex('push_up', 'Push-up', 10, 'gymnastic'),
      ex('air_squat', 'Air Squat', 15, 'gymnastic'),
    ],
    description: '20 minutos de bodyweight. ¿Cuántas rondas puedes hacer?',
  },
  {
    id: 'benchmark_mary',
    category: 'heroes',
    title: 'Mary',
    format: 'AMRAP',
    amrap_minutes: 20,
    exercises: [
      ex('hspu', 'HSPU', 5, 'gymnastic'),
      ex('pistol_squat', 'Pistol Squat', 10, 'gymnastic'),
      ex('pull_up', 'Pull-up', 15, 'gymnastic'),
    ],
    description: 'La hermana avanzada de Cindy. Gimnásticos de alto nivel.',
  },
  {
    id: 'benchmark_chelsea',
    category: 'heroes',
    title: 'Chelsea',
    format: 'EMOM',
    exercises: [
      ex('pull_up', 'Pull-up', 5, 'gymnastic'),
      ex('push_up', 'Push-up', 10, 'gymnastic'),
      ex('air_squat', 'Air Squat', 15, 'gymnastic'),
    ],
    description: 'Como Cindy, pero en formato EMOM 30 min. Gestión del descanso.',
  },
  {
    id: 'benchmark_filthy_fifty',
    category: 'heroes',
    title: 'Filthy Fifty',
    format: 'Chipper',
    exercises: [
      ex('box_jump', 'Box Jump', 50, 'gymnastic'),
      ex('pull_up', 'Jumping Pull-up', 50, 'gymnastic'),
      ex('kb_swing', 'KB Swing', 50, 'strength', 'reps', { rxM: 16, rxF: 12, scM: 12, scF: 8 }),
      ex('walking_lunge', 'Walking Lunge', 50, 'strength'),
      ex('knees_to_elbow', 'Knees to Elbow', 50, 'gymnastic'),
      ex('push_press', 'Push Press', 50, 'strength', 'reps', { rxM: 20, rxF: 15, scM: 15, scF: 10 }),
      ex('back_extension', 'Back Extension', 50, 'gymnastic'),
      ex('wall_ball', 'Wall Ball', 50, 'strength', 'reps', { rxM: 9, rxF: 6, scM: 6, scF: 4 }),
      ex('burpee', 'Burpee', 50, 'gymnastic'),
      ex('double_under', 'Double Under', 50, 'gymnastic'),
    ],
    description: '50 reps de 10 ejercicios distintos. La variedad hecha chipper.',
  },
  {
    id: 'benchmark_fight_gone_bad',
    category: 'heroes',
    title: 'Fight Gone Bad',
    format: 'Other',
    rounds: 3,
    exercises: [
      ex('wall_ball', 'Wall Ball', 0, 'strength', 'reps', { rxM: 9, rxF: 6, scM: 6, scF: 4 }),
      ex('sumo_deadlift_hp', 'Sumo Deadlift HP', 0, 'strength', 'reps', { rxM: 34, rxF: 25, scM: 25, scF: 20 }),
      ex('box_jump', 'Box Jump', 0, 'gymnastic'),
      ex('push_press', 'Push Press', 0, 'strength', 'reps', { rxM: 34, rxF: 25, scM: 25, scF: 20 }),
      ex('row', 'Row (cal)', 0, 'cardio', 'calories'),
    ],
    description: '3 rondas x 5 estaciones x 1 min. Cuenta total de reps.',
  },
  {
    id: 'benchmark_amanda',
    category: 'heroes',
    title: 'Amanda',
    format: 'For Time',
    reps_scheme: '9-7-5',
    exercises: [
      ex('ring_muscle_up', 'Ring Muscle-up', 9, 'gymnastic'),
      ex('power_snatch', 'Snatch', 9, 'strength', 'reps', { rxM: 61, rxF: 43, scM: 43, scF: 30 }),
    ],
    description: 'Muscle-ups y snatches. Corto pero brutal.',
  },
];

export function getBenchmarksByCategory(cat: BenchmarkCategory): BenchmarkWod[] {
  return BENCHMARK_WODS.filter((w) => w.category === cat);
}
