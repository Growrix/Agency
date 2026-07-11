import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import AddToCartButton from "@/components/shop/AddToCartButton";
import { getCategoryBySlug, getProductBySlug, products } from "@/data/catalog";
import { categoryPath } from "@/data/routes";
import { getServerPreferences } from "@/lib/serverPreferences";
import Link from "next/link";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { formatPrice, t } = await getServerPreferences();
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.categorySlug);
  const featureItems = [
    t("product.featureCompatibility", { category: category?.label ?? t("common.category") }),
    t("product.featureInventory", { stock: product.stock }),
    t("product.featureUseCase", { tags: product.tags.slice(0, 3).join(", ") }),
    t("product.featureWarranty"),
  ];

  return (
    <div className="bg-white">
      <Breadcrumbs items={["Home", "Shop", category?.label ?? t("common.category"), product.title]} />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-10">
        <div className="relative h-120 overflow-hidden border border-[#eee] bg-[#fafafa]">
          <Image src={product.image} alt={product.title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain" />
        </div>

        <div>
          <h1 className="text-[30px] font-black uppercase text-[#222]">{product.title}</h1>
          <div className="mt-4 flex items-center gap-3 text-[22px] font-bold">
            <span className="text-[#ff3434]">{formatPrice(product.price)}</span>
            {product.oldPrice ? (
              <span className="text-[18px] text-[#999] line-through">{formatPrice(product.oldPrice)}</span>
            ) : null}
          </div>

          <p className="mt-6 text-[15px] leading-7 text-[#666]">{product.excerpt}</p>

          <div className="mt-6 grid gap-2 text-[13px] text-[#444]">
            <p><span className="font-bold">{t("product.sku")}:</span> {product.sku}</p>
            <p><span className="font-bold">{t("product.inStock")}:</span> {product.stock}</p>
            {category ? (
              <p>
                <span className="font-bold">{t("product.category")}:</span>{" "}
                <Link href={categoryPath(category.slug)} className="text-[#ff3434] hover:underline">
                  {category.label}
                </Link>
              </p>
            ) : null}
          </div>

          <div className="mt-8">
            <AddToCartButton productSlug={product.slug} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="border border-[#ececec] bg-[#fafafa] p-6 lg:p-8">
            <h2 className="text-[24px] font-black uppercase tracking-tight text-[#222]">{t("product.descriptionTitle")}</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-8 text-[#666]">
              <p>{t("product.descriptionBody1", { title: product.title })}</p>
              <p>{t("product.descriptionBody2", { category: category?.label ?? t("common.category") })}</p>
            </div>
          </article>

          <article className="border border-[#ececec] bg-white p-6 lg:p-8">
            <h2 className="text-[24px] font-black uppercase tracking-tight text-[#222]">{t("product.featuresTitle")}</h2>
            <ul className="mt-4 space-y-3 text-[14px] leading-7 text-[#444]">
              {featureItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff3434]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
