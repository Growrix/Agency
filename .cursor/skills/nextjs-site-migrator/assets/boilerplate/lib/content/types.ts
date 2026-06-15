export interface NavLink {
  label: string;
  href: string;
  accent?: boolean;
}

export interface NavigationContent {
  main: NavLink[];
  footer: Record<string, NavLink[]>;
}

export interface PageContent {
  slug: string;
  title: string;
  description?: string;
  hero?: { title: string; lede?: string };
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

export interface SiteContentRepository {
  getNavigation(): Promise<NavigationContent>;
  getPage(slug: string): Promise<PageContent | null>;
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | null>;
}
