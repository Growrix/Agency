"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Container, Section } from "@/components/primitives/Container";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { ShopProductHomeCatalogMobileCard } from "@/components/shop/ShopProductHomeCatalogMobileCard";
import { ShopProductCatalogCard } from "@/components/shop/ShopProductCatalogCard";
import { cn } from "@/lib/utils";
import {
  buildShopFilterGroups,
  buildShopFilterOptions,
  buildShopHref,
  filterShopProducts,
  type ShopFilterGroup,
  type ShopFilterState,
} from "@/lib/shop-filters";
import { HOME_DIGITAL_PRODUCTS_CONVERSION_COPY } from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import { HERO_TITLE_CLASS } from "@/lib/typography";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

const HOME_DISPLAY_LIMIT = 8;

type HomeDigitalProductsShowcaseProps = {
  products: PublicShopProductRecord[];
};

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "home-mobile-marketing__tab",
        isActive && "home-mobile-marketing__tab--active",
      )}
    >
      {label}
    </button>
  );
}

function SidebarGroup({
  group,
  onSelect,
  mobile = false,
}: {
  group: ShopFilterGroup;
  onSelect: (patch: Partial<ShopFilterState>) => void;
  mobile?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className={cn("mb-1.5 font-mono uppercase tracking-[0.16em] text-primary", mobile ? "text-[length:var(--home-mobile-marketing-card-label-size)]" : "text-[9px] text-text-muted")}>
        {group.label}
      </p>
      <div className={cn("flex flex-wrap gap-1.5", !mobile && "lg:flex-col")}>
        <FilterChip
          label={`All ${group.label}`}
          isActive={!group.activeValue}
          onClick={() => onSelect({ [group.key]: undefined })}
        />
        {group.options.slice(0, 6).map((option) => (
          <FilterChip
            key={option.value}
            label={option.label}
            isActive={group.activeValue === option.value}
            onClick={() => onSelect({ [group.key]: option.value })}
          />
        ))}
      </div>
    </div>
  );
}

function HomeDigitalProductsMobile({ products }: HomeDigitalProductsShowcaseProps) {
  const [filters, setFilters] = useState<ShopFilterState>({});
  const filterOptions = useMemo(() => buildShopFilterOptions(products), [products]);
  const filterGroups = useMemo(() => buildShopFilterGroups(filterOptions, filters), [filterOptions, filters]);
  const filteredProducts = useMemo(() => filterShopProducts(products, filters), [products, filters]);
  const visibleProducts = filteredProducts.slice(0, HOME_DISPLAY_LIMIT);

  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={HOME_DIGITAL_PRODUCTS_CONVERSION_COPY.eyebrow}
        title={HOME_DIGITAL_PRODUCTS_CONVERSION_COPY.title}
        description={HOME_DIGITAL_PRODUCTS_CONVERSION_COPY.description}
      />

      <div className="home-mobile-marketing__filters-card">
        <p className="home-mobile-marketing__filters-title">Filters</p>
        <div className="mt-3 space-y-3">
          {filterGroups.map((group) => (
            <SidebarGroup
              key={group.key}
              group={group}
              mobile
              onSelect={(patch) => setFilters((current) => ({ ...current, ...patch }))}
            />
          ))}
        </div>
      </div>

      <div className="home-mobile-marketing__catalog-toolbar">
        <span className="home-mobile-marketing__catalog-count">
          {visibleProducts.length} of {filteredProducts.length} products
        </span>
        <span className="home-mobile-marketing__catalog-sort">Sort by: Popular</span>
      </div>

      <div className="home-mobile-marketing__catalog-grid">
        {visibleProducts.map((product, index) => (
          <ShopProductHomeCatalogMobileCard key={product.slug} product={product} loadPriority={index === 0} />
        ))}
      </div>

      {filteredProducts.length > HOME_DISPLAY_LIMIT ? (
        <Link href={buildShopHref(filters, {})} className="home-mobile-marketing__footer-link mx-auto">
          View all {filteredProducts.length} products <ArrowUpRightIcon className="size-3.5" aria-hidden />
        </Link>
      ) : null}
    </div>
  );
}

