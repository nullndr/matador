import React from 'react';
import { UnstyledButton, ThemeIcon, Group, Text, MantineColor } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { NavlinkProps } from './index';


export const Navlink = ({ icon, color, label, href } : NavlinkProps) => {


    

    return (
        <NavLink 
            to={href}
            
            children={({ isActive }) => {
                return (

                    <UnstyledButton
                        sx={(theme) => ({
                            display: 'block',
                            width: '100%',
                            padding: theme.spacing.xs,
                            borderRadius: theme.radius.sm,
                            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                            backgroundColor: isActive 
                                ? 
                                (theme.colorScheme === 'dark' ? `${theme.colors.dark[4]} !important` :  `${theme.colors.gray[2]} !important`)
                                :
                                (theme.colorScheme === 'dark' ? `${theme.colors.dark[7]} !important` :  `white !important`),
                            '&:hover': {
                            backgroundColor:
                                theme.colorScheme === 'dark' ? `${theme.colors.dark[4]} !important` : `${theme.colors.gray[2]} !important`,
                            },
                            marginBottom: '2%'
                        })}
                    >
                            <Group>

                                <ThemeIcon color={color} variant='light'>
                                    {icon}
                                </ThemeIcon>

                                <Text size='md'>{label}</Text>
                            </Group>

                    </UnstyledButton>
                )
            }}
            />
    );
}