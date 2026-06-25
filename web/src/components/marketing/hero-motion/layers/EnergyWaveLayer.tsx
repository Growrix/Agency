"use client";

import { useEffect, useRef } from "react";
import { HERO_LOAD_SEQUENCE } from "../hero-motion-config";
import { useHeroMotionOptional } from "../HeroMotionContext";

const WAVE_PATHS = [
  "M0,60 C120,20 240,100 360,60 S600,20 720,60 S960,100 1200,60",
  "M0,80 C150,40 300,120 450,80 S750,40 900,80 S1050,120 1200,80",
  "M0,50 C100,90 200,10 300,50 S500,90 600,50 S800,10 900,50 S1100,90 1200,50",
];

export function EnergyWaveLayer() {
  const layerRef = useRef<SVGSVGElement>(null);
  const motion = useHeroMotionOptional();

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || motion?.tier === "reduced") {
      return;
    }

    motion?.registerLoadTarget("waves", layer);

    let cancelled = false;

    const run = async () => {
      const { gsap } = await import("gsap");
      if (cancelled || !layer) {
        return;
      }

      gsap.set(layer, { opacity: 0 });
      gsap.to(layer, {
        opacity: motion?.tier === "lite" ? 0.35 : 0.55,
        duration: 0.9,
        delay: HERO_LOAD_SEQUENCE.waves,
        ease: "power2.out",
      });

      const paths = layer.querySelectorAll(".hero-ambient__wave-path");
      paths.forEach((path, index) => {
        gsap.to(path, {
          attr: { d: WAVE_PATHS[(index + 1) % WAVE_PATHS.length] },
          duration: 8 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        gsap.to(path, {
          opacity: 0.25 + index * 0.1,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [motion]);

  if (motion?.tier === "reduced") {
    return null;
  }

  return (
    <svg
      ref={layerRef}
      className="hero-ambient__waves"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      {WAVE_PATHS.map((d, index) => (
        <path
          key={index}
          className="hero-ambient__wave-path"
          d={d}
          fill="none"
          stroke="url(#hero-wave-gradient)"
          strokeWidth={1.5}
          opacity={0.35}
        />
      ))}
      <defs>
        <linearGradient id="hero-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0" />
          <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