function HomeDigitalProductsDesktop({ products }: HomeDigitalProductsShowcaseProps) {
  const [filters, setFilters] = useState<ShopFilterState>({});
  const filterOptions = useMemo(() => buildShopFilterOptions(products), [products]);
  const filterGroups = useMemo(() => buildShopFilterGroups(filterOptions, filters), [filterOptions, filters]);
  const filteredProducts = useMemo(() => filterShopProducts(products, filters), [products, filters]);
  const visibleProducts = filteredProducts.slice(0, HOME_DISPLAY_LIMIT);
  const hasActiveFilter = !!(filters.category || filters.type || filters.industry);

  const updateFilters = (patch: Partial<ShopFilterState>) => {
    setFilters((current) => ({ ...current, ...patch }));
  };

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <div className="min-w-0">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
            {HOME_DIGITAL_PRODUCTS_CONVERSION_COPY.eyebrow}
          </p>
          <h2 className={cn("mt-1", HERO_TITLE_CLASS)}>{HOME_DIGITAL_PRODUCTS_CONVERSION_COPY.title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-text-muted sm:text-base">
            {HOME_DIGITAL_PRODUCTS_CONVERSION_COPY.description}
          </p>
        </div>
        <LinkButton href="/digital-products" variant="outline" size="sm" className="shrink-0">
          {HOME_DIGITAL_PRODUCTS_CONVERSION_COPY.ctaLabel} <ArrowUpRightIcon className="size-3.5" />
        </LinkButton>
      </div>

      <div className="mt-8 grid min-w-0 gap-3 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-5">
        <aside className="flex max-h-[28dvh] shrink-0 flex-col gap-3 overflow-y-auto rounded-lg border border-border bg-surface p-3 lg:max-h-none">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-xs font-semibold tracking-tight">Filters</p>
            {hasActiveFilter ? (
              <button
                type="button"
                onClick={() => setFilters({})}
                className="inline-flex items-center gap-1 text-[11px] text-text-muted hover:text-primary"
              >
                <XMarkIcon className="size-3" aria-hidden />
                Clear
              </button>
            ) : null}
          </div>
          {filterGroups.map((group) => (
            <SidebarGroup key={group.key} group={group} onSelect={updateFilters} />
          ))}
        </aside>

        <div className="flex min-w-0 flex-col">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-text-muted">
              {visibleProducts.length} of {filteredProducts.length}
            </span>
            {filterGroups
              .filter((group) => group.activeValue)
              .map((group) => (
                <button
                  key={group.key}
                  type="button"
                  onClick={() => updateFilters({ [group.key]: undefined })}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] text-text-muted hover:border-primary/40"
                >
                  {group.options.find((option) => option.value === group.activeValue)?.label ??
                    group.activeValue}
                  <XMarkIcon className="size-2.5" aria-hidden />
                </button>
              ))}
          </div>

          <div>
            {visibleProducts.length === 0 ? (
              <div className="flex min-h-[160px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface p-6 text-center">
                <p className="font-display text-base tracking-tight">No products match.</p>
                <LinkButton href="/digital-products" size="sm" className="mt-3">
                  Browse catalog
                </LinkButton>
              </div>
            ) : (
              <div className="grid auto-rows-fr grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-3">
                {visibleProducts.map((product) => (
                  <div key={product.slug} className="min-w-0">
                    <ShopProductCatalogCard product={product} variant="compact" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {filteredProducts.length > HOME_DISPLAY_LIMIT ? (
            <div className="mt-6 flex justify-center">
              <Link
                href={buildShopHref(filters, {})}
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                View all {filteredProducts.length} products <ArrowUpRightIcon className="size-3.5" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export function HomeDigitalProductsShowcase({ products }: HomeDigitalProductsShowcaseProps) {
  if (products.length === 0) {
    return null;
  }

  const shell = homeSection("digital-products");

  return (
    <Section
      id="digital-products-showcase"
      {...shell}
      className="overflow-x-hidden"
      aria-labelledby="home-digital-products-title"
    >
      <Container className="min-w-0">
        <MarketingViewportGate
          mobile={<HomeDigitalProductsMobile products={products} />}
          desktop={<HomeDigitalProductsDesktop products={products} />}
        />
      </Container>
    </Section>
  );
}
