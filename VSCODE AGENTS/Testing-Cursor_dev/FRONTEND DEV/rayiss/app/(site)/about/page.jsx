import { CtaStrip, InfoCard, PageHero, SectionWrap } from '@/components/site/PageBlocks';
import { business } from '@/lib/site-data';

export const metadata = {
  title: 'About',
  description: 'Meet the Rayiss Electrical and Solar team, process, and credentials across Western Sydney.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Rayiss"
        title="Built local."
        highlight="Built right."
        description="Rayiss is a family-led electrical and solar team based in Wetherill Park. We deliver practical design, clean installs, and direct communication from first call to handover."
        ctaHref="/contact"
      />

      <SectionWrap
        eyebrow="Company"
        title="A hands-on team with clear accountability."
        description="Rayiss keeps project ownership in-house so clients are not left managing fragmented subcontractor chains. The same team that scopes your job is involved through delivery and support."
      >
        <div className="grid md:grid-cols-3 gap-5">
          <InfoCard title="Who we are">
            Family-owned and operated from {business.addressLine2}. Our work spans residential, commercial, and mixed-scope upgrades.
          </InfoCard>
          <InfoCard title="What we prioritize">
            Safety, clarity, and workmanship. Quotes are built around site reality and usage behavior, not generic package assumptions.
          </InfoCard>
          <InfoCard title="Where we work">
            {business.serviceArea}. Regional jobs are reviewed case by case so delivery quality remains consistent.
          </InfoCard>
        </div>
      </SectionWrap>

      <SectionWrap
        eyebrow="Credentials"
        title="Licensing and compliance are core, not optional."
        description="Rayiss delivery combines Level 2 capability, solar accreditation pathways, and practical project documentation so each job closes cleanly."
      >
        <div className="grid md:grid-cols-2 gap-5">
          <InfoCard title="Electrical compliance">
            Level 2 ASP scope, network-facing works, service upgrades, and metering pathways handled with clear sequencing and handover.
          </InfoCard>
          <InfoCard title="Energy delivery">
            Solar and battery projects are built around production assumptions, load behavior, and client goals rather than feature-heavy marketing bundles.
          </InfoCard>
        </div>
      </SectionWrap>

      <SectionWrap
        eyebrow="Process"
        title="Talk, design, install, aftercare."
        description="The same four-step process used on the homepage is carried through every service route to keep scope and timing predictable."
      >
        <div className="grid lg:grid-cols-4 gap-px" style={{ background: 'rgba(10,10,10,0.1)' }}>
          {[
            ['01', 'Talk', 'Capture needs, constraints, and project intent.'],
            ['02', 'Design', 'Build practical scope and quote pathways.'],
            ['03', 'Install', 'Execute with licensed in-house delivery.'],
            ['04', 'Aftercare', 'Support, diagnostics, and follow-up.'],
          ].map(([step, title, text]) => (
            <div key={step} style={{ background: '#fff', padding: 24 }}>
              <div className="mono text-sm mb-7" style={{ color: '#FF5B1F' }}>
                {step}
              </div>
              <h3 className="display" style={{ fontSize: 34, fontWeight: 600, marginBottom: 8 }}>
                {title}
              </h3>
              <p style={{ color: '#4A4A45', fontSize: 14.5, lineHeight: 1.6 }}>{text}</p>
            </div>
          ))}
        </div>
      </SectionWrap>

      <CtaStrip
        title="Planning a project now?"
        description="Use the contact route to submit details and get a clear next-step response from the Rayiss team."
        href="/contact"
        label="Start a quote"
      />
    </>
  );
}
