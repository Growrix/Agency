"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Button, LinkButton } from "@/components/primitives/Button";
import { DashboardHeaderControls } from "@/components/dashboard/DashboardHeaderControls";
import { DashboardShell, type DashboardNavItem } from "@/components/dashboard/DashboardShell";

type Viewer = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
};

const navItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/products", label: "Products" },
  { href: "/dashboard/downloads", label: "Downloads" },
  { href: "/dashboard/orders", label: "Orders" },
  { href: "/dashboard/appointments", label: "Appointments" },
  { href: "/dashboard/submissions", label: "Submissions" },
  { href: "/dashboard/support", label: "Support" },
];

const sectionMeta: Array<{ match: (path: string) => boolean; title: string }> = [
  { match: (p) => p === "/dashboard", title: "Customer overview" },
  { match: (p) => p.startsWith("/dashboard/products"), title: "Purchased products" },
  { match: (p) => p.startsWith("/dashboard/downloads"), title: "Downloads" },
  { match: (p) => p.startsWith("/dashboard/orders"), title: "Order history" },
  { match: (p) => p.startsWith("/dashboard/appointments"), title: "Appointments" },
  { match: (p) => p.startsWith("/dashboard/submissions"), title: "Submissions" },
  { match: (p) => p.startsWith("/dashboard/support"), title: "Support" },
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

async function handleLogout() {
  try {
    await fetch("/api/v1/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
  } finally {
    window.location.assign("/dashboard/login");
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
          notifications={[]}
        />
      }
      utilityActions={
        <div className="space-y-2">
          <LinkButton href="/digital-products" variant="outline" size="sm" fullWidth>
            Browse digital products
          </LinkButton>
          <Button type="button" variant="ghost" size="sm" fullWidth onClick={() => void handleLogout()}>
            Sign out
          </Button>
        </div>
      }
    >
      {children}
    </DashboardShell>
  );
}
