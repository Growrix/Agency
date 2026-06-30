"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

type SubmissionListItem = {
  id: string;
  type: string;
  status: string;
  customer_visible_status: string;
  customer_name: string;
  customer_email: string;
  summary: string;
  created_at: string;
  assigned_to_user_id?: string;
  has_customer_visible_notes: boolean;
};

type ListEnvelope = {
  data: {
    items: SubmissionListItem[];
    total: number;
    limit: number;
    offset: number;
  };
};

const TYPE_FILTERS: Array<{ value: string; label: string }> = [
  { value: "", label: "All" },
  { value: "inquiry", label: "Contact" },
  { value: "appointment", label: "Booking" },
  { value: "service_request", label: "Service request" },
  { value: "order", label: "Order" },
  { value: "newsletter", label: "Newsletter" },
];

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
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

export function SubmissionsInboxClient() {
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<SubmissionListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchList = useCallback(async () => {
    setLoading(true);
    setError(null);
    const url = new URL("/api/v1/admin/submissions", window.location.origin);
    if (type) url.searchParams.set("type", type);
    if (search.trim()) url.searchParams.set("q", search.trim());
    url.searchParams.set("limit", "100");

    try {
      const response = await fetch(url.toString(), { credentials: "same-origin" });
      const payload = (await response.json().catch(() => null)) as
        | (ListEnvelope & { error?: { message?: string } })
        | null;
      if (!response.ok || !payload?.data) {
        setError(payload?.error?.message ?? "Unable to load submissions.");
        setItems([]);
        setTotal(0);
        return;
      }
      setItems(payload.data.items);
      setTotal(payload.data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load submissions.");
    } finally {
      setLoading(false);
    }
  }, [type, search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchList();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchList]);

  const typeCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of items) {
      map.set(item.type, (map.get(item.type) ?? 0) + 1);
    }
    return map;
  }, [items]);

  return (
    <div className="space-y-6 p-4 sm:p-5 lg:p-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Operations</p>
          <h1 className="mt-1 font-display text-3xl tracking-tight">Submissions Inbox</h1>
          <p className="mt-1 text-sm text-text-muted">
            Unified queue across contact, booking, service request, order, and newsletter records.
          </p>
        </div>
        <p className="text-sm text-text-muted">{total} matching · {items.length} loaded</p>
      </header>

      <Card variant="inset" className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {TYPE_FILTERS.map((filter) => {
            const active = type === filter.value;
            return (
              <Button
                key={filter.value || "all"}
                type="button"
                size="sm"
                variant={active ? "primary" : "outline"}
                onClick={() => setType(filter.value)}
              >
                {filter.label}
                {filter.value && typeCounts.has(filter.value)
                  ? ` (${typeCounts.get(filter.value)})`
                  : ""}
              </Button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="search"
            className="signal-input min-w-70 flex-1"
            placeholder="Search name, email, order number"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <Button type="button" size="sm" variant="outline" onClick={() => void fetchList()}>
            Refresh
          </Button>
        </div>
      </Card>

      {error ? (
        <Card>
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      ) : null}

      <Card className="overflow-hidden p-0">
        <div className="border-b border-border/60 bg-inset/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-text-muted">
          {loading ? "Loading submissions..." : `${items.length} results`}
        </div>
        <ul className="divide-y divide-border/60">
          {items.map((item) => (
            <li key={`${item.type}::${item.id}`}>
              <Link
                href={`/admin/submissions/${item.type}/${item.id}`}
                className="flex flex-col gap-1 px-4 py-3 transition-colors hover:bg-inset/30"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-text">{item.customer_name}</p>
                  <span className="text-xs text-text-muted">{formatDateTime(item.created_at)}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-sm bg-inset/40 px-2 py-0.5 text-text-muted">{item.type}</span>
                  <span
                    className={`rounded-sm px-2 py-0.5 ${statusBadgeClass(item.customer_visible_status)}`}
                  >
                    {item.status}
                  </span>
                  {item.has_customer_visible_notes ? (
                    <span className="rounded-sm bg-primary/15 px-2 py-0.5 text-primary">replied</span>
                  ) : null}
                </div>
                <p className="text-sm text-text-muted">{item.summary}</p>
                <p className="text-xs text-text-muted">{item.customer_email}</p>
              </Link>
            </li>
          ))}
          {!loading && items.length === 0 ? (
            <li className="px-4 py-6 text-sm text-text-muted">No submissions match.</li>
          ) : null}
        </ul>
      </Card>
    </div>
  );
}
