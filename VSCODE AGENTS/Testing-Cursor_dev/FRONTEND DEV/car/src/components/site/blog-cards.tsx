import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/site";
import { routes } from "@/lib/routes";

type BlogCardsProps = {
  limit?: number;
};

export function BlogCards({ limit }: BlogCardsProps) {
  const items = typeof limit === "number" ? blogPosts.slice(0, limit) : blogPosts;

  return (
    <div className="row g-4">
      {items.map((post) => (
        <div className="col-lg-4 col-md-6" key={post.slug}>
          <article className="bg-dark-2 rounded-1 h-100 overflow-hidden">
            <Link href={routes.blogDetail(post.slug)}>
              <Image src={post.image} className="w-100 hover-scale-1-1" alt={post.title} width={900} height={600} />
            </Link>
            <div className="p-4">
              <small className="id-color d-block mb-2">{post.category} • {post.date}</small>
              <h3 className="mb-2">
                <Link href={routes.blogDetail(post.slug)}>{post.title}</Link>
              </h3>
              <p className="mb-0">{post.intro}</p>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}
