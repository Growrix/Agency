import type { Metadata } from "next";
import { AdminIntakesClient } from "./AdminIntakesClient";

export const metadata: Metadata = {
  title: "Client Intakes · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminIntakesPage() {
  return <AdminIntakesClient />;
}
