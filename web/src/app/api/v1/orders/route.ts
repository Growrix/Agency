import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { getAuthenticatedUser } from "@/server/auth/guards";
import { createOrder } from "@/server/domain/orders";
import { sendOrCreateInvoiceForOrder } from "@/server/domain/invoices";
import type { PaymentMethodType } from "@/server/data/schema";
import { assertNoBotTrap, assertRateLimit } from "@/server/security/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    const authenticatedUser = await getAuthenticatedUser(request);
    const body = (await request.json()) as Record<string, unknown>;
    const idempotencyKeyHeader = request.headers.get("x-idempotency-key");
    const idempotencyKeyBody = typeof body.idempotency_key === "string" ? body.idempotency_key : undefined;
    const paymentMethod = parsePaymentMethod(body.payment_method_preference);
    const items = Array.isArray(body.items)
      ? body.items
          .filter((entry): entry is Record<string, unknown> => typeof entry === "object" && entry !== null)
          .map((entry) => ({
            product_slug: typeof entry.product_slug === "string" ? entry.product_slug : "",
            product_name: typeof entry.product_name === "string" ? entry.product_name : undefined,
            variant_slug: typeof entry.variant_slug === "string" ? entry.variant_slug : undefined,
            tier_name: typeof entry.tier_name === "string" ? entry.tier_name : undefined,
            fulfillment_type: typeof entry.fulfillment_type === "string" ? entry.fulfillment_type : undefined,
            quantity: typeof entry.quantity === "number" ? entry.quantity : undefined,
            unit_price_cents: typeof entry.unit_price_cents === "number" ? entry.unit_price_cents : undefined,
          }))
      : undefined;
    assertNoBotTrap(body.website);
    assertRateLimit({
      scope: "orders",
      identifier: context.ip,
      limit: 6,
    });

    const result = await createOrder({
      product_slug: typeof body.product_slug === "string" ? body.product_slug : "",
      product_variant_slug: typeof body.product_variant_slug === "string" ? body.product_variant_slug : undefined,
      product_tier_name: typeof body.product_tier_name === "string" ? body.product_tier_name : undefined,
      fulfillment_type: typeof body.fulfillment_type === "string" ? body.fulfillment_type : undefined,
      items,
      customer_name: typeof body.customer_name === "string" ? body.customer_name : "",
      customer_email: typeof body.customer_email === "string" ? body.customer_email : "",
      customer_phone: typeof body.customer_phone === "string" ? body.customer_phone : undefined,
      user_id: authenticatedUser?.id,
      payment_method_preference: paymentMethod,
      idempotency_key: idempotencyKeyHeader ?? idempotencyKeyBody,
      notes: typeof body.notes === "string" ? body.notes : undefined,
      applied_coupon_code:
        typeof body.applied_coupon_code === "string" && body.applied_coupon_code.trim()
          ? body.applied_coupon_code
          : undefined,
      requestId: context.requestId,
      ip: context.ip,
    });

    const responseStatus = result.idempotency_reused ? 200 : 201;

    if (!result.checkout_url && paymentMethod === "invoice" && !result.idempotency_reused) {
      const invoiceResult = await sendOrCreateInvoiceForOrder(result.order.id, {
        paymentMethod,
      });

      return successResponse(
        {
          ...result,
          invoice: {
            id: invoiceResult.invoice.id,
            invoice_number: invoiceResult.invoice.invoice_number,
            payment_method: invoiceResult.invoice.payment_method,
            status: invoiceResult.invoice.status,
          },
          invoice_email_delivered: invoiceResult.delivered,
        },
        { status: responseStatus },
      );
    }

    return successResponse(result, { status: responseStatus });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to create order."));
  }
}

function parsePaymentMethod(value: unknown): PaymentMethodType {
  if (typeof value !== "string") {
    return "invoice";
  }

  const normalized = value.trim();
  const supported: PaymentMethodType[] = ["card", "paypal", "stripe", "bank_transfer", "invoice"];
  return supported.includes(normalized as PaymentMethodType) ? (normalized as PaymentMethodType) : "invoice";
}
