"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

type SubmissionNote = {
  id: string;
  author_role: string;
  body: string;
  created_at: string;
};

type SubmissionDetail = {
  type: string;
  record: Record<string, unknown>;
  notes: SubmissionNote[];
};

const REPLY_TYPES = new Set(["service_request", "support_thread"]);

function formatDateTime(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function pickSummary(detail: SubmissionDetail) {
  const r = detail.record as Record<string, unknown>;
  if (detail.type === "inquiry") {
    return [r.subject, r.message].filter(Boolean).join(" — ") as string;
  }
  if (detail.type === "appointment") {
    return [r.service_interested_in, r.preferred_datetime].filter(Boolean).join(" @ ") as string;
  }
  if (detail.type === "service_request") {
    return ((r.brief as string) ?? "") || ((r.request_number as string) ?? "");
  }
  if (detail.type === "order") {
    return (r.order_number as string) ?? "";
  }
  return "";
}

export function MySubmissionDetailClient({ type, id }: { type: string; id: string }) {
  const [detail, setDetail] = useState<SubmissionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [replyState, setReplyState] = useState<"idle" | "submitting">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/v1/me/submissions/${type}/${id}`, {
        credentials: "same-origin",
      });
      const payload = (await response.json().catch(() => null)) as
        | { data?: SubmissionDetail; error?: { message?: string } }
        | null;
      if (!response.ok || !payload?.data) {
        setError(payload?.error?.message ?? "Unable to load submission.");
        return;
      }
      setDetail(payload.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load submission.");
    } finally {
      setLoading(false);
    }
  }, [type, id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchDetail();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchDetail]);

  async function handleReplySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reply.trim()) return;
    setReplyState("submitting");
    setFeedback(null);
    try {
      const response = await fetch(`/api/v1/me/submissions/${type}/${id}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ body: reply }),
      });
      const payload = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
      if (!response.ok) {
        setFeedback(payload?.error?.message ?? "Could not send reply.");
        return;
      }
      setReply("");
      await fetchDetail();
    } finally {
      setReplyState("idle");
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-5 lg:p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-text-muted">{type}</p>
          <h1 className="mt-1 font-display text-2xl tracking-tight">Submission detail</h1>
        </div>
        <LinkButton href="/dashboard/submissions" variant="outline" size="sm">
          Back to submissions
        </LinkButton>
      </header>

      {loading ? (
        <Card>
          <p className="text-sm text-text-muted">Loading...</p>
        </Card>
      ) : null}

      {error ? (
        <Card>
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      ) : null}

      {detail ? (
        <div className="space-y-5">
          <Card>
            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Your submission</p>
            <p className="mt-2 text-sm leading-6 text-text">{pickSummary(detail) || "(no details)"}</p>
            <p className="mt-3 text-xs text-text-muted">
              Submitted: {formatDateTime((detail.record.created_at as string) ?? "")}
            </p>
          </Card>

          <Card>
            <p className="text-xs uppercase tracking-[0.18em] text-text-muted">Conversation</p>
            <ul className="mt-3 space-y-2">
              {detail.notes.map((note) => (
                <li
                  key={note.id}
                  className="rounded-sm border border-border/60 bg-inset/30 px-3 py-2 text-sm"
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-text-muted">
                    <span>
                      {note.author_role === "admin"
                        ? "Growrix team"
                        : note.author_role === "customer"
                          ? "You"
                          : "System"}
                    </span>
                    <span>{formatDateTime(note.created_at)}</span>
                  </div>
                  <p className="mt-1 whitespace-pre-wrap">{note.body}</p>
                </li>
              ))}
              {detail.notes.length === 0 ? (
                <li className="text-sm text-text-muted">
                  No messages yet. The team will respond here if there are updates.
                </li>
              ) : null}
            </ul>

            {REPLY_TYPES.has(type) ? (
              <form onSubmit={handleReplySubmit} className="mt-4 space-y-2">
                <textarea
                  className="signal-input min-h-24"
                  rows={4}
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                  placeholder="Type a reply..."
                  required
                />
                {feedback ? <p className="text-xs text-destructive">{feedback}</p> : null}
                <Button type="submit" size="sm" disabled={replyState === "submitting" || !reply.trim()}>
                  {replyState === "submitting" ? "Sending..." : "Send reply"}
                </Button>
              </form>
            ) : (
              <p className="mt-4 text-xs text-text-muted">
                Replies on this submission type aren&apos;t supported. Use the Support page or contact form
                if you need to follow up.
              </p>
            )}
          </Card>
        </div>
      ) : null}
    </div>
  );
}
