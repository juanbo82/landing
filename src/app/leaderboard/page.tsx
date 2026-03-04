import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { COMMUNITY_EXERCISES, COMMUNITY_EXERCISE_IDS } from '@/lib/types';
import DownloadCTA from '@/components/DownloadCTA';
import LeaderboardClient from './LeaderboardClient';

export const metadata: Metadata = {
  title: 'Rankings Mundiales',
  description:
    'Rankings globales de CrossFit por ejercicio. Compara tu fuerza con atletas de todo el mundo. Back Squat, Deadlift, Clean & Jerk y más.',
};

export const revalidate = 300; // revalidate every 5 min

async function getLeaderboard(exerciseId: string) {
  const { data } = await supabase
    .from('leaderboard_view')
    .select(
      'rm_id, user_id, username, weight, country, gender, avatar_url, video_url, is_verified, likes, fakes',
    )
    .eq('exercise_id', exerciseId)
    .eq('is_verified', true)
    .order('weight', { ascending: false })
    .limit(50);

  if (!data) return [];

  let position = 0;
  return data
    .map((entry) => {
      const likes = entry.likes || 0;
      const fakes = entry.fakes || 0;
      const isValid = fakes < likes + 5;
      if (isValid) position++;
      return { ...entry, likes, fakes, is_valid: isValid, position: isValid ? position : undefined };
    })
    .filter((e) => e.is_valid);
}

export default async function LeaderboardPage() {
  const defaultExercise = COMMUNITY_EXERCISE_IDS[0];
  const entries = await getLeaderboard(defaultExercise);

  return (
    <>
      <section className="py-10 px-5">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.2em] text-accent bg-accent-15 px-2.5 py-1 rounded mb-4">
            RANKINGS
          </span>
          <h1 className="font-oswald text-3xl md:text-5xl font-bold uppercase mb-2">
            Rankings Mundiales
          </h1>
          <p className="text-text-secondary mb-8 max-w-xl">
            Clasificaciones globales de RMs verificados con vídeo. Selecciona un ejercicio para ver el ranking.
          </p>

          <LeaderboardClient
            exercises={COMMUNITY_EXERCISES}
            exerciseIds={COMMUNITY_EXERCISE_IDS}
            initialEntries={entries}
            initialExercise={defaultExercise}
          />
        </div>
      </section>

      <DownloadCTA
        title="¿Quieres aparecer en el ranking?"
        description="Descarga la app, registra tu RM con vídeo y compite con atletas de todo el mundo."
      />
    </>
  );
}
