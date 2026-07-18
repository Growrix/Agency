import { NextRequest, NextResponse } from "next/server";
import { ApiError, errorResponse } from "@/server/core/api";
import { requireAuthenticatedUser } from "@/server/auth/guards";
import { readLocalIntakeAsset } from "@/server/domain/intake-assets";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await requireAuthenticatedUser(request);
    const path = request.nextUrl.searchParams.get("path");
    if (!path) {
      throw new ApiError("MISSING_REQUIRED_FIELD", 400, "Asset path is required.");
    }

    const buffer = await readLocalIntakeAsset(path);
    const fileName = path.split("/").pop() ?? "download.bin";
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to load asset."),
    );
  }
}
