import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getCountryFlag, getCountryName, COMMUNITY_EXERCISES } from '@/lib/types';
import DownloadCTA from '@/components/DownloadCTA';

interface Props {
  params: Promise<{ username: string }>;
}

async function getProfile(username: string) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();
  return data;
}

async function getUserRMs(userId: string) {
  const { data } = await supabase
    .from('user_rms')
    .select('*')
    .eq('user_id', userId)
    .eq('is_verified', true)
    .order('weight', { ascending: false });
  return data || [];
}

async function getUserWodStats(userId: string) {
  const { count } = await supabase
    .from('wod_results')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);
  return count ?? 0;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfile(username);
  if (!profile) return { title: 'Atleta no encontrado' };

  return {
    title: `${profile.username} — Perfil de Atleta`,
    description: `Perfil de ${profile.username} en StreetWOD. ${profile.box ? `Box: ${profile.box}.` : ''} País: ${getCountryName(profile.country)}. Records y estadísticas.`,
  };
}

export default async function AthletePage({ params }: Props) {
  const { username } = await params;
  const profile = await getProfile(decodeURIComponent(username));
  if (!profile) notFound();

  const [rms, wodsCompleted] = await Promise.all([
    getUserRMs(profile.id),
    getUserWodStats(profile.id),
  ]);

  return (
    <>
      <section className="py-10 px-5">
        <div className="max-w-4xl mx-auto">
          {/* Profile header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.username}
                width={96}
                height={96}
                className="rounded-full object-cover border-2 border-border"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-surface border-2 border-border flex items-center justify-center text-3xl font-bold text-text-tertiary">
                {profile.username[0]?.toUpperCase()}
              </div>
            )}

            <div className="text-center sm:text-left">
              <h1 className="font-oswald text-3xl md:text-4xl font-bold uppercase">
                {profile.username}
              </h1>
              <div className="flex items-center gap-3 mt-2 justify-center sm:justify-start text-text-secondary">
                <span className="text-lg">{getCountryFlag(profile.country)}</span>
                <span>{getCountryName(profile.country)}</span>
                {profile.box && (
                  <>
                    <span className="text-border">·</span>
                    <span>{profile.box}</span>
                  </>
                )}
              </div>
              <div className="flex gap-4 mt-4 justify-center sm:justify-start">
                <div className="bg-surface border border-border rounded-lg px-4 py-2 text-center">
                  <span className="block font-oswald text-xl font-bold text-accent">{rms.length}</span>
                  <span className="text-[10px] text-text-tertiary tracking-widest uppercase">RMs</span>
                </div>
                <div className="bg-surface border border-border rounded-lg px-4 py-2 text-center">
                  <span className="block font-oswald text-xl font-bold text-accent">{wodsCompleted}</span>
                  <span className="text-[10px] text-text-tertiary tracking-widest uppercase">WODs</span>
                </div>
              </div>
            </div>
          </div>

          {/* RMs */}
          {rms.length > 0 && (
            <div>
              <h2 className="font-oswald text-xl font-semibold tracking-wide uppercase mb-4">
                Records Máximos (1RM)
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {rms.map((rm) => (
                  <div
                    key={rm.id}
                    className="bg-surface border border-border rounded-lg p-4 flex items-center justify-between hover:border-accent-30 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {COMMUNITY_EXERCISES[rm.exercise_id] || rm.exercise_id}
                      </p>
                      <p className="font-oswald text-xl font-bold text-accent mt-0.5">
                        {rm.weight}<span className="text-sm text-text-tertiary ml-1">kg</span>
                      </p>
                    </div>
                    {rm.video_url && (
                      <a
                        href={rm.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 text-xl"
                        title="Ver vídeo"
                      >
                        ▶
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {rms.length === 0 && (
            <div className="bg-surface border border-border rounded-lg p-8 text-center text-text-tertiary">
              Este atleta aún no ha registrado records máximos verificados.
            </div>
          )}
        </div>
      </section>

      <DownloadCTA
        title="¿Quieres tu propio perfil?"
        description="Descarga StreetWOD, registra tus RMs con vídeo y comparte tu perfil con la comunidad."
      />
    </>
  );
}
