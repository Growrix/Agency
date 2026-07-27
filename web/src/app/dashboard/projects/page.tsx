import type { Metadata } from "next";
import { CustomerDashboard } from "../CustomerDashboard";

export const metadata: Metadata = {
  title: "Dashboard Projects",
  description: "Track your project workspaces and pending intake requests.",
};

export const dynamic = "force-dynamic";

export default function DashboardProjectsPage() {
  return <CustomerDashboard view="projects" />;
}
