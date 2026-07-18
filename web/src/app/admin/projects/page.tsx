import type { Metadata } from "next";
import { AdminProjectsClient } from "./AdminProjectsClient";

export const metadata: Metadata = {
  title: "Client Projects · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminProjectsPage() {
  return <AdminProjectsClient />;
}
