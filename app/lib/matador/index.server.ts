import { Queue } from "bullmq";
import Redis from "ioredis";
import { redis } from "~/lib/matador/helpers/redis-helpers.server";

export type RedisInfo = {
  [sectionTitle: string]: {
    [fieldKey: string]: string;
  };
};

export const getRedisInfo = async (redis: Redis): Promise<RedisInfo> => {
  const redisInfo: RedisInfo = {};
  const rawRedisInfo = await redis.info();
  let currentSection = "";
  for (const line of rawRedisInfo.split("\r\n").filter((line) => line !== "")) {
    if (line.startsWith("#")) {
      currentSection = line.split(" ")[1];
      redisInfo[currentSection] = {};
    } else {
      const [key, value] = line.split(":");
      redisInfo[currentSection][key] = value;
    }
  }
  return redisInfo;
};

export const getQueues = async (redis: Redis): Promise<string[]> => {
  const bullRedisKeys = await getRedisKeys(redis, "bull:*");

  const queues: string[] = [];
  bullRedisKeys.forEach((key) => {
    const name = key.split(":")[1];
    if (queues.includes(name)) {
      return;
    }
    queues.push(name);
  });

  return queues;
};

export type Job = {
  name?: string;
  data?: any;
  opts?: any;
  id?: string;
  progress?: number | object;
  returnvalue?: any;
  stacktrace?: string[];
  timestamp?: number;
  attemptsMade?: number;
  failedReason?: string;
  finishedOn?: number;
  processedOn?: number;
  parentKey?: string;
  parent?: any;
};

export type RepeatedJob = {
  jobs: Job[];
  id: string;
  name: string;
  repeated: true;
};

export type BullJob = Job | RepeatedJob;

export const getQueueJobs = async (queueName: string): Promise<BullJob[]> => {
  const queue = new Queue(queueName, { connection: redis });
  const jobs: BullJob[] = [];
  const queueJobs = await queue.getJobs();

  for (const queueJob of queueJobs) {
    if (queueJob.id) {
      if (queueJob.id.startsWith("repeat:")) {
        const jobId = queueJob.id.split(":")[1];
        if (jobs.some((job) => job.id === jobId)) {
          /*
           * If the job id is found into the list,
           * we need to add the jobs into the list of repeated jobs
           */
          const index = jobs.findIndex((job) => job.id === jobId);
          const repeatedJob = jobs[index];

          if (isRepeatedJob(repeatedJob)) {
            repeatedJob.jobs.push(queueJob);
          }
        } else {
          /*
           * If the job id is not found into the list, then we need to add it
           */
          const name = queueJob.name.split("]")[1].trim();
          jobs.push({ id: jobId, name, jobs: [queueJob], repeated: true });
        }
      } else {
        jobs.push(queueJob);
      }
    }
  }

  return jobs;
};

const isRepeatedJob = (value: BullJob): value is RepeatedJob => {
  return !("timestamp" in value);
};

export const getRepeatableQueueJobs = async (
  queueName: string,
  jobId: string
): Promise<Job[]> => {
  const queue = new Queue(queueName, { connection: redis });
  const delayedJobs = await queue.getJobs("delayed");

  return delayedJobs.filter(
    (job) => job.id?.includes("repeat") && job.id.includes(jobId)
  );
};

export const getRedisClients = async (redis: Redis): Promise<string> => {
  return (await redis.client("LIST")) as string;
};

export const getQueueJob = async (
  queueName: string,
  jobId: string
): Promise<Job | undefined> => {
  const queue = new Queue(queueName, { connection: redis });

  if (jobId.includes("repeat")) {
    const delayedJobs = await queue.getJobs("delayed");
    const index = delayedJobs.findIndex((job) => job.id === jobId);
    return delayedJobs[index];
  }

  return await queue.getJob(jobId);
};

const getRedisKeys = async (redis: Redis, pattern: string) => {
  let [cursor, cursorKeys] = await redis.scan(
    0,
    "MATCH",
    pattern,
    "COUNT",
    1000,
    "TYPE",
    "hash"
  );
  const keys = cursorKeys;
  while (cursor !== "0") {
    [cursor, cursorKeys] = await redis.scan(
      cursor,
      "MATCH",
      pattern,
      "COUNT",
      1000,
      "TYPE",
      "hash"
    );
    keys.push(...cursorKeys);
  }
  return keys;
};

export const getMatadorVersion = () => {
  return process.env.MATADOR_VERSION;
};
