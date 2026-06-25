import {
  ArrowRightIcon,
  CodeBracketSquareIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { HomeHeroShowcase } from "@/components/marketing/HomeHeroShowcase";
import { HomeHeroTrustedBy } from "@/components/marketing/HomeHeroTrustedBy";
import { HomeHeroTrustedByDesktop } from "@/components/marketing/HomeHeroTrustedByDesktop";
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
    <div className="home-hero-desktop">
      <div className="home-hero-desktop__copy">
        <div className="signal-rise" style={{ animationDelay: "0ms" }}>
          <Badge tone="primary" dot className="home-hero-desktop__badge">
            {badge}
          </Badge>
        </div>

        <h1
          className={`signal-rise home-hero-desktop__title ${HERO_DISPLAY_TITLE_CLASS}`}
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

        <p
          className="signal-rise home-hero-desktop__description"
          style={{ animationDelay: "160ms" }}
        >
          {description}
        </p>

        <div className="signal-rise home-hero-desktop__actions" style={{ animationDelay: "240ms" }}>
          <LinkButton href={HOME_HERO_COPY.primaryCtaHref} size="lg" className="home-hero-desktop__cta-primary">
            {HOME_HERO_COPY.primaryCta}
            <ArrowRightIcon className="size-4" />
          </LinkButton>
          <LinkButton
            href={HOME_HERO_COPY.secondaryCtaHref}
            variant="outline"
            size="lg"
            className="home-hero-desktop__cta-secondary"
          >
            {HOME_HERO_COPY.secondaryCta}
          </LinkButton>
        </div>

        <div className="signal-rise home-hero-desktop__trust-wrap" style={{ animationDelay: "320ms" }}>
          <HomeHeroTrustedByDesktop />
          <HomeHeroTrustedBy className="home-hero-desktop__trust-names" />
        </div>

        <ul
          className="signal-rise home-hero-desktop__highlights"
          style={{ animationDelay: "400ms" }}
          aria-label="Platform highlights"
        >
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
      </div>

      <div className="home-hero-desktop__showcase">
        <div className="home-hero-desktop__showcase-glow" aria-hidden />
        <HomeHeroShowcase
          slides={slides}
          emptyFallbackSlide={emptyFallbackSlide}
          layout="desktop"
          className="signal-spring-in home-hero-desktop__showcase-frame"
        />
      </div>
    </div>
  );
}
