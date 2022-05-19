import { Center, Title, Text, Grid } from "@mantine/core";

type IndexProps = {};

export default function Index({}: IndexProps) {
  return (
    <>
      <Grid justify='center'>
        <Grid.Col>
          <Title sx={(theme) => ({
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          }) } >Matador</Title>
        </Grid.Col>
        
        <Grid.Col>
          <Text sx={(theme) => ({
            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          })} >
            A bold interface to monitor
             <Text variant="link" component="a" href="https://docs.bullmq.io/what-is-bullmq"> BullMQ </Text> 
            queues in your application
          </Text>
        </Grid.Col>
      </Grid>
    </>
  );
}
