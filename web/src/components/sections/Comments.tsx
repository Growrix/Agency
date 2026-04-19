"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import type { BlogComment } from "@/lib/content";
import { formatBlogDate } from "@/lib/content";

type Reply = NonNullable<BlogComment["replies"]>[number];

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "·";
}

function CommentItem({
  comment,
  onReply,
  pendingReplyId,
  setPendingReplyId,
}: {
  comment: BlogComment;
  onReply: (parentId: string, body: string, name: string) => void;
  pendingReplyId: string | null;
  setPendingReplyId: (id: string | null) => void;
}) {
  const [replyName, setReplyName] = useState("");
  const [replyBody, setReplyBody] = useState("");

  function submitReply(e: FormEvent) {
    e.preventDefault();
    if (!replyName.trim() || !replyBody.trim()) return;
    onReply(comment.id, replyBody.trim(), replyName.trim());
    setReplyName("");
    setReplyBody("");
    setPendingReplyId(null);
  }

  const open = pendingReplyId === comment.id;

  return (
    <li className="rounded-[16px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <div className="flex items-start gap-3">
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-inset)] font-mono text-[11px] font-semibold">
          {comment.initials}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <span className="font-medium text-sm">{comment.author}</span>
            <span className="font-mono text-[11px] text-[var(--color-text-muted)]">
              {formatBlogDate(comment.postedAt)}
            </span>
          </div>
          <p className="mt-2 text-[15px] leading-6 text-[var(--color-text)]">{comment.body}</p>
          <button
            onClick={() => setPendingReplyId(open ? null : comment.id)}
            className="mt-3 text-xs font-medium text-[var(--color-primary)] hover:underline"
          >
            {open ? "Cancel" : "Reply"}
          </button>
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <ul className="mt-4 space-y-3 border-l border-[var(--color-border)] pl-4 ml-12">
          {comment.replies.map((r) => (
            <li key={r.id} className="flex items-start gap-3">
              <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-inset)] font-mono text-[10px] font-semibold">
                {r.initials}
              </span>
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="font-medium text-sm">{r.author}</span>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
                    {formatBlogDate(r.postedAt)}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-6 text-[var(--color-text)]">{r.body}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {open && (
        <form onSubmit={submitReply} className="mt-4 ml-12 space-y-2">
          <input
            type="text"
            placeholder="Your name"
            aria-label="Your name"
            value={replyName}
            onChange={(e) => setReplyName(e.target.value)}
            className="w-full rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)]"
            required
          />
          <textarea
            placeholder="Write a reply…"
            aria-label="Reply text"
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
            rows={2}
            className="w-full resize-none rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary)]"
            required
          />
          <Button type="submit" size="sm">Post reply</Button>
        </form>
      )}
    </li>
  );
}

export function Comments({ initial }: { initial: BlogComment[] }) {
  const [comments, setComments] = useState<BlogComment[]>(initial);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pendingReplyId, setPendingReplyId] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !body.trim()) return;
    const newComment: BlogComment = {
      id: `local-${Date.now()}`,
      author: name.trim(),
      initials: initialsOf(name),
      postedAt: new Date().toISOString().slice(0, 10),
      body: body.trim(),
    };
    setComments((c) => [newComment, ...c]);
    setName("");
    setEmail("");
    setBody("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2400);
  }

  function onReply(parentId: string, replyBody: string, replyName: string) {
    const reply: Reply = {
      id: `local-${Date.now()}`,
      author: replyName,
      initials: initialsOf(replyName),
      postedAt: new Date().toISOString().slice(0, 10),
      body: replyBody,
    };
    setComments((cs) =>
      cs.map((c) => (c.id === parentId ? { ...c, replies: [...(c.replies ?? []), reply] } : c))
    );
  }

  return (
    <section className="mt-16">
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-2xl tracking-tight">
          Discussion <span className="text-[var(--color-text-muted)] font-normal">({comments.length})</span>
        </h2>
        <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
          Be kind. Be specific.
        </span>
      </div>

      <Card className="mt-6">
        <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            required
            placeholder="Your name"
            aria-label="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-primary)]"
          />
          <input
            type="email"
            required
            placeholder="you@studio.com"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-primary)]"
          />
          <textarea
            required
            placeholder="Add to the discussion…"
            aria-label="Comment"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            className="sm:col-span-2 resize-none rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2.5 text-sm focus:outline-none focus:border-[var(--color-primary)]"
          />
          <div className="sm:col-span-2 flex items-center justify-between gap-3">
            <p className="text-xs text-[var(--color-text-muted)]">
              Email is never published. Comments load instantly in this preview.
            </p>
            <Button type="submit">Post comment</Button>
          </div>
          {submitted && (
            <p className="sm:col-span-2 rounded-[10px] bg-[var(--color-success)]/10 border border-[var(--color-success)]/25 px-3 py-2 text-sm text-[var(--color-success)]">
              Thanks — your comment is up.
            </p>
          )}
        </form>
      </Card>

      <ul className="mt-8 space-y-4">
        {comments.map((c) => (
          <CommentItem
            key={c.id}
            comment={c}
            onReply={onReply}
            pendingReplyId={pendingReplyId}
            setPendingReplyId={setPendingReplyId}
          />
        ))}
      </ul>
    </section>
  );
}
