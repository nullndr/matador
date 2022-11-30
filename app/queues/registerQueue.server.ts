import { Processor, Queue, QueueOptions, Worker, WorkerOptions } from "bullmq";

export const registerQueue = <JobData, JobResult>(
  queueName: string,
  processor: Processor<JobData, JobResult>,
  queueOptions?: QueueOptions,
  workerOptions?: WorkerOptions,
) => {
  const queue = new Queue<JobData, JobResult>(queueName, {
    ...queueOptions,
  });

  const worker = new Worker(queueName, processor, {
    ...workerOptions,
  });

  return { queue, worker };
};
