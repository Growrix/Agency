import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { CtaStrip, PageHero, SectionWrap } from '@/components/site/PageBlocks';
import { projects } from '@/lib/site-data';

export const metadata = {
  title: 'Projects',
  description: 'Browse recent Rayiss electrical and solar project outcomes across NSW.',
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Real jobs."
        highlight="Real outcomes."
        description="Every project has context, constraints, and trade-offs. This archive shows delivery patterns and outcome signals across residential and commercial scopes."
      />

      <SectionWrap
        eyebrow="Case studies"
        title="Recent work from the Rayiss team."
        description="Project pages summarize challenge, scope, and outcomes so you can benchmark your own requirements before requesting a quote."
      >
        <div className="grid lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group"
              style={{
                borderRadius: 20,
                background: '#fff',
                border: '1px solid rgba(10,10,10,0.08)',
                padding: 24,
                display: 'block',
              }}
            >
              <div className="eyebrow mb-4" style={{ color: '#FF5B1F' }}>
                {project.category}
              </div>
              <h3 className="display" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.06, marginBottom: 8 }}>
                {project.title}
              </h3>
              <div className="inline-flex items-center gap-1.5 text-sm text-neutral-500 mb-6">
                <MapPin size={13} /> {project.location}
              </div>
              <p style={{ color: '#4A4A45', lineHeight: 1.65, fontSize: 14.5 }}>{project.summary}</p>

              <div className="grid grid-cols-3 gap-2 mt-7 pt-5 border-t hairline">
                {project.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="mono" style={{ fontSize: 14.5, fontWeight: 500 }}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 text-sm font-medium mt-6 group-hover:translate-x-0.5 transition-transform" style={{ color: '#FF5B1F' }}>
                View project <ArrowUpRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </SectionWrap>

      <CtaStrip
        title="Want numbers for your own property?"
        description="Share your usage profile and location so we can map a project pathway with realistic assumptions."
      />
    </>
  );
}
