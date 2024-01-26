import '@nicmosc/ui/styles.css';
import '../../styles.css';

import { UIProvider } from '@nicmosc/ui';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import { AuthProvider } from '../components/AuthProvider';
import { Layout } from '../components/Layout';

type AppPropsWithLayout = AppProps & {
  Component: ReactNode;
};

export default function App({ Component, pageProps: { session, ...rest } }: AppPropsWithLayout) {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      <UIProvider navigate={router.push} theme="light">
        <Layout>
          <AuthProvider>
            <Component {...rest} />
          </AuthProvider>
        </Layout>
      </UIProvider>
    </SessionProvider>
  );
}
