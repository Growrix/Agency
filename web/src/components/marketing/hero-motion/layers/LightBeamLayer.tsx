"use client";

import { useHeroMotionOptional } from "../HeroMotionContext";

const BEAMS = [
  { rotate: 25, left: "10%", delay: "0s" },
  { rotate: -18, left: "45%", delay: "-3s" },
  { rotate: 32, left: "72%", delay: "-6s" },
];

export function LightBeamLayer() {
  const motion = useHeroMotionOptional();

  if (motion?.tier === "reduced") {
    return null;
  }

  return (
    <div className="hero-ambient__beams" aria-hidden>
      {BEAMS.map((beam, index) => (
        <div
          key={index}
          className="hero-ambient__beam"
          style={{
            left: beam.left,
            transform: `rotate(${beam.rotate}deg)`,
            animationDelay: beam.delay,
          }}
        />
      ))}
    </div>
  );
}
