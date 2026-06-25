"use client";

import { ArrowRightIcon, ArrowUpRightIcon, EyeIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { FeaturedProductRowsMobile } from "@/components/marketing/mobile/FeaturedProductRowsMobile";
import type { ShopProduct } from "@/lib/shop";
import {
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_CATALOG_SECTION,
  getWebsiteTemplatesCategoryAnchorHref,
} from "@/lib/website-templates-html-preview-category-content";

type WebsiteTemplatesHtmlPreviewCategoryCatalogMobileProps = {
  products: ShopProduct[];
  featuredHref: string;
};

export function WebsiteTemplatesHtmlPreviewCategoryCatalogMobile({
  products,
  featuredHref,
}: WebsiteTemplatesHtmlPreviewCategoryCatalogMobileProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_CATALOG_SECTION.eyebrow}
        titleLead={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_CATALOG_SECTION.titleLead}
        titleAccent={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_CATALOG_SECTION.titleAccent}
        description={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_CATALOG_SECTION.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__cta-row home-mobile-marketing__cta-row--center">
        <LinkButton href={getWebsiteTemplatesCategoryAnchorHref("profiles")} className="home-mobile-marketing__cta">
          <span className="home-mobile-marketing__cta-inner">
            <EyeIcon className="home-mobile-marketing__cta-icon" aria-hidden />
            {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_CATALOG_SECTION.browseCta}
            <ArrowUpRightIcon className="home-mobile-marketing__cta-icon" aria-hidden />
          </span>
        </LinkButton>
      </div>

      <FeaturedProductRowsMobile products={products} previewLayout="split-desktop" />

      <div className="home-mobile-marketing__cta-row home-mobile-marketing__cta-row--center">
        <LinkButton href={featuredHref} variant="outline" className="home-mobile-marketing__cta">
          <span className="home-mobile-marketing__cta-inner">
            {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_CATALOG_SECTION.featuredCta}
            <ArrowRightIcon className="home-mobile-marketing__cta-icon" aria-hidden />
          </span>
        </LinkButton>
      </div>
    </div>
  );
}
