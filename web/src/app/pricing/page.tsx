import type { Metadata } from "next";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { PricingTier, type Tier } from "@/components/sections/PricingTier";
import { Accordion } from "@/components/sections/Accordion";
import { CTABand } from "@/components/sections/CTABand";
import { StatBlock } from "@/components/sections/StatBlock";
import { WHATSAPP_HREF } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Pricing | Custom Builds, Productized Services, and Digital Products",
  description:
    "Review pricing ranges, engagement models, and value drivers for websites, SaaS products, MCP servers, automation, and digital assets.",
};

const TIERS: Tier[] = [
  {
    name: "Launch Sprint",
    price: "$9.5k",
    cadence: "/ project",
    description: "A 4–6 week sprint to ship a focused website, MCP server, or automation system.",
    features: ["1 surface or system", "Discovery + design + build", "Launch playbook", "30 days post-launch support"],
    cta: { label: "Start a sprint", href: "/book-appointment" },
  },
  {
    name: "Product Partner",
    price: "$14k",
    cadence: "/ month",
    description: "An embedded studio operating as your product team for SaaS, websites, and integrations.",
    features: ["Dedicated lead + designer + engineer", "Continuous shipping", "Quarterly strategy", "Stack ownership"],
    cta: { label: "Plan partnership", href: "/book-appointment" },
    featured: true,
    badge: "Most chosen",
  },
  {
    name: "Productized",
    price: "From $99",
    cadence: "one-time",
    description: "Templates, MCP starters, and automation kits ready to deploy today.",
    features: ["Stripe-powered checkout", "License + updates", "Setup docs", "Optional install help"],
    cta: { label: "Browse the shop", href: "/shop" },
  },
];

const RANGES = [
  { service: "SaaS Applications", range: "$24k – $180k+", note: "MVP sprints to multi-quarter product partnerships." },
  { service: "Websites", range: "$9.5k – $60k", note: "Launch sprints to full redesigns with conversion architecture." },
  { service: "MCP Servers", range: "$249 – $45k", note: "Productized starters to multi-system platform engagements." },
  { service: "Automation", range: "$3.5k – $24k", note: "Audits to full implementation with ongoing optimization." },
];

const SHOP_OFFERS = [
  { name: "Templates", price: "$99 – $189", description: "Designed and engineered site, dashboard, and product templates." },
  { name: "Ready websites", price: "$499 – $1,499", description: "Launch-ready sites for niche industries with content and CMS." },
  { name: "MCP starters", price: "$249 – $799", description: "Production-grade MCP servers you can deploy in an afternoon." },
  { name: "Automation kits", price: "$99 – $399", description: "Inquiry-to-CRM, booking-to-invoicing, support-routing kits." },
];

const COST_DRIVERS = [
  { question: "Project complexity", answer: "Number of surfaces, role types, integrations, and edge cases drives most of the cost." },
  { question: "Integration count", answer: "Each external system adds discovery, design, error handling, and observability work." },
  { question: "Content readiness", answer: "If we produce or curate content, expect added time. With prepared content, projects ship faster." },
  { question: "Timeline pressure", answer: "Compressed timelines require parallel workstreams and senior-only staffing." },
  { question: "Support expectations", answer: "Post-launch retainers are a separate, predictable monthly investment scoped to your needs." },
  { question: "Migration effort", answer: "Replacing existing systems adds data migration, rollout planning, and team training." },
];

const FAQ = [
  { question: "What's the deposit?", answer: "30% on engagement kickoff. Remaining payments are milestone-based across the project." },
  { question: "Can we pay monthly?", answer: "Yes — Product Partner and retainer engagements are monthly. Milestone-based custom work can also be split into monthly invoices." },
  { question: "What about scope changes?", answer: "We re-estimate transparently. Small changes flow through; significant additions are scoped as a change request." },
  { question: "Refunds on shop products?", answer: "Digital products are refundable within 14 days if they don't meet the documented description. Custom work is non-refundable once delivered against milestone acceptance." },
  { question: "Do you offer payment plans?", answer: "For shop bundles over $1k, we offer 3-month installments via Stripe." },
];

export default function PricingPage() {
  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <Container>
          <div className="max-w-3xl">
            <Badge tone="primary" dot>Pricing</Badge>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance">
              Pricing that respects custom work and rewards productization.
            </h1>
            <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-7">
              Real engagements have real ranges. Here&apos;s what to expect across services, partnerships, and our shop — without the salesy fog.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/book-appointment" size="lg">Get a tailored proposal</LinkButton>
              <LinkButton href="/contact" variant="outline" size="lg">Ask a question first</LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {TIERS.map((t) => (
              <PricingTier key={t.name} tier={t} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="inset">
        <Container>
          <SectionHeading
            eyebrow="Service ranges"
            title="What custom work typically costs."
            description="Real projects are scoped after a discovery call. These ranges set realistic expectations from the start."
          />
          <div className="mt-10 overflow-hidden rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--color-inset)]/60">
                <tr>
                  <th className="px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">Service</th>
                  <th className="px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">Typical range</th>
                  <th className="px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {RANGES.map((r) => (
                  <tr key={r.service} className="border-t border-[var(--color-border)]">
                    <td className="px-5 py-4 font-display text-base tracking-tight">{r.service}</td>
                    <td className="px-5 py-4 font-mono text-sm text-[var(--color-primary)]">{r.range}</td>
                    <td className="px-5 py-4 text-[var(--color-text-muted)] hidden md:table-cell">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Productized"
            title="Shop offers — fixed prices, instant delivery."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SHOP_OFFERS.map((s) => (
              <Card key={s.name} hoverable>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">{s.name}</p>
                <p className="mt-2 font-display text-xl tracking-tight">{s.price}</p>
                <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-6">{s.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="inset">
        <Container>
          <SectionHeading eyebrow="What influences cost" title="Variables that move the number." />
          <div className="mt-10">
            <Accordion items={COST_DRIVERS} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="ROI logic" title="Where the money goes back to work." align="center" />
          <div className="mt-10">
            <StatBlock
              stats={[
                { value: "+182%", label: "Activation", hint: "SaaS rebuild" },
                { value: "+64%", label: "Demo bookings", hint: "Website redesign" },
                { value: "5h/wk", label: "Time saved", hint: "Automation" },
                { value: "92s", label: "Avg approval", hint: "Onboarding" },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section tone="inset">
        <Container width="reading">
          <SectionHeading eyebrow="FAQ" title="Pricing questions, answered plainly." align="center" />
          <div className="mt-10">
            <Accordion items={FAQ} />
          </div>
        </Container>
      </Section>

      <CTABand
        title="Tell us your scope. We'll tell you the real number."
        description="A 30-minute call. A written proposal within 48 hours. No fog, no hidden line items."
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "WhatsApp us", href: WHATSAPP_HREF }}
      />
    </>
  );
}

