import React, { useState, useEffect, useRef } from 'react';
import {
  Sun, Zap, ArrowUpRight, ArrowRight, Phone, Mail, MapPin,
  Star, Shield, CheckCircle2, ChevronDown, Menu, X,
  Battery, Lightbulb, Plug, Camera, Flame, Wrench, HardHat,
  Calculator, TrendingUp, Clock, Sparkles, Quote, Facebook, Instagram, Linkedin
} from 'lucide-react';

// ============================================================
//  RAYISS ELECTRICAL & SOLAR — Homepage
//  Editorial / architectural / data-forward
//  Designed for Next.js — add 'use client' at top when dropping into app/page.jsx
// ============================================================

export default function RayissHomepage() {
  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", color: '#0A0A0A', background: '#F8F5EE' }}>
      <GlobalStyles />
      <TopBar />
      <Navigation />
      <Hero />
      <TrustStrip />
      <Stats />
      <Services />
      <Process />
      <SolarCalculator />
      <Projects />
      <BrandPartners />
      <Testimonials />
      <FinalCta />
      <Faq />
      <QuoteForm />
      <Footer />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   GLOBAL STYLES — fonts, animations, base
   ────────────────────────────────────────────────────────── */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');

      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { margin: 0; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

      .display { font-family: 'Bricolage Grotesque', 'Helvetica Neue', sans-serif; font-feature-settings: 'ss01'; letter-spacing: -0.025em; line-height: 0.95; }
      .serif-i { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; letter-spacing: -0.01em; font-weight: 400; }
      .mono { font-family: 'JetBrains Mono', ui-monospace, monospace; letter-spacing: -0.01em; }
      .eyebrow { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 500; }

      .grain::before {
        content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0.06;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      }

      .hairline { border-color: rgba(10, 10, 10, 0.12); }
      .hairline-dark { border-color: rgba(255, 255, 255, 0.14); }

      @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideX { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes counter { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.6); opacity: 0; } }

      .reveal { opacity: 0; }
      .reveal.in { animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
      .reveal-delay-1.in { animation-delay: 0.1s; }
      .reveal-delay-2.in { animation-delay: 0.2s; }
      .reveal-delay-3.in { animation-delay: 0.3s; }
      .reveal-delay-4.in { animation-delay: 0.4s; }

      .marquee { display: flex; width: max-content; animation: slideX 40s linear infinite; }
      .marquee:hover { animation-play-state: paused; }

      .btn-primary {
        background: #FF5B1F; color: #fff; padding: 14px 22px; border-radius: 999px;
        font-weight: 500; font-size: 15px; display: inline-flex; align-items: center; gap: 8px;
        transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1); border: none; cursor: pointer;
      }
      .btn-primary:hover { background: #E64A0F; transform: translateY(-1px); box-shadow: 0 10px 30px -10px rgba(255, 91, 31, 0.5); }
      .btn-ghost {
        background: transparent; color: #0A0A0A; padding: 14px 22px; border-radius: 999px;
        font-weight: 500; font-size: 15px; display: inline-flex; align-items: center; gap: 8px;
        border: 1px solid rgba(10, 10, 10, 0.2); transition: all 0.2s; cursor: pointer;
      }
      .btn-ghost:hover { background: #0A0A0A; color: #fff; border-color: #0A0A0A; }
      .btn-ghost-dark {
        background: transparent; color: #fff; padding: 14px 22px; border-radius: 999px;
        font-weight: 500; font-size: 15px; display: inline-flex; align-items: center; gap: 8px;
        border: 1px solid rgba(255, 255, 255, 0.25); transition: all 0.2s; cursor: pointer;
      }
      .btn-ghost-dark:hover { background: #fff; color: #0A0A0A; }

      .link-underline { position: relative; }
      .link-underline::after {
        content: ''; position: absolute; left: 0; bottom: -2px; width: 100%; height: 1px;
        background: currentColor; transform: scaleX(0); transform-origin: left;
        transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .link-underline:hover::after { transform: scaleX(1); }

      .ring-pulse { position: relative; }
      .ring-pulse::before, .ring-pulse::after {
        content: ''; position: absolute; inset: 0; border-radius: inherit;
        border: 2px solid #22c55e; animation: pulse-ring 2s ease-out infinite;
      }
      .ring-pulse::after { animation-delay: 1s; }

      input[type="range"] { -webkit-appearance: none; appearance: none; background: transparent; }
      input[type="range"]::-webkit-slider-runnable-track {
        height: 4px; background: rgba(10, 10, 10, 0.12); border-radius: 2px;
      }
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; appearance: none; height: 22px; width: 22px; border-radius: 50%;
        background: #FF5B1F; border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        margin-top: -9px; cursor: pointer; transition: transform 0.15s;
      }
      input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.15); }
      input[type="range"]::-moz-range-track { height: 4px; background: rgba(10, 10, 10, 0.12); border-radius: 2px; }
      input[type="range"]::-moz-range-thumb {
        height: 22px; width: 22px; border-radius: 50%; background: #FF5B1F;
        border: 3px solid #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.15); cursor: pointer;
      }

      /* Scroll-snap grid for projects on smaller widths */
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
  );
}

/* ──────────────────────────────────────────────────────────
   IntersectionObserver hook for scroll reveals
   ────────────────────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ──────────────────────────────────────────────────────────
   TOP BAR + NAVIGATION
   ────────────────────────────────────────────────────────── */
