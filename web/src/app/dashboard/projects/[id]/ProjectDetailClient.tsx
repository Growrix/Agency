"use client";

import { useParams } from "next/navigation";
import { ProjectWorkspace } from "@/components/dashboard/ProjectWorkspace";

export function ProjectDetailClient() {
  const params = useParams<{ id: string }>();
  const projectId = params?.id ?? "";

  return <ProjectWorkspace projectId={projectId} mode="client" backHref="/dashboard/projects" />;
}
