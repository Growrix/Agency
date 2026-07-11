import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export function getCanonical(pathname: string) {
  const base = siteConfig.canonicalUrl.replace(/\/$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function createPageMetadata(input: {
  title: string;
  description?: string;
  pathname: string;
}): Metadata {
  const title = `${input.title} | ${siteConfig.name}`;
  const description = input.description ?? siteConfig.description;
  const canonical = getCanonical(input.pathname);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