function TopBar() {
  return (
    <div style={{ background: '#0A0A0A', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center" style={{ height: 38, fontSize: 12.5 }}>
        <div className="flex items-center gap-5 text-white/70">
          <span className="flex items-center gap-1.5"><MapPin size={12} /> 3/159 Chifley St, Wetherill Park NSW</span>
          <span className="hidden md:flex items-center gap-1.5"><Clock size={12} /> Mon–Sat 7am–5pm</span>
        </div>
        <div className="flex items-center gap-4 text-white/70">
          <a href="tel:1300729477" className="flex items-center gap-1.5 hover:text-white transition-colors"><Phone size={12} /> 1300 729 477</a>
          <span className="hidden md:flex items-center gap-3 pl-4 border-l border-white/10">
            <a href="/contact" aria-label="Facebook" className="hover:text-white"><Facebook size={13} /></a>
            <a href="/contact" aria-label="Instagram" className="hover:text-white"><Instagram size={13} /></a>
            <a href="/contact" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={13} /></a>
          </span>
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(null); // 'solar' | 'electrical' | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solarItems = [
    { name: 'Residential solar', desc: 'Cut your power bill 40–70%', href: '/solar/residential' },
    { name: 'Commercial solar', desc: 'Reduce business overheads', href: '/solar/commercial' },
    { name: 'Battery storage', desc: 'Tesla Powerwall & Sungrow', href: '/solar/battery-storage' },
    { name: 'System upgrades', desc: 'Expand your existing array', href: '/solar/system-upgrades' },
    { name: 'Service & maintenance', desc: 'Keep your system at peak', href: '/solar/service-maintenance' },
    { name: 'Finance options', desc: 'Green Loan from 0% interest', href: '/solar/finance-options' },
  ];
  const elecItems = [
    { name: 'General electrical', desc: 'Repairs, rewires, switchboards', href: '/electrical/general' },
    { name: 'Level 2 services', desc: 'Network connections & meters', href: '/electrical/level-2' },
    { name: 'Hot water heat pumps', desc: 'Save up to $900/yr', href: '/electrical/hot-water-heat-pumps' },
    { name: 'LED lighting upgrades', desc: 'NSW ESS rebates available', href: '/electrical/led-lighting-upgrades' },
    { name: 'EV charger installation', desc: 'Single & 3-phase chargers', href: '/electrical/ev-charger-installation' },
    { name: 'CCTV installation', desc: 'Dahua HD surveillance', href: '/electrical/cctv-installation' },
  ];

  return (
    <nav
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'rgba(248, 245, 238, 0.85)' : '#F8F5EE',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(10,10,10,0.06)' : '1px solid transparent',
        transition: 'all 0.3s',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between" style={{ height: 72 }}>
        <a href="/" className="flex items-center gap-2.5">
          <LogoMark />
          <div>
            <div className="display" style={{ fontWeight: 700, fontSize: 18, lineHeight: 1 }}>Rayiss</div>
            <div className="eyebrow" style={{ fontSize: 9, color: '#6B6B66', marginTop: 2 }}>Electrical · Solar</div>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-1" onMouseLeave={() => setOpen(null)}>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavDropdown
            label="Solar installations"
            isOpen={open === 'solar'}
            onMouseEnter={() => setOpen('solar')}
            items={solarItems}
            accent="#FF5B1F"
            ctaText="Get a solar quote"
          />
          <NavDropdown
            label="Electrical services"
            isOpen={open === 'electrical'}
            onMouseEnter={() => setOpen('electrical')}
            items={elecItems}
            accent="#0A0A0A"
            ctaText="Book an electrician"
          />
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/reviews">Reviews</NavLink>
        </div>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a href="/contact" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>Get a free quote <ArrowUpRight size={16} /></a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2"
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t hairline px-6 py-6 space-y-3" style={{ background: '#F8F5EE' }}>
          <a href="/" className="block py-2 text-base">Home</a>
          <a href="/about" className="block py-2 text-base">About</a>
          <details className="border-t hairline pt-3">
            <summary className="text-base font-medium cursor-pointer list-none flex justify-between items-center">Solar installations <ChevronDown size={16} /></summary>
            <div className="pt-3 pl-2 space-y-2">{solarItems.map((i) => <a key={i.name} href={i.href} className="block text-sm text-neutral-600">{i.name}</a>)}</div>
          </details>
          <details className="border-t hairline pt-3">
            <summary className="text-base font-medium cursor-pointer list-none flex justify-between items-center">Electrical services <ChevronDown size={16} /></summary>
            <div className="pt-3 pl-2 space-y-2">{elecItems.map((i) => <a key={i.name} href={i.href} className="block text-sm text-neutral-600">{i.name}</a>)}</div>
          </details>
          <a href="/projects" className="block py-2 text-base border-t hairline pt-3">Projects</a>
          <a href="/blog" className="block py-2 text-base">Blog</a>
          <a href="/contact" className="block py-2 text-base">Contact</a>
          <a href="/reviews" className="block py-2 text-base">Reviews</a>
          <a href="/contact" className="btn-primary w-full justify-center mt-4">Get a free quote <ArrowUpRight size={16} /></a>
        </div>
      )}
    </nav>
  );
}

function LogoMark() {
  return (
    <div style={{ width: 36, height: 36, background: '#0A0A0A', borderRadius: 8, display: 'grid', placeItems: 'center', position: 'relative' }}>
      <Zap size={18} color="#FF5B1F" strokeWidth={2.5} fill="#FF5B1F" />
      <Sun size={9} color="#fff" style={{ position: 'absolute', top: 4, right: 4 }} />
    </div>
  );
}

function NavLink({ href, children }) {
  return (
    <a href={href} className="link-underline px-3 py-2 text-sm font-medium" style={{ color: '#0A0A0A' }}>
      {children}
    </a>
  );
}

