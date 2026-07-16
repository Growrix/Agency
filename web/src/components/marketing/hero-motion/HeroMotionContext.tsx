"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import {
  getCopyPhaseDelay,
  type HeroCopyPhase,
  type HeroMotionTier,
} from "./hero-motion-config";

type HeroMotionContextValue = {
  tier: HeroMotionTier;
  sectionRef: RefObject<HTMLElement | null>;
  loadTimelineReady: boolean;
  registerLoadTarget: (key: string, el: Element | null) => void;
  headlineReadyRef: React.MutableRefObject<boolean>;
  copySequenceStarted: boolean;
  copySequenceStartTime: number | null;
  headlineComplete: boolean;
  setHeadlineComplete: () => void;
  getCopyRevealDelay: (phase: HeroCopyPhase, titleLineCount?: number) => number;
  skipEntrance: boolean;
};

const HeroMotionContext = createContext<HeroMotionContextValue | null>(null);

export function HeroMotionProvider({
  tier,
  sectionRef,
  children,
  loadTimelineReady,
  registerLoadTarget,
  headlineReadyRef,
  copySequenceStarted,
  copySequenceStartTime,
  headlineComplete,
  setHeadlineComplete,
  skipEntrance,
}: {
  tier: HeroMotionTier;
  sectionRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  loadTimelineReady: boolean;
  registerLoadTarget: (key: string, el: Element | null) => void;
  headlineReadyRef: React.MutableRefObject<boolean>;
  copySequenceStarted: boolean;
  copySequenceStartTime: number | null;
  headlineComplete: boolean;
  setHeadlineComplete: () => void;
  skipEntrance: boolean;
}) {
  const getCopyRevealDelay = useCallback(
    (phase: HeroCopyPhase, titleLineCount = 2) => getCopyPhaseDelay(phase, tier, titleLineCount),
    [tier],
  );

  const value = useMemo(
    () => ({
      tier,
      sectionRef,
      loadTimelineReady,
      registerLoadTarget,
      headlineReadyRef,
      copySequenceStarted,
      copySequenceStartTime,
      headlineComplete,
      setHeadlineComplete,
      getCopyRevealDelay,
      skipEntrance,
    }),
    [
      tier,
      sectionRef,
      loadTimelineReady,
      registerLoadTarget,
      headlineReadyRef,
      copySequenceStarted,
      copySequenceStartTime,
      headlineComplete,
      setHeadlineComplete,
      getCopyRevealDelay,
      skipEntrance,
    ],
  );

  return <HeroMotionContext.Provider value={value}>{children}</HeroMotionContext.Provider>;
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
