"use client";

import { useMemo, useState } from "react";
import { HomeHeroDesktopMonitorFrame } from "@/components/marketing/HomeHeroDesktopMonitorFrame";
import {
  HtmlProfileHeroCarousel,
  type HtmlProfileHeroSlide,
} from "@/components/sections/HtmlProfileHeroCarousel";
import { WebsiteTemplateHtmlMobilePreviewFrame } from "@/components/shop/WebsiteTemplateHtmlMobilePreviewFrame";
import { HOME_HERO_SHOWCASE_AUTOPLAY_MS } from "@/lib/html-profile-carousel-config";
import { cn } from "@/lib/utils";

const HERO_SHOWCASE_SLIDE_LIMIT = 4;

const HERO_MONITOR_SCREEN_HEIGHT =
  "h-[300px] sm:h-[340px] lg:h-[400px] xl:h-[440px]";

type HomeHeroShowcaseProps = {
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
  className?: string;
};

export function HomeHeroShowcase({ slides, emptyFallbackSlide, className }: HomeHeroShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const showcaseSlides = useMemo(() => slides.slice(0, HERO_SHOWCASE_SLIDE_LIMIT), [slides]);

  const activeSlide = showcaseSlides[activeIndex] ?? emptyFallbackSlide ?? showcaseSlides[0];

  return (
    <div className={cn("relative w-full min-w-0", className)}>
      <div className="signal-spring-in relative" style={{ animationDelay: "220ms" }}>
        <HomeHeroDesktopMonitorFrame screenClassName={HERO_MONITOR_SCREEN_HEIGHT}>
          <HtmlProfileHeroCarousel
            slides={showcaseSlides}
            emptyFallbackSlide={emptyFallbackSlide}
            previewMode="desktop-scaled"
            desktopPreviewFit="width"
            fillHeight
            compactPresentation
            autoPlay
            autoPlayIntervalMs={HOME_HERO_SHOWCASE_AUTOPLAY_MS}
            showSlideMeta={false}
            showPagination
            onActiveIndexChange={setActiveIndex}
            className={cn("h-full border-0 bg-transparent", HERO_MONITOR_SCREEN_HEIGHT)}
          />
        </HomeHeroDesktopMonitorFrame>

        {activeSlide?.previewUrl ? (
          <div
            className="pointer-events-none absolute -bottom-2 right-0 z-30 hidden w-[34%] max-w-[176px] drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)] lg:block xl:-right-4"
            aria-hidden
          >
            <WebsiteTemplateHtmlMobilePreviewFrame
              previewUrl={activeSlide.previewUrl}
              title={`${activeSlide.name} mobile preview`}
              maxFrameHeight={280}
              className="w-full max-w-full"
              iframeLoading="lazy"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
