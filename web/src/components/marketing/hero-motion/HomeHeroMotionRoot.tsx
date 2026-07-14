"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { HomeHeroAmbientLayers } from "./HomeHeroAmbientLayers";
import { HeroMotionProvider } from "./HeroMotionContext";
import { sendDebugLog } from "@/lib/debug-log";
import { useHeroMotionProfile } from "./hooks/useHeroMotionProfile";
import { useHeroPointerParallax } from "./hooks/useHeroPointerParallax";
import { useHeroScrollTransform } from "./hooks/useHeroScrollTransform";

type HomeHeroMotionRootProps = {
  sectionRef: RefObject<HTMLElement | null>;
  children: ReactNode;
};

export function HomeHeroMotionRoot({ sectionRef, children }: HomeHeroMotionRootProps) {
  const tier = useHeroMotionProfile();
  // #region agent log
  sendDebugLog("HomeHeroMotionRoot.tsx:30", "HomeHeroMotionRoot render", { tier }, "A");
  // #endregion
  const scrollProgressRef = useRef(0);
  const [loadTimelineReady, setLoadTimelineReady] = useState(false);
  const [copySequenceStarted, setCopySequenceStarted] = useState(false);
  const [copySequenceStartTime, setCopySequenceStartTime] = useState<number | null>(null);
  const [headlineComplete, setHeadlineCompleteState] = useState(false);
  const loadTargetsRef = useRef<Map<string, Element>>(new Map());
  const headlineReadyRef = useRef(false);

  const setScrollProgress = useCallback((value: number) => {
    scrollProgressRef.current = value;
    const section = sectionRef.current;
    if (section) {
      section.style.setProperty("--hero-scroll-progress", String(value));
    }
  }, [sectionRef]);

  const registerLoadTarget = useCallback((key: string, el: Element | null) => {
    if (el) {
      loadTargetsRef.current.set(key, el);
    } else {
      loadTargetsRef.current.delete(key);
    }
  }, []);

  const setHeadlineComplete = useCallback(() => {
    setHeadlineCompleteState(true);
    window.dispatchEvent(new CustomEvent("hero-headline-complete"));
  }, []);

  const startCopySequence = useCallback(() => {
    const now = performance.now();
    setCopySequenceStartTime(now);
    setCopySequenceStarted(true);
    headlineReadyRef.current = true;
    window.dispatchEvent(new CustomEvent("hero-copy-sequence-start"));
    window.dispatchEvent(new CustomEvent("hero-headline-ready"));
  }, []);

  useHeroPointerParallax(sectionRef, tier, tier !== "reduced");
  useHeroScrollTransform(sectionRef, tier, setScrollProgress);

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
      await import("gsap");
      if (cancelled) {
        return;
      }

      setLoadTimelineReady(true);
      startCopySequence();
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
  }, [sectionRef, tier, startCopySequence]);

  return (
    <HeroMotionProvider
      tier={tier}
      sectionRef={sectionRef}
      loadTimelineReady={loadTimelineReady}
      registerLoadTarget={registerLoadTarget}
      headlineReadyRef={headlineReadyRef}
      copySequenceStarted={copySequenceStarted}
      copySequenceStartTime={copySequenceStartTime}
      headlineComplete={headlineComplete}
      setHeadlineComplete={setHeadlineComplete}
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
