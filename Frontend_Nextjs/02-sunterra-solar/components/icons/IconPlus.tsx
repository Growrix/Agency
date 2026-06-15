import { Icon, type IconProps } from './Icon';

export function IconPlus(props: IconProps) {
  return (
    <Icon strokeWidth={2.5} {...props}>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  );
}
