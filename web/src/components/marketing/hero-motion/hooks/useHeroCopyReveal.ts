"use client";

import { useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import {
  getCopyPhaseDuration,
  HERO_COPY_SEQUENCE,
  type HeroCopyPhase,
} from "../hero-motion-config";
import { useHeroMotionOptional } from "../HeroMotionContext";

type UseHeroCopyRevealOptions = {
  staggerIndex?: number;
  titleLineCount?: number;
};

export function useHeroCopyReveal(phase: HeroCopyPhase, options?: UseHeroCopyRevealOptions) {
  const reduced = useReducedMotion();
  const motion = useHeroMotionOptional();
  const tier = motion?.tier ?? "full";
  const isReduced = reduced || tier === "reduced";
  const titleLineCount = options?.titleLineCount ?? 2;
  const staggerIndex = options?.staggerIndex ?? 0;
  const staggerStep =
    phase === "trust" ? HERO_COPY_SEQUENCE.trustChildStagger : HERO_COPY_SEQUENCE.ctaStagger;

  return useMemo(() => {
    const duration = getCopyPhaseDuration(phase);

    if (isReduced || !motion) {
      return {
        hidden: false,
        animate: true,
        delay: 0,
        duration,
        pendingClassName: "",
      };
    }

    const phaseDelay =
      motion.getCopyRevealDelay(phase, titleLineCount) + staggerIndex * staggerStep;

    if (!motion.copySequenceStarted) {
      return {
        hidden: true,
        animate: false,
        delay: phaseDelay,
        duration,
        pendingClassName: "hero-copy-pending",
      };
    }

    return {
      hidden: false,
      animate: true,
      delay: phaseDelay,
      duration,
      pendingClassName: "",
    };
  }, [isReduced, motion, phase, titleLineCount, staggerIndex, staggerStep]);
}
