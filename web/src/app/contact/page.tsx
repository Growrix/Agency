"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon,
  SparklesIcon,
  PaperAirplaneIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton, Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Accordion } from "@/components/sections/Accordion";
import { motion } from "@/components/motion/Motion";
import { WHATSAPP_HREF } from "@/lib/nav";
import { FAQ_GENERAL } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useConciergeStore } from "@/lib/concierge-store";

const CHANNELS = [
  { icon: PaperAirplaneIcon, name: "Inquiry form", description: "Best for website, SaaS, mobile app, or ready-website briefs that need clear scoping.", action: "Use the form below", href: "#form", recommended: true },
  { icon: ChatBubbleLeftRightIcon, name: "WhatsApp", description: "Best for fast questions about pricing, timelines, and product fit during business hours.", action: "Open WhatsApp", href: WHATSAPP_HREF },
  { icon: SparklesIcon, name: "AI Concierge", description: "Best for instant answers about websites, ready websites, SaaS work, and launch timing.", action: "Ask the concierge", href: "/ai-concierge" },
  { icon: CalendarDaysIcon, name: "Book a call", description: "Best for discovery, scoping, and decision-grade conversations around a real launch plan.", action: "Book appointment", href: "/book-appointment" },
];

const SERVICE_INTERESTS = [
  "Website template",
  "Ready website",
  "Premium custom website",
  "SaaS application",
  "Mobile app launch / marketing site",
  "MCP Server",
  "Automation",
  "Not sure yet",
];

const BUDGET_BANDS = ["$500 - $1k", "$1k - $3k", "$3k - $10k", "$10k - $25k", "$25k+", "Not sure yet"];
const URGENCY = ["Exploring", "Within 30 days", "Within 90 days", "ASAP"];

