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

const SHOP_SEO_TITLE = "HTML Website Templates & Business Profiles";
const SHOP_SEO_DESCRIPTION =
  "Browse HTML website templates and single-file business profiles for local services, corporate and creative businesses. Preview live, then choose Standard, Premium, or Done-For-You setup.";

type SearchParams = Promise<{
  category?: string;
  type?: string;
  industry?: string;
}>;

/**
 * Filtered listing URLs (?category=, ?type=, ?industry=) show a subset of the same
 * catalog and duplicate the category landing pages, so they stay out of the index while
 * still letting crawlers follow the product links. The canonical stays the unfiltered
 * listing.
 */
export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const filters = await searchParams;
  const hasActiveFilter = Boolean(filters.category || filters.type || filters.industry);

  return {
    ...buildPageMetadata({
      title: SHOP_SEO_TITLE,
      description: SHOP_SEO_DESCRIPTION,
      path: "/digital-products",
    }),
    ...(hasActiveFilter ? { robots: { index: false, follow: true } } : {}),
  };
}

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
    name: SHOP_SEO_TITLE,
    description: SHOP_SEO_DESCRIPTION,
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
