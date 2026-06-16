import type {
  AgentProfile,
  AgentsPageContent,
  ContactFormContent,
  ContactPageContent,
  FaqItem,
  GenericPageContent,
  HomeContent,
  NavigationContent,
  PropertyCard,
  SiteContentRepository,
} from '@/lib/content/types';

/** Stub for future CMS/API integration — implement fetch against headless CMS or REST API. */
export class RemoteContentProvider implements SiteContentRepository {
  async getNavigation(): Promise<NavigationContent> {
    throw new Error('RemoteContentProvider not configured');
  }

  async getHome(): Promise<HomeContent> {
    throw new Error('RemoteContentProvider not configured');
  }

  async getProperties(): Promise<PropertyCard[]> {
    throw new Error('RemoteContentProvider not configured');
  }

  async getAgents(): Promise<AgentProfile[]> {
    throw new Error('RemoteContentProvider not configured');
  }

  async getAgentsPage(): Promise<AgentsPageContent> {
    throw new Error('RemoteContentProvider not configured');
  }

  async getFaq(): Promise<FaqItem[]> {
    throw new Error('RemoteContentProvider not configured');
  }

  async getPage(slug: string): Promise<GenericPageContent | null> {
    void slug;
    throw new Error('RemoteContentProvider not configured');
  }

  async getContactPage(): Promise<ContactPageContent> {
    throw new Error('RemoteContentProvider not configured');
  }

  async getContactForm(): Promise<ContactFormContent> {
    throw new Error('RemoteContentProvider not configured');
  }
}
