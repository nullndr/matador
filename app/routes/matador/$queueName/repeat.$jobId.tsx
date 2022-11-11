import {
  Anchor,
  Breadcrumbs,
  Divider,
  Grid,
  Group,
  Title,
} from "@mantine/core";
import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { JobsTable } from "~/lib/matador/components/jobs-table";
import { StatCard } from "~/lib/matador/components/stat-card";
import { Link } from "~/lib/matador/helpers/ui-helpers";
import type { Job } from "~/lib/matador/index.server";
import { getRepeatableQueueJobs } from "~/lib/matador/index.server";
import type { JobStatus } from "~/lib/matador/types/JobStatus";
import { JobStatuses } from "~/lib/matador/types/JobStatus";

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

  const jobs = await getRepeatableQueueJobs(queueName, jobId);
  return { queueName, jobs };
};

export default function QueueDetail() {
  const { jobs, queueName } = useLoaderData<typeof loader>();
  const completedJobs = jobs.filter(
    (job) =>
      "returnvalue" in job && !("parentKey" in job) && !("failedReason" in job)
  );
  const childrenJobs = jobs.filter((job) => "parentKey" in job);
  const failedJobs = jobs.filter((job) => "failedReason" in job);
  const [currentJobs, setCurrentJobs] = useState(jobs);
  const [statusesSelected, setStatusesSelected] = useState<JobStatus[]>(
    JobStatuses.filter((el) => el != "repeated") as JobStatus[]
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
            <Link to={`/matador/${queueName}`}>
              {queueName}
            </Link>
          </Anchor>
          <Anchor>
            <Link to={"#"}>{jobs[0].name}</Link>
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
        {`Repeated Jobs "${jobs[0].name}" of "${queueName}" Queue`}
      </Title>
      <Divider mb="md" />
      <Grid columns={24} mb="md">
        <Grid.Col sm={24} xs={24} md={8} lg={8} xl={8}>
          <StatCard
            title="Completed jobs"
            value={completedJobs.length}
            color="green"
          />
        </Grid.Col>
        <Grid.Col sm={24} xs={24} md={8} lg={8} xl={8}>
          <StatCard
            title="Children jobs"
            value={childrenJobs.length}
            color="grape"
          />
        </Grid.Col>
        <Grid.Col sm={24} xs={24} md={8} lg={8} xl={8}>
          <StatCard title="Failed jobs" value={failedJobs.length} color="red" />
        </Grid.Col>
      </Grid>

      <Grid>
        <JobsTable
          jobs={currentJobs}
          queueName={queueName}
          onStatusesSelected={onFilterStatuses}
          repeatJobs={true}
          statusSelected={statusesSelected}
        />
      </Grid>
    </>
  );
}
