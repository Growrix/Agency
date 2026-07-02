import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { deactivateCoupon, getCouponById, updateCoupon } from "@/server/domain/coupons";
import { recordAuditLog } from "@/server/logging/observability";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ couponId: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    await requireAdminUser(request);
    const { couponId } = await context.params;
    const coupon = await getCouponById(couponId);
    if (!coupon) {
      throw new ApiError("NOT_FOUND", 404, "Coupon not found.");
    }
    return successResponse(coupon);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load coupon."),
    );
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdminUser(request);
    const { couponId } = await context.params;
    const existing = await getCouponById(couponId);
    if (!existing) {
      throw new ApiError("NOT_FOUND", 404, "Coupon not found.");
    }

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    if (typeof body.discount_value === "number") {
      if (body.discount_value < 1 || body.discount_value > 100) {
        throw new ApiError("FIELD_VALIDATION_FAILED", 400, "discount_value must be 1-100.");
      }
    }

    const updated = await updateCoupon(couponId, {
      description: typeof body.description === "string" ? body.description : undefined,
      discount_value: typeof body.discount_value === "number" ? body.discount_value : undefined,
      min_subtotal_cents:
        typeof body.min_subtotal_cents === "number" ? body.min_subtotal_cents : undefined,
      max_uses: typeof body.max_uses === "number" ? body.max_uses : undefined,
      per_user_limit:
        typeof body.per_user_limit === "number" ? body.per_user_limit : undefined,
      expires_at: typeof body.expires_at === "string" ? body.expires_at : undefined,
      active: typeof body.active === "boolean" ? body.active : undefined,
    });

    if (!updated) {
      throw new ApiError("NOT_FOUND", 404, "Coupon not found after update.");
    }

    await recordAuditLog({
      level: "info",
      action: "admin.coupon_updated",
      actor_email: admin.email,
      metadata: {
        coupon_id: couponId,
        code: updated.code,
        active: updated.active,
      },
    });

    return successResponse(updated);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to update coupon."),
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdminUser(request);
    const { couponId } = await context.params;
    const existing = await getCouponById(couponId);
    if (!existing) {
      throw new ApiError("NOT_FOUND", 404, "Coupon not found.");
    }

    const updated = await deactivateCoupon(couponId, admin.email);
    return successResponse(updated);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to deactivate coupon."),
    );
  }
}
