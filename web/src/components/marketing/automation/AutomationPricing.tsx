import { useId } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import {
  MagnifyingGlassCircleIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { AUTOMATION_ENGAGEMENT_SECTION } from "@/lib/automation-service-content";
import type { Tier } from "@/components/sections/PricingTier";
import { cn } from "@/lib/utils";
import styles from "./AutomationPage.module.css";

const TIER_ICON_FALLBACK = BoltIcon;

const TIER_ICONS: Record<string, typeof BoltIcon> = {
  "workflow-audit": MagnifyingGlassCircleIcon,
  "automation-build": BoltIcon,
  "optimization-partner": WrenchScrewdriverIcon,
};

function PricingCard({ tier }: { tier: Tier }) {
  const featured = Boolean(tier.featured);
  const Icon = TIER_ICONS[tier.iconKey ?? ""] ?? TIER_ICON_FALLBACK;
  const labelId = useId();

  return (
    <RevealItem className="h-full">
      <article
        className={cn(styles.pricingCard, featured && styles.pricingFeatured)}
        aria-labelledby={labelId}
      >
        {featured && <span className={styles.pricingFeaturedBadge}>Most Popular</span>}
        <div className={styles.pricingHeader}>
          <div className="flex items-center gap-3">
            <div className={styles.pricingIcon}>
              <Icon className="size-5" />
            </div>
            <h3 id={labelId} className={styles.pricingTitle}>{tier.name}</h3>
          </div>
          {!featured && tier.badge ? <Badge tone="primary">{tier.badge}</Badge> : null}
        </div>
        <div className={styles.pricingPrice}>
          {tier.price}
          {tier.cadence ? (
            <span className={styles.pricingCadence}> {tier.cadence}</span>
          ) : null}
        </div>
        <p className={styles.pricingDescription}>{tier.description}</p>
        <ul className={styles.pricingFeatures}>
          {tier.features.map((feature) => (
            <li key={feature} className={styles.pricingFeature}>
              <CheckIcon className={styles.pricingFeatureIcon} aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className={styles.pricingCta}>
          <LinkButton href={tier.cta.href} variant={featured ? "primary" : "outline"} fullWidth>
            {tier.cta.label}
          </LinkButton>
        </div>
      </article>
    </RevealItem>
  );
}

function AutomationPricingDesktop({ tiers }: { tiers: Tier[] }) {
  return (
    <>
      <div className={cn("mx-auto max-w-2xl text-center", styles.sectionHeaderCenter)}>
        <SectionHeading
          eyebrow={AUTOMATION_ENGAGEMENT_SECTION.eyebrow}
          title={AUTOMATION_ENGAGEMENT_SECTION.title}
          titleLead={AUTOMATION_ENGAGEMENT_SECTION.titleLead}
          titleAccent={AUTOMATION_ENGAGEMENT_SECTION.titleAccent}
          description={AUTOMATION_ENGAGEMENT_SECTION.description}
          align="center"
        />
      </div>
      <RevealGroup className={styles.pricingGrid} stagger={0.08}>
        {tiers.map((tier) => (
          <PricingCard key={tier.name} tier={tier} />
        ))}
      </RevealGroup>
    </>
  );
}

function AutomationPricingMobile({ tiers }: { tiers: Tier[] }) {
  return (
    <div>
      <MobileMarketingSectionHeader
        eyebrow={AUTOMATION_ENGAGEMENT_SECTION.eyebrow}
        titleLead={AUTOMATION_ENGAGEMENT_SECTION.titleLead}
        titleAccent={AUTOMATION_ENGAGEMENT_SECTION.titleAccent}
        description={AUTOMATION_ENGAGEMENT_SECTION.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />
      <div className={styles.pricingGrid}>
        {tiers.map((tier) => (
          <PricingCard key={tier.name} tier={tier} />
        ))}
      </div>
    </div>
  );
}

export function AutomationPricing({ tiers }: { tiers: Tier[] }) {
  return (
    <MarketingViewportGate
      mobile={<AutomationPricingMobile tiers={tiers} />}
      desktop={<AutomationPricingDesktop tiers={tiers} />}
    />
  );
}
