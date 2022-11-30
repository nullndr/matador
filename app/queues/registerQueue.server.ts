import { Processor, Queue, QueueOptions, Worker, WorkerOptions } from "bullmq";
import { getBullConnection } from "~/lib/matador/helpers";

export const registerQueue = <JobData, JobResult>(
  queueName: string,
  processor: Processor<JobData, JobResult>,
  queueOptions?: Omit<QueueOptions, "connection">,
  workerOptions?: Omit<WorkerOptions, "connection">,
) => {
  const connection = getBullConnection();
  const queue = new Queue<JobData, JobResult>(queueName, {
    connection,
    ...queueOptions,
  });

  const worker = new Worker(queueName, processor, {
    connection,
    ...workerOptions,
  });

  return { queue, worker };
};
