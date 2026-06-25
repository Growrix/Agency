import Link from "next/link";
import type { ReactNode } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { CONTACT_FORM } from "@/lib/contact-landing-content";

type ContactFormMobileSectionProps = {
  children: ReactNode;
};

export function ContactFormMobileSection({ children }: ContactFormMobileSectionProps) {
  return (
    <div className="home-mobile-marketing contact-form-mobile">
      <MobileMarketingSectionHeader
        eyebrow={CONTACT_FORM.eyebrow}
        titleLead={CONTACT_FORM.titleLead}
        titleAccent={CONTACT_FORM.titleAccent}
        description={CONTACT_FORM.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <Card className="contact-form-mobile__trust">
        <p className="contact-form-mobile__trust-label">{CONTACT_FORM.trustHeading}</p>
        <p className="contact-form-mobile__trust-copy">
          {CONTACT_FORM.trustCopy}{" "}
          See our{" "}
          <Link href="/privacy-policy" className="text-primary underline">
            privacy policy
          </Link>
          .
        </p>
      </Card>

      <Card className="contact-form-mobile__fit">
        <p className="contact-form-mobile__trust-label">{CONTACT_FORM.projectFitHeading}</p>
        <ul className="contact-form-mobile__fit-list">
          {CONTACT_FORM.projectFitItems.map((item) => (
            <li key={item} className="contact-form-mobile__fit-item">
              <CheckIcon className="contact-form-mobile__fit-icon" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </Card>

      {children}
    </div>
  );
}
