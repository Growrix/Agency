import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/metadata';
import { IndustriesView } from '@/components/views/IndustriesView';
import { getHomePage, getIndustriesPage } from '@/lib/content/repositories/site-content';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getIndustriesPage();
  return buildMetadata({ title: page.title, description: page.description, path: '/industries' });
}

export default async function IndustriesPage() {
  const [page, home] = await Promise.all([getIndustriesPage(), getHomePage()]);
  return <IndustriesView page={page} ctaBand={home.ctaBand} />;
}
