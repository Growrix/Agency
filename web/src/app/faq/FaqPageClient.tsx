"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
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

type FaqPageClientProps = {
  categories: Array<{ id: string; label: string }>;
  questions: Array<{ category: string; question: string; answer: string }>;
  quick: Array<{ question: string; answer: string }>;
};

export function FaqPageClient({ categories, questions, quick }: FaqPageClientProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    return questions.filter((item) => {
      if (category !== "all" && item.category !== category) {
        return false;
      }

      if (query && !`${item.question} ${item.answer}`.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [questions, query, category]);

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
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the FAQ…"
                className="h-14 w-full rounded-[16px] border border-border bg-surface pl-12 pr-12 text-base placeholder:text-text-muted outline-none shadow-(--shadow-1) focus:border-primary"
              />
              {query ? (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-inset"
                >
                  <XMarkIcon className="size-5" />
                </button>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={() => setCategory("all")}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium",
                  category === "all" ? "border-primary bg-primary text-white" : "border-border bg-surface"
                )}
              >
                All
              </button>
              {categories.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCategory(item.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium",
                    category === item.id ? "border-primary bg-primary text-white" : "border-border bg-surface"
                  )}
                >
                  {item.label}
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
            {quick.map((item) => (
              <Card key={item.question} className="h-full">
                <h3 className="font-display text-lg tracking-tight">{item.question}</h3>
                <p className="mt-2 text-sm text-text-muted leading-6">{item.answer}</p>
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
                <p className="mt-3 font-display text-lg tracking-tight">AI Growrix OS</p>
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