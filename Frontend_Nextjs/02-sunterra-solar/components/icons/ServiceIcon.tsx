import { Icon, type IconProps } from './Icon';

function IconResidential(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6.5 20.5 12 4l5.5 16.5H6.5z" />
    </Icon>
  );
}

function IconCommercial(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 21h18M5 21V7l7-4 7 4v14" />
    </Icon>
  );
}

function IconBattery(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 2v6M8 8h8v12H8z" />
    </Icon>
  );
}

function IconEvCharger(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 13h14l-2 8H7l-2-8zM7 13l1-4h8l1 4" />
    </Icon>
  );
}

function IconOffGrid(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3 4 9v12h16V9l-8-6z" />
    </Icon>
  );
}

function IconMaintenance(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </Icon>
  );
}

function IconCalculator(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 10h8M8 14h4" />
    </Icon>
  );
}

function IconRebates(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </Icon>
  );
}

function IconFinance(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </Icon>
  );
}

function IconInspection(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </Icon>
  );
}

function IconWhySolar(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42" />
    </Icon>
  );
}

function IconCert(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </Icon>
  );
}

function IconReviews(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L6 21l2.3-7-6-4.6h7.6L12 2z" />
    </Icon>
  );
}

import type { ComponentType } from 'react';

const serviceIconMap: Record<string, ComponentType<IconProps>> = {
  '/residential': IconResidential,
  '/commercial': IconCommercial,
  '/batteries': IconBattery,
  '/ev-chargers': IconEvCharger,
  '/off-grid': IconOffGrid,
  '/maintenance': IconMaintenance,
  '/calculator': IconCalculator,
  '/rebates': IconRebates,
  '/finance': IconFinance,
  '/inspection': IconInspection,
  '/why-solar': IconWhySolar,
  '/why-us': IconWhySolar,
  '/certifications': IconCert,
  '/warranty': IconCert,
  '/reviews': IconReviews,
};

export function ServiceIcon({ href, ...props }: IconProps & { href: string }) {
  const Cmp = serviceIconMap[href] ?? IconResidential;
  return <Cmp {...props} />;
}
