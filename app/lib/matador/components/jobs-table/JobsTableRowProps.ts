import { BullJob } from "~/lib/matador/index.server";

interface JobsTableRowProps {
    job: BullJob,
    queueName: string,
    repeatJob: boolean
}

export default JobsTableRowProps;