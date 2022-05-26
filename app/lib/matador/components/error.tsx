import {
  Alert,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Text,
} from "@mantine/core";
import { ThrownResponse } from "@remix-run/react";
import { useEffect, useState } from "react";
import { BiMessageError } from "react-icons/bi";
import { themeKeyLocalStorage } from "~/lib/matador/constants";
import Navigations from "../navigations";
import { NavBar } from "./navbar";

export interface ErrorFallbackProps {
  error: ThrownResponse<number, any>;
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
            <Text>Something wrong happened happened!</Text>
            <Text>{error.status}</Text>
          </Alert>
        </NavBar>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default ErrorFallback;
