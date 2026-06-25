import { HomeHeroDesktop } from "@/components/marketing/HomeHeroDesktop";
import { HomeHeroMobile } from "@/components/marketing/HomeHeroMobile";
import { HomeHeroViewportGate } from "@/components/marketing/HomeHeroViewportGate";
import { Container, Section } from "@/components/primitives/Container";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import { HOME_HERO_COPY } from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import { HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";

type HomeHeroProps = {
  badge?: string;
  title?: string;
  description?: string;
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
};

export function HomeHero({
  badge = HOME_HERO_COPY.badge,
  title,
  description = HOME_HERO_COPY.description,
  slides,
  emptyFallbackSlide,
}: HomeHeroProps) {
  const sharedProps = {
    badge,
    title,
    description,
    slides,
    emptyFallbackSlide,
  };

  return (
    <Section
      {...homeSection("hero")}
      layout="viewport"
      className="hero-section hero-section--responsive-band home-hero-desktop-section relative min-h-0 overflow-hidden lg:min-h-[calc(100dvh-var(--site-chrome-height))]"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 lg:opacity-20" aria-hidden />
      <div
        className="hero-glow signal-drift-1 pointer-events-none absolute left-[8%] top-12 hidden h-56 w-56 rounded-full bg-primary/20 blur-3xl lg:block"
        aria-hidden
      />
      <div
        className="hero-glow signal-drift-2 pointer-events-none absolute bottom-10 right-[10%] hidden h-44 w-44 rounded-full bg-primary/10 blur-3xl lg:block"
        aria-hidden
      />

      <Container
        className={cn(
          HERO_VIEWPORT_CONTAINER_CLASS,
          "flex flex-1 flex-col justify-center py-6 sm:py-8 lg:py-12",
        )}
      >
        <HomeHeroViewportGate
          mobile={<HomeHeroMobile {...sharedProps} />}
          desktop={<HomeHeroDesktop {...sharedProps} />}
        />
      </Container>
    </Section>
  );
}
