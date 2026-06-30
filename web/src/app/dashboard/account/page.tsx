import type { Metadata } from "next";
import { AccountSurface } from "./AccountSurface";

export const metadata: Metadata = {
  title: "Account · Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function DashboardAccountPage() {
  return <AccountSurface />;
}
