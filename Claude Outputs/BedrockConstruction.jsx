import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Menu, X, Sun, Moon, ArrowRight, ArrowUpRight, Phone, MessageCircle, Bot,
  ChevronDown, Building2, Home, Factory, Hammer, Ruler, ShieldCheck, Leaf,
  Cpu, Award, MapPin, Mail, Star, Quote, ChevronLeft, ChevronRight, Plus,
  Minus, HardHat, Check, ArrowUp, Send, Activity, Layers, Building, Route,
} from "lucide-react";

/* ============================================================================
   BEDROCK CONSTRUCTION GROUP — "We build what endures."
   Luxury Industrial Modernism. Single-file production reference.
   ----------------------------------------------------------------------------
   Design system, theming, motion, a11y and conversion patterns are all here.
   ========================================================================== */

/* ----------------------------- DESIGN TOKENS ----------------------------- */
const THEME = {
  dark: {
    bg: "#0B0C0E", surface: "#14161A", surfaceAlt: "#1B1E23", elevated: "#1F2329",
    border: "#2A2F36", borderStrong: "#3A4049",
    text: "#F2F4F6", textMuted: "#9AA2AB", textFaint: "#6B727B",
    accent: "#FF5A1F", accentText: "#FF7A47", accent2: "#FFC400", accent3: "#3B82F6",
    heroOverlay: "linear-gradient(180deg, rgba(11,12,14,0.55) 0%, rgba(11,12,14,0.82) 60%, #0B0C0E 100%)",
    cardImgFallback: "linear-gradient(135deg,#1B1E23 0%,#0B0C0E 100%)",
  },
  light: {
    bg: "#FFFFFF", surface: "#F6F7F8", surfaceAlt: "#EEF0F2", elevated: "#FFFFFF",
    border: "#E1E4E8", borderStrong: "#C9CED4",
    text: "#0B0C0E", textMuted: "#5B636B", textFaint: "#8A929A",
    accent: "#E8470B", accentText: "#C2410C", accent2: "#B7860B", accent3: "#1D4ED8",
    heroOverlay: "linear-gradient(180deg, rgba(8,9,10,0.45) 0%, rgba(8,9,10,0.55) 55%, rgba(255,255,255,0.0) 100%)",
    cardImgFallback: "linear-gradient(135deg,#E8EAED 0%,#CDD2D8 100%)",
  },
};

const FONTS = {
  display: "'Archivo', 'Arial Narrow', 'Helvetica Neue', sans-serif",
  body: "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif",
  mono: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
};
const MAXW = 1440;
const RADIUS = { card: 18, button: 14, input: 14, modal: 24 };

/* --------------------------------- DATA ---------------------------------- */
const NAV = ["About", "Services", "Projects", "Industries", "Careers", "Insights", "Contact"];

const ANNOUNCEMENTS = [
  "Now building: Westgate Transit Hub — London · $640M",
  "ISO 9001 · ISO 14001 · ISO 45001 Certified",
  "ENR Top 50 Global Contractors — 2025",
  "12.4M safety hours logged without lost-time incident",
  "Partner: Sika · Hilti · Trimble · Autodesk",
];

const SERVICES = [
  { icon: Building2, title: "Commercial Construction", desc: "Office towers, business parks and retail developments delivered to spec, on schedule.", tag: "01" },
  { icon: Home, title: "Residential Construction", desc: "Luxury villas, apartments and master-planned communities built to endure.", tag: "02" },
  { icon: Factory, title: "Industrial Construction", desc: "Factories, warehouses and logistics centres engineered for throughput.", tag: "03" },
  { icon: Route, title: "Infrastructure Development", desc: "Roads, bridges and utilities that move cities forward.", tag: "04" },
  { icon: Hammer, title: "Renovation & Remodeling", desc: "Modernisation and fit-out of complex live environments.", tag: "05" },
  { icon: Ruler, title: "Design & Build", desc: "End-to-end delivery under a single point of accountability.", tag: "06" },
];

const PROJECTS = [
  { name: "Meridian Financial Tower", sector: "Commercial", loc: "Singapore", year: "2024", value: "$480M", scope: "62-storey LEED Platinum HQ", span: true,
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80" },
  { name: "Cascade Cross-Harbour Bridge", sector: "Infrastructure", loc: "Vancouver", year: "2025", value: "$1.1B", scope: "2.4km cable-stayed span",
    img: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?auto=format&fit=crop&w=1200&q=80" },
  { name: "Harbor Logistics Park", sector: "Industrial", loc: "Rotterdam", year: "2023", value: "$210M", scope: "180,000 m² automated DC",
    img: "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&w=1200&q=80" },
  { name: "The Linden Residences", sector: "Residential", loc: "Austin", year: "2024", value: "$185M", scope: "340-home community", span: true,
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80" },
  { name: "Solaris Research Campus", sector: "Design & Build", loc: "Munich", year: "2023", value: "$320M", scope: "Net-zero R&D campus",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80" },
];

const INDUSTRIES = [
  { icon: Building, label: "Commercial Real Estate" }, { icon: ShieldCheck, label: "Government" },
  { icon: Activity, label: "Healthcare" }, { icon: Ruler, label: "Education" },
  { icon: Star, label: "Hospitality" }, { icon: Factory, label: "Manufacturing" },
  { icon: Layers, label: "Logistics" }, { icon: Cpu, label: "Energy" }, { icon: Home, label: "Residential" },
];

const PROCESS = [
  { n: "01", t: "Consultation", d: "Define objectives, constraints and the business case." },
  { n: "02", t: "Planning", d: "Feasibility, scheduling and budget modelling." },
  { n: "03", t: "Design", d: "Architecture and BIM coordination across disciplines." },
  { n: "04", t: "Engineering", d: "Structural, MEP and value engineering sign-off." },
  { n: "05", t: "Construction", d: "Self-perform delivery with live site telemetry." },
  { n: "06", t: "Quality Assurance", d: "Independent inspection and commissioning." },
  { n: "07", t: "Handover", d: "Documentation, training and post-occupancy support." },
];

const WHY = [
  { icon: Award, t: "Proven Experience", d: "38 years, 1,240+ projects across 27 countries." },
  { icon: HardHat, t: "Safety Excellence", d: "12.4M+ hours with an industry-leading EMR." },
  { icon: Leaf, t: "Sustainable Practices", d: "LEED & BREEAM delivery as standard." },
  { icon: Cpu, t: "Advanced Technology", d: "BIM, drone survey and AI scheduling." },
  { icon: ShieldCheck, t: "Licensed Professionals", d: "Chartered engineers and certified PMs." },
  { icon: Check, t: "On-Time Delivery", d: "96% of programmes met or beaten." },
];

const STATS = [
  { value: 1240, suffix: "+", label: "Projects delivered" },
  { value: 38, suffix: "", label: "Years of experience" },
  { value: 6500, suffix: "+", label: "Team members" },
  { value: 27, suffix: "", label: "Countries served" },
  { value: 124, suffix: "M+", label: "Sq. ft built" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
];

const TESTIMONIALS = [
  { quote: "Bedrock delivered our flagship campus eleven weeks early without a single change-order surprise. Their telemetry kept our board informed the entire way.", name: "Helena Vos", role: "COO, Solaris Group", rating: 5 },
  { quote: "The most disciplined contractor we have engaged in two decades of development. Safety and quality were never traded for speed.", name: "Marcus Reed", role: "Dev. Director, Harbor Industrial", rating: 5 },
  { quote: "They treat the budget like their own money and the schedule like a promise. We have already signed them for phase two.", name: "Aiko Tanaka", role: "VP Capital Projects, Meridian", rating: 5 },
];

const AWARDS = ["ENR Top 50 Global", "ISO 9001 / 14001 / 45001", "LEED Proven Provider", "RoSPA Gold Award", "BREEAM Outstanding", "OSHA VPP Star"];

const TEAM = [
  { name: "Diane Whitfield", role: "Chief Executive Officer" },
  { name: "Raymond Osei", role: "Chief Operating Officer" },
  { name: "Sofia Marchetti", role: "Director of Engineering" },
  { name: "James Caldwell", role: "Head of Safety & Sustainability" },
];

const FAQS = [
  { q: "How are project timelines determined?", a: "We baseline a schedule during planning using historical productivity data and risk-adjusted critical-path modelling, then track it live on site with weekly variance reporting." },
  { q: "How does pricing and estimation work?", a: "We provide transparent open-book estimates with itemised cost breakdowns, contingency rationale and value-engineering options before contract." },
  { q: "What licensing and certifications do you hold?", a: "We operate under ISO 9001, 14001 and 45001, employ chartered engineers and certified project managers, and maintain jurisdiction-specific licensing in every market." },
  { q: "How do you manage safety on active sites?", a: "Every site runs a documented HSE plan with daily briefings, sensor-based monitoring and independent audits. We have logged over 12.4M hours without a lost-time incident." },
  { q: "Can you manage the full project lifecycle?", a: "Yes. Our Design & Build service provides single-point accountability from feasibility through handover and post-occupancy support." },
];

/* --------------------------------- HOOKS --------------------------------- */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setReduced(m.matches);
    fn(); m.addEventListener?.("change", fn);
    return () => m.removeEventListener?.("change", fn);
  }, []);
  return reduced;
}

function useReveal(reduced) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (reduced) { setShown(true); return; }
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    const t = setTimeout(() => setShown(true), 1800); // safety fallback
    return () => { io.disconnect(); clearTimeout(t); };
  }, [reduced]);
  return [ref, shown];
}

