"use client";

import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { ServiceCardsDesktop } from "@/components/marketing/ServiceCardsDesktop";
import { ServiceCardsMobile } from "@/components/marketing/ServiceCardsMobile";
import type { PublicServiceRecord } from "@/server/domain/catalog";

type ServiceCardsViewportGateProps = {
  services: PublicServiceRecord[];
};

export function ServiceCardsViewportGate({ services }: ServiceCardsViewportGateProps) {
  return (
    <MarketingViewportGate
      mobile={<ServiceCardsMobile services={services} />}
      desktop={<ServiceCardsDesktop services={services} />}
    />
  );
}
