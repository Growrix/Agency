import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { THREE_PATH_ROWS } from "@/lib/product-led-content";

export function ThreePathExplainer() {
  return (
    <Section size="standard" layout="viewport" tone="inset">
      <Container>
        <SectionHeading
          eyebrow="Choose your path"
          title="Three ways to work with GrowrixOS"
          description="Whether you want a DIY download, done-for-you setup, or a full custom build, the site is designed to route you to the right offer."
        />
        <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="min-w-full divide-y divide-border text-left text-sm">
            <thead className="bg-inset/50 text-text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Visitor</th>
                <th className="px-4 py-3 font-medium">What they want</th>
                <th className="px-4 py-3 font-medium">Recommended funnel</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {THREE_PATH_ROWS.map((row) => (
                <tr key={row.visitor}>
                  <td className="px-4 py-4 font-medium text-text">{row.visitor}</td>
                  <td className="px-4 py-4 text-text-muted">{row.want}</td>
                  <td className="px-4 py-4 text-text-muted">{row.funnel}</td>
                  <td className="px-4 py-4">
                    <Link
                      href={row.cta.href}
                      className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                    >
                      {row.cta.label}
                      <ArrowUpRightIcon className="size-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </Section>
  );
}
