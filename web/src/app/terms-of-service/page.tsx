import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Review the commercial, licensing, payment, and delivery terms for Growrix services and digital products.",
};

const SECTIONS = [
  {
    id: "services",
    title: "Services",
    body: [
      "Engagements are scoped via a written proposal and confirmed via a signed Statement of Work (SOW).",
      "Scope boundaries, deliverables, and revision allotments are defined in each SOW. Out-of-scope work is invoiced as a change request.",
      "Communication runs via dedicated channels established at kickoff. Response times are documented in the SOW or retainer agreement.",
    ],
  },
  {
    id: "products",
    title: "Product purchases",
    body: [
      "Digital products are licensed for use by the purchasing individual or organization. Resale or redistribution is not permitted unless explicitly allowed.",
      "Each product includes 12 months of free updates. Continued use after the update window does not require renewal.",
      "Support scope is documented per product. Optional install support can be purchased separately.",
    ],
  },
  {
    id: "payments",
    title: "Payments and billing",
    body: [
      "Custom engagements: 30% kickoff deposit, with milestone-based invoicing thereafter.",
      "Shop products: charged once via Stripe at checkout. Bundles over $1,000 may be split into 3 monthly installments.",
      "Taxes: invoices include applicable taxes based on the buyer's jurisdiction.",
      "Failed payments: we will attempt to contact you and provide a 7-day cure period before pausing services.",
    ],
  },
  {
    id: "refunds",
    title: "Refunds",
    body: [
      "Digital products are refundable within 14 days if they materially fail to match their documented description.",
      "Custom engagements are non-refundable once milestones have been delivered and accepted.",
      "Disputes are handled in good faith; we prefer resolution via direct conversation before escalation.",
    ],
  },
  {
    id: "liability",
    title: "Liability",
    body: [
      "Aggregate liability is capped at the total fees paid for the engagement in question.",
      "We are not liable for indirect, incidental, or consequential damages arising from use of deliverables.",
      "Client responsibilities include providing timely access to required systems, content, and decision-makers.",
    ],
  },
  {
    id: "use",
    title: "Acceptable use",
    body: [
      "Products and services may not be used to facilitate illegal activity, harassment, or systems that violate applicable privacy and security laws.",
      "We reserve the right to terminate engagements that violate these terms with prorated refunds where appropriate.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Questions about these terms? Reach us via the contact page or email legal@growrix.example.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-8">
        <Container width="reading">
          <Badge tone="primary" dot>Legal</Badge>
          <h1 className="mt-5 font-display text-4xl sm:text-5xl tracking-tight text-balance">Terms of Service</h1>
          <p className="mt-4 text-[var(--color-text-muted)] text-pretty">
            Last updated April 19, 2026. These terms cover services, products, payments, refunds, and acceptable use.
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
            <h3 className="font-display text-xl tracking-tight">Need clarification?</h3>
            <p className="mt-2 text-[var(--color-text-muted)]">We&apos;re happy to walk through any term in detail.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <LinkButton href="/contact">Contact us</LinkButton>
              <Link href="/privacy-policy" className="inline-flex items-center text-sm font-medium text-[var(--color-primary)] px-3 py-2">
                Read privacy policy →
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
