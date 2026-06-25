import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { InvestmentGuideHeroPanelMobile } from "@/components/marketing/pricing/InvestmentGuideHeroPanelMobile";
import { INVESTMENT_GUIDE_HERO } from "@/lib/investment-guide-content";

export function InvestmentGuideHeroMobile() {
  return (
    <div className="services-landing-hero-mobile w-full">
      <div className="services-landing-hero-mobile__copy">
        <Badge tone="primary" dot className="service-detail-hero-mobile__badge">
          {INVESTMENT_GUIDE_HERO.eyebrow}
        </Badge>

        <h1 className="service-detail-hero-mobile__title">
          <span className="block">{INVESTMENT_GUIDE_HERO.titleLead}</span>
          <span className="block marketing-title-accent">{INVESTMENT_GUIDE_HERO.titleAccent}</span>
        </h1>

        <p className="service-detail-hero-mobile__description">{INVESTMENT_GUIDE_HERO.description}</p>

        <div className="service-detail-hero-mobile__cta-stack">
          <LinkButton href={INVESTMENT_GUIDE_HERO.primaryHref} fullWidth className="service-detail-hero-mobile__cta-primary">
            <span className="service-detail-hero-mobile__cta-inner">
              {INVESTMENT_GUIDE_HERO.primaryCta}
              <ArrowRightIcon className="service-detail-hero-mobile__cta-icon" aria-hidden />
            </span>
          </LinkButton>
          <LinkButton
            href={INVESTMENT_GUIDE_HERO.secondaryHref}
            variant="outline"
            fullWidth
            className="service-detail-hero-mobile__cta-secondary"
          >
            {INVESTMENT_GUIDE_HERO.secondaryCta}
          </LinkButton>
        </div>
      </div>

      <InvestmentGuideHeroPanelMobile />
    </div>
  );
}
