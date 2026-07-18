import type { Metadata } from "next";
import { AdminProjectDetailClient } from "./AdminProjectDetailClient";

export const metadata: Metadata = {
  title: "Project Workspace · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminProjectDetailPage() {
  return <AdminProjectDetailClient />;
}
