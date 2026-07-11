import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/shop/Breadcrumbs";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { blogPath } from "@/data/routes";
import { getServerPreferences } from "@/lib/serverPreferences";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { t } = await getServerPreferences();
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <div className="bg-white">
      <Breadcrumbs items={["Home", "Blog", post.title]} />

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-10">
        <div className="relative h-90 overflow-hidden">
          <Image src={post.image} alt={post.title} fill sizes="100vw" className="object-cover" />
        </div>

        <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-[#999]">{post.date}</p>
        <h1 className="mt-2 text-[34px] font-black uppercase text-[#222]">{post.title}</h1>
        <p className="mt-2 text-[14px] text-[#666]">{t("common.by")} {post.author}</p>

        <div className="mt-6 space-y-5 text-[15px] leading-8 text-[#555]">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-[#ddd] px-3 py-1 text-[12px] uppercase text-[#666]">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 border-t border-[#eee] pt-6">
          <h2 className="text-[20px] font-black uppercase text-[#222]">{t("blog.related")}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {relatedPosts.map((related) => (
              <Link key={related.slug} href={blogPath(related.slug)} className="rounded-sm border border-[#eee] p-4 transition-colors hover:border-[#ff3434]">
                <p className="text-[12px] text-[#999]">{related.date}</p>
                <p className="mt-1 text-[14px] font-bold uppercase text-[#222]">{related.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
