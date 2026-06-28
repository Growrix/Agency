import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Customer Login",
  description: "Access your product dashboard, downloads, and order history.",
};

type DashboardLoginRedirectProps = {
  searchParams?: Promise<{ next?: string | string[] }>;
};

export default async function DashboardLoginRedirect({ searchParams }: DashboardLoginRedirectProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const nextPath = Array.isArray(resolved?.next) ? resolved?.next[0] : resolved?.next;
  const safeNextPath = nextPath && nextPath.startsWith("/") ? nextPath : "/dashboard";
  const target = safeNextPath === "/dashboard" ? "/sign-in" : `/sign-in?next=${encodeURIComponent(safeNextPath)}`;

  redirect(target);
}
