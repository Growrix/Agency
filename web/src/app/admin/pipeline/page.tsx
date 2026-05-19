import type { Metadata } from "next";
import { AdminDashboard } from "../AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Pipeline",
  description: "Operational pipeline view for recent inquiries, appointments, and orders.",
};

export default function AdminPipelinePage() {
  return <AdminDashboard view="pipeline" />;
}
