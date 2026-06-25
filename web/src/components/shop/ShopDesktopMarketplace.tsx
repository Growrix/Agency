"use client";

import { useMemo, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { ShopCatalogToolbar } from "@/components/shop/ShopCatalogToolbar";
import { ShopFilterPanel } from "@/components/shop/ShopFilterPanel";
import { ShopMerchandisingBand } from "@/components/shop/ShopMerchandisingBand";
import { ShopProductCatalogCard } from "@/components/shop/ShopProductCatalogCard";
import { SHOP_DESKTOP_COPY, SHOP_MARKETPLACE_COPY } from "@/lib/product-led-content";
import { sortShopCatalogProducts, type ShopCatalogSortKey } from "@/lib/shop-catalog-sort";
import type { ShopMerchandisingCollections } from "@/lib/shop-merchandising";
import type { ShopFilterGroup, ShopFilterState } from "@/lib/shop-filters";
import type { PublicShopProductRecord } from "@/server/domain/catalog";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

export type ShopDesktopMarketplaceProps = {
  filters: ShopFilterState;
  filterGroups: ShopFilterGroup[];
  allProducts: PublicShopProductRecord[];
  merchandising: ShopMerchandisingCollections;
  hasActiveFilter: boolean;
};

export function ShopDesktopMarketplace({
  filters,
  filterGroups,
  allProducts,
  merchandising,
  hasActiveFilter,
}: ShopDesktopMarketplaceProps) {
  const [sort, setSort] = useState<ShopCatalogSortKey>("popular");
  const [page, setPage] = useState(1);

  const catalogProducts = merchandising.catalogProducts;
  const sortedProducts = useMemo(
    () => sortShopCatalogProducts(catalogProducts, sort),
    [catalogProducts, sort],
  );
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pageProducts = sortedProducts.slice(pageStart, pageStart + PAGE_SIZE);
  const showingStart = sortedProducts.length === 0 ? 0 : pageStart + 1;
  const showingEnd = Math.min(pageStart + PAGE_SIZE, sortedProducts.length);
  const summary = SHOP_DESKTOP_COPY.catalog.showingTemplate
    .replace("{start}", String(showingStart))
    .replace("{end}", String(showingEnd))
    .replace("{total}", String(sortedProducts.length));

  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    const pages = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
    return [...pages].filter((value) => value >= 1 && value <= totalPages).sort((a, b) => a - b);
  }, [currentPage, totalPages]);

  const { bands } = SHOP_MARKETPLACE_COPY;
  const bandOffset =
    (merchandising.showBands ? merchandising.featured.length : 0) +
    (merchandising.showBands ? merchandising.premium.length : 0) +
    (merchandising.showBands ? merchandising.newArrivals.length : 0) +
    (merchandising.showBands ? merchandising.bundles.length : 0);

  return (
    <div className="shop-desktop__marketplace-grid">
      <ShopFilterPanel
        filters={filters}
        filterGroups={filterGroups}
        allProducts={allProducts}
        hasActiveFilter={hasActiveFilter}
      />

      <div className="shop-desktop__catalog">
        <ShopCatalogToolbar
          summary={summary}
          sort={sort}
          onSortChange={(nextSort) => {
            setSort(nextSort);
            setPage(1);
          }}
        />

        {merchandising.showBands ? (
          <div className="shop-desktop__merchandising">
            <ShopMerchandisingBand
              copy={bands.featured}
              products={merchandising.featured}
              layout="grid"
              eagerPreviewCount={4}
            />
            <ShopMerchandisingBand
              copy={bands.premium}
              products={merchandising.premium}
              layout="grid"
              eagerPreviewCount={3}
            />
            <ShopMerchandisingBand
              copy={bands.newArrivals}
              products={merchandising.newArrivals}
              layout="grid"
              eagerPreviewCount={3}
            />
            <ShopMerchandisingBand
              copy={bands.bundles}
              products={merchandising.bundles}
              layout="grid"
              eagerPreviewCount={2}
            />

            <div className="shop-desktop__all-products-header">
              <h2 className="shop-desktop__all-products-title">{bands.allProducts.title}</h2>
              <p className="shop-desktop__all-products-copy">{bands.allProducts.description}</p>
            </div>
          </div>
        ) : null}

        {catalogProducts.length === 0 ? (
          <div className="shop-desktop__empty">
            <p className="shop-desktop__empty-title">{SHOP_DESKTOP_COPY.catalog.emptyTitle}</p>
            <p className="shop-desktop__empty-copy">{SHOP_DESKTOP_COPY.catalog.emptyDescription}</p>
            <div className="mt-6 flex justify-center">
              <LinkButton href="/digital-products" size="sm">
                {SHOP_DESKTOP_COPY.catalog.resetLabel}
              </LinkButton>
            </div>
          </div>
        ) : (
          <>
            <div className="shop-desktop__product-grid">
              {pageProducts.map((product, index) => (
                <div key={product.slug} className="shop-desktop__product-cell">
                  <ShopProductCatalogCard
                    product={product}
                    previewLoadMode={index + bandOffset < 8 ? "eager" : "auto"}
                    loadPriority={index < 4}
                  />
                </div>
              ))}
            </div>

            {totalPages > 1 ? (
              <nav className="shop-desktop__pagination" aria-label="Product pagination">
                <button
                  type="button"
                  className="shop-desktop__page-btn"
                  disabled={currentPage <= 1}
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                  aria-label="Previous page"
                >
                  <ArrowLeftIcon className="size-4" />
                </button>
                {pageNumbers.map((pageNumber, index) => {
                  const previous = pageNumbers[index - 1];
                  const needsEllipsis = previous !== undefined && pageNumber - previous > 1;
                  return (
                    <span key={pageNumber} className="inline-flex items-center">
                      {needsEllipsis ? <span className="shop-desktop__page-ellipsis">…</span> : null}
                      <button
                        type="button"
                        className={cn(
                          "shop-desktop__page-btn",
                          pageNumber === currentPage && "shop-desktop__page-btn--active",
                        )}
                        onClick={() => setPage(pageNumber)}
                        aria-current={pageNumber === currentPage ? "page" : undefined}
                      >
                        {pageNumber}
                      </button>
                    </span>
                  );
                })}
                <button
                  type="button"
                  className="shop-desktop__page-btn"
                  disabled={currentPage >= totalPages}
                  onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                  aria-label="Next page"
                >
                  <ArrowRightIcon className="size-4" />
                </button>
              </nav>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
