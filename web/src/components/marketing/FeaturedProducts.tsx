"use client";

import Link from "next/link";
import { ArrowUpRightIcon, EyeIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { ShopProductHomeMobileRowCard } from "@/components/shop/ShopProductHomeMobileRowCard";
import { ShopProductHtmlPreviewCard } from "@/components/shop/ShopProductHtmlPreviewCard";
import { HOME_FEATURED_TEMPLATES_COPY } from "@/lib/home-conversion-content";
import { HERO_TITLE_CLASS } from "@/lib/typography";
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

      <RevealGroup className="home-mobile-marketing__stack">
        {products.map((product, index) => (
          <RevealItem key={product.slug}>
            {isHtmlPreview ? (
              <ShopProductHomeMobileRowCard product={product} loadPriority={index === 0} />
            ) : (
              <ShopProductCard product={product} />
            )}
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}

function FeaturedProductsDesktop({
  products,
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel,
  variant,
}: Required<Pick<FeaturedProductsProps, "products">> &
  Pick<FeaturedProductsProps, "eyebrow" | "title" | "description" | "ctaHref" | "ctaLabel" | "variant">) {
  const isHtmlPreview = variant === "html-preview";

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading eyebrow={eyebrow!} title={title!} description={description} titleClassName={HERO_TITLE_CLASS} />
        <LinkButton href={ctaHref!} variant="outline">
          {ctaLabel} <ArrowUpRightIcon className="size-4" />
        </LinkButton>
      </div>

      <RevealGroup
        className={
          isHtmlPreview
            ? "mt-8 grid w-full min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            : "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        }
        stagger={0.07}
      >
        {products.map((product, index) => (
          <RevealItem key={product.slug} className="h-full min-w-0">
            {isHtmlPreview ? (
              <ShopProductHtmlPreviewCard product={product} variant="catalog-wide" loadPriority={index === 0} />
            ) : (
              <ShopProductCard product={product} />
            )}
          </RevealItem>
        ))}
      </RevealGroup>

      <p className="mt-6 text-sm text-text-muted">
        Every product supports{" "}
        <Link href="/book-appointment" className="font-medium text-primary hover:underline">
          Done-For-You customization
        </Link>{" "}
        when you need branding, deployment, or integration help.
      </p>
    </>
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
