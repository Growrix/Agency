import type { Metadata } from "next";
import { CustomerDashboard } from "../CustomerDashboard";

export const metadata: Metadata = {
  title: "Dashboard Orders",
  description: "Order history and fulfillment progress.",
};

export default function DashboardOrdersPage() {
  return <CustomerDashboard view="orders" />;
}