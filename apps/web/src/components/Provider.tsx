'use client';

import { UIProvider } from '@nicmosc/ui';
import { useRouter } from 'next/navigation';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <UIProvider
      className="flex flex-col bg-gradient-to-b from-neutral-950 to-neutral-800"
      theme="dark"
      navigate={router.push}>
      {children}
    </UIProvider>
  );
}
