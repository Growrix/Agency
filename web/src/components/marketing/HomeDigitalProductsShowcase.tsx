"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { SectionHeading } from "@/components/primitives/SectionHeading";
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
import { HOME_DIGITAL_PRODUCTS_COPY } from "@/lib/product-led-content";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

const HOME_DISPLAY_LIMIT = 6;

type HomeDigitalProductsShowcaseProps = {
  products: PublicShopProductRecord[];
};

function SidebarFilterButton({
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
        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
        isActive
          ? "border-l-2 border-primary bg-primary/10 font-semibold text-primary"
          : "text-text-muted hover:bg-inset hover:text-text",
      )}
    >
      {label}
    </button>
  );
}

function FilterGroupPanel({
  group,
  onSelect,
}: {
  group: ShopFilterGroup;
  onSelect: (patch: Partial<ShopFilterState>) => void;
}) {
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
        {group.label}
      </p>
      <ul className="space-y-0.5">
        <li>
          <SidebarFilterButton
            label={`All ${group.label}`}
            isActive={!group.activeValue}
            onClick={() => onSelect({ [group.key]: undefined })}
          />
        </li>
        {group.options.map((option) => (
          <li key={option.value}>
            <SidebarFilterButton
              label={option.label}
              isActive={group.activeValue === option.value}
              onClick={() => onSelect({ [group.key]: option.value })}
            />
          </li>
        ))}
      </ul>
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
    <Section
      id="digital-products-showcase"
      size="standard"
      layout="viewport"
      tone="inset"
      className="overflow-x-hidden"
    >
      <Container width="shell" className="min-w-0">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={HOME_DIGITAL_PRODUCTS_COPY.eyebrow}
            title={HOME_DIGITAL_PRODUCTS_COPY.title}
            description={HOME_DIGITAL_PRODUCTS_COPY.description}
          />
          <LinkButton href="/digital-products" variant="outline">
            {HOME_DIGITAL_PRODUCTS_COPY.ctaLabel} <ArrowUpRightIcon className="size-4" />
          </LinkButton>
        </div>

        <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
          <aside className="min-w-0 space-y-6 rounded-2xl border border-border bg-surface p-5 lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-sm font-semibold tracking-tight">Filters</p>
              {hasActiveFilter ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 text-xs text-text-muted transition-colors hover:text-primary"
                >
                  <XMarkIcon className="size-3.5" aria-hidden />
                  Clear all
                </button>
              ) : null}
            </div>

            <div className="space-y-6 lg:block">
              {filterGroups.map((group) => (
                <FilterGroupPanel
                  key={group.key}
                  group={group}
                  onSelect={updateFilters}
                />
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs leading-5 text-text-muted">
                {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"} match
                {hasActiveFilter ? " these filters" : " the catalog"}.
              </p>
              {hasActiveFilter ? (
                <Link
                  href={buildShopHref(filters, {})}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  Open full catalog <ArrowUpRightIcon className="size-3.5" />
                </Link>
              ) : null}
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-text-muted">
                Showing {visibleProducts.length} of {filteredProducts.length} result
                {filteredProducts.length === 1 ? "" : "s"}
              </span>
              {filterGroups
                .filter((group) => group.activeValue)
                .map((group) => (
                  <button
                    key={group.key}
                    type="button"
                    onClick={() => updateFilters({ [group.key]: undefined })}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs text-text-muted transition-colors hover:border-primary/40 hover:text-text"
                  >
                    {group.options.find((option) => option.value === group.activeValue)?.label ??
                      group.activeValue}
                    <XMarkIcon className="size-3" aria-hidden />
                  </button>
                ))}
            </div>

            {visibleProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
                <p className="font-display text-xl tracking-tight">No products match those filters.</p>
                <p className="mt-2 text-sm text-text-muted">
                  Clear a filter or browse the full digital products catalog.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <LinkButton href="/digital-products" size="sm">
                    Browse all digital products
                  </LinkButton>
                  <button type="button" onClick={clearFilters} className="text-sm text-primary hover:underline">
                    Reset filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid min-w-0 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ShopProductCatalogCard key={product.slug} product={product} variant="catalog-wide" />
                ))}
              </div>
            )}

            {filteredProducts.length > HOME_DISPLAY_LIMIT ? (
              <div className="mt-8 flex justify-center">
                <LinkButton href={buildShopHref(filters, {})} variant="outline">
                  View all {filteredProducts.length} products
                </LinkButton>
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
