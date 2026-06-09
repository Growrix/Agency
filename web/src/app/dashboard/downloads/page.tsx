import type { Metadata } from "next";
import { CustomerDashboard } from "../CustomerDashboard";

export const metadata: Metadata = {
  title: "Dashboard Downloads",
  description: "Authorized downloads for your delivered orders.",
};

export default function DashboardDownloadsPage() {
  return <CustomerDashboard view="downloads" />;
}