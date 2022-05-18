import { LoaderFunction } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import React from "react";
import { JobStatus, Stat, Table } from "~/components/Matador";
import { BullJob, getQueueJobs, getQueues } from "~/lib/matador/index.server";

type LoaderData = {
  queueName: string;
  jobs: BullJob[];
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

  if (!params.queueName) {
    throw new Response("Bad request", {
      status: 400,
      statusText: "The queue name is missing",
    });
  }

  const queueName = decodeURI(params.queueName);
  if (!queueName) {
    throw new Response(`Queue "${params.queueName}" not found`, {
      status: 404,
      statusText: "Not found",
    });
  }

  const doesQueueExist = await getQueues(global.__redis);
  if (!doesQueueExist.includes(params.queueName)) {
    throw new Response(`Queue "${params.queueName}" not found`, {
      status: 404,
      statusText: "Not found",
    });
  }

  const jobs = await getQueueJobs(queueName);
  return { queueName, jobs };
};

type QueueDetailProps = {};

export default function QueueDetail({}: QueueDetailProps) {
  const loaderData = useLoaderData<LoaderData>();
  const completedJobs = loaderData.jobs.filter(
    (job) => "returnvalue" in job && !("parentKey" in job)
  );
  const childrenJobs = loaderData.jobs.filter((job) => "parentKey" in job);
  const repeatedJobs = loaderData.jobs.filter((job) => "repeated" in job);
  const failedJobs = loaderData.jobs.filter((job) => "failedReason" in job);
  const [currentJobs, setCurrentJobs] = React.useState(loaderData.jobs);
  return (
    <>
      <main>
        <div className="mx-auto pb-6">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            {`Jobs in "${loaderData.queueName}" Queue`}
          </h1>
        </div>

        <div className="mx-auto">
          <div className="px-4 sm:px-0">
            <div className={`grid gap-5 grid-cols-4`}>
              <Stat
                key="Number of completed jobs"
                onClick={
                  completedJobs.length === 0
                    ? undefined
                    : () => setCurrentJobs(completedJobs)
                }
              >
                <div className="text-sm font-medium text-gray-500 truncate">
                  {"Number of completed jobs"}
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                  <p className="text-green-600 font-semibold">
                    {completedJobs.length}
                  </p>
                </div>
              </Stat>
              <Stat
                key="Number of children jobs"
                onClick={
                  childrenJobs.length === 0
                    ? undefined
                    : () => setCurrentJobs(childrenJobs)
                }
              >
                <div className="text-sm font-medium text-gray-500 truncate">
                  {"Number of children jobs"}
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                  <p className="text-purple-600 font-semibold">
                    {childrenJobs.length}
                  </p>
                </div>
              </Stat>
              <Stat
                key="Number of repeated jobs"
                onClick={
                  repeatedJobs.length === 0
                    ? undefined
                    : () => setCurrentJobs(repeatedJobs)
                }
              >
                <div className="text-sm font-medium text-gray-500 truncate">
                  {"Number of repeated jobs"}
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                  <p className="text-indigo-600 font-semibold">
                    {repeatedJobs.length}
                  </p>
                </div>
              </Stat>
              <Stat
                key="Number of failed jobs"
                onClick={
                  failedJobs.length === 0
                    ? undefined
                    : () => setCurrentJobs(failedJobs)
                }
              >
                <div className="text-sm font-medium text-gray-500 truncate">
                  {"Number of failed jobs"}
                </div>
                <div className="mt-1 text-3xl font-semibold text-gray-900">
                  <p className="text-red-600 font-semibold">
                    {failedJobs.length}
                  </p>
                </div>
              </Stat>
            </div>
          </div>
        </div>
        <div className="pt-6">
          <Table headers={["Name", "Id", "Timestamp", "Status"]}>
            <tbody className="bg-white divide-y divide-gray-200 overflow-y-auto">
              {currentJobs.map((job) => (
                <JobRow
                  queueName={loaderData.queueName}
                  job={job}
                  key={job.id}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </main>
    </>
  );
}

type JobRowProps = {
  queueName: string;
  job: BullJob;
};

function JobRow({ queueName, job }: JobRowProps) {
  return (
    <tr>
      <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-gray-900 sm:pl-6 text-center">
        {job.id && (
          <NavLink
            to={`../${encodeURI(queueName)}/${
              "repeated" in job
                ? `repeat/${encodeURI(job.id)}`
                : `${encodeURI(job.id)}`
            }`}
            className="text-indigo-600 hover:text-indigo-900"
          >
            {job.name}
          </NavLink>
        )}
      </td>
      <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-gray-900 sm:pl-6 text-center">
        {job.id}
      </td>
      <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-gray-900 sm:pl-6 text-center">
        {"timestamp" in job
          ? new Date(Number(job.timestamp)).toISOString()
          : ""}
      </td>
      <td className="whitespace-nowrap text-center py-4 px-4 text-sm font-medium text-gray-900 sm:pl-6">
        <div>
          <JobStatus job={job} />
        </div>
      </td>
    </tr>
  );
}
