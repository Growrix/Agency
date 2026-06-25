import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { resolveMarketingTitle } from "@/lib/marketing-title";

type MarketingPageHeroMobileProps = {
  eyebrow: string;
  /** Plain title (no accent split). Use this OR titleLead+titleAccent. */
  title?: string;
  titleLead?: string;
  titleAccent?: string;
  description: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta?: string;
  secondaryHref?: string;
  proofPoints?: readonly string[];
};

export function MarketingPageHeroMobile({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  primaryCta,
  primaryHref,
  secondaryCta,
  secondaryHref,
  proofPoints,
}: MarketingPageHeroMobileProps) {
  const resolved = resolveMarketingTitle({ title, titleLead, titleAccent });

  return (
    <div className="marketing-page-hero-mobile">
      <div className="marketing-page-hero-mobile__copy">
        <Badge tone="primary" dot className="service-detail-hero-mobile__badge">
          {eyebrow}
        </Badge>

        {resolved.kind === "accent" ? (
          <h1 className="service-detail-hero-mobile__title">
            <span className="block">{resolved.titleLead}</span>
            <span className="block marketing-title-accent">{resolved.titleAccent}</span>
          </h1>
        ) : (
          <h1 className="service-detail-hero-mobile__title">{resolved.title}</h1>
        )}

        <p className="service-detail-hero-mobile__description">{description}</p>

        {proofPoints && proofPoints.length > 0 ? (
          <ul className="marketing-page-hero-mobile__proof-points">
            {proofPoints.map((point) => (
              <li key={point} className="marketing-page-hero-mobile__proof-point">
                <CheckIcon className="marketing-page-hero-mobile__proof-icon" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="service-detail-hero-mobile__cta-stack">
          <LinkButton href={primaryHref} fullWidth className="service-detail-hero-mobile__cta-primary">
            <span className="service-detail-hero-mobile__cta-inner">
              {primaryCta}
              <ArrowRightIcon className="service-detail-hero-mobile__cta-icon" aria-hidden />
            </span>
          </LinkButton>
          {secondaryCta && secondaryHref ? (
            <LinkButton href={secondaryHref} variant="outline" fullWidth className="service-detail-hero-mobile__cta-secondary">
              {secondaryCta}
            </LinkButton>
          ) : null}
        </div>
      </div>
    </div>
  );
}
