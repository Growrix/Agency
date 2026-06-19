"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Caps how many heavy preview iframes are allowed to begin mounting at the same
 * time. A slot is held briefly after a mount is granted so the browser can get
 * the iframe's initial load underway before the next queued preview starts,
 * which smooths the network/main-thread burst on preview-heavy pages.
 */
const MAX_CONCURRENT_MOUNTS = 2;
const SLOT_HOLD_MS = 1500;

let activeMounts = 0;
const pendingGrants: Array<() => void> = [];

function acquireMountSlot(onGrant: () => void) {
  if (activeMounts < MAX_CONCURRENT_MOUNTS) {
    activeMounts += 1;
    onGrant();
    return;
  }

  pendingGrants.push(onGrant);
}

function releaseMountSlot() {
  const next = pendingGrants.shift();
  if (next) {
    // Hand the slot directly to the next waiter without changing the count.
    next();
    return;
  }

  activeMounts = Math.max(0, activeMounts - 1);
}

type UseDeferredPreviewOptions = {
  /** How far outside the viewport (px) a card can be before it starts loading. */
  rootMargin?: string;
};

/**
 * Defers rendering of an expensive preview until the host element approaches the
 * viewport, then routes the mount through a global concurrency limiter. Once a
 * preview is shown it stays mounted to avoid scroll-driven remount churn.
 */
export function useDeferredPreview<T extends HTMLElement>(options?: UseDeferredPreviewOptions) {
  const ref = useRef<T>(null);
  const [shouldRender, setShouldRender] = useState(false);
  const requestedRef = useRef(false);
  const rootMargin = options?.rootMargin ?? "300px 0px";

  useEffect(() => {
    const node = ref.current;
    if (!node || requestedRef.current) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      requestedRef.current = true;
      const fallbackId = window.setTimeout(() => setShouldRender(true), 0);
      return () => window.clearTimeout(fallbackId);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || requestedRef.current) {
          return;
        }

        requestedRef.current = true;
        observer.disconnect();
        acquireMountSlot(() => {
          setShouldRender(true);
          window.setTimeout(releaseMountSlot, SLOT_HOLD_MS);
        });
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, shouldRender };
}
