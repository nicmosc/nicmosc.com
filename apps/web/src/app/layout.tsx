import './globals.css';
import '@nicmosc/ui/styles.css';

import { UIProvider } from '@nicmosc/ui';
import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';

const font = Urbanist({ weight: ['300', '400', '500', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'nicmosc',
  description: 'Personal website',
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={font.className}>
        <UIProvider>
          {children}
          {modal}
        </UIProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
