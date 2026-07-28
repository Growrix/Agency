"use client";

import { ClerkFailed, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Button, LinkButton } from "@/components/primitives/Button";

const CLERK_LOAD_TIMEOUT_MS = 8000;

type ClerkLoadGuardProps = {
  children: ReactNode;
  /** Shown while clerk-js is loading (before timeout). */
  loadingFallback?: ReactNode;
  /** Primary recovery link when clerk-js fails or times out. */
  recoveryHref: string;
  recoveryLabel: string;
  title?: string;
  description?: string;
};

function ClerkLoadFailurePanel({
  recoveryHref,
  recoveryLabel,
  title = "Sign-in is taking longer than expected",
  description = "We could not load the authentication service. This usually means the production domain is not allowlisted in Clerk, or the Clerk script is blocked on this network.",
}: {
  recoveryHref: string;
  recoveryLabel: string;
  title?: string;
  description?: string;
}) {
  return (
    <div className="space-y-4 rounded-md border border-warning/35 bg-warning/10 p-4" role="alert">
      <p className="text-xs uppercase tracking-[0.18em] text-warning">Authentication unavailable</p>
      <p className="font-medium text-text">{title}</p>
      <p className="text-sm leading-6 text-text-muted">{description}</p>
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" onClick={() => window.location.reload()}>
          Retry
        </Button>
        <LinkButton href={recoveryHref} variant="outline" size="sm">
          {recoveryLabel}
        </LinkButton>
      </div>
    </div>
  );
}

/**
 * Renders Clerk UI when clerk-js loads; shows a recovery panel on ClerkFailed
 * or if initialization exceeds CLERK_LOAD_TIMEOUT_MS (covers script timeouts
 * that may not immediately throw into React).
 */
export function ClerkLoadGuard({
  children,
  loadingFallback,
  recoveryHref,
  recoveryLabel,
  title,
  description,
}: ClerkLoadGuardProps) {
  const [timedOut, setTimedOut] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const loadedRef = useRef(false);

  const markLoaded = useCallback(() => {
    if (loadedRef.current) {
      return;
    }
    loadedRef.current = true;
    queueMicrotask(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) {
      return;
    }
    const timer = window.setTimeout(() => {
      if (!loadedRef.current) {
        setTimedOut(true);
      }
    }, CLERK_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [loaded]);

  if (timedOut && !loaded) {
    return (
      <ClerkLoadFailurePanel
        recoveryHref={recoveryHref}
        recoveryLabel={recoveryLabel}
        title={title}
        description={description}
      />
    );
  }

  return (
    <>
      <ClerkLoading>{loadingFallback ?? <p className="text-sm text-text-muted">Loading sign-in…</p>}</ClerkLoading>
      <ClerkFailed>
        <ClerkLoadFailurePanel
          recoveryHref={recoveryHref}
          recoveryLabel={recoveryLabel}
          title={title}
          description={description}
        />
      </ClerkFailed>
      <ClerkLoaded>
        <ClerkLoadedMarker onLoaded={markLoaded} />
        {children}
      </ClerkLoaded>
    </>
  );
}

function ClerkLoadedMarker({ onLoaded }: { onLoaded: () => void }) {
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);
  return null;
}
