const SANITY_CDN_HOST = "cdn.sanity.io";

export function isSanityCdnImage(src: string): boolean {
  try {
    return new URL(src).hostname === SANITY_CDN_HOST;
  } catch {
    return false;
  }
}

/**
 * Request a Sanity CDN derivative so Next.js image optimization does not fetch
 * full-resolution masters (which can timeout in dev on large PNGs).
 */
export function toSanityCdnImageSrc(src: string, width: number, quality = 75): string {
  if (!isSanityCdnImage(src)) {
    return src;
  }

  const clampedWidth = Math.min(Math.max(Math.round(width), 1), 4096);
  const url = new URL(src);
  url.searchParams.set("w", String(clampedWidth));
  url.searchParams.set("q", String(quality));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
}

/** Retina-friendly width for fixed-size thumbnails (e.g. 44px UI slot → 96px source). */
export function sanityThumbSrc(src: string, displayPx: number, quality = 75): string {
  return toSanityCdnImageSrc(src, Math.max(displayPx * 2, displayPx), quality);
}
