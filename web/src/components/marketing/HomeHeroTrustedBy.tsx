"use client";

import { HOME_HERO_COPY, HOME_HERO_TRUSTED_NAMES } from "@/lib/home-conversion-content";
import { HomeHeroTrustNameMotion } from "@/components/marketing/hero-motion/HomeHeroTrustMotion";
import { cn } from "@/lib/utils";

type HomeHeroTrustedByProps = {
  className?: string;
  variant?: "desktop" | "mobile";
  animated?: boolean;
};

export function HomeHeroTrustedBy({ className, variant = "desktop", animated = false }: HomeHeroTrustedByProps) {
  const isMobile = variant === "mobile";

  return (
    <div className={cn(className)}>
      {isMobile ? (
        <div className="home-hero-mobile__trust-row">
          <span className="home-hero-mobile__trust-divider" aria-hidden />
          <p className="home-hero-mobile__trust-label">{HOME_HERO_COPY.trustedByLabel}</p>
          <span className="home-hero-mobile__trust-divider" aria-hidden />
        </div>
      ) : (
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
          {HOME_HERO_COPY.trustedByLabel}
        </p>
      )}
      <ul
        className={cn(
          "flex flex-wrap items-center gap-x-5 gap-y-2",
          isMobile ? "home-hero-mobile__trust-names mt-3 justify-center" : "mt-4 sm:gap-x-7",
        )}
        aria-label={HOME_HERO_COPY.trustedByLabel}
      >
        {HOME_HERO_TRUSTED_NAMES.map((name, index) =>
          animated ? (
            <HomeHeroTrustNameMotion
              key={name}
              name={name}
              index={index}
              className={cn(
                "font-semibold tracking-wide text-text-muted",
                isMobile ? "home-hero-mobile__trust-name" : "text-sm",
              )}
            />
          ) : (
            <li
              key={name}
              className={cn(
                "font-semibold tracking-wide text-text-muted",
                isMobile ? "home-hero-mobile__trust-name" : "text-sm",
              )}
            >
              {name}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
