"use client";

import { useMemo, useState } from "react";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { PricingTier, type Tier } from "@/components/sections/PricingTier";
import { Accordion } from "@/components/sections/Accordion";
import { CTABand } from "@/components/sections/CTABand";
import { WHATSAPP_HREF } from "@/lib/nav";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";

const TAB_IDS = ["digital-products", "done-for-you", "custom-services"] as const;
type PricingTabId = (typeof TAB_IDS)[number];

const DIGITAL_PRODUCT_TIERS: Tier[] = [
  {
    name: "Standard",
    price: "$15-$99",
    cadence: "one-time",
    description: "DIY product files and setup docs.",
    features: ["Template or toolkit files", "Basic documentation", "Personal or small-team usage"],
    cta: { label: "Browse products", href: "/products" },
  },
  {
    name: "Premium",
    price: "$39-$399",
    cadence: "one-time",
    description: "Expanded package with extra sections, variants, and support.",
    features: ["Everything in Standard", "Expanded assets", "Priority support", "Update-ready package"],
    cta: { label: "View premium options", href: "/products" },
    featured: true,
    badge: "Most chosen",
  },
  {
    name: "Bundles",
    price: "From $149",
    cadence: "one-time",
    description: "Curated packs for faster launch decisions.",
    features: ["Multi-product collections", "Pack-level pricing", "Upgrade to Done-For-You anytime"],
    cta: { label: "See bundles", href: "/products/bundles" },
  },
];

const DONE_FOR_YOU_TIERS: Tier[] = [
  {
    name: "Basic Setup",
    price: "$299",
    cadence: "one-time",
    description: "Branding + deployment setup for a purchased product.",
    features: ["Brand adaptation", "Deployment", "Contact form integration", "Launch checklist"],
    cta: { label: "Request basic setup", href: "/services/template-customization" },
  },
  {
    name: "Business Setup",
    price: "$599",
    cadence: "one-time",
    description: "Expanded setup with analytics, payment wiring, and extra sections.",
    features: ["Everything in Basic", "Extra sections", "Analytics setup", "Payment integration"],
    cta: { label: "Request business setup", href: "/services/template-customization" },
    featured: true,
    badge: "Most chosen",
  },
  {
    name: "Advanced Setup",
    price: "$999+",
    cadence: "scoped",
    description: "Complex integrations and extended QA for serious launches.",
    features: ["Everything in Business", "Advanced integrations", "Extended QA", "Handoff support"],
    cta: { label: "Discuss advanced scope", href: "/book-appointment" },
  },
];

const CUSTOM_SERVICE_TIERS: Tier[] = [
  {
    name: "Web + SaaS Scope",
    price: "Discovery-based",
    cadence: "project",
    description: "Full custom delivery for websites, SaaS applications, and launch systems.",
    features: ["Architecture and discovery", "Design + engineering", "Delivery milestones", "Launch support"],
    cta: { label: "Book discovery call", href: "/book-appointment" },
    featured: true,
    badge: "Custom",
  },
  {
    name: "MCP + Automation",
    price: "Secondary scope",
    cadence: "project",
    description: "Scoped after core website/SaaS goals are aligned.",
    features: ["Workflow mapping", "Tool integration", "Ops reliability guidance"],
    cta: { label: "Discuss automation scope", href: "/services/automation" },
  },
  {
    name: "Partnership Mode",
    price: "Monthly or phased",
    cadence: "retainer",
    description: "Ongoing delivery for teams shipping continuously.",
    features: ["Roadmap collaboration", "Continuous iteration", "Priority response window"],
    cta: { label: "Start partnership discussion", href: "/contact" },
  },
];

const RANGE_ROWS: Record<PricingTabId, { service: string; range: string; note: string }[]> = {
  "digital-products": [
    { service: "HTML templates", range: "$15-$79", note: "Business profiles, landing pages, and email assets." },
    { service: "SaaS starters", range: "$99-$399", note: "Next.js starter kits and premium packs." },
    { service: "MCP/AI kits", range: "$49-$149", note: "Starter kits with optional upgrades." },
    { service: "SEO toolkits", range: "$19-$79", note: "Audit kits and implementation templates." },
  ],
  "done-for-you": [
    { service: "Template customization", range: "$299-$1500+", note: "Branding, deploy, integration, and launch QA." },
    { service: "SaaS starter implementation", range: "$3000-$8000", note: "Setup and extension of purchased starters." },
    { service: "MCP integration", range: "$799-$3000", note: "Scoped to business workflow and tooling needs." },
  ],
  "custom-services": [
    { service: "Website + platform builds", range: "Discovery-based", note: "Custom scope by feature and integration complexity." },
    { service: "SaaS MVP engineering", range: "Discovery-based", note: "Phased delivery with roadmap-defined milestones." },
    { service: "Automation programs", range: "Scoped", note: "Sized after workflow and operational risk analysis." },
  ],
};

