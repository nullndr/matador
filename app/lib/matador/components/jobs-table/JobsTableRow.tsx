import { Badge, Text } from "@mantine/core";
import { NavLink } from "@remix-run/react";
import { getStatusColor } from "~/lib/matador/helpers/ui-helpers";
import type { Job } from "~/lib/matador/index.server";
import type { JobStatus } from "~/lib/matador/types/JobStatus";

export interface JobsTableRowProps {
  job: Job;
  queueName: string;
  repeatJob: boolean;
}

const JobsTableRow = ({
  job,
  queueName,
  repeatJob = false,
}: JobsTableRowProps) => {
  const status = getStatus(job);

  const buildLink = (): string => {
    if (!job.id) {
      return "#";
    }

    if (repeatJob) {
      return `../${encodeURI(queueName)}/${encodeURI(`${job.id}`)}`;
    }

    let baseUri = `../${encodeURI(queueName)}/`;

    if (status === "repeated") {
      baseUri += `repeat/${encodeURI(job.id)}`;
    } else {
      baseUri += job.id;
    }

    return baseUri;
  };

  return (
    <tr>
      <td>
        <NavLink to={buildLink()}>
          <Text variant="link">{job.name}</Text>
        </NavLink>
      </td>
      <td>{job.id}</td>
      <td>
        {"timestamp" in job
          ? new Date(Number(job.timestamp)).toISOString()
          : ""}
      </td>
      <td>
        <Badge color={getStatusColor(status)}>{status}</Badge>
      </td>
    </tr>
  );
};

const getStatus = (job: Job): JobStatus => {
  if ("failedReason" in job) {
    return "failed";
  }

  if ("parentKey" in job) {
    return "children";
  }

  if ("repeated" in job) {
    return "repeated";
  }

  return "completed";
};

export default JobsTableRow;
