'use client';

import { PropsWithChildren } from 'react';
import { Theme } from 'react-daisyui';

export const UIProvider = ({
  children,
  theme = 'sunset',
}: PropsWithChildren & { theme?: 'sunset' | 'corporate' }) => {
  return (
    <Theme dataTheme={theme}>
      <div className="ui-h-screen ui-bg-inherit">{children}</div>
    </Theme>
  );
};
