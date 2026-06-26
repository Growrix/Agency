import { HomeHeroMotionShell } from "@/components/marketing/HomeHeroMotionShell";
import { Section } from "@/components/primitives/Container";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import { homeSection } from "@/lib/homepage-composition";

type HomeHeroProps = {
  badge?: string;
  title?: string;
  description?: string;
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
};

export function HomeHero({
  badge,
  title,
  description,
  slides,
  emptyFallbackSlide,
}: HomeHeroProps) {
  return (
    <Section
      {...homeSection("hero")}
      layout="viewport"
      className="hero-section hero-section--responsive-band hero-section--under-chrome home-hero-desktop-section relative flex min-h-0 flex-col overflow-hidden lg:min-h-dvh"
    >
      <HomeHeroMotionShell
        badge={badge}
        title={title}
        description={description}
        slides={slides}
        emptyFallbackSlide={emptyFallbackSlide}
      />
    </Section>
  );
}
