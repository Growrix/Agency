import { ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { BookAppointmentHeroPanelMobile } from "@/components/marketing/book-appointment/BookAppointmentHeroPanelMobile";
import { BOOK_APPOINTMENT_HERO } from "@/lib/book-appointment-landing-content";

export function BookAppointmentHeroMobile() {
  return (
    <div className="services-landing-hero-mobile w-full">
      <div className="services-landing-hero-mobile__copy">
        <Badge tone="primary" dot className="service-detail-hero-mobile__badge">
          {BOOK_APPOINTMENT_HERO.eyebrow}
        </Badge>

        <h1 className="service-detail-hero-mobile__title">
          <span className="block">{BOOK_APPOINTMENT_HERO.titleLead}</span>
          <span className="block marketing-title-accent">{BOOK_APPOINTMENT_HERO.titleAccent}</span>
        </h1>

        <p className="service-detail-hero-mobile__description">{BOOK_APPOINTMENT_HERO.description}</p>

        <ul className="marketing-page-hero-mobile__proof-points">
          {BOOK_APPOINTMENT_HERO.proofPoints.map((point) => (
            <li key={point} className="marketing-page-hero-mobile__proof-point">
              <CheckIcon className="marketing-page-hero-mobile__proof-icon" aria-hidden />
              {point}
            </li>
          ))}
        </ul>

        <div className="service-detail-hero-mobile__cta-stack">
          <LinkButton href={BOOK_APPOINTMENT_HERO.primaryHref} fullWidth className="service-detail-hero-mobile__cta-primary">
            <span className="service-detail-hero-mobile__cta-inner">
              {BOOK_APPOINTMENT_HERO.primaryCta}
              <ArrowRightIcon className="service-detail-hero-mobile__cta-icon" aria-hidden />
            </span>
          </LinkButton>
          <LinkButton
            href={BOOK_APPOINTMENT_HERO.secondaryHref}
            variant="outline"
            fullWidth
            className="service-detail-hero-mobile__cta-secondary"
          >
            {BOOK_APPOINTMENT_HERO.secondaryCta}
          </LinkButton>
        </div>
      </div>

      <BookAppointmentHeroPanelMobile />
    </div>
  );
}
