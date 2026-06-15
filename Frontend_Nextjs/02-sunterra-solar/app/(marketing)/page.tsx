import { buildMetadata } from '@/components/seo/metadata';
import { Hero, TrustBar } from '@/components/sections/Hero';
import { CalcPreview } from '@/components/sections/CalcPreview';
import { Services, WhySolar, RebatesBand, WhyUs } from '@/components/sections/Services';
import { Stats, Partners, Finance, ServiceAreas, CtaBand } from '@/components/sections/Stats';
import { CaseStudiesPreview, Testimonials, BlogPreview, FaqPreview } from '@/components/sections/CaseStudiesPreview';
import {
  getBlogPosts,
  getCaseStudies,
  getFaq,
  getForms,
  getHomePage,
  getServices,
  getStates,
  getTestimonials,
} from '@/lib/content/repositories/site-content';

export const metadata = buildMetadata();

export default async function HomePage() {
  const [home, services, states, caseStudies, testimonials, blog, faq, forms] = await Promise.all([
    getHomePage(),
    getServices(),
    getStates(),
    getCaseStudies(),
    getTestimonials(),
    getBlogPosts(),
    getFaq(),
    getForms(),
  ]);

  return (
    <main id="main">
      <Hero content={home.hero} forms={forms} />
      <TrustBar items={home.trustBar} />
      <CalcPreview content={home.calcPreview} states={states} />
      <Services head={home.services} items={services} />
      <WhySolar content={home.whySolar} />
      <RebatesBand content={home.rebatesBand} />
      <WhyUs content={home.whyUs} />
      <Stats items={home.stats} />
      <CaseStudiesPreview head={home.caseStudies} items={caseStudies} />
      <Testimonials head={home.testimonials} items={testimonials} />
      <Partners content={home.partners} />
      <Finance content={home.finance} />
      <ServiceAreas content={home.serviceAreas} />
      <BlogPreview head={home.blog} posts={blog} />
      <FaqPreview head={home.faqPreview} items={faq} />
      <CtaBand content={home.ctaBand} />
    </main>
  );
}
