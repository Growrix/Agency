"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { WebsiteTemplateHtmlDesktopPreviewFrame } from "@/components/shop/WebsiteTemplateHtmlDesktopPreviewFrame";
import { WebsiteTemplateHtmlDesktopPosterFrame } from "@/components/shop/WebsiteTemplateHtmlDesktopPosterFrame";
import { WebsiteTemplateHtmlMobilePreviewFrame } from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";
import {
  HTML_PROFILE_CAROUSEL_AUTOPLAY_MS,
  HTML_PROFILE_CAROUSEL_TRANSITION_MS,
  HOME_HERO_SHOWCASE_FADE_MS,
} from "@/lib/html-profile-carousel-config";
import { PreviewPosterPlaceholder } from "@/components/shop/PreviewPosterPlaceholder";
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
  previewMobileImage?: {
    src: string;
    alt: string;
  } | null;
};

type HtmlProfileHeroCarouselPreviewMode = "iframe" | "mobile-frame" | "desktop-scaled";

type HtmlProfileHeroCarouselTransitionMode = "slide" | "fade";

export type HtmlProfileHeroCarouselNavigation = {
  canNavigate: boolean;
  goNext: () => void;
  goPrev: () => void;
};

type HtmlProfileHeroCarouselProps = {
  slides: HtmlProfileHeroSlide[];
  ctaLabel?: string;
  emptyFallbackSlide?: HtmlProfileHeroSlide;
  previewMode?: HtmlProfileHeroCarouselPreviewMode;
  fillHeight?: boolean;
  desktopPreviewFit?: "width" | "cover";
  desktopPreviewViewportHeight?: number;
  desktopPreviewVerticalAlign?: "top" | "center";
  mobileFrameMinHeightClass?: string;
  /** Max height budget for scaling the phone frame (use HTML_MOBILE_FRAME_HEIGHT for native size). */
  mobilePreviewMaxHeight?: number;
  mobilePreviewShowViewportLabel?: boolean;
  autoPlay?: boolean;
  autoPlayIntervalMs?: number;
  posterFirst?: boolean;
  className?: string;
  showSlideMeta?: boolean;
  showPagination?: boolean;
  onActiveIndexChange?: (index: number) => void;
  /** Tighter hero showcase layout — preview fills the carousel height. */
  compactPresentation?: boolean;
  /** Crossfade instead of horizontal slide (homepage hero showcase). */
  transitionMode?: HtmlProfileHeroCarouselTransitionMode;
  /** Opacity crossfade duration when `transitionMode="fade"`. */
  transitionDurationMs?: number;
  /** Render prev/next controls via `onNavigationReady` instead of inside the preview. */
  hideNavigation?: boolean;
  onNavigationReady?: (navigation: HtmlProfileHeroCarouselNavigation) => void;
  /** Prefer auto-generated poster images over iframe live previews. */
  preferPoster?: boolean;
  /** Stretch width-fit posters to fill the preview container (hero monitor). */
  posterFillContainer?: boolean;
};

function slideHasPreview(slide: HtmlProfileHeroSlide) {
  return Boolean(slide.previewUrl || slide.previewImage?.src);
}

