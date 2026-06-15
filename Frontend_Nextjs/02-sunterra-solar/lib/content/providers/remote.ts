import type { SiteContentRepository } from '@/lib/content/types';

const notConfigured = () => {
  throw new Error('RemoteContentProvider not configured');
};

/** Stub for future CMS/API integration — implement fetch against headless CMS or REST API. */
export class RemoteContentProvider implements SiteContentRepository {
  getNavigation = notConfigured;
  getAnnouncements = notConfigured;
  getHomePage = notConfigured;
  getServices = notConfigured;
  getFaq = notConfigured;
  getTestimonials = notConfigured;
  getPage = notConfigured;
  getBlogPosts = notConfigured;
  getBlogPost = notConfigured;
  getCaseStudies = notConfigured;
  getCaseStudy = notConfigured;
  getStates = notConfigured;
  getForms = notConfigured;
}
