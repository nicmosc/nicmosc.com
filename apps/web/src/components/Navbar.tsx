import { Button, Icon, Navbar as UINavbar, NavbarContent, NavbarItem } from '@nicmosc/ui';

export const Navbar = () => {
  return (
    <UINavbar maxWidth="full" className="justify-between bg-transparent" position="static">
      <NavbarContent>
        <NavbarItem>
          <Button variant="bordered" isIconOnly>
            <Icon.Github />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="bordered" isIconOnly>
            <Icon.Linkedin />
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="!justify-end">
        <NavbarItem>
          <Button color="primary">Contact me</Button>
        </NavbarItem>
      </NavbarContent>
    </UINavbar>
  );
};
