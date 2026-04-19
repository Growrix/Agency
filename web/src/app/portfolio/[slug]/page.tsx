import { Container, Section, LinkButton } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Link from "next/link";

// In a real implementation, this would come from a CMS or API.
// For now, we use static data to match the portfolio listing.
const caseStudies: Record<
  string,
  {
    title: string;
    category: string;
    client: string;
    timeline: string;
    challenge: string;
    approach: string[];
    results: { metric: string; value: string }[];
    techStack: string[];
    testimonial?: { quote: string; author: string; role: string };
  }
> = {
  "fintech-dashboard": {
    title: "FinTech Dashboard Rebuild",
    category: "SaaS Application",
    client: "FinTech Startup (NDA)",
    timeline: "12 weeks",
    challenge:
      "The existing dashboard was slow, difficult to navigate, and losing users during onboarding. The client needed a complete rebuild with improved performance, new design system, and better user flows.",
    approach: [
      "Conducted user research and mapped critical journey pain points",
      "Designed a new component library with accessibility-first principles",
      "Built a React-based frontend with server-side rendering for speed",
      "Implemented progressive onboarding with guided walkthroughs",
      "Optimized database queries and API response times",
      "Set up comprehensive monitoring and alerting",
    ],
    results: [
      { metric: "Load Time Reduction", value: "3x faster" },
      { metric: "User Retention", value: "+40%" },
      { metric: "Onboarding Completion", value: "+65%" },
      { metric: "Lighthouse Score", value: "96" },
    ],
    techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "Redis", "Vercel"],
    testimonial: {
      quote:
        "They delivered our SaaS platform ahead of schedule with exceptional code quality. The team feels like an extension of ours.",
      author: "Sarah K.",
      role: "CTO, FinTech Startup",
    },
  },
  "ecommerce-platform": {
    title: "E-Commerce Platform Launch",
    category: "Website",
    client: "European Fashion Brand",
    timeline: "10 weeks",
    challenge:
      "A premium fashion brand needed a direct-to-consumer website that matched their brand quality. The existing template-based site couldn't deliver the performance, conversion rates, or editorial feel they needed.",
    approach: [
      "Developed a custom design system reflecting the brand's editorial aesthetic",
      "Built server-rendered product pages optimized for SEO and speed",
      "Integrated Stripe for secure, PCI-compliant payment processing",
      "Implemented headless CMS for easy product and content management",
      "Optimized images and assets for Core Web Vitals",
      "Set up analytics and conversion tracking from day one",
    ],
    results: [
      { metric: "First Quarter Revenue", value: "€2M" },
      { metric: "Lighthouse Score", value: "98" },
      { metric: "Conversion Rate", value: "4.2%" },
      { metric: "Page Load Time", value: "1.1s" },
    ],
    techStack: ["Next.js", "Stripe", "Headless CMS", "Tailwind CSS", "Vercel"],
    testimonial: {
      quote:
        "Our website conversion rate tripled within two months. The attention to performance and UX details was outstanding.",
      author: "Marc D.",
      role: "Founder, E-Commerce Brand",
    },
  },
  "ai-agent-hub": {
    title: "AI Agent Integration Hub",
    category: "MCP Server",
    client: "AI Company",
    timeline: "8 weeks",
    challenge:
      "A growing AI company needed to connect their agents to 12+ internal tools. Existing integrations were fragile, undocumented, and required manual intervention for common tasks.",
    approach: [
      "Audited all existing integrations and mapped tool capabilities",
      "Designed an MCP server with clear tool and resource schemas",
      "Built robust error handling, retries, and rate limiting",
      "Implemented comprehensive logging and monitoring",
      "Containerized the server for easy deployment and scaling",
      "Created documentation and usage examples for the team",
    ],
    results: [
      { metric: "Tools Connected", value: "12" },
      { metric: "Manual Work Reduction", value: "60%" },
      { metric: "Uptime", value: "99.9%" },
      { metric: "Avg. Response Time", value: "180ms" },
    ],
    techStack: ["TypeScript", "MCP Protocol", "Docker", "PostgreSQL", "Redis"],
    testimonial: {
      quote:
        "The MCP server integration transformed how our AI agents interact with our tools. Truly cutting-edge work.",
      author: "Elena R.",
      role: "Head of Engineering, AI Company",
    },
  },
};

// Fallback for unknown slugs
const defaultStudy = {
  title: "Case Study",
  category: "Project",
  client: "Client",
  timeline: "N/A",
  challenge: "Details coming soon.",
  approach: [],
  results: [],
  techStack: [],
};

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // We need to resolve the promise synchronously for metadata, use a workaround
  return params.then(({ slug }) => {
    const study = caseStudies[slug] ?? defaultStudy;
    return {
      title: study.title,
      description: `Case study: ${study.title}. ${study.challenge.slice(0, 120)}...`,
    };
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug] ?? defaultStudy;

  return (
    <>
      <Section className="pt-16 sm:pt-20 lg:pt-28">
        <Container size="xl">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Back to Portfolio
          </Link>
          <Badge variant="primary" className="mb-4">
            {study.category}
          </Badge>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {study.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted">
            <span>Client: {study.client}</span>
            <span>Timeline: {study.timeline}</span>
          </div>
        </Container>
      </Section>

      {/* Challenge */}
      <Section className="pt-0">
        <Container size="lg">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Challenge
          </h2>
          <p className="text-muted leading-relaxed">{study.challenge}</p>
        </Container>
      </Section>

      {/* Approach */}
      {study.approach.length > 0 && (
        <Section className="bg-surface">
          <Container size="lg">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our Approach
            </h2>
            <ul className="space-y-3">
              {study.approach.map((step) => (
                <li key={step} className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Results */}
      {study.results.length > 0 && (
        <Section>
          <Container size="lg">
            <h2
              className="text-2xl font-bold mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Results
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {study.results.map((result) => (
                <Card key={result.metric} padding="lg" className="text-center">
                  <div
                    className="text-3xl font-bold text-primary mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {result.value}
                  </div>
                  <div className="text-xs text-muted">{result.metric}</div>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Tech Stack */}
      {study.techStack.length > 0 && (
        <Section className="bg-surface pt-8 pb-8">
          <Container size="lg">
            <h3 className="text-sm font-semibold text-muted mb-3">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {study.techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Testimonial */}
      {study.testimonial && (
        <Section>
          <Container size="lg">
            <Card padding="lg" className="bg-primary/5 border-primary/10">
              <blockquote className="text-lg leading-relaxed">
                &ldquo;{study.testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-4">
                <div className="font-semibold">{study.testimonial.author}</div>
                <div className="text-sm text-muted">{study.testimonial.role}</div>
              </div>
            </Card>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section className="bg-foreground text-background">
        <Container size="lg" className="text-center">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Build Something Similar?
          </h2>
          <p className="mt-4 opacity-70">
            Let&apos;s discuss how we can apply the same approach to your project.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <LinkButton
              href="/book-appointment"
              variant="light"
              size="lg"
            >
              Book a Discovery Call
              <ArrowRightIcon className="h-4 w-4" />
            </LinkButton>
            <LinkButton
              href="/portfolio"
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Explore More Work
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
