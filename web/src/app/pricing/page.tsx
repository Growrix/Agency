import { Container, Section, LinkButton } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent engagement models for every type of project. Product sprints, full builds, and retainers. Custom scoping available.",
};

const tiers = [
  {
    title: "Product Sprint",
    from: "€5,000",
    timeline: "2–4 weeks",
    description:
      "Focused build cycle for MVPs, landing pages, automation setups, or design system foundations.",
    features: [
      "Scoped deliverable with clear definition",
      "Design system or component library",
      "Responsive, tested implementation",
      "Deployment and handoff documentation",
      "1 round of revisions included",
    ],
    ideal: "MVPs, landing pages, automation scripts, design systems",
  },
  {
    title: "Full Build",
    from: "€15,000",
    timeline: "8–16 weeks",
    description:
      "End-to-end product development from product strategy through launch and initial optimization.",
    features: [
      "Product strategy and technical scoping",
      "Full UI/UX design system",
      "Frontend and backend engineering",
      "API design and third-party integrations",
      "CI/CD pipeline and monitoring",
      "QA, security review, and launch support",
    ],
    ideal: "SaaS products, websites, MCP servers, commerce platforms",
    featured: true,
  },
  {
    title: "Retainer",
    from: "€3,000/mo",
    timeline: "Ongoing",
    description:
      "Dedicated engineering capacity for continuous development, optimization, and support.",
    features: [
      "Guaranteed weekly capacity",
      "Priority response and communication",
      "Monthly progress reviews",
      "Performance and security monitoring",
      "Feature development and bug fixes",
      "Architecture advisory",
    ],
    ideal: "Growing products, long-term partnerships, continuous improvement",
  },
];

const faqs = [
  {
    q: "Can I start with a sprint and upgrade to a full build?",
    a: "Absolutely. Many clients start with a focused sprint to validate scope and then expand into a full engagement.",
  },
  {
    q: "What's included in the free consultation?",
    a: "A 30-minute call to understand your project goals, discuss feasibility, and recommend an engagement model. No commitment required.",
  },
  {
    q: "Do you offer fixed-price contracts?",
    a: "Yes, for well-scoped projects. We always provide detailed scope documents before work begins.",
  },
  {
    q: "What about ongoing support after launch?",
    a: "Every engagement includes a post-launch support window. For continued work, our retainer model provides the best value.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-16 sm:pt-20 lg:pt-28">
        <Container size="xl" className="text-center">
          <Badge variant="primary" className="mb-6">
            Pricing
          </Badge>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Transparent Engagement Models
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Clear starting points for every project type. Custom scoping
            for complex builds. No hidden fees.
          </p>
        </Container>
      </Section>

      {/* Pricing Tiers */}
      <Section className="pt-0">
        <Container size="2xl">
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <Card
                key={tier.title}
                padding="lg"
                className={
                  tier.featured
                    ? "border-primary ring-1 ring-primary/20 relative"
                    : undefined
                }
              >
                {tier.featured && (
                  <Badge variant="primary" className="absolute -top-3 left-6">
                    Most Popular
                  </Badge>
                )}
                <h2
                  className="text-xl font-bold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {tier.title}
                </h2>
                <div className="mt-3 flex items-baseline gap-1">
                  <span
                    className="text-4xl font-bold text-primary"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {tier.from}
                  </span>
                  <span className="text-sm text-muted">starting</span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-sm text-muted">
                  <ClockIcon className="h-4 w-4" />
                  {tier.timeline}
                </div>
                <p className="mt-4 text-sm text-muted leading-relaxed">
                  {tier.description}
                </p>
                <hr className="my-6 border-border" />
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircleIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted">
                  <strong>Ideal for:</strong> {tier.ideal}
                </p>
                <div className="mt-6">
                  <LinkButton
                    href="/book-appointment"
                    variant={tier.featured ? "primary" : "outline"}
                    className="w-full"
                  >
                    Get a Tailored Proposal
                  </LinkButton>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Trust Signals */}
      <Section className="bg-surface">
        <Container size="xl">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: CurrencyDollarIcon,
                title: "Transparent Pricing",
                text: "Detailed scope and cost breakdown before any work begins.",
              },
              {
                icon: ShieldCheckIcon,
                title: "Quality Guarantee",
                text: "Every deliverable passes QA and security gates before handoff.",
              },
              {
                icon: ClockIcon,
                title: "Predictable Timelines",
                text: "Milestone-based delivery with clear progress visibility.",
              },
            ].map((item) => (
              <div key={item.title}>
                <div className="mx-auto h-12 w-12 rounded-[var(--radius-md)] bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container size="lg">
          <h2
            className="text-3xl font-bold tracking-tight text-center mb-12"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Pricing Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-[var(--radius-lg)] bg-surface border border-border"
              >
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-foreground text-background">
        <Container size="lg" className="text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready for a Custom Proposal?
          </h2>
          <p className="mt-4 opacity-70 max-w-lg mx-auto">
            Book a free consultation. We&apos;ll discuss your project and
            provide a detailed scope and cost estimate within 48 hours.
          </p>
          <div className="mt-8">
            <LinkButton
              href="/book-appointment"
              variant="light"
              size="lg"
            >
              Book Appointment
              <ArrowRightIcon className="h-4 w-4" />
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
