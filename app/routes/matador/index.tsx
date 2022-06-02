import { Breadcrumbs, Grid, Group, Text, Title } from "@mantine/core";
import { Link } from "~/lib/matador/helpers/ui-helpers";

export default function Index() {
  return (
    <>
      <Group mb="md">
        <Breadcrumbs>
          <Link to="#">Home</Link>
        </Breadcrumbs>
      </Group>
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
