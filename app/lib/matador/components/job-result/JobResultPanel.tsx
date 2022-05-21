import { Title, Divider } from "@mantine/core";
import JobResult from "./JobResult";

export interface JobResultPanelProps {
  returnvalue: any | undefined;
  failedReason: string | undefined;
  stacktrace: string[] | undefined;
}

export const JobResultPanel = ({
  returnvalue,
  failedReason,
  stacktrace,
}: JobResultPanelProps) => {
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

      <JobResult
        label="Result"
        description="Job Result"
        value={
          returnvalue != null
            ? JSON.stringify(returnvalue, undefined, 2)
            : "No Result"
        }
      />

      <JobResult
        label="Failed Reason"
        description="Job Failed Reason"
        value={failedReason?.trim() ?? "Job executed without errors"}
      />

      <JobResult
        label="Stacktrace"
        description="Job Failed Reason"
        value={stacktrace?.[0] ?? ""}
      />
    </>
  );
};
