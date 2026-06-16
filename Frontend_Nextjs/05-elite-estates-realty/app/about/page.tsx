import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GenericPageView } from '@/components/views/GenericPageView';
import { buildPageMetadata } from '@/components/seo/metadata';
import { getPageContent } from '@/lib/content/repositories/site-content';
import { siteConfig } from '@/config/site.config';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('about');
  return buildPageMetadata(
    page?.seo?.title ?? page?.hero.eyebrow ?? siteConfig.name,
    page?.seo?.description ?? page?.hero.lede ?? siteConfig.metadata.defaultDescription,
    '/about',
  );
}

export default async function AboutPage() {
  const page = await getPageContent('about');
  if (!page) notFound();

  return <GenericPageView page={page} />;
}
