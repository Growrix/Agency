"use client";

import { LockClosedIcon } from "@heroicons/react/24/outline";

export function CardDetailsPanel() {
  return (
    <div className="rounded-md border border-border/60 bg-surface/50">
      <div className="border-b border-border/50 px-4 py-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
          Card details
        </p>
      </div>

      <div className="space-y-3 p-4">
        <label className="block">
          <span className="sr-only">Card number preview</span>
          <div className="relative">
            <input
              type="text"
              readOnly
              value=""
              placeholder="1234 1234 1234 1234"
              className="signal-input pr-24"
              aria-describedby="card-payment-hint"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-text-muted"
            >
              <span className="rounded-sm bg-inset/60 px-1.5 py-0.5">VISA</span>
              <span className="rounded-sm bg-inset/60 px-1.5 py-0.5">MC</span>
              <span className="rounded-sm bg-inset/60 px-1.5 py-0.5">AMEX</span>
            </span>
          </div>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="sr-only">Expiration preview</span>
            <input type="text" readOnly value="" placeholder="MM / YY" className="signal-input" />
          </label>
          <label className="block">
            <span className="sr-only">CVC preview</span>
            <input type="text" readOnly value="" placeholder="CVC" className="signal-input" />
          </label>
        </div>

        <label className="block">
          <span className="sr-only">Name on card preview</span>
          <input type="text" readOnly value="" placeholder="Name on card" className="signal-input" />
        </label>

        <p
          id="card-payment-hint"
          className="flex items-start gap-2 rounded-sm bg-inset/40 px-3 py-2 text-[11px] leading-5 text-text-muted"
        >
          <LockClosedIcon className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
          <span>
            Card details are collected on the next step by Stripe&apos;s hosted checkout. Nothing is
            entered or stored on this page.
          </span>
        </p>
      </div>
    </div>
  );
}
