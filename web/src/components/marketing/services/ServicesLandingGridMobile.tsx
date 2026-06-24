import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import { ChevronRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import type { PublicServiceRecord } from "@/server/domain/catalog";
import {
  SERVICES_LANDING_INTRO,
} from "@/lib/services-landing-content";

type ServicesLandingGridMobileProps = {
  services: PublicServiceRecord[];
  icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>>;
  fitNotes: Record<string, string>;
};

export function ServicesLandingGridMobile({
  services,
  icons,
  fitNotes,
}: ServicesLandingGridMobileProps) {
  return (
    <div className="home-services-mobile w-full">
      <MobileMarketingSectionHeader
        eyebrow={SERVICES_LANDING_INTRO.eyebrow}
        titleLead={SERVICES_LANDING_INTRO.titleLead}
        titleAccent={SERVICES_LANDING_INTRO.titleAccent}
        description={SERVICES_LANDING_INTRO.description}
        align="center"
      />

      <RevealGroup className="home-services-mobile__cards" stagger={0.06}>
        {services.map((service) => {
          const Icon = icons[service.slug] ?? SparklesIcon;
          const fitNote = fitNotes[service.slug] ?? service.short_description;

          return (
            <RevealItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="home-services-mobile__card"
              >
                <span className="home-services-mobile__card-icon" aria-hidden>
                  <Icon className="home-services-mobile__card-icon-glyph" />
                </span>

                <span className="home-services-mobile__card-body">
                  <span className="home-services-mobile__card-title">{service.title}</span>
                  <span className="home-services-mobile__card-description">{fitNote}</span>
                  {service.delivery_timeline ? (
                    <span className="home-services-mobile__card-meta">
                      <span className="home-services-mobile__card-meta-label">
                        {service.delivery_timeline}
                      </span>
                    </span>
                  ) : null}
                </span>

                <span className="home-services-mobile__card-action" aria-hidden>
                  <ChevronRightIcon className="home-services-mobile__card-action-icon" />
                </span>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}