function useCountUp(target, active, reduced, dur = 1600) {
  const [val, setVal] = useState(reduced ? target : 0);
  useEffect(() => {
    if (!active) return;
    if (reduced) { setVal(target); return; }
    let raf, start;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, reduced, dur]);
  return val;
}

function useScrollDirection() {
  const [dir, setDir] = useState("up");
  const [atTop, setAtTop] = useState(true);
  useEffect(() => {
    let last = window.scrollY, ticking = false;
    const onScroll = () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setAtTop(y < 24);
        if (Math.abs(y - last) > 6) { setDir(y > last ? "down" : "up"); last = y; }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return { dir, atTop };
}

/* ------------------------------- PRIMITIVES ------------------------------ */
function Reveal({ children, reduced, delay = 0, as: Tag = "div", style, ...rest }) {
  const [ref, shown] = useReveal(reduced);
  return (
    <Tag ref={ref} {...rest}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(22px)",
        transition: reduced ? "none" : `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        ...style,
      }}>
      {children}
    </Tag>
  );
}

function Eyebrow({ t, children, accent }) {
  return (
    <span style={{
      fontFamily: FONTS.mono, fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase",
      color: accent, display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 500,
    }}>
      <span style={{ width: 22, height: 1.5, background: accent, display: "inline-block" }} />
      {children || t}
    </span>
  );
}

function Button({ children, variant = "primary", t, full, onClick, type = "button", ...rest }) {
  const base = {
    fontFamily: FONTS.body, fontWeight: 600, fontSize: 15, cursor: "pointer",
    borderRadius: RADIUS.button, padding: "13px 22px", display: "inline-flex",
    alignItems: "center", justifyContent: "center", gap: 9, border: "1px solid transparent",
    transition: "transform .18s ease, background .2s ease, color .2s ease, border-color .2s ease",
    width: full ? "100%" : "auto", lineHeight: 1,
  };
  const styles = {
    primary: { background: t.accent, color: "#fff", boxShadow: `0 10px 30px -12px ${t.accent}aa` },
    secondary: { background: "transparent", color: t.text, borderColor: t.borderStrong },
    ghost: { background: t.surfaceAlt, color: t.text, borderColor: t.border },
  };
  return (
    <button type={type} onClick={onClick} {...rest}
      style={{ ...base, ...styles[variant] }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}>
      {children}
    </button>
  );
}

function SectionHeading({ eyebrow, title, sub, t, center }) {
  return (
    <div style={{ maxWidth: 760, margin: center ? "0 auto" : 0, textAlign: center ? "center" : "left" }}>
      <Eyebrow accent={t.accentText}>{eyebrow}</Eyebrow>
      <h2 style={{
        fontFamily: FONTS.display, fontWeight: 800, color: t.text, margin: "16px 0 0",
        fontSize: "clamp(2rem, 4.5vw, 3.25rem)", lineHeight: 1.04, letterSpacing: "-0.02em",
      }}>{title}</h2>
      {sub && <p style={{ color: t.textMuted, fontSize: 18, lineHeight: 1.65, marginTop: 18, maxWidth: 620, marginInline: center ? "auto" : 0 }}>{sub}</p>}
    </div>
  );
}

const Container = ({ children, style }) => (
  <div style={{ maxWidth: MAXW, margin: "0 auto", paddingInline: "clamp(20px, 5vw, 64px)", ...style }}>{children}</div>
);

const BlueprintGrid = ({ color, opacity = 0.5 }) => (
  <svg aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity }}>
    <defs>
      <pattern id="bp" width="56" height="56" patternUnits="userSpaceOnUse">
        <path d="M56 0H0V56" fill="none" stroke={color} strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#bp)" />
  </svg>
);

/* ================================ SECTIONS =============================== */

function Announcement({ t }) {
  const items = [...ANNOUNCEMENTS, ...ANNOUNCEMENTS];
  return (
    <div style={{ background: "#0B0C0E", borderBottom: `1px solid ${t.borderStrong}`, overflow: "hidden", height: 40 }}>
      <div className="bk-ticker" style={{ display: "flex", alignItems: "center", height: 40, whiteSpace: "nowrap" }}>
        {items.map((a, i) => (
          <span key={i} style={{ fontFamily: FONTS.mono, fontSize: 12.5, color: "#C7CDD3", display: "inline-flex", alignItems: "center", gap: 12, paddingInline: 26 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: THEME.dark.accent, display: "inline-block" }} />
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}

function Navbar({ t, theme, toggleTheme, scrolled }) {
  const [open, setOpen] = useState(false);
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 60,
      background: scrolled ? (theme === "dark" ? "rgba(11,12,14,0.82)" : "rgba(255,255,255,0.86)") : "transparent",
      backdropFilter: scrolled ? "saturate(180%) blur(14px)" : "none",
      borderBottom: `1px solid ${scrolled ? t.border : "transparent"}`,
      transition: "background .3s ease, border-color .3s ease",
    }}>
      <Container style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 11, textDecoration: "none" }}>
          <span style={{ width: 34, height: 34, borderRadius: 9, background: t.accent, display: "grid", placeItems: "center", color: "#fff" }}>
            <HardHat size={19} />
          </span>
          <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 19, letterSpacing: "0.02em", color: t.text }}>
            BEDROCK<span style={{ color: t.accentText }}>.</span>
          </span>
        </a>

        <nav aria-label="Primary" className="bk-desktop-nav" style={{ alignItems: "center", gap: 28 }}>
          {NAV.map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} className="bk-navlink"
              style={{ fontFamily: FONTS.body, fontSize: 14.5, fontWeight: 500, color: t.textMuted, textDecoration: "none", position: "relative" }}>
              {n}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} aria-pressed={theme === "dark"}
            style={{ width: 40, height: 40, borderRadius: 11, border: `1px solid ${t.border}`, background: t.surface, color: t.text, display: "grid", placeItems: "center", cursor: "pointer" }}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="bk-desktop-nav"><Button t={t} variant="primary">Get a quote <ArrowRight size={16} /></Button></div>
          <button className="bk-mobile-only" onClick={() => setOpen(true)} aria-label="Open menu"
            style={{ width: 40, height: 40, borderRadius: 11, border: `1px solid ${t.border}`, background: t.surface, color: t.text, display: "grid", placeItems: "center", cursor: "pointer" }}>
            <Menu size={20} />
          </button>
        </div>
      </Container>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" style={{ position: "fixed", inset: 0, zIndex: 80, background: t.bg, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 19, color: t.text }}>BEDROCK<span style={{ color: t.accentText }}>.</span></span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" style={{ width: 44, height: 44, borderRadius: 11, border: `1px solid ${t.border}`, background: t.surface, color: t.text, display: "grid", placeItems: "center" }}><X size={22} /></button>
          </div>
          <nav style={{ display: "grid", gap: 6 }}>
            {NAV.map((n, i) => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)}
                style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 30, color: t.text, textDecoration: "none", padding: "12px 0", borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {n} <span style={{ fontFamily: FONTS.mono, fontSize: 13, color: t.textFaint }}>0{i + 1}</span>
              </a>
            ))}
          </nav>
          <div style={{ marginTop: 28 }}><Button t={t} full>Get a quote <ArrowRight size={16} /></Button></div>
        </div>
      )}
    </header>
  );
}

function Hero({ t, theme, reduced }) {
  const metrics = [
    { v: "1,240+", l: "Projects delivered" }, { v: "38", l: "Years experience" },
    { v: "6,500+", l: "Team members" }, { v: "27", l: "Countries served" },
  ];
  return (
    <section id="top" style={{ position: "relative", overflow: "hidden", minHeight: "92vh", display: "flex", alignItems: "center", background: t.bg }}>
      {/* cinematic backdrop */}
      <div aria-hidden style={{ position: "absolute", inset: 0,
        backgroundImage: `${t.heroOverlay}, url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: "cover", backgroundPosition: "center" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0 }}><BlueprintGrid color={theme === "dark" ? "#ffffff" : "#000000"} opacity={0.06} /></div>

      <Container style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <div className="bk-hero-grid">
          <div>
            <Reveal reduced={reduced}><Eyebrow accent={t.accent}>Engineering the built world since 1987</Eyebrow></Reveal>
            <Reveal reduced={reduced} delay={80}>
              <h1 style={{ fontFamily: FONTS.display, fontWeight: 800, color: "#fff", margin: "20px 0 0",
                fontSize: "clamp(2.6rem, 7vw, 5rem)", lineHeight: 0.98, letterSpacing: "-0.03em" }}>
                We build<br />what <span style={{ color: t.accent }}>endures.</span>
              </h1>
            </Reveal>
            <Reveal reduced={reduced} delay={160}>
              <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 19, lineHeight: 1.6, maxWidth: 520, marginTop: 22 }}>
                A global construction and engineering partner delivering large-scale commercial, industrial and
                infrastructure projects with precision, safety and certainty.
              </p>
            </Reveal>
            <Reveal reduced={reduced} delay={240}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 32 }}>
                <Button t={t} variant="primary">Request a proposal <ArrowRight size={16} /></Button>
                <button style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 15, color: "#fff", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: RADIUS.button, padding: "13px 22px", display: "inline-flex", gap: 9, alignItems: "center", cursor: "pointer", backdropFilter: "blur(6px)" }}>
                  View projects <ArrowUpRight size={16} />
                </button>
              </div>
            </Reveal>
          </div>

          {/* floating metric cards */}
          <Reveal reduced={reduced} delay={200}>
            <div className="bk-metric-grid">
              {metrics.map((m, i) => (
                <div key={i} className="bk-float" style={{
                  background: theme === "dark" ? "rgba(20,22,26,0.66)" : "rgba(255,255,255,0.82)",
                  border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
                  backdropFilter: "blur(14px)", borderRadius: RADIUS.card, padding: "22px 20px",
                  animationDelay: `${i * 0.4}s`,
                }}>
                  <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 34, color: t.text, letterSpacing: "-0.02em" }}>{m.v}</div>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", color: t.textMuted, marginTop: 6 }}>{m.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function ClientStrip({ t }) {
  const logos = ["MERIDIAN", "SOLARIS", "HARBOR", "CASCADE", "LINDEN", "WESTGATE"];
  return (
    <div style={{ borderBlock: `1px solid ${t.border}`, background: t.surface }}>
      <Container style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 28, justifyContent: "space-between", paddingBlock: 26 }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: t.textFaint }}>Trusted by industry leaders</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "18px 40px", alignItems: "center" }}>
          {logos.map((l) => <span key={l} style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 17, color: t.textMuted, letterSpacing: "0.04em" }}>{l}</span>)}
        </div>
      </Container>
    </div>
  );
}

