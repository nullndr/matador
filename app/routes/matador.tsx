import { LinksFunction } from "@remix-run/node";
import { NavLink, Outlet, useCatch } from "@remix-run/react";
import { SideBar } from "~/components/Matador";
import { NavBar } from "~/components/Matador/navbar/Navbar";
import { classNames } from "~/lib/matador/helpers/style-helpers";

import { DiRedis } from 'react-icons/di';
import { BiInfoCircle } from 'react-icons/bi';
import { BsArrowsAngleContract } from 'react-icons/bs'


import { NavlinkProps } from "~/components/Matador/navbar/";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useState } from "react";

const navigation : NavlinkProps[] = [
  { label: "Queues", href: "./queues", color: 'red', icon: <DiRedis size={20} /> },
  { label: "Redis", href: "./redis", color: 'blue', icon: <BiInfoCircle size={20} /> },
  { label: "Clients", href: "./clients", color: 'green', icon: <BsArrowsAngleContract size={20} /> },
];

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/assets/matador.png",
      type: "image/png",
    },
  ];
};

export default function MatadorLayout() {

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    
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
