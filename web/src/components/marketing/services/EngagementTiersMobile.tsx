"use client";

import {
  ArrowUpRightIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import type { Tier } from "@/components/sections/PricingTier";
import { getMarketingTierIcon } from "@/lib/marketing-tier-icons";
import { cn } from "@/lib/utils";

type EngagementTiersMobileProps = {
  eyebrow: string;
  title: string;
  titleLead?: string;
  titleAccent?: string;
  tiers: Tier[];
};

export function EngagementTiersMobile({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  tiers,
}: EngagementTiersMobileProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={eyebrow}
        titleLead={titleLead}
        titleAccent={titleAccent}
        title={titleLead && titleAccent ? undefined : title}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack home-mobile-marketing__engagement-stack">
        {tiers.map((tier) => {
          const featured = Boolean(tier.featured);
          const Icon = getMarketingTierIcon(tier.iconKey);

          return (
            <article
              key={tier.name}
              className={cn(
                "home-mobile-marketing__path-card home-mobile-marketing__path-card--pricing",
                featured && "home-mobile-marketing__path-card--pricing-featured",
              )}
            >
              <div className="home-mobile-marketing__path-card-head">
                <span className="home-mobile-marketing__path-card-icon" aria-hidden>
                  <Icon className="home-mobile-marketing__path-card-icon-glyph" />
                </span>
                <div className="home-mobile-marketing__path-card-title-wrap">
                  <div className="home-mobile-marketing__path-card-title-row">
                    <h3 className="home-mobile-marketing__path-card-title">{tier.name}</h3>
                    {tier.badge ? <Badge tone="primary">{tier.badge}</Badge> : null}
                  </div>
                </div>
                <span className="home-mobile-marketing__path-card-chevron" aria-hidden>
                  <ChevronRightIcon className="size-4" />
                </span>
              </div>

              {!tier.mutePrice ? (
                <p className="home-mobile-marketing__path-card-price">
                  <span className="home-mobile-marketing__path-card-price-value">{tier.price}</span>
                  {tier.cadence ? (
                    <span className="home-mobile-marketing__path-card-price-cadence">{tier.cadence}</span>
                  ) : null}
                </p>
              ) : null}

              <p className="home-mobile-marketing__path-card-description home-mobile-marketing__path-card-description--pricing">
                {tier.description}
              </p>

              <ul className="home-mobile-marketing__path-card-bullets">
                {tier.features.map((feature) => (
                  <li key={feature} className="home-mobile-marketing__path-card-bullet">
                    <CheckIcon className="home-mobile-marketing__path-card-bullet-icon" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>

              <LinkButton
                href={tier.cta.href}
                variant={featured ? "primary" : "outline"}
                className="home-mobile-marketing__path-card-cta home-mobile-marketing__cta"
              >
                <span className="home-mobile-marketing__cta-inner">
                  {tier.cta.label}
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
