import Redis from "ioredis";
import { BullQueueNameType } from "../types";

let bull_connection: Redis;

export const getBullConnection = () => {
  if (bull_connection) {
    return bull_connection;
  }

  bull_connection = new Redis();
  return bull_connection;
};

export const getBullQueueNames = async (
  prefix?: string,
): Promise<BullQueueNameType[]> => {
  const connection = getBullConnection();
  // should be better to use the pattern with the `:id` but
  // these keys will be there only when a worker starts to process a job,
  // so queues with no jobs will not result here
  const bullKeys = await connection.keys(
    prefix ? `${prefix}:*:meta` : "bull:*:meta",
  );
  return bullKeys.map((key) => {
    const [prefix, name] = key.split(":");

    if (prefix === "bull") {
      return {
        name,
      };
    }

    return {
      name,
      prefix,
    };
  });
};
