import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BoltIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketSquareIcon,
  CpuChipIcon,
  CubeTransparentIcon,
  RectangleGroupIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { SectionHeading, Eyebrow } from "@/components/primitives/SectionHeading";
import { StatBlock } from "@/components/sections/StatBlock";
import { FeatureCard } from "@/components/sections/FeatureCard";
import { Testimonial } from "@/components/sections/Testimonial";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CTABand } from "@/components/sections/CTABand";
import { PricingTier, type Tier } from "@/components/sections/PricingTier";
import { BlogCard } from "@/components/sections/BlogCard";
import {
  BLOG_POSTS,
  CLIENT_LOGOS,
  FEATURED_PRODUCTS,
  HOME_STATS,
  PORTFOLIO,
  PROCESS_STEPS,
  SERVICES,
  TESTIMONIALS,
} from "@/lib/content";
import { WHATSAPP_HREF } from "@/lib/nav";

const SERVICE_ICONS = {
  "saas-applications": CodeBracketSquareIcon,
  websites: WindowIcon,
  "mcp-servers": CpuChipIcon,
  automation: BoltIcon,
} as const;

const HOME_TIERS: Tier[] = [
  {
    name: "Launch Sprint",
    price: "$9.5k",
    cadence: "/ project",
    description: "A fixed-scope sprint to ship a focused website or MCP server in weeks, not quarters.",
    features: ["1 surface or system", "Discovery + design + build", "Launch playbook", "30 days post-launch support"],
    cta: { label: "Get scoping", href: "/book-appointment" },
  },
  {
    name: "Product Partner",
    price: "$14k",
    cadence: "/ month",
    description: "An embedded studio that operates as your product team for SaaS, websites, and integrations.",
    features: ["Dedicated lead + designer + engineer", "Continuous shipping", "Quarterly strategy", "Stack ownership"],
    cta: { label: "Plan a partnership", href: "/book-appointment" },
    featured: true,
    badge: "Most chosen",
  },
  {
    name: "Productized",
    price: "From $99",
    cadence: "one-time",
    description: "Ready-to-deploy templates, automation kits, and MCP starters that ship in a day.",
    features: ["Stripe-powered checkout", "License + updates", "Quick setup docs", "Optional install help"],
    cta: { label: "Browse the shop", href: "/shop" },
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-12 sm:pt-16 lg:pt-20 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <Container width="shell">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <Badge tone="primary" dot>Independent product studio</Badge>
              <h1 className="mt-5 font-display text-[44px] sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-balance">
                Standout digital products,<br className="hidden sm:block" /> shipped like a real team built them.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-[var(--color-text-muted)] leading-7 text-pretty">
                We design and engineer SaaS applications, marketing websites, MCP servers, and operational automations — with the kind of polish your competitors will quietly want to match.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/book-appointment" size="lg">
                  Book Appointment <ArrowRightIcon className="size-4" />
                </LinkButton>
                <LinkButton href="/portfolio" variant="outline" size="lg">
                  Explore Portfolio
                </LinkButton>
              </div>
              <p className="mt-6 font-mono text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                Trusted by Tideline · Northcrest · Lumora · Glasswing · Helix
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                {/* Layered desktop mockup */}
                <Card className="relative overflow-hidden p-0 shadow-[var(--shadow-3)]">
                  <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] px-4 py-2.5 bg-[var(--color-inset)]/60">
                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e]" />
                    <span className="size-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-3 font-mono text-[11px] text-[var(--color-text-muted)]">tideline.health/dash</span>
                  </div>
                  <div className="p-5 bg-[var(--color-surface)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-text-muted)]">
                          Activation
                        </div>
                        <div className="font-display text-3xl tracking-tight">+182%</div>
                      </div>
                      <Badge tone="success" dot>Live</Badge>
                    </div>
                    <div className="mt-4 h-32 rounded-[12px] border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-primary)]/10 via-transparent to-[var(--color-secondary)]/10 relative overflow-hidden">
                      <svg viewBox="0 0 320 120" className="absolute inset-0 h-full w-full">
                        <defs>
                          <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#0F766E" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#0F766E" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,90 C40,85 60,70 90,72 C120,74 140,40 170,42 C200,44 220,18 260,16 C290,14 310,22 320,26 L320,120 L0,120 Z"
                          fill="url(#g)"
                        />
                        <path
                          d="M0,90 C40,85 60,70 90,72 C120,74 140,40 170,42 C200,44 220,18 260,16 C290,14 310,22 320,26"
                          fill="none"
                          stroke="#0F766E"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {["Onboard", "Activate", "Retain"].map((m, i) => (
                        <div
                          key={m}
                          className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-inset)]/50 p-2.5"
                        >
                          <div className="font-mono text-[10px] uppercase text-[var(--color-text-muted)]">{m}</div>
                          <div className="font-display text-base">{[92, 76, 84][i]}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Floating mobile mockup */}
                <Card className="absolute -bottom-6 -left-6 hidden sm:block w-44 p-0 overflow-hidden shadow-[var(--shadow-3)] rotate-[-3deg]">
                  <div className="bg-[var(--color-contrast)] text-[var(--color-contrast-text)] p-4">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-white/50">Concierge</p>
                    <p className="mt-2 font-display text-sm leading-tight">
                      Want a SaaS scope estimate?
                    </p>
                    <div className="mt-3 space-y-1.5">
                      {["Talk to AI", "Book a call", "WhatsApp"].map((b) => (
                        <div key={b} className="rounded-md bg-white/10 px-2.5 py-1.5 text-[11px]">
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Floating signal */}
                <div className="absolute -top-4 -right-4 flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 shadow-[var(--shadow-2)]">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[11px] uppercase tracking-wider">Shipping daily</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14">
            <StatBlock stats={HOME_STATS} />
          </div>
        </Container>
      </Section>

      {/* Capability Rail */}
      <Section className="py-16 sm:py-20" tone="inset">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Capabilities"
              title="Four sharp practices, one studio operating model."
              description="We do the work that needs design discipline, technical depth, and shipping muscle. No undefined consultants, no offshore handoffs."
            />
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]"
            >
              Compare services <ArrowUpRightIcon className="size-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => {
              const Icon = SERVICE_ICONS[s.slug as keyof typeof SERVICE_ICONS];
              return (
                <FeatureCard
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  icon={<Icon className="size-5" />}
                  title={s.name}
                  description={s.short}
                  meta={s.timeline}
                />
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Featured Builds */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Featured builds"
            title="Outcomes our clients can talk about."
            description="A selection of products, websites, and systems we've shipped recently. Each engagement is shaped around a measurable result."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {PORTFOLIO.slice(0, 3).map((p) => (
              <Link
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                className="group block rounded-[20px] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-[var(--shadow-2)] transition-all duration-200"
              >
                <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.accent}`}>
                  <div className="absolute inset-0 bg-grid-strong opacity-20" aria-hidden />
                  <div className="absolute inset-0 flex items-end p-5">
                    <div className="text-white">
                      <p className="font-mono text-[11px] uppercase tracking-wider opacity-80">{p.industry}</p>
                      <p className="font-display text-2xl tracking-tight mt-1">{p.name}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 rounded-full bg-black/30 backdrop-blur px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white">
                    {p.metric}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[var(--color-text-muted)] leading-6 text-pretty">{p.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2 transition-all">
                    View case study <ArrowUpRightIcon className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <LinkButton href="/portfolio" variant="outline">
              See all projects
            </LinkButton>
          </div>
        </Container>
      </Section>

      <TrustStrip items={CLIENT_LOGOS} />

      {/* Shop Spotlight */}
      <Section>
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Shop spotlight"
              title="Templates, kits, and starters ready to ship today."
              description="Productized accelerators built from the same playbooks we use on custom engagements."
            />
            <LinkButton href="/shop" variant="outline">
              Browse the shop <ArrowUpRightIcon className="size-4" />
            </LinkButton>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_PRODUCTS.map((p) => (
              <Card key={p.name} hoverable className="flex flex-col">
                <div className="relative h-32 -mx-6 -mt-6 mb-5 rounded-t-[16px] bg-gradient-to-br from-[var(--color-inset)] to-[var(--color-bg)] border-b border-[var(--color-border)] overflow-hidden">
                  <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <RectangleGroupIcon className="size-9 text-[var(--color-primary)]" aria-hidden />
                    {p.tag && <Badge tone="secondary">{p.tag}</Badge>}
                  </div>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">{p.category}</p>
                <h3 className="mt-1 font-display text-lg tracking-tight">{p.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-xl">{p.price}</span>
                  <Link href="/shop" className="text-sm font-medium text-[var(--color-primary)] hover:underline">
                    Preview →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="inset">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="An operating system you can actually plan around."
            description="No mystery process. Every engagement runs through these four phases with explicit outputs and clear cadence."
          />
          <div className="mt-10">
            <ProcessSteps steps={PROCESS_STEPS} />
          </div>
        </Container>
      </Section>

      {/* AI + Live Chat */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="AI Concierge"
                title="Get the right answer before you book."
                description="Ask anything about scope, pricing, timelines, or product fit. The concierge knows our services and routes you to the best next step — chat, WhatsApp, or a call."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href="/ai-concierge">
                  <SparklesIcon className="size-4" /> Ask the concierge
                </LinkButton>
                <LinkButton href={WHATSAPP_HREF} variant="outline">
                  <ChatBubbleLeftRightIcon className="size-4" /> WhatsApp
                </LinkButton>
              </div>
              <p className="mt-5 text-xs text-[var(--color-text-muted)] flex items-center gap-1.5">
                <ShieldCheckIcon className="size-3.5" /> Conversations are private and never used to train models.
              </p>
            </div>
            <div className="lg:col-span-7">
              <Card className="bg-[var(--color-contrast)] text-[var(--color-contrast-text)] border-white/10">
                <div className="space-y-4">
                  <div className="flex gap-3 max-w-md">
                    <div className="size-8 rounded-full bg-[var(--color-secondary)] shrink-0" aria-hidden />
                    <div className="rounded-[14px] bg-white/5 px-4 py-3 text-sm leading-6">
                      Hey — I&apos;m thinking about rebuilding our SaaS dashboard. We&apos;re 12 people, 8k MAUs.
                    </div>
                  </div>
                  <div className="flex gap-3 max-w-md ml-auto justify-end">
                    <div className="rounded-[14px] bg-[var(--color-primary)] px-4 py-3 text-sm leading-6 text-white">
                      That sounds like a Product Partner engagement. We typically scope these in a 1-week discovery sprint. Want timelines and team sizing?
                    </div>
                    <div className="size-8 rounded-full bg-white/10 inline-flex items-center justify-center shrink-0">
                      <CubeTransparentIcon className="size-4" aria-hidden />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["Show timelines", "Team & rates", "Talk to a human"].map((s) => (
                      <span key={s} className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Pricing snapshot */}
      <Section tone="inset">
        <Container>
          <SectionHeading
            eyebrow="Engagements"
            title="Transparent ways to work together."
            description="Custom builds, embedded partnership, or productized starters — pick the surface area that matches the work."
            align="center"
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {HOME_TIERS.map((t) => (
              <PricingTier key={t.name} tier={t} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/pricing" className="text-sm font-medium text-[var(--color-primary)]">
              See full pricing details →
            </Link>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Voices" title="Teams we've shipped with." />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Testimonial key={t.author} data={t} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Field notes (Blog) */}
      <Section tone="inset">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Field notes"
              title="Long-form writing from the studio."
              description="Engineering deep-dives, design system reflections, and quarterly notes on what we shipped."
            />
            <LinkButton href="/blog" variant="outline">
              Visit the blog <ArrowUpRightIcon className="size-4" />
            </LinkButton>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...BLOG_POSTS]
              .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
              .slice(0, 3)
              .map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <CTABand
        eyebrow="Start a conversation"
        title="Tell us what you're building. We'll tell you how we'd ship it."
        description="A 30-minute discovery call. A written plan within 48 hours. No pressure, no boilerplate."
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "Open WhatsApp", href: WHATSAPP_HREF }}
      />
    </>
  );
}
