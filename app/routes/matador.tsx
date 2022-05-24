import type { ColorScheme } from "@mantine/core";
import {
  ColorSchemeProvider,
  MantineProvider
} from "@mantine/core";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { Outlet, useCatch, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { BsArrowsAngleContract } from "react-icons/bs";
import { DiRedis } from "react-icons/di";
import type { NavbarItem } from "~/lib/matador/components";
import { NavBar } from "~/lib/matador/components/navbar";
import { themeKeyLocalStorage } from "~/lib/matador/constants";
import { getMatadorVersion } from "~/lib/matador/index.server";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/assets/matador.png",
      type: "image/png",
    },
  ];
};

const navigation: NavbarItem[] = [
  {
    label: "Queues",
    href: "./queues",
    color: "red",
    icon: <DiRedis size={20} />,
  },
  {
    label: "Redis",
    href: "./redis",
    color: "blue",
    icon: <BiInfoCircle size={20} />,
  },
  {
    label: "Clients",
    href: "./clients",
    color: "green",
    icon: <BsArrowsAngleContract size={20} />,
  },
];

export type LoaderData = string | undefined;

export const loader: LoaderFunction = (): LoaderData => {
  return getMatadorVersion();
};

export default function MatadorLayout() {
  const loaderData = useLoaderData();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useEffect(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.getItem(themeKeyLocalStorage) as ColorScheme;

      setColorScheme(theme ?? "light");
    }
  }, [colorScheme]);
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme: colorScheme }}>
        <NavBar
          links={navigation}
          srcLogo="/assets/matador.png"
          footerText={`Matador ${loaderData}`}
        >
          <Outlet />
        </NavBar>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <>
      <header>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            {`${caught.status} ${caught.statusText}`}
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl text-right mx-auto py-6 sm:px-6 lg:px-8">
          <p className="font-semibold">{caught.data}</p>
        </div>
      </main>
    </>
  );
}
