"use client";

import { useState } from "react";
import Link from "next/link";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { ShopProductCatalogCard } from "@/components/shop/ShopProductCatalogCard";
import { PRODUCT_CATEGORY_CHIPS, PRODUCT_INDEX_COPY } from "@/lib/product-led-content";
import {
  buildShopHref,
  type ShopFilterGroup,
  type ShopFilterState,
} from "@/lib/shop-filters";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

type ShopPageMobileProps = {
  filters: ShopFilterState;
  filterGroups: ShopFilterGroup[];
  allProducts: PublicShopProductRecord[];
  filteredProducts: PublicShopProductRecord[];
};

function DrawerFilterGroup({
  group,
  filters,
  onSelect,
}: {
  group: ShopFilterGroup;
  filters: ShopFilterState;
  onSelect: () => void;
}) {
  const allHref = buildShopHref(filters, { [group.key]: undefined });
  const isAllActive = !group.activeValue;

  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
        {group.label}
      </p>
      <ul className="space-y-0.5">
        <li>
          <Link
            href={allHref}
            scroll={false}
            onClick={onSelect}
            className={
              "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors " +
              (isAllActive
                ? "border-l-2 border-primary bg-primary/10 font-semibold text-primary"
                : "text-text-muted hover:bg-inset hover:text-text")
            }
          >
            All {group.label}
          </Link>
        </li>
        {group.options.map((option) => {
          const isActive = group.activeValue === option.value;
          return (
            <li key={option.value}>
              <Link
                href={buildShopHref(filters, { [group.key]: option.value })}
                scroll={false}
                onClick={onSelect}
                className={
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors " +
                  (isActive
                    ? "border-l-2 border-primary bg-primary/10 font-semibold text-primary"
                    : "text-text-muted hover:bg-inset hover:text-text")
                }
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ShopPageMobile({
  filters,
  filterGroups,
  allProducts,
  filteredProducts,
}: ShopPageMobileProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const hasActiveFilter = !!(filters.category || filters.type || filters.industry);
  const activeFilterCount = filterGroups.filter((g) => g.activeValue).length;

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="home-mobile-marketing">
      {/* Mobile hero header */}
      <div className="border-b border-border bg-surface px-4 pb-5 pt-6">
        <p className="home-mobile-marketing__eyebrow font-mono uppercase text-primary">
          {PRODUCT_INDEX_COPY.eyebrow}
        </p>
        <h1 className="home-mobile-marketing__title mt-2 font-display font-bold tracking-tight">
          {PRODUCT_INDEX_COPY.title}
        </h1>
        <p className="home-mobile-marketing__description mt-2 text-text-muted">
          {PRODUCT_INDEX_COPY.description}
        </p>
        <p className="mt-2 text-xs text-text-muted">
          {allProducts.length} product{allProducts.length === 1 ? "" : "s"} published
        </p>

        {/* Category chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          {PRODUCT_CATEGORY_CHIPS.map((chip) => (
            <Link
              key={chip.href}
              href={chip.href}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:border-primary/40 hover:text-primary"
            >
              {chip.label}
            </Link>
          ))}
        </div>

        {/* Filter toolbar */}
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="home-mobile-marketing__cta home-mobile-marketing__cta--outline inline-flex items-center gap-1.5"
            aria-label="Open filters"
          >
            <FunnelIcon className="home-mobile-marketing__cta-icon" aria-hidden />
            Filters
            {activeFilterCount > 0 ? (
              <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                {activeFilterCount}
              </span>
            ) : null}
          </button>
          {hasActiveFilter ? (
            <Link
              href="/digital-products"
              scroll={false}
              className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-primary"
            >
              <XMarkIcon className="size-3.5" aria-hidden /> Clear all
            </Link>
          ) : null}
        </div>

        {/* Active filter pills */}
        {hasActiveFilter ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {filterGroups
              .filter((g) => g.activeValue)
              .map((g) => (
                <Link
                  key={g.key}
                  href={buildShopHref(filters, { [g.key]: undefined })}
                  scroll={false}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-inset/50 px-2.5 py-0.5 text-xs text-text-muted hover:border-primary/40 hover:text-text"
                >
                  {g.options.find((o) => o.value === g.activeValue)?.label ?? g.activeValue}
                  <XMarkIcon className="size-2.5" aria-hidden />
                </Link>
              ))}
          </div>
        ) : null}
      </div>

      {/* Result count */}
      <div className="px-4 py-3">
        <span className="text-xs text-text-muted">
          {filteredProducts.length} result{filteredProducts.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Product grid — single column on mobile */}
      <div className="px-4 pb-6">
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="font-display text-lg tracking-tight">No products match those filters.</p>
            <p className="mt-2 text-sm text-text-muted">Clear a filter to see more of the catalog.</p>
            <div className="mt-5 flex justify-center">
              <LinkButton href="/digital-products" size="sm">Reset filters</LinkButton>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredProducts.map((product) => (
              <ShopProductCatalogCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Filter drawer overlay */}
      {drawerOpen ? (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={closeDrawer}
          aria-hidden
        />
      ) : null}

      {/* Filter drawer panel */}
      <aside
        role="dialog"
        aria-label="Product filters"
        aria-modal="true"
        className={
          "fixed inset-x-0 bottom-0 z-50 max-h-[80dvh] overflow-y-auto overscroll-contain rounded-t-2xl border-t border-border bg-surface p-5 shadow-2xl transition-transform duration-300 " +
          (drawerOpen ? "translate-y-0" : "translate-y-full")
        }
      >
        <div className="mb-4 flex items-center justify-between">
          <p className="font-display text-base font-semibold tracking-tight">Filters</p>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-lg p-1.5 text-text-muted hover:bg-inset hover:text-text"
            aria-label="Close filters"
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>

        <div className="space-y-6">
          {filterGroups.map((group) => (
            <DrawerFilterGroup
              key={group.key}
              group={group}
              filters={filters}
              onSelect={closeDrawer}
            />
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <LinkButton href="/book-appointment" variant="outline" size="sm" fullWidth>
            Need Done-For-You setup?
          </LinkButton>
        </div>
      </aside>
    </div>
  );
}
