import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card } from "~/components/Matador";
import { getRedisClients } from "~/lib/matador/index.server";

type LoaderData = string;

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  if (!global.__redis) {
    throw new Response("Redis connection not found", {
      status: 503,
      statusText: "a redis connection has not been found",
    });
  }

  return await getRedisClients(global.__redis);
};

export default function Clients() {
  const loaderData = useLoaderData<LoaderData>();
  return (
    <>
      <Card title="Redis clients">
        <div className="text-sm text-gray-900 bg-gray-50 border-2 border-gray-100 rounded">
          <div className="m-2 overflow-auto">
            <pre>{loaderData}</pre>
          </div>
        </div>
      </Card>
    </>
  );
}
