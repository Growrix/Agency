import type { Metadata } from "next";
import { DashboardChrome } from "@/components/dashboard/DashboardChrome";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardChrome>{children}</DashboardChrome>;
}
