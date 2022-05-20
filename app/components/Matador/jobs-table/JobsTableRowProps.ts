import { BullJob } from "~/lib/matador/index.server";

export interface JobsTableRowProps {
    job: BullJob,
    queueName: string,
    repeatJob: boolean
}