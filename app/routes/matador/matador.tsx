import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/assets/matador.png",
      type: "image/png",
    },
  ];
};
