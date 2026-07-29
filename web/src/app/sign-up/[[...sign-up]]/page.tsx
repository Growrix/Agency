import type { Metadata } from "next";
import { buildPageMetadata, NOINDEX_ROBOTS } from "@/lib/seo-metadata";
import { SignUpExperience } from "@/components/auth/SignUpExperience";
import { resolveAuthRedirectPath } from "@/lib/auth-redirect";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Sign Up",
    description: "Create your Growrix OS account to access downloads, orders, and your customer dashboard.",
    path: "/sign-up",
  }),
  robots: NOINDEX_ROBOTS,
};

type SignUpPageProps = {
  searchParams?: Promise<{
    next?: string | string[];
    redirect_url?: string | string[];
  }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const redirectUrl = resolveAuthRedirectPath({
    next: resolved?.next,
    redirect_url: resolved?.redirect_url,
    fallback: "/auth/after-sign-in",
  });

  return <SignUpExperience redirectUrl={redirectUrl} />;
}
