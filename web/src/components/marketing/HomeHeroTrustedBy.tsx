"use client";

import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { HomeHeroTrustNameMotion } from "@/components/marketing/hero-motion/HomeHeroTrustMotion";
import {
  HOME_HERO_SOCIAL_PROOF,
  HOME_HERO_TECH_STACK,
} from "@/lib/home-conversion-content";
import { cn } from "@/lib/utils";

type HomeHeroTrustedByProps = {
  className?: string;
  variant?: "desktop" | "mobile";
  animated?: boolean;
};

export function HomeHeroTrustedBy({ className, variant = "desktop", animated = false }: HomeHeroTrustedByProps) {
  const isMobile = variant === "mobile";

  return (
    <div
      className={cn(
        "home-hero-trust-panel",
        isMobile && "home-hero-trust-panel--mobile",
        !isMobile && "home-hero-trust-panel--desktop",
        className,
      )}
    >
      <div className="home-hero-trust-panel__social">
        <div className="home-hero-trust-panel__rating" aria-label={`5 out of 5 stars — ${HOME_HERO_SOCIAL_PROOF.ratingLabel}`}>
          <span className="home-hero-trust-panel__stars" aria-hidden>
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon key={index} className="home-hero-trust-panel__star" />
            ))}
          </span>
          <p className="home-hero-trust-panel__rating-label">{HOME_HERO_SOCIAL_PROOF.ratingLabel}</p>
        </div>

        <div className="home-hero-trust-panel__review-links">
          {HOME_HERO_SOCIAL_PROOF.reviewLinks.map((link, index) => (
            <span key={link.label} className="home-hero-trust-panel__review-link-wrap">
              {index > 0 ? <span className="home-hero-trust-panel__review-separator" aria-hidden>|</span> : null}
              {"external" in link && link.external ? (
                <a
                  href={link.href}
                  className="home-hero-trust-panel__review-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className="home-hero-trust-panel__review-link">
                  {link.label}
                </Link>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="home-hero-trust-panel__tech">
        {isMobile ? (
          <div className="home-hero-mobile__trust-row">
            <span className="home-hero-mobile__trust-divider" aria-hidden />
            <p className="home-hero-mobile__trust-label">{HOME_HERO_TECH_STACK.label}</p>
            <span className="home-hero-mobile__trust-divider" aria-hidden />
          </div>
        ) : (
          <p className="home-hero-trust-panel__tech-label">{HOME_HERO_TECH_STACK.label}</p>
        )}
        <ul
          className={cn(
            isMobile
              ? "home-hero-mobile__trust-names mt-3 flex flex-wrap items-center justify-center"
              : "home-hero-trust-panel__tech-list",
          )}
          aria-label={HOME_HERO_TECH_STACK.label}
        >
          {HOME_HERO_TECH_STACK.technologies.map((name, index) =>
            animated ? (
              <HomeHeroTrustNameMotion
                key={name}
                name={name}
                index={index}
                className={cn(
                  isMobile
                    ? "home-hero-mobile__trust-name font-semibold tracking-wide text-text-muted"
                    : "home-hero-trust-panel__tech-item home-hero-trust-panel__tech-name",
                )}
              />
            ) : (
              <li
                key={name}
                className={cn(
                  isMobile
                    ? "home-hero-mobile__trust-name font-semibold tracking-wide text-text-muted"
                    : "home-hero-trust-panel__tech-item",
                )}
              >
                {!isMobile ? <span className="home-hero-trust-panel__tech-name">{name}</span> : name}
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
}
