import type { ComponentPropsWithoutRef } from "react";
import type { HomeHeroLcpPoster } from "@/lib/home-hero-lcp";

type HomeHeroLcpHintsProps = {
  mobilePoster: HomeHeroLcpPoster | null;
  desktopPoster: HomeHeroLcpPoster | null;
};

type ImagePreloadProps = ComponentPropsWithoutRef<"link"> & {
  imageSrcSet?: string;
  imageSizes?: string;
  fetchPriority?: "high" | "low" | "auto";
};

function posterWebpSrc(src: string) {
  return src.replace(/\.png$/i, ".webp");
}

function LcpPreloadLink(props: ImagePreloadProps) {
  return <link {...props} />;
}

/** Preload links hoisted to document head by Next.js App Router. */
export function HomeHeroLcpHints({ mobilePoster, desktopPoster }: HomeHeroLcpHintsProps) {
  return (
    <>
      {mobilePoster ? (
        <LcpPreloadLink
          rel="preload"
          as="image"
          href={posterWebpSrc(mobilePoster.src)}
          type="image/webp"
          imageSrcSet={`${posterWebpSrc(mobilePoster.src)} ${mobilePoster.width}w`}
          imageSizes="(max-width: 767px) 100vw, 390px"
          fetchPriority="high"
          media="(max-width: 767px)"
        />
      ) : null}
      {desktopPoster ? (
        <LcpPreloadLink
          rel="preload"
          as="image"
          href={posterWebpSrc(desktopPoster.src)}
          type="image/webp"
          imageSrcSet={`${posterWebpSrc(desktopPoster.src)} ${desktopPoster.width}w`}
          imageSizes="(min-width: 768px) min(55vw, 720px)"
          fetchPriority="high"
          media="(min-width: 768px)"
        />
      ) : null}
    </>
  );
}
