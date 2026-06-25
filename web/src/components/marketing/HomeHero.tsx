import { HomeHeroSection } from "@/components/marketing/HomeHeroSection";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";

type HomeHeroProps = {
  badge?: string;
  title?: string;
  description?: string;
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
};

export function HomeHero(props: HomeHeroProps) {
  return <HomeHeroSection {...props} />;
}
