import { Title, Divider } from "@mantine/core";
import type { BullJob } from "~/lib/matador/index.server";
import JobResult from "./JobResult";

export interface JobResultPanelProps {
  job: BullJob;
}

export const JobResultPanel = ({ job }: JobResultPanelProps) => {
  return (
    <>
      <Title
        mb="sm"
        order={3}
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        })}
      >
        Job Result
      </Title>

      <Divider mb="md" />

      {"returnvalue" in job && (
        <JobResult
          label="Result"
          value={JSON.stringify(job.returnvalue, undefined, 2)}
          color="#f0fdf4"
          textColor="#111827"
          borderColor="#bbf7d0"
        />
      )}

      {"failedReason" in job && (
        <JobResult
          label="Failed Reason"
          value={job.failedReason}
          color="#fef2f2"
          textColor="#dc2626"
          borderColor="#fecaca"
        />
      )}

      {"stacktrace" in job && job.stacktrace && job.stacktrace.length !== 0 && (
        <JobResult
          label="Stacktrace"
          value={job.stacktrace[0]}
          color="#fef2f2"
          textColor="#dc2626"
          borderColor="#fecaca"
        />
      )}
    </>
  );
};
