import type { Metadata } from "next";
import { AdminDashboard } from "../AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Activity",
  description: "Analytics and audit activity feed for the protected operations workspace.",
};

export default function AdminActivityPage() {
  return <AdminDashboard view="activity" />;
}
