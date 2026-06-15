import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/metadata';
import { ServicesView } from '@/components/views/ServicesView';
import { getHomePage, getServicesPage } from '@/lib/content/repositories/site-content';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicesPage();
  return buildMetadata({ title: page.title, description: page.description, path: '/services' });
}

export default async function ServicesPage() {
  const [page, home] = await Promise.all([getServicesPage(), getHomePage()]);
  return <ServicesView page={page} ctaBand={home.ctaBand} process={home.process} />;
}
