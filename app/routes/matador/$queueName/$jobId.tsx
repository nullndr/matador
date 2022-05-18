import { LoaderFunction } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { Card } from "~/components/Matador";
import { BullJob, getQueueJob } from "~/lib/matador/index.server";

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

  let bgColor: "gray" | "white" = "white";

  const getBgColor = (color: "gray" | "white") => {
    switch (color) {
      case "gray": {
        bgColor = "white";
        return "bg-white";
      }
      case "white": {
        bgColor = "gray";
        return "bg-gray-50";
      }
    }
  };

  return (
    <>
      <Card
        title={
          <div className="bg-white px-4 py-5 sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {`Queue: ${loaderData.queueName}`}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {`Job id: ${loaderData.job.id}`}
                </p>
              </div>
              {"parent" in loaderData.job && loaderData.job.parent && (
                <div className="ml-4 mt-2 flex-shrink-0">
                  <NavLink
                    to={`./../../${
                      JSON.parse(loaderData.job.parent).queueKey.split(":")[1]
                    }/${JSON.parse(loaderData.job.parent).id}`}
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Parent job
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        }
      >
        <div className="border-2 border-solid border-gray-100 rounded-md">
          <dl>
            <div
              className={`${getBgColor(
                bgColor
              )} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
            >
              <dt className="text-sm font-medium text-gray-900">Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {loaderData.job.name}
              </dd>
            </div>
            <div
              className={`${getBgColor(
                bgColor
              )} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
            >
              <dt className="text-sm font-medium text-gray-900">Timestamp</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {new Date(Number(loaderData.job.timestamp)).toISOString()}
              </dd>
            </div>
            {"processedOn" in loaderData.job && (
              <div
                className={`${getBgColor(
                  bgColor
                )} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
              >
                <dt className="text-sm font-medium text-gray-900">
                  Processed on
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(Number(loaderData.job.processedOn)).toISOString()}
                </dd>
              </div>
            )}
            {"finishedOn" in loaderData.job && (
              <div
                className={`${getBgColor(
                  bgColor
                )} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
              >
                <dt className="text-sm font-medium text-gray-900">
                  Finished on
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {new Date(Number(loaderData.job.finishedOn)).toISOString()}
                </dd>
              </div>
            )}
            <div
              className={`${getBgColor(
                bgColor
              )} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
            >
              <dt className="text-sm font-medium text-gray-900">
                Attempts made
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {loaderData.job.attemptsMade}
              </dd>
            </div>
            {loaderData.job.parent && (
              <div
                className={`${getBgColor(
                  bgColor
                )} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
              >
                <dt className="text-sm font-medium text-gray-900">Parent</dt>
                <dd
                  className={`mt-1 text-sm text-gray-900 ${
                    bgColor === "white" ? "bg-gray-50" : "bg-white"
                  } sm:mt-0 sm:col-span-2 border-2 rounded border-gray-100`}
                >
                  <div className="m-2">
                    <pre className="overflow-auto">
                      {JSON.stringify(loaderData.job.parent, undefined, 2)}
                    </pre>
                  </div>
                </dd>
              </div>
            )}
            <div
              className={`${getBgColor(
                bgColor
              )} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
            >
              <dt className="text-sm font-medium text-gray-900">Opts</dt>
              <dd
                className={`mt-1 text-sm text-gray-900 ${
                  bgColor === "white" ? "bg-gray-50" : "bg-white"
                } sm:mt-0 sm:col-span-2 border-2 rounded border-gray-100`}
              >
                <div className="m-2">
                  <pre className="overflow-auto">
                    {JSON.stringify(loaderData.job.opts, undefined, 2)}
                  </pre>
                </div>
              </dd>
            </div>
            <div
              className={`${getBgColor(
                bgColor
              )} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
            >
              <dt className="text-sm font-medium text-gray-900">Data</dt>
              <dd
                className={`mt-1 text-sm text-gray-900 ${
                  bgColor === "white" ? "bg-gray-50" : "bg-white"
                } sm:mt-0 sm:col-span-2 border-2 rounded border-gray-100`}
              >
                <div className="m-2">
                  <pre className="overflow-auto">
                    {JSON.stringify(loaderData.job.data, undefined, 2)}
                  </pre>
                </div>
              </dd>
            </div>
          </dl>
          {
            /*
             * a null return value could still mean the job has been completed
             */
            loaderData.job.returnvalue !== undefined && (
              <div className={`${getBgColor(bgColor)} px-4 py-5`}>
                <div className="text-sm font-medium text-gray-900 pb-5">
                  Return value
                </div>
                <div className="text-sm text-gray-900 bg-green-50 border-2 rounded border-green-600">
                  <div className="m-2">
                    <pre className="overflow-auto">
                      {JSON.stringify(loaderData.job.returnvalue, undefined, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            )
          }
          {loaderData.job.failedReason && (
            <div className={`${getBgColor(bgColor)} px-4 py-5`}>
              <div className="text-sm font-medium text-gray-900 pb-5">
                Failed reason
              </div>
              <div className="text-sm text-red-600 bg-red-50 border-2 rounded border-red-600">
                <div className="m-2">
                  <pre className="overflow-auto">
                    {loaderData.job.failedReason.trim()}
                  </pre>
                </div>
              </div>
            </div>
          )}
          {loaderData.job.stacktrace && loaderData.job.stacktrace.length > 0 && (
            <div className={`${getBgColor(bgColor)} px-4 py-5`}>
              <div className="text-sm font-medium text-gray-900 pb-5">
                Stacktrace
              </div>
              <div className="text-sm text-red-600 bg-red-50 border-2 rounded border-red-600">
                <div className="m-2">
                  <pre className="overflow-auto">
                    {loaderData.job.stacktrace[0]}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
