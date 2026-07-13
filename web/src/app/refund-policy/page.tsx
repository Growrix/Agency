import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MarketingHeroTitle } from "@/components/marketing/MarketingHeroTitle";
import { LegalDocumentMobile } from "@/components/marketing/legal/LegalDocumentMobile";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Growrix OS refund policy for digital products, service tiers, and custom engagements — including timeframes, eligibility, and how to request a refund.",
};

const SECTIONS = [
  {
    id: "overview",
    title: "Overview",
    body: [
      "This policy explains when we issue refunds, how long refunds take to settle on the original payment method, and how to file a refund request.",
      "It applies to all purchases made through growrixos.com, including digital templates, done-for-you setup services, and subscription add-ons.",
    ],
  },
  {
    id: "digital-products",
    title: "Digital products",
    body: [
      "Digital-download products (HTML templates, code kits, design assets) are eligible for a full refund within 14 days of purchase if they materially fail to match their documented description.",
      "Because digital deliverables cannot be un-downloaded, refunds are considered case-by-case once files have been accessed. We may request that you confirm you have deleted local copies before issuing the refund.",
      "If a product is defective on delivery, we prioritize replacement or correction first. Refunds are issued when we cannot resolve the defect within a reasonable time.",
    ],
  },
  {
    id: "service-tiers",
    title: "Service tiers (Standard / Premium / Done-For-You)",
    body: [
      "Standard tier: refundable in full before delivery work begins. Once delivery has started, refunds are prorated against the work already completed.",
      "Premium tier: same rules as Standard, plus a 7-day satisfaction check after handover. If your acceptance criteria are not met, we revise or refund the delta.",
      "Done-For-You tier: milestone-based. Each milestone is independently refundable before it is delivered and accepted; once accepted, that milestone is final.",
    ],
  },
  {
    id: "subscriptions",
    title: "Subscriptions and recurring add-ons",
    body: [
      "Recurring subscriptions (maintenance plans, hosted add-ons) can be cancelled at any time from your customer dashboard. Cancellation takes effect at the end of the current billing period.",
      "We do not issue prorated refunds for the remainder of an active billing period, but you retain access until the period ends.",
      "If a subscription was charged after cancellation due to a billing error, we refund the disputed charge in full.",
    ],
  },
  {
    id: "how-to-request",
    title: "How to request a refund",
    body: [
      "Email admin@growrixos.com or open a support ticket from your customer dashboard. Include your order reference (or Stripe receipt) and a short description of the issue.",
      "We acknowledge refund requests within one business day and complete review within five business days.",
      "Approved refunds are issued via Stripe's refund API to the original payment method. Stripe typically settles refunds in 5-10 business days depending on your bank.",
    ],
  },
  {
    id: "not-eligible",
    title: "What is not eligible",
    body: [
      "Change of mind after a digital product has been extensively used or integrated into a live production system.",
      "Custom-scoped engagements where milestones have been formally accepted.",
      "Requests filed after the eligibility window (14 days for digital products; 7 days after handover for Premium tier).",
    ],
  },
  {
    id: "chargebacks",
    title: "Chargebacks and disputes",
    body: [
      "We prefer to resolve issues directly. If you file a chargeback with your bank before contacting us, we will pause any related deliveries and respond to your bank with our records.",
      "Chargebacks filed in bad faith (e.g., after accepting deliverables) may result in your account being restricted from future purchases.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Questions about this policy or an in-flight refund? Reach us via the contact page or email admin@growrixos.com. We aim to respond within one business day, Monday through Friday.",
    ],
  },
];

export default function RefundPolicyPage() {
  const intro =
    "Last updated July 3, 2026. This policy explains refund eligibility, timeframes, and how to file a request for Growrix OS purchases.";

  return (
    <Section className="overflow-x-hidden py-10 sm:py-12">
      <Container width="reading" className="min-w-0 px-4 sm:px-6">
        <MarketingViewportGate
          mobile={
            <LegalDocumentMobile
              eyebrow="Legal"
              titleLead="Refund"
              titleAccent="Policy"
              intro={intro}
              sections={SECTIONS}
              footerTitle="Need to request a refund?"
              footerDescription="Reach out and we will guide you through the process."
              primaryCta={{ label: "Contact us", href: "/contact" }}
              secondaryLink={{ label: "Read terms of service →", href: "/legal/terms" }}
            />
          }
          desktop={
            <>
              <Badge tone="primary" dot>
                Legal
              </Badge>
              <MarketingHeroTitle className="mt-5" title="Refund Policy" />
              <p className="mt-4 text-text-muted text-pretty">{intro}</p>
              <nav className="mt-8 rounded-md border border-border bg-surface p-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">On this page</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="text-sm text-primary hover:underline">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-12 space-y-12">
                {SECTIONS.map((s) => (
                  <section key={s.id} id={s.id} className="scroll-mt-24">
                    <h2 className="font-display text-2xl tracking-tight">{s.title}</h2>
                    <div className="mt-4 space-y-3 text-text-muted leading-7 text-pretty">
                      {s.body.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-12 rounded-[20px] border border-border bg-surface p-8">
                <h3 className="font-display text-xl tracking-tight">Need to request a refund?</h3>
                <p className="mt-2 text-text-muted">Reach out and we will guide you through the process.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <LinkButton href="/contact">Contact us</LinkButton>
                  <Link
                    href="/legal/terms"
                    className="inline-flex items-center text-sm font-medium text-primary px-3 py-2"
                  >
                    Read terms of service →
                  </Link>
                </div>
              </div>
            </>
          }
        />
      </Container>
    </Section>
  );
}
