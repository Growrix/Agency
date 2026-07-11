import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { blogPath } from "@/data/routes";
import { getServerPreferences } from "@/lib/serverPreferences";

export default async function BlogPage() {
  const { t } = await getServerPreferences();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-5 text-[14px] text-[#777] sm:px-6 lg:px-10">
        <Link href="/" className="hover:text-[#ff3434]">{t("common.home")}</Link> <span className="px-2">›</span> <span>{t("common.blog")}</span>
      </div>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <h1 className="text-[34px] font-black uppercase text-[#222]">{t("common.blog")}</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug}>
              <div className="relative h-60 overflow-hidden">
                <Image src={post.image} alt={post.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              </div>
              <p className="mt-3 text-[12px] text-[#999]">{post.date}</p>
              <h2 className="mt-2 text-[16px] font-bold uppercase text-[#222]">{post.title}</h2>
              <p className="mt-2 text-[13px] leading-6 text-[#666]">{post.excerpt}</p>
              <Link
                href={blogPath(post.slug)}
                className="mt-4 inline-flex rounded-sm border border-black bg-black px-5 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#ff3434] hover:bg-[#ff3434]"
              >
                {t("common.readMore")}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
