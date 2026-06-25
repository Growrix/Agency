"use client";

import { ArrowUpRightIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { ShopProductHtmlPreviewCard } from "@/components/shop/ShopProductHtmlPreviewCard";
import { HomeDesktopSectionRail } from "@/components/marketing/desktop/HomeDesktopSectionRail";
import { HomeDesktopSplitSection } from "@/components/marketing/desktop/HomeDesktopSplitSection";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { FeaturedProductRowsMobile } from "@/components/marketing/mobile/FeaturedProductRowsMobile";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { HOME_FEATURED_TEMPLATES_COPY } from "@/lib/home-conversion-content";
import type { PublicShopProductRecord } from "@/server/domain/catalog";
import type { HomeSectionShellProps } from "@/lib/homepage-composition";
import { homeSection } from "@/lib/homepage-composition";

type FeaturedProductsProps = {
  products: PublicShopProductRecord[];
  eyebrow?: string;
  title?: string;
  titleLead?: string;
  titleAccent?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  variant?: "default" | "html-preview";
  maxProducts?: number;
  sectionShell?: Partial<HomeSectionShellProps>;
};

function FeaturedProductsMobile({
  products,
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  ctaHref,
  ctaLabel,
  variant,
}: Required<Pick<FeaturedProductsProps, "products">> &
  Pick<
    FeaturedProductsProps,
    "eyebrow" | "title" | "titleLead" | "titleAccent" | "description" | "ctaHref" | "ctaLabel" | "variant"
  >) {
  const isHtmlPreview = variant === "html-preview";

  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={eyebrow!}
        titleLead={titleLead}
        titleAccent={titleAccent}
        title={titleLead && titleAccent ? undefined : title}
        description={description}
      />

      <div className="home-mobile-marketing__cta-row home-mobile-marketing__cta-row--center">
        <LinkButton
          href={ctaHref!}
          className="home-mobile-marketing__cta"
        >
          <span className="home-mobile-marketing__cta-inner">
            <EyeIcon className="home-mobile-marketing__cta-icon" aria-hidden />
            {ctaLabel}
            <ArrowUpRightIcon className="home-mobile-marketing__cta-icon" aria-hidden />
          </span>
        </LinkButton>
      </div>

      {isHtmlPreview ? (
        <FeaturedProductRowsMobile products={products} />
      ) : (
        <RevealGroup className="home-mobile-marketing__stack">
          {products.map((product) => (
            <RevealItem key={product.slug}>
              <ShopProductCard product={product} />
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}

function FeaturedProductsDesktop({
  products,
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  ctaHref,
  ctaLabel,
}: Required<Pick<FeaturedProductsProps, "products">> &
  Pick<
    FeaturedProductsProps,
    "eyebrow" | "title" | "titleLead" | "titleAccent" | "description" | "ctaHref" | "ctaLabel" | "variant"
  >) {
  return (
    <HomeDesktopSplitSection
      rail={
        <HomeDesktopSectionRail
          eyebrow={eyebrow!}
          title={titleLead && titleAccent ? undefined : title}
          titleLead={titleLead}
          titleAccent={titleAccent}
          description={description}
          ctaHref={ctaHref}
          ctaLabel={ctaLabel}
        />
      }
      content={
        <RevealGroup className="home-desktop-marketing__product-grid" stagger={0.07}>
          {products.map((product, index) => (
            <RevealItem key={product.slug} className="h-full min-w-0">
              <ShopProductHtmlPreviewCard product={product} variant="catalog-wide" loadPriority={index === 0} />
            </RevealItem>
          ))}
        </RevealGroup>
      }
    />
  );
}

export function FeaturedProducts({
  products,
  eyebrow = "Featured products",
  title = "Production-ready digital products",
  titleLead,
  titleAccent,
  description = "Templates, starters, and toolkits with Standard, Premium, and Done-For-You options — buy now or hire us to launch it for you.",
  ctaHref = "/digital-products",
  ctaLabel = "Browse all digital products",
  variant = "default",
  maxProducts,
  sectionShell,
}: FeaturedProductsProps) {
  const visibleProducts = maxProducts ? products.slice(0, maxProducts) : products;
  const isHtmlPreview = variant === "html-preview";
  const resolvedEyebrow = isHtmlPreview ? (eyebrow ?? HOME_FEATURED_TEMPLATES_COPY.eyebrow) : eyebrow;
  const resolvedTitle = isHtmlPreview ? (title ?? HOME_FEATURED_TEMPLATES_COPY.title) : title;
  const resolvedTitleLead = titleLead ?? (isHtmlPreview ? HOME_FEATURED_TEMPLATES_COPY.titleLead : undefined);
  const resolvedTitleAccent = titleAccent ?? (isHtmlPreview ? HOME_FEATURED_TEMPLATES_COPY.titleAccent : undefined);
  const resolvedDescription =
    isHtmlPreview && description === "Templates, starters, and toolkits with Standard, Premium, and Done-For-You options — buy now or hire us to launch it for you."
      ? HOME_FEATURED_TEMPLATES_COPY.description
      : description;

  if (visibleProducts.length === 0) {
    return null;
  }

  const shell = { ...homeSection("featured-templates"), ...sectionShell };
  const sharedProps = {
    products: visibleProducts,
    eyebrow: resolvedEyebrow,
    title: resolvedTitle,
    titleLead: resolvedTitleLead,
    titleAccent: resolvedTitleAccent,
    description: resolvedDescription,
    ctaHref,
    ctaLabel,
    variant,
  };

  return (
    <Section {...shell} className={isHtmlPreview ? "overflow-x-hidden" : undefined}>
      <Container className={isHtmlPreview ? "min-w-0" : undefined}>
        <MarketingViewportGate
          mobile={<FeaturedProductsMobile {...sharedProps} />}
          desktop={<FeaturedProductsDesktop {...sharedProps} />}
        />
      </Container>
    </Section>
  );
}
