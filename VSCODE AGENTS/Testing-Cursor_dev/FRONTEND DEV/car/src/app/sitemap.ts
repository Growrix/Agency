import type { MetadataRoute } from "next";
import { services, products, vehicles, blogPosts } from "@/data/site";
import { routes } from "@/lib/routes";
import { getCanonical } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    routes.home,
    routes.services,
    routes.shop,
    routes.listing,
    routes.blog,
    routes.contact,
    routes.appointment,
    routes.faq,
    routes.about,
    routes.team,
    routes.locations,
    routes.careers,
    routes.testimonials,
    routes.support,
    routes.account,
    routes.shipping,
    routes.returns,
    routes.privacy,
    routes.terms,
    routes.cart,
    routes.wishlist,
    routes.checkout,
    routes.checkoutSuccess,
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: getCanonical(path),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === routes.home ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: getCanonical(routes.serviceDetail(service.slug)),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...products.map((product) => ({
      url: getCanonical(routes.productDetail(product.slug)),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...vehicles.map((vehicle) => ({
      url: getCanonical(routes.listingDetail(vehicle.slug)),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: getCanonical(routes.blogDetail(post.slug)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
