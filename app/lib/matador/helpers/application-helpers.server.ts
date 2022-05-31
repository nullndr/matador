import type { MantineColor } from "@mantine/core";
import type { JobStatus } from "~/lib/matador/types/JobStatus";

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


export const capitalizeFirstLetter = (value: string) => value.charAt(0).toLocaleUpperCase() + value.slice(1);


export const themeKeyLocalStorage = "matador_theme";