function CarouselPreviewFrame({
  slide,
  previewMode,
  desktopPreviewFit = "width",
  desktopPreviewViewportHeight,
  mobilePreviewMaxHeight,
  mobilePreviewShowViewportLabel = false,
  loadPreview = true,
  desktopPreviewVerticalAlign = "center",
  iframeLoading = "lazy",
  preferPoster = false,
  posterFillContainer = false,
  imagePriority = false,
}: {
  slide: HtmlProfileHeroSlide;
  previewMode: HtmlProfileHeroCarouselPreviewMode;
  desktopPreviewFit?: "width" | "cover";
  desktopPreviewViewportHeight?: number;
  mobilePreviewMaxHeight?: number;
  mobilePreviewShowViewportLabel?: boolean;
  loadPreview?: boolean;
  desktopPreviewVerticalAlign?: "top" | "center";
  iframeLoading?: "lazy" | "eager";
  preferPoster?: boolean;
  posterFillContainer?: boolean;
  imagePriority?: boolean;
}) {
  if (!loadPreview) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#0a0a0a] px-4 text-center text-xs text-white/50">
        {slide.name}
      </div>
    );
  }

  if (preferPoster && slide.previewImage?.src) {
    if (previewMode === "mobile-frame") {
      const mobileImage = slide.previewMobileImage;
      if (!mobileImage?.src) {
        return (
          <div className="flex h-full w-full items-center justify-center bg-[#0a0a0a] px-4 text-center text-xs text-white/50">
            {slide.name}
          </div>
        );
      }
      return (
        <div className="flex h-full w-full min-w-0 items-start justify-center overflow-hidden px-1 py-1">
          <WebsiteTemplateHtmlMobilePreviewFrame
            posterImage={mobileImage}
            title={`${slide.name} mobile preview`}
            maxFrameHeight={mobilePreviewMaxHeight}
            showViewportLabel={mobilePreviewShowViewportLabel}
            className="w-full max-w-full"
          />
        </div>
      );
    }

    return (
      <WebsiteTemplateHtmlDesktopPosterFrame
        posterImage={slide.previewImage}
        fit={desktopPreviewFit}
        verticalAlign={desktopPreviewVerticalAlign}
        fillContainer={posterFillContainer}
        imagePriority={imagePriority}
        className={
          desktopPreviewFit === "cover" || posterFillContainer
            ? "absolute inset-0 h-full w-full"
            : "h-full min-h-full w-full"
        }
        frameClassName="h-full w-full rounded-none border-0 bg-[#0a0a0a]"
      />
    );
  }

  if (slide.previewUrl && previewMode === "mobile-frame") {
    return (
      <div className="flex h-full w-full min-w-0 items-start justify-center overflow-hidden px-1 py-1">
        <WebsiteTemplateHtmlMobilePreviewFrame
          previewUrl={slide.previewUrl}
          title={`${slide.name} mobile preview`}
          maxFrameHeight={mobilePreviewMaxHeight}
          showViewportLabel={mobilePreviewShowViewportLabel}
          className="w-full max-w-full"
          iframeLoading="lazy"
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
        verticalAlign={desktopPreviewVerticalAlign}
        viewportHeight={desktopPreviewViewportHeight}
        className={
          desktopPreviewFit === "cover"
            ? "absolute inset-0 h-full w-full"
            : "h-full min-h-full w-full"
        }
        frameClassName="h-full w-full rounded-none border-0"
        iframeLoading={iframeLoading}
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
        tabIndex={-1}
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

const carouselNavButtonClassName =
  "pointer-events-auto inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border/80 bg-surface/90 text-text shadow-sm backdrop-blur-sm transition hover:border-primary/40 hover:bg-surface hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-40";

export { carouselNavButtonClassName };

export function HtmlProfileHeroCarousel({
  slides,
  ctaLabel = "View Profile",
  emptyFallbackSlide,
  previewMode = "iframe",
  fillHeight = false,
  desktopPreviewFit = "width",
  desktopPreviewViewportHeight,
  desktopPreviewVerticalAlign = "center",
  mobileFrameMinHeightClass = "min-h-0",
  mobilePreviewMaxHeight,
  mobilePreviewShowViewportLabel = false,
  autoPlay = false,
  autoPlayIntervalMs,
  posterFirst = false,
  className,
  showSlideMeta = true,
  showPagination = false,
  onActiveIndexChange,
  compactPresentation = false,
  transitionMode = "slide",
  transitionDurationMs,
  hideNavigation = false,
  onNavigationReady,
  preferPoster = false,
  posterFillContainer = false,
}: HtmlProfileHeroCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [livePreviewEnabled, setLivePreviewEnabled] = useState(!posterFirst);
  const isFadeMode = transitionMode === "fade";
  const fadeDurationMs = transitionDurationMs ?? HOME_HERO_SHOWCASE_FADE_MS;
  const fallbackSlide = useMemo(
    () => emptyFallbackSlide ?? {
      name: "Business Profile Template",
      type: "Category Template",
      price: "$19",
      href: "/digital-products/category/html-business-profiles",
    },
    [emptyFallbackSlide],
  );

  const safeSlides = useMemo(() => {
    const previewable = slides.filter(slideHasPreview);
    if (previewable.length > 0) {
      return previewable;
    }

    return slideHasPreview(fallbackSlide) ? [fallbackSlide] : [fallbackSlide];
  }, [fallbackSlide, slides]);

  const loopSlides = useMemo(() => [...safeSlides, safeSlides[0]], [safeSlides]);
  const cloneIndex = safeSlides.length;

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(
    () => typeof window !== "undefined" && typeof window.IntersectionObserver === "undefined",
  );
  const isTransitioningRef = useRef(false);

  const canNavigate = safeSlides.length > 1;

  const logicalIndex = isFadeMode ? index : index >= cloneIndex ? 0 : index;

  useEffect(() => {
    onActiveIndexChange?.(logicalIndex);
  }, [logicalIndex, onActiveIndexChange]);

  const previewLoadIndexes = useMemo(() => new Set([logicalIndex]), [logicalIndex]);

  const finishLoopReset = useCallback(() => {
    isTransitioningRef.current = true;
    setAnimate(false);
    setIndex(0);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        isTransitioningRef.current = false;
        setAnimate(true);
      });
    });
  }, []);

  const beginFadeTransition = useCallback(() => {
    isTransitioningRef.current = true;
    setIsTransitioning(true);
  }, []);

  const completeFadeTransition = useCallback(() => {
    if (!isTransitioningRef.current) {
      return;
    }

    isTransitioningRef.current = false;
    setIsTransitioning(false);
  }, []);

  const goNext = useCallback(() => {
    if (!canNavigate || isTransitioningRef.current) {
      return;
    }

    if (isFadeMode) {
      beginFadeTransition();
      setIndex((prev) => (prev + 1) % safeSlides.length);
      return;
    }

    if (index >= cloneIndex) {
      finishLoopReset();
      return;
    }

    isTransitioningRef.current = true;
    setAnimate(true);
    setIndex((prev) => prev + 1);
  }, [beginFadeTransition, canNavigate, cloneIndex, finishLoopReset, index, isFadeMode, safeSlides.length]);

  const goPrev = useCallback(() => {
    if (!canNavigate || isTransitioningRef.current) {
      return;
    }

    if (isFadeMode) {
      beginFadeTransition();
      setIndex((prev) => (prev - 1 + safeSlides.length) % safeSlides.length);
      return;
    }

    isTransitioningRef.current = true;

    if (index === 0) {
      setAnimate(false);
      setIndex(cloneIndex);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(safeSlides.length - 1);
        });
      });
      return;
    }

    setAnimate(true);
    setIndex((prev) => prev - 1);
  }, [beginFadeTransition, canNavigate, cloneIndex, index, isFadeMode, safeSlides.length]);

  useEffect(() => {
    onNavigationReady?.({
      canNavigate,
      goNext,
      goPrev,
    });
  }, [canNavigate, goNext, goPrev, onNavigationReady]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: "80px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const autoplayDelayMs = autoPlayIntervalMs ?? HTML_PROFILE_CAROUSEL_AUTOPLAY_MS;

  useEffect(() => {
    if (isPaused || !canNavigate || !autoPlay || !isVisible || isTransitioning) {
      return;
    }

    const timer = window.setTimeout(() => {
      goNext();
    }, autoplayDelayMs);

    return () => window.clearTimeout(timer);
  }, [isPaused, canNavigate, goNext, logicalIndex, autoPlay, isVisible, autoplayDelayMs, isTransitioning]);

  const handleTransitionEnd = useCallback(
    (event: React.TransitionEvent<HTMLDivElement>) => {
      if (isFadeMode) {
        if (event.propertyName !== "opacity") {
          return;
        }

        if ((event.currentTarget as HTMLElement).getAttribute("aria-hidden") === "true") {
          return;
        }

        completeFadeTransition();
        return;
      }

      if (event.target !== event.currentTarget || event.propertyName !== "transform") {
        return;
      }

      if (index >= cloneIndex) {
        finishLoopReset();
        return;
      }

      isTransitioningRef.current = false;
    },
    [cloneIndex, completeFadeTransition, finishLoopReset, index, isFadeMode],
  );

  useEffect(() => {
    if (isFadeMode) {
      if (!isTransitioning) {
        return;
      }

      const failSafe = window.setTimeout(() => {
        completeFadeTransition();
      }, fadeDurationMs + 250);

      return () => window.clearTimeout(failSafe);
    }

    if (index > cloneIndex) {
      const recoveryTimer = window.setTimeout(() => {
        finishLoopReset();
      }, 0);

      return () => window.clearTimeout(recoveryTimer);
    }

    if (!isTransitioningRef.current) {
      return;
    }

    const failSafe = window.setTimeout(() => {
      if (index >= cloneIndex) {
        finishLoopReset();
        return;
      }

      isTransitioningRef.current = false;
    }, HTML_PROFILE_CAROUSEL_TRANSITION_MS + 250);

    return () => window.clearTimeout(failSafe);
  }, [cloneIndex, completeFadeTransition, fadeDurationMs, finishLoopReset, index, isFadeMode, isTransitioning]);

  const isMobileFrame = previewMode === "mobile-frame";

  const previewFrameClassName = isMobileFrame
    ? cn(
        "w-full min-w-0 overflow-hidden rounded-md border border-border bg-inset/20",
        mobileFrameMinHeightClass,
      )
    : previewMode === "desktop-scaled"
      ? cn(
          "relative min-w-0 overflow-hidden",
          fillHeight
            ? cn(
                "min-h-0 flex-1",
                compactPresentation
                  ? "h-full min-h-[240px] border-0 rounded-none bg-transparent"
                  : "min-h-[320px] rounded-md border border-border bg-[#0a0a0a]",
              )
            : cn(
                "rounded-md border border-border bg-[#0a0a0a]",
                desktopPreviewFit === "cover" && "min-h-0",
              ),
        )
      : "min-h-[320px] flex-1 overflow-hidden rounded-md border border-border bg-black lg:min-h-[480px]";

  return (
    <div
      ref={rootRef}
      className={cn(
        "overflow-hidden rounded-md border border-border bg-inset/30 [overflow-anchor:none]",
        fillHeight && !isMobileFrame ? "flex h-full min-h-0 flex-col" : "min-w-0",
        !isMobileFrame && !fillHeight && "h-full",
        compactPresentation && "border-0 bg-transparent shadow-none",
        className,
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <div
        className={cn(
          "relative min-w-0",
          fillHeight && !isMobileFrame && "flex min-h-0 flex-1 flex-col",
        )}
      >
        {canNavigate && !hideNavigation ? (
          <div
            className={cn(
              "pointer-events-none absolute inset-x-0 top-3 z-20 flex items-center justify-between px-1.5 sm:px-2",
              showSlideMeta ? "bottom-23" : showPagination ? "bottom-14" : "bottom-3",
            )}
          >
            <button
              type="button"
              className={carouselNavButtonClassName}
              aria-label="Previous preview"
              onClick={goPrev}
            >
              <ChevronLeftIcon className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              className={carouselNavButtonClassName}
              aria-label="Next preview"
              onClick={goNext}
            >
              <ChevronRightIcon className="size-5" aria-hidden />
            </button>
          </div>
        ) : null}

        {isFadeMode ? (
          <div
            className={cn(
              "relative min-w-0",
              fillHeight && !isMobileFrame && "h-full min-h-0 flex-1",
              compactPresentation ? "min-h-0 flex-1 pb-11" : "min-h-[240px] p-3",
            )}
          >
            {safeSlides.map((slide, slideIndex) => {
              const isActiveSlide = slideIndex === logicalIndex;
              const loadPreview =
                (compactPresentation || isVisible) &&
                previewLoadIndexes.has(slideIndex) &&
                (!posterFirst || livePreviewEnabled) &&
                isActiveSlide;

              return (
                <article
                  key={slide.name}
                  aria-hidden={!isActiveSlide}
                  className={cn(
                    "absolute inset-0 flex flex-col",
                    compactPresentation ? "pb-0" : "p-0",
                    fillHeight && !isMobileFrame && "h-full min-h-0",
                    isActiveSlide ? "z-10" : "z-0",
                  )}
                  style={{
                    opacity: isActiveSlide ? 1 : 0,
                    transition: `opacity ${fadeDurationMs}ms ease-out`,
                    pointerEvents: isActiveSlide ? "auto" : "none",
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  <div
                    className={cn(
                      previewFrameClassName,
                      fillHeight && !isMobileFrame && "flex h-full min-h-0 flex-col",
                      "relative",
                    )}
                  >
                    {posterFirst && !livePreviewEnabled && isActiveSlide ? (
                      <PreviewPosterPlaceholder
                        title={slide.name}
                        onActivate={() => setLivePreviewEnabled(true)}
                      />
                    ) : (
                      <CarouselPreviewFrame
                        slide={slide}
                        previewMode={previewMode}
                        desktopPreviewFit={desktopPreviewFit}
                        desktopPreviewViewportHeight={desktopPreviewViewportHeight}
                        mobilePreviewMaxHeight={mobilePreviewMaxHeight}
                        mobilePreviewShowViewportLabel={mobilePreviewShowViewportLabel}
                        loadPreview={loadPreview}
                        desktopPreviewVerticalAlign={
                          compactPresentation ? "top" : desktopPreviewVerticalAlign
                        }
                        iframeLoading={compactPresentation ? "eager" : "lazy"}
                        preferPoster={preferPoster}
                        posterFillContainer={posterFillContainer}
                        imagePriority={isActiveSlide}
                      />
                    )}
                  </div>
                  {showSlideMeta ? (
                    <div
                      className={cn(
                        "mt-3 min-h-22 shrink-0 border-t border-border/70 pt-3",
                        fillHeight && !isMobileFrame && "shrink-0",
                      )}
                    >
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
                  ) : null}
                </article>
              );
            })}
          </div>
        ) : (
          <div
            className={cn(
              "flex",
              fillHeight && !isMobileFrame && "h-full min-h-0 flex-1",
              animate && "ease-out",
            )}
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: animate ? `transform ${HTML_PROFILE_CAROUSEL_TRANSITION_MS}ms ease-out` : "none",
              willChange: animate ? "transform" : undefined,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {loopSlides.map((slide, slideIndex) => {
              const slideLogicalIndex = slideIndex >= cloneIndex ? 0 : slideIndex;
              const isActiveSlide = slideLogicalIndex === logicalIndex;
              const loadPreview =
                (compactPresentation || isVisible) &&
                previewLoadIndexes.has(slideLogicalIndex) &&
                (!posterFirst || livePreviewEnabled) &&
                (!compactPresentation || slideIndex === index);

              return (
                <article
                  key={`${slide.name}-${slideIndex}`}
                  className={cn(
                    "flex min-w-full flex-col",
                    compactPresentation ? "h-full min-h-0 flex-1 pb-11" : "p-3",
                    fillHeight && !isMobileFrame && "h-full min-h-0 flex-1",
                  )}
                >
                  <div
                    className={cn(
                      previewFrameClassName,
                      fillHeight && !isMobileFrame && "flex h-full min-h-0 flex-col",
                      "relative",
                    )}
                  >
                    {posterFirst && !livePreviewEnabled && isActiveSlide ? (
                      <PreviewPosterPlaceholder
                        title={slide.name}
                        onActivate={() => setLivePreviewEnabled(true)}
                      />
                    ) : (
                      <CarouselPreviewFrame
                        slide={slide}
                        previewMode={previewMode}
                        desktopPreviewFit={desktopPreviewFit}
                        desktopPreviewViewportHeight={desktopPreviewViewportHeight}
                        mobilePreviewMaxHeight={mobilePreviewMaxHeight}
                        mobilePreviewShowViewportLabel={mobilePreviewShowViewportLabel}
                        loadPreview={loadPreview}
                        desktopPreviewVerticalAlign={
                          compactPresentation ? "top" : desktopPreviewVerticalAlign
                        }
                        iframeLoading={compactPresentation ? "eager" : "lazy"}
                        preferPoster={preferPoster}
                        posterFillContainer={posterFillContainer}
                        imagePriority={isActiveSlide}
                      />
                    )}
                  </div>
                  {showSlideMeta ? (
                    <div className={cn("mt-3 min-h-22 shrink-0 border-t border-border/70 pt-3", fillHeight && !isMobileFrame && "shrink-0")}>
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
                  ) : null}
                </article>
              );
            })}
          </div>
        )}

        {showPagination && canNavigate ? (
          <div className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center gap-2">
            {safeSlides.map((slide, dotIndex) => (
              <button
                key={slide.name}
                type="button"
                className={cn(
                  "size-2 rounded-full transition-colors",
                  dotIndex === logicalIndex ? "bg-primary" : "bg-white/25 hover:bg-white/40",
                )}
                aria-label={`Show preview ${dotIndex + 1}`}
                aria-current={dotIndex === logicalIndex ? "true" : undefined}
                onClick={() => {
                  if (dotIndex === logicalIndex || isTransitioningRef.current) {
                    return;
                  }

                  if (isFadeMode) {
                    beginFadeTransition();
                    setIndex(dotIndex);
                    return;
                  }

                  isTransitioningRef.current = true;
                  setAnimate(true);
                  setIndex(dotIndex);
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
