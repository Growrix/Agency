"use client";

import {
  ChatBubbleLeftRightIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { ConciergeTriggerButton } from "@/components/ai/ConciergeTrigger";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { HOME_AI_COPY } from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import { WHATSAPP_HREF } from "@/lib/nav";
import { HERO_TITLE_CLASS } from "@/lib/typography";

type HomeAiConciergeSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  privacyNote?: string;
};

function HomeAiConciergeMobile({
  eyebrow = HOME_AI_COPY.eyebrow,
  title = HOME_AI_COPY.title,
  description = HOME_AI_COPY.description,
  privacyNote = HOME_AI_COPY.privacyNote,
}: HomeAiConciergeSectionProps) {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={eyebrow}
        titleLead={title === HOME_AI_COPY.title ? HOME_AI_COPY.titleLead : undefined}
        titleAccent={title === HOME_AI_COPY.title ? HOME_AI_COPY.titleAccent : undefined}
        title={title}
        description={description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__cta-row">
        <ConciergeTriggerButton className="home-mobile-marketing__cta w-full sm:w-auto">
          <SparklesIcon className="home-mobile-marketing__cta-icon" aria-hidden />
          Ask AI Growrix OS
        </ConciergeTriggerButton>
        <LinkButton
          href={WHATSAPP_HREF}
          variant="outline"
          className="home-mobile-marketing__cta home-mobile-marketing__cta--outline w-full sm:w-auto"
        >
          <span className="home-mobile-marketing__cta-inner">
            <ChatBubbleLeftRightIcon className="home-mobile-marketing__cta-icon" aria-hidden />
            WhatsApp
          </span>
        </LinkButton>
      </div>

      <p className="home-mobile-marketing__note">
        <ShieldCheckIcon className="home-mobile-marketing__note-icon" aria-hidden />
        <span>{privacyNote}</span>
      </p>

      <div className="home-mobile-marketing__ai-card">
        <div className="home-mobile-marketing__ai-message-row">
          <span className="home-mobile-marketing__ai-avatar" aria-hidden />
          <div className="home-mobile-marketing__ai-bubble home-mobile-marketing__ai-bubble--user">
            Hey — I&apos;m thinking about rebuilding our SaaS dashboard. We&apos;re 12 people, 8k MAUs.
          </div>
        </div>
        <div className="home-mobile-marketing__ai-message-row home-mobile-marketing__ai-message-row--assistant">
          <div className="home-mobile-marketing__ai-bubble home-mobile-marketing__ai-bubble--assistant">
            That sounds like a Product Partner engagement. We typically scope these in a 1-week discovery sprint. Want timelines and team sizing?
          </div>
          <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface/10">
            <CubeTransparentIcon className="size-4 text-primary" aria-hidden />
          </span>
        </div>
        <div className="home-mobile-marketing__ai-pills">
          {HOME_AI_COPY.quickReplies.map((reply) => (
            <span key={reply} className="home-mobile-marketing__ai-pill">
              {reply}
            </span>
          ))}
        </div>
        <div className="home-mobile-marketing__ai-highlights">
          {HOME_AI_COPY.highlights.map((item) => (
            <div key={item.label} className="home-mobile-marketing__ai-highlight">
              <p className="home-mobile-marketing__ai-highlight-label">{item.label}</p>
              <p className="home-mobile-marketing__ai-highlight-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomeAiConciergeDesktop({
  eyebrow = HOME_AI_COPY.eyebrow,
  title = HOME_AI_COPY.title,
  description = HOME_AI_COPY.description,
  privacyNote = HOME_AI_COPY.privacyNote,
}: HomeAiConciergeSectionProps) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          titleClassName={HERO_TITLE_CLASS}
        />
        <div className="mt-8 flex flex-wrap gap-3">
          <ConciergeTriggerButton>
            <SparklesIcon className="size-4" /> Ask AI Growrix OS
          </ConciergeTriggerButton>
          <LinkButton href={WHATSAPP_HREF} variant="outline">
            <ChatBubbleLeftRightIcon className="size-4" /> WhatsApp
          </LinkButton>
        </div>
        <p className="mt-5 flex items-center gap-1.5 text-xs text-text-muted">
          <ShieldCheckIcon className="size-3.5" /> {privacyNote}
        </p>
      </div>
      <div className="lg:col-span-7">
        <Card className="border-white/10 bg-contrast text-contrast-text">
          <div className="space-y-4">
            <div className="flex max-w-md gap-3">
              <div className="size-8 shrink-0 rounded-full bg-secondary" aria-hidden />
              <div className="rounded-[14px] bg-white/5 px-4 py-3 text-sm leading-6">
                Hey — I&apos;m thinking about rebuilding our SaaS dashboard. We&apos;re 12 people, 8k MAUs.
              </div>
            </div>
            <div className="ml-auto flex max-w-md justify-end gap-3">
              <div className="rounded-[14px] bg-primary px-4 py-3 text-sm leading-6 text-white">
                That sounds like a Product Partner engagement. We typically scope these in a 1-week discovery sprint. Want timelines and team sizing?
              </div>
              <div className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                <CubeTransparentIcon className="size-4" aria-hidden />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {HOME_AI_COPY.quickReplies.map((reply) => (
                <span key={reply} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs">
                  {reply}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function HomeAiConciergeSection(props: HomeAiConciergeSectionProps) {
  const shell = homeSection("ai-concierge");

  return (
    <Section {...shell}>
      <Container>
        <MarketingViewportGate
          mobile={<HomeAiConciergeMobile {...props} />}
          desktop={<HomeAiConciergeDesktop {...props} />}
        />
      </Container>
    </Section>
  );
}
