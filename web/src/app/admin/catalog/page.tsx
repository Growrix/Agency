import type { Metadata } from "next";
import { AdminDashboard } from "../AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Catalog",
  description: "Catalog management workspace for services, products, and portfolio records.",
};

export default function AdminCatalogPage() {
  return <AdminDashboard view="catalog" />;
}
