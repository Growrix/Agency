"use client";

import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { ReadyMadeSolutionsDesktop } from "@/components/marketing/ReadyMadeSolutionsDesktop";
import { ReadyMadeSolutionsMobile } from "@/components/marketing/ReadyMadeSolutionsMobile";
import { Container, Section } from "@/components/primitives/Container";
import { homeSection } from "@/lib/homepage-composition";
import type { ReadyMadeSolutionTabDefinition } from "@/lib/ready-made-solutions";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

type ReadyMadeSolutionsSectionProps = {
  tabs: ReadyMadeSolutionTabDefinition[];
  productsByTabId: Record<string, PublicShopProductRecord[]>;
};

export function ReadyMadeSolutionsSection({ tabs, productsByTabId }: ReadyMadeSolutionsSectionProps) {
  const shell = homeSection("ready-made-solutions");

  if (tabs.length === 0) {
    return null;
  }

  return (
    <Section {...shell} className="overflow-x-hidden">
      <Container className="min-w-0">
        <MarketingViewportGate
          mobile={<ReadyMadeSolutionsMobile tabs={tabs} productsByTabId={productsByTabId} />}
          desktop={<ReadyMadeSolutionsDesktop tabs={tabs} productsByTabId={productsByTabId} />}
        />
      </Container>
    </Section>
  );
}
