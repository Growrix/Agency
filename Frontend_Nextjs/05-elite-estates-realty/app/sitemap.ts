import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/config/site.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['/', '/properties', '/buy', '/rent', '/commercial', '/agents', '/investment', '/about', '/contact'];
  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
