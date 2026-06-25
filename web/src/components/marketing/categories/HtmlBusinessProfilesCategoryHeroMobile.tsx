"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { HtmlProfileHeroCarousel } from "@/components/sections/HtmlProfileHeroCarousel";
import {
  HTML_BUSINESS_PROFILES_CATEGORY_HERO,
  HTML_BUSINESS_PROFILES_CATEGORY_PATH,
  buildHtmlBusinessProfilesCategoryHeroSlides,
  getHtmlBusinessProfilesCategoryAnchorHref,
} from "@/lib/html-business-profiles-category-content";

type CategoryHeroProduct = {
  slug: string;
  name: string;
  type: string;
  price: string;
  embeddedPreviewUrl?: string;
  livePreviewUrl?: string;
};

type HtmlBusinessProfilesCategoryHeroMobileProps = {
  products: CategoryHeroProduct[];
  showBackLink?: boolean;
};

export function HtmlBusinessProfilesCategoryHeroMobile({
  products,
  showBackLink = true,
}: HtmlBusinessProfilesCategoryHeroMobileProps) {
  const heroSlides = buildHtmlBusinessProfilesCategoryHeroSlides(products);

  return (
    <div className="services-landing-hero-mobile w-full">
      {showBackLink ? (
        <Link href={HTML_BUSINESS_PROFILES_CATEGORY_HERO.backHref} className="service-detail-hero-mobile__back">
          ← {HTML_BUSINESS_PROFILES_CATEGORY_HERO.backLabel}
        </Link>
      ) : null}

      <div className="service-detail-hero-mobile__copy">
        <Badge tone="primary" dot className="service-detail-hero-mobile__badge">
          {HTML_BUSINESS_PROFILES_CATEGORY_HERO.eyebrow}
        </Badge>

        <h1 className="service-detail-hero-mobile__title">
          <span className="block">{HTML_BUSINESS_PROFILES_CATEGORY_HERO.titleLead}</span>
          <span className="block marketing-title-accent">{HTML_BUSINESS_PROFILES_CATEGORY_HERO.titleAccent}</span>
        </h1>

        <p className="service-detail-hero-mobile__description">
          {HTML_BUSINESS_PROFILES_CATEGORY_HERO.description}
        </p>

        <div className="service-detail-hero-mobile__cta-stack">
          <LinkButton
            href={getHtmlBusinessProfilesCategoryAnchorHref("profiles")}
            fullWidth
            className="service-detail-hero-mobile__cta-primary"
          >
            <span className="service-detail-hero-mobile__cta-inner">
              {HTML_BUSINESS_PROFILES_CATEGORY_HERO.primaryCta}
              <ArrowRightIcon className="service-detail-hero-mobile__cta-icon" aria-hidden />
            </span>
          </LinkButton>
          <LinkButton
            href={HTML_BUSINESS_PROFILES_CATEGORY_PATH}
            variant="outline"
            fullWidth
            className="service-detail-hero-mobile__cta-secondary"
          >
            {HTML_BUSINESS_PROFILES_CATEGORY_HERO.secondaryCta}
          </LinkButton>
        </div>
      </div>

      <div className="html-business-profiles-category-hero-mobile__stats">
        {HTML_BUSINESS_PROFILES_CATEGORY_HERO.stats.map((metric) => (
          <div key={metric.label} className="html-business-profiles-category-hero-mobile__stat">
            <p className="html-business-profiles-category-hero-mobile__stat-value">{metric.value}</p>
            <p className="html-business-profiles-category-hero-mobile__stat-label">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="html-business-profiles-category-hero-mobile__preview">
        <p className="html-business-profiles-category-hero-mobile__preview-label">
          {HTML_BUSINESS_PROFILES_CATEGORY_HERO.previewLabel}
        </p>
        <HtmlProfileHeroCarousel
          slides={heroSlides}
          previewMode="mobile-frame"
          mobilePreviewMaxHeight={360}
          mobilePreviewShowViewportLabel={false}
          autoPlay={false}
        />
      </div>
    </div>
  );
}
