import { Container, Section, LinkButton } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  HeartIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the team behind Agency. Our operating principles, quality standards, and mission to build exceptional digital products.",
};

const principles = [
  {
    icon: LightBulbIcon,
    title: "Product Thinking First",
    description:
      "We don't just write code — we understand the business problem, define the product strategy, and build with outcomes in mind.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Quality as a Standard",
    description:
      "Every deliverable passes through security review, QA gates, and performance benchmarks before it ships.",
  },
  {
    icon: RocketLaunchIcon,
    title: "Ship With Confidence",
    description:
      "Structured processes, clear milestones, and transparent communication so you always know where things stand.",
  },
  {
    icon: HeartIcon,
    title: "Partnership Over Transactions",
    description:
      "We build relationships, not just projects. Your success is our success, and we're invested for the long term.",
  },
  {
    icon: SparklesIcon,
    title: "Craft Meets Engineering",
    description:
      "Pixel-perfect design systems paired with production-grade code. No shortcuts, no compromises.",
  },
  {
    icon: UserGroupIcon,
    title: "Transparent Operations",
    description:
      "Open communication, documented processes, and shared tooling. You'll always have visibility into the work.",
  },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js",
  "PostgreSQL", "Redis", "Stripe", "Tailwind CSS",
  "Framer Motion", "OpenAI", "Anthropic", "MCP Protocol",
  "Docker", "Vercel", "AWS", "GitHub Actions",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-16 sm:pt-20 lg:pt-28">
        <Container size="xl">
          <div className="max-w-3xl">
            <Badge variant="primary" className="mb-6">
              About Us
            </Badge>
            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              A Product-Minded{" "}
              <span className="text-primary">Technical Partner</span>
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              We're a web development agency that builds SaaS applications,
              high-conversion websites, MCP servers, and automation systems.
              We treat every engagement as a product challenge — not just a
              development task.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <LinkButton href="/book-appointment" size="lg">
                Meet Through a Call
                <ArrowRightIcon className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/services" variant="outline" size="lg">
                Explore Our Process
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      {/* Operating Principles */}
      <Section className="bg-surface">
        <Container size="2xl">
          <div className="text-center mb-12">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Operating Principles
            </h2>
            <p className="mt-3 text-muted max-w-2xl mx-auto">
              The standards and practices that define how we work, what we
              deliver, and why clients trust us with complex builds.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((principle) => (
              <Card key={principle.title} padding="lg" as="article">
                <div className="h-10 w-10 rounded-[var(--radius-sm)] bg-primary/10 flex items-center justify-center mb-4">
                  <principle.icon className="h-5 w-5 text-primary" />
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {principle.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {principle.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Tech Stack */}
      <Section>
        <Container size="xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Our Technology Stack
              </h2>
              <p className="mt-4 text-muted leading-relaxed max-w-lg">
                We use modern, proven technologies chosen for performance,
                developer experience, and long-term maintainability. Every tool
                earns its place in the stack.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full bg-surface border border-border text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
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
            Let&apos;s Work Together
          </h2>
          <p className="mt-4 opacity-70 max-w-lg mx-auto">
            Whether you need a full product build, a focused sprint, or ongoing
            engineering support — we&apos;re ready to discuss your project.
          </p>
          <div className="mt-8">
            <LinkButton
              href="/book-appointment"
              variant="light"
              size="lg"
            >
              Book a Discovery Call
              <ArrowRightIcon className="h-4 w-4" />
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
