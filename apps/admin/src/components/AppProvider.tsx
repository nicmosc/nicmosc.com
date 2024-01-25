'use client';

import { UIProvider } from '@nicmosc/ui';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

export const AppProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  return (
    <UIProvider navigate={router.push} theme="light">
      {children}
    </UIProvider>
  );
};
