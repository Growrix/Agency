"use client";

import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/data/home";
import { blogPath } from "@/data/routes";
import { useUtility } from "@/state/UtilityContext";

export default function BlogSection() {
  const { t } = useUtility();

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#ff3434]">{t("home.recentPosts")}</p>
          <h2 className="mt-2 text-[32px] font-black uppercase tracking-tight text-[#111]">{t("home.latestBlogs")}</h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group">
              <div className="relative h-55 overflow-hidden">
                <Image src={post.image} alt={post.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <p className="mt-3 text-[12px] text-[#999]">{post.date}</p>
              <h3 className="mt-2 text-[16px] font-bold uppercase text-[#111]">{post.title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-[#666]">{post.excerpt}</p>
              <Link
                href={blogPath(post.slug)}
                className="mt-4 inline-flex rounded-sm border border-black bg-black px-5 py-2 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-[#ff3434] hover:bg-[#ff3434]"
              >
                {t("common.readMore")}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
