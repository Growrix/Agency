'use client';

import { toast } from 'sonner';

export function useToast() {
  return {
    show: (message: string) => toast(message),
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
  };
}
