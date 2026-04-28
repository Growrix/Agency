import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRightIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CursorArrowRaysIcon,
  MagnifyingGlassCircleIcon,
  WrenchScrewdriverIcon,
  XCircleIcon,
  BoltIcon,
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
  WrenchIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { CTABand } from "@/components/sections/CTABand";
import { Accordion } from "@/components/sections/Accordion";
import { ADDITIONAL_SERVICES_CATEGORIES } from "@/lib/content";
import { WHATSAPP_HREF } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Additional Services | SEO Setup, Analytics & Technical Optimization",
  description:
    "One-time SEO and analytics setup services: Google Search Console, Meta Pixel, GA4, structured data, Core Web Vitals, and more. Get your product found and tracked from day one.",
};

const CATEGORY_ICONS = [
  MagnifyingGlassCircleIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
] as const;

const VALUE_POINTS = [
  {
    icon: CursorArrowRaysIcon,
    title: "Get found faster",
    description: "Proper indexing and Search Console setup can cut crawl delay from weeks to days.",
  },
  {
    icon: ChartBarIcon,
    title: "Measure what matters",
    description: "GA4 and Pixel configured correctly from the start means every decision is data-backed.",
  },
  {
    icon: BoltIcon,
    title: "Win on Core Web Vitals",
    description: "Performance scores directly influence rankings and first-impression conversion rates.",
  },
  {
    icon: MagnifyingGlassIcon,
    title: "Structured for algorithms",
    description: "Schema markup and clean URL structure help search engines understand and rank your pages.",
  },
] as const;

const PROCESS_ITEMS = [
  {
    number: "01",
    icon: MagnifyingGlassIcon,
    title: "Audit",
    description: "We review the current state of your site's technical setup—crawlability, tracking gaps, meta coverage, and performance baseline.",
  },
  {
    number: "02",
    icon: WrenchIcon,
    title: "Configuration",
    description: "We implement the missing or broken settings: indexing, analytics events, schema, sitemap, and performance fixes.",
  },
  {
    number: "03",
    icon: ClipboardDocumentCheckIcon,
    title: "Verification",
    description: "We confirm that indexing is active, tracking events fire correctly, and performance metrics have improved before wrapping up.",
  },
  {
    number: "04",
    icon: DocumentCheckIcon,
    title: "Handoff",
    description: "Full documentation so you own and understand every setting. No black boxes—you stay in control after we're done.",
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "Do I need these services if you already built my website?",
    answer:
      "Yes—many builds ship without these critical post-launch configurations. We recommend them regardless of who built the site. Search Console setup, pixel installation, and schema markup are often missing even from well-built websites.",
  },
  {
    question: "Are these really one-time services?",
    answer:
      "Mostly yes. The initial setup is a one-time configuration. Ongoing SEO strategy, content optimization, and link building are separate engagements. Once set up correctly, these foundations run themselves.",
  },
  {
    question: "What's the typical timeline?",
    answer:
      "Most configurations complete in 3–7 business days after a brief audit. Larger audit-heavy engagements or sites with significant technical debt run 1–2 weeks. We'll confirm scope and timeline during the discovery call.",
  },
  {
    question: "Can you run these alongside an active website or SaaS build?",
    answer:
      "Yes. We frequently run these configurations in parallel with an ongoing website or SaaS delivery so you're tracking from day one of launch rather than setting it up weeks later.",
  },
  {
    question: "What if I need ongoing SEO support after the initial setup?",
    answer:
      "We can support that through a custom collaboration arrangement. Reach out via the booking or WhatsApp link and we'll discuss what makes sense for your situation.",
  },
];

const INCLUDED = [
  "Technical SEO audit of your current setup",
  "Google Search Console property setup and Google Indexing submission",
  "Sitemap generation and robots.txt configuration",
  "On-page meta tags (title, description, OG) review and setup",
  "Google Analytics 4 property and data stream setup",
  "Meta Pixel installation and base event verification",
  "Structured data (schema) implementation for key page types",
  "Core Web Vitals audit with actionable fixes",
  "Handoff documentation for every configuration made",
];

const NOT_INCLUDED = [
  "Ongoing monthly SEO retainers or content strategy",
  "Paid advertising or campaign management (Google Ads, Meta Ads)",
  "Content creation, copywriting, or blog production",
  "Link building or off-page SEO outreach",
];

