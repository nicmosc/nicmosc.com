import { NextUIProvider } from '@nextui-org/react';
import { cx } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

export const UIProvider = ({
  children,
  theme = 'light',
  navigate,
  className,
}: PropsWithChildren & { theme?: 'dark' | 'light'; navigate: any; className?: string }) => {
  return (
    <NextUIProvider navigate={navigate}>
      <main className={`${theme} text-foreground bg-background`}>
        <div className={cx('bg-inherit min-h-screen', className)}>{children}</div>
      </main>
    </NextUIProvider>
  );
};
