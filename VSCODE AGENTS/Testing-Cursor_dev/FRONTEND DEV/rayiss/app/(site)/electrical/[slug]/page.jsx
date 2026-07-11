import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CtaStrip, PageHero, SectionWrap } from '@/components/site/PageBlocks';
import { electricalServices, getElectricalService } from '@/lib/site-data';

export function generateStaticParams() {
  return electricalServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getElectricalService(slug);

  if (!service) {
    return { title: 'Electrical service not found' };
  }

  return {
    title: `Electrical - ${service.name}`,
    description: service.desc,
  };
}

export default async function ElectricalServicePage({ params }) {
  const { slug } = await params;
  const service = getElectricalService(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Electrical service"
        title={service.name}
        highlight=""
        description={service.desc}
        ctaHref="/contact"
        ctaLabel="Request this service"
      />

      <SectionWrap
        eyebrow="Scope"
        title="What this service includes."
        description={service.outcome}
      >
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7" style={{ background: '#fff', border: '1px solid rgba(10,10,10,0.08)', borderRadius: 16, padding: 24 }}>
            <div className="space-y-3">
              {service.includes.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 size={16} style={{ color: '#FF5B1F', marginTop: 4, flexShrink: 0 }} />
                  <p style={{ color: '#4A4A45', lineHeight: 1.65 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5" style={{ background: '#0A0A0A', color: '#fff', borderRadius: 16, padding: 24 }}>
            <div className="eyebrow mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Outcome focus
            </div>
            <p style={{ color: 'rgba(255,255,255,0.82)', lineHeight: 1.7 }}>{service.outcome}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium mt-6" style={{ color: '#FF5B1F' }}>
              Start a quote <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <Link href="/electrical" className="inline-flex items-center gap-2 text-sm font-medium mt-8" style={{ color: '#FF5B1F' }}>
          <ArrowLeft size={14} /> Back to electrical services
        </Link>
      </SectionWrap>

      <CtaStrip
        title="Need this service scoped now?"
        description="Share your site details and timeline for a practical delivery path."
      />
    </>
  );
}
