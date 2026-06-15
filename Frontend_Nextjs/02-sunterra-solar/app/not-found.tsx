import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <main id="main" className="section-pad">
      <Container className="max-w-lg text-center">
        <p className="text-6xl font-black text-primary" aria-hidden>
          404
        </p>
        <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-text-muted">That route doesn&apos;t exist. Try our calculator or request a quote.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-[var(--radius-md)] bg-primary px-6 py-3 font-semibold text-on-primary no-underline">
            Back to home
          </Link>
          <Link href="/quote" className="rounded-[var(--radius-md)] bg-accent px-6 py-3 font-semibold text-on-accent no-underline">
            Get quote
          </Link>
        </div>
      </Container>
    </main>
  );
}
