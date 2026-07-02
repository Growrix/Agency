import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { getRuntimeConfig } from "@/server/config/runtime";
import { validateCouponForCheckout } from "@/server/domain/coupons";
import { assertRateLimit } from "@/server/security/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    assertRateLimit({
      scope: "coupon-validate",
      identifier: context.ip,
      limit: getRuntimeConfig().abuseProtection.couponValidateLimitPerMinute,
    });

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const code = typeof body.code === "string" ? body.code : "";
    const subtotalCents =
      typeof body.subtotal_cents === "number" && Number.isFinite(body.subtotal_cents)
        ? Math.max(0, Math.floor(body.subtotal_cents))
        : 0;
    const userEmail = typeof body.user_email === "string" ? body.user_email : undefined;

    if (!code.trim()) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "code is required.");
    }
    if (subtotalCents <= 0) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "subtotal_cents must be greater than zero.");
    }

    const result = await validateCouponForCheckout({
      code,
      subtotal_cents: subtotalCents,
      user_email: userEmail,
    });

    return successResponse(result);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to validate coupon."),
    );
  }
}
