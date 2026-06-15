import type { MetadataRoute } from 'next';
import { PAGE_SLUGS } from '@/lib/content/page-slugs';
import { getBlogPosts, getCaseStudies } from '@/lib/content/repositories/site-content';
import { getSiteUrl } from '@/config/site.config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl().replace(/\/$/, '');
  const [posts, cases] = await Promise.all([getBlogPosts(), getCaseStudies()]);
  const now = new Date();

  const staticRoutes = [
    '',
    '/calculator',
    '/quote',
    '/blog',
    '/case-studies',
    ...PAGE_SLUGS.map((s) => `/${s}`),
  ];

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));

  posts.forEach((p) => {
    entries.push({
      url: `${base}/blog/${p.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  cases.forEach((c) => {
    entries.push({
      url: `${base}/case-studies/${c.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  });

  return entries;
}
