"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowUpRightIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  ShieldCheckIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { WHATSAPP_HREF } from "@/lib/nav";
import { cn } from "@/lib/utils";

type SuggestedAction = {
  href: string;
  label: string;
};

type Source = {
  label: string;
  sourcePath: string;
  sourceType: string;
};

type ApiPayload = {
  answer: string;
  messageId: string;
  responseState: "answered" | "no_answer" | "escalation";
  sessionId: string;
  sources: Source[];
  suggestedActions: SuggestedAction[];
};

type Message = {
  id: string;
  role: "assistant" | "user";
  text: string;
  responseState?: ApiPayload["responseState"];
  sources?: Source[];
  suggestedActions?: SuggestedAction[];
};

const STARTER_PROMPTS = [
  "How fast can you launch a marketing site?",
  "What does a Product Partner engagement usually cost?",
  "Do you build MCP servers for internal tools?",
  "What should I book if I need a SaaS rebuild?",
];

const KNOWLEDGE_AREAS = [
  { title: "Services", detail: "SaaS apps, websites, MCP servers, and automation." },
  { title: "Pricing", detail: "Ranges, deposits, retainers, and shop pricing." },
  { title: "Proof", detail: "Portfolio outcomes and launch results already on the site." },
  { title: "Next steps", detail: "Book a call, use contact, or escalate to WhatsApp." },
];

const INITIAL_MESSAGE: Message = {
  id: "intro",
  role: "assistant",
  text:
    "Ask about services, pricing, timelines, products, or fit. I answer only from approved Growrix site content and will route you to a human when a verified answer is not available.",
};

type ConciergeExperienceProps = {
  initialPrompt?: string;
  mode?: "modal" | "page";
  onClose?: () => void;
};

