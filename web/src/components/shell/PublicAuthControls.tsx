"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Squares2X2Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Button, LinkButton } from "@/components/primitives/Button";
import { isClerkConfiguredClient } from "@/lib/clerk-client";
import { cn } from "@/lib/utils";

type PublicAuthControlsProps = {
  variant?: "header" | "mobileNav";
  onNavigate?: () => void;
  className?: string;
};

function LegacySignInLink({ variant, onNavigate, className }: PublicAuthControlsProps) {
  if (variant === "mobileNav") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <LinkButton href="/dashboard/login" fullWidth onClick={onNavigate}>
          Sign in
        </LinkButton>
      </div>
    );
  }

  return (
    <LinkButton href="/dashboard/login" size="sm" className={cn("ml-1 hidden lg:inline-flex", className)} onClick={onNavigate}>
      Sign in
    </LinkButton>
  );
}

export function PublicAuthControls({ variant = "header", onNavigate, className }: PublicAuthControlsProps) {
  if (!isClerkConfiguredClient()) {
    return <LegacySignInLink variant={variant} onNavigate={onNavigate} className={className} />;
  }

  if (variant === "mobileNav") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <SignedOut>
          <SignInButton mode="modal">
            <Button fullWidth onClick={onNavigate}>
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button fullWidth variant="outline" onClick={onNavigate}>
              Sign up
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-3">
            <UserButton afterSignOutUrl="/" />
            <Link href="/dashboard" onClick={onNavigate} className="text-sm font-medium text-text hover:text-primary">
              My dashboard
            </Link>
          </div>
        </SignedIn>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-1 lg:gap-2", className)}>
      <SignedOut>
        <SignInButton mode="modal">
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full bg-primary text-surface shadow-(--shadow-1) transition-[background-color,transform] duration-200 ease-signal hover:-translate-y-px hover:bg-primary-hover active:translate-y-0 active:scale-[0.97] touch-manipulation sm:hidden"
            aria-label="Sign in"
            title="Sign in"
            onClick={onNavigate}
          >
            <UserCircleIcon className="size-5" aria-hidden />
          </button>
        </SignInButton>
        <SignInButton mode="modal">
          <button
            type="button"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-text transition-colors hover:bg-inset lg:inline-flex"
            onClick={onNavigate}
          >
            Sign in
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button size="sm" className="ml-1 hidden lg:inline-flex" onClick={onNavigate}>
            Sign up
          </Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <Link
          href="/dashboard"
          className="inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-inset touch-manipulation sm:hidden"
          aria-label="My dashboard"
          title="My dashboard"
          onClick={onNavigate}
        >
          <Squares2X2Icon className="size-5" aria-hidden />
        </Link>
        <div className="hidden items-center gap-2 lg:flex">
          <UserButton afterSignOutUrl="/" />
          <Link href="/dashboard" onClick={onNavigate} className="text-sm font-medium text-text hover:text-primary">
            Dashboard
          </Link>
        </div>
      </SignedIn>
    </div>
  );
}
