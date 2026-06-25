"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import {
  WebsiteTemplateHtmlDesktopPreviewCarousel,
  WebsiteTemplateHtmlHeroPreviewFooter,
} from "@/components/sections/WebsiteTemplateHtmlDualPreview";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import {
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO,
  buildWebsiteTemplatesCategoryHeroStats,
  getWebsiteTemplatesCategoryAnchorHref,
} from "@/lib/website-templates-html-preview-category-content";

type WebsiteTemplatesHtmlPreviewCategoryHeroMobileProps = {
  slides: HtmlProfileHeroSlide[];
  previewCount: number;
  catalogCount: number;
  secondaryHref: string;
  showBackLink?: boolean;
};

export function WebsiteTemplatesHtmlPreviewCategoryHeroMobile({
  slides,
  previewCount,
  catalogCount,
  secondaryHref,
  showBackLink = true,
}: WebsiteTemplatesHtmlPreviewCategoryHeroMobileProps) {
  const stats = buildWebsiteTemplatesCategoryHeroStats(catalogCount, previewCount);

  return (
    <div className="services-landing-hero-mobile w-full">
      {showBackLink ? (
        <Link href={WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.backHref} className="service-detail-hero-mobile__back">
          ← {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.backLabel}
        </Link>
      ) : null}

      <div className="service-detail-hero-mobile__copy">
        <Badge tone="primary" dot className="service-detail-hero-mobile__badge">
          {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.eyebrow}
        </Badge>

        <h1 className="service-detail-hero-mobile__title">
          <span className="block">{WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.titleLead}</span>
          <span className="block marketing-title-accent">{WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.titleAccent}</span>
        </h1>

        <p className="service-detail-hero-mobile__description">
          {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.description}
        </p>

        <div className="service-detail-hero-mobile__cta-stack">
          <LinkButton
            href={getWebsiteTemplatesCategoryAnchorHref("profiles")}
            fullWidth
            className="service-detail-hero-mobile__cta-primary"
          >
            <span className="service-detail-hero-mobile__cta-inner">
              {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.primaryCta}
              <ArrowRightIcon className="service-detail-hero-mobile__cta-icon" aria-hidden />
            </span>
          </LinkButton>
          <LinkButton href={secondaryHref} variant="outline" fullWidth className="service-detail-hero-mobile__cta-secondary">
            {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.secondaryCta}
          </LinkButton>
        </div>
      </div>

      <div className="html-business-profiles-category-hero-mobile__stats">
        {stats.map((metric) => (
          <div key={metric.label} className="html-business-profiles-category-hero-mobile__stat">
            <p className="html-business-profiles-category-hero-mobile__stat-value">{metric.value}</p>
            <p className="html-business-profiles-category-hero-mobile__stat-label">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="html-business-profiles-category-hero-mobile__preview website-templates-category-hero-mobile__preview">
        <p className="html-business-profiles-category-hero-mobile__preview-label">
          {WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_HERO.previewLabel}
        </p>
        <div className="website-templates-category-hero-mobile__carousel">
          <WebsiteTemplateHtmlDesktopPreviewCarousel
            slides={slides}
            fillHeight={false}
            desktopPreviewFit="width"
            autoPlay={false}
            minHeightClass="min-h-[240px]"
            className="min-h-[240px]"
          />
        </div>
        <WebsiteTemplateHtmlHeroPreviewFooter previewCount={previewCount} />
      </div>
    </div>
  );
}
