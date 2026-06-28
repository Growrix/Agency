"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights),
  { ssr: false },
);

/** Mount after window load so Speed Insights does not count toward domcontentloaded resource budget. */
export function DeferredSpeedInsights() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const enable = () => setMounted(true);
    if (document.readyState === "complete") {
      enable();
      return;
    }
    window.addEventListener("load", enable, { once: true });
    return () => window.removeEventListener("load", enable);
  }, []);

  if (!mounted) {
    return null;
  }

  return <SpeedInsights />;
}
