"use client";

import { useEffect } from "react";
import { useAuth, SignInButton, SignUpButton } from "@clerk/nextjs";
import { FreeDemoModal } from "@/components/marketing/FreeDemoModal";
import { FREE_DEMO_SEEN_KEY, useFreeDemoStore } from "@/lib/free-demo-store";
import { isClerkConfiguredClient } from "@/lib/clerk-client";
import { Button, LinkButton } from "@/components/primitives/Button";

const AUTO_OPEN_MS = 8000;

export function FreeDemoPopup() {
  const isOpen = useFreeDemoStore((state) => state.isOpen);
  const showForm = useFreeDemoStore((state) => state.showForm);
  const open = useFreeDemoStore((state) => state.open);
  const close = useFreeDemoStore((state) => state.close);
  const openForm = useFreeDemoStore((state) => state.openForm);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.localStorage.getItem(FREE_DEMO_SEEN_KEY) === "1") {
      return;
    }
    if (isSignedIn) {
      return;
    }

    const timer = window.setTimeout(() => {
      window.localStorage.setItem(FREE_DEMO_SEEN_KEY, "1");
      open({ showForm: false });
    }, AUTO_OPEN_MS);

    return () => window.clearTimeout(timer);
  }, [isSignedIn, open]);

  function handleClose() {
    close();
  }

  function handleOpenForm() {
    if (!isClerkConfiguredClient()) {
      openForm();
      return;
    }
    if (!isSignedIn) {
      openForm();
      return;
    }
    openForm();
  }

  return (
    <>
      <FreeDemoModal
        open={isOpen}
        showForm={showForm}
        onClose={handleClose}
        onOpenForm={handleOpenForm}
      />
      {!isClerkConfiguredClient() ? null : showForm && isOpen && !isSignedIn ? (
        <div className="sr-only" aria-live="polite">
          Sign in required to submit the intake form.
        </div>
      ) : null}
    </>
  );
}

export function FreeDemoHeaderButton() {
  const openForm = useFreeDemoStore((state) => state.openForm);
  const { isSignedIn } = useAuth();

  if (!isClerkConfiguredClient()) {
    return (
      <LinkButton href="/contact" size="sm" variant="outline" className="hidden lg:inline-flex">
        Free demo
      </LinkButton>
    );
  }

  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className="hidden lg:inline-flex"
      onClick={() => openForm()}
    >
      {isSignedIn ? "Free demo" : "Claim free demo"}
    </Button>
  );
}

export function FreeDemoAuthGate() {
  if (!isClerkConfiguredClient()) {
    return (
      <div className="space-y-3 rounded-md border border-border bg-inset/20 p-4">
        <p className="text-sm text-text">Sign in to claim your free demo and submit your project brief.</p>
        <LinkButton href="/dashboard/login" fullWidth>
          Sign in to continue
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-md border border-border bg-inset/20 p-4">
      <p className="text-sm text-text">Create a free account or sign in to claim your demo spot and submit your brief.</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <SignInButton mode="modal">
          <Button fullWidth>Sign in</Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button fullWidth variant="outline">
            Sign up free
          </Button>
        </SignUpButton>
      </div>
    </div>
  );
}
