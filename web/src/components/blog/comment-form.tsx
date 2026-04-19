"use client";

import { Button } from "@/components/ui/button";
import { startTransition, useState, type FormEvent } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

const initialFormState: FormState = {
  name: "",
  email: "",
  message: "",
};

export function BlogCommentForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
    setSubmitted(false);
    setError(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Complete all fields before submitting your comment.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }

    setPending(true);

    startTransition(() => {
      setForm(initialFormState);
      setSubmitted(true);
      setPending(false);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Name</span>
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="h-11 w-full rounded-md border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="h-11 w-full rounded-md border border-border bg-background px-4 text-sm outline-none transition-colors focus:border-primary"
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Comment</span>
        <textarea
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="min-h-32 w-full rounded-md border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
          placeholder="Share your perspective or ask a follow-up question."
        />
      </label>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted">
          Comments are moderated before publishing. This demo form shows the planned interaction flow.
        </p>
        <Button type="submit" loading={pending}>
          Post Comment
        </Button>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      {submitted ? (
        <p className="text-sm text-success">
          Comment received. It is queued for moderation and will appear after review.
        </p>
      ) : null}
    </form>
  );
}