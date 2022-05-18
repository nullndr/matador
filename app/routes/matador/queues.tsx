import { LoaderFunction } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { Stat } from "~/components/Matador";
import { Link } from "~/components/Matador/ui/Link";
import { getQueues, getRedisInfo, RedisInfo } from "~/lib/matador/index.server";

type LoaderData = { queues: string[]; serverInfo: RedisInfo };

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  if (!global.__redis) {
    throw new Response("Redis connection not found", {
      status: 503,
      statusText: "a redis connection has not been found",
    });
  }
  const queues = await getQueues(global.__redis);
  const serverInfo = await getRedisInfo(global.__redis);
  return { queues, serverInfo };
};

type DashboardProps = {};

export default function Dashboard({}: DashboardProps) {
  const loaderData = useLoaderData<LoaderData>();
  return (
    <>
      <div className="mx-auto">
        <div className="px-4 sm:px-0">
          <div className={`grid gap-5 grid-cols-3`}>
            <NavLink to="../redis">
              <Stat key="redisVersion">
                <div className="text-base font-normal text-gray-900">
                  {"Redis version"}
                </div>
                <div className="mt-1 flex justify-between items-baseline md:block lg:flex">
                  <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                    {loaderData.serverInfo.Server.redis_version}
                  </div>
                </div>
              </Stat>
            </NavLink>
            <NavLink to="../redis">
              <Stat key="redisMode">
                <div className="text-base font-normal text-gray-900">
                  {"Mode"}
                </div>
                <div className="mt-1 flex justify-between items-baseline md:block lg:flex">
                  <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                    {loaderData.serverInfo.Server.redis_mode}
                  </div>
                </div>
              </Stat>
            </NavLink>
            <NavLink to="../clients">
              <Stat key="connectedClients">
                <div className="text-base font-normal text-gray-900">
                  {"Connected clients"}
                </div>
                <div className="mt-1 flex justify-between items-baseline md:block lg:flex">
                  <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
                    {loaderData.serverInfo.Clients.connected_clients}
                  </div>
                </div>
              </Stat>
            </NavLink>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold leading-tight text-gray-900 py-6">
        Queues
      </h1>
      <div className="mx-auto">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {loaderData.queues.map((queue) => (
            <li
              key={queue}
              className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <Link
                to={`../${encodeURI(queue)}`}
                className="text-indigo-600 hover:text-indigo-900"
              >
                <div className="w-full flex items-center justify-between p-6 space-x-6">
                  <div className="flex-1 truncate">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-sm font-medium truncate">{queue}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
