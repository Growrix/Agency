"use client";

import { useEffect } from "react";

const REDIRECT_DELAY_MS = 2000;

export function PaymentAutoRedirect({ href }: { href: string }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = window.setTimeout(() => {
      window.location.assign(href);
    }, REDIRECT_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [href]);

  return null;
}
