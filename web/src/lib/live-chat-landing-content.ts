export const LIVE_CHAT_HERO = {
  eyebrow: "Live chat",
  titleLead: "Start a real",
  titleAccent: "support handoff.",
  description:
    "This route creates a tracked live-chat request in the backend so the team can follow up with the right context. For urgent conversations, WhatsApp is still the fastest path.",
  primaryCta: "Open WhatsApp",
  secondaryCta: "Send a written brief",
  secondaryHref: "/contact",
} as const;

export const LIVE_CHAT_FORM = {
  eyebrow: "Queue request",
  titleLead: "Tell us what this",
  titleAccent: "conversation is about.",
  topicPlaceholder: "New project, support, pricing, or delivery question",
  contextPlaceholder: "What happened, what you need, and how urgent it is.",
  submitLabel: "Start live chat",
  submittingLabel: "Queuing...",
  successTitle: "Request queued.",
  successDescription: (sessionId: string | null) =>
    sessionId
      ? `Live chat session ${sessionId} has been recorded. Continue on WhatsApp if you need an immediate response.`
      : "Your request has been recorded. Continue on WhatsApp if you need an immediate response.",
  resetLabel: "Start another request",
  escalateLabel: "Escalate now",
} as const;
