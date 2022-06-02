import { Badge, Text } from "@mantine/core";
import { NavLink } from "@remix-run/react";
import { getStatusColor } from "~/lib/matador/helpers/ui-helpers";
import type { Job } from "~/lib/matador/index.server";
import type { JobStatus } from "~/lib/matador/types/JobStatus";

export interface JobsTableRowProps {
  job: Job;
  queueName: string;
  repeatJobs: boolean;
}

const JobsTableRow = ({ job, queueName, repeatJobs }: JobsTableRowProps) => {
  const buildLink = (): string => {
    if (!job.id) {
      return "#";
    }

    let baseUri = `../${encodeURI(queueName)}`;

    if (!repeatJobs && job.id.includes("repeat")) {
      return `${baseUri}/repeat/${encodeURI(`${job.id.split(":")[1]}`)}`;
    } else {
      baseUri += `/${job.id}`;
    }

    return baseUri;
  };

  const getStatus = (job: Job): JobStatus => {
    if ("failedReason" in job) {
      return "failed";
    }

    if ("parentKey" in job) {
      return "children";
    }

    if (!repeatJobs && job.id.includes("repeat")) {
      return "repeated";
    }

    return "completed";
  };

  const status = getStatus(job);

  return (
    <tr>
      <td>
        <NavLink to={buildLink()}>
          <Text variant="link">{job.name}</Text>
        </NavLink>
      </td>
      <td>{job.id}</td>
      <td>
        {"timestamp" in job && !job.id?.includes("repeat")
          ? new Date(Number(job.timestamp)).toISOString()
          : ""}
      </td>
      <td>
        <Badge color={getStatusColor(status)}>{status}</Badge>
      </td>
    </tr>
  );
};

export default JobsTableRow;
