import type { Metadata } from "next";
import { ShopPageMobile } from "@/components/shop/ShopPageMobile";
import { ShopPageDesktop } from "@/components/shop/ShopPageDesktop";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { buildShopFilterGroups, buildShopFilterOptions, type ShopFilterState } from "@/lib/shop-filters";
import { buildShopMerchandising } from "@/lib/shop-merchandising";
import { listPublicShopProducts } from "@/server/domain/catalog";

export const metadata: Metadata = {
  title: "Digital Products — Templates, Starters, and Toolkits",
  description:
    "Browse HTML templates, SaaS starters, AI toolkits, MCP kits, and SEO packs. Compare Standard, Premium, and Done-For-You tiers.",
};

type SearchParams = Promise<{
  category?: string;
  type?: string;
  industry?: string;
}>;

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const filters = await searchParams;
  const filterState = filters as ShopFilterState;
  const hasActiveFilter = !!(filterState.category || filterState.type || filterState.industry);

  const [allProducts, filteredProducts] = await Promise.all([
    listPublicShopProducts(),
    listPublicShopProducts(filters),
  ]);
  const filterOptions = buildShopFilterOptions(allProducts);
  const filterGroups = buildShopFilterGroups(filterOptions, filterState);
  const merchandising = buildShopMerchandising({
    allProducts,
    filteredProducts,
    hasActiveFilter,
  });

  const sharedProps = {
    filters: filterState,
    filterGroups,
    allProducts,
    filteredProducts,
    merchandising,
    hasActiveFilter,
  };

  return (
    <MarketingViewportGate
      desktop={<ShopPageDesktop {...sharedProps} categoryOptions={filterOptions.categories} />}
      mobile={<ShopPageMobile {...sharedProps} categoryOptions={filterOptions.categories} />}
    />
  );
}
