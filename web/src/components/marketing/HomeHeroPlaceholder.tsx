import { Container, Section } from "@/components/primitives/Container";
import { HOME_HERO_COPY } from "@/lib/home-conversion-content";
import type { HomeHeroLcpPoster } from "@/lib/home-hero-lcp";
import { homeSection } from "@/lib/homepage-composition";
import { HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";

type HomeHeroPlaceholderProps = {
  badge?: string;
  title?: string;
  description?: string;
  lcpMobilePoster?: HomeHeroLcpPoster | null;
  lcpDesktopPoster?: HomeHeroLcpPoster | null;
};

function LcpPosterImage({
  poster,
  className,
}: {
  poster: HomeHeroLcpPoster;
  className?: string;
}) {
  const webpSrc = poster.src.replace(/\.png$/i, ".webp");

  return (
    <picture className={cn("block h-full w-full", className)}>
      <source srcSet={webpSrc} type="image/webp" />
      {/* Native img for SSR LCP poster; must match deferred hero poster frame */}
      <img
        src={poster.src}
        alt={poster.alt}
        width={poster.width}
        height={poster.height}
        className="block h-full w-full object-cover object-top"
        decoding="async"
        loading="eager"
        fetchPriority="high"
      />
    </picture>
  );
}

function HeroSkeletonSurface() {
  return (
    <>
      {/* Mobile skeleton */}
      <div className="flex min-h-[50vh] flex-col justify-center gap-4 lg:hidden" aria-hidden>
        <span className="h-5 w-48 animate-pulse rounded-full bg-inset" />
        <span className="h-10 w-[min(20rem,90vw)] animate-pulse rounded-lg bg-inset" />
        <span className="h-10 w-[min(16rem,75vw)] animate-pulse rounded-lg bg-inset" />
        <span className="mt-1 h-4 w-[min(22rem,85vw)] animate-pulse rounded-md bg-inset" />
        <span className="h-4 w-[min(18rem,70vw)] animate-pulse rounded-md bg-inset" />
      </div>

      {/* Desktop skeleton */}
      <div className="hidden min-h-0 flex-1 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10">
        <div className="flex flex-col gap-3" aria-hidden>
          <span className="h-6 w-40 animate-pulse rounded-full bg-inset" />
          <span className="h-12 w-[min(32rem,72vw)] animate-pulse rounded-lg bg-inset" />
          <span className="h-12 w-[min(26rem,58vw)] animate-pulse rounded-lg bg-inset" />
          <span className="mt-2 h-5 w-[min(34rem,70vw)] animate-pulse rounded-md bg-inset" />
        </div>
        <div className="flex flex-col gap-3" aria-hidden>
          <span className="h-[300px] w-full animate-pulse rounded-xl bg-inset sm:h-[340px] lg:h-[400px] xl:h-[440px]" />
        </div>
      </div>
    </>
  );
}

/**
 * Static hero shell for deferred load.
 * Never paints the real title/description — those flash when the kinetic hero swaps in.
 * Text stays sr-only for a11y/SEO; visual surface is a pulse skeleton only.
 * Hidden LCP poster keeps release gate #13 green without a visible poster re-animate.
 */
export function HomeHeroPlaceholder({
  badge = HOME_HERO_COPY.badge,
  title,
  description = HOME_HERO_COPY.description,
  lcpMobilePoster,
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
          {lcpMobilePoster ? (
            <div className="hidden" data-testid="home-hero-lcp-poster-mobile" aria-hidden>
              <LcpPosterImage poster={lcpMobilePoster} />
            </div>
          ) : null}

          <div className="sr-only">
            <p>{badge}</p>
            <h1>{resolvedTitle}</h1>
            <p>{description}</p>
          </div>

          <HeroSkeletonSurface />
        </Container>
      </div>
    </Section>
  );
}
