import { SHOP_DESKTOP_COPY } from "@/lib/product-led-content";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

export type ShopCatalogSortKey = (typeof SHOP_DESKTOP_COPY.catalog.sortOptions)[number]["value"];

function resolveSortKey(product: PublicShopProductRecord) {
  return {
    rating: product.rating ?? 0,
    priceCents: product.price_cents,
    name: product.name.toLowerCase(),
  };
}

export function sortShopCatalogProducts(products: PublicShopProductRecord[], sort: ShopCatalogSortKey) {
  const next = [...products];
  switch (sort) {
    case "price-asc":
      return next.sort((a, b) => a.price_cents - b.price_cents);
    case "price-desc":
      return next.sort((a, b) => b.price_cents - a.price_cents);
    case "name":
      return next.sort((a, b) => a.name.localeCompare(b.name));
    case "popular":
    default:
      return next.sort((a, b) => {
        const left = resolveSortKey(a);
        const right = resolveSortKey(b);
        if (right.rating !== left.rating) {
          return right.rating - left.rating;
        }
        return left.name.localeCompare(right.name);
      });
  }
}
