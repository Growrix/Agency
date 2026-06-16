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

/**
 * Returns whether the top chrome (utility ribbon + header) should be visible.
 * Hides while scrolling down (after leaving topOffset); shows on any upward scroll.
 */
export function useTopChromeVisibility(options?: UseTopChromeVisibilityOptions) {
  const hideDelta = options?.hideDelta ?? 8;
  const showDelta = options?.showDelta ?? 1;
  const topOffset = options?.topOffset ?? 64;
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const downAccum = useRef(0);
  const upAccum = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;

      if (y <= topOffset) {
        setVisible(true);
        downAccum.current = 0;
        upAccum.current = 0;
      } else {
        const movement = y - lastY.current;
        if (movement < 0) {
          upAccum.current += -movement;
          downAccum.current = 0;
          if (upAccum.current >= showDelta) {
            setVisible(true);
            upAccum.current = 0;
          }
        } else if (movement > 0) {
          // Hide only after cumulative downward motion crosses threshold.
          downAccum.current += movement;
          upAccum.current = 0;
          if (downAccum.current >= hideDelta) {
            setVisible(false);
            downAccum.current = 0;
          }
        }
      }

      lastY.current = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideDelta, showDelta, topOffset]);

  return visible;
}

/** @deprecated Use useTopChromeVisibility — kept for any legacy imports. */
export function useScrollDirection(options?: UseTopChromeVisibilityOptions) {
  const visible = useTopChromeVisibility(options);
  return {
    direction: visible ? null : ("down" as const),
    isAtTop: visible,
    scrollY: typeof window !== "undefined" ? window.scrollY : 0,
  };
}
