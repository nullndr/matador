import {
  Anchor,
  Breadcrumbs,
  Card,
  Divider,
  Grid,
  Group,
  Title,
} from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import { Section } from "~/lib/matador/components";
import { Link } from "~/lib/matador/helpers/ui-helpers";
import { getRedisInfo } from "~/lib/matador/index.server";

export const loader = async () => {
  if (!global.__redis) {
    throw new Response("Redis connection not found", {
      status: 503,
      statusText: "a redis connection has not been found",
    });
  }

  return getRedisInfo(global.__redis);
};

export default function RedisServerInfo() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <>
      <Group mb="md">
        <Breadcrumbs>
          <Anchor>
            <Link to="/matador">Home</Link>
          </Anchor>
          <Anchor>
            <Link to="#">Redis</Link>
          </Anchor>
        </Breadcrumbs>
      </Group>
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
