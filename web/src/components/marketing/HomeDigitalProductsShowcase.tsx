"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { cn } from "@/lib/utils";
import {
  buildShopFilterGroups,
  buildShopFilterOptions,
  buildShopHref,
  filterShopProducts,
  type ShopFilterGroup,
  type ShopFilterState,
} from "@/lib/shop-filters";
import { HOME_DIGITAL_PRODUCTS_COPY } from "@/lib/product-led-content";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

const HOME_DISPLAY_LIMIT = 4;

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
        "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        isActive
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-surface text-text-muted hover:border-primary/40 hover:text-text",
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
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">{group.label}</p>
      <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
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

export function HomeDigitalProductsShowcase({ products }: HomeDigitalProductsShowcaseProps) {
  const [filters, setFilters] = useState<ShopFilterState>({});

  const filterOptions = useMemo(() => buildShopFilterOptions(products), [products]);
  const filterGroups = useMemo(
    () => buildShopFilterGroups(filterOptions, filters),
    [filterOptions, filters],
  );
  const filteredProducts = useMemo(
    () => filterShopProducts(products, filters),
    [products, filters],
  );
  const visibleProducts = filteredProducts.slice(0, HOME_DISPLAY_LIMIT);
  const hasActiveFilter = !!(filters.category || filters.type || filters.industry);

  const updateFilters = (patch: Partial<ShopFilterState>) => {
    setFilters((current) => ({ ...current, ...patch }));
  };

  const clearFilters = () => setFilters({});

  if (products.length === 0) {
    return null;
  }

  return (
    <section
      id="digital-products-showcase"
      className="flex min-h-[100dvh] w-full flex-col bg-inset"
      aria-labelledby="home-digital-products-title"
    >
      <div className="mx-auto flex w-full max-w-shell flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              {HOME_DIGITAL_PRODUCTS_COPY.eyebrow}
            </p>
            <h2
              id="home-digital-products-title"
              className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {HOME_DIGITAL_PRODUCTS_COPY.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-text-muted">{HOME_DIGITAL_PRODUCTS_COPY.description}</p>
          </div>
          <LinkButton href="/digital-products" variant="outline" size="sm" className="shrink-0">
            {HOME_DIGITAL_PRODUCTS_COPY.ctaLabel} <ArrowUpRightIcon className="size-4" />
          </LinkButton>
        </div>

        <div className="mt-6 flex min-h-0 flex-1 flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] lg:items-stretch lg:gap-6">
          <aside className="flex min-h-0 flex-col gap-4 overflow-y-auto rounded-xl border border-border bg-surface p-4 lg:max-h-none">
            <div className="flex items-center justify-between gap-2">
              <p className="font-display text-sm font-semibold tracking-tight">Filters</p>
              {hasActiveFilter ? (
                <button
                  type="button"
                  onClick={clearFilters}
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

          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-text-muted">
                {visibleProducts.length} of {filteredProducts.length} shown
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
                    <XMarkIcon className="size-2.5" aria-hidden />
                  </button>
                ))}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              {visibleProducts.length === 0 ? (
                <div className="flex h-full min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface p-8 text-center">
                  <p className="font-display text-lg tracking-tight">No products match those filters.</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <LinkButton href="/digital-products" size="sm">
                      Browse catalog
                    </LinkButton>
                    <button type="button" onClick={clearFilters} className="text-sm text-primary hover:underline">
                      Reset filters
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                  {visibleProducts.map((product) => (
                    <ShopProductCard key={product.slug} product={product} />
                  ))}
                </div>
              )}
            </div>

            {filteredProducts.length > HOME_DISPLAY_LIMIT ? (
              <div className="mt-4 flex shrink-0 justify-center border-t border-border pt-4">
                <Link
                  href={buildShopHref(filters, {})}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  View all {filteredProducts.length} products <ArrowUpRightIcon className="size-4" />
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
