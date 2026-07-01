import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { getProductHref, type CheckoutSelection } from "@/lib/shop";
import { getPublicShopProduct } from "@/server/domain/catalog";
import { CheckoutExperience } from "./CheckoutExperience";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Secure Stripe-powered checkout opens with the website product launch.",
  robots: { index: false, follow: false },
};

type CheckoutPageProps = {
  searchParams?: Promise<{
    product?: string | string[];
    status?: string | string[];
    order?: string | string[];
    variant?: string | string[];
    tier?: string | string[];
    fulfillment?: string | string[];
  }>;
};

function firstString(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const resolved = searchParams ? await searchParams : undefined;
  const productSlug = firstString(resolved?.product);
  const product = productSlug ? await getPublicShopProduct(productSlug).catch(() => null) : undefined;
  const status = firstString(resolved?.status);
  const orderId = firstString(resolved?.order);

  const selection: CheckoutSelection = {
    variantSlug: firstString(resolved?.variant),
    tierName: firstString(resolved?.tier),
    fulfillmentType: firstString(resolved?.fulfillment),
  };

  return (
    <Section size="compact" className="pb-16">
      <Container>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={product ? getProductHref(product) : "/digital-products"}
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary"
          >
            <ArrowLeftIcon className="size-4" />
            {product ? "Back to product" : "Back to digital products"}
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
            <LockClosedIcon className="size-3.5" aria-hidden />
            Secure checkout
          </span>
        </div>

        <header className="mb-8 max-w-2xl">
          <h1 className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
            {product ? (
              <>
                Checkout for <span className="text-primary">{product.name}</span>
              </>
            ) : (
              "Secure checkout requires a selected product."
            )}
          </h1>
          <p className="mt-3 text-sm leading-6 text-text-muted sm:text-base">
            {product
              ? "You're minutes away from launching a professional website. Complete your purchase and get instant access."
              : "Choose a product from the catalog to create an order and continue into checkout."}
          </p>
        </header>

        <CheckoutExperience product={product} status={status} orderId={orderId} selection={selection} />
      </Container>
    </Section>
  );
}
