import type { Metadata } from "next";
import { buildPageMetadata, NOINDEX_ROBOTS } from "@/lib/seo-metadata";
import { SignInExperience } from "@/components/auth/SignInExperience";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Sign In",
    description: "Sign in to access your Growrix OS customer dashboard, downloads, and orders.",
    path: "/sign-in",
  }),
  robots: NOINDEX_ROBOTS,
};

type SignInPageProps = {
  searchParams?: Promise<{ next?: string | string[] }>;
};

function resolveRedirectPath(next: string | string[] | undefined) {
  const nextPath = Array.isArray(next) ? next[0] : next;
  return nextPath && nextPath.startsWith("/") ? nextPath : "/dashboard";
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const redirectUrl = resolveRedirectPath(resolved?.next);

  return <SignInExperience redirectUrl={redirectUrl} />;
}
