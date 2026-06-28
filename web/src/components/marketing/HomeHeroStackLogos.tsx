"use client";

import { HomeHeroTrustLogoMotion } from "@/components/marketing/hero-motion/HomeHeroTrustMotion";
import { HOME_HERO_STACK_LOGOS, HOME_HERO_TECH_STACK } from "@/lib/home-conversion-content";
import { cn } from "@/lib/utils";

type HomeHeroStackLogosProps = {
  animated?: boolean;
  className?: string;
  variant?: "desktop" | "mobile";
};

export function HomeHeroStackLogos({
  animated = false,
  className,
  variant = "desktop",
}: HomeHeroStackLogosProps) {
  const isMobile = variant === "mobile";

  return (
    <ul className={cn("home-hero-stack-logos", className)} aria-label={HOME_HERO_TECH_STACK.label}>
      {HOME_HERO_STACK_LOGOS.map((logo, index) => {
        const image = (
          // eslint-disable-next-line @next/next/no-img-element -- static SVG brand marks; native img avoids optimizer quirks
          <img
            src={logo.src}
            alt={logo.name}
            width={logo.width}
            height={logo.height}
            className={cn(
              "home-hero-stack-logos__image",
              isMobile && "home-hero-stack-logos__image--mobile",
            )}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        );

        if (animated) {
          return (
            <HomeHeroTrustLogoMotion key={logo.name} index={index} className="home-hero-stack-logos__item">
              {image}
            </HomeHeroTrustLogoMotion>
          );
        }

        return (
          <li key={logo.name} className="home-hero-stack-logos__item">
            {image}
          </li>
        );
      })}
    </ul>
  );
}
