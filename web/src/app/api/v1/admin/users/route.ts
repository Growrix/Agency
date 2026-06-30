import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { readDatabase } from "@/server/data/store";
import type { Role, UserRecord } from "@/server/data/schema";

export const dynamic = "force-dynamic";

const ALLOWED_ROLES: Role[] = ["public", "subscriber", "customer", "admin"];

type UserListEntry = {
  id: string;
  email: string;
  role: Role;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  marketing_opt_in: boolean;
  signup_completed_at: string | null;
  signup_intent_source: string | null;
  clerk_user_id: string | null;
  created_at: string;
  updated_at: string;
};

function projectUser(record: UserRecord): UserListEntry {
  return {
    id: record.id,
    email: record.email,
    role: record.role,
    first_name: record.first_name ?? null,
    last_name: record.last_name ?? null,
    phone: record.phone ?? null,
    marketing_opt_in: record.marketing_opt_in ?? false,
    signup_completed_at: record.signup_completed_at ?? null,
    signup_intent_source: record.signup_intent_source ?? null,
    clerk_user_id: record.clerk_user_id ?? null,
    created_at: record.created_at,
    updated_at: record.updated_at,
  };
}

function parsePositiveInt(value: string | null, fallback: number, max: number) {
  if (!value) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return fallback;
  return Math.min(Math.floor(parsed), max);
}

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request);
    const url = new URL(request.url);

    const roleRaw = url.searchParams.get("role");
    const role = roleRaw && ALLOWED_ROLES.includes(roleRaw as Role) ? (roleRaw as Role) : null;
    const query = url.searchParams.get("q")?.trim().toLowerCase() ?? "";
    const completionFilter = url.searchParams.get("completion");
    const limit = parsePositiveInt(url.searchParams.get("limit"), 50, 500);
    const offset = parsePositiveInt(url.searchParams.get("offset"), 0, 10_000);

    const database = await readDatabase();
    const filtered = database.users
      .filter((user) => {
        if (role && user.role !== role) return false;
        if (
          completionFilter === "completed" &&
          !user.signup_completed_at
        ) {
          return false;
        }
        if (completionFilter === "incomplete" && user.signup_completed_at) {
          return false;
        }
        if (query) {
          const haystack = [
            user.email,
            user.first_name ?? "",
            user.last_name ?? "",
            user.clerk_user_id ?? "",
          ]
            .join(" ")
            .toLowerCase();
          if (!haystack.includes(query)) return false;
        }
        return true;
      })
      .sort((a, b) => (a.updated_at > b.updated_at ? -1 : 1));

    const total = filtered.length;
    const items = filtered.slice(offset, offset + limit).map(projectUser);

    return successResponse({ items, total, limit, offset });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to list users."),
    );
  }
}
