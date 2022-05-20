import { Divider, Grid, Title } from "@mantine/core";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { JobsTable } from "~/lib/matador/components/jobs-table";
import { StatCard } from "~/lib/matador/components/stat-card";
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

  // FIXME add status filter to table

  return (
    <>
      <Title mb='sm' order={2} sx={(theme) => ({
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      })}>
        {`Jobs in "${loaderData.queueName}" Queue`}
      </Title>
      <Divider mb='md' />
      <Grid columns={24} mb='md'>
        <Grid.Col sm={24} xs={24} md={6} lg={6} xl={6}>
          <StatCard 
            title="Completed jobs"
            value={completedJobs.length}
            color='green'
          />
        </Grid.Col>
        <Grid.Col sm={24} xs={24} md={6} lg={6} xl={6}>
          <StatCard 
            title="Children jobs"
            value={childrenJobs.length}
            color='grape'
          />
        </Grid.Col>
        <Grid.Col sm={24} xs={24} md={6} lg={6} xl={6}>
          <StatCard 
            title="Repeated jobs"
            value={repeatedJobs.length}
            color='blue'
          />
        </Grid.Col>
        <Grid.Col sm={24} xs={24} md={6} lg={6} xl={6}>
          <StatCard 
            title="Failed jobs"
            value={failedJobs.length}
            color='red'
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <JobsTable 
          jobs={currentJobs} 
          queueName={loaderData.queueName}
        />
      </Grid>
    </>
  );
}
