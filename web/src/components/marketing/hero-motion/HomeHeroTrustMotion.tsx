"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useHeroMotionOptional } from "./HeroMotionContext";

type HomeHeroTrustMotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function HomeHeroTrustMotion({ children, className, delay = 0 }: HomeHeroTrustMotionProps) {
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + delay / 1000, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function HomeHeroTrustNameMotion({
  name,
  index,
  className,
}: {
  name: string;
  index: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const motionCtx = useHeroMotionOptional();

  if (reduced || motionCtx?.tier === "reduced") {
    return <li className={className}>{name}</li>;
  }

  return (
    <motion.li
      className={`hero-trust-name ${className ?? ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: [0.7, 0.85, 0.7], y: 0 }}
      transition={{
        opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.15 + 1.6 },
        y: { duration: 0.55, delay: index * 0.1 + 1.6, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {name}
    </motion.li>
  );
}

export function HomeHeroTrustLogoMotion({
  children,
  index,
  className,
}: {
  children: ReactNode;
  index: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const motionCtx = useHeroMotionOptional();

  if (reduced || motionCtx?.tier === "reduced") {
    return <li className={className}>{children}</li>;
  }

  return (
    <motion.li
      className={`hero-trust-logo ${className ?? ""}`}
      initial={{ opacity: 1, y: 6 }}
      animate={{ y: 0 }}
      transition={{
        y: { duration: 0.45, delay: index * 0.08 + 0.2, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {children}
    </motion.li>
  );
}

export function HomeHeroTrustAvatarMotion({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const reduced = useReducedMotion();
  const motionCtx = useHeroMotionOptional();

  if (reduced || motionCtx?.tier === "reduced") {
    return <li className="home-hero-desktop__trust-avatar">{children}</li>;
  }

  return (
    <motion.li
      className="home-hero-desktop__trust-avatar hero-trust-avatar"
      initial={{ opacity: 0, y: 12, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.55 + index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.li>
  );
}
