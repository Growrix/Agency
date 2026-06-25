"use client";

import { useState } from "react";
import Link from "next/link";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ShopFilterDrawer } from "@/components/shop/ShopFilterDrawer";
import { ShopMerchandisingBand } from "@/components/shop/ShopMerchandisingBand";
import { ShopProductCatalogCard } from "@/components/shop/ShopProductCatalogCard";
import { LinkButton } from "@/components/primitives/Button";
import { SHOP_DESKTOP_COPY, SHOP_MARKETPLACE_COPY } from "@/lib/product-led-content";
import { buildShopHref, type ShopFilterGroup, type ShopFilterState } from "@/lib/shop-filters";
import type { ShopMerchandisingCollections } from "@/lib/shop-merchandising";
import type { PublicShopProductRecord } from "@/server/domain/catalog";
import { cn } from "@/lib/utils";

export type ShopMobileMarketplaceProps = {
  filters: ShopFilterState;
  filterGroups: ShopFilterGroup[];
  allProducts: PublicShopProductRecord[];
  merchandising: ShopMerchandisingCollections;
  hasActiveFilter: boolean;
  categoryOptions: { value: string; label: string }[];
};

export function ShopMobileMarketplace({
  filters,
  filterGroups,
  allProducts,
  merchandising,
  hasActiveFilter,
  categoryOptions,
}: ShopMobileMarketplaceProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeFilterCount = filterGroups.filter((group) => group.activeValue).length;
  const catalogProducts = merchandising.catalogProducts;
  const { bands, mobile } = SHOP_MARKETPLACE_COPY;

  const categoryChips = [
    { label: SHOP_DESKTOP_COPY.catalog.allTabLabel, href: "/digital-products", active: !filters.category },
    ...categoryOptions.map((option) => ({
      label: option.label,
      href: buildShopHref(filters, { category: option.value }),
      active: filters.category === option.value,
    })),
  ];

  return (
    <div className="shop-mobile">
      <header className="shop-mobile__header">
        <p className="shop-mobile__eyebrow">{SHOP_DESKTOP_COPY.hero.eyebrow}</p>
        <h1 className="shop-mobile__title">
          <span className="block">{SHOP_DESKTOP_COPY.hero.titleLead}</span>
          <span className="block marketing-title-accent">{SHOP_DESKTOP_COPY.hero.titleAccent}</span>
        </h1>
        <p className="shop-mobile__description">{SHOP_DESKTOP_COPY.hero.description}</p>
        <p className="shop-mobile__count">
          {allProducts.length} product{allProducts.length === 1 ? "" : "s"} published
        </p>

        <nav aria-label="Product categories" className="shop-mobile__category-scroller">
          {categoryChips.map((chip) => (
            <Link
              key={chip.href}
              href={chip.href}
              scroll={false}
              className={cn("shop-mobile__category-chip", chip.active && "shop-mobile__category-chip--active")}
            >
              {chip.label}
            </Link>
          ))}
        </nav>

        {hasActiveFilter ? (
          <div className="shop-mobile__active-filters">
            {filterGroups
              .filter((group) => group.activeValue)
              .map((group) => (
                <Link
                  key={group.key}
                  href={buildShopHref(filters, { [group.key]: undefined })}
                  scroll={false}
                  className="shop-mobile__filter-pill"
                >
                  {group.options.find((option) => option.value === group.activeValue)?.label ??
                    group.activeValue}
                  <XMarkIcon className="size-2.5" aria-hidden />
                </Link>
              ))}
          </div>
        ) : null}
      </header>

      <div className="shop-mobile__content">
        {merchandising.showBands ? (
          <div className="shop-mobile__merchandising">
            <ShopMerchandisingBand
              copy={bands.featured}
              products={merchandising.featured}
              layout="carousel"
              eagerPreviewCount={2}
            />
            <ShopMerchandisingBand
              copy={bands.premium}
              products={merchandising.premium}
              layout="carousel"
              eagerPreviewCount={2}
            />
            <ShopMerchandisingBand
              copy={bands.newArrivals}
              products={merchandising.newArrivals}
              layout="carousel"
              eagerPreviewCount={2}
            />
            <ShopMerchandisingBand
              copy={bands.bundles}
              products={merchandising.bundles}
              layout="carousel"
              eagerPreviewCount={2}
            />

            <div className="shop-mobile__all-products-header">
              <h2 className="shop-mobile__all-products-title">{bands.allProducts.title}</h2>
              <p className="shop-mobile__all-products-copy">{bands.allProducts.description}</p>
            </div>
          </div>
        ) : null}

        {catalogProducts.length === 0 ? (
          <div className="shop-mobile__empty">
            <p className="shop-mobile__empty-title">{SHOP_DESKTOP_COPY.catalog.emptyTitle}</p>
            <p className="shop-mobile__empty-copy">{SHOP_DESKTOP_COPY.catalog.emptyDescription}</p>
            <div className="mt-5 flex justify-center">
              <LinkButton href="/digital-products" size="sm">
                {SHOP_DESKTOP_COPY.catalog.resetLabel}
              </LinkButton>
            </div>
          </div>
        ) : (
          <div className="shop-mobile__product-list">
            {catalogProducts.map((product, index) => (
              <ShopProductCatalogCard
                key={product.slug}
                product={product}
                previewLoadMode={index < 6 ? "eager" : "auto"}
                loadPriority={index < 2}
              />
            ))}
          </div>
        )}
      </div>

      <div className="shop-mobile__filter-dock" data-drawer-open={drawerOpen ? "true" : "false"}>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="shop-mobile__filter-dock-btn"
          aria-label="Open filters"
        >
          <FunnelIcon className="size-4" aria-hidden />
          {mobile.filterLabel}
          {activeFilterCount > 0 ? (
            <span className="shop-mobile__filter-dock-badge">{activeFilterCount}</span>
          ) : null}
        </button>
        <p className="shop-mobile__filter-dock-meta">
          {catalogProducts.length} {mobile.resultsLabel}
        </p>
        {hasActiveFilter ? (
          <Link href="/digital-products" scroll={false} className="shop-mobile__filter-dock-clear">
            {mobile.clearAllLabel}
          </Link>
        ) : null}
      </div>

      <ShopFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        filterGroups={filterGroups}
      />
    </div>
  );
}
