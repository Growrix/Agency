#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { load as parseYaml } from "js-yaml";
import { createClient } from "@sanity/client";

const DEFAULT_PROJECT_ID = "1tk4ulcx";
const DEFAULT_DATASET = "production";
const SUPPORTED_EXTENSIONS = new Set([".md", ".markdown", ".yaml", ".yml", ".json"]);

const scriptFile = fileURLToPath(import.meta.url);
const scriptDirectory = path.dirname(scriptFile);
const webRoot = path.resolve(scriptDirectory, "..");
const inboxDirectory = path.resolve(webRoot, "content-import", "inbox");

function parseArgs(argv) {
  const args = { file: "", dir: "", type: "", dryRun: false };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];

    if (value === "--file" || value === "-f") {
      args.file = argv[index + 1] ?? "";
      index += 1;
      continue;
    }

    if (value === "--type" || value === "-t") {
      args.type = argv[index + 1] ?? "";
      index += 1;
      continue;
    }

    if (value === "--dir" || value === "-d") {
      args.dir = argv[index + 1] ?? "";
      index += 1;
      continue;
    }

    if (value === "--dry-run") {
      args.dryRun = true;
    }
  }

  return args;
}

function toSlug(input) {
  return String(input ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeStringArray(input) {
  if (!Array.isArray(input)) return [];
  return input
    .map((item) => String(item ?? "").trim())
    .filter(Boolean);
}

function normalizeBuildArray(input) {
  if (!Array.isArray(input)) return [];

  return input
    .map((item) => ({
      _type: "object",
      label: String(item?.label ?? "").trim(),
      value: String(item?.value ?? "").trim(),
      hint: String(item?.hint ?? "").trim() || undefined,
    }))
    .filter((item) => item.label && item.value);
}

function normalizeResultsArray(input) {
  if (!Array.isArray(input)) return [];

  return input
    .map((item) => ({
      _type: "object",
      value: String(item?.value ?? "").trim(),
      label: String(item?.label ?? "").trim(),
      hint: String(item?.hint ?? "").trim() || undefined,
    }))
    .filter((item) => item.value && item.label);
}

function normalizeBodyOutlineEntry(entry) {
  const type = String(entry?.type ?? "p").trim().toLowerCase();
  const text = String(entry?.text ?? "").trim();

  if (!text) return null;

  let style = "normal";
  if (type === "h2") style = "h2";
  if (type === "h3") style = "h3";

  return {
    _type: "block",
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        marks: [],
        text,
      },
    ],
  };
}

function parseContentFile(rawText, extName) {
  if (extName === ".json") {
    return JSON.parse(rawText);
  }

  const fencedYaml = rawText.match(/```ya?ml\s*([\s\S]*?)```/i);
  if (fencedYaml?.[1]) {
    return parseYaml(fencedYaml[1]);
  }

  const fencedJson = rawText.match(/```json\s*([\s\S]*?)```/i);
  if (fencedJson?.[1]) {
    return JSON.parse(fencedJson[1]);
  }

  return parseYaml(rawText);
}

async function findExistingPath(inputPath) {
  if (!inputPath) {
    return "";
  }

  const candidates = [
    path.resolve(process.cwd(), inputPath),
    path.resolve(webRoot, inputPath),
    path.resolve(inboxDirectory, inputPath),
  ];

  for (const candidate of candidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // Continue.
    }
  }

  return "";
}

function resolveContentType(cliType, data) {
  const value = String(cliType || data?.contentType || data?.documentType || data?.type || "").trim();
  const normalized = value.toLowerCase();

  if (["case-study", "case_study", "casestudy", "portfolio", "portfolio-case-study"].includes(normalized)) {
    return "caseStudy";
  }

  if (["shop", "shop-item", "shop_item", "shopitem", "product"].includes(normalized)) {
    return "shopItem";
  }

  if (["blog", "blog-post", "blog_post", "blogpost", "post"].includes(normalized)) {
    return "blogPost";
  }

  if (["casestudy", "shopitem", "blogpost"].includes(normalized)) {
    return normalized;
  }

  return "";
}

async function ensureCategoryRef(client, categoryRefOrLabel, dryRun) {
  const raw = String(categoryRefOrLabel ?? "").trim();
  if (!raw) {
    throw new Error("blogPost requires categoryRefOrLabel in the content file.");
  }

  if (raw.startsWith("category.")) {
    return { _type: "reference", _ref: raw };
  }

  const slug = toSlug(raw);
  const id = `category.${slug}`;

  if (!dryRun) {
    await client.createIfNotExists({
      _id: id,
      _type: "category",
      title: raw,
      slug: { _type: "slug", current: slug },
    });
  }

  return { _type: "reference", _ref: id };
}

