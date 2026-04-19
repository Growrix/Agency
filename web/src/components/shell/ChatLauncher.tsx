"use client";

import { useState } from "react";
import Link from "next/link";
import { ChatBubbleLeftRightIcon, XMarkIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { WHATSAPP_HREF } from "@/lib/nav";
import { cn } from "@/lib/utils";

const SUGGESTED = [
  "What does a typical SaaS engagement look like?",
  "Can you build an MCP server for my CRM?",
  "How fast can you launch a marketing site?",
];

export function ChatLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <div className="hidden lg:block fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-[340px] rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-3)] overflow-hidden animate-fade-up">
          <div className="flex items-center justify-between bg-[var(--color-contrast)] px-4 py-3 text-[var(--color-contrast-text)]">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
              <p className="font-display tracking-tight">AI Concierge</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 hover:bg-white/10"
            >
              <XMarkIcon className="size-4" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-[var(--color-text-muted)] leading-6">
              Hi — I can answer questions about services, pricing, timelines, and product fit. Pick a prompt or open the full concierge.
            </p>
            <div className="mt-3 space-y-2">
              {SUGGESTED.map((s) => (
                <Link
                  key={s}
                  href="/ai-concierge"
                  className="block rounded-[12px] border border-[var(--color-border)] px-3 py-2 text-sm hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]/5 transition-colors"
                >
                  <SparklesIcon className="inline size-3.5 mr-1.5 text-[var(--color-primary)]" aria-hidden />
                  {s}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex gap-2 text-sm">
              <Link
                href="/ai-concierge"
                className="flex-1 rounded-[10px] bg-[var(--color-primary)] py-2 text-center text-[var(--color-surface)] font-medium hover:bg-[var(--color-primary-hover)]"
              >
                Open concierge
              </Link>
              <Link
                href={WHATSAPP_HREF}
                className="flex-1 rounded-[10px] border border-[var(--color-border)] py-2 text-center font-medium hover:bg-[var(--color-inset)]"
              >
                WhatsApp
              </Link>
            </div>
            <p className="mt-3 text-[11px] text-[var(--color-text-muted)] text-center">
              Conversations may be reviewed for service quality. See <Link href="/privacy-policy" className="underline">privacy</Link>.
            </p>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat launcher" : "Open chat launcher"}
        className={cn(
          "size-14 rounded-full bg-[var(--color-primary)] text-[var(--color-surface)] shadow-[var(--shadow-3)] flex items-center justify-center hover:bg-[var(--color-primary-hover)] transition-all",
          open && "scale-95"
        )}
      >
        {open ? <XMarkIcon className="size-6" /> : <ChatBubbleLeftRightIcon className="size-6" />}
      </button>
    </div>
  );
}
