import { PageHero, SectionWrap } from '@/components/site/PageBlocks';

export const metadata = {
  title: 'Privacy',
  description: 'Rayiss privacy information for enquiry handling and website usage.',
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        highlight="policy"
        description="This page documents how Rayiss handles enquiry information submitted through frontend contact and quote flows."
        ctaHref="/contact"
        ctaLabel="Contact Rayiss"
      />

      <SectionWrap
        eyebrow="Policy"
        title="How enquiry information is used."
        description="Submitted details are used to respond to service requests, scope jobs, and provide quote follow-up."
      >
        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(10,10,10,0.08)', padding: 26 }}>
          <div className="space-y-4" style={{ color: '#4A4A45', lineHeight: 1.7 }}>
            <p>Rayiss collects contact and project information only for service delivery, scheduling, and quote communication.</p>
            <p>Information is retained for operational records and support follow-up where relevant to ongoing work.</p>
            <p>Rayiss does not sell enquiry data. If data-handling clarification is needed, use the contact route for direct support.</p>
          </div>
        </div>
      </SectionWrap>
    </>
  );
}
