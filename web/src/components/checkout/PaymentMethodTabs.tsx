"use client";

import {
  BuildingLibraryIcon,
  CreditCardIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

export type PaymentMethodId = "card" | "paypal" | "stripe" | "bank_transfer";

type PaymentMethodMeta = {
  id: PaymentMethodId;
  label: string;
  hint: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  enabled: boolean;
};

const METHODS: PaymentMethodMeta[] = [
  { id: "card", label: "Card", hint: "Visa, Mastercard, AMEX", icon: CreditCardIcon, enabled: true },
  { id: "paypal", label: "PayPal", hint: "Pay with PayPal", icon: ShieldCheckIcon, enabled: false },
  { id: "stripe", label: "Stripe", hint: "Secure checkout", icon: ShieldCheckIcon, enabled: true },
  { id: "bank_transfer", label: "Bank Transfer", hint: "Manual bank transfer", icon: BuildingLibraryIcon, enabled: false },
];

type PaymentMethodTabsProps = {
  value: PaymentMethodId;
  onChange: (value: PaymentMethodId) => void;
  className?: string;
};

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
            disabled={!method.enabled}
            onClick={() => method.enabled && onChange(method.id)}
            className={cn(
              "flex items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors",
              active
                ? "border-primary/60 bg-primary/10"
                : "border-border/60 bg-surface hover:border-border-strong",
              !method.enabled && "cursor-not-allowed opacity-60 hover:border-border/60",
            )}
          >
            <span
              className={cn(
                "inline-flex size-8 shrink-0 items-center justify-center rounded-sm",
                active ? "bg-primary/20 text-primary" : "bg-inset/40 text-text-muted",
              )}
              aria-hidden
            >
              <Icon className="size-4" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-medium text-text">{method.label}</span>
              <span className="block truncate text-[11px] text-text-muted">
                {method.enabled ? method.hint : "Coming soon"}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
