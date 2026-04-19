export interface BlogAuthor {
  name: string;
  role: string;
}

export interface BlogComment {
  name: string;
  role: string;
  postedAt: string;
  message: string;
}

export interface BlogSection {
  id: string;
  title: string;
  paragraphs: string[];
  highlight?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: string;
  featured: boolean;
  author: BlogAuthor;
  coverLabel: string;
  sections: BlogSection[];
  comments: BlogComment[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "saas-mvp-architecture-checklist",
    title: "SaaS MVP Architecture Checklist for Shipping Without Rebuild Debt",
    summary:
      "A practical checklist for designing a first release that moves fast without painting the team into a corner six weeks later.",
    excerpt:
      "Use this checklist to scope your first SaaS release around stable domains, fast iteration loops, and infrastructure that will not need to be torn apart after early traction.",
    category: "SaaS Applications",
    tags: ["Architecture", "MVP", "Delivery", "Product Strategy"],
    publishedAt: "2026-04-17",
    readingTime: "8 min read",
    featured: true,
    author: {
      name: "Amina Rahman",
      role: "Product Engineering Lead",
    },
    coverLabel: "Architecture Blueprint",
    sections: [
      {
        id: "start-with-domains",
        title: "Start With Stable Product Domains",
        paragraphs: [
          "Teams usually over-focus on screens and under-focus on the domains that need to stay stable once customers arrive. Before choosing libraries or service boundaries, map the business objects that must remain coherent from onboarding through billing and support.",
          "For most MVPs that means user identity, workspace ownership, billing state, permissions, and a single source of truth for activity. If those boundaries are vague, every later feature will introduce hidden coupling.",
        ],
        highlight:
          "If a future feature depends on the same business rule, it belongs in the same domain conversation today.",
      },
      {
        id: "optimize-for-change",
        title: "Optimize the First Release for Change, Not Completeness",
        paragraphs: [
          "The first shipped version should make experimentation cheap. That means keeping infrastructure obvious, admin workflows explicit, and product analytics close to the features they describe.",
          "A good MVP architecture is not the most abstract one. It is the one that makes it cheap to add pricing changes, onboarding improvements, and internal support tooling after real user feedback starts arriving.",
        ],
      },
      {
        id: "protect-core-paths",
        title: "Protect Core Revenue Paths Early",
        paragraphs: [
          "Authentication, billing, notifications, and basic observability should not be deferred as nice-to-haves. They are part of the product operating system, not polish.",
          "If the team cannot quickly see where users fail or recover payments without manual digging, the MVP is already carrying avoidable delivery debt.",
        ],
      },
    ],
    comments: [
      {
        name: "Jordan P.",
        role: "Founder",
        postedAt: "2026-04-18",
        message:
          "The point about treating billing and observability as part of the product operating system is exactly what we learned the hard way on our first launch.",
      },
      {
        name: "Leila M.",
        role: "Operations Director",
        postedAt: "2026-04-18",
        message:
          "Clear domain boundaries would have saved us a lot of churn between product and engineering. Helpful checklist.",
      },
    ],
  },
  {
    slug: "website-performance-audit-framework",
    title: "A Website Performance Audit Framework That Actually Improves Conversion",
    summary:
      "Most audits stop at Lighthouse scores. This framework ties speed work to revenue, trust, and the moments where visitors decide whether to stay.",
    excerpt:
      "A practical audit approach for landing pages and multi-page marketing sites that connects performance fixes to user confidence and conversion quality.",
    category: "Websites",
    tags: ["Performance", "Conversion", "SEO", "Frontend"],
    publishedAt: "2026-04-14",
    readingTime: "6 min read",
    featured: true,
    author: {
      name: "Mateo Silva",
      role: "Frontend Systems Architect",
    },
    coverLabel: "Performance Audit",
    sections: [
      {
        id: "audit-journey",
        title: "Audit the Journey, Not Just the Homepage",
        paragraphs: [
          "Performance work becomes shallow when it is measured only on a single entry page. Users judge the whole journey: navigation changes, filtered listings, contact forms, pricing comparisons, and checkout steps.",
          "An audit should capture the pages that reflect intent change. Those are often the places where expensive scripts, animation overhead, or content bloat quietly damage trust.",
        ],
      },
      {
        id: "map-fixes-to-decisions",
        title: "Map Each Fix to a Visitor Decision",
        paragraphs: [
          "The highest value fixes are the ones that remove uncertainty around the moments a visitor is trying to decide what to do next. Fast hero rendering is useful, but fast pricing comparison or fast portfolio filtering may be more commercially important.",
          "When a team connects each issue to a user decision, prioritization becomes obvious and the audit stops being a technical vanity project.",
        ],
        highlight:
          "Measure whether the site helps a visitor decide, not whether the benchmark looks aesthetically pleasing in a report.",
      },
      {
        id: "build-habit",
        title: "Turn the Audit Into an Operating Habit",
        paragraphs: [
          "A performance audit should create recurring checks in deployment workflows and content publishing routines. Without that, the same regressions return every quarter.",
          "Teams usually need clear budget ownership for media, tracking scripts, and new interactive modules. Otherwise performance slowly becomes nobody's explicit job.",
        ],
      },
    ],
    comments: [
      {
        name: "Sonia K.",
        role: "Growth Lead",
        postedAt: "2026-04-15",
        message:
          "The section on intent-change pages is useful. Our pricing page was the real problem, not the homepage.",
      },
    ],
  },
  {
    slug: "mcp-server-design-patterns-for-agent-teams",
    title: "MCP Server Design Patterns for Teams Shipping Real Agent Workflows",
    summary:
      "A field guide for designing MCP servers that remain trustworthy once multiple tools, retries, permissions, and operator needs enter the picture.",
    excerpt:
      "These patterns help teams design MCP servers that are observable, safe to extend, and resilient when real users depend on them.",
    category: "MCP Servers",
    tags: ["MCP", "AI Agents", "Integrations", "Observability"],
    publishedAt: "2026-04-11",
    readingTime: "9 min read",
    featured: true,
    author: {
      name: "Nadia Foster",
      role: "AI Systems Engineer",
    },
    coverLabel: "Agent Workflow Map",
    sections: [
      {
        id: "design-for-operators",
        title: "Design for Operators, Not Only Agents",
        paragraphs: [
          "Many MCP discussions focus on tool schemas and forget the people who will own incidents, maintain authentication, or explain failures to stakeholders. A production MCP server must expose enough operational clarity for humans to step in quickly.",
          "That changes how you think about logs, retries, resource names, and permission boundaries. Agent usability matters, but operational legibility matters just as much.",
        ],
      },
      {
        id: "keep-tools-narrow",
        title: "Keep Tools Narrow and Predictable",
        paragraphs: [
          "Broad, ambiguous tools encourage brittle prompts and inconsistent behavior. Teams get more reliable results when each tool has clear input contracts, explicit failure modes, and limited side effects.",
          "That simplicity also makes incident analysis faster because there are fewer hidden branches to reconstruct when a workflow goes wrong.",
        ],
        highlight:
          "The best MCP tools feel boring in isolation and powerful when composed.",
      },
      {
        id: "instrument-handoffs",
        title: "Instrument Every Handoff",
        paragraphs: [
          "The dangerous moments in agent workflows are usually the transitions between planning, tool execution, retries, and user-facing output. Those are the points where context gets lost and trust drops.",
          "A strong MCP setup logs those transitions explicitly so teams can see where the system changed state, why it did so, and how often it needed manual recovery.",
        ],
      },
    ],
    comments: [
      {
        name: "Priya N.",
        role: "Platform Lead",
        postedAt: "2026-04-12",
        message:
          "Strong point on operator legibility. Most design writeups ignore the people who have to debug these systems at 2 AM.",
      },
      {
        name: "Alex T.",
        role: "AI Product Manager",
        postedAt: "2026-04-13",
        message:
          "Narrow tools plus explicit failure modes is the piece we were missing. Good article.",
      },
    ],
  },
  {
    slug: "automation-roadmap-for-operations-teams",
    title: "An Automation Roadmap for Operations Teams That Want Measurable Wins First",
    summary:
      "A straightforward way to sequence automation work so teams stop buying complexity before they have repeatable process value.",
    excerpt:
      "A roadmap for prioritizing automation around repeatable work, approval boundaries, and measurement instead of novelty.",
    category: "Automation",
    tags: ["Automation", "Operations", "ROI", "Workflows"],
    publishedAt: "2026-04-08",
    readingTime: "7 min read",
    featured: false,
    author: {
      name: "Daniel Mercer",
      role: "Automation Strategist",
    },
    coverLabel: "Workflow Sequence",
    sections: [
      {
        id: "start-with-repeatable-work",
        title: "Start With Repeatable Work That Already Has Clear Owners",
        paragraphs: [
          "Automation creates real leverage when it reduces repetitive work that the team already understands. If the process is unstable or ownership is unclear, automation just accelerates confusion.",
          "The first roadmap pass should score workflows by repetition, business impact, exception rate, and how clearly success can be measured.",
        ],
      },
      {
        id: "define-control-points",
        title: "Define Control Points Before Building",
        paragraphs: [
          "Operators need to know where approvals happen, where humans can intervene, and what recovery path exists when a workflow drifts. Those control points are product decisions, not implementation leftovers.",
          "Teams that define them early avoid the false tradeoff between speed and trust.",
        ],
      },
      {
        id: "measure-real-outcomes",
        title: "Measure Real Outcomes Instead of Activity",
        paragraphs: [
          "A healthy automation roadmap tracks hours recovered, error reduction, and time-to-resolution improvements. Merely counting automations shipped is not a success metric.",
          "When measurement is concrete, the roadmap naturally starts favoring workflows that produce compounding value.",
        ],
      },
    ],
    comments: [],
  },
];

