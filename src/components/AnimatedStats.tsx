'use client';

import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

interface Stat {
  value: number;
  label: string;
}

export default function AnimatedStats({ stats }: { stats: Stat[] }) {
  const counters = stats.map((s) => useCountUp(s.value));

  return (
    <div className="inline-flex items-center gap-6 bg-surface/80 backdrop-blur-sm border border-border rounded-lg px-6 py-4">
      {stats.map((stat, i) => (
        <div key={stat.label} className="contents">
          {i > 0 && <div className="w-px h-8 bg-border" />}
          <div className="text-center" ref={counters[i].ref}>
            <span className="block font-oswald text-2xl font-bold text-accent">
              {counters[i].value.toLocaleString()}
            </span>
            <span className="text-[10px] text-text-tertiary tracking-widest uppercase">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
