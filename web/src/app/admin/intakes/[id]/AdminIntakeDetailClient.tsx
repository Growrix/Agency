"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AdminPage, AdminPageAlert, AdminPageHeader } from "@/components/admin/AdminPage";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { resolveAdminSectionMeta } from "@/lib/admin-nav";

const PAGE_META = resolveAdminSectionMeta("/admin/intakes/");

type IntakeDetail = {
  id: string;
  submission_number: string;
  client_name: string;
  client_email: string;
  business_name: string;
  industry?: string;
  target_audience?: string;
  brand_voice?: string;
  business_description: string;
  goals: string[];
  competitors: string[];
  reference_sites: Array<{ url: string; note?: string }>;
  drive_links: Array<{ url: string; label?: string; type: string }>;
  uploaded_files: Array<{ file_name: string; storage_path: string }>;
  budget_range?: string;
  timeline?: string;
  must_have_features: string[];
  is_free_demo: boolean;
  status: string;
  project_id?: string;
  created_at: string;
};

export function AdminIntakeDetailClient() {
  const params = useParams<{ id: string }>();
  const intakeId = params?.id ?? "";
  const [intake, setIntake] = useState<IntakeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/v1/admin/intakes/${intakeId}`, { credentials: "same-origin" });
      const payload = (await response.json().catch(() => null)) as {
        data?: IntakeDetail;
        error?: { message?: string };
      } | null;
      if (!response.ok || !payload?.data) {
        throw new Error(payload?.error?.message ?? "Unable to load intake.");
      }
      setIntake(payload.data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load intake.");
    } finally {
      setLoading(false);
    }
  }, [intakeId]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  async function convertToProject() {
    setConverting(true);
    setError(null);
    try {
      const response = await fetch(`/api/v1/admin/intakes/${intakeId}/convert`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const payload = (await response.json().catch(() => null)) as {
        data?: { project?: { id: string } };
        error?: { message?: string };
      } | null;
      if (!response.ok || !payload?.data?.project?.id) {
        throw new Error(payload?.error?.message ?? "Unable to convert intake.");
      }
      window.location.assign(`/admin/projects/${payload.data.project.id}`);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to convert intake.");
    } finally {
      setConverting(false);
    }
  }

  if (loading) {
    return (
      <AdminPage>
        <AdminPageHeader eyebrow={PAGE_META.eyebrow} title={PAGE_META.title} />
        <p className="text-sm text-text-muted">Loading intake…</p>
      </AdminPage>
    );
  }

  if (error || !intake) {
    return (
      <AdminPage>
        <AdminPageHeader eyebrow={PAGE_META.eyebrow} title={PAGE_META.title} />
        <AdminPageAlert tone="error">{error ?? "Intake not found."}</AdminPageAlert>
        <LinkButton href="/admin/intakes" variant="outline" size="sm">
          Back to intakes
        </LinkButton>
      </AdminPage>
    );
  }

  return (
    <AdminPage>
      <AdminPageHeader
        eyebrow={PAGE_META.eyebrow}
        title={intake.business_name}
        description={`${intake.submission_number} · ${intake.client_name} · ${intake.client_email}`}
        actions={
          <>
            <LinkButton href="/admin/intakes" variant="ghost" size="sm">
              ← All intakes
            </LinkButton>
            {intake.project_id ? (
              <LinkButton href={`/admin/projects/${intake.project_id}`} size="sm">
                Open project
              </LinkButton>
            ) : (
              <Button type="button" size="sm" disabled={converting} onClick={() => void convertToProject()}>
                {converting ? "Creating…" : "Convert to project"}
              </Button>
            )}
          </>
        }
      />

      <Card className="space-y-3">
        <p className="text-sm text-text">{intake.business_description}</p>
        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-text-muted">Industry</dt>
            <dd>{intake.industry ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-text-muted">Audience</dt>
            <dd>{intake.target_audience ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-text-muted">Brand voice</dt>
            <dd>{intake.brand_voice ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-text-muted">Budget / timeline</dt>
            <dd>
              {intake.budget_range ?? "—"} · {intake.timeline ?? "—"}
            </dd>
          </div>
        </dl>
        {intake.goals.length > 0 ? (
          <p className="text-sm">
            <strong>Goals:</strong> {intake.goals.join(", ")}
          </p>
        ) : null}
        {intake.reference_sites.length > 0 ? (
          <ul className="space-y-1 text-sm">
            <li className="font-medium">Reference sites</li>
            {intake.reference_sites.map((site) => (
              <li key={site.url}>
                <Link href={site.url} className="text-primary underline" target="_blank" rel="noreferrer">
                  {site.url}
                </Link>
                {site.note ? ` — ${site.note}` : ""}
              </li>
            ))}
          </ul>
        ) : null}
        {intake.drive_links.length > 0 ? (
          <ul className="space-y-1 text-sm">
            <li className="font-medium">Drive links</li>
            {intake.drive_links.map((link) => (
              <li key={link.url}>
                <Link href={link.url} className="text-primary underline" target="_blank" rel="noreferrer">
                  {link.label ?? link.url}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        {intake.uploaded_files.length > 0 ? (
          <p className="text-sm">
            <strong>Files:</strong> {intake.uploaded_files.map((file) => file.file_name).join(", ")}
          </p>
        ) : null}
      </Card>
    </AdminPage>
  );
}
