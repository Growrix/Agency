import type { ComponentType, PropsWithChildren, ReactNode } from "react";

declare module "@headlessui/react" {
  type GenericProps = PropsWithChildren<Record<string, unknown>>;
  type GenericComponent = ComponentType<GenericProps>;
  type PopoverRenderProps = { close: () => void };
  type DisclosureRenderProps = { open: boolean };

  export const Popover: ComponentType<{
    className?: string;
    children?: ReactNode | ((props: PopoverRenderProps) => ReactNode);
  }> & {
    Button: GenericComponent;
    Panel: GenericComponent;
  };

  export const Disclosure: ComponentType<{
    as?: string;
    children?: ReactNode | ((props: DisclosureRenderProps) => ReactNode);
  }>;

  export const DisclosureButton: GenericComponent;
  export const DisclosurePanel: GenericComponent;
}