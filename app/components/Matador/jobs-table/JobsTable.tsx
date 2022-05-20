import { Table } from "@mantine/core";
import { JobsTableProps } from "./index";
import { JobsTableRow } from "./JobsTableRow";

export const JobsTable = ({ jobs, queueName }: JobsTableProps) => {

    return (
        <Table>
            <thead>
                <tr>
                {["Name", "Id", "Timestamp", "Status"].map(el => (
                    <th>{el}</th>
                ))}
                </tr>
          </thead>
          <tbody>
            {
                jobs.map(el => (
                    <JobsTableRow job={el} key={el.id} queueName={queueName} />
                ))
            }
          </tbody>
        </Table>
    );
}