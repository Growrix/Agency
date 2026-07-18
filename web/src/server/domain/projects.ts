import "server-only";

import { ApiError } from "@/server/core/api";
import type {
  ClientIntakeSubmissionRecord,
  ProjectAssetKind,
  ProjectAssetRecord,
  ProjectRecord,
  ProjectStatus,
  ProjectUpdateKind,
  ProjectUpdateRecord,
} from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import type { AuthenticatedUser } from "@/server/auth/guards";
import { uploadProjectAssetFile } from "@/server/domain/intake-assets";
import { recordAuditLog } from "@/server/logging/observability";

function generateProjectNumber() {
  const prefix = "PRJ";
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${prefix}-${ts}-${rand}`;
}

export async function listProjectsForUser(userId: string) {
  const database = await readDatabase();
  return database.projects
    .filter((item) => item.client_user_id === userId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function listAllProjects() {
  const database = await readDatabase();
  return [...database.projects].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getProjectById(projectId: string) {
  const database = await readDatabase();
  return database.projects.find((item) => item.id === projectId) ?? null;
}

export async function getProjectForUser(projectId: string, userId: string) {
  const project = await getProjectById(projectId);
  if (!project || project.client_user_id !== userId) {
    return null;
  }
  return project;
}

export async function getProjectWorkspace(projectId: string) {
  const database = await readDatabase();
  const project = database.projects.find((item) => item.id === projectId) ?? null;
  if (!project) {
    return null;
  }

  const intake = database.client_intake_submissions.find((item) => item.id === project.submission_id) ?? null;
  const updates = database.project_updates
    .filter((item) => item.project_id === projectId)
    .sort((a, b) => a.created_at.localeCompare(b.created_at));
  const assets = database.project_assets
    .filter((item) => item.project_id === projectId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));

  return { project, intake, updates, assets };
}

export async function convertIntakeToProject(input: {
  intake: ClientIntakeSubmissionRecord;
  adminUserId?: string;
  title?: string;
}) {
  if (input.intake.project_id) {
    const existing = await getProjectById(input.intake.project_id);
    if (existing) {
      return existing;
    }
  }

  const now = new Date().toISOString();
  const project: ProjectRecord = {
    id: crypto.randomUUID(),
    project_number: generateProjectNumber(),
    submission_id: input.intake.id,
    client_user_id: input.intake.user_id,
    admin_assigned_user_id: input.adminUserId,
    title: input.title?.trim() || `${input.intake.business_name} Website Project`,
    status: "intake",
    created_at: now,
    updated_at: now,
  };

  const seedAssets: ProjectAssetRecord[] = [];
  for (const site of input.intake.reference_sites) {
    seedAssets.push({
      id: crypto.randomUUID(),
      project_id: project.id,
      kind: "reference_site",
      url: site.url,
      label: site.note,
      uploaded_by_user_id: input.intake.user_id,
      created_at: now,
    });
  }
  for (const link of input.intake.drive_links) {
    seedAssets.push({
      id: crypto.randomUUID(),
      project_id: project.id,
      kind: "drive_link",
      url: link.url,
      label: link.label ?? link.type,
      uploaded_by_user_id: input.intake.user_id,
      created_at: now,
    });
  }
  for (const file of input.intake.uploaded_files) {
    seedAssets.push({
      id: crypto.randomUUID(),
      project_id: project.id,
      kind: "file",
      storage_path: file.storage_path,
      file_name: file.file_name,
      mime_type: file.mime_type,
      size_bytes: file.size_bytes,
      label: file.file_name,
      uploaded_by_user_id: input.intake.user_id,
      created_at: now,
    });
  }

  const seedUpdate: ProjectUpdateRecord = {
    id: crypto.randomUUID(),
    project_id: project.id,
    author_user_id: input.intake.user_id,
    author_role: "client",
    kind: "note",
    body: `Project created from intake ${input.intake.submission_number}.`,
    created_at: now,
  };

  await writeDatabase((database) => ({
    ...database,
    projects: [project, ...database.projects],
    project_assets: [...seedAssets, ...database.project_assets],
    project_updates: [...database.project_updates, seedUpdate],
    client_intake_submissions: database.client_intake_submissions.map((item) =>
      item.id === input.intake.id
        ? {
            ...item,
            status: "project_created",
            project_id: project.id,
            updated_at: now,
          }
        : item,
    ),
  }));

  await recordAuditLog({
    level: "info",
    action: "project.created_from_intake",
    actor_email: input.intake.client_email,
    metadata: {
      project_id: project.id,
      intake_id: input.intake.id,
      project_number: project.project_number,
    },
  });

  return project;
}

export async function updateProject(input: {
  projectId: string;
  status?: ProjectStatus;
  adminAssignedUserId?: string | null;
  title?: string;
}) {
  let updated: ProjectRecord | null = null;

  await writeDatabase((database) => {
    const index = database.projects.findIndex((item) => item.id === input.projectId);
    if (index < 0) {
      return database;
    }
    const current = database.projects[index];
    updated = {
      ...current,
      status: input.status ?? current.status,
      admin_assigned_user_id:
        input.adminAssignedUserId === null
          ? undefined
          : input.adminAssignedUserId ?? current.admin_assigned_user_id,
      title: input.title?.trim() || current.title,
      updated_at: new Date().toISOString(),
    };
    const next = [...database.projects];
    next[index] = updated;
    return {
      ...database,
      projects: next,
    };
  });

  return updated;
}

export async function addProjectUpdate(input: {
  projectId: string;
  author: AuthenticatedUser;
  authorRole: "client" | "admin";
  kind: ProjectUpdateKind;
  body?: string;
  referenceUrl?: string;
  filePath?: string;
}) {
  const project = await getProjectById(input.projectId);
  if (!project) {
    throw new ApiError("NOT_FOUND", 404, "Project not found.");
  }
  if (input.authorRole === "client" && project.client_user_id !== input.author.id) {
    throw new ApiError("FORBIDDEN", 403, "You do not have access to this project.");
  }

  const record: ProjectUpdateRecord = {
    id: crypto.randomUUID(),
    project_id: input.projectId,
    author_user_id: input.author.id,
    author_role: input.authorRole,
    kind: input.kind,
    body: input.body?.trim() || undefined,
    reference_url: input.referenceUrl?.trim() || undefined,
    file_path: input.filePath,
    created_at: new Date().toISOString(),
  };

  if (!record.body && !record.reference_url && !record.file_path) {
    throw new ApiError("MISSING_REQUIRED_FIELD", 400, "Add a message, link, or file reference.");
  }

  await writeDatabase((database) => ({
    ...database,
    project_updates: [...database.project_updates, record],
    projects: database.projects.map((item) =>
      item.id === input.projectId ? { ...item, updated_at: record.created_at } : item,
    ),
  }));

  return record;
}

export async function addProjectAsset(input: {
  projectId: string;
  author: AuthenticatedUser;
  kind: ProjectAssetKind;
  url?: string;
  label?: string;
  file?: File;
}) {
  const project = await getProjectById(input.projectId);
  if (!project) {
    throw new ApiError("NOT_FOUND", 404, "Project not found.");
  }
  const isAdmin = input.author.role === "admin";
  if (!isAdmin && project.client_user_id !== input.author.id) {
    throw new ApiError("FORBIDDEN", 403, "You do not have access to this project.");
  }

  const now = new Date().toISOString();
  let asset: ProjectAssetRecord;

  if (input.kind === "file") {
    if (!input.file) {
      throw new ApiError("MISSING_REQUIRED_FIELD", 400, "Choose a file to upload.");
    }
    const uploaded = await uploadProjectAssetFile({ projectId: input.projectId, file: input.file });
    asset = {
      id: crypto.randomUUID(),
      project_id: input.projectId,
      kind: "file",
      storage_path: uploaded.storage_path,
      file_name: uploaded.file_name,
      mime_type: uploaded.mime_type,
      size_bytes: uploaded.size_bytes,
      label: input.label?.trim() || uploaded.file_name,
      uploaded_by_user_id: input.author.id,
      created_at: now,
    };
  } else {
    const url = input.url?.trim();
    if (!url) {
      throw new ApiError("MISSING_REQUIRED_FIELD", 400, "URL is required.");
    }
    asset = {
      id: crypto.randomUUID(),
      project_id: input.projectId,
      kind: input.kind,
      url,
      label: input.label?.trim() || undefined,
      uploaded_by_user_id: input.author.id,
      created_at: now,
    };
  }

  await writeDatabase((database) => ({
    ...database,
    project_assets: [asset, ...database.project_assets],
    projects: database.projects.map((item) =>
      item.id === input.projectId ? { ...item, updated_at: now } : item,
    ),
  }));

  return asset;
}

export async function removeProjectAsset(input: {
  projectId: string;
  assetId: string;
  author: AuthenticatedUser;
}) {
  const project = await getProjectById(input.projectId);
  if (!project) {
    throw new ApiError("NOT_FOUND", 404, "Project not found.");
  }
  const isAdmin = input.author.role === "admin";
  if (!isAdmin && project.client_user_id !== input.author.id) {
    throw new ApiError("FORBIDDEN", 403, "You do not have access to this project.");
  }

  let removed = false;
  await writeDatabase((database) => {
    const asset = database.project_assets.find(
      (item) => item.id === input.assetId && item.project_id === input.projectId,
    );
    if (!asset) {
      return database;
    }
    if (!isAdmin && asset.uploaded_by_user_id !== input.author.id) {
      return database;
    }
    removed = true;
    return {
      ...database,
      project_assets: database.project_assets.filter((item) => item.id !== input.assetId),
    };
  });

  if (!removed) {
    throw new ApiError("NOT_FOUND", 404, "Asset not found.");
  }

  return { ok: true as const };
}

export async function assertProjectAccess(projectId: string, user: AuthenticatedUser) {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new ApiError("NOT_FOUND", 404, "Project not found.");
  }
  if (user.role !== "admin" && project.client_user_id !== user.id) {
    throw new ApiError("FORBIDDEN", 403, "You do not have access to this project.");
  }
  return project;
}
