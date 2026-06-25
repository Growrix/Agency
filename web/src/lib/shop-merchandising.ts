import { SHOP_MARKETPLACE_COPY } from "@/lib/product-led-content";
import { sortShopCatalogProducts } from "@/lib/shop-catalog-sort";
import type { PublicShopProductRecord } from "@/server/domain/catalog";

export type ShopMerchandisingCollections = {
  featured: PublicShopProductRecord[];
  premium: PublicShopProductRecord[];
  newArrivals: PublicShopProductRecord[];
  bundles: PublicShopProductRecord[];
  catalogProducts: PublicShopProductRecord[];
  showBands: boolean;
};

const FEATURED_TAGS = new Set(["Popular", "Preview"]);

function byRatingDesc(left: PublicShopProductRecord, right: PublicShopProductRecord) {
  const leftRating = left.rating ?? 0;
  const rightRating = right.rating ?? 0;
  if (rightRating !== leftRating) {
    return rightRating - leftRating;
  }
  return left.name.localeCompare(right.name);
}

function pickBySlugs(products: PublicShopProductRecord[], slugs: readonly string[], max: number) {
  if (slugs.length === 0) {
    return [] as PublicShopProductRecord[];
  }
  const bySlug = new Map(products.map((product) => [product.slug, product]));
  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((product): product is PublicShopProductRecord => Boolean(product))
    .slice(0, max);
}

function pickFeatured(products: PublicShopProductRecord[], max: number, curatedSlugs: readonly string[]) {
  const curated = pickBySlugs(products, curatedSlugs, max);
  const used = new Set(curated.map((product) => product.slug));
  const result = [...curated];

  for (const product of products.filter((item) => !used.has(item.slug) && item.tag && FEATURED_TAGS.has(item.tag)).sort(byRatingDesc)) {
    if (result.length >= max) {
      break;
    }
    result.push(product);
    used.add(product.slug);
  }

  if (result.length < max) {
    for (const product of sortShopCatalogProducts(products.filter((item) => !used.has(item.slug)), "popular")) {
      if (result.length >= max) {
        break;
      }
      result.push(product);
    }
  }

  return result.slice(0, max);
}

function pickPremium(products: PublicShopProductRecord[], max: number, exclude: Set<string>) {
  return products
    .filter(
      (product) =>
        !exclude.has(product.slug) &&
        product.variants?.some((variant) => variant.tier_name === "Premium"),
    )
    .sort(byRatingDesc)
    .slice(0, max);
}

function pickNewArrivals(products: PublicShopProductRecord[], max: number, exclude: Set<string>) {
  return products
    .filter((product) => !exclude.has(product.slug) && product.tag === "New")
    .sort(byRatingDesc)
    .slice(0, max);
}

function pickBundles(products: PublicShopProductRecord[], max: number, exclude: Set<string>) {
  return products
    .filter((product) => !exclude.has(product.slug) && product.categorySlug === "bundles")
    .sort(byRatingDesc)
    .slice(0, max);
}

export function buildShopMerchandising({
  allProducts,
  filteredProducts,
  hasActiveFilter,
}: {
  allProducts: PublicShopProductRecord[];
  filteredProducts: PublicShopProductRecord[];
  hasActiveFilter: boolean;
}): ShopMerchandisingCollections {
  if (hasActiveFilter) {
    return {
      featured: [],
      premium: [],
      newArrivals: [],
      bundles: [],
      catalogProducts: filteredProducts,
      showBands: false,
    };
  }

  const { caps, curatedSlugs } = SHOP_MARKETPLACE_COPY;
  const featured = pickFeatured(allProducts, caps.maxFeatured, curatedSlugs.featured);
  const exclude = new Set(featured.map((product) => product.slug));

  const premium = pickPremium(allProducts, caps.maxPremium, exclude);
  premium.forEach((product) => exclude.add(product.slug));

  const newArrivals = pickNewArrivals(allProducts, caps.maxNew, exclude);
  newArrivals.forEach((product) => exclude.add(product.slug));

  const bundles = pickBundles(allProducts, caps.maxBundles, exclude);
  bundles.forEach((product) => exclude.add(product.slug));

  const catalogProducts = filteredProducts.filter((product) => !exclude.has(product.slug));

  return {
    featured,
    premium,
    newArrivals,
    bundles,
    catalogProducts,
    showBands: true,
  };
}
