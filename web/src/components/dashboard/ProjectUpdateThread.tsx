"use client";

import { useState } from "react";
import { Button } from "@/components/primitives/Button";

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
    return <p className="text-sm text-text-muted">No updates yet. Add a note or reference to get started.</p>;
  }

  return (
    <ul className="space-y-3">
      {updates.map((update) => (
        <li
          key={update.id}
          className={`rounded-md border px-4 py-3 ${
            update.author_role === "admin" ? "border-primary/30 bg-primary/5" : "border-border/60 bg-inset/20"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-text-muted">
            <span className="uppercase tracking-wide">{update.author_role === "admin" ? "Growrix team" : "You"}</span>
            <span>{formatDateTime(update.created_at)}</span>
          </div>
          {update.body ? <p className="mt-2 text-sm text-text">{update.body}</p> : null}
          {update.reference_url ? (
            <a href={update.reference_url} className="mt-2 inline-block text-sm text-primary underline" target="_blank" rel="noreferrer">
              {update.reference_url}
            </a>
          ) : null}
          <p className="mt-1 text-xs text-text-muted">{update.kind.replace(/_/g, " ")}</p>
        </li>
      ))}
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
    <form className="space-y-3 rounded-md border border-border/60 bg-surface p-4" onSubmit={(event) => void handleSubmit(event)}>
      <p className="text-sm font-medium text-text">Add update</p>
      <select className="signal-input" value={kind} onChange={(event) => setKind(event.target.value as typeof kind)}>
        <option value="note">Note</option>
        <option value="instruction">Instruction</option>
        <option value="reference">Reference link</option>
      </select>
      <textarea
        className="signal-input min-h-24"
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
