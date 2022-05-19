# queues folder

This folder should be used to write your queues with the `queue.server.ts` utility.

Here an example:

```typescript
// file myqueue.server.ts
import { Queue } from "./queue.server";

export type JobPayload = {
  name: string;
};

export type JobResult = string;

const name = "myQueue";

export const myQueue = Queue<JobPayload, JobResult>(name, async (job) => {
  const { name } = job.data;
  return `Hello, ${name}`;
});
```

The utility takes care of both the redis connection and the `QueueScheduler`,
that are defined inside `app/lib/matador/helpers/redis-helpers.server.ts` with the env variable `REDIS_URL`.

You can add also all `WorkerOptions` options to your queue, except for `connection`.

```typescript
export const myQueue = Queue<JobPayload, JobResult>(
  name,
  async (job) => {
    const { name } = job.data;
    return `Hello, ${name}`;
  },
  {
    defaultJobOptions: {
      removeOnComplete: {
        count: 2500,
      },
      removeOnFail: {
        count: 2500,
      },
    },
  }
);
```

Keep in mind that the utility also use two weeks of metrics as described [here](https://docs.bullmq.io/guide/metrics), but this can be overridden.
