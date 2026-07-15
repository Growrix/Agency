import type { HomeHeroLcpPoster } from "@/lib/home-hero-lcp";

type HomeHeroLcpHintsProps = {
  mobilePoster: HomeHeroLcpPoster | null;
  desktopPoster: HomeHeroLcpPoster | null;
};

/** Preload links hoisted to document head by Next.js App Router. */
export function HomeHeroLcpHints({ mobilePoster, desktopPoster }: HomeHeroLcpHintsProps) {
  return (
    <>
      {mobilePoster ? (
        <link
          rel="preload"
          as="image"
          href={mobilePoster.src}
          fetchPriority="high"
          media="(max-width: 1023px)"
        />
      ) : null}
      {desktopPoster ? (
        <link
          rel="preload"
          as="image"
          href={desktopPoster.src}
          fetchPriority="high"
          media="(min-width: 1024px)"
        />
      ) : null}
    </>
  );
}
