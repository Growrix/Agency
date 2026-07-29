"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AdminPage, AdminPageAlert, AdminPageHeader } from "@/components/admin/AdminPage";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { resolveAdminSectionMeta } from "@/lib/admin-nav";

const PAGE_META = resolveAdminSectionMeta("/admin/intakes");

type IntakeItem = {
  id: string;
  submission_number: string;
  client_name: string;
  client_email: string;
  business_name: string;
  status: string;
  is_free_demo: boolean;
  created_at: string;
  project_id?: string;
};

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export function AdminIntakesClient() {
  const [items, setItems] = useState<IntakeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/v1/admin/intakes", { credentials: "same-origin" });
      const payload = (await response.json().catch(() => null)) as {
        data?: { items?: IntakeItem[] };
        error?: { message?: string };
      } | null;
      if (!response.ok) {
        throw new Error(payload?.error?.message ?? "Unable to load intakes.");
      }
      setItems(payload?.data?.items ?? []);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load intakes.");
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
          <span>{loading ? "Loading…" : `${items.length} intakes`}</span>
          <Button type="button" size="sm" variant="outline" onClick={() => void load()}>
            Refresh
          </Button>
        </div>
        <ul className="divide-y divide-border/60">
          {items.map((item) => (
            <li key={item.id}>
              <Link href={`/admin/intakes/${item.id}`} className="block px-4 py-3 transition-colors hover:bg-inset/20">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-text">{item.business_name}</p>
                  <span className="text-xs text-text-muted">{formatDateTime(item.created_at)}</span>
                </div>
                <div className="mt-1 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-sm bg-inset/40 px-2 py-0.5 text-text-muted">{item.submission_number}</span>
                  {item.is_free_demo ? (
                    <span className="rounded-sm bg-primary/15 px-2 py-0.5 text-primary">Free demo</span>
                  ) : null}
                  <span className="rounded-sm bg-inset/40 px-2 py-0.5 text-text-muted">{item.status}</span>
                </div>
                <p className="mt-1 text-sm text-text-muted">
                  {item.client_name} · {item.client_email}
                </p>
              </Link>
            </li>
          ))}
          {!loading && items.length === 0 ? (
            <li className="px-4 py-6 text-sm text-text-muted">No intakes yet.</li>
          ) : null}
        </ul>
      </Card>
    </AdminPage>
  );
}