const COST_DRIVERS = [
  { question: "Project complexity", answer: "More surfaces, user roles, and edge cases increase effort and timeline." },
  { question: "Integration count", answer: "Each external integration adds validation, fallback handling, and observability needs." },
  { question: "Timeline pressure", answer: "Compressed timelines require parallel workstreams and dedicated staffing." },
  { question: "Post-launch support", answer: "Retainers and support windows are scoped separately for predictable operations." },
];

const FAQ = [
  { question: "Can I start with a product and upgrade later?", answer: "Yes. Buy Standard or Premium first, then upgrade to Done-For-You or custom scope." },
  { question: "Do you support flexible payment plans?", answer: "Yes. Payment terms can be split by milestones for larger scopes." },
  { question: "What if my scope changes mid-project?", answer: "We re-estimate transparently and route major additions through a scoped change request." },
];

const TAB_LABELS: Record<PricingTabId, string> = {
  "digital-products": "Digital Products",
  "done-for-you": "Done-For-You Setup",
  "custom-services": "Custom Services",
};

function getTabTiers(tab: PricingTabId) {
  if (tab === "digital-products") return DIGITAL_PRODUCT_TIERS;
  if (tab === "done-for-you") return DONE_FOR_YOU_TIERS;
  return CUSTOM_SERVICE_TIERS;
}

export function PricingPageClient() {
  const [activeTab, setActiveTab] = useState<PricingTabId>("digital-products");
  const activeTiers = useMemo(() => getTabTiers(activeTab), [activeTab]);
  const activeRows = RANGE_ROWS[activeTab];

  return (
    <>
      <Section size="hero" layout="viewport" className="hero-section relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
        <Container>
          <div className="max-w-3xl">
            <Badge tone="primary" dot>Pricing</Badge>
            <h1 className="mt-5 text-balance font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
              Pricing by path: products, setup, or custom build.
            </h1>
            <p className="mt-6 text-lg leading-7 text-text-muted">
              Start with fixed-price digital products, move into Done-For-You setup when needed, or scope a custom
              delivery for full platform work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/products" size="lg">Browse products</LinkButton>
              <LinkButton href="/book-appointment" variant="outline" size="lg">Book a consultation</LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      <Section size="dense">
        <Container>
          <div className="flex flex-wrap gap-2">
            {TAB_IDS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-surface text-text-muted hover:border-primary/40 hover:text-primary"
                }`}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      <Section size="standard" layout="viewport">
        <Container>
          <RevealGroup className="grid gap-5 lg:grid-cols-3" stagger={0.08}>
            {activeTiers.map((tier) => (
              <RevealItem key={tier.name} className="h-full">
                <PricingTier tier={tier} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section size="standard" layout="viewport" tone="inset">
        <Container>
          <SectionHeading
            eyebrow="Range guide"
            title={`${TAB_LABELS[activeTab]} at a glance`}
            description="Use this as a planning baseline. Final pricing is confirmed after scope and constraints are reviewed."
          />
          <div className="mt-10 overflow-hidden rounded-[16px] border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead className="bg-inset/60">
                <tr>
                  <th className="px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Offer</th>
                  <th className="px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted">Typical range</th>
                  <th className="hidden px-5 py-4 font-mono text-[11px] uppercase tracking-wider text-text-muted md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {activeRows.map((row) => (
                  <tr key={row.service} className="border-t border-border">
                    <td className="px-5 py-4 font-display text-base tracking-tight">{row.service}</td>
                    <td className="px-5 py-4 font-mono text-sm text-primary">{row.range}</td>
                    <td className="hidden px-5 py-4 text-text-muted md:table-cell">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section size="standard" layout="viewport" tone="inset">
        <Container>
          <SectionHeading eyebrow="What influences cost" title="Variables that move the number." />
          <div className="mt-10">
            <Accordion items={COST_DRIVERS} />
          </div>
        </Container>
      </Section>

      <Section size="standard" layout="viewport" tone="inset">
        <Container width="reading">
          <SectionHeading eyebrow="FAQ" title="Pricing questions, answered plainly." align="center" />
          <div className="mt-10">
            <Accordion items={FAQ} />
          </div>
        </Container>
      </Section>

      <CTABand
        title="Tell us your scope. We will map the right pricing path."
        description="Digital product, Done-For-You setup, or custom build — we will recommend the fastest path that fits your goals."
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "WhatsApp us", href: WHATSAPP_HREF }}
      />
    </>
  );
}
