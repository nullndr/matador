import { Grid, Title, Group, Badge } from "@mantine/core";

export interface SectionProps {
  title: string;
  color: string;
  value: any;
}

export const Section = ({ title, color, value }: SectionProps) => {
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
          {title}
        </Title>
      </Grid.Col>
      <Grid.Col span={6}>
        <Group position="right">
          <Badge color={color} size="lg">
            {value}
          </Badge>
        </Group>
      </Grid.Col>
    </Grid>
  );
};
