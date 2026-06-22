import "server-only";

import { unstable_cache } from "next/cache";
import type { BlogPost } from "@/lib/content";
import { listBlogPosts } from "@/server/blog/content";
import { listPublicPortfolio, listPublicServices, listPublicShopProducts } from "@/server/domain/catalog";
import { getSanityHomePageContent, type HomePageContent } from "@/server/sanity/marketing";
import type { PublicPortfolioRecord, PublicServiceRecord, PublicShopProductRecord } from "@/server/domain/catalog";

export type HomePageData = {
  latestBlogPosts: BlogPost[];
  homeContent: HomePageContent | null;
  services: PublicServiceRecord[];
  portfolio: PublicPortfolioRecord[];
  publicProducts: PublicShopProductRecord[];
};

const HOME_PAGE_REVALIDATE_SECONDS = 120;

async function loadHomePageDataUncached(): Promise<HomePageData> {
  const [blogPosts, homeContent, services, portfolio, publicProducts] = await Promise.all([
    listBlogPosts(),
    getSanityHomePageContent().catch(() => null),
    listPublicServices(),
    listPublicPortfolio(),
    listPublicShopProducts(),
  ]);

  return {
    latestBlogPosts: blogPosts.slice(0, 3),
    homeContent,
    services,
    portfolio,
    publicProducts,
  };
}

const getHomePageDataCached = unstable_cache(
  async () => loadHomePageDataUncached(),
  ["home-page-data"],
  { revalidate: HOME_PAGE_REVALIDATE_SECONDS, tags: ["home-page-data", "home-content", "catalog-products", "catalog-services", "catalog-portfolio", "blog-posts"] },
);

export async function getHomePageData(): Promise<HomePageData> {
  return getHomePageDataCached();
}
