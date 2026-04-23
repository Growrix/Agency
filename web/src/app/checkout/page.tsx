import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
import { getCheckoutHref, getShopProduct } from "@/lib/shop";
import { CheckoutExperience } from "./CheckoutExperience";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure Stripe-powered checkout opens with the website product launch.",
};

type CheckoutPageProps = {
  searchParams?: Promise<{ product?: string | string[]; status?: string | string[]; order?: string | string[] }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const productSlug = Array.isArray(resolved?.product) ? resolved?.product[0] : resolved?.product;
  const product = productSlug ? getShopProduct(productSlug) : undefined;
  const status = Array.isArray(resolved?.status) ? resolved?.status[0] : resolved?.status;
  const orderId = Array.isArray(resolved?.order) ? resolved?.order[0] : resolved?.order;

  return (
    <Section className="pb-12 pt-12 sm:pb-16 sm:pt-16">
      <Container>
        <Link href={product ? `/shop/${product.slug}` : "/shop"} className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary">
          <ArrowLeftIcon className="size-4" /> {product ? "Back to product" : "Back to shop"}
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <Badge tone="primary">Checkout preview</Badge>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
              {product ? `Checkout for ${product.name}` : "Secure checkout requires a selected product."}
            </h1>
            <p className="mt-4 text-base leading-7 text-text-muted">
              {product
                ? "This checkout now creates a persisted order and hands off to Stripe when the payment environment is configured. If Stripe is not configured yet, the order is still captured for manual follow-up."
                : "Choose a product from the shop to create an order and continue into checkout."}
            </p>

            <div className="mt-8">
              <CheckoutExperience product={product} status={status} orderId={orderId} />
            </div>
          </Card>

          <Card variant="inset">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">Order summary</p>
            {product ? (
              <>
                <div className="mt-4 rounded-[16px] border border-border bg-surface p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-2xl tracking-tight">{product.name}</p>
                      <p className="mt-2 text-sm leading-6 text-text-muted">{product.category} · {product.type}</p>
                    </div>
                    <p className="font-display text-2xl tracking-tight">{product.price}</p>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-text-muted">{product.summary}</p>
                </div>

                <div className="mt-5 space-y-2 text-sm leading-6 text-text-muted">
                  {product.includes.slice(0, 4).map((item) => (
                    <div key={item} className="rounded-[14px] border border-border bg-surface px-4 py-3">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <LinkButton href={`/shop/${product.slug}`} variant="outline" fullWidth>
                    Review product details
                  </LinkButton>
                  <LinkButton href={getCheckoutHref(product)} fullWidth>
                    Refresh this checkout <ArrowUpRightIcon className="size-4" />
                  </LinkButton>
                </div>
              </>
            ) : (
              <div className="mt-4 rounded-[16px] border border-dashed border-border bg-surface p-5 text-sm leading-6 text-text-muted">
                Choose a product from the shop to land here with a preselected website order summary.
              </div>
            )}
          </Card>
        </div>
      </Container>
    </Section>
  );
}
