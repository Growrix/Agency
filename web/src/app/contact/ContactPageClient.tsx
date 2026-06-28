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
import { ProcessStepsMobile } from "@/components/marketing/ProcessStepsMobile";
import { ContactChannelsMobile } from "@/components/marketing/contact/ContactChannelsMobile";
import { ContactExploreMobile } from "@/components/marketing/contact/ContactExploreMobile";
import { ContactFormMobileSection } from "@/components/marketing/contact/ContactFormMobileSection";
import { ContactHeroMobile } from "@/components/marketing/contact/ContactHeroMobile";
import { ContactRoutesMobile } from "@/components/marketing/contact/ContactRoutesMobile";
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
import { MarketingHeroTitle } from "@/components/marketing/MarketingHeroTitle";
import { MarketingSplitHero } from "@/components/marketing/MarketingSplitHero";
import { HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";
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

  const inquiryCard = (
    <Card className="contact-form-mobile__form-card">
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
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <LinkButton href={WHATSAPP_HREF} variant="outline" fullWidth className="sm:w-auto">
              WhatsApp us
            </LinkButton>
            <LinkButton href="/book-appointment" fullWidth className="sm:w-auto">
              Book a call
            </LinkButton>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={onSubmit} className="contact-form-mobile__form space-y-5" aria-busy={status === "submitting"} data-ready={isHydrated ? "true" : "false"}>
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
          <Field label="Name" required>
            <input name="name" required className="signal-input w-full" placeholder="Your name" />
          </Field>
          <Field label="Email" required>
            <input type="email" name="email" required className="signal-input w-full" placeholder="you@company.com" />
          </Field>
          <Field label="Company">
            <input name="company" className="signal-input w-full" placeholder="Optional" />
          </Field>
          <Field label="Service interest">
            <select name="service" className="signal-input w-full" defaultValue="">
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
          <Field label="Budget band">
            <select name="budget" className="signal-input w-full" defaultValue="">
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
            <select name="urgency" className="signal-input w-full" defaultValue="">
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
          <Field label="Project summary" required>
            <textarea
              name="message"
              required
              rows={5}
              className="signal-input w-full"
              placeholder={CONTACT_FORM.messagePlaceholder}
            />
          </Field>
          <div className="contact-form-mobile__submit">
            <p className="contact-form-mobile__submit-note">By submitting, you agree to our privacy policy.</p>
            <Button type="submit" disabled={!isHydrated || status === "submitting"} fullWidth>
              {status === "submitting" ? "Sending…" : "Send inquiry"}
            </Button>
          </div>
          {status === "error" ? (
            <p className="text-center text-sm text-destructive">{errorMessage}</p>
          ) : null}
        </form>
      )}
    </Card>
  );

  return (
    <>
      {/* Hero */}
      <MarketingViewportGate
        mobile={
          <Section {...marketingSection("contact", "hero")} layout="viewport" className="hero-section relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
            <Container>
              <ContactHeroMobile />
            </Container>
          </Section>
        }
        desktop={
          <Section {...marketingSection("contact", "hero")} layout="viewport" className="hero-section relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
            <Container className={HERO_VIEWPORT_CONTAINER_CLASS}>
              <MarketingSplitHero
                copy={
                  <>
                    <Badge tone="primary" dot>
                      {CONTACT_HERO.eyebrow}
                    </Badge>
                    <MarketingHeroTitle
                      className="mt-5"
                      title={CONTACT_HERO.title}
                      titleLead={CONTACT_HERO.titleLead}
                      titleAccent={CONTACT_HERO.titleAccent}
                    />
                    <p className="mt-6 text-lg leading-7 text-text-muted text-pretty">{CONTACT_HERO.description}</p>
                    <ul className="mt-6 space-y-2">
                      {CONTACT_HERO.proofPoints.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-text">
                          <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </>
                }
                panel={<ContactHeroPanel />}
              />
            </Container>
          </Section>
        }
      />

      <Section {...marketingSection("contact", "channels")}>
        <Container>
          <MarketingViewportGate
            mobile={<ContactChannelsMobile onOpenConcierge={openConcierge} />}
            desktop={
              <>
                <SectionHeading
                  eyebrow={CONTACT_CHANNELS.eyebrow}
                  titleLead={CONTACT_CHANNELS.titleLead}
                  titleAccent={CONTACT_CHANNELS.titleAccent}
                />
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {CONTACT_CHANNELS.items.map((channel) => {
                    const Icon = CHANNEL_ICONS[channel.name as keyof typeof CHANNEL_ICONS] ?? PaperAirplaneIcon;
                    const isHotline = "hotline" in channel && Boolean(channel.hotline);
                    const isRecommended = "recommended" in channel && Boolean(channel.recommended);
                    const card = (
                      <Card
                        hoverable
                        className={cn(
                          "h-full",
                          isHotline && "border-success/50 bg-success/[0.03] ring-1 ring-success/30",
                          isRecommended && "border-primary/50 ring-1 ring-primary/30",
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div
                            className={cn(
                              "inline-flex size-10 items-center justify-center rounded-sm",
                              isHotline ? "bg-success/10 text-success" : "bg-primary/10 text-primary",
                            )}
                          >
                            <Icon className="size-5" aria-hidden />
                          </div>
                          {isHotline ? (
                            <Badge tone="success">Hotline</Badge>
                          ) : isRecommended ? (
                            <Badge tone="primary">Recommended</Badge>
                          ) : null}
                        </div>
                        <h3 className="mt-4 font-display text-lg tracking-tight">{channel.name}</h3>
                        <p className="mt-2 text-sm text-text-muted leading-6">{channel.description}</p>
                        <p
                          className={cn(
                            "mt-4 text-sm font-medium",
                            isHotline ? "text-success" : "text-primary",
                          )}
                        >
                          {channel.action} →
                        </p>
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
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("contact", "process")}>
        <Container>
          <MarketingViewportGate
            mobile={
              <ProcessStepsMobile
                steps={[...CONTACT_PROCESS.steps]}
                eyebrow={CONTACT_PROCESS.eyebrow}
                titleLead={CONTACT_PROCESS.titleLead}
                titleAccent={CONTACT_PROCESS.titleAccent}
                description={CONTACT_PROCESS.description}
              />
            }
            desktop={
              <>
                <SectionHeading
                  eyebrow={CONTACT_PROCESS.eyebrow}
                  titleLead={CONTACT_PROCESS.titleLead}
                  titleAccent={CONTACT_PROCESS.titleAccent}
                  description={CONTACT_PROCESS.description}
                />
                <ContactProcessTimeline />
              </>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("contact", "routes")}>
        <Container>
          <MarketingViewportGate
            mobile={<ContactRoutesMobile />}
            desktop={
              <>
                <SectionHeading
                  eyebrow={CONTACT_ROUTES.eyebrow}
                  titleLead={CONTACT_ROUTES.titleLead}
                  titleAccent={CONTACT_ROUTES.titleAccent}
                />
                <ContactRouteCards />
              </>
            }
          />
        </Container>
      </Section>

      <Section id="form" {...marketingSection("contact", "form")}>
        <Container>
          <MarketingViewportGate
            mobile={<ContactFormMobileSection>{inquiryCard}</ContactFormMobileSection>}
            desktop={
              <div className="marketing-content-split gap-10">
                <div className="lg:col-span-5">
                  <SectionHeading
                    eyebrow={CONTACT_FORM.eyebrow}
                    titleLead={CONTACT_FORM.titleLead}
                    titleAccent={CONTACT_FORM.titleAccent}
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
                <div className="lg:col-span-7">{inquiryCard}</div>
              </div>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("contact", "explore")}>
        <Container>
          <MarketingViewportGate
            mobile={<ContactExploreMobile />}
            desktop={
              <>
                <SectionHeading
                  eyebrow={CONTACT_EXPLORE.eyebrow}
                  titleLead={CONTACT_EXPLORE.titleLead}
                  titleAccent={CONTACT_EXPLORE.titleAccent}
                  description={CONTACT_EXPLORE.description}
                />
                <ContactExploreCards />
              </>
            }
          />
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
                <SectionHeading
                  eyebrow={CONTACT_FAQ.eyebrow}
                  titleLead={CONTACT_FAQ.titleLead}
                  titleAccent={CONTACT_FAQ.titleAccent}
                  align="center"
                />
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
