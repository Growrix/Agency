import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { AboutHeroPanelMobile } from "@/components/marketing/about/AboutHeroPanelMobile";
import { ABOUT_HERO } from "@/lib/about-landing-content";

export function AboutHeroMobile() {
  return (
    <div className="services-landing-hero-mobile w-full">
      <div className="services-landing-hero-mobile__copy">
        <Badge tone="primary" dot className="service-detail-hero-mobile__badge">
          {ABOUT_HERO.eyebrow}
        </Badge>

        <h1 className="service-detail-hero-mobile__title">
          <span className="block">{ABOUT_HERO.titleLead}</span>
          <span className="block marketing-title-accent">{ABOUT_HERO.titleAccent}</span>
        </h1>

        <p className="service-detail-hero-mobile__description">{ABOUT_HERO.description}</p>

        <ul className="marketing-page-hero-mobile__proof-points">
          {ABOUT_HERO.proofPoints.map((point) => (
            <li key={point} className="marketing-page-hero-mobile__proof-point">
              <CheckIcon className="marketing-page-hero-mobile__proof-icon" aria-hidden />
              {point}
            </li>
          ))}
        </ul>

        <div className="service-detail-hero-mobile__cta-stack">
          <LinkButton href={ABOUT_HERO.primaryHref} fullWidth className="service-detail-hero-mobile__cta-primary">
            <span className="service-detail-hero-mobile__cta-inner">
              {ABOUT_HERO.primaryCta}
              <ArrowRightIcon className="service-detail-hero-mobile__cta-icon" aria-hidden />
            </span>
          </LinkButton>
          <LinkButton
            href={ABOUT_HERO.secondaryHref}
            variant="outline"
            fullWidth
            className="service-detail-hero-mobile__cta-secondary"
          >
            {ABOUT_HERO.secondaryCta}
          </LinkButton>
        </div>
      </div>

      <AboutHeroPanelMobile />
    </div>
  );
}
