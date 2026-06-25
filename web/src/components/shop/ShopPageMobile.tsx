"use client";

import { ShopMobileMarketplace } from "@/components/shop/ShopMobileMarketplace";
import type { ShopMerchandisingCollections } from "@/lib/shop-merchandising";
import type { ShopFilterGroup, ShopFilterState } from "@/lib/shop-filters";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

export type ShopPageMobileProps = {
  filters: ShopFilterState;
  filterGroups: ShopFilterGroup[];
  allProducts: PublicShopProductRecord[];
  filteredProducts: PublicShopProductRecord[];
  merchandising: ShopMerchandisingCollections;
  hasActiveFilter: boolean;
  categoryOptions: { value: string; label: string }[];
};

export function ShopPageMobile(props: ShopPageMobileProps) {
  return (
    <div className="home-mobile-marketing">
      <ShopMobileMarketplace {...props} />
    </div>
  );
}
