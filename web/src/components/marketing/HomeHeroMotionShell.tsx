"use client";

import { useRef } from "react";
import { HomeHeroDesktop } from "@/components/marketing/HomeHeroDesktop";
import { HomeHeroMobile } from "@/components/marketing/HomeHeroMobile";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { HomeHeroMotionRoot } from "@/components/marketing/hero-motion/HomeHeroMotionRoot";
import { Container } from "@/components/primitives/Container";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import { HOME_HERO_COPY } from "@/lib/home-conversion-content";
import { HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";

type HomeHeroMotionShellProps = {
  badge?: string;
  title?: string;
  description?: string;
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
};

export function HomeHeroMotionShell({
  badge = HOME_HERO_COPY.badge,
  title,
  description = HOME_HERO_COPY.description,
  slides,
  emptyFallbackSlide,
}: HomeHeroMotionShellProps) {
  const motionHostRef = useRef<HTMLDivElement>(null);
  const sharedProps = {
    badge,
    title,
    description,
    slides,
    emptyFallbackSlide,
  };

  return (
    <div ref={motionHostRef} className="hero-section__motion-host relative min-h-0 flex flex-1 flex-col">
      <HomeHeroMotionRoot sectionRef={motionHostRef}>
        <Container
          className={cn(
            HERO_VIEWPORT_CONTAINER_CLASS,
            "hero-section__content relative flex flex-1 flex-col",
            "justify-start py-0 lg:justify-center lg:py-12",
            "pt-0 lg:pt-[calc(var(--site-chrome-height)+3rem)]",
          )}
        >
          <MarketingViewportGate
            mobile={<HomeHeroMobile {...sharedProps} />}
            desktop={<HomeHeroDesktop {...sharedProps} />}
          />
        </Container>
      </HomeHeroMotionRoot>
    </div>
  );
}
