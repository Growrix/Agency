import "server-only";

import { WHATSAPP_HREF } from "@/lib/nav";
import { formatKnowledgeForPrompt, searchKnowledge } from "@/server/ai/knowledge";

type ConciergeActionKey = "book" | "contact" | "faq" | "pricing" | "services" | "shop" | "whatsapp";
type ConciergeResponseState = "answered" | "no_answer" | "escalation";

type Action = {
  label: string;
  href: string;
};

const ACTIONS: Record<ConciergeActionKey, Action> = {
  book: { label: "Book appointment", href: "/book-appointment" },
  contact: { label: "Contact form", href: "/contact" },
  faq: { label: "Open FAQ", href: "/faq" },
  pricing: { label: "View pricing", href: "/pricing" },
  services: { label: "Explore services", href: "/services" },
  shop: { label: "Browse shop", href: "/shop" },
  whatsapp: { label: "WhatsApp", href: WHATSAPP_HREF },
};

const FALLBACK_ACTIONS: ConciergeActionKey[] = ["whatsapp", "book", "contact"];

export type ConciergeReply = {
  answer: string;
  messageId: string;
  responseState: ConciergeResponseState;
  sessionId: string;
  sources: Array<{
    label: string;
    sourcePath: string;
    sourceType: string;
  }>;
  suggestedActions: Action[];
};

type OpenAiJsonReply = {
  answer?: string;
  response_state?: ConciergeResponseState;
  source_ids?: string[];
  action_ids?: ConciergeActionKey[];
};

function isActionKey(value: string): value is ConciergeActionKey {
  return value in ACTIONS;
}

function isRetryableModelError(status: number, body: string) {
  if (status !== 403 && status !== 404) {
    return false;
  }

  return body.includes("model_not_found") || body.includes("does not have access to model");
}

async function requestChatCompletion(apiKey: string, message: string, pagePath: string, knowledgePrompt: string) {
  const requestedModel = process.env.OPENAI_MODEL?.trim();
  const candidateModels = [requestedModel, "o3-mini", "gpt-4.1-mini", "gpt-4.1-nano", "gpt-4o-mini"].filter(
    (value, index, array): value is string => Boolean(value) && array.indexOf(value) === index
  );

  let lastError = "";

  for (const model of candidateModels) {
    const completionResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You are the Growrix OS AI concierge. Answer only from the supplied internal knowledge. Never use outside knowledge. If the supplied knowledge does not support the answer, return response_state no_answer. Respond as JSON with keys: answer, response_state, source_ids, action_ids. Keep answers concise, business-aware, and practical.",
          },
          {
            role: "user",
            content: `Visitor question: ${message}\nPage path: ${pagePath}\n\nApproved knowledge:\n${knowledgePrompt}\n\nValid action_ids: book, contact, faq, pricing, services, shop, whatsapp`,
          },
        ],
      }),
    });

    if (completionResponse.ok) {
      return completionResponse.json() as Promise<{
        choices?: Array<{ message?: { content?: string | null } }>;
      }>;
    }

    const errorText = await completionResponse.text();
    lastError = `OpenAI request failed: ${completionResponse.status} ${errorText}`;

    if (!isRetryableModelError(completionResponse.status, errorText)) {
      throw new Error(lastError);
    }
  }

  throw new Error(lastError || "OpenAI request failed.");
}

function buildNoAnswer(sessionId: string): ConciergeReply {
  return {
    answer:
      "I only answer from approved Growrix site content, and I do not have a verified answer for that yet. The fastest next step is to open WhatsApp, book a call, or use the contact form.",
    messageId: crypto.randomUUID(),
    responseState: "no_answer",
    sessionId,
    sources: [],
    suggestedActions: [ACTIONS.whatsapp, ACTIONS.book, ACTIONS.contact],
  };
}

function parseJsonPayload(payload: string | null | undefined) {
  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(payload) as OpenAiJsonReply;
  } catch {
    return null;
  }
}

function normalizeResponseState(value: string | undefined): ConciergeResponseState {
  if (value === "answered" || value === "no_answer" || value === "escalation") {
    return value;
  }

  if (value === "provided") {
    return "answered";
  }

  return "no_answer";
}

export async function generateConciergeReply(input: {
  message: string;
  pagePath?: string;
  sessionId?: string;
}) {
  const sessionId = input.sessionId || crypto.randomUUID();
  const knowledge = searchKnowledge(input.message);

  if (knowledge.length === 0) {
    return buildNoAnswer(sessionId);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is missing.");
  }
  const knowledgeById = new Map(knowledge.map((document) => [document.id, document]));
  const completionJson = await requestChatCompletion(
    apiKey,
    input.message,
    input.pagePath || "/ai-concierge",
    formatKnowledgeForPrompt(knowledge)
  );

  const rawPayload = completionJson.choices?.[0]?.message?.content;
  const parsed = parseJsonPayload(rawPayload);

  if (!parsed?.answer) {
    return buildNoAnswer(sessionId);
  }

  const sourceIds = (parsed.source_ids || []).filter((id): id is string => knowledgeById.has(id));
  const resolvedSources = (sourceIds.length > 0 ? sourceIds : knowledge.slice(0, 3).map((item) => item.id))
    .map((id) => knowledgeById.get(id))
    .filter((value): value is NonNullable<typeof value> => Boolean(value))
    .map((document) => ({
      label: document.label,
      sourcePath: document.sourcePath,
      sourceType: document.sourceType,
    }));

  const actionIds = Array.isArray(parsed.action_ids) ? parsed.action_ids.filter(isActionKey) : [];
  const suggestedActions = (actionIds.length > 0 ? actionIds : FALLBACK_ACTIONS)
    .map((actionId) => ACTIONS[actionId])
    .filter(Boolean)
    .slice(0, 3);

  const responseState = normalizeResponseState(parsed.response_state);
  const finalResponseState = responseState === "answered" && resolvedSources.length === 0 ? "no_answer" : responseState;

  return {
    answer:
      finalResponseState === "no_answer"
        ? buildNoAnswer(sessionId).answer
        : parsed.answer.trim(),
    messageId: crypto.randomUUID(),
    responseState: finalResponseState,
    sessionId,
    sources: finalResponseState === "answered" ? resolvedSources : [],
    suggestedActions,
  } satisfies ConciergeReply;
}