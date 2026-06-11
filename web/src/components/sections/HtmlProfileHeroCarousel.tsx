"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WebsiteTemplateHtmlDesktopPreviewFrame } from "@/components/shop/WebsiteTemplateHtmlDesktopPreviewFrame";
import { WebsiteTemplateHtmlMobilePreviewFrame } from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";
import { cn } from "@/lib/utils";

export type HtmlProfileHeroSlide = {
  name: string;
  type: string;
  price: string;
  href: string;
  previewUrl?: string;
  previewImage?: {
    src: string;
    alt: string;
  } | null;
};

type HtmlProfileHeroCarouselPreviewMode = "iframe" | "mobile-frame" | "desktop-scaled";

type HtmlProfileHeroCarouselProps = {
  slides: HtmlProfileHeroSlide[];
  ctaLabel?: string;
  emptyFallbackSlide?: HtmlProfileHeroSlide;
  previewMode?: HtmlProfileHeroCarouselPreviewMode;
  fillHeight?: boolean;
  desktopPreviewFit?: "width" | "cover";
  desktopPreviewViewportHeight?: number;
  mobileFrameMinHeightClass?: string;
  /** Max height budget for scaling the phone frame (use HTML_MOBILE_FRAME_HEIGHT for native size). */
  mobilePreviewMaxHeight?: number;
  mobilePreviewShowViewportLabel?: boolean;
};

function CarouselPreviewFrame({
  slide,
  previewMode,
  desktopPreviewFit = "width",
  desktopPreviewViewportHeight,
  mobilePreviewMaxHeight,
  mobilePreviewShowViewportLabel = false,
}: {
  slide: HtmlProfileHeroSlide;
  previewMode: HtmlProfileHeroCarouselPreviewMode;
  desktopPreviewFit?: "width" | "cover";
  desktopPreviewViewportHeight?: number;
  mobilePreviewMaxHeight?: number;
  mobilePreviewShowViewportLabel?: boolean;
}) {
  if (slide.previewUrl && previewMode === "mobile-frame") {
    return (
      <div className="flex h-full w-full min-w-0 items-start justify-center overflow-hidden px-1 py-1">
        <WebsiteTemplateHtmlMobilePreviewFrame
          previewUrl={slide.previewUrl}
          title={`${slide.name} mobile preview`}
          maxFrameHeight={mobilePreviewMaxHeight}
          showViewportLabel={mobilePreviewShowViewportLabel}
          className="w-full max-w-full"
        />
      </div>
    );
  }

  if (slide.previewUrl && previewMode === "desktop-scaled") {
    return (
      <WebsiteTemplateHtmlDesktopPreviewFrame
        previewUrl={slide.previewUrl}
        title={`${slide.name} desktop preview`}
        fit={desktopPreviewFit}
        viewportHeight={desktopPreviewViewportHeight}
        className={desktopPreviewFit === "cover" ? "absolute inset-0 h-full w-full" : undefined}
        frameClassName={desktopPreviewFit === "cover" ? "h-full" : "rounded-md border border-border"}
      />
    );
  }

  if (slide.previewUrl) {
    return (
      <iframe
        src={slide.previewUrl}
        title={`${slide.name} preview`}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  if (slide.previewImage) {
    return (
      <div className="relative h-full w-full bg-surface">
        <Image
          src={slide.previewImage.src}
          alt={slide.previewImage.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-contain object-top"
        />
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center px-4 text-center text-sm text-white/70">
      Preview unavailable
    </div>
  );
}

export function HtmlProfileHeroCarousel({
  slides,
  ctaLabel = "View Profile",
  emptyFallbackSlide,
  previewMode = "iframe",
  fillHeight = false,
  desktopPreviewFit = "width",
  desktopPreviewViewportHeight,
  mobileFrameMinHeightClass = "min-h-0",
  mobilePreviewMaxHeight,
  mobilePreviewShowViewportLabel = false,
}: HtmlProfileHeroCarouselProps) {
  const fallbackSlide = useMemo(
    () => emptyFallbackSlide ?? {
      name: "Business Profile Template",
      type: "Category Template",
      price: "$19",
      href: "/products/category/html-business-profiles",
    },
    [emptyFallbackSlide],
  );
  const safeSlides = useMemo(
    () => (slides.length > 0
      ? slides
      : [fallbackSlide]),
    [fallbackSlide, slides],
  );
  const loopSlides = useMemo(() => [...safeSlides, safeSlides[0]], [safeSlides]);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAnimate(true);
      setIndex((prev) => prev + 1);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  const handleTransitionEnd = () => {
    if (index === safeSlides.length) {
      setAnimate(false);
      setIndex(0);
    }
  };

  const isMobileFrame = previewMode === "mobile-frame";

  const previewFrameClassName = isMobileFrame
    ? cn(
        "w-full min-w-0 overflow-hidden rounded-md border border-border bg-inset/20",
        mobileFrameMinHeightClass,
      )
    : previewMode === "desktop-scaled" && fillHeight
      ? "relative min-h-0 flex-1 overflow-hidden rounded-md border border-border bg-[#0a0a0a]"
      : previewMode === "desktop-scaled"
        ? "overflow-hidden rounded-md border border-border bg-[#0a0a0a]"
        : "min-h-[320px] flex-1 overflow-hidden rounded-md border border-border bg-black lg:min-h-[480px]";

  return (
    <div className={cn(
      "overflow-hidden rounded-md border border-border bg-inset/30",
      fillHeight && !isMobileFrame ? "flex h-full min-h-0 flex-col" : "min-w-0",
      !isMobileFrame && !fillHeight && "h-full",
    )}>
      <div
        className={cn(
          "flex",
          fillHeight && !isMobileFrame && "h-full min-h-0 flex-1",
          animate && "transition-transform duration-500 ease-out",
        )}
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {loopSlides.map((slide, slideIndex) => (
          <article
            key={`${slide.name}-${slideIndex}`}
            className={cn(
              "flex min-w-full flex-col p-3",
              fillHeight && !isMobileFrame && "h-full min-h-0 flex-1",
            )}
          >
            <div className={previewFrameClassName}>
              <CarouselPreviewFrame
                slide={slide}
                previewMode={previewMode}
                desktopPreviewFit={desktopPreviewFit}
                desktopPreviewViewportHeight={desktopPreviewViewportHeight}
                mobilePreviewMaxHeight={mobilePreviewMaxHeight}
                mobilePreviewShowViewportLabel={mobilePreviewShowViewportLabel}
              />
            </div>
            <div className={cn("mt-3 shrink-0 border-t border-border/70 pt-3", fillHeight && !isMobileFrame && "shrink-0")}>
              <p className="line-clamp-1 text-sm font-semibold text-text">{slide.name}</p>
              <p className="mt-1 text-xs text-text-muted">{slide.type}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-primary">From {slide.price}</span>
                <Link
                  href={slide.href}
                  className="inline-flex items-center rounded-md border border-primary/30 bg-primary/5 px-2.5 py-1 text-xs font-semibold text-primary hover:bg-primary/10"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
