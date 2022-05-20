import { StatCardProps } from './index';
import {
    Badge,
    Card, 
    Center,
    Grid,
    Group,
    Title
} from '@mantine/core';

export const StatCard = ({ title, value, color } : StatCardProps) => {

    return (
        <Card
            radius='md'
            withBorder={true}
            shadow='xl'
        >
            <Grid justify='center' align='center'>
                <Grid.Col span={6}> {/* FIXME title text overflow */}
                    <Title sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} order={4}>{ title }</Title>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Group position='right' >
                        <Badge color={color} size='lg'> { value } </Badge>
                    </Group>
                </Grid.Col>
            </Grid>
        </Card>
    );
}