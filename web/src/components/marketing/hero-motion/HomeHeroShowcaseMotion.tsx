"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useHeroMotionOptional } from "./HeroMotionContext";

type HomeHeroShowcaseMotionProps = {
  children: ReactNode;
  className?: string;
};

export function HomeHeroShowcaseMotion({ children, className }: HomeHeroShowcaseMotionProps) {
  const reduced = useReducedMotion();
  const motionCtx = useHeroMotionOptional();

  if (reduced || motionCtx?.tier === "reduced") {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`hero-showcase-motion ${className ?? ""}`}
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.72, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.72, delay: 0.3, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
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
