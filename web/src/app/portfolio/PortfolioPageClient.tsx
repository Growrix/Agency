"use client";

import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";
import { CTABand } from "@/components/sections/CTABand";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { StatBlock } from "@/components/sections/StatBlock";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import { SHOW_GOOGLE_REVIEWS } from "@/lib/feature-flags";
import { WHATSAPP_HREF } from "@/lib/nav";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { cn } from "@/lib/utils";
import type { PublicPortfolioRecord } from "@/server/domain/catalog";

type PortfolioPageClientProps = {
  projects: PublicPortfolioRecord[];
  filters: Array<{ label: string; value: string }>;
  stats: Array<{ value: string; label: string; hint?: string }>;
  clientLogos: string[];
};

export function PortfolioPageClient({ projects, filters, stats, clientLogos }: PortfolioPageClientProps) {
  const [filter, setFilter] = useState<string>("all");
  const [q, setQ] = useState("");

  const filtered = projects.filter((project) => {
    if (filter !== "all" && project.service !== filter) {
      return false;
    }

    if (q && !`${project.name} ${project.industry} ${project.summary}`.toLowerCase().includes(q.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <Container>
          <div className="max-w-3xl">
            <Badge tone="primary" dot>Portfolio</Badge>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance">
              Outcomes you can see and metrics you can verify.
            </h1>
            <p className="mt-6 text-lg text-text-muted leading-7">
              A filterable showcase of products, websites, MCP integrations, and automations we&apos;ve shipped recently.
            </p>
          </div>
        </Container>
        <div className="mt-12">
          <StatBlock stats={stats} />
        </div>
      </Section>

      <Section className="py-8" tone="inset">
        <Container>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setFilter(item.value)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium border transition-colors",
                    filter === item.value
                      ? "bg-primary text-surface border-primary"
                      : "bg-surface border-border hover:border-border-strong"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="relative max-w-sm w-full">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" aria-hidden />
              <input
                type="search"
                value={q}
                onChange={(event) => setQ(event.target.value)}
                placeholder="Search projects, industries…"
                className="w-full h-11 rounded-sm border border-border bg-surface pl-9 pr-9 text-sm placeholder:text-text-muted focus:border-primary outline-none"
              />
              {q ? (
                <button
                  onClick={() => setQ("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text"
                >
                  <XMarkIcon className="size-4" />
                </button>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16">
        <Container>
          {filtered.length === 0 ? (
            <div className="rounded-[16px] border border-dashed border-border-strong bg-surface p-12 text-center">
              <p className="font-display text-xl tracking-tight">No projects match those filters.</p>
              <p className="mt-2 text-text-muted">Try clearing search or selecting a different practice.</p>
              <button
                onClick={() => {
                  setFilter("all");
                  setQ("");
                }}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
              {filtered.map((project) => (
                <RevealItem key={project.slug}>
                  <PortfolioCard project={project} />
                </RevealItem>
              ))}
            </RevealGroup>
          )}
        </Container>
      </Section>

      <TrustStrip items={clientLogos} />

      {SHOW_GOOGLE_REVIEWS ? (
        <Section>
          <Container>
            <GoogleReviews
              eyebrow="Voices"
              title="What clients say after launch."
              description="Live Google reviews provide the trust layer across portfolio and proof pages."
            />
          </Container>
        </Section>
      ) : null}

      <CTABand
        title="See something close to what you need? Let's build yours."
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "WhatsApp us", href: WHATSAPP_HREF }}
      />
    </>
  );
}