function NavDropdown({ label, isOpen, onMouseEnter, items, accent, ctaText }) {
  return (
    <div className="relative" onMouseEnter={onMouseEnter}>
      <button className="link-underline px-3 py-2 text-sm font-medium flex items-center gap-1">
        {label} <ChevronDown size={13} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
      {isOpen && (
        <div
          className="absolute left-0 top-full pt-2"
          style={{ width: 520, animation: 'fadeIn 0.2s ease-out' }}
        >
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 20px 60px -20px rgba(0,0,0,0.25), 0 0 0 1px rgba(10,10,10,0.06)', padding: 24 }}>
            <div className="eyebrow mb-4" style={{ color: accent }}>{label === 'Solar installations' ? '6 solar services' : '6 electrical specialties'}</div>
            <div className="grid grid-cols-2 gap-1">
              {items.map((item) => (
                <a key={item.name} href={item.href} className="group p-3 rounded-lg hover:bg-neutral-50 transition-colors block">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-medium text-sm" style={{ color: '#0A0A0A' }}>{item.name}</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: accent }} />
                  </div>
                  <span className="text-xs text-neutral-500">{item.desc}</span>
                </a>
              ))}
            </div>
            <div className="border-t hairline mt-4 pt-4 flex items-center justify-between">
              <span className="text-xs text-neutral-500">Need help choosing? <a href="tel:1300729477" className="underline">Call us</a></span>
              <a href="/contact" className="text-sm font-medium flex items-center gap-1" style={{ color: accent }}>
                {ctaText} <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────────────────── */
function Hero() {
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal();
  return (
    <section style={{ background: '#0A0A0A', color: '#fff', position: 'relative', overflow: 'hidden' }} className="grain">
      {/* Faint radial accent */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-10%', width: 800, height: 800,
        background: 'radial-gradient(circle, rgba(255,91,31,0.18) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      {/* Grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative" style={{ paddingTop: 80, paddingBottom: 100 }}>
        {/* Eyebrow */}
        <div ref={r1} className="reveal flex items-center gap-3 mb-10">
          <span className="ring-pulse" style={{ position: 'relative', display: 'inline-block', width: 8, height: 8, background: '#22c55e', borderRadius: '50%' }} />
          <span className="eyebrow text-white/60">Available now · Western Sydney based · NSW-wide</span>
        </div>

        {/* Headline */}
        <h1
          ref={r2}
          className="reveal reveal-delay-1 display"
          style={{
            fontSize: 'clamp(48px, 9vw, 132px)',
            fontWeight: 700,
            maxWidth: '14ch',
            marginBottom: 36,
          }}
        >
          Sydney's <span className="serif-i" style={{ color: '#FF5B1F', fontWeight: 400 }}>sharpest</span><br />
          solar &amp; electrical<br />
          specialists.
        </h1>

        {/* Subhead */}
        <p ref={r3} className="reveal reveal-delay-2" style={{ fontSize: 19, maxWidth: '52ch', color: 'rgba(255,255,255,0.7)', lineHeight: 1.55, marginBottom: 44 }}>
          A decade of installs across NSW. 110+ five-star reviews. Fully licensed Level 2 ASP, CEC-accredited solar, family-owned and operated from Wetherill Park.
        </p>

        {/* CTAs */}
        <div ref={r4} className="reveal reveal-delay-3 flex flex-wrap items-center gap-3 mb-16">
          <a href="#quote" className="btn-primary" style={{ padding: '16px 26px', fontSize: 16 }}>
            Get a free quote <ArrowUpRight size={18} />
          </a>
          <a href="tel:1300729477" className="btn-ghost-dark" style={{ padding: '16px 26px', fontSize: 16 }}>
            <Phone size={16} /> 1300 729 477
          </a>
          <span className="text-sm text-white/50 ml-2">No-obligation. On-site or phone.</span>
        </div>

        {/* Hero meta strip */}
        <div className="border-t hairline-dark pt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <HeroMeta label="GOOGLE RATING" value="4.9" suffix="/ 5" icon={<Star size={12} fill="#FF5B1F" stroke="#FF5B1F" />} sub="from 110+ reviews" />
          <HeroMeta label="EXPERIENCE" value="10" suffix=" years" sub="since 2014" />
          <HeroMeta label="INSTALLS" value="500" suffix="+" sub="solar & electrical" />
          <HeroMeta label="LICENCE" value="Level 2" sub="ASP accredited" mono={false} />
        </div>
      </div>
    </section>
  );
}

function HeroMeta({ label, value, suffix, sub, icon, mono = true }) {
  return (
    <div>
      <div className="eyebrow text-white/40 mb-2 flex items-center gap-1.5">{icon}{label}</div>
      <div className={mono ? 'mono' : 'display'} style={{ fontSize: 32, fontWeight: mono ? 500 : 600, color: '#fff', letterSpacing: '-0.02em' }}>
        {value}<span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>{suffix}</span>
      </div>
      <div className="text-xs text-white/40 mt-1">{sub}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   TRUST STRIP — brand marquee
   ────────────────────────────────────────────────────────── */
function TrustStrip() {
  const brands = ['SUNGROW', 'TESLA POWERWALL', 'TRINA SOLAR', 'SUNPOWER', 'JINKO', 'GROWATT', 'DAHUA', 'CLIPSAL', 'HAGER', 'IXL', 'CEC ACCREDITED', 'LEVEL 2 ASP'];
  return (
    <section style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 0', overflow: 'hidden' }}>
      <div className="marquee">
        {[...brands, ...brands].map((b, i) => (
          <div key={i} className="eyebrow flex-shrink-0 flex items-center gap-3 px-8" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>
            {b}
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   STATS — animated counters
   ────────────────────────────────────────────────────────── */
function Stats() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal" style={{ background: '#F8F5EE', padding: '100px 0', borderBottom: '1px solid rgba(10,10,10,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
          <div>
            <div className="eyebrow mb-4" style={{ color: '#FF5B1F' }}>· The numbers</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, maxWidth: '18ch', lineHeight: 1 }}>
              Trusted for the work that <span className="serif-i" style={{ color: '#FF5B1F' }}>matters most</span>.
            </h2>
          </div>
          <p style={{ fontSize: 17, color: '#4A4A45', lineHeight: 1.6, maxWidth: '46ch' }}>
            From your switchboard to your solar array, we treat every job with the same care — whether it's a $400 LED upgrade or a 30kW commercial install. Here's what a decade of doing it properly looks like.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4">
          <Stat n="500+" label="Installs delivered" sub="Across Sydney metro & NSW regional" />
          <Stat n="110+" label="Google reviews" sub="Verified five-star average" />
          <Stat n="$2.4M" label="In customer savings" sub="From solar & efficiency upgrades" />
          <Stat n="100%" label="Compliant work" sub="Level 2 ASP & CEC accredited" />
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label, sub }) {
  return (
    <div className="border-l hairline pl-6 py-4">
      <div className="display" style={{ fontSize: 56, fontWeight: 700, lineHeight: 1, marginBottom: 12, letterSpacing: '-0.04em' }}>{n}</div>
      <div className="font-medium text-base mb-1">{label}</div>
      <div className="text-sm text-neutral-500">{sub}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   SERVICES — two pillars
   ────────────────────────────────────────────────────────── */
function Services() {
  const ref = useReveal();
  const solarServices = [
    { icon: <Sun size={18} />, name: 'Residential solar', desc: 'Cut household power bills 40–70% with a system sized to your usage.' },
    { icon: <Sun size={18} />, name: 'Commercial solar', desc: 'Reduce overheads with rooftop arrays from 10kW to 100kW+.' },
    { icon: <Battery size={18} />, name: 'Battery storage', desc: 'Tesla Powerwall, Sungrow, and other top-tier batteries installed.' },
    { icon: <TrendingUp size={18} />, name: 'System upgrades', desc: 'Expand your existing array, add a battery, or replace inverters.' },
    { icon: <Wrench size={18} />, name: 'Service & maintenance', desc: 'Diagnostics, panel cleaning, and warranty repairs on all brands.' },
    { icon: <Sparkles size={18} />, name: 'Finance options', desc: 'NSW Green Loan from 0% interest. Solar from $0 upfront.' },
  ];
  const elecServices = [
    { icon: <Zap size={18} />, name: 'General electrical', desc: 'Repairs, rewires, switchboard upgrades, safety inspections.' },
    { icon: <HardHat size={18} />, name: 'Level 2 services', desc: 'Network connections, meter installs, overhead & underground.' },
    { icon: <Flame size={18} />, name: 'Hot water heat pumps', desc: 'Replace electric/gas with a heat pump — save up to $900/year.' },
    { icon: <Lightbulb size={18} />, name: 'LED lighting upgrades', desc: 'Commercial & residential LED with NSW ESS rebates.' },
    { icon: <Plug size={18} />, name: 'EV charger installation', desc: 'Single & 3-phase EV chargers, Tesla & universal.' },
    { icon: <Camera size={18} />, name: 'CCTV installation', desc: 'Dahua HD surveillance with night vision & remote access.' },
  ];

  return (
    <section ref={ref} className="reveal" id="services" style={{ background: '#F8F5EE', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="eyebrow mb-4" style={{ color: '#FF5B1F' }}>· What we do</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, maxWidth: '14ch', lineHeight: 1 }}>
              Two pillars. <span className="serif-i" style={{ color: '#FF5B1F' }}>Twelve</span> specialties. One team.
            </h2>
          </div>
          <p style={{ fontSize: 17, color: '#4A4A45', maxWidth: '38ch', lineHeight: 1.6 }}>
            We're a tight-knit crew of electricians and solar specialists. Whatever you need wired, installed, or rebated — we handle the whole thing in-house.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <PillarCard
            tag="01 — SOLAR"
            title="Solar installations"
            blurb="Design, install, and maintain solar systems that actually deliver the savings the salesman promised."
            services={solarServices}
            accent="#FF5B1F"
            bg="#fff"
            href="/solar"
          />
          <PillarCard
            tag="02 — ELECTRICAL"
            title="Electrical services"
            blurb="Everything else that runs on electrons — from your switchboard to your driveway EV charger."
            services={elecServices}
            accent="#FF5B1F"
            bg="#0A0A0A"
            color="#fff"
            href="/electrical"
          />
        </div>
      </div>
    </section>
  );
}

function PillarCard({ tag, title, blurb, services, accent, bg, color = '#0A0A0A', href }) {
  const isDark = color === '#fff';
  return (
    <div style={{ background: bg, color, borderRadius: 24, padding: 40, position: 'relative', overflow: 'hidden', minHeight: 600 }}>
      {isDark && (
        <div style={{
          position: 'absolute', top: '-30%', left: '-20%', width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(255,91,31,0.15) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
      )}
      <div style={{ position: 'relative' }}>
        <div className="eyebrow mb-6" style={{ color: accent }}>{tag}</div>
        <h3 className="display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 600, lineHeight: 1, marginBottom: 16 }}>{title}</h3>
        <p style={{ fontSize: 15.5, opacity: 0.7, marginBottom: 32, maxWidth: '40ch', lineHeight: 1.55 }}>{blurb}</p>

        <div style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(10,10,10,0.08)' }}>
          {services.map((s, i) => (
            <a
              key={s.name}
              href={href}
              className="group flex items-start gap-4 py-4 transition-colors"
              style={{
                borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(10,10,10,0.08)',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(10,10,10,0.05)',
                display: 'grid', placeItems: 'center',
                color: accent,
              }}>{s.icon}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className="font-medium" style={{ fontSize: 15 }}>{s.name}</span>
                  <ArrowUpRight size={16} className="opacity-30 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <span style={{ fontSize: 13, opacity: 0.55, lineHeight: 1.5, display: 'block' }}>{s.desc}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   PROCESS — 4 steps
   ────────────────────────────────────────────────────────── */
function Process() {
  const steps = [
    { n: '01', t: 'Talk', d: 'Tell us what you need on the phone or via the quote form. We listen first, sell second.' },
    { n: '02', t: 'Design', d: 'We site-inspect, design the right system, and lay out the costs and rebates transparently.' },
    { n: '03', t: 'Install', d: 'Our own licensed crew handles the work. No subcontractors, no surprise extras.' },
    { n: '04', t: 'Aftercare', d: '10-year workmanship warranty. Service plans available. We answer the phone after the install.' },
  ];
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal grain" style={{ background: '#0A0A0A', color: '#fff', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <div className="eyebrow mb-4" style={{ color: '#FF5B1F' }}>· How we work</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, lineHeight: 1, maxWidth: '14ch' }}>
              Four steps. <span className="serif-i" style={{ color: '#FF5B1F' }}>Zero</span> surprises.
            </h2>
          </div>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', maxWidth: '46ch', lineHeight: 1.6 }}>
            Most quote horror stories come from murky process. Ours is laid out in plain English from the first phone call — so you know exactly where you stand, when, and why.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
          {steps.map((s, i) => (
            <div key={s.n} style={{ background: '#0A0A0A', padding: 32, minHeight: 280 }} className="group">
              <div className="flex items-start justify-between mb-12">
                <span className="mono text-sm" style={{ color: '#FF5B1F' }}>{s.n}</span>
                <ArrowUpRight size={18} className="opacity-30 group-hover:opacity-100 group-hover:text-[#FF5B1F] transition-all" />
              </div>
              <h3 className="display" style={{ fontSize: 36, fontWeight: 600, marginBottom: 12 }}>{s.t}</h3>
              <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   SOLAR CALCULATOR — interactive lead magnet
   ────────────────────────────────────────────────────────── */
function SolarCalculator() {
  const [bill, setBill] = useState(550);
  const [orientation, setOrientation] = useState('N');

  // Simple estimation model (illustrative)
  const orientationFactor = { N: 1.0, EW: 0.88, S: 0.7 }[orientation];
  const annualBill = bill * 4;
  const targetOffset = 0.75; // aim to offset 75% with solar
  const requiredKwhPerYear = (annualBill / 0.32) * targetOffset; // ~ $0.32/kWh average
  const kwhPerKwYear = 1450 * orientationFactor; // Sydney average production
  const systemKw = Math.max(4, Math.min(20, requiredKwhPerYear / kwhPerKwYear));
  const annualSavings = Math.round(systemKw * kwhPerKwYear * 0.32);
  const systemCost = Math.round(systemKw * 1100); // ~$1,100/kW installed
  const stcRebate = Math.round(systemKw * 380);
  const netCost = systemCost - stcRebate;
  const paybackYears = (netCost / annualSavings).toFixed(1);

  const ref = useReveal();
  return (
    <section ref={ref} className="reveal" id="calculator" style={{ background: '#F8F5EE', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-4" style={{ color: '#FF5B1F' }}>· Free instant estimate</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 600, lineHeight: 1, marginBottom: 24 }}>
              See your solar <span className="serif-i" style={{ color: '#FF5B1F' }}>savings</span> in 10 seconds.
            </h2>
            <p style={{ fontSize: 16, color: '#4A4A45', lineHeight: 1.6, marginBottom: 32 }}>
              Drag the slider to your quarterly power bill. We'll estimate the right system size, your annual savings, and rough payback period — based on real NSW production data and current rebates.
            </p>
            <ul style={{ fontSize: 14.5, color: '#4A4A45' }}>
              <li className="flex items-start gap-2 py-2 border-t hairline">
                <CheckCircle2 size={16} style={{ color: '#FF5B1F', flexShrink: 0, marginTop: 2 }} />
                <span>Based on Sydney solar production averages</span>
              </li>
              <li className="flex items-start gap-2 py-2 border-t hairline">
                <CheckCircle2 size={16} style={{ color: '#FF5B1F', flexShrink: 0, marginTop: 2 }} />
                <span>Includes current STC rebate calculation</span>
              </li>
              <li className="flex items-start gap-2 py-2 border-t hairline">
                <CheckCircle2 size={16} style={{ color: '#FF5B1F', flexShrink: 0, marginTop: 2 }} />
                <span>Estimate only — a site visit gives you the real number</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div style={{ background: '#fff', borderRadius: 24, padding: 40, boxShadow: '0 30px 60px -30px rgba(0,0,0,0.15), 0 0 0 1px rgba(10,10,10,0.06)' }}>
              <div className="flex items-center gap-3 mb-8">
                <Calculator size={20} style={{ color: '#FF5B1F' }} />
                <span className="eyebrow">Savings calculator</span>
              </div>

              {/* Bill slider */}
              <div className="mb-8">
                <div className="flex justify-between items-baseline mb-3">
                  <label className="font-medium text-sm">Your quarterly power bill</label>
                  <span className="mono font-medium" style={{ fontSize: 22, color: '#FF5B1F' }}>${bill}</span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={1800}
                  step={25}
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 mono text-xs text-neutral-500">
                  <span>$200</span><span>$1,800</span>
                </div>
              </div>

              {/* Orientation */}
              <div className="mb-10">
                <label className="font-medium text-sm mb-3 block">Main roof orientation</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { v: 'N', l: 'North', d: 'Optimal' },
                    { v: 'EW', l: 'East/West', d: 'Good' },
                    { v: 'S', l: 'South', d: 'Limited' },
                  ].map((o) => (
                    <button
                      key={o.v}
                      onClick={() => setOrientation(o.v)}
                      style={{
                        padding: '14px 8px',
                        borderRadius: 12,
                        border: orientation === o.v ? '1.5px solid #FF5B1F' : '1.5px solid rgba(10,10,10,0.08)',
                        background: orientation === o.v ? 'rgba(255,91,31,0.05)' : '#fff',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div className="font-medium text-sm">{o.l}</div>
                      <div className="text-xs text-neutral-500 mt-0.5">{o.d}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div style={{ background: '#0A0A0A', borderRadius: 16, padding: 28, color: '#fff' }}>
                <div className="eyebrow mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>Your estimate</div>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <ResultRow label="Recommended system" value={`${systemKw.toFixed(1)} kW`} />
                  <ResultRow label="Annual savings" value={`$${annualSavings.toLocaleString()}`} highlight />
                  <ResultRow label="STC rebate" value={`–$${stcRebate.toLocaleString()}`} />
                  <ResultRow label="Payback period" value={`~${paybackYears} yrs`} />
                </div>
                <a href="#quote" className="btn-primary w-full justify-center" style={{ display: 'flex', padding: 14 }}>
                  Lock in this estimate <ArrowUpRight size={16} />
                </a>
                <p className="text-xs mt-3 text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  We'll send a detailed quote within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultRow({ label, value, highlight }) {
  return (
    <div>
      <div className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{label}</div>
      <div className="mono" style={{ fontSize: highlight ? 28 : 22, fontWeight: 500, color: highlight ? '#FF5B1F' : '#fff' }}>{value}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   PROJECTS — case studies
   ────────────────────────────────────────────────────────── */
function Projects() {
  const ref = useReveal();
  const projects = [
    {
      slug: 'wetherill-park-solar-powerwall',
      tag: 'Residential solar + battery',
      title: '13.3 kW Sungrow with Tesla Powerwall',
      location: 'Wetherill Park, NSW',
      stats: [
        { l: 'Bill before', v: '$720/qtr' },
        { l: 'Bill after', v: '$90/qtr' },
        { l: 'Payback', v: '5.8 yrs' },
      ],
      bg: 'linear-gradient(135deg, #FF5B1F 0%, #E64A0F 100%)',
    },
    {
      slug: 'smithfield-level-2-upgrade',
      tag: 'Level 2 commercial',
      title: 'Three-phase upgrade & meter install',
      location: 'Smithfield warehouse',
      stats: [
        { l: 'Capacity', v: '250 A' },
        { l: 'Phases', v: '3' },
        { l: 'Downtime', v: '0 hrs' },
      ],
      bg: 'linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%)',
    },
    {
      slug: 'liverpool-ev-charging-rollout',
      tag: 'EV infrastructure',
      title: '30-bay EV charging install',
      location: 'Liverpool apartment complex',
      stats: [
        { l: 'Chargers', v: '30' },
        { l: 'Output', v: '22 kW ea.' },
        { l: 'Timeline', v: '11 days' },
      ],
      bg: 'linear-gradient(135deg, #2D2D2D 0%, #0A0A0A 100%)',
    },
  ];

  return (
    <section ref={ref} className="reveal" id="projects" style={{ background: '#F8F5EE', padding: '100px 0', borderTop: '1px solid rgba(10,10,10,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="eyebrow mb-4" style={{ color: '#FF5B1F' }}>· Recent work</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, lineHeight: 1, maxWidth: '14ch' }}>
              Real jobs. <span className="serif-i" style={{ color: '#FF5B1F' }}>Real</span> numbers.
            </h2>
          </div>
          <a href="/projects" className="link-underline text-sm font-medium flex items-center gap-1">
            See all 500+ projects <ArrowRight size={14} />
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ slug, tag, title, location, stats, bg }) {
  return (
    <a href={`/projects/${slug}`} className="group" style={{ background: bg, borderRadius: 20, padding: 28, color: '#fff', minHeight: 420, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
      {/* Subtle texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.4,
        backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="flex justify-between items-start mb-auto">
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)', padding: '6px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: 999, backdropFilter: 'blur(8px)' }}>{tag}</span>
          <ArrowUpRight size={20} className="opacity-60 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
        </div>

        <div>
          <h3 className="display" style={{ fontSize: 26, fontWeight: 600, lineHeight: 1.1, marginBottom: 8 }}>{title}</h3>
          <div className="flex items-center gap-1.5 mb-6" style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
            <MapPin size={12} /> {location}
          </div>

          <div className="grid grid-cols-3 gap-2 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            {stats.map((s) => (
              <div key={s.l}>
                <div className="mono" style={{ fontSize: 18, fontWeight: 500 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

/* ──────────────────────────────────────────────────────────
   BRAND PARTNERS
   ────────────────────────────────────────────────────────── */
function BrandPartners() {
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal" style={{ background: '#F8F5EE', padding: '60px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b hairline">
          <div>
            <div className="eyebrow mb-2" style={{ color: '#FF5B1F' }}>· Trusted partners</div>
            <p className="display" style={{ fontSize: 22, fontWeight: 500, maxWidth: '32ch' }}>
              We only install gear we'd put on our own roof.
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-4 items-center">
            {['Sungrow', 'Tesla', 'Trina', 'SunPower', 'Jinko', 'Dahua'].map((b) => (
              <div key={b} className="eyebrow" style={{ fontSize: 14, color: '#4A4A45', textAlign: 'center' }}>{b}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   TESTIMONIALS — editorial pull-quotes
   ────────────────────────────────────────────────────────── */
function Testimonials() {
  const reviews = [
    { q: 'Very happy with the service and would highly recommend these guys. They explained from A to Z, sorted everything, and the install was seamless.', name: 'Nick M.', meta: 'Residential solar · Fairfield' },
    { q: 'On behalf of Valentina Solution and myself I would like to thank Rayiss Electrical for their outstanding job. Especially their efficiency and quality of work.', name: 'Selva K.', meta: 'Commercial · Western Sydney' },
    { q: 'Rayiss installed and provisioned my property with a Sungrow 25kW 3-phase Hybrid system with 50kw of Battery. They assisted us with onboarding to the rebate program.', name: 'Kristian I.', meta: 'Hybrid system · NSW' },
  ];
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal" style={{ background: '#F8F5EE', padding: '100px 0', borderTop: '1px solid rgba(10,10,10,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <div className="eyebrow mb-4" style={{ color: '#FF5B1F' }}>· Customers</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, lineHeight: 1, maxWidth: '14ch' }}>
              4.9 stars. <span className="serif-i" style={{ color: '#FF5B1F' }}>110+</span> times in a row.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex">{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={20} fill="#FF5B1F" stroke="#FF5B1F" />)}</div>
            <span className="text-sm font-medium">on Google · <a href="/reviews" className="link-underline">Read them all</a></span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 20, padding: 32, border: '1px solid rgba(10,10,10,0.06)' }}>
              <Quote size={22} style={{ color: '#FF5B1F', marginBottom: 18 }} />
              <p className="serif-i" style={{ fontSize: 21, lineHeight: 1.45, marginBottom: 24, color: '#0A0A0A' }}>
                "{r.q}"
              </p>
              <div className="border-t hairline pt-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{r.name}</div>
                  <div className="text-xs text-neutral-500">{r.meta}</div>
                </div>
                <div className="flex">{[1, 2, 3, 4, 5].map((i) => <Star key={i} size={12} fill="#FF5B1F" stroke="#FF5B1F" />)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   FINAL CTA
   ────────────────────────────────────────────────────────── */
function FinalCta() {
  return (
    <section style={{ background: '#FF5B1F', color: '#fff', padding: '80px 0', position: 'relative', overflow: 'hidden' }} className="grain">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <div className="eyebrow mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>· Get started</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 700, lineHeight: 0.95, maxWidth: '20ch' }}>
              Ready to talk?<br />
              <span className="serif-i" style={{ fontWeight: 400 }}>We answer fast.</span>
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#quote" className="btn-ghost-dark" style={{ background: '#0A0A0A', borderColor: '#0A0A0A', padding: '18px 28px', fontSize: 16 }}>
              Get a free quote <ArrowUpRight size={18} />
            </a>
            <a href="tel:1300729477" style={{ color: '#fff', fontSize: 14, textAlign: 'center', textDecoration: 'underline', textUnderlineOffset: 4 }}>
              Or call 1300 729 477
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   FAQ
   ────────────────────────────────────────────────────────── */
function Faq() {
  const [open, setOpen] = useState(0);
  const items = [
    { q: 'How long does a solar install take?', a: 'A typical residential install is completed in one day. Commercial systems usually take 2–5 days depending on size and complexity. We do all our own work — no subcontractors — so the timeline is reliable.' },
    { q: 'Do you handle the NSW rebate paperwork?', a: 'Yes — STCs, the Empowering Homes loan, and the NSW Energy Savings Scheme rebates for heat pumps and LED upgrades. We handle every form, so the price you see on the quote is what you pay.' },
    { q: 'What warranty do you offer on installations?', a: '10-year workmanship warranty on all of our installations. Panel and inverter warranties are passed through directly from the manufacturer — typically 25 years on panels, 10–12 on inverters.' },
    { q: 'Are you Level 2 ASP accredited?', a: 'Yes. We can connect, disconnect, and upgrade your service line directly to the network — meter installs, three-phase upgrades, overhead and underground. Not every electrician can do this.' },
    { q: 'Do you service my area?', a: 'We\'re based in Wetherill Park and service all of Western Sydney, Greater Sydney, the Blue Mountains, and Wollongong. Regional NSW jobs case-by-case — call us and we\'ll be straight about whether it makes sense.' },
  ];
  const ref = useReveal();
  return (
    <section ref={ref} className="reveal" id="faq" style={{ background: '#F8F5EE', padding: '100px 0' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="eyebrow mb-4" style={{ color: '#FF5B1F' }}>· Questions</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 600, lineHeight: 1, marginBottom: 24 }}>
              Things people <span className="serif-i" style={{ color: '#FF5B1F' }}>actually</span> ask us.
            </h2>
            <p className="text-base text-neutral-600 mb-6" style={{ lineHeight: 1.6 }}>
              Can't find your question? Send it to us — we'll answer within the hour during business hours.
            </p>
            <a href="/contact" className="btn-ghost">Ask a question <ArrowRight size={14} /></a>
          </div>
          <div className="lg:col-span-8">
            {items.map((item, i) => (
              <div key={i} className="border-t hairline" style={{ borderTopColor: i === 0 ? 'transparent' : undefined }}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-medium" style={{ fontSize: 18 }}>{item.q}</span>
                  <span style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: open === i ? '#FF5B1F' : 'transparent',
                    border: open === i ? 'none' : '1px solid rgba(10,10,10,0.15)',
                    color: open === i ? '#fff' : '#0A0A0A',
                    display: 'grid', placeItems: 'center', flexShrink: 0,
                    transition: 'all 0.3s',
                  }}>
                    <ChevronDown size={16} style={{ transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </span>
                </button>
                {open === i && (
                  <div className="pb-6 pr-12" style={{ animation: 'fadeUp 0.4s' }}>
                    <p style={{ fontSize: 16, color: '#4A4A45', lineHeight: 1.65 }}>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   QUOTE FORM — multi-step
   ────────────────────────────────────────────────────────── */
function QuoteForm() {
  const initialData = { service: null, property: null, name: '', phone: '', address: '' };
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);
  const canSubmit = data.name.trim() && data.phone.trim() && data.address.trim();

  const services = [
    { id: 'res-solar', icon: <Sun size={20} />, name: 'Residential solar' },
    { id: 'com-solar', icon: <Sun size={20} />, name: 'Commercial solar' },
    { id: 'battery', icon: <Battery size={20} />, name: 'Battery storage' },
    { id: 'ev', icon: <Plug size={20} />, name: 'EV charger' },
    { id: 'hot-water', icon: <Flame size={20} />, name: 'Hot water heat pump' },
    { id: 'led', icon: <Lightbulb size={20} />, name: 'LED upgrade' },
    { id: 'level-2', icon: <HardHat size={20} />, name: 'Level 2 service' },
    { id: 'general', icon: <Zap size={20} />, name: 'General electrical' },
    { id: 'cctv', icon: <Camera size={20} />, name: 'CCTV install' },
  ];

  return (
    <section id="quote" style={{ background: '#0A0A0A', color: '#fff', padding: '100px 0', position: 'relative', overflow: 'hidden' }} className="grain">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-4" style={{ color: '#FF5B1F' }}>· Free quote · No obligation</div>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 600, lineHeight: 0.95, marginBottom: 24 }}>
              Three steps.<br />
              <span className="serif-i" style={{ color: '#FF5B1F' }}>Real</span> quote in 24 hours.
            </h2>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 32 }}>
              No 30-field intake. Tell us what you need, where, and how to reach you — we'll take it from there with a phone call.
            </p>
            <div className="space-y-4 mt-12">
              <ContactRow icon={<Phone size={16} />} label="Call us" value="1300 729 477" />
              <ContactRow icon={<Mail size={16} />} label="Email" value="info@rayisselectrical.com.au" />
              <ContactRow icon={<MapPin size={16} />} label="Office" value="3/159 Chifley St, Wetherill Park NSW" />
              <ContactRow icon={<Clock size={16} />} label="Hours" value="Mon–Sat · 7am–5pm" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div style={{ background: '#fff', color: '#0A0A0A', borderRadius: 24, padding: 40, boxShadow: '0 30px 80px -20px rgba(0,0,0,0.5)' }}>
              {!submitted && (
                <>
                  {/* Progress */}
                  <div className="flex items-center gap-2 mb-8">
                    {[1, 2, 3].map((n) => (
                      <React.Fragment key={n}>
                        <div style={{
                          width: 28, height: 28, borderRadius: '50%',
                          background: step >= n ? '#FF5B1F' : 'rgba(10,10,10,0.06)',
                          color: step >= n ? '#fff' : '#999',
                          display: 'grid', placeItems: 'center',
                          fontSize: 13, fontWeight: 500, transition: 'all 0.3s',
                        }} className="mono">{n}</div>
                        {n < 3 && <div style={{ flex: 1, height: 2, background: step > n ? '#FF5B1F' : 'rgba(10,10,10,0.06)', transition: 'all 0.3s' }} />}
                      </React.Fragment>
                    ))}
                  </div>

                  <div className="mb-2 eyebrow" style={{ color: '#FF5B1F' }}>Step {step} of 3</div>
                </>
              )}

              {submitted && (
                <>
                  <div className="eyebrow mb-3" style={{ color: '#FF5B1F' }}>Request received</div>
                  <h3 className="display" style={{ fontSize: 32, fontWeight: 600, marginBottom: 10 }}>
                    Thanks, {data.name}.
                  </h3>
                  <p style={{ color: '#4A4A45', lineHeight: 1.65, marginBottom: 18 }}>
                    Your quote request has been captured in this frontend flow. We will follow up by phone with the next steps.
                  </p>
                  <div style={{ background: 'rgba(255,91,31,0.08)', border: '1px solid rgba(255,91,31,0.2)', borderRadius: 12, padding: 14, marginBottom: 18 }}>
                    <div className="text-sm"><strong>Service:</strong> {services.find((service) => service.id === data.service)?.name || 'General enquiry'}</div>
                    <div className="text-sm mt-1"><strong>Property:</strong> {data.property}</div>
                    <div className="text-sm mt-1"><strong>Address/Suburb:</strong> {data.address}</div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => { setSubmitted(false); setStep(1); setData(initialData); }}
                      className="btn-ghost"
                    >
                      Submit another quote
                    </button>
                    <a href="tel:1300729477" className="btn-primary">Call now <Phone size={16} /></a>
                  </div>
                </>
              )}

              {!submitted && step === 1 && (
                <>
                  <h3 className="display" style={{ fontSize: 28, fontWeight: 600, marginBottom: 6 }}>What do you need?</h3>
                  <p className="text-sm text-neutral-500 mb-6">Pick the service that fits best — we'll narrow it down on the call.</p>
                  <div className="grid grid-cols-3 gap-2">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { setSubmitted(false); setData({ ...data, service: s.id }); setStep(2); }}
                        style={{
                          padding: 16, borderRadius: 12, cursor: 'pointer',
                          border: data.service === s.id ? '1.5px solid #FF5B1F' : '1.5px solid rgba(10,10,10,0.08)',
                          background: data.service === s.id ? 'rgba(255,91,31,0.05)' : '#fff',
                          textAlign: 'left',
                          transition: 'all 0.2s',
                        }}
                        className="hover:border-neutral-300"
                      >
                        <div style={{ color: '#FF5B1F', marginBottom: 8 }}>{s.icon}</div>
                        <div className="font-medium" style={{ fontSize: 13, lineHeight: 1.2 }}>{s.name}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {!submitted && step === 2 && (
                <>
                  <h3 className="display" style={{ fontSize: 28, fontWeight: 600, marginBottom: 6 }}>Where's the job?</h3>
                  <p className="text-sm text-neutral-500 mb-6">Just the property type for now — full address comes next.</p>
                  <div className="grid grid-cols-2 gap-2 mb-8">
                    {['Single house', 'Townhouse / unit', 'Commercial building', 'Other / not sure'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setData({ ...data, property: p })}
                        style={{
                          padding: 18, borderRadius: 12, cursor: 'pointer',
                          border: data.property === p ? '1.5px solid #FF5B1F' : '1.5px solid rgba(10,10,10,0.08)',
                          background: data.property === p ? 'rgba(255,91,31,0.05)' : '#fff',
                          textAlign: 'left',
                        }}
                      >
                        <div className="font-medium text-sm">{p}</div>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    <button onClick={() => setStep(1)} className="btn-ghost">← Back</button>
                    <button onClick={() => setStep(3)} disabled={!data.property} className="btn-primary" style={{ opacity: data.property ? 1 : 0.4 }}>
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                </>
              )}

              {!submitted && step === 3 && (
                <>
                  <h3 className="display" style={{ fontSize: 28, fontWeight: 600, marginBottom: 6 }}>How do we reach you?</h3>
                  <p className="text-sm text-neutral-500 mb-6">We'll send a written quote within 24 hours.</p>
                  <div className="space-y-3 mb-6">
                    <FormField label="Your name" value={data.name} onChange={(v) => setData({ ...data, name: v })} />
                    <FormField label="Phone number" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} />
                    <FormField label="Property address or suburb" value={data.address} onChange={(v) => setData({ ...data, address: v })} />
                  </div>
                  <div className="flex justify-between">
                    <button onClick={() => setStep(2)} className="btn-ghost">← Back</button>
                    <button
                      onClick={() => { if (canSubmit) setSubmitted(true); }}
                      className="btn-primary"
                      style={{ opacity: canSubmit ? 1 : 0.45, cursor: canSubmit ? 'pointer' : 'not-allowed' }}
                      disabled={!canSubmit}
                    >
                      Get my quote <ArrowUpRight size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-center text-neutral-500 mt-4">
                    <Shield size={11} className="inline mr-1" /> We never share your details. Privacy first.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1.5 text-neutral-600">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%', padding: '12px 14px', borderRadius: 10,
          border: '1.5px solid rgba(10,10,10,0.08)', background: '#fff',
          fontSize: 14.5, fontFamily: 'inherit', outline: 'none',
        }}
        onFocus={(e) => e.target.style.borderColor = '#FF5B1F'}
        onBlur={(e) => e.target.style.borderColor = 'rgba(10,10,10,0.08)'}
      />
    </div>
  );
}

function ContactRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4 py-3 border-t hairline-dark">
      <div style={{ color: '#FF5B1F', marginTop: 2 }}>{icon}</div>
      <div>
        <div className="eyebrow text-white/40">{label}</div>
        <div style={{ fontSize: 15.5, marginTop: 2 }}>{value}</div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', color: '#fff', padding: '80px 0 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-10 pb-16 border-b hairline-dark">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-6">
              <LogoMark />
              <div>
                <div className="display" style={{ fontWeight: 700, fontSize: 20, lineHeight: 1 }}>Rayiss</div>
                <div className="eyebrow" style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>Electrical · Solar</div>
              </div>
            </div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: 24, maxWidth: '40ch' }}>
              From sun to socket — we're the team behind Australia's switch to smarter, cleaner energy. Join us in driving the renewable revolution.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="/contact" style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'grid', placeItems: 'center', transition: 'all 0.2s' }} className="hover:bg-white hover:text-black">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Solar"
            items={[
              { label: 'Residential solar', href: '/solar/residential' },
              { label: 'Commercial solar', href: '/solar/commercial' },
              { label: 'Battery storage', href: '/solar/battery-storage' },
              { label: 'System upgrades', href: '/solar/system-upgrades' },
              { label: 'Maintenance', href: '/solar/service-maintenance' },
              { label: 'Finance options', href: '/solar/finance-options' },
            ]} />
          <FooterCol title="Electrical"
            items={[
              { label: 'General electrical', href: '/electrical/general' },
              { label: 'Level 2 services', href: '/electrical/level-2' },
              { label: 'Hot water heat pumps', href: '/electrical/hot-water-heat-pumps' },
              { label: 'LED lighting', href: '/electrical/led-lighting-upgrades' },
              { label: 'EV chargers', href: '/electrical/ev-charger-installation' },
              { label: 'CCTV installation', href: '/electrical/cctv-installation' },
            ]} />
          <FooterCol title="Company"
            items={[
              { label: 'About us', href: '/about' },
              { label: 'Projects', href: '/projects' },
              { label: 'Blog', href: '/blog' },
              { label: 'Reviews', href: '/reviews' },
              { label: 'Contact', href: '/contact' },
              { label: 'Get a quote', href: '/contact' },
            ]} />

          <div className="lg:col-span-2">
            <div className="eyebrow mb-5 text-white/40">Contact</div>
            <div className="space-y-3 text-sm">
              <div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Call</div>
                <a href="tel:1300729477" className="text-white hover:underline">1300 729 477</a>
              </div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Email</div>
                <a href="mailto:info@rayisselectrical.com.au" className="text-white hover:underline" style={{ fontSize: 13 }}>info@rayisselectrical.com.au</a>
              </div>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Visit</div>
                <span style={{ color: '#fff', fontSize: 13 }}>3/159 Chifley St,<br />Wetherill Park NSW 2164</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-10 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <div>© 2026 Rayiss Electrical &amp; Solar PTY LTD · CEC accredited · Level 2 ASP licensed</div>
          <div className="flex gap-5">
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <a href="/terms" className="hover:text-white">Terms</a>
            <a href="/sitemap" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>

    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div className="lg:col-span-2">
      <div className="eyebrow mb-5 text-white/40">{title}</div>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i.label}><a href={i.href} className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>{i.label}</a></li>
        ))}
      </ul>
    </div>
  );
}
