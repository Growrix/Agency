"use client";

import { useMemo, useState } from "react";
import { LinkButton } from "@/components/primitives/Button";
import { HomeDesktopSectionRail } from "@/components/marketing/desktop/HomeDesktopSectionRail";
import { HomeDesktopSplitSection } from "@/components/marketing/desktop/HomeDesktopSplitSection";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { ShopProductHtmlMobilePreviewCard } from "@/components/shop/ShopProductHtmlMobilePreviewCard";
import { ShopProductHtmlPreviewCard } from "@/components/shop/ShopProductHtmlPreviewCard";
import { HOME_READY_MADE_SOLUTIONS_COPY } from "@/lib/home-conversion-content";
import {
  getReadyMadeSolutionCategoryHref,
  type ReadyMadeSolutionTabDefinition,
} from "@/lib/ready-made-solutions";
import { cn } from "@/lib/utils";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

type ReadyMadeSolutionsDesktopProps = {
  tabs: ReadyMadeSolutionTabDefinition[];
  productsByTabId: Record<string, PublicShopProductRecord[]>;
};

export function ReadyMadeSolutionsDesktop({ tabs, productsByTabId }: ReadyMadeSolutionsDesktopProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? "");
  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId) ?? tabs[0],
    [activeTabId, tabs],
  );
  const activeProducts = activeTab ? (productsByTabId[activeTab.id] ?? []) : [];
  const featuredProducts = activeProducts.slice(0, 3);
  const browseHref = activeTab ? getReadyMadeSolutionCategoryHref(activeTab.categorySlug) : "/digital-products";
  const isWidePreview = activeTab?.previewMode === "website-template-wide";

  return (
    <HomeDesktopSplitSection
      rail={
        <HomeDesktopSectionRail
          eyebrow={HOME_READY_MADE_SOLUTIONS_COPY.eyebrow}
          titleLead={HOME_READY_MADE_SOLUTIONS_COPY.titleLead}
          titleAccent={HOME_READY_MADE_SOLUTIONS_COPY.titleAccent}
          description={HOME_READY_MADE_SOLUTIONS_COPY.description}
          ctaHref={browseHref}
          ctaLabel="View all products"
        />
      }
      content={
        <div className="flex min-w-0 flex-col gap-4">
          {tabs.length > 1 ? (
            <div
              className="home-desktop-marketing__filter-chips"
              role="tablist"
              aria-label="Solution categories"
            >
              {tabs.map((tab) => {
                const isActive = tab.id === activeTab?.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTabId(tab.id)}
                    className={cn(
                      "home-desktop-marketing__filter-chip",
                      isActive && "home-desktop-marketing__filter-chip--active",
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          ) : null}

          <div role="tabpanel" key={activeTab?.id}>
            {featuredProducts.length > 0 ? (
              <RevealGroup className="home-desktop-marketing__product-grid" stagger={0.06}>
                {featuredProducts.map((product, index) => (
                  <RevealItem key={product.slug} className="h-full min-h-0">
                    {isWidePreview ? (
                      <ShopProductHtmlPreviewCard
                        product={product}
                        variant="catalog-wide"
                        loadPriority={index === 0}
                      />
                    ) : (
                      <ShopProductHtmlMobilePreviewCard product={product} loadPriority={index === 0} />
                    )}
                  </RevealItem>
                ))}
              </RevealGroup>
            ) : activeTab ? (
              <div className="flex min-h-[160px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface p-6 text-center">
                <p className="font-display text-base tracking-tight">No preview products in this category yet.</p>
                <LinkButton href={browseHref} size="sm" className="mt-4">
                  Browse category
                </LinkButton>
              </div>
            ) : null}
          </div>
        </div>
      }
    />
  );
}
