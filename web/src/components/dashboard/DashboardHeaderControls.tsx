"use client";

import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { BellIcon, Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { cn } from "@/lib/utils";

type DashboardNotification = {
  id: string;
  title: string;
  detail: string;
  time: string;
  unread?: boolean;
};

type DashboardHeaderControlsProps = {
  profileName?: string;
  profileEmail?: string;
  notifications?: DashboardNotification[];
  className?: string;
};

const defaultNotifications: DashboardNotification[] = [
  {
    id: "n1",
    title: "Catalog sync completed",
    detail: "All services and products are up to date.",
    time: "2m ago",
    unread: true,
  },
  {
    id: "n2",
    title: "New inquiry received",
    detail: "A new enterprise website request arrived.",
    time: "18m ago",
    unread: true,
  },
  {
    id: "n3",
    title: "Pipeline reminder",
    detail: "2 follow-ups are due today.",
    time: "1h ago",
    unread: false,
  },
];

export function DashboardHeaderControls({
  profileName = "Admin User",
  profileEmail = "admin@growrix.com",
  notifications = defaultNotifications,
  className,
}: DashboardHeaderControlsProps) {
  const unreadCount = notifications.filter((note) => note.unread).length;

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <ThemeToggle className="hover:bg-inset/70" />

      <Popover className="relative">
        <PopoverButton
          className="relative inline-flex size-10 items-center justify-center rounded-full border border-border/55 bg-surface/30 text-text transition-colors hover:bg-inset/65"
          aria-label="Open notifications"
        >
          <BellIcon className="size-5" />
          {unreadCount > 0 ? (
            <span className="absolute right-1.5 top-1.5 inline-flex h-2.5 w-2.5 rounded-full bg-primary" aria-hidden />
          ) : null}
        </PopoverButton>
        <Transition
          as={Fragment}
          enter="transition duration-150"
          enterFrom="opacity-0 -translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverPanel className="absolute right-0 z-40 mt-2 w-80 rounded-md border border-border bg-surface p-2 shadow-(--shadow-3)">
            <div className="border-b border-border/60 px-2 pb-2 pt-1">
              <p className="text-sm font-semibold">Notifications</p>
              <p className="text-xs text-text-muted">Recent dashboard activity.</p>
            </div>
            <div className="max-h-80 space-y-1 overflow-y-auto p-1">
              {notifications.map((note) => (
                <div key={note.id} className="rounded-sm border border-border/55 bg-inset/30 px-3 py-2">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-text">{note.title}</p>
                    {note.unread ? <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden /> : null}
                  </div>
                  <p className="mt-1 text-xs text-text-muted">{note.detail}</p>
                  <p className="mt-1 text-[11px] text-text-muted">{note.time}</p>
                </div>
              ))}
            </div>
          </PopoverPanel>
        </Transition>
      </Popover>

      <Popover className="relative">
        <PopoverButton
          className="inline-flex size-10 items-center justify-center rounded-full border border-border/55 bg-surface/30 text-text transition-colors hover:bg-inset/65"
          aria-label="Open profile menu"
        >
          <UserCircleIcon className="size-6" />
        </PopoverButton>
        <Transition
          as={Fragment}
          enter="transition duration-150"
          enterFrom="opacity-0 -translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverPanel className="absolute right-0 z-40 mt-2 w-64 rounded-md border border-border bg-surface p-2 shadow-(--shadow-3)">
            <div className="rounded-sm border border-border/50 bg-inset/25 px-3 py-2">
              <p className="text-sm font-semibold text-text">{profileName}</p>
              <p className="text-xs text-text-muted">{profileEmail}</p>
            </div>
            <div className="mt-2 grid gap-1">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-sm px-3 py-2 text-left text-sm text-text transition-colors hover:bg-inset"
              >
                <Cog6ToothIcon className="size-4" />
                Profile settings
              </button>
            </div>
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  );
}
