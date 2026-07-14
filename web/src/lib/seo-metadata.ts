import type { Metadata } from "next";

export const DEFAULT_OG_IMAGE = "/images/og/growrix-os-share.png";

export const HOME_SHARE_TITLE = "Agency for Websites, SaaS Applications, Mobile Apps, Automations";

export const HOME_SHARE_DESCRIPTION =
  "Growrix OS is an agency specializing in websites, SaaS applications, mobile apps, and automation systems for ambitious teams.";

export const NOINDEX_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
};

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
  twitterImages?: string[];
};

/**
 * Builds per-route metadata with self-canonical, Open Graph, and Twitter cards.
 * Use on every indexable public route. Root layout must not set a global canonical.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
  twitterImages,
}: BuildPageMetadataInput): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const images = twitterImages ?? [ogImage];

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: ogType,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    ...(noIndex ? { robots: NOINDEX_ROBOTS } : {}),
  };
}
