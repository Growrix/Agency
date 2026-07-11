import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CtaStrip, PageHero, SectionWrap } from '@/components/site/PageBlocks';
import { solarServices } from '@/lib/site-data';

export const metadata = {
  title: 'Solar services',
  description: 'Rayiss solar installation, battery, upgrade, maintenance, and finance pathways in NSW.',
};

export default function SolarLandingPage() {
  return (
    <>
      <PageHero
        eyebrow="Solar"
        title="Solar systems"
        highlight="built for real usage"
        description="Rayiss solar work covers new installs, battery pathways, system upgrades, maintenance, and finance-aligned planning."
      />

      <SectionWrap
        eyebrow="Solar services"
        title="Six routes, one delivery team."
        description="Each service page includes scope, expected outcomes, and practical inclusions so clients can compare options before quoting."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {solarServices.map((service) => (
            <Link
              key={service.slug}
              href={`/solar/${service.slug}`}
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
        title="Want a fast sizing discussion?"
        description="Share bill range, roof orientation, and property type for a practical first recommendation."
      />
    </>
  );
}
