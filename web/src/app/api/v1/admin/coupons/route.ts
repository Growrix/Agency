import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { createCoupon, listCoupons } from "@/server/domain/coupons";
import { recordAuditLog } from "@/server/logging/observability";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request);
    const url = new URL(request.url);
    const activeFilter = url.searchParams.get("active");
    const query = url.searchParams.get("q")?.trim().toLowerCase() ?? "";

    const coupons = await listCoupons();
    const filtered = coupons.filter((coupon) => {
      if (activeFilter === "true" && !coupon.active) return false;
      if (activeFilter === "false" && coupon.active) return false;
      if (query) {
        const haystack = `${coupon.code} ${coupon.description ?? ""}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    return successResponse({ items: filtered, total: filtered.length });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to list coupons."),
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdminUser(request);
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    const code = typeof body.code === "string" ? body.code : "";
    const discountValue =
      typeof body.discount_value === "number" ? body.discount_value : Number(body.discount_value);

    if (!code.trim()) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "code is required.");
    }
    if (!Number.isFinite(discountValue) || discountValue < 1 || discountValue > 100) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "discount_value must be 1-100.");
    }

    const coupon = await createCoupon({
      code,
      description: typeof body.description === "string" ? body.description : undefined,
      discount_type: "percent",
      discount_value: Math.floor(discountValue),
      min_subtotal_cents:
        typeof body.min_subtotal_cents === "number" ? body.min_subtotal_cents : undefined,
      max_uses: typeof body.max_uses === "number" ? body.max_uses : undefined,
      per_user_limit:
        typeof body.per_user_limit === "number" ? body.per_user_limit : undefined,
      expires_at: typeof body.expires_at === "string" ? body.expires_at : undefined,
      active: typeof body.active === "boolean" ? body.active : true,
      created_by_user_id: admin.id,
    });

    await recordAuditLog({
      level: "info",
      action: "admin.coupon_created",
      actor_email: admin.email,
      metadata: {
        coupon_id: coupon.id,
        code: coupon.code,
        discount_value: coupon.discount_value,
      },
    });

    return successResponse(coupon);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to create coupon."),
    );
  }
}
