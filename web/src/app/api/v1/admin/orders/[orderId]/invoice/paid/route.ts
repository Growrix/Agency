import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { markInvoicePaidForOrder } from "@/server/domain/invoices";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ orderId: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdminUser(request);
    const { orderId } = await context.params;
    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;

    const notes = typeof body.notes === "string" ? body.notes : undefined;

    const result = await markInvoicePaidForOrder(orderId, {
      actorEmail: admin.email,
      notes,
    });

    return successResponse(result);
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? error
        : new ApiError("INTERNAL_ERROR", 500, "Unable to mark invoice as paid."),
    );
  }
}
