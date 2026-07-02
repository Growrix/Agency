"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
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

  const typeDisplay = type.replace(/_/g, " ");

  return (
    <div className="space-y-4 p-4 sm:p-5 lg:p-6">

      {/* Hero */}
      <section className="dashboard-hero-surface relative overflow-hidden rounded-md border border-primary/25 p-6 lg:p-7">
        <div className="dashboard-hero-glow pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 lg:block" aria-hidden />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-primary">Submissions</p>
            <h1 className="mt-2 font-display text-4xl leading-tight tracking-tight capitalize">{typeDisplay} detail</h1>
            <p className="mt-2 text-base text-text-muted">View your submission and follow the conversation thread below.</p>
          </div>
          <LinkButton href="/dashboard/submissions" variant="outline" size="sm" className="shrink-0">
            <ArrowLeftIcon className="mr-1 size-4" />
            Back to submissions
          </LinkButton>
        </div>
      </section>

      {loading ? (
        <Card className="dashboard-panel-surface rounded-sm border-border/65" hoverable={false}>
          <p className="text-sm text-text-muted">Loading submission...</p>
        </Card>
      ) : null}

      {error ? (
        <Card className="dashboard-panel-surface rounded-sm border-border/65" hoverable={false}>
          <p className="text-sm text-destructive">{error}</p>
        </Card>
      ) : null}

      {detail ? (
        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">

          {/* Submission summary */}
          <Card className="dashboard-panel-surface rounded-sm border-border/65 p-5" hoverable={false}>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-sm border border-primary/25 bg-primary/12 text-primary">
                <ClipboardDocumentListIcon className="size-6" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-primary">Your submission</p>
                <p className="text-2xl font-semibold capitalize text-text">{typeDisplay}</p>
              </div>
            </div>
            <div className="mt-5 rounded-sm border border-border/55 bg-surface/25 px-4 py-4">
              <p className="text-base leading-7 text-text">{pickSummary(detail) || "(no details provided)"}</p>
            </div>
            <p className="mt-3 text-sm text-text-muted">
              Submitted: {formatDateTime((detail.record.created_at as string) ?? "")}
            </p>
          </Card>

          {/* Conversation thread */}
          <Card className="dashboard-panel-surface rounded-sm border-border/65 p-5" hoverable={false}>
            <div className="flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="size-5 text-primary" />
              <p className="text-xs uppercase tracking-[0.18em] text-primary">Conversation</p>
            </div>

            <ul className="mt-4 space-y-3">
              {detail.notes.map((note) => {
                const isTeam = note.author_role === "admin";
                return (
                  <li
                    key={note.id}
                    className={`rounded-sm border px-4 py-3 ${
                      isTeam
                        ? "border-primary/25 bg-primary/8"
                        : "border-border/55 bg-surface/25"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <UserCircleIcon className={`size-5 ${isTeam ? "text-primary" : "text-text-muted"}`} />
                        <span className={`text-sm font-semibold ${isTeam ? "text-primary" : "text-text"}`}>
                          {isTeam ? "Growrix team" : note.author_role === "customer" ? "You" : "System"}
                        </span>
                      </div>
                      <span className="text-sm text-text-muted">{formatDateTime(note.created_at)}</span>
                    </div>
                    <p className="mt-2 text-base leading-6 text-text whitespace-pre-wrap">{note.body}</p>
                  </li>
                );
              })}
              {detail.notes.length === 0 ? (
                <li className="rounded-sm border border-dashed border-border/55 px-4 py-6 text-center">
                  <p className="text-base text-text-muted">No messages yet.</p>
                  <p className="mt-1 text-sm text-text-muted">The team will reply here when there are updates.</p>
                </li>
              ) : null}
            </ul>

            {REPLY_TYPES.has(type) ? (
              <form onSubmit={handleReplySubmit} className="mt-5 space-y-3">
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.18em] text-text-muted">Your reply</span>
                  <textarea
                    className="signal-input mt-1.5 min-h-28 resize-y py-3"
                    rows={4}
                    value={reply}
                    onChange={(event) => setReply(event.target.value)}
                    placeholder="Type a reply to the team..."
                    required
                  />
                </label>
                {feedback ? <p className="text-sm text-destructive">{feedback}</p> : null}
                <Button type="submit" disabled={replyState === "submitting" || !reply.trim()}>
                  {replyState === "submitting" ? "Sending..." : "Send reply"}
                  <ArrowRightIcon className="ml-1 size-4" />
                </Button>
              </form>
            ) : (
              <p className="mt-5 text-sm text-text-muted">
                Replies aren&apos;t available for this submission type.
                Use the <a href="/dashboard/support" className="text-primary hover:underline">Support page</a> to follow up.
              </p>
            )}
          </Card>
        </div>
      ) : null}
    </div>
  );
}
