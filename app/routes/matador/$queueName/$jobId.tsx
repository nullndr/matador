import { Anchor, Breadcrumbs, Group } from "@mantine/core";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { JobDataPanel } from "~/lib/matador/components/job-data";
import { JobInfoPanel } from "~/lib/matador/components/job-info";
import { JobResultPanel } from "~/lib/matador/components/job-result";
import { Link } from "~/lib/matador/helpers/ui-helpers";
import { getQueueJob } from "~/lib/matador/index.server";

export const loader = async ({ params }: LoaderArgs) => {
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
  const { queueName, job } = useLoaderData<typeof loader>();
  if (!("timestamp" in job)) {
    throw new Error();
  }

  const navigation = [
    {
      name: "Home",
      href: "/matador",
    },
    {
      name: "Queues",
      href: "/matador/queues",
    },
    {
      name: queueName,
      href: `/matador/${queueName}`,
    },
  ];

  if (job.id && job.id.includes("repeat")) {
    const idSplitted = job.id.split(":");

    navigation.push({
      name: job.name,
      href: `/matador/${queueName}/repeat/${idSplitted[1]}`,
    });
  }

  navigation.push({
    name: job.id!,
    href: "#",
  });

  return (
    <>
      <Group mb="md">
        <Breadcrumbs>
          {navigation.map((el, index) => (
            <Anchor key={index}>
              <Link to={el.href}>{el.name}</Link>
            </Anchor>
          ))}
        </Breadcrumbs>
      </Group>
      <JobInfoPanel
        id={job.id ?? ""}
        jobName={job.name ?? ""}
        queueName={queueName}
        timestamp={new Date(Number(job.timestamp))}
        attemptsMade={job.attemptsMade}
        processedOn={
          job.processedOn
            ? new Date(Number(job.processedOn))
            : undefined
        }
        finishedOn={
          job.finishedOn
            ? new Date(Number(job.finishedOn))
            : undefined
        }
      />

      <JobDataPanel
        parent={job.parent}
        data={job.data}
        opts={job.opts}
      />

      <JobResultPanel job={job} />
    </>
  );
}
