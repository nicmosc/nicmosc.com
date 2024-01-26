import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar as UINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  User,
} from '@nicmosc/ui';
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

export const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const sessionUser = session?.user;
  const isLoggedIn = session != null;

  return (
    <UINavbar maxWidth="full" isBordered>
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
                  description={<p className="text-primary text-sm">{sessionUser?.email}</p>}
                  avatarProps={{
                    src: sessionUser!.image!,
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onClick={async () => {
                    signOut();
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
                signIn();
              }}
              color="primary"
              variant="light">
              Log in
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </UINavbar>
  );
};
