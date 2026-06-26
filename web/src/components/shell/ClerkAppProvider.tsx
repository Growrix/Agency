"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { isClerkConfiguredClient } from "@/lib/clerk-client";

const ClerkProviderBoundary = dynamic(
  () =>
    import("@/components/shell/ClerkProviderBoundary").then((mod) => mod.ClerkProviderBoundary),
  { ssr: false },
);

type ClerkAppProviderProps = {
  children: ReactNode;
};

export function ClerkAppProvider({ children }: ClerkAppProviderProps) {
  if (!isClerkConfiguredClient()) {
    return children;
  }

  return <ClerkProviderBoundary>{children}</ClerkProviderBoundary>;
}
