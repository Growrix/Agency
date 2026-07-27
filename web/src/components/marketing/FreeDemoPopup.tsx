"use client";

import { useEffect } from "react";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { FreeDemoModal } from "@/components/marketing/FreeDemoModal";
import {
  FREE_DEMO_SEEN_KEY,
  clearPendingIntake,
  hasPendingIntake,
  hasSeenFreeDemo,
  markFreeDemoSeen,
  useFreeDemoStore,
} from "@/lib/free-demo-store";
import { isClerkConfiguredClient } from "@/lib/clerk-client";
import { Button, LinkButton } from "@/components/primitives/Button";

const AUTO_OPEN_MS = 5000;

export function FreeDemoPopup() {
  const isOpen = useFreeDemoStore((state) => state.isOpen);
  const showForm = useFreeDemoStore((state) => state.showForm);
  const open = useFreeDemoStore((state) => state.open);
  const close = useFreeDemoStore((state) => state.close);
  const openForm = useFreeDemoStore((state) => state.openForm);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // After Clerk redirect, reopen the form so restored draft can auto-submit.
    if (hasPendingIntake()) {
      open({ showForm: true });
      return;
    }

    if (hasSeenFreeDemo()) {
      return;
    }

    const timer = window.setTimeout(() => {
      // Do not mark seen here — only mark when the visitor dismisses the modal
      // so a reload before dismiss still shows the offer.
      open({ showForm: false });
    }, AUTO_OPEN_MS);

    return () => window.clearTimeout(timer);
  }, [open]);

  function handleClose() {
    clearPendingIntake();
    markFreeDemoSeen();
    close();
  }

  function handleOpenForm() {
    openForm();
  }

  return (
    <FreeDemoModal
      open={isOpen}
      showForm={showForm}
      onClose={handleClose}
      onOpenForm={handleOpenForm}
    />
  );
}

export function FreeDemoHeaderButton() {
  const openOffer = useFreeDemoStore((state) => state.openOffer);

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
      onClick={() => {
        // Clear prior dismiss so header CTA always opens the offer panel.
        if (typeof window !== "undefined") {
          window.localStorage.removeItem(FREE_DEMO_SEEN_KEY);
        }
        openOffer();
      }}
    >
      Claim free demo
    </Button>
  );
}

export function FreeDemoAuthGate({
  title = "Almost done — sign in to submit",
  description = "Create a free account or sign in. Your brief stays filled in and submits automatically after you authenticate.",
  stayOnPage = true,
}: {
  title?: string;
  description?: string;
  /** Keep the visitor on the current page so the filled form can auto-submit. */
  stayOnPage?: boolean;
}) {
  const returnUrl = stayOnPage && typeof window !== "undefined" ? window.location.href : undefined;

  if (!isClerkConfiguredClient()) {
    return (
      <div className="space-y-3 rounded-md border border-border bg-inset/20 p-4">
        <p className="text-sm font-medium text-text">{title}</p>
        <p className="text-sm text-text-muted">{description}</p>
        <LinkButton href="/dashboard/login" fullWidth>
          Sign in to continue
        </LinkButton>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-md border border-primary/30 bg-primary/10 p-4">
      <p className="text-sm font-medium text-text">{title}</p>
      <p className="text-sm text-text-muted">{description}</p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <SignInButton mode="modal" forceRedirectUrl={returnUrl} fallbackRedirectUrl={returnUrl}>
          <Button fullWidth>Sign in</Button>
        </SignInButton>
        <SignUpButton mode="modal" forceRedirectUrl={returnUrl} fallbackRedirectUrl={returnUrl}>
          <Button fullWidth variant="outline">
            Sign up free
          </Button>
        </SignUpButton>
      </div>
    </div>
  );
}
