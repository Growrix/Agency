import type { MetadataRoute } from "next";
import { DISALLOWED_CRAWL_PATHS, SITE_INDEXING_ENABLED, absoluteUrl } from "@/lib/site";

/**
 * Crawl policy for search engines.
 *
 * When indexing is disabled (preview/dev or SITE_INDEXING_ENABLED=false),
 * disallow the entire site. When enabled (production default), allow public
 * routes and only block private/utility prefixes — never emit Host: (unsupported by Google).
 */
export default function robots(): MetadataRoute.Robots {
  if (!SITE_INDEXING_ENABLED) {
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
  };
}
