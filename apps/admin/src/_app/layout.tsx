import '@nicmosc/ui/styles.css';
import '@nicmosc/ui/ui.css';

import type { Metadata } from 'next';

import { AppNavbar } from '../components/AppNavbar';
import { AppProvider } from '../components/AppProvider';
import { EmptyState } from '../components/EmptyState';
import { handleLogin, handleLogout } from './actions';
import { auth } from './auth';

export const metadata: Metadata = {
  title: 'nicmosc | admin',
  description: 'Personal website admin panel',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const isLoggedIn = session != null;
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <AppNavbar
            isLoggedIn={isLoggedIn}
            sessionUser={session?.user}
            onLogout={handleLogout}
            onLogin={handleLogin}
          />
          <div className="flex">
            <div className="flex-1">
              {isLoggedIn ? children : <EmptyState onClickCta={handleLogin} />}
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
