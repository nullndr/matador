import { BullJob } from "~/lib/matador/index.server";
import { JobStatus } from "../../types/JobStatus";

interface JobsTableProps {
  jobs: BullJob[];
  queueName: string;
  repeatJobs?: boolean;
  statusSelected: JobStatus[];
  onStatusesSelected: (statuse: JobStatus[]) => void;
}

export default JobsTableProps;
