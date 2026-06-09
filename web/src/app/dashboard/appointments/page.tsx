import type { Metadata } from "next";
import { CustomerDashboard } from "../CustomerDashboard";

export const metadata: Metadata = {
  title: "Dashboard Appointments",
  description: "Booked and requested appointments tied to your account.",
};

export default function DashboardAppointmentsPage() {
  return <CustomerDashboard view="appointments" />;
}