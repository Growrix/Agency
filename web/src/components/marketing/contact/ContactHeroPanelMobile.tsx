import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import { CONTACT_HERO_PANEL } from "@/lib/contact-landing-content";

export function ContactHeroPanelMobile() {
  return (
    <div className="services-landing-hero-mobile__ecosystem contact-hero-mobile__panel">
      <p className="services-landing-hero-mobile__ecosystem-label">{CONTACT_HERO_PANEL.heading}</p>

      <dl className="contact-hero-mobile__stats">
        <div className="contact-hero-mobile__stat">
          <dt className="contact-hero-mobile__stat-label">{CONTACT_HERO_PANEL.responseTime.label}</dt>
          <dd className="contact-hero-mobile__stat-value">
            <ClockIcon className="contact-hero-mobile__stat-icon" aria-hidden />
            {CONTACT_HERO_PANEL.responseTime.value}
          </dd>
        </div>
        <div className="contact-hero-mobile__stat">
          <dt className="contact-hero-mobile__stat-label">{CONTACT_HERO_PANEL.discoveryCalls.label}</dt>
          <dd className="contact-hero-mobile__stat-value contact-hero-mobile__stat-value--plain">
            {CONTACT_HERO_PANEL.discoveryCalls.value}
          </dd>
        </div>
      </dl>

      <div className="investment-guide-hero-mobile__divider" aria-hidden />

      <p className="services-landing-hero-mobile__ecosystem-label">{CONTACT_HERO_PANEL.servicesEyebrow}</p>
      <ul className="contact-hero-mobile__chip-grid">
        {CONTACT_HERO_PANEL.services.map((item) => (
          <li key={item} className="contact-hero-mobile__chip">
            <CheckIcon className="contact-hero-mobile__chip-icon" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <div className="investment-guide-hero-mobile__divider" aria-hidden />

      <p className="services-landing-hero-mobile__ecosystem-label">{CONTACT_HERO_PANEL.projectTypesEyebrow}</p>
      <ul className="contact-hero-mobile__chip-grid">
        {CONTACT_HERO_PANEL.projectTypes.map((item) => (
          <li key={item} className="contact-hero-mobile__chip">
            <CheckIcon className="contact-hero-mobile__chip-icon" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
