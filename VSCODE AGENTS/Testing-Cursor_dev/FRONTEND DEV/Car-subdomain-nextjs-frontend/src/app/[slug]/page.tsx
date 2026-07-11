import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CanonicalHtmlPage } from "@/components/site/canonical-html-page";
import {
  fileNameFromSlug,
  getParsedHtmlPage,
  getSourceHtmlFiles,
  isKnownHtmlFile,
} from "@/lib/source-html";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function resolveKnownFileName(slug: string) {
  const fileName = fileNameFromSlug(slug);

  if (slug.toLowerCase() === "index" || !isKnownHtmlFile(fileName)) {
    notFound();
  }

  return fileName;
}

export function generateStaticParams() {
  return getSourceHtmlFiles()
    .filter((fileName) => fileName.toLowerCase() !== "index.html")
    .map((fileName) => ({ slug: fileName.replace(/\.html$/i, "") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getParsedHtmlPage(resolveKnownFileName(slug));

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function HtmlPage({ params }: PageProps) {
  const { slug } = await params;
  return <CanonicalHtmlPage fileName={resolveKnownFileName(slug)} />;
}