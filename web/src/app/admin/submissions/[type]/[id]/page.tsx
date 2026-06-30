import type { Metadata } from "next";
import { SubmissionDetailClient } from "./SubmissionDetailClient";

export const metadata: Metadata = {
  title: "Submission detail · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ type: string; id: string }>;
};

export default async function AdminSubmissionDetailPage({ params }: PageProps) {
  const { type, id } = await params;
  return <SubmissionDetailClient type={type} id={id} />;
}
