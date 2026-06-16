'use client';

import { useEffect, useRef, useState } from 'react';

interface ScrollDirectionOptions {
  hideAfter?: number;
  minimumDelta?: number;
}

export function useScrollDirection(options?: ScrollDirectionOptions) {
  const hideAfter = options?.hideAfter ?? 96;
  const minimumDelta = options?.minimumDelta ?? 8;
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY.current;

      if (currentY <= hideAfter) {
        setHidden(false);
      } else if (Math.abs(delta) >= minimumDelta) {
        setHidden(delta > 0);
      }

      lastY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hideAfter, minimumDelta]);

  return hidden;
}
