"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  HeartIcon,
  LifebuoyIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { DashboardHeaderControls } from "@/components/dashboard/DashboardHeaderControls";
import { DashboardShell, type DashboardNavItem } from "@/components/dashboard/DashboardShell";
import { DashboardSignOutButton } from "@/components/dashboard/DashboardSignOutButton";

type Viewer = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
};

const navItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "Overview", icon: <Squares2X2Icon className="size-5" /> },
  { href: "/dashboard/products", label: "Products", icon: <CubeIcon className="size-5" /> },
  { href: "/dashboard/downloads", label: "Downloads", icon: <ArrowTopRightOnSquareIcon className="size-5" /> },
  { href: "/dashboard/orders", label: "Orders", icon: <ShoppingBagIcon className="size-5" /> },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: <HeartIcon className="size-5" /> },
  { href: "/dashboard/appointments", label: "Appointments", icon: <CalendarDaysIcon className="size-5" /> },
  { href: "/dashboard/submissions", label: "Submissions", icon: <ClipboardDocumentListIcon className="size-5" /> },
  { href: "/dashboard/support", label: "Support", icon: <LifebuoyIcon className="size-5" /> },
  { href: "/dashboard/account", label: "Account", icon: <UserCircleIcon className="size-5" /> },
];

const sectionMeta: Array<{ match: (path: string) => boolean; title: string }> = [
  { match: (p) => p === "/dashboard", title: "Overview" },
  { match: (p) => p.startsWith("/dashboard/products"), title: "Purchased products" },
  { match: (p) => p.startsWith("/dashboard/downloads"), title: "Downloads" },
  { match: (p) => p.startsWith("/dashboard/orders"), title: "Order history" },
  { match: (p) => p.startsWith("/dashboard/wishlist"), title: "Wishlist" },
  { match: (p) => p.startsWith("/dashboard/appointments"), title: "Appointments" },
  { match: (p) => p.startsWith("/dashboard/submissions"), title: "Submissions" },
  { match: (p) => p.startsWith("/dashboard/support"), title: "Support" },
  { match: (p) => p.startsWith("/dashboard/account"), title: "Account" },
];

function resolveTitle(pathname: string) {
  return sectionMeta.find((entry) => entry.match(pathname))?.title ?? "Dashboard";
}

function buildFullName(user: Viewer | null) {
  if (!user) {
    return "Customer";
  }
  const composed = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
  return composed || user.email;
}

async function fetchViewer(): Promise<Viewer | null> {
  try {
    const response = await fetch("/api/v1/me", { credentials: "same-origin" });
    if (!response.ok) {
      return null;
    }
    const payload = (await response.json().catch(() => null)) as { data?: { user?: Viewer } } | null;
    return payload?.data?.user ?? null;
  } catch {
    return null;
  }
}

export function DashboardChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/dashboard";
  const [viewer, setViewer] = useState<Viewer | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetchViewer().then((value) => {
      if (!cancelled) {
        setViewer(value);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const fullName = useMemo(() => buildFullName(viewer), [viewer]);
  const title = useMemo(() => resolveTitle(pathname), [pathname]);

  if (pathname === "/dashboard/login") {
    return <>{children}</>;
  }

  return (
    <DashboardShell
      title={title}
      currentPath={pathname}
      navItems={navItems}
      headerControls={
        <DashboardHeaderControls
          profileName={fullName}
          profileEmail={viewer?.email ?? "customer@growrixos.com"}
          showSearch
        />
      }
      utilityActions={
        <div className="space-y-3">
          <div className="rounded-md border border-primary/35 bg-linear-to-br from-primary/20 via-primary/10 to-transparent p-4">
            <p className="text-base font-semibold text-text">Browse digital products</p>
            <p className="mt-2 text-sm text-text-muted">Premium templates, tools, and systems to grow your business.</p>
            <LinkButton href="/digital-products" variant="outline" size="sm" fullWidth className="mt-4 justify-between">
              Explore products
              <ArrowRightIcon className="size-4" />
            </LinkButton>
          </div>
          <LinkButton href="/" variant="outline" size="sm" fullWidth className="justify-between">
            Visit website
            <ArrowRightIcon className="size-4" />
          </LinkButton>
          <DashboardSignOutButton />
        </div>
      }
    >
      {children}
    </DashboardShell>
  );
}
