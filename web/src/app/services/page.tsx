import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon, BoltIcon, CheckIcon, CodeBracketSquareIcon, CpuChipIcon, WindowIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Badge } from "@/components/primitives/Badge";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonial } from "@/components/sections/Testimonial";
import { Accordion } from "@/components/sections/Accordion";
import { CTABand } from "@/components/sections/CTABand";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CLIENT_LOGOS, FAQ_GENERAL, PROCESS_STEPS, SERVICES, TESTIMONIALS } from "@/lib/content";
import { WHATSAPP_HREF } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Web Development Services | SaaS Apps, Websites, MCP Servers, Automation",
  description:
    "Compare the agency's service offerings and choose the right path for custom SaaS, websites, MCP servers, and automation.",
};

const SERVICE_ICONS = {
  "saas-applications": CodeBracketSquareIcon,
  websites: WindowIcon,
  "mcp-servers": CpuChipIcon,
  automation: BoltIcon,
} as const;

const COMPARISON = [
  { label: "Goal", values: ["Build a SaaS product", "Launch or rebuild a site", "Connect AI to systems", "Remove manual work"] },
  { label: "Complexity", values: ["High", "Medium", "Medium–High", "Low–Medium"] },
  { label: "Timeline", values: ["8–24 weeks", "4–10 weeks", "3–12 weeks", "2–8 weeks"] },
  { label: "Maintenance", values: ["Ongoing", "Optional retainer", "Recommended", "Lightweight"] },
  { label: "Best fit", values: ["Founders & product teams", "Brands & operators", "AI & platform teams", "Operations teams"] },
];

const STACK = [
  "Next.js", "React", "TypeScript", "Tailwind", "Node", "Postgres", "Stripe", "OpenAI", "Anthropic", "Supabase", "Vercel", "Cloudflare", "Zapier", "Linear", "Sentry", "PostHog",
];

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <Container>
          <div className="max-w-3xl">
            <Badge tone="primary" dot>Services</Badge>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance">
              The capability map for ambitious teams.
            </h1>
            <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-7">
              Four sharp practices, one studio operating model. Pick the engagement that fits your problem — or talk to us and we&apos;ll help you choose.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/book-appointment" size="lg">Discuss My Project</LinkButton>
              <LinkButton href="#compare" variant="outline" size="lg">Compare services</LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {SERVICES.map((s) => {
              const Icon = SERVICE_ICONS[s.slug as keyof typeof SERVICE_ICONS];
              return (
                <Link key={s.slug} href={`/services/${s.slug}`} className="group">
                  <Card hoverable className="h-full">
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex size-11 items-center justify-center rounded-[12px] bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                        <Icon className="size-5" />
                      </div>
                      <Badge tone="neutral">{s.timeline}</Badge>
                    </div>
                    <h3 className="mt-5 font-display text-2xl tracking-tight">{s.name}</h3>
                    <p className="mt-2 text-[var(--color-text-muted)] leading-7 text-pretty">{s.long}</p>
                    <ul className="mt-5 grid grid-cols-2 gap-2">
                      {s.pillars.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-sm">
                          <CheckIcon className="size-4 text-[var(--color-primary)]" /> {p}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2 transition-all">
                      Explore {s.name.toLowerCase()} <ArrowUpRightIcon className="size-4" />
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section id="compare" tone="inset">
        <Container>
          <SectionHeading eyebrow="Decision matrix" title="Choose by goal, not by feature list." />
          <div className="mt-10 overflow-hidden rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--color-inset)]/60">
                <tr>
                  <th className="px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]"> </th>
                  {SERVICES.map((s) => (
                    <th key={s.slug} className="px-5 py-4 font-display text-base tracking-tight">
                      <Link href={`/services/${s.slug}`} className="hover:text-[var(--color-primary)]">
                        {s.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.label} className="border-t border-[var(--color-border)]">
                    <td className="px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] align-top">
                      {row.label}
                    </td>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-5 py-4 align-top">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Delivery system" title="Discovery to optimization, in four phases." />
          <div className="mt-10">
            <ProcessSteps steps={PROCESS_STEPS} />
          </div>
        </Container>
      </Section>

      <Section tone="inset" className="py-16">
        <Container>
          <SectionHeading
            eyebrow="Stack & integrations"
            title="Modern, boring, and well-chosen."
            description="We pick tools that survive a changeover, not the framework of the week."
            align="center"
          />
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {STACK.map((s) => (
              <span
                key={s}
                className="font-mono text-sm rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-1.5"
              >
                {s}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      <TrustStrip items={CLIENT_LOGOS} />

      <Section>
        <Container>
          <SectionHeading eyebrow="Proof" title="One voice from each practice." />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Testimonial key={t.author} data={t} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="inset">
        <Container width="reading">
          <SectionHeading eyebrow="FAQ" title="Common questions before scoping." align="center" />
          <div className="mt-10">
            <Accordion items={FAQ_GENERAL.slice(0, 5)} />
          </div>
        </Container>
      </Section>

      <CTABand
        title="Choose a service or talk it through."
        description="If you&apos;re not sure which engagement fits, our concierge or a 30-minute call will resolve it fast."
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "Open WhatsApp", href: WHATSAPP_HREF }}
      />
    </>
  );
}
