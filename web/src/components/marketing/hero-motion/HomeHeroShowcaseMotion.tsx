"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useHeroCopyReveal } from "./hooks/useHeroCopyReveal";
import { useHeroMotionOptional } from "./HeroMotionContext";

const EASE_SIGNAL = [0.22, 1, 0.36, 1] as const;

type HomeHeroShowcaseMotionProps = {
  children: ReactNode;
  className?: string;
};

export function HomeHeroShowcaseMotion({ children, className }: HomeHeroShowcaseMotionProps) {
  const reduced = useReducedMotion();
  const motionCtx = useHeroMotionOptional();
  const reveal = useHeroCopyReveal("showcase");
  const skipEntrance = motionCtx?.skipEntrance ?? false;

  if (reduced || motionCtx?.tier === "reduced") {
    return <div className={className}>{children}</div>;
  }

  if (skipEntrance) {
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

  return (
    <motion.div
      className={[`hero-showcase-motion ${className ?? ""}`, reveal.pendingClassName].filter(Boolean).join(" ")}
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={
        reveal.animate
          ? {
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
            }
          : { opacity: 0, scale: 0.96, y: 20 }
      }
      transition={{
        opacity: { duration: reveal.duration, delay: reveal.delay, ease: EASE_SIGNAL },
        scale: { duration: reveal.duration, delay: reveal.delay, ease: EASE_SIGNAL },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: reveal.delay + 1.2 },
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
