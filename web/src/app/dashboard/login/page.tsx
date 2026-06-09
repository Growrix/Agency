import type { Metadata } from "next";
import { CustomerAuthPanel } from "./CustomerAuthPanel";

export const metadata: Metadata = {
  title: "Customer Login",
  description: "Access your product dashboard, downloads, and order history.",
};

type DashboardLoginPageProps = {
  searchParams?: Promise<{ next?: string | string[] }>;
};

export default async function DashboardLoginPage({ searchParams }: DashboardLoginPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const nextPath = Array.isArray(resolved?.next) ? resolved?.next[0] : resolved?.next;
  const safeNextPath = nextPath && nextPath.startsWith("/") ? nextPath : "/dashboard";

  return <CustomerAuthPanel nextPath={safeNextPath} />;
}