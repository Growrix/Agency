"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

type EmailLogEntry = {
  id: string;
  created_at: string;
  level: "info" | "warning" | "error";
  action: string;
  kind: string | null;
  subject: string | null;
  recipients: string[];
  status: "delivered" | "failed" | "skipped";
  error_message: string | null;
  actor_email: string | null;
};

type ListEnvelope = {
  data: {
    items: EmailLogEntry[];
    total: number;
    limit: number;
    offset: number;
  };
};

const STATUS_FILTERS: Array<{ value: string; label: string }> = [
  { value: "", label: "All" },
  { value: "delivered", label: "Delivered" },
  { value: "failed", label: "Failed" },
  { value: "skipped", label: "Skipped" },
];

function statusBadgeClass(status: EmailLogEntry["status"]) {
  switch (status) {
    case "delivered":
      return "bg-success/15 text-success";
    case "failed":
      return "bg-destructive/15 text-destructive";
    case "skipped":
      return "bg-warning/15 text-warning";
    default:
      return "bg-inset/40 text-text-muted";
  }
}

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export function EmailLogClient() {
  const [status, setStatus] = useState("");
  const [kind, setKind] = useState("");
  const [items, setItems] = useState<EmailLogEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchList = useCallback(async () => {
    setLoading(true);
    setError(null);
    const url = new URL("/api/v1/admin/email-log", window.location.origin);
    if (status) url.searchParams.set("status", status);
    if (kind.trim()) url.searchParams.set("kind", kind.trim());
    url.searchParams.set("limit", "200");

    try {
      const response = await fetch(url.toString(), { credentials: "same-origin" });
      const payload = (await response.json().catch(() => null)) as
        | (ListEnvelope & { error?: { message?: string } })
        | null;

      if (!response.ok || !payload?.data) {
        throw new Error(payload?.error?.message ?? "Unable to load email log.");
      }

      setItems(payload.data.items);
      setTotal(payload.data.total);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load email log.");
    } finally {
      setLoading(false);
    }
  }, [kind, status]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchList();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchList]);

  const counts = useMemo(() => {
    const out = { delivered: 0, failed: 0, skipped: 0 };
    for (const entry of items) {
      out[entry.status] += 1;
    }
    return out;
  }, [items]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Admin</p>
          <h1 className="mt-1 font-display text-3xl tracking-tight">Email log</h1>
          <p className="mt-2 text-sm text-text-muted">
            Audit trail of outbound team notifications routed through Resend. Surfaces delivered,
            failed, and configuration-skipped attempts.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-text-muted">
          <span>{total} entries</span>
          <span>·</span>
          <span>{counts.delivered} delivered</span>
          <span>·</span>
          <span className="text-destructive">{counts.failed} failed</span>
          <span>·</span>
          <span className="text-warning">{counts.skipped} skipped</span>
        </div>
      </header>

      <Card>
        <div className="flex flex-wrap items-center gap-3 border-b border-border/55 px-4 py-3">
          <div className="flex items-center gap-2">
            <label className="text-xs text-text-muted" htmlFor="email-log-status">
              Status
            </label>
            <select
              id="email-log-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="rounded-sm border border-border bg-surface px-2 py-1.5 text-sm"
            >
              {STATUS_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-text-muted" htmlFor="email-log-kind">
              Kind
            </label>
            <input
              id="email-log-kind"
              type="text"
              value={kind}
              onChange={(event) => setKind(event.target.value)}
              placeholder="contact_inquiry"
              className="rounded-sm border border-border bg-surface px-2 py-1.5 text-sm"
            />
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => void fetchList()}>
            Refresh
          </Button>
        </div>

        {error ? (
          <p role="alert" className="px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        {loading ? (
          <p className="px-4 py-6 text-sm text-text-muted">Loading…</p>
        ) : items.length === 0 ? (
          <p className="px-4 py-6 text-sm text-text-muted">No email events recorded yet.</p>
        ) : (
          <ul className="divide-y divide-border/40">
            {items.map((entry) => (
              <li key={entry.id} className="px-4 py-3 text-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${statusBadgeClass(entry.status)}`}
                      >
                        {entry.status}
                      </span>
                      <span className="font-mono text-[11px] text-text-muted">{entry.action}</span>
                      {entry.kind ? (
                        <span className="font-mono text-[11px] text-text-muted">· {entry.kind}</span>
                      ) : null}
                    </div>
                    {entry.subject ? (
                      <p className="mt-1 truncate font-medium text-text">{entry.subject}</p>
                    ) : null}
                    {entry.recipients.length > 0 ? (
                      <p className="mt-1 text-xs text-text-muted">
                        To: {entry.recipients.join(", ")}
                      </p>
                    ) : null}
                    {entry.error_message ? (
                      <p className="mt-1 text-xs text-destructive">{entry.error_message}</p>
                    ) : null}
                  </div>
                  <p className="font-mono text-[11px] text-text-muted">{formatDateTime(entry.created_at)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </main>
  );
}
