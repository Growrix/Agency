'use client';

import { useCallback, useState } from 'react';

export function useDrawer() {
  const [open, setOpen] = useState(false);

  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);
  const toggleDrawer = useCallback(() => setOpen((prev) => !prev), []);

  return { open, openDrawer, closeDrawer, toggleDrawer };
}
