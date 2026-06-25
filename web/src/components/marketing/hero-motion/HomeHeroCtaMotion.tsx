"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useHeroMotionOptional } from "./HeroMotionContext";

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

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function HomeHeroMotionReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const motionCtx = useHeroMotionOptional();

  if (reduced || motionCtx?.tier === "reduced") {
    return (
      <div className={`signal-rise ${className ?? ""}`} style={{ animationDelay: `${delay}ms` }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000 + 0.8, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
