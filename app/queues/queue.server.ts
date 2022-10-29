import type {
  Processor,
  QueueOptions,
  WorkerListener,
  WorkerOptions,
} from "bullmq";
import { MetricsTime, Queue as BullQueue, Worker } from "bullmq";
import { redis } from "~/lib/matador/helpers/redis-helpers.server";

type RegisteredQueue = {
  queue: BullQueue;
  worker: Worker;
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
 * A function utility that helps you to create a BullMQ queue.
 *
 * The Redis connection for the queue and the worker are automatically handled by the utility.
 *
 * For more info about the connection, please see [here](https://docs.bullmq.io/guide/connections).
 *
 * @return queue, the queue that the function created.
 */
export const Queue = <JobPayload, JobResult = any>(
  name: string,
  handler: Processor<JobPayload, JobResult>,
  queueOptions?: Omit<QueueOptions, "connection">,
  workerOptions?: Omit<WorkerOptions, "connection">,
  on?: WorkerListener<JobPayload, JobResult, string>
): BullQueue<JobPayload, JobResult> => {
  if (registeredQeueues[name]) {
    return registeredQeueues[name].queue;
  }

  const queue = new BullQueue<JobPayload, JobResult>(name, {
    ...queueOptions,
    connection: redis,
  });

  const worker = new Worker<JobPayload, JobResult>(name, handler, {
    metrics: {
      maxDataPoints: MetricsTime.ONE_WEEK * 2,
    },
    ...workerOptions,
    connection: redis,
  });

  if (on) {
    const keys = Object.keys(on) as (keyof typeof on)[];
    keys.map((key) => {
      worker.on(key, on[key]);
    });
  }

  registeredQeueues[name] = { queue, worker };
  return queue;
};
