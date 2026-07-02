"use client";

import { useState } from "react";
import { Button } from "@/components/primitives/Button";
import { formatCentsAsUsd } from "@/components/checkout/checkout-utils";

export type AppliedCoupon = {
  code: string;
  discount_cents: number;
  discount_value?: number;
  description?: string;
};

type CouponValidationResponse = {
  data?:
    | { valid: true; discount_cents: number; coupon: { code: string; description?: string; discount_type: "percent"; discount_value: number } }
    | { valid: false; reason: string; message: string };
  error?: { message?: string };
};

type DiscountCodeFieldProps = {
  applied: AppliedCoupon | null;
  onApply: (coupon: AppliedCoupon) => void;
  onClear: () => void;
  subtotalCents: number;
  userEmail?: string;
  /** Additional class names for the outer container when open. */
  className?: string;
};

export function DiscountCodeField({
  applied,
  onApply,
  onClear,
  subtotalCents,
  userEmail,
  className,
}: DiscountCodeFieldProps) {
  const [open, setOpen] = useState(Boolean(applied));
  const [value, setValue] = useState(applied?.code ?? "");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    applied ? "success" : "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleApply() {
    const code = value.trim().toUpperCase();
    if (!code) return;
    if (subtotalCents <= 0) {
      setStatus("error");
      setError("Add items to your cart before applying a code.");
      return;
    }

    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/v1/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          code,
          subtotal_cents: subtotalCents,
          user_email: userEmail,
        }),
      });
      const payload = (await response.json().catch(() => null)) as CouponValidationResponse | null;

      if (!response.ok) {
        setStatus("error");
        setError(payload?.error?.message ?? "Unable to validate this code.");
        return;
      }
      if (!payload?.data) {
        setStatus("error");
        setError("Unexpected response from the coupon service.");
        return;
      }
      if (payload.data.valid !== true) {
        setStatus("error");
        setError(payload.data.message ?? "This code cannot be applied.");
        return;
      }

      onApply({
        code: payload.data.coupon.code,
        discount_cents: payload.data.discount_cents,
        discount_value: payload.data.coupon.discount_value,
        description: payload.data.coupon.description,
      });
      setStatus("success");
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof Error ? caught.message : "Unable to validate this code.");
    }
  }

  function handleClear() {
    setValue("");
    setError(null);
    setStatus("idle");
    onClear();
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-medium text-primary hover:underline"
      >
        Have a discount code?
      </button>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(event) => {
            setValue(event.target.value.toUpperCase());
            if (status === "error") setStatus("idle");
          }}
          placeholder="WELCOME10"
          className="signal-input h-9 flex-1 text-sm"
          aria-label="Discount code"
          disabled={status === "submitting" || Boolean(applied)}
        />
        {applied ? (
          <Button type="button" variant="ghost" size="sm" onClick={handleClear}>
            Clear
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void handleApply()}
            disabled={!value.trim() || status === "submitting"}
          >
            {status === "submitting" ? "Checking…" : "Apply"}
          </Button>
        )}
      </div>
      {applied ? (
        <p className="mt-1 text-xs text-success">
          {applied.code} applied — {formatCentsAsUsd(applied.discount_cents)} off
          {applied.description ? ` (${applied.description})` : ""}
        </p>
      ) : error ? (
        <p className="mt-1 text-xs text-destructive">{error}</p>
      ) : null}
    </div>
  );
}
