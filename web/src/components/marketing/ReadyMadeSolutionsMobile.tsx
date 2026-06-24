"use client";

import { useMemo, useState } from "react";
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { MobileMarketingTabs } from "@/components/marketing/mobile/MobileMarketingTabs";
import { ShopProductHomeMobileRowCard } from "@/components/shop/ShopProductHomeMobileRowCard";
import { HOME_READY_MADE_SOLUTIONS_COPY } from "@/lib/home-conversion-content";
import {
  getReadyMadeSolutionCategoryHref,
  type ReadyMadeSolutionTabDefinition,
} from "@/lib/ready-made-solutions";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

type ReadyMadeSolutionsMobileProps = {
  tabs: ReadyMadeSolutionTabDefinition[];
  productsByTabId: Record<string, PublicShopProductRecord[]>;
};

export function ReadyMadeSolutionsMobile({ tabs, productsByTabId }: ReadyMadeSolutionsMobileProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? "");
  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId) ?? tabs[0],
    [activeTabId, tabs],
  );
  const activeProducts = activeTab ? (productsByTabId[activeTab.id] ?? []) : [];

  if (!activeTab) {
    return null;
  }

  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={HOME_READY_MADE_SOLUTIONS_COPY.eyebrow}
        titleLead={HOME_READY_MADE_SOLUTIONS_COPY.titleLead}
        titleAccent={HOME_READY_MADE_SOLUTIONS_COPY.titleAccent}
        description={HOME_READY_MADE_SOLUTIONS_COPY.description}
      />

      <MobileMarketingTabs
        tabs={tabs.map((tab) => ({ id: tab.id, label: tab.label }))}
        activeTabId={activeTab.id}
        onTabChange={setActiveTabId}
        ariaLabel="Solution categories"
        className="justify-center"
      />

      <p className="home-mobile-marketing__note mx-auto max-w-(--home-mobile-marketing-header-max-width)">
        <ComputerDesktopIcon className="home-mobile-marketing__note-icon" aria-hidden />
        <span>{activeTab.description}</span>
      </p>

      <div className="home-mobile-marketing__stack" role="tabpanel">
        {activeProducts.length > 0 ? (
          activeProducts.map((product, index) => (
            <ShopProductHomeMobileRowCard key={product.slug} product={product} loadPriority={index === 0} />
          ))
        ) : (
          <div className="home-mobile-marketing__path-card text-center">
            <p className="home-mobile-marketing__path-card-title">No preview products in this category yet.</p>
            <LinkButton href={getReadyMadeSolutionCategoryHref(activeTab.categorySlug)} className="mt-4">
              Browse category
            </LinkButton>
          </div>
        )}
      </div>
    </div>
  );
}
