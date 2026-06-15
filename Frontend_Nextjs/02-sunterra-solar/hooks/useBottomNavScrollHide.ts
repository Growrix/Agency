'use client';

import { useEffect, useState } from 'react';

export function useBottomNavScrollHide() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    let stopTimer: ReturnType<typeof setTimeout> | null = null;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > lastY + 8 && y > 120) setHidden(true);
        else if (y < lastY - 8) setHidden(false);
        lastY = y;
        ticking = false;
        if (stopTimer) clearTimeout(stopTimer);
        stopTimer = setTimeout(() => setHidden(false), 600);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (stopTimer) clearTimeout(stopTimer);
    };
  }, []);

  return hidden;
}
