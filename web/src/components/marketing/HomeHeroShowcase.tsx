"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useCallback, useMemo, useState, type CSSProperties } from "react";
import { HomeHeroDesktopMonitorFrame } from "@/components/marketing/HomeHeroDesktopMonitorFrame";
import {
  carouselNavButtonClassName,
  HtmlProfileHeroCarousel,
  type HtmlProfileHeroCarouselNavigation,
  type HtmlProfileHeroSlide,
} from "@/components/sections/HtmlProfileHeroCarousel";
import { WebsiteTemplateHtmlDesktopPreviewFrame } from "@/components/shop/WebsiteTemplateHtmlDesktopPreviewFrame";
import { WebsiteTemplateHtmlMobilePreviewFrame } from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";
import { useDeferredPreview } from "@/components/shop/useDeferredPreview";
import { HOME_HERO_SHOWCASE_AUTOPLAY_MS, HOME_HERO_SHOWCASE_FADE_MS } from "@/lib/html-profile-carousel-config";
import {
  HTML_MOBILE_VIEWPORT_HEIGHT,
  HTML_MOBILE_VIEWPORT_WIDTH,
} from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";
import { cn } from "@/lib/utils";

const HERO_SHOWCASE_SLIDE_LIMIT = 4;

const HERO_MONITOR_SCREEN_HEIGHT_DESKTOP =
  "h-[300px] sm:h-[340px] lg:h-[400px] xl:h-[440px]";

const HERO_MONITOR_SCREEN_HEIGHT_MOBILE = "home-hero-mobile__showcase-monitor";

type HomeHeroShowcaseLayout = "desktop" | "mobile";

type HomeHeroShowcaseProps = {
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
  layout?: HomeHeroShowcaseLayout;
  className?: string;
};

export function HomeHeroShowcase({
  slides,
  emptyFallbackSlide,
  layout = "desktop",
  className,
}: HomeHeroShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [navigation, setNavigation] = useState<HtmlProfileHeroCarouselNavigation | null>(null);
  const { ref: phoneOverlayRef, shouldRender: shouldRenderPhoneOverlay } =
    useDeferredPreview<HTMLDivElement>();
  const isMobileLayout = layout === "mobile";
  const showExternalNavigation = !isMobileLayout && navigation?.canNavigate;

  const showcaseSlides = useMemo(() => slides.slice(0, HERO_SHOWCASE_SLIDE_LIMIT), [slides]);

  const activeSlide = showcaseSlides[activeIndex] ?? emptyFallbackSlide ?? showcaseSlides[0];

  const monitorHeightClass = isMobileLayout
    ? HERO_MONITOR_SCREEN_HEIGHT_MOBILE
    : HERO_MONITOR_SCREEN_HEIGHT_DESKTOP;

  const handleNavigationReady = useCallback((api: HtmlProfileHeroCarouselNavigation) => {
    setNavigation(api);
  }, []);

  const mobilePhoneOverlay =
    activeSlide?.previewUrl && isMobileLayout && shouldRenderPhoneOverlay ? (
      <div className="home-hero-mobile__phone-overlay" aria-hidden>
        <div className="home-hero-mobile__phone-bezel">
          <span className="home-hero-mobile__phone-notch" aria-hidden />
          <div className="home-hero-mobile__phone-screen">
            <div
              key={`${activeSlide.name}-${activeIndex}`}
              className="home-hero-mobile__phone-screen-inner"
            >
              <WebsiteTemplateHtmlDesktopPreviewFrame
                previewUrl={activeSlide.previewUrl}
                title={`${activeSlide.name} mobile preview`}
                viewportWidth={HTML_MOBILE_VIEWPORT_WIDTH}
                viewportHeight={HTML_MOBILE_VIEWPORT_HEIGHT}
                fit="cover"
                verticalAlign="top"
                className="h-full w-full"
                frameClassName="h-full w-full rounded-none border-0 bg-white"
                iframeLoading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div
      ref={phoneOverlayRef}
      className={cn("relative w-full min-w-0", className)}
      style={{ "--home-hero-showcase-fade-ms": `${HOME_HERO_SHOWCASE_FADE_MS}ms` } as CSSProperties}
    >
      <div className="signal-spring-in home-hero-showcase__stage" style={{ animationDelay: "220ms" }}>
        <div
          className={cn(
            "home-hero-showcase__frame-row",
            isMobileLayout && "home-hero-showcase__frame-row--mobile",
          )}
        >
          {showExternalNavigation ? (
            <button
              type="button"
              className={cn(carouselNavButtonClassName, "home-hero-showcase__nav")}
              aria-label="Previous preview"
              onClick={navigation.goPrev}
            >
              <ChevronLeftIcon className="size-5" aria-hidden />
            </button>
          ) : !isMobileLayout ? (
            <span className="home-hero-showcase__nav-spacer" aria-hidden />
          ) : null}

          <div className="home-hero-showcase__monitor relative min-w-0 flex-1">
            <HomeHeroDesktopMonitorFrame screenClassName={monitorHeightClass}>
              <HtmlProfileHeroCarousel
                slides={showcaseSlides}
                emptyFallbackSlide={emptyFallbackSlide}
                previewMode="desktop-scaled"
                desktopPreviewFit="width"
                fillHeight
                compactPresentation
                autoPlay
                autoPlayIntervalMs={HOME_HERO_SHOWCASE_AUTOPLAY_MS}
                transitionMode="fade"
                transitionDurationMs={HOME_HERO_SHOWCASE_FADE_MS}
                hideNavigation
                onNavigationReady={handleNavigationReady}
                showSlideMeta={false}
                showPagination
                onActiveIndexChange={setActiveIndex}
                className={cn("h-full border-0 bg-transparent", monitorHeightClass)}
              />
            </HomeHeroDesktopMonitorFrame>

            {mobilePhoneOverlay}

            {activeSlide?.previewUrl && !isMobileLayout && shouldRenderPhoneOverlay ? (
              <div
                className="pointer-events-none absolute -bottom-2 right-0 z-30 hidden w-[34%] max-w-[176px] drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)] lg:block xl:-right-4"
                aria-hidden
              >
                <div
                  key={`${activeSlide.name}-${activeIndex}`}
                  className="home-hero-showcase__phone-fade w-full"
                >
                  <WebsiteTemplateHtmlMobilePreviewFrame
                    previewUrl={activeSlide.previewUrl}
                    title={`${activeSlide.name} mobile preview`}
                    maxFrameHeight={280}
                    showViewportLabel={false}
                    className="w-full max-w-full"
                    iframeLoading="lazy"
                  />
                </div>
              </div>
            ) : null}
          </div>

          {showExternalNavigation ? (
            <button
              type="button"
              className={cn(carouselNavButtonClassName, "home-hero-showcase__nav")}
              aria-label="Next preview"
              onClick={navigation.goNext}
            >
              <ChevronRightIcon className="size-5" aria-hidden />
            </button>
          ) : !isMobileLayout ? (
            <span className="home-hero-showcase__nav-spacer" aria-hidden />
          ) : null}
        </div>
      </div>
    </div>
  );
}
