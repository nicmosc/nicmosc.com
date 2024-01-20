import './globals.css';
import '@nicmosc/ui/styles.css';

import { UIProvider } from '@nicmosc/ui';
import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';

import { Sidebar } from '../components';
import { handleLogout } from './actions';
import { auth } from './auth';

const font = Urbanist({ weight: ['300', '400', '500', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'nicmosc | admin',
  description: 'Personal website admin panel',
};

export default async function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const session = await auth();
  return (
    <html lang="en">
      <body className={font.className}>
        <UIProvider theme="corporate">
          <div className="flex h-full">
            <Sidebar onLogout={handleLogout} isLoggedIn={session != null} />
            <div className="flex-1">{children}</div>
          </div>
        </UIProvider>
      </body>
    </html>
  );
}
