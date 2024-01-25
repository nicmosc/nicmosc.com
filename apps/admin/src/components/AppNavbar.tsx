'use client';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  User,
} from '@nicmosc/ui';
import { usePathname } from 'next/navigation';
import { User as SessionUser } from 'next-auth';

interface NavbarProps {
  isLoggedIn?: boolean;
  sessionUser?: SessionUser;
  onLogout: VoidFunction;
  onLogin: VoidFunction;
}

export const AppNavbar = ({ onLogout, isLoggedIn, sessionUser, onLogin }: NavbarProps) => {
  const pathname = usePathname();

  return (
    <Navbar maxWidth="full" isBordered>
      <NavbarBrand className="!flex-none mr-3">
        <p className="font-bold text-inherit">Dashboard</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem isActive={pathname === '/projects'}>
          <Link color={pathname !== '/projects' ? 'foreground' : undefined} href="/projects">
            Projects
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/content'}>
          <Link color={pathname !== '/content' ? 'foreground' : undefined} href="/content">
            Content
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/blog'}>
          <Link color={pathname !== '/blog' ? 'foreground' : undefined} href="/blog">
            Blog
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {isLoggedIn ? (
            <Dropdown>
              <DropdownTrigger>
                <User
                  className="hover:cursor-pointer"
                  name={sessionUser!.name}
                  description={
                    <Link href="#" size="sm">
                      {sessionUser?.email}
                    </Link>
                  }
                  avatarProps={{
                    src: sessionUser!.image!,
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onClick={async () => {
                    onLogout();
                  }}
                  key="delete"
                  className="text-danger"
                  color="danger">
                  Log out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              onClick={async () => {
                onLogin();
              }}
              color="primary"
              variant="light">
              Log in
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
