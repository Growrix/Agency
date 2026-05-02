/**
 * Create new CMS posts in Sanity using the CLI auth token.
 * This ensures docs get UUID-format IDs (publicly readable) rather
 * than type.slug IDs (which are permission-restricted on this project).
 *
 * Run from: cd web && node scripts/create-sanity-posts.mjs
 */
import { createClient } from "@sanity/client";
import { readFile } from "fs/promises";
import { homedir } from "os";
import { join } from "path";
import { randomUUID } from "crypto";

// Read CLI auth token from the Sanity config file
const configPath = join(homedir(), ".config", "sanity", "config.json");
const sanityConfig = JSON.parse(await readFile(configPath, "utf8"));
const token = sanityConfig.authToken;
if (!token) {
  console.error("No Sanity auth token found. Run `npx sanity login` first.");
  process.exit(1);
}

const client = createClient({
  projectId: "1tk4ulcx",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

// ── Shop Item: Legal Practice Website (text-only payload) ───────────────────
const shopItem = {
  _id: randomUUID(),
  _type: "shopItem",
  name: "Legal Practice Website",
  slug: { _type: "slug", current: "legal-practice-website" },
  price: "$1,299",
  livePreviewUrl: "https://legal-practice-demo.vercel.app",
  categoryLabel: "Professional Services",
  categorySlug: "professional-services",
  type: "Website",
  typeSlug: "website",
  industry: "Legal",
  industrySlug: "legal",
  tag: "New",
  published: true,
  featuredRank: 5,
  rating: 4.8,
  reviewCount: "44",
  salesCount: "18",
  teaser: "A trust-first website template for law firms and solo practitioners who need a premium digital presence that converts prospects into consultations.",
  summary: "Designed for law firms, barristers, and solo legal professionals who need to establish credibility fast, communicate practice areas clearly, and route qualified leads into a consultation booking path.",
  audience: "Law firms, solo practitioners, barristers, legal consultants",
  features: [
    "Conversion-first homepage with trust proof and legal positioning",
    "Practice-area architecture built for clarity and decision confidence",
    "Mobile-first inquiry flow that routes serious prospects faster",
  ],
  previewVariant: "marketing",
  includes: [
    "Firm homepage with credibility section",
    "Practice areas overview and individual pages",
    "Attorney/barrister profile pages",
    "Case results and social proof section",
    "Consultation booking flow",
    "Contact and intake form",
    "CMS setup for content updates",
  ],
  inScope: [
    "Template deployment with existing pages and baseline sections",
    "Core CMS wiring and launch-ready configuration",
    "Minor content entry updates during setup",
  ],
  outOfScope: [
    "Net-new feature modules beyond the existing template",
    "Major visual redesign and expanded information architecture",
    "Advanced automation and deep third-party workflow engineering",
  ],
  enhancementPlan: [
    "Conversion experiments for hero, CTA rhythm, and inquiry routing",
    "CRM automation for lead qualification and follow-up",
    "Expanded practice pages, authority content, and growth funnel modules",
  ],
  stack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS", "Vercel"],
  highlights: [
    { _type: "object", _key: "h1", label: "Pages", value: "16" },
    { _type: "object", _key: "h2", label: "Setup time", value: "2-3 hrs" },
    { _type: "object", _key: "h3", label: "Best for", value: "Boutique law firms" },
  ],
};

// ── Case Study: Nourish Wellness Clinic (text-only payload) ─────────────────
const caseStudy = {
  _id: randomUUID(),
  _type: "caseStudy",
  name: "Nourish Wellness Clinic",
  slug: { _type: "slug", current: "nourish-wellness-clinic" },
  livePreviewUrl: "https://nourishwellness.com",
  industry: "Healthcare",
  serviceSlug: "websites",
  summary: "A full digital presence rebuild for a wellness and functional medicine clinic — designed to convert high-intent visitors into booked consultations.",
  metric: "+53% consultation bookings in 6 weeks",
  accent: "from-emerald-500 to-teal-600",
  published: true,
  featuredRank: 5,
  client: "Nourish Wellness Clinic",
  year: "2026",
  duration: "6 weeks",
  team: "Strategy, UX, Frontend, CMS",
  deliveryStory: "We rebuilt the clinic's online presence from a generic practice website into a patient-first digital experience — with treatment clarity, practitioner trust signals, and a booking-optimized consultation path.",
  process: [
    "Patient journey mapping and conversion gap analysis",
    "Content hierarchy and visual trust system design",
    "Build, booking integration, accessibility QA, and launch",
  ],
  strategy: [
    "Led with practitioner credibility, treatment outcomes, and patient language.",
    "Simplified the booking flow to three steps with visible confirmation signals.",
    "Added condition-specific landing sections to match high-intent search behavior.",
  ],
  integrations: [
    "Sanity CMS for practitioner profiles and service content",
    "Cal.com for appointment scheduling",
    "Resend for booking confirmation workflows",
  ],
  seo: [
    "Condition-specific page metadata and structured data",
    "Local SEO markup for clinic location and practitioners",
    "Schema.org MedicalOrganization and Physician markup",
  ],
  standards: [
    "WCAG 2.1 AA accessibility compliance throughout",
    "Mobile-first responsive QA across all devices",
    "Core Web Vitals optimized with image and font loading strategy",
  ],
  build: [
    { _type: "object", _key: "b1", label: "Platform", value: "Next.js + Sanity", hint: "Fast content updates for clinic team" },
    { _type: "object", _key: "b2", label: "Booking", value: "Cal.com integration", hint: "Native scheduling with confirmations" },
    { _type: "object", _key: "b3", label: "Scope", value: "Full marketing site", hint: "Services, practitioners, conditions, booking" },
  ],
  results: [
    { _type: "object", _key: "r1", value: "+53%", label: "Consultation bookings", hint: "First 6 weeks post-launch" },
    { _type: "object", _key: "r2", value: "+34%", label: "Time on service pages", hint: "Avg. vs. previous site" },
    { _type: "object", _key: "r3", value: "4.2x", label: "Return visitor rate", hint: "Organic search traffic" },
  ],
};

// ── Blog Post: Why Service Businesses Lose Leads ──────────────────────────────
const blogPost = {
  _id: randomUUID(),
  _type: "blogPost",
  title: "Why Service Businesses Lose Leads Before First Contact (And How to Fix It)",
  slug: { _type: "slug", current: "why-service-businesses-lose-leads-before-first-contact" },
  excerpt: "Most service business websites create doubt instead of confidence. Here is exactly where that happens and what to do about it.",
  publishedAt: "2026-05-02T12:00:00Z",
  readMinutes: 6,
  tags: ["lead conversion", "service websites", "trust design", "ux", "web strategy"],
  accent: "from-violet-500 to-purple-700",
  body: [
    { _type: "block", _key: "b1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", marks: [], text: "Most service businesses know they need a better website. What they do not know is that the real problem usually shows up in the first five seconds — before the visitor has even read anything." }] },
    { _type: "block", _key: "b2", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s2", marks: [], text: "The trust gap nobody measures" }] },
    { _type: "block", _key: "b3", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s3", marks: [], text: "Visitors arrive with a specific need. The first thing they do is assess whether you are the kind of business that can handle it. Generic copy, inconsistent visual quality, and missing social proof fail that test instantly — even if your actual service is excellent." }] },
    { _type: "block", _key: "b4", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s4", marks: [], text: "Where most service sites break down" }] },
    { _type: "block", _key: "b5", style: "h3", markDefs: [], children: [{ _type: "span", _key: "s5", marks: [], text: "1. No specificity in the hero" }] },
    { _type: "block", _key: "b6", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s6", marks: [], text: "Phrases like 'We deliver results' and 'Your success is our mission' say nothing. Specific outcomes — 'We help interior design studios convert 40% more qualified leads' — create immediate relevance." }] },
    { _type: "block", _key: "b7", style: "h3", markDefs: [], children: [{ _type: "span", _key: "s7", marks: [], text: "2. Proof buried three scrolls down" }] },
    { _type: "block", _key: "b8", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s8", marks: [], text: "Testimonials and case study metrics should appear near the first decision moment, not in a footer section. Visitors need reassurance before they commit to reading further." }] },
    { _type: "block", _key: "b9", style: "h3", markDefs: [], children: [{ _type: "span", _key: "s9", marks: [], text: "3. Weak or unclear CTA path" }] },
    { _type: "block", _key: "b10", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s10", marks: [], text: "A single generic 'Contact us' button at the bottom of the page is not a conversion path. Every key section needs a next step that matches the intent of a visitor at that point in their decision." }] },
    { _type: "block", _key: "b11", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s11", marks: [], text: "What to fix first" }] },
    { _type: "block", _key: "b12", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s12", marks: [], text: "Start with the hero and the first visible proof section. Rewrite your headline around a specific outcome for a specific buyer. Move one real metric or short testimonial into the top half of the page. Then add a contextual CTA after each major content section." }] },
    { _type: "block", _key: "b13", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s13", marks: [], text: "The compounding effect" }] },
    { _type: "block", _key: "b14", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s14", marks: [], text: "Each of these changes is small on its own. Together they close the trust gap and give qualified visitors the confidence to take the next step before they second-guess themselves." }] },
  ],
  category: "Operations",
  author: {
    _type: "object",
    name: "Growrix OS",
    role: "Editorial Team",
    bio: "We publish practical playbooks from shipping premium websites and operational content systems.",
    initials: "GO",
  },
};

// ── Create all documents ──────────────────────────────────────────────────────
console.log("Creating documents in Sanity...\n");

for (const doc of [shopItem, caseStudy, blogPost]) {
  try {
    const result = await client.createOrReplace(doc);
    console.log(`✓ Created [${result._id}] ${doc._type}: ${doc.name || doc.title}`);
  } catch (err) {
    console.error(`✗ Failed ${doc._type}:`, err.message);
  }
}

console.log("\nDone. Documents are publicly readable via UUID IDs.");
