import { AppShell, createStyles, Navbar } from "@mantine/core";
import { NavLink } from "@remix-run/react";
import { IconCategory2, IconDatabase, TablerIcon } from "@tabler/icons";
import React from "react";

const useStyles = createStyles((theme, _, getRef) => {
  const icon = getRef("icon");
  return {
    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
    },

    linkIcon: {
      ref: icon,
      color: theme.colors.gray[4],
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.colors.gray[6],
      },
    },
  };
});

const links: NavbarLinksProps["links"] = [
  { link: "/matador/queues", label: "Queues", icon: IconCategory2 },
  { link: "/matador/redis", label: "Redis", icon: IconDatabase },
];

type NavbarLayoutProps = React.PropsWithChildren;

export function Appshell({ children }: NavbarLayoutProps) {
  return (
    <AppShell
      navbar={
        <Navbar width={{ sm: 300 }} p="md" className={"bg-slate-800"}>
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
  const { cx, classes } = useStyles();
  return (
    <>
      {links.map((item) => (
        <NavLink
          className={({ isActive }) =>
            cx(classes.link, {
              [classes.linkActive]: isActive,
            })
          }
          to={item.link}
          key={item.label}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </>
  );
}
