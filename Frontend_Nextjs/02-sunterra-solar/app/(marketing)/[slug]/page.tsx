import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/metadata';
import { ContactView } from '@/components/views/ContactView';
import { InspectionView } from '@/components/views/InspectionView';
import { ProsePageView } from '@/components/views/PageHero';
import { RebateCheckerView } from '@/components/views/RebateCheckerView';
import { FaqPageView } from '@/components/views/ContentViews';
import { PAGE_SLUGS } from '@/lib/content/page-slugs';
import { getFaq, getForms, getPage, getStates } from '@/lib/content/repositories/site-content';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return buildMetadata({ title: 'Not Found' });
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: `/${slug}`,
  });
}

export default async function ProsePage({ params }: Props) {
  const { slug } = await params;

  if (slug === 'faq') {
    const items = await getFaq();
    return (
      <main id="main">
        <FaqPageView items={items} />
      </main>
    );
  }

  const page = await getPage(slug);
  if (!page) notFound();

  if (slug === 'contact') {
    const forms = await getForms();
    return (
      <main id="main">
        <ContactView page={page} forms={forms} />
      </main>
    );
  }

  if (slug === 'rebates') {
    const [forms, states] = await Promise.all([getForms(), getStates()]);
    return (
      <main id="main">
        <RebateCheckerView page={page} forms={forms} states={states} />
      </main>
    );
  }

  if (slug === 'inspection') {
    const [forms, states] = await Promise.all([getForms(), getStates()]);
    return (
      <main id="main">
        <InspectionView page={page} forms={forms} states={states} />
      </main>
    );
  }

  return (
    <main id="main">
      <ProsePageView page={page} />
    </main>
  );
}
