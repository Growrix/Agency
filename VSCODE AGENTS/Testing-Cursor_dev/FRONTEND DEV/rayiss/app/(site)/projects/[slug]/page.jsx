import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin } from 'lucide-react';
import { CtaStrip, PageHero, SectionWrap } from '@/components/site/PageBlocks';
import { getProject, projects } from '@/lib/site-data';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: 'Project not found' };
  }

  return {
    title: `Project - ${project.title}`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={project.category}
        title={project.title}
        highlight=""
        description={project.summary}
        ctaHref="/contact"
        ctaLabel="Start a similar project"
      />

      <SectionWrap
        eyebrow="Project snapshot"
        title="Scope and outcome overview."
        description="This detail view records the practical before-and-after story so clients can compare against similar site constraints."
      >
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4" style={{ background: '#fff', border: '1px solid rgba(10,10,10,0.08)', borderRadius: 16, padding: 20 }}>
            <div className="eyebrow mb-2" style={{ color: '#FF5B1F' }}>
              Location
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-neutral-600">
              <MapPin size={14} /> {project.location}
            </div>

            <div className="mt-6 pt-6 border-t hairline space-y-4">
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xs text-neutral-500">{stat.label}</div>
                  <div className="mono" style={{ fontSize: 18, fontWeight: 500 }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8" style={{ background: '#fff', border: '1px solid rgba(10,10,10,0.08)', borderRadius: 16, padding: 24 }}>
            <div className="space-y-6">
              <div>
                <div className="eyebrow mb-2" style={{ color: '#FF5B1F' }}>
                  Challenge
                </div>
                <p style={{ color: '#4A4A45', lineHeight: 1.65 }}>{project.challenge}</p>
              </div>
              <div>
                <div className="eyebrow mb-2" style={{ color: '#FF5B1F' }}>
                  Delivery
                </div>
                <p style={{ color: '#4A4A45', lineHeight: 1.65 }}>{project.solution}</p>
              </div>
              <div>
                <div className="eyebrow mb-2" style={{ color: '#FF5B1F' }}>
                  Result
                </div>
                <p style={{ color: '#4A4A45', lineHeight: 1.65 }}>{project.result}</p>
              </div>
            </div>
          </div>
        </div>

        <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium mt-8" style={{ color: '#FF5B1F' }}>
          <ArrowLeft size={14} /> Back to projects
        </Link>
      </SectionWrap>

      <CtaStrip
        title="Planning something similar?"
        description="Send your site context and consumption profile for a project-aligned quote pathway."
      />
    </>
  );
}
