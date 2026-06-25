"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { HomeHeroAmbientLayers } from "./HomeHeroAmbientLayers";
import { HeroMotionProvider } from "./HeroMotionContext";
import { useHeroMotionProfile } from "./hooks/useHeroMotionProfile";
import { useHeroPointerParallax } from "./hooks/useHeroPointerParallax";
import { useHeroScrollTransform } from "./hooks/useHeroScrollTransform";
import { HERO_LOAD_SEQUENCE } from "./hero-motion-config";

type HomeHeroMotionRootProps = {
  sectionRef: RefObject<HTMLElement | null>;
  children: ReactNode;
};

export function HomeHeroMotionRoot({ sectionRef, children }: HomeHeroMotionRootProps) {
  const tier = useHeroMotionProfile();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadTimelineReady, setLoadTimelineReady] = useState(false);
  const loadTargetsRef = useRef<Map<string, Element>>(new Map());
  const headlineReadyRef = useRef(false);

  const registerLoadTarget = useCallback((key: string, el: Element | null) => {
    if (el) {
      loadTargetsRef.current.set(key, el);
    } else {
      loadTargetsRef.current.delete(key);
    }
  }, []);

  useHeroPointerParallax(sectionRef, tier, tier !== "reduced");
  useHeroScrollTransform(sectionRef, tier);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    section.classList.add("hero-section--motion");
    section.style.setProperty("--hero-px", "0");
    section.style.setProperty("--hero-py", "0");
    section.style.setProperty("--hero-scroll-progress", "0");

    if (tier === "reduced") {
      section.classList.add("hero-section--reduced-motion");
      return;
    }

    let cancelled = false;

    const runTimeline = async () => {
      const { gsap } = await import("gsap");
      if (cancelled) {
        return;
      }

      setLoadTimelineReady(true);

      const headlineDelay = HERO_LOAD_SEQUENCE.headline;
      gsap.delayedCall(headlineDelay, () => {
        headlineReadyRef.current = true;
        window.dispatchEvent(new CustomEvent("hero-headline-ready"));
      });
    };

    const idle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => window.setTimeout(cb, 1));
    const idleId = idle(() => {
      void runTimeline();
    });

    return () => {
      cancelled = true;
      const cancel = window.cancelIdleCallback ?? clearTimeout;
      cancel(idleId);
    };
  }, [sectionRef, tier]);

  return (
    <HeroMotionProvider
      tier={tier}
      sectionRef={sectionRef}
      scrollProgress={scrollProgress}
      setScrollProgress={setScrollProgress}
      loadTimelineReady={loadTimelineReady}
      registerLoadTarget={registerLoadTarget}
      headlineReadyRef={headlineReadyRef}
    >
      {tier !== "reduced" ? <HomeHeroAmbientLayers /> : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 lg:opacity-20" aria-hidden />
        </>
      )}
      {children}
    </HeroMotionProvider>
  );
}
