'use client';
import { Menu } from '@nicmosc/ui';
import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

interface SidebarProps {
  isLoggedIn?: boolean;
  onLogout: VoidFunction;
}

export const Sidebar = ({ onLogout, isLoggedIn }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="w-[200px] min-h-0 bg-neutral-content">
      <Menu className="h-full">
        <Menu.Item>
          <Link href="/projects" className={cx(pathname === '/projects' && 'active')}>
            <svg
              className={cx('w-4 h-4 text-gray-800', pathname === '/projects' && 'text-white')}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 20">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 1v4a1 1 0 0 1-1 1H1m5 8.514L4 12.5l2-2m4 4.014 2-2.014-2-2m5 7.5a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v16Z"
              />
            </svg>
            Manage projects
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/content" className={cx(pathname === '/content' && 'active')}>
            <svg
              className={cx('w-4 h-4 text-gray-800', pathname === '/content' && 'text-white')}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              fill="none"
              viewBox="0 0 17 16">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.5 1v14m4.286-14v14M16 1H4.75a3.89 3.89 0 0 0-2.652 1.025A3.386 3.386 0 0 0 1 4.5c0 .928.395 1.819 1.098 2.475A3.89 3.89 0 0 0 4.75 8H8.5"
              />
            </svg>
            Manage content
          </Link>
        </Menu.Item>
        {isLoggedIn && (
          <Fragment>
            <div className="flex-1" />
            <Menu.Item
              onClick={async () => {
                onLogout();
              }}>
              <div>
                <svg
                  className="w-4 h-4 text-gray-800 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 16">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                  />
                </svg>
                Logout
              </div>
            </Menu.Item>
          </Fragment>
        )}
      </Menu>
    </div>
  );
};
