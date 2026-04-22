"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { ChatBubbleLeftRightIcon, EnvelopeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { WHATSAPP_HREF } from "@/lib/nav";
import { useConciergeStore } from "@/lib/concierge-store";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function BookAppointmentExperience() {
  const openConcierge = useConciergeStore((state) => state.open);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [status, setStatus] = useState<SubmitState>("idle");

  useEffect(() => {
    if (!isContactModalOpen) {
      return;
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsContactModalOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [isContactModalOpen]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const openContactModal = () => {
    setStatus("idle");
    setIsContactModalOpen(true);
  };

  return (
    <>
      <Section className="pt-16 sm:pt-24 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <Container width="content">
          <div className="text-center max-w-2xl mx-auto">
            <Badge tone="secondary" dot>Booking · Connecting calendar</Badge>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl tracking-tight text-balance">
              The booking flow is being wired up.
            </h1>
            <p className="mt-6 text-lg text-text-muted leading-7 text-pretty">
              We&apos;re integrating Calendly so you can pick a slot in seconds. In the meantime, the contact form or WhatsApp is the fastest way to reach us.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button onClick={openContactModal} size="lg">
                <EnvelopeIcon className="size-4" /> Get notified
              </Button>
              <LinkButton href={WHATSAPP_HREF} variant="outline" size="lg">
                Talk to us instead
              </LinkButton>
            </div>
          </div>

          <div className="mt-16">
            <p className="text-center font-mono text-xs uppercase tracking-wider text-text-muted">
              In the meantime
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-3xl mx-auto">
              <button type="button" onClick={openContactModal} className="text-left group">
                <Card hoverable>
                  <p className="font-display text-lg tracking-tight">Contact form</p>
                  <p className="mt-1 text-sm text-text-muted">Send a brief — we&apos;ll respond in 2 business hours.</p>
                  <p className="mt-3 text-sm font-medium text-primary">Open →</p>
                </Card>
              </button>

              <Link href={WHATSAPP_HREF} className="group">
                <Card hoverable>
                  <p className="font-display text-lg tracking-tight">WhatsApp</p>
                  <p className="mt-1 text-sm text-text-muted">Conversational, fast.</p>
                  <p className="mt-3 text-sm font-medium text-primary">Open →</p>
                </Card>
              </Link>

              <button
                type="button"
                onClick={() => openConcierge("I want to book a discovery call. What should I share first?")}
                className="text-left group"
              >
                <Card hoverable>
                  <p className="font-display text-lg tracking-tight">AI Growrix OS</p>
                  <p className="mt-1 text-sm text-text-muted">Pre-qualify your project.</p>
                  <p className="mt-3 text-sm font-medium text-primary">Open →</p>
                </Card>
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href={WHATSAPP_HREF}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-primary"
            >
              <ChatBubbleLeftRightIcon className="size-4" /> Or message us on WhatsApp
            </Link>
          </div>
        </Container>
      </Section>

      {isContactModalOpen && (
        <div className="fixed inset-0 z-80" role="dialog" aria-modal="true" aria-label="Contact form">
          <button
            type="button"
            aria-label="Close contact form"
            onClick={() => setIsContactModalOpen(false)}
            className="absolute inset-0 bg-overlay/70 backdrop-blur-[2px]"
          />

          <div className="relative z-10 mx-auto mt-10 w-[min(680px,calc(100%-2rem))]">
            <Card className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Quick inquiry</p>
                  <h2 className="mt-2 font-display text-3xl tracking-tight">Tell us what you need.</h2>
                  <p className="mt-2 text-sm text-text-muted">This sends directly to our inbox and we usually reply within 2 business hours.</p>
                </div>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setIsContactModalOpen(false)}
                  className="rounded-full border border-border bg-surface p-1.5 text-text-muted hover:text-text"
                >
                  <XMarkIcon className="size-5" />
                </button>
              </div>

              {status === "success" ? (
                <div className="mt-6 rounded-[14px] border border-border bg-inset p-4 text-sm text-text-muted">
                  Your inquiry was sent successfully. You can close this popup, or send another message.
                </div>
              ) : null}

              <form onSubmit={onSubmit} className="mt-6 space-y-4" aria-busy={status === "submitting"}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Name *</span>
                    <input name="name" required className="booking-input mt-1.5" placeholder="Your name" />
                  </label>
                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Email *</span>
                    <input type="email" name="email" required className="booking-input mt-1.5" placeholder="you@company.com" />
                  </label>
                </div>

                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Company</span>
                  <input name="company" className="booking-input mt-1.5" placeholder="Optional" />
                </label>

                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Message *</span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="booking-input mt-1.5 min-h-28 resize-y py-3"
                    placeholder="What are you trying to launch?"
                  />
                </label>

                {status === "error" ? (
                  <p className="text-sm text-destructive">Could not send your inquiry. Please try again or use WhatsApp.</p>
                ) : null}

                <div className="flex items-center justify-end gap-3 pt-1">
                  <Button type="button" variant="outline" onClick={() => setIsContactModalOpen(false)}>
                    Close
                  </Button>
                  <Button type="submit" disabled={status === "submitting"}>
                    {status === "submitting" ? "Sending..." : "Send inquiry"}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}

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
