import type { Metadata } from "next";
import { JsonLd, type JsonLdData } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { ShopPageMobile } from "@/components/shop/ShopPageMobile";
import { ShopPageDesktop } from "@/components/shop/ShopPageDesktop";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { buildShopFilterGroups, buildShopFilterOptions, type ShopFilterState } from "@/lib/shop-filters";
import { buildShopMerchandising } from "@/lib/shop-merchandising";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/site";
import { listPublicShopProducts } from "@/server/domain/catalog";

export const metadata: Metadata = buildPageMetadata({
  title: "Digital Products — Templates, Starters, and Toolkits",
  description:
    "Browse HTML templates, SaaS starters, AI toolkits, and SEO packs. Compare Standard, Premium, and Done-For-You tiers.",
  path: "/digital-products",
});

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

  const catalogStructuredData: JsonLdData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Digital Products — Templates, Starters, and Toolkits",
    description:
      "Browse HTML templates, SaaS starters, AI toolkits, and SEO packs. Compare Standard, Premium, and Done-For-You tiers.",
    url: absoluteUrl("/digital-products"),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: allProducts.length,
      itemListElement: allProducts.slice(0, 20).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/digital-products/${product.slug}`),
        name: product.name,
      })),
    },
  };

  const sharedProps = {
    filters: filterState,
    filterGroups,
    allProducts,
    filteredProducts,
    merchandising,
    hasActiveFilter,
  };

  return (
    <>
      <JsonLd data={catalogStructuredData} />
      <MarketingViewportGate
        desktop={<ShopPageDesktop {...sharedProps} categoryOptions={filterOptions.categories} />}
        mobile={<ShopPageMobile {...sharedProps} categoryOptions={filterOptions.categories} />}
      />
    </>
  );
}
