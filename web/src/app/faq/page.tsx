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
  { category: "services", question: "What services do you offer?", answer: "SaaS applications, websites, MCP servers, and operational automation. We choose engagements based on outcome fit, not capability fit." },
  { category: "services", question: "How do projects typically start?", answer: "A 30-minute discovery call, followed by a written plan within 48 hours. Nothing is signed until the plan reads correctly to you." },
  { category: "services", question: "Will I own the code and assets?", answer: "Yes. On project completion, code, design files, and infrastructure ownership transfer to you." },
  { category: "pricing", question: "What is the deposit?", answer: "30% on engagement kickoff. Remaining payments are milestone-based across the project." },
  { category: "pricing", question: "Do you offer payment plans?", answer: "For shop bundles over $1k, we offer 3-month installments via Stripe." },
  { category: "pricing", question: "Can we pay monthly?", answer: "Yes — Product Partner and retainer engagements are monthly. Custom work can also be split into monthly invoices." },
  { category: "shop", question: "Are shop products refundable?", answer: "Digital products are refundable within 14 days if they don't meet the documented description." },
  { category: "shop", question: "Do shop products include support?", answer: "Each product comes with setup documentation. Optional install support can be added at checkout." },
  { category: "shop", question: "How do updates work?", answer: "Products receive 12 months of free updates. After that, you can renew or continue using your current version indefinitely." },
  { category: "booking", question: "How long is the discovery call?", answer: "30 minutes by default. We can extend to 60 minutes for complex projects on request." },
  { category: "booking", question: "What time zones do you cover?", answer: "Primary CET hours, with availability for North American mornings and South Asian afternoons." },
  { category: "booking", question: "Do you sign NDAs?", answer: "Yes — happy to sign a mutual NDA before the discovery call when needed." },
  { category: "support", question: "Do you support after launch?", answer: "Yes. We offer support retainers covering maintenance, performance, security patches, and feature delivery." },
  { category: "support", question: "What's your response time?", answer: "Inquiries: under 2 business hours. Retainer support: SLA-backed and defined per engagement." },
  { category: "support", question: "Can you fix work from another team?", answer: "Yes. We frequently audit and rebuild on top of existing engagements with a clear assessment first." },
  { category: "technical", question: "What stack do you prefer?", answer: "Next.js, React, TypeScript, Tailwind, Postgres, Stripe, OpenAI/Anthropic, Vercel, and Cloudflare are our defaults." },
  { category: "technical", question: "Where do you deploy MCP servers?", answer: "Cloudflare Workers, Fly, Vercel, or your AWS — we adapt to your infra preferences and security posture." },
  { category: "technical", question: "How do you handle data and privacy?", answer: "We follow GDPR-style baselines: minimal collection, encrypted at rest, scoped access, and clear retention." },
];

const QUICK = [
  { question: "How fast can we launch a website?", answer: "Launch sprints land in 4–6 weeks. Redesigns typically in 8–10 weeks." },
  { question: "Do you work with our team?", answer: "Yes — we frequently embed alongside in-house teams as a product pod." },
  { question: "How do payments work?", answer: "30% kickoff deposit. Remaining payments on milestone acceptance." },
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
            <p className="mt-6 text-lg text-[var(--color-text-muted)] leading-7">
              Search by keyword or browse by category. Can&apos;t find your question? Ask the concierge or open WhatsApp.
            </p>
          </div>

          <div className="mt-10 max-w-2xl">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[var(--color-text-muted)]" aria-hidden />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the FAQ…"
                className="w-full h-14 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] pl-12 pr-12 text-base placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] outline-none shadow-[var(--shadow-1)]"
              />
              {q && (
                <button onClick={() => setQ("")} aria-label="Clear" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-[var(--color-inset)]">
                  <XMarkIcon className="size-5" />
                </button>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button onClick={() => setCat("all")} className={cn("rounded-full px-3.5 py-1.5 text-sm font-medium border", cat === "all" ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "bg-[var(--color-surface)] border-[var(--color-border)]")}>All</button>
              {CATEGORIES.map((c) => (
                <button key={c.id} onClick={() => setCat(c.id)} className={cn("rounded-full px-3.5 py-1.5 text-sm font-medium border", cat === c.id ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]" : "bg-[var(--color-surface)] border-[var(--color-border)]")}>
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
                <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-6">{qa.answer}</p>
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
              <div className="rounded-[16px] border border-dashed border-[var(--color-border-strong)] bg-[var(--color-surface)] p-10 text-center">
                <p className="font-display text-xl tracking-tight">No matches.</p>
                <p className="mt-2 text-[var(--color-text-muted)]">Try a different keyword or open the concierge.</p>
                <div className="mt-5 flex justify-center gap-3">
                  <LinkButton href="/ai-concierge" variant="outline"><SparklesIcon className="size-4" /> Ask AI</LinkButton>
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
            {[
              { icon: SparklesIcon, label: "AI Concierge", href: "/ai-concierge" },
              { icon: ChatBubbleLeftRightIcon, label: "WhatsApp", href: WHATSAPP_HREF },
              { icon: CalendarDaysIcon, label: "Book a call", href: "/book-appointment" },
            ].map((c) => (
              <Link key={c.label} href={c.href}>
                <Card hoverable className="text-center">
                  <c.icon className="mx-auto size-7 text-[var(--color-primary)]" aria-hidden />
                  <p className="mt-3 font-display text-lg tracking-tight">{c.label}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        title="Got the answer? Ready to scope your project?"
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "Open WhatsApp", href: WHATSAPP_HREF }}
      />
    </>
  );
}
