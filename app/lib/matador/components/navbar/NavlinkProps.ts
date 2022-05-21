import { MantineColor } from "@mantine/core";

interface NavlinkProps {
    icon: React.ReactNode,
    color: MantineColor,
    label: string,
    href: string,
    onClick: () => void
}



export default NavlinkProps;