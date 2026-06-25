"use client";

import {
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { ConciergeTriggerButton } from "@/components/ai/ConciergeTrigger";
import { HomeAiChatDemo } from "@/components/marketing/HomeAiChatDemo";
import { MarketingViewportGate } from "@/components/marketing/MarketingViewportGate";
import { HomeDesktopSectionRail } from "@/components/marketing/desktop/HomeDesktopSectionRail";
import { HomeDesktopSplitSection } from "@/components/marketing/desktop/HomeDesktopSplitSection";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { LinkButton } from "@/components/primitives/Button";
import { Container, Section } from "@/components/primitives/Container";
import { HOME_AI_COPY } from "@/lib/home-conversion-content";
import { homeSection } from "@/lib/homepage-composition";
import { WHATSAPP_HREF } from "@/lib/nav";

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
    <div className="home-mobile-marketing home-mobile-marketing--ai">
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
        <HomeAiChatDemo variant="mobile" />
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
    <HomeDesktopSplitSection
      rail={
        <div className="home-desktop-marketing__ai-rail">
          <HomeDesktopSectionRail
            eyebrow={eyebrow}
            title={title === HOME_AI_COPY.title ? undefined : title}
            titleLead={title === HOME_AI_COPY.title ? HOME_AI_COPY.titleLead : undefined}
            titleAccent={title === HOME_AI_COPY.title ? HOME_AI_COPY.titleAccent : undefined}
            description={description}
          />
          <div className="home-desktop-marketing__ai-rail-actions flex flex-wrap gap-3">
            <ConciergeTriggerButton>
              <SparklesIcon className="size-4" /> Ask AI Growrix OS
            </ConciergeTriggerButton>
            <LinkButton href={WHATSAPP_HREF} variant="outline">
              <ChatBubbleLeftRightIcon className="size-4" /> WhatsApp
            </LinkButton>
          </div>
          <p className="home-desktop-marketing__ai-rail-note flex items-center gap-1.5 text-xs text-text-muted">
            <ShieldCheckIcon className="size-3.5" /> {privacyNote}
          </p>
        </div>
      }
      content={
        <div className="home-desktop-marketing__ai-panel">
          <HomeAiChatDemo variant="desktop" />
        </div>
      }
    />
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
