"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

type Viewer = {
  id: string;
  email: string;
  phone: string | null;
  marketing_opt_in: boolean;
};

async function fetchViewer(): Promise<Viewer | null> {
  try {
    const response = await fetch("/api/v1/me", { credentials: "same-origin" });
    if (!response.ok) return null;
    const payload = (await response.json().catch(() => null)) as { data?: { user?: Viewer } } | null;
    return payload?.data?.user ?? null;
  } catch {
    return null;
  }
}

export function AppPreferencesCard() {
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    void fetchViewer().then((value) => {
      setViewer(value);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      reload();
    }, 0);
    return () => clearTimeout(timer);
  }, [reload]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setErrorMessage(null);

    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/v1/me/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          phone: data.get("phone"),
          marketing_opt_in: data.get("marketing_opt_in") === "on",
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { data?: { user: Viewer }; error?: { message?: string } }
        | null;
      if (!response.ok || !payload?.data?.user) {
        setSubmitState("error");
        setErrorMessage(payload?.error?.message ?? "Could not save preferences.");
        return;
      }
      setViewer(payload.data.user);
      setSubmitState("success");
    } catch (err) {
      setSubmitState("error");
      setErrorMessage(err instanceof Error ? err.message : "Could not save preferences.");
    }
  }

  return (
    <Card>
      <header className="border-b border-border/55 pb-3">
        <h2 className="font-display text-lg tracking-tight">App preferences</h2>
        <p className="mt-1 text-sm text-text-muted">
          Contact details and marketing preferences specific to this site. Identity, password,
          MFA, and connected accounts are managed in the Profile card above.
        </p>
      </header>

      {loading ? (
        <p className="mt-4 text-sm text-text-muted">Loading…</p>
      ) : !viewer ? (
        <p className="mt-4 text-sm text-destructive">Could not load your preferences.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
              Phone
            </span>
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              className="signal-input mt-1.5"
              defaultValue={viewer.phone ?? ""}
              placeholder="Optional — used only when email bounces"
            />
          </label>

          <label className="flex items-start gap-3 text-sm text-text">
            <input
              type="checkbox"
              name="marketing_opt_in"
              defaultChecked={viewer.marketing_opt_in}
              className="mt-1 size-4 rounded-sm border-border"
            />
            <span>Send me occasional product updates and offers.</span>
          </label>

          {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
          {submitState === "success" ? (
            <p className="text-sm text-success">Preferences saved.</p>
          ) : null}

          <div className="flex items-center justify-end gap-2 pt-1">
            <Button type="submit" size="sm" disabled={submitState === "submitting"}>
              {submitState === "submitting" ? "Saving…" : "Save preferences"}
            </Button>
          </div>
        </form>
      )}
    </Card>
  );
}
