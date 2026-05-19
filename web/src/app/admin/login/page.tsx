import type { Metadata } from "next";
import { AdminLoginForm } from "./AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Sign in to access the protected Growrix operational dashboard.",
};

type LoginPageProps = {
  searchParams?: Promise<{ next?: string | string[] }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const next = Array.isArray(resolved?.next) ? resolved?.next[0] : resolved?.next;
  return <AdminLoginForm nextPath={next} />;
}
