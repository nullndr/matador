import React, { useState } from 'react';
import { 
    AppShell, 
    useMantineTheme, 
    Navbar, 
    Header, 
    MediaQuery, 
    Burger, 
    ScrollArea, 
    Box, 
    Group, 
    ActionIcon, 
    useMantineColorScheme,
    Image,
    Grid,
    Center,
    Divider
} from '@mantine/core';

import { TiWeatherSunny } from 'react-icons/ti';
import { BiMoon } from 'react-icons/bi'
import { Navlink, NavlinkProps } from './index';

type NavBarProps = React.PropsWithChildren<{
    srcLogo: string,
    links: NavlinkProps[],
    footerText: string | React.ReactNode
}>

export const NavBar = ( { srcLogo, links, footerText, children } : NavBarProps) => {

    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const [opened, setOpened] = useState<boolean>(false);

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },

            }}
            navbarOffsetBreakpoint="sm"
            fixed
            navbar={
                <Navbar
                    p='md'
                    hiddenBreakpoint="sm" 
                    hidden={!opened} 
                    width={{ 
                        sm: 200, 
                        lg: 300,

                    }}
                >
                    <Navbar.Section style={{ marginBottom: '5%' }}>
                        <Grid columns={12} justify='space-between'>
                            <Grid.Col span={6} >
                                <Image 
                                    src={srcLogo} 
                                    alt='logo'
                                    width={50}
                                />
                            
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Group position='right'>
                                    <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
                                        
                                        {colorScheme === 'dark' ? <TiWeatherSunny size={16} /> : <BiMoon size={16} />}

                                    </ActionIcon>
                                </Group>
                            
                            </Grid.Col>
                        </Grid>
                    </Navbar.Section>
                    <Divider />
                    {/* Lnks  */}
                    <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                        {links.map(el => <Navlink {...el} />)}
                    </Navbar.Section>
                    <Divider />
                    {/* Footer with information */}
                    <Navbar.Section>
                        <p>{footerText}</p>
                    </Navbar.Section>
                    
                </Navbar>
            }


            // FIXME when to small show header with burger 
            // header={
            //     <Header height={70} p='md'>
            //         <div>
            //             <MediaQuery largerThan='sm' styles={{ display: 'none' }}>

            //             <Burger
            //                 opened={opened}
            //                 onClick={() => setOpened((o) => !o)}
            //                 size="sm"
            //                 color={theme.colors.gray[6]}
            //                 mr="xl"
            //             />

            //             </MediaQuery>
            //         </div>

            //     </Header>
            // }
        >
            {children}
        </AppShell>
    );




}