import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { listAllReviews } from "@/server/domain/reviews";
import type { ProductReviewStatus } from "@/server/data/schema";

export const dynamic = "force-dynamic";

const ALLOWED_STATUSES: ProductReviewStatus[] = ["pending", "approved", "rejected"];

export async function GET(request: NextRequest) {
  try {
    await requireAdminUser(request);
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status") as ProductReviewStatus | null;
    const status = statusParam && ALLOWED_STATUSES.includes(statusParam) ? statusParam : undefined;
    const reviews = await listAllReviews(status);
    return successResponse(reviews);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load reviews."),
    );
  }
}
