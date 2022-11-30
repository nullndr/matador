import { Card, Text } from "@mantine/core";
import { Link } from "@remix-run/react";
import { BullQueueNameType } from "../../types";

type QueueCardProps = { queue: BullQueueNameType };

export function QueueCard({ queue }: QueueCardProps) {
  const { name, prefix } = queue;
  return (
    <Link to={encodeURI(`/queues/${name}`)}>
      <Card
        withBorder
        radius="md"
        p="xl"
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[6],
        })}
      >
        <Text>
          {prefix && <Text className="inline text-sm">{`${prefix}:`}</Text>}
          {name}
        </Text>
      </Card>
    </Link>
  );
}
