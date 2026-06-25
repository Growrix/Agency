import Link from "next/link";
import {
  BriefcaseIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { CONTACT_EXPLORE } from "@/lib/contact-landing-content";

const EXPLORE_ICONS = {
  Portfolio: BriefcaseIcon,
  Services: Squares2X2Icon,
  "Digital Products": ShoppingBagIcon,
  "Field Notes": DocumentTextIcon,
} as const;

export function ContactExploreMobile() {
  return (
    <div className="home-mobile-marketing contact-explore-mobile">
      <MobileMarketingSectionHeader
        eyebrow={CONTACT_EXPLORE.eyebrow}
        titleLead={CONTACT_EXPLORE.titleLead}
        titleAccent={CONTACT_EXPLORE.titleAccent}
        description={CONTACT_EXPLORE.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack">
        {CONTACT_EXPLORE.cards.map((card) => {
          const Icon = EXPLORE_ICONS[card.title as keyof typeof EXPLORE_ICONS] ?? ChevronRightIcon;

          return (
            <Link key={card.title} href={card.href} className="contact-channels-mobile__trigger">
              <article className="contact-channels-mobile__card">
                <div className="contact-channels-mobile__card-head">
                  <span className="contact-channels-mobile__card-icon" aria-hidden>
                    <Icon className="contact-channels-mobile__card-icon-glyph" />
                  </span>
                </div>
                <h3 className="contact-channels-mobile__card-title">{card.title}</h3>
                <p className="contact-channels-mobile__card-description">{card.description}</p>
                <p className="contact-channels-mobile__card-action">
                  Explore
                  <ChevronRightIcon className="contact-channels-mobile__card-action-icon" aria-hidden />
                </p>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
