import { MantineColor } from "@mantine/core";

export type NavbarProps = React.PropsWithChildren<{
    srcLogo: string,
    links: NavbarItem[],
    footerText: string
}>

export interface NavbarItem {
    icon: React.ReactNode,
    color: MantineColor,
    label: string,
    href: string,
}