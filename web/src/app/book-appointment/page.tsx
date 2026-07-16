import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo-metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbListSchema, buildWebPageSchema } from "@/lib/seo-structured-data";
import { BookAppointmentExperience } from "./BookAppointmentExperience";

export const metadata: Metadata = buildPageMetadata({
  title: "Book a Discovery Call",
  description:
    "Schedule a 30-minute discovery call with GrowrixOS to clarify scope, timeline, and the right path for your website, SaaS, mobile, automation, or AI project.",
  path: "/book-appointment",
});

export default function BookPage() {
  const bookStructuredData = [
    buildWebPageSchema({
      name: "Book a Discovery Call",
      description:
        "Schedule a 30-minute discovery call with GrowrixOS to clarify scope, timeline, and the right path for your website, SaaS, mobile, automation, or AI project.",
      path: "/book-appointment",
    }),
    buildBreadcrumbListSchema([
      { name: "Home", path: "/" },
      { name: "Book Appointment", path: "/book-appointment" },
    ]),
  ];

  return (
    <>
      <JsonLd data={bookStructuredData} />
      <BookAppointmentExperience />
    </>
  );
}
