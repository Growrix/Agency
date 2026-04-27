"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Badge } from "@/components/primitives/Badge";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { WHATSAPP_HREF } from "@/lib/nav";

export default function LiveChatPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [message, setMessage] = useState("Could not start live chat.");

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("Could not start live chat.");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/v1/chat/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = (await response.json().catch(() => null)) as { data?: { session_id?: string }; error?: { message?: string } } | null;
      if (!response.ok) {
        setMessage(payload?.error?.message ?? "Could not start live chat.");
        setStatus("error");
        return;
      }

      setSessionId(payload?.data?.session_id ?? null);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section className="py-16 sm:py-24">
      <Container width="content">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr] lg:items-start">
          <div>
            <Badge tone="primary" dot>Live chat</Badge>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl tracking-tight text-balance">
              Start a real support handoff.
            </h1>
            <p className="mt-6 text-lg leading-7 text-text-muted">
              This route creates a tracked live-chat request in the backend so the team can follow up with the right context. For urgent conversations, WhatsApp is still the fastest path.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href={WHATSAPP_HREF} size="lg">Open WhatsApp</LinkButton>
              <LinkButton href="/contact" variant="outline" size="lg">Send a written brief</LinkButton>
            </div>
          </div>

          <Card>
            {status === "success" ? (
              <div>
                <h2 className="font-display text-3xl tracking-tight">Request queued.</h2>
                <p className="mt-4 text-sm leading-6 text-text-muted">
                  {sessionId ? `Live chat session ${sessionId} has been recorded.` : "Your request has been recorded."} Continue on WhatsApp if you need an immediate response.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button type="button" onClick={() => { setStatus("idle"); setSessionId(null); }}>Start another request</Button>
                  <LinkButton href={WHATSAPP_HREF} variant="outline">Escalate now</LinkButton>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4" aria-busy={status === "submitting"}>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Queue request</p>
                  <h2 className="mt-2 font-display text-3xl tracking-tight">Tell us what this conversation is about.</h2>
                </div>
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Topic *</span>
                  <input name="topic" required className="signal-input mt-1.5" placeholder="New project, support, pricing, or delivery question" />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Context</span>
                  <textarea name="context" rows={4} className="signal-input mt-1.5 min-h-28 resize-y py-3" placeholder="What happened, what you need, and how urgent it is." />
                </label>
                {status === "error" ? <p className="text-sm text-destructive">{message}</p> : null}
                <Button type="submit" disabled={!isHydrated || status === "submitting"}>
                  {status === "submitting" ? "Queuing..." : "Start live chat"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </Container>
    </Section>
  );
}