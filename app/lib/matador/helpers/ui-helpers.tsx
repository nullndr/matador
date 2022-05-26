import type { MantineColor } from "@mantine/core";
import type { JobStatus } from "../types/JobStatus";
import type { NavbarItem } from "~/lib/matador/components";
import { DiRedis } from "react-icons/di";
import { BiInfoCircle } from "react-icons/bi";
import { BsArrowsAngleContract } from "react-icons/bs";

export const getStatusColor = (status: JobStatus): MantineColor => {
  if (status === "failed") {
    return "red";
  }

  if (status === "children") {
    return "blue";
  }

  if (status === "repeated") {
    return "indigo";
  }

  return "green";
};

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
