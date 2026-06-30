"use client";

import { Dialog } from "@headlessui/react";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/primitives/Button";

type AppointmentLite = {
  id: string;
  service_interested_in: string;
  preferred_datetime: string;
  status: string;
};

type Props = {
  appointment: AppointmentLite | null;
  onClose: () => void;
  onUpdated: () => void;
};

function toLocalInputValue(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export function AppointmentRescheduleModal({ appointment, onClose, onUpdated }: Props) {
  const [datetime, setDatetime] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!appointment) return;
    const timer = setTimeout(() => {
      setDatetime(toLocalInputValue(appointment.preferred_datetime));
      setSubmitState("idle");
      setFeedback(null);
    }, 0);
    return () => clearTimeout(timer);
  }, [appointment]);

  async function submit(payload: { preferred_datetime?: string; cancel?: boolean }) {
    if (!appointment) return;
    setSubmitState("submitting");
    setFeedback(null);
    try {
      const response = await fetch(`/api/v1/me/appointments/${appointment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
      if (!response.ok) {
        setSubmitState("error");
        setFeedback(result?.error?.message ?? "Could not update appointment.");
        return;
      }
      setSubmitState("success");
      setFeedback(payload.cancel ? "Appointment cancelled." : "Appointment rescheduled.");
      onUpdated();
    } catch (err) {
      setSubmitState("error");
      setFeedback(err instanceof Error ? err.message : "Could not update appointment.");
    }
  }

  async function handleReschedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!datetime) {
      setFeedback("Pick a new date and time.");
      return;
    }
    const iso = new Date(datetime).toISOString();
    await submit({ preferred_datetime: iso });
  }

  return (
    <Dialog open={Boolean(appointment)} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-overlay/60" aria-hidden />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-md border border-border bg-surface p-5 shadow-(--shadow-3)">
          <div className="flex items-center justify-between gap-3">
            <Dialog.Title className="font-display text-lg">Reschedule appointment</Dialog.Title>
            <button
              type="button"
              className="text-sm text-text-muted hover:text-text"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          {appointment ? (
            <>
              <div className="mt-3 rounded-sm border border-border/50 bg-inset/30 px-3 py-2 text-xs text-text-muted">
                <p>
                  Service: <span className="text-text">{appointment.service_interested_in}</span>
                </p>
                <p className="mt-1">
                  Current status: <span className="text-text">{appointment.status}</span>
                </p>
              </div>

              <form onSubmit={handleReschedule} className="mt-4 space-y-3">
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    New date and time
                  </span>
                  <input
                    type="datetime-local"
                    className="signal-input mt-1.5"
                    value={datetime}
                    onChange={(event) => setDatetime(event.target.value)}
                  />
                </label>

                {feedback ? (
                  <p
                    className={
                      submitState === "error" ? "text-sm text-destructive" : "text-sm text-text-muted"
                    }
                  >
                    {feedback}
                  </p>
                ) : null}

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={submitState === "submitting"}
                    onClick={() => void submit({ cancel: true })}
                  >
                    Cancel appointment
                  </Button>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={onClose}>
                      Close
                    </Button>
                    <Button type="submit" size="sm" disabled={submitState === "submitting"}>
                      {submitState === "submitting" ? "Saving..." : "Save new time"}
                    </Button>
                  </div>
                </div>
              </form>
            </>
          ) : null}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
