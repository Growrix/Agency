"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, SparklesIcon, ChatBubbleLeftRightIcon, CalendarDaysIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Accordion } from "@/components/sections/Accordion";
import { CTABand } from "@/components/sections/CTABand";
import { ConciergeTrigger, ConciergeTriggerButton } from "@/components/ai/ConciergeTrigger";
import { WHATSAPP_HREF } from "@/lib/nav";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "shop", label: "Shop" },
  { id: "booking", label: "Booking" },
  { id: "support", label: "Support" },
  { id: "technical", label: "Technical" },
];

const QUESTIONS: { category: string; question: string; answer: string }[] = [
  { category: "services", question: "What services do you offer?", answer: "Premium websites, SaaS applications, mobile app launch experiences, and ready websites. MCP servers and automation support those core offers when needed." },
  { category: "services", question: "How do projects typically start?", answer: "A 30-minute discovery call, followed by a written plan within 48 hours. Nothing is signed until the plan reads correctly to you." },
  { category: "services", question: "Will I own the code and assets?", answer: "Yes. On project completion, code, design files, and infrastructure ownership transfer to you." },
  { category: "pricing", question: "Do you require an advance payment?", answer: "For qualifying international clients, we can offer delivery-first payment with no advance on the first 100 projects." },
  { category: "pricing", question: "Can we choose a payment arrangement?", answer: "Yes. We are flexible and can tailor milestones, installments, or custom arrangements to the scope." },
  { category: "pricing", question: "Can we pay monthly?", answer: "Yes - Product Partner work is monthly, and larger scopes can also be split into agreed installments." },
  { category: "shop", question: "What comes with a ready website?", answer: "A launch-ready build, setup or handoff notes, and 1 year of free support and maintenance for bugs, security updates, and minor content changes." },
  { category: "shop", question: "Do shop products include support?", answer: "Yes. Website templates and ready websites include setup guidance plus 1 year of support and maintenance." },
  { category: "shop", question: "How do updates work?", answer: "Support and maintenance are included for the first year. After that, you can continue with an ongoing package or keep the delivered version as-is." },
  { category: "booking", question: "How long is the discovery call?", answer: "30 minutes by default. We can extend to 60 minutes for complex projects on request." },
  { category: "booking", question: "What time zones do you cover?", answer: "Primary CET hours, with availability for North American mornings and South Asian afternoons." },
  { category: "booking", question: "Do you sign NDAs?", answer: "Yes — happy to sign a mutual NDA before the discovery call when needed." },
  { category: "support", question: "Do you support after launch?", answer: "Yes. Every delivered site includes 1 year of free support and maintenance, and longer-term retainers are available after that." },
  { category: "support", question: "What's your response time?", answer: "Inquiries: under 2 business hours. Retainer support: SLA-backed and defined per engagement." },
  { category: "support", question: "Can you fix work from another team?", answer: "Yes. We frequently audit and rebuild on top of existing engagements with a clear assessment first." },
  { category: "technical", question: "What stack do you prefer?", answer: "Next.js, React, TypeScript, Tailwind, and headless CMS setups like Strapi or Sanity are our defaults for websites. For products, we layer in the backend and infra that fit the roadmap." },
  { category: "technical", question: "Where do you deploy MCP servers?", answer: "Cloudflare Workers, Fly, Vercel, or your AWS - when MCP is part of the roadmap, we adapt to your infra preferences and security posture." },
  { category: "technical", question: "How do you handle data and privacy?", answer: "We follow GDPR-style baselines: minimal collection, encrypted at rest, scoped access, and clear retention." },
];

const QUICK = [
  { question: "How fast can we launch a website?", answer: "Ready websites can move fastest. Custom websites usually land in 4-10 weeks depending on content and approvals." },
  { question: "Do you work with our team?", answer: "Yes — we frequently embed alongside in-house teams as a product pod." },
  { question: "How do payments work?", answer: "Flexible terms are available, and qualifying international clients can use a no-advance delivery-first model." },
];

