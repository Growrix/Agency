"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "@/components/motion/Motion";
import { cn } from "@/lib/utils";
import {
  applyTheme,
  DEFAULT_THEME,
  persistTheme,
  readStoredTheme,
  type ThemeMode,
} from "@/lib/theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<ThemeMode>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = readStoredTheme();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-flag pattern needed to avoid SSR/CSR theme mismatch
    setMounted(true);
    setMode(stored);
    applyTheme(stored);
    persistTheme(stored);
  }, []);

  function cycle() {
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    setMode(next);
    persistTheme(next);
    applyTheme(next);
  }

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-inset touch-manipulation",
          className
        )}
      >
        <MoonIcon className="size-5" aria-hidden />
      </button>
    );
  }

  const isDark = mode === "dark";
  const label = `Theme: ${mode}. Click to switch to ${isDark ? "light" : "dark"}.`;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className={cn(
        "relative inline-flex size-11 items-center justify-center overflow-hidden rounded-full transition-colors hover:bg-inset touch-manipulation",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex"
        >
          {isDark ? <MoonIcon className="size-5" aria-hidden /> : <SunIcon className="size-5" aria-hidden />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function ThemeToggleButton({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<ThemeMode>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = readStoredTheme();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-flag pattern needed to avoid SSR/CSR theme mismatch
    setMounted(true);
    setMode(stored);
    applyTheme(stored);
    persistTheme(stored);
  }, []);

  function cycle() {
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    setMode(next);
    persistTheme(next);
    applyTheme(next);
  }

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-inset touch-manipulation",
          className
        )}
      >
        <MoonIcon className="size-5" aria-hidden />
      </button>
    );
  }

  const isDark = mode === "dark";
  const label = `Theme: ${isDark ? "dark" : "light"}. Click to switch to ${isDark ? "light" : "dark"}.`;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className={cn(
        "relative inline-flex size-11 items-center justify-center overflow-hidden rounded-full transition-colors hover:bg-inset touch-manipulation",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex"
        >
          {isDark ? <MoonIcon className="size-5" aria-hidden /> : <SunIcon className="size-5" aria-hidden />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
