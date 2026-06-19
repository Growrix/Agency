import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { listBlogPosts } from "@/server/blog/content";
import { listPublicPortfolio, listPublicServices, listPublicShopProducts } from "@/server/domain/catalog";

const STATIC_ROUTES = [
  "/",
  "/digital-products",
  "/digital-products/bundles",
  "/digital-products/free",
  "/pricing",
  "/services",
  "/additional-services",
  "/portfolio",
  "/blog",
  "/about",
  "/contact",
  "/faq",
  "/book-appointment",
  "/ai-concierge",
  "/html-business-profiles",
  "/solutions/for-startups",
  "/solutions/for-saas-founders",
  "/solutions/for-agencies",
  "/solutions/for-local-businesses",
  "/privacy-policy",
  "/terms-of-service",
] as const;

const PRODUCT_CATEGORY_SLUGS = [
  "website-templates",
  "website-templates-html-preview",
  "html-business-profiles",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [products, services, portfolio, blogPosts] = await Promise.all([
    listPublicShopProducts().catch(() => []),
    listPublicServices().catch(() => []),
    listPublicPortfolio().catch(() => []),
    listBlogPosts().catch(() => []),
  ]);

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: route === "/" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = PRODUCT_CATEGORY_SLUGS.map((slug) => ({
    url: absoluteUrl(`/digital-products/category/${slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/digital-products/${product.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const portfolioEntries: MetadataRoute.Sitemap = portfolio.map((project) => ({
    url: absoluteUrl(`/portfolio/${project.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
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
