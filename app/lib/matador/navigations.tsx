import type { NavbarItem } from "~/lib/matador/components";
import { DiRedis } from "react-icons/di";
import { BiInfoCircle } from "react-icons/bi";
import { BsArrowsAngleContract } from "react-icons/bs";

const Navigations: NavbarItem[] = [
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

export default Navigations;
