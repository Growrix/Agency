import Link from "next/link";
import {
  ArrowRightIcon,
  Cog6ToothIcon,
  CubeIcon,
  GlobeAltIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { CONTACT_ROUTES } from "@/lib/contact-landing-content";

const ROUTE_ICONS = {
  "I Need A Website": GlobeAltIcon,
  "I Need A Product": CubeIcon,
  "I Need Better Operations": Cog6ToothIcon,
  "I Need More Visibility": MagnifyingGlassCircleIcon,
} as const;

export function ContactRoutesMobile() {
  return (
    <div className="home-mobile-marketing contact-routes-mobile">
      <MobileMarketingSectionHeader
        eyebrow={CONTACT_ROUTES.eyebrow}
        titleLead={CONTACT_ROUTES.titleLead}
        titleAccent={CONTACT_ROUTES.titleAccent}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack">
        {CONTACT_ROUTES.cards.map((card) => {
          const Icon = ROUTE_ICONS[card.title as keyof typeof ROUTE_ICONS] ?? GlobeAltIcon;

          return (
            <Link key={card.title} href={card.cta.href} className="contact-channels-mobile__trigger">
              <article className="contact-channels-mobile__card">
                <div className="contact-channels-mobile__card-head">
                  <span className="contact-channels-mobile__card-icon" aria-hidden>
                    <Icon className="contact-channels-mobile__card-icon-glyph" />
                  </span>
                </div>
                <h3 className="contact-channels-mobile__card-title">{card.title}</h3>
                <p className="contact-channels-mobile__card-description">{card.description}</p>
                <p className="contact-channels-mobile__card-action">
                  {card.cta.label}
                  <ArrowRightIcon className="contact-channels-mobile__card-action-icon" aria-hidden />
                </p>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
