import type { Metadata } from "next";

export const DEFAULT_OG_IMAGE = "/images/og/growrix-os-share.png";

export const HOME_SHARE_TITLE = "Custom Website, SaaS & Mobile App Studio";

export const HOME_SHARE_DESCRIPTION =
  "Growrix OS is a founder-led studio and digital marketplace for website templates, SaaS starters, and custom website, SaaS, and mobile app builds.";

export const META_DESCRIPTION_MAX_LENGTH = 155;

/**
 * Truncates meta descriptions to a safe SERP length, preferring sentence boundaries.
 */
export function truncateMetaDescription(text: string, maxLength = META_DESCRIPTION_MAX_LENGTH): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  const slice = trimmed.slice(0, maxLength + 1);
  const sentenceBreak = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("! "), slice.lastIndexOf("? "));
  if (sentenceBreak >= Math.floor(maxLength * 0.6)) {
    return slice.slice(0, sentenceBreak + 1).trim();
  }

  const wordBreak = slice.lastIndexOf(" ");
  if (wordBreak > 0) {
    return `${slice.slice(0, wordBreak).trim()}…`;
  }

  return `${trimmed.slice(0, maxLength).trim()}…`;
}

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
