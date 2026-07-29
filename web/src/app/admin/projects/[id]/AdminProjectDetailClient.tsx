"use client";

import { useParams } from "next/navigation";
import { AdminPage } from "@/components/admin/AdminPage";
import { ProjectWorkspace } from "@/components/dashboard/ProjectWorkspace";

export function AdminProjectDetailClient() {
  const params = useParams<{ id: string }>();
  const projectId = params?.id ?? "";

  return (
    <AdminPage>
      <ProjectWorkspace projectId={projectId} mode="admin" backHref="/admin/projects" />
    </AdminPage>
  );
}
