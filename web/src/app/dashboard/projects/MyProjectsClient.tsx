"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/primitives/Card";
import { DASHBOARD_EMPTY_TITLE_CLASS } from "@/lib/dashboard-typography";
import { cn } from "@/lib/utils";

type ProjectItem = {
  id: string;
  project_number: string;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type IntakeItem = {
  id: string;
  submission_number: string;
  business_name: string;
  status: string;
  project_id?: string | null;
  created_at: string;
  updated_at: string;
};

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function statusBadgeClass(status: string) {
  switch (status) {
    case "in_progress":
      return "bg-primary/15 text-primary";
    case "review":
      return "bg-warning/15 text-warning";
    case "delivered":
      return "bg-success/15 text-success";
    default:
      return "bg-inset/40 text-text-muted";
  }
}

export function MyProjectsClient() {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [pendingIntakes, setPendingIntakes] = useState<IntakeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [projectsResponse, intakesResponse] = await Promise.all([
        fetch("/api/v1/me/projects", { credentials: "same-origin" }),
        fetch("/api/v1/me/intakes", { credentials: "same-origin" }),
      ]);
      const projectsPayload = (await projectsResponse.json().catch(() => null)) as {
        data?: { items?: ProjectItem[] };
        error?: { message?: string };
      } | null;
      const intakesPayload = (await intakesResponse.json().catch(() => null)) as {
        data?: { items?: IntakeItem[] };
        error?: { message?: string };
      } | null;
      if (!projectsResponse.ok) {
        throw new Error(projectsPayload?.error?.message ?? "Unable to load projects.");
      }
      const projects = projectsPayload?.data?.items ?? [];
      setItems(projects);
      const intakes = intakesPayload?.data?.items ?? [];
      setPendingIntakes(
        intakes.filter((intake) => !intake.project_id && intake.status !== "project_created"),
      );
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load projects.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Project workspace</p>
        <h1 className="mt-1 font-display text-3xl tracking-tight">My projects</h1>
        <p className="mt-1 text-sm text-text-muted">
          Track your website build, share new references, and collaborate with the Growrix team. Free demo intake
          requests appear here after you submit from the homepage.
        </p>
      </header>

      {error ? (
        <Card>
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      ) : null}

      {pendingIntakes.length > 0 ? (
        <Card className="overflow-hidden p-0">
          <div className="border-b border-border/60 bg-inset/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-text-muted">
            Pending requests ({pendingIntakes.length})
          </div>
          <ul className="divide-y divide-border/60">
            {pendingIntakes.map((intake) => (
              <li key={intake.id} className="px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-text">{intake.business_name}</p>
                  <span className="rounded-sm bg-warning/15 px-2 py-0.5 text-xs text-warning">
                    {intake.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-muted">{intake.submission_number}</p>
                <p className="mt-1 text-xs text-text-muted">Submitted {formatDateTime(intake.created_at)}</p>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      <Card className="overflow-hidden p-0">
        <div className="border-b border-border/60 bg-inset/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-text-muted">
          {loading ? "Loading projects…" : `${items.length} project${items.length === 1 ? "" : "s"}`}
        </div>
        <ul className="divide-y divide-border/60">
          {items.map((item) => (
            <li key={item.id}>
              <Link href={`/dashboard/projects/${item.id}`} className="block px-4 py-4 transition-colors hover:bg-inset/20">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-text">{item.title}</p>
                  <span className={`rounded-sm px-2 py-0.5 text-xs ${statusBadgeClass(item.status)}`}>
                    {item.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-muted">{item.project_number}</p>
                <p className="mt-1 text-xs text-text-muted">Updated {formatDateTime(item.updated_at)}</p>
              </Link>
            </li>
          ))}
          {!loading && items.length === 0 && pendingIntakes.length === 0 ? (
            <li className="px-4 py-10 text-center">
              <p className={cn(DASHBOARD_EMPTY_TITLE_CLASS, "mt-2")}>No projects yet</p>
              <p className="mt-2 text-sm text-text-muted">
                Submit a free demo request from the homepage to start your first project workspace.
              </p>
            </li>
          ) : null}
        </ul>
      </Card>
    </div>
  );
}
