import type { Metadata } from 'next';
import { HomeView } from '@/components/views/HomeView';
import { buildPageMetadata } from '@/components/seo/metadata';
import { getAgents, getHomeContent } from '@/lib/content/repositories/site-content';
import { siteConfig } from '@/config/site.config';

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomeContent();
  return buildPageMetadata(
    home.seo?.title ?? siteConfig.name,
    home.seo?.description ?? home.hero.lede ?? siteConfig.metadata.defaultDescription,
    '/',
  );
}

export default async function HomePage() {
  const [home, agents] = await Promise.all([getHomeContent(), getAgents()]);

  return (
    <HomeView home={home} agents={agents} />
  );
}
