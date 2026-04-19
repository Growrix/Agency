import { Container, Section, LinkButton } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse digital products: templates, MCP servers, ready-made websites, mobile apps, and automation kits. Ready to deploy.",
};

const categories = [
  { label: "All", value: "all" },
  { label: "Templates", value: "templates" },
  { label: "MCP Servers", value: "mcp-servers" },
  { label: "Ready Websites", value: "ready-websites" },
  { label: "Mobile Apps", value: "mobile-apps" },
];

const products = [
  {
    title: "SaaS Dashboard Template",
    category: "Templates",
    price: "€299",
    description: "Production-ready dashboard template with analytics, user management, and billing integration.",
    slug: "saas-dashboard-template",
    tags: ["React", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "GitHub MCP Server",
    category: "MCP Servers",
    price: "€499",
    description: "MCP server for GitHub integration. Repository management, issue tracking, and PR automation for AI agents.",
    slug: "github-mcp-server",
    tags: ["MCP Protocol", "TypeScript", "Docker"],
  },
  {
    title: "Agency Portfolio Starter",
    category: "Ready Websites",
    price: "€599",
    description: "Complete portfolio website with case studies, booking form, and contact system. Ready to customize and deploy.",
    slug: "agency-portfolio-starter",
    tags: ["Next.js", "MDX", "Vercel"],
  },
  {
    title: "E-Commerce Starter Kit",
    category: "Ready Websites",
    price: "€799",
    description: "Full e-commerce website with Stripe checkout, product management, and order tracking.",
    slug: "ecommerce-starter-kit",
    tags: ["Next.js", "Stripe", "PostgreSQL"],
  },
  {
    title: "Database MCP Server",
    category: "MCP Servers",
    price: "€399",
    description: "Connect AI agents to PostgreSQL, MySQL, or SQLite databases. Safe read/write with schema introspection.",
    slug: "database-mcp-server",
    tags: ["MCP Protocol", "SQL", "Docker"],
  },
  {
    title: "Landing Page Template Pack",
    category: "Templates",
    price: "€199",
    description: "Collection of 8 conversion-optimized landing page templates. Mobile-first, accessible, and fast.",
    slug: "landing-page-template-pack",
    tags: ["React", "Tailwind CSS", "Framer Motion"],
  },
];

export default function ShopPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-16 sm:pt-20 lg:pt-28">
        <Container size="xl" className="text-center">
          <Badge variant="primary" className="mb-6">
            Digital Products
          </Badge>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ready-to-Deploy{" "}
            <span className="text-primary">Digital Products</span>
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Production-quality templates, MCP servers, ready websites, and
            mobile apps. Built with the same standards as our custom work.
          </p>
        </Container>
      </Section>

      {/* Category Filters */}
      <Section className="pt-0 pb-0">
        <Container size="2xl">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  cat.value === "all"
                    ? "bg-primary text-white border-primary"
                    : "bg-transparent text-muted border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      {/* Product Grid */}
      <Section>
        <Container size="2xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.slug} hover as="article">
                <div className="aspect-[16/10] rounded-[var(--radius-sm)] bg-inset border border-border mb-4 flex items-center justify-center">
                  <span className="text-xs text-muted">Preview</span>
                </div>
                <Badge variant="primary" className="mb-2">
                  {product.category}
                </Badge>
                <h2
                  className="text-lg font-bold mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {product.title}
                </h2>
                <div
                  className="text-xl font-bold text-primary mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {product.price}
                </div>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.tags.map((tag) => (
                    <Badge key={tag} className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <LinkButton
                    href={`/shop/${product.slug}`}
                    variant="primary"
                    size="sm"
                    className="flex-1"
                  >
                    <ShoppingCartIcon className="h-4 w-4" />
                    Buy Now
                  </LinkButton>
                  <LinkButton
                    href={`/shop/${product.slug}`}
                    variant="outline"
                    size="sm"
                  >
                    Details
                  </LinkButton>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-surface">
        <Container size="lg" className="text-center">
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Need Something Custom?
          </h2>
          <p className="mt-3 text-muted">
            Our products are great starting points, but we also build custom
            solutions tailored to your exact requirements.
          </p>
          <div className="mt-6">
            <LinkButton href="/book-appointment">
              Discuss a Custom Build
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
