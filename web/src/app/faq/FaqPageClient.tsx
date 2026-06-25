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
import { MarketingHeroTitle } from "@/components/marketing/MarketingHeroTitle";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MarketingPageHeroMobile } from "@/components/marketing/MarketingPageHeroMobile";
import { MobileFilterChips } from "@/components/marketing/MobileFilterChips";
import { ProductLedFinalCTAMobile } from "@/components/marketing/ProductLedFinalCTAMobile";
import { FaqQuickAnswersMobile } from "@/components/marketing/faq/FaqQuickAnswersMobile";
import { FaqRoutesMobile } from "@/components/marketing/faq/FaqRoutesMobile";
import { ServiceFaqMobile } from "@/components/marketing/services/ServiceFaqMobile";
import { FAQ_HERO } from "@/lib/faq-content";
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

  const allCategories = [{ id: "all", label: "All" }, ...categories];

  return (
    <>
      {/* Hero */}
      <MarketingViewportGate
        mobile={
          <Section size="hero" layout="viewport" className="hero-section relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
            <Container>
              <MarketingPageHeroMobile
                eyebrow={FAQ_HERO.eyebrow}
                titleLead={FAQ_HERO.titleLead}
                titleAccent={FAQ_HERO.titleAccent}
                description={FAQ_HERO.description}
                primaryCta="Book a Call"
                primaryHref="/book-appointment"
                secondaryCta="WhatsApp us"
                secondaryHref={WHATSAPP_HREF}
              />
              <div className="mt-6">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-text-muted" aria-hidden />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search the FAQ…"
                    className="h-12 w-full rounded-md border border-border bg-surface pl-12 pr-12 text-sm placeholder:text-text-muted outline-none focus:border-primary"
                  />
                  {query ? (
                    <button
                      onClick={() => setQuery("")}
                      aria-label="Clear"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-inset"
                    >
                      <XMarkIcon className="size-4" />
                    </button>
                  ) : null}
                </div>
                <div className="mt-4">
                  <MobileFilterChips
                    items={allCategories.map((c) => ({ label: c.label, value: c.id }))}
                    active={category}
                    onSelect={setCategory}
                  />
                </div>
              </div>
            </Container>
          </Section>
        }
        desktop={
          <Section size="hero" layout="viewport" className="hero-section relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
            <Container>
              <div className="max-w-3xl">
                <Badge tone="primary" dot>FAQ</Badge>
                <MarketingHeroTitle
                  className="mt-5 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance"
                  title={FAQ_HERO.title}
                  titleLead={FAQ_HERO.titleLead}
                  titleAccent={FAQ_HERO.titleAccent}
                />
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
                    className="h-14 w-full rounded-md border border-border bg-surface pl-12 pr-12 text-base placeholder:text-text-muted outline-none shadow-(--shadow-1) focus:border-primary"
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
        }
      />

      <Section size="standard" layout="content" spacing="split">
        <Container>
          <MarketingViewportGate
            mobile={<FaqQuickAnswersMobile items={quick} />}
            desktop={
              <>
                <SectionHeading eyebrow="Quick answers" title="The most common ones up front." />
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {quick.map((item) => (
                    <Card key={item.question} className="h-full">
                      <h3 className="font-display text-lg tracking-tight">{item.question}</h3>
                      <p className="mt-2 text-sm text-text-muted leading-6">{item.answer}</p>
                    </Card>
                  ))}
                </div>
              </>
            }
          />
        </Container>
      </Section>

      <Section size="standard" layout="content" spacing="split" tone="inset">
        <Container width="reading">
          <MarketingViewportGate
            mobile={
              <ServiceFaqMobile
                eyebrow="Browse by category"
                title="All questions grouped together."
                titleLead="All questions"
                titleAccent="grouped together."
                items={filtered.map(({ question, answer }) => ({ question, answer }))}
              />
            }
            desktop={
              <>
                <SectionHeading eyebrow="Browse by category" title="All questions grouped together." />
                <div className="mt-10">
                  {filtered.length === 0 ? (
                    <div className="rounded-md border border-dashed border-border-strong bg-surface p-10 text-center">
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
              </>
            }
          />
        </Container>
      </Section>

      <Section size="standard" layout="content" spacing="split">
        <Container>
          <MarketingViewportGate
            mobile={<FaqRoutesMobile />}
            desktop={
              <>
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
              </>
            }
          />
        </Container>
      </Section>

      <MarketingViewportGate
        mobile={
          <ProductLedFinalCTAMobile
            eyebrow="Next step"
            titleLead="Got the answer? Let's scope"
            titleAccent="the right website or product."
            description="Book a discovery call or message us on WhatsApp to move from questions to a scoped plan."
            primaryLabel="Book Appointment"
            primaryHref="/book-appointment"
            secondaryLabel="Open WhatsApp"
            secondaryHref={WHATSAPP_HREF}
          />
        }
        desktop={
          <CTABand
            titleLead="Got the answer? Let's scope"
            titleAccent="the right website or product."
            primary={{ label: "Book Appointment", href: "/book-appointment" }}
            secondary={{ label: "Open WhatsApp", href: WHATSAPP_HREF }}
          />
        }
      />
    </>
  );
}