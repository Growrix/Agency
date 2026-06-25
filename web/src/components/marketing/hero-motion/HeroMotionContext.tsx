"use client";

import { createContext, useContext, useRef, type ReactNode, type RefObject } from "react";
import type { HeroMotionTier } from "./hero-motion-config";

type HeroMotionContextValue = {
  tier: HeroMotionTier;
  sectionRef: RefObject<HTMLElement | null>;
  scrollProgress: number;
  setScrollProgress: (value: number) => void;
  loadTimelineReady: boolean;
  registerLoadTarget: (key: string, el: Element | null) => void;
  headlineReadyRef: React.MutableRefObject<boolean>;
};

const HeroMotionContext = createContext<HeroMotionContextValue | null>(null);

export function HeroMotionProvider({
  tier,
  sectionRef,
  children,
  loadTimelineReady,
  registerLoadTarget,
  scrollProgress,
  setScrollProgress,
  headlineReadyRef,
}: {
  tier: HeroMotionTier;
  sectionRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  loadTimelineReady: boolean;
  registerLoadTarget: (key: string, el: Element | null) => void;
  scrollProgress: number;
  setScrollProgress: (value: number) => void;
  headlineReadyRef: React.MutableRefObject<boolean>;
}) {
  return (
    <HeroMotionContext.Provider
      value={{
        tier,
        sectionRef,
        scrollProgress,
        setScrollProgress,
        loadTimelineReady,
        registerLoadTarget,
        headlineReadyRef,
      }}
    >
      {children}
    </HeroMotionContext.Provider>
  );
}

export function useHeroMotion() {
  const ctx = useContext(HeroMotionContext);
  if (!ctx) {
    throw new Error("useHeroMotion must be used within HeroMotionProvider");
  }
  return ctx;
}

export function useHeroMotionOptional() {
  return useContext(HeroMotionContext);
}

export function useHeadlineReadyRef() {
  const ref = useRef(false);
  return ref;
}
