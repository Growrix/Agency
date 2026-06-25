"use client";

import { useEffect, useRef } from "react";
import { HERO_LOAD_SEQUENCE } from "../hero-motion-config";
import { useHeroMotionOptional } from "../HeroMotionContext";

export function LivingGridLayer() {
  const gridRef = useRef<HTMLDivElement>(null);
  const motion = useHeroMotionOptional();

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || motion?.tier === "reduced") {
      return;
    }

    motion?.registerLoadTarget("grid", grid);

    let cancelled = false;

    const run = async () => {
      const { gsap } = await import("gsap");
      if (cancelled || !grid) {
        return;
      }

      gsap.set(grid, { opacity: 0, scale: 0.98 });
      gsap.to(grid, {
        opacity: motion?.tier === "mobile" ? 0.4 : 0.2,
        scale: 1,
        duration: 0.9,
        delay: HERO_LOAD_SEQUENCE.grid,
        ease: "power2.out",
      });
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [motion]);

  if (motion?.tier === "reduced") {
    return <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 lg:opacity-20" aria-hidden />;
  }

  return (
    <div
      ref={gridRef}
      className="hero-ambient__living-grid bg-grid pointer-events-none absolute inset-0 opacity-40 lg:opacity-20"
      aria-hidden
    />
  );
}
