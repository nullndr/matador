import type { Processor, QueueOptions, WorkerOptions } from "bullmq";
import {
  MetricsTime,
  Queue as BullQueue,
  QueueScheduler,
  Worker,
} from "bullmq";
import {
  getSchedulerConnection,
  redis,
} from "~/lib/matador/helpers/redis-helpers.server";

type RegisteredQueue = {
  queue: BullQueue;
  worker: Worker;
  scheduler: QueueScheduler;
};

type Queues = {
  [queueName: string]: RegisteredQueue;
};

declare global {
  var __registeredQeueues: Queues | undefined;
}

const registeredQeueues =
  global.__registeredQeueues || (global.__registeredQeueues = {});

/**
 * A function utility that help to create a BullMQ queue.
 *
 * The Redis connection for the queue, the scheduler and the worker is automatically handled by the utility.
 *
 * For more info about the connection, please see [here](https://docs.bullmq.io/guide/connections).
 *
 * @param name the queue name
 * @param handler the function that handles jobs
 * @param queueOptions optional, default options for the queue
 * @param workerOptions optional, default options for the worker
 * @return queue, the queue that the function created.
 */
export const Queue = <JobPayload, JobResult = any>(
  name: string,
  handler: Processor<JobPayload, JobResult>,
  queueOptions?: Omit<QueueOptions, "connection">,
  workerOptions?: Omit<WorkerOptions, "connection">
): BullQueue<JobPayload, JobResult> => {
  if (registeredQeueues[name]) {
    return registeredQeueues[name].queue;
  }

  const queue = new BullQueue<JobPayload, JobResult>(name, {
    ...queueOptions,
    connection: redis,
  });

  const scheduler = new QueueScheduler(name, {
    connection: getSchedulerConnection(name),
  });

  const worker = new Worker<JobPayload, JobResult>(name, handler, {
    metrics: {
      maxDataPoints: MetricsTime.ONE_WEEK * 2,
    },
    ...workerOptions,
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
