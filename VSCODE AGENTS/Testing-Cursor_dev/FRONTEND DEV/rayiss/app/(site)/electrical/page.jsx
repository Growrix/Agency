import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CtaStrip, PageHero, SectionWrap } from '@/components/site/PageBlocks';
import { electricalServices } from '@/lib/site-data';

export const metadata = {
  title: 'Electrical services',
  description: 'Rayiss electrical services including Level 2, EV charging, CCTV, heat pumps, and lighting upgrades.',
};

export default function ElectricalLandingPage() {
  return (
    <>
      <PageHero
        eyebrow="Electrical"
        title="Electrical services"
        highlight="for real-world constraints"
        description="From general works to Level 2 network-facing scope, Rayiss electrical delivery is built around safe sequencing and practical outcomes."
      />

      <SectionWrap
        eyebrow="Electrical services"
        title="Six specialties from one accountable team."
        description="These routes cover common electrical upgrade and compliance needs across residential, strata, and commercial contexts."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {electricalServices.map((service) => (
            <Link
              key={service.slug}
              href={`/electrical/${service.slug}`}
              style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(10,10,10,0.08)', padding: 24 }}
              className="group"
            >
              <h3 className="display" style={{ fontSize: 32, fontWeight: 600, marginBottom: 8, lineHeight: 1.05 }}>
                {service.name}
              </h3>
              <p style={{ color: '#4A4A45', lineHeight: 1.65, fontSize: 14.5 }}>{service.desc}</p>
              <div className="inline-flex items-center gap-2 text-sm font-medium mt-6 group-hover:translate-x-0.5 transition-transform" style={{ color: '#FF5B1F' }}>
                View service <ArrowUpRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </SectionWrap>

      <CtaStrip
        title="Need help selecting the right pathway?"
        description="Use the contact route to share your property type and work scope for practical guidance."
      />
    </>
  );
}
