import "server-only";

import type { AuthenticatedUser } from "@/server/auth/guards";
import { readDatabase } from "@/server/data/store";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

/**
 * Single-read customer dashboard snapshot. Avoids N separate /api/v1/me/*
 * handlers each re-reading the same Supabase app_state payload.
 */
export async function getCustomerDashboardSnapshot(user: AuthenticatedUser) {
  const database = await readDatabase();
  const email = normalizeEmail(user.email);
  const isAdmin = user.role === "admin";

  const orders = isAdmin
    ? [...database.orders]
    : database.orders.filter(
        (order) => order.user_id === user.id || order.customer_email === email,
      );

  const appointments = isAdmin
    ? [...database.appointments]
    : database.appointments.filter((appointment) => appointment.visitor_email === email);

  const downloads = database.downloads.filter((entry) => entry.user_email === email);
  const licenses = database.licenses.filter((entry) => entry.user_email === email);
  const projects = database.projects
    .filter((item) => item.client_user_id === user.id)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
  const intakes = database.client_intake_submissions
    .filter((item) => item.user_id === user.id)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      first_name: user.firstName ?? null,
      last_name: user.lastName ?? null,
      phone: user.phone ?? null,
      marketing_opt_in: user.marketingOptIn ?? false,
    },
    orders,
    appointments,
    downloads,
    licenses,
    projects,
    intakes,
  };
}
