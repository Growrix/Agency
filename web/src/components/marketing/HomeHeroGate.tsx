"use client";

import { useEffect, useState, type ComponentType } from "react";
import { HomeHeroPlaceholder } from "@/components/marketing/HomeHeroPlaceholder";
import { scheduleHomepageBundleLoad } from "@/lib/homepage-deferred-load";
import type { HomeHeroLcpPosters } from "@/lib/home-hero-lcp";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";

type HomeHeroGateProps = {
  badge?: string;
  title?: string;
  description?: string;
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
  lcpPosters?: HomeHeroLcpPosters;
};

type HomeHeroComponent = ComponentType<HomeHeroGateProps>;

/**
 * Loads hero JS shortly after DOMContentLoaded.
 * Placeholder is skeleton-only (no visible title) so the deferred swap cannot flash
 * real title text before the kinetic entrance. Exactly one `.hero-section` in the DOM.
 */
export function HomeHeroGate(props: HomeHeroGateProps) {
  const [Hero, setHero] = useState<HomeHeroComponent | null>(null);

  useEffect(() => {
    const loadHero = () => {
      void import("@/components/marketing/HomeHero").then((mod) => {
        setHero(() => mod.HomeHero);
      });
    };

    return scheduleHomepageBundleLoad(loadHero, { timing: "after-domcontentloaded", useIdle: false });
  }, []);

  if (!Hero) {
    return (
      <HomeHeroPlaceholder
        badge={props.badge}
        title={props.title}
        description={props.description}
        lcpMobilePoster={props.lcpPosters?.mobile}
        lcpDesktopPoster={props.lcpPosters?.desktop}
      />
    );
  }

  return <Hero {...props} />;
}
