"use client";

import { AppSignOutButton } from "@/components/auth/AppSignOutButton";

export function DashboardSignOutButton() {
  return (
    <AppSignOutButton variant="ghost" size="sm" fullWidth redirectUrl="/">
      Sign out
    </AppSignOutButton>
  );
}
