import { buildMetadata } from '@/components/seo/metadata';
import { CaseStudiesListView } from '@/components/views/ContentViews';
import { getCaseStudies } from '@/lib/content/repositories/site-content';

export const metadata = buildMetadata({
  title: 'Case Studies',
  description: 'Real solar savings across the NEM from residential to commercial installs.',
  path: '/case-studies',
});

export default async function CaseStudiesPage() {
  const items = await getCaseStudies();
  return (
    <main id="main">
      <CaseStudiesListView items={items} />
    </main>
  );
}
