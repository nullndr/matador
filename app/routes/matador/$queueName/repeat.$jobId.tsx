import { Divider, Grid, Title } from "@mantine/core";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { JobsTable } from "~/components/Matador/jobs-table";
import { StatCard } from "~/components/Matador/stat-card";
import { getRepeatableQueueJobs, Job } from "~/lib/matador/index.server";

type LoaderData = {
  queueName: string;
  jobs: Job[];
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

  const jobs = await getRepeatableQueueJobs(queueName, jobId);
  return { queueName, jobs };
};

type QueueDetailProps = {};

export default function QueueDetail({}: QueueDetailProps) {
  const loaderData = useLoaderData<LoaderData>();
  const completedJobs = loaderData.jobs.filter(
    (job) => "returnvalue" in job && !("parentKey" in job)
  );
  const childrenJobs = loaderData.jobs.filter((job) => "parentKey" in job);
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
        <Grid.Col sm={24} xs={24} md={8} lg={8} xl={8}>
          <StatCard 
            title="Completed jobs"
            value={completedJobs.length}
            color='green'
          />
        </Grid.Col>
        <Grid.Col sm={24} xs={24} md={8} lg={8} xl={8}>
          <StatCard 
            title="Children jobs"
            value={childrenJobs.length}
            color='grape'
          />
        </Grid.Col>
        <Grid.Col sm={24} xs={24} md={8} lg={8} xl={8}>
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
          repeatJobs
        />
      </Grid>
    </>
  );
}
