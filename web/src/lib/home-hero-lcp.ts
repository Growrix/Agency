import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import {
  HTML_DESKTOP_VIEWPORT_HEIGHT,
  HTML_DESKTOP_VIEWPORT_WIDTH,
} from "@/components/shop/WebsiteTemplateHtmlDesktopPreviewFrame";
import {
  HTML_MOBILE_VIEWPORT_HEIGHT,
  HTML_MOBILE_VIEWPORT_WIDTH,
} from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";
import { previewPosterAlt } from "@/lib/website-templates-html-preview";

export type HomeHeroLcpPoster = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type HomeHeroLcpPosters = {
  mobile: HomeHeroLcpPoster | null;
  desktop: HomeHeroLcpPoster | null;
};

function toPoster(
  image: { src: string; alt: string } | null | undefined,
  width: number,
  height: number,
): HomeHeroLcpPoster | null {
  if (!image?.src) {
    return null;
  }

  return {
    src: image.src,
    alt: image.alt || previewPosterAlt("Website template", width > 400 ? "desktop" : "mobile"),
    width,
    height,
  };
}

/** Resolves the first hero slide posters used for SSR LCP hints and placeholder rendering. */
export function resolveHeroLcpPosters(
  slides: HtmlProfileHeroSlide[],
  emptyFallbackSlide?: HtmlProfileHeroSlide,
): HomeHeroLcpPosters {
  const first = slides[0] ?? emptyFallbackSlide;

  return {
    mobile: toPoster(
      first?.previewMobileImage ?? first?.previewImage,
      HTML_MOBILE_VIEWPORT_WIDTH,
      HTML_MOBILE_VIEWPORT_HEIGHT,
    ),
    desktop: toPoster(first?.previewImage, HTML_DESKTOP_VIEWPORT_WIDTH, HTML_DESKTOP_VIEWPORT_HEIGHT),
  };
}
