import Link from 'next/link';
import { PageHero, SectionWrap } from '@/components/site/PageBlocks';
import { blogPosts, electricalServices, legalRoutes, projects, solarServices } from '@/lib/site-data';

export const metadata = {
  title: 'Sitemap',
  description: 'Human-readable route map for the Rayiss frontend.',
};

export default function SitemapPage() {
  const sections = [
    {
      title: 'Main',
      links: [
        ['Home', '/'],
        ['About', '/about'],
        ['Projects', '/projects'],
        ['Reviews', '/reviews'],
        ['Blog', '/blog'],
        ['Contact', '/contact'],
      ],
    },
    {
      title: 'Solar',
      links: [
        ['Solar landing', '/solar'],
        ...solarServices.map((service) => [service.name, `/solar/${service.slug}`]),
      ],
    },
    {
      title: 'Electrical',
      links: [
        ['Electrical landing', '/electrical'],
        ...electricalServices.map((service) => [service.name, `/electrical/${service.slug}`]),
      ],
    },
    {
      title: 'Case studies',
      links: projects.map((project) => [project.title, `/projects/${project.slug}`]),
    },
    {
      title: 'Blog articles',
      links: blogPosts.map((post) => [post.title, `/blog/${post.slug}`]),
    },
    {
      title: 'Legal',
      links: legalRoutes.map((route) => [route.label, route.href]),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Sitemap"
        title="Route map"
        highlight="for Rayiss"
        description="This page lists public frontend routes so navigation and footer surfaces remain transparent and truthful."
      />

      <SectionWrap
        eyebrow="Navigation"
        title="All published frontend routes."
        description="Use this index to jump directly to any service, content, or legal destination in the Rayiss site."
      >
        <div className="grid md:grid-cols-2 gap-5">
          {sections.map((section) => (
            <div key={section.title} style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(10,10,10,0.08)', padding: 22 }}>
              <h3 className="display" style={{ fontSize: 30, fontWeight: 600, marginBottom: 12 }}>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map(([label, href]) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-neutral-700 hover:text-black hover:underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionWrap>
    </>
  );
}
