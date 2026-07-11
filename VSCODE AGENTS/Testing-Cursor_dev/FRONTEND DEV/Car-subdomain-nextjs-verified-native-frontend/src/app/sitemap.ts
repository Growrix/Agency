import type { MetadataRoute } from "next";
import { sitePages } from "@/data/site-pages";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://velocareauto.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages.map((page) => ({
    url: new URL(page.canonicalPath, SITE_URL).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page.canonicalPath === "/" ? 1 : 0.8,
  }));
}