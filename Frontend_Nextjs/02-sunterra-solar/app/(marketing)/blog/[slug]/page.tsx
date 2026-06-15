import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/metadata';
import { JsonLdArticle } from '@/components/seo/JsonLd';
import { BlogArticleView } from '@/components/views/ContentViews';
import { getBlogPost, getBlogPosts } from '@/lib/content/repositories/site-content';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return buildMetadata({ title: 'Article Not Found' });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <main id="main">
      <BlogArticleView post={post} />
      <JsonLdArticle title={post.title} date={post.date} author={post.author} />
    </main>
  );
}
