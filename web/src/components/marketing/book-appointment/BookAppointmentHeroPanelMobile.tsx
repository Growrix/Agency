import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import { BOOK_APPOINTMENT_HERO_PANEL } from "@/lib/book-appointment-landing-content";

export function BookAppointmentHeroPanelMobile() {
  return (
    <div className="services-landing-hero-mobile__ecosystem contact-hero-mobile__panel">
      <p className="services-landing-hero-mobile__ecosystem-label">{BOOK_APPOINTMENT_HERO_PANEL.heading}</p>

      <dl className="contact-hero-mobile__stats">
        <div className="contact-hero-mobile__stat">
          <dt className="contact-hero-mobile__stat-label">{BOOK_APPOINTMENT_HERO_PANEL.duration.label}</dt>
          <dd className="contact-hero-mobile__stat-value">
            <ClockIcon className="contact-hero-mobile__stat-icon" aria-hidden />
            {BOOK_APPOINTMENT_HERO_PANEL.duration.value}
          </dd>
        </div>
        <div className="contact-hero-mobile__stat">
          <dt className="contact-hero-mobile__stat-label">{BOOK_APPOINTMENT_HERO_PANEL.confirmation.label}</dt>
          <dd className="contact-hero-mobile__stat-value contact-hero-mobile__stat-value--plain">
            {BOOK_APPOINTMENT_HERO_PANEL.confirmation.value}
          </dd>
        </div>
      </dl>

      <div className="investment-guide-hero-mobile__divider" aria-hidden />

      <p className="services-landing-hero-mobile__ecosystem-label">{BOOK_APPOINTMENT_HERO_PANEL.bestForEyebrow}</p>
      <ul className="contact-hero-mobile__chip-grid">
        {BOOK_APPOINTMENT_HERO_PANEL.bestFor.map((item) => (
          <li key={item} className="contact-hero-mobile__chip">
            <CheckIcon className="contact-hero-mobile__chip-icon" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <div className="investment-guide-hero-mobile__divider" aria-hidden />

      <p className="services-landing-hero-mobile__ecosystem-label">{BOOK_APPOINTMENT_HERO_PANEL.bringEyebrow}</p>
      <ul className="contact-hero-mobile__chip-grid">
        {BOOK_APPOINTMENT_HERO_PANEL.bring.map((item) => (
          <li key={item} className="contact-hero-mobile__chip">
            <CheckIcon className="contact-hero-mobile__chip-icon" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <div className="investment-guide-hero-mobile__divider" aria-hidden />

      <p className="services-landing-hero-mobile__ecosystem-label">{BOOK_APPOINTMENT_HERO_PANEL.servicesEyebrow}</p>
      <ul className="contact-hero-mobile__chip-grid">
        {BOOK_APPOINTMENT_HERO_PANEL.services.map((item) => (
          <li key={item} className="contact-hero-mobile__chip">
            <CheckIcon className="contact-hero-mobile__chip-icon" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
