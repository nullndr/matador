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
    Divider,
    Title,
    ColorScheme
} from '@mantine/core';

import { TiWeatherSunny } from 'react-icons/ti';
import { BiMoon } from 'react-icons/bi'
import { Navlink, NavbarProps } from './index';
import { NavLink } from 'react-router-dom';


export const NavBar = ( { srcLogo, links, footerText, children } : NavbarProps) => {

    const theme = useMantineTheme();
    const { toggleColorScheme } = useMantineColorScheme();
    const [opened, setOpened] = useState<boolean>(false);

    const onClickThemeButton = () => {
        
        //FIXME move to constant file 
        const changeThemeTo : ColorScheme = theme.colorScheme === 'dark' ? 'light' : 'dark';
        toggleColorScheme(changeThemeTo);
        localStorage.setItem('theme', changeThemeTo);
        
    }
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
                                <NavLink to='./'>
                                    <Image 
                                        src={srcLogo} 
                                        alt='logo'
                                        width={70}
                                    />
                                </NavLink>
                            
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Group position='right'>
                                    <ActionIcon variant="default" onClick={onClickThemeButton} size={44}>
                                        {theme.colorScheme === 'dark' ? <TiWeatherSunny size={24} /> : <BiMoon size={24} />}
                                    </ActionIcon>
                                </Group>
                            
                            </Grid.Col>
                        </Grid>
                    </Navbar.Section>
                    <Divider sx={{ marginBottom: '2%' }} />
                    
                    <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                        {links.map(el => <Navlink key={el.href} {...el} />)}
                    </Navbar.Section>
                    <Divider />
                    
                    <Navbar.Section>
                        <Title order={5} sx={(theme) => ({
                            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
                        })}>
                            { footerText }
                        </Title>
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