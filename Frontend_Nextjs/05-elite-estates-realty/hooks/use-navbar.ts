'use client';

import { useEffect, useState } from 'react';

export function useNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let rafId = 0;
    let lastValue = window.scrollY > 24;
    setScrolled(lastValue);

    const update = () => {
      rafId = 0;
      const nextValue = window.scrollY > 24;
      if (nextValue === lastValue) return;
      lastValue = nextValue;
      setScrolled(nextValue);
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return { scrolled };
}
