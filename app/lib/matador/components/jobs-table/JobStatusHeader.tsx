import { Group } from "@mantine/core";
import { BiFilter } from "react-icons/bi";

export interface JobStatusHeaderProps {
  isFiltered: boolean;
  onFilterClick: () => void;
}

const JobStatusHeader = ({
  isFiltered,
  onFilterClick,
}: JobStatusHeaderProps) => {
  return (
    <Group
      spacing="xs"
      sx={{
        ":hover": {
          cursor: "pointer",
        },
      }}
      onClick={onFilterClick}
    >
      <BiFilter size={16} />
      Status {isFiltered ? "(filtered)" : ""}
    </Group>
  );
};

export default JobStatusHeader;
