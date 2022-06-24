import type { ColorScheme } from "@mantine/core";
import {
  Alert,
  ColorSchemeProvider,
  MantineProvider,
  Text,
} from "@mantine/core";
import type { ThrownResponse } from "@remix-run/react";
import { useEffect, useState } from "react";
import { BiMessageError } from "react-icons/bi";
import { NavBar } from "~/lib/matador/components/navbar";
import { themeKeyLocalStorage } from "~/lib/matador/helpers/application-helpers.server";
import { Navigations } from "~/lib/matador/helpers/ui-helpers";

export interface ErrorFallbackProps {
  error: Error | ThrownResponse<number, any>;
}

export const ErrorFallback = ({ error }: ErrorFallbackProps) => {
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
          footerText={`Matador`}
        >
          {"name" in error ? (
            <Alert
              icon={<BiMessageError size={16} />}
              title={error.name}
              color="red"
            >
              <Text>{error.message}</Text>
            </Alert>
          ) : (
            <Alert
              icon={<BiMessageError size={16} />}
              title={error.status}
              color="red"
            >
              <Text>{error.statusText}</Text>
            </Alert>
          )}
        </NavBar>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default ErrorFallback;
