"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { HERO_LOAD_SEQUENCE, HERO_PARTICLE_COUNTS } from "../hero-motion-config";
import { useHeroMotionOptional } from "../HeroMotionContext";

const ThreeParticleCanvas = dynamic(
  () => import("./ThreeParticleCanvas").then((mod) => mod.ThreeParticleCanvas),
  { ssr: false },
);

function Canvas2DParticles({ count }: { count: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motion = useHeroMotionOptional();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || count === 0) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let pointer = { x: 0.5, y: 0.5 };
    let scrollBoost = 1;

    const particles = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.5 + 0.2,
    }));

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    const onPointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    };

    container.addEventListener("pointermove", onPointerMove);

    const tick = () => {
      if (visible && width > 0 && height > 0) {
        scrollBoost = 1 + (motion?.scrollProgress ?? 0) * 0.5;
        ctx.clearRect(0, 0, width, height);

        for (const p of particles) {
          const px = p.x * width;
          const py = p.y * height;
          const dx = pointer.x * width - px;
          const dy = pointer.y * height - py;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 && motion?.tier === "full") {
            p.vx -= (dx / dist) * 0.00008;
            p.vy -= (dy / dist) * 0.00008;
          }

          p.x += p.vx * scrollBoost;
          p.y += p.vy * scrollBoost;

          if (p.x < 0 || p.x > 1) {
            p.vx *= -1;
            p.x = Math.max(0, Math.min(1, p.x));
          }
          if (p.y < 0 || p.y > 1) {
            p.vy *= -1;
            p.y = Math.max(0, Math.min(1, p.y));
          }

          ctx.beginPath();
          ctx.fillStyle = `rgba(45, 212, 191, ${p.alpha})`;
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      container.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
    };
  }, [count, motion?.scrollProgress, motion?.tier]);

  return (
    <div ref={containerRef} className="hero-ambient__particles-canvas">
      <canvas ref={canvasRef} className="hero-ambient__particles-canvas-el" aria-hidden />
    </div>
  );
}

export function ParticleFieldLayer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const motion = useHeroMotionOptional();
  const [ready, setReady] = useState(false);
  const tier = motion?.tier ?? "full";
  const count = HERO_PARTICLE_COUNTS[tier];

  useEffect(() => {
    if (tier === "reduced" || count === 0) {
      return;
    }

    motion?.registerLoadTarget("particles", wrapperRef.current);

    const idle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => window.setTimeout(cb, 1));
    const id = idle(() => setReady(true));
    return () => {
      const cancel = window.cancelIdleCallback ?? clearTimeout;
      cancel(id);
    };
  }, [count, motion, tier]);

  useEffect(() => {
    if (!wrapperRef.current || tier === "reduced" || count === 0) {
      return;
    }

    let cancelled = false;

    const run = async () => {
      const { gsap } = await import("gsap");
      if (cancelled || !wrapperRef.current) {
        return;
      }
      gsap.set(wrapperRef.current, { opacity: 0 });
      gsap.to(wrapperRef.current, {
        opacity: 1,
        duration: 0.8,
        delay: HERO_LOAD_SEQUENCE.particles,
        ease: "power2.out",
      });
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [count, tier]);

  if (tier === "reduced" || count === 0) {
    return null;
  }

  const useThree = tier === "full" && ready;

  return (
    <div ref={wrapperRef} className="hero-ambient__particles" aria-hidden>
      {useThree ? <ThreeParticleCanvas count={count} /> : ready ? <Canvas2DParticles count={count} /> : null}
    </div>
  );
}
