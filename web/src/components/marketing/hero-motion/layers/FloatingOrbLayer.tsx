"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { HERO_ORB_COUNT } from "../hero-motion-config";
import { useHeroMotionOptional } from "../HeroMotionContext";

export function FloatingOrbLayer() {
  const motionCtx = useHeroMotionOptional();
  const tier = motionCtx?.tier ?? "full";
  const count = HERO_ORB_COUNT[tier];

  const orbs = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        size: 40 + (index % 5) * 28,
        left: `${8 + ((index * 17) % 84)}%`,
        top: `${6 + ((index * 23) % 78)}%`,
        duration: 14 + (index % 6) * 3,
        delay: index * 0.4,
        blur: 24 + (index % 4) * 12,
        opacity: 0.08 + (index % 3) * 0.04,
      })),
    [count],
  );

  if (tier === "reduced" || count === 0) {
    return null;
  }

  return (
    <div className="hero-ambient__orbs" aria-hidden>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="hero-ambient__orb"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
            filter: `blur(${orb.blur}px)`,
            opacity: orb.opacity,
          }}
          animate={{
            x: [0, 12, -8, 0],
            y: [0, -10, 6, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
