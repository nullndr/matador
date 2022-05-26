import type { LoaderFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { JobDataPanel } from "~/lib/matador/components/job-data";
import { JobInfoPanel } from "~/lib/matador/components/job-info";
import { JobResultPanel } from "~/lib/matador/components/job-result";
import type { BullJob } from "~/lib/matador/index.server";
import { getQueueJob } from "~/lib/matador/index.server";
import { ErrorFallback } from "~/lib/matador/components/error";

type LoaderData = {
  queueName: string;
  job: BullJob;
};

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<LoaderData> => {
  if (!global.__redis) {
    throw new Response("Redis connection not found", {
      status: 503,
      statusText: "a redis connection has not been found",
    });
  }

  if (!params.queueName || !params.jobId) {
    throw new Response("Bad request", {
      status: 400,
      statusText: "The queue name or job id is missing",
    });
  }

  const queueName = decodeURI(params.queueName);
  const jobId = decodeURI(params.jobId);

  const job = await getQueueJob(queueName, jobId);

  if (!job) {
    throw new Response("Not found", {
      status: 404,
    });
  }

  return { queueName, job };
};

export default function JobDetail() {
  const loaderData = useLoaderData<LoaderData>();
  if (!("timestamp" in loaderData.job)) {
    throw new Error();
  }

  return (
    <>
      <JobInfoPanel
        id={loaderData.job.id ?? ""}
        jobName={loaderData.job.name ?? ""}
        queueName={loaderData.queueName}
        timestamp={new Date(Number(loaderData.job.timestamp))}
        attemptsMade={loaderData.job.attemptsMade}
        processedOn={new Date(Number(loaderData.job.processedOn))}
        finishedOn={new Date(Number(loaderData.job.finishedOn))}
      />

      <JobDataPanel
        parent={loaderData.job.parent}
        data={loaderData.job.data}
        opts={loaderData.job.opts}
      />

      <JobResultPanel
        returnvalue={loaderData.job.returnvalue}
        failedReason={loaderData.job.failedReason}
        stacktrace={loaderData.job.stacktrace}
      />
    </>
  );
}

export function ErrorBoundary() {
  const caught = useCatch();

  return <ErrorFallback error={caught} />;
}
