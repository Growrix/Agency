import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAuthenticatedUser } from "@/server/auth/guards";
import { updateUserProfile } from "@/server/auth/users";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const body = (await request.json()) as Record<string, unknown>;
    const updated = await updateUserProfile(user.id, {
      phone: typeof body.phone === "string" ? body.phone : undefined,
      marketingOptIn:
        typeof body.marketing_opt_in === "boolean"
          ? body.marketing_opt_in
          : typeof body.marketingOptIn === "boolean"
            ? body.marketingOptIn
            : undefined,
    });

    return successResponse({
      user: {
        id: updated.id,
        email: updated.email,
        role: updated.role,
        first_name: updated.first_name ?? null,
        last_name: updated.last_name ?? null,
        phone: updated.phone ?? null,
        marketing_opt_in: updated.marketing_opt_in ?? false,
      },
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to update profile."));
  }
}