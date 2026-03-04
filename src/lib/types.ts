export interface UserProfile {
  id: string;
  username: string;
  country: string;
  birth_date: string;
  gender: 'male' | 'female';
  is_premium: boolean;
  avatar_url: string | null;
  box?: string | null;
  created_at: string;
}

export interface UserRM {
  id: string;
  user_id: string;
  exercise_id: string;
  weight: number;
  video_url: string | null;
  is_verified: boolean;
  updated_at: string;
}

export interface LeaderboardEntry {
  rm_id: string;
  user_id: string;
  username: string;
  weight: number;
  country: string;
  gender: 'male' | 'female';
  avatar_url: string | null;
  video_url: string | null;
  is_verified: boolean;
  likes: number;
  fakes: number;
  is_valid: boolean;
  position?: number;
}

export type AgeCategory = 'all' | '14-17' | '18-24' | '25-34' | '35-44' | '45-54' | '55+';

export const AGE_CATEGORIES: AgeCategory[] = [
  'all', '14-17', '18-24', '25-34', '35-44', '45-54', '55+',
];

export interface LeaderboardFilters {
  exerciseId: string;
  country: string;
  gender: 'all' | 'male' | 'female';
  ageCategory: AgeCategory;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  author_name: string;
  published_at: string;
  created_at: string;
}

export interface WeeklyWod {
  id: string;
  title: string;
  format: string;
  exercises: WodExercise[];
  emom_schedule?: EmomInterval[] | null;
  time_cap_minutes?: number | null;
  amrap_minutes?: number | null;
  emom_minutes?: number | null;
  emom_interval_seconds?: number | null;
  rounds?: number | null;
  reps_scheme?: string | null;
  cash_in?: WodExercise[] | null;
  cash_out?: WodExercise[] | null;
  description?: string | null;
  week_start: string;
  created_at: string;
}

export interface UserWod {
  id: string;
  user_id: string;
  title: string;
  format: string;
  exercises: WodExercise[];
  emom_schedule?: EmomInterval[] | null;
  time_cap_minutes?: number | null;
  amrap_minutes?: number | null;
  emom_minutes?: number | null;
  emom_interval_seconds?: number | null;
  rounds?: number | null;
  reps_scheme?: string | null;
  cash_in?: WodExercise[] | null;
  cash_out?: WodExercise[] | null;
  description?: string | null;
  is_public: boolean;
  created_at: string;
  profiles?: { username: string; country: string } | null;
}

export interface WodExercise {
  exerciseId: string;
  name: string;
  reps: number;
  weight?: number;
  weightRxMale?: number;
  weightRxFemale?: number;
  weightScaledMale?: number;
  weightScaledFemale?: number;
  category: string;
  unit: string;
  useRepsScheme?: boolean;
}

export interface EmomInterval {
  minute: number;
  exercises: WodExercise[];
}

export const COUNTRIES = [
  { code: 'DE', name: 'Alemania', flag: '🇩🇪' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
  { code: 'CA', name: 'Canadá', flag: '🇨🇦' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
  { code: 'ES', name: 'España', flag: '🇪🇸' },
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
  { code: 'FR', name: 'Francia', flag: '🇫🇷' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
  { code: 'IT', name: 'Italia', flag: '🇮🇹' },
  { code: 'MX', name: 'México', flag: '🇲🇽' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
  { code: 'PA', name: 'Panamá', flag: '🇵🇦' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'PE', name: 'Perú', flag: '🇵🇪' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷' },
  { code: 'GB', name: 'Reino Unido', flag: '🇬🇧' },
  { code: 'DO', name: 'Rep. Dominicana', flag: '🇩🇴' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'OTHER', name: 'Otro', flag: '🌍' },
] as const;

export function getCountryFlag(code: string): string {
  return COUNTRIES.find((c) => c.code === code)?.flag || '🌍';
}

export function getCountryName(code: string): string {
  return COUNTRIES.find((c) => c.code === code)?.name || code;
}

export const COMMUNITY_EXERCISES: Record<string, string> = {
  back_squat: 'Back Squat',
  front_squat: 'Front Squat',
  overhead_squat: 'Overhead Squat',
  deadlift: 'Deadlift',
  sumo_deadlift: 'Sumo Deadlift',
  power_clean: 'Power Clean',
  squat_clean: 'Squat Clean',
  power_snatch: 'Power Snatch',
  squat_snatch: 'Squat Snatch',
  clean_jerk: 'Clean & Jerk',
  push_press: 'Push Press',
  push_jerk: 'Push Jerk',
  split_jerk: 'Split Jerk',
  bench_press: 'Bench Press',
  strict_press: 'Strict Press',
  thruster: 'Thruster',
  cluster: 'Cluster',
};

export const COMMUNITY_EXERCISE_IDS = Object.keys(COMMUNITY_EXERCISES);
