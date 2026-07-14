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
import { DashboardHeroBand } from "@/components/dashboard/DashboardHeroBand";
import { Card } from "@/components/primitives/Card";
import { LinkButton } from "@/components/primitives/Button";
import {
  DASHBOARD_CARD_META_CLASS,
  DASHBOARD_CARD_TITLE_CLASS,
  DASHBOARD_EMPTY_TITLE_CLASS,
} from "@/lib/dashboard-typography";
import { cn } from "@/lib/utils";

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

function statusTone(status: string) {
  switch (status) {
    case "open":
      return "border-warning/40 bg-warning/12 text-warning";
    case "in_progress":
      return "border-primary/35 bg-primary/12 text-primary";
    case "resolved":
      return "border-success/40 bg-success/12 text-success";
    default:
      return "border-border/60 bg-surface/20 text-text-muted";
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
      <DashboardHeroBand
        eyebrow="Submissions"
        title="My submissions"
        description="Every contact form, booking, service request, and order tied to your account. Click any row to read team replies."
        stats={[
          { label: "Total", value: items.length, icon: <ClipboardDocumentListIcon className="size-5" /> },
          { label: "Open", value: openCount, icon: <InboxStackIcon className="size-5" /> },
          { label: "In progress", value: inProgressCount, icon: <ClipboardDocumentListIcon className="size-5" /> },
          { label: "Resolved", value: resolvedCount, icon: <ArrowRightIcon className="size-5" /> },
        ]}
      />

      <section className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex max-w-full gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={index === 0 ? "shrink-0 border-b-2 border-primary pb-2 text-sm font-medium text-primary" : "shrink-0 pb-2 text-sm text-text-muted"}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="relative min-w-0 flex-1 sm:flex-none">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search submissions..."
              className="h-9 w-full min-w-0 rounded-sm border border-border/60 bg-surface/45 pl-10 pr-3 text-sm text-text placeholder:text-text-muted sm:h-10 sm:w-56"
            />
          </label>
          <button type="button" className="inline-flex h-9 items-center gap-2 rounded-sm border border-border/60 px-3 text-xs text-text sm:h-10 sm:px-4 sm:text-sm">
            <FunnelIcon className="size-4" />
            Filter
          </button>
          <button type="button" className="inline-flex h-9 items-center rounded-sm border border-border/60 px-3 text-xs text-text sm:h-10 sm:px-4 sm:text-sm">
            Sort: Newest
          </button>
        </div>
      </section>

      {error ? (
        <Card className="dashboard-panel-surface rounded-sm border-border/65" hoverable={false}>
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      ) : null}

      <Card className="dashboard-panel-surface rounded-sm border-border/65 p-0" hoverable={false}>
        <div className="border-b border-border/55 px-4 py-3 sm:px-5">
          <p className="text-sm font-semibold text-text">
            {loading ? "Loading submissions..." : `${items.length} submission${items.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <ul className="divide-y divide-border/55">
          {items.map((item) => (
            <li key={`${item.type}::${item.id}`}>
              <Link
                href={`/dashboard/submissions/${item.type}/${item.id}`}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface/40 sm:px-5"
              >
                <span className="dashboard-record-icon text-primary">
                  <ClipboardDocumentListIcon className="size-4" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className={DASHBOARD_CARD_TITLE_CLASS}>{typeLabel(item.type)}</p>
                    <span className={cn(DASHBOARD_CARD_META_CLASS, "shrink-0")}>{formatDateTime(item.created_at)}</span>
                  </div>
                  <p className="mt-0.5 truncate text-sm text-text-muted">{item.summary}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span className={cn("inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold", statusTone(item.customer_visible_status))}>
                      {statusLabel(item.customer_visible_status)}
                    </span>
                    {item.has_customer_visible_notes ? (
                      <span className="inline-flex rounded-full border border-primary/35 bg-primary/12 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        Team replied
                      </span>
                    ) : null}
                  </div>
                </div>
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border/60 text-text-muted">
                  <ChevronRightIcon className="size-4" />
                </span>
              </Link>
            </li>
          ))}
          {!loading && items.length === 0 ? (
            <li>
              <div className="px-4 py-10 text-center sm:px-5 sm:py-12">
                <span className="mx-auto inline-flex size-14 items-center justify-center rounded-sm border border-primary/25 bg-primary/12 text-primary sm:size-16">
                  <InboxStackIcon className="size-6 sm:size-7" />
                </span>
                <p className={cn(DASHBOARD_EMPTY_TITLE_CLASS, "mt-5 sm:mt-6")}>No submissions yet</p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-text-muted sm:text-base">
                  Your contact forms, bookings, and service requests will appear here.
                </p>
                <LinkButton href="/contact" variant="outline" className="mt-5 sm:mt-6">
                  Contact us
                  <ArrowRightIcon className="ml-1 size-4" />
                </LinkButton>
              </div>
            </li>
          ) : null}
        </ul>
      </Card>

      {items.length > 0 ? (
        <Card className="dashboard-panel-surface rounded-sm border-border/65 px-4 py-3" hoverable={false}>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-text-muted sm:text-sm">
            <p>
              Showing 1 to {items.length} of {items.length} submissions · {repliedCount} with team replies
            </p>
            <div className="flex items-center gap-2">
              <button type="button" className="h-8 rounded-sm border border-border/60 px-3 text-text-muted sm:h-9" disabled>
                Previous
              </button>
              <button type="button" className="h-8 rounded-sm border border-primary/35 bg-primary/12 px-3 text-primary sm:h-9">
                1
              </button>
              <button type="button" className="h-8 rounded-sm border border-border/60 px-3 text-text-muted sm:h-9" disabled>
                Next
              </button>
            </div>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
