import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card } from "~/components/Matador";
import { getRedisInfo, RedisInfo } from "~/lib/matador/index.server";

type LoaderData = RedisInfo;

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  if (!global.__redis) {
    throw new Response("Redis connection not found", {
      status: 503,
      statusText: "a redis connection has not been found",
    });
  }

  return await getRedisInfo(global.__redis);
};

export default function RedisInfo() {
  const loaderData = useLoaderData<LoaderData>();
  return (
    <>
      <main>
        {Object.keys(loaderData).map((sectionKey) => (
          <div className="pb-4">
            <Card title={sectionKey}>
              <div className="border-2 border-solid border-gray-100 rounded-md">
                {Object.keys(loaderData[sectionKey]).map((key, index) => (
                  <div
                    className={`${
                      index % 2 == 0 ? "bg-gray-50" : "bg-white"
                    } px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}
                  >
                    <div className="text-sm font-medium text-gray-500">
                      {key}
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {loaderData[sectionKey][key]}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </main>
    </>
  );
}
