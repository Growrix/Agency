"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { brandConfig } from "@/data/brand";
import { heroSlides } from "@/data/home";
import { fetchHomePageSurface } from "@/lib/foundation/client";
import { useUtility } from "@/state/UtilityContext";

const autoRotateDelayMs = 6500;

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

export default function HeroSection() {
  const { t } = useUtility();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [homeShellHero, setHomeShellHero] = useState<{ title: string; body: string } | null>(null);
  const totalSlides = heroSlides.length;
  const activeSlide = heroSlides[activeIndex];

  useEffect(() => {
    if (isPaused || totalSlides < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % totalSlides);
    }, autoRotateDelayMs);

    return () => window.clearInterval(timer);
  }, [isPaused, totalSlides]);

  useEffect(() => {
    let mounted = true;

    fetchHomePageSurface()
      .then((surface) => {
        if (!mounted) return;

        const heroSection = surface.payload.sections.find((section) => section.kind === "hero");

        if (!heroSection) return;

        setHomeShellHero({
          title: heroSection.title,
          body: heroSection.body,
        });
      })
      .catch(() => {
        if (!mounted) return;
        setHomeShellHero(null);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const slideCopy = useMemo(
    () => ({
      eyebrow: t(activeSlide.eyebrowKey, { siteName: brandConfig.siteName }),
      titleTop: t(activeSlide.titleTopKey),
      titleBottom: t(activeSlide.titleBottomKey),
      description: t(activeSlide.descriptionKey),
      ctaLabel: t(activeSlide.ctaLabelKey),
    }),
    [activeSlide, t],
  );
  const resolvedEyebrow = homeShellHero?.title ?? slideCopy.eyebrow;
  const resolvedDescription = homeShellHero?.body ?? slideCopy.description;

  const goToPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + totalSlides) % totalSlides);
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % totalSlides);
  };

  return (
    <section
      className="relative overflow-hidden bg-[#0d0d0d] text-white"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative min-h-135 lg:min-h-155">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.backgroundImage}
            aria-hidden={index !== activeIndex}
            className={`absolute inset-0 transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <Image
              src={slide.backgroundImage}
              alt="Automotive hero"
              fill
              priority={index === 0}
              sizes="100vw"
              className={`object-cover object-center transition-transform duration-1800 ${index === activeIndex ? "scale-100" : "scale-105"}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/45 to-black/65" />
        <div className="absolute inset-x-0 top-0 hidden h-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)] lg:block" />

        <button
          type="button"
          aria-label={t("home.prevSlide")}
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#222] shadow-lg transition-colors hover:bg-[#ff3434] hover:text-white lg:left-6"
        >
          <ArrowIcon direction="left" />
        </button>

        <button
          type="button"
          aria-label={t("home.nextSlide")}
          onClick={goToNext}
          className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#222] shadow-lg transition-colors hover:bg-[#ff3434] hover:text-white lg:right-6"
        >
          <ArrowIcon direction="right" />
        </button>

        <div className="relative mx-auto flex min-h-135 max-w-7xl items-center justify-center px-4 text-center sm:px-6 lg:min-h-155 lg:px-10">
          <div key={activeSlide.backgroundImage} className="max-w-4xl animate-fade-in-up">
            <p className="mb-4 text-[16px] font-semibold uppercase tracking-[0.35em] text-white/90">{resolvedEyebrow}</p>
            <p className="mb-3 text-[28px] font-black italic text-[#ff4949] sm:text-[34px]">{slideCopy.titleTop}</p>
            <h1 className="text-[42px] font-black uppercase leading-[0.95] tracking-tight sm:text-[58px] lg:text-[76px]">
              {slideCopy.titleBottom}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-white/80 sm:text-[16px]">{resolvedDescription}</p>
            <Link
              href={activeSlide.ctaHref}
              className="mt-8 inline-flex min-w-48 justify-center rounded-full border border-white bg-white px-8 py-3 text-[13px] font-bold uppercase tracking-[0.2em] text-black shadow-[0_10px_25px_rgba(0,0,0,0.25)] transition-colors duration-300 hover:border-[#ff3434] hover:bg-[#ff3434] hover:text-white motion-lift"
            >
              {slideCopy.ctaLabel}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {heroSlides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${slide.backgroundImage}-${index}`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${isActive ? "w-10 bg-[#ff3434]" : "w-2.5 bg-white/70 hover:bg-white"}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
