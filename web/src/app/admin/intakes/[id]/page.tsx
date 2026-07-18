import type { Metadata } from "next";
import { AdminIntakeDetailClient } from "./AdminIntakeDetailClient";

export const metadata: Metadata = {
  title: "Intake Detail · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminIntakeDetailPage() {
  return <AdminIntakeDetailClient />;
}
