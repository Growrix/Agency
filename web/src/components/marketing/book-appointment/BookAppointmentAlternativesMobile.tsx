"use client";

import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { BOOK_APPOINTMENT_ALTERNATIVES } from "@/lib/book-appointment-landing-content";
import { WHATSAPP_HREF } from "@/lib/nav";

type BookAppointmentAlternativesMobileProps = {
  onOpenConcierge: (prompt?: string) => void;
};

export function BookAppointmentAlternativesMobile({ onOpenConcierge }: BookAppointmentAlternativesMobileProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={BOOK_APPOINTMENT_ALTERNATIVES.eyebrow}
        titleLead={BOOK_APPOINTMENT_ALTERNATIVES.titleLead}
        titleAccent={BOOK_APPOINTMENT_ALTERNATIVES.titleAccent}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack">
        {BOOK_APPOINTMENT_ALTERNATIVES.cards.map((card) => {
          const body = (
            <article className="contact-channels-mobile__card">
              <h3 className="contact-channels-mobile__card-title">{card.title}</h3>
              <p className="contact-channels-mobile__card-description">{card.description}</p>
              <p className="contact-channels-mobile__card-action">
                {card.cta}
                <ChevronRightIcon className="contact-channels-mobile__card-action-icon" aria-hidden />
              </p>
            </article>
          );

          if (card.href === "concierge") {
            return (
              <button
                key={card.title}
                type="button"
                onClick={() => onOpenConcierge("Help me prepare for a discovery call.")}
                className="contact-channels-mobile__trigger"
              >
                {body}
              </button>
            );
          }

          const href = card.href === "whatsapp" ? WHATSAPP_HREF : card.href;

          return (
            <Link key={card.title} href={href} className="contact-channels-mobile__trigger">
              {body}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
