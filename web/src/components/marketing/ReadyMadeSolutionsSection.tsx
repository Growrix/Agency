"use client";

import { useMemo, useState } from "react";
import { LinkButton } from "@/components/primitives/Button";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ShopProductHtmlMobilePreviewCard } from "@/components/shop/ShopProductHtmlMobilePreviewCard";
import { ShopProductHtmlPreviewCard } from "@/components/shop/ShopProductHtmlPreviewCard";
import { HOME_READY_MADE_SOLUTIONS_COPY } from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import {
  getReadyMadeSolutionCategoryHref,
  getReadyMadeSolutionGridClassName,
  type ReadyMadeSolutionTabDefinition,
} from "@/lib/ready-made-solutions";
import { HERO_TITLE_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

type ReadyMadeSolutionsSectionProps = {
  tabs: ReadyMadeSolutionTabDefinition[];
  productsByTabId: Record<string, PublicShopProductRecord[]>;
};

export function ReadyMadeSolutionsSection({ tabs, productsByTabId }: ReadyMadeSolutionsSectionProps) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? "");
  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId) ?? tabs[0],
    [activeTabId, tabs],
  );
  const activeProducts = activeTab ? (productsByTabId[activeTab.id] ?? []) : [];
  const shell = homeSection("ready-made-solutions");

  if (tabs.length === 0) {
    return null;
  }

  return (
    <Section {...shell} className="overflow-x-hidden">
      <Container className="min-w-0">
        <SectionHeading
          eyebrow={HOME_READY_MADE_SOLUTIONS_COPY.eyebrow}
          title={HOME_READY_MADE_SOLUTIONS_COPY.title}
          description={HOME_READY_MADE_SOLUTIONS_COPY.description}
          titleClassName={HERO_TITLE_CLASS}
        />

        {tabs.length > 1 ? (
          <div
            className="mt-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
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
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-surface text-text-muted hover:border-primary/40 hover:text-text",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        ) : null}

        {activeTab ? (
          <p className="mt-4 max-w-2xl text-sm leading-6 text-text-muted sm:mt-5">
            {activeTab.description}
          </p>
        ) : null}

        <div role="tabpanel" key={activeTab?.id}>
          <div className={activeTab ? getReadyMadeSolutionGridClassName(activeTab.previewMode) : undefined}>
            {activeProducts.length > 0 ? (
              activeProducts.map((product) => (
                <div key={product.slug} className="h-full min-w-0">
                  {activeTab?.previewMode === "website-template-wide" ? (
                    <ShopProductHtmlPreviewCard product={product} variant="catalog-wide" />
                  ) : (
                    <ShopProductHtmlMobilePreviewCard product={product} />
                  )}
                </div>
              ))
            ) : activeTab ? (
              <div className="col-span-full flex min-h-[160px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface p-6 text-center">
                <p className="font-display text-base tracking-tight">No preview products in this category yet.</p>
                <LinkButton
                  href={getReadyMadeSolutionCategoryHref(activeTab.categorySlug)}
                  size="sm"
                  className="mt-4"
                >
                  Browse category
                </LinkButton>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
