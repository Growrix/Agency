"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Caps how many heavy preview iframes are allowed to begin mounting at the same
 * time. A slot is held briefly after a mount is granted so the browser can get
 * the iframe's initial load underway before the next queued preview starts,
 * which smooths the network/main-thread burst on preview-heavy pages.
 */
const MAX_CONCURRENT_MOUNTS = 2;
const SLOT_HOLD_MS = 1200;
const DEFAULT_ROOT_MARGIN = "320px 0px";
const DESKTOP_LAYOUT_QUERY = "(min-width: 1024px)";

let activeMounts = 0;
const pendingGrants: Array<{ grant: () => void; priority: boolean }> = [];

function dequeueNextGrant() {
  const priorityIndex = pendingGrants.findIndex((entry) => entry.priority);
  if (priorityIndex >= 0) {
    return pendingGrants.splice(priorityIndex, 1)[0]?.grant;
  }

  return pendingGrants.shift()?.grant;
}

function acquireMountSlot(onGrant: () => void, priority = false) {
  if (activeMounts < MAX_CONCURRENT_MOUNTS) {
    activeMounts += 1;
    onGrant();
    return;
  }

  pendingGrants.push({ grant: onGrant, priority });
}

function releaseMountSlot() {
  const next = dequeueNextGrant();
  if (next) {
    // Hand the slot directly to the next waiter without changing the count.
    next();
    return;
  }

  activeMounts = Math.max(0, activeMounts - 1);
}

function isElementEligible(node: HTMLElement, rootMargin: string) {
  const rect = node.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) {
    return false;
  }

  const verticalMargin = Number.parseFloat(rootMargin) || 0;
  return rect.top < window.innerHeight + verticalMargin && rect.bottom > -verticalMargin;
}

type UseDeferredPreviewOptions = {
  /** How far outside the viewport (px) a card can be before it starts loading. */
  rootMargin?: string;
  /** Jump to the front of the mount queue when this card becomes eligible. */
  priority?: boolean;
  /** Skip deferral entirely (e.g. shop catalog eager previews). */
  disabled?: boolean;
};

/**
 * Defers rendering of an expensive preview until the host element approaches the
 * viewport, then routes the mount through a global concurrency limiter. Once a
 * preview is shown it stays mounted to avoid scroll-driven remount churn.
 */
export function useDeferredPreview<T extends HTMLElement>(options?: UseDeferredPreviewOptions) {
  const ref = useRef<T>(null);
  const disabled = options?.disabled ?? false;
  const [shouldRender, setShouldRender] = useState(disabled);
  const requestedRef = useRef(disabled);
  const rootMargin = options?.rootMargin ?? DEFAULT_ROOT_MARGIN;
  const priority = options?.priority ?? false;

  useEffect(() => {
    if (disabled) {
      return;
    }

    const node = ref.current;
    if (!node || requestedRef.current) {
      return;
    }

    const requestMount = () => {
      if (requestedRef.current) {
        return;
      }

      requestedRef.current = true;
      acquireMountSlot(() => {
        setShouldRender(true);
        window.setTimeout(releaseMountSlot, SLOT_HOLD_MS);
      }, priority);
    };

    const tryImmediateMount = () => {
      const current = ref.current;
      if (!current || requestedRef.current) {
        return;
      }

      if (isElementEligible(current, rootMargin)) {
        requestMount();
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      const fallbackId = window.setTimeout(() => requestMount(), 0);
      return () => window.clearTimeout(fallbackId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || requestedRef.current) {
          return;
        }

        observer.disconnect();
        requestMount();
      },
      { rootMargin },
    );

    observer.observe(node);
    tryImmediateMount();

    const desktopLayoutQuery = window.matchMedia(DESKTOP_LAYOUT_QUERY);
    const handleLayoutChange = () => {
      window.requestAnimationFrame(tryImmediateMount);
    };

    desktopLayoutQuery.addEventListener("change", handleLayoutChange);
    window.addEventListener("resize", handleLayoutChange);
    window.addEventListener("load", handleLayoutChange);

    return () => {
      observer.disconnect();
      desktopLayoutQuery.removeEventListener("change", handleLayoutChange);
      window.removeEventListener("resize", handleLayoutChange);
      window.removeEventListener("load", handleLayoutChange);
    };
  }, [disabled, priority, rootMargin]);

  return { ref, shouldRender };
}