async function ensureAuthorRef(client, authorInput, dryRun) {
  if (!authorInput || typeof authorInput !== "object") {
    throw new Error("blogPost requires an author object with at least author.name.");
  }

  const name = String(authorInput.name ?? "").trim();
  if (!name) {
    throw new Error("blogPost requires author.name in the content file.");
  }

  const slug = toSlug(name);
  const id = `author.${slug}`;
  const role = String(authorInput.role ?? "Editorial Team").trim() || "Editorial Team";
  const bio = String(authorInput.bio ?? "").trim() || undefined;
  const initials = String(authorInput.initials ?? "").trim().slice(0, 3) || undefined;

  if (!dryRun) {
    await client.createIfNotExists({
      _id: id,
      _type: "author",
      name,
      role,
      bio,
      initials,
    });
  }

  return { _type: "reference", _ref: id };
}

async function buildDocumentPayload(client, contentType, data, dryRun) {
  if (contentType === "caseStudy") {
    const name = String(data?.name ?? "").trim();
    const slug = String(data?.slug ?? "").trim() || toSlug(name);

    if (!name || !slug) {
      throw new Error("caseStudy requires name and slug fields.");
    }

    return {
      _id: `caseStudy.${slug}`,
      _type: "caseStudy",
      name,
      slug: { _type: "slug", current: slug },
      livePreviewUrl: String(data?.livePreviewUrl ?? "").trim() || undefined,
      embeddedPreviewUrl: String(data?.embeddedPreviewUrl ?? "").trim() || undefined,
      industry: String(data?.industry ?? "").trim() || "General",
      serviceSlug: String(data?.serviceSlug ?? "").trim() || "websites",
      summary: String(data?.summary ?? "").trim(),
      metric: String(data?.metric ?? "").trim(),
      accent: String(data?.accent ?? "").trim() || "from-teal-500 to-emerald-500",
      published: data?.published !== false,
      featuredRank: typeof data?.featuredRank === "number" ? data.featuredRank : 999,
      heroImageAlt: String(data?.heroImageAlt ?? "").trim() || undefined,
      client: String(data?.client ?? "").trim() || undefined,
      year: String(data?.year ?? "").trim() || undefined,
      duration: String(data?.duration ?? "").trim() || undefined,
      team: String(data?.team ?? "").trim() || undefined,
      deliveryStory: String(data?.deliveryStory ?? "").trim() || undefined,
      process: normalizeStringArray(data?.process),
      challenge: normalizeStringArray(data?.challenge),
      strategy: normalizeStringArray(data?.strategy),
      integrations: normalizeStringArray(data?.integrations),
      seo: normalizeStringArray(data?.seo),
      standards: normalizeStringArray(data?.standards),
      build: normalizeBuildArray(data?.build),
      results: normalizeResultsArray(data?.results),
    };
  }

  if (contentType === "shopItem") {
    const name = String(data?.name ?? "").trim();
    const slug = String(data?.slug ?? "").trim() || toSlug(name);

    if (!name || !slug) {
      throw new Error("shopItem requires name and slug fields.");
    }

    return {
      _id: `shopItem.${slug}`,
      _type: "shopItem",
      name,
      slug: { _type: "slug", current: slug },
      price: String(data?.price ?? "").trim() || "$0",
      livePreviewUrl: String(data?.livePreviewUrl ?? "").trim() || undefined,
      embeddedPreviewUrl: String(data?.embeddedPreviewUrl ?? "").trim() || undefined,
      categoryLabel: String(data?.categoryLabel ?? "").trim() || "Templates",
      categorySlug: String(data?.categorySlug ?? "").trim() || "templates",
      type: String(data?.type ?? "").trim() || "Website Product",
      typeSlug: String(data?.typeSlug ?? "").trim() || "website-product",
      industry: String(data?.industry ?? "").trim() || "General",
      industrySlug: String(data?.industrySlug ?? "").trim() || "general",
      tag: String(data?.tag ?? "").trim() || undefined,
      published: data?.published !== false,
      featuredRank: typeof data?.featuredRank === "number" ? data.featuredRank : 999,
      rating: typeof data?.rating === "number" ? data.rating : undefined,
      reviewCount: String(data?.reviewCount ?? "").trim() || undefined,
      salesCount: String(data?.salesCount ?? "").trim() || undefined,
      teaser: String(data?.teaser ?? "").trim(),
      summary: String(data?.summary ?? "").trim(),
      audience: String(data?.audience ?? "").trim(),
      previewVariant: String(data?.previewVariant ?? "marketing").trim() || "marketing",
      includes: normalizeStringArray(data?.includes),
      stack: normalizeStringArray(data?.stack),
      highlights: normalizeBuildArray(data?.highlights),
      mainImageAlt: String(data?.mainImageAlt ?? "").trim() || undefined,
    };
  }

  if (contentType === "blogPost") {
    const title = String(data?.title ?? "").trim();
    const slug = String(data?.slug ?? "").trim() || toSlug(title);

    if (!title || !slug) {
      throw new Error("blogPost requires title and slug fields.");
    }

    const categoryRef = await ensureCategoryRef(client, data?.categoryRefOrLabel ?? data?.category, dryRun);
    const authorRef = await ensureAuthorRef(client, data?.author, dryRun);

    const bodyPortableText = Array.isArray(data?.bodyPortableText)
      ? data.bodyPortableText
      : Array.isArray(data?.bodyOutline)
        ? data.bodyOutline.map(normalizeBodyOutlineEntry).filter(Boolean)
        : [];

    if (bodyPortableText.length === 0) {
      throw new Error("blogPost requires either bodyPortableText or bodyOutline in the content file.");
    }

    return {
      _id: `blogPost.${slug}`,
      _type: "blogPost",
      title,
      slug: { _type: "slug", current: slug },
      excerpt: String(data?.excerpt ?? "").trim(),
      scheduledPublishAt: String(data?.scheduledPublishAt ?? "").trim() || undefined,
      publishedAt: String(data?.publishedAt ?? "").trim() || new Date().toISOString(),
      readMinutes: Number.isFinite(Number(data?.readMinutes)) ? Number(data.readMinutes) : 6,
      categoryRef,
      tags: normalizeStringArray(data?.tags),
      accent: String(data?.accent ?? "").trim() || "from-indigo-500 to-violet-600",
      authorRef,
      body: bodyPortableText,
      seo: {
        _type: "object",
        metaTitle: String(data?.seo?.metaTitle ?? "").trim() || undefined,
        metaDescription: String(data?.seo?.metaDescription ?? "").trim() || undefined,
        canonicalUrl: String(data?.seo?.canonicalUrl ?? "").trim() || undefined,
        noIndex: data?.seo?.noIndex === true,
      },
      comments: Array.isArray(data?.comments) ? data.comments : undefined,
      mainImageAlt: String(data?.mainImageAlt ?? data?.title ?? "").trim() || undefined,
      category: String(data?.categoryRefOrLabel ?? data?.category ?? "").trim() || undefined,
      author: data?.author && typeof data.author === "object"
        ? {
            _type: "object",
            name: String(data.author.name ?? "").trim() || undefined,
            role: String(data.author.role ?? "").trim() || undefined,
            bio: String(data.author.bio ?? "").trim() || undefined,
            initials: String(data.author.initials ?? "").trim().slice(0, 3) || undefined,
          }
        : undefined,
    };
  }

  throw new Error("Unsupported content type. Use one of: caseStudy, shopItem, blogPost.");
}

