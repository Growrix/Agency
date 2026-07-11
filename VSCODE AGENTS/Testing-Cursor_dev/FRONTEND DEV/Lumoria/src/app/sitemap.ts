import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const routePaths = [
  "/",
  "/about",
  "/blog",
  "/career-listing",
  "/contact-us",
  "/core-values",
  "/faq",
  "/listings/designing-tomorrows-cities",
  "/our-awards",
  "/our-history",
  "/our-process",
  "/our-services",
  "/our-team",
  "/portfolio-style-2",
  "/portfolio-style1",
  "/pricing-plan",
  "/sustainable-construction-for-long-term-living",
  "/urban-development-for-the-next-generation",
  "/wdt-careers/project-assistant",
  "/wdt-services/custom-construction",
  "/with-left-sidebar",
  "/with-right-sidebar",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routePaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
