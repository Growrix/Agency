"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CalendarDaysIcon, ChatBubbleLeftRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { WHATSAPP_HREF } from "@/lib/nav";
import { useConciergeStore } from "@/lib/concierge-store";

type SubmitState = "idle" | "submitting" | "success" | "error";
type BookingSlot = { label: string; value: string; helper: string };

const SERVICE_OPTIONS = [
  "Premium custom website",
  "Ready website",
  "SaaS application",
  "Mobile app launch / marketing site",
  "Automation",
  "MCP Server",
  "Not sure yet",
];

function generateBookingSlots() {
  const slots: BookingSlot[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (slots.length < 12) {
    cursor.setDate(cursor.getDate() + 1);
    const day = cursor.getDay();
    if (day === 0 || day === 6) {
      continue;
    }

    for (const hour of [10, 12, 14, 16]) {
      if (slots.length >= 12) {
        break;
      }

      const slotDate = new Date(cursor);
      slotDate.setHours(hour, 0, 0, 0);
      slots.push({
        label: slotDate.toLocaleString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
        value: slotDate.toISOString(),
        helper: "30 minute discovery call",
      });
    }
  }

  return slots;
}

export function BookAppointmentExperience() {
  const openConcierge = useConciergeStore((state) => state.open);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("Could not reserve that slot. Please try another time or use WhatsApp.");
  const [confirmation, setConfirmation] = useState<{ id: string; datetime: string } | null>(null);
  const timezone = "UTC";
  const slots = generateBookingSlots();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("Could not reserve that slot. Please try another time or use WhatsApp.");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/v1/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          timezone,
          source: "booking_page",
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
        setErrorMessage(payload?.error?.message ?? "Could not reserve that slot. Please try another time or use WhatsApp.");
        setStatus("error");
        return;
      }

      const payload = (await response.json()) as { data: { id: string; preferred_datetime: string } };
      setStatus("success");
      setConfirmation({ id: payload.data.id, datetime: payload.data.preferred_datetime });
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Section className="pt-16 sm:pt-24 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <Container width="content">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:items-start">
            <div>
              <Badge tone="secondary" dot>Booking · Live scheduling</Badge>
              <h1 className="mt-5 font-display text-5xl sm:text-6xl tracking-tight text-balance">
                Reserve a real discovery slot.
              </h1>
              <p className="mt-6 text-lg text-text-muted leading-7 text-pretty">
                Pick a time, share the context, and we&apos;ll confirm the session from the backend. Every request is persisted for admin follow-up and logged for the release gate.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-text-muted">
                <span className="rounded-full border border-border bg-surface px-3 py-1.5">Timezone detected: {timezone}</span>
                <span className="rounded-full border border-border bg-surface px-3 py-1.5">Response target: within 2 business hours</span>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <Card hoverable>
                  <p className="font-display text-lg tracking-tight">Need async instead?</p>
                  <p className="mt-2 text-sm leading-6 text-text-muted">Send a written brief through the contact form if you need structured scoping without a call first.</p>
                  <LinkButton href="/contact" variant="outline" className="mt-4">Open contact</LinkButton>
                </Card>
                <button
                  type="button"
                  onClick={() => openConcierge("I want to prepare for a discovery call. What details should I bring?")}
                  className="text-left"
                >
                  <Card hoverable>
                    <p className="font-display text-lg tracking-tight">AI prep</p>
                    <p className="mt-2 text-sm leading-6 text-text-muted">Use the concierge to refine scope before you reserve a slot.</p>
                    <p className="mt-4 text-sm font-medium text-primary">Open AI Growrix OS →</p>
                  </Card>
                </button>
              </div>
            </div>

            <Card>
              {status === "success" && confirmation ? (
                <div className="py-2">
                  <CheckCircleIcon className="size-12 text-success" aria-hidden />
                  <h2 className="mt-4 font-display text-3xl tracking-tight">Slot requested.</h2>
                  <p className="mt-3 text-sm leading-6 text-text-muted">
                    Booking ID {confirmation.id}. Requested time: {new Date(confirmation.datetime).toLocaleString()}.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setConfirmation(null);
                      }}
                    >
                      Book another slot
                    </Button>
                    <LinkButton href={WHATSAPP_HREF} variant="outline">Need a faster response</LinkButton>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4" aria-busy={status === "submitting"}>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Discovery booking</p>
                    <h2 className="mt-2 font-display text-3xl tracking-tight">Choose a time and tell us what you&apos;re building.</h2>
                  </div>

                  <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Name *</span>
                    <input name="visitor_name" required className="booking-input mt-1.5" placeholder="Your name" />
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Email *</span>
                      <input type="email" name="visitor_email" required className="booking-input mt-1.5" placeholder="you@company.com" />
                    </label>
                    <label className="block">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Phone</span>
                      <input name="visitor_phone" className="booking-input mt-1.5" placeholder="Optional" />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Service interest *</span>
                      <select name="service_interested_in" className="booking-input mt-1.5" defaultValue="" required>
                        <option value="" disabled>Select one…</option>
                        {SERVICE_OPTIONS.map((service) => <option key={service} value={service}>{service}</option>)}
                      </select>
                    </label>
                    <label className="block">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Available slot *</span>
                      <select name="preferred_datetime" className="booking-input mt-1.5" defaultValue="" required>
                        <option value="" disabled>{slots.length ? "Choose a slot…" : "Loading slots…"}</option>
                        {slots.map((slot) => <option key={slot.value} value={slot.value}>{slot.label} · {slot.helper}</option>)}
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">What should we review?</span>
                    <textarea
                      name="notes"
                      rows={4}
                      className="booking-input mt-1.5 min-h-28 resize-y py-3"
                      placeholder="Current site, offer, blockers, launch date, and any integrations you already know about."
                    />
                  </label>

                  {status === "error" ? <p className="text-sm text-destructive">{errorMessage}</p> : null}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <p className="text-xs text-text-muted">We store this booking request for admin follow-up and confirmation.</p>
                    <Button type="submit" disabled={status === "submitting" || slots.length === 0}>
                      <CalendarDaysIcon className="size-4" /> {status === "submitting" ? "Saving..." : "Reserve slot"}
                    </Button>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 pb-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Card hoverable>
                <p className="font-display text-lg tracking-tight">WhatsApp</p>
                <p className="mt-2 text-sm text-text-muted">Fastest escalation path during business hours.</p>
                <Link href={WHATSAPP_HREF} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  <ChatBubbleLeftRightIcon className="size-4" /> Open WhatsApp
                </Link>
              </Card>
              <Card hoverable>
                <p className="font-display text-lg tracking-tight">Need a written brief?</p>
                <p className="mt-2 text-sm text-text-muted">Use the contact form if your scope is still taking shape.</p>
                <LinkButton href="/contact" variant="outline" className="mt-4">Go to contact</LinkButton>
              </Card>
              <Card hoverable>
                <p className="font-display text-lg tracking-tight">Prefer async guidance?</p>
                <p className="mt-2 text-sm text-text-muted">Ask AI Growrix OS to qualify the project before the call.</p>
                <Button type="button" variant="outline" className="mt-4" onClick={() => openConcierge("Help me prepare for a discovery call.")}>Open concierge</Button>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      <style jsx global>{`
        .booking-input {
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

        .booking-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.15);
        }

        .booking-input::placeholder {
          color: var(--color-text-muted);
        }
      `}</style>
    </>
  );
}