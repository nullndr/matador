import {
  Anchor,
  Breadcrumbs,
  Card as MantineCard,
  Center,
  Divider,
  Grid,
  Group,
  Title,
} from "@mantine/core";
import { NavLink, useLoaderData } from "@remix-run/react";
import { StatCard } from "~/lib/matador/components/stat-card";
import { Link } from "~/lib/matador/helpers/ui-helpers";
import { getQueues, getRedisInfo } from "~/lib/matador/index.server";

export const loader = async () => {
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

export default function Dashboard() {
  const { queues, serverInfo } = useLoaderData<typeof loader>();
  return (
    <>
      <Group mb="md">
        <Breadcrumbs>
          <Anchor>
            <Link to="/matador">Home</Link>
          </Anchor>
          <Anchor>
            <Link to="#">Queues</Link>
          </Anchor>
        </Breadcrumbs>
      </Group>
      <Grid columns={24} mt="sm" mb="lg">
        <Grid.Col sm={24} xs={24} md={8} lg={8} xl={8}>
          <NavLink to="../redis">
            <StatCard
              title="Redis version"
              value={serverInfo.Server.redis_version}
              color="red"
            />
          </NavLink>
        </Grid.Col>
        <Grid.Col sm={24} xs={24} md={8} lg={8} xl={8}>
          <NavLink to="../redis">
            <StatCard
              title="Redis Mode"
              value={serverInfo.Server.redis_mode}
              color="grape"
            />
          </NavLink>
        </Grid.Col>
        <Grid.Col sm={24} xs={24} md={8} lg={8} xl={8}>
          <NavLink to="../clients">
            <StatCard
              title="Connected Clients"
              value={serverInfo.Clients.connected_clients}
              color="green"
            />
          </NavLink>
        </Grid.Col>
      </Grid>

      <Title
        mb="sm"
        order={2}
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        })}
      >
        Queues
      </Title>

      <Divider mb="md" />

      {queues.length === 0 ? (
        <Center>
          <Title
            order={3}
            sx={(theme) => ({
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,
            })}
          >
            No BullMQ Queues
          </Title>
        </Center>
      ) : (
        <Grid columns={24} mt="sm">
          {queues.map((queue, index) => (
            <Grid.Col key={index} sm={24} xs={24} md={8} lg={8} xl={8}>
              <Link to={`../${encodeURI(queue)}`}>
                <MantineCard radius="md" withBorder={true} shadow="xl">
                  <Title order={5}>{queue}</Title>
                </MantineCard>
              </Link>
            </Grid.Col>
          ))}
        </Grid>
      )}
    </>
  );
}
