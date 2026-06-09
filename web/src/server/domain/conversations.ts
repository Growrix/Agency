import "server-only";

import type { ConversationMessageRecord, ConversationSessionRecord } from "@/server/data/schema";
import { readDatabase, writeDatabase } from "@/server/data/store";
import { recordAnalyticsEvent, recordAuditLog } from "@/server/logging/observability";
import { recordLeadEvent } from "@/server/domain/leads";

export async function appendConciergeExchange(input: {
  sessionId?: string;
  pagePath: string;
  userMessage: string;
  assistantMessage: string;
  responseState: "answered" | "no_answer" | "escalation";
  leadEmail?: string;
  requestId?: string;
  ip?: string;
}) {
  const database = await readDatabase();
  const existing = input.sessionId
    ? database.conversations.find((conversation) => conversation.id === input.sessionId && conversation.source === "ai_concierge")
    : null;
  const now = new Date().toISOString();
  const session: ConversationSessionRecord = existing ?? {
    id: input.sessionId || crypto.randomUUID(),
    source: "ai_concierge",
    status: input.responseState === "escalation" ? "qualified" : "active",
    page_path: input.pagePath,
    lead_email: input.leadEmail,
    messages: [],
    created_at: now,
    updated_at: now,
  };

  const messages: ConversationMessageRecord[] = [
    ...session.messages,
    { id: crypto.randomUUID(), role: "user", content: input.userMessage, created_at: now },
    { id: crypto.randomUUID(), role: "assistant", content: input.assistantMessage, created_at: now },
  ];

  const updatedSession: ConversationSessionRecord = {
    ...session,
    status: input.responseState === "escalation" ? "qualified" : session.status,
    lead_email: input.leadEmail ?? session.lead_email,
    updated_at: now,
    messages,
  };

  await writeDatabase((next) => ({
    ...next,
    conversations: [updatedSession, ...next.conversations.filter((conversation) => conversation.id !== updatedSession.id)],
  }));

  const leadEmail = (input.leadEmail ?? updatedSession.lead_email)?.trim().toLowerCase();
  const hasLeadEmail = leadEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail);

  const leadEventPromise = hasLeadEmail
    ? recordLeadEvent({
        email: leadEmail!,
        eventType: input.responseState === "escalation" ? "ai_qualification" : "ai_message",
        source: "ai_concierge",
        route: input.pagePath,
        conversationId: updatedSession.id,
        metadata: {
          response_state: input.responseState,
          message_count: updatedSession.messages.length,
        },
      }).catch(async (error: unknown) => {
        await recordAuditLog({
          level: "warning",
          action: "concierge.lead_event_failed",
          metadata: { message: error instanceof Error ? error.message : "Unknown error" },
        });
        return undefined;
      })
    : Promise.resolve(undefined);

  await Promise.all([
    recordAnalyticsEvent({
      event_name: "concierge_message",
      route: input.pagePath,
      source: "ai_concierge",
      metadata: {
        session_id: updatedSession.id,
        response_state: input.responseState,
      },
    }),
    recordAuditLog({
      level: "info",
      action: "concierge.exchange_recorded",
      request_id: input.requestId,
      ip: input.ip,
      metadata: {
        session_id: updatedSession.id,
        response_state: input.responseState,
      },
    }),
    leadEventPromise,
  ]);

  return updatedSession;
}

export async function getConversationSession(sessionId: string) {
  const database = await readDatabase();
  return database.conversations.find((conversation) => conversation.id === sessionId) ?? null;
}