function Overview({ t, reduced }) {
  const pillars = [
    { t: "Mission", d: "To deliver complex projects that create lasting value for clients and communities." },
    { t: "Vision", d: "To be the most trusted builder in every market we operate in." },
    { t: "Values", d: "Safety first. Quality without compromise. Absolute integrity." },
  ];
  return (
    <section id="about" style={{ background: t.bg }}>
      <Container style={{ paddingBlock: "clamp(72px, 9vw, 120px)" }}>
        <div className="bk-two-col">
          <Reveal reduced={reduced}>
            <SectionHeading t={t} eyebrow="Who we are" title="A construction partner built on engineering discipline"
              sub="For nearly four decades, Bedrock has self-performed the work most firms subcontract — giving our clients tighter control over cost, schedule and quality on the projects that matter most." />
            <div style={{ marginTop: 32 }}><Button t={t} variant="secondary">Download company profile <ArrowUpRight size={16} /></Button></div>
          </Reveal>
          <div style={{ display: "grid", gap: 16 }}>
            {pillars.map((p, i) => (
              <Reveal key={p.t} reduced={reduced} delay={i * 90}>
                <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: RADIUS.card, padding: 24, display: "flex", gap: 18 }}>
                  <span style={{ fontFamily: FONTS.mono, fontSize: 13, color: t.accentText, paddingTop: 4 }}>0{i + 1}</span>
                  <div>
                    <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: t.text, margin: 0 }}>{p.t}</h3>
                    <p style={{ color: t.textMuted, fontSize: 16, lineHeight: 1.6, margin: "8px 0 0" }}>{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Services({ t, reduced }) {
  return (
    <section id="services" style={{ background: t.surface }}>
      <Container style={{ paddingBlock: "clamp(72px, 9vw, 120px)" }}>
        <Reveal reduced={reduced}><SectionHeading t={t} eyebrow="What we do" title="End-to-end delivery across every asset class"
          sub="Six core capabilities, one accountable team — from feasibility to handover." /></Reveal>
        <div className="bk-cards-3" style={{ marginTop: 48 }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} reduced={reduced} delay={(i % 3) * 80}>
              <article className="bk-card-hover" tabIndex={0} style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: RADIUS.card, padding: 28, height: "100%", outlineOffset: 3 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ width: 52, height: 52, borderRadius: 13, background: t.surfaceAlt, color: t.accent, display: "grid", placeItems: "center", border: `1px solid ${t.border}` }}><s.icon size={24} /></span>
                  <span style={{ fontFamily: FONTS.mono, fontSize: 13, color: t.textFaint }}>{s.tag}</span>
                </div>
                <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 22, color: t.text, margin: "22px 0 0" }}>{s.title}</h3>
                <p style={{ color: t.textMuted, fontSize: 15.5, lineHeight: 1.6, margin: "10px 0 0" }}>{s.desc}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: t.accentText, fontFamily: FONTS.body, fontWeight: 600, fontSize: 14, marginTop: 20 }}>Learn more <ArrowRight size={15} /></span>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({ p, t, reduced }) {
  const [err, setErr] = useState(false);
  return (
    <article className="bk-project" style={{ gridRow: p.span ? "span 2" : "span 1", position: "relative", borderRadius: RADIUS.card, overflow: "hidden", border: `1px solid ${t.border}`, minHeight: p.span ? 420 : 260, background: t.cardImgFallback }}>
      {!err && <img src={p.img} alt={`${p.name}, ${p.sector} project in ${p.loc}`} loading="lazy" onError={() => setErr(true)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.85) 100%)" }} />
      <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 22 }}>
        <span style={{ alignSelf: "flex-start", fontFamily: FONTS.mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.25)", padding: "5px 11px", borderRadius: 999, backdropFilter: "blur(6px)" }}>{p.sector}</span>
        <div>
          <h3 style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 24, color: "#fff", margin: 0, letterSpacing: "-0.01em" }}>{p.name}</h3>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 14, margin: "6px 0 14px" }}>{p.scope}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", fontFamily: FONTS.mono, fontSize: 12, color: "rgba(255,255,255,0.9)" }}>
            <span><MapPin size={12} style={{ verticalAlign: "-1px" }} /> {p.loc}</span>
            <span>{p.year}</span>
            <span style={{ color: THEME.dark.accent }}>{p.value}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function Projects({ t, reduced }) {
  return (
    <section id="projects" style={{ background: t.bg }}>
      <Container style={{ paddingBlock: "clamp(72px, 9vw, 120px)" }}>
        <Reveal reduced={reduced}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "space-between", alignItems: "flex-end" }}>
            <SectionHeading t={t} eyebrow="Featured work" title="Projects that define skylines" />
            <Button t={t} variant="secondary">All case studies <ArrowUpRight size={16} /></Button>
          </div>
        </Reveal>
        <Reveal reduced={reduced} delay={100}>
          <div className="bk-masonry" style={{ marginTop: 44 }}>
            {PROJECTS.map((p) => <ProjectCard key={p.name} p={p} t={t} reduced={reduced} />)}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Industries({ t, reduced }) {
  return (
    <section id="industries" style={{ background: t.surface }}>
      <Container style={{ paddingBlock: "clamp(72px, 9vw, 120px)" }}>
        <Reveal reduced={reduced}><SectionHeading t={t} center eyebrow="Sectors" title="Industries we serve" sub="Deep expertise across the markets where reliability is non-negotiable." /></Reveal>
        <div className="bk-industry-grid" style={{ marginTop: 48 }}>
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.label} reduced={reduced} delay={(i % 3) * 60}>
              <div className="bk-card-hover" tabIndex={0} style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: RADIUS.card, padding: "26px 20px", textAlign: "center", height: "100%", outlineOffset: 3 }}>
                <span style={{ width: 48, height: 48, borderRadius: 12, background: t.surfaceAlt, color: t.accent, display: "grid", placeItems: "center", margin: "0 auto" }}><ind.icon size={22} /></span>
                <div style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 15, color: t.text, marginTop: 14 }}>{ind.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Process({ t, reduced }) {
  return (
    <section style={{ background: t.bg }}>
      <Container style={{ paddingBlock: "clamp(72px, 9vw, 120px)" }}>
        <Reveal reduced={reduced}><SectionHeading t={t} eyebrow="How we deliver" title="A disciplined path from idea to handover" /></Reveal>
        <div style={{ marginTop: 48, position: "relative" }}>
          <div aria-hidden style={{ position: "absolute", left: 0, right: 0, top: 33, height: 1, background: t.border }} className="bk-desktop-nav" />
          <div className="bk-process-grid">
            {PROCESS.map((p, i) => (
              <Reveal key={p.n} reduced={reduced} delay={i * 70}>
                <div style={{ position: "relative" }}>
                  <span style={{ width: 30, height: 30, borderRadius: 999, background: t.accent, color: "#fff", display: "grid", placeItems: "center", fontFamily: FONTS.mono, fontSize: 12, fontWeight: 600, position: "relative", zIndex: 2 }}>{i + 1}</span>
                  <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 18, color: t.text, margin: "18px 0 0" }}>{p.t}</h3>
                  <p style={{ color: t.textMuted, fontSize: 14.5, lineHeight: 1.55, margin: "8px 0 0" }}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function WhyUs({ t, reduced }) {
  return (
    <section style={{ background: t.surface }}>
      <Container style={{ paddingBlock: "clamp(72px, 9vw, 120px)" }}>
        <Reveal reduced={reduced}><SectionHeading t={t} eyebrow="Why Bedrock" title="The certainty advantage" sub="Clients return because we remove risk from the most complex builds." /></Reveal>
        <div className="bk-cards-3" style={{ marginTop: 48 }}>
          {WHY.map((w, i) => (
            <Reveal key={w.t} reduced={reduced} delay={(i % 3) * 80}>
              <div style={{ display: "flex", gap: 16, background: t.bg, border: `1px solid ${t.border}`, borderRadius: RADIUS.card, padding: 24, height: "100%" }}>
                <span style={{ width: 46, height: 46, borderRadius: 12, background: t.surfaceAlt, color: t.accent, display: "grid", placeItems: "center", flexShrink: 0 }}><w.icon size={21} /></span>
                <div>
                  <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 18, color: t.text, margin: 0 }}>{w.t}</h3>
                  <p style={{ color: t.textMuted, fontSize: 14.5, lineHeight: 1.55, margin: "6px 0 0" }}>{w.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function StatCard({ s, t, reduced }) {
  const [ref, shown] = useReveal(reduced);
  const val = useCountUp(s.value, shown, reduced);
  return (
    <div ref={ref} style={{ textAlign: "center", padding: "10px 8px" }}>
      <div style={{ fontFamily: FONTS.display, fontWeight: 800, color: "#fff", fontSize: "clamp(2.4rem,5vw,3.4rem)", letterSpacing: "-0.02em", lineHeight: 1 }}>
        {val.toLocaleString()}<span style={{ color: THEME.dark.accent }}>{s.suffix}</span>
      </div>
      <div style={{ fontFamily: FONTS.mono, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginTop: 12 }}>{s.label}</div>
    </div>
  );
}

function Stats({ t, theme, reduced }) {
  return (
    <section style={{ position: "relative", background: "#0B0C0E", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0 }}><BlueprintGrid color="#ffffff" opacity={0.05} /></div>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 80% at 50% 0%, rgba(255,90,31,0.14), transparent 70%)" }} />
      <Container style={{ position: "relative", paddingBlock: "clamp(64px, 8vw, 100px)" }}>
        <div className="bk-stats-grid">
          {STATS.map((s) => <StatCard key={s.label} s={s} t={t} reduced={reduced} />)}
        </div>
      </Container>
    </section>
  );
}

function Sustainability({ t, theme, reduced }) {
  const items = ["LEED & BREEAM delivery", "Low-carbon concrete programmes", "Smart-site energy monitoring", "Circular material sourcing", "Net-zero design pathways"];
  return (
    <section style={{ background: t.bg }}>
      <Container style={{ paddingBlock: "clamp(72px, 9vw, 120px)" }}>
        <div className="bk-two-col" style={{ alignItems: "center" }}>
          <Reveal reduced={reduced}>
            <div style={{ position: "relative", borderRadius: RADIUS.card, overflow: "hidden", minHeight: 380, background: "linear-gradient(135deg,#0e2a1f,#0B0C0E)" }}>
              <div aria-hidden style={{ position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80') center/cover", opacity: 0.55 }} />
              <div style={{ position: "absolute", left: 24, bottom: 24, color: "#fff" }}>
                <Leaf size={28} style={{ color: "#7CD992" }} />
                <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 40, marginTop: 8 }}>−42%</div>
                <div style={{ fontFamily: FONTS.mono, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8 }}>Embodied carbon vs. baseline</div>
              </div>
            </div>
          </Reveal>
          <Reveal reduced={reduced} delay={100}>
            <SectionHeading t={t} eyebrow="ESG & Innovation" title="Building responsibly, at scale"
              sub="Sustainability is engineered into every programme — not bolted on afterward." />
            <ul style={{ listStyle: "none", padding: 0, margin: "28px 0 0", display: "grid", gap: 12 }}>
              {items.map((it) => (
                <li key={it} style={{ display: "flex", gap: 12, alignItems: "center", color: t.text, fontSize: 16 }}>
                  <span style={{ width: 24, height: 24, borderRadius: 999, background: t.surfaceAlt, color: t.accent, display: "grid", placeItems: "center", flexShrink: 0 }}><Check size={14} /></span>
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Testimonials({ t, reduced }) {
  const [i, setI] = useState(0);
  const go = useCallback((d) => setI((p) => (p + d + TESTIMONIALS.length) % TESTIMONIALS.length), []);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(id);
  }, [reduced]);
  const c = TESTIMONIALS[i];
  return (
    <section style={{ background: t.surface }}>
      <Container style={{ paddingBlock: "clamp(72px, 9vw, 120px)" }}>
        <Reveal reduced={reduced}><SectionHeading t={t} center eyebrow="Client voices" title="Trusted on the projects that matter" /></Reveal>
        <div style={{ maxWidth: 820, margin: "44px auto 0", textAlign: "center" }}>
          <Quote size={36} style={{ color: t.accent, opacity: 0.5 }} aria-hidden />
          <blockquote key={i} style={{ fontFamily: FONTS.display, fontWeight: 500, fontSize: "clamp(1.3rem,2.6vw,1.9rem)", lineHeight: 1.4, color: t.text, margin: "18px 0 0", letterSpacing: "-0.01em" }}>
            "{c.quote}"
          </blockquote>
          <div style={{ display: "flex", justifyContent: "center", gap: 3, marginTop: 22 }} aria-label={`${c.rating} out of 5 stars`}>
            {Array.from({ length: c.rating }).map((_, k) => <Star key={k} size={17} style={{ color: t.accent2, fill: t.accent2 }} />)}
          </div>
          <div style={{ marginTop: 14 }}>
            <div style={{ fontFamily: FONTS.body, fontWeight: 700, color: t.text }}>{c.name}</div>
            <div style={{ fontFamily: FONTS.mono, fontSize: 13, color: t.textMuted }}>{c.role}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 28 }}>
            <button onClick={() => go(-1)} aria-label="Previous testimonial" style={{ width: 42, height: 42, borderRadius: 999, border: `1px solid ${t.border}`, background: t.bg, color: t.text, display: "grid", placeItems: "center", cursor: "pointer" }}><ChevronLeft size={18} /></button>
            <button onClick={() => go(1)} aria-label="Next testimonial" style={{ width: 42, height: 42, borderRadius: 999, border: `1px solid ${t.border}`, background: t.bg, color: t.text, display: "grid", placeItems: "center", cursor: "pointer" }}><ChevronRight size={18} /></button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Awards({ t, reduced }) {
  return (
    <section style={{ background: t.bg }}>
      <Container style={{ paddingBlock: "clamp(56px, 7vw, 88px)" }}>
        <Reveal reduced={reduced}><Eyebrow accent={t.accentText}>Awards & certifications</Eyebrow></Reveal>
        <div className="bk-awards-grid" style={{ marginTop: 28 }}>
          {AWARDS.map((a, i) => (
            <Reveal key={a} reduced={reduced} delay={(i % 3) * 60}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", border: `1px solid ${t.border}`, borderRadius: RADIUS.button, padding: "16px 18px", background: t.surface }}>
                <Award size={20} style={{ color: t.accent, flexShrink: 0 }} />
                <span style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 14.5, color: t.text }}>{a}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Team({ t, reduced }) {
  return (
    <section id="careers" style={{ background: t.surface }}>
      <Container style={{ paddingBlock: "clamp(72px, 9vw, 120px)" }}>
        <Reveal reduced={reduced}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "space-between", alignItems: "flex-end" }}>
            <SectionHeading t={t} eyebrow="Leadership" title="Engineers who lead from the front" />
            <Button t={t} variant="secondary">View open roles <ArrowUpRight size={16} /></Button>
          </div>
        </Reveal>
        <div className="bk-team-grid" style={{ marginTop: 44 }}>
          {TEAM.map((m, i) => (
            <Reveal key={m.name} reduced={reduced} delay={(i % 4) * 70}>
              <div className="bk-card-hover" tabIndex={0} style={{ borderRadius: RADIUS.card, overflow: "hidden", border: `1px solid ${t.border}`, background: t.bg, outlineOffset: 3 }}>
                <div style={{ height: 220, background: `linear-gradient(160deg, ${t.surfaceAlt}, ${t.bg})`, display: "grid", placeItems: "center" }}>
                  <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 44, color: t.borderStrong }}>{m.name.split(" ").map((x) => x[0]).join("")}</span>
                </div>
                <div style={{ padding: 18 }}>
                  <h3 style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 18, color: t.text, margin: 0 }}>{m.name}</h3>
                  <p style={{ fontFamily: FONTS.mono, fontSize: 12.5, color: t.textMuted, margin: "5px 0 0" }}>{m.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FAQ({ t, reduced }) {
  return (
    <section style={{ background: t.bg }}>
      <Container style={{ paddingBlock: "clamp(72px, 9vw, 120px)" }}>
        <div className="bk-two-col">
          <Reveal reduced={reduced}><SectionHeading t={t} eyebrow="FAQ" title="Answers before you ask" sub="Common questions from owners, developers and partners." /></Reveal>
          <div style={{ display: "grid", gap: 12 }}>
            {FAQS.map((f, i) => (
              <Reveal key={f.q} reduced={reduced} delay={i * 50}>
                <details className="bk-faq" style={{ border: `1px solid ${t.border}`, borderRadius: RADIUS.button, background: t.surface, padding: "4px 18px" }}>
                  <summary style={{ listStyle: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14, padding: "16px 0", fontFamily: FONTS.body, fontWeight: 600, fontSize: 16, color: t.text }}>
                    {f.q}
                    <span className="bk-faq-plus" style={{ color: t.accent, flexShrink: 0 }}><Plus size={18} /></span>
                    <span className="bk-faq-minus" style={{ color: t.accent, flexShrink: 0 }}><Minus size={18} /></span>
                  </summary>
                  <p style={{ color: t.textMuted, fontSize: 15, lineHeight: 1.6, margin: "0 0 16px" }}>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Contact({ t, reduced }) {
  const [sent, setSent] = useState(false);
  const field = { width: "100%", fontFamily: FONTS.body, fontSize: 15, color: t.text, background: t.bg, border: `1px solid ${t.border}`, borderRadius: RADIUS.input, padding: "13px 15px", outlineColor: t.accent };
  const label = { fontFamily: FONTS.mono, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: t.textMuted, display: "block", marginBottom: 7 };
  return (
    <section id="contact" style={{ background: t.surface }}>
      <Container style={{ paddingBlock: "clamp(72px, 9vw, 120px)" }}>
        <div className="bk-two-col">
          <Reveal reduced={reduced}>
            <SectionHeading t={t} eyebrow="Get in touch" title="Start your project with certainty"
              sub="Tell us about your build. A project lead will respond within one business day." />
            <div style={{ marginTop: 32, display: "grid", gap: 16 }}>
              {[{ icon: Phone, l: "+1 (800) 263-7625" }, { icon: Mail, l: "build@bedrock.com" }, { icon: MapPin, l: "Offices in 27 countries · HQ Chicago, IL" }].map((c) => (
                <div key={c.l} style={{ display: "flex", gap: 13, alignItems: "center", color: t.text }}>
                  <span style={{ width: 42, height: 42, borderRadius: 11, background: t.bg, border: `1px solid ${t.border}`, color: t.accent, display: "grid", placeItems: "center" }}><c.icon size={18} /></span>
                  <span style={{ fontFamily: FONTS.body, fontSize: 15.5 }}>{c.l}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal reduced={reduced} delay={100}>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: RADIUS.card, padding: "clamp(22px,3vw,34px)", display: "grid", gap: 16 }}>
              <div className="bk-form-row">
                <div><label htmlFor="cf-name" style={label}>Full name</label><input id="cf-name" required style={field} placeholder="Jane Cooper" /></div>
                <div><label htmlFor="cf-email" style={label}>Work email</label><input id="cf-email" type="email" required style={field} placeholder="jane@company.com" /></div>
              </div>
              <div>
                <label htmlFor="cf-type" style={label}>Project type</label>
                <select id="cf-type" style={field}>
                  {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="cf-msg" style={label}>Project details</label>
                <textarea id="cf-msg" rows={4} style={{ ...field, resize: "vertical" }} placeholder="Scope, location, target timeline and budget range." />
              </div>
              {sent
                ? <div role="status" style={{ display: "flex", gap: 10, alignItems: "center", color: t.accentText, fontFamily: FONTS.body, fontWeight: 600 }}><Check size={18} /> Request received — we'll be in touch within one business day.</div>
                : <Button t={t} type="submit" full>Request proposal <Send size={16} /></Button>}
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function FinalCTA({ t, theme, reduced }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "#0B0C0E" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80') center/cover", opacity: 0.35 }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,12,14,0.7), rgba(11,12,14,0.92))" }} />
      <Container style={{ position: "relative", paddingBlock: "clamp(80px, 11vw, 150px)", textAlign: "center" }}>
        <Reveal reduced={reduced}>
          <h2 style={{ fontFamily: FONTS.display, fontWeight: 800, color: "#fff", fontSize: "clamp(2.2rem,6vw,4rem)", letterSpacing: "-0.03em", lineHeight: 1.02, margin: 0 }}>
            Let's build what<br />endures, together.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 18, maxWidth: 540, margin: "20px auto 0", lineHeight: 1.6 }}>
            From a single building to nationwide infrastructure — bring us the brief that keeps you up at night.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginTop: 34 }}>
            <Button t={t} variant="primary">Schedule a consultation <ArrowRight size={16} /></Button>
            <button style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 15, color: "#fff", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.24)", borderRadius: RADIUS.button, padding: "13px 22px", cursor: "pointer" }}>Free site assessment</button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Footer({ t }) {
  const year = new Date().getFullYear();
  const cols = {
    Company: ["About", "Leadership", "Careers", "Newsroom"],
    Services: ["Commercial", "Industrial", "Infrastructure", "Design & Build"],
    Industries: ["Healthcare", "Energy", "Logistics", "Government"],
    Resources: ["Projects", "Insights", "Safety", "Sustainability"],
  };
  return (
    <footer style={{ background: t.bg, borderTop: `1px solid ${t.border}` }}>
      <Container style={{ paddingBlock: 64 }}>
        <div className="bk-footer-grid">
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 32, height: 32, borderRadius: 9, background: t.accent, display: "grid", placeItems: "center", color: "#fff" }}><HardHat size={18} /></span>
              <span style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 18, color: t.text }}>BEDROCK<span style={{ color: t.accentText }}>.</span></span>
            </div>
            <p style={{ color: t.textMuted, fontSize: 14.5, lineHeight: 1.6, marginTop: 16 }}>We build what endures. A global construction and engineering partner since 1987.</p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 8, marginTop: 20 }}>
              <label htmlFor="nl" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Email for newsletter</label>
              <input id="nl" type="email" placeholder="Email address" style={{ flex: 1, fontFamily: FONTS.body, fontSize: 14, color: t.text, background: t.surface, border: `1px solid ${t.border}`, borderRadius: RADIUS.button, padding: "11px 14px" }} />
              <button aria-label="Subscribe" style={{ background: t.accent, color: "#fff", border: "none", borderRadius: RADIUS.button, padding: "0 16px", cursor: "pointer" }}><ArrowRight size={18} /></button>
            </form>
          </div>
          {Object.entries(cols).map(([h, links]) => (
            <div key={h}>
              <div style={{ fontFamily: FONTS.mono, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: t.textFaint, marginBottom: 16 }}>{h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 11 }}>
                {links.map((l) => <li key={l}><a href="#" className="bk-flink" style={{ color: t.textMuted, fontSize: 14.5, textDecoration: "none", fontFamily: FONTS.body }}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${t.border}`, marginTop: 48, paddingTop: 26, display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", alignItems: "center", fontFamily: FONTS.mono, fontSize: 12.5, color: t.textMuted }}>
            <span>© {year} Bedrock Construction Group. All Rights Reserved.</span>
            <span style={{ color: t.textFaint }}>·</span>
            <span>Built &amp; Maintenance by <a href="https://www.growrixos.com" target="_blank" rel="noopener noreferrer" style={{ color: t.accentText, textDecoration: "none", fontWeight: 600 }}>GrowrixOS</a></span>
          </div>
          <div style={{ display: "flex", gap: 18, fontFamily: FONTS.body, fontSize: 13.5 }}>
            {["Privacy", "Terms", "Cookies"].map((l) => <a key={l} href="#" className="bk-flink" style={{ color: t.textMuted, textDecoration: "none" }}>{l}</a>)}
          </div>
        </div>
      </Container>
    </footer>
  );
}

/* ----------------------------- FLOATING UI ------------------------------- */
function FloatingWidgets({ t, scrolledFar }) {
  const [chat, setChat] = useState(false);
  const btn = (bg, color) => ({ width: 52, height: 52, borderRadius: 999, background: bg, color, border: "none", display: "grid", placeItems: "center", cursor: "pointer", boxShadow: "0 12px 28px -10px rgba(0,0,0,0.5)" });
  return (
    <>
      <div className="bk-fab-stack" style={{ position: "fixed", right: 20, bottom: 88, zIndex: 70, display: "flex", flexDirection: "column", gap: 12 }}>
        {scrolledFar && <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={btn(t.surfaceAlt, t.text)}><ArrowUp size={20} /></button>}
        <a href="tel:+18002637625" aria-label="Call us" style={{ ...btn(t.surfaceAlt, t.text), textDecoration: "none" }}><Phone size={20} /></a>
        <a href="https://wa.me/18002637625" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" style={{ ...btn("#25D366", "#fff"), textDecoration: "none" }}><MessageCircle size={22} /></a>
        <button aria-label="Open AI construction assistant" onClick={() => setChat((v) => !v)} style={btn(t.accent, "#fff")}><Bot size={22} /></button>
      </div>

      {chat && (
        <div role="dialog" aria-label="AI construction assistant" className="bk-chat" style={{ position: "fixed", right: 20, bottom: 152, zIndex: 75, width: "min(340px, calc(100vw - 40px))", background: t.bg, border: `1px solid ${t.border}`, borderRadius: RADIUS.modal, overflow: "hidden", boxShadow: "0 24px 60px -16px rgba(0,0,0,0.5)" }}>
          <div style={{ background: t.accent, color: "#fff", padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ display: "flex", gap: 9, alignItems: "center", fontFamily: FONTS.body, fontWeight: 700 }}><Bot size={18} /> Bedrock Assistant</span>
            <button onClick={() => setChat(false)} aria-label="Close assistant" style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}><X size={18} /></button>
          </div>
          <div style={{ padding: 18 }}>
            <div style={{ background: t.surface, borderRadius: 14, padding: 14, fontFamily: FONTS.body, fontSize: 14, color: t.text, lineHeight: 1.55 }}>
              Hi — I can help with service guidance, cost estimation and project questions. What are you building?
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
              {["Cost estimate", "Our services", "Talk to a person"].map((q) => (
                <span key={q} style={{ fontFamily: FONTS.body, fontSize: 13, color: t.accentText, border: `1px solid ${t.border}`, borderRadius: 999, padding: "7px 13px", cursor: "pointer" }}>{q}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MobileBottomNav({ t, hidden }) {
  const items = [{ icon: Home, l: "Home", h: "#top" }, { icon: Building2, l: "Services", h: "#services" }, { icon: Layers, l: "Projects", h: "#projects" }, { icon: Ruler, l: "Quote", h: "#contact" }, { icon: Phone, l: "Contact", h: "#contact" }];
  return (
    <nav aria-label="Mobile" className="bk-bottom-nav" style={{
      position: "fixed", left: 12, right: 12, bottom: 12, zIndex: 65,
      background: t.elevated, border: `1px solid ${t.border}`, borderRadius: 20,
      boxShadow: "0 16px 40px -14px rgba(0,0,0,0.45)", padding: "8px 6px",
      display: "flex", justifyContent: "space-around",
      transform: hidden ? "translateY(140%)" : "none", transition: "transform .35s cubic-bezier(.16,1,.3,1)",
    }}>
      {items.map((it) => (
        <a key={it.l} href={it.h} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, textDecoration: "none", color: t.textMuted, padding: "6px 10px", flex: 1 }}>
          <it.icon size={20} />
          <span style={{ fontFamily: FONTS.body, fontSize: 10.5, fontWeight: 600 }}>{it.l}</span>
        </a>
      ))}
    </nav>
  );
}

/* --------------------------------- STYLES -------------------------------- */
function GlobalStyles() {
  const css = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
*{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{margin:0;}
.bk-root *::selection{background:#FF5A1F;color:#fff;}
a,button,input,textarea,select,details summary{outline:none;}
a:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible,select:focus-visible,summary:focus-visible{outline:2px solid #FF5A1F;outline-offset:2px;border-radius:6px;}
.bk-skip{position:absolute;left:12px;top:-60px;background:#FF5A1F;color:#fff;padding:10px 16px;border-radius:10px;z-index:200;transition:top .2s;font-family:'Space Grotesk',sans-serif;font-weight:600;text-decoration:none;}
.bk-skip:focus{top:12px;}
.bk-navlink::after{content:"";position:absolute;left:0;right:0;bottom:-6px;height:2px;background:#FF5A1F;transform:scaleX(0);transform-origin:left;transition:transform .25s ease;}
.bk-navlink:hover{color:inherit;} .bk-navlink:hover::after{transform:scaleX(1);}
.bk-card-hover{transition:transform .25s ease, border-color .25s ease, box-shadow .25s ease;}
.bk-card-hover:hover{transform:translateY(-4px);border-color:#FF5A1F66;box-shadow:0 18px 40px -22px rgba(0,0,0,0.45);}
.bk-project img{transition:transform .6s cubic-bezier(.16,1,.3,1);}
.bk-project:hover img{transform:scale(1.06);}
.bk-flink{transition:color .2s;} .bk-flink:hover{color:#FF5A1F;}
@keyframes bk-scroll{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
.bk-ticker{animation:bk-scroll 36s linear infinite;}
.bk-ticker:hover{animation-play-state:paused;}
@keyframes bk-float{0%,100%{transform:translateY(0);}50%{transform:translateY(-9px);}}
.bk-float{animation:bk-float 5.5s ease-in-out infinite;}
.bk-faq .bk-faq-minus{display:none;} .bk-faq[open] .bk-faq-plus{display:none;} .bk-faq[open] .bk-faq-minus{display:inline-flex;}
.bk-faq[open] summary{border-bottom:1px solid transparent;}

/* layout */
.bk-hero-grid{display:grid;grid-template-columns:1.1fr 0.9fr;gap:48px;align-items:center;}
.bk-metric-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.bk-two-col{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,5vw,72px);}
.bk-cards-3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.bk-masonry{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:200px;gap:18px;}
.bk-industry-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.bk-process-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:20px;}
.bk-stats-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:24px;}
.bk-awards-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.bk-team-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
.bk-footer-grid{display:grid;grid-template-columns:1.4fr repeat(4,1fr);gap:36px;}
.bk-form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.bk-desktop-nav{display:flex;} .bk-mobile-only{display:none;} .bk-bottom-nav{display:none;}

@media(max-width:1100px){
  .bk-process-grid{grid-template-columns:repeat(4,1fr);}
  .bk-stats-grid{grid-template-columns:repeat(3,1fr);}
  .bk-team-grid{grid-template-columns:repeat(2,1fr);}
  .bk-footer-grid{grid-template-columns:1fr 1fr 1fr;}
}
@media(max-width:880px){
  .bk-hero-grid{grid-template-columns:1fr;gap:40px;}
  .bk-two-col{grid-template-columns:1fr;}
  .bk-cards-3{grid-template-columns:1fr 1fr;}
  .bk-masonry{grid-template-columns:1fr 1fr;grid-auto-rows:180px;}
  .bk-industry-grid{grid-template-columns:repeat(2,1fr);}
  .bk-awards-grid{grid-template-columns:1fr 1fr;}
  .bk-desktop-nav{display:none;} .bk-mobile-only{display:grid;} .bk-bottom-nav{display:flex;}
  .bk-fab-stack{bottom:96px;}
}
@media(max-width:560px){
  .bk-cards-3{grid-template-columns:1fr;}
  .bk-masonry{grid-template-columns:1fr;grid-auto-rows:auto;}
  .bk-masonry .bk-project{grid-row:span 1 !important;min-height:300px !important;}
  .bk-process-grid{grid-template-columns:1fr 1fr;}
  .bk-stats-grid{grid-template-columns:1fr 1fr;}
  .bk-team-grid{grid-template-columns:1fr;}
  .bk-industry-grid{grid-template-columns:1fr 1fr;}
  .bk-awards-grid{grid-template-columns:1fr;}
  .bk-footer-grid{grid-template-columns:1fr 1fr;}
  .bk-form-row{grid-template-columns:1fr;}
}
@media(prefers-reduced-motion:reduce){
  html{scroll-behavior:auto;}
  .bk-ticker,.bk-float{animation:none !important;}
  .bk-project img{transition:none;}
}
`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

/* ---------------------------------- APP ---------------------------------- */
export default function App() {
  const [theme, setTheme] = useState("dark");
  const t = THEME[theme];
  const reduced = usePrefersReducedMotion();
  const { dir, atTop } = useScrollDirection();
  const [scrolledFar, setScrolledFar] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledFar(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));

  return (
    <div className="bk-root" style={{ background: t.bg, color: t.text, fontFamily: FONTS.body, minHeight: "100vh", transition: "background .35s ease, color .35s ease", paddingBottom: 0 }}>
      <GlobalStyles />
      <a href="#main" className="bk-skip">Skip to content</a>

      <Announcement t={t} />
      <Navbar t={t} theme={theme} toggleTheme={toggleTheme} scrolled={!atTop} />

      <main id="main">
        <Hero t={t} theme={theme} reduced={reduced} />
        <ClientStrip t={t} />
        <Overview t={t} reduced={reduced} />
        <Services t={t} reduced={reduced} />
        <Projects t={t} reduced={reduced} />
        <Industries t={t} reduced={reduced} />
        <Process t={t} reduced={reduced} />
        <WhyUs t={t} reduced={reduced} />
        <Stats t={t} theme={theme} reduced={reduced} />
        <Sustainability t={t} theme={theme} reduced={reduced} />
        <Testimonials t={t} reduced={reduced} />
        <Awards t={t} reduced={reduced} />
        <Team t={t} reduced={reduced} />
        <FAQ t={t} reduced={reduced} />
        <Contact t={t} reduced={reduced} />
        <FinalCTA t={t} theme={theme} reduced={reduced} />
      </main>

      <Footer t={t} />
      <FloatingWidgets t={t} scrolledFar={scrolledFar} />
      <MobileBottomNav t={t} hidden={dir === "down" && !atTop} />
    </div>
  );
}
