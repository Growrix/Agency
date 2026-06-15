'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-center"
      toastOptions={{
        className: 'toast',
        unstyled: true,
        classNames: {
          toast: 'toast is-visible',
        },
      }}
      offset={{
        bottom: 'calc(var(--bottomnav-height) + var(--sticky-cta-height) + var(--space-4))',
      }}
    />
  );
}
