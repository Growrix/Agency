import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/metadata';
import { CaseStudyView } from '@/components/views/ContentViews';
import { getCaseStudies, getCaseStudy } from '@/lib/content/repositories/site-content';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = await getCaseStudies();
  return items.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return buildMetadata({ title: 'Case Study Not Found' });
  return buildMetadata({
    title: study.title,
    description: study.sum,
    path: `/case-studies/${slug}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  return (
    <main id="main">
      <CaseStudyView study={study} />
    </main>
  );
}
