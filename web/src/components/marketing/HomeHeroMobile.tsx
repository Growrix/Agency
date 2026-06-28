"use client";

import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { HomeHeroMobileFeatures } from "@/components/marketing/HomeHeroMobileFeatures";
import { HomeHeroShowcase } from "@/components/marketing/HomeHeroShowcase";
import { HomeHeroTrustedBy } from "@/components/marketing/HomeHeroTrustedBy";
import {
  HomeHeroCtaMotion,
  HomeHeroCtaStackMotion,
  HomeHeroMotionReveal,
} from "@/components/marketing/hero-motion/HomeHeroCtaMotion";
import { HomeHeroKineticHeadline } from "@/components/marketing/hero-motion/HomeHeroKineticHeadline";
import { HomeHeroKineticSubheadLines } from "@/components/marketing/hero-motion/HomeHeroKineticSubhead";
import { HomeHeroShowcaseMotion } from "@/components/marketing/hero-motion/HomeHeroShowcaseMotion";
import { HomeHeroTrustMotion } from "@/components/marketing/hero-motion/HomeHeroTrustMotion";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import { HOME_HERO_COPY } from "@/lib/home-conversion-content";
import { HERO_MOBILE_DISPLAY_TITLE_CLASS } from "@/lib/typography";

type HomeHeroMobileProps = {
  badge: string;
  title?: string;
  description: string;
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
};

export function HomeHeroMobile({
  badge,
  title,
  slides,
  emptyFallbackSlide,
}: HomeHeroMobileProps) {
  const useStructuredTitle = !title;

  return (
    <div className="home-hero-mobile w-full">
      <section className="home-hero-mobile__intro" aria-label="Growrix OS hero">
        <div className="home-hero-mobile__copy">
          <HomeHeroMotionReveal phase="badge" className="home-hero-mobile__badge-wrap">
            <Badge tone="primary" dot className="home-hero-mobile__badge">
              {badge}
            </Badge>
          </HomeHeroMotionReveal>

          {useStructuredTitle ? (
            <HomeHeroKineticHeadline
              titleLines={HOME_HERO_COPY.titleLines}
              titleAccent={HOME_HERO_COPY.titleAccent}
              className={HERO_MOBILE_DISPLAY_TITLE_CLASS}
              variant="mobile"
            />
          ) : (
            <h1 className={HERO_MOBILE_DISPLAY_TITLE_CLASS}>{title}</h1>
          )}

          <HomeHeroKineticSubheadLines
            lines={HOME_HERO_COPY.mobileDescriptionLines}
            className="home-hero-mobile__description"
            lineClassName="home-hero-mobile__description-line"
          />

          <HomeHeroCtaStackMotion className="home-hero-mobile__cta-stack">
            <HomeHeroCtaMotion variant="primary">
              <LinkButton
                href={HOME_HERO_COPY.primaryCtaHref}
                fullWidth
                className="home-hero-mobile__cta-primary"
              >
                <span className="home-hero-mobile__cta-inner">
                  <ShoppingBagIcon className="home-hero-mobile__cta-icon" aria-hidden />
                  <span className="home-hero-mobile__cta-label">{HOME_HERO_COPY.primaryCta}</span>
                  <ArrowRightIcon className="home-hero-mobile__cta-icon" aria-hidden />
                </span>
              </LinkButton>
            </HomeHeroCtaMotion>
            <HomeHeroCtaMotion variant="secondary">
              <LinkButton
                href={HOME_HERO_COPY.secondaryCtaHref}
                variant="outline"
                fullWidth
                className="home-hero-mobile__cta-secondary"
              >
                <span className="home-hero-mobile__cta-inner">
                  <CalendarDaysIcon className="home-hero-mobile__cta-icon" aria-hidden />
                  <span className="home-hero-mobile__cta-label">{HOME_HERO_COPY.secondaryCta}</span>
                </span>
              </LinkButton>
            </HomeHeroCtaMotion>
          </HomeHeroCtaStackMotion>
        </div>

        <HomeHeroTrustMotion className="home-hero-mobile__trust">
          <HomeHeroTrustedBy variant="mobile" animated />
        </HomeHeroTrustMotion>
      </section>

      <section className="home-hero-mobile__stage" aria-label="Live template preview">
        <HomeHeroShowcaseMotion className="home-hero-mobile__showcase">
          <HomeHeroShowcase
            slides={slides}
            emptyFallbackSlide={emptyFallbackSlide}
            layout="mobile"
            className="home-hero-mobile__showcase-inner"
          />
        </HomeHeroShowcaseMotion>

        <HomeHeroMotionReveal phase="features" className="home-hero-mobile__features-wrap">
          <HomeHeroMobileFeatures />
        </HomeHeroMotionReveal>
      </section>
    </div>
  );
}
