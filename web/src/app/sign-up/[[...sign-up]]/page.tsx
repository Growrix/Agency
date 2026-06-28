import type { Metadata } from "next";
import { SignUpExperience } from "@/components/auth/SignUpExperience";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Growrix OS account to access downloads, orders, and your customer dashboard.",
};

type SignUpPageProps = {
  searchParams?: Promise<{ next?: string | string[] }>;
};

function resolveRedirectPath(next: string | string[] | undefined) {
  const nextPath = Array.isArray(next) ? next[0] : next;
  return nextPath && nextPath.startsWith("/") ? nextPath : "/dashboard";
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const redirectUrl = resolveRedirectPath(resolved?.next);

  return <SignUpExperience redirectUrl={redirectUrl} />;
}
