"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/primitives/Button";

type CompleteAccountFormProps = {
  email: string;
  firstName: string | null;
  lastName: string | null;
  defaultPhone: string;
  defaultMarketingOptIn: boolean;
  redirectTo: string;
};

export function CompleteAccountForm({
  email,
  firstName,
  lastName,
  defaultPhone,
  defaultMarketingOptIn,
  redirectTo,
}: CompleteAccountFormProps) {
  const router = useRouter();
  const [phone, setPhone] = useState(defaultPhone);
  const [marketingOptIn, setMarketingOptIn] = useState(defaultMarketingOptIn);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayName = [firstName, lastName].filter(Boolean).join(" ").trim() || email;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!acceptedTerms) {
      setError("You must accept the terms to continue.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/v1/me/complete-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          accepted_terms: true,
          marketing_opt_in: marketingOptIn,
          phone: phone.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: { message?: string } }
          | null;
        throw new Error(payload?.error?.message ?? "Unable to complete signup.");
      }

      router.replace(redirectTo);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to complete signup.");
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-text-muted">Signed in as</p>
        <p className="text-sm font-medium text-text">{displayName}</p>
        <p className="text-xs text-text-muted">{email}</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="complete-phone" className="block text-sm font-medium text-text">
          Phone (optional)
        </label>
        <input
          id="complete-phone"
          type="tel"
          inputMode="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+1 555 123 4567"
          className="w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-text outline-none focus:border-primary"
        />
        <p className="text-xs text-text-muted">We use this only for order updates if email bounces.</p>
      </div>

      <label className="flex items-start gap-3 text-sm text-text">
        <input
          type="checkbox"
          checked={marketingOptIn}
          onChange={(event) => setMarketingOptIn(event.target.checked)}
          className="mt-1 size-4 rounded-sm border-border"
        />
        <span>
          Send me occasional product updates and offers. You can unsubscribe at any time.
        </span>
      </label>

      <label className="flex items-start gap-3 text-sm text-text">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(event) => setAcceptedTerms(event.target.checked)}
          className="mt-1 size-4 rounded-sm border-border"
          required
        />
        <span>
          I agree to the{" "}
          <Link href="/legal/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/legal/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}

      <Button type="submit" fullWidth disabled={submitting || !acceptedTerms}>
        {submitting ? "Setting up your dashboard…" : "Continue to dashboard"}
      </Button>
    </form>
  );
}
