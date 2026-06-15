import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/metadata';
import { ProjectsView } from '@/components/views/ProjectsView';
import { getHomePage, getProjectsPage } from '@/lib/content/repositories/site-content';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getProjectsPage();
  return buildMetadata({ title: page.title, description: page.description, path: '/projects' });
}

export default async function ProjectsPage() {
  const [page, home] = await Promise.all([getProjectsPage(), getHomePage()]);
  return <ProjectsView page={page} ctaBand={home.ctaBand} />;
}
