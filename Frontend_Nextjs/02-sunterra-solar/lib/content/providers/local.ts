import announcements from '@/content/announcements.json';
import blog from '@/content/blog.json';
import caseStudies from '@/content/case-studies.json';
import faq from '@/content/faq.json';
import home from '@/content/home.json';
import navigation from '@/content/navigation.json';
import services from '@/content/services.json';
import states from '@/content/states.json';
import testimonials from '@/content/testimonials.json';
import forms from '@/content/forms.json';
import type {
  Announcement,
  BlogPost,
  CaseStudy,
  FaqItem,
  FormsContent,
  HomePageContent,
  NavigationContent,
  PageContent,
  ServiceItem,
  SiteContentRepository,
  StateData,
  Testimonial,
} from '@/lib/content/types';

export class LocalContentProvider implements SiteContentRepository {
  async getNavigation(): Promise<NavigationContent> {
    return navigation as NavigationContent;
  }

  async getAnnouncements(): Promise<Announcement[]> {
    return announcements as Announcement[];
  }

  async getHomePage(): Promise<HomePageContent> {
    return home as HomePageContent;
  }

  async getServices(): Promise<ServiceItem[]> {
    return services as ServiceItem[];
  }

  async getFaq(): Promise<FaqItem[]> {
    return faq as FaqItem[];
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return testimonials as Testimonial[];
  }

  async getPage(slug: string): Promise<PageContent | null> {
    try {
      const mod = await import(`@/content/pages/${slug}.json`);
      return (mod.default ?? mod) as PageContent;
    } catch {
      return null;
    }
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return blog as BlogPost[];
  }

  async getBlogPost(id: string): Promise<BlogPost | null> {
    const posts = await this.getBlogPosts();
    return posts.find((p) => p.id === id) ?? null;
  }

  async getCaseStudies(): Promise<CaseStudy[]> {
    return caseStudies as CaseStudy[];
  }

  async getCaseStudy(id: string): Promise<CaseStudy | null> {
    const items = await this.getCaseStudies();
    return items.find((c) => c.id === id) ?? null;
  }

  async getStates(): Promise<Record<string, StateData>> {
    return states as Record<string, StateData>;
  }

  async getForms(): Promise<FormsContent> {
    return forms as FormsContent;
  }
}

export const contentRepo: SiteContentRepository = new LocalContentProvider();
