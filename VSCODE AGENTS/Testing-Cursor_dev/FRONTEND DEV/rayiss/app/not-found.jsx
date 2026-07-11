import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A', color: '#fff', display: 'grid', placeItems: 'center', padding: 24 }}>
      <div style={{ maxWidth: 680, textAlign: 'center' }}>
        <div className="eyebrow mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Not found
        </div>
        <h1 className="display" style={{ fontSize: 'clamp(44px, 9vw, 120px)', lineHeight: 0.9, fontWeight: 700 }}>
          Route not
          <span className="serif-i" style={{ color: '#FF5B1F', fontWeight: 400 }}>
            {' '}available
          </span>
        </h1>
        <p style={{ marginTop: 20, color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.6 }}>
          The page you requested is not currently published. Use the sitemap or return to the homepage.
        </p>
        <div className="flex flex-wrap justify-center gap-3" style={{ marginTop: 30 }}>
          <Link href="/" className="inline-flex items-center rounded-full text-white text-sm font-medium" style={{ background: '#FF5B1F', padding: '12px 20px' }}>
            Back home
          </Link>
          <Link href="/sitemap" className="inline-flex items-center rounded-full text-sm font-medium" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '12px 20px' }}>
            Open sitemap
          </Link>
        </div>
      </div>
    </div>
  );
}
