export interface NavLink {
  label: string;
  href: string;
  accent?: boolean;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

export interface MegaPromo {
  title: string;
  description: string;
  cta: NavLink;
}

export interface NavigationContent {
  main: NavLink[];
  mega: {
    groups: NavGroup[];
    promo: MegaPromo;
  };
  drawer: NavGroup[];
  bottomNav: NavLink[];
  footer: Record<string, NavLink[]>;
}

export interface Announcement {
  id: string;
  html: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  lede: string;
  ctas: NavLink[];
  trustChips: string[];
  form: {
    title: string;
    subtitle: string;
    submitLabel: string;
    billOptions: { value: string; label: string }[];
  };
}

export interface SectionHead {
  eyebrow?: string;
  title: string;
  lede?: string;
  link?: NavLink;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

export interface PillarItem {
  title: string;
  text: string;
}

export interface WhyUsItem {
  num: string;
  title: string;
  text: string;
}

export interface StatItem {
  value: string;
  label: string;
  counter?: number;
  suffix?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  stars: number;
}

export interface Partner {
  name: string;
}

export interface ServiceArea {
  state: string;
  dnsps: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HomePageContent {
  hero: HeroContent;
  trustBar: string[];
  calcPreview: SectionHead & { cta: NavLink };
  services: SectionHead;
  whySolar: SectionHead & { pillars: PillarItem[] };
  rebatesBand: {
    title: string;
    lede: string;
    items: string[];
    cta: NavLink;
  };
  whyUs: SectionHead & { items: WhyUsItem[]; cta: NavLink };
  stats: StatItem[];
  caseStudies: SectionHead;
  testimonials: SectionHead;
  partners: SectionHead & { items: Partner[] };
  finance: SectionHead & {
    features: string[];
    cta: NavLink;
    cardTitle: string;
    cardText: string;
  };
  serviceAreas: SectionHead & { areas: ServiceArea[] };
  blog: SectionHead;
  faqPreview: SectionHead & { cta: NavLink };
  ctaBand: {
    title: string;
    lede: string;
    actions: NavLink[];
  };
}

export interface PageContent {
  slug: string;
  title: string;
  description?: string;
  hero?: { title: string; lede?: string; breadcrumb?: string };
  prose?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  read: string;
  author: string;
  excerpt: string;
  body: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  loc: string;
  size: string;
  save: string;
  sum: string;
  body: string[];
}

export interface StateData {
  name: string;
  zone: number;
  psh: number;
}

export interface FormsContent {
  quote: {
    steps: string[];
    propertyTypes: string[];
    roofTypes: string[];
    billOptions: { value: string; label: string }[];
    phaseOptions: string[];
    batteryOptions: string[];
    evOptions: string[];
    consentLabel: string;
    privacyHref: string;
    submitSuccess: string;
    submitToast: string;
    demoNote: string;
  };
  hero: { submitSuccess: string; submitToast: string };
  contact: { subjects: string[]; submitSuccess: string };
  inspection: {
    timeSlots: string[];
    notesPlaceholder: string;
    submitSuccess: string;
    submitToast: string;
  };
  rebates: {
    infoBox: string;
    stateMessages: Record<string, string>;
  };
  calculator: { defaultCost: number };
  fab: {
    items: { label: string; href: string; type?: string }[];
    openLabel: string;
    closeLabel: string;
  };
}

export interface SiteContentRepository {
  getNavigation(): Promise<NavigationContent>;
  getAnnouncements(): Promise<Announcement[]>;
  getHomePage(): Promise<HomePageContent>;
  getServices(): Promise<ServiceItem[]>;
  getFaq(): Promise<FaqItem[]>;
  getTestimonials(): Promise<Testimonial[]>;
  getPage(slug: string): Promise<PageContent | null>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | null>;
  getCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudy(id: string): Promise<CaseStudy | null>;
  getStates(): Promise<Record<string, StateData>>;
  getForms(): Promise<FormsContent>;
}
