"use client";

import type { ReactNode } from "react";

type MarketingViewportGateProps = {
  mobile: ReactNode | null;
  desktop: ReactNode;
};

/**
 * Renders phone and desktop variants together; visibility is controlled by CSS
 * media queries so the correct layout paints on first frame (no SSR flash).
 * Cutover: 768px (md) — tablet and up use the desktop tree as a fluid layout.
 */
export function MarketingViewportGate({ mobile, desktop }: MarketingViewportGateProps) {
  return (
    <div className="marketing-viewport-gate">
      {mobile !== null ? <div className="marketing-viewport-gate__mobile">{mobile}</div> : null}
      <div className="marketing-viewport-gate__desktop">{desktop}</div>
    </div>
  );
}
