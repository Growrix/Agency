import { buildMetadata } from '@/components/seo/metadata';
import { BlogListView } from '@/components/views/ContentViews';
import { getBlogPosts } from '@/lib/content/repositories/site-content';

export const metadata = buildMetadata({
  title: 'Blog',
  description: 'Expert guides on STCs, NEM tariffs, batteries and Australian solar policy.',
  path: '/blog',
});

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <main id="main">
      <BlogListView posts={posts} />
    </main>
  );
}
