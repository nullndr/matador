import { Card, Textarea } from '@mantine/core';
import JobResultProps from './JobResultProps';

const JobResult = ({ label, description, value}: JobResultProps) => {
    return (
        <>
            <Card
                radius='md'
                withBorder={true}
                shadow='xl'
                mb='md'
                sx={{
                    textarea: {
                        minHeight: 130,
                    }
                }}
            >
                <Textarea
                    label={label}
                    required={false}
                    description={description}
                    variant="filled"
                    size="md"
                    value={value}
                    
                />
            </Card>
        </>
    );
}


export default JobResult;