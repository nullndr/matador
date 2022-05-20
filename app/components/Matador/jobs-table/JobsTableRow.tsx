import { Badge, MantineColor, Text } from "@mantine/core";
import { NavLink } from "@remix-run/react";
import { jobIdForGroup } from "bullmq";
import { BullJob } from "~/lib/matador/index.server";
import { JobsTableRowProps } from "./JobsTableRowProps";

type JobStatus = 'completed' | 'repeated' | 'children' | 'failed';

export const JobsTableRow = ({ job, queueName } : JobsTableRowProps) => {

    const status = getStatus(job);

    const buildLink = () : string => {
        if(!job.id) {
            return '#';
        }

        let baseUri = `../${encodeURI(queueName)}/`;

        if(status === 'repeated') {
            baseUri += `repeat/${encodeURI(job.id)}`;
        } else {
            baseUri += job.id;
        }

        console.log(baseUri);
        return baseUri;
    }


    return (
        <tr>
            <td>
                <NavLink
                    to={buildLink()}
                >
                    <Text variant="link" component="a">{job.name}</Text>
                </NavLink>
            </td>
            <td>{ job.id }</td>
            <td> 
                { 
                    "timestamp" in job 
                    ? 
                    new Date(Number(job.timestamp)).toISOString() 
                    : 
                    "" 
                } 
            </td>
            <td>
                <Badge color={getStatusColor(status)}>
                    {status}
                </Badge>
            </td>


        </tr>
    );   
}

const getStatus = (job: BullJob) : JobStatus => {
    
    if("failedReason" in job) {
        return 'failed';
    }

    if("parentKey" in job) {
        return 'children';
    }

    if("repeated" in job) {
        return 'repeated';
    }

    return 'completed';  
}

const getStatusColor = (status: JobStatus) : MantineColor  => {

    
    if(status === 'failed') {
        return 'red';
    }

    if(status === 'children') {
        return 'blue';
    }

    if(status === 'repeated') {
        return 'indigo';
    }

    return 'green';
}

