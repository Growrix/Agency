import { Container, Section, LinkButton } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about our services, pricing, process, and delivery. Can't find your answer? Ask our AI concierge.",
};

const faqs = [
  {
    category: "Services",
    questions: [
      {
        q: "What types of projects do you build?",
        a: "We specialize in SaaS applications, high-conversion websites, MCP (Model Context Protocol) servers, and workflow automation systems. Each engagement is scoped as a product build with clear deliverables.",
      },
      {
        q: "Do you work with startups or enterprises?",
        a: "Both. We've built MVPs for early-stage startups and modernized internal tools for enterprises. Our process scales to fit the complexity and compliance requirements of any organization.",
      },
      {
        q: "What technologies do you use?",
        a: "Our primary stack includes React, Next.js, TypeScript, Node.js, PostgreSQL, and modern deployment tools. We choose technologies based on project requirements, not preferences.",
      },
    ],
  },
  {
    category: "Pricing & Engagement",
    questions: [
      {
        q: "How much does a project cost?",
        a: "Product sprints start at €5,000 (2–4 weeks). Full builds start at €15,000 (8–16 weeks). Retainers start at €3,000/month. Every project gets a detailed scope and cost estimate before work begins.",
      },
      {
        q: "Do you offer fixed-price contracts?",
        a: "Yes, for well-scoped projects. We provide detailed scope documents and milestone-based payment schedules. Changes to scope are handled through documented change requests.",
      },
      {
        q: "Can I start small and scale up?",
        a: "Absolutely. Many clients start with a focused sprint to validate scope and then expand into a full engagement or retainer.",
      },
    ],
  },
  {
    category: "Process & Delivery",
    questions: [
      {
        q: "What's your development process?",
        a: "We follow a 6-phase process: Discovery, Strategy, Design System, Build, QA & Launch, and Optimize. Each phase has clear outputs and quality gates.",
      },
      {
        q: "How do you handle communication?",
        a: "You get a dedicated project channel, weekly progress updates, and direct access to the engineering team. We respond to all messages within 2 hours during business hours.",
      },
      {
        q: "What happens after launch?",
        a: "Every project includes a post-launch support window. For ongoing work, our retainer model provides dedicated capacity for continuous improvement and support.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        q: "Do you provide hosting and deployment?",
        a: "Yes. We set up CI/CD pipelines, configure deployment environments, and can manage hosting through Vercel, AWS, or your preferred provider.",
      },
      {
        q: "How do you handle security?",
        a: "Security is built into our process: HTTPS, CSRF protection, XSS prevention, RBAC, and data encryption. Every project passes security review before launch.",
      },
      {
        q: "Do you support headless CMS integration?",
        a: "Yes. We integrate with popular headless CMS platforms for content management, making it easy for non-technical team members to update content.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-20 lg:pt-28">
        <Container size="lg" className="text-center">
          <Badge variant="primary" className="mb-6">
            FAQ
          </Badge>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Frequently Asked Questions
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Common questions about our services, pricing, process, and
            technical capabilities. Can&apos;t find your answer?
          </p>
          <div className="mt-6">
            <LinkButton href="/ai-concierge">
              <ChatBubbleLeftRightIcon className="h-4 w-4" />
              Ask the AI Concierge
            </LinkButton>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="lg">
          <div className="space-y-12">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2
                  className="text-xl font-bold mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {section.category}
                </h2>
                <div className="space-y-4">
                  {section.questions.map((faq) => (
                    <div
                      key={faq.q}
                      className="p-6 rounded-[var(--radius-lg)] bg-surface border border-border"
                    >
                      <h3 className="font-semibold mb-2">{faq.q}</h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-foreground text-background">
        <Container size="lg" className="text-center">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Still Have Questions?
          </h2>
          <p className="mt-4 opacity-70">
            Our AI concierge can answer specific questions about your project,
            or book a call for a personalized discussion.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <LinkButton
              href="/ai-concierge"
              variant="light"
              size="lg"
            >
              <ChatBubbleLeftRightIcon className="h-4 w-4" />
              Ask the AI Concierge
            </LinkButton>
            <LinkButton
              href="/book-appointment"
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
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
