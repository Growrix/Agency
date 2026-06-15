import type { Metadata } from 'next';
import { buildMetadata } from '@/components/seo/metadata';
import { ContactView } from '@/components/views/ContactView';
import { getContactPage, getFaq, getForms, getHomePage } from '@/lib/content/repositories/site-content';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return buildMetadata({ title: page.title, description: page.description, path: '/contact' });
}

export default async function ContactPage() {
  const [page, forms, faq, home] = await Promise.all([
    getContactPage(),
    getForms(),
    getFaq(),
    getHomePage(),
  ]);

  return <ContactView page={page} forms={forms.contact} faq={faq} ctaBand={home.ctaBand} />;
}
