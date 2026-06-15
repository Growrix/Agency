import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site.config';

const routes = ['', '/about', '/services', '/projects', '/industries', '/careers', '/insights', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));
}
