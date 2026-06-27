"use client";

import { useEffect } from "react";
import { applyTheme, persistTheme, readStoredTheme } from "@/lib/theme";

/** Applies stored theme on client navigation (inline script handles first paint). */
export function ThemeInit() {
  useEffect(() => {
    const stored = readStoredTheme();
    applyTheme(stored);
    persistTheme(stored);
  }, []);

  return null;
}
