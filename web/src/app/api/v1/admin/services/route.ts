import { NextRequest } from "next/server";
import { ApiError, createRequestContext, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { deleteManagedService, listManagedServices, upsertManagedService } from "@/server/domain/catalog";
import { recordAuditLog } from "@/server/logging/observability";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request);
    return successResponse(await listManagedServices());
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load services."));
  }
}

export async function POST(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    const admin = await requireAdminUser(request);
    const body = (await request.json()) as Record<string, unknown>;
    const record = await upsertManagedService({
      id: typeof body.id === "string" && body.id ? body.id : crypto.randomUUID(),
      slug: typeof body.slug === "string" ? body.slug : "",
      title: typeof body.title === "string" ? body.title : "",
      description: typeof body.description === "string" ? body.description : "",
      short_description: typeof body.short_description === "string" ? body.short_description : "",
      service_type: typeof body.service_type === "string" ? body.service_type : "",
      pricing_model: body.pricing_model === "fixed" || body.pricing_model === "tiered" ? body.pricing_model : "contact",
      delivery_timeline: typeof body.delivery_timeline === "string" ? body.delivery_timeline : "",
      pillars: Array.isArray(body.pillars) ? body.pillars.filter((item): item is string => typeof item === "string") : [],
    });

    await recordAuditLog({
      level: "info",
      action: "admin.service_saved",
      request_id: context.requestId,
      ip: context.ip,
      actor_email: admin.email,
      metadata: { service_id: record.id, slug: record.slug },
    });

    return successResponse(record);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to save service."));
  }
}

export async function DELETE(request: NextRequest) {
  const context = createRequestContext(request);

  try {
    const admin = await requireAdminUser(request);
    const serviceId = new URL(request.url).searchParams.get("id");
    if (!serviceId) {
      throw new ApiError("MISSING_REQUIRED_FIELD", 400, "Service id is required.");
    }

    await deleteManagedService(serviceId);
    await recordAuditLog({
      level: "warning",
      action: "admin.service_deleted",
      request_id: context.requestId,
      ip: context.ip,
      actor_email: admin.email,
      metadata: { service_id: serviceId },
    });

    return successResponse({ deleted: true, id: serviceId });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to delete service."));
  }
}