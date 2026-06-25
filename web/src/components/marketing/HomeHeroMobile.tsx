import {
  ArrowRightIcon,
  CalendarDaysIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { HomeHeroMobileFeatures } from "@/components/marketing/HomeHeroMobileFeatures";
import { HomeHeroShowcase } from "@/components/marketing/HomeHeroShowcase";
import { HomeHeroTrustedBy } from "@/components/marketing/HomeHeroTrustedBy";
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
      <div className="home-hero-mobile__copy">
        <div className="signal-rise home-hero-mobile__badge-wrap" style={{ animationDelay: "0ms" }}>
          <Badge tone="primary" dot className="home-hero-mobile__badge">
            {badge}
          </Badge>
        </div>

        <h1
          className={`signal-rise ${HERO_MOBILE_DISPLAY_TITLE_CLASS}`}
          style={{ animationDelay: "80ms" }}
        >
          {useStructuredTitle ? (
            <>
              {HOME_HERO_COPY.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block marketing-title-accent">{HOME_HERO_COPY.titleAccent}</span>
            </>
          ) : (
            title
          )}
        </h1>

        <p className="signal-rise home-hero-mobile__description" style={{ animationDelay: "160ms" }}>
          {HOME_HERO_COPY.mobileDescriptionLines.map((line) => (
            <span key={line} className="home-hero-mobile__description-line">
              {line}
            </span>
          ))}
        </p>

        <div className="signal-rise home-hero-mobile__cta-stack" style={{ animationDelay: "240ms" }}>
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
        </div>
      </div>

      <div className="signal-rise home-hero-mobile__trust" style={{ animationDelay: "320ms" }}>
        <HomeHeroTrustedBy variant="mobile" />
      </div>

      <HomeHeroShowcase
        slides={slides}
        emptyFallbackSlide={emptyFallbackSlide}
        layout="mobile"
        className="signal-spring-in home-hero-mobile__showcase"
      />

      <div className="signal-rise w-full" style={{ animationDelay: "480ms" }}>
        <HomeHeroMobileFeatures />
      </div>
    </div>
  );
}
