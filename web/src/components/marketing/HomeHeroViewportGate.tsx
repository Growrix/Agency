"use client";

import type { ReactNode } from "react";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";

type HomeHeroViewportGateProps = {
  mobile: ReactNode;
  desktop: ReactNode;
};

export function HomeHeroViewportGate({ mobile, desktop }: HomeHeroViewportGateProps) {
  return <MarketingViewportGate mobile={mobile} desktop={desktop} />;
}
