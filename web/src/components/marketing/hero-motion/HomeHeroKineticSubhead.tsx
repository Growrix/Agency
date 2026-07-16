"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { HERO_MOTION_TIMINGS } from "./hero-motion-config";
import { useHeroCopyReveal } from "./hooks/useHeroCopyReveal";
import { useHeroMotionOptional } from "./HeroMotionContext";

const EASE_SIGNAL = [0.22, 1, 0.36, 1] as const;

type HomeHeroKineticSubheadProps = {
  children: ReactNode;
  className?: string;
};

function tokenizeText(text: string) {
  return text.split(/(\s+)/).filter(Boolean);
}

const wordVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: HERO_MOTION_TIMINGS.subheadDurationMs / 1000, ease: EASE_SIGNAL },
  },
};

function KineticSubheadContent({
  className,
  tokens,
}: {
  className?: string;
  tokens: string[];
}) {
  const reveal = useHeroCopyReveal("subhead");
  const motionCtx = useHeroMotionOptional();
  const skipEntrance = motionCtx?.skipEntrance ?? false;

  if (skipEntrance) {
    return (
      <p className={[`hero-kinetic-subhead ${className ?? ""}`, reveal.pendingClassName].filter(Boolean).join(" ")}>
        {tokens.map((token, index) => (
          <span
            key={`${token}-${index}`}
            className={/^\s+$/.test(token) ? "hero-kinetic-subhead__space" : "hero-kinetic-subhead__word"}
          >
            {token}
          </span>
        ))}
      </p>
    );
  }

  return (
    <motion.p
      className={[`hero-kinetic-subhead ${className ?? ""}`, reveal.pendingClassName].filter(Boolean).join(" ")}
      initial="hidden"
      animate={reveal.animate ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: reveal.delay,
            staggerChildren: 0.04,
          },
        },
      }}
    >
      {tokens.map((token, index) => (
        <motion.span
          key={`${token}-${index}`}
          className={/^\s+$/.test(token) ? "hero-kinetic-subhead__space" : "hero-kinetic-subhead__word"}
          variants={wordVariants}
        >
          {token}
        </motion.span>
      ))}
    </motion.p>
  );
}

export function HomeHeroKineticSubhead({ children, className }: HomeHeroKineticSubheadProps) {
  const reduced = useReducedMotion();
  const motionCtx = useHeroMotionOptional();

  if (reduced || motionCtx?.tier === "reduced" || motionCtx?.skipEntrance) {
    return <p className={className}>{children}</p>;
  }

  const textContent =
    typeof children === "string"
      ? children
      : Array.isArray(children)
        ? children.map((child) => (typeof child === "string" ? child : "")).join("")
        : "";

  return <KineticSubheadContent className={className} tokens={tokenizeText(textContent)} />;
}

export function HomeHeroKineticSubheadLines({
  lines,
  className,
  lineClassName,
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
}) {
  const reduced = useReducedMotion();
  const motionCtx = useHeroMotionOptional();
  const reveal = useHeroCopyReveal("subhead");

  if (reduced || motionCtx?.tier === "reduced" || motionCtx?.skipEntrance) {
    return (
      <p className={className}>
        {lines.map((line) => (
          <span key={line} className={lineClassName}>
            {line}
          </span>
        ))}
      </p>
    );
  }

  return (
    <motion.p
      className={[`hero-kinetic-subhead ${className ?? ""}`, reveal.pendingClassName].filter(Boolean).join(" ")}
      initial="hidden"
      animate={reveal.animate ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: reveal.delay,
            staggerChildren: 0.04,
          },
        },
      }}
    >
      {lines.map((line) => (
        <span key={line} className={lineClassName}>
          {tokenizeText(line).map((token, index) => (
            <motion.span
              key={`${line}-${token}-${index}`}
              className={/^\s+$/.test(token) ? "hero-kinetic-subhead__space" : "hero-kinetic-subhead__word"}
              variants={wordVariants}
            >
              {token}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.p>
  );
}
