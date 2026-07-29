"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ChartBarSquareIcon,
  ChartPieIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  EnvelopeOpenIcon,
  InboxIcon,
  QueueListIcon,
  ShoppingBagIcon,
  Squares2X2Icon,
  StarIcon,
  TicketIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { AppSignOutButton } from "@/components/auth/AppSignOutButton";
import { DashboardHeaderControls } from "@/components/dashboard/DashboardHeaderControls";
import { DashboardShell, type DashboardNavItem } from "@/components/dashboard/DashboardShell";
import { LinkButton } from "@/components/primitives/Button";
import {
  ADMIN_NAV_ITEMS,
  type AdminNavIconKey,
  resolveAdminHeaderTitle,
} from "@/lib/admin-nav";

type Viewer = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
};

const ICON_MAP: Record<AdminNavIconKey, React.ReactNode> = {
  overview: <Squares2X2Icon className="h-4 w-4" />,
  activity: <ChartBarSquareIcon className="h-4 w-4" />,
  catalog: <ClipboardDocumentListIcon className="h-4 w-4" />,
  pipeline: <QueueListIcon className="h-4 w-4" />,
  orders: <ShoppingBagIcon className="h-4 w-4" />,
  submissions: <InboxIcon className="h-4 w-4" />,
  intakes: <ClipboardDocumentListIcon className="h-4 w-4" />,
  projects: <QueueListIcon className="h-4 w-4" />,
  users: <UsersIcon className="h-4 w-4" />,
  coupons: <TicketIcon className="h-4 w-4" />,
  reviews: <StarIcon className="h-4 w-4" />,
  reports: <ChartPieIcon className="h-4 w-4" />,
  emailTemplates: <Cog6ToothIcon className="h-4 w-4" />,
  emailLog: <EnvelopeOpenIcon className="h-4 w-4" />,
};

const ADMIN_NAV: DashboardNavItem[] = ADMIN_NAV_ITEMS.map((item) => ({
  href: item.href,
  label: item.label,
  icon: ICON_MAP[item.icon],
}));

function buildFullName(user: Viewer | null) {
  if (!user) {
    return "Admin";
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

export function AdminDashboardChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/admin";
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
  const title = useMemo(() => resolveAdminHeaderTitle(pathname), [pathname]);

  return (
    <DashboardShell
      title={title}
      currentPath={pathname}
      navItems={ADMIN_NAV}
      headerControls={
        <DashboardHeaderControls
          profileName={fullName}
          profileEmail={viewer?.email ?? "admin@growrixos.com"}
        />
      }
      utilityActions={
        <div className="space-y-2">
          <LinkButton href="/" variant="outline" size="sm" fullWidth>
            Back to main site
          </LinkButton>
          <AppSignOutButton variant="ghost" size="sm" fullWidth redirectUrl="/admin/login">
            Log out
          </AppSignOutButton>
        </div>
      }
    >
      {children}
    </DashboardShell>
  );
}
