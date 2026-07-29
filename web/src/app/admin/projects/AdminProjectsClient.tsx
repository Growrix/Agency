"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AdminPage, AdminPageAlert, AdminPageHeader } from "@/components/admin/AdminPage";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { resolveAdminSectionMeta } from "@/lib/admin-nav";

const PAGE_META = resolveAdminSectionMeta("/admin/projects");

type ProjectItem = {
  id: string;
  project_number: string;
  title: string;
  status: string;
  client_user_id: string;
  created_at: string;
  updated_at: string;
};

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export function AdminProjectsClient() {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/v1/admin/projects", { credentials: "same-origin" });
      const payload = (await response.json().catch(() => null)) as {
        data?: { items?: ProjectItem[] };
        error?: { message?: string };
      } | null;
      if (!response.ok) {
        throw new Error(payload?.error?.message ?? "Unable to load projects.");
      }
      setItems(payload?.data?.items ?? []);
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
    <AdminPage>
      <AdminPageHeader
        eyebrow={PAGE_META.eyebrow}
        title={PAGE_META.title}
        description={PAGE_META.description}
      />

      {error ? <AdminPageAlert tone="error">{error}</AdminPageAlert> : null}

      <Card className="overflow-hidden p-0">
        <div className="flex items-center justify-between border-b border-border/60 bg-inset/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-text-muted">
          <span>{loading ? "Loading…" : `${items.length} projects`}</span>
          <Button type="button" size="sm" variant="outline" onClick={() => void load()}>
            Refresh
          </Button>
        </div>
        <ul className="divide-y divide-border/60">
          {items.map((item) => (
            <li key={item.id}>
              <Link href={`/admin/projects/${item.id}`} className="block px-4 py-3 transition-colors hover:bg-inset/20">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-text">{item.title}</p>
                  <span className="text-xs text-text-muted">{formatDateTime(item.updated_at)}</span>
                </div>
                <p className="mt-1 text-sm text-text-muted">
                  {item.project_number} · {item.status.replace(/_/g, " ")}
                </p>
              </Link>
            </li>
          ))}
          {!loading && items.length === 0 ? (
            <li className="px-4 py-6 text-sm text-text-muted">No projects yet. Convert an intake to create one.</li>
          ) : null}
        </ul>
      </Card>
    </AdminPage>
  );
}
