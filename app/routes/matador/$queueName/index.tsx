import {
  Anchor,
  Breadcrumbs,
  Divider,
  Grid,
  Group,
  Title,
} from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { JobsTable } from "~/lib/matador/components/jobs-table";
import { StatCard } from "~/lib/matador/components/stat-card";
import { Link } from "~/lib/matador/helpers/ui-helpers";
import type { Job, RepeatableJob } from "~/lib/matador/index.server";
import { getQueueJobs, getQueues } from "~/lib/matador/index.server";
import type { JobStatus } from "~/lib/matador/types/JobStatus";
import { JobStatuses } from "~/lib/matador/types/JobStatus";

type LoaderData = {
  queueName: string;
  jobs: (Job | RepeatableJob)[];
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

export default function QueueDetail() {
  const loaderData = useLoaderData<LoaderData>();

  const jobs: Job[] = ((): Job[] => {
    const repeated = loaderData.jobs.filter((el) =>
      el.id?.startsWith("repeat")
    );
    const temp: any = {};

    repeated.forEach((el) => {
      const splitted = el.id?.split(":");

      if (!splitted) {
        return;
      }

      if (!temp[splitted[1]]) {
        el.id = `${splitted[0]}:${splitted[1]}`;

        temp[splitted[1]] = el;
      }
    });

    const jobs = [
      ...loaderData.jobs.filter((el) => !el.id?.startsWith("repeat")),
    ];

    Object.keys(temp).forEach((el) => {
      jobs.push(temp[el]);
    });

    return jobs;
  })();

  const completedJobs = jobs.filter(
    (job) =>
      !job.id?.includes("repeat") &&
      "returnvalue" in job &&
      !("parentKey" in job) &&
      !("failedReason" in job)
  );

  const childrenJobs = jobs.filter((job) => "parentKey" in job);
  const repeatedJobs = jobs.filter((job) => job.id?.includes("repeat"));
  const failedJobs = jobs.filter((job) => "failedReason" in job);

  const [currentJobs, setCurrentJobs] = useState<Job[]>(jobs);
  const [statusesSelected, setStatusesSelected] = useState<JobStatus[]>(
    JobStatuses as JobStatus[]
  );

  const onFilterStatuses = (statuses: JobStatus[]) => {
    setStatusesSelected(statuses);

    const jobs: Job[] = [];

    statuses.forEach((el) => {
      if (el === "children") {
        jobs.push(...childrenJobs);
      }

      if (el === "completed") {
        jobs.push(...completedJobs);
      }

      if (el === "failed") {
        jobs.push(...failedJobs);
      }

      if (el === "repeated") {
        jobs.push(...repeatedJobs);
      }
    });

    setCurrentJobs(jobs);
  };

  return (
    <>
      <Group mb="md">
        <Breadcrumbs>
          <Anchor>
            <Link to="/matador">Home</Link>
          </Anchor>
          <Anchor>
            <Link to="/matador/queues">Queues</Link>
          </Anchor>
          <Anchor>
            <Link to="#">{loaderData.queueName}</Link>
          </Anchor>
        </Breadcrumbs>
      </Group>
      <Title
        mb="sm"
        order={2}
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        })}
      >
        {`Jobs in "${loaderData.queueName}" Queue`}
      </Title>
      <Divider mb="md" />
      <Grid columns={24} mb="md">
        <Grid.Col sm={24} xs={24} md={6} lg={6} xl={6}>
          <StatCard
            title="Completed jobs"
            value={completedJobs.length}
            color="green"
          />
        </Grid.Col>
        <Grid.Col sm={24} xs={24} md={6} lg={6} xl={6}>
          <StatCard
            title="Children jobs"
            value={childrenJobs.length}
            color="grape"
          />
        </Grid.Col>
        <Grid.Col sm={24} xs={24} md={6} lg={6} xl={6}>
          <StatCard
            title="Repeated jobs"
            value={repeatedJobs.length}
            color="blue"
          />
        </Grid.Col>
        <Grid.Col sm={24} xs={24} md={6} lg={6} xl={6}>
          <StatCard title="Failed jobs" value={failedJobs.length} color="red" />
        </Grid.Col>
      </Grid>

      <Grid>
        <JobsTable
          jobs={currentJobs}
          queueName={loaderData.queueName}
          onStatusesSelected={onFilterStatuses}
          statusSelected={statusesSelected}
        />
      </Grid>
    </>
  );
}
