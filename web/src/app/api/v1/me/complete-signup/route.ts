import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAuthenticatedUser } from "@/server/auth/guards";
import { completeUserSignup } from "@/server/auth/users";
import { recordAuditLog } from "@/server/logging/observability";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser(request);
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    const acceptedTerms = body.accepted_terms === true || body.acceptedTerms === true;
    if (!acceptedTerms) {
      throw new ApiError(
        "FIELD_VALIDATION_FAILED",
        400,
        "You must accept the terms to continue.",
      );
    }

    const phone =
      typeof body.phone === "string" && body.phone.trim() !== "" ? body.phone : undefined;
    const marketingOptIn =
      typeof body.marketing_opt_in === "boolean"
        ? body.marketing_opt_in
        : typeof body.marketingOptIn === "boolean"
          ? body.marketingOptIn
          : false;

    const updated = await completeUserSignup(user.id, {
      phone,
      marketingOptIn,
      intentSource: "self_signup",
    });

    await recordAuditLog({
      level: "info",
      action: "auth.signup_completed",
      actor_email: updated.email,
      metadata: {
        source: "self_signup",
        marketing_opt_in: marketingOptIn,
      },
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
        signup_completed_at: updated.signup_completed_at ?? null,
        signup_intent_source: updated.signup_intent_source ?? null,
      },
    });
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? error
        : new ApiError("INTERNAL_ERROR", 500, "Unable to complete signup."),
    );
  }
}
