import Image from "next/image";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { ABOUT_FOUNDER_SECTION } from "@/lib/about-landing-content";
import { ABOUT_IMAGES } from "@/lib/site-images";

export function AboutFounderStoryMobile() {
  const { founder, timeline, timelineEyebrow } = ABOUT_FOUNDER_SECTION;

  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={ABOUT_FOUNDER_SECTION.eyebrow}
        titleLead={ABOUT_FOUNDER_SECTION.titleLead}
        titleAccent={ABOUT_FOUNDER_SECTION.titleAccent}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="about-founder-mobile__profile">
        <div className="about-founder-mobile__photo">
          <Image
            src={ABOUT_IMAGES.founder.src}
            alt={`${founder.name}, Founder of GrowrixOS`}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="about-founder-mobile__photo-overlay" aria-hidden />
          <div className="about-founder-mobile__photo-caption">
            <p className="about-founder-mobile__photo-name">{founder.name}</p>
            <p className="about-founder-mobile__photo-role">{founder.role}</p>
          </div>
        </div>

        <div className="about-founder-mobile__intro">
          <p className="about-founder-mobile__intro-label">Founder</p>
          <h3 className="about-founder-mobile__intro-name">{founder.name}</h3>
          <p className="about-founder-mobile__intro-role">{founder.role}</p>
          <p className="about-founder-mobile__intro-copy">{founder.intro}</p>
        </div>
      </div>

      <div className="about-founder-mobile__timeline">
        <p className="about-founder-mobile__timeline-label">{timelineEyebrow}</p>

        <ol className="home-mobile-marketing__process-steps" aria-label={timelineEyebrow}>
          {timeline.map((step, index) => (
            <li key={step.title} className="home-mobile-marketing__process-step">
              <span className="home-mobile-marketing__process-step-icon" aria-hidden>
                <span className="about-founder-mobile__timeline-index">{index + 1}</span>
              </span>
              <div>
                <p className="home-mobile-marketing__process-step-label">{step.eyebrow}</p>
                <h3 className="home-mobile-marketing__process-step-title">{step.title}</h3>
                <p className="home-mobile-marketing__process-step-description">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
