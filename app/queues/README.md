## Queues folder

Put all your bullmq queues inside this folder in order to keep your project
organized.

## registerQueue

The `registerQueue` function can help you to easily create a queue and a worker
for it:

```ts
type JobData = {
  foo: string;
};

type JobResult = {
  bar: number;
};

const { queue, worker } = registerQueue<JobData, JobResult>(
  "my new queue",
  async (job) => {
    console.log(job.data.foo);
    return {
      bar: 0,
    };
  },
);
```

You can also pass options to the queue and the worker:

```ts
type JobData = {
  foo: string;
};

type JobResult = {
  bar: number;
};

const { queue, worker } = registerQueue<JobData, JobResult>(
  "my new queue",
  async (job) => {
    console.log(job.data.foo);
    return {
      bar: 0,
    };
  },
  { // options for the queue
    prefix: "matador", 
  },
  { // options for the worker
    limiter: {
      max: 50,
      duration: 1,
    },
  },
);
```
