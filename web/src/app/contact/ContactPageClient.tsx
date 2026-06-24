"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  CheckIcon,
  PaperAirplaneIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { LinkButton, Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Accordion } from "@/components/sections/Accordion";
import { ContactHeroPanel } from "@/components/sections/ContactHeroPanel";
import {
  ContactExploreCards,
  ContactProcessTimeline,
  ContactProjectFitList,
  ContactRouteCards,
} from "@/components/sections/ContactSections";
import { motion } from "@/components/motion/Motion";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MarketingPageHeroMobile } from "@/components/marketing/MarketingPageHeroMobile";
import { ServiceFaqMobile } from "@/components/marketing/services/ServiceFaqMobile";
import {
  CONTACT_BUDGET_BANDS,
  CONTACT_CHANNELS,
  CONTACT_EXPLORE,
  CONTACT_FAQ,
  CONTACT_FORM,
  CONTACT_HERO,
  CONTACT_PROCESS,
  CONTACT_ROUTES,
  CONTACT_SERVICE_INTERESTS,
  CONTACT_URGENCY,
} from "@/lib/contact-landing-content";
import { marketingSection } from "@/lib/marketing-composition";
import { WHATSAPP_HREF } from "@/lib/nav";
import { HERO_TITLE_CLASS, HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";
import { useConciergeStore } from "@/lib/concierge-store";
import { cn } from "@/lib/utils";

const CHANNEL_ICONS = {
  "Project Inquiry": PaperAirplaneIcon,
  WhatsApp: ChatBubbleLeftRightIcon,
  "Instant Answers": SparklesIcon,
  "Book A Call": CalendarDaysIcon,
} as const;

export function ContactPageClient() {
  const openConcierge = useConciergeStore((state) => state.open);
  const [isHydrated] = useState(true);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Something went wrong. Please try again or use WhatsApp.");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("Something went wrong. Please try again or use WhatsApp.");

    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "contact_page" }),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      const payload = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
      setErrorMessage(payload?.error?.message ?? "Something went wrong. Please try again or use WhatsApp.");
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Hero */}
      <MarketingViewportGate
        mobile={
          <Section {...marketingSection("contact", "hero")} layout="viewport" className="hero-section relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
            <Container>
              <MarketingPageHeroMobile
                eyebrow={CONTACT_HERO.eyebrow}
                titleLead={CONTACT_HERO.titleLead}
                titleAccent={CONTACT_HERO.titleAccent}
                description={CONTACT_HERO.description}
                primaryCta="Book a Call"
                primaryHref="/book-appointment"
                secondaryCta="WhatsApp us"
                secondaryHref={WHATSAPP_HREF}
                proofPoints={CONTACT_HERO.proofPoints}
              />
            </Container>
          </Section>
        }
        desktop={
          <Section {...marketingSection("contact", "hero")} layout="viewport" className="hero-section relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
            <Container className={HERO_VIEWPORT_CONTAINER_CLASS}>
              <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-12">
                <div className="lg:col-span-6 xl:col-span-7">
                  <Badge tone="primary" dot>
                    {CONTACT_HERO.eyebrow}
                  </Badge>
                  <h1 className={cn("mt-5", HERO_TITLE_CLASS)}>{CONTACT_HERO.title}</h1>
                  <p className="mt-6 text-lg leading-7 text-text-muted text-pretty">{CONTACT_HERO.description}</p>
                  <ul className="mt-6 space-y-2">
                    {CONTACT_HERO.proofPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-text">
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="min-w-0 lg:col-span-6 lg:self-center xl:col-span-5">
                  <ContactHeroPanel />
                </div>
              </div>
            </Container>
          </Section>
        }
      />

      <Section {...marketingSection("contact", "channels")}>
        <Container>
          <SectionHeading eyebrow={CONTACT_CHANNELS.eyebrow} title={CONTACT_CHANNELS.title} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_CHANNELS.items.map((channel) => {
              const Icon = CHANNEL_ICONS[channel.name as keyof typeof CHANNEL_ICONS] ?? PaperAirplaneIcon;
              const card = (
                <Card hoverable className={cn("h-full", "recommended" in channel && channel.recommended && "border-primary/50 ring-1 ring-primary/30")}>
                  <div className="flex items-start justify-between">
                    <div className="inline-flex size-10 items-center justify-center rounded-sm bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    {"recommended" in channel && channel.recommended ? <Badge tone="primary">Recommended</Badge> : null}
                  </div>
                  <h3 className="mt-4 font-display text-lg tracking-tight">{channel.name}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-6">{channel.description}</p>
                  <p className="mt-4 text-sm font-medium text-primary">{channel.action} →</p>
                </Card>
              );

              if (channel.href === "concierge") {
                return (
                  <button key={channel.name} type="button" onClick={() => openConcierge()} className="group text-left">
                    {card}
                  </button>
                );
              }

              const href = channel.href === "whatsapp" ? WHATSAPP_HREF : channel.href;
              return (
                <Link key={channel.name} href={href} className="group">
                  {card}
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section {...marketingSection("contact", "process")}>
        <Container>
          <SectionHeading
            eyebrow={CONTACT_PROCESS.eyebrow}
            title={CONTACT_PROCESS.title}
            description={CONTACT_PROCESS.description}
          />
          <ContactProcessTimeline />
        </Container>
      </Section>

      <Section {...marketingSection("contact", "routes")}>
        <Container>
          <SectionHeading eyebrow={CONTACT_ROUTES.eyebrow} title={CONTACT_ROUTES.title} />
          <ContactRouteCards />
        </Container>
      </Section>

      <Section id="form" {...marketingSection("contact", "form")}>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow={CONTACT_FORM.eyebrow}
                title={CONTACT_FORM.title}
                description={CONTACT_FORM.description}
              />
              <Card className="mt-8">
                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  {CONTACT_FORM.trustHeading}
                </p>
                <p className="mt-2 text-sm leading-6 text-text-muted">
                  {CONTACT_FORM.trustCopy}{" "}
                  See our{" "}
                  <Link href="/privacy-policy" className="text-primary underline">
                    privacy policy
                  </Link>
                  .
                </p>
              </Card>
              <ContactProjectFitList />
            </div>
            <div className="lg:col-span-7">
              <Card>
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 360, damping: 24, mass: 0.6 }}
                    className="py-6 text-center"
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
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <LinkButton href={WHATSAPP_HREF} variant="outline">
                        WhatsApp us
                      </LinkButton>
                      <LinkButton href="/book-appointment">Book a call</LinkButton>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5" aria-busy={status === "submitting"} data-ready={isHydrated ? "true" : "false"}>
                    <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
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
                        <option value="" disabled>
                          Select one…
                        </option>
                        {CONTACT_SERVICE_INTERESTS.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Budget band">
                        <select name="budget" className="signal-input" defaultValue="">
                          <option value="" disabled>
                            Select one…
                          </option>
                          {CONTACT_BUDGET_BANDS.map((band) => (
                            <option key={band} value={band}>
                              {band}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field label="Urgency">
                        <select name="urgency" className="signal-input" defaultValue="">
                          <option value="" disabled>
                            Select one…
                          </option>
                          {CONTACT_URGENCY.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <Field label="Project summary" required>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        className="signal-input"
                        placeholder={CONTACT_FORM.messagePlaceholder}
                      />
                    </Field>
                    <div className="flex items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-text-muted">By submitting, you agree to our privacy policy.</p>
                      <Button type="submit" disabled={!isHydrated || status === "submitting"}>
                        {status === "submitting" ? "Sending…" : "Send inquiry"}
                      </Button>
                    </div>
                    {status === "error" ? (
                      <p className="text-center text-sm text-destructive">{errorMessage}</p>
                    ) : null}
                  </form>
                )}
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <Section {...marketingSection("contact", "explore")}>
        <Container>
          <SectionHeading title={CONTACT_EXPLORE.title} description={CONTACT_EXPLORE.description} />
          <ContactExploreCards />
        </Container>
      </Section>

      {/* FAQ */}
      <Section {...marketingSection("contact", "faq")}>
        <Container width="reading">
          <MarketingViewportGate
            mobile={
              <ServiceFaqMobile
                eyebrow={CONTACT_FAQ.eyebrow}
                title={CONTACT_FAQ.title}
                titleLead={CONTACT_FAQ.titleLead}
                titleAccent={CONTACT_FAQ.titleAccent}
                items={[...CONTACT_FAQ.items]}
              />
            }
            desktop={
              <>
                <SectionHeading eyebrow={CONTACT_FAQ.eyebrow} title={CONTACT_FAQ.title} align="center" />
                <div className="mt-10">
                  <Accordion items={[...CONTACT_FAQ.items]} />
                </div>
              </>
            }
          />
        </Container>
      </Section>
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
        {label} {required ? <span className="text-destructive">*</span> : null}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
