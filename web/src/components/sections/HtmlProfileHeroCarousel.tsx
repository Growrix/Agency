"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export type HtmlProfileHeroSlide = {
  name: string;
  type: string;
  price: string;
  href: string;
  previewUrl?: string;
  previewImage?: {
    src: string;
    alt: string;
  } | null;
};

type HtmlProfileHeroCarouselProps = {
  slides: HtmlProfileHeroSlide[];
  ctaLabel?: string;
  emptyFallbackSlide?: HtmlProfileHeroSlide;
};

export function HtmlProfileHeroCarousel({ slides, ctaLabel = "View Profile", emptyFallbackSlide }: HtmlProfileHeroCarouselProps) {
  const fallbackSlide = useMemo(
    () => emptyFallbackSlide ?? {
      name: "Business Profile Template",
      type: "Category Template",
      price: "$19",
      href: "/products/category/html-business-profiles",
    },
    [emptyFallbackSlide],
  );
  const safeSlides = useMemo(
    () => (slides.length > 0
      ? slides
      : [fallbackSlide]),
    [fallbackSlide, slides],
  );
  const loopSlides = useMemo(() => [...safeSlides, safeSlides[0]], [safeSlides]);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAnimate(true);
      setIndex((prev) => prev + 1);
    }, 2000);

    return () => window.clearInterval(timer);
  }, []);

  const handleTransitionEnd = () => {
    if (index === safeSlides.length) {
      setAnimate(false);
      setIndex(0);
    }
  };

  return (
    <div className="h-full overflow-hidden rounded-md border border-border bg-inset/30">
      <div
        className={`flex h-full ${animate ? "transition-transform duration-500 ease-out" : ""}`}
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {loopSlides.map((slide, slideIndex) => (
          <article key={`${slide.name}-${slideIndex}`} className="flex min-w-full flex-col p-3">
            <div className="min-h-[320px] flex-1 overflow-hidden rounded-md border border-border bg-black lg:min-h-[480px]">
              {slide.previewUrl ? (
                <iframe
                  src={slide.previewUrl}
                  title={`${slide.name} preview`}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : slide.previewImage ? (
                <div className="relative h-full w-full bg-surface">
                  <Image
                    src={slide.previewImage.src}
                    alt={slide.previewImage.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-contain object-top"
                  />
                </div>
              ) : (
                <div className="flex h-full items-center justify-center px-4 text-center text-sm text-white/70">
                  Preview unavailable
                </div>
              )}
            </div>
            <div className="mt-3">
              <p className="line-clamp-1 text-sm font-semibold text-text">{slide.name}</p>
              <p className="mt-1 text-xs text-text-muted">{slide.type}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-primary">From {slide.price}</span>
                <Link href={slide.href} className="text-xs font-medium text-primary hover:underline">
                  {ctaLabel}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
