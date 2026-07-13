import type { Metadata } from "next";
import { AdminOrdersClient } from "./AdminOrdersClient";

export const metadata: Metadata = {
  title: "Orders · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminOrdersPage() {
  return <AdminOrdersClient />;
}
