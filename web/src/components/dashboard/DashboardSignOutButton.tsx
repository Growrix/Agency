"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "@/components/primitives/Button";
import { isClerkConfiguredClient } from "@/lib/clerk-client";

async function clearLegacySession() {
  try {
    await fetch("/api/v1/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
  } catch {
    // Best-effort: even if the cookie clear failed the redirect still happens.
  }
}

function LegacySignOutButton() {
  async function handleLegacy() {
    await clearLegacySession();
    window.location.assign("/");
  }
  return (
    <Button type="button" variant="ghost" size="sm" fullWidth onClick={() => void handleLegacy()}>
      Sign out
    </Button>
  );
}

function ClerkSignOutButton() {
  const clerk = useClerk();
  async function handle() {
    // Run both flows so users with a legacy cookie AND a Clerk session are cleared.
    await clearLegacySession();
    try {
      await clerk.signOut({ redirectUrl: "/" });
    } catch {
      window.location.assign("/");
    }
  }
  return (
    <Button type="button" variant="ghost" size="sm" fullWidth onClick={() => void handle()}>
      Sign out
    </Button>
  );
}

export function DashboardSignOutButton() {
  if (!isClerkConfiguredClient()) {
    return <LegacySignOutButton />;
  }
  return <ClerkSignOutButton />;
}
