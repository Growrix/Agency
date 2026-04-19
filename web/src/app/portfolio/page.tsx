"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Testimonial } from "@/components/sections/Testimonial";
import { CTABand } from "@/components/sections/CTABand";
import { StatBlock } from "@/components/sections/StatBlock";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CLIENT_LOGOS, PORTFOLIO, SERVICES, TESTIMONIALS } from "@/lib/content";
import { WHATSAPP_HREF } from "@/lib/nav";
import { cn } from "@/lib/utils";

const FILTERS = [
  { label: "All work", value: "all" },
  ...SERVICES.map((s) => ({ label: s.name, value: s.slug })),
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState<string>("all");
  const [q, setQ] = useState("");

  const filtered = PORTFOLIO.filter((p) => {
    if (filter !== "all" && p.service !== filter) return false;
    if (q && !`${p.name} ${p.industry} ${p.summary}`.toLowerCase().includes(q.toLowerCase())) return false;
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
            <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-7">
              A filterable showcase of products, websites, MCP integrations, and automations we&apos;ve shipped recently.
            </p>
          </div>
          <div className="mt-12">
            <StatBlock
              stats={[
                { value: "47", label: "Total projects" },
                { value: "12", label: "Sites (12mo)" },
                { value: "12+", label: "MCPs shipped" },
                { value: "98", label: "NPS" },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section className="py-8" tone="inset">
        <Container>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium border transition-colors",
                    filter === f.value
                      ? "bg-[var(--color-primary)] text-[var(--color-surface)] border-[var(--color-primary)]"
                      : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative max-w-sm w-full">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--color-text-muted)]" aria-hidden />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search projects, industries…"
                className="w-full h-11 rounded-[12px] border border-[var(--color-border)] bg-[var(--color-surface)] pl-9 pr-9 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] outline-none"
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                >
                  <XMarkIcon className="size-4" />
                </button>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-16">
        <Container>
          {filtered.length === 0 ? (
            <div className="rounded-[16px] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)] p-12 text-center">
              <p className="font-display text-xl tracking-tight">No projects match those filters.</p>
              <p className="mt-2 text-[var(--color-text-muted)]">Try clearing search or selecting a different practice.</p>
              <button
                onClick={() => {
                  setFilter("all");
                  setQ("");
                }}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)]"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <Link
                  key={p.slug}
                  href={`/portfolio/${p.slug}`}
                  className="group block rounded-[20px] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-[var(--shadow-2)] transition-all"
                >
                  <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.accent}`}>
                    <div className="absolute inset-0 bg-grid-strong opacity-20" aria-hidden />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-black/30 backdrop-blur px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white">
                        {SERVICES.find((s) => s.slug === p.service)?.name ?? "Project"}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-end p-5 text-white">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-wider opacity-80">{p.industry}</p>
                        <p className="font-display text-xl tracking-tight mt-1">{p.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-[var(--color-text-muted)] leading-6 text-pretty">{p.summary}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-primary)]">
                        {p.metric}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2 transition-all">
                        Case study <ArrowUpRightIcon className="size-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <TrustStrip items={CLIENT_LOGOS} />

      <Section>
        <Container>
          <SectionHeading eyebrow="Voices" title="What clients say after launch." />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Testimonial key={t.author} data={t} />
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        title="See something close to what you need? Let's build yours."
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "WhatsApp us", href: WHATSAPP_HREF }}
      />
    </>
  );
}
