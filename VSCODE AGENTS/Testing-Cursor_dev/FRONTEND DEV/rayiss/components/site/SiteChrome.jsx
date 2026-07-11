'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sun,
  X,
  Zap,
} from 'lucide-react';
import {
  business,
  electricalServices,
  footerColumns,
  legalRoutes,
  socialLinks,
  solarServices,
} from '@/lib/site-data';

const socialIconByLabel = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
};

function isActive(pathname, href) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function LogoMark() {
  return (
    <div
      className="grid place-items-center rounded-lg"
      style={{ width: 36, height: 36, background: '#0A0A0A', position: 'relative' }}
      aria-hidden
    >
      <Zap size={18} color="#FF5B1F" strokeWidth={2.5} fill="#FF5B1F" />
      <Sun size={9} color="#fff" style={{ position: 'absolute', top: 4, right: 4 }} />
    </div>
  );
}

function DropdownMenu({ label, items, baseHref, pathname }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button
        className="px-3 py-2 text-sm font-medium inline-flex items-center gap-1"
        style={{ color: isActive(pathname, baseHref) ? '#FF5B1F' : '#0A0A0A' }}
      >
        {label}
        <ChevronDown size={13} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full pt-2 z-50" style={{ width: 520 }}>
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 20px 60px -20px rgba(0,0,0,0.25), 0 0 0 1px rgba(10,10,10,0.06)',
              padding: 24,
            }}
          >
            <div className="eyebrow mb-4" style={{ color: '#FF5B1F' }}>
              {label === 'Solar installations' ? '6 solar services' : '6 electrical specialties'}
            </div>

            <div className="grid grid-cols-2 gap-1">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  href={`${baseHref}/${item.slug}`}
                  className="group p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-medium text-sm" style={{ color: '#0A0A0A' }}>
                      {item.name}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: '#FF5B1F' }}
                    />
                  </div>
                  <span className="text-xs text-neutral-500">{item.desc}</span>
                </Link>
              ))}
            </div>

            <div className="border-t hairline mt-4 pt-4 flex items-center justify-between">
              <span className="text-xs text-neutral-500">Need help choosing? Call us</span>
              <Link href="/contact" className="text-sm font-medium inline-flex items-center gap-1" style={{ color: '#FF5B1F' }}>
                Get a quote <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TopBar() {
  return (
    <div style={{ background: '#0A0A0A', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center" style={{ height: 38, fontSize: 12.5 }}>
        <div className="flex items-center gap-5 text-white/70">
          <span className="flex items-center gap-1.5">
            <MapPin size={12} /> {business.addressLine1}, Wetherill Park NSW
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <Clock size={12} /> {business.hours}
          </span>
        </div>

        <div className="flex items-center gap-4 text-white/70">
          <a href={`tel:${business.phoneHref}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={12} /> {business.phoneDisplay}
          </a>
          <span className="hidden md:flex items-center gap-3 pl-4 border-l border-white/10">
            {socialLinks.map((item) => {
              const Icon = socialIconByLabel[item.label] || Mail;

              return (
                <Link key={item.label} href={item.href} aria-label={item.label} className="hover:text-white">
                  <Icon size={13} />
                </Link>
              );
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

function MainNavigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: scrolled ? 'rgba(248, 245, 238, 0.85)' : '#F8F5EE',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(10,10,10,0.06)' : '1px solid transparent',
        transition: 'all 0.3s',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between" style={{ height: 72 }}>
        <Link href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <div>
            <div className="display" style={{ fontWeight: 700, fontSize: 18, lineHeight: 1 }}>
              Rayiss
            </div>
            <div className="eyebrow" style={{ fontSize: 9, color: '#6B6B66', marginTop: 2 }}>
              Electrical · Solar
            </div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium"
              style={{ color: isActive(pathname, item.href) ? '#FF5B1F' : '#0A0A0A' }}
            >
              {item.label}
            </Link>
          ))}

          <DropdownMenu label="Solar installations" baseHref="/solar" items={solarServices} pathname={pathname} />
          <DropdownMenu label="Electrical services" baseHref="/electrical" items={electricalServices} pathname={pathname} />

          {[
            { label: 'Projects', href: '/projects' },
            { label: 'Blog', href: '/blog' },
            { label: 'Reviews', href: '/reviews' },
            { label: 'Contact', href: '/contact' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium"
              style={{ color: isActive(pathname, item.href) ? '#FF5B1F' : '#0A0A0A' }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full text-white text-sm font-medium whitespace-nowrap"
            style={{ background: '#FF5B1F', padding: '14px 22px' }}
          >
            Get a free quote <ArrowUpRight size={16} />
          </Link>
        </div>

        <button onClick={() => setMobileOpen((value) => !value)} className="lg:hidden p-2" aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t hairline px-6 py-6 space-y-3" style={{ background: '#F8F5EE' }}>
          {[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Projects', href: '/projects' },
            { label: 'Blog', href: '/blog' },
            { label: 'Reviews', href: '/reviews' },
            { label: 'Contact', href: '/contact' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="block py-2 text-base">
              {item.label}
            </Link>
          ))}

          <details className="border-t hairline pt-3">
            <summary className="text-base font-medium cursor-pointer list-none flex justify-between items-center">
              Solar installations <ChevronDown size={16} />
            </summary>
            <div className="pt-3 pl-2 space-y-2">
              {solarServices.map((item) => (
                <Link key={item.slug} href={`/solar/${item.slug}`} className="block text-sm text-neutral-600">
                  {item.name}
                </Link>
              ))}
            </div>
          </details>

          <details className="border-t hairline pt-3">
            <summary className="text-base font-medium cursor-pointer list-none flex justify-between items-center">
              Electrical services <ChevronDown size={16} />
            </summary>
            <div className="pt-3 pl-2 space-y-2">
              {electricalServices.map((item) => (
                <Link key={item.slug} href={`/electrical/${item.slug}`} className="block text-sm text-neutral-600">
                  {item.name}
                </Link>
              ))}
            </div>
          </details>

          <Link
            href="/contact"
            className="w-full justify-center mt-4 inline-flex items-center gap-2 rounded-full text-white text-sm font-medium"
            style={{ background: '#FF5B1F', padding: '14px 22px' }}
          >
            Get a free quote <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', color: '#fff', padding: '80px 0 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 pb-16 border-b hairline-dark">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-6">
              <LogoMark />
              <div>
                <div className="display" style={{ fontWeight: 700, fontSize: 20, lineHeight: 1 }}>
                  Rayiss
                </div>
                <div className="eyebrow" style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                  Electrical · Solar
                </div>
              </div>
            </div>

            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 24, maxWidth: '40ch' }}>
              From sun to socket, Rayiss helps homes and businesses move to reliable, efficient electrical and energy systems.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((item) => {
                const Icon = socialIconByLabel[item.label] || Mail;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.06)',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                    className="hover:bg-white hover:text-black transition-colors"
                    aria-label={item.label}
                  >
                    <Icon size={15} />
                  </Link>
                );
              })}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <div className="eyebrow mb-5 text-white/40">{column.title}</div>
              <ul className="space-y-2.5">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <div className="eyebrow mb-5 text-white/40">Contact</div>
            <div className="space-y-3 text-sm">
              <div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Call</div>
                <a href={`tel:${business.phoneHref}`} className="text-white hover:underline">
                  {business.phoneDisplay}
                </a>
              </div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Email</div>
                <a href={`mailto:${business.email}`} className="text-white hover:underline" style={{ fontSize: 13 }}>
                  {business.email}
                </a>
              </div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Visit</div>
                <span style={{ color: '#fff', fontSize: 13 }}>
                  {business.addressLine1},
                  <br />
                  {business.addressLine2}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-10 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <div>© 2026 {business.legalLine}</div>
          <div className="flex gap-5">
            {legalRoutes.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}

export default function SiteChrome({ children }) {
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: '#0A0A0A', background: '#F8F5EE' }}>
      <TopBar />
      <MainNavigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
