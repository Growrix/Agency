"use client";

import { ArrowUpRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import type { Tier } from "@/components/sections/PricingTier";
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

      <div className="home-mobile-marketing__stack">
        {tiers.map((tier) => {
          const featured = Boolean(tier.featured);

          return (
            <article
              key={tier.name}
              className={cn(
                "home-mobile-marketing__path-card",
                featured && "home-mobile-marketing__path-card--featured",
              )}
            >
              <div className="home-mobile-marketing__path-card-head">
                <div className="home-mobile-marketing__path-card-title-wrap min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="home-mobile-marketing__path-card-title">{tier.name}</h3>
                    {tier.badge ? <Badge tone="primary">{tier.badge}</Badge> : null}
                  </div>
                  {!tier.mutePrice ? (
                    <p className="home-mobile-marketing__path-card-description">
                      <span className="font-display text-2xl tracking-tight text-inherit">{tier.price}</span>
                      {tier.cadence ? <span className="ml-1 text-sm opacity-80">{tier.cadence}</span> : null}
                    </p>
                  ) : null}
                  <p className="home-mobile-marketing__path-card-description">{tier.description}</p>
                </div>
              </div>

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
