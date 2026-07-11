import { slugify } from "@blog-automation/shared";

export interface ContentBriefSeed {
  title: string;
  slug: string;
  targetKeyword: string;
  targetWordCount: number;
  schemaType: "Article" | "HowTo";
}

export function buildBriefSeed(targetKeyword: string): ContentBriefSeed {
  return {
    title: `How to ${targetKeyword.replace(/^how to\s+/i, "").trim()} (${new Date().getUTCFullYear()})`,
    slug: slugify(targetKeyword),
    targetKeyword,
    targetWordCount: 2400,
    schemaType: targetKeyword.startsWith("how to") ? "HowTo" : "Article"
  };
}

export function buildOutlinePreview(targetKeyword: string) {
  return {
    targetKeyword,
    headings: [
      `What to know before you start ${targetKeyword}`,
      `Step-by-step: ${targetKeyword}`,
      "Common mistakes and how to avoid them",
      "FAQ"
    ]
  };
}