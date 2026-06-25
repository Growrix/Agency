"use client";

import { useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";
import type { HeroMotionTier } from "../hero-motion-config";

function detectInitialTier(): HeroMotionTier {
  if (typeof window === "undefined") {
    return "full";
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "reduced";
  }

  const isMobile = window.matchMedia("(max-width: 1023px)").matches;
  const saveData = "connection" in navigator && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  const lowCpu = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;

  if (saveData || lowCpu) {
    return "lite";
  }

  if (isMobile) {
    return "mobile";
  }

  return "full";
}

function subscribe(onStoreChange: () => void) {
  const mobileQuery = window.matchMedia("(max-width: 1023px)");
  const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mobileQuery.addEventListener("change", onStoreChange);
  reducedQuery.addEventListener("change", onStoreChange);
  return () => {
    mobileQuery.removeEventListener("change", onStoreChange);
    reducedQuery.removeEventListener("change", onStoreChange);
  };
}

export function useHeroMotionProfile(): HeroMotionTier {
  const reducedMotion = useReducedMotion();
  const viewportTier = useSyncExternalStore(subscribe, detectInitialTier, () => "full" as HeroMotionTier);

  if (reducedMotion) {
    return "reduced";
  }

  return viewportTier;
}
