"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowUpRightIcon,
  BoltIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  CloudIcon,
  CommandLineIcon,
  CpuChipIcon,
  CubeIcon,
  DocumentTextIcon,
  GiftIcon,
  GlobeAltIcon,
  PlayCircleIcon,
  RectangleStackIcon,
  ShieldCheckIcon,
  SparklesIcon,
  Squares2X2Icon,
  StarIcon,
  UserGroupIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { CTABand } from "@/components/sections/CTABand";
import { ShopDesktopMarketplace } from "@/components/shop/ShopDesktopMarketplace";
import { WebsiteTemplateHtmlDesktopPreviewFrame } from "@/components/shop/WebsiteTemplateHtmlDesktopPreviewFrame";
import { Container, Section } from "@/components/primitives/Container";
import { SHOP_DESKTOP_COPY } from "@/lib/product-led-content";
import { buildShopHref, type ShopFilterGroup, type ShopFilterState } from "@/lib/shop-filters";
import { sortShopCatalogProducts } from "@/lib/shop-catalog-sort";
import type { ShopMerchandisingCollections } from "@/lib/shop-merchandising";
import { getProductHref } from "@/lib/shop";
import { HERO_TITLE_CLASS, HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";
import {
  getWebsiteTemplateHtmlPreviewByProductSlug,
  getWebsiteTemplateHtmlPreviewUrl,
  WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG,
} from "@/lib/website-templates-html-preview";
import type { PublicShopProductRecord } from "@/server/domain/catalog";
import { cn } from "@/lib/utils";

const CATEGORY_TAB_ICONS: Record<string, typeof GlobeAltIcon> = {
  "html-business-profiles": UserGroupIcon,
  "html-templates": DocumentTextIcon,
  "website-templates-html-preview": GlobeAltIcon,
  "saas-templates": CloudIcon,
  "ai-automation": CpuChipIcon,
  "mcp-servers": CommandLineIcon,
  "seo-toolkits": SparklesIcon,
  bundles: GiftIcon,
  "free-products": ArrowDownTrayIcon,
};

function getShopProductPreviewUrl(product: PublicShopProductRecord): string | null {
  if (product.categorySlug === WEBSITE_TEMPLATES_HTML_PREVIEW_CATEGORY_SLUG) {
    const preview = getWebsiteTemplateHtmlPreviewByProductSlug(product.slug);
    return preview ? getWebsiteTemplateHtmlPreviewUrl(preview.slug) : null;
  }

  return product.embeddedPreviewUrl ?? product.livePreviewUrl ?? null;
}

function pickHeroProducts(products: PublicShopProductRecord[]) {
  const sorted = sortShopCatalogProducts(products, "popular");
  const withPreview = sorted.filter((product) => Boolean(getShopProductPreviewUrl(product)));
  const pool = withPreview.length >= 3 ? withPreview : sorted;
  return pool.slice(0, 3);
}

function heroFeatureIcon(icon: (typeof SHOP_DESKTOP_COPY.hero.features)[number]["icon"]) {
  switch (icon) {
    case "download":
      return ArrowDownTrayIcon;
    case "shield":
      return ShieldCheckIcon;
    case "refresh":
      return ArrowPathIcon;
    default:
      return ArrowDownTrayIcon;
  }
}

function statIcon(icon: (typeof SHOP_DESKTOP_COPY.stats)[number]["icon"]) {
  switch (icon) {
    case "cube":
      return CubeIcon;
    case "users":
      return UserGroupIcon;
    case "star":
      return StarIcon;
    case "support":
      return ChatBubbleLeftRightIcon;
    default:
      return CubeIcon;
  }
}

function valuePropIcon(icon: (typeof SHOP_DESKTOP_COPY.valueProps)[number]["icon"]) {
  switch (icon) {
    case "bolt":
      return BoltIcon;
    case "sparkles":
      return SparklesIcon;
    case "shield":
      return ShieldCheckIcon;
    case "wallet":
      return WalletIcon;
    default:
      return BoltIcon;
  }
}

function ShopDesktopHeroStack({ products }: { products: PublicShopProductRecord[] }) {
  const stack = products.slice(0, 3);
  const layers: Array<"back" | "mid" | "front"> = ["back", "mid", "front"];
  const ordered = [...stack].reverse();

  if (ordered.length === 0) {
    return (
      <div className="shop-desktop__hero-stack">
        <div className="shop-desktop__hero-card shop-desktop__hero-card--front flex items-center justify-center p-8 text-sm text-text-muted">
          Product previews appear here as the catalog grows.
        </div>
      </div>
    );
  }

  return (
    <div className="shop-desktop__hero-stack">
      {ordered.map((product, index) => {
        const layer = layers[layers.length - ordered.length + index] ?? "front";
        const previewUrl = getShopProductPreviewUrl(product);
        return (
          <Link
            key={product.slug}
            href={getProductHref(product)}
            className={cn(
              "shop-desktop__hero-card",
              layer === "back" && "shop-desktop__hero-card--back",
              layer === "mid" && "shop-desktop__hero-card--mid",
              layer === "front" && "shop-desktop__hero-card--front",
            )}
          >
            <div className="shop-desktop__hero-card-media">
              {product.tag ? <span className="shop-desktop__hero-card-tag">{product.tag}</span> : null}
              {previewUrl ? (
                <WebsiteTemplateHtmlDesktopPreviewFrame
                  previewUrl={previewUrl}
                  title={`${product.name} preview`}
                  fit="cover"
                  verticalAlign="top"
                  className="absolute inset-0 h-full w-full"
                  frameClassName="shop-desktop__hero-card-frame h-full"
                  iframeLoading="eager"
                />
              ) : (
                <div className="absolute inset-0 bg-inset" aria-hidden />
              )}
            </div>
            <div className="shop-desktop__hero-card-body">
              <p className="shop-desktop__hero-card-title">{product.name}</p>
              <p className="shop-desktop__hero-card-price">{product.price}</p>
            </div>
          </Link>
        );
      })}
      <span className="shop-desktop__hero-cart" aria-hidden>
        <RectangleStackIcon className="size-5" />
      </span>
    </div>
  );
}

export type ShopPageDesktopProps = {
  filters: ShopFilterState;
  filterGroups: ShopFilterGroup[];
  allProducts: PublicShopProductRecord[];
  filteredProducts: PublicShopProductRecord[];
  merchandising: ShopMerchandisingCollections;
  hasActiveFilter: boolean;
  categoryOptions: { value: string; label: string }[];
};

export function ShopPageDesktop({
  filters,
  filterGroups,
  allProducts,
  merchandising,
  hasActiveFilter,
  categoryOptions,
}: ShopPageDesktopProps) {
  const heroProducts = useMemo(() => pickHeroProducts(allProducts), [allProducts]);
  const productCountLabel =
    allProducts.length >= 120 ? `${allProducts.length}+` : String(allProducts.length);

  return (
    <div className="shop-desktop">
      <Section
        size="hero"
        layout="viewport"
        className="hero-section shop-desktop__hero-shell relative overflow-hidden border-b border-border"
      >
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
        <Container className={HERO_VIEWPORT_CONTAINER_CLASS}>
          <nav aria-label="Breadcrumb" className="shop-desktop__breadcrumbs">
            <Link href="/">{SHOP_DESKTOP_COPY.breadcrumbs.home}</Link>
            <ChevronRightIcon className="size-3.5 opacity-60" aria-hidden />
            <span aria-current="page">{SHOP_DESKTOP_COPY.breadcrumbs.current}</span>
          </nav>

          <div className="shop-desktop__hero-grid">
            <div className="shop-desktop__hero-copy">
              <p className="shop-desktop__hero-eyebrow">{SHOP_DESKTOP_COPY.hero.eyebrow}</p>
              <h1 className="shop-desktop__hero-title">
                {SHOP_DESKTOP_COPY.hero.titleLead}{" "}
                <span className="marketing-title-accent">{SHOP_DESKTOP_COPY.hero.titleAccent}</span>
              </h1>
              <p className="shop-desktop__hero-description">{SHOP_DESKTOP_COPY.hero.description}</p>
              <ul className="shop-desktop__hero-features">
                {SHOP_DESKTOP_COPY.hero.features.map((feature) => {
                  const Icon = heroFeatureIcon(feature.icon);
                  return (
                    <li key={feature.label} className="shop-desktop__hero-feature">
                      <span className="shop-desktop__hero-feature-icon">
                        <Icon aria-hidden />
                      </span>
                      {feature.label}
                    </li>
                  );
                })}
              </ul>
              <div className="shop-desktop__hero-actions">
                <LinkButton href={SHOP_DESKTOP_COPY.hero.primaryCta.href}>
                  {SHOP_DESKTOP_COPY.hero.primaryCta.label} <ArrowUpRightIcon className="size-4" />
                </LinkButton>
                <LinkButton href={SHOP_DESKTOP_COPY.hero.secondaryCta.href} variant="outline">
                  <PlayCircleIcon className="size-4" aria-hidden />
                  {SHOP_DESKTOP_COPY.hero.secondaryCta.label}
                </LinkButton>
              </div>
            </div>
            <div className="shop-desktop__hero-visual">
              <ShopDesktopHeroStack products={heroProducts} />
            </div>
          </div>

          <div className="shop-desktop__stats">
            {SHOP_DESKTOP_COPY.stats.map((stat) => {
              const Icon = statIcon(stat.icon);
              const value =
                "valueKey" in stat && stat.valueKey === "productCount"
                  ? productCountLabel
                  : "value" in stat
                    ? stat.value
                    : "";
              return (
                <div key={stat.label} className="shop-desktop__stat">
                  <span className="shop-desktop__stat-icon">
                    <Icon aria-hidden />
                  </span>
                  <div>
                    <p className="shop-desktop__stat-value">{value}</p>
                    <p className="shop-desktop__stat-label">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="!py-0">
        <Container>
          <nav aria-label="Product categories" className="shop-desktop__category-tabs">
            <Link
              href="/digital-products"
              scroll={false}
              className={cn(
                "shop-desktop__category-tab",
                !filters.category && "shop-desktop__category-tab--active",
              )}
            >
              <Squares2X2Icon aria-hidden />
              {SHOP_DESKTOP_COPY.catalog.allTabLabel}
            </Link>
            {categoryOptions.map((option) => {
              const Icon = CATEGORY_TAB_ICONS[option.value] ?? RectangleStackIcon;
              const isActive = filters.category === option.value;
              return (
                <Link
                  key={option.value}
                  href={buildShopHref(filters, { category: option.value })}
                  scroll={false}
                  className={cn("shop-desktop__category-tab", isActive && "shop-desktop__category-tab--active")}
                >
                  <Icon aria-hidden />
                  {option.label}
                </Link>
              );
            })}
          </nav>
        </Container>
      </Section>

      <Section id="shop-catalog" className="shop-desktop__marketplace">
        <Container>
          <ShopDesktopMarketplace
            filters={filters}
            filterGroups={filterGroups}
            allProducts={allProducts}
            merchandising={merchandising}
            hasActiveFilter={hasActiveFilter}
          />
        </Container>
      </Section>

      <Section className="shop-desktop__value-props" size="compact">
        <Container>
          <div className="shop-desktop__value-props-grid">
            {SHOP_DESKTOP_COPY.valueProps.map((item) => {
              const Icon = valuePropIcon(item.icon);
              return (
                <article key={item.title} className="shop-desktop__value-prop">
                  <span className="shop-desktop__value-prop-icon">
                    <Icon aria-hidden />
                  </span>
                  <h2 className="shop-desktop__value-prop-title">{item.title}</h2>
                  <p className="shop-desktop__value-prop-copy">{item.description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <div className="home-desktop-marketing">
        <CTABand
          size="compact"
          layout="content"
          desktopLayout="marketing"
          marketingFeatures={[]}
          eyebrow={SHOP_DESKTOP_COPY.finalCta.eyebrow}
          titleLead={SHOP_DESKTOP_COPY.finalCta.titleLead}
          titleAccent={SHOP_DESKTOP_COPY.finalCta.titleAccent}
          description={SHOP_DESKTOP_COPY.finalCta.description}
          primary={SHOP_DESKTOP_COPY.finalCta.primary}
          secondary={SHOP_DESKTOP_COPY.finalCta.secondary}
          titleClassName={HERO_TITLE_CLASS}
        />
      </div>
    </div>
  );
}
