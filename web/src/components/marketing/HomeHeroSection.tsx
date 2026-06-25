"use client";

import { HomeHeroDesktop } from "@/components/marketing/HomeHeroDesktop";
import { HomeHeroMobile } from "@/components/marketing/HomeHeroMobile";
import { HomeHeroViewportGate } from "@/components/marketing/HomeHeroViewportGate";
import { HomeHeroMotionRoot } from "@/components/marketing/hero-motion/HomeHeroMotionRoot";
import { Container, Section } from "@/components/primitives/Container";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import { HOME_HERO_COPY } from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import { HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { useRef } from "react";

type HomeHeroSectionProps = {
  badge?: string;
  title?: string;
  description?: string;
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
};

export function HomeHeroSection({
  badge = HOME_HERO_COPY.badge,
  title,
  description = HOME_HERO_COPY.description,
  slides,
  emptyFallbackSlide,
}: HomeHeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const sharedProps = {
    badge,
    title,
    description,
    slides,
    emptyFallbackSlide,
  };

  return (
    <Section
      ref={sectionRef}
      {...homeSection("hero")}
      layout="viewport"
      className="hero-section hero-section--responsive-band home-hero-desktop-section relative min-h-0 overflow-hidden lg:min-h-[calc(100dvh-var(--site-chrome-height))]"
    >
      <HomeHeroMotionRoot sectionRef={sectionRef}>
        <Container
          className={cn(
            HERO_VIEWPORT_CONTAINER_CLASS,
            "hero-section__content relative flex flex-1 flex-col justify-center py-6 sm:py-8 lg:py-12",
          )}
        >
          <HomeHeroViewportGate
            mobile={<HomeHeroMobile {...sharedProps} />}
            desktop={<HomeHeroDesktop {...sharedProps} />}
          />
        </Container>
      </HomeHeroMotionRoot>
    </Section>
  );
}