export default function FAQPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");

  const filtered = useMemo(() => {
    return QUESTIONS.filter((qq) => {
      if (cat !== "all" && qq.category !== cat) return false;
      if (q && !`${qq.question} ${qq.answer}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, cat]);

  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <Container>
          <div className="max-w-3xl">
            <Badge tone="primary" dot>FAQ</Badge>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance">
              Answers before you ask.
            </h1>
            <p className="mt-6 text-lg text-text-muted leading-7">
              Search by keyword or browse by category. Most questions here are about websites, SaaS builds, ready websites, and payment terms.
            </p>
          </div>

          <div className="mt-10 max-w-2xl">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" aria-hidden />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the FAQ…"
                className="h-14 w-full rounded-[16px] border border-border bg-surface pl-12 pr-12 text-base placeholder:text-text-muted outline-none shadow-(--shadow-1) focus:border-primary"
              />
              {q && (
                <button onClick={() => setQ("")} aria-label="Clear" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-inset">
                  <XMarkIcon className="size-5" />
                </button>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button onClick={() => setCat("all")} className={cn("rounded-full border px-3.5 py-1.5 text-sm font-medium", cat === "all" ? "border-primary bg-primary text-white" : "border-border bg-surface")}>All</button>
              {CATEGORIES.map((c) => (
                <button key={c.id} onClick={() => setCat(c.id)} className={cn("rounded-full border px-3.5 py-1.5 text-sm font-medium", cat === c.id ? "border-primary bg-primary text-white" : "border-border bg-surface")}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-12">
        <Container>
          <SectionHeading eyebrow="Quick answers" title="The most common ones up front." />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {QUICK.map((qa) => (
              <Card key={qa.question} className="h-full">
                <h3 className="font-display text-lg tracking-tight">{qa.question}</h3>
                <p className="mt-2 text-sm text-text-muted leading-6">{qa.answer}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="inset">
        <Container width="reading">
          <SectionHeading eyebrow="Browse by category" title="All questions grouped together." />
          <div className="mt-10">
            {filtered.length === 0 ? (
              <div className="rounded-[16px] border border-dashed border-border-strong bg-surface p-10 text-center">
                <p className="font-display text-xl tracking-tight">No matches.</p>
                <p className="mt-2 text-text-muted">Try a different keyword or open the concierge.</p>
                <div className="mt-5 flex justify-center gap-3">
                  <ConciergeTriggerButton variant="outline"><SparklesIcon className="size-4" /> Ask AI</ConciergeTriggerButton>
                  <LinkButton href={WHATSAPP_HREF}><ChatBubbleLeftRightIcon className="size-4" /> WhatsApp</LinkButton>
                </div>
              </div>
            ) : (
              <Accordion items={filtered.map(({ question, answer }) => ({ question, answer }))} />
            )}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Still stuck" title="Pick a faster route." align="center" />
          <div className="mt-10 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            <ConciergeTrigger className="text-left">
              <Card hoverable className="text-center">
                <SparklesIcon className="mx-auto size-7 text-primary" aria-hidden />
                <p className="mt-3 font-display text-lg tracking-tight">AI Concierge</p>
              </Card>
            </ConciergeTrigger>
            <Link href={WHATSAPP_HREF}>
              <Card hoverable className="text-center">
                <ChatBubbleLeftRightIcon className="mx-auto size-7 text-primary" aria-hidden />
                <p className="mt-3 font-display text-lg tracking-tight">WhatsApp</p>
              </Card>
            </Link>
            <Link href="/book-appointment">
              <Card hoverable className="text-center">
                <CalendarDaysIcon className="mx-auto size-7 text-primary" aria-hidden />
                <p className="mt-3 font-display text-lg tracking-tight">Book a call</p>
              </Card>
            </Link>
          </div>
        </Container>
      </Section>

      <CTABand
        title="Got the answer? Let's scope the right website or product."
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "Open WhatsApp", href: WHATSAPP_HREF }}
      />
    </>
  );
}
