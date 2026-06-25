import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { BLOG_LANDING_HERO } from "@/lib/blog-landing-content";

export function BlogLandingHeroMobile() {
  return (
    <div className="services-landing-hero-mobile w-full">
      <div className="services-landing-hero-mobile__copy">
        <Badge tone="primary" dot className="service-detail-hero-mobile__badge">
          {BLOG_LANDING_HERO.eyebrow}
        </Badge>

        <h1 className="service-detail-hero-mobile__title">
          <span className="block">{BLOG_LANDING_HERO.titleLead}</span>
          <span className="block marketing-title-accent">{BLOG_LANDING_HERO.titleAccent}</span>
        </h1>

        <p className="service-detail-hero-mobile__description">{BLOG_LANDING_HERO.description}</p>

        <div className="service-detail-hero-mobile__cta-stack">
          <LinkButton href={BLOG_LANDING_HERO.primaryHref} fullWidth className="service-detail-hero-mobile__cta-primary">
            <span className="service-detail-hero-mobile__cta-inner">
              {BLOG_LANDING_HERO.primaryCta}
              <ArrowRightIcon className="service-detail-hero-mobile__cta-icon" aria-hidden />
            </span>
          </LinkButton>
          <LinkButton
            href={BLOG_LANDING_HERO.secondaryHref}
            variant="outline"
            fullWidth
            className="service-detail-hero-mobile__cta-secondary"
          >
            {BLOG_LANDING_HERO.secondaryCta}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
