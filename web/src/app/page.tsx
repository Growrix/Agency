import { Container, Section, LinkButton } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
import {
  RocketLaunchIcon,
  GlobeAltIcon,
  ServerStackIcon,
  BoltIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaaS Web Development Agency | Websites, MCP Servers, Automation, and Digital Products",
  description:
    "Premium web development agency building SaaS applications, websites, MCP servers, automation systems, and ready-to-buy digital products.",
};

const serviceIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  rocket: RocketLaunchIcon,
  globe: GlobeAltIcon,
  server: ServerStackIcon,
  bolt: BoltIcon,
};

const stats = [
  { label: "Projects Shipped", value: "120+", icon: CheckCircleIcon },
  { label: "Avg. Response", value: "< 2h", icon: ClockIcon },
  { label: "Happy Clients", value: "80+", icon: UserGroupIcon },
  { label: "Uptime SLA", value: "99.5%", icon: ChartBarIcon },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description: "Understand your goals, users, and competitive landscape.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Define the product scope, architecture, and success metrics.",
  },
  {
    step: "03",
    title: "Design System",
    description: "Build the visual language, tokens, and component library.",
  },
  {
    step: "04",
    title: "Build",
    description: "Engineer the product with tested, production-grade code.",
  },
  {
    step: "05",
    title: "QA & Launch",
    description: "Validate quality gates, deploy, and monitor performance.",
  },
  {
    step: "06",
    title: "Optimize",
    description: "Iterate based on data, user feedback, and growth metrics.",
  },
];

const featuredWork = [
  {
    title: "FinTech Dashboard Rebuild",
    category: "SaaS Application",
    result: "3x faster load times, 40% user retention increase",
    slug: "fintech-dashboard",
  },
  {
    title: "E-Commerce Platform Launch",
    category: "Website",
    result: "€2M revenue in first quarter, 98 Lighthouse score",
    slug: "ecommerce-platform",
  },
  {
    title: "AI Agent Integration Hub",
    category: "MCP Server",
    result: "Connected 12 tools, 60% reduction in manual work",
    slug: "ai-agent-hub",
  },
];

