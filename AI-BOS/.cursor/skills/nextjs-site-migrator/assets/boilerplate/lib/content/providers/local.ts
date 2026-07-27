import navigation from '@/content/navigation.json';
import type { BlogPost, NavigationContent, PageContent, SiteContentRepository } from '@/lib/content/types';

async function readJson<T>(value: T): Promise<T> {
  return value;
}

export class LocalContentProvider implements SiteContentRepository {
  async getNavigation(): Promise<NavigationContent> {
    return readJson(navigation as NavigationContent);
  }

  async getPage(slug: string): Promise<PageContent | null> {
    try {
      const mod = await import(`@/content/pages/${slug}.json`);
      return mod.default as PageContent;
    } catch {
      return null;
    }
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    const mod = await import('@/content/blog.json');
    return mod.default as BlogPost[];
  }

  async getBlogPost(id: string): Promise<BlogPost | null> {
    const posts = await this.getBlogPosts();
    return posts.find((p) => p.id === id) ?? null;
  }
}

export const contentRepo: SiteContentRepository = new LocalContentProvider();
