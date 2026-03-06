import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

async function getStats() {
  const [{ count: athletes }, { count: wods }] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('user_wods').select('*', { count: 'exact', head: true }).eq('is_public', true),
  ]);
  return { athletes: athletes ?? 0, wods: wods ?? 0 };
}

function PhoneMockup({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`phone-mockup w-[260px] lg:w-[280px] ${className}`}>
      <Image src={src} alt={alt} width={280} height={560} className="w-full rounded-3xl" />
    </div>
  );
}

export default async function HomePage() {
  const stats = await getStats();

  return (
    <>
      {/* HERO */}
      <header className="relative min-h-[90vh] flex items-center justify-center px-5 py-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(245,158,11,0.12), transparent 60%), radial-gradient(circle 400px at 20% 80%, rgba(59,130,246,0.06), transparent), radial-gradient(circle 300px at 80% 70%, rgba(139,92,246,0.05), transparent)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 max-w-xl text-center lg:text-left">
            <p className="font-oswald text-xs font-semibold tracking-[0.2em] text-accent mb-4">
              LA COMUNIDAD QUE TE HACE MEJOR ATLETA
            </p>
            <h1 className="font-oswald text-4xl md:text-6xl font-bold uppercase mb-4">
              Compite. Conecta.<br />Supérate.
            </h1>
            <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto lg:mx-0">
              Rankings mundiales en tiempo real, WODs compartidos, benchmarks, duelos 1vs1 y mucho más.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
              <a
                href="https://play.google.com/store/apps/details?id=com.streetwod.timer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent text-bg font-oswald font-semibold tracking-wider px-6 py-3 rounded-md hover:shadow-[0_6px_24px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.6l2.302 1.317-2.56 1.46-2.442-2.442 2.7-2.7zm-3.907-2.308L4.864 0.165l10.937 6.333-2.01 2.301z" />
                </svg>
                Descargar App
              </a>
              <Link
                href="/leaderboard"
                className="inline-flex items-center justify-center gap-2 font-oswald font-semibold tracking-wider px-6 py-3 rounded-md border border-border text-text-secondary hover:border-accent-30 hover:text-accent transition-all"
              >
                Ver Rankings
              </Link>
            </div>

            <div className="inline-flex items-center gap-6 bg-surface border border-border rounded-lg px-6 py-4">
              <div className="text-center">
                <span className="block font-oswald text-2xl font-bold text-accent">
                  {stats.athletes.toLocaleString()}
                </span>
                <span className="text-[10px] text-text-tertiary tracking-widest uppercase">Atletas</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <span className="block font-oswald text-2xl font-bold text-accent">
                  {stats.wods.toLocaleString()}
                </span>
                <span className="text-[10px] text-text-tertiary tracking-widest uppercase">WODs</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <span className="block font-oswald text-2xl font-bold text-accent">6</span>
                <span className="text-[10px] text-text-tertiary tracking-widest uppercase">Timers</span>
              </div>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="hidden lg:block flex-shrink-0">
            <PhoneMockup src="/screen-home.png" alt="StreetWOD App" className="animate-float" />
          </div>
        </div>
      </header>

      {/* FEATURE SECTIONS */}
      <section className="py-16 px-5 bg-bg-alt">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.2em] text-accent bg-accent-15 px-2.5 py-1 rounded mb-4">
            EXPLORA
          </span>
          <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase mb-10">
            Contenido en tiempo real
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            <Link
              href="/leaderboard"
              className="group bg-surface border border-border rounded-lg p-6 hover:border-accent-30 hover:-translate-y-1 transition-all"
            >
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-oswald text-lg font-semibold tracking-wide mb-2 group-hover:text-accent transition-colors">
                Rankings Mundiales
              </h3>
              <p className="text-sm text-text-secondary">
                Clasificaciones globales de RMs filtradas por ejercicio, país, género y edad. Datos reales de la comunidad.
              </p>
            </Link>

            <Link
              href="/wods"
              className="group bg-surface border border-border rounded-lg p-6 hover:border-accent-30 hover:-translate-y-1 transition-all"
            >
              <div className="text-3xl mb-3">💪</div>
              <h3 className="font-oswald text-lg font-semibold tracking-wide mb-2 group-hover:text-accent transition-colors">
                WODs de la Comunidad
              </h3>
              <p className="text-sm text-text-secondary">
                Descubre WODs creados por atletas de todo el mundo. For Time, EMOM, AMRAP, Tabata y más.
              </p>
            </Link>

            <Link
              href="/benchmarks"
              className="group bg-surface border border-border rounded-lg p-6 hover:border-accent-30 hover:-translate-y-1 transition-all"
            >
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-oswald text-lg font-semibold tracking-wide mb-2 group-hover:text-accent transition-colors">
                Benchmark WODs
              </h3>
              <p className="text-sm text-text-secondary">
                The Girls, Heroes y más. El catálogo completo de benchmarks clásicos de CrossFit con detalle de ejercicios.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.2em] text-accent bg-accent-15 px-2.5 py-1 rounded mb-4">
                COMUNIDAD
              </span>
              <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase mb-3">
                No entrenes solo.<br />Entrena con propósito.
              </h2>
              <p className="text-text-secondary max-w-xl mb-10">
                StreetWOD es más que un cronómetro. Es una red de atletas que compiten, se retan y se superan juntos.
              </p>

              <div className="grid sm:grid-cols-3 gap-5">
                <div className="bg-surface border border-accent-30 rounded-lg p-6 bg-gradient-to-br from-accent-15 to-surface">
                  <div className="text-3xl mb-3">⚔️</div>
                  <h3 className="font-oswald text-lg font-semibold tracking-wide mb-2">Duelos 1vs1</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Reta a cualquier atleta a completar el mismo WOD. Compara tiempos y acumula victorias.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="text-xs text-text-tertiary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Elige el WOD del duelo
                    </li>
                    <li className="text-xs text-text-tertiary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Registra y confirma resultados
                    </li>
                    <li className="text-xs text-text-tertiary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Historial y estadísticas VS
                    </li>
                  </ul>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <div className="text-3xl mb-3">🏆</div>
                  <h3 className="font-oswald text-lg font-semibold tracking-wide mb-2">Rankings mundiales</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Registra tus RMs con vídeo y compite en clasificaciones globales.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="text-xs text-text-tertiary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" /> 17 ejercicios de halterofilia
                    </li>
                    <li className="text-xs text-text-tertiary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Verificación por vídeo
                    </li>
                    <li className="text-xs text-text-tertiary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Percentil y comparativa
                    </li>
                  </ul>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6">
                  <div className="text-3xl mb-3">👥</div>
                  <h3 className="font-oswald text-lg font-semibold tracking-wide mb-2">Sigue atletas</h3>
                  <p className="text-sm text-text-secondary mb-4">
                    Feed de actividad en tiempo real: WODs completados, duelos ganados, nuevos RMs.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="text-xs text-text-tertiary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Feed personalizado
                    </li>
                    <li className="text-xs text-text-tertiary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Chat entre seguidores mutuos
                    </li>
                    <li className="text-xs text-text-tertiary flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Perfiles con box y país
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phone mockup - Duels */}
            <div className="hidden lg:block flex-shrink-0">
              <PhoneMockup src="/screen-duels.png" alt="Estadísticas de Duelos" className="animate-float-delay" />
            </div>
          </div>
        </div>
      </section>

      {/* AI TECHNIQUE ANALYSIS */}
      <section className="py-16 px-5 bg-bg-alt relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(245,158,11,0.08), transparent 70%)',
          }}
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.2em] text-accent bg-accent-15 px-2.5 py-1 rounded mb-4">
                INTELIGENCIA ARTIFICIAL
              </span>
              <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase mb-3">
                Tu coach de IA<br />analiza cada repetición
              </h2>
              <p className="text-text-secondary max-w-xl mb-8">
                Graba tus levantamientos al registrar un RM y nuestra IA analiza tu técnica en segundos.
                Recibe una puntuación detallada por cada fase del movimiento, identifica debilidades y
                obtén drills específicos para mejorar.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <strong className="block text-sm mb-0.5">Puntuación por fases</strong>
                    <p className="text-sm text-text-secondary">Setup, tracción, recepción, recovery... cada fase evaluada de 0 a 10.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <strong className="block text-sm mb-0.5">Feedback instantáneo</strong>
                    <p className="text-sm text-text-secondary">Fortalezas, debilidades y recomendaciones concretas en segundos.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <strong className="block text-sm mb-0.5">Historial de progreso</strong>
                    <p className="text-sm text-text-secondary">Compara tus análisis a lo largo del tiempo y mide tu evolución técnica.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🏋️</span>
                  <div>
                    <strong className="block text-sm mb-0.5">17 ejercicios soportados</strong>
                    <p className="text-sm text-text-secondary">Squat, clean, snatch, jerk, deadlift, press y todas sus variantes.</p>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-3 bg-surface border border-accent-30 rounded-lg px-5 py-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-15">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </span>
                <span className="text-sm text-text-secondary">
                  Powered by <strong className="text-accent">Gemini AI</strong> — análisis de vídeo con inteligencia artificial de Google
                </span>
              </div>
            </div>

            <div className="hidden lg:block flex-shrink-0">
              <PhoneMockup src="/screen-ai-analysis.png" alt="Análisis de técnica con IA" className="animate-float-delay" />
            </div>
          </div>
        </div>
      </section>

      {/* WOD BUILDER */}
      <section className="py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.2em] text-accent bg-accent-15 px-2.5 py-1 rounded mb-4">
            WOD BUILDER
          </span>
          <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase mb-3">
            Crea, comparte y<br />descubre WODs
          </h2>
          <p className="text-text-secondary max-w-xl mb-10">
            Diseña entrenamientos completos con nuestro catálogo de ejercicios, esquemas de reps, Cash In/Out y estimaciones automáticas.
          </p>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              {[
                { title: 'Todos los formatos', desc: 'For Time, EMOM, AMRAP, Tabata, Chipper y personalizado' },
                { title: 'Esquema de reps', desc: '21-15-9, 10-8-6-4-2… elige qué ejercicios siguen el esquema' },
                { title: 'Cash In y Cash Out', desc: 'Añade calentamiento previo y trabajo posterior' },
                { title: 'Estimaciones de tiempo', desc: 'Cálculo automático por nivel: principiante, intermedio y RX' },
                { title: 'Explora y comparte', desc: 'Descubre WODs de la comunidad y compártelos' },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <span className="w-2 h-2 min-w-[8px] rounded-full bg-accent mt-1.5" />
                  <div>
                    <strong className="block text-sm mb-0.5">{f.title}</strong>
                    <p className="text-sm text-text-secondary">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { label: 'For Time', color: 'border-sw-red/40 text-sw-red' },
                { label: 'EMOM', color: 'border-sw-blue/40 text-sw-blue' },
                { label: 'AMRAP', color: 'border-sw-green/40 text-sw-green' },
                { label: 'Tabata', color: 'border-accent/40 text-accent' },
                { label: 'Chipper', color: 'border-sw-purple/40 text-sw-purple' },
                { label: 'Custom', color: 'border-text-tertiary/40 text-text-tertiary' },
              ].map((f) => (
                <span
                  key={f.label}
                  className={`font-oswald text-base font-semibold tracking-wider px-5 py-3 bg-surface border rounded-lg ${f.color}`}
                >
                  {f.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROGRESS + TIMERS */}
      <section className="py-16 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[auto_1fr] gap-12 items-center">
            {/* Phone mockup - Evolution */}
            <div className="hidden lg:flex justify-center flex-shrink-0">
              <PhoneMockup src="/screen-evolution.png" alt="Evolución de PRs" className="animate-float" />
            </div>

            <div>
              <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.2em] text-accent bg-accent-15 px-2.5 py-1 rounded mb-4">
                PROGRESO
              </span>
              <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase mb-8">
                Mide tu evolución,<br />semana a semana
              </h2>

              <div className="grid sm:grid-cols-3 gap-4 mb-12">
                <div className="bg-surface border border-border rounded-lg p-5">
                  <div className="text-2xl mb-2">📅</div>
                  <h3 className="font-oswald font-semibold tracking-wide mb-1">WOD semanal</h3>
                  <p className="text-sm text-text-secondary">Cada semana un nuevo WOD para toda la comunidad. Compárate y acumula rachas.</p>
                </div>
                <div className="bg-surface border border-border rounded-lg p-5">
                  <div className="text-2xl mb-2">📈</div>
                  <h3 className="font-oswald font-semibold tracking-wide mb-1">Evolución de RMs</h3>
                  <p className="text-sm text-text-secondary">Gráficas de progreso, percentil global y comparativa con la media de atletas.</p>
                </div>
                <div className="bg-surface border border-border rounded-lg p-5">
                  <div className="text-2xl mb-2">🎖️</div>
                  <h3 className="font-oswald font-semibold tracking-wide mb-1">Logros y stats</h3>
                  <p className="text-sm text-text-secondary">WODs completados, racha actual, mejor racha, tasa RX y badges.</p>
                </div>
              </div>

              <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.2em] text-accent bg-accent-15 px-2.5 py-1 rounded mb-4">
                CRONÓMETROS
              </span>
              <h2 className="font-oswald text-2xl font-bold uppercase mb-4">
                6 timers profesionales
              </h2>
              <p className="text-text-secondary max-w-lg mb-6">
                Diseñados para CrossFit: sonidos, cuenta atrás, pantalla siempre encendida y barra de progreso visual.
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'EMOM', color: 'bg-sw-blue' },
                  { label: 'AMRAP', color: 'bg-sw-green' },
                  { label: 'For Time', color: 'bg-sw-red' },
                  { label: 'Tabata', color: 'bg-accent' },
                  { label: 'Countdown', color: 'bg-sw-purple' },
                  { label: 'Custom', color: 'bg-text-tertiary' },
                ].map((t) => (
                  <div
                    key={t.label}
                    className="flex items-center gap-2 font-oswald text-sm font-semibold tracking-wider px-4 py-3 bg-surface border border-border rounded-lg"
                  >
                    <span className={`w-2 h-2 rounded-full ${t.color}`} />
                    {t.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-5 bg-gradient-to-b from-bg to-bg-alt">
        <div className="max-w-xl mx-auto text-center">
          <span className="font-oswald text-2xl font-bold tracking-wider text-accent block mb-4">
            STREETWOD
          </span>
          <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase mb-3">
            Únete a la comunidad
          </h2>
          <p className="text-text-secondary mb-8">
            StreetWOD ya está disponible en Google Play. Duelos, rankings, WODs compartidos y mucho más.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.streetwod.timer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-accent-15 border border-accent-30 rounded-lg text-accent font-semibold hover:bg-accent-30 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.6l2.302 1.317-2.56 1.46-2.442-2.442 2.7-2.7zm-3.907-2.308L4.864 0.165l10.937 6.333-2.01 2.301z" />
            </svg>
            Disponible en Google Play
          </a>
        </div>
      </section>
    </>
  );
}
