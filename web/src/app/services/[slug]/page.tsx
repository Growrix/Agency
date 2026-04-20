import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BoltIcon,
  CheckIcon,
  CodeBracketSquareIcon,
  CpuChipIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { PricingTier, type Tier } from "@/components/sections/PricingTier";
import { Testimonial } from "@/components/sections/Testimonial";
import { Accordion } from "@/components/sections/Accordion";
import { CTABand } from "@/components/sections/CTABand";
import { StatBlock } from "@/components/sections/StatBlock";
import { PortfolioCard } from "@/components/sections/PortfolioCard";
import { PORTFOLIO, PROCESS_STEPS, SERVICE_BY_SLUG, SERVICES, TESTIMONIALS } from "@/lib/content";
import { WHATSAPP_HREF } from "@/lib/nav";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";

const ICONS = {
  "saas-applications": CodeBracketSquareIcon,
  websites: WindowIcon,
  "mcp-servers": CpuChipIcon,
  automation: BoltIcon,
} as const;

type SlugKey = keyof typeof ICONS;

const COPY: Record<
  SlugKey,
  {
    eyebrow: string;
    headline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    secondaryHref: string;
    builds: { title: string; description: string }[];
    differentiators: { title: string; description: string }[];
    tiers: Tier[];
    faq: { question: string; answer: string }[];
    stats: { value: string; label: string; hint?: string }[];
  }
