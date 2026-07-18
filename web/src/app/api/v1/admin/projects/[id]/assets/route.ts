import { NextRequest } from "next/server";
import { ApiError, errorResponse, successResponse } from "@/server/core/api";
import { requireAdminUser } from "@/server/auth/guards";
import { addProjectAsset, assertProjectAccess, removeProjectAsset } from "@/server/domain/projects";
import type { ProjectAssetKind } from "@/server/data/schema";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

const ALLOWED_KINDS: ProjectAssetKind[] = ["file", "drive_link", "reference_site"];

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdminUser(request);
    const { id } = await context.params;
    await assertProjectAccess(id, admin);

    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const kindRaw = formData.get("kind");
      const kind =
        typeof kindRaw === "string" && ALLOWED_KINDS.includes(kindRaw as ProjectAssetKind)
          ? (kindRaw as ProjectAssetKind)
          : "file";
      const file = formData.get("file");
      const asset = await addProjectAsset({
        projectId: id,
        author: admin,
        kind,
        url: typeof formData.get("url") === "string" ? (formData.get("url") as string) : undefined,
        label: typeof formData.get("label") === "string" ? (formData.get("label") as string) : undefined,
        file: file instanceof File ? file : undefined,
      });
      return successResponse(asset);
    }

    const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
    const kind =
      typeof body.kind === "string" && ALLOWED_KINDS.includes(body.kind as ProjectAssetKind)
        ? (body.kind as ProjectAssetKind)
        : "reference_site";
    const asset = await addProjectAsset({
      projectId: id,
      author: admin,
      kind,
      url: typeof body.url === "string" ? body.url : undefined,
      label: typeof body.label === "string" ? body.label : undefined,
    });
    return successResponse(asset);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to add project asset."),
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const admin = await requireAdminUser(request);
    const { id } = await context.params;
    await assertProjectAccess(id, admin);
    const assetId = request.nextUrl.searchParams.get("assetId");
    if (!assetId) {
      throw new ApiError("MISSING_REQUIRED_FIELD", 400, "assetId is required.");
    }
    const result = await removeProjectAsset({ projectId: id, assetId, author: admin });
    return successResponse(result);
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error : new ApiError("INTERNAL_ERROR", 500, "Unable to remove project asset."),
    );
  }
}
