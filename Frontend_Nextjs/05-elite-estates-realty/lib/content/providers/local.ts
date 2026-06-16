import navigation from '@/content/navigation.json';
import home from '@/content/home.json';
import properties from '@/content/properties.json';
import agents from '@/content/agents.json';
import faq from '@/content/faq.json';
import contactForm from '@/content/forms/contact.json';
import contactPage from '@/content/pages/contact.json';
import agentsPage from '@/content/pages/agents.json';
import { siteConfig } from '@/config/site.config';
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

async function readJson<T>(value: T): Promise<T> {
  return value;
}

export class LocalContentProvider implements SiteContentRepository {
  async getNavigation(): Promise<NavigationContent> {
    return readJson(navigation as NavigationContent);
  }

  async getHome(): Promise<HomeContent> {
    return readJson(home as HomeContent);
  }

  async getProperties(): Promise<PropertyCard[]> {
    return readJson(properties as PropertyCard[]);
  }

  async getAgents(): Promise<AgentProfile[]> {
    return readJson(agents as AgentProfile[]);
  }

  async getAgentsPage(): Promise<AgentsPageContent> {
    return readJson(agentsPage as AgentsPageContent);
  }

  async getFaq(): Promise<FaqItem[]> {
    return readJson(faq as FaqItem[]);
  }

  async getPage(slug: string): Promise<GenericPageContent | null> {
    try {
      const mod = await import(`@/content/pages/${slug}.json`);
      return (mod.default ?? mod) as GenericPageContent;
    } catch {
      return null;
    }
  }

  async getContactPage(): Promise<ContactPageContent> {
    const page = await readJson(contactPage as ContactPageContent);
    return {
      ...page,
      section: {
        ...page.section,
        contactRows: page.section.contactRows.map((row) => {
          if (row.type === 'phone') return { ...row, value: siteConfig.phoneDisplay };
          if (row.type === 'email') return { ...row, value: siteConfig.email };
          if (row.type === 'location') {
            return {
              ...row,
              value: `${siteConfig.address.street}, ${siteConfig.address.locality} ${siteConfig.address.postalCode}`,
            };
          }
          return row;
        }),
        regionalOffices: [...siteConfig.officeRegions],
      },
    };
  }

  async getContactForm(): Promise<ContactFormContent> {
    return readJson(contactForm as ContactFormContent);
  }
}

export const contentRepo: SiteContentRepository = new LocalContentProvider();
