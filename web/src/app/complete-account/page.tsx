import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { CompleteAccountForm } from "@/app/complete-account/CompleteAccountForm";
import { ClerkAuthShell } from "@/components/auth/ClerkAuthShell";
import { getAuthenticatedUser } from "@/server/auth/guards";

export const dynamic = "force-dynamic";

export default async function CompleteAccountPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const headerList = await headers();
  const sentinelRequest = new Request("https://internal/complete-account", {
    headers: headerList,
  });

  const user = await getAuthenticatedUser(sentinelRequest);
  if (!user) {
    redirect("/sign-in?next=/complete-account");
  }

  if (user.signupCompletedAt) {
    const { next } = await searchParams;
    redirect(next && next.startsWith("/") ? next : "/dashboard");
  }

  const { next } = await searchParams;
  const redirectTo = next && next.startsWith("/") ? next : "/dashboard";

  return (
    <ClerkAuthShell
      title="Welcome to Growrix"
      description="One last step before your dashboard opens — accept the terms, add an optional contact number, and tell us how to keep in touch."
    >
      <CompleteAccountForm
        email={user.email}
        firstName={user.firstName ?? null}
        lastName={user.lastName ?? null}
        defaultPhone={user.phone ?? ""}
        defaultMarketingOptIn={user.marketingOptIn ?? false}
        redirectTo={redirectTo}
      />
    </ClerkAuthShell>
  );
}
