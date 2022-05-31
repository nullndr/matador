import { Card, Textarea } from "@mantine/core";

export interface JobResultProps {
  label: string;
  value: string;
  color?: string;
  textColor?: string;
  borderColor?: string;
}

const JobResult = ({
  label,
  value,
  color,
  textColor,
  borderColor,
}: JobResultProps) => {
  return (
    <>
      <Card radius="md" withBorder={true} shadow="xl" mb="md">
        <Textarea
          label={label}
          required={false}
          variant="filled"
          size="md"
          value={value}
          readOnly
          autosize
          sx={{
            textarea: {
              backgroundColor: color,
              color: textColor,
              borderColor: borderColor,
              fontWeight: 600,
            },
          }}
        />
      </Card>
    </>
  );
};

export default JobResult;
