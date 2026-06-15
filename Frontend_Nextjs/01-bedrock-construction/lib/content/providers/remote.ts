import type { SiteContentRepository } from '@/lib/content/types';

const notConfigured = (): never => {
  throw new Error('RemoteContentProvider not configured');
};

/** Stub for future CMS/API integration — implement fetch against headless CMS or REST API. */
export class RemoteContentProvider implements SiteContentRepository {
  getNavigation = async () => notConfigured();
  getAnnouncements = async () => notConfigured();
  getHomePage = async () => notConfigured();
  getServices = async () => notConfigured();
  getProjects = async () => notConfigured();
  getFaq = async () => notConfigured();
  getTestimonials = async () => notConfigured();
  getBlogPosts = async () => notConfigured();
  getForms = async () => notConfigured();
  getAboutPage = async () => notConfigured();
  getServicesPage = async () => notConfigured();
  getProjectsPage = async () => notConfigured();
  getIndustriesPage = async () => notConfigured();
  getCareersPage = async () => notConfigured();
  getInsightsPage = async () => notConfigured();
  getContactPage = async () => notConfigured();
}
