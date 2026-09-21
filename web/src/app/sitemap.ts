import type { MetadataRoute } from "next";
import { PUBLIC_SERVICE_SLUG_SET } from "@/lib/public-service-slugs";
import { absoluteUrl } from "@/lib/site";
import { listBlogPosts } from "@/server/blog/content";
import { listPublicPortfolio, listPublicServices, listPublicShopProducts } from "@/server/domain/catalog";

export const revalidate = 900;

const REDIRECTED_SERVICE_SLUGS = new Set(["html-business-profiles", "template-customization"]);

const STATIC_ROUTES = [
  "/",
  "/digital-products",
  "/digital-products/bundles",
  "/digital-products/free",
  "/pricing",
  "/services",
  "/portfolio",
  "/blog",
  "/about",
  "/contact",
  "/faq",
  "/book-appointment",
  "/additional-services",
  "/ai-concierge",
  "/legal/privacy",
  "/legal/terms",
  "/refund-policy",
] as const;

const PRODUCT_CATEGORY_SLUGS = [
  "website-templates-html-preview",
  "html-business-profiles",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // `lastModified` is only emitted when we know a real date (blog posts). Stamping every URL
  // with "now" on each request teaches Google to ignore the field for the whole sitemap.
  const [products, services, portfolio, blogPosts] = await Promise.all([
    listPublicShopProducts().catch(() => []),
    listPublicServices().catch(() => []),
    listPublicPortfolio().catch(() => []),
    listBlogPosts().catch(() => []),
  ]);

  // Only emit service URLs that both avoid redirects AND have a local COPY map
  // (otherwise Google crawls a sitemap URL and hits a 404).
  const indexableServices = services.filter(
    (service) =>
      !REDIRECTED_SERVICE_SLUGS.has(service.slug) && PUBLIC_SERVICE_SLUG_SET.has(service.slug),
  );

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = PRODUCT_CATEGORY_SLUGS.map((slug) => ({
    url: absoluteUrl(`/digital-products/category/${slug}`),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/digital-products/${product.slug}`),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = indexableServices.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const portfolioEntries: MetadataRoute.Sitemap = portfolio.map((project) => ({
    url: absoluteUrl(`/portfolio/${project.slug}`),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...categoryEntries,
    ...productEntries,
    ...serviceEntries,
    ...portfolioEntries,
    ...blogEntries,
  ];
}
