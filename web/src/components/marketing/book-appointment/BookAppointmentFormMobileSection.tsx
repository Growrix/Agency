import type { ReactNode } from "react";
import { Card } from "@/components/primitives/Card";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { BOOK_APPOINTMENT_FORM } from "@/lib/book-appointment-landing-content";

type BookAppointmentFormMobileSectionProps = {
  timezone: string;
  children: ReactNode;
};

export function BookAppointmentFormMobileSection({ timezone, children }: BookAppointmentFormMobileSectionProps) {
  return (
    <div className="home-mobile-marketing contact-form-mobile">
      <MobileMarketingSectionHeader
        eyebrow={BOOK_APPOINTMENT_FORM.eyebrow}
        titleLead="Choose a time and"
        titleAccent="share your context."
        description={BOOK_APPOINTMENT_FORM.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <Card className="contact-form-mobile__trust">
        <p className="contact-form-mobile__trust-label">{BOOK_APPOINTMENT_FORM.trustHeading}</p>
        <p className="contact-form-mobile__trust-copy">{BOOK_APPOINTMENT_FORM.trustCopy}</p>
      </Card>

      <Card className="contact-form-mobile__fit">
        <p className="contact-form-mobile__trust-label">{BOOK_APPOINTMENT_FORM.timezoneLabel}</p>
        <p className="contact-form-mobile__fit-item">{timezone}</p>
      </Card>

      {children}
    </div>
  );
}
