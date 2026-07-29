import type { Metadata } from "next";
import { buildPageMetadata, NOINDEX_ROBOTS } from "@/lib/seo-metadata";
import { SignInExperience } from "@/components/auth/SignInExperience";
import { resolveAuthRedirectPath } from "@/lib/auth-redirect";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Sign In",
    description: "Sign in to access your Growrix OS customer dashboard, downloads, and orders.",
    path: "/sign-in",
  }),
  robots: NOINDEX_ROBOTS,
};

type SignInPageProps = {
  searchParams?: Promise<{
    next?: string | string[];
    redirect_url?: string | string[];
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const redirectUrl = resolveAuthRedirectPath({
    next: resolved?.next,
    redirect_url: resolved?.redirect_url,
    fallback: "/auth/after-sign-in",
  });

  return <SignInExperience redirectUrl={redirectUrl} />;
}
