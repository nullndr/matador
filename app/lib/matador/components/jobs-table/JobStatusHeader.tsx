import { ActionIcon, Grid } from "@mantine/core";
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
    <Grid justify="space-between" align="center">
      <Grid.Col span={1}>
        <ActionIcon onClick={onFilterClick}>
          <BiFilter size={16} />
        </ActionIcon>
      </Grid.Col>
      <Grid.Col span={11}>Status {isFiltered ? "(filtered)" : ""}</Grid.Col>
    </Grid>
  );
};

export default JobStatusHeader;
