import type { Metadata } from "next";
import { CustomerDashboard } from "./CustomerDashboard";

export const metadata: Metadata = {
  title: "Customer Dashboard",
  description: "Overview of your orders, downloads, and support activity.",
};

type DashboardPageProps = {
  searchParams?: Promise<{ reason?: string | string[] }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const reasonRaw = Array.isArray(resolved?.reason) ? resolved?.reason[0] : resolved?.reason;
  const showNotAdminNotice = reasonRaw === "not_admin";

  return (
    <>
      {showNotAdminNotice ? (
        <div
          role="status"
          className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-100"
        >
          You do not have admin access. Your account signed in successfully, but the admin role is
          required for the operational dashboard.
        </div>
      ) : null}
      <CustomerDashboard view="overview" />
    </>
  );
}