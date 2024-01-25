'use client';

import { Button } from '@nicmosc/ui';

export const EmptyState = ({ onClickCta }: { onClickCta: VoidFunction }) => {
  return (
    <div className="p-24 pt-60 h-screen flex flex-col items-center gap-5">
      <p className="text-center">You must log in to access this application</p>
      <Button
        onClick={async () => {
          onClickCta();
        }}
        variant="faded"
        color="primary">
        Log in
      </Button>
    </div>
  );
};
