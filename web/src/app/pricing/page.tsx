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
import { HOME_STATS } from "@/lib/content";
import { WHATSAPP_HREF } from "@/lib/nav";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";

export const metadata: Metadata = {
  title: "Pricing | Websites, Ready Websites, SaaS, and Launch Systems",
  description:
    "Review pricing ranges, flexible payment options, and support coverage for websites, ready websites, SaaS applications, and launch systems.",
};

const TIERS: Tier[] = [
  {
    name: "Template Packs",
    price: "From $500",
    cadence: "one-time",
    description: "Launch-ready website templates customized for your brand, offer, and conversion flow.",
    features: ["Basic: $500 - $1k", "Standard: $1k - $3k", "Premium: $3k - $10k", "Setup and handoff docs"],
    cta: { label: "Browse templates", href: "/shop" },
  },
  {
    name: "Ready Websites",
    price: "From $1k",
    cadence: "one-time",
    description: "Complete ready-to-deploy websites for teams that need speed without custom-build timelines.",
    features: ["Basic: $1k - $2.5k", "Standard: $2.5k - $5k", "Premium: $5k - $15k", "Optional install support"],
    cta: { label: "View ready websites", href: "/shop" },
    featured: true,
    badge: "Most chosen",
  },
  {
    name: "Custom Build Scope",
    price: "Discovery-based",
    cadence: "project pricing",
    description: "For SaaS applications, mobile launch systems, and MCP or automation work scoped to your goals.",
    features: ["SaaS applications: custom scope", "Mobile launch systems: custom scope", "MCP and automation: secondary scope", "Final quote after discovery"],
    cta: { label: "Book discovery call", href: "/book-appointment" },
  },
];

const RANGES = [
  { service: "Website Templates", range: "$500 - $10k", note: "Basic: $500-$1k, standard: $1k-$3k, premium: $3k-$10k." },
  { service: "Ready Websites", range: "$1k - $15k", note: "Basic: $1k-$2.5k, standard: $2.5k-$5k, premium: $5k-$15k." },
  { service: "SaaS Applications", range: "Custom scope", note: "Priced after discovery based on product scope, integrations, and delivery model." },
  { service: "Mobile App Launch Systems", range: "Custom scope", note: "Landing sites, onboarding funnels, and growth surfaces around the app launch." },
  { service: "MCP + Automation", range: "Secondary scope", note: "Scoped when they support the main website, SaaS, or launch engagement." },
];

const SHOP_OFFERS = [
  { name: "Website templates", price: "$500 - $10k", description: "Basic, standard, and premium website templates built with Next.js, React, and Tailwind CSS." },
  { name: "Ready websites", price: "$1k - $15k", description: "Launch-ready websites with TypeScript and optional headless CMS setups in Strapi or Sanity." },
  { name: "Flexible payment", price: "No advance option", description: "International clients can qualify for delivery-first payment on the first 100 projects." },
  { name: "Support included", price: "1 year free", description: "Bug fixes, security updates, and minor content updates are included with every delivered site." },
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
  { question: "Do you require an advance payment?", answer: "For qualifying international clients, we do not require an advance payment on the first 100 projects. Other scopes can use milestone-based terms when that fits better." },
  { question: "Can we choose a different payment arrangement?", answer: "Yes. We are flexible about payment structure and can tailor installments or milestones to the project as long as the arrangement stays fair for both sides." },
  { question: "Can we pay monthly?", answer: "Yes - Product Partner engagements are monthly, and custom scopes can also be broken into agreed installments." },
  { question: "What about scope changes?", answer: "We re-estimate transparently. Small changes flow through; significant additions are scoped as a change request." },
  { question: "Do you offer payment plans?", answer: "Yes. Payment plans are available when the scope and delivery model justify them, especially for larger ready-website or custom engagements." },
  { question: "What support is included after launch?", answer: "Every delivered site comes with 1 year of free support and maintenance, including bug fixes, security updates, and minor content updates." },
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
              Pricing built around real launches, not generic packages.
            </h1>
            <p className="mt-6 text-lg text-text-muted leading-7">
              Start with transparent ranges for website templates and ready websites, then use discovery to scope SaaS, mobile launches, and the supporting systems around them.
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
          <RevealGroup className="grid gap-5 lg:grid-cols-3" stagger={0.08}>
            {TIERS.map((t) => (
              <RevealItem key={t.name} className="h-full">
                <PricingTier tier={t} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="inset">
        <Container>
          <SectionHeading
            eyebrow="Service ranges"
            title="Where the main offers start."
            description="Website templates and ready websites have defined bands. SaaS, mobile launches, and secondary systems are scoped after discovery."
          />
          <div className="mt-10 overflow-hidden rounded-[16px] border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="bg-inset/60">
                <tr>
                  <th className="px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Service</th>
                  <th className="px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Typical range</th>
                  <th className="px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {RANGES.map((r) => (
                  <tr key={r.service} className="border-t border-border">
                    <td className="px-5 py-4 font-display text-base tracking-tight">{r.service}</td>
                    <td className="px-5 py-4 font-mono text-sm text-primary">{r.range}</td>
                    <td className="px-5 py-4 text-text-muted hidden md:table-cell">{r.note}</td>
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
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
            {SHOP_OFFERS.map((s) => (
              <RevealItem key={s.name} className="h-full">
                <Card hoverable className="h-full">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">{s.name}</p>
                  <p className="mt-2 font-display text-xl tracking-tight">{s.price}</p>
                  <p className="mt-3 text-sm text-text-muted leading-6">{s.description}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
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
            <StatBlock stats={HOME_STATS} />
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
        description="A short call. A written pricing direction within 48 hours. Flexible terms, no fog, no hidden line items."
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "WhatsApp us", href: WHATSAPP_HREF }}
      />
    </>
  );
}

