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
        value={
          returnvalue != null
            ? JSON.stringify(returnvalue, undefined, 2)
            : "No Result"
        }
        color="#f0fdf4"
        textColor="#111827"
        borderColor="#bbf7d0"
      />

      {failedReason && (
        <JobResult
          label="Failed Reason"
          value={failedReason.trim()}
          color="#fef2f2"
          textColor="#dc2626"
          borderColor="#fecaca"
        />
      )}

      {stacktrace && stacktrace.length !== 0 && (
        <JobResult
          label="Stacktrace"
          value={stacktrace[0] ?? ""}
          color="#fef2f2"
          textColor="#dc2626"
          borderColor="#fecaca"
        />
      )}
    </>
  );
};
