import { Card, Textarea } from '@mantine/core';
import { JobResultProps } from './index'

// FIXME heigh textarea

export const JobResult = ({ label, description, value}: JobResultProps) => {
    return (
        <>
            <Card
                radius='md'
                withBorder={true}
                shadow='xl'
                mb='md'
                sx={{
                    minHeight: 200,
                    div: {
                        height: '100%',
                        textarea: {
                            height: '100%',
                        }
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
                    sx={{
                        height: '100%',
                        div: {
                            height: '100%',
                            textarea: {
                                height: '100%',
                            }
                        }
                    }}
                />
            </Card>
        </>
    );
}