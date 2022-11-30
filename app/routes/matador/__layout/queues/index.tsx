import { Container, SimpleGrid, Text, TextInput } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import { IconSearch } from "@tabler/icons";
import React from "react";
import { QueueCard } from "~/lib/matador/components/matador/QueueCard";
import { getBullQueueNames } from "~/lib/matador/helpers";

export const loader = async () => {
  const queueNames = await getBullQueueNames();
  return { queueNames };
};

export default function Queues() {
  const { queueNames } = useLoaderData<typeof loader>();

  const [selectedQueues, setSelectedQueues] = React.useState(queueNames);

  return (
    <>
      <Container>
        <Text>Total number of queues: {queueNames.length}</Text>
        <TextInput
          icon={<IconSearch />}
          placeholder="Search queue"
          onChange={(event) => {
            const value = event.currentTarget.value;

            if (value === "") {
              setSelectedQueues(queueNames);
              return;
            }

            setSelectedQueues(queueNames.filter((q) => q.name.includes(value)));
          }}
        />
      </Container>
      <Container>
        <SimpleGrid cols={4}>
          {selectedQueues.map((queue) => (
            <QueueCard queue={queue} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
