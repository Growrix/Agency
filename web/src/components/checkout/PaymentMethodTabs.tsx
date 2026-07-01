"use client";

import { BuildingLibraryIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

export type PaymentMethodId = "card" | "paypal" | "stripe" | "bank_transfer";

type PaymentMethodMeta = {
  id: PaymentMethodId;
  label: string;
  hint: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconTone: "primary" | "info" | "accent" | "muted";
};

const METHODS: PaymentMethodMeta[] = [
  { id: "card", label: "Card", hint: "Visa, Mastercard, AMEX", icon: CreditCardIcon, iconTone: "primary" },
  { id: "paypal", label: "PayPal", hint: "Pay with PayPal", icon: PayPalGlyph, iconTone: "info" },
  { id: "stripe", label: "Stripe", hint: "Secure checkout", icon: StripeGlyph, iconTone: "accent" },
  { id: "bank_transfer", label: "Bank Transfer", hint: "Manual bank transfer", icon: BuildingLibraryIcon, iconTone: "muted" },
];

const TONE_CLASSES: Record<PaymentMethodMeta["iconTone"], string> = {
  primary: "bg-primary/15 text-primary",
  info: "bg-info/15 text-info",
  accent: "bg-accent/15 text-accent",
  muted: "bg-inset/50 text-text",
};

type PaymentMethodTabsProps = {
  value: PaymentMethodId;
  onChange: (value: PaymentMethodId) => void;
  className?: string;
};

function PayPalGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.5 4h6.75a3.5 3.5 0 0 1 3.4 4.34 4.75 4.75 0 0 1-4.66 3.72H9l-.9 5.9H5.6L6.5 4Z" />
      <path d="M9 8.16h3.34c1.5 0 2.6.9 2.66 2.14M8.5 20h2.6l.5-3.34" opacity=".8" />
    </svg>
  );
}

function StripeGlyph(props: SVGProps<SVGSVGElement>) {
  // Simple "S" glyph in a rounded square, tuned to feel Stripe-like without infringing on marks.
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M15 8.5c-.7-.6-1.7-1-3-1-1.7 0-2.75.8-2.75 1.9 0 2.6 6 1.6 6 4.1 0 1.3-1.15 2-3 2-1.5 0-2.7-.5-3.5-1.2" />
    </svg>
  );
}

export function PaymentMethodTabs({ value, onChange, className }: PaymentMethodTabsProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Payment method"
      className={cn("grid grid-cols-2 gap-2 sm:grid-cols-4", className)}
    >
      {METHODS.map((method) => {
        const active = value === method.id;
        const Icon = method.icon;
        return (
          <button
            key={method.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(method.id)}
            className={cn(
              "flex items-center gap-3 rounded-md border px-3 py-3 text-left transition-colors",
              active
                ? "border-primary/60 bg-primary/10"
                : "border-border/60 bg-surface hover:border-border-strong",
            )}
          >
            <span
              className={cn(
                "inline-flex size-9 shrink-0 items-center justify-center rounded-sm",
                active ? "bg-primary/20 text-primary" : TONE_CLASSES[method.iconTone],
              )}
              aria-hidden
            >
              <Icon className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-text">{method.label}</span>
              <span className="block truncate text-[11px] text-text-muted">{method.hint}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
