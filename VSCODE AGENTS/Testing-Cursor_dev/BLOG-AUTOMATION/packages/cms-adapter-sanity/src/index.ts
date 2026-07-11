import type { CmsAdapter, PublishablePost } from "@blog-automation/cms-core";

interface PortableTextSpan {
  _type: "span";
  text: string;
  marks: string[];
}

interface PortableTextBlock {
  _type: "block";
  _key: string;
  style: "normal";
  markDefs: unknown[];
  children: PortableTextSpan[];
}

interface SanityReference {
  _type: "reference";
  _ref: string;
}

export interface SanityDocument {
  _id: string;
  _type: string;
  title: string;
  slug: { _type: "slug"; current: string };
  excerpt: string;
  publishedAt: string;
  scheduledPublishAt?: string;
  readMinutes: number;
  tags: string[];
  accent: string;
  categoryRef?: SanityReference;
  authorRef?: SanityReference;
  body: PortableTextBlock[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl?: string;
    noIndex: boolean;
  };
  automation: {
    connectorId: string | null;
    publishMode: string | null;
    workflowRunId: string | null;
    correlationId: string | null;
  };
}

function createPortableText(markdown: string, seed: string): PortableTextBlock[] {
  const chunks = markdown
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0)
    .slice(0, 60);

  if (chunks.length === 0) {
    return [
      {
        _type: "block",
        _key: `${seed}-0`,
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", text: "", marks: [] }]
      }
    ];
  }

  return chunks.map((chunk, index) => ({
    _type: "block",
    _key: `${seed}-${index}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", text: chunk.replace(/^#+\s*/, ""), marks: [] }]
  }));
}

function buildReference(ref: string | undefined): SanityReference | undefined {
  if (!ref) {
    return undefined;
  }

  return {
    _type: "reference",
    _ref: ref
  };
}

function computeReadMinutes(markdown: string, override: number | undefined) {
  if (typeof override === "number" && Number.isFinite(override) && override > 0) {
    return Math.floor(override);
  }

  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

const sanityAdapter: CmsAdapter<SanityDocument> = {
  name: "sanity",
  map(post: PublishablePost) {
    const documentType = post.documentType ?? "post";
    const documentId = `${documentType}.${post.slug}`;
    const bodyMarkdown = post.bodyMarkdown ?? post.excerpt;
    const blockSeed = post.slug.replace(/[^a-z0-9]/gi, "").toLowerCase() || "body";

    return {
      _id: documentId,
      _type: documentType,
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      scheduledPublishAt: post.scheduledPublishAt,
      readMinutes: computeReadMinutes(bodyMarkdown, post.readMinutes),
      tags: post.tags ?? [],
      accent: post.accent ?? "brand",
      categoryRef: buildReference(post.categoryRef),
      authorRef: buildReference(post.authorRef),
      body: createPortableText(bodyMarkdown, blockSeed),
      seo: {
        metaTitle: post.seo?.metaTitle ?? post.title,
        metaDescription: post.seo?.metaDescription ?? post.excerpt,
        canonicalUrl: post.seo?.canonicalUrl,
        noIndex: post.seo?.noIndex ?? false
      },
      automation: {
        connectorId: post.connectorId ?? null,
        publishMode: post.publishMode ?? null,
        workflowRunId: post.workflowRunId ?? null,
        correlationId: post.correlationId ?? null
      }
    };
  }
};

export function mapToSanityDocument(post: PublishablePost): SanityDocument {
  return sanityAdapter.map(post);
}