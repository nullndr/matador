import { Grid, Text, Title } from "@mantine/core";
import { useCatch } from "@remix-run/react";

import { ErrorFallback } from "~/lib/matador/components/error";
export default function Index() {
  return (
    <>
      <Grid justify="center">
        <Grid.Col>
          <Title
            sx={(theme) => ({
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,
            })}
          >
            Matador
          </Title>
        </Grid.Col>

        <Grid.Col>
          <Text
            sx={(theme) => ({
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,
            })}
          >
            A bold interface to monitor
            <Text
              variant="link"
              component="a"
              href="https://docs.bullmq.io/what-is-bullmq"
            >
              {" "}
              BullMQ{" "}
            </Text>
            queues in your application
          </Text>
        </Grid.Col>
      </Grid>
    </>
  );
}

export function ErrorBoundary() {
  const caught = useCatch();

  return <ErrorFallback error={caught} />;
}
