'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useFab() {
  const [open, setOpen] = useState(false);
  const mainRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback((refocus = false) => {
    setOpen(false);
    if (refocus) mainRef.current?.focus();
  }, []);

  const toggle = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;
      if (next) {
        requestAnimationFrame(() => {
          const first = menuRef.current?.querySelector('a') as HTMLAnchorElement | null;
          first?.focus();
        });
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) close(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  return { open, toggle, close, mainRef, menuRef };
}
