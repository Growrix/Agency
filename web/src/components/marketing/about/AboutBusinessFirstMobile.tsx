import { CheckIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { ABOUT_BUSINESS_FIRST_SECTION } from "@/lib/about-landing-content";

export function AboutBusinessFirstMobile() {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={ABOUT_BUSINESS_FIRST_SECTION.eyebrow}
        titleLead={ABOUT_BUSINESS_FIRST_SECTION.titleLead}
        titleAccent={ABOUT_BUSINESS_FIRST_SECTION.titleAccent}
        description={ABOUT_BUSINESS_FIRST_SECTION.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <article className="about-business-first-mobile__card">
        <h3 className="about-business-first-mobile__card-title">{ABOUT_BUSINESS_FIRST_SECTION.cardTitle}</h3>

        <ul className="about-business-first-mobile__bullets">
          {ABOUT_BUSINESS_FIRST_SECTION.bullets.map((bullet) => (
            <li key={bullet} className="about-business-first-mobile__bullet">
              <CheckIcon className="about-business-first-mobile__bullet-icon" aria-hidden />
              {bullet}
            </li>
          ))}
        </ul>

        <div className="about-business-first-mobile__cta">
          <LinkButton href={ABOUT_BUSINESS_FIRST_SECTION.cta.href} fullWidth>
            {ABOUT_BUSINESS_FIRST_SECTION.cta.label}
          </LinkButton>
        </div>
      </article>
    </div>
  );
}
