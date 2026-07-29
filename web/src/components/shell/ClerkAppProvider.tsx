"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Component, type ErrorInfo, type ReactNode } from "react";

type ClerkAppProviderProps = {
  children: ReactNode;
};

type ClerkProviderErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type ClerkProviderErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Catches ClerkRuntimeError (e.g. failed_to_load_clerk_js) so the rest of the
 * app still renders when clerk-js cannot load on the current origin/network.
 */
class ClerkProviderErrorBoundary extends Component<
  ClerkProviderErrorBoundaryProps,
  ClerkProviderErrorBoundaryState
> {
  state: ClerkProviderErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ClerkProviderErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[clerk] ClerkProvider failed to initialize", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export function ClerkAppProvider({ children }: ClerkAppProviderProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return children;
  }

  return (
    <ClerkProviderErrorBoundary fallback={children}>
      <ClerkProvider
        publishableKey={publishableKey}
        signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in"}
        signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/sign-up"}
        signInFallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL ?? "/auth/after-sign-in"}
        signUpFallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL ?? "/auth/after-sign-in"}
      >
        {children}
      </ClerkProvider>
    </ClerkProviderErrorBoundary>
  );
}
