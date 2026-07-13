import { NextRequest } from "next/server";
import { requireAdminUser } from "@/server/auth/guards";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { DEFAULT_ADMIN_EMAIL_TEMPLATE_SETTINGS } from "@/server/data/schema";
import {
  getOrderCreatedEmailTemplate,
  ORDER_EMAIL_TEMPLATE_VARIABLES,
  updateOrderCreatedEmailTemplate,
} from "@/server/domain/email-templates";

export const dynamic = "force-dynamic";

function parseTemplateField(value: unknown, fieldName: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, `${fieldName} is required.`);
  }

  return value;
}

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request);

    const orderCreated = await getOrderCreatedEmailTemplate();
    return successResponse({
      order_created: orderCreated,
      defaults: {
        order_created: DEFAULT_ADMIN_EMAIL_TEMPLATE_SETTINGS.order_created,
      },
      placeholders: ORDER_EMAIL_TEMPLATE_VARIABLES,
    });
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? error
        : new ApiError("INTERNAL_ERROR", 500, "Unable to load email template settings."),
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdminUser(request);
    const body = (await request.json().catch(() => ({}))) as {
      order_created?: {
        subject?: unknown;
        text?: unknown;
        html?: unknown;
      };
    };

    if (!body.order_created) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "order_created template is required.");
    }

    const updated = await updateOrderCreatedEmailTemplate({
      subject: parseTemplateField(body.order_created.subject, "subject"),
      text: parseTemplateField(body.order_created.text, "text"),
      html: parseTemplateField(body.order_created.html, "html"),
    });

    return successResponse({ order_created: updated });
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? error
        : new ApiError("INTERNAL_ERROR", 500, "Unable to update email template settings."),
    );
  }
}
