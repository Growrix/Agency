import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { ContactHeroPanelMobile } from "@/components/marketing/contact/ContactHeroPanelMobile";
import { CONTACT_HERO } from "@/lib/contact-landing-content";
import { WHATSAPP_HREF } from "@/lib/nav";

export function ContactHeroMobile() {
  return (
    <div className="services-landing-hero-mobile w-full">
      <div className="services-landing-hero-mobile__copy">
        <Badge tone="primary" dot className="service-detail-hero-mobile__badge">
          {CONTACT_HERO.eyebrow}
        </Badge>

        <h1 className="service-detail-hero-mobile__title">
          <span className="block">{CONTACT_HERO.titleLead}</span>
          <span className="block marketing-title-accent">{CONTACT_HERO.titleAccent}</span>
        </h1>

        <p className="service-detail-hero-mobile__description">{CONTACT_HERO.description}</p>

        <ul className="marketing-page-hero-mobile__proof-points">
          {CONTACT_HERO.proofPoints.map((point) => (
            <li key={point} className="marketing-page-hero-mobile__proof-point">
              <CheckIcon className="marketing-page-hero-mobile__proof-icon" aria-hidden />
              {point}
            </li>
          ))}
        </ul>

        <div className="service-detail-hero-mobile__cta-stack">
          <LinkButton href="/book-appointment" fullWidth className="service-detail-hero-mobile__cta-primary">
            <span className="service-detail-hero-mobile__cta-inner">
              Book a Call
              <ArrowRightIcon className="service-detail-hero-mobile__cta-icon" aria-hidden />
            </span>
          </LinkButton>
          <LinkButton href={WHATSAPP_HREF} variant="outline" fullWidth className="service-detail-hero-mobile__cta-secondary">
            WhatsApp us
          </LinkButton>
        </div>
      </div>

      <ContactHeroPanelMobile />
    </div>
  );
}
