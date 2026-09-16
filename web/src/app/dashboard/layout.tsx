import type { Metadata } from "next";
import { DashboardChrome } from "@/components/dashboard/DashboardChrome";
import { ClerkRouteLayout } from "@/components/shell/ClerkRouteLayout";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkRouteLayout>
      <DashboardChrome>{children}</DashboardChrome>
    </ClerkRouteLayout>
  );
}
