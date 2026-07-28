"use client";

import { useState } from "react";
import { Button } from "@/components/primitives/Button";
import { DASHBOARD_CARD_META_CLASS } from "@/lib/dashboard-typography";
import { cn } from "@/lib/utils";

type Update = {
  id: string;
  author_role: "client" | "admin";
  kind: string;
  body?: string;
  reference_url?: string;
  created_at: string;
};

type Props = {
  updates: Update[];
};

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

export function ProjectUpdateThread({ updates }: Props) {
  if (updates.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-border/55 px-4 py-6 text-center">
        <p className="text-sm text-text-muted">No updates yet. Add a note or reference to get started.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2.5">
      {updates.map((update) => {
        const isTeam = update.author_role === "admin";
        return (
          <li
            key={update.id}
            className={cn(
              "rounded-sm border px-3.5 py-3",
              isTeam ? "border-primary/25 bg-primary/8" : "border-border/55 bg-surface/25",
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className={cn("text-sm font-semibold", isTeam ? "text-primary" : "text-text")}>
                  {isTeam ? "Growrix team" : "You"}
                </span>
                <span className="inline-flex rounded-full border border-border/60 bg-surface/40 px-2 py-0.5 text-[11px] font-medium capitalize text-text-muted">
                  {update.kind.replace(/_/g, " ")}
                </span>
              </div>
              <span className={DASHBOARD_CARD_META_CLASS}>{formatDateTime(update.created_at)}</span>
            </div>
            {update.body ? <p className="mt-2 text-sm leading-6 text-text whitespace-pre-wrap">{update.body}</p> : null}
            {update.reference_url ? (
              <a
                href={update.reference_url}
                className="mt-2 inline-block text-sm text-primary underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {update.reference_url}
              </a>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function ProjectUpdateComposer({
  apiBase,
  onPosted,
}: {
  apiBase: string;
  onPosted: () => void;
}) {
  const [body, setBody] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");
  const [kind, setKind] = useState<"note" | "instruction" | "reference">("note");
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setWorking(true);
    setError(null);
    try {
      const response = await fetch(`${apiBase}/updates`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, body, reference_url: referenceUrl || undefined }),
      });
      const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
      if (!response.ok) {
        throw new Error(payload?.error?.message ?? "Unable to post update.");
      }
      setBody("");
      setReferenceUrl("");
      onPosted();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to post update.");
    } finally {
      setWorking(false);
    }
  }

  return (
    <form
      className="space-y-3 rounded-sm border border-border/55 bg-surface/25 p-3.5 sm:p-4"
      onSubmit={(event) => void handleSubmit(event)}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Add update</p>
      <select className="signal-input" value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}>
        <option value="note">Note</option>
        <option value="instruction">Instruction</option>
        <option value="reference">Reference link</option>
      </select>
      <textarea
        className="signal-input min-h-24 resize-y"
        placeholder="Share new instructions, context, or feedback"
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />
      <input
        className="signal-input"
        placeholder="Optional reference URL"
        value={referenceUrl}
        onChange={(event) => setReferenceUrl(event.target.value)}
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button type="submit" size="sm" disabled={working}>
        {working ? "Posting…" : "Post update"}
      </Button>
    </form>
  );
}
