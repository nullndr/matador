import type { ColorScheme, MantineColor } from "@mantine/core";
import {
  ActionIcon,
  AppShell,
  Burger,
  Divider,
  Grid,
  Group,
  Header,
  Image,
  MediaQuery,
  Navbar,
  ScrollArea,
  Title,
  useMantineColorScheme,
  useMantineTheme
} from "@mantine/core";
import { NavLink } from "@remix-run/react";
import { useState } from "react";
import { BiMoon } from "react-icons/bi";
import { TiWeatherSunny } from "react-icons/ti";
import { themeKeyLocalStorage } from "~/lib/matador/constants";
import Navlink from "./Navlink";

export type NavbarProps = React.PropsWithChildren<{
  srcLogo: string;
  links: NavbarItem[];
  footerText: string;
}>;

export interface NavbarItem {
  icon: React.ReactNode;
  color: MantineColor;
  label: string;
  href: string;
}

export const NavBar = ({
  srcLogo,
  links,
  footerText,
  children,
}: NavbarProps) => {
  const theme = useMantineTheme();
  const { toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState<boolean>(false);

  const onClickThemeButton = () => {
    const changeThemeTo: ColorScheme =
      theme.colorScheme === "dark" ? "light" : "dark";
    toggleColorScheme(changeThemeTo);

    localStorage.setItem(themeKeyLocalStorage, changeThemeTo);
  };
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{
            sm: 200,
            lg: 300,
          }}
        >
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            {links.map((el) => (
              <Navlink
                key={el.href}
                label={el.label}
                href={el.href}
                icon={el.icon}
                color={el.color}
                onClick={() => setOpened((o) => !o)}
              />
            ))}
          </Navbar.Section>
          <Divider />

          <Navbar.Section>
            <Title
              order={5}
              sx={(theme) => ({
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[0]
                    : theme.black,
              })}
            >
              {footerText}
            </Title>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p="xs">
          <Grid justify="space-between">
            <Grid.Col span={2}>
              <Grid>
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Grid.Col span={12}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      color={theme.colors.gray[6]}
                      mr="xl"
                    />
                  </Grid.Col>
                </MediaQuery>
                <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                  <Grid.Col span={12}>
                    <NavLink to="./">
                      <Image src={srcLogo} alt="logo" width={70} />
                    </NavLink>
                  </Grid.Col>
                </MediaQuery>
              </Grid>
            </Grid.Col>
            <Grid.Col span={5}>
              <Group position="right">
                <ActionIcon
                  variant="default"
                  onClick={onClickThemeButton}
                  size={44}
                >
                  {theme.colorScheme === "dark" ? (
                    <TiWeatherSunny size={24} />
                  ) : (
                    <BiMoon size={24} />
                  )}
                </ActionIcon>
              </Group>
            </Grid.Col>
          </Grid>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};
