"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  ClockIcon,
  DocumentTextIcon,
  FolderIcon,
  LinkIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { DashboardHeroBand } from "@/components/dashboard/DashboardHeroBand";
import { ProjectAssetComposer, ProjectAssetList } from "@/components/dashboard/ProjectAssetList";
import { ProjectUpdateComposer, ProjectUpdateThread } from "@/components/dashboard/ProjectUpdateThread";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import {
  DASHBOARD_CARD_META_CLASS,
  DASHBOARD_CARD_TITLE_CLASS,
  DASHBOARD_EMPTY_TITLE_CLASS,
  DASHBOARD_EYEBROW_CLASS,
  DASHBOARD_SECTION_HEADING_CLASS,
} from "@/lib/dashboard-typography";
import { cn } from "@/lib/utils";

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

function projectStatusTone(status: string) {
  const state = status.toLowerCase();
  if (state === "delivered" || state === "completed" || state === "done") {
    return "border-primary/35 bg-primary/12 text-primary";
  }
  if (state === "cancelled" || state === "archived") {
    return "border-destructive/40 bg-destructive/10 text-destructive";
  }
  return "border-warning/40 bg-warning/12 text-warning";
}

function formatShortDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime())
    ? value
    : parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

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
    return (
      <div className="space-y-4 p-4 sm:p-5 lg:p-6">
        <Card className="dashboard-panel-surface rounded-sm border-border/65" hoverable={false}>
          <p className="text-sm text-text-muted">Loading project workspace…</p>
        </Card>
      </div>
    );
  }

  if (error || !workspace) {
    return (
      <div className="space-y-4 p-4 sm:p-5 lg:p-6">
        <Card className="dashboard-panel-surface rounded-sm border-border/65" hoverable={false}>
          <p className={DASHBOARD_EMPTY_TITLE_CLASS}>Unable to open project</p>
          <p className="mt-2 text-sm text-destructive">{error ?? "Project not found."}</p>
          <LinkButton href={backHref} variant="outline" size="sm" className="mt-5">
            <ArrowLeftIcon className="mr-1 size-4" />
            Back to projects
          </LinkButton>
        </Card>
      </div>
    );
  }

  const statusLabel = workspace.project.status.replace(/_/g, " ");

  return (
    <div className="space-y-4 p-4 sm:p-5 lg:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <LinkButton href={backHref} variant="outline" size="sm" className="shrink-0">
          <ArrowLeftIcon className="mr-1 size-4" />
          Back to projects
        </LinkButton>
        <span
          className={cn(
            "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize",
            projectStatusTone(workspace.project.status),
          )}
        >
          {statusLabel}
        </span>
      </div>

      <DashboardHeroBand
        eyebrow="Projects"
        title={workspace.project.title}
        description={`${workspace.project.project_number} · Collaborate with the Growrix team on updates, references, and delivery.`}
        stats={[
          {
            label: "Status",
            value: statusLabel,
            icon: <ShieldCheckIcon className="size-5" />,
          },
          {
            label: "Updates",
            value: workspace.updates.length,
            icon: <DocumentTextIcon className="size-5" />,
          },
          {
            label: "Assets",
            value: workspace.assets.length,
            icon: <LinkIcon className="size-5" />,
          },
          {
            label: "Updated",
            value: formatShortDate(workspace.project.updated_at),
            icon: <ClockIcon className="size-5" />,
          },
        ]}
      />

      {mode === "admin" ? (
        <Card className="dashboard-panel-surface rounded-sm border-border/65 p-4 sm:p-5" hoverable={false}>
          <p className={DASHBOARD_EYEBROW_CLASS}>Admin controls</p>
          <h3 className={cn(DASHBOARD_SECTION_HEADING_CLASS, "mt-1")}>Update project status</h3>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <select
              className="signal-input max-w-xs"
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
        </Card>
      ) : null}

      {workspace.intake ? (
        <Card className="dashboard-panel-surface rounded-sm border-border/65 p-4 sm:p-5" hoverable={false}>
          <div className="flex items-start gap-3">
            <span className="dashboard-record-icon shrink-0">
              <FolderIcon className="size-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className={DASHBOARD_EYEBROW_CLASS}>Original intake</p>
              <p className={cn(DASHBOARD_CARD_TITLE_CLASS, "mt-1")}>{workspace.intake.business_name}</p>
              <p className={cn(DASHBOARD_CARD_META_CLASS, "mt-0.5")}>{workspace.intake.submission_number}</p>
              <p className="mt-3 text-sm leading-6 text-text">{workspace.intake.business_description}</p>
            </div>
          </div>
        </Card>
      ) : null}

      <Card className="dashboard-panel-surface rounded-sm border-border/65 p-4 sm:p-5" hoverable={false}>
        <h2 className={DASHBOARD_SECTION_HEADING_CLASS}>Project timeline</h2>
        <p className="mt-1 text-sm text-text-muted">Notes and instructions shared between you and the Growrix team.</p>
        <div className="mt-4 space-y-4">
          <ProjectUpdateThread updates={workspace.updates} />
          <ProjectUpdateComposer apiBase={apiBase} onPosted={() => void load()} />
        </div>
      </Card>

      <Card className="dashboard-panel-surface rounded-sm border-border/65 p-4 sm:p-5" hoverable={false}>
        <h2 className={DASHBOARD_SECTION_HEADING_CLASS}>Shared assets & references</h2>
        <p className="mt-1 text-sm text-text-muted">Reference sites, drive links, and files for this build.</p>
        <div className="mt-4 space-y-4">
          <ProjectAssetList
            projectId={projectId}
            assets={workspace.assets}
            apiAssetsBase={`${apiBase}/assets`}
            onChanged={() => void load()}
          />
          <ProjectAssetComposer apiAssetsBase={`${apiBase}/assets`} onPosted={() => void load()} />
        </div>
      </Card>
    </div>
  );
}
