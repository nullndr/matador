import { Card, Grid, Text, Textarea } from "@mantine/core";

export interface JobDataProps {
  title: string;
  json: any;
}

export const JobData = ({ title, json }: JobDataProps) => {
  return (
    <Card radius="md" withBorder={true} shadow="xl" mb="md">
      <Grid columns={24}>
        <Grid.Col span={6}>
          <Text>{title}</Text>
        </Grid.Col>
        <Grid.Col span={18}>
          <Textarea
            required={false}
            variant="filled"
            size="md"
            value={JSON.stringify(json, undefined, 4)}
            readOnly
            autosize
            sx={{
              textarea: {
                fontWeight: 600,
              },
            }}
          />
        </Grid.Col>
      </Grid>
    </Card>
  );
};
