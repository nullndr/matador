import { Table } from "@mantine/core";
import JobsTableProps from "./JobsTableProps";
import JobsTableRow from "./JobsTableRow";
import { useState } from "react";
import JobStatusHeader from "./JobStatusHeader";
import JobStatusFilterModal from "./JobStatusFilterModal";
import { JobStatuses } from "../../types/JobStatus";

export const JobsTable = ({ jobs, queueName, repeatJobs = false, statusSelected, onStatusesSelected }: JobsTableProps) => {

    const [modalOpened, setModalOpened] = useState<boolean>(false);

    return (
        <>
            <JobStatusFilterModal 
                onClose={() => setModalOpened(false)}
                opened={modalOpened}
                selected={statusSelected}
                onApply={(statuses) => {
                    onStatusesSelected(statuses);
                    setModalOpened(false);
                }}
                repeatedJobs={repeatJobs}
            />
            <Table>
                <thead>
                    <tr>
                    {["Name", "Id", "Timestamp", "Status"].map(el => (
                        <th key={el}>
                            {
                                el !== "Status"
                                ?
                                el
                                :
                                <JobStatusHeader 
                                    isFiltered={repeatJobs ? statusSelected.length !== JobStatuses.length-1 : statusSelected.length !== JobStatuses.length} 
                                    onFilterClick={() => setModalOpened(true)} 
                                />
                            }
                        </th>
                    ))}
                    </tr>
            </thead>
            <tbody>
                {
                    jobs.map(el => (
                        <JobsTableRow job={el} key={el.id} queueName={queueName} repeatJob={repeatJobs} />
                    ))
                }
            </tbody>
            </Table>
        </>
    );
}