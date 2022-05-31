import { Divider, Grid, Title, Card } from "@mantine/core";
import JobInfo from "./JobInfo";

export interface JobInfoPanelProps {
  id: string;
  queueName: string;
  jobName: string;
  timestamp: Date;
  processedOn?: Date;
  finishedOn?: Date;
  attemptsMade?: number;
}

export const JobInfoPanel = ({
  queueName,
  id,
  jobName,
  timestamp,
  processedOn,
  finishedOn,
  attemptsMade,
}: JobInfoPanelProps) => {
  return (
    <>
      <Title
        mb="sm"
        order={3}
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        })}
      >
        Job General Info
      </Title>

      <Divider mb="md" />

      <Card radius="md" withBorder={true} shadow="xl" mb="md">
        <Grid justify="center" align="center">
          <Grid.Col span={12} mt="xs">
            <JobInfo infoName="Job Id" infoValue={id} />
          </Grid.Col>

          <Grid.Col span={12} mt="sm">
            <JobInfo infoName="Job Name" infoValue={jobName} />
          </Grid.Col>

          <Grid.Col span={12} mt="sm">
            <JobInfo infoName="Timestamp" infoValue={timestamp.toISOString()} />
          </Grid.Col>

          {processedOn && (
            <Grid.Col span={12} mt="sm">
              <JobInfo
                infoName="Processed on"
                infoValue={processedOn.toISOString()}
              />
            </Grid.Col>
          )}

          {finishedOn && (
            <Grid.Col span={12} mt="sm">
              <JobInfo
                infoName="Finished on"
                infoValue={finishedOn.toISOString()}
              />
            </Grid.Col>
          )}

          {(attemptsMade !== undefined) && (
            <Grid.Col span={12} mt="sm">
              <JobInfo
                infoName="Attempts made"
                infoValue={attemptsMade.toString()}
              />
            </Grid.Col>
          )}
        </Grid>
      </Card>
    </>
  );
};
