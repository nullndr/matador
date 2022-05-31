import type { MantineColor } from "@mantine/core";
import { Grid, Title, Group, Badge } from "@mantine/core";

export interface JobInfoProps {
  infoName: string;
  infoValue: string;
  color?: MantineColor;
}

const JobInfo = ({ infoName, infoValue, color }: JobInfoProps) => {
  const colors: MantineColor[] = [
    "blue",
    "grape",
    "indigo",
    "green",
    "red",
    "cyan",
    "orange",
  ];

  return (
    <Grid>
      <Grid.Col span={6}>
        <Title
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
          order={4}
        >
          {infoName}
        </Title>
      </Grid.Col>
      <Grid.Col span={6}>
        <Group position="right">
          <Badge
            color={color ?? colors[Math.floor(Math.random() * colors.length)]}
            size="lg"
          >
            {" "}
            {infoValue}{" "}
          </Badge>
        </Group>
      </Grid.Col>
    </Grid>
  );
};

export default JobInfo;
