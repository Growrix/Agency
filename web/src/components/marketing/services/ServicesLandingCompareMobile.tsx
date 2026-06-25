"use client";

import { useState } from "react";
import { Badge } from "@/components/primitives/Badge";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { MobileMarketingTabs } from "@/components/marketing/mobile/MobileMarketingTabs";
import type { PublicServiceRecord } from "@/server/domain/catalog";

export type ServiceCompareRow = {
  label: string;
  values: Record<string, string>;
};

type ServicesLandingCompareMobileProps = {
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  services: PublicServiceRecord[];
  rows: ServiceCompareRow[];
};

export function ServicesLandingCompareMobile({
  eyebrow,
  titleLead,
  titleAccent,
  description,
  services,
  rows,
}: ServicesLandingCompareMobileProps) {
  const [activeSlug, setActiveSlug] = useState(services[0]?.slug ?? "");

  const activeService = services.find((service) => service.slug === activeSlug) ?? services[0];

  if (!activeService) {
    return null;
  }

  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={eyebrow}
        titleLead={titleLead}
        titleAccent={titleAccent}
        description={description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <MobileMarketingTabs
        tabs={services.map((service) => ({ id: service.slug, label: service.title }))}
        activeTabId={activeService.slug}
        onTabChange={setActiveSlug}
        ariaLabel="Compare services"
        variant="segmented"
        className="services-landing-compare-mobile__tabs"
      />

      <div className="home-mobile-marketing__tabs-panel services-landing-compare-mobile__panel">
        <div className="home-mobile-marketing__tabs-panel-head">
          <h3 className="home-mobile-marketing__tabs-panel-title">{activeService.title}</h3>
          <Badge tone="primary">{activeService.delivery_timeline}</Badge>
        </div>

        <dl className="services-landing-compare-mobile__rows">
          {rows.map((row) => (
            <div key={row.label} className="services-landing-compare-mobile__row">
              <dt className="services-landing-compare-mobile__row-label">{row.label}</dt>
              <dd className="services-landing-compare-mobile__row-value">
                {row.values[activeService.slug as keyof typeof row.values]}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
