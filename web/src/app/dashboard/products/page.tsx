import type { Metadata } from "next";
import { CustomerDashboard } from "../CustomerDashboard";

export const metadata: Metadata = {
  title: "Dashboard Products",
  description: "Purchased products and licenses inside your customer dashboard.",
};

export default function DashboardProductsPage() {
  return <CustomerDashboard view="products" />;
}