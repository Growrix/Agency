"use client";

import { useClerk } from "@clerk/nextjs";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Button } from "@/components/primitives/Button";
import { isClerkConfiguredClient } from "@/lib/clerk-client";

type AppSignOutButtonProps = {
  redirectUrl?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "destructive";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "type" | "onClick" | "children">;

async function clearLegacySession() {
  try {
    await fetch("/api/v1/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
  } catch {
    // Best-effort: redirect still proceeds if cookie clearing fails.
  }
}

function LegacyAppSignOutButton({
  redirectUrl = "/",
  children = "Sign out",
  ...buttonProps
}: AppSignOutButtonProps) {
  async function handleSignOut() {
    await clearLegacySession();
    window.location.assign(redirectUrl);
  }

  return (
    <Button type="button" onClick={() => void handleSignOut()} {...buttonProps}>
      {children}
    </Button>
  );
}

function ClerkAppSignOutButton({
  redirectUrl = "/",
  children = "Sign out",
  ...buttonProps
}: AppSignOutButtonProps) {
  const clerk = useClerk();

  async function handleSignOut() {
    await clearLegacySession();
    try {
      await clerk.signOut({ redirectUrl });
    } catch {
      window.location.assign(redirectUrl);
    }
  }

  return (
    <Button type="button" onClick={() => void handleSignOut()} {...buttonProps}>
      {children}
    </Button>
  );
}

export function AppSignOutButton(props: AppSignOutButtonProps) {
  if (!isClerkConfiguredClient()) {
    return <LegacyAppSignOutButton {...props} />;
  }

  return <ClerkAppSignOutButton {...props} />;
}
