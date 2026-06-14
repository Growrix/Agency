import type { MetadataRoute } from "next";
import { DISALLOWED_CRAWL_PATHS, SITE_INDEXING_ENABLED, absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!SITE_INDEXING_ENABLED) {
    // Pre-launch posture: keep the entire site out of search results.
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [...DISALLOWED_CRAWL_PATHS],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
