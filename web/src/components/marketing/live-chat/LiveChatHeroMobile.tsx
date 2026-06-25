import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { LIVE_CHAT_HERO } from "@/lib/live-chat-landing-content";
import { WHATSAPP_HREF } from "@/lib/nav";

export function LiveChatHeroMobile() {
  return (
    <div className="services-landing-hero-mobile w-full">
      <div className="services-landing-hero-mobile__copy">
        <Badge tone="primary" dot className="service-detail-hero-mobile__badge">
          {LIVE_CHAT_HERO.eyebrow}
        </Badge>

        <h1 className="service-detail-hero-mobile__title">
          <span className="block">{LIVE_CHAT_HERO.titleLead}</span>
          <span className="block marketing-title-accent">{LIVE_CHAT_HERO.titleAccent}</span>
        </h1>

        <p className="service-detail-hero-mobile__description">{LIVE_CHAT_HERO.description}</p>

        <div className="service-detail-hero-mobile__cta-stack">
          <LinkButton href={WHATSAPP_HREF} fullWidth className="service-detail-hero-mobile__cta-primary">
            <span className="service-detail-hero-mobile__cta-inner">
              {LIVE_CHAT_HERO.primaryCta}
              <ArrowRightIcon className="service-detail-hero-mobile__cta-icon" aria-hidden />
            </span>
          </LinkButton>
          <LinkButton
            href={LIVE_CHAT_HERO.secondaryHref}
            variant="outline"
            fullWidth
            className="service-detail-hero-mobile__cta-secondary"
          >
            {LIVE_CHAT_HERO.secondaryCta}
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
