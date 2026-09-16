import type { ReactNode } from "react";
import { ClerkRouteLayout } from "@/components/shell/ClerkRouteLayout";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <ClerkRouteLayout>{children}</ClerkRouteLayout>;
}
