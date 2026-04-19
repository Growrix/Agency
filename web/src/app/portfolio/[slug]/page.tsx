import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Testimonial } from "@/components/sections/Testimonial";
import { CTABand } from "@/components/sections/CTABand";
import { StatBlock } from "@/components/sections/StatBlock";
import { PORTFOLIO, PORTFOLIO_BY_SLUG, SERVICES, TESTIMONIALS } from "@/lib/content";
import { WHATSAPP_HREF } from "@/lib/nav";

export function generateStaticParams() {
  return PORTFOLIO.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PORTFOLIO_BY_SLUG[slug];
  if (!p) return {};
  return {
    title: `${p.name} — Case Study`,
    description: p.summary,
  };
}

const SECTIONS = {
  challenge: [
    "The previous system relied on five disconnected tools, slowing onboarding and obscuring activation signals.",
    "Internal teams used spreadsheets to track operational data, leading to inconsistent decisions and lost time.",
    "Stakeholders needed a single, trustworthy surface to manage the customer lifecycle without engineering bottlenecks.",
  ],
  strategy: [
    "Compressed discovery into a 1-week sprint covering goals, audiences, and constraints.",
    "Designed a domain-driven architecture with clear boundaries between operator, customer, and admin surfaces.",
    "Built a token-based design system with motion discipline and accessibility from the first commit.",
    "Shipped behind feature flags to allow continuous deploys and progressive rollouts.",
  ],
  build: [
    { label: "Frontend", value: "Next.js, React, Tailwind, Radix" },
    { label: "Backend", value: "Node, Postgres, tRPC" },
    { label: "Auth & billing", value: "Stripe, Auth.js" },
    { label: "AI", value: "OpenAI + custom MCP" },
    { label: "Infra", value: "Vercel + Cloudflare" },
    { label: "Observability", value: "Sentry + PostHog" },
  ],
  results: [
    { value: "+182%", label: "Activation rate" },
    { value: "92s", label: "Avg approval" },
    { value: "−38%", label: "No-show rate" },
    { value: "+64%", label: "Demo bookings" },
  ],
};

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PORTFOLIO_BY_SLUG[slug];
  if (!project) notFound();

  const service = SERVICES.find((s) => s.slug === project.service);
  const related = PORTFOLIO.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-12">
        <Container>
          <Link href="/portfolio" className="inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
            ← All projects
          </Link>
          <div className="mt-6 grid gap-12 lg:grid-cols-12 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge tone="primary">{project.industry}</Badge>
                {service && <Badge tone="neutral">{service.name}</Badge>}
              </div>
              <h1 className="mt-5 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance">
                {project.name}
              </h1>
              <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-7 text-pretty">{project.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/book-appointment" size="lg">Build something similar</LinkButton>
                <LinkButton href="/portfolio" variant="outline" size="lg">More work</LinkButton>
              </div>
            </div>
            <div className="lg:col-span-5">
              <Card className="overflow-hidden p-0">
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${project.accent}`}>
                  <div className="absolute inset-0 bg-grid-strong opacity-20" aria-hidden />
                  <div className="absolute inset-0 flex items-end p-6 text-white">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider opacity-80">Outcome</p>
                      <p className="mt-1 font-display text-3xl tracking-tight">{project.metric}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <StatBlock stats={SECTIONS.results} />
        </Container>
      </Section>

      <Section tone="inset">
        <Container width="reading">
          <SectionHeading eyebrow="The challenge" title="What needed to change." />
          <div className="mt-8 space-y-4">
            {SECTIONS.challenge.map((c, i) => (
              <p key={i} className="text-lg leading-7 text-pretty">{c}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="reading">
          <SectionHeading
            eyebrow="Strategy & solution"
            title="Decisions that shaped the build."
            description="The architecture, design system, and product choices that made the rest of the project possible."
          />
          <ul className="mt-10 space-y-5">
            {SECTIONS.strategy.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="shrink-0 size-8 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center font-mono text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg leading-7 text-pretty pt-0.5">{s}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="inset">
        <Container>
          <SectionHeading eyebrow="Build breakdown" title="Stack and modules delivered." />
          <div className="mt-10 grid gap-px overflow-hidden rounded-[16px] border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3">
            {SECTIONS.build.map((b) => (
              <div key={b.label} className="bg-[var(--color-surface)] p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">{b.label}</p>
                <p className="mt-2 font-display text-lg tracking-tight">{b.value}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Experience gallery" title="Surfaces from the live product." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`relative aspect-[16/10] rounded-[20px] overflow-hidden border border-[var(--color-border)] bg-gradient-to-br ${project.accent}`}
              >
                <div className="absolute inset-0 bg-grid-strong opacity-20" aria-hidden />
                <div className="absolute inset-0 flex items-end p-6 text-white">
                  <p className="font-mono text-xs uppercase tracking-wider opacity-80">Screen 0{i}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="inset">
        <Container width="reading">
          <Testimonial
            data={TESTIMONIALS[0]}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <SectionHeading eyebrow="More work" title="Adjacent projects worth a look." />
            <Link href="/portfolio" className="text-sm font-medium text-[var(--color-primary)]">
              View all <ArrowUpRightIcon className="inline size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} href={`/portfolio/${p.slug}`} className="group block rounded-[20px] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-[var(--shadow-2)] transition-all">
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.accent}`}>
                  <div className="absolute inset-0 bg-grid-strong opacity-20" aria-hidden />
                  <div className="absolute inset-0 flex items-end p-5 text-white">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider opacity-80">{p.industry}</p>
                      <p className="font-display text-xl tracking-tight">{p.name}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        eyebrow="Build something similar"
        title={`Want a result like ${project.name}'s?`}
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "Open WhatsApp", href: WHATSAPP_HREF }}
      />
    </>
  );
}

