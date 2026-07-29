import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/server/auth/guards";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Role-aware post-login landing. Same Clerk session for everyone;
 * dashboards are separated by role, not by a second auth provider.
 */
export default async function AfterSignInPage() {
  const headerList = await headers();
  const sentinelRequest = new Request("https://internal/auth/after-sign-in", {
    headers: headerList,
  });

  const user = await getAuthenticatedUser(sentinelRequest, { forceClerkRefresh: true });

  if (!user) {
    redirect("/sign-in?next=/auth/after-sign-in");
  }

  if (user.role === "admin") {
    redirect("/admin");
  }

  redirect("/dashboard");
}
