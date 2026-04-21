"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { Button } from "@/components/primitives/Button";
import { useConciergeStore } from "@/lib/concierge-store";

type ConciergeTriggerButtonProps = Omit<ComponentPropsWithoutRef<typeof Button>, "onClick" | "type"> & {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  prompt?: string;
};

export function ConciergeTriggerButton({ onClick, prompt, ...props }: ConciergeTriggerButtonProps) {
  const open = useConciergeStore((state) => state.open);

  return (
    <Button
      type="button"
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          open(prompt);
        }
      }}
    />
  );
}

type ConciergeTriggerProps = Omit<ComponentPropsWithoutRef<"button">, "onClick" | "type"> & {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  prompt?: string;
};

export function ConciergeTrigger({ onClick, prompt, ...props }: ConciergeTriggerProps) {
  const open = useConciergeStore((state) => state.open);

  return (
    <button
      type="button"
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          open(prompt);
        }
      }}
    />
  );
}