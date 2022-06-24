import {
  Anchor,
  Breadcrumbs,
  Card,
  Divider,
  Group,
  Table,
  Title,
  Tooltip,
} from "@mantine/core";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Dot from "~/lib/matador/components/dot";
import { Link } from "~/lib/matador/helpers/ui-helpers";
import { getRedisClients } from "~/lib/matador/index.server";

type LoaderData = string;

type ClientInfo = {
  [name: string]: string;
};

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

  const clients = loaderData.split("\n").filter((el) => el !== "");

  const infoNeeded: ClientInfo[] = clients.map((el) => {
    const splitted = el.split(" ");

    const mappedInfos = splitted.map((el) => {
      const i = el.split("=");

      return {
        key: i[0],
        value: i[1],
      };
    });

    const regex = /\b(name|id|addr|user)\b/;

    const infoNeeded = mappedInfos.filter((el) => regex.test(el.key));

    return infoNeeded.reduce((a, v) => ({ ...a, [v.key]: v.value }), {});
  });

  return (
    <>
      <Group mb="md">
        <Breadcrumbs>
          <Anchor>
            <Link to="/matador">Home</Link>
          </Anchor>
          <Anchor>
            <Link to="#">Clients</Link>
          </Anchor>
        </Breadcrumbs>
      </Group>
      <Title
        mb="sm"
        order={2}
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        })}
      >
        Redis clients
      </Title>
      <Divider mb="lg" />

      <Card>
        <Table horizontalSpacing="xl">
          <thead>
            <tr>
              <th>Status</th>
              <th>Id</th>
              <th>Address</th>
              <th>Name</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {infoNeeded.map((el, index) => (
              <tr key={index}>
                <td>
                  <Tooltip label="Active">
                    <Dot />
                  </Tooltip>
                </td>
                {Object.keys(el).map((key) => (
                  <td key={el[key]}>{el[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