export default function HomePage() {
  return (
    <>
      {/* === Hero Section === */}
      <Section className="pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12 lg:pb-16">
        <Container size="2xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="max-w-2xl">
              <Badge variant="primary" className="mb-6">
                Web Development Agency
              </Badge>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                We Build Standout{" "}
                <span className="text-primary">Digital Products</span>
              </h1>
              <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
                SaaS applications, high-conversion websites, MCP servers, and
                automation systems — engineered for performance, designed for trust.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <LinkButton href="/book-appointment" size="lg">
                  Book Appointment
                  <ArrowRightIcon className="h-4 w-4" />
                </LinkButton>
                <LinkButton href="/portfolio" variant="outline" size="lg">
                  Explore Portfolio
                </LinkButton>
              </div>
            </div>

            {/* Hero Media - Layered Panel Preview */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/3] rounded-[var(--radius-xl)] bg-surface border border-border shadow-[var(--shadow-hover)] overflow-hidden">
                {/* Simulated dashboard preview */}
                <div className="absolute inset-0 p-6">
                  <div className="h-full rounded-[var(--radius-lg)] bg-inset border border-border p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-destructive/50" />
                      <div className="w-3 h-3 rounded-full bg-warning/50" />
                      <div className="w-3 h-3 rounded-full bg-success/50" />
                      <div className="flex-1 h-5 rounded bg-border/50 ml-2" />
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-3">
                      <div className="col-span-1 rounded-[var(--radius-sm)] bg-surface border border-border p-3">
                        <div className="h-3 w-16 bg-primary/20 rounded mb-2" />
                        <div className="h-2 w-full bg-border/40 rounded mb-1" />
                        <div className="h-2 w-3/4 bg-border/40 rounded" />
                      </div>
                      <div className="col-span-2 rounded-[var(--radius-sm)] bg-surface border border-border p-3">
                        <div className="h-3 w-24 bg-secondary/20 rounded mb-3" />
                        <div className="grid grid-cols-3 gap-2">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="h-12 rounded bg-inset border border-border"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating mobile preview */}
              <div className="absolute -bottom-6 -left-6 w-32 h-52 rounded-[var(--radius-lg)] bg-surface border border-border shadow-[var(--shadow-overlay)] p-2">
                <div className="h-full rounded-[var(--radius-sm)] bg-inset border border-border p-2 flex flex-col gap-1.5">
                  <div className="h-2 w-10 bg-primary/30 rounded" />
                  <div className="h-1.5 w-full bg-border/40 rounded" />
                  <div className="h-1.5 w-2/3 bg-border/40 rounded" />
                  <div className="flex-1 rounded bg-surface border border-border mt-1" />
                  <div className="h-4 rounded bg-primary/20" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Strip */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 p-4 rounded-[var(--radius-md)] bg-surface border border-border"
              >
                <stat.icon className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <div
                    className="text-xl font-bold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* === Capability Rail === */}
      <Section className="bg-surface">
        <Container size="2xl">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What We Build
            </h2>
            <p className="mt-3 text-muted max-w-2xl mx-auto">
              Four service pillars. One standard of quality. Every project
              engineered for performance, security, and long-term value.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <Card key={service.href} hover padding="lg" as="article">
                  <div className="h-10 w-10 rounded-[var(--radius-sm)] bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <LinkButton
                    href={service.href}
                    variant="ghost"
                    size="sm"
                    className="!px-0 !h-auto text-primary hover:!bg-transparent hover:underline"
                  >
                    Learn more
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </LinkButton>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* === Featured Builds === */}
      <Section>
        <Container size="2xl">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Featured Builds
              </h2>
              <p className="mt-3 text-muted max-w-lg">
                Selected projects showcasing our approach to complex builds and
                measurable outcomes.
              </p>
            </div>
            <LinkButton
              href="/portfolio"
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
            >
              View All Work
            </LinkButton>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredWork.map((project) => (
              <Card key={project.slug} hover as="article">
                {/* Placeholder image area */}
                <div className="aspect-[16/10] rounded-[var(--radius-sm)] bg-inset border border-border mb-4 flex items-center justify-center">
                  <span className="text-xs text-muted">Preview</span>
                </div>
                <Badge variant="primary" className="mb-2">
                  {project.category}
                </Badge>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-muted">{project.result}</p>
                <LinkButton
                  href={`/portfolio/${project.slug}`}
                  variant="ghost"
                  size="sm"
                  className="!px-0 !h-auto mt-3 text-primary hover:!bg-transparent hover:underline"
                >
                  View case study
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </LinkButton>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <LinkButton href="/portfolio" variant="outline">
              View All Work
            </LinkButton>
          </div>
        </Container>
      </Section>

      {/* === Process Section === */}
      <Section className="bg-surface">
        <Container size="xl">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              How We Work
            </h2>
            <p className="mt-3 text-muted max-w-2xl mx-auto">
              A structured, transparent process from discovery to optimization.
              No handwaving — every phase has clear outputs and quality gates.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="flex gap-4 p-6 rounded-[var(--radius-lg)] bg-background border border-border"
              >
                <span
                  className="text-3xl font-bold text-primary/20 shrink-0"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {step.step}
                </span>
                <div>
                  <h3
                    className="text-base font-bold mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* === AI Concierge Preview === */}
      <Section>
        <Container size="xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="info" className="mb-4">
                AI-Powered
              </Badge>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Get Instant Answers
              </h2>
              <p className="mt-4 text-muted leading-relaxed max-w-lg">
                Our AI concierge understands our services, pricing, and process.
                Ask anything — or escalate to WhatsApp or a live call anytime.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "What do you charge for a SaaS MVP?",
                  "How long does a website build take?",
                  "Do you offer MCP server hosting?",
                ].map((prompt) => (
                  <span
                    key={prompt}
                    className="px-3 py-1.5 rounded-full bg-inset border border-border text-sm text-muted"
                  >
                    {prompt}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <LinkButton href="/ai-concierge">
                  <ChatBubbleLeftRightIcon className="h-4 w-4" />
                  Ask the AI Concierge
                </LinkButton>
                <LinkButton
                  href={SITE_CONFIG.whatsappUrl}
                  variant="outline"
                  external
                >
                  Open WhatsApp
                </LinkButton>
              </div>
            </div>
            {/* Chat preview */}
            <div className="bg-surface rounded-[var(--radius-xl)] border border-border shadow-[var(--shadow-card)] p-6 max-w-md mx-auto lg:ml-auto">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <ChatBubbleLeftRightIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">AI Concierge</div>
                  <div className="text-xs text-success flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-success inline-block" />
                    Online
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-inset rounded-[var(--radius-md)] p-3 text-sm max-w-[80%]">
                  Hi! How can I help you today?
                </div>
                <div className="bg-primary text-white rounded-[var(--radius-md)] p-3 text-sm max-w-[80%] ml-auto">
                  What&apos;s your process for a SaaS build?
                </div>
                <div className="bg-inset rounded-[var(--radius-md)] p-3 text-sm max-w-[80%]">
                  Great question! We follow a 6-phase process: discovery, strategy, design, build, QA, and optimization...
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* === Pricing Snapshot === */}
      <Section className="bg-surface">
        <Container size="xl">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Engagement Models
            </h2>
            <p className="mt-3 text-muted max-w-2xl mx-auto">
              Transparent starting points for every type of project.
              Custom scoping for complex builds.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Product Sprint",
                from: "€5,000",
                description:
                  "Focused build cycle for MVPs, landing pages, or automation setups.",
                features: [
                  "2–4 week delivery",
                  "Design system included",
                  "QA and launch support",
                ],
              },
              {
                title: "Full Build",
                from: "€15,000",
                description:
                  "End-to-end product development from strategy to deployment.",
                features: [
                  "8–16 week delivery",
                  "Full design and engineering",
                  "CI/CD and monitoring",
                ],
                featured: true,
              },
              {
                title: "Retainer",
                from: "€3,000/mo",
                description:
                  "Ongoing engineering, optimization, and support partnership.",
                features: [
                  "Dedicated capacity",
                  "Priority response",
                  "Monthly reviews",
                ],
              },
            ].map((tier) => (
              <Card
                key={tier.title}
                padding="lg"
                className={
                  tier.featured
                    ? "border-primary ring-1 ring-primary/20"
                    : undefined
                }
              >
                {tier.featured && (
                  <Badge variant="primary" className="mb-3">
                    Most Popular
                  </Badge>
                )}
                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {tier.title}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span
                    className="text-3xl font-bold text-primary"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {tier.from}
                  </span>
                  <span className="text-sm text-muted">starting</span>
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {tier.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircleIcon className="h-4 w-4 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <LinkButton
                    href="/book-appointment"
                    variant={tier.featured ? "primary" : "outline"}
                    className="w-full"
                  >
                    Get a Proposal
                  </LinkButton>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <LinkButton href="/pricing" variant="ghost" size="sm">
              View full pricing details
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </LinkButton>
          </div>
        </Container>
      </Section>

      {/* === Testimonial Strip === */}
      <Section>
        <Container size="2xl">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "They delivered our SaaS platform ahead of schedule with exceptional code quality. The team feels like an extension of ours.",
                author: "Sarah K.",
                role: "CTO, FinTech Startup",
              },
              {
                quote:
                  "Our website conversion rate tripled within two months. The attention to performance and UX details was outstanding.",
                author: "Marc D.",
                role: "Founder, E-Commerce Brand",
              },
              {
                quote:
                  "The MCP server integration transformed how our AI agents interact with our tools. Truly cutting-edge work.",
                author: "Elena R.",
                role: "Head of Engineering, AI Company",
              },
            ].map((testimonial) => (
              <Card key={testimonial.author} padding="lg">
                <blockquote className="text-sm leading-relaxed text-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">
                      {testimonial.author[0]}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-muted">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* === Final Conversion Band === */}
      <Section className="bg-foreground text-background">
        <Container size="lg" className="text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready to Build Something Exceptional?
          </h2>
          <p className="mt-4 opacity-70 max-w-xl mx-auto">
            Start a conversation. Get a free project consultation within 2
            hours. No commitment required.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <LinkButton
              href="/book-appointment"
              variant="light"
              size="lg"
            >
              Book Appointment
              <ArrowRightIcon className="h-4 w-4" />
            </LinkButton>
            <LinkButton
              href={SITE_CONFIG.whatsappUrl}
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
              external
            >
              Open WhatsApp
            </LinkButton>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs opacity-50">
            <span className="flex items-center gap-1">
              <CheckCircleIcon className="h-3.5 w-3.5" />
              Free consultation
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon className="h-3.5 w-3.5" />
              Response within 2 hours
            </span>
            <span className="flex items-center gap-1">
              <ChatBubbleLeftRightIcon className="h-3.5 w-3.5" />
              AI concierge available 24/7
            </span>
          </div>
        </Container>
      </Section>
    </>
  );
}
