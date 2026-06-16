import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PropertiesView } from '@/components/views/PropertiesView';
import { buildPageMetadata } from '@/components/seo/metadata';
import { getPageContent, getProperties } from '@/lib/content/repositories/site-content';
import { siteConfig } from '@/config/site.config';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('properties');
  return buildPageMetadata(
    page?.seo?.title ?? page?.hero.eyebrow ?? siteConfig.name,
    page?.seo?.description ?? page?.hero.lede ?? siteConfig.metadata.defaultDescription,
    '/properties',
  );
}

export default async function PropertiesPage() {
  const [page, properties] = await Promise.all([getPageContent('properties'), getProperties()]);
  if (!page) notFound();

  return <PropertiesView page={page} properties={properties} />;
}
