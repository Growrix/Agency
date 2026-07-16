"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useHeroMotionOptional } from "./HeroMotionContext";

type HomeHeroShowcaseMotionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Wraps the hero showcase. The showcase is always mounted deferred (after the static
 * placeholder already painted the LCP poster), so it must NOT play an entrance
 * fade/scale/spring — that would re-animate the poster the user already sees (a fumble).
 * It mounts at its final state and only keeps the ambient float + pointer parallax.
 */
export function HomeHeroShowcaseMotion({ children, className }: HomeHeroShowcaseMotionProps) {
  const reduced = useReducedMotion();
  const motionCtx = useHeroMotionOptional();

  if (reduced || motionCtx?.tier === "reduced") {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`hero-showcase-motion ${className ?? ""}`}
      initial={false}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0 },
        scale: { duration: 0 },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{
        rotateX: "calc(var(--hero-py, 0) * -3deg)",
        rotateY: "calc(var(--hero-px, 0) * 4deg)",
        transformPerspective: 900,
      }}
    >
      <span className="hero-showcase-motion__reflection" aria-hidden />
      <div className="hero-showcase-motion__content">{children}</div>
    </motion.div>
  );
}
