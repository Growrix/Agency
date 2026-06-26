"use client";

import { useEffect, useRef, useState } from "react";

type UseScrollChromeVisibilityOptions = {
  /** Minimum scroll delta (px) before toggling visibility. */
  hideDelta?: number;
  /** Upward movement needed before re-showing chrome. */
  showDelta?: number;
  /** Top chrome stays visible while scrollY is at or below this value. */
  topOffset?: number;
};

function getScrollY() {
  if (typeof window === "undefined") {
    return 0;
  }
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

/**
 * Scroll-driven visibility for fixed top chrome and mobile bottom nav.
 * Top chrome: visible at page top; hides on scroll down; returns on scroll up.
 * Bottom nav: hidden at page top and while scrolling down; only appears on scroll up.
 */
export function useScrollChromeVisibility(options?: UseScrollChromeVisibilityOptions) {
  const hideDelta = options?.hideDelta ?? 8;
  const showDelta = options?.showDelta ?? 1;
  const topOffset = options?.topOffset ?? 64;
  const [topVisible, setTopVisible] = useState(true);
  const [bottomNavVisible, setBottomNavVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const lastY = useRef(0);
  const downAccum = useRef(0);
  const upAccum = useRef(0);
  const topVisibleRef = useRef(true);
  const bottomNavVisibleRef = useRef(false);

  useEffect(() => {
    let rafId = 0;

    const applyTopVisibility = (next: boolean) => {
      if (topVisibleRef.current === next) {
        return;
      }
      topVisibleRef.current = next;
      setTopVisible(next);
    };

    const applyBottomNavVisibility = (next: boolean) => {
      if (bottomNavVisibleRef.current === next) {
        return;
      }
      bottomNavVisibleRef.current = next;
      setBottomNavVisible(next);
    };

    const evaluate = () => {
      rafId = 0;
      const y = getScrollY();

      if (y <= topOffset) {
        applyTopVisibility(true);
        applyBottomNavVisibility(false);
        downAccum.current = 0;
        upAccum.current = 0;
      } else {
        const movement = y - lastY.current;
        if (movement < 0) {
          upAccum.current += -movement;
          downAccum.current = 0;
          if (upAccum.current >= showDelta) {
            applyTopVisibility(true);
            applyBottomNavVisibility(true);
            upAccum.current = 0;
          }
        } else if (movement > 0) {
          downAccum.current += movement;
          upAccum.current = 0;
          if (downAccum.current >= hideDelta) {
            applyTopVisibility(false);
            applyBottomNavVisibility(false);
            downAccum.current = 0;
          }
        }
      }

      lastY.current = y;
    };

    const onScroll = () => {
      if (rafId) {
        return;
      }
      rafId = window.requestAnimationFrame(evaluate);
    };

    lastY.current = getScrollY();
    evaluate();
    const readyRaf = window.requestAnimationFrame(() => {
      setReady(true);
    });

    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      document.removeEventListener("scroll", onScroll, { capture: true });
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.cancelAnimationFrame(readyRaf);
      queueMicrotask(() => {
        setReady(false);
      });
    };
  }, [hideDelta, showDelta, topOffset]);

  return { topVisible, bottomNavVisible, ready };
}

/** @deprecated Use useScrollChromeVisibility — kept for legacy imports. */
export function useTopChromeVisibility(options?: UseScrollChromeVisibilityOptions) {
  const { topVisible, ready } = useScrollChromeVisibility(options);
  return { visible: topVisible, ready };
}

/** @deprecated Use useScrollChromeVisibility — kept for any legacy imports. */
export function useScrollDirection(options?: UseScrollChromeVisibilityOptions) {
  const { topVisible } = useScrollChromeVisibility(options);
  return {
    direction: topVisible ? null : ("down" as const),
    isAtTop: topVisible,
    scrollY: typeof window !== "undefined" ? getScrollY() : 0,
  };
}
