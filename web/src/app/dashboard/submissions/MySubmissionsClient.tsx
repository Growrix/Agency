"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  FunnelIcon,
  InboxStackIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import { LinkButton } from "@/components/primitives/Button";

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

  const tabs = ["All Submissions", "Contact", "Booking", "Service Request", "Order"];
  const openCount = items.filter((i) => i.customer_visible_status === "open").length;
  const inProgressCount = items.filter((i) => i.customer_visible_status === "in_progress").length;
  const resolvedCount = items.filter((i) => i.customer_visible_status === "resolved").length;
  const repliedCount = items.filter((i) => i.has_customer_visible_notes).length;

  return (
    <div className="space-y-4 p-4 sm:p-5 lg:p-6">

      {/* Hero */}
      <section className="dashboard-hero-surface relative overflow-hidden rounded-md border border-primary/25 p-6 lg:p-7">
        <div className="dashboard-hero-glow pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 lg:block" aria-hidden />
        <div className="relative grid gap-5 xl:grid-cols-[1.1fr_1fr] xl:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-primary">Portal summary</p>
            <h1 className="mt-3 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-4xl">
              My submissions <span aria-hidden>👋</span>
            </h1>
            <p className="mt-3 text-base text-text-muted">
              Every contact form, booking, service request, and order tied to your account.
              Click any row to read team replies.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total", value: items.length, icon: <ClipboardDocumentListIcon className="size-5" /> },
              { label: "Open", value: openCount, icon: <InboxStackIcon className="size-5" /> },
              { label: "In progress", value: inProgressCount, icon: <ClipboardDocumentListIcon className="size-5" /> },
              { label: "Resolved", value: resolvedCount, icon: <ArrowRightIcon className="size-5" /> },
            ].map((stat) => (
              <div key={stat.label} className="rounded-sm border border-primary/20 bg-surface/25 px-3.5 py-3">
                <div className="flex items-center gap-2 text-primary">{stat.icon}<span className="text-2xl font-semibold text-text">{stat.value}</span></div>
                <p className="mt-1 text-sm text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab, index) => (
            <button key={tab} type="button" className={index === 0 ? "border-b-2 border-primary pb-2 text-base font-medium text-primary" : "pb-2 text-base text-text-muted"}>{tab}</button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="relative">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            <input type="text" placeholder="Search submissions..." className="h-11 rounded-sm border border-border/60 bg-surface/45 pl-10 pr-3 text-sm text-text placeholder:text-text-muted" />
          </label>
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-sm border border-border/60 px-4 text-sm text-text"><FunnelIcon className="size-4" />Filter</button>
          <button type="button" className="inline-flex h-11 items-center rounded-sm border border-border/60 px-4 text-sm text-text">Sort: Newest</button>
        </div>
      </section>

      {error ? (
        <Card className="dashboard-panel-surface rounded-sm border-border/65" hoverable={false}>
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      ) : null}

      {/* List */}
      <Card className="dashboard-panel-surface rounded-sm border-border/65 p-0" hoverable={false}>
        <div className="border-b border-border/55 px-5 py-3">
          <p className="text-sm font-semibold text-text">
            {loading ? "Loading submissions..." : `${items.length} submission${items.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <ul className="divide-y divide-border/55">
          {items.map((item) => (
            <li key={`${item.type}::${item.id}`}>
              <Link
                href={`/dashboard/submissions/${item.type}/${item.id}`}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface/40"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-primary/20 bg-primary/12 text-primary">
                  <ClipboardDocumentListIcon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-2xl font-semibold text-text">{typeLabel(item.type)}</p>
                    <span className="text-sm text-text-muted">{formatDateTime(item.created_at)}</span>
                  </div>
                  <p className="mt-0.5 truncate text-base text-text-muted">{item.summary}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                      item.customer_visible_status === "open"
                        ? "border-warning/40 bg-warning/12 text-warning"
                        : item.customer_visible_status === "in_progress"
                          ? "border-primary/35 bg-primary/12 text-primary"
                          : item.customer_visible_status === "resolved"
                            ? "border-success/40 bg-success/12 text-success"
                            : "border-border/60 bg-surface/20 text-text-muted"
                    }`}>
                      {statusLabel(item.customer_visible_status)}
                    </span>
                    {item.has_customer_visible_notes ? (
                      <span className="inline-flex rounded-full border border-primary/35 bg-primary/12 px-2.5 py-0.5 text-xs font-semibold text-primary">Team replied</span>
                    ) : null}
                  </div>
                </div>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/60 text-text-muted">
                  <ChevronRightIcon className="size-5" />
                </span>
              </Link>
            </li>
          ))}
          {!loading && items.length === 0 ? (
            <li>
              <div className="px-5 py-12 text-center">
                <span className="mx-auto inline-flex size-16 items-center justify-center rounded-sm border border-primary/25 bg-primary/12 text-primary">
                  <InboxStackIcon className="size-7" />
                </span>
                <p className="mt-6 font-display text-4xl tracking-tight">No submissions yet</p>
                <p className="mx-auto mt-3 max-w-sm text-base text-text-muted">
                  Your contact forms, bookings, and service requests will appear here.
                </p>
                <LinkButton href="/contact" variant="outline" className="mt-6">
                  Contact us
                  <ArrowRightIcon className="ml-1 size-4" />
                </LinkButton>
              </div>
            </li>
          ) : null}
        </ul>
      </Card>

      {/* Footer */}
      {items.length > 0 ? (
        <Card className="dashboard-panel-surface rounded-sm border-border/65 px-4 py-3" hoverable={false}>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-text-muted">
            <p>Showing 1 to {items.length} of {items.length} submissions · {repliedCount} with team replies</p>
            <div className="flex items-center gap-2">
              <button type="button" className="h-9 rounded-sm border border-border/60 px-3 text-text-muted" disabled>Previous</button>
              <button type="button" className="h-9 rounded-sm border border-primary/35 bg-primary/12 px-3 text-primary">1</button>
              <button type="button" className="h-9 rounded-sm border border-border/60 px-3 text-text-muted" disabled>Next</button>
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
