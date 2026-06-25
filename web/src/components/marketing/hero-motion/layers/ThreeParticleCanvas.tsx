"use client";

import { useEffect, useRef } from "react";
import { useHeroMotionOptional } from "../HeroMotionContext";

type ThreeParticleCanvasProps = {
  count: number;
};

export function ThreeParticleCanvas({ count }: ThreeParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const motion = useHeroMotionOptional();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
      return;
    }

    let disposed = false;
    let raf = 0;
    let renderer: import("three").WebGLRenderer | null = null;

    const init = async () => {
      const THREE = await import("three");
      if (disposed || !canvas || !container) {
        return;
      }

      const rect = container.getBoundingClientRect();
      const width = rect.width || 800;
      const height = rect.height || 600;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.z = 5;

      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0x2dd4bf,
        size: 0.035,
        transparent: true,
        opacity: 0.65,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);

      let visible = true;
      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry?.isIntersecting ?? true;
        },
        { threshold: 0.05 },
      );
      observer.observe(container);

      const tick = () => {
        if (visible && renderer) {
          const scrollBoost = 1 + (motion?.scrollProgress ?? 0) * 0.5;
          points.rotation.y += 0.0004 * scrollBoost;
          points.rotation.x += 0.0002 * scrollBoost;
          const px = Number.parseFloat(
            getComputedStyle(container.closest(".hero-section") ?? container).getPropertyValue("--hero-px") || "0",
          );
          const py = Number.parseFloat(
            getComputedStyle(container.closest(".hero-section") ?? container).getPropertyValue("--hero-py") || "0",
          );
          points.position.x = px * 0.15;
          points.position.y = -py * 0.1;
          renderer.render(scene, camera);
        }
        raf = requestAnimationFrame(tick);
      };

      const onResize = () => {
        const next = container.getBoundingClientRect();
        if (next.width === 0 || next.height === 0 || !renderer) {
          return;
        }
        camera.aspect = next.width / next.height;
        camera.updateProjectionMatrix();
        renderer.setSize(next.width, next.height, false);
      };

      window.addEventListener("resize", onResize);
      raf = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        observer.disconnect();
        geometry.dispose();
        material.dispose();
        renderer?.dispose();
      };
    };

    let cleanup: (() => void) | undefined;
    void init().then((fn) => {
      cleanup = fn;
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanup?.();
      renderer?.dispose();
    };
  }, [count, motion?.scrollProgress]);

  return (
    <div ref={containerRef} className="hero-ambient__particles-canvas">
      <canvas ref={canvasRef} className="hero-ambient__particles-canvas-el" aria-hidden />
    </div>
  );
}
