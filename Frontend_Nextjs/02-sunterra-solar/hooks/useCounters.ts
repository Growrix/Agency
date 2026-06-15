'use client';

import { useEffect, useRef } from 'react';
import { formatThousands } from '@/lib/solar/calculator';

export function useCounter(target: number | undefined) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || target === undefined) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      el.textContent = formatThousands(target);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          let start: number | null = null;
          const dur = 1400;
          const step = (ts: number) => {
            if (!start) start = ts;
            const t = Math.min((ts - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = formatThousands(Math.round(target * eased));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return ref;
}
