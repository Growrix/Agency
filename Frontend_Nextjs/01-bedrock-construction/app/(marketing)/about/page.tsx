import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/metadata';
import { AboutView } from '@/components/views/AboutView';
import { getAboutPage, getHomePage } from '@/lib/content/repositories/site-content';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAboutPage();
  return buildMetadata({ title: page.title, description: page.description, path: '/about' });
}

export default async function AboutPage() {
  const [page, home] = await Promise.all([getAboutPage(), getHomePage()]);
  return <AboutView page={page} ctaBand={home.ctaBand} />;
}
