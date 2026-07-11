import { brandConfig } from "@/data/brand";

export type BlogPost = {
  slug: string;
  date: string;
  title: string;
  image: string;
  excerpt: string;
  content: string[];
  author: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "moving-from-ticket-system-to-forum",
    date: "2017-04-19",
    title: "MOVING FROM TICKET SYSTEM TO FORUM",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80",
    excerpt: `Why ${brandConfig.siteName} migrated support conversations into a searchable community forum.`,
    content: [
      "Our support team moved from a private ticket queue to a public-first forum model to improve response speed and knowledge sharing.",
      "By tagging recurring technical issues and linking product references, we reduced duplicate tickets and made answers discoverable for everyone.",
      `The forum now acts as both a support channel and a structured learning archive for new ${brandConfig.siteName} customers.`,
    ],
    author: "Support Team",
    tags: ["support", "community", "operations"],
  },
  {
    slug: "8-ideas-to-get-your-site-ready",
    date: "2017-04-19",
    title: "8 IDEAS TO GET YOUR SITE READY",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    excerpt: "A practical launch checklist for automotive commerce experiences.",
    content: [
      "A strong storefront launch depends on complete route coverage and honest user journeys from first click to checkout.",
      "We recommend validating product discovery, cart persistence, and mobile conversion pathways before public rollout.",
      "When visual sections and route destinations are aligned, bounce rates drop and repeat visits rise naturally.",
    ],
    author: "Product Team",
    tags: ["launch", "ux", "commerce"],
  },
  {
    slug: "customer-support-notice-for-holiday",
    date: "2017-04-19",
    title: "CUSTOMER SUPPORT NOTICE FOR HOLIDAY",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80",
    excerpt: "Holiday support coverage timelines and service continuity details.",
    content: [
      "During holiday weeks, live support hours adjust while order tracking and help-center documentation remain available 24/7.",
      "Urgent shipping requests can still be submitted through the support routes, with responses prioritized by fulfillment deadlines.",
      "We publish route and status updates in advance so customers always know where to find the right support destination.",
    ],
    author: "Operations Desk",
    tags: ["holiday", "support", "shipping"],
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
