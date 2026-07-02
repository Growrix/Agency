import "server-only";

import type { CouponRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { recordAuditLog } from "@/server/logging/observability";

/**
 * Coupon service — E1a launch scope: percent-only, server-validated,
 * atomic times_used increment on order creation.
 */

export type CouponSnapshot = {
  code: string;
  description?: string;
  discount_type: CouponRecord["discount_type"];
  discount_value: number;
};

export type CouponValidationResult =
  | {
      valid: true;
      discount_cents: number;
      coupon: CouponSnapshot;
    }
  | {
      valid: false;
      reason:
        | "not_found"
        | "inactive"
        | "expired"
        | "min_subtotal"
        | "max_uses"
        | "per_user_limit";
      message: string;
    };

function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

function now() {
  return new Date().toISOString();
}

function isExpired(coupon: CouponRecord): boolean {
  if (!coupon.expires_at) return false;
  return new Date(coupon.expires_at).getTime() <= Date.now();
}

function computeDiscountCents(coupon: CouponRecord, subtotalCents: number): number {
  if (coupon.discount_type === "percent") {
    return Math.max(0, Math.round((subtotalCents * coupon.discount_value) / 100));
  }
  return 0;
}

export async function listCoupons(): Promise<CouponRecord[]> {
  const database = await readDatabase();
  return [...database.coupons].sort((a, b) => (a.updated_at > b.updated_at ? -1 : 1));
}

export async function getCouponById(id: string): Promise<CouponRecord | null> {
  const database = await readDatabase();
  return database.coupons.find((coupon) => coupon.id === id) ?? null;
}

export async function getCouponByCode(code: string): Promise<CouponRecord | null> {
  const normalized = normalizeCode(code);
  const database = await readDatabase();
  return database.coupons.find((coupon) => normalizeCode(coupon.code) === normalized) ?? null;
}

export type ValidateCouponInput = {
  code: string;
  subtotal_cents: number;
  user_email?: string;
};

export async function validateCouponForCheckout(
  input: ValidateCouponInput,
): Promise<CouponValidationResult> {
  const coupon = await getCouponByCode(input.code);

  if (!coupon) {
    return { valid: false, reason: "not_found", message: "Discount code is not recognized." };
  }
  if (!coupon.active) {
    return { valid: false, reason: "inactive", message: "This code is no longer active." };
  }
  if (isExpired(coupon)) {
    return { valid: false, reason: "expired", message: "This code has expired." };
  }
  if (typeof coupon.max_uses === "number" && coupon.times_used >= coupon.max_uses) {
    return { valid: false, reason: "max_uses", message: "This code has reached its usage limit." };
  }
  if (
    typeof coupon.min_subtotal_cents === "number" &&
    input.subtotal_cents < coupon.min_subtotal_cents
  ) {
    return {
      valid: false,
      reason: "min_subtotal",
      message: "Order subtotal is below the minimum required for this code.",
    };
  }

  if (typeof coupon.per_user_limit === "number" && input.user_email) {
    const database = await readDatabase();
    const normalizedEmail = input.user_email.trim().toLowerCase();
    const normalizedCouponCode = normalizeCode(coupon.code);
    const userUses = database.orders.filter(
      (order) =>
        order.customer_email?.toLowerCase() === normalizedEmail &&
        typeof order.applied_coupon_code === "string" &&
        normalizeCode(order.applied_coupon_code) === normalizedCouponCode,
    ).length;

    if (userUses >= coupon.per_user_limit) {
      return {
        valid: false,
        reason: "per_user_limit",
        message: "You have already used this code the maximum number of times.",
      };
    }
  }

  return {
    valid: true,
    discount_cents: computeDiscountCents(coupon, input.subtotal_cents),
    coupon: {
      code: coupon.code,
      description: coupon.description,
      discount_type: coupon.discount_type,
      discount_value: coupon.discount_value,
    },
  };
}

export type CreateCouponInput = {
  code: string;
  description?: string;
  discount_type: CouponRecord["discount_type"];
  discount_value: number;
  min_subtotal_cents?: number;
  max_uses?: number;
  per_user_limit?: number;
  expires_at?: string;
  active?: boolean;
  created_by_user_id?: string;
};

export async function createCoupon(input: CreateCouponInput): Promise<CouponRecord> {
  const code = normalizeCode(input.code);
  if (!code) {
    throw new Error("Coupon code is required.");
  }
  if (input.discount_type !== "percent") {
    throw new Error("Only percent discounts are supported.");
  }
  if (input.discount_value < 1 || input.discount_value > 100) {
    throw new Error("Percent discount must be between 1 and 100.");
  }

  const existing = await getCouponByCode(code);
  if (existing) {
    throw new Error(`Coupon code ${code} already exists.`);
  }

  const record: CouponRecord = {
    id: crypto.randomUUID(),
    code,
    description: input.description?.trim() || undefined,
    discount_type: input.discount_type,
    discount_value: Math.floor(input.discount_value),
    min_subtotal_cents:
      typeof input.min_subtotal_cents === "number" && input.min_subtotal_cents > 0
        ? Math.floor(input.min_subtotal_cents)
        : undefined,
    max_uses:
      typeof input.max_uses === "number" && input.max_uses > 0
        ? Math.floor(input.max_uses)
        : undefined,
    times_used: 0,
    per_user_limit:
      typeof input.per_user_limit === "number" && input.per_user_limit > 0
        ? Math.floor(input.per_user_limit)
        : undefined,
    expires_at: input.expires_at?.trim() || undefined,
    active: input.active ?? true,
    created_by_user_id: input.created_by_user_id,
    created_at: now(),
    updated_at: now(),
  };

  await writeDatabase((next) => ({
    ...next,
    coupons: [record, ...next.coupons],
  }));

  return record;
}

export type UpdateCouponInput = Partial<
  Omit<CreateCouponInput, "code" | "discount_type" | "created_by_user_id">
> & { active?: boolean };

export async function updateCoupon(id: string, patch: UpdateCouponInput): Promise<CouponRecord | null> {
  let updated: CouponRecord | null = null;

  if (typeof patch.discount_value === "number") {
    if (patch.discount_value < 1 || patch.discount_value > 100) {
      throw new Error("Percent discount must be between 1 and 100.");
    }
  }

  await writeDatabase((next) => ({
    ...next,
    coupons: next.coupons.map((coupon) => {
      if (coupon.id !== id) return coupon;

      updated = {
        ...coupon,
        description:
          patch.description !== undefined
            ? patch.description.trim() || undefined
            : coupon.description,
        discount_value:
          typeof patch.discount_value === "number"
            ? Math.floor(patch.discount_value)
            : coupon.discount_value,
        min_subtotal_cents:
          patch.min_subtotal_cents !== undefined
            ? typeof patch.min_subtotal_cents === "number" && patch.min_subtotal_cents > 0
              ? Math.floor(patch.min_subtotal_cents)
              : undefined
            : coupon.min_subtotal_cents,
        max_uses:
          patch.max_uses !== undefined
            ? typeof patch.max_uses === "number" && patch.max_uses > 0
              ? Math.floor(patch.max_uses)
              : undefined
            : coupon.max_uses,
        per_user_limit:
          patch.per_user_limit !== undefined
            ? typeof patch.per_user_limit === "number" && patch.per_user_limit > 0
              ? Math.floor(patch.per_user_limit)
              : undefined
            : coupon.per_user_limit,
        expires_at:
          patch.expires_at !== undefined
            ? patch.expires_at?.trim() || undefined
            : coupon.expires_at,
        active: typeof patch.active === "boolean" ? patch.active : coupon.active,
        updated_at: now(),
      };

      return updated;
    }),
  }));

  return updated;
}

export async function deactivateCoupon(id: string, actorEmail?: string): Promise<CouponRecord | null> {
  const updated = await updateCoupon(id, { active: false });
  if (updated) {
    await recordAuditLog({
      level: "info",
      action: "admin.coupon_deactivated",
      actor_email: actorEmail,
      metadata: { coupon_id: id, code: updated.code },
    });
  }
  return updated;
}

/**
 * Applies the coupon to an order — increments times_used atomically.
 * Called after order creation in the checkout POST flow. Returns the
 * updated coupon or null if the code is unknown / cannot be applied.
 */
export async function applyCouponToOrder(
  code: string,
  orderId: string,
  actorEmail?: string,
): Promise<CouponRecord | null> {
  const normalized = normalizeCode(code);
  let applied = false;

  await writeDatabase((next) => {
    const coupons = next.coupons.map((coupon): CouponRecord => {
      if (normalizeCode(coupon.code) !== normalized) return coupon;
      applied = true;
      return {
        ...coupon,
        times_used: coupon.times_used + 1,
        updated_at: now(),
      };
    });

    if (!applied) return next;
    return { ...next, coupons };
  });

  if (!applied) {
    return null;
  }

  // Re-read the persisted coupon so we return the canonical row (avoids
  // TypeScript control-flow gymnastics for a cross-closure assignment).
  const fresh = await getCouponByCode(code);
  if (fresh) {
    await recordAuditLog({
      level: "info",
      action: "checkout.coupon_applied",
      actor_email: actorEmail,
      metadata: {
        coupon_code: normalized,
        coupon_id: fresh.id,
        order_id: orderId,
      },
    });
  }
  return fresh;
}
