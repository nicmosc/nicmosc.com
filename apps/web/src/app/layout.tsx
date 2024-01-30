import './globals.css';

import { cx } from 'class-variance-authority';
import type { Metadata } from 'next';
import { Dela_Gothic_One, Nunito_Sans } from 'next/font/google';

import { Navbar } from '../components/Navbar';
import { AppProvider } from '../components/Provider';

const primaryFont = Nunito_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-primary',
});
const secondaryFont = Dela_Gothic_One({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-secondary',
});

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
      <body className={cx(primaryFont.className, primaryFont.variable, secondaryFont.variable)}>
        <AppProvider>
          <Navbar />
          {children}
          {modal}
          <div id="modal-root" />
        </AppProvider>
      </body>
    </html>
  );
}
