"use client";

import { useMemo, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { ShopProductCatalogCard } from "@/components/shop/ShopProductCatalogCard";
import { SHOP_DESKTOP_COPY } from "@/lib/product-led-content";
import { sortShopCatalogProducts, type ShopCatalogSortKey } from "@/lib/shop-catalog-sort";
import type { PublicShopProductRecord } from "@/server/domain/catalog";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

export type ShopCatalogGridProps = {
  products: PublicShopProductRecord[];
  resetHref?: string;
  paginated?: boolean;
  gridClassName?: string;
  cellClassName?: string;
  eagerPreviewCount?: number;
  priorityPreviewCount?: number;
  showEmpty?: boolean;
};

export function ShopCatalogGrid({
  products,
  resetHref = "/digital-products",
  paginated = true,
  gridClassName = "shop-desktop__product-grid",
  cellClassName = "shop-desktop__product-cell",
  eagerPreviewCount = 8,
  priorityPreviewCount = 4,
  showEmpty = true,
}: ShopCatalogGridProps) {
  const [page, setPage] = useState(1);

  const sortedProducts = useMemo(() => sortShopCatalogProducts(products, "popular"), [products]);
  const totalPages = paginated ? Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE)) : 1;
  const currentPage = paginated ? Math.min(page, totalPages) : 1;
  const pageStart = paginated ? (currentPage - 1) * PAGE_SIZE : 0;
  const visibleProducts = paginated
    ? sortedProducts.slice(pageStart, pageStart + PAGE_SIZE)
    : sortedProducts;

  const pageNumbers = useMemo(() => {
    if (!paginated || totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }
    const pages = new Set<number>([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
    return [...pages].filter((value) => value >= 1 && value <= totalPages).sort((a, b) => a - b);
  }, [currentPage, paginated, totalPages]);

  if (products.length === 0 && showEmpty) {
    return (
      <div className="shop-desktop__empty">
        <p className="shop-desktop__empty-title">{SHOP_DESKTOP_COPY.catalog.emptyTitle}</p>
        <p className="shop-desktop__empty-copy">{SHOP_DESKTOP_COPY.catalog.emptyDescription}</p>
        <div className="mt-6 flex justify-center">
          <LinkButton href={resetHref} size="sm">
            {SHOP_DESKTOP_COPY.catalog.resetLabel}
          </LinkButton>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <>
      <div className={gridClassName}>
        {visibleProducts.map((product, index) => (
          <div key={product.slug} className={cellClassName}>
            <ShopProductCatalogCard
              product={product}
              previewLoadMode={index < eagerPreviewCount ? "eager" : "auto"}
              loadPriority={index < priorityPreviewCount}
            />
          </div>
        ))}
      </div>

      {paginated && totalPages > 1 ? (
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
  );
}

export { PAGE_SIZE as SHOP_CATALOG_PAGE_SIZE, sortShopCatalogProducts };
export type { ShopCatalogSortKey };
