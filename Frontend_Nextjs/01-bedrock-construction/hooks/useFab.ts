'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useFab() {
  const [open, setOpen] = useState(false);
  const mainRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    mainRef.current?.setAttribute('aria-expanded', 'false');
  }, []);

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      mainRef.current?.setAttribute('aria-expanded', String(next));
      return next;
    });
  }, []);

  useEffect(() => {
    const topBtn = document.getElementById('fab-top');
    const onScroll = () => {
      if (topBtn) topBtn.style.display = window.scrollY > 600 ? 'grid' : 'none';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    close();
  }, [close]);

  return { open, toggle, close, scrollTop, mainRef };
}