export const BLOG_CATEGORIES = Array.from(
  new Set(BLOG_POSTS.map((post) => post.category)),
);

export const BLOG_TAGS = Array.from(
  new Set(BLOG_POSTS.flatMap((post) => post.tags)),
).sort((left, right) => left.localeCompare(right));

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getFeaturedBlogPosts(limit = 3) {
  return BLOG_POSTS.filter((post) => post.featured).slice(0, limit);
}

export function getFilteredBlogPosts(category?: string, tag?: string) {
  return BLOG_POSTS.filter((post) => {
    const matchesCategory = category ? post.category === category : true;
    const matchesTag = tag ? post.tags.includes(tag) : true;
    return matchesCategory && matchesTag;
  });
}

export function getBlogCategoryCounts() {
  return BLOG_CATEGORIES.map((category) => ({
    category,
    count: BLOG_POSTS.filter((post) => post.category === category).length,
  }));
}

export function getBlogTagCounts() {
  return BLOG_TAGS.map((tag) => ({
    tag,
    count: BLOG_POSTS.filter((post) => post.tags.includes(tag)).length,
  }));
}

export function getRelatedBlogPosts(slug: string, limit = 3) {
  const currentPost = getBlogPostBySlug(slug);

  if (!currentPost) {
    return [];
  }

  return BLOG_POSTS.filter((post) => post.slug !== slug)
    .sort((left, right) => {
      const leftScore = left.tags.filter((tag) => currentPost.tags.includes(tag)).length;
      const rightScore = right.tags.filter((tag) => currentPost.tags.includes(tag)).length;

      if (leftScore === rightScore) {
        return right.publishedAt.localeCompare(left.publishedAt);
      }

      return rightScore - leftScore;
    })
    .slice(0, limit);
}