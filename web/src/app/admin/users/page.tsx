import type { Metadata } from "next";
import { UsersListClient } from "./UsersListClient";

export const metadata: Metadata = {
  title: "Users · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminUsersPage() {
  return <UsersListClient />;
}