async function importSingleFile(client, absoluteFilePath, cliType, dryRun) {
  const extension = path.extname(absoluteFilePath).toLowerCase();
  const rawText = await fs.readFile(absoluteFilePath, "utf8");
  const data = parseContentFile(rawText, extension);

  if (!data || typeof data !== "object") {
    throw new Error(`Parsed content is empty or invalid for file: ${absoluteFilePath}`);
  }

  const contentType = resolveContentType(cliType, data);
  if (!contentType) {
    throw new Error(
      `Could not resolve content type for file: ${absoluteFilePath}. Use --type caseStudy|shopItem|blogPost or set contentType inside file.`,
    );
  }

  const document = await buildDocumentPayload(client, contentType, data, dryRun);

  if (dryRun) {
    console.log(`[dry-run] ${path.basename(absoluteFilePath)} => ${contentType}`);
    console.log(JSON.stringify(document, null, 2));
    return;
  }

  const result = await client.createOrReplace(document);
  console.log(`Imported ${contentType} -> ${result._id} (${path.basename(absoluteFilePath)})`);
}

async function collectImportFiles(targetDirectory) {
  const entries = await fs.readdir(targetDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => path.resolve(targetDirectory, entry.name))
    .filter((filePath) => SUPPORTED_EXTENSIONS.has(path.extname(filePath).toLowerCase()))
    .sort((left, right) => left.localeCompare(right));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const projectId = process.env.SANITY_PROJECT_ID || DEFAULT_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET || DEFAULT_DATASET;
  const token = process.env.SANITY_API_TOKEN;

  if (!args.dryRun && !token) {
    throw new Error("Missing SANITY_API_TOKEN. Set it in your terminal before running the importer.");
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-05-01",
    token,
    useCdn: false,
  });

  const resolvedFilePath = args.file ? await findExistingPath(args.file) : "";
  const resolvedDirectoryPath = args.dir
    ? await findExistingPath(args.dir)
    : !args.file
      ? inboxDirectory
      : "";

  if (args.file && !resolvedFilePath) {
    throw new Error(`Input file was not found: ${args.file}`);
  }

  if (args.file && resolvedFilePath) {
    await importSingleFile(client, resolvedFilePath, args.type, args.dryRun);
    return;
  }

  if (!resolvedDirectoryPath) {
    throw new Error(
      "Missing input. Use --file <path> for a single file, --dir <path> for a batch folder, or run without args to process web/content-import/inbox.",
    );
  }

  const files = await collectImportFiles(resolvedDirectoryPath);
  if (files.length === 0) {
    throw new Error(`No importable files found in: ${resolvedDirectoryPath}`);
  }

  console.log(`Processing ${files.length} file(s) from ${resolvedDirectoryPath}`);
  for (const filePath of files) {
    await importSingleFile(client, filePath, args.type, args.dryRun);
  }
}

main().catch((error) => {
  console.error("cms:import failed");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
