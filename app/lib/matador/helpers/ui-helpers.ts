import type { MantineColor } from "@mantine/core";
import type { JobStatus } from "../types/JobStatus";

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
