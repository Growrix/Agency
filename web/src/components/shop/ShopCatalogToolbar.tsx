"use client";

import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { SHOP_DESKTOP_COPY } from "@/lib/product-led-content";
import type { ShopCatalogSortKey } from "@/lib/shop-catalog-sort";

export type ShopCatalogToolbarProps = {
  summary: string;
  sort: ShopCatalogSortKey;
  onSortChange: (sort: ShopCatalogSortKey) => void;
  className?: string;
};

export function ShopCatalogToolbar({ summary, sort, onSortChange, className }: ShopCatalogToolbarProps) {
  return (
    <div className={className ?? "shop-desktop__catalog-toolbar"}>
      <p className="shop-desktop__catalog-summary">{summary}</p>
      <div className="shop-desktop__catalog-controls">
        <label className="shop-desktop__sort">
          {SHOP_DESKTOP_COPY.catalog.sortLabel}:
          <select
            className="shop-desktop__sort-select"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as ShopCatalogSortKey)}
            aria-label={SHOP_DESKTOP_COPY.catalog.sortLabel}
          >
            {SHOP_DESKTOP_COPY.catalog.sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <div className="shop-desktop__view-toggle" aria-hidden>
          <span className="shop-desktop__view-toggle-btn shop-desktop__view-toggle-btn--active">
            <Squares2X2Icon className="size-4" />
          </span>
        </div>
      </div>
    </div>
  );
}
