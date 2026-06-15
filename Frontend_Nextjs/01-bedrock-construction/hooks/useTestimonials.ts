'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Testimonial } from '@/lib/content/types';

export function useTestimonials(items: Testimonial[]) {
  const [index, setIndex] = useState(0);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || items.length <= 1) return;
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, [items.length, next]);

  return { current: items[index], prev, next };
}
