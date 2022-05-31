import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Outlet, useCatch, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ErrorFallback, NavBar } from "~/lib/matador/components";
import { themeKeyLocalStorage } from "~/lib/matador/helpers/application-helpers.server";
import { Navigations } from "~/lib/matador/helpers/ui-helpers";
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

export const meta: MetaFunction = () => ({
  title: "Matador"
})

export type LoaderData = string | undefined;

export interface ErrorBoundaryProps {
  error: Error
}

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
          links={Navigations}
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

  return <ErrorFallback error={caught} />;
}

export function ErrorBoundary({ error }: ErrorBoundaryProps) {
  return <ErrorFallback error={error} />;
}