export default function ContactPage() {
  const openConcierge = useConciergeStore((state) => state.open);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    // Form submission will be wired to a real backend in a later phase.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <Container>
          <div className="max-w-3xl">
            <Badge tone="primary" dot>Contact</Badge>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance">
              The fastest way to start the right conversation.
            </h1>
            <p className="mt-6 text-lg text-text-muted leading-7">
              Most inquiries here are about websites, SaaS builds, mobile app launches, and ready websites. We respond to every inquiry within 2 business hours.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-muted">
                <ClockIcon className="size-3.5" /> Mon–Fri · 9am–6pm CET
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-muted">
                <ShieldCheckIcon className="size-3.5" /> Conversations stay private
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-8">
        <Container>
          <SectionHeading eyebrow="Channels" title="Pick the route that fits." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((c) => (
              c.name === "AI Concierge" ? (
                <button key={c.name} type="button" onClick={() => openConcierge()} className="group text-left">
                  <Card hoverable className={cn("h-full", c.recommended && "border-primary/50 ring-1 ring-primary/30")}>
                    <div className="flex items-start justify-between">
                      <div className="inline-flex size-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
                        <c.icon className="size-5" />
                      </div>
                      {c.recommended && <Badge tone="primary">Recommended</Badge>}
                    </div>
                    <h3 className="mt-4 font-display text-lg tracking-tight">{c.name}</h3>
                    <p className="mt-2 text-sm text-text-muted leading-6">{c.description}</p>
                    <p className="mt-4 text-sm font-medium text-primary">{c.action} →</p>
                  </Card>
                </button>
              ) : (
                <Link key={c.name} href={c.href} className="group">
                  <Card hoverable className={cn("h-full", c.recommended && "border-primary/50 ring-1 ring-primary/30")}>
                    <div className="flex items-start justify-between">
                      <div className="inline-flex size-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
                        <c.icon className="size-5" />
                      </div>
                      {c.recommended && <Badge tone="primary">Recommended</Badge>}
                    </div>
                    <h3 className="mt-4 font-display text-lg tracking-tight">{c.name}</h3>
                    <p className="mt-2 text-sm text-text-muted leading-6">{c.description}</p>
                    <p className="mt-4 text-sm font-medium text-primary">{c.action} →</p>
                  </Card>
                </Link>
              )
            ))}
          </div>
        </Container>
      </Section>

      <Section id="form" tone="inset">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Inquiry form"
                title="Tell us what you want to launch."
                description="Share the website, SaaS product, mobile launch, or ready-site need, plus the timeline and constraints. We'll respond with a written next step within 2 business hours."
              />
              <Card className="mt-8">
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Trust note</p>
                <p className="mt-2 text-sm leading-6 text-text-muted">
                  Your message is sent over HTTPS, stored securely, and only used to respond to your inquiry. Qualifying international clients can also use our delivery-first payment option. See our{" "}
                  <Link href="/privacy-policy" className="text-primary underline">privacy policy</Link>.
                </p>
              </Card>
            </div>
            <div className="lg:col-span-7">
              <Card>
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 360, damping: 24, mass: 0.6 }}
                    className="text-center py-6"
                  >
                    <motion.div
                      initial={{ scale: 0.4, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 420, damping: 18, delay: 0.05 }}
                    >
                      <CheckCircleIcon className="mx-auto size-12 text-success" aria-hidden />
                    </motion.div>
                    <h3 className="mt-4 font-display text-2xl tracking-tight">Thanks — we got it.</h3>
                    <p className="mx-auto mt-2 max-w-md text-text-muted">
                      We&apos;ll respond within 2 business hours. Need something faster? Open WhatsApp or book a call.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3 justify-center">
                      <LinkButton href={WHATSAPP_HREF} variant="outline">WhatsApp us</LinkButton>
                      <LinkButton href="/book-appointment">Book a call</LinkButton>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5" aria-busy={status === "submitting"}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name" required>
                        <input name="name" required className="signal-input" placeholder="Your name" />
                      </Field>
                      <Field label="Email" required>
                        <input type="email" name="email" required className="signal-input" placeholder="you@company.com" />
                      </Field>
                    </div>
                    <Field label="Company">
                      <input name="company" className="signal-input" placeholder="Optional" />
                    </Field>
                    <Field label="Service interest">
                      <select name="service" className="signal-input" defaultValue="">
                        <option value="" disabled>Select one…</option>
                        {SERVICE_INTERESTS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Budget band">
                        <select name="budget" className="signal-input" defaultValue="">
                          <option value="" disabled>Select one…</option>
                          {BUDGET_BANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </Field>
                      <Field label="Urgency">
                        <select name="urgency" className="signal-input" defaultValue="">
                          <option value="" disabled>Select one…</option>
                          {URGENCY.map((u) => <option key={u} value={u}>{u}</option>)}
                        </select>
                      </Field>
                    </div>
                    <Field label="Project summary" required>
                      <textarea name="message" required rows={5} className="signal-input" placeholder="What are you building? What problem are we solving?" />
                    </Field>
                    <div className="flex items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-text-muted">By submitting, you agree to our privacy policy.</p>
                      <Button type="submit" disabled={status === "submitting"}>
                        {status === "submitting" ? "Sending…" : "Send inquiry"}
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="reading">
          <SectionHeading eyebrow="FAQ" title="Common questions before you write." align="center" />
          <div className="mt-10">
            <Accordion items={FAQ_GENERAL.slice(0, 4)} />
          </div>
        </Container>
      </Section>

      {/* Inline minimal styling for inputs to keep the form clean */}
      <style jsx global>{`
        .signal-input {
          width: 100%;
          height: 44px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          border-radius: 12px;
          padding: 0 14px;
          font-size: 15px;
          color: var(--color-text);
          transition: border-color 150ms var(--ease-signal);
        }
        textarea.signal-input {
          height: auto;
          padding: 12px 14px;
          line-height: 1.55;
          resize: vertical;
          min-height: 120px;
        }
        .signal-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.15);
        }
        .signal-input::placeholder {
          color: var(--color-text-muted);
        }
      `}</style>
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
