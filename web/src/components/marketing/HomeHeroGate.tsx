"use client";

import { useEffect, useState, type ComponentType } from "react";
import { HomeHeroPlaceholder } from "@/components/marketing/HomeHeroPlaceholder";
import { scheduleHomepageBundleLoad } from "@/lib/homepage-deferred-load";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";

type HomeHeroGateProps = {
  badge?: string;
  title?: string;
  description?: string;
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
};

type HomeHeroComponent = ComponentType<HomeHeroGateProps>;

/** Defers hero JS, motion, and poster assets until after window load (domcontentloaded resource budget). */
export function HomeHeroGate(props: HomeHeroGateProps) {
  const [Hero, setHero] = useState<HomeHeroComponent | null>(null);

  useEffect(() => {
    const loadHero = () => {
      void import("@/components/marketing/HomeHero").then((mod) => {
        setHero(() => mod.HomeHero);
      });
    };

    return scheduleHomepageBundleLoad(loadHero);
  }, []);

  if (!Hero) {
    return (
      <HomeHeroPlaceholder badge={props.badge} title={props.title} description={props.description} />
    );
  }

  return <Hero {...props} />;
}
