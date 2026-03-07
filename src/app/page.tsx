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

function AiBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/25 text-accent text-[11px] font-oswald font-semibold tracking-widest px-3 py-1 rounded-full">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
      POWERED BY AI
    </span>
  );
}

export default async function HomePage() {
  const stats = await getStats();

  return (
    <>
      {/* HERO — AI-first messaging */}
      <header className="relative min-h-[95vh] flex items-center justify-center px-5 py-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.14), transparent 55%), radial-gradient(circle 500px at 30% 80%, rgba(59,130,246,0.07), transparent), radial-gradient(circle 400px at 75% 60%, rgba(139,92,246,0.06), transparent)',
          }}
        />
        <div className="absolute inset-0 pointer-events-none ai-grid-bg opacity-[0.03]" />

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <AiBadge />

            <h1 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold uppercase mt-5 mb-5 leading-[1.1]">
              La app más completa<br />
              de Cross Training con<br />
              <span className="text-accent ai-glow-text">IA Avanzada</span>
            </h1>

            <p className="text-text-secondary text-lg md:text-xl mb-4 max-w-xl mx-auto lg:mx-0">
              Analiza tu técnica con inteligencia artificial, compite en rankings mundiales, reta a otros atletas y lleva tu entrenamiento al siguiente nivel.
            </p>

            <p className="text-sm text-text-tertiary mb-8 max-w-lg mx-auto lg:mx-0">
              Rankings en tiempo real · WODs compartidos · Benchmarks · Duelos 1vs1 · Análisis de vídeo con Gemini AI · 6 cronómetros profesionales
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
              <a
                href="https://play.google.com/store/apps/details?id=com.streetwod.timer"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-accent text-bg font-oswald font-semibold tracking-wider px-7 py-3.5 rounded-md hover:shadow-[0_6px_30px_rgba(245,158,11,0.35)] hover:-translate-y-0.5 transition-all text-base"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.6l2.302 1.317-2.56 1.46-2.442-2.442 2.7-2.7zm-3.907-2.308L4.864 0.165l10.937 6.333-2.01 2.301z" />
                </svg>
                Descargar Gratis
              </a>
              <Link
                href="/leaderboard"
                className="inline-flex items-center justify-center gap-2 font-oswald font-semibold tracking-wider px-7 py-3.5 rounded-md border border-border text-text-secondary hover:border-accent/30 hover:text-accent transition-all text-base"
              >
                Ver Rankings
              </Link>
            </div>

            <div className="inline-flex items-center gap-6 bg-surface/80 backdrop-blur-sm border border-border rounded-lg px-6 py-4">
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
                <span className="block font-oswald text-2xl font-bold text-accent">17</span>
                <span className="text-[10px] text-text-tertiary tracking-widest uppercase">Ejercicios IA</span>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <span className="block font-oswald text-2xl font-bold text-accent">6</span>
                <span className="text-[10px] text-text-tertiary tracking-widest uppercase">Timers</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block flex-shrink-0">
            <PhoneMockup src="/screen-ai-analysis.png" alt="Análisis IA de técnica" className="animate-float" />
          </div>
        </div>
      </header>

      {/* AI SHOWCASE — Sección protagonista */}
      <section className="relative py-20 px-5 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(245,158,11,0.10), transparent 60%), radial-gradient(circle 500px at 80% 80%, rgba(139,92,246,0.06), transparent)',
          }}
        />
        <div className="absolute inset-0 pointer-events-none ai-grid-bg opacity-[0.02]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.25em] text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full mb-5">
              INTELIGENCIA ARTIFICIAL AVANZADA
            </span>
            <h2 className="font-oswald text-3xl md:text-5xl font-bold uppercase mb-4">
              Tu coach personal con<br />
              <span className="text-accent">Gemini AI de Google</span>
            </h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Graba tus levantamientos y nuestra IA analiza tu técnica en segundos. Puntuación detallada, correcciones específicas y drills personalizados para cada fase del movimiento.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            <div className="ai-feature-card group bg-surface border border-accent/20 rounded-xl p-6 hover:border-accent/40 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <h3 className="font-oswald text-lg font-semibold tracking-wide mb-2">Análisis por fases</h3>
                <p className="text-sm text-text-secondary">Setup, tracción, recepción, recovery — cada fase evaluada de 0 a 10 con detalle.</p>
              </div>
            </div>

            <div className="ai-feature-card group bg-surface border border-accent/20 rounded-xl p-6 hover:border-accent/40 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <h3 className="font-oswald text-lg font-semibold tracking-wide mb-2">Feedback instantáneo</h3>
                <p className="text-sm text-text-secondary">Fortalezas, debilidades y correcciones concretas en segundos tras grabar tu vídeo.</p>
              </div>
            </div>

            <div className="ai-feature-card group bg-surface border border-accent/20 rounded-xl p-6 hover:border-accent/40 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <h3 className="font-oswald text-lg font-semibold tracking-wide mb-2">Evolución técnica</h3>
                <p className="text-sm text-text-secondary">Compara tus análisis en el tiempo y mide cómo mejora tu técnica entrenamiento a entrenamiento.</p>
              </div>
            </div>

            <div className="ai-feature-card group bg-surface border border-accent/20 rounded-xl p-6 hover:border-accent/40 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" y1="22" x2="4" y2="15" />
                  </svg>
                </div>
                <h3 className="font-oswald text-lg font-semibold tracking-wide mb-2">Drills personalizados</h3>
                <p className="text-sm text-text-secondary">Ejercicios correctivos específicos para tus debilidades, generados por IA según tu análisis.</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div className="bg-surface/50 backdrop-blur-sm border border-border rounded-2xl p-8 lg:p-10">
              <h3 className="font-oswald text-2xl font-bold uppercase mb-6">
                Así funciona el análisis
              </h3>
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Graba tu levantamiento', desc: 'Al registrar un RM, graba el vídeo desde la app. La IA acepta cualquier ángulo.' },
                  { step: '02', title: 'La IA analiza cada fase', desc: 'Gemini procesa el vídeo y evalúa setup, tracción, recepción y recovery de 0 a 10.' },
                  { step: '03', title: 'Recibe tu informe completo', desc: 'Puntuación global, desglose por fases, puntos fuertes, debilidades y drills correctivos.' },
                  { step: '04', title: 'Mejora y compara', desc: 'Repite, compara análisis anteriores y observa cómo evoluciona tu técnica semana a semana.' },
                ].map((s) => (
                  <div key={s.step} className="flex items-start gap-4">
                    <span className="font-oswald text-2xl font-bold text-accent/40 min-w-[40px]">{s.step}</span>
                    <div>
                      <strong className="block text-base mb-0.5">{s.title}</strong>
                      <p className="text-sm text-text-secondary">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 rounded-lg px-4 py-2.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <span className="text-sm font-medium">
                    Powered by <strong className="text-accent">Gemini AI</strong>
                  </span>
                </div>
                <span className="text-sm text-text-tertiary">
                  17 ejercicios: Squat, Clean, Snatch, Jerk, Deadlift, Press y variantes
                </span>
              </div>
            </div>

            <div className="hidden lg:block flex-shrink-0">
              <PhoneMockup src="/screen-home.png" alt="StreetWOD App" className="animate-float-delay" />
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE */}
      <section className="py-16 px-5 bg-bg-alt">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.2em] text-accent bg-accent/10 px-2.5 py-1 rounded mb-4">
            EXPLORA
          </span>
          <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase mb-10">
            Contenido en tiempo real
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            <Link
              href="/leaderboard"
              className="group bg-surface border border-border rounded-lg p-6 hover:border-accent/30 hover:-translate-y-1 transition-all"
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
              className="group bg-surface border border-border rounded-lg p-6 hover:border-accent/30 hover:-translate-y-1 transition-all"
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
              className="group bg-surface border border-border rounded-lg p-6 hover:border-accent/30 hover:-translate-y-1 transition-all"
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
              <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.2em] text-accent bg-accent/10 px-2.5 py-1 rounded mb-4">
                COMUNIDAD
              </span>
              <h2 className="font-oswald text-3xl md:text-4xl font-bold uppercase mb-3">
                No entrenes solo.<br />Entrena con propósito.
              </h2>
              <p className="text-text-secondary max-w-xl mb-10">
                StreetWOD es más que un cronómetro. Es una red de atletas que compiten, se retan y se superan juntos.
              </p>

              <div className="grid sm:grid-cols-3 gap-5">
                <div className="bg-surface border border-accent/30 rounded-lg p-6 bg-gradient-to-br from-accent/10 to-surface">
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

            <div className="hidden lg:block flex-shrink-0">
              <PhoneMockup src="/screen-duels.png" alt="Estadísticas de Duelos" className="animate-float-delay" />
            </div>
          </div>
        </div>
      </section>

      {/* WOD BUILDER */}
      <section className="py-16 px-5 bg-bg-alt">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.2em] text-accent bg-accent/10 px-2.5 py-1 rounded mb-4">
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
            <div className="hidden lg:flex justify-center flex-shrink-0">
              <PhoneMockup src="/screen-evolution.png" alt="Evolución de PRs" className="animate-float" />
            </div>

            <div>
              <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.2em] text-accent bg-accent/10 px-2.5 py-1 rounded mb-4">
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

              <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.2em] text-accent bg-accent/10 px-2.5 py-1 rounded mb-4">
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
      <section className="relative py-24 px-5 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(245,158,11,0.08), transparent 70%)',
          }}
        />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <AiBadge />
          <h2 className="font-oswald text-3xl md:text-5xl font-bold uppercase mt-5 mb-4">
            Empieza a entrenar<br />con <span className="text-accent">inteligencia artificial</span>
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-lg mx-auto">
            Únete a la comunidad de atletas que ya mejoran su técnica con IA avanzada. Rankings, duelos, WODs y mucho más.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.streetwod.timer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-bg font-oswald font-semibold tracking-wider rounded-md hover:shadow-[0_6px_30px_rgba(245,158,11,0.35)] hover:-translate-y-0.5 transition-all text-base"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.6l2.302 1.317-2.56 1.46-2.442-2.442 2.7-2.7zm-3.907-2.308L4.864 0.165l10.937 6.333-2.01 2.301z" />
            </svg>
            Descargar Gratis en Google Play
          </a>
          <p className="text-xs text-text-tertiary mt-4">Disponible en Android. iOS próximamente.</p>
        </div>
      </section>
    </>
  );
}
