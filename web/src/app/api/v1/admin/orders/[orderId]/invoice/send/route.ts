import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import type { PaymentMethodType } from "@/server/data/schema";
import { sendOrCreateInvoiceForOrder } from "@/server/domain/invoices";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ orderId: string }>;
};

const PAYMENT_METHODS: PaymentMethodType[] = ["card", "paypal", "stripe", "bank_transfer", "invoice"];

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdminUser(request);
    const { orderId } = await context.params;

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const paymentMethod =
      typeof body.payment_method === "string" && PAYMENT_METHODS.includes(body.payment_method as PaymentMethodType)
        ? (body.payment_method as PaymentMethodType)
        : undefined;
    const paymentInstructions =
      typeof body.payment_instructions === "string" ? body.payment_instructions : undefined;

    const result = await sendOrCreateInvoiceForOrder(orderId, {
      paymentMethod,
      paymentInstructions,
      actorEmail: admin.email,
    });

    return successResponse({
      invoice: result.invoice,
      invoice_email_delivered: result.delivered,
    });
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? error
        : new ApiError("INTERNAL_ERROR", 500, "Unable to send invoice."),
    );
  }
}
