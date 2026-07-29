import type { Metadata } from "next";
import { CustomerDashboard } from "./CustomerDashboard";

export const metadata: Metadata = {
  title: "Customer Dashboard",
  description: "Overview of your orders, downloads, and support activity.",
};

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return <CustomerDashboard view="overview" />;
}
