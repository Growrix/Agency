import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { ServicesHeroEcosystemMobile } from "@/components/marketing/services/ServicesHeroEcosystemMobile";
import type { ServiceEcosystemLink } from "@/lib/services-landing-content";

type ServicesLandingHeroMobileProps = {
  eyebrow: string;
  headlineLead: string;
  headlineAccent: string;
  description: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
  ecosystemLinks: readonly ServiceEcosystemLink[];
};

export function ServicesLandingHeroMobile({
  eyebrow,
  headlineLead,
  headlineAccent,
  description,
  primaryCta,
  primaryHref,
  secondaryCta,
  secondaryHref,
  ecosystemLinks,
}: ServicesLandingHeroMobileProps) {
  return (
    <div className="services-landing-hero-mobile w-full">
      <div className="services-landing-hero-mobile__copy">
        <div className="signal-rise" style={{ animationDelay: "0ms" }}>
          <Badge tone="primary" dot className="service-detail-hero-mobile__badge">
            {eyebrow}
          </Badge>
        </div>

        <h1 className="service-detail-hero-mobile__title signal-rise" style={{ animationDelay: "70ms" }}>
          <span className="block">{headlineLead}</span>
          <span className="block marketing-title-accent">{headlineAccent}</span>
        </h1>

        <p className="service-detail-hero-mobile__description signal-rise" style={{ animationDelay: "140ms" }}>
          {description}
        </p>

        <div className="service-detail-hero-mobile__cta-stack signal-rise" style={{ animationDelay: "210ms" }}>
          <LinkButton href={primaryHref} fullWidth className="service-detail-hero-mobile__cta-primary">
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

      <div className="signal-rise" style={{ animationDelay: "280ms" }}>
        <ServicesHeroEcosystemMobile links={ecosystemLinks} />
      </div>
    </div>
  );
}
