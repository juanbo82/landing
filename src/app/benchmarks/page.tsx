import type { Metadata } from 'next';
import { BENCHMARK_WODS, getBenchmarksByCategory } from '@/lib/benchmarks';
import FormatBadge from '@/components/FormatBadge';
import DownloadCTA from '@/components/DownloadCTA';

export const metadata: Metadata = {
  title: 'Benchmark WODs — The Girls, Heroes y más',
  description:
    'Catálogo completo de benchmark WODs de CrossFit: Fran, Grace, Murph, Cindy y más. Ejercicios, pesos RX y descripciones.',
};

export default function BenchmarksPage() {
  const girls = getBenchmarksByCategory('girls');
  const heroes = getBenchmarksByCategory('heroes');

  return (
    <>
      <section className="py-10 px-5">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.2em] text-accent bg-accent-15 px-2.5 py-1 rounded mb-4">
            BENCHMARKS
          </span>
          <h1 className="font-oswald text-3xl md:text-5xl font-bold uppercase mb-2">
            Benchmark WODs
          </h1>
          <p className="text-text-secondary mb-10 max-w-xl">
            Los WODs clásicos de CrossFit. Úsalos para medir tu progreso a lo largo del tiempo.
          </p>

          {/* The Girls */}
          <h2 className="font-oswald text-2xl font-semibold tracking-wide uppercase mb-5 flex items-center gap-2">
            <span className="text-accent">👩</span> The Girls
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {girls.map((wod) => (
              <BenchmarkCard key={wod.id} wod={wod} />
            ))}
          </div>

          {/* Heroes */}
          <h2 className="font-oswald text-2xl font-semibold tracking-wide uppercase mb-5 flex items-center gap-2">
            <span className="text-accent">🎖️</span> Hero WODs
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {heroes.map((wod) => (
              <BenchmarkCard key={wod.id} wod={wod} />
            ))}
          </div>
        </div>
      </section>

      <DownloadCTA
        title="¿Listo para un benchmark?"
        description="Descarga StreetWOD, usa el cronómetro profesional y registra tu resultado para compararte con la comunidad."
      />
    </>
  );
}

function BenchmarkCard({ wod }: { wod: (typeof BENCHMARK_WODS)[number] }) {
  return (
    <div className="bg-surface border border-border rounded-lg p-5 hover:border-accent-30 hover:-translate-y-0.5 transition-all">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-oswald text-xl font-bold tracking-wide">{wod.title}</h3>
        <FormatBadge format={wod.format} />
      </div>

      {wod.description && (
        <p className="text-sm text-text-secondary mb-4 italic">{wod.description}</p>
      )}

      <div className="space-y-1.5 mb-4">
        {wod.reps_scheme && (
          <p className="text-xs font-semibold text-accent tracking-wide">{wod.reps_scheme}</p>
        )}
        {wod.rounds && (
          <p className="text-xs text-text-tertiary">{wod.rounds} rondas</p>
        )}
        {wod.amrap_minutes && (
          <p className="text-xs text-text-tertiary">AMRAP {wod.amrap_minutes} min</p>
        )}
        {wod.exercises.map((ex, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            <span>
              {ex.reps > 0 && `${ex.reps} `}
              {ex.name}
              {ex.weightRxMale && (
                <span className="text-text-tertiary">
                  {' '}({ex.weightRxMale}/{ex.weightRxFemale} kg)
                </span>
              )}
              {ex.unit === 'meters' && <span className="text-text-tertiary"> m</span>}
              {ex.unit === 'calories' && <span className="text-text-tertiary"> cal</span>}
            </span>
          </div>
        ))}
      </div>

      {wod.cash_in && wod.cash_in.length > 0 && (
        <div className="mb-2">
          <span className="text-[10px] text-text-tertiary tracking-widest uppercase">Cash In:</span>
          {wod.cash_in.map((ex, i) => (
            <span key={i} className="text-xs text-text-secondary ml-1">
              {ex.reps} {ex.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
