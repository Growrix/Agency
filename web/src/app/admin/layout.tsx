import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/server/auth/guards";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const sentinelRequest = new Request("https://internal/admin", {
    headers: headerList,
  });

  const user = await getAuthenticatedUser(sentinelRequest);

  if (!user) {
    redirect("/admin/login?next=/admin");
  }

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  return children;
}
