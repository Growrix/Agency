import type { ReactNode } from "react";
import { ClerkAppProvider } from "@/components/shell/ClerkAppProvider";

/**
 * Wraps only auth/commerce/app surfaces that need clerk-js widgets.
 * Marketing pages must stay outside this tree so Clerk does not load on public HTML.
 */
export function ClerkRouteLayout({ children }: { children: ReactNode }) {
  return <ClerkAppProvider>{children}</ClerkAppProvider>;
}
