"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/primitives/Badge";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";

type DashboardSummary = {
  totals: {
    inquiries: number;
    appointments: number;
    orders: number;
    concierge_sessions: number;
  };
  latest_events: Array<{ id: string; event_name: string; created_at: string }>;
  latest_logs: Array<{ id: string; action: string; level: string; created_at: string }>;
};

export function AdminDashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch("/api/v1/admin/analytics", { credentials: "same-origin" });
        if (!response.ok) {
          throw new Error("Could not load admin analytics.");
        }

        const payload = (await response.json()) as { data: DashboardSummary };
        if (active) {
          setSummary(payload.data);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Could not load admin analytics.");
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, []);

  const onLogout = async () => {
    await fetch("/api/v1/auth/logout", { method: "POST" });
    window.location.assign("/admin/login");
  };

  return (
    <Section className="py-12 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge tone="secondary" dot>Admin</Badge>
            <h1 className="mt-4 font-display text-4xl tracking-tight">Operational dashboard</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-text-muted">
              Protected summary of the persisted backend flows added in this release: inquiries, appointments, concierge sessions, and orders.
            </p>
          </div>
          <div className="flex gap-3">
            <LinkButton href="/contact" variant="outline">Public contact page</LinkButton>
            <Button type="button" onClick={onLogout}>Log out</Button>
          </div>
        </div>

        {error ? <p className="mt-8 text-sm text-destructive">{error}</p> : null}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Inquiries", value: summary?.totals.inquiries ?? 0 },
            { label: "Appointments", value: summary?.totals.appointments ?? 0 },
            { label: "Orders", value: summary?.totals.orders ?? 0 },
            { label: "Concierge sessions", value: summary?.totals.concierge_sessions ?? 0 },
          ].map((card) => (
            <Card key={card.label}>
              <p className="text-sm text-text-muted">{card.label}</p>
              <p className="mt-3 font-display text-4xl tracking-tight">{card.value}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="font-display text-2xl tracking-tight">Latest analytics events</h2>
            <div className="mt-5 space-y-3 text-sm text-text-muted">
              {summary?.latest_events.length ? summary.latest_events.map((event) => (
                <div key={event.id} className="rounded-[14px] border border-border bg-surface px-4 py-3">
                  <div className="font-medium text-text">{event.event_name}</div>
                  <div>{new Date(event.created_at).toLocaleString()}</div>
                </div>
              )) : <div className="rounded-[14px] border border-border bg-surface px-4 py-3">No analytics events yet.</div>}
            </div>
          </Card>

          <Card>
            <h2 className="font-display text-2xl tracking-tight">Latest audit entries</h2>
            <div className="mt-5 space-y-3 text-sm text-text-muted">
              {summary?.latest_logs.length ? summary.latest_logs.map((log) => (
                <div key={log.id} className="rounded-[14px] border border-border bg-surface px-4 py-3">
                  <div className="font-medium text-text">{log.action}</div>
                  <div>{log.level.toUpperCase()} · {new Date(log.created_at).toLocaleString()}</div>
                </div>
              )) : <div className="rounded-[14px] border border-border bg-surface px-4 py-3">No audit entries yet.</div>}
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
