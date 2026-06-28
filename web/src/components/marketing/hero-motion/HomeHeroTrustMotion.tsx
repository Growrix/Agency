"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useHeroCopyReveal } from "./hooks/useHeroCopyReveal";
import { useHeroMotionOptional } from "./HeroMotionContext";

const EASE_SIGNAL = [0.22, 1, 0.36, 1] as const;

type HomeHeroTrustMotionProps = {
  children: ReactNode;
  className?: string;
};

export function HomeHeroTrustMotion({ children, className }: HomeHeroTrustMotionProps) {
  const reduced = useReducedMotion();
  const motionCtx = useHeroMotionOptional();
  const reveal = useHeroCopyReveal("trust");

  if (reduced || motionCtx?.tier === "reduced") {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={[className, reveal.pendingClassName].filter(Boolean).join(" ")}
      initial={{ opacity: 0, y: 16 }}
      animate={reveal.animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ delay: reveal.delay, duration: reveal.duration, ease: EASE_SIGNAL }}
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
  const reveal = useHeroCopyReveal("trust", { staggerIndex: index + 1 });

  if (reduced || motionCtx?.tier === "reduced") {
    return <li className={className}>{name}</li>;
  }

  return (
    <motion.li
      className={`hero-trust-name ${className ?? ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={
        reveal.animate
          ? { opacity: [0.7, 0.85, 0.7], y: 0 }
          : { opacity: 0, y: 10 }
      }
      transition={{
        opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: reveal.delay + 0.4 },
        y: { duration: 0.55, delay: reveal.delay, ease: EASE_SIGNAL },
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
  const reveal = useHeroCopyReveal("trust", { staggerIndex: index + 1 });

  if (reduced || motionCtx?.tier === "reduced") {
    return <li className={className}>{children}</li>;
  }

  return (
    <motion.li
      className={`hero-trust-logo ${className ?? ""}`}
      initial={{ opacity: 0, y: 6 }}
      animate={reveal.animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      transition={{
        opacity: { duration: 0.45, delay: reveal.delay, ease: EASE_SIGNAL },
        y: { duration: 0.45, delay: reveal.delay, ease: EASE_SIGNAL },
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
  const reveal = useHeroCopyReveal("trust", { staggerIndex: index + 1 });

  if (reduced || motionCtx?.tier === "reduced") {
    return <li className="home-hero-desktop__trust-avatar">{children}</li>;
  }

  return (
    <motion.li
      className="home-hero-desktop__trust-avatar hero-trust-avatar"
      initial={{ opacity: 0, y: 12, scale: 0.92 }}
      animate={reveal.animate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.92 }}
      transition={{ delay: reveal.delay, duration: 0.55, ease: EASE_SIGNAL }}
    >
      {children}
    </motion.li>
  );
}
