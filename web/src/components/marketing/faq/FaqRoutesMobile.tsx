"use client";

import Link from "next/link";
import {
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { ConciergeTrigger } from "@/components/ai/ConciergeTrigger";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { WHATSAPP_HREF } from "@/lib/nav";

export function FaqRoutesMobile() {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow="Still stuck"
        titleLead="Pick a"
        titleAccent="faster route."
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack">
        <ConciergeTrigger className="contact-channels-mobile__trigger">
          <article className="contact-channels-mobile__card">
            <SparklesIcon className="size-7 text-primary" aria-hidden />
            <h3 className="contact-channels-mobile__card-title mt-3">AI Growrix OS</h3>
            <p className="contact-channels-mobile__card-action">
              Open concierge
              <ChevronRightIcon className="contact-channels-mobile__card-action-icon" aria-hidden />
            </p>
          </article>
        </ConciergeTrigger>

        <Link href={WHATSAPP_HREF} className="contact-channels-mobile__trigger">
          <article className="contact-channels-mobile__card">
            <ChatBubbleLeftRightIcon className="size-7 text-primary" aria-hidden />
            <h3 className="contact-channels-mobile__card-title mt-3">WhatsApp</h3>
            <p className="contact-channels-mobile__card-action">
              Message us
              <ChevronRightIcon className="contact-channels-mobile__card-action-icon" aria-hidden />
            </p>
          </article>
        </Link>

        <Link href="/book-appointment" className="contact-channels-mobile__trigger">
          <article className="contact-channels-mobile__card">
            <CalendarDaysIcon className="size-7 text-primary" aria-hidden />
            <h3 className="contact-channels-mobile__card-title mt-3">Book a call</h3>
            <p className="contact-channels-mobile__card-action">
              Reserve a slot
              <ChevronRightIcon className="contact-channels-mobile__card-action-icon" aria-hidden />
            </p>
          </article>
        </Link>
      </div>
    </div>
  );
}
