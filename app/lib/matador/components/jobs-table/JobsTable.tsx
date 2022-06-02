import { Table } from "@mantine/core";
import { useState } from "react";
import type { Job } from "~/lib/matador/index.server";
import type { JobStatus } from "~/lib/matador/types/JobStatus";
import { JobStatuses } from "~/lib/matador/types/JobStatus";
import JobsTableRow from "./JobsTableRow";
import JobStatusFilterModal from "./JobStatusFilterModal";
import JobStatusHeader from "./JobStatusHeader";

export interface JobsTableProps {
  jobs: Job[];
  queueName: string;
  statusSelected: JobStatus[];
  // onStatusesSelected: (statuse: JobStatus[]) => void;
}

export const JobsTable = ({
  jobs,
  queueName,
  statusSelected,
  // onStatusesSelected,
}: JobsTableProps) => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  return (
    <>
      {/* <JobStatusFilterModal
        onClose={() => setModalOpened(false)}
        opened={modalOpened}
        selected={statusSelected}
        onApply={(statuses) => {
          onStatusesSelected(statuses);
          setModalOpened(false);
        }}
        repeatedJobs={false} // FIXME
      /> */}
      <Table>
        <thead>
          <tr>
            {["Name", "Id", "Timestamp", "Status"].map((el) => (
              <th key={el}>
                {el}
                {/* {el !== "Status" ? (
                  el
                ) : (
                  <JobStatusHeader
                    isFiltered={false} // FIXME
                    onFilterClick={() => setModalOpened(true)}
                  />
                )} */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jobs.map((el) => (
            <JobsTableRow
              job={el}
              key={el.id}
              queueName={queueName}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};
