import { Icon, type IconProps } from './Icon';

export function IconNavHome(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </Icon>
  );
}

export function IconNavServices(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2" />
    </Icon>
  );
}

export function IconNavCalculator(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 10h8M8 14h4" />
    </Icon>
  );
}

export function IconNavQuote(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
    </Icon>
  );
}

export function IconNavContact(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </Icon>
  );
}

import type { ComponentType } from 'react';

const bottomNavIconMap: Record<string, ComponentType<IconProps>> = {
  '/': IconNavHome,
  '/residential': IconNavServices,
  '/calculator': IconNavCalculator,
  '/quote': IconNavQuote,
  '/contact': IconNavContact,
};

export function BottomNavIcon({ href, ...props }: IconProps & { href: string }) {
  const Cmp = bottomNavIconMap[href] ?? IconNavHome;
  return <Cmp {...props} />;
}
