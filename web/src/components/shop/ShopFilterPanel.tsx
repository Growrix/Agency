import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { SHOP_DESKTOP_COPY } from "@/lib/product-led-content";
import {
  buildShopHref,
  filterShopProducts,
  type ShopFilterGroup,
  type ShopFilterState,
} from "@/lib/shop-filters";
import type { PublicShopProductRecord } from "@/server/domain/catalog";
import { cn } from "@/lib/utils";

function FilterOption({
  href,
  active,
  label,
  count,
}: {
  href: string;
  active: boolean;
  label: string;
  count?: number;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={cn("shop-desktop__filter-option", active && "shop-desktop__filter-option--active")}
    >
      <span className="shop-desktop__filter-radio" aria-hidden />
      <span className="shop-desktop__filter-option-label">{label}</span>
      {typeof count === "number" ? <span className="shop-desktop__filter-count">{count}</span> : null}
    </Link>
  );
}

export type ShopFilterPanelProps = {
  filters: ShopFilterState;
  filterGroups: ShopFilterGroup[];
  allProducts: PublicShopProductRecord[];
  hasActiveFilter: boolean;
  className?: string;
};

export function ShopFilterPanel({
  filters,
  filterGroups,
  allProducts,
  hasActiveFilter,
  className,
}: ShopFilterPanelProps) {
  return (
    <div className={cn("shop-desktop__filter-column", className)}>
      <aside className="shop-desktop__filter-panel">
        <div className="shop-desktop__filter-header">
          <p className="shop-desktop__filter-title">{SHOP_DESKTOP_COPY.catalog.filterTitle}</p>
          {hasActiveFilter ? (
            <Link href="/digital-products" scroll={false} className="shop-desktop__filter-clear">
              {SHOP_DESKTOP_COPY.catalog.clearAll}
            </Link>
          ) : null}
        </div>

        {filterGroups.map((group) => {
          const scopedFilters = { ...filters, [group.key]: undefined };
          const allCount = filterShopProducts(allProducts, scopedFilters).length;

          return (
            <div key={group.key} className="shop-desktop__filter-group">
              <p className="shop-desktop__filter-group-label">{group.label}</p>
              <div className="shop-desktop__filter-options">
                <FilterOption
                  href={buildShopHref(filters, { [group.key]: undefined })}
                  active={!group.activeValue}
                  label={`All ${group.label}`}
                  count={allCount}
                />
                {group.options.map((option) => (
                  <FilterOption
                    key={option.value}
                    href={buildShopHref(filters, { [group.key]: option.value })}
                    active={group.activeValue === option.value}
                    label={option.label}
                    count={
                      filterShopProducts(allProducts, { ...filters, [group.key]: option.value }).length
                    }
                  />
                ))}
              </div>
            </div>
          );
        })}

        <div className="shop-desktop__bundle-promo">
          <p className="shop-desktop__bundle-promo-title">{SHOP_DESKTOP_COPY.catalog.bundlePromo.title}</p>
          <p className="shop-desktop__bundle-promo-copy">{SHOP_DESKTOP_COPY.catalog.bundlePromo.description}</p>
          <Link href={SHOP_DESKTOP_COPY.catalog.bundlePromo.ctaHref} className="shop-desktop__bundle-promo-link">
            {SHOP_DESKTOP_COPY.catalog.bundlePromo.ctaLabel}
            <ArrowUpRightIcon className="size-3.5" aria-hidden />
          </Link>
        </div>
      </aside>
    </div>
  );
}
