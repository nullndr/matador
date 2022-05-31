import { Card, Textarea } from "@mantine/core";

export interface JobResultProps {
  label: string;
  description: string;
  value: string;
  color?: string;
  textColor?: string;
  borderColor?: string;
}

const JobResult = ({
  label,
  description,
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
          description={description}
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
          // className="text-sm text-gray-900 bg-green-50 border-2 rounded border-green-600"
        />
      </Card>
    </>
  );
};

export default JobResult;
