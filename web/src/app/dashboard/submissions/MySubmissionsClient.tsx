"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "@/components/primitives/Card";

type MySubmission = {
  id: string;
  type: string;
  status: string;
  customer_visible_status: string;
  customer_name: string;
  customer_email: string;
  summary: string;
  created_at: string;
  has_customer_visible_notes: boolean;
};

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function statusLabel(status: string) {
  switch (status) {
    case "open":
      return "Received";
    case "in_progress":
      return "In progress";
    case "resolved":
      return "Resolved";
    case "closed":
      return "Closed";
    default:
      return status;
  }
}

function statusBadgeClass(status: string) {
  switch (status) {
    case "open":
      return "bg-warning/15 text-warning";
    case "in_progress":
      return "bg-primary/15 text-primary";
    case "resolved":
      return "bg-success/15 text-success";
    case "closed":
      return "bg-text-muted/15 text-text-muted";
    default:
      return "bg-inset/40 text-text-muted";
  }
}

function typeLabel(type: string) {
  switch (type) {
    case "inquiry":
      return "Contact";
    case "appointment":
      return "Booking";
    case "service_request":
      return "Service request";
    case "order":
      return "Order";
    case "newsletter":
      return "Newsletter";
    default:
      return type;
  }
}

export function MySubmissionsClient() {
  const [items, setItems] = useState<MySubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const response = await fetch("/api/v1/me/submissions", { credentials: "same-origin" });
        const payload = (await response.json().catch(() => null)) as
          | { data?: MySubmission[]; error?: { message?: string } }
          | null;
        if (cancelled) return;
        if (!response.ok || !payload?.data) {
          setError(payload?.error?.message ?? "Unable to load submissions.");
          return;
        }
        setItems(payload.data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load submissions.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6 p-4 sm:p-5 lg:p-6">
      <Card variant="inset">
        <p className="text-xs uppercase tracking-[0.18em] text-text-muted">My submissions</p>
        <h1 className="mt-3 font-display text-3xl tracking-tight">Submission history</h1>
        <p className="mt-3 text-sm leading-6 text-text-muted">
          Every contact form, booking, service request, and order tied to your account in one
          place. Click into any submission to read replies from the team.
        </p>
      </Card>

      {error ? (
        <Card>
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      ) : null}

      <Card className="overflow-hidden p-0">
        <div className="border-b border-border/60 bg-inset/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-text-muted">
          {loading ? "Loading..." : `${items.length} submissions`}
        </div>
        <ul className="divide-y divide-border/60">
          {items.map((item) => (
            <li key={`${item.type}::${item.id}`}>
              <Link
                href={`/dashboard/submissions/${item.type}/${item.id}`}
                className="flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-inset/30"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-text">{typeLabel(item.type)}</p>
                  <span className="text-xs text-text-muted">{formatDateTime(item.created_at)}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span
                    className={`rounded-sm px-2 py-0.5 ${statusBadgeClass(item.customer_visible_status)}`}
                  >
                    {statusLabel(item.customer_visible_status)}
                  </span>
                  {item.has_customer_visible_notes ? (
                    <span className="rounded-sm bg-primary/15 px-2 py-0.5 text-primary">
                      Team replied
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-text-muted">{item.summary}</p>
              </Link>
            </li>
          ))}
          {!loading && items.length === 0 ? (
            <li className="px-4 py-6 text-sm text-text-muted">No submissions yet.</li>
          ) : null}
        </ul>
      </Card>
    </div>
  );
}
