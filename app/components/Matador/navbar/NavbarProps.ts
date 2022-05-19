import { NavlinkProps } from './index';

export type NavbarProps = React.PropsWithChildren<{
    srcLogo: string,
    links: NavlinkProps[],
    footerText: string
}>
