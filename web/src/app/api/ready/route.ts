import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { readDatabase } from "@/server/data/store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const database = await readDatabase();
    return successResponse({
      status: "ready",
      checks: {
        data_store: "ok",
        users_loaded: database.users.length,
        orders_loaded: database.orders.length,
      },
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Readiness check failed."), { status: 503 });
  }
}