"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "@/components/motion/Motion";

type Mode = "light" | "dark" | "system";
const STORAGE_KEY = "growrix-os-theme";
const LEGACY_STORAGE_KEYS = ["growrix-theme", "signal-theme"] as const;

function applyTheme(mode: Mode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (mode === "system") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", mode);
  }
}

function readStored(): Mode {
  if (typeof window === "undefined") return "system";
  const v =
    window.localStorage.getItem(STORAGE_KEY) ??
    LEGACY_STORAGE_KEYS.map((key) => window.localStorage.getItem(key)).find((value) => value != null);
  return v === "light" || v === "dark" ? v : "system";
}

function resolved(mode: Mode): "light" | "dark" {
  if (mode !== "system") return mode;
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-flag pattern needed to avoid SSR/CSR theme mismatch
    setMounted(true);
    const stored = readStored();
    setMode(stored);
    if (stored !== "system") {
      try {
        window.localStorage.setItem(STORAGE_KEY, stored);
        LEGACY_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
      } catch {
        /* ignore storage errors */
      }
    }
  }, []);

  function cycle() {
    const current = resolved(mode);
    const next: Mode = current === "dark" ? "light" : "dark";
    setMode(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      LEGACY_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
    } catch {
      /* ignore storage errors (Safari private mode, etc.) */
    }
    applyTheme(next);
  }

  function setSystem() {
    setMode("system");
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      LEGACY_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
    } catch {
      /* ignore */
    }
    applyTheme("system");
  }

  // Avoid SSR/CSR mismatch: render a neutral placeholder until mounted.
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`inline-flex size-10 items-center justify-center rounded-full hover:bg-inset transition-colors ${className}`}
      >
        <SunIcon className="size-5" aria-hidden />
      </button>
    );
  }

  const isDark = resolved(mode) === "dark";
  const label =
    mode === "system"
      ? `Theme: system (${isDark ? "dark" : "light"}). Click to switch to ${isDark ? "light" : "dark"}.`
      : `Theme: ${mode}. Click to switch to ${isDark ? "light" : "dark"}.`;

  return (
    <div className={`inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={cycle}
        aria-label={label}
        aria-pressed={isDark}
        title={label}
        className="relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full hover:bg-inset transition-colors"
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
      {mode !== "system" && (
        <button
          type="button"
          onClick={setSystem}
          aria-label="Use system theme"
          title="Use system theme"
          className="-ml-1 inline-flex size-8 items-center justify-center rounded-full text-text-muted hover:bg-inset hover:text-text transition-colors"
        >
          <ComputerDesktopIcon className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
}

export function ThemeToggleButton({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMode(readStored());
  }, []);

  function cycle() {
    const current = resolved(mode);
    const next: Mode = current === "dark" ? "light" : "dark";
    setMode(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      LEGACY_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
    } catch {
      /* ignore storage errors */
    }
    applyTheme(next);
  }

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`inline-flex size-10 items-center justify-center rounded-full hover:bg-inset transition-colors ${className}`}
      >
        <SunIcon className="size-5" aria-hidden />
      </button>
    );
  }

  const isDark = resolved(mode) === "dark";
  const label = `Theme: ${isDark ? "dark" : "light"}. Click to switch to ${isDark ? "light" : "dark"}.`;

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className={`relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full hover:bg-inset transition-colors ${className}`}
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
