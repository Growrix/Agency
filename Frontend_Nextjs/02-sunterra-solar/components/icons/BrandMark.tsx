export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" className={className} aria-hidden focusable="false">
      <rect width="32" height="32" rx="8" fill="#0c2d4a" />
      <circle cx="16" cy="16" r="6" fill="#f5a623" />
    </svg>
  );
}
