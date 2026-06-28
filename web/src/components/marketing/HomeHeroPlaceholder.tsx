import { Container, Section } from "@/components/primitives/Container";
import { HOME_HERO_COPY } from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import { HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";

type HomeHeroPlaceholderProps = {
  badge?: string;
  title?: string;
  description?: string;
};

/** Static hero shell for deferred load — keeps `.hero-section` visible for release gates. */
export function HomeHeroPlaceholder({
  badge = HOME_HERO_COPY.badge,
  title,
  description = HOME_HERO_COPY.description,
}: HomeHeroPlaceholderProps) {
  const resolvedTitle = title ?? HOME_HERO_COPY.titleLines.join(" ");

  return (
    <Section
      {...homeSection("hero")}
      layout="viewport"
      className="hero-section hero-section--responsive-band hero-section--under-chrome home-hero-desktop-section relative flex min-h-0 flex-col overflow-hidden lg:min-h-dvh"
      aria-busy="true"
    >
      <div className="hero-section__motion-host relative min-h-0 flex flex-1 flex-col">
        <Container
          className={cn(
            HERO_VIEWPORT_CONTAINER_CLASS,
            "hero-section__content relative flex flex-1 flex-col",
            "justify-start py-0 lg:justify-center lg:py-12",
            "pt-0 lg:pt-[calc(var(--site-chrome-height)+3rem)]",
          )}
        >
          <div className="flex min-h-[50vh] flex-col justify-center gap-4 lg:min-h-0">
            <p className="text-sm font-medium text-primary">{badge}</p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {resolvedTitle}
            </h1>
            <p className="max-w-xl text-pretty text-base text-muted sm:text-lg">{description}</p>
          </div>
        </Container>
      </div>
    </Section>
  );
}
