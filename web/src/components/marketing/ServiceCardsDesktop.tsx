import Link from "next/link";
import { ArrowUpRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { FeatureCard } from "@/components/sections/FeatureCard";
import type { PublicServiceRecord } from "@/server/domain/catalog";
import { HOME_SERVICES_COPY, HOME_SERVICE_OUTCOME_DESCRIPTIONS } from "@/lib/home-conversion-content";
import { HOME_SERVICE_ICONS } from "@/lib/home-services";
import { HERO_TITLE_CLASS } from "@/lib/typography";

type ServiceCardsDesktopProps = {
  services: PublicServiceRecord[];
};

export function ServiceCardsDesktop({ services }: ServiceCardsDesktopProps) {
  return (
    <>
      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading
          eyebrow={HOME_SERVICES_COPY.eyebrow}
          title={HOME_SERVICES_COPY.title}
          titleLead={HOME_SERVICES_COPY.titleLead}
          titleAccent={HOME_SERVICES_COPY.titleAccent}
          description={HOME_SERVICES_COPY.description}
          titleClassName={HERO_TITLE_CLASS}
        />
        <Link
          href={HOME_SERVICES_COPY.compareCtaHref}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary"
        >
          {HOME_SERVICES_COPY.compareCta} <ArrowUpRightIcon className="size-4" />
        </Link>
      </div>
      <RevealGroup className="mt-10 grid auto-rows-fr items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {services.map((service) => {
          const Icon = HOME_SERVICE_ICONS[service.slug] ?? SparklesIcon;
          return (
            <RevealItem key={service.slug} className="flex h-full min-h-0">
              <FeatureCard
                className="w-full"
                href={`/services/${service.slug}`}
                icon={<Icon className="size-5" />}
                title={service.title}
                description={
                  HOME_SERVICE_OUTCOME_DESCRIPTIONS[service.slug] ?? service.short_description
                }
                meta={service.delivery_timeline}
              />
            </RevealItem>
          );
        })}
      </RevealGroup>
    </>
  );
}
