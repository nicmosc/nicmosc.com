'use client';

import { NextUIProvider } from '@nextui-org/react';
import { PropsWithChildren } from 'react';

export const UIProvider = ({
  children,
  theme = 'light',
  navigate,
}: PropsWithChildren & { theme?: 'dark' | 'light'; navigate: any }) => {
  return (
    <NextUIProvider navigate={navigate}>
      <main className={`${theme} text-foreground bg-background`}>
        <div className="ui-h-screen ui-bg-inherit">{children}</div>
      </main>
    </NextUIProvider>
  );
};
