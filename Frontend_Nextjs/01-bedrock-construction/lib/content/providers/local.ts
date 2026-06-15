import announcements from '@/content/announcements.json';
import blog from '@/content/blog.json';
import contactForm from '@/content/forms/contact.json';
import home from '@/content/home.json';
import navigation from '@/content/navigation.json';
import aboutPage from '@/content/pages/about.json';
import careersPage from '@/content/pages/careers.json';
import contactPage from '@/content/pages/contact.json';
import industriesPage from '@/content/pages/industries.json';
import insightsPage from '@/content/pages/insights.json';
import projectsPage from '@/content/pages/projects.json';
import servicesPage from '@/content/pages/services.json';
import projects from '@/content/projects.json';
import services from '@/content/services.json';
import faq from '@/content/faq.json';
import testimonials from '@/content/testimonials.json';
import type {
  AboutPageContent,
  BlogPost,
  CareersPageContent,
  ContactPageContent,
  FaqItem,
  FormsContent,
  HomePageContent,
  IndustriesPageContent,
  InsightsPageContent,
  NavigationContent,
  ProjectItem,
  ProjectsPageContent,
  ServiceItem,
  ServicesPageContent,
  SiteContentRepository,
  Testimonial,
} from '@/lib/content/types';

export class LocalContentProvider implements SiteContentRepository {
  async getNavigation(): Promise<NavigationContent> {
    return navigation as NavigationContent;
  }

  async getAnnouncements(): Promise<string[]> {
    return announcements as string[];
  }

  async getHomePage(): Promise<HomePageContent> {
    return home as HomePageContent;
  }

  async getServices(): Promise<ServiceItem[]> {
    return services as ServiceItem[];
  }

  async getProjects(): Promise<ProjectItem[]> {
    return projects as ProjectItem[];
  }

  async getFaq(): Promise<FaqItem[]> {
    return faq as FaqItem[];
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return testimonials as Testimonial[];
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return blog as BlogPost[];
  }

  async getForms(): Promise<FormsContent> {
    return contactForm as FormsContent;
  }

  async getAboutPage(): Promise<AboutPageContent> {
    return aboutPage as AboutPageContent;
  }

  async getServicesPage(): Promise<ServicesPageContent> {
    return servicesPage as ServicesPageContent;
  }

  async getProjectsPage(): Promise<ProjectsPageContent> {
    return projectsPage as ProjectsPageContent;
  }

  async getIndustriesPage(): Promise<IndustriesPageContent> {
    return industriesPage as IndustriesPageContent;
  }

  async getCareersPage(): Promise<CareersPageContent> {
    return careersPage as CareersPageContent;
  }

  async getInsightsPage(): Promise<InsightsPageContent> {
    return insightsPage as InsightsPageContent;
  }

  async getContactPage(): Promise<ContactPageContent> {
    return contactPage as ContactPageContent;
  }
}

export const contentRepo: SiteContentRepository = new LocalContentProvider();
