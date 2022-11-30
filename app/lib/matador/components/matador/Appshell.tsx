import { AppShell, Navbar } from "@mantine/core";
import { NavLink } from "@remix-run/react";
import { IconCategory2, IconDatabase, TablerIcon } from "@tabler/icons";
import React from "react";
import { classNames } from "../../helpers";

const links: NavbarLinksProps["links"] = [
  { link: "/matador/queues", label: "Queues", icon: IconCategory2 },
  { link: "/matador/redis", label: "Redis", icon: IconDatabase },
];

type NavbarLayoutProps = React.PropsWithChildren;

export function Appshell({ children }: NavbarLayoutProps) {
  return (
    <AppShell
      navbar={
        <Navbar width={{ sm: 250 }} p="md" className={"bg-slate-800"}>
          <Navbar.Section grow>
            <NavbarLinks links={links} />
          </Navbar.Section>
        </Navbar>
      }
    >
      {children}
    </AppShell>
  );
}

type NavbarLinksProps = {
  links: {
    link: string;
    label: string;
    icon: TablerIcon;
  }[];
};

function NavbarLinks({ links }: NavbarLinksProps) {
  return (
    <>
      {links.map((item) => (
        <NavLink
          className={({ isActive }) =>
            classNames(
              "block rounded-md m-2 p-2 text-gray-300",
              isActive ? "bg-slate-500 text-slate-800" : "",
            )
          }
          to={item.link}
          key={item.label}
        >
          <item.icon className="inline pr-2" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </>
  );
}
