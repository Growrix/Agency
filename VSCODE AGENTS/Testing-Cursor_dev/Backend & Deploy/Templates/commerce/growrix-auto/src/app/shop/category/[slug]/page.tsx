import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import ProductCard from "@/components/shop/ProductCard";
import { categories, getCategoryBySlug, getProductsByCategory } from "@/data/catalog";
import { getServerPreferences } from "@/lib/serverPreferences";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { t } = await getServerPreferences();
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(category.slug);

  return (
    <div className="bg-white">
      <Breadcrumbs items={["Home", "Shop", category.label]} />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <h1 className="text-[34px] font-black uppercase text-[#222]">{category.label}</h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#666]">{category.description}</p>

        {categoryProducts.length === 0 ? (
          <div className="mt-10 border border-[#eee] bg-[#fafafa] px-6 py-10 text-[14px] text-[#666]">
            {t("shop.noProducts")}
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
