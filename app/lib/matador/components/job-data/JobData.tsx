import { Card, Grid, JsonInput, Text } from "@mantine/core";

interface JobDataProps {
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
        <Grid.Col style={{ minHeight: 200 }} span={18}>
          <JsonInput
            readOnly
            size="lg"
            sx={{
              height: "100%",
              div: {
                height: "100%",
                textarea: {
                  height: "100%",
                },
              },
            }}
            value={JSON.stringify(json, undefined, 2)}
          />
        </Grid.Col>
      </Grid>
    </Card>
  );
};
