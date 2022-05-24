import type { Processor, WorkerOptions } from "bullmq";
import {
  MetricsTime,
  Queue as BullQueue,
  QueueScheduler,
  Worker
} from "bullmq";
import {
  getSchedulerConnection,
  redis
} from "~/lib/matador/helpers/redis-helpers.server";

type RegisteredQueue = {
  queue: BullQueue;
  worker: Worker;
  scheduler: QueueScheduler;
};

declare global {
  var __registeredQeueues: Record<string, RegisteredQueue> | undefined;
}

const registeredQeueues =
  global.__registeredQeueues || (global.__registeredQeueues = {});

export const Queue = <JobPayload, JobResult = any>(
  name: string,
  handler: Processor<JobPayload, JobResult>,
  opts?: Omit<WorkerOptions, "connection">
): BullQueue<JobPayload, JobResult> => {
  if (registeredQeueues[name]) {
    return registeredQeueues[name].queue;
  }

  const queue = new BullQueue<JobPayload, JobResult>(name, {
    connection: redis,
  });
  const scheduler = new QueueScheduler(name, {
    connection: getSchedulerConnection(name),
  });
  const worker = new Worker<JobPayload, JobResult>(name, handler, {
    metrics: {
      maxDataPoints: MetricsTime.ONE_WEEK * 2,
    },
    ...opts,
    connection: redis,
  });

  worker.on("failed", (job, error) => {
    console.error(`Failed job "${job.name} <${job.id}>" with ${error}`);
  });

  worker.on("error", (error) => {
    console.error(error);
  });

  registeredQeueues[name] = { queue, scheduler, worker };
  return queue;
};
