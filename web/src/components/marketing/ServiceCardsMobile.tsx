import Link from "next/link";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import type { PublicServiceRecord } from "@/server/domain/catalog";
import { HOME_SERVICES_COPY, HOME_SERVICE_OUTCOME_DESCRIPTIONS } from "@/lib/home-conversion-content";
import { HOME_SERVICE_ICONS } from "@/lib/home-services";
import { MobileMarketingAccentTitle } from "@/components/marketing/mobile/MobileMarketingAccentTitle";
import { SERVICES_MOBILE_TITLE_CLASS } from "@/lib/typography";

type ServiceCardsMobileProps = {
  services: PublicServiceRecord[];
};

export function ServiceCardsMobile({ services }: ServiceCardsMobileProps) {
  return (
    <div className="home-services-mobile w-full">
      <header className="home-services-mobile__header">
        <div className="home-services-mobile__badge-wrap">
          <Badge tone="primary" dot className="home-services-mobile__badge">
            {HOME_SERVICES_COPY.eyebrow}
          </Badge>
        </div>

        <h2 className={SERVICES_MOBILE_TITLE_CLASS}>
          <MobileMarketingAccentTitle
            lead={HOME_SERVICES_COPY.titleLead}
            accent={HOME_SERVICES_COPY.titleAccent}
          />
        </h2>

        <p className="home-services-mobile__description">{HOME_SERVICES_COPY.description}</p>

        <LinkButton
          href={HOME_SERVICES_COPY.compareCtaHref}
          variant="outline"
          fullWidth
          className="home-services-mobile__cta"
        >
          <span className="home-services-mobile__cta-inner">
            <span className="home-services-mobile__cta-label">{HOME_SERVICES_COPY.compareCta}</span>
            <ArrowRightIcon className="home-services-mobile__cta-icon" aria-hidden />
          </span>
        </LinkButton>
      </header>

      <RevealGroup className="home-services-mobile__cards" stagger={0.06}>
        {services.map((service) => {
          const Icon = HOME_SERVICE_ICONS[service.slug] ?? SparklesIcon;
          const description =
            HOME_SERVICE_OUTCOME_DESCRIPTIONS[service.slug] ?? service.short_description;

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
                  <span className="home-services-mobile__card-description">{description}</span>
                  {service.delivery_timeline && (
                    <span className="home-services-mobile__card-meta">
                      <ClockIcon className="home-services-mobile__card-meta-icon" aria-hidden />
                      <span className="home-services-mobile__card-meta-label">
                        {service.delivery_timeline}
                      </span>
                    </span>
                  )}
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
