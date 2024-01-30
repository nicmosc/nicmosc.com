import '@nicmosc/ui/globals.css';
import '@nicmosc/ui/styles.css';

import { UIProvider } from '@nicmosc/ui';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { Fragment, ReactNode } from 'react';

import { Layout } from '../components/Layout';

type AppPropsWithLayout = AppProps & {
  Component: ReactNode;
};

export default function App({ Component, pageProps: { session, ...rest } }: AppPropsWithLayout) {
  const router = useRouter();
  return (
    <Fragment>
      <Head>
        <title>Nicmosc | Dashboard</title>
        <meta property="og:title" content="Nicmosc | Dashboard" key="title" />
      </Head>
      <SessionProvider session={session}>
        <UIProvider navigate={router.push} theme="light">
          <Layout>
            <Component {...rest} />
          </Layout>
        </UIProvider>
      </SessionProvider>
    </Fragment>
  );
}
