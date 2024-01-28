import { EmptyState } from '@nicmosc/ui';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { signIn } from 'next-auth/react';

import { authOptions } from './api/auth/[...nextauth]';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session != null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default function Login() {
  return <EmptyState onClickCta={() => signIn()} />;
}
