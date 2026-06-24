import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";

type ServicesLandingHeroMobileProps = {
  eyebrow: string;
  headlineLead: string;
  headlineAccent: string;
  description: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
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
}: ServicesLandingHeroMobileProps) {
  return (
    <div className="service-detail-hero-mobile w-full">
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
          <LinkButton href={primaryHref} fullWidth>
            <span className="service-detail-hero-mobile__cta-inner">
              {primaryCta}
              <ArrowRightIcon className="service-detail-hero-mobile__cta-icon" aria-hidden />
            </span>
          </LinkButton>
          <LinkButton href={secondaryHref} variant="outline" fullWidth>
            {secondaryCta}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
