import { JobStatus } from "../../types/JobStatus";

interface JobStatusFilterModalProps {
    opened: boolean,
    repeatedJobs: boolean,
    onClose: () => void,
    selected: JobStatus[],
    onApply: (selected: JobStatus[]) => void
}

export default JobStatusFilterModalProps;