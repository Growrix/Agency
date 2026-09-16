import type { ReactNode } from "react";
import { ClerkRouteLayout } from "@/components/shell/ClerkRouteLayout";

export default function SignInLayout({ children }: { children: ReactNode }) {
  return <ClerkRouteLayout>{children}</ClerkRouteLayout>;
}
