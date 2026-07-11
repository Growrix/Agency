import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CtaStrip, PageHero, SectionWrap } from '@/components/site/PageBlocks';
import QuickQuoteForm from '@/components/site/QuickQuoteForm';
import { business } from '@/lib/site-data';

export const metadata = {
  title: 'Contact',
  description: 'Contact Rayiss Electrical and Solar for service enquiries, site checks, and quote requests.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to"
        highlight="Rayiss"
        description="Tell us what you need and where the job is located. We will respond with practical next steps and quote guidance."
      />

      <SectionWrap
        eyebrow="Get in touch"
        title="Phone-first, with written follow-up."
        description="For urgent works, call directly. For planned installations or upgrades, submit the quote form and include as much site context as possible."
      >
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-4">
            {[
              [Phone, 'Call', business.phoneDisplay, `tel:${business.phoneHref}`],
              [Mail, 'Email', business.email, `mailto:${business.email}`],
              [MapPin, 'Office', `${business.addressLine1}, ${business.addressLine2}`],
              [Clock, 'Hours', business.hours],
            ].map(([Icon, label, value, href]) => (
              <div key={label} style={{ background: '#fff', border: '1px solid rgba(10,10,10,0.08)', borderRadius: 14, padding: 18 }}>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500">
                  <Icon size={14} /> {label}
                </div>
                <div style={{ marginTop: 6, fontSize: 16 }}>
                  {href ? (
                    <a href={href} className="hover:underline">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7">
            <QuickQuoteForm />
          </div>
        </div>
      </SectionWrap>

      <CtaStrip
        title="Need service detail first?"
        description="Explore complete service pages for solar and electrical work scopes before submitting your request."
        href="/solar"
        label="View services"
      />
    </>
  );
}
