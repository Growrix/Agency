"use client";

import { Dialog } from "@headlessui/react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/primitives/Button";

type Viewer = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  marketing_opt_in: boolean;
};

type ProfileSettingsModalProps = {
  open: boolean;
  onClose: () => void;
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

export function ProfileSettingsModal({ open, onClose }: ProfileSettingsModalProps) {
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      setLoading(true);
      setSubmitState("idle");
      setErrorMessage(null);
      void fetchViewer().then((value) => {
        if (cancelled) return;
        setViewer(value);
        setLoading(false);
      });
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [open]);

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
          first_name: data.get("first_name"),
          last_name: data.get("last_name"),
          phone: data.get("phone"),
          marketing_opt_in: data.get("marketing_opt_in") === "on",
        }),
      });
      const payload = (await response.json().catch(() => null)) as
        | { data?: { user: Viewer }; error?: { message?: string } }
        | null;
      if (!response.ok || !payload?.data?.user) {
        setSubmitState("error");
        setErrorMessage(payload?.error?.message ?? "Could not save profile.");
        return;
      }
      setViewer(payload.data.user);
      setSubmitState("success");
    } catch (err) {
      setSubmitState("error");
      setErrorMessage(err instanceof Error ? err.message : "Could not save profile.");
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-overlay/60" aria-hidden />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-md border border-border bg-surface p-5 shadow-(--shadow-3)">
          <div className="flex items-center justify-between gap-3">
            <Dialog.Title className="font-display text-lg">Profile settings</Dialog.Title>
            <button
              type="button"
              className="text-sm text-text-muted hover:text-text"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {loading ? (
            <p className="mt-4 text-sm text-text-muted">Loading...</p>
          ) : !viewer ? (
            <p className="mt-4 text-sm text-destructive">Could not load your profile.</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div className="rounded-sm border border-border/50 bg-inset/30 px-3 py-2 text-xs text-text-muted">
                <p>
                  Email: <span className="text-text">{viewer.email}</span>
                </p>
                <p className="mt-1">
                  Change your primary email through Clerk&apos;s account portal.
                </p>
              </div>

              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">First name</span>
                <input
                  name="first_name"
                  className="signal-input mt-1.5"
                  defaultValue={viewer.first_name ?? ""}
                />
              </label>

              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Last name</span>
                <input
                  name="last_name"
                  className="signal-input mt-1.5"
                  defaultValue={viewer.last_name ?? ""}
                />
              </label>

              <label className="block">
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Phone</span>
                <input
                  name="phone"
                  className="signal-input mt-1.5"
                  defaultValue={viewer.phone ?? ""}
                  placeholder="Optional"
                />
              </label>

              <label className="flex items-center gap-2 text-sm text-text-muted">
                <input
                  type="checkbox"
                  name="marketing_opt_in"
                  defaultChecked={viewer.marketing_opt_in}
                />
                Send me product updates and offers
              </label>

              {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
              {submitState === "success" ? (
                <p className="text-sm text-success">Profile updated.</p>
              ) : null}

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                  Close
                </Button>
                <Button type="submit" size="sm" disabled={submitState === "submitting"}>
                  {submitState === "submitting" ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </form>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
