"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { BookAppointmentHeroPanel } from "@/components/sections/BookAppointmentHeroPanel";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { BookAppointmentAlternativesMobile } from "@/components/marketing/book-appointment/BookAppointmentAlternativesMobile";
import { BookAppointmentFormMobileSection } from "@/components/marketing/book-appointment/BookAppointmentFormMobileSection";
import { BookAppointmentHeroMobile } from "@/components/marketing/book-appointment/BookAppointmentHeroMobile";
import {
  BOOK_APPOINTMENT_ALTERNATIVES,
  BOOK_APPOINTMENT_FORM,
  BOOK_APPOINTMENT_HERO,
  BOOK_APPOINTMENT_SERVICE_OPTIONS,
} from "@/lib/book-appointment-landing-content";
import { marketingSection } from "@/lib/marketing-composition";
import { WHATSAPP_HREF } from "@/lib/nav";
import { MarketingHeroTitle } from "@/components/marketing/MarketingHeroTitle";
import { MarketingSplitHero } from "@/components/marketing/MarketingSplitHero";
import { HERO_VIEWPORT_CONTAINER_CLASS } from "@/lib/typography";
import { useConciergeStore } from "@/lib/concierge-store";
type SubmitState = "idle" | "submitting" | "success" | "error";

const TIME_OPTIONS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

function getDetectedTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTimeInputValue(date: Date) {
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatSelectedSlot(dateValue: string, timeValue: string) {
  if (!dateValue || !timeValue) {
    return null;
  }

  const slotDate = new Date(`${dateValue}T${timeValue}:00`);
  if (Number.isNaN(slotDate.getTime())) {
    return null;
  }

  return slotDate.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function getMinimumBookingDate() {
  const minimumDate = new Date(Date.now() + 30 * 60 * 1000);
  minimumDate.setSeconds(0, 0);
  return minimumDate;
}

export function BookAppointmentExperience() {
  const [isHydrated] = useState(true);
  const openConcierge = useConciergeStore((state) => state.open);
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("Could not reserve that slot. Please try another time or use WhatsApp.");
  const [confirmation, setConfirmation] = useState<{ id: string; datetime: string } | null>(null);
  const timezone = getDetectedTimezone();
  const [minimumBookingDate] = useState<Date>(() => getMinimumBookingDate());
  const minDate = minimumBookingDate ? toDateInputValue(minimumBookingDate) : "";
  const minTimeForToday = minimumBookingDate ? formatTimeInputValue(minimumBookingDate) : undefined;
  const [selectedDate, setSelectedDate] = useState(() => toDateInputValue(getMinimumBookingDate()));
  const [selectedTime, setSelectedTime] = useState("");
  const selectedSlotLabel = formatSelectedSlot(selectedDate, selectedTime);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("Could not reserve that slot. Please try another time or use WhatsApp.");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const preferredDate = new Date(`${selectedDate}T${selectedTime}:00`);

    if (!selectedDate || !selectedTime || Number.isNaN(preferredDate.getTime())) {
      setErrorMessage("Please choose a valid date and time for the discovery call.");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("/api/v1/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          preferred_datetime: preferredDate.toISOString(),
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
      setSelectedDate(minDate);
      setSelectedTime("");
    } catch {
      setStatus("error");
    }
  };

  const bookingCard = (
    <Card className="contact-form-mobile__form-card">
      {status === "success" && confirmation ? (
        <div className="py-2">
          <CheckCircleIcon className="size-12 text-success" aria-hidden />
          <h2 className="mt-4 font-display text-2xl tracking-tight">Slot requested.</h2>
          <p className="mt-3 text-sm leading-6 text-text-muted">
            Booking ID {confirmation.id}. Requested time: {new Date(confirmation.datetime).toLocaleString()}.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button
              type="button"
              fullWidth
              onClick={() => {
                setStatus("idle");
                setConfirmation(null);
              }}
            >
              Book another slot
            </Button>
            <LinkButton href={WHATSAPP_HREF} variant="outline" fullWidth>
              Need a faster response
            </LinkButton>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="contact-form-mobile__form space-y-5" aria-busy={status === "submitting"} data-ready={isHydrated ? "true" : "false"}>
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

          <Field label="Name" required>
            <input name="visitor_name" required className="signal-input w-full" placeholder="Your name" />
          </Field>
          <Field label="Email" required>
            <input type="email" name="visitor_email" required className="signal-input w-full" placeholder="you@company.com" />
          </Field>
          <Field label="Phone">
            <input name="visitor_phone" className="signal-input w-full" placeholder="Optional" />
          </Field>
          <Field label="Service interest" required>
            <select name="service_interested_in" className="signal-input w-full" defaultValue="" required>
              <option value="" disabled>
                Select one…
              </option>
              {BOOK_APPOINTMENT_SERVICE_OPTIONS.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Preferred date" required>
            <input
              type="date"
              className="signal-input w-full"
              min={minDate || undefined}
              defaultValue={selectedDate || undefined}
              onInput={(event) => setSelectedDate(event.currentTarget.value)}
              onChange={(event) => setSelectedDate(event.target.value)}
              required
            />
          </Field>
          <Field label="Preferred time" required>
            <input
              type="time"
              className="signal-input w-full"
              min={selectedDate === minDate ? minTimeForToday : undefined}
              step={1800}
              list="booking-time-options"
              onInput={(event) => setSelectedTime(event.currentTarget.value)}
              onChange={(event) => setSelectedTime(event.target.value)}
              required
            />
            <datalist id="booking-time-options">
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time} />
              ))}
            </datalist>
          </Field>
          <div className="rounded-sm border border-border bg-inset/45 px-4 py-3">
            <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
              {BOOK_APPOINTMENT_FORM.slotPreviewLabel}
            </p>
            <p className="mt-2 text-sm leading-6 text-text">
              {selectedSlotLabel ?? BOOK_APPOINTMENT_FORM.slotPreviewEmpty}
            </p>
            <p className="mt-2 text-xs text-text-muted">
              {BOOK_APPOINTMENT_FORM.slotPreviewMeta} · {timezone}
            </p>
          </div>
          <Field label="What should we review?">
            <textarea
              name="notes"
              rows={4}
              className="signal-input w-full min-h-28 resize-y py-3"
              placeholder={BOOK_APPOINTMENT_FORM.notesPlaceholder}
            />
          </Field>

          {status === "error" ? <p className="text-sm text-destructive">{errorMessage}</p> : null}

          <div className="contact-form-mobile__submit">
            <p className="contact-form-mobile__submit-note">By submitting, you agree to our privacy policy.</p>
            <Button
              type="submit"
              fullWidth
              disabled={!isHydrated || !minimumBookingDate || status === "submitting" || !selectedDate || !selectedTime}
            >
              <CalendarDaysIcon className="size-4" aria-hidden />
              {status === "submitting" ? "Saving…" : "Reserve slot"}
            </Button>
          </div>
        </form>
      )}
    </Card>
  );

  return (
    <>
      <MarketingViewportGate
        mobile={
          <Section {...marketingSection("book-appointment", "hero")} layout="viewport" className="hero-section relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
            <Container>
              <BookAppointmentHeroMobile />
            </Container>
          </Section>
        }
        desktop={
          <Section {...marketingSection("book-appointment", "hero")} layout="viewport" className="hero-section relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" aria-hidden />
            <Container className={HERO_VIEWPORT_CONTAINER_CLASS}>
              <MarketingSplitHero
                copy={
                  <>
                    <Badge tone="primary" dot>
                      {BOOK_APPOINTMENT_HERO.eyebrow}
                    </Badge>
                    <MarketingHeroTitle
                      className="mt-5"
                      title={BOOK_APPOINTMENT_HERO.title}
                      titleLead={BOOK_APPOINTMENT_HERO.titleLead}
                      titleAccent={BOOK_APPOINTMENT_HERO.titleAccent}
                    />
                    <p className="mt-6 text-lg leading-7 text-text-muted text-pretty">{BOOK_APPOINTMENT_HERO.description}</p>
                    <ul className="mt-6 space-y-2">
                      {BOOK_APPOINTMENT_HERO.proofPoints.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm text-text">
                          <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <LinkButton href={BOOK_APPOINTMENT_HERO.primaryHref} size="lg">
                        {BOOK_APPOINTMENT_HERO.primaryCta} <ArrowRightIcon className="size-4" aria-hidden />
                      </LinkButton>
                      <LinkButton href={BOOK_APPOINTMENT_HERO.secondaryHref} variant="outline" size="lg">
                        {BOOK_APPOINTMENT_HERO.secondaryCta}
                      </LinkButton>
                    </div>
                  </>
                }
                panel={<BookAppointmentHeroPanel />}
              />
            </Container>
          </Section>
        }
      />

      <Section id="booking" {...marketingSection("book-appointment", "form")}>
        <Container>
          <MarketingViewportGate
            mobile={
              <BookAppointmentFormMobileSection timezone={timezone}>
                {bookingCard}
              </BookAppointmentFormMobileSection>
            }
            desktop={
              <div className="marketing-content-split gap-10">
                <div className="lg:col-span-5">
                  <SectionHeading
                    eyebrow={BOOK_APPOINTMENT_FORM.eyebrow}
                    title={BOOK_APPOINTMENT_FORM.title}
                    description={BOOK_APPOINTMENT_FORM.description}
                  />
                  <Card className="mt-8">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                      {BOOK_APPOINTMENT_FORM.trustHeading}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-text-muted">{BOOK_APPOINTMENT_FORM.trustCopy}</p>
                  </Card>
                  <Card className="mt-6">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                      {BOOK_APPOINTMENT_FORM.timezoneLabel}
                    </p>
                    <p className="mt-2 text-sm font-medium text-text">{timezone}</p>
                  </Card>
                </div>
                <div className="lg:col-span-7">{bookingCard}</div>
              </div>
            }
          />
        </Container>
      </Section>

      <Section {...marketingSection("book-appointment", "alternatives")}>
        <Container>
          <MarketingViewportGate
            mobile={<BookAppointmentAlternativesMobile onOpenConcierge={openConcierge} />}
            desktop={
              <>
                <SectionHeading
                  eyebrow={BOOK_APPOINTMENT_ALTERNATIVES.eyebrow}
                  title={BOOK_APPOINTMENT_ALTERNATIVES.title}
                />
                <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {BOOK_APPOINTMENT_ALTERNATIVES.cards.map((card) => {
                    const content = (
                      <Card hoverable className="h-full p-5 sm:p-6">
                        <p className="font-display text-lg tracking-tight">{card.title}</p>
                        <p className="mt-2 text-sm leading-6 text-text-muted">{card.description}</p>
                        <p className="mt-4 text-sm font-medium text-primary">{card.cta} →</p>
                      </Card>
                    );

                    if (card.href === "concierge") {
                      return (
                        <button
                          key={card.title}
                          type="button"
                          onClick={() => openConcierge("Help me prepare for a discovery call.")}
                          className="text-left"
                        >
                          {content}
                        </button>
                      );
                    }

                    const href = card.href === "whatsapp" ? WHATSAPP_HREF : card.href;
                    return (
                      <Link key={card.title} href={href} className="group block h-full">
                        {content}
                      </Link>
                    );
                  })}
                </div>
              </>
            }
          />
        </Container>
      </Section>
    </>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
        {label} {required ? <span className="text-destructive">*</span> : null}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
