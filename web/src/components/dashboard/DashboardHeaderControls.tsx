"use client";

import Link from "next/link";
import { Popover } from "@headlessui/react";
import { useCallback, useEffect, useState } from "react";
import { BellIcon, Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { cn } from "@/lib/utils";

type CustomerNotification = {
  id: string;
  kind: string;
  title: string;
  body?: string;
  href?: string;
  read_at?: string;
  created_at: string;
};

type DashboardHeaderControlsProps = {
  profileName?: string;
  profileEmail?: string;
  className?: string;
};

function formatRelative(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60_000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return date.toLocaleDateString();
}

export function DashboardHeaderControls({
  profileName = "Customer",
  profileEmail = "customer@growrixos.com",
  className,
}: DashboardHeaderControlsProps) {
  const [items, setItems] = useState<CustomerNotification[]>([]);
  const [unread, setUnread] = useState(0);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch("/api/v1/me/notifications", { credentials: "same-origin" });
      if (!response.ok) return;
      const payload = (await response.json().catch(() => null)) as
        | { data?: { items: CustomerNotification[]; unread: number } }
        | null;
      if (!payload?.data) return;
      setItems(payload.data.items);
      setUnread(payload.data.unread);
    } catch {
      // swallow — bell is non-critical
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchNotifications();
    }, 0);
    const interval = setInterval(() => {
      void fetchNotifications();
    }, 60_000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [fetchNotifications]);

  async function handleMarkAllRead() {
    try {
      await fetch("/api/v1/me/notifications/mark-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({}),
      });
      await fetchNotifications();
    } catch {
      // ignore
    }
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <ThemeToggle className="hover:bg-inset/70" />

      <Popover className="relative">
        <Popover.Button
          className="relative inline-flex size-10 items-center justify-center rounded-full border border-border/55 bg-surface/30 text-text transition-colors hover:bg-inset/65"
          aria-label="Open notifications"
        >
          <BellIcon className="size-5" />
          {unread > 0 ? (
            <span className="absolute right-1.5 top-1.5 inline-flex h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
          ) : null}
        </Popover.Button>
        <Popover.Panel className="absolute right-0 z-40 mt-2 w-80 rounded-md border border-border bg-surface p-2 shadow-(--shadow-3)">
          <div className="flex items-start justify-between gap-3 border-b border-border/60 px-2 pb-2 pt-1">
            <div>
              <p className="text-sm font-semibold">Notifications</p>
              <p className="text-xs text-text-muted">
                {unread > 0 ? `${unread} unread` : "All caught up"}
              </p>
            </div>
            {items.length > 0 ? (
              <button
                type="button"
                onClick={() => void handleMarkAllRead()}
                className="text-xs text-primary hover:underline"
              >
                Mark all read
              </button>
            ) : null}
          </div>
          <div className="max-h-80 space-y-1 overflow-y-auto p-1">
            {items.map((note) => {
              const inner = (
                <div className={cn(
                  "rounded-sm border border-border/55 px-3 py-2 transition-colors",
                  note.read_at ? "bg-surface" : "bg-inset/40",
                )}>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-text">{note.title}</p>
                    {!note.read_at ? (
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                    ) : null}
                  </div>
                  {note.body ? <p className="mt-1 text-xs text-text-muted">{note.body}</p> : null}
                  <p className="mt-1 text-[11px] text-text-muted">{formatRelative(note.created_at)}</p>
                </div>
              );
              return note.href ? (
                <Link key={note.id} href={note.href} className="block hover:opacity-90">
                  {inner}
                </Link>
              ) : (
                <div key={note.id}>{inner}</div>
              );
            })}
            {items.length === 0 ? (
              <p className="px-3 py-4 text-xs text-text-muted">No notifications yet.</p>
            ) : null}
          </div>
        </Popover.Panel>
      </Popover>

      <Popover className="relative">
        <Popover.Button
          className="inline-flex size-10 items-center justify-center rounded-full border border-border/55 bg-surface/30 text-text transition-colors hover:bg-inset/65"
          aria-label="Open profile menu"
        >
          <UserCircleIcon className="size-6" />
        </Popover.Button>
        <Popover.Panel className="absolute right-0 z-40 mt-2 w-64 rounded-md border border-border bg-surface p-2 shadow-(--shadow-3)">
          <div className="rounded-sm border border-border/50 bg-inset/25 px-3 py-2">
            <p className="text-sm font-semibold text-text">{profileName}</p>
            <p className="text-xs text-text-muted">{profileEmail}</p>
          </div>
          <div className="mt-2 grid gap-1">
            <Link
              href="/dashboard/account"
              className="inline-flex items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-text transition-colors hover:bg-inset"
            >
              <Cog6ToothIcon className="size-4" />
              Profile and preferences
            </Link>
          </div>
        </Popover.Panel>
      </Popover>
    </div>
  );
}
