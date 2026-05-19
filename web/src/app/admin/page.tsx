import type { Metadata } from "next";
import { AdminDashboard } from "./AdminDashboard";

export const metadata: Metadata = {
  title: "Admin",
  description: "Protected operational dashboard for inquiries, bookings, orders, and analytics.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
