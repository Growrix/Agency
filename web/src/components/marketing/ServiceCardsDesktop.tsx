import Link from "next/link";
import { ArrowUpRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { HomeServicesDesktopStatsBar } from "@/components/marketing/desktop/HomeServicesDesktopStatsBar";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import type { PublicServiceRecord } from "@/server/domain/catalog";
import { HOME_SERVICES_COPY, HOME_SERVICE_OUTCOME_DESCRIPTIONS } from "@/lib/home-conversion-content";
import { HOME_SERVICE_ICONS } from "@/lib/home-services";
import { HERO_TITLE_CLASS } from "@/lib/typography";

type ServiceCardsDesktopProps = {
  services: PublicServiceRecord[];
};

export function ServiceCardsDesktop({ services }: ServiceCardsDesktopProps) {
  return (
    <div className="home-services-desktop">
      <div className="home-services-desktop__header">
        <SectionHeading
          eyebrow={HOME_SERVICES_COPY.eyebrow}
          title={HOME_SERVICES_COPY.title}
          titleLead={HOME_SERVICES_COPY.titleLead}
          titleAccent={HOME_SERVICES_COPY.titleAccent}
          description={HOME_SERVICES_COPY.description}
          titleClassName={HERO_TITLE_CLASS}
          className="home-services-desktop__heading"
        />
        <Link
          href={HOME_SERVICES_COPY.compareCtaHref}
          className="home-services-desktop__compare-link"
        >
          {HOME_SERVICES_COPY.compareCta}
          <ArrowUpRightIcon className="size-4" aria-hidden />
        </Link>
      </div>

      <RevealGroup className="home-services-desktop__grid" stagger={0.06}>
        {services.map((service) => {
          const Icon = HOME_SERVICE_ICONS[service.slug] ?? SparklesIcon;
          const description =
            HOME_SERVICE_OUTCOME_DESCRIPTIONS[service.slug] ?? service.short_description;

          return (
            <RevealItem key={service.slug} className="h-full min-h-0">
              <Link href={`/services/${service.slug}`} className="home-services-desktop__card group">
                <span className="home-services-desktop__icon">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="home-services-desktop__card-title">{service.title}</h3>
                <p className="home-services-desktop__card-desc">{description}</p>
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <HomeServicesDesktopStatsBar />
    </div>
  );
}
