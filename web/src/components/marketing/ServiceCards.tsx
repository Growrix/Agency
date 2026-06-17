import Link from "next/link";
import {
  ArrowUpRightIcon,
  BoltIcon,
  CodeBracketSquareIcon,
  CpuChipIcon,
  DocumentTextIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { FeatureCard } from "@/components/sections/FeatureCard";
import type { PublicServiceRecord } from "@/server/domain/catalog";

const ICONS: Record<string, typeof WindowIcon> = {
  "template-customization": WrenchScrewdriverIcon,
  "saas-applications": CodeBracketSquareIcon,
  websites: WindowIcon,
  "html-business-profiles": DocumentTextIcon,
  "mcp-servers": CpuChipIcon,
  automation: BoltIcon,
};

const HIGHLIGHT_SLUGS = ["template-customization", "websites", "saas-applications", "html-business-profiles"] as const;

export function ServiceCards({ services }: { services: PublicServiceRecord[] }) {
  const bySlug = new Map(services.map((service) => [service.slug, service]));
  const ordered = [
    ...HIGHLIGHT_SLUGS.map((slug) => bySlug.get(slug)).filter((service): service is PublicServiceRecord => Boolean(service)),
    ...services.filter((service) => !HIGHLIGHT_SLUGS.includes(service.slug as (typeof HIGHLIGHT_SLUGS)[number])),
  ].slice(0, 5);

  return (
    <Section size="standard" layout="viewport" tone="inset">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Services"
            title="Need more than a download? We implement and scale."
            description="Products create the entry point. Services turn buyers into launched businesses — customization, full builds, MCP, and automation when your roadmap needs it."
          />
          <Link
            href="/services"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            Compare all services <ArrowUpRightIcon className="size-4" />
          </Link>
        </div>
        <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {ordered.map((service) => {
            const Icon = ICONS[service.slug] ?? SparklesIcon;
            const isFeatured = service.slug === "template-customization";
            return (
              <RevealItem key={service.slug} className="h-full">
                <div className="relative h-full">
                  {isFeatured ? (
                    <Badge tone="primary" className="absolute -top-2 left-4 z-10">
                      Product upsell
                    </Badge>
                  ) : null}
                  <FeatureCard
                    href={`/services/${service.slug}`}
                    icon={<Icon className="size-5" />}
                    title={service.title}
                    description={service.short_description}
                    meta={service.delivery_timeline}
                    className={isFeatured ? "border-primary/30 bg-primary/5" : undefined}
                  />
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
