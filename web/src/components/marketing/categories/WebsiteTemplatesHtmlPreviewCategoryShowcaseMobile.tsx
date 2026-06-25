"use client";

import {
  WebsiteTemplateHtmlDesktopPreviewBlock,
  WebsiteTemplateHtmlMobilePreviewBlock,
} from "@/components/sections/WebsiteTemplateHtmlDualPreview";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SHOWCASE_SECTION } from "@/lib/website-templates-html-preview-category-content";

type WebsiteTemplatesHtmlPreviewCategoryShowcaseMobileProps = {
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
};

export function WebsiteTemplatesHtmlPreviewCategoryShowcaseMobile({
  slides,
  emptyFallbackSlide,
}: WebsiteTemplatesHtmlPreviewCategoryShowcaseMobileProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SHOWCASE_SECTION.eyebrow}
        titleLead={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SHOWCASE_SECTION.titleLead}
        titleAccent={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SHOWCASE_SECTION.titleAccent}
        title={
          WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SHOWCASE_SECTION.titleLead
            ? undefined
            : WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SHOWCASE_SECTION.title
        }
        description={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SHOWCASE_SECTION.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__preview-stack">
        <div className="home-mobile-marketing__preview-panel home-mobile-marketing__preview-panel--desktop">
          <WebsiteTemplateHtmlDesktopPreviewBlock
            slides={slides}
            emptyFallbackSlide={emptyFallbackSlide}
            posterFirst={false}
          />
        </div>
        <div className="home-mobile-marketing__preview-panel">
          <WebsiteTemplateHtmlMobilePreviewBlock
            slides={slides}
            emptyFallbackSlide={emptyFallbackSlide}
            reverseLayout
            autoPlay={false}
          />
        </div>
      </div>
    </div>
  );
}
