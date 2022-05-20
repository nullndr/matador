import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { Outlet } from "@remix-run/react";
import { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { BsArrowsAngleContract } from "react-icons/bs";
import { DiRedis } from "react-icons/di";
import { NavBar, NavlinkProps } from "~/lib/matador/components/navbar";
import { themeKeyLocalStorage } from '~/lib/matador/constants';

const navigation : NavlinkProps[] = [
    { label: "Queues", href: "./queues", color: 'red', icon: <DiRedis size={20} /> },
    { label: "Redis", href: "./redis", color: 'blue', icon: <BiInfoCircle size={20} /> },
    { label: "Clients", href: "./clients", color: 'green', icon: <BsArrowsAngleContract size={20} /> },
  ];
  

export const App = () => {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    
    useEffect(() => {

        
        if (typeof window !== 'undefined') {
            const theme = localStorage.getItem(themeKeyLocalStorage) as ColorScheme;

            setColorScheme(theme ?? 'light')
        }

    }, [colorScheme])
  
    
        
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
            theme={{ colorScheme: colorScheme }}
        >
            <NavBar 
            links={navigation}
            srcLogo="/assets/matador.png"
            footerText="Matador v1.0.0"
            >
            
            <Outlet />
            </NavBar>
        </MantineProvider>
        </ColorSchemeProvider>
    );
}