'use client';

import { Button } from '@nicmosc/ui';

interface LoginButtonProps {
  onClick: VoidFunction;
}

export const LoginButton = ({ onClick }: LoginButtonProps) => {
  return (
    <form action={onClick}>
      <Button type="submit">Login</Button>
    </form>
  );
};
