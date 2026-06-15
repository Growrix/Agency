export interface NavLink {
  label: string;
  href: string;
  accent?: boolean;
  num?: string;
  icon?: string;
}

export interface NavigationContent {
  main: NavLink[];
  drawer: NavLink[];
  bottomNav: NavLink[];
  footer: Record<string, NavLink[]>;
  cta: NavLink;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  stars: number;
}

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  sector: string;
  scope: string;
  location: string;
  year: string;
  value: string;
  image: string;
  span2?: boolean;
}

export interface StatItem {
  counter?: number;
  suffix?: string;
  label: string;
  value?: string;
}

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

export interface HomePageContent {
  hero: {
    eyebrow: string;
    title: string;
    titleLine2: string;
    titleHighlight: string;
    lede: string;
    image: string;
    ctas: { label: string; href: string; variant: string }[];
    metrics: { value: string; label: string }[];
  };
  clientStrip: { label: string; clients: string[] };
  overview: {
    eyebrow: string;
    title: string;
    lede: string;
    cta: NavLink;
    cards: { num: string; title: string; text: string }[];
  };
  servicesPreview: { eyebrow: string; title: string; lede: string; cta: NavLink };
  projectsPreview: { eyebrow: string; title: string; cta: NavLink };
  stats: StatItem[];
  process: {
    eyebrow: string;
    title: string;
    steps: { num: number; title: string; desc: string }[];
  };
  testimonials: { eyebrow: string; title: string };
  sustainability: {
    eyebrow: string;
    title: string;
    lede: string;
    stat: string;
    statLabel: string;
    image: string;
    items: string[];
  };
  faqPreview: { eyebrow: string; title: string; lede: string; cta: NavLink };
  ctaBand: {
    title: string;
    lede: string;
    image: string;
    actions: { label: string; href: string; variant: string }[];
  };
}

export interface PageHero {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
}

export interface AboutPageContent {
  slug: string;
  title: string;
  description: string;
  hero: PageHero;
  intro: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    cta: NavLink;
    stats: StatItem[];
  };
  foundation: {
    eyebrow: string;
    title: string;
    cards: { title: string; text: string }[];
  };
  leadership: {
    eyebrow: string;
    title: string;
    cta: NavLink;
    team: { initials: string; name: string; role: string }[];
  };
  awards: { eyebrow: string; title: string; lede: string; items: string[] };
}

export interface ServicesPageContent {
  slug: string;
  title: string;
  description: string;
  hero: PageHero;
  sections: {
    num: string;
    title: string;
    lede: string;
    image: string;
    imageAlt: string;
    imageFirst: boolean;
  }[];
}

export interface ProjectsPageContent {
  slug: string;
  title: string;
  description: string;
  hero: PageHero;
  gridHead: { eyebrow: string; title: string };
  featuredCaseStudy: {
    eyebrow: string;
    title: string;
    image: string;
    stats: { value: string; label: string }[];
    body: string;
    cta: NavLink;
  };
  projects: ProjectItem[];
}

export interface IndustriesPageContent {
  slug: string;
  title: string;
  description: string;
  hero: PageHero;
  industries: { title: string; description: string; image: string }[];
  stats: StatItem[];
}

export interface CareersPageContent {
  slug: string;
  title: string;
  description: string;
  hero: PageHero;
  culture: {
    eyebrow: string;
    title: string;
    benefits: { title: string; text: string }[];
  };
  openings: {
    eyebrow: string;
    title: string;
    cta: NavLink;
    jobs: { title: string; excerpt: string; location: string; sector: string; type: string }[];
  };
}

export interface InsightsPageContent {
  slug: string;
  title: string;
  description: string;
  hero: PageHero;
  newsletter: { eyebrow: string; title: string; lede: string };
}

export interface ContactPageContent {
  slug: string;
  title: string;
  description: string;
  hero: PageHero;
  sidebar: {
    eyebrow: string;
    title: string;
    lede: string;
    regionalOffices: { city: string; address: string }[];
  };
  faqSection: { eyebrow: string; title: string };
}

export interface ContactFormContent {
  projectTypes: string[];
  budgetOptions: string[];
  submitSuccess: string;
  submitLabel: string;
}

export interface FormsContent {
  contact: ContactFormContent;
  newsletter: { placeholder: string; footerPlaceholder: string; successMessage: string };
  fab: { openLabel: string; closeLabel: string };
}

export interface SiteContentRepository {
  getNavigation(): Promise<NavigationContent>;
  getAnnouncements(): Promise<string[]>;
  getHomePage(): Promise<HomePageContent>;
  getServices(): Promise<ServiceItem[]>;
  getProjects(): Promise<ProjectItem[]>;
  getFaq(): Promise<FaqItem[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getBlogPosts(): Promise<BlogPost[]>;
  getForms(): Promise<FormsContent>;
  getAboutPage(): Promise<AboutPageContent>;
  getServicesPage(): Promise<ServicesPageContent>;
  getProjectsPage(): Promise<ProjectsPageContent>;
  getIndustriesPage(): Promise<IndustriesPageContent>;
  getCareersPage(): Promise<CareersPageContent>;
  getInsightsPage(): Promise<InsightsPageContent>;
  getContactPage(): Promise<ContactPageContent>;
}
