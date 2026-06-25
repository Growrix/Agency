"use client";

import Link from "next/link";
import {
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ChevronRightIcon,
  PaperAirplaneIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { CONTACT_CHANNELS } from "@/lib/contact-landing-content";
import { WHATSAPP_HREF } from "@/lib/nav";
import { cn } from "@/lib/utils";

const CHANNEL_ICONS = {
  "Project Inquiry": PaperAirplaneIcon,
  WhatsApp: ChatBubbleLeftRightIcon,
  "Instant Answers": SparklesIcon,
  "Book A Call": CalendarDaysIcon,
} as const;

type ContactChannelsMobileProps = {
  onOpenConcierge: () => void;
};

export function ContactChannelsMobile({ onOpenConcierge }: ContactChannelsMobileProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={CONTACT_CHANNELS.eyebrow}
        titleLead={CONTACT_CHANNELS.titleLead}
        titleAccent={CONTACT_CHANNELS.titleAccent}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack">
        {CONTACT_CHANNELS.items.map((channel) => {
          const Icon = CHANNEL_ICONS[channel.name as keyof typeof CHANNEL_ICONS] ?? PaperAirplaneIcon;
          const isHotline = "hotline" in channel && Boolean(channel.hotline);
          const isRecommended = "recommended" in channel && Boolean(channel.recommended);

          const card = (
            <article
              className={cn(
                "contact-channels-mobile__card",
                isHotline && "contact-channels-mobile__card--hotline",
                isRecommended && "contact-channels-mobile__card--recommended",
              )}
            >
              <div className="contact-channels-mobile__card-head">
                <span
                  className={cn(
                    "contact-channels-mobile__card-icon",
                    isHotline && "contact-channels-mobile__card-icon--hotline",
                  )}
                  aria-hidden
                >
                  <Icon className="contact-channels-mobile__card-icon-glyph" />
                </span>
                {isHotline ? (
                  <Badge tone="success">Hotline</Badge>
                ) : isRecommended ? (
                  <Badge tone="primary">Recommended</Badge>
                ) : null}
              </div>
              <h3 className="contact-channels-mobile__card-title">{channel.name}</h3>
              <p className="contact-channels-mobile__card-description">{channel.description}</p>
              <p
                className={cn(
                  "contact-channels-mobile__card-action",
                  isHotline && "contact-channels-mobile__card-action--hotline",
                )}
              >
                {channel.action}
                <ChevronRightIcon className="contact-channels-mobile__card-action-icon" aria-hidden />
              </p>
            </article>
          );

          if (channel.href === "concierge") {
            return (
              <button key={channel.name} type="button" onClick={onOpenConcierge} className="contact-channels-mobile__trigger">
                {card}
              </button>
            );
          }

          const href = channel.href === "whatsapp" ? WHATSAPP_HREF : channel.href;

          return (
            <Link key={channel.name} href={href} className="contact-channels-mobile__trigger">
              {card}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
