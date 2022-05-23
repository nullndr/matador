import { Divider, Title } from "@mantine/core";
import { NavLink } from "@remix-run/react";
import { JobData } from "./JobData";

export interface JobDataPanelProps {
  parent?: any;
  opts?: any;
  data?: any;
}

export const JobDataPanel = ({ parent, data, opts }: JobDataPanelProps) => {
  const parentLink =
    parent !== undefined
      ? `./../../${JSON.parse(data.job.parent).queueKey.split(":")[1]}/${
          JSON.parse(data.job.parent).id
        }`
      : "#";

  return (
    <>
      <Title
        mb="sm"
        order={3}
        sx={(theme) => ({
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        })}
      >
        Job Data
      </Title>

      <Divider mb="md" />

      <NavLink to={parentLink}>
        <JobData title="Parent" json={parent !== undefined ? parent : {}} />
      </NavLink>
      <JobData title="Opts" json={opts !== undefined ? opts : {}} />

      <JobData title="Data" json={data !== undefined ? data : {}} />
    </>
  );
};
