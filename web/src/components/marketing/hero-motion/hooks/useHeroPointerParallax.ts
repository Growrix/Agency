"use client";

import { useEffect, useRef } from "react";
import type { HeroMotionTier } from "../hero-motion-config";

const LERP = 0.08;

export function useHeroPointerParallax(
  sectionRef: React.RefObject<HTMLElement | null>,
  tier: HeroMotionTier,
  enabled: boolean,
) {
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !enabled || tier === "reduced") {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRef.current = {
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
      };
    };

    const handlePointerLeave = () => {
      targetRef.current = { x: 0, y: 0 };
    };

    const tick = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;

      section.style.setProperty("--hero-px", current.x.toFixed(4));
      section.style.setProperty("--hero-py", current.y.toFixed(4));
      rafRef.current = requestAnimationFrame(tick);
    };

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", handlePointerLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      section.style.removeProperty("--hero-px");
      section.style.removeProperty("--hero-py");
    };
  }, [sectionRef, tier, enabled]);
}
