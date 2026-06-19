"use client";

import { useEffect, useRef, useState } from "react";

type UseTopChromeVisibilityOptions = {
  /** Minimum scroll delta (px) before toggling visibility. */
  hideDelta?: number;
  /** Upward movement needed before re-showing chrome. */
  showDelta?: number;
  /** Always show the chrome while scrollY is at or below this value. */
  topOffset?: number;
};

function getScrollY() {
  if (typeof window === "undefined") {
    return 0;
  }
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

/**
 * Returns whether the top chrome (utility ribbon + header) should be visible.
 * Hides while scrolling down (after leaving topOffset); shows on any upward scroll.
 */
export function useTopChromeVisibility(options?: UseTopChromeVisibilityOptions) {
  const hideDelta = options?.hideDelta ?? 8;
  const showDelta = options?.showDelta ?? 1;
  const topOffset = options?.topOffset ?? 64;
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const lastY = useRef(0);
  const downAccum = useRef(0);
  const upAccum = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    let rafId = 0;

    const applyVisibility = (next: boolean) => {
      if (visibleRef.current === next) {
        return;
      }
      visibleRef.current = next;
      setVisible(next);
    };

    const evaluate = () => {
      rafId = 0;
      const y = getScrollY();

      if (y <= topOffset) {
        applyVisibility(true);
        downAccum.current = 0;
        upAccum.current = 0;
      } else {
        const movement = y - lastY.current;
        if (movement < 0) {
          upAccum.current += -movement;
          downAccum.current = 0;
          if (upAccum.current >= showDelta) {
            applyVisibility(true);
            upAccum.current = 0;
          }
        } else if (movement > 0) {
          downAccum.current += movement;
          upAccum.current = 0;
          if (downAccum.current >= hideDelta) {
            applyVisibility(false);
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
    setReady(true);

    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      document.removeEventListener("scroll", onScroll, { capture: true });
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      setReady(false);
    };
  }, [hideDelta, showDelta, topOffset]);

  return { visible, ready };
}

/** @deprecated Use useTopChromeVisibility — kept for any legacy imports. */
export function useScrollDirection(options?: UseTopChromeVisibilityOptions) {
  const { visible } = useTopChromeVisibility(options);
  return {
    direction: visible ? null : ("down" as const),
    isAtTop: visible,
    scrollY: typeof window !== "undefined" ? getScrollY() : 0,
  };
}
