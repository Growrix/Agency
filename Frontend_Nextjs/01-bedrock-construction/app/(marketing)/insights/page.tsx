import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/metadata';
import { InsightsView } from '@/components/views/InsightsView';
import { getBlogPosts, getForms, getHomePage, getInsightsPage } from '@/lib/content/repositories/site-content';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getInsightsPage();
  return buildMetadata({ title: page.title, description: page.description, path: '/insights' });
}

export default async function InsightsPage() {
  const [page, posts, home, forms] = await Promise.all([
    getInsightsPage(),
    getBlogPosts(),
    getHomePage(),
    getForms(),
  ]);

  return (
    <InsightsView
      page={page}
      posts={posts}
      ctaBand={home.ctaBand}
      newsletterSuccess={forms.newsletter.successMessage}
      newsletterPlaceholder={forms.newsletter.placeholder}
    />
  );
}
