'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function RouteFocusManager() {
  const pathname = usePathname();
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const main = document.getElementById('main');
      if (!main) return;

      const heading = main.querySelector<HTMLElement>('h1');
      const target = heading ?? main;
      const hadTabIndex = target.hasAttribute('tabindex');

      if (!hadTabIndex) {
        target.setAttribute('tabindex', '-1');
      }

      target.focus({ preventScroll: true });

      if (!hadTabIndex) {
        target.addEventListener(
          'blur',
          () => {
            target.removeAttribute('tabindex');
          },
          { once: true },
        );
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
