"use client";

import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/primitives/Card";
import { Button, LinkButton } from "@/components/primitives/Button";
import { ProjectAssetComposer, ProjectAssetList } from "@/components/dashboard/ProjectAssetList";
import { ProjectUpdateComposer, ProjectUpdateThread } from "@/components/dashboard/ProjectUpdateThread";

type Workspace = {
  project: {
    id: string;
    project_number: string;
    title: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  intake: {
    business_name: string;
    business_description: string;
    submission_number: string;
  } | null;
  updates: Array<{
    id: string;
    author_role: "client" | "admin";
    kind: string;
    body?: string;
    reference_url?: string;
    created_at: string;
  }>;
  assets: Array<{
    id: string;
    kind: "file" | "drive_link" | "reference_site";
    url?: string;
    storage_path?: string;
    label?: string;
    file_name?: string;
    created_at: string;
  }>;
};

type Props = {
  projectId: string;
  mode: "client" | "admin";
  backHref: string;
};

const STATUS_OPTIONS = ["intake", "planning", "in_progress", "review", "delivered", "archived"];

export function ProjectWorkspace({ projectId, mode, backHref }: Props) {
  const apiBase = mode === "admin" ? `/api/v1/admin/projects/${projectId}` : `/api/v1/me/projects/${projectId}`;
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusDraft, setStatusDraft] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiBase, { credentials: "same-origin" });
      const payload = (await response.json().catch(() => null)) as {
        data?: Workspace;
        error?: { message?: string };
      } | null;
      if (!response.ok || !payload?.data) {
        throw new Error(payload?.error?.message ?? "Unable to load project.");
      }
      setWorkspace(payload.data);
      setStatusDraft(payload.data.project.status);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load project.");
    } finally {
      setLoading(false);
    }
  }, [apiBase]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  async function saveStatus() {
    if (mode !== "admin" || !workspace) return;
    const response = await fetch(apiBase, {
      method: "PATCH",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: statusDraft }),
    });
    if (response.ok) {
      void load();
    }
  }

  if (loading) {
    return <p className="text-sm text-text-muted">Loading project workspace…</p>;
  }

  if (error || !workspace) {
    return (
      <Card>
        <p className="text-sm text-destructive">{error ?? "Project not found."}</p>
        <LinkButton href={backHref} variant="outline" size="sm" className="mt-3">
          Back
        </LinkButton>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <LinkButton href={backHref} variant="ghost" size="sm">
            ← Back
          </LinkButton>
          <h1 className="mt-2 font-display text-3xl tracking-tight">{workspace.project.title}</h1>
          <p className="mt-1 text-sm text-text-muted">
            {workspace.project.project_number} · {workspace.project.status.replace(/_/g, " ")}
          </p>
        </div>
        {mode === "admin" ? (
          <div className="flex flex-wrap items-center gap-2">
            <select
              className="signal-input"
              value={statusDraft}
              onChange={(event) => setStatusDraft(event.target.value)}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status.replace(/_/g, " ")}
                </option>
              ))}
            </select>
            <Button type="button" size="sm" onClick={() => void saveStatus()}>
              Update status
            </Button>
          </div>
        ) : null}
      </header>

      {workspace.intake ? (
        <Card className="space-y-2">
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Original intake</p>
          <p className="font-medium text-text">{workspace.intake.business_name}</p>
          <p className="text-sm text-text-muted">{workspace.intake.submission_number}</p>
          <p className="text-sm text-text">{workspace.intake.business_description}</p>
        </Card>
      ) : null}

      <Card className="space-y-4">
        <h2 className="font-display text-xl">Project timeline</h2>
        <ProjectUpdateThread updates={workspace.updates} />
        <ProjectUpdateComposer apiBase={apiBase} onPosted={() => void load()} />
      </Card>

      <Card className="space-y-4">
        <h2 className="font-display text-xl">Shared assets & references</h2>
        <ProjectAssetList
          projectId={projectId}
          assets={workspace.assets}
          apiAssetsBase={`${apiBase}/assets`}
          onChanged={() => void load()}
        />
        <ProjectAssetComposer apiAssetsBase={`${apiBase}/assets`} onPosted={() => void load()} />
      </Card>
    </div>
  );
}
