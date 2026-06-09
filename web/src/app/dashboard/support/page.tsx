import type { Metadata } from "next";
import { CustomerDashboard } from "../CustomerDashboard";

export const metadata: Metadata = {
  title: "Dashboard Support",
  description: "Support and delivery requests from the customer dashboard.",
};

export default function DashboardSupportPage() {
  return <CustomerDashboard view="support" />;
}