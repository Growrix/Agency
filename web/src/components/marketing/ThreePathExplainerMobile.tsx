"use client";

import {
  ArrowUpRightIcon,
  CheckIcon,
  ChevronRightIcon,
  CodeBracketSquareIcon,
  RocketLaunchIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { HOME_THREE_PATH_CARDS, HOME_THREE_PATH_COPY } from "@/lib/home-conversion-content";
import { cn } from "@/lib/utils";

const PATH_ICONS = {
  "rocket-launch": RocketLaunchIcon,
  users: UserGroupIcon,
  "code-bracket": CodeBracketSquareIcon,
} as const;

export function ThreePathExplainerMobile() {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={HOME_THREE_PATH_COPY.eyebrow}
        titleLead={HOME_THREE_PATH_COPY.titleLead}
        titleAccent={HOME_THREE_PATH_COPY.titleAccent}
        description={HOME_THREE_PATH_COPY.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack">
        {HOME_THREE_PATH_CARDS.map((card) => {
          const Icon = PATH_ICONS[card.icon as keyof typeof PATH_ICONS] ?? RocketLaunchIcon;
          const featured = "featured" in card && card.featured;

          return (
            <article
              key={card.title}
              className={cn(
                "home-mobile-marketing__path-card",
                featured && "home-mobile-marketing__path-card--featured",
              )}
            >
              <div className="home-mobile-marketing__path-card-head">
                <span className="home-mobile-marketing__path-card-icon" aria-hidden>
                  <Icon className="home-mobile-marketing__path-card-icon-glyph" />
                </span>
                <div className="home-mobile-marketing__path-card-title-wrap">
                  <div className="flex items-center gap-2">
                    <h3 className="home-mobile-marketing__path-card-title">{card.title}</h3>
                    {featured ? <Badge tone="primary">Recommended</Badge> : null}
                  </div>
                  <p className="home-mobile-marketing__path-card-description">{card.description}</p>
                </div>
                <span className="home-mobile-marketing__path-card-chevron" aria-hidden>
                  <ChevronRightIcon className="size-4" />
                </span>
              </div>

              <ul className="home-mobile-marketing__path-card-bullets">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="home-mobile-marketing__path-card-bullet">
                    <CheckIcon className="home-mobile-marketing__path-card-bullet-icon" aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>

              <LinkButton
                href={card.cta.href}
                variant={featured ? "primary" : "outline"}
                className="home-mobile-marketing__path-card-cta home-mobile-marketing__cta"
              >
                <span className="home-mobile-marketing__cta-inner">
                  {card.cta.label}
                  <ArrowUpRightIcon className="home-mobile-marketing__cta-icon" aria-hidden />
                </span>
              </LinkButton>
            </article>
          );
        })}
      </div>
    </div>
  );
}
