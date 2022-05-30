import type { ColorScheme } from "@mantine/core";
import {
  Alert,
  ColorSchemeProvider,
  MantineProvider,
  Text,
} from "@mantine/core";
import type { ThrownResponse } from "@remix-run/react";
import { useState, useEffect } from "react";
import { BiMessageError } from "react-icons/bi";
import { themeKeyLocalStorage } from "../../constants";
import { Navigations } from "../../helpers/ui-helpers";
import { NavBar } from "../navbar";

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
          <Alert icon={<BiMessageError size={16} />} title="Error" color="red">
            {!(error instanceof Error) ? (
              <Text>Something wrong happened: {error.statusText}</Text>
            ) : (
              <Text>Sorry but something unexpected happened!</Text>
            )}
          </Alert>
        </NavBar>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default ErrorFallback;
