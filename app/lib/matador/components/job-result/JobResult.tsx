import { Card, Textarea } from "@mantine/core";

export interface JobResultProps {
  label: string;
  description: string;
  value: string;
  color?: string;
}

const JobResult = ({ label, description, value, color }: JobResultProps) => {
  return (
    <>
      <Card radius="md" withBorder={true} shadow="xl" mb="md">
        <Textarea
          label={label}
          required={false}
          description={description}
          variant="filled"
          size="md"
          value={value}
          readOnly
          autosize
          sx={{
            textarea: {
              backgroundColor: color,
              color: 'white'
            },
          }}
        />
      </Card>
    </>
  );
};

export default JobResult;
