import {
  ArrowRightIcon,
  CodeBracketSquareIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { HomeHeroShowcase } from "@/components/marketing/HomeHeroShowcase";
import { HomeHeroTrustedBy } from "@/components/marketing/HomeHeroTrustedBy";
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
    <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,46%)_minmax(0,54%)] lg:gap-10 xl:gap-14">
      <div className="text-center lg:text-left">
        <div className="signal-rise" style={{ animationDelay: "0ms" }}>
          <Badge tone="primary" dot className="border-0 bg-primary text-surface">
            {badge}
          </Badge>
        </div>

        <h1
          className={`signal-rise mt-5 ${HERO_DISPLAY_TITLE_CLASS}`}
          style={{ animationDelay: "80ms" }}
        >
          {useStructuredTitle ? (
            <>
              {HOME_HERO_COPY.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block text-primary">{HOME_HERO_COPY.titleAccent}</span>
            </>
          ) : (
            title
          )}
        </h1>

        <p
          className="signal-rise mx-auto mt-5 max-w-xl text-base leading-7 text-pretty text-text-muted sm:text-lg lg:mx-0"
          style={{ animationDelay: "160ms" }}
        >
          {description}
        </p>

        <div
          className="signal-rise mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          style={{ animationDelay: "240ms" }}
        >
          <LinkButton href={HOME_HERO_COPY.primaryCtaHref} size="lg" className="text-surface">
            {HOME_HERO_COPY.primaryCta}
            <ArrowRightIcon className="size-4" />
          </LinkButton>
          <LinkButton href={HOME_HERO_COPY.secondaryCtaHref} variant="outline" size="lg">
            {HOME_HERO_COPY.secondaryCta}
          </LinkButton>
        </div>

        <ul
          className="signal-rise mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-3 lg:justify-start"
          style={{ animationDelay: "320ms" }}
          aria-label="Platform highlights"
        >
          {HOME_HERO_HIGHLIGHTS.map((item) => {
            const Icon = highlightIcons[item.icon];
            return (
              <li key={item.label} className="inline-flex items-center gap-2 text-sm text-text-muted">
                <Icon className="size-4 shrink-0 text-primary" aria-hidden />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>

        <div className="signal-rise mt-8" style={{ animationDelay: "400ms" }}>
          <HomeHeroTrustedBy className="text-center lg:text-left" />
        </div>
      </div>

      <HomeHeroShowcase
        slides={slides}
        emptyFallbackSlide={emptyFallbackSlide}
        layout="desktop"
        className="signal-spring-in w-full lg:justify-self-stretch"
      />
    </div>
  );
}
