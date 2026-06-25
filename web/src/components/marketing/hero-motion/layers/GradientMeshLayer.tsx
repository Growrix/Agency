"use client";

import { useEffect, useRef } from "react";
import { HERO_LOAD_SEQUENCE } from "../hero-motion-config";
import { useHeroMotionOptional } from "../HeroMotionContext";

export function GradientMeshLayer() {
  const meshRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const motion = useHeroMotionOptional();

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh || motion?.tier === "reduced") {
      return;
    }

    motion?.registerLoadTarget("background", mesh);

    let cancelled = false;

    const run = async () => {
      const { gsap } = await import("gsap");
      if (cancelled || !mesh) {
        return;
      }

      gsap.set(mesh, { opacity: 0 });

      const tl = gsap.timeline({ delay: HERO_LOAD_SEQUENCE.background });
      tl.to(mesh, { opacity: 1, duration: 1.2, ease: "power2.out" });

      const blobs = [blob1Ref.current, blob2Ref.current, blob3Ref.current].filter(Boolean);
      blobs.forEach((blob, index) => {
        if (!blob) {
          return;
        }
        gsap.to(blob, {
          x: `random(-80, 80)`,
          y: `random(-60, 60)`,
          scale: `random(0.9, 1.15)`,
          duration: 28 + index * 4,
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
    <div ref={meshRef} className="hero-ambient__gradient-mesh" aria-hidden>
      <div ref={blob1Ref} className="hero-ambient__gradient-blob hero-ambient__gradient-blob--teal" />
      <div ref={blob2Ref} className="hero-ambient__gradient-blob hero-ambient__gradient-blob--cyan" />
      <div ref={blob3Ref} className="hero-ambient__gradient-blob hero-ambient__gradient-blob--purple" />
    </div>
  );
}
