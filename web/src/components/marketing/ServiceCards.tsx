import Link from "next/link";
import {
  ArrowUpRightIcon,
  BoltIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassCircleIcon,
  SparklesIcon,
  WindowIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { FeatureCard } from "@/components/sections/FeatureCard";
import type { PublicServiceRecord } from "@/server/domain/catalog";
import { HOME_SERVICES_COPY, HOME_SERVICE_OUTCOME_DESCRIPTIONS } from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import { HERO_TITLE_CLASS } from "@/lib/typography";

const ICONS: Record<string, typeof WindowIcon> = {
  websites: WindowIcon,
  "saas-applications": CodeBracketSquareIcon,
  "mobile-apps": DevicePhoneMobileIcon,
  automation: BoltIcon,
  "technical-seo": MagnifyingGlassCircleIcon,
  "template-customization": WrenchScrewdriverIcon,
};

const HIGHLIGHT_SLUGS = [
  "websites",
  "saas-applications",
  "mobile-apps",
  "automation",
  "technical-seo",
  "template-customization",
] as const;

export function ServiceCards({ services }: { services: PublicServiceRecord[] }) {
  const bySlug = new Map(services.map((service) => [service.slug, service]));
  const ordered = HIGHLIGHT_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (service): service is PublicServiceRecord => Boolean(service),
  );

  const shell = homeSection("services");

  return (
    <Section {...shell}>
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={HOME_SERVICES_COPY.eyebrow}
            title={HOME_SERVICES_COPY.title}
            description={HOME_SERVICES_COPY.description}
            titleClassName={HERO_TITLE_CLASS}
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            Compare all services <ArrowUpRightIcon className="size-4" />
          </Link>
        </div>
        <RevealGroup className="mt-10 grid auto-rows-fr items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {ordered.map((service) => {
            const Icon = ICONS[service.slug] ?? SparklesIcon;
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
      </Container>
    </Section>
  );
}
