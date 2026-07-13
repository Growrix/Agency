import type { Metadata } from "next";
import { EmailTemplatesClient } from "./EmailTemplatesClient";

export const metadata: Metadata = {
  title: "Email Templates · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminEmailTemplatesPage() {
  return <EmailTemplatesClient />;
}
