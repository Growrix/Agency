"use client";

import { useState, type FormEvent } from "react";
import { Button, LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MarketingHeroTitle } from "@/components/marketing/MarketingHeroTitle";
import { LiveChatHeroMobile } from "@/components/marketing/live-chat/LiveChatHeroMobile";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { LIVE_CHAT_FORM, LIVE_CHAT_HERO } from "@/lib/live-chat-landing-content";
import { WHATSAPP_HREF } from "@/lib/nav";

export default function LiveChatPage() {
  const [isHydrated] = useState(true);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [message, setMessage] = useState("Could not start live chat.");

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

      const payload = (await response.json().catch(() => null)) as {
        data?: { session_id?: string };
        error?: { message?: string };
      } | null;
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

  const formCard = (
    <Card className="contact-form-mobile__form-card">
      {status === "success" ? (
        <div>
          <h2 className="font-display text-2xl tracking-tight">{LIVE_CHAT_FORM.successTitle}</h2>
          <p className="mt-4 text-sm leading-6 text-text-muted">{LIVE_CHAT_FORM.successDescription(sessionId)}</p>
          <div className="mt-6 flex flex-col gap-3">
            <Button
              type="button"
              fullWidth
              onClick={() => {
                setStatus("idle");
                setSessionId(null);
              }}
            >
              {LIVE_CHAT_FORM.resetLabel}
            </Button>
            <LinkButton href={WHATSAPP_HREF} variant="outline" fullWidth>
              {LIVE_CHAT_FORM.escalateLabel}
            </LinkButton>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="contact-form-mobile__form space-y-5" aria-busy={status === "submitting"} data-ready={isHydrated ? "true" : "false"}>
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Topic *</span>
            <input
              name="topic"
              required
              className="signal-input mt-1.5 w-full"
              placeholder={LIVE_CHAT_FORM.topicPlaceholder}
            />
          </label>
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Context</span>
            <textarea
              name="context"
              rows={4}
              className="signal-input mt-1.5 w-full min-h-28 resize-y py-3"
              placeholder={LIVE_CHAT_FORM.contextPlaceholder}
            />
          </label>
          {status === "error" ? <p className="text-sm text-destructive">{message}</p> : null}
          <div className="contact-form-mobile__submit">
            <Button type="submit" fullWidth disabled={!isHydrated || status === "submitting"}>
              {status === "submitting" ? LIVE_CHAT_FORM.submittingLabel : LIVE_CHAT_FORM.submitLabel}
            </Button>
          </div>
        </form>
      )}
    </Card>
  );

  return (
    <Section className="overflow-x-hidden py-12 sm:py-16 md:py-24">
      <Container className="min-w-0">
        <MarketingViewportGate
          mobile={
            <div className="home-mobile-marketing contact-form-mobile">
              <LiveChatHeroMobile />
              <MobileMarketingSectionHeader
                eyebrow={LIVE_CHAT_FORM.eyebrow}
                titleLead={LIVE_CHAT_FORM.titleLead}
                titleAccent={LIVE_CHAT_FORM.titleAccent}
                align="left"
                className="home-mobile-marketing__header--left max-w-none mt-8"
              />
              {formCard}
            </div>
          }
          desktop={
            <div className="grid min-w-0 gap-6 lg:grid-cols-[1fr_0.92fr] lg:items-start">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-wider text-primary">{LIVE_CHAT_HERO.eyebrow}</p>
                <MarketingHeroTitle
                  className="mt-5 font-display text-4xl tracking-tight text-balance sm:text-5xl lg:text-6xl"
                  titleLead={LIVE_CHAT_HERO.titleLead}
                  titleAccent={LIVE_CHAT_HERO.titleAccent}
                />
                <p className="mt-6 text-lg leading-7 text-text-muted">{LIVE_CHAT_HERO.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <LinkButton href={WHATSAPP_HREF} size="lg">
                    {LIVE_CHAT_HERO.primaryCta}
                  </LinkButton>
                  <LinkButton href={LIVE_CHAT_HERO.secondaryHref} variant="outline" size="lg">
                    {LIVE_CHAT_HERO.secondaryCta}
                  </LinkButton>
                </div>
              </div>
              {formCard}
            </div>
          }
        />
      </Container>
    </Section>
  );
}
