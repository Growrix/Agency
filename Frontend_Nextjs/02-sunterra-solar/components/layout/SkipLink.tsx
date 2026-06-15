import Link from 'next/link';

export function SkipLink() {
  return (
    <Link
      href="#main"
      className="fixed left-2 top-2 z-[200] -translate-y-[200%] rounded-[var(--radius-md)] bg-primary px-4 py-2 text-on-primary no-underline transition-transform focus:translate-y-0"
    >
      Skip to content
    </Link>
  );
}
