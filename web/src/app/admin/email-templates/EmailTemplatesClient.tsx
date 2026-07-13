"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

type OrderTemplate = {
  subject: string;
  text: string;
  html: string;
};

type TemplateEnvelope = {
  data?: {
    order_created: OrderTemplate;
    defaults: {
      order_created: OrderTemplate;
    };
    placeholders: string[];
  };
  error?: {
    message?: string;
  };
};

export function EmailTemplatesClient() {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");
  const [baseline, setBaseline] = useState<OrderTemplate | null>(null);
  const [defaults, setDefaults] = useState<OrderTemplate | null>(null);
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const loadTemplate = useCallback(async () => {
    setLoading(true);
    setError(null);
    setNotice(null);

    try {
      const response = await fetch("/api/v1/admin/email-templates", {
        credentials: "same-origin",
      });
      const payload = (await response.json().catch(() => null)) as TemplateEnvelope | null;

      if (!response.ok || !payload?.data) {
        throw new Error(payload?.error?.message ?? "Unable to load email templates.");
      }

      setSubject(payload.data.order_created.subject);
      setText(payload.data.order_created.text);
      setHtml(payload.data.order_created.html);
      setBaseline(payload.data.order_created);
      setDefaults(payload.data.defaults.order_created);
      setPlaceholders(payload.data.placeholders ?? []);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load email templates.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadTemplate();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadTemplate]);

  const hasUnsavedChanges = useMemo(() => {
    if (!baseline) return false;
    return (
      subject !== baseline.subject ||
      text !== baseline.text ||
      html !== baseline.html
    );
  }, [baseline, html, subject, text]);

  async function saveTemplate() {
    setSaving(true);
    setError(null);
    setNotice(null);

    try {
      const response = await fetch("/api/v1/admin/email-templates", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          order_created: {
            subject,
            text,
            html,
          },
        }),
      });

      const payload = (await response.json().catch(() => null)) as TemplateEnvelope | null;
      if (!response.ok || !payload?.data?.order_created) {
        throw new Error(payload?.error?.message ?? "Unable to save email template.");
      }

      setNotice("Order notification template saved.");
      await loadTemplate();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save email template.");
    } finally {
      setSaving(false);
    }
  }

  function resetToDefaults() {
    if (!defaults) return;
    setSubject(defaults.subject);
    setText(defaults.text);
    setHtml(defaults.html);
    setNotice("Template reset to defaults. Save to apply.");
  }

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-12">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Admin</p>
          <h1 className="mt-1 font-display text-3xl tracking-tight">Order email templates</h1>
          <p className="mt-2 text-sm text-text-muted">
            Customize the team notification sent for every new order. Placeholders in double curly braces
            are replaced automatically.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <LinkButton href="/admin/email-log" variant="outline" size="sm">
            View email log
          </LinkButton>
          <Button type="button" variant="outline" size="sm" onClick={() => void loadTemplate()}>
            Refresh
          </Button>
        </div>
      </header>

      {error ? (
        <Card>
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        </Card>
      ) : null}

      {notice ? (
        <Card>
          <p className="text-sm text-primary">{notice}</p>
        </Card>
      ) : null}

      {loading ? (
        <Card>
          <p className="text-sm text-text-muted">Loading template settings...</p>
        </Card>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <Card className="space-y-4">
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Subject</span>
              <input
                type="text"
                className="signal-input mt-1"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="New order created: {{order_number}}"
              />
            </label>

            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Text body</span>
              <textarea
                rows={12}
                className="signal-input mt-1 min-h-44"
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            </label>

            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">HTML body</span>
              <textarea
                rows={12}
                className="signal-input mt-1 min-h-44"
                value={html}
                onChange={(event) => setHtml(event.target.value)}
              />
            </label>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/55 pt-3">
              <Button type="button" variant="outline" size="sm" onClick={resetToDefaults}>
                Reset to defaults
              </Button>
              <Button
                type="button"
                size="sm"
                disabled={saving || !hasUnsavedChanges}
                onClick={() => void saveTemplate()}
              >
                {saving ? "Saving..." : "Save template"}
              </Button>
            </div>
          </Card>

          <Card>
            <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Available placeholders</p>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              {placeholders.map((placeholder) => (
                <li key={placeholder} className="rounded-sm border border-border/55 bg-inset/20 px-3 py-1.5">
                  {"{{"}
                  {placeholder}
                  {"}}"}
                </li>
              ))}
              {placeholders.length === 0 ? <li>No placeholders available.</li> : null}
            </ul>
          </Card>
        </div>
      )}
    </main>
  );
}
