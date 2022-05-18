import { classNames } from "~/lib/matador/helpers/style-helpers";
import { BullJob } from "~/lib/matador/index.server";

type JobStatusProps = {
  job: BullJob;
};

export function JobStatus({ job }: JobStatusProps) {
  const status =
    "failedReason" in job
      ? "failed"
      : "parentKey" in job
      ? "children"
      : "repeated" in job
      ? "repeated"
      : "completed";
  return (
    <span
      className={classNames(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-gray-800 m-1",
        status === "failed" && "bg-red-200",
        status === "children" && "bg-blue-200",
        status === "repeated" && "bg-indigo-200",
        status === "completed" && "bg-green-200"
      )}
    >
      {status}
    </span>
  );
}
