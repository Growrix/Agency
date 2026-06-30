import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { getUserById } from "@/server/auth/users";
import { writeDatabase } from "@/server/data/store";
import { recordAuditLog } from "@/server/logging/observability";
import type { Role, UserRecord } from "@/server/data/schema";

export const dynamic = "force-dynamic";

const MUTABLE_ROLES: Role[] = ["subscriber", "customer", "admin"];

type RouteContext = {
  params: Promise<{ userId: string }>;
};

function projectUser(record: UserRecord) {
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

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    await requireAdminUser(_request);
    const { userId } = await context.params;
    const user = await getUserById(userId);
    if (!user) {
      throw new ApiError("NOT_FOUND", 404, "User not found.");
    }
    return successResponse(projectUser(user));
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load user."),
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const actor = await requireAdminUser(request);
    const { userId } = await context.params;
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    const targetExists = await getUserById(userId);
    if (!targetExists) {
      throw new ApiError("NOT_FOUND", 404, "User not found.");
    }

    let nextRole: Role | undefined;
    if (typeof body.role === "string") {
      if (!MUTABLE_ROLES.includes(body.role as Role)) {
        throw new ApiError("FIELD_VALIDATION_FAILED", 400, "role must be subscriber, customer, or admin.");
      }
      nextRole = body.role as Role;
    }

    const revokeCompletion = body.signup_completed_at === null;
    const previousRole = targetExists.role;
    const previousCompleted = targetExists.signup_completed_at ?? null;

    if (nextRole === undefined && !revokeCompletion) {
      throw new ApiError(
        "FIELD_VALIDATION_FAILED",
        400,
        "Provide role and/or signup_completed_at: null.",
      );
    }

    let updated: UserRecord | null = null;
    await writeDatabase((next) => ({
      ...next,
      users: next.users.map((user) => {
        if (user.id !== userId) return user;
        updated = {
          ...user,
          role: nextRole ?? user.role,
          signup_completed_at: revokeCompletion ? undefined : user.signup_completed_at,
          updated_at: new Date().toISOString(),
        };
        return updated;
      }),
    }));

    if (!updated) {
      throw new ApiError("NOT_FOUND", 404, "User not found.");
    }

    if (nextRole && nextRole !== previousRole) {
      await recordAuditLog({
        level: "warning",
        action: "admin.user_role_changed",
        actor_email: actor.email,
        metadata: {
          target_user_id: userId,
          target_email: targetExists.email,
          previous_role: previousRole,
          next_role: nextRole,
        },
      });
    }

    if (revokeCompletion && previousCompleted) {
      await recordAuditLog({
        level: "warning",
        action: "admin.user_signup_revoked",
        actor_email: actor.email,
        metadata: {
          target_user_id: userId,
          target_email: targetExists.email,
          previous_signup_completed_at: previousCompleted,
        },
      });
    }

    return successResponse(projectUser(updated));
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to update user."),
    );
  }
}
