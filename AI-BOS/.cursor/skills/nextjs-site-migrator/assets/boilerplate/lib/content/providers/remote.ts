import type { SiteContentRepository } from '@/lib/content/types';

/** Stub for future CMS/API integration — implement fetch against headless CMS or REST API. */
export class RemoteContentProvider implements SiteContentRepository {
  async getNavigation() {
    throw new Error('RemoteContentProvider not configured');
  }
  async getPage() {
    throw new Error('RemoteContentProvider not configured');
  }
  async getBlogPosts() {
    throw new Error('RemoteContentProvider not configured');
  }
  async getBlogPost() {
    throw new Error('RemoteContentProvider not configured');
  }
}
