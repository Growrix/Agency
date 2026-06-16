'use client';

import { useCallback, useState } from 'react';

export function useFab() {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);
  const close = useCallback(() => setOpen(false), []);

  return { open, toggle, close };
}
