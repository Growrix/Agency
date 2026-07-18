import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAuthenticatedUser } from "@/server/auth/guards";
import { readDatabase } from "@/server/data/store";
import { createSignedIntakeAssetUrl } from "@/server/domain/intake-assets";
import { assertProjectAccess } from "@/server/domain/projects";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ projectId: string; assetId: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const user = await requireAuthenticatedUser(request);
    const { projectId, assetId } = await context.params;
    await assertProjectAccess(projectId, user);

    const database = await readDatabase();
    const asset = database.project_assets.find((item) => item.id === assetId && item.project_id === projectId);
    if (!asset || asset.kind !== "file" || !asset.storage_path) {
      throw new ApiError("NOT_FOUND", 404, "File asset not found.");
    }

    const downloadUrl = await createSignedIntakeAssetUrl(asset.storage_path);
    return successResponse({ download_url: downloadUrl, file_name: asset.file_name ?? asset.label });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to authorize download."),
    );
  }
}
