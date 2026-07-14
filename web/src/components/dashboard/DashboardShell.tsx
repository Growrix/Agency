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
  headerControls?: React.ReactNode;
  children: React.ReactNode;
};

export function DashboardShell({
  title,
  currentPath,
  navItems,
  utilityActions,
  headerControls,
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
          "dashboard-shell-sidebar fixed left-0 top-0 z-40 flex h-dvh w-(--dashboard-sidebar-expanded) flex-col border-r border-primary/15 transition-transform duration-200 lg:static lg:h-screen lg:w-auto",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="dashboard-shell-sidebar-glow pointer-events-none absolute inset-0" aria-hidden />

        <div className="relative flex h-(--dashboard-header-height) items-center justify-between border-b border-primary/15 px-4">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="Go to GrowrixOS homepage"
          >
            {collapsed ? (
              <Image
                src="/website logo main.svg"
                alt="GrowrixOS"
                width={32}
                height={32}
                unoptimized
                className="h-8 w-8 object-contain"
              />
            ) : (
              <Image
                src="/website logo main.svg"
                alt="GrowrixOS"
                width={120}
                height={32}
                unoptimized
                className="h-7 w-auto object-contain"
              />
            )}
          </Link>
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

        <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const active = item.href === currentPath;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-sm border px-3 py-2.5 text-[15px] transition-all whitespace-nowrap",
                  active
                    ? "dashboard-shell-nav-active border-primary/55 text-text"
                    : "border-transparent text-text-muted hover:border-primary/25 hover:bg-primary/8 hover:text-text",
                  collapsed && "justify-center px-2"
                )}
              >
                <span className={cn(
                  "inline-flex h-6 w-6 items-center justify-center shrink-0",
                  active ? "text-primary" : "text-text-muted"
                )}>
                  {item.icon ?? <span className="text-xs font-semibold">{item.label.slice(0, 1)}</span>}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {utilityActions && (
          <div className="relative mt-auto space-y-2 border-t border-primary/15 p-3">
            {utilityActions}
          </div>
        )}
      </aside>

      <div className="dashboard-shell-content relative z-0 flex h-screen min-h-0 flex-col lg:h-screen">
        <div className="dashboard-shell-content-glow pointer-events-none absolute inset-0" aria-hidden />

        <header className="dashboard-shell-header relative z-30 border-b border-primary/15 backdrop-blur-md">
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
            {headerControls ?? <DashboardHeaderControls />}
          </div>
        </header>

        <main className="relative min-h-0 flex-1 overflow-y-auto">
          <div className="h-full w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
