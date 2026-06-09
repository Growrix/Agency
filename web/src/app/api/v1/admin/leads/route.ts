import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import type { LeadStatus, LeadTemperature } from "@/server/data/schema";
import { listLeads } from "@/server/domain/leads";

export const dynamic = "force-dynamic";

const LEAD_STATUSES: LeadStatus[] = ["new", "engaged", "qualified", "customer", "lost"];
const LEAD_TEMPERATURES: LeadTemperature[] = ["cold", "warm", "hot", "customer"];

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request);
    const { searchParams } = new URL(request.url);

    const statusParam = searchParams.get("status");
    const temperatureParam = searchParams.get("temperature");
    const limitParam = searchParams.get("limit");

    if (statusParam && !LEAD_STATUSES.includes(statusParam as LeadStatus)) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Invalid status filter.");
    }
    if (temperatureParam && !LEAD_TEMPERATURES.includes(temperatureParam as LeadTemperature)) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, "Invalid temperature filter.");
    }

    const limit = limitParam ? Math.min(Math.max(Number.parseInt(limitParam, 10) || 0, 1), 500) : undefined;

    const leads = await listLeads({
      status: statusParam ? (statusParam as LeadStatus) : undefined,
      temperature: temperatureParam ? (temperatureParam as LeadTemperature) : undefined,
      limit,
    });

    return successResponse(leads);
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load leads."));
  }
}
