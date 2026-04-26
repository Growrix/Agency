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
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { StatBlock } from "@/components/sections/StatBlock";
import { FeatureCard } from "@/components/sections/FeatureCard";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { CTABand } from "@/components/sections/CTABand";
import { ConciergeTriggerButton } from "@/components/ai/ConciergeTrigger";
import { PricingTier, type Tier } from "@/components/sections/PricingTier";
import { BlogCard } from "@/components/sections/BlogCard";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import {
  FEATURED_PRODUCTS,
  HOME_STATS,
  HOME_STACK_MARQUEE,
  PORTFOLIO,
  PROCESS_STEPS,
  SERVICES,
} from "@/lib/content";
import { SHOW_GOOGLE_REVIEWS } from "@/lib/feature-flags";
import { WHATSAPP_HREF } from "@/lib/nav";
import { listBlogPosts } from "@/server/blog/content";

const SERVICE_ICONS = {
  "saas-applications": CodeBracketSquareIcon,
  websites: WindowIcon,
  "mcp-servers": CpuChipIcon,
  automation: BoltIcon,
} as const;

const HOME_TIERS: Tier[] = [
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

export default async function Home() {
  const latestBlogPosts = (await listBlogPosts()).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <Section className="pt-12 sm:pt-16 lg:pt-20 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-8 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute right-12 top-24 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" aria-hidden />
        <Container width="shell">
          <div className="mx-auto max-w-5xl text-center">
            <div className="signal-rise" style={{ animationDelay: "0ms" }}>
              <Badge tone="primary" dot>Websites, SaaS, ready launches</Badge>
            </div>
            <h1
              className="signal-rise mt-5 font-display text-[42px] leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "90ms" }}
            >
              Premium Websites, SaaS Solutions, Mobile Apps and Launch Experiences That Stand Out
            </h1>
            <p
              className="signal-rise mx-auto mt-6 max-w-3xl text-lg leading-7 text-pretty text-text-muted"
              style={{ animationDelay: "180ms" }}
            >
              From premium websites and SaaS apps to mobile launch pages and ready sites, we deliver results that don&apos;t look generic. MCP servers and automation support your roadmap when required.
            </p>
            <div
              className="signal-rise mt-8 flex flex-wrap items-center justify-center gap-3"
              style={{ animationDelay: "270ms" }}
            >
              <LinkButton href="/book-appointment" size="lg">
                Book Appointment <ArrowRightIcon className="size-4" />
              </LinkButton>
              <LinkButton href="/portfolio" variant="outline" size="lg">
                Explore Portfolio
              </LinkButton>
            </div>
            <p
              className="signal-rise mx-auto mt-6 max-w-2xl font-mono text-xs uppercase tracking-wider text-text-muted"
              style={{ animationDelay: "360ms" }}
            >
              Next.js · React · TypeScript · Python · Django · Stripe · Supabase
            </p>
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
              title="Websites and SaaS first. Supporting systems when they matter."
              description="Our primary work is premium websites, SaaS applications, mobile launch experiences, and ready-to-ship website products. MCP and automation come in when they strengthen that core offer."
            />
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              Compare services <ArrowUpRightIcon className="size-4" />
            </Link>
          </div>
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
            {SERVICES.map((s) => {
              const Icon = SERVICE_ICONS[s.slug as keyof typeof SERVICE_ICONS];
              return (
                <RevealItem key={s.slug}>
                  <FeatureCard
                    href={`/services/${s.slug}`}
                    icon={<Icon className="size-5" />}
                    title={s.name}
                    description={s.short}
                    meta={s.timeline}
                  />
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </Section>

      {/* Featured Builds */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Featured builds"
            title="Proof from launches, rebuilds, and growth."
            description="A selection of websites and SaaS products we've shipped recently, plus the systems that kept them moving. Each engagement is shaped around a measurable result."
          />
          <RevealGroup className="mt-10 grid gap-5 lg:grid-cols-3" stagger={0.08}>
            {PORTFOLIO.slice(0, 3).map((p) => (
              <RevealItem key={p.slug}>
              <Link
                href={`/portfolio/${p.slug}`}
                className="group block h-full overflow-hidden rounded-[20px] border border-border bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-signal hover:-translate-y-1 hover:border-border-strong hover:shadow-(--shadow-2)"
              >
                <div className={`relative aspect-4/3 bg-linear-to-br ${p.accent}`}>
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
                  <p className="text-text-muted leading-6 text-pretty">{p.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                    View case study <ArrowUpRightIcon className="size-4" />
                  </span>
                </div>
              </Link>
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-8 flex justify-center">
            <LinkButton href="/portfolio" variant="outline">
              See all projects
            </LinkButton>
          </div>
        </Container>
      </Section>

      <TrustStrip items={HOME_STACK_MARQUEE} />

      {/* Shop Spotlight */}
      <Section>
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Shop spotlight"
              title="Website templates and ready websites, built to ship."
              description="Website templates from $500 and ready websites from $1k, built from the same systems we use in custom engagements."
            />
            <LinkButton href="/shop" variant="outline">
              Browse the shop <ArrowUpRightIcon className="size-4" />
            </LinkButton>
          </div>
          <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
            {FEATURED_PRODUCTS.map((p) => (
              <RevealItem key={p.name} className="h-full">
              <Card hoverable className="flex flex-col h-full">
                <div className="relative -mx-6 -mt-6 mb-5 h-32 overflow-hidden rounded-t-[16px] border-b border-border bg-linear-to-br from-inset to-bg">
                  <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <RectangleGroupIcon className="size-9 text-primary" aria-hidden />
                    {p.tag && <Badge tone="secondary">{p.tag}</Badge>}
                  </div>
                </div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">{p.category}</p>
                <h3 className="mt-1 font-display text-lg tracking-tight">{p.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-xl">{p.price}</span>
                  <Link href={`/shop/${p.slug}`} className="text-sm font-medium text-primary hover:underline">
                    Preview →
                  </Link>
                </div>
              </Card>
              </RevealItem>
            ))}
          </RevealGroup>
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
                eyebrow="AI Growrix OS"
                title="Get the right answer before you book."
                description="Ask about website scope, SaaS roadmaps, ready website fit, pricing, or timelines. The concierge keeps MCP and automation in context when they support the main build."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <ConciergeTriggerButton>
                  <SparklesIcon className="size-4" /> Ask AI Growrix OS
                </ConciergeTriggerButton>
                <LinkButton href={WHATSAPP_HREF} variant="outline">
                  <ChatBubbleLeftRightIcon className="size-4" /> WhatsApp
                </LinkButton>
              </div>
              <p className="mt-5 flex items-center gap-1.5 text-xs text-text-muted">
                <ShieldCheckIcon className="size-3.5" /> Conversations are private and never used to train models.
              </p>
            </div>
            <div className="lg:col-span-7">
              <Card className="border-white/10 bg-contrast text-contrast-text">
                <div className="space-y-4">
                  <div className="flex gap-3 max-w-md">
                    <div className="size-8 shrink-0 rounded-full bg-secondary" aria-hidden />
                    <div className="rounded-[14px] bg-white/5 px-4 py-3 text-sm leading-6">
                      Hey — I&apos;m thinking about rebuilding our SaaS dashboard. We&apos;re 12 people, 8k MAUs.
                    </div>
                  </div>
                  <div className="flex gap-3 max-w-md ml-auto justify-end">
                    <div className="rounded-[14px] bg-primary px-4 py-3 text-sm leading-6 text-white">
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
            description="Choose a custom build, an embedded partnership, or a website product with flexible payment and 1 year of support."
            align="center"
          />
          <RevealGroup className="mt-12 grid gap-5 lg:grid-cols-3" stagger={0.08}>
            {HOME_TIERS.map((t) => (
              <RevealItem key={t.name} className="h-full">
                <PricingTier tier={t} />
              </RevealItem>
            ))}
          </RevealGroup>
          <div className="mt-8 text-center">
            <Link href="/pricing" className="text-sm font-medium text-primary">
              See full pricing details →
            </Link>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      {SHOW_GOOGLE_REVIEWS && (
        <Section>
          <Container>
            <GoogleReviews
              eyebrow="Voices"
              title="Teams we've shipped with."
              description="Live Google reviews from the public Growrix OS business profile."
            />
          </Container>
        </Section>
      )}

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
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {latestBlogPosts.map((p) => (
                <RevealItem key={p.slug}>
                  <BlogCard post={p} />
                </RevealItem>
              ))}
          </RevealGroup>
          {latestBlogPosts.length === 0 && (
            <Card className="mt-8 text-center">
              <p className="font-display text-2xl tracking-tight">No published blog posts yet.</p>
              <p className="mt-2 text-text-muted">
                Publish your first post in Sanity to show it here.
              </p>
            </Card>
          )}
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
