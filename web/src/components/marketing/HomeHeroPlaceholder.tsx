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

/** Static hero shell for deferred load — keeps `.hero-section` visible for release gates. */
export function HomeHeroPlaceholder({
  badge = HOME_HERO_COPY.badge,
  title,
  description = HOME_HERO_COPY.description,
  lcpMobilePoster,
  lcpDesktopPoster,
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
          <div className="home-hero-mobile w-full lg:hidden">
            <div className="flex min-h-[50vh] flex-col justify-center gap-4">
              <p className="text-sm font-medium text-primary">{badge}</p>
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {resolvedTitle}
              </h1>
              <p className="max-w-xl text-pretty text-base text-muted sm:text-lg">{description}</p>
            </div>
            {lcpMobilePoster ? (
              <section
                className="home-hero-mobile__stage mt-6"
                aria-label="Live template preview"
                data-testid="home-hero-lcp-poster-mobile"
              >
                <div
                  className="home-hero-mobile__showcase-monitor relative mx-auto w-full max-w-[min(100%,390px)] overflow-hidden rounded-xl border border-border bg-inset"
                  style={{ aspectRatio: `${lcpMobilePoster.width} / ${lcpMobilePoster.height}` }}
                >
                  <LcpPosterImage poster={lcpMobilePoster} />
                </div>
              </section>
            ) : null}
          </div>

          <div className="hidden min-h-0 flex-1 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-10">
            <div className="flex flex-col gap-4 lg:sr-only">
              <p className="text-sm font-medium text-primary">{badge}</p>
              <h1 className="text-balance text-5xl font-semibold tracking-tight">{resolvedTitle}</h1>
              <p className="max-w-xl text-pretty text-lg text-muted">{description}</p>
            </div>
            {lcpDesktopPoster ? (
              <div
                className="relative h-[300px] overflow-hidden rounded-xl border border-border bg-inset sm:h-[340px] lg:h-[400px] xl:h-[440px]"
                data-testid="home-hero-lcp-poster-desktop"
              >
                <LcpPosterImage poster={lcpDesktopPoster} />
              </div>
            ) : (
              <div className="hidden flex-col gap-3 lg:flex" aria-hidden>
                <span className="h-6 w-40 animate-pulse rounded-full bg-inset" />
                <span className="h-12 w-[min(32rem,72vw)] animate-pulse rounded-lg bg-inset" />
              </div>
            )}
          </div>
        </Container>
      </div>
    </Section>
  );
}
