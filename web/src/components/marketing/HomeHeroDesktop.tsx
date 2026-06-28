"use client";

import {
  ArrowRightIcon,
  CodeBracketSquareIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { HomeHeroShowcase } from "@/components/marketing/HomeHeroShowcase";
import { HomeHeroTrustedBy } from "@/components/marketing/HomeHeroTrustedBy";
import {
  HomeHeroCtaMotion,
  HomeHeroCtaStackMotion,
  HomeHeroMotionReveal,
} from "@/components/marketing/hero-motion/HomeHeroCtaMotion";
import { HomeHeroKineticHeadline } from "@/components/marketing/hero-motion/HomeHeroKineticHeadline";
import { HomeHeroKineticSubhead } from "@/components/marketing/hero-motion/HomeHeroKineticSubhead";
import { HomeHeroShowcaseMotion } from "@/components/marketing/hero-motion/HomeHeroShowcaseMotion";
import { HomeHeroTrustMotion } from "@/components/marketing/hero-motion/HomeHeroTrustMotion";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import type { HtmlProfileHeroSlide } from "@/components/sections/HtmlProfileHeroCarousel";
import { HOME_HERO_COPY, HOME_HERO_HIGHLIGHTS } from "@/lib/home-conversion-content";
import { HERO_DISPLAY_TITLE_CLASS } from "@/lib/typography";

const highlightIcons = {
  cube: CubeTransparentIcon,
  code: CodeBracketSquareIcon,
  users: UserGroupIcon,
  shield: ShieldCheckIcon,
} as const;

type HomeHeroDesktopProps = {
  badge: string;
  title?: string;
  description: string;
  slides: HtmlProfileHeroSlide[];
  emptyFallbackSlide?: HtmlProfileHeroSlide;
};

export function HomeHeroDesktop({
  badge,
  title,
  description,
  slides,
  emptyFallbackSlide,
}: HomeHeroDesktopProps) {
  const useStructuredTitle = !title;

  return (
    <div className="home-hero-desktop home-hero-desktop__copy-3d">
      <div className="home-hero-desktop__copy">
        <HomeHeroMotionReveal phase="badge">
          <Badge tone="primary" dot className="home-hero-desktop__badge">
            {badge}
          </Badge>
        </HomeHeroMotionReveal>

        {useStructuredTitle ? (
          <HomeHeroKineticHeadline
            titleLines={HOME_HERO_COPY.titleLines}
            titleAccent={HOME_HERO_COPY.titleAccent}
            className={`home-hero-desktop__title ${HERO_DISPLAY_TITLE_CLASS}`}
            variant="desktop"
          />
        ) : (
          <h1 className={`home-hero-desktop__title ${HERO_DISPLAY_TITLE_CLASS}`}>{title}</h1>
        )}

        <HomeHeroKineticSubhead className="home-hero-desktop__description">{description}</HomeHeroKineticSubhead>

        <HomeHeroCtaStackMotion className="home-hero-desktop__actions">
          <HomeHeroCtaMotion variant="primary" className="home-hero-desktop__cta-primary-wrap">
            <LinkButton href={HOME_HERO_COPY.primaryCtaHref} size="lg" className="home-hero-desktop__cta-primary">
              {HOME_HERO_COPY.primaryCta}
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
            </LinkButton>
          </HomeHeroCtaMotion>
          <HomeHeroCtaMotion variant="secondary" className="home-hero-desktop__cta-secondary-wrap">
            <LinkButton
              href={HOME_HERO_COPY.secondaryCtaHref}
              variant="outline"
              size="lg"
              className="home-hero-desktop__cta-secondary"
            >
              {HOME_HERO_COPY.secondaryCta}
            </LinkButton>
          </HomeHeroCtaMotion>
        </HomeHeroCtaStackMotion>

        <HomeHeroTrustMotion className="home-hero-desktop__trust-wrap">
          <HomeHeroTrustedBy variant="desktop" animated />
        </HomeHeroTrustMotion>

        <HomeHeroMotionReveal phase="highlights">
          <ul className="home-hero-desktop__highlights" aria-label="Platform highlights">
            {HOME_HERO_HIGHLIGHTS.map((item) => {
              const Icon = highlightIcons[item.icon];
              return (
                <li key={item.label} className="home-hero-desktop__highlight">
                  <Icon className="size-4 shrink-0 text-primary" aria-hidden />
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </HomeHeroMotionReveal>
      </div>

      <div className="home-hero-desktop__showcase">
        <div className="home-hero-desktop__showcase-glow" aria-hidden />
        <HomeHeroShowcaseMotion className="home-hero-desktop__showcase-frame">
          <HomeHeroShowcase
            slides={slides}
            emptyFallbackSlide={emptyFallbackSlide}
            layout="desktop"
            className="home-hero-desktop__showcase-inner"
          />
        </HomeHeroShowcaseMotion>
      </div>
    </div>
  );
}
