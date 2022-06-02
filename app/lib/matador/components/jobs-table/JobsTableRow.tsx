import { Badge, Text } from "@mantine/core";
import { NavLink } from "@remix-run/react";
import { getStatusColor } from "~/lib/matador/helpers/ui-helpers";
import type { Job } from "~/lib/matador/index.server";
import type { JobStatus } from "~/lib/matador/types/JobStatus";

export interface JobsTableRowProps {
  job: Job;
  queueName: string;
}

const JobsTableRow = ({
  job,
  queueName,
}: JobsTableRowProps) => {
  const status = getStatus(job);

  const buildLink = (): string => {
    if (!job.id) {
      return "#";
    }

    let baseUri = `../${encodeURI(queueName)}`;

    if (job.id.includes('repeat') && job.id.split(':').length === 2) {
      return `${baseUri}/repeat/${encodeURI(`${job.id.split(':')[1]}`)}`;
    } else {
      baseUri += `/${job.id}`;
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
          ? new Date(Number(job.timestamp)).toISOString() // FIXME if is repeat timestamp should be empty
          : ""}
      </td>
      <td>
        <Badge color={getStatusColor(status)}>{status}</Badge>
      </td>
    </tr>
  );
};

// FIXME
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
