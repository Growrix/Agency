import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { getPublicService } from "@/server/domain/catalog";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ serviceId: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const { serviceId } = await context.params;
    const service = await getPublicService(serviceId);
    if (!service) {
      throw new ApiError("NOT_FOUND", 404, "Service not found.");
    }

    return successResponse(service);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load service."));
  }
}