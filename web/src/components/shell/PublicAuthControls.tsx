"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Squares2X2Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { isClerkConfiguredClient } from "@/lib/clerk-client";
import { cn } from "@/lib/utils";

type PublicAuthControlsProps = {
  variant?: "header" | "mobileNav";
  onNavigate?: () => void;
  className?: string;
};

type SessionState = "loading" | "signed-out" | "signed-in";

/**
 * Marketing header auth chrome — link-only, no Clerk widgets.
 * Session state comes from `/api/v1/me` (cookie) so clerk-js never loads on public pages.
 */
export function PublicAuthControls({ variant = "header", onNavigate, className }: PublicAuthControlsProps) {
  const clerkConfigured = isClerkConfiguredClient();
  const [session, setSession] = useState<SessionState>(clerkConfigured ? "loading" : "signed-out");

  useEffect(() => {
    if (!clerkConfigured) {
      return;
    }

    let cancelled = false;
    void fetch("/api/v1/me", { credentials: "same-origin" })
      .then((response) => {
        if (!cancelled) {
          setSession(response.ok ? "signed-in" : "signed-out");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSession("signed-out");
        }
      });

    return () => {
      cancelled = true;
    };
  }, [clerkConfigured]);

  const signInHref = clerkConfigured ? "/sign-in" : "/dashboard/login";
  const signUpHref = clerkConfigured ? "/sign-up" : "/dashboard/login";

  if (variant === "mobileNav") {
    if (session === "signed-in") {
      return (
        <div className={cn("flex flex-col gap-2", className)}>
          <LinkButton href="/dashboard" fullWidth onClick={onNavigate}>
            My dashboard
          </LinkButton>
        </div>
      );
    }

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <LinkButton href={signInHref} fullWidth onClick={onNavigate}>
          Sign in
        </LinkButton>
        {clerkConfigured ? (
          <LinkButton href={signUpHref} fullWidth variant="outline" onClick={onNavigate}>
            Sign up
          </LinkButton>
        ) : null}
      </div>
    );
  }

  if (session === "signed-in") {
    return (
      <div className={cn("flex items-center gap-1 md:gap-2", className)}>
        <Link
          href="/dashboard"
          className="inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-inset touch-manipulation md:hidden"
          aria-label="My dashboard"
          title="My dashboard"
          onClick={onNavigate}
        >
          <Squares2X2Icon className="size-5" aria-hidden />
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-text hover:text-primary"
            onClick={onNavigate}
          >
            Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1 md:gap-2", className)}>
      <Link
        href={signInHref}
        className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-surface shadow-(--shadow-1) transition-[background-color,transform] duration-200 ease-signal hover:-translate-y-px hover:bg-primary-hover active:translate-y-0 active:scale-[0.97] touch-manipulation md:hidden"
        aria-label="Sign in"
        title="Sign in"
        onClick={onNavigate}
      >
        <UserCircleIcon className="size-5" aria-hidden />
      </Link>
      <Link
        href={signInHref}
        className="hidden rounded-full px-3 py-2 text-sm font-semibold text-text transition-colors hover:bg-inset md:inline-flex lg:px-4"
        onClick={onNavigate}
      >
        Sign in
      </Link>
      {clerkConfigured ? (
        <LinkButton href={signUpHref} size="sm" className="ml-1 hidden md:inline-flex" onClick={onNavigate}>
          Sign up
        </LinkButton>
      ) : (
        <LinkButton href={signInHref} size="sm" className={cn("ml-1 hidden md:inline-flex", className)} onClick={onNavigate}>
          Sign in
        </LinkButton>
      )}
    </div>
  );
}
