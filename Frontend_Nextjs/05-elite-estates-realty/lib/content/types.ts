export interface NavLink {
  label: string;
  href: string;
  accent?: boolean;
  active?: boolean;
}

export interface FooterLinkGroups {
  properties: NavLink[];
  company: NavLink[];
  resources: NavLink[];
  legal: NavLink[];
}

export interface NavigationContent {
  main: NavLink[];
  bottom: NavLink[];
  ticker: string[];
  headerCtas: {
    consultation: NavLink;
    browse: NavLink;
  };
  accessibility: {
    skipToContentLabel: string;
    tickerAriaLabel: string;
    primaryNavLabel: string;
    mobileNavLabel: string;
    drawerLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
    closeDrawerLabel: string;
    toggleThemeLabel: string;
    drawerLinksLabel: string;
    homepageLinkLabel: string;
    tickerPauseLabel: string;
    tickerPlayLabel: string;
  };
  footerLabels: {
    properties: string;
    company: string;
    resources: string;
    globalHq: string;
    allRightsReserved: string;
  };
  footerNewsletter: {
    title: string;
    emailLabel: string;
    placeholder: string;
    submitLabel: string;
    successMessage: string;
    invalidMessage: string;
  };
  footer: FooterLinkGroups;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  lede: string;
  backgroundImage: string;
  breadcrumb?: string;
}

export interface PropertyCard {
  id: string;
  title: string;
  image: string;
  location: string;
  price: string;
  priceSub?: string;
  tag: string;
  status: string;
  beds?: string;
  baths?: string;
  size?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export interface CategoryCard {
  id: string;
  title: string;
  subtitle: string;
  href?: string;
}

export interface FeatureItem {
  title: string;
  text: string;
}

export interface MarketItem {
  name: string;
  yield: string;
  note: string;
}

export interface DevelopmentItem {
  id: string;
  title: string;
  phase: string;
  location: string;
  completion: string;
  image: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  text: string;
}

export interface StatItem {
  value: string;
  label: string;
  counter?: number;
  prefix?: string;
  suffix?: string;
}

export interface AgentProfile {
  id: string;
  name: string;
  role: string;
  languages: string;
  image: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
}

export interface AwardItem {
  id: string;
  title: string;
  subtitle: string;
}

export interface ArticlePreview {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface HomeContent {
  seo?: {
    title: string;
    description: string;
  };
  hero: HeroContent & {
    ctas: NavLink[];
    searchTabs: NavLink[];
    counters: StatItem[];
    searchSubmitHref: string;
    searchLabels: {
      location: string;
      propertyType: string;
      budget: string;
      bedrooms: string;
      bathrooms: string;
      submit: string;
    };
    searchFields: {
      location: string[];
      propertyType: string[];
      budget: string[];
      bedrooms: string[];
      bathrooms: string[];
    };
  };
  featured: {
    eyebrow: string;
    title: string;
    cta: NavLink;
    properties: PropertyCard[];
  };
  categories: {
    eyebrow: string;
    title: string;
    items: CategoryCard[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    items: FeatureItem[];
  };
  markets: {
    eyebrow: string;
    title: string;
    lede: string;
    cta: NavLink;
    cardCtaLabel: string;
    cardCtaHref: string;
    items: MarketItem[];
  };
  developments: {
    eyebrow: string;
    title: string;
    completionLabel: string;
    cardCta: NavLink;
    items: DevelopmentItem[];
  };
  process: {
    eyebrow: string;
    title: string;
    steps: ProcessStep[];
  };
  statsBand: StatItem[];
  agents: {
    eyebrow: string;
    title: string;
    cardCtaLabel: string;
    cardCtaHref: string;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: Testimonial[];
  };
  awards: {
    eyebrow: string;
    items: AwardItem[];
  };
  insights: {
    eyebrow: string;
    title: string;
    items: ArticlePreview[];
  };
  faq: {
    eyebrow: string;
    title: string;
    lede: string;
    cta: NavLink;
    items: FaqItem[];
  };
  ctaBand: {
    title: string;
    lede: string;
    actions: NavLink[];
  };
}

export interface GenericPageContent {
  slug: string;
  hero: HeroContent;
  section: {
    eyebrow: string;
    title: string;
    lede: string;
    bullets?: string[];
    stats?: StatItem[];
    filters?: string[];
    fallbackCard?: {
      title: string;
      text: string;
    };
  };
  cta?: NavLink;
  seo?: {
    title: string;
    description: string;
  };
}

export interface AgentsPageContent {
  slug: string;
  hero: HeroContent;
  seo?: {
    title: string;
    description: string;
  };
  section: {
    eyebrow: string;
    title: string;
    lede: string;
    cardCta: NavLink;
    primaryCta: NavLink;
  };
}

export interface ContactPageContent {
  slug: string;
  hero: HeroContent;
  seo?: {
    title: string;
    description: string;
  };
  section: {
    eyebrow: string;
    title: string;
    lede: string;
    regionalOfficesLabel: string;
    contactRows: {
      label: string;
      value: string;
      type: 'phone' | 'email' | 'location';
    }[];
    regionalOffices: string[];
  };
}

export interface ContactFormContent {
  headings: {
    title: string;
    privacyNote: string;
    successMessage: string;
  };
  fields: {
    fullNameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    budgetLabel: string;
    enquiryTypeLabel: string;
    locationLabel: string;
    requirementsLabel: string;
  };
  options: {
    budget: string[];
    enquiryType: string[];
    preferredLocation: string[];
  };
  placeholders: {
    fullName: string;
    email: string;
    phone: string;
    requirements: string;
  };
  validation: {
    required: string;
    invalidEmail: string;
  };
  submitLabel: string;
}

export interface SiteContentRepository {
  getNavigation(): Promise<NavigationContent>;
  getHome(): Promise<HomeContent>;
  getProperties(): Promise<PropertyCard[]>;
  getAgents(): Promise<AgentProfile[]>;
  getAgentsPage(): Promise<AgentsPageContent>;
  getFaq(): Promise<FaqItem[]>;
  getPage(slug: string): Promise<GenericPageContent | null>;
  getContactPage(): Promise<ContactPageContent>;
  getContactForm(): Promise<ContactFormContent>;
}
