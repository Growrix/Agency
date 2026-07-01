"use client";

import { useState } from "react";
import { CalendarIcon, CreditCardIcon, LockClosedIcon } from "@heroicons/react/24/outline";

function formatCardNumber(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length < 3) return digits;
  return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
}

function formatCvc(value: string) {
  return value.replace(/\D/g, "").slice(0, 4);
}

export function CardDetailsPanel() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  return (
    <div className="rounded-md border border-border/60 bg-surface/50">
      <div className="border-b border-border/50 px-4 py-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
          Card details
        </p>
      </div>

      <div className="space-y-3 p-4">
        <label className="block">
          <span className="sr-only">Card number (display preview)</span>
          <div className="relative">
            <input
              type="text"
              value={cardNumber}
              onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
              inputMode="numeric"
              autoComplete="off"
              spellCheck={false}
              placeholder="1234 1234 1234 1234"
              className="signal-input pr-24"
              aria-describedby="card-payment-hint"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 text-[10px] font-semibold uppercase tracking-wider"
            >
              <span className="rounded-sm bg-info/15 px-1.5 py-0.5 text-info">VISA</span>
              <span className="rounded-sm bg-destructive/15 px-1.5 py-0.5 text-destructive">MC</span>
              <span className="rounded-sm bg-accent/15 px-1.5 py-0.5 text-accent">AMEX</span>
            </span>
          </div>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="sr-only">Expiration</span>
            <div className="relative">
              <CalendarIcon
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                value={expiry}
                onChange={(event) => setExpiry(formatExpiry(event.target.value))}
                inputMode="numeric"
                autoComplete="off"
                spellCheck={false}
                placeholder="MM / YY"
                className="signal-input pr-10"
              />
            </div>
          </label>
          <label className="block">
            <span className="sr-only">CVC</span>
            <div className="relative">
              <LockClosedIcon
                aria-hidden
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                value={cvc}
                onChange={(event) => setCvc(formatCvc(event.target.value))}
                inputMode="numeric"
                autoComplete="off"
                spellCheck={false}
                placeholder="CVC"
                className="signal-input pr-10"
              />
            </div>
          </label>
        </div>

        <label className="block">
          <span className="sr-only">Name on card</span>
          <div className="relative">
            <CreditCardIcon
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              value={nameOnCard}
              onChange={(event) => setNameOnCard(event.target.value)}
              autoComplete="cc-name"
              placeholder="Name on card"
              className="signal-input pr-10"
            />
          </div>
        </label>

        <p
          id="card-payment-hint"
          className="flex items-start gap-2 rounded-sm bg-inset/40 px-3 py-2 text-[11px] leading-5 text-text-muted"
        >
          <LockClosedIcon className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
          <span>
            Final card capture happens on Stripe&apos;s hosted checkout on the next step. Nothing is
            transmitted from this preview.
          </span>
        </p>
      </div>
    </div>
  );
}
