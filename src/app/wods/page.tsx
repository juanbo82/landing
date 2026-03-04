import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import FormatBadge from '@/components/FormatBadge';
import DownloadCTA from '@/components/DownloadCTA';
import type { WeeklyWod, UserWod, WodExercise } from '@/lib/types';

export const metadata: Metadata = {
  title: 'WODs — Entrenamientos de CrossFit',
  description:
    'Descubre WODs de CrossFit creados por la comunidad StreetWOD. For Time, EMOM, AMRAP, Tabata, Chipper y más formatos.',
};

export const revalidate = 300;

async function getWeeklyWods() {
  const { data } = await supabase
    .from('weekly_wods')
    .select('*')
    .order('week_start', { ascending: false })
    .limit(6);
  return (data || []) as WeeklyWod[];
}

async function getPublicWods() {
  const { data } = await supabase
    .from('user_wods')
    .select('*, profiles(username, country)')
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(20);
  return (data || []) as UserWod[];
}

function formatExerciseList(exercises: WodExercise[]) {
  return exercises
    .slice(0, 4)
    .map((e) => {
      const weight = e.weightRxMale ? ` (${e.weightRxMale}kg)` : '';
      return `${e.reps} ${e.name}${weight}`;
    })
    .join(' + ');
}

export default async function WodsPage() {
  const [weeklyWods, publicWods] = await Promise.all([getWeeklyWods(), getPublicWods()]);

  return (
    <>
      <section className="py-10 px-5">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.2em] text-accent bg-accent-15 px-2.5 py-1 rounded mb-4">
            WODS
          </span>
          <h1 className="font-oswald text-3xl md:text-5xl font-bold uppercase mb-2">
            Entrenamientos
          </h1>
          <p className="text-text-secondary mb-10 max-w-xl">
            WODs semanales y entrenamientos creados por atletas de la comunidad. Cada semana nuevo contenido.
          </p>

          {/* Weekly WODs */}
          {weeklyWods.length > 0 && (
            <div className="mb-14">
              <h2 className="font-oswald text-xl font-semibold tracking-wide uppercase mb-5 flex items-center gap-2">
                <span className="text-accent">📅</span> WODs Semanales
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weeklyWods.map((wod) => (
                  <div
                    key={wod.id}
                    className="bg-surface border border-border rounded-lg p-5 hover:border-accent-30 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-oswald text-lg font-semibold tracking-wide">
                        {wod.title}
                      </h3>
                      <FormatBadge format={wod.format} />
                    </div>
                    <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                      {formatExerciseList(wod.exercises)}
                      {wod.exercises.length > 4 && '...'}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-text-tertiary">
                      {wod.rounds && <span>{wod.rounds} rondas</span>}
                      {wod.time_cap_minutes && <span>TC: {wod.time_cap_minutes} min</span>}
                      {wod.amrap_minutes && <span>{wod.amrap_minutes} min</span>}
                      {wod.reps_scheme && <span>{wod.reps_scheme}</span>}
                      <span className="ml-auto">
                        {new Date(wod.week_start).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Community WODs */}
          <h2 className="font-oswald text-xl font-semibold tracking-wide uppercase mb-5 flex items-center gap-2">
            <span className="text-accent">💪</span> WODs de la Comunidad
          </h2>
          {publicWods.length === 0 ? (
            <div className="bg-surface border border-border rounded-lg p-8 text-center text-text-tertiary">
              No hay WODs públicos aún.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {publicWods.map((wod) => (
                <div
                  key={wod.id}
                  className="bg-surface border border-border rounded-lg p-5 hover:border-accent-30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-oswald text-lg font-semibold tracking-wide">
                      {wod.title}
                    </h3>
                    <FormatBadge format={wod.format} />
                  </div>
                  <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                    {formatExerciseList(wod.exercises)}
                    {wod.exercises.length > 4 && '...'}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-text-tertiary">
                    {wod.rounds && <span>{wod.rounds} rondas</span>}
                    {wod.time_cap_minutes && <span>TC: {wod.time_cap_minutes} min</span>}
                    {wod.amrap_minutes && <span>{wod.amrap_minutes} min</span>}
                    {wod.reps_scheme && <span>{wod.reps_scheme}</span>}
                    {wod.profiles && (
                      <Link
                        href={`/athlete/${wod.profiles.username}`}
                        className="ml-auto hover:text-accent transition-colors"
                      >
                        por {wod.profiles.username}
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <DownloadCTA
        title="¿Quieres crear tus propios WODs?"
        description="Descarga StreetWOD y usa el WOD Builder para crear, compartir y descubrir entrenamientos."
      />
    </>
  );
}
