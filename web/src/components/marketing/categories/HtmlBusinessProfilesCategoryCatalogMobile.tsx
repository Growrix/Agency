"use client";

import { ArrowUpRightIcon, EyeIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { FeaturedProductRowsMobile } from "@/components/marketing/mobile/FeaturedProductRowsMobile";
import type { ShopProduct } from "@/lib/shop";
import {
  HTML_BUSINESS_PROFILES_CATEGORY_CATALOG_SECTION,
  HTML_BUSINESS_PROFILES_CATEGORY_PATH,
} from "@/lib/html-business-profiles-category-content";

type HtmlBusinessProfilesCategoryCatalogMobileProps = {
  products: ShopProduct[];
};

export function HtmlBusinessProfilesCategoryCatalogMobile({
  products,
}: HtmlBusinessProfilesCategoryCatalogMobileProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={HTML_BUSINESS_PROFILES_CATEGORY_CATALOG_SECTION.eyebrow}
        titleLead={HTML_BUSINESS_PROFILES_CATEGORY_CATALOG_SECTION.titleLead}
        titleAccent={HTML_BUSINESS_PROFILES_CATEGORY_CATALOG_SECTION.titleAccent}
        description={HTML_BUSINESS_PROFILES_CATEGORY_CATALOG_SECTION.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__cta-row home-mobile-marketing__cta-row--center">
        <LinkButton href={HTML_BUSINESS_PROFILES_CATEGORY_PATH} className="home-mobile-marketing__cta">
          <span className="home-mobile-marketing__cta-inner">
            <EyeIcon className="home-mobile-marketing__cta-icon" aria-hidden />
            {HTML_BUSINESS_PROFILES_CATEGORY_CATALOG_SECTION.viewAllCta}
            <ArrowUpRightIcon className="home-mobile-marketing__cta-icon" aria-hidden />
          </span>
        </LinkButton>
      </div>

      <FeaturedProductRowsMobile products={products} previewLayout="profile-mobile" />
    </div>
  );
}
