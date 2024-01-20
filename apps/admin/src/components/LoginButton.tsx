'use client';

import { Button } from '@nicmosc/ui';

interface LoginButtonProps {
  onClick: VoidFunction;
}

export const LoginButton = ({ onClick }: LoginButtonProps) => {
  return (
    <div className="p-6 h-full flex justify-center items-center">
      <form action={onClick}>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};
