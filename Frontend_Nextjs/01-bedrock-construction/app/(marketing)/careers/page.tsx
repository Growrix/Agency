import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/metadata';
import { CareersView } from '@/components/views/CareersView';
import { getCareersPage, getHomePage } from '@/lib/content/repositories/site-content';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCareersPage();
  return buildMetadata({ title: page.title, description: page.description, path: '/careers' });
}

export default async function CareersPage() {
  const [page, home] = await Promise.all([getCareersPage(), getHomePage()]);
  return <CareersView page={page} ctaBand={home.ctaBand} />;
}
