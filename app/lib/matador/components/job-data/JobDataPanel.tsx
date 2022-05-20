import { Divider, Title, } from "@mantine/core";
import { JobDataPanelProps, JobData } from "./index";

export const JobDataPanel = ({ parent, data, opts }: JobDataPanelProps) => {
    console.log(parent)
    return (
        <>
            <Title mb='sm' order={3} sx={(theme) => ({
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
            })}>
                Job Data
            </Title>

            <Divider mb='md' />

            
            {/* {"parent" in loaderData.job && loaderData.job.parent && (
                <div className="ml-4 mt-2 flex-shrink-0">
                    <NavLink
                    to={`./../../${
                        JSON.parse(loaderData.job.parent).queueKey.split(":")[1]
                    }/${JSON.parse(loaderData.job.parent).id}`}
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Parent job
                    </NavLink>
                </div>
            )} */
            }
            
            { /* FIXME NavLink */ }
            <JobData 
                title="Parent"
                json={parent !== undefined ? parent : {} }
            />

            <JobData 
                title="Opts"
                json={opts !== undefined ? opts : {}}
            />

            <JobData 
                title="Data"
                json={data !== undefined ? data : {}}
            />
        </>
    );
}