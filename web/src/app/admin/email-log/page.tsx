import type { Metadata } from "next";
import { EmailLogClient } from "./EmailLogClient";

export const metadata: Metadata = {
  title: "Email Log · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminEmailLogPage() {
  return <EmailLogClient />;
}