export function ConciergeExperience({ initialPrompt, mode = "page", onClose }: ConciergeExperienceProps) {
  const pathname = usePathname();
  const seededPromptHandled = useRef<string | null>(null);
  const threadRef = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [pending, setPending] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>();

  const isModal = mode === "modal";

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, pending]);

  async function submitMessage(rawMessage: string) {
    const message = rawMessage.trim();
    if (!message || pending) {
      return;
    }

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: message,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setPending(true);

    try {
      const response = await fetch("/api/v1/ai-concierge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          pagePath: pathname || "/ai-concierge",
          sessionId,
        }),
      });

      const payload = (await response.json()) as
        | { success: true; data: ApiPayload }
        | { success: false; error?: { message?: string } };

      if (!response.ok || !payload.success) {
        throw new Error(payload.success ? "The concierge could not answer right now." : payload.error?.message || "The concierge could not answer right now.");
      }

      setSessionId(payload.data.sessionId);
      setMessages((current) => [
        ...current,
        {
          id: payload.data.messageId,
          role: "assistant",
          text: payload.data.answer,
          responseState: payload.data.responseState,
          sources: payload.data.sources,
          suggestedActions: payload.data.suggestedActions,
        },
      ]);
    } catch (error) {
      const messageText = error instanceof Error ? error.message : "The concierge could not answer right now.";
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: `${messageText} You can still use WhatsApp, contact, or booking to continue.`,
          responseState: "escalation",
          suggestedActions: [
            { label: "WhatsApp", href: WHATSAPP_HREF },
            { label: "Contact form", href: "/contact" },
            { label: "Book appointment", href: "/book-appointment" },
          ],
        },
      ]);
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    const seededPrompt = initialPrompt?.trim();
    if (!seededPrompt || seededPromptHandled.current === seededPrompt) {
      return;
    }

    seededPromptHandled.current = seededPrompt;
    void submitMessage(seededPrompt);
  }, [initialPrompt]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitMessage(input);
  }

  const conversationCard = (
    <Card className={cn("p-0 overflow-hidden flex flex-col", isModal ? "h-full min-h-0" : "min-h-[70vh]")}>
      <div className="border-b border-border bg-inset/60 px-5 py-4">
        <p className="font-display text-xl tracking-tight">Concierge chat</p>
        <p className="mt-1 text-sm text-text-muted">
          Ask a question in plain English. If the answer is not supported by the approved knowledge set, the assistant will say so and escalate.
        </p>
      </div>

      <div ref={threadRef} className="flex-1 min-h-0 space-y-4 overflow-y-auto px-4 py-5 sm:px-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[92%] rounded-[16px] px-4 py-3 text-sm leading-6 sm:max-w-[78%]",
                message.role === "user"
                  ? "bg-primary text-white"
                  : message.responseState === "no_answer"
                    ? "border border-border-strong bg-inset text-text"
                    : "bg-inset text-text"
              )}
            >
              {message.role === "assistant" && (
                <div className="mb-2 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-text-muted">
                  <SparklesIcon className="size-3.5" /> Growrix AI
                </div>
              )}
              <p>{message.text}</p>

              {message.sources && message.sources.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.sources.map((source) => (
                    <Link
                      key={`${message.id}-${source.label}`}
                      href={source.sourcePath}
                      className="rounded-full border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-text-muted hover:border-primary/40 hover:text-text"
                    >
                      {source.label}
                    </Link>
                  ))}
                </div>
              )}

              {message.suggestedActions && message.suggestedActions.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {message.suggestedActions.map((action) => (
                    <LinkButton key={`${message.id}-${action.href}`} href={action.href} size="sm" variant="outline">
                      {action.label}
                    </LinkButton>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {pending && (
          <div className="flex justify-start">
            <div className="rounded-[16px] bg-inset px-4 py-3 text-sm text-text-muted">
              The concierge is reviewing the approved Growrix knowledge...
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-border bg-surface px-4 py-4 sm:px-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {STARTER_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => void submitMessage(prompt)}
              className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-text-muted hover:border-primary/40 hover:bg-primary/5 hover:text-text"
            >
              {prompt}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <label className="sr-only" htmlFor={isModal ? "concierge-input-modal" : "concierge-input-page"}>
            Ask the concierge
          </label>
          <textarea
            id={isModal ? "concierge-input-modal" : "concierge-input-page"}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about services, pricing, timelines, products, or which path fits your project."
            rows={3}
            maxLength={600}
            className="min-h-24 flex-1 resize-none rounded-[14px] border border-border bg-surface px-4 py-3 text-sm leading-6 outline-none focus:border-primary"
          />
          <Button type="submit" className="shrink-0" disabled={pending || input.trim().length < 2}>
            <PaperAirplaneIcon className="size-4" /> Send
          </Button>
        </form>
      </div>
    </Card>
  );

  const escalationRail = (
    <div className="space-y-4">
      <Card variant="inset">
        <p className="font-display text-xl tracking-tight">Escalate when you are ready.</p>
        <p className="mt-3 text-sm leading-6 text-text-muted">
          The assistant is for fast clarification, not for replacing a scoped project conversation.
        </p>
        <div className="mt-5 grid gap-3">
          <LinkButton href={WHATSAPP_HREF} fullWidth>
            <ChatBubbleLeftRightIcon className="size-4" /> Open WhatsApp
          </LinkButton>
          <LinkButton href="/book-appointment" variant="outline" fullWidth>
            <ArrowUpRightIcon className="size-4" /> Book appointment
          </LinkButton>
          <LinkButton href="/contact" variant="outline" fullWidth>
            <ArrowUpRightIcon className="size-4" /> Send a brief
          </LinkButton>
        </div>
      </Card>

      <Card>
        <p className="font-display text-xl tracking-tight">Grounding rules</p>
        <ul className="mt-4 space-y-3 text-sm leading-6 text-text-muted">
          <li>The assistant answers only from approved Growrix site content.</li>
          <li>It will not invent pricing, timelines, or delivery promises.</li>
          <li>If the answer is not supported, it will say so and route you to a human next step.</li>
        </ul>
      </Card>
    </div>
  );

  if (isModal) {
    return (
      <div className="flex h-full min-h-0 w-full flex-col bg-surface">
        <div className="border-b border-border bg-inset/60 px-5 py-4 pr-16 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-2xl tracking-tight">Ask the concierge</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-text-muted">
                Stay on the current page while chatting. Answers are grounded in current Growrix site content only.
              </p>
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close concierge chat"
                className="hidden rounded-full p-2 text-text-muted hover:bg-surface sm:inline-flex"
              >
                <XMarkIcon className="size-5" />
              </button>
            )}
          </div>
        </div>

        <div className="grid min-h-0 flex-1 gap-4 overflow-hidden px-0 py-0 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-h-0 p-4 sm:p-5">{conversationCard}</div>
          <div className="hidden overflow-y-auto border-l border-border bg-inset/40 p-5 lg:block">{escalationRail}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Section className="pt-12 sm:pt-16 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" aria-hidden />
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="max-w-3xl">
              <Badge tone="primary" dot>
                AI Concierge
              </Badge>
              <h1 className="mt-5 font-display text-5xl sm:text-6xl leading-[1.05] tracking-tight text-balance">
                Get the right answer before you book.
              </h1>
              <p className="mt-6 text-lg text-text-muted leading-7">
                Ask about scope, pricing, delivery timelines, products, or product fit. This assistant answers only from approved Growrix site content and routes you to the right next step.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <LinkButton href={WHATSAPP_HREF} variant="outline">
                  <ChatBubbleLeftRightIcon className="size-4" /> WhatsApp
                </LinkButton>
                <LinkButton href="/book-appointment" variant="outline">
                  <ArrowUpRightIcon className="size-4" /> Book a call
                </LinkButton>
              </div>
              <p className="mt-5 flex items-center gap-1.5 text-xs text-text-muted">
                <ShieldCheckIcon className="size-3.5" /> Answers are grounded in current Growrix site content only.
              </p>
            </div>

            <Card variant="inset" className="lg:mt-2">
              <SectionHeading
                eyebrow="What it knows"
                title="A bounded assistant, not a generic chatbot."
                description="The first version uses the current website content only: services, pricing, process, portfolio proof, FAQ, products, and next-step routes."
              />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {KNOWLEDGE_AREAS.map((area) => (
                  <div key={area.title} className="rounded-[14px] border border-border bg-surface p-4">
                    <p className="font-display text-lg tracking-tight">{area.title}</p>
                    <p className="mt-2 text-sm leading-6 text-text-muted">{area.detail}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="pt-0 pb-12 sm:pb-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            {conversationCard}
            {escalationRail}
          </div>
        </Container>
      </Section>
    </>
  );
}

export function ConciergeChat({ initialPrompt }: { initialPrompt?: string }) {
  return <ConciergeExperience initialPrompt={initialPrompt} mode="page" />;
}