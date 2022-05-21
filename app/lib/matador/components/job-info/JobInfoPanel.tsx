import { Divider, Grid, Title } from "@mantine/core";
import JobInfo from "./JobInfo";
import JobInfoPanelProps from "./JobInfoPanelProps";

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

      <Grid columns={24} mb="md">
        <Grid.Col sm={24} xs={24} md={12} lg={12} xl={12}>
          <Grid>
            <JobInfo infoName="Queue" infoValue={queueName} />
            <JobInfo infoName="Job Id" infoValue={id} />
            <JobInfo infoName="Job Name" infoValue={jobName} />
          </Grid>
        </Grid.Col>
        <Grid.Col sm={24} xs={24} md={12} lg={12} xl={12}>
          <Grid>
            <JobInfo infoName="Timestamp" infoValue={timestamp.toISOString()} />
            {processedOn && (
              <JobInfo
                infoName="Processed on"
                infoValue={processedOn.toISOString()}
              />
            )}
            {finishedOn && (
              <JobInfo
                infoName="Finished on"
                infoValue={finishedOn.toISOString()}
              />
            )}
            <JobInfo
              infoName="Attempts made"
              infoValue={attemptsMade?.toString() ?? "0"}
            />
          </Grid>
        </Grid.Col>
      </Grid>
    </>
  );
};
