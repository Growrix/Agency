import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/server/auth/guards";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isAdminLoginPath(pathname: string) {
  return pathname === "/admin/login" || pathname.startsWith("/admin/login/");
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const pathname = headerList.get("x-growrix-pathname") ?? "";

  // /admin/login must stay public — it lives under /admin/* but must not require admin role.
  if (isAdminLoginPath(pathname)) {
    return children;
  }

  const sentinelRequest = new Request("https://internal/admin", {
    headers: headerList,
  });

  // Force Clerk refresh in the Node server runtime so a stale local mirror
  // (e.g. subscriber from first signup) cannot permanently deny /admin.
  const user = await getAuthenticatedUser(sentinelRequest, { forceClerkRefresh: true });

  if (!user) {
    redirect("/admin/login?next=/admin");
  }

  if (user.role !== "admin") {
    // Surface a reason param so the dashboard can explain why the admin surface was denied.
    redirect("/dashboard?reason=not_admin");
  }

  return children;
}
