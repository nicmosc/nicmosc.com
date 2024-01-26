import { CircularProgress, EmptyState } from '@nicmosc/ui';
import { signIn, useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { status } = useSession();

  if (status === 'loading') {
    return <EmptyState content={<CircularProgress />} />;
  }

  if (status === 'unauthenticated') {
    return <EmptyState onClickCta={() => signIn()} />;
  }

  return children;
};
