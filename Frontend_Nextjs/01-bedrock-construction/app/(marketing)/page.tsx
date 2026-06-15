import { HomeSections } from '@/components/sections/HomeSections';
import {
  getFaq,
  getHomePage,
  getProjects,
  getServices,
  getTestimonials,
} from '@/lib/content/repositories/site-content';

export default async function HomePage() {
  const [home, services, projects, faq, testimonials] = await Promise.all([
    getHomePage(),
    getServices(),
    getProjects(),
    getFaq(),
    getTestimonials(),
  ]);

  return <HomeSections home={home} services={services} projects={projects} faq={faq} testimonials={testimonials} />;
}
