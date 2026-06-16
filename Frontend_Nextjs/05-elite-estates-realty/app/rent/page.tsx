import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RentView } from '@/components/views/RentView';
import { buildPageMetadata } from '@/components/seo/metadata';
import { getPageContent, getProperties } from '@/lib/content/repositories/site-content';
import { siteConfig } from '@/config/site.config';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('rent');
  return buildPageMetadata(
    page?.seo?.title ?? page?.hero.eyebrow ?? siteConfig.name,
    page?.seo?.description ?? page?.hero.lede ?? siteConfig.metadata.defaultDescription,
    '/rent',
  );
}

export default async function RentPage() {
  const [page, properties] = await Promise.all([getPageContent('rent'), getProperties()]);
  if (!page) notFound();

  return <RentView page={page} properties={properties} />;
}
