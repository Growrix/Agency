import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NativeNodeRenderer } from "@/components/site/native-node-renderer";
import { PageEnhancers } from "@/components/site/page-enhancers";
import { getNativePageBySlug } from "@/data/native-content";

type NativeRoutePageProps = {
  slug: string;
};

const DEFAULT_DESCRIPTION = "Velocare Auto Studio - Premium detailing and auto care experiences.";

export function getNativeMetadata(slug: string): Metadata {
  const page = getNativePageBySlug(slug);
  if (!page) {
    return {
      title: "Not Found | Velocare Auto Studio",
      description: DEFAULT_DESCRIPTION,
    };
  }

  const description = page.description || DEFAULT_DESCRIPTION;

  return {
    title: `${page.title} | Velocare Auto Studio`,
    description,
    alternates: {
      canonical: page.route.canonicalPath,
    },
    openGraph: {
      title: `${page.title} | Velocare Auto Studio`,
      description,
      url: page.route.canonicalPath,
      images: [
        {
          url: "/images/logo-velocare.svg",
          alt: "Velocare Auto Studio",
        },
      ],
    },
  };
}

export function NativeRoutePage({ slug }: NativeRoutePageProps) {
  const page = getNativePageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      <NativeNodeRenderer nodes={page.content} />
      <PageEnhancers scripts={page.scripts} sliderVariant={page.sliderVariant} />
    </>
  );
}
