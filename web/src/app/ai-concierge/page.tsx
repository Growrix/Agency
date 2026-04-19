"use client";

import { Container, Section, LinkButton } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import {
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { SITE_CONFIG } from "@/lib/constants";
import { useState } from "react";
import type { Metadata } from "next";

const suggestedPrompts = [
  "What services do you offer?",
  "How much does a SaaS MVP cost?",
  "What's your development process?",
  "Do you build MCP servers?",
  "How long does a website project take?",
  "Can I buy a ready-made template?",
];

export default function AiConciergePage() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Hi! I'm the Agency AI concierge. I can answer questions about our services, pricing, process, and capabilities. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
      {
        role: "assistant",
        content:
          "Thank you for your question! Our AI concierge is currently in preview mode. For immediate assistance, please book an appointment or reach out via WhatsApp. We typically respond within 2 hours.",
      },
    ]);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: prompt },
      {
        role: "assistant",
        content:
          "Thank you for your question! Our AI concierge is currently in preview mode. For immediate assistance, please book an appointment or reach out via WhatsApp. We typically respond within 2 hours.",
      },
    ]);
  };

  return (
    <>
      <Section className="pt-16 sm:pt-20 lg:pt-28 pb-8">
        <Container size="lg" className="text-center">
          <Badge variant="info" className="mb-6">
            AI-Powered
          </Badge>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            AI Concierge
          </h1>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            Ask anything about our services, pricing, or process. Get instant
            answers or escalate to a human conversation.
          </p>
        </Container>
      </Section>

      <Section className="pt-0 pb-8">
        <Container size="lg">
          {/* Chat Window */}
          <div className="bg-surface rounded-[var(--radius-xl)] border border-border shadow-[var(--shadow-card)] overflow-hidden">
            {/* Chat Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <ChatBubbleLeftRightIcon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold">AI Concierge</div>
                <div className="text-xs text-success flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-success inline-block" />
                  Online
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-6 space-y-4 min-h-[300px] max-h-[500px] overflow-y-auto">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-[var(--radius-md)] p-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-white"
                        : "bg-inset text-foreground"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Prompts */}
            <div className="px-6 pb-3">
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handlePromptClick(prompt)}
                    className="px-3 py-1.5 rounded-full bg-inset border border-border text-xs text-muted hover:text-foreground hover:border-primary/30 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-6 pb-6 pt-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 h-11 px-4 rounded-[var(--radius-md)] border border-border bg-background text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="h-11 w-11 rounded-[var(--radius-md)] bg-primary text-white hover:bg-primary-hover transition-colors flex items-center justify-center shrink-0"
                  aria-label="Send message"
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Escalation */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <LinkButton href="/book-appointment" variant="outline">
              Book a Human Call
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </LinkButton>
            <LinkButton href={SITE_CONFIG.whatsappUrl} variant="outline" external>
              Escalate to WhatsApp
            </LinkButton>
          </div>

          <p className="mt-4 text-xs text-muted text-center">
            AI responses are informational. For binding quotes or project
            commitments, speak with a team member.
          </p>
        </Container>
      </Section>
    </>
  );
}