> = {
  "saas-applications": {
    eyebrow: "SaaS Applications",
    headline: "SaaS products built like real products, not long demos.",
    description:
      "End-to-end product strategy, design systems, and engineering for founders and product teams launching or rebuilding SaaS.",
    primaryCta: "Start a SaaS Build",
    secondaryCta: "See SaaS work",
    secondaryHref: "/portfolio",
    builds: [
      { title: "Admin & ops panels", description: "Operator-grade dashboards, role-aware access, audit trails." },
      { title: "User portals & onboarding", description: "Activation-first flows, billing, and self-serve upgrades." },
      { title: "Billing & subscriptions", description: "Stripe metering, plans, coupons, dunning, and tax handling." },
      { title: "Dashboards & reporting", description: "Live charts, exports, and segmentable filters built for clarity." },
      { title: "Internal tools", description: "Replacements for spreadsheets, no-code stacks, and brittle scripts." },
      { title: "AI-assisted features", description: "LLM workflows that respect data boundaries and explain themselves." },
    ],
    differentiators: [
      { title: "Product strategy first", description: "MVP shaping, monetization inputs, and information architecture before any pixel." },
      { title: "Scalable design system", description: "Tokens, primitives, and accessible patterns that survive feature growth." },
      { title: "App-like mobile behavior", description: "Sheets, sticky utilities, thumb-friendly tap targets, real responsive depth." },
      { title: "Production-ready engineering", description: "Tests, CI, observability, and ops-ready release cadence from day one." },
    ],
    tiers: [
      { name: "MVP Sprint", price: "$24k", cadence: "/ project", description: "An 8-week sprint to validated MVP with core flows shipped.", features: ["Discovery + product framing", "Design system", "Auth, billing, primary flows", "Launch & analytics"], cta: { label: "Scope MVP", href: "/book-appointment" } },
      { name: "Product Partner", price: "$14k", cadence: "/ month", description: "An embedded studio building features alongside your team.", features: ["Lead + designer + engineer", "Quarterly strategy", "Continuous shipping", "Stack ownership"], cta: { label: "Plan partnership", href: "/book-appointment" }, featured: true, badge: "Most chosen" },
      { name: "Rebuild Engagement", price: "Custom", description: "A focused rebuild of an aging SaaS product with measurable handoff.", features: ["Architecture review", "Migration plan", "Phased shipping", "Knowledge transfer"], cta: { label: "Talk rebuilds", href: "/book-appointment" } },
    ],
    faq: [
      { question: "How fast can we launch?", answer: "Most MVP sprints land in 8 weeks. Larger products are split into phased releases starting at week 6." },
      { question: "Do you work with our existing engineers?", answer: "Yes. We frequently embed alongside in-house teams as a product pod or design + frontend specialists." },
      { question: "Stack preferences?", answer: "We default to Next.js + Postgres + Stripe + OpenAI/Anthropic, but adapt to existing stacks where it makes sense." },
    ],
    stats: [
      { value: "8 wk", label: "MVP sprint" },
      { value: "47", label: "Products shipped" },
      { value: "$18M+", label: "Client funding raised" },
      { value: "98", label: "NPS" },
    ],
  },
  websites: {
    eyebrow: "Websites",
    headline: "Websites that look like the brand you wanted to be.",
    description:
      "Editorial design, motion discipline, and engineering quality for marketing sites, product launches, and content-rich hubs.",
    primaryCta: "Plan My Website",
    secondaryCta: "View website portfolio",
    secondaryHref: "/portfolio",
    builds: [
      { title: "Marketing & company sites", description: "Conversion-first architecture and a story your team can ship to." },
      { title: "Product launch sites", description: "Hero moments, fast load, structured data, and analytics-ready instrumentation." },
      { title: "Content hubs & blogs", description: "Editorial-grade typography, search, and CMS integration that scales." },
      { title: "Landing pages", description: "Iterable variants tied to acquisition channels and experiments." },
      { title: "Ecommerce fronts", description: "Shopify or headless commerce with brand-tier visual systems." },
      { title: "Headless CMS handoff", description: "Sanity, Contentful, or Payload integration with editor-friendly schemas." },
    ],
    differentiators: [
      { title: "Conversion architecture", description: "CTA strategy, proof sequencing, lead capture, chat, and booking woven into the page model." },
      { title: "Motion as language", description: "Controlled, accessible motion that supports comprehension instead of distracting from it." },
      { title: "Performance by default", description: "Core Web Vitals as a build target, not a post-launch fix." },
      { title: "App-like mobile UX", description: "Sticky utilities, sheets, and thumb-friendly interactions that feel like product UI." },
    ],
    tiers: [
      { name: "Launch Sprint", price: "$9.5k", cadence: "/ project", description: "Ship a focused marketing site or product launch site in 4–6 weeks.", features: ["Up to 8 templates", "Design system + motion", "CMS handoff", "30 days post-launch"], cta: { label: "Plan a launch", href: "/book-appointment" } },
      { name: "Redesign Track", price: "$22k", cadence: "/ project", description: "A full redesign with conversion architecture and content sequencing.", features: ["Full information architecture", "Brand-tier visual system", "Content strategy support", "Analytics & experiments"], cta: { label: "Scope a redesign", href: "/book-appointment" }, featured: true, badge: "Most chosen" },
      { name: "Conversion Retainer", price: "$5.5k", cadence: "/ month", description: "Continuous CRO and content shipping with experiment review.", features: ["Monthly experiment plan", "New surfaces shipped", "Analytics review", "Content production"], cta: { label: "Start retainer", href: "/book-appointment" } },
    ],
    faq: [
      { question: "Do you handle content?", answer: "Yes — content production is offered as an add-on. We can also collaborate with your in-house content team." },
      { question: "What about CMS?", answer: "We integrate with Sanity, Contentful, Payload, or static MDX depending on editorial needs." },
      { question: "How fast can we launch?", answer: "Launch sprints are 4–6 weeks. Redesigns typically land in 8–10 weeks." },
    ],
    stats: [
      { value: "4–10 wk", label: "Launch window" },
      { value: "94", label: "Avg LCP score" },
      { value: "+64%", label: "Demo bookings" },
      { value: "12", label: "Sites shipped (12mo)" },
    ],
  },
  "mcp-servers": {
    eyebrow: "MCP Servers",
    headline: "Production-ready MCP servers that agents can actually trust.",
    description:
      "We build secure, observable Model Context Protocol servers that wrap your APIs, data, and internal tools so agents act with confidence.",
    primaryCta: "Scope an MCP Server",
    secondaryCta: "Browse MCP Products",
    secondaryHref: "/shop",
    builds: [
      { title: "API wrappers", description: "Existing REST/GraphQL APIs exposed as cleanly typed MCP tools." },
      { title: "Internal data tools", description: "Read/write access to internal systems with role-aware permissions." },
      { title: "CRM & ops integrations", description: "HubSpot, Salesforce, Linear, Notion, Slack tool exposures." },
      { title: "Document retrieval", description: "Hybrid search MCPs over your docs with citations and source URLs." },
      { title: "Workflow orchestration", description: "Multi-step tool flows that can pause, resume, and request approval." },
      { title: "Developer tooling MCPs", description: "Code, deployment, and incident-response tools wired to your stack." },
    ],
    differentiators: [
      { title: "Auth & access by design", description: "OAuth, API keys, scoped tokens, and clear human-in-the-loop boundaries." },
      { title: "Observability built-in", description: "Trace every tool call, log every input, surface every failure with context." },
      { title: "Schema-first tools", description: "Strict JSON schemas, examples, and behaviour notes agents can rely on." },
      { title: "Deployable anywhere", description: "Self-host or deploy to your cloud — Cloudflare Workers, Fly, Vercel, or AWS." },
    ],
    tiers: [
      { name: "Starter MCP", price: "$249", cadence: "one-time", description: "Productized starter with auth, logging, and example tools.", features: ["TypeScript codebase", "Auth + secrets handling", "Example tools", "Deployment guide"], cta: { label: "Buy starter", href: "/shop" } },
      { name: "Custom Integration", price: "$8.5k", cadence: "/ project", description: "A focused MCP server scoped around 1–2 systems with secure access.", features: ["Discovery + scoping", "Auth + permission model", "Tool design + tests", "Deployment + handoff"], cta: { label: "Scope an MCP", href: "/book-appointment" }, featured: true, badge: "Most chosen" },
      { name: "Platform Engagement", price: "Custom", description: "Multi-system MCP platform with shared infra, observability, and governance.", features: ["Shared auth layer", "Tool registry", "Audit + governance", "Ongoing support"], cta: { label: "Plan platform", href: "/book-appointment" } },
    ],
    faq: [
      { question: "What is MCP?", answer: "Model Context Protocol — an open standard for giving AI agents structured, auditable access to tools and data." },
      { question: "Where do you deploy?", answer: "We deploy to your cloud or recommended hosts: Cloudflare Workers, Fly, Vercel, or AWS." },
      { question: "How do you handle security?", answer: "Scoped auth, secrets via your existing vault, full call logging, and explicit human-in-the-loop boundaries." },
    ],
    stats: [
      { value: "12+", label: "MCPs shipped" },
      { value: "<150ms", label: "Median tool latency" },
      { value: "100%", label: "Audit-traced calls" },
      { value: "3 wk", label: "Typical scope-to-ship" },
    ],
  },
  automation: {
    eyebrow: "Automation",
    headline: "Operational systems that remove repetitive work — measurably.",
    description:
      "We map workflows, design exception logic, and ship integrations that turn manual work into measurable operational speed.",
    primaryCta: "Audit My Workflow",
    secondaryCta: "View automation examples",
    secondaryHref: "/portfolio",
    builds: [
      { title: "Lead routing & enrichment", description: "Inbound leads scored, enriched, and routed to the right owner instantly." },
      { title: "CRM sync & pipelines", description: "Bi-directional sync between CRM, billing, and product systems." },
      { title: "Support triage", description: "Automated routing, tagging, and first-response drafts via LLM workflows." },
      { title: "Reporting & dashboards", description: "Scheduled exports, executive digests, and live dashboards." },
      { title: "Onboarding & approvals", description: "Step-based flows with exceptions, escalations, and human checkpoints." },
      { title: "Content workflows", description: "Multi-channel publishing pipelines with review gates and version history." },
    ],
    differentiators: [
      { title: "Real workflow mapping", description: "We document exceptions, owners, and edge cases — not just the happy path." },
      { title: "Exception-first design", description: "Failures route to humans with full context, never to silent dead-ends." },
      { title: "Observability included", description: "Every run logged, retryable, and reportable from day one." },
      { title: "Predictable cost & speed", description: "We model integration costs and latency before recommending a tool." },
    ],
    tiers: [
      { name: "Audit Sprint", price: "$3.5k", cadence: "/ project", description: "Two-week audit of one or two workflows with prioritized recommendations.", features: ["Workflow mapping", "Cost & risk model", "Prioritized roadmap", "Implementation handoff"], cta: { label: "Book audit", href: "/book-appointment" } },
      { name: "Implementation", price: "$8k", cadence: "/ project", description: "Build and ship a complete automation system with exception handling.", features: ["Discovery + design", "Build + integrations", "Observability setup", "Documentation + handoff"], cta: { label: "Scope build", href: "/book-appointment" }, featured: true, badge: "Most chosen" },
      { name: "Optimization Retainer", price: "$3.2k", cadence: "/ month", description: "Continuous monitoring, tuning, and new workflow rollouts.", features: ["Monthly review", "New workflows shipped", "Failure monitoring", "Quarterly cost review"], cta: { label: "Start retainer", href: "/book-appointment" } },
    ],
    faq: [
      { question: "What tools do you use?", answer: "We use the right tool for the workflow — Zapier, n8n, custom Node services, or direct API integrations depending on volume and complexity." },
      { question: "How do you handle failures?", answer: "Every workflow has explicit retry, escalation, and human handoff paths. Failures never silently disappear." },
      { question: "Can you connect AI safely?", answer: "Yes. We design AI steps with clear inputs, outputs, and human checkpoints where decisions matter." },
    ],
    stats: [
      { value: "5h/wk", label: "Avg time saved" },
      { value: "−38%", label: "No-show rate" },
      { value: "2 wk", label: "Audit window" },
      { value: "100%", label: "Logged runs" },
    ],
  },
};

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICE_BY_SLUG[slug];
  if (!s) return {};
  return {
    title: `${s.name} Service`,
    description: s.long,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = SERVICE_BY_SLUG[slug];
  const copy = COPY[slug as SlugKey];
  if (!service || !copy) notFound();

  const Icon = ICONS[slug as SlugKey];
  const related = PORTFOLIO.filter((p) => p.service === slug).slice(0, 3);

  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <Container>
          <Link href="/services" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary">
            ← All services
          </Link>
          <div className="mt-6 grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <div className="signal-rise" style={{ animationDelay: "0ms" }}>
                <Badge tone="primary" dot>{copy.eyebrow}</Badge>
              </div>
              <h1
                className="mt-5 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance signal-rise"
                style={{ animationDelay: "70ms" }}
              >
                {copy.headline}
              </h1>
              <p
                className="mt-6 text-lg text-text-muted leading-7 signal-rise"
                style={{ animationDelay: "140ms" }}
              >
                {copy.description}
              </p>
              <div
                className="mt-8 flex flex-wrap gap-3 signal-rise"
                style={{ animationDelay: "210ms" }}
              >
                <LinkButton href="/book-appointment" size="lg">
                  {copy.primaryCta} <ArrowRightIcon className="size-4" />
                </LinkButton>
                <LinkButton href={copy.secondaryHref} variant="outline" size="lg">{copy.secondaryCta}</LinkButton>
              </div>
            </div>
            <div className="lg:col-span-5 signal-rise" style={{ animationDelay: "280ms" }}>
              <Card className="overflow-hidden">
                <div className="flex items-center justify-between mb-5">
                  <div className="inline-flex size-12 items-center justify-center rounded-sm bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <Badge tone="secondary">{service.timeline}</Badge>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Engagement style</p>
                <p className="mt-1 font-display text-2xl tracking-tight">{service.typical}</p>
                <ul className="mt-6 space-y-2.5">
                  {service.pillars.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm">
                      <CheckIcon className="size-4 text-primary" /> {p}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <StatBlock stats={copy.stats} />
        </Container>
      </Section>

      <Section tone="inset">
        <Container>
          <SectionHeading eyebrow="What gets built" title="The actual surfaces and systems we ship." />
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {copy.builds.map((b) => (
              <RevealItem key={b.title} className="h-full">
                <Card hoverable className="h-full">
                  <h3 className="font-display text-lg tracking-tight">{b.title}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-6">{b.description}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="What makes it different"
            title="Operating choices, not adjectives."
            description="The decisions that shape how this work actually feels to use, ship, and maintain."
          />
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2" stagger={0.07}>
            {copy.differentiators.map((d) => (
              <RevealItem key={d.title} className="h-full">
                <div className="h-full rounded-[16px] border border-border bg-surface p-6">
                  <div className="font-mono text-xs uppercase tracking-wider text-primary">Principle</div>
                  <h3 className="mt-2 font-display text-xl tracking-tight">{d.title}</h3>
                  <p className="mt-2 text-text-muted leading-7 text-pretty">{d.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="inset">
        <Container>
          <SectionHeading eyebrow="Delivery" title="How an engagement runs end-to-end." />
          <div className="mt-10">
            <ProcessSteps steps={PROCESS_STEPS} />
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section>
          <Container>
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <SectionHeading eyebrow="Featured proof" title="Recent work in this practice." />
              <Link href="/portfolio" className="text-sm font-medium text-primary">
                View all <ArrowUpRightIcon className="inline size-4" />
              </Link>
            </div>
            <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.07}>
              {related.map((p) => (
                <RevealItem key={p.slug} className="h-full">
                  <PortfolioCard project={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </Container>
        </Section>
      )}

      <Section tone="inset">
        <Container>
          <SectionHeading
            eyebrow="Engagement models"
            title="Pick the surface area that matches the work."
            align="center"
          />
          <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3" stagger={0.08}>
            {copy.tiers.map((t) => (
              <RevealItem key={t.name} className="h-full">
                <PricingTier tier={t} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Voices" title="Recent quotes from this practice." />
          <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.08}>
            {TESTIMONIALS.map((t) => (
              <RevealItem key={t.author} className="h-full">
                <Testimonial data={t} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section tone="inset">
        <Container width="reading">
          <SectionHeading eyebrow="FAQ" title={`${copy.eyebrow} questions, answered.`} align="center" />
          <div className="mt-10">
            <Accordion items={copy.faq} />
          </div>
        </Container>
      </Section>

      <CTABand
        title={`${copy.primaryCta} — let's talk specifics.`}
        description="A 30-minute discovery call. A written plan within 48 hours. Your call on whether to move forward."
        primary={{ label: copy.primaryCta, href: "/book-appointment" }}
        secondary={{ label: "Open WhatsApp", href: WHATSAPP_HREF }}
      />
    </>
  );
}
