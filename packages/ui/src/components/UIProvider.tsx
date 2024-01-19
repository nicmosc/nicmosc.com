'use client';

import { PropsWithChildren } from 'react';
import { Theme } from 'react-daisyui';

export const UIProvider = ({ children }: PropsWithChildren) => {
  return (
    <Theme dataTheme="sunset">
      <div className="ui-h-screen ui-bg-inherit">{children}</div>
    </Theme>
  );
};
