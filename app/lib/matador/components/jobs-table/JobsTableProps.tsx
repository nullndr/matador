import { BullJob } from "~/lib/matador/index.server";

export interface JobsTableProps {
    jobs: BullJob[],
    queueName: string,
    repeatJobs?: boolean
}