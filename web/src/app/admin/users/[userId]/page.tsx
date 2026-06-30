import type { Metadata } from "next";
import { UserDetailClient } from "./UserDetailClient";

export const metadata: Metadata = {
  title: "User detail · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return <UserDetailClient userId={userId} />;
}
