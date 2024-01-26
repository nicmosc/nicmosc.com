import { Fragment, ReactNode } from 'react';

import { Button } from '..';

export const EmptyState = ({
  onClickCta,
  content,
}: {
  onClickCta?: VoidFunction;
  content?: ReactNode;
}) => {
  return (
    <div className="p-24 pt-60 h-screen flex flex-col items-center gap-5">
      {content ?? (
        <Fragment>
          <p className="text-center">You must log in to access this application</p>
          <Button
            onClick={async () => {
              onClickCta?.();
            }}
            variant="faded"
            color="primary">
            Log in
          </Button>
        </Fragment>
      )}
    </div>
  );
};
