import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Growrix OS handles data related to contact forms, AI chat, booking, analytics, and payments.",
};

const SECTIONS = [
  {
    id: "collection",
    title: "Data we collect",
    body: [
      "Information you provide via contact forms, booking flows, AI chat, and checkout: name, email, company, project details, and payment metadata.",
      "Technical telemetry: anonymous analytics events, device and browser type, page views, and aggregated performance metrics.",
      "AI conversations: messages you send to the concierge are stored to operate the service and improve quality. They are never used to train external models.",
    ],
  },
  {
    id: "use",
    title: "How we use data",
    body: [
      "Service delivery: responding to inquiries, fulfilling bookings, processing transactions, and providing support.",
      "Quality improvement: aggregated analytics, error monitoring, and performance review.",
      "Communication: project updates, occasional product news (opt-in only), and security notices.",
    ],
  },
  {
    id: "third-parties",
    title: "Third-party services",
    body: [
      "Stripe — payment processing for shop products and milestone invoices.",
      "Calendly or similar — scheduling discovery and project calls.",
      "Vercel + Cloudflare — hosting, edge delivery, and security.",
      "PostHog or Plausible — privacy-respecting analytics.",
      "Sentry — error and performance monitoring.",
      "WhatsApp — direct messaging when initiated by you.",
    ],
  },
  {
    id: "rights",
    title: "Your rights",
    body: [
      "Access: request a copy of any personal data we hold about you.",
      "Correction: request changes to inaccurate or outdated information.",
      "Deletion: request removal of personal data, subject to legal and contractual retention requirements.",
      "Portability: request data in a structured, machine-readable format.",
    ],
  },
  {
    id: "retention",
    title: "Retention",
    body: [
      "Inquiry data: kept for up to 24 months unless project work begins.",
      "Project data: retained for the duration of the engagement plus 7 years for legal and tax compliance.",
      "AI conversation logs: retained for up to 90 days unless required for support.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Questions about this policy? Reach us via the contact page or email privacy@growrixos.example.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-8">
        <Container width="reading">
          <Badge tone="primary" dot>Legal</Badge>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl tracking-tight text-balance">Privacy Policy</h1>
          <p className="mt-4 text-[var(--color-text-muted)] text-pretty">
            Last updated April 19, 2026. This policy explains how we handle data across the website, AI chat, booking, and payments.
          </p>
          <nav className="mt-8 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">On this page</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-sm text-[var(--color-primary)] hover:underline">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      <Section className="py-8">
        <Container width="reading">
          <div className="space-y-12">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="font-display text-2xl tracking-tight">{s.title}</h2>
                <div className="mt-4 space-y-3 text-[var(--color-text-muted)] leading-7 text-pretty">
                  {s.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container width="reading">
          <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
            <h3 className="font-display text-xl tracking-tight">Questions about your data?</h3>
            <p className="mt-2 text-[var(--color-text-muted)]">We respond to privacy questions within 5 business days.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <LinkButton href="/contact">Contact us</LinkButton>
              <Link href="/terms-of-service" className="inline-flex items-center text-sm font-medium text-[var(--color-primary)] px-3 py-2">
                Read terms of service →
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
