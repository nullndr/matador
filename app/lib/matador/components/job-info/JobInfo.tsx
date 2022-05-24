import type { MantineColor } from "@mantine/core";
import { Grid } from "@mantine/core";
import { StatCard } from "../stat-card";

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
    <Grid.Col span={12}>
      <StatCard
        title={infoName}
        value={infoValue}
        color={color ?? colors[Math.floor(Math.random() * colors.length)]}
      />
    </Grid.Col>
  );
};

export default JobInfo;
