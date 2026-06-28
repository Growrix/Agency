"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, type ReactNode } from "react";
import type { HeroCopyPhase } from "./hero-motion-config";
import { useHeroCopyReveal } from "./hooks/useHeroCopyReveal";
import { useHeroMotionOptional } from "./HeroMotionContext";

const EASE_SIGNAL = [0.22, 1, 0.36, 1] as const;

type HomeHeroCtaMotionProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function HomeHeroCtaMotion({ children, variant = "primary", className }: HomeHeroCtaMotionProps) {
  const reduced = useReducedMotion();
  const motionCtx = useHeroMotionOptional();

  if (reduced || motionCtx?.tier === "reduced") {
    return <div className={className}>{children}</div>;
  }

  if (variant === "secondary") {
    return (
      <div className={`hero-cta-motion hero-cta-motion--secondary ${className ?? ""}`}>
        <span className="hero-cta-motion__border-trace" aria-hidden />
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`hero-cta-motion hero-cta-motion--primary ${className ?? ""}`}
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="hero-cta-motion__glow" aria-hidden />
      <span className="hero-cta-motion__sweep" aria-hidden />
      {children}
    </motion.div>
  );
}

export function HomeHeroCtaStackMotion({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const motionCtx = useHeroMotionOptional();

  if (reduced || motionCtx?.tier === "reduced") {
    return <div className={className}>{children}</div>;
  }

  const items = Children.toArray(children);

  return (
    <div className={className}>
      {items.map((child, index) => (
        <HomeHeroMotionReveal key={index} phase="cta" staggerIndex={index}>
          {child}
        </HomeHeroMotionReveal>
      ))}
    </div>
  );
}

export function HomeHeroMotionReveal({
  children,
  className,
  phase = "badge",
  staggerIndex = 0,
  titleLineCount = 2,
}: {
  children: ReactNode;
  className?: string;
  phase?: HeroCopyPhase;
  staggerIndex?: number;
  titleLineCount?: number;
}) {
  const reduced = useReducedMotion();
  const motionCtx = useHeroMotionOptional();
  const reveal = useHeroCopyReveal(phase, { staggerIndex, titleLineCount });

  if (reduced || motionCtx?.tier === "reduced") {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={[className, reveal.pendingClassName].filter(Boolean).join(" ")}
      initial={{ opacity: 0, y: 14 }}
      animate={reveal.animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ delay: reveal.delay, duration: reveal.duration, ease: EASE_SIGNAL }}
    >
      {children}
    </motion.div>
  );
}
