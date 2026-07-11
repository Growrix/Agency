import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { resolveLegacyRedirect, routes } from "@/lib/routes";

type LegacySlugPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: LegacySlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const target = resolveLegacyRedirect(slug);

  return {
    title: target ? "Redirecting" : "Not Found",
  };
}

function firstValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default async function LegacySlugPage({ params, searchParams }: LegacySlugPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const normalizedSlug = decodeURIComponent(slug).toLowerCase();

  if (normalizedSlug === "service-single.html") {
    const service = firstValue(query.service);
    if (service) {
      redirect(routes.serviceDetail(service));
    }
  }

  if (normalizedSlug === "blog-single.html") {
    const post = firstValue(query.post);
    if (post) {
      redirect(routes.blogDetail(post));
    }
  }

  if (normalizedSlug === "car-single.html") {
    const car = firstValue(query.car);
    if (car) {
      redirect(routes.listingDetail(car));
    }
  }

  if (normalizedSlug === "car-listing.html") {
    const type = firstValue(query.type);
    if (type) {
      redirect(routes.listingByType(type));
    }
  }

  if (normalizedSlug === "shop-product-single.html") {
    const product = firstValue(query.product);
    if (product) {
      redirect(routes.productDetail(product));
    }
  }

  const target = resolveLegacyRedirect(slug);

  if (target) {
    redirect(target);
  }

  notFound();
}