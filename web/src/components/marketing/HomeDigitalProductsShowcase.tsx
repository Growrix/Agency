"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
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
}: {
  group: ShopFilterGroup;
  onSelect: (patch: Partial<ShopFilterState>) => void;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted lg:text-[10px] lg:tracking-[0.2em]">
        {group.label}
      </p>
      <div className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-1">
        <FilterChip
          label={`All ${group.label}`}
          isActive={!group.activeValue}
          onClick={() => onSelect({ [group.key]: undefined })}
        />
        {group.options.map((option) => (
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
    <div className="home-desktop-marketing__digital-products">
      <div className="home-desktop-marketing__digital-products-header">
        <SectionHeading
          eyebrow={HOME_DIGITAL_PRODUCTS_CONVERSION_COPY.eyebrow}
          title={HOME_DIGITAL_PRODUCTS_CONVERSION_COPY.title}
          titleLead={HOME_DIGITAL_PRODUCTS_CONVERSION_COPY.titleLead}
          titleAccent={HOME_DIGITAL_PRODUCTS_CONVERSION_COPY.titleAccent}
          description={HOME_DIGITAL_PRODUCTS_CONVERSION_COPY.description}
          titleClassName={HERO_TITLE_CLASS}
          className="home-desktop-marketing__digital-products-heading"
        />
        <LinkButton href="/digital-products" variant="outline" size="sm" className="shrink-0">
          {HOME_DIGITAL_PRODUCTS_CONVERSION_COPY.ctaLabel} <ArrowUpRightIcon className="size-3.5" />
        </LinkButton>
      </div>

      <div className="home-desktop-marketing__digital-products-body">
        <aside className="home-desktop-marketing__digital-products-filters">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-sm font-semibold tracking-tight">Filters</p>
            {hasActiveFilter ? (
              <button
                type="button"
                onClick={() => setFilters({})}
                className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-primary"
              >
                <XMarkIcon className="size-3.5" aria-hidden />
                Clear
              </button>
            ) : null}
          </div>
          {filterGroups.map((group) => (
            <SidebarGroup key={group.key} group={group} onSelect={updateFilters} />
          ))}
        </aside>

        <div className="flex min-w-0 flex-col">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-text-muted">
              {visibleProducts.length} of {filteredProducts.length}
            </span>
            {filterGroups
              .filter((group) => group.activeValue)
              .map((group) => (
                <button
                  key={group.key}
                  type="button"
                  onClick={() => updateFilters({ [group.key]: undefined })}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-0.5 text-[11px] text-text-muted hover:border-primary/40"
                >
                  {group.options.find((option) => option.value === group.activeValue)?.label ??
                    group.activeValue}
                  <XMarkIcon className="size-3" aria-hidden />
                </button>
              ))}
          </div>

          {visibleProducts.length === 0 ? (
            <div className="flex min-h-[160px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface p-6 text-center">
              <p className="font-display text-base tracking-tight">No products match.</p>
              <LinkButton href="/digital-products" size="sm" className="mt-3">
                Browse catalog
              </LinkButton>
            </div>
          ) : (
            <div className="home-desktop-marketing__catalog-grid">
              {visibleProducts.map((product) => (
                <div key={product.slug} className="min-w-0">
                  <ShopProductCatalogCard product={product} variant="compact" />
                </div>
              ))}
            </div>
          )}

          {filteredProducts.length > HOME_DISPLAY_LIMIT ? (
            <div className="mt-6 flex justify-center">
              <Link
                href={buildShopHref(filters, {})}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all {filteredProducts.length} products <ArrowUpRightIcon className="size-3.5" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function HomeDigitalProductsShowcase({ products }: HomeDigitalProductsShowcaseProps) {
  if (products.length === 0) {
    return null;
  }

  const shell = homeSection("digital-products");

  return (
    <MarketingViewportGate
      mobile={null}
      desktop={
        <Section
          id="digital-products-showcase"
          {...shell}
          className="overflow-x-hidden [overflow-anchor:none]"
          aria-labelledby="home-digital-products-title"
        >
          <Container className="min-w-0">
            <HomeDigitalProductsDesktop products={products} />
          </Container>
        </Section>
      }
    />
  );
}
