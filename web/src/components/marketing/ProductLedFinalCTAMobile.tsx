"use client";

import {
  ArrowUpRightIcon,
  BoltIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { HOME_FINAL_CTA_FEATURES, HOME_FINAL_CTA_MOBILE_COPY } from "@/lib/home-conversion-content";
import { WHATSAPP_HREF } from "@/lib/nav";
import { homeSection } from "@/lib/homepage-composition";
import { Container, Section } from "@/components/primitives/Container";

const FEATURE_ICONS = [BoltIcon, UserGroupIcon, ShieldCheckIcon];

type ProductLedFinalCTAMobileProps = {
  eyebrow: string;
  title?: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export function ProductLedFinalCTAMobile({
  eyebrow,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: ProductLedFinalCTAMobileProps) {
  const shell = homeSection("final-cta");

  return (
    <Section {...shell}>
      <Container>
        <div className="home-mobile-marketing__final-cta-card">
          <MobileMarketingSectionHeader
            eyebrow={eyebrow}
            titleLead={HOME_FINAL_CTA_MOBILE_COPY.titleLead}
            titleAccent={HOME_FINAL_CTA_MOBILE_COPY.titleAccent}
            description={description}
            align="left"
            className="home-mobile-marketing__header--left max-w-none"
          />

          <div className="home-mobile-marketing__final-cta-actions">
            <LinkButton href={primaryHref} className="home-mobile-marketing__cta w-full">
              <span className="home-mobile-marketing__cta-inner">
                <SparklesIcon className="home-mobile-marketing__cta-icon" aria-hidden />
                {primaryLabel}
                <ArrowUpRightIcon className="home-mobile-marketing__cta-icon" aria-hidden />
              </span>
            </LinkButton>
            <LinkButton
              href={secondaryHref ?? WHATSAPP_HREF}
              variant="outline"
              className="home-mobile-marketing__cta home-mobile-marketing__cta--outline w-full"
            >
              <span className="home-mobile-marketing__cta-inner">
                <CalendarDaysIcon className="home-mobile-marketing__cta-icon" aria-hidden />
                {secondaryLabel}
                <ArrowUpRightIcon className="home-mobile-marketing__cta-icon" aria-hidden />
              </span>
            </LinkButton>
          </div>

          <div className="home-mobile-marketing__feature-grid">
            {HOME_FINAL_CTA_FEATURES.map((feature, index) => {
              const Icon = FEATURE_ICONS[index] ?? BoltIcon;
              return (
                <div key={feature.label} className="home-mobile-marketing__feature-grid-item">
                  <Icon className="home-mobile-marketing__feature-grid-icon" aria-hidden />
                  <p className="home-mobile-marketing__feature-grid-label">{feature.label}</p>
                  <p className="home-mobile-marketing__feature-grid-desc">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
