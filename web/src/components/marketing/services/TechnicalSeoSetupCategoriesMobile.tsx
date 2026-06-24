"use client";

import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { MobileMarketingTabs } from "@/components/marketing/mobile/MobileMarketingTabs";
import type { SeoSetupCategory } from "@/lib/technical-seo-service-content";
import { TECHNICAL_SEO_SETUP_CATEGORIES_SECTION } from "@/lib/technical-seo-service-content";

type TechnicalSeoSetupCategoriesMobileProps = {
  categories?: readonly SeoSetupCategory[];
  footerNote?: string;
};

export function TechnicalSeoSetupCategoriesMobile({
  categories = TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.categories,
  footerNote = TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.footerNote,
}: TechnicalSeoSetupCategoriesMobileProps) {
  const [activeTabId, setActiveTabId] = useState(categories[0]?.id ?? "");
  const activeCategory = categories.find((category) => category.id === activeTabId) ?? categories[0];

  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.eyebrow}
        titleLead={TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.titleLead}
        titleAccent={TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.titleAccent}
        description={TECHNICAL_SEO_SETUP_CATEGORIES_SECTION.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <MobileMarketingTabs
        tabs={categories.map((category) => ({ id: category.id, label: category.title }))}
        activeTabId={activeTabId}
        onTabChange={setActiveTabId}
        ariaLabel="Technical SEO setup categories"
        variant="segmented"
      />

      {activeCategory ? (
        <div
          className="home-mobile-marketing__tabs-panel"
          role="tabpanel"
          aria-label={activeCategory.title}
        >
          <div className="home-mobile-marketing__tabs-panel-head">
            <h3 className="home-mobile-marketing__tabs-panel-title">{activeCategory.title}</h3>
            {activeCategory.badge ? <Badge tone="secondary">{activeCategory.badge}</Badge> : null}
          </div>
          <ul className="home-mobile-marketing__seo-checklist-items" aria-label={activeCategory.title}>
            {activeCategory.items.map((item) => (
              <li key={item} className="home-mobile-marketing__seo-checklist-item">
                <CheckIcon className="home-mobile-marketing__seo-checklist-item-icon" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="home-mobile-marketing__note">{footerNote}</p>
    </div>
  );
}
