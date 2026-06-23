"use client";

import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { FooterDesktop, FooterMobile } from "@/components/shell/FooterMobile";

export function Footer() {
  return <MarketingViewportGate mobile={<FooterMobile />} desktop={<FooterDesktop />} />;
}
