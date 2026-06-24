import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { StatBlock, type Stat } from "@/components/sections/StatBlock";

type ServiceDetailHeroMobileProps = {
  eyebrow: string;
  headlineLead: string;
  headlineAccent: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
  deliveryTimeline: string;
  engagementSummary: string;
  pillars: string[];
  stats: Stat[];
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export function ServiceDetailHeroMobile({
  eyebrow,
  headlineLead,
  headlineAccent,
  description,
  primaryCta,
  secondaryCta,
  secondaryHref,
  deliveryTimeline,
  engagementSummary,
  pillars,
  stats,
  icon: Icon,
}: ServiceDetailHeroMobileProps) {
  return (
    <div className="service-detail-hero-mobile w-full">
      <Link href="/services" className="service-detail-hero-mobile__back">
        ← All services
      </Link>

      <div className="service-detail-hero-mobile__copy">
        <Badge tone="primary" dot className="service-detail-hero-mobile__badge">
          {eyebrow}
        </Badge>

        <h1 className="service-detail-hero-mobile__title">
          <span className="block">{headlineLead}</span>
          <span className="block text-primary">{headlineAccent}</span>
        </h1>

        <p className="service-detail-hero-mobile__description">{description}</p>

        <div className="service-detail-hero-mobile__cta-stack">
          <LinkButton href="/book-appointment" fullWidth className="service-detail-hero-mobile__cta-primary">
            <span className="service-detail-hero-mobile__cta-inner">
              {primaryCta}
              <ArrowRightIcon className="service-detail-hero-mobile__cta-icon" aria-hidden />
            </span>
          </LinkButton>
          <LinkButton href={secondaryHref} variant="outline" fullWidth className="service-detail-hero-mobile__cta-secondary">
            {secondaryCta}
          </LinkButton>
        </div>
      </div>

      <Card className="service-detail-hero-mobile__engagement-card">
        <div className="service-detail-hero-mobile__engagement-head">
          <div className="service-detail-hero-mobile__engagement-icon" aria-hidden>
            <Icon className="size-6" />
          </div>
          <Badge tone="secondary">{deliveryTimeline}</Badge>
        </div>
        <p className="service-detail-hero-mobile__engagement-label">Engagement style</p>
        <p className="service-detail-hero-mobile__engagement-summary">{engagementSummary}</p>
        <ul className="service-detail-hero-mobile__pillars">
          {pillars.map((pillar) => (
            <li key={pillar} className="service-detail-hero-mobile__pillar">
              <CheckIcon className="service-detail-hero-mobile__pillar-icon" aria-hidden />
              {pillar}
            </li>
          ))}
        </ul>
      </Card>

      <StatBlock stats={stats} dense containerWidth="content" containerClassName="px-0" className="service-detail-hero-mobile__stats" />
    </div>
  );
}
