import { Container, Section, LinkButton } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeftIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import type { Metadata } from "next";

const products: Record<
  string,
  {
    title: string;
    category: string;
    price: string;
    description: string;
    longDescription: string;
    features: string[];
    includes: string[];
    techStack: string[];
    support: string;
  }
> = {
  "saas-dashboard-template": {
    title: "SaaS Dashboard Template",
    category: "Templates",
    price: "€299",
    description: "Production-ready dashboard template with analytics, user management, and billing integration.",
    longDescription:
      "A complete SaaS dashboard built with React, TypeScript, and Tailwind CSS. Includes authentication flows, user management, analytics dashboard, billing integration with Stripe, and a comprehensive component library. Ready to customize and deploy.",
    features: [
      "Authentication and user management",
      "Analytics dashboard with charts",
      "Stripe billing integration",
      "Dark and light mode support",
      "Responsive design for all devices",
      "Comprehensive component library",
    ],
    includes: [
      "Full source code (React + TypeScript)",
      "Tailwind CSS design system",
      "Documentation and setup guide",
      "6 months of updates",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Stripe", "Recharts"],
    support: "Email support for setup and customization questions.",
  },
};

const defaultProduct = {
  title: "Product",
  category: "Digital Product",
  price: "Contact",
  description: "Product details coming soon.",
  longDescription: "Full product details will be available shortly.",
  features: [],
  includes: [],
  techStack: [],
  support: "Email support included.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug] ?? defaultProduct;
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products[slug] ?? defaultProduct;

  return (
    <>
      <Section className="pt-16 sm:pt-20 lg:pt-28">
        <Container size="xl">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Preview */}
            <div className="aspect-[4/3] rounded-[var(--radius-xl)] bg-inset border border-border flex items-center justify-center">
              <span className="text-sm text-muted">Product Preview</span>
            </div>

            {/* Product Info */}
            <div>
              <Badge variant="primary" className="mb-3">
                {product.category}
              </Badge>
              <h1
                className="text-3xl sm:text-4xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {product.title}
              </h1>
              <div
                className="mt-3 text-3xl font-bold text-primary"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {product.price}
              </div>
              <p className="mt-4 text-muted leading-relaxed">
                {product.longDescription}
              </p>

              <div className="mt-6 flex gap-3">
                <LinkButton href="/checkout" size="lg" className="flex-1">
                  <ShoppingCartIcon className="h-4 w-4" />
                  Buy Now
                </LinkButton>
                <LinkButton href="/ai-concierge" variant="outline" size="lg">
                  <ChatBubbleLeftRightIcon className="h-4 w-4" />
                  Ask First
                </LinkButton>
              </div>

              <hr className="my-6 border-border" />

              {product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircleIcon className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.includes.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">What&apos;s Included</h3>
                  <ul className="space-y-2">
                    {product.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircleIcon className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.techStack.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.techStack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <Card className="mt-6 bg-inset" padding="md">
                <p className="text-sm text-muted">
                  <strong>Support:</strong> {product.support}
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
