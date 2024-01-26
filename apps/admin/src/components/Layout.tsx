import { Fragment } from 'react';

import { Navbar } from './Navbar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <Navbar />
      <div className="flex">
        <div className="flex-1">{children}</div>
      </div>
    </Fragment>
  );
};
