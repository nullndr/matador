import { Badge, MantineColor, Text } from "@mantine/core";
import { NavLink } from "@remix-run/react";
import { BullJob } from "~/lib/matador/index.server";
import { getStatusColor } from "../../helpers/ui-helpers";
import { JobStatus } from "../../types/JobStatus";
import JobsTableRowProps from "./JobsTableRowProps";


const JobsTableRow = ({ job, queueName, repeatJob = false } : JobsTableRowProps) => {

    const status = getStatus(job);

    const buildLink = () : string => {
        if(!job.id) {
            return '#';
        }

        if(repeatJob) {
            return `../${encodeURI(queueName)}/${encodeURI(`${job.id}`)}`;
        }

        let baseUri = `../${encodeURI(queueName)}/`;

        if(status === 'repeated') {
            baseUri += `repeat/${encodeURI(job.id)}`;
        } else {
            baseUri += job.id;
        }

        return baseUri;
    }


    return (
        <tr>
            <td>
                <NavLink
                    to={buildLink()}
                >
                    <Text variant="link">{job.name}</Text>
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

export default JobsTableRow;