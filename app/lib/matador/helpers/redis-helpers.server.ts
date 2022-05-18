import type { Redis as RedisType, RedisOptions } from "ioredis";
import Redis from "ioredis";

let redis: RedisType;

declare global {
  var __redis: RedisType | undefined;
  var __queueRedisSchedulerMap: QueueRedisScheduler | undefined;
}

const redisOptions: RedisOptions = {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};

type QueueRedisScheduler = {
  [queueName: string]: RedisType;
};

let queueRedisSchedulerMap: QueueRedisScheduler = {};

const getSchedulerConnection = (queueName: string) => {
  if (!queueRedisSchedulerMap[queueName]) {
    queueRedisSchedulerMap[queueName] = new Redis(
      // @ts-ignore
      process.env.REDIS_URL,
      redisOptions
    );
  }
  return queueRedisSchedulerMap[queueName];
};

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the Redis with every change either.
if (process.env.NODE_ENV === "production") {
  // @ts-ignore
  redis = new Redis(process.env.REDIS_URL, redisOptions);
} else {
  if (!global.__redis) {
    // @ts-ignore
    global.__redis = new Redis(process.env.REDIS_URL, redisOptions);
  }

  if (!global.__queueRedisSchedulerMap) {
    global.__queueRedisSchedulerMap = {};
  }
  redis = global.__redis;
  queueRedisSchedulerMap = global.__queueRedisSchedulerMap;
}

export { redis, getSchedulerConnection };
