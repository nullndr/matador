import { Divider, Grid, Title, Card } from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import type { RedisInfo } from "~/lib/matador/index.server";
import { getRedisInfo } from "~/lib/matador/index.server";
import { Section } from "~/lib/matador/components";

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
      {Object.keys(loaderData).map((section, index) => {
        if (Object.keys(loaderData[section]).length === 0) {
          return <></>;
        }

        return (
          <Card mb="md" withBorder radius="md" key={index}>
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
                  <Section
                    title={key}
                    color={index % 2 == 0 ? "blue" : "green"}
                    value={loaderData[section][key]}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Card>
        );
      })}
    </>
  );
}
