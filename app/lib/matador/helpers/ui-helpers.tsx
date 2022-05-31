import { Link as RemixLink } from "@remix-run/react";
import { BiInfoCircle } from "react-icons/bi";
import { BsArrowsAngleContract } from "react-icons/bs";
import { DiRedis } from "react-icons/di";
import type { NavbarItem } from "~/lib/matador/components";

export const Navigations: NavbarItem[] = [
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

const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

export function Link({ children, url = "", external, ref, ...rest }: any) {
  // react-router only supports links to pages it can handle itself. It does not
  // support arbirary links, so anything that is not a path-based link should
  // use a regular old `a` tag
  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    rest.target = "_blank";
    rest.rel = "noopener noreferrer";
    return (
      <a href={url} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <RemixLink to={url} {...rest}>
      {children}
    </RemixLink>
  );
}