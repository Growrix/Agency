import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { ApiError } from "@/server/core/api";
import { getSupabaseAdminClient, isSupabaseDatabaseConfigured } from "@/server/supabase/client";

export const CLIENT_INTAKE_STORAGE_BUCKET = "client-intake-assets";

const MAX_FILE_BYTES = 25 * 1024 * 1024;
const ALLOWED_MIME_PREFIXES = ["image/", "application/pdf", "text/", "application/zip", "application/vnd."];

function getLocalIntakeAssetsDirectory() {
  const dataDir = process.env.AGENCY_DATA_DIRECTORY?.trim() || path.join(process.cwd(), ".data");
  return path.join(dataDir, "client-intake-assets");
}

function sanitizeFileName(name: string) {
  const base = name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return base.slice(0, 120) || "upload.bin";
}

export type UploadedIntakeFile = {
  storage_path: string;
  file_name: string;
  mime_type?: string;
  size_bytes: number;
};

export async function uploadIntakeFiles(input: {
  submissionId: string;
  files: File[];
}): Promise<UploadedIntakeFile[]> {
  if (input.files.length === 0) {
    return [];
  }

  const uploads: UploadedIntakeFile[] = [];

  for (const file of input.files) {
    if (file.size <= 0) {
      continue;
    }
    if (file.size > MAX_FILE_BYTES) {
      throw new ApiError("FIELD_VALIDATION_FAILED", 400, `File "${file.name}" exceeds the 25 MB limit.`);
    }
    if (file.type && !ALLOWED_MIME_PREFIXES.some((prefix) => file.type.startsWith(prefix))) {
      throw new ApiError(
        "FIELD_VALIDATION_FAILED",
        400,
        `File type not allowed for "${file.name}". Use images, PDF, text, or ZIP files.`,
      );
    }

    const safeName = sanitizeFileName(file.name);
    const storagePath = `intakes/${input.submissionId}/${crypto.randomUUID()}-${safeName}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    if (isSupabaseDatabaseConfigured()) {
      const client = getSupabaseAdminClient();
      const { error } = await client.storage.from(CLIENT_INTAKE_STORAGE_BUCKET).upload(storagePath, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });
      if (error) {
        throw new ApiError("INTERNAL_ERROR", 500, `Unable to upload "${file.name}".`);
      }
    } else {
      const localPath = path.join(getLocalIntakeAssetsDirectory(), storagePath);
      await mkdir(path.dirname(localPath), { recursive: true });
      await writeFile(localPath, buffer);
    }

    uploads.push({
      storage_path: storagePath,
      file_name: file.name,
      mime_type: file.type || undefined,
      size_bytes: file.size,
    });
  }

  return uploads;
}

export async function uploadProjectAssetFile(input: {
  projectId: string;
  file: File;
}): Promise<UploadedIntakeFile> {
  const [uploaded] = await uploadIntakeFiles({
    submissionId: input.projectId,
    files: [input.file],
  });
  if (!uploaded) {
    throw new ApiError("FIELD_VALIDATION_FAILED", 400, "File upload failed.");
  }
  return uploaded;
}

export async function createSignedIntakeAssetUrl(storagePath: string, expiresInSeconds = 3600) {
  if (isSupabaseDatabaseConfigured()) {
    const client = getSupabaseAdminClient();
    const { data, error } = await client.storage
      .from(CLIENT_INTAKE_STORAGE_BUCKET)
      .createSignedUrl(storagePath, expiresInSeconds);
    if (error || !data?.signedUrl) {
      throw new ApiError("INTERNAL_ERROR", 500, "Unable to authorize file download.");
    }
    return data.signedUrl;
  }

  return `/api/v1/intake-assets/local?path=${encodeURIComponent(storagePath)}`;
}

export async function readLocalIntakeAsset(storagePath: string) {
  const localPath = path.join(getLocalIntakeAssetsDirectory(), storagePath);
  const normalizedRoot = path.resolve(getLocalIntakeAssetsDirectory());
  const normalizedTarget = path.resolve(localPath);
  if (!normalizedTarget.startsWith(normalizedRoot)) {
    throw new ApiError("FORBIDDEN", 403, "Invalid asset path.");
  }

  const { readFile } = await import("node:fs/promises");
  return readFile(normalizedTarget);
}
