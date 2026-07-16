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

const skipEntrance = true;

type HomeHeroComponent = ComponentType<HomeHeroGateProps & { skipEntrance?: boolean }>;

/**
 * Loads hero JS shortly after DOMContentLoaded so the static placeholder is replaced faster,
 * while still avoiding eager script fetch during initial HTML parse.
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

  return <Hero {...props} skipEntrance={skipEntrance} />;
}
