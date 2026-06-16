'use client';

import { useEffect, useRef, useState } from 'react';

const revealCallbacks = new Map<Element, () => void>();
let revealObserver: IntersectionObserver | null = null;

function getRevealObserver() {
  if (revealObserver || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return revealObserver;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const callback = revealCallbacks.get(entry.target);
        if (!callback) return;
        revealCallbacks.delete(entry.target);
        revealObserver?.unobserve(entry.target);
        callback();
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -4% 0px' },
  );

  return revealObserver;
}

function releaseRevealObserver() {
  if (revealCallbacks.size > 0 || !revealObserver) return;
  revealObserver.disconnect();
  revealObserver = null;
}

export function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = getRevealObserver();
    if (!observer) {
      setRevealed(true);
      return;
    }

    revealCallbacks.set(node, () => setRevealed(true));
    observer.observe(node);
    return () => {
      revealCallbacks.delete(node);
      observer.unobserve(node);
      releaseRevealObserver();
    };
  }, [revealed]);

  return { ref, revealed };
}
