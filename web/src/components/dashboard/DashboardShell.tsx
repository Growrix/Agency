"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/primitives/Button";
import { DashboardHeaderControls } from "@/components/dashboard/DashboardHeaderControls";
import { cn } from "@/lib/utils";

export type DashboardNavItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

type DashboardShellProps = {
  title: string;
  currentPath: string;
  navItems: DashboardNavItem[];
  utilityActions?: React.ReactNode;
  children: React.ReactNode;
};

export function DashboardShell({
  title,
  currentPath,
  navItems,
  utilityActions,
  children,
}: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const sidebarWidthClass = collapsed
    ? "lg:grid-cols-[var(--dashboard-sidebar-collapsed)_minmax(0,1fr)]"
    : "lg:grid-cols-[var(--dashboard-sidebar-expanded)_minmax(0,1fr)]";

  return (
    <div className={cn("h-screen min-h-0 overflow-hidden bg-background lg:grid", sidebarWidthClass)}>

      <div
        className={cn(
          "fixed inset-0 z-20 bg-overlay/50 transition-opacity lg:hidden",
          mobileSidebarOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileSidebarOpen(false)}
        aria-hidden
      />

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-dvh w-(--dashboard-sidebar-expanded) flex-col border-r border-border/40 bg-surface/92 backdrop-blur-md transition-transform duration-200 lg:static lg:h-screen lg:w-auto lg:backdrop-blur-0",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-(--dashboard-header-height) items-center justify-between border-b border-border/40 px-4">
          <div className="flex min-w-0 items-center gap-2.5">
            {collapsed ? (
              <Image
                src="/website logo main.svg"
                alt="Growrix logo"
                width={32}
                height={32}
                unoptimized
                className="h-8 w-8 object-contain"
              />
            ) : (
              <Image
                src="/website logo main.svg"
                alt="Growrix logo"
                width={120}
                height={32}
                unoptimized
                className="h-7 w-auto object-contain"
              />
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setCollapsed((v) => !v)}
              className="hidden lg:inline-flex"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronDoubleRightIcon className="h-4 w-4" /> : <ChevronDoubleLeftIcon className="h-4 w-4" />}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
              aria-label="Close navigation"
            >
              <XMarkIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-3">
          {navItems.map((item) => {
            const active = item.href === currentPath;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md border px-3 py-2.5 text-sm transition-all whitespace-nowrap",
                  active
                    ? "border-border-strong bg-inset/60 text-text"
                    : "border-border/40 text-text-muted hover:border-border-strong hover:text-text",
                  collapsed && "justify-center px-2"
                )}
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                  {item.icon ?? <span className="text-xs font-semibold">{item.label.slice(0, 1)}</span>}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {utilityActions && (
          <div className="mt-auto space-y-2 border-t border-border/40 p-2">
            {utilityActions}
          </div>
        )}
      </aside>

      <div className="relative z-0 flex h-screen min-h-0 flex-col bg-background lg:h-screen">
        <header className="z-30 border-b border-border/40 bg-surface/85 backdrop-blur-md">
          <div className="flex h-(--dashboard-header-height) items-center justify-between px-4 sm:px-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Open navigation"
              >
                <Bars3Icon className="h-5 w-5" />
              </Button>
              <h1 className="font-display text-base font-semibold tracking-tight text-text sm:text-lg">{title}</h1>
            </div>
            <DashboardHeaderControls />
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto bg-background">
          <div className="h-full w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
