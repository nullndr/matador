import { Button, Center, Chip, Chips, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { getStatusColor } from "~/lib/matador/helpers/ui-helpers";
import { toFirstLetterUpperCase } from "~/lib/matador/helpers/utils";
import type { JobStatus } from "~/lib/matador/types/JobStatus";
import { JobStatuses } from "~/lib/matador/types/JobStatus";

export interface JobStatusFilterModalProps {
  opened: boolean;
  repeatedJobs: boolean;
  onClose: () => void;
  selected: JobStatus[];
  onApply: (selected: JobStatus[]) => void;
}

const JobStatusFilterModal = ({
  opened,
  onClose,
  repeatedJobs,
  selected,
  onApply,
}: JobStatusFilterModalProps) => {
  const [statusSelected, setStatuseSelected] = useState<JobStatus[]>(selected);

  const statuses = repeatedJobs
    ? JobStatuses.filter((el) => el !== "repeated")
    : JobStatuses;

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title="Filter Status"
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
      size="lg"
    >
      <Center mb="md">
        <Chips
          multiple
          variant="outline"
          size="md"
          onChange={(values) => setStatuseSelected(values as JobStatus[])}
          value={statusSelected}
        >
          {statuses.map((el) => (
            <Chip key={el} value={el} color={getStatusColor(el as JobStatus)}>
              {toFirstLetterUpperCase(el)}
            </Chip>
          ))}
        </Chips>
      </Center>
      <Center>
        <Button
          color="grape"
          onClick={() => {
            onApply(statusSelected);
          }}
        >
          <Text
            sx={(theme) => ({
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[0]
                  : theme.black,
            })}
          >
            Apply
          </Text>
        </Button>
      </Center>
    </Modal>
  );
};

export default JobStatusFilterModal;