export default function AdditionalServicesPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-12 sm:pt-16 pb-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-8 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" aria-hidden />
        <Container>
          <div className="max-w-3xl">
            <Badge tone="primary" dot>Additional Services</Badge>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance">
              Get discovered, tracked, and optimized from day one.
            </h1>
            <p className="mt-6 text-lg text-text-muted leading-7 text-pretty">
              Beyond development, we offer essential one-time setup services to give your product a strong technical foundation. Search visibility, analytics, and SEO configuration handled right from the start.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/book-appointment" size="lg">
                Book Appointment <ArrowRightIcon className="size-4" />
              </LinkButton>
              <LinkButton href={WHATSAPP_HREF} variant="outline" size="lg">
                WhatsApp us
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      {/* Category Cards */}
      <Section tone="inset">
        <Container>
          <SectionHeading
            eyebrow="What we cover"
            title="Three categories. One strong foundation."
            description="These configurations are designed to work together—visibility, tracking, and technical structure as a single setup sprint."
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
                    {/* Title */}
                    <h2 className="mt-5 font-display text-xl tracking-tight">
                      {cat.title}
                    </h2>
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
        </Container>
      </Section>

      {/* Why It Matters */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Why it matters"
            title="The foundation most products launch without."
            description="These are not optional add-ons. They're the configurations that determine whether your product gets found, measured, and ranked correctly."
          />
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" stagger={0.07}>
            {VALUE_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <RevealItem key={point.title} className="h-full">
                  <Card hoverable className="h-full">
                    <div className="inline-flex size-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <h3 className="mt-4 font-display text-lg tracking-tight">{point.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-muted">{point.description}</p>
                  </Card>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* Delivery Model */}
      <Section tone="inset">
        <Container>
          <SectionHeading
            eyebrow="Delivery model"
            title="One-time setup. Permanent results."
            description="We audit, configure, verify, and hand off everything with documentation. You own the setup and understand every decision made."
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface">
            {/* Header */}
            <div className="border-b border-border px-6 py-6 sm:px-8 sm:py-7">
              <Badge tone="primary" className="mb-3">What&apos;s covered</Badge>
              <h3 className="font-display text-xl tracking-tight sm:text-2xl">
                Everything included in a standard additional services engagement.
              </h3>
            </div>
            {/* Two-column grid */}
            <div className="grid divide-y divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
              {/* Included */}
              <div className="px-6 py-6 sm:px-8 sm:py-7">
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                  Included — Setup &amp; Configuration Scope
                </p>
                <p className="mb-5 text-sm leading-6 text-text-muted">
                  Everything we configure, verify, and hand off documentation for:
                </p>
                <ul className="space-y-3">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Not included */}
              <div className="px-6 py-6 sm:px-8 sm:py-7">
                <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  Not included — Out of Scope
                </p>
                <ul className="space-y-3">
                  {NOT_INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <XCircleIcon className="mt-0.5 size-4 shrink-0 text-text-muted" aria-hidden />
                      <span className="text-text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-border pt-6">
                  <p className="text-sm leading-6 text-text-muted">
                    These are mostly one-time configurations designed to set a strong foundation for your growth.
                    If you need ongoing SEO, automation, or scaling—we can support that as well through custom collaboration.
                  </p>
                  <Link
                    href="/book-appointment"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    Let&apos;s talk custom <ArrowRightIcon className="size-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Process Steps */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How we do it"
            title="Four steps from audit to handoff."
            description="No guesswork, no black boxes. Every configuration is audited, implemented, verified, and handed over with documentation you own."
          />
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" stagger={0.07}>
            {PROCESS_ITEMS.map((step) => {
              const Icon = step.icon;
              return (
                <RevealItem key={step.number} className="h-full">
                  <Card className="h-full">
                    <div className="flex items-start justify-between gap-3">
                      <div className="inline-flex size-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
                        <Icon className="size-5" aria-hidden />
                      </div>
                      <span className="font-mono text-3xl font-semibold text-border">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-text-muted">{step.description}</p>
                  </Card>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="inset">
        <Container width="reading">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions about additional services."
            align="center"
          />
          <div className="mt-10">
            <Accordion items={FAQ_ITEMS} />
          </div>
        </Container>
      </Section>

      {/* CTA Band */}
      <CTABand
        eyebrow="Get started"
        title="Ready to set a strong technical foundation?"
        description="One-time configurations that pay for themselves. Book a quick discovery call or message us on WhatsApp."
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "WhatsApp us", href: WHATSAPP_HREF }}
      />
    </>
  );
}
