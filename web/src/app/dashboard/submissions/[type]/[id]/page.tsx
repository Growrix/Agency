import { MySubmissionDetailClient } from "./MySubmissionDetailClient";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ type: string; id: string }>;
};

export default async function MySubmissionDetailPage({ params }: PageProps) {
  const { type, id } = await params;
  return <MySubmissionDetailClient type={type} id={id} />;
}
