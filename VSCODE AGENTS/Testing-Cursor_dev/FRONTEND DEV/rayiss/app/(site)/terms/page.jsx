import { PageHero, SectionWrap } from '@/components/site/PageBlocks';

export const metadata = {
  title: 'Terms',
  description: 'Rayiss website and enquiry terms for service discovery and quote requests.',
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Website"
        highlight="terms"
        description="These terms describe the intended use of Rayiss content routes, enquiry forms, and service information pages."
        ctaHref="/contact"
        ctaLabel="Ask a question"
      />

      <SectionWrap
        eyebrow="Terms"
        title="Use, scope, and quote expectations."
        description="Website content supports planning and discovery. Final pricing and technical scope are confirmed after direct project review."
      >
        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(10,10,10,0.08)', padding: 26 }}>
          <div className="space-y-4" style={{ color: '#4A4A45', lineHeight: 1.7 }}>
            <p>Published service descriptions are indicative and may vary by site conditions, compliance requirements, and customer goals.</p>
            <p>Quote outcomes depend on information provided during consultation and any required technical verification.</p>
            <p>Rayiss may update website route content to improve clarity and maintain route truthfulness as services evolve.</p>
          </div>
        </div>
      </SectionWrap>
    </>
  );
}
