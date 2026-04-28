import {
  ArrowUpRightIcon,
  ChartBarIcon,
  CheckCircleIcon,
  MagnifyingGlassCircleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Badge } from "@/components/primitives/Badge";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { ADDITIONAL_SERVICES_CATEGORIES } from "@/lib/content";

const CATEGORY_ICONS = [
  MagnifyingGlassCircleIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
] as const;

export function AdditionalServices() {
  return (
    <Section tone="inset">
      <Container>
        <SectionHeading
          eyebrow="Additional Services"
          title="Get discovered, tracked, and optimized from day one."
          description="Beyond development, we offer essential services to help your product get discovered, tracked, and optimized from day one."
        />

        <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.08}>
          {ADDITIONAL_SERVICES_CATEGORIES.map((cat, i) => {
            const Icon = CATEGORY_ICONS[i];
            return (
              <RevealItem key={cat.id} className="h-full">
                <Card hoverable className="flex h-full flex-col">
                  {/* Icon + badge row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex size-12 items-center justify-center rounded-[14px] bg-primary/10 text-primary">
                      <Icon className="size-6" aria-hidden />
                    </div>
                    {cat.badge && (
                      <Badge tone="secondary">{cat.badge}</Badge>
                    )}
                  </div>

                  {/* Category title */}
                  <h3 className="mt-5 font-display text-xl tracking-tight">
                    {cat.title}
                  </h3>

                  {/* Divider */}
                  <div className="mt-4 border-t border-border" />

                  {/* Items */}
                  <ul className="mt-4 flex-1 space-y-3">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircleIcon
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden
                        />
                        <span className="text-sm leading-6 text-text-muted">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Footer note */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface">
          <div className="border-l-4 border-primary/60 px-6 py-6 sm:px-8 sm:py-7">
            <p className="text-sm leading-7 text-text-muted">
              These are mostly one-time configurations designed to set a strong
              foundation for your growth.
            </p>
            <p className="mt-3 text-sm leading-7 text-text-muted">
              If you need ongoing SEO, automation, or scaling—we can support
              that as well through{" "}
              <Link
                href="/book-appointment"
                className="font-medium text-primary underline-offset-2 hover:underline"
              >
                custom collaboration
              </Link>
              .
            </p>
            <Link
              href="/additional-services"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              See full additional services details
              <ArrowUpRightIcon className="size-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
