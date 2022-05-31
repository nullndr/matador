import { Divider, Grid, Title } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import React from "react";
import { StatCard } from "~/lib/matador/components/stat-card";
import type { RedisInfo } from "~/lib/matador/index.server";
import { getRedisInfo } from "~/lib/matador/index.server";
import { ErrorFallback } from "~/lib/matador/components/error";

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

export default function RedisServerInfo() {
  const loaderData = useLoaderData<LoaderData>();

  return (
    <>
      {Object.keys(loaderData).map((section, index) => (
        <React.Fragment key={index}>
          <Title
            mb="sm"
            order={2}
            sx={(theme) => ({
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,
            })}
          >
            {section}
          </Title>

          <Divider mb="md" />

          <Grid columns={24} mb="md">
            {Object.keys(loaderData[section]).map((key, index) => (
              <Grid.Col key={key} span={24}>
                <StatCard
                  title={key}
                  value={loaderData[section][key]}
                  color={index % 2 == 0 ? "blue" : "green"}
                />
              </Grid.Col>
            ))}
          </Grid>
        </React.Fragment>
      ))}
    </>
  );
}

export function ErrorBoundary() {
  const caught = useCatch();

  return <ErrorFallback error={caught} />;
